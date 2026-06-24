#!/usr/bin/env node
const pptxgen = require("pptxgenjs");

const C={navy:"065A82",teal:"1C7293",midnight:"21295C",white:"FFFFFF",offWhite:"F0F6FA",light:"E8F1F8",accent:"E8A838",green:"059669",red:"DC2626",gray:"64748B",dark:"1E293B",ice:"B8D8E8"};
const pres=new pptxgen();
pres.layout="LAYOUT_16x9";pres.author="马永";pres.title="马永·面谈自我介绍-星谷云";

function bar(s){s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.06,fill:{color:C.navy}})}
function title(s,t){s.addText(t,{x:0.6,y:0.3,w:8,h:0.7,fontSize:30,fontFace:"Calibri",bold:true,color:C.navy});s.addShape(pres.shapes.RECTANGLE,{x:0.6,y:0.95,w:1.2,h:0.04,fill:{color:C.accent}})}
function card(s,x,y,w,h,c){s.addShape(pres.shapes.RECTANGLE,{x,y,w,h,fill:{color:C.offWhite},shadow:{type:"outer",blur:3,offset:1,color:"000000",opacity:0.07}});s.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.04,fill:{color:c||C.accent}})}
function pill(s,x,y,w,t,bg){s.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.5,fill:{color:bg||C.navy}});s.addText(t,{x,y,w,h:0.5,fontSize:11,fontFace:"Calibri",bold:true,color:C.white,align:"center",valign:"middle",margin:0})}
function clientBox(s,x,y,w,n){s.addShape(pres.shapes.RECTANGLE,{x,y,w,h:0.7,fill:{color:C.white},shadow:{type:"outer",blur:2,offset:1,color:"000000",opacity:0.06}});s.addText(n,{x,y,w,h:0.7,fontSize:12,fontFace:"Calibri",bold:true,color:C.navy,align:"center",valign:"middle",margin:0})}

async function main(){
// S1: COVER
let s=pres.addSlide();s.background={color:C.midnight};s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.12,fill:{color:C.accent}});s.addShape(pres.shapes.RECTANGLE,{x:0,y:0.12,w:10,h:2.3,fill:{color:C.navy}});s.addShape(pres.shapes.RECTANGLE,{x:0,y:2.42,w:10,h:3.21,fill:{color:C.offWhite}});s.addText("马 永",{x:0.8,y:0.4,w:8,h:1.1,fontSize:52,fontFace:"Calibri",bold:true,color:C.white,charSpacing:12});s.addText("20年B端经验·会展行业深度理解·AI Agent实操能力",{x:0.8,y:1.5,w:8,h:0.5,fontSize:15,color:C.ice});s.addText("面 谈 自 我 介 绍",{x:0.8,y:3.0,w:8,h:0.6,fontSize:24,fontFace:"Calibri",bold:true,color:C.navy,charSpacing:10});s.addText("星谷云·2026年6月·深圳",{x:0.8,y:3.8,w:8,h:0.4,fontSize:13,color:C.gray});

