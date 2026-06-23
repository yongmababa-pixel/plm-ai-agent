"""PLM数据Agent — 查询历史销售/退货/成本数据（模拟MCP数据库工具）"""

class PLMDataAgent:
    async def query_historical(self, category: str = "牛仔") -> dict:
        """查询PLM历史数据（模拟MCP数据库查询）"""
        
        return {
            "bestsellers": [
                {
                    "style_id": "SJ2026-001",
                    "name": "高腰阔腿牛仔裤",
                    "sales_14d": 15230,
                    "return_rate": 0.03,
                    "unit_cost": 28.5,
                    "profit_margin": 0.42
                },
                {
                    "style_id": "SJ2026-008",
                    "name": "A字显瘦牛仔短裤",
                    "sales_14d": 12100,
                    "return_rate": 0.05,
                    "unit_cost": 22.0,
                    "profit_margin": 0.45
                },
                {
                    "style_id": "SJ2026-015",
                    "name": "毛边磨破热裤",
                    "sales_14d": 10800,
                    "return_rate": 0.04,
                    "unit_cost": 25.0,
                    "profit_margin": 0.38
                },
                {
                    "style_id": "SJ2026-022",
                    "name": "工装口袋短裤",
                    "sales_14d": 9500,
                    "return_rate": 0.06,
                    "unit_cost": 30.0,
                    "profit_margin": 0.35
                },
                {
                    "style_id": "SJ2026-030",
                    "name": "弹力修身牛仔短裤",
                    "sales_14d": 8200,
                    "return_rate": 0.02,
                    "unit_cost": 20.0,
                    "profit_margin": 0.50
                },
            ],
            "fabric_costs": {
                "弹力牛仔": 12.5,
                "天丝牛仔": 15.0,
                "全棉牛仔": 10.0,
                "辅料（拉链/纽扣/铆钉）": 3.2,
                "水洗工艺": 5.0,
                "磨破工艺（附加）": 3.0,
                "刺绣工艺（附加）": 4.0
            },
            "factory_info": {
                "min_order_qty": 500,
                "lead_time_days": 15,
                "location": "广州番禺"
            }
        }
