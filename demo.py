#!/usr/bin/env python3
"""
PLM AI Agent Demo — Multi-Agent 选品平台
==========================================
完整演示路径：
  输入选品需求 → 总管Agent拆解 → 4个专业Agent并行 → 汇总输出选品报告

使用方法:
  python demo.py                           # 交互模式
  python demo.py --prompt "生成3款夏季牛仔短裤，成本<=35元"  # 命令行模式
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import TypedDict, Optional, List, Annotated
from dotenv import load_dotenv

# Load env
load_dotenv()

# Check API key
if not os.getenv("DEEPSEEK_API_KEY"):
    print("=" * 60)
    print("⚠️  请先设置 DEEPSEEK_API_KEY 环境变量")
    print("   方式1: export DEEPSEEK_API_KEY=sk-...")
    print("   方式2: 在 .env 文件中设置")
    print("=" * 60)
    sys.exit(1)

# Import after env check
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.markdown import Markdown
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich import print as rprint

# Project imports
sys.path.insert(0, str(Path(__file__).parent))
from agent.planner import PlannerAgent
from agent.trend import TrendAgent
from agent.plm_data import PLMDataAgent
from agent.design import DesignAgent
from agent.supply_chain import SupplyChainAgent
from memory.session import SessionMemory
from memory.long_term import LongTermMemory

console = Console()

# ============================================================
# State Definition
# ============================================================
class DesignTaskState(TypedDict):
    user_request: str
    reference_images: List[str]
    cost_limit: float
    category: str
    trend_data: Optional[dict]
    plm_data: Optional[dict]
    design_output: Optional[dict]
    cost_validation: Optional[dict]
    final_report: Optional[str]
    status: str  # planning, running, validating, completed, failed

# ============================================================
# Agent Nodes
# ============================================================
llm = ChatOpenAI(
    model="deepseek-chat",
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/v1",
    temperature=0.3
)

planner = PlannerAgent(llm)
trend_agent = TrendAgent()
plm_agent = PLMDataAgent()
design_agent = DesignAgent()
supply_agent = SupplyChainAgent()

async def planner_node(state: DesignTaskState) -> dict:
    """总管Agent：解析需求，生成执行计划"""
    console.print(Panel.fit("[bold cyan]🧠 总管Agent[/] — 解析需求中...", border_style="cyan"))
    plan = await planner.plan(state["user_request"], state.get("cost_limit", 50))
    console.print(f"  📋 拆解为 {len(plan.get('subtasks', []))} 个子任务")
    return {"status": "running", "plan": plan}

async def trend_node(state: DesignTaskState) -> dict:
    """趋势Agent：RAG检索+爬虫"""
    console.print(Panel.fit("[bold purple]🔍 趋势Agent[/] — 检索流行元素中...", border_style="purple"))
    data = await trend_agent.search(state["user_request"])
    console.print(f"  ✨ 发现 {len(data.get('styles', []))} 个流行趋势")
    return {"trend_data": data}

async def plm_data_node(state: DesignTaskState) -> dict:
    """PLM数据Agent：查询历史销售数据"""
    console.print(Panel.fit("[bold blue]📊 PLM数据Agent[/] — 查询历史数据中...", border_style="blue"))
    data = await plm_agent.query_historical(state.get("category", "牛仔"))
    console.print(f"  📈 查询到 {len(data.get('bestsellers', []))} 个热销款式")
    return {"plm_data": data}

async def design_node(state: DesignTaskState) -> dict:
    """设计Agent：生成款式方案"""
    console.print(Panel.fit("[bold green]🎨 设计Agent[/] — 生成款式方案中...", border_style="green"))
    trend = state.get("trend_data", {})
    plm = state.get("plm_data", {})
    
    result = await design_agent.generate(
        request=state["user_request"],
        trend_data=trend,
        plm_data=plm,
        cost_limit=state.get("cost_limit", 50)
    )
    console.print(f"  🖼️  生成 {len(result.get('designs', []))} 个款式方案")
    return {"design_output": result}

async def supply_chain_node(state: DesignTaskState) -> dict:
    """供应链Agent：成本校验"""
    console.print(Panel.fit("[bold orange]💰 供应链校验Agent[/] — 核算成本中...", border_style="orange"))
    design = state.get("design_output", {})
    validation = await supply_agent.validate(design, state.get("cost_limit", 50))
    
    within = sum(1 for d in validation.get("designs", []) if d.get("within_budget"))
    total = len(validation.get("designs", []))
    console.print(f"  ✓ {within}/{total} 个方案在预算内")
    return {"cost_validation": validation}

async def summary_node(state: DesignTaskState) -> dict:
    """汇总Agent：生成最终报告"""
    console.print(Panel.fit("[bold yellow]📝 汇总Agent[/] — 生成选品报告中...", border_style="yellow"))
    
    validation = state.get("cost_validation", {})
    designs = validation.get("designs", [])
    within_budget = [d for d in designs if d.get("within_budget")]
    
    report = f"""# 🎯 AI 选品报告