// S2: 我对星谷云的理解
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"我对星谷云的理解");
[{t:"15年深耕",b:"2010年成立·5000+客户\n总部上海·100+代理商\nGoogle/Facebook/TikTok合作",x:0.4},{t:"11个AI智能体",b:"独立站专家·社媒运营·短视频\nAI外贸人(24h多语种)\nAI展会营销(会展专项)",x:2.7},{t:"客户价值·降本增效",b:"传统6人120-200万/年\n→AI方案10-20万/年\n效率提升6x+·询盘+50%",x:5.0},{t:"虚拟出海营销组织",b:"不是工具，是AI员工团队\nAI做重复的，人做高级的\n深度嵌入业务全流程",x:7.3}].forEach(c=>{card(s,c.x,1.2,2.2,2.3,C.teal);s.addText(c.t,{x:c.x+0.1,y:1.3,w:2.0,h:0.3,fontSize:14,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText(c.b,{x:c.x+0.1,y:1.7,w:2.0,h:1.6,fontSize:10,color:C.gray,fontFace:"Calibri",lineSpacingMultiple:1.5,margin:0})});
pill(s,0.4,3.7,9.2,'"AI做重复低效的事，人做更高级的事"',C.midnight);

// S3: 会展经验×AI展会营销
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"核心匹配：会展经验×AI展会营销");
card(s,0.4,1.2,4.4,3.0,C.navy);s.addText("🏗️ 我的会展行业经验",{x:0.6,y:1.35,w:4,h:0.3,fontSize:16,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText([{text:"▸ 九象展览科技·产品总监(4年)",options:{breakLine:true}},{text:"▸ 服务法国智奥集团(GL Events)中国区",options:{breakLine:true}},{text:"▸ 驻场广州保利/重庆科学会堂等10+场馆",options:{breakLine:true}},{text:"▸ CIBF电池展等10+主办展会服务",options:{breakLine:true}},{text:"▸ 攻克业财一体化+ERP打通难题",options:{breakLine:true}},{text:"▸ 年实收1,200万+·利润率35%+",options:{breakLine:true}}],{x:0.8,y:1.8,w:3.8,h:2.2,fontSize:12,color:C.dark,fontFace:"Calibri",lineSpacingMultiple:1.5,margin:0});
card(s,5.2,1.2,4.4,3.0,C.accent);s.addText("🚀 星谷云AI展会营销",{x:5.4,y:1.35,w:4,h:0.3,fontSize:16,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText([{text:"▸ 展前：AI精准展商挖掘+多语种邀约",options:{breakLine:true}},{text:"▸ 展中：展馆5-10km AI广告+扫码留资",options:{breakLine:true}},{text:"▸ 展后：AI线索分级+客户资产沉淀",options:{breakLine:true}},{text:"▸ 已落地：米奥兰特·华东交易会等",options:{breakLine:true}},{text:"▸ 欧洲储能展90+有效询盘",options:{breakLine:true}},{text:"▸ UzBuild中亚建材展3.5万+覆盖",options:{breakLine:true}}],{x:5.4,y:1.8,w:4.0,h:2.2,fontSize:12,color:C.dark,fontFace:"Calibri",lineSpacingMultiple:1.5,margin:0});
pill(s,0.4,4.4,9.2,'"展览公司招商有多难，我最清楚。AI展会营销产品，我不用培训就能卖。"',C.navy);

// S4: AI Agent
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"AI Agent实操能力—开源项目证明");
card(s,0.4,1.2,5.2,3.5,C.navy);s.addText("PLM AI Agent开源项目",{x:0.6,y:1.35,w:4.8,h:0.35,fontSize:20,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText("github.com/yongmababa-pixel/plm-ai-agent",{x:0.6,y:1.7,w:4.8,h:0.25,fontSize:10,color:C.teal,margin:0});s.addText("MIT开源·56页技术方案·4角色16页面·独立全栈",{x:0.6,y:1.95,w:4.8,h:0.2,fontSize:9,color:C.gray,margin:0});s.addText([{text:"LangGraph多智能体编排(5类Agent协同)",options:{bullet:true,breakLine:true}},{text:"MCP工具协议(标准化Agent-系统交互)",options:{bullet:true,breakLine:true}},{text:"三层Memory架构(工作/会话/长期记忆)",options:{bullet:true,breakLine:true}},{text:"FastAPI+WebSocket实时Agent可视化",options:{bullet:true,breakLine:true}},{text:"Coze风格工作流画布·拖拽编排Agent",options:{bullet:true}}],{x:0.8,y:2.3,w:4.6,h:2.2,fontSize:12,color:C.dark,fontFace:"Calibri",lineSpacingMultiple:1.4,margin:0});
s.addShape(pres.shapes.RECTANGLE,{x:6.0,y:1.2,w:3.6,h:3.5,fill:{color:C.midnight}});s.addText("对星谷云意味着",{x:6.2,y:1.4,w:3.2,h:0.35,fontSize:14,fontFace:"Calibri",bold:true,color:C.accent,margin:0});s.addText([{text:'不是"了解AI"',options:{bold:true,breakLine:true,color:C.accent}},{text:"是亲自设计+开发了Multi-Agent系统",options:{breakLine:true,breakLine:true,color:C.white}},{text:"客户问技术原理",options:{bold:true,breakLine:true,color:C.accent}},{text:"我不用等技术，自己就能答",options:{breakLine:true,breakLine:true,color:C.white}},{text:"你们的MCP/Multi-Agent",options:{bold:true,breakLine:true,color:C.accent}},{text:"我已经实操过了",options:{color:C.white}}],{x:6.2,y:2.0,w:3.2,h:2.5,fontSize:12,fontFace:"Calibri",lineSpacingMultiple:1.6,margin:0});

// S5: 销售KA经验
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"销售与KA客户经验");
card(s,0.4,1.2,4.4,3.5,C.navy);s.addText("深圳中房信息·副总经理",{x:0.6,y:1.35,w:4,h:0.3,fontSize:16,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText("从0组建销售团队·获客→招投标→签约→回款",{x:0.6,y:1.65,w:3.8,h:0.2,fontSize:10,color:C.gray,margin:0});["建设银行","税务总局","中国移动"].forEach((n,i)=>{clientBox(s,0.6+i*1.45,2.1,1.3,n)});s.addText("▸ 服务30家一级评估机构·覆盖21省",{x:0.6,y:3.0,w:3.8,h:0.25,fontSize:11,color:C.dark,margin:0});s.addText("▸ 累计签约数千万元·多轮资本引入",{x:0.6,y:3.3,w:3.8,h:0.25,fontSize:11,color:C.gray,margin:0});s.addText("▸ 产品→市场→数据反哺→盈利闭环",{x:0.6,y:3.55,w:3.8,h:0.25,fontSize:11,color:C.gray,margin:0});
card(s,5.2,1.2,4.4,3.5,C.accent);s.addText("九象展览·产品总监",{x:5.4,y:1.35,w:4,h:0.3,fontSize:16,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText("主导招投标全流程·方案+报价+述标答辩",{x:5.4,y:1.65,w:3.8,h:0.2,fontSize:10,color:C.gray,margin:0});["广州保利","重庆科学会堂","法国智奥"].forEach((n,i)=>{clientBox(s,5.4+i*1.45,2.1,1.3,n)});s.addText("▸ 中标千万级项目·Demo+方案推动签约",{x:5.4,y:3.0,w:4,h:0.25,fontSize:11,color:C.dark,margin:0});s.addText("▸ 1条产品线→3条·年实收1,200万+",{x:5.4,y:3.3,w:4,h:0.25,fontSize:11,color:C.gray,margin:0});s.addText("▸ 拉通算法/工程/业务/销售四线团队",{x:5.4,y:3.55,w:4,h:0.25,fontSize:11,color:C.gray,margin:0});

// S6: 我能带来什么
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"我能为星谷云带来什么");
[{t:"会展客户直通",b:"认识展览主办方、会展中心决策人。AI展会营销产品可直接切入人脉圈，不用从零拓客。",x:0.4},{t:"AI说服力降维",b:'普通销售说"AI很厉害"，我能开GitHub给客户看Multi-Agent怎么工作。信任度完全不同。',x:3.4},{t:"全流程操盘闭环",b:"从获客到签约到回款，我自己跑通过。不需培训销售流程，来了就能打。",x:6.4}].forEach(v=>{card(s,v.x,1.2,2.9,2.5,C.navy);s.addText(v.t,{x:v.x+0.1,y:1.35,w:2.7,h:0.35,fontSize:16,fontFace:"Calibri",bold:true,color:C.dark,margin:0});s.addText(v.b,{x:v.x+0.1,y:1.85,w:2.7,h:1.5,fontSize:11,color:C.gray,fontFace:"Calibri",lineSpacingMultiple:1.5,margin:0})});
s.addShape(pres.shapes.RECTANGLE,{x:0.4,y:3.9,w:9.2,h:0.7,fill:{color:C.navy}});[{n:"1,200万+",l:"年实收"},{n:"30家",l:"一级机构"},{n:"3条",l:"产品线"},{n:"35%+",l:"利润率"},{n:"5人",l:"团队管理"}].forEach((b,i)=>{s.addText(b.n,{x:0.4+i*1.85,y:3.9,w:1.7,h:0.4,fontSize:20,fontFace:"Calibri",bold:true,color:C.accent,align:"center",margin:0});s.addText(b.l,{x:0.4+i*1.85,y:4.3,w:1.7,h:0.2,fontSize:9,color:C.white,align:"center",margin:0})});
s.addShape(pres.shapes.RECTANGLE,{x:0.4,y:4.7,w:9.2,h:0.04,fill:{color:C.accent}});s.addText("面试时可以现场打开GitHub演示PLM AI Agent开源项目",{x:0.6,y:4.85,w:8.8,h:0.3,fontSize:11,color:C.gray,margin:0});

// S7: 我的定位
s=pres.addSlide();s.background={color:C.white};bar(s);title(s,"我的定位");
[{t:"不是",l:"普通销售",d:"只会打电话发传单",x:0.4,c:C.red},{t:"不是",l:"纯技术人员",d:"只懂代码不懂客户",x:3.83,c:C.red},{t:"我是",l:"懂行业的AI销售",d:"会展+AI Agent+销售=三合一",x:7.27,c:C.green}].forEach(c=>{const w=3.03;card(s,c.x,1.2,w,2.6,c.c);s.addText(c.t,{x:c.x+0.1,y:1.35,w:w-0.2,h:0.3,fontSize:13,color:C.gray,fontFace:"Calibri",align:"center",margin:0});s.addText(c.l,{x:c.x+0.1,y:1.8,w:w-0.2,h:0.5,fontSize:22,fontFace:"Calibri",bold:true,color:c.c,align:"center",margin:0});s.addText(c.d,{x:c.x+0.1,y:2.6,w:w-0.2,h:0.5,fontSize:11,color:C.gray,align:"center",margin:0})});
[{t:"🏗️ 会展行业专家",x:0.6},{t:"🤖 AI Agent实操者",x:4.0},{t:"💼 B端全流程销售",x:7.4}].forEach(k=>pill(s,k.x,4.2,2.8,k.t));
s.addText("星谷云需要的不是会打电话的人，而是能跟展览公司老板聊行业痛点、能跟技术团队聊AI架构、能独立完成从获客到签约全流程的人。这就是我。",{x:0.6,y:4.9,w:8.8,h:0.5,fontSize:11,color:C.gray,italic:true,margin:0});

// S8: ENDING
s=pres.addSlide();s.background={color:C.midnight};s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.12,fill:{color:C.accent}});s.addShape(pres.shapes.RECTANGLE,{x:0,y:0.12,w:10,h:3.5,fill:{color:C.navy}});s.addShape(pres.shapes.RECTANGLE,{x:0,y:3.62,w:10,h:2.01,fill:{color:C.midnight}});s.addText("期待加入星谷云",{x:0.8,y:1.0,w:8.4,h:0.9,fontSize:40,fontFace:"Calibri",bold:true,color:C.white,align:"center",margin:0});s.addText("用AI助力中国企业出海·这是我认同的事业",{x:0.8,y:2.0,w:8.4,h:0.5,fontSize:16,color:C.ice,align:"center",margin:0});
["📱 18503016885","📧 44484660@qq.com","🔗 github.com/yongmababa-pixel"].forEach((c,i)=>{s.addText(c,{x:1.5+i*2.5,y:4.0,w:2.3,h:0.3,fontSize:11,color:C.ice,align:"center",margin:0})});
s.addText("感谢您的时间·期待共事",{x:0.8,y:4.7,w:8.4,h:0.4,fontSize:13,color:C.gray,align:"center",margin:0});

// FINAL
const out="/Users/kuma/plm-ai-agent/docs/星谷云-面谈自我介绍.pptx";
await pres.writeFile({fileName:out});
console.log("✅ PPTX generated: "+out);
}
main().catch(e=>{console.error(e);process.exit(1)});
