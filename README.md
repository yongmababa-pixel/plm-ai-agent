# PLM AI Agent — 企业级多智能体选品平台

> **Multi-Agent + MCP + 三层Memory | LangGraph 编排 | 6大行业自适应 Tech Pack**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.2-blue.svg)](https://github.com/yongmababa-pixel/plm-ai-agent)
[![Stars](https://img.shields.io/github/stars/yongmababa-pixel/plm-ai-agent?style=social)](https://github.com/yongmababa-pixel/plm-ai-agent)

## 🎯 项目定位

一个**企业级 AI 选品平台**，展示 Multi-Agent 架构在 B2B 电商选品场景的完整落地。不是玩具 Demo，而是按照真实业务流设计的可演示系统。

## ✨ 核心特性

| 特性 | 说明 |
|------|------|
| 🤖 **5 Agent 协同** | 总管规划 / 趋势检索 / PLM数据 / 多模态设计 / 供应链校验 |
| 🏭 **6 大行业自适应** | 服装鞋包 / 电子配件 / 家居用品 / 美妆个护 / 运动户外 / 食品饮料 |
| 📋 **结构化 Tech Pack** | 选行业后自动切换专属字段，从结构化工单生成 AI Prompt |
| 💰 **真实供应链数据** | 物料编码体系 · 5 种数据采集渠道 · 更新频率 · MOQ 限制 |
| 👥 **4 角色权限** | 选品设计师 / 供应链专员 / 运营复盘 / AI 管理员 |
| 🧩 **工作流编排** | Coze 风格拖拽画布 · 4 套预设模板 · SVG 连线可视化 |
| 🔌 **MCP 工具协议** | 数据库 / 多模态 / 爬虫 / PLM 同步 四类 MCP Server |
| 🧠 **三层 Memory** | 工作记忆 / 会话记忆 / 长期事件记忆 |
| 📱 **移动端适配** | 响应式布局 · 滑出菜单 · 手机可用 |

## 🏗️ 技术架构

```
前端 (Single Page App)
  ├── 4 角色权限体系（菜单隔离 · 数据隔离）
  ├── 16 个功能页面（工业级亮色蓝白主题）
  └── WebSocket 实时通信

后端 (FastAPI + Python)
  ├── LangGraph 多智能体编排
  ├── MCP Server 协议骨架
  └── 三层 Memory 存储

数据层
  ├── 向量数据库 (Milvus) — RAG 检索
  ├── 关系数据库 (PostgreSQL) — PLM 业务数据
  └── 对象存储 (S3) — 设计图缓存
```

## 🚀 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/yongmababa-pixel/plm-ai-agent.git
cd plm-ai-agent

# 2. 安装依赖
pip install fastapi uvicorn python-dotenv

# 3. 启动服务（无需 API Key 也能跑 Demo）
python server.py

# 4. 打开浏览器
http://localhost:8765
```

## 👥 角色与用户故事

| 角色 | 核心工作流 |
|------|------|
| 🎨 **选品设计师** | Tech Pack 结构化输入 → Agent 协同选品 → 审核方案 → 提交审批 |
| 📦 **供应链专员** | 成本审批 → 物料 BOM 管理 → 工厂产能管控 → MOQ 拦截 |
| 📊 **运营复盘** | 销售数据看板 → 预测 vs 实际对比 → 生成复盘报告 |
| ⚙️ **AI 管理员** | 工作流编排 → Agent 监控 → MCP 配置 → 用户权限管理 |

> 完整用户故事文档：[USER_STORIES.md](docs/USER_STORIES.md)

## 📂 项目结构

```
plm-ai-agent/
├── agent/              # 5 个 Agent 模块
│   ├── planner.py      # 🧠 总管规划 Agent
│   ├── trend.py        # 🔍 趋势检索 Agent
│   ├── plm_data.py     # 📊 PLM 数据 Agent
│   ├── design.py       # 🎨 多模态设计 Agent
│   └── supply_chain.py # 💰 供应链校验 Agent
├── memory/             # 三层 Memory 架构
│   ├── session.py      # 会话记忆 (Redis)
│   └── long_term.py    # 长期事件记忆 (Mem0 + Milvus)
├── mcp-servers/        # MCP 工具协议骨架
├── frontend/           # 前端 SPA
│   └── index.html      # 单文件 4角色16页面完整应用
├── docs/               # 文档
│   ├── PLM-Agent-Solution.pdf    # 56 页技术方案 PPT
│   ├── 星谷云-面谈自我介绍.pptx   # 面谈 PPT
│   ├── 星谷云-面谈准备手册.pdf    # 面谈准备手册
│   └── USER_STORIES.md           # 完整用户故事文档
├── server.py           # FastAPI 入口
├── demo.py             # CLI Demo
└── requirements.txt
```

## 📄 相关文档

- [56 页完整技术方案 PPT](docs/PLM-Agent-Solution.pdf)
- [15 个用户故事 & 操作场景](docs/USER_STORIES.md)
- [MIT 开源协议](LICENSE)

## 📝 License

MIT © 2026 马永
