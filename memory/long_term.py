"""长期事件记忆 — Mem0 + Milvus（Demo用内存模拟）"""

import json
from datetime import datetime

class LongTermMemory:
    """历史爆款方案、用户偏好、模型错误案例的持久化存储"""
    
    def __init__(self):
        self.memories = []  # Demo mode: 内存存储
        self.use_mem0 = False  # 生产环境使用Mem0
    
    def save_design_solution(self, solution: dict, metadata: dict):
        """保存选品方案到长期记忆"""
        entry = {
            "type": "design_solution",
            "solution": solution,
            "metadata": metadata,
            "saved_at": str(datetime.now())
        }
        self.memories.append(entry)
        
        # 生产环境：写入Mem0 + Milvus向量库
        # self.mem0.add(messages=[{"role": "assistant", "content": json.dumps(solution)}], ...)
    
    def search_similar(self, query: str, top_k: int = 5) -> list:
        """检索相似的历史方案（生产环境用Milvus向量检索）"""
        # Demo：简单的文本匹配
        results = []
        for m in self.memories:
            if query.lower() in json.dumps(m.get("solution", {}), ensure_ascii=False).lower():
                results.append(m)
        return results[:top_k]
    
    def get_all(self) -> list:
        return self.memories
