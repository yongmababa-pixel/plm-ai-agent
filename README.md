# PLM AI Agent — 服装行业多智能体选品平台

> **SHEIN 服装 PLM + Multi-Agent + MCP 协议完整技术方案与开源 Demo**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![Go 1.21+](https://img.shields.io/badge/Go-1.21+-00ADD8.svg)](https://go.dev)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent%20Orchestration-purple.svg)](https://langchain-ai.github.io/langgraph/)
[![MCP](https://img.shields.io/badge/MCP-Tool%20Protocol-orange.svg)](https://modelcontextprotocol.io)

## 项目简介

用 **Multi-Agent 智能体** 打通服装 PLM 全流程，完成「趋势采集 → 选品定款 → 款式生成 → 成本校验 → 热销复盘 → 数据回流迭代模型」全自动化。

**核心能力：替代 70% 人工重复工作，提升上新爆款率 30%+。**

## 技术架构

```
┌─────────────────────────────────────────────┐
│           前端业务应用层                      │
│    Go Dashboard · React AI面板 · Celery队列   │
├─────────────────────────────────────────────┤
│         Multi-Agent 编排层 (核心)             │
│  LangGraph · 5类Agent · 三层Memory · AutoGen  │
├─────────────────────────────────────────────┤
│           MCP 标准化工具层                    │
│  数据库MCP · 多模态MCP · 爬虫MCP · PLM同步MCP │
├─────────────────────────────────────────────┤
│         底层数据 & 模型算力层                  │
│  PostgreSQL · Milvus · DeepSeek · 数据治理     │
└─────────────────────────────────────────────┘
```

## 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/YOUR_USER/plm-ai-agent.git
cd plm-ai-agent

# 2. 安装依赖
pip install -r requirements.txt

# 3. 启动 GUI（无需 API Key 也能跑 Demo）
python server.py

# 4. 打开浏览器
open http://localhost:8765
```

## Web GUI 演示

| 功能 | 说明 |
|------|------|
| 左侧面板 | 输入选品需求 + 成本上限 |
| 实时步骤 | WebSocket 推送每个 Agent 执行状态 |
| 结果展示 | 款式方案卡片 + 成本校验 + 爆款率预测 |
| 暗色主题 | 与 PPT 方案文档风格统一 |

> **无需 DEEPSEEK_API_KEY**：Demo 使用模拟数据即可完整跑通全流程。设置 `DEEPSEEK_API_KEY` 后启用真实 LLM 推理。

## 技术架构

```
┌─────────────────────────────────────────────┐
│          前端 GUI (HTML/CSS/JS)              │
│     WebSocket 实时推送 Agent 执行步骤          │
├─────────────────────────────────────────────┤
│        FastAPI Backend (server.py)           │
│    REST API + WebSocket + 静态文件服务         │
├─────────────────────────────────────────────┤
│         Multi-Agent 编排层                    │
│   总管 → 趋势/PLM数据(并行) → 设计 → 供应链     │
├─────────────────────────────────────────────┤
│        Memory + MCP 工具层                   │
│   三层记忆 + 4类MCP Server 骨架               │
└─────────────────────────────────────────────┘
```

## CLI Demo

```bash
# 命令行版本（终端交互）
python demo.py
```

## 项目结构

```
plm-ai-agent/
├── agent/           # Multi-Agent 编排引擎 (LangGraph)
│   ├── planner.py   # 总管规划Agent
│   ├── trend.py     # 趋势检索Agent
│   ├── plm_data.py  # PLM数据Agent
│   ├── design.py    # 多模态生成Agent
│   └── supply_chain.py  # 供应链校验Agent
├── mcp-servers/     # MCP 标准化工具服务
│   ├── db_server.py        # 数据库MCP Server
│   ├── multimodal_server.py # 多模态MCP Server
│   ├── crawler_server.py   # 爬虫MCP Server
│   └── plm_sync_server.py  # PLM同步MCP Server
├── memory/          # 三层Memory系统
│   ├── working.py   # 工作记忆
│   ├── session.py   # 会话记忆 (Redis)
│   └── long_term.py # 长期记忆 (Mem0 + Milvus)
├── frontend/        # 前端Demo
│   ├── dashboard.go # Go监控仪表盘
│   └── ai-panel/    # React AI选品面板
├── data/            # 示例数据 & 训练集
├── docs/            # 完整技术方案PPT
├── demo.py          # Demo入口
└── docker-compose.yml
```

## License

MIT © 2026 马永
