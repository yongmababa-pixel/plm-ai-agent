#!/usr/bin/env python3
"""PLM AI Agent - FastAPI Backend Server + GUI"""
import asyncio, json, os, sys
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from pydantic import BaseModel
import uvicorn

sys.path.insert(0, str(Path(__file__).parent))
from agent.planner import PlannerAgent
from agent.trend import TrendAgent  
from agent.plm_data import PLMDataAgent
from agent.design import DesignAgent
from agent.supply_chain import SupplyChainAgent
from memory.session import SessionMemory
from memory.long_term import LongTermMemory

# LLM is optional - demo works with mock data without API key
try:
    from langchain_openai import ChatOpenAI
    HAS_LLM = True
except ImportError:
    HAS_LLM = False

app = FastAPI(title="PLM AI Agent", version="1.0.0")

# Global agents
llm = None
if HAS_LLM and os.getenv("DEEPSEEK_API_KEY"):
    llm = ChatOpenAI(
        model="deepseek-chat",
        api_key=os.getenv("DEEPSEEK_API_KEY"),
        base_url="https://api.deepseek.com/v1",
        temperature=0.3
    )

planner = PlannerAgent(llm) if llm else None
trend_agent = TrendAgent()
plm_agent = PLMDataAgent()
design_agent = DesignAgent()
supply_agent = SupplyChainAgent()

# Request model
class DesignRequest(BaseModel):
    prompt: str = "生成3款2026夏季辣妹牛仔短裤，成本<=35元"
    cost_limit: float = 35.0
    category: str = "牛仔"

@app.get("/")
async def root():
    return FileResponse("frontend/index.html")

@app.get("/api/health")
async def health():
    return {"status": "ok", "llm_available": llm is not None}

@app.post("/api/design")
async def create_design(req: DesignRequest):
    """同步API：提交选品需求，返回完整报告"""
    # Use mock plan if no LLM
    if planner:
        plan = await planner.plan(req.prompt, req.cost_limit)
    else:
        plan = {"category": req.category, "subtasks": [], "cost_limit": req.cost_limit, "season": "夏季", "style_keywords": ["热销版型", "流行趋势"]}
    
    # Step 2-3: Parallel trend + plm_data
    trend_data, plm_data_result = await asyncio.gather(
        trend_agent.search(req.prompt),
        plm_agent.query_historical(req.category)
    )
    
    # Step 4: Design
    design = await design_agent.generate(req.prompt, trend_data, plm_data_result, req.cost_limit)
    
    # Step 5: Validate
    validation = await supply_agent.validate(design, req.cost_limit)
    
    # Step 6: Build report
    designs = validation.get("designs", [])
    within_budget = [d for d in designs if d.get("within_budget")]
    
    report = {
        "request": req.prompt,
        "cost_limit": req.cost_limit,
        "timestamp": datetime.now().isoformat(),
        "plan": plan,
        "trend": trend_data,
        "plm_data": plm_data_result,
        "designs": designs,
        "summary": {
            "total_designs": len(designs),
            "within_budget": len(within_budget),
            "over_budget": len(designs) - len(within_budget),
            "top_pick": within_budget[0]["name"] if within_budget else None,
            "top_hit_rate": within_budget[0].get("predicted_hit_rate", 0) if within_budget else 0
        }
    }
    
    # Save to memory
    memory = LongTermMemory()
    memory.save_design_solution(report, {"timestamp": datetime.now().isoformat()})
    
    return report

@app.websocket("/ws/design")
async def websocket_design(websocket: WebSocket):
    """WebSocket：实时推送每个Agent执行步骤"""
    await websocket.accept()
    
    try:
        data = await websocket.receive_json()
        req = DesignRequest(**data)
        
        # Step 1: Planner
        await websocket.send_json({"step": 1, "agent": "🧠 总管Agent", "status": "running", "message": "解析需求，拆解子任务..."})
        if planner:
            plan = await planner.plan(req.prompt, req.cost_limit)
        else:
            plan = {"category": req.category, "subtasks": []}
        await websocket.send_json({"step": 1, "agent": "🧠 总管Agent", "status": "done", "message": f"拆解为 {len(plan.get('subtasks', []))} 个子任务", "data": plan})
        
        # Step 2: Trend (parallel)
        await websocket.send_json({"step": 2, "agent": "🔍 趋势Agent", "status": "running", "message": "检索流行趋势..."})
        trend_data = await trend_agent.search(req.prompt)
        await websocket.send_json({"step": 2, "agent": "🔍 趋势Agent", "status": "done", "message": f"发现 {len(trend_data.get('styles',[]))} 个流行趋势", "data": trend_data})
        
        # Step 3: PLM Data (parallel)
        await websocket.send_json({"step": 3, "agent": "📊 PLM数据Agent", "status": "running", "message": "查询历史销售数据..."})
        plm_result = await plm_agent.query_historical(req.category)
        await websocket.send_json({"step": 3, "agent": "📊 PLM数据Agent", "status": "done", "message": f"查询到 {len(plm_result.get('bestsellers',[]))} 个热销款式", "data": plm_result})
        
        # Step 4: Design
        await websocket.send_json({"step": 4, "agent": "🎨 设计Agent", "status": "running", "message": "生成款式方案..."})
        design = await design_agent.generate(req.prompt, trend_data, plm_result, req.cost_limit)
        await websocket.send_json({"step": 4, "agent": "🎨 设计Agent", "status": "done", "message": f"生成 {len(design.get('designs',[]))} 个款式方案", "data": design})
        
        # Step 5: Supply Chain
        await websocket.send_json({"step": 5, "agent": "💰 供应链Agent", "status": "running", "message": "核算成本..."})
        validation = await supply_agent.validate(design, req.cost_limit)
        designs = validation.get("designs", [])
        within = sum(1 for d in designs if d.get("within_budget"))
        await websocket.send_json({"step": 5, "agent": "💰 供应链Agent", "status": "done", "message": f"{within}/{len(designs)} 个方案在预算内", "data": validation})
        
        # Final
        await websocket.send_json({"step": 6, "agent": "✅ 完成", "status": "done", "message": "选品报告已生成", "final": validation})
        
    except WebSocketDisconnect:
        pass
    except Exception as e:
        await websocket.send_json({"error": str(e)})

if __name__ == "__main__":
    print("""
    ╔══════════════════════════════════════╗
    ║   PLM AI Agent - Multi-Agent 选品平台 ║
    ║   打开浏览器: http://localhost:8765   ║
    ╚══════════════════════════════════════╝
    """)
    uvicorn.run(app, host="0.0.0.0", port=8765, log_level="info")
