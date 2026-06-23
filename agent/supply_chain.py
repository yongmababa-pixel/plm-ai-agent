"""供应链校验Agent — 成本核算+超预算拦截+修改建议"""

class SupplyChainAgent:
    async def validate(self, design_output: dict, cost_limit: float = 50) -> dict:
        """校验所有款式方案的成本"""
        
        designs = design_output.get("designs", [])
        result = []
        
        for d in designs:
            cost = d.get("estimated_cost", 30)
            within = cost <= cost_limit
            
            item = {
                **d,
                "within_budget": within,
                "cost_breakdown": {
                    "fabric": round(cost * 0.45, 1),
                    "accessories": round(cost * 0.12, 1),
                    "processing": round(cost * 0.25, 1),
                    "packaging": round(cost * 0.08, 1),
                    "overhead": round(cost * 0.10, 1),
                }
            }
            
            if not within:
                item["suggestion"] = (
                    f"超预算 {round(cost - cost_limit, 1)} 元。建议："
                    f"1) 更换为普通牛仔面料（节省{round(cost*0.1,1)}元）"
                    f"2) 取消磨破工艺（节省3元）"
                    f"3) 简化辅料配置（节省{round(cost*0.05,1)}元）"
                )
            else:
                item["suggestion"] = "成本在预算内，可进入生产"
            
            result.append(item)
        
        return {"designs": result, "total_checked": len(result)}
