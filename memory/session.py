"""会话记忆 — Redis存储（Demo用内存模拟）"""

from datetime import timedelta
import json

class SessionMemory:
    """整轮选品任务的上下文和中间结果存储"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        # Demo模式：使用内存存储，生产环境使用Redis
        self.store = {}
        self.use_redis = False  # Demo mode
    
    def save_session(self, session_id: str, data: dict, ttl_hours: int = 168):
        if self.use_redis:
            import redis
            r = redis.from_url(self.redis_url)
            r.setex(f"session:{session_id}", timedelta(hours=ttl_hours),
                    json.dumps(data, default=str))
        else:
            self.store[session_id] = data
    
    def get_session(self, session_id: str) -> dict:
        if self.use_redis:
            import redis
            r = redis.from_url(self.redis_url)
            raw = r.get(f"session:{session_id}")
            return json.loads(raw) if raw else {}
        return self.store.get(session_id, {})
    
    def clear(self, session_id: str = None):
        if session_id:
            self.store.pop(session_id, None)
        else:
            self.store.clear()
