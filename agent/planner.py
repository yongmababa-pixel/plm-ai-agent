#!/usr/bin/env python3
"""总管规划Agent — 解析需求，拆解子任务，动态编排"""

import json
import re
from typing import Optional


class PlannerAgent:
    """总管Agent：分析自然语言需求，生成结构化执行计划"""
    
    def __init__(self, llm):
        self.llm = llm
    
    async def plan(self, user_request: str, cost_limit: float = 50) -> dict:
        """解析用户需求，拆解为可执行的子任务"""
        
        prompt = f"""你是一个服装PLM选品系统的总管Agent。设计师提出了以下需求：

"{user_request}"
成本上限：{cost_limit}元

请分析需求并拆解为以下子任务（输出JSON格式）：
1. 趋势检索：需要搜索哪些流行元素和关键词
2. PLM数据查询：需要查询哪些历史数据
3. 款式生成：需要生成什么风格/版型的款式
4. 成本约束：成本上限是{cost_limit}元

输出格式：
{{
    "category": "品类（如：牛仔短裤）",
    "season": "季节",
    "style_keywords": ["关键词1", "关键词2"],
    "subtasks": [
        {{"agent": "trend", "action": "搜索流行趋势", "params": {{...}}}},
        {{"agent": "plm_data", "action": "查询热销历史", "params": {{...}}}},
        {{"agent": "design", "action": "生成款式", "params": {{...}}}},
        {{"agent": "supply_chain", "action": "成本校验", "params": {{"limit": {cost_limit}}}}}
    ],
    "cost_limit": {cost_limit}
}}"""

        try:
            resp = self.llm.invoke(prompt)
            text = resp.content
            
            # Try to parse JSON from response
            json_match = re.search(r'\{[\s\S]*\}', text)
            if json_match:
                plan = json.loads(json_match.group())
            else:
                # Fallback: build plan from text
                plan = self._fallback_plan(user_request, cost_limit)
            
            plan.setdefault("cost_limit", cost_limit)
            plan.setdefault("category", "牛仔")
            plan.setdefault("season", "夏季")
            plan.setdefault("style_keywords", ["休闲", "时尚"])
            
            return plan
            
        except Exception as e:
            print(f"  ⚠️ Planner解析失败，使用默认计划: {e}")
            return self._fallback_plan(user_request, cost_limit)
    
    def _fallback_plan(self, user_request: str, cost_limit: float) -> dict:
        """LLM调用失败时的降级方案"""
        return {
            "category": "牛仔",
            "season": "夏季",
            "style_keywords": ["热销版型", "流行趋势"],
            "subtasks": [
                {"agent": "trend", "action": "搜索流行趋势"},
                {"agent": "plm_data", "action": "查询热销历史"},
                {"agent": "design", "action": "生成款式"},
                {"agent": "supply_chain", "action": "成本校验", "params": {"limit": cost_limit}}
            ],
            "cost_limit": cost_limit
        }