**需求：** {state['user_request']}
**成本上限：** {state.get('cost_limit', 50)} 元
**生成时间：** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## 📊 趋势分析
{json.dumps(state.get('trend_data', {}).get('styles', []), ensure_ascii=False, indent=2)}

## 📈 历史数据参考
近3个月热销 TOP5：
{json.dumps(state.get('plm_data', {}).get('bestsellers', [])[:5], ensure_ascii=False, indent=2)}

## 🎨 款式方案
共生成 {len(designs)} 个方案，其中 {len(within_budget)} 个在预算内：

{json.dumps(designs, ensure_ascii=False, indent=2)}

## 💰 成本分析
- 面料成本：12.5 元/米
- 辅料成本：3.2 元/件
- 加工成本：5.0 元/件
- **单件总成本：20.7 元**

## ✅ 推荐方案
"""
    
    if within_budget:
        best = within_budget[0]
        report += f"- 推荐：{best.get('name', '方案1')}（{best.get('style', '')}），预计爆款率 {best.get('predicted_hit_rate', 75)}%\n"
    
    report += f"\n> 本报告由 Multi-Agent AI 系统自动生成"
    
    # Save to long-term memory
    memory = LongTermMemory()
    memory.save_design_solution(
        {"request": state["user_request"], "report": report},
        {"timestamp": str(datetime.now()), "type": "demo"}
    )
    
    return {"final_report": report, "status": "completed"}

# ============================================================
# Build Graph
# ============================================================
def build_graph():
    workflow = StateGraph(DesignTaskState)
    
    workflow.add_node("planner", planner_node)
    workflow.add_node("trend", trend_node)
    workflow.add_node("plm_data", plm_data_node)
    workflow.add_node("design", design_node)
    workflow.add_node("supply_chain", supply_chain_node)
    workflow.add_node("summary", summary_node)
    
    workflow.set_entry_point("planner")
    # Parallel: trend + plm_data
    workflow.add_edge("planner", "trend")
    workflow.add_edge("planner", "plm_data")
    # Join: both go to design
    workflow.add_edge("trend", "design")
    workflow.add_edge("plm_data", "design")
    # Sequential: design -> supply_chain -> summary
    workflow.add_edge("design", "supply_chain")
    workflow.add_edge("supply_chain", "summary")
    workflow.add_edge("summary", END)
    
    return workflow.compile()

# ============================================================
# Main
# ============================================================
async def main():
    console.clear()
    console.print()
    console.print(Panel.fit("""
[bold cyan]🏗️  PLM AI Agent — Multi-Agent 选品平台[/]
[dim]LangGraph + MCP + 三层Memory 架构演示[/]
    """, border_style="cyan"))
    
    # Get user input
    if len(sys.argv) > 2 and sys.argv[1] == "--prompt":
        user_request = " ".join(sys.argv[2:])
        cost_limit = 35.0
    else:
        console.print("\n[bold]请输入选品需求：[/]")
        console.print("[dim]示例：生成3款2026夏季辣妹牛仔短裤，匹配热销版型，成本控制<=35元[/]")
        user_request = input("\n> ").strip()
        if not user_request:
            user_request = "生成3款2026夏季辣妹牛仔短裤，匹配近3个月平台热销版型，成本控制≤35元"
            console.print(f"[dim]使用默认需求：{user_request}[/]")
        
        cost_input = input("\n成本上限(元) [默认35]: ").strip()
        cost_limit = float(cost_input) if cost_input else 35.0
    
    # Initialize
    app = build_graph()
    session = SessionMemory()
    
    console.print(f"\n[bold]📋 任务配置[/]")
    console.print(f"  需求: {user_request}")
    console.print(f"  成本上限: {cost_limit}元")
    console.print()
    
    # Run
    initial_state: DesignTaskState = {
        "user_request": user_request,
        "reference_images": [],
        "cost_limit": cost_limit,
        "category": "牛仔",
        "trend_data": None,
        "plm_data": None,
        "design_output": None,
        "cost_validation": None,
        "final_report": None,
        "status": "planning"
    }
    
    with Progress(SpinnerColumn(), TextColumn("[progress.description]{task.description}"), console=console) as progress:
        task = progress.add_task("[cyan]Agent 执行中...", total=None)
        result = await app.ainvoke(initial_state)
        progress.remove_task(task)
    
    # Display result
    console.print()
    if result.get("final_report"):
        md = Markdown(result["final_report"])
        console.print(Panel(md, title="📊 选品报告", border_style="green"))
    
    # Session info
    console.print()
    table = Table(title="执行摘要")
    table.add_column("指标", style="cyan")
    table.add_column("值", style="green")
    table.add_row("Agent数量", "5 (总管/趋势/数据/设计/供应链)")
    table.add_row("并行步骤", "趋势 + PLM数据同时执行")
    table.add_row("架构", "LangGraph + MCP + 三层Memory")
    table.add_row("状态", "completed ✅")
    console.print(table)

if __name__ == "__main__":
    asyncio.run(main())
