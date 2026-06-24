#!/usr/bin/env node
/** 星谷云面谈自我介绍 — 马永 · 专业PPTX */

const pptxgen = require("pptxgenjs");

const C = {
  navy:"065A82", teal:"1C7293", midnight:"21295C", white:"FFFFFF",
  offWhite:"F0F6FA", light:"E8F1F8", accent:"E8A838",
  green:"059669", red:"DC2626", gray:"64748B", dark:"1E293B", ice:"B8D8E8",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "马永";
pres.title = "马永 · 面谈自我介绍 - 星谷云";

function navyBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.06, fill:{color:C.navy} });
}
function sectionTitle(slide, text) {
  slide.addText(text, { x:0.6, y:0.3, w:8, h:0.7, fontSize:30, fontFace:"Calibri", bold:true, color:C.navy });
  slide.addShape(pres.shapes.RECTANGLE, { x:0.6, y:0.95, w:1.2, h:0.04, fill:{color:C.accent} });
}
function card(slide, x, y, w, h, accent) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill:{color:C.offWhite}, shadow:{type:"outer",blur:3,offset:1,color:"000000",opacity:0.07} });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.04, fill:{color:accent||C.accent} });
}
function pill(slide, x, y, w, text, bg) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h:0.5, fill:{color:bg||C.navy} });
  slide.addText(text, { x, y, w, h:0.5, fontSize:11, fontFace:"Calibri", bold:true, color:C.white, align:"center", valign:"middle", margin:0 });
}

// ====== SLIDE 1: COVER ======
let s1 = pres.addSlide();
s1.background = { color: C.midnight };
s1.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.12, fill:{color:C.accent} });
s1.addShape(pres.shapes.RECTANGLE, { x:0, y:0.12, w:10, h:2.3, fill:{color:C.navy} });
s1.addShape(pres.shapes.RECTANGLE, { x:0, y:2.42, w:10, h:3.21, fill:{color:C.offWhite} });
s1.addText("马 永", { x:0.8, y:0.4, w:8, h:1.1, fontSize:52, fontFace:"Calibri", bold:true, color:C.white, charSpacing:12 });
s1.addText("20年B端经验 · 会展行业深度理解 · AI Agent 实操能力", { x:0.8, y:1.5, w:8, h:0.5, fontSize:15, color:C.ice });
s1.addText("面 谈 自 我 介 绍", { x:0.8, y:3.0, w:8, h:0.6, fontSize:24, fontFace:"Calibri", bold:true, color:C.navy, charSpacing:10 });
s1.addText("星谷云 · 2026年6月 · 深圳", { x:0.8, y:3.8, w:8, h:0.4, fontSize:13, color:C.gray });

// ====== SLIDE 2: 我对星谷云的理解 ======
let s2 = pres.addSlide(); s2.background = { color: C.white }; navyBar(s2);
sectionTitle(s2, "我对星谷云的理解");
const cards2 = [
  { title:"15年深耕", sub:"2010年成立·5000+客户\n总部上海·100+代理商\nGoogle/Facebook/TikTok合作", x:0.4 },
  { title:"11个AI智能体", sub:"独立站专家·社媒运营·短视频\nAI外贸人(24h多语种)\nAI展会营销(会展专项)", x:2.7 },
  { title:"客户价值·降本增效", sub:"传统6人120-200万/年\n→ AI方案10-20万/年\n效率提升6x+·询盘+50%", x:5.0 },
  { title:"虚拟出海营销组织", sub:"不是工具，是AI员工团队\nAI做重复的，人做高级的\n深度嵌入业务全流程", x:7.3 },
];
cards2.forEach(c => {
  card(s2, c.x, 1.2, 2.2, 2.3, C.teal);
  s2.addText(c.title, { x:c.x+0.1, y:1.3, w:2.0, h:0.3, fontSize:14, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
  s2.addText(c.sub, { x:c.x+0.1, y:1.7, w:2.0, h:1.6, fontSize:10, color:C.gray, fontFace:"Calibri", lineSpacingMultiple:1.5, margin:0 });
});
pill(s2, 0.4, 3.7, 9.2, '"AI做重复低效的事，人做更高级的事" — 星谷云核心价值观', C.midnight);

// ====== SLIDE 3: 会展经验 × AI展会营销 ======
let s3 = pres.addSlide(); s3.background = { color: C.white }; navyBar(s3);
sectionTitle(s3, "核心匹配：会展经验 × AI展会营销");
card(s3, 0.4, 1.2, 4.4, 3.0, C.navy);
s3.addText("🏗️  我的会展行业经验", { x:0.6, y:1.35, w:4, h:0.3, fontSize:16, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
s3.addText([
  { text:"▸ 九象展览科技 · 产品总监(4年)", options:{breakLine:true} },
  { text:"▸ 服务法国智奥集团(GL Events)中国区", options:{breakLine:true} },
  { text:"▸ 驻场广州保利、重庆科学会堂等10+场馆", options:{breakLine:true} },
  { text:"▸ CIBF电池展等10+主办展会服务", options:{breakLine:true} },
  { text:"▸ 攻克业财一体化+ERP打通难题", options:{breakLine:true} },
  { text:"▸ 年实收1,200万+ · 利润率35%+", options:{breakLine:true} },
], { x:0.8, y:1.8, w:3.8, h:2.2, fontSize:12, color:C.dark, fontFace:"Calibri", lineSpacingMultiple:1.5, margin:0 });
card(s3, 5.2, 1.2, 4.4, 3.0, C.accent);
s3.addText("🚀  星谷云 AI展会营销", { x:5.4, y:1.35, w:4, h:0.3, fontSize:16, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
s3.addText([
  { text:"▸ 展前：AI精准展商挖掘+多语种邀约", options:{breakLine:true} },
  { text:"▸ 展中：展馆5-10km AI广告+扫码留资", options:{breakLine:true} },
  { text:"▸ 展后：AI线索分级+客户资产沉淀", options:{breakLine:true} },
  { text:"▸ 已落地：米奥兰特·华东交易会等", options:{breakLine:true} },
  { text:"▸ 欧洲储能展90+有效询盘", options:{breakLine:true} },
  { text:"▸ UzBuild中亚建材展3.5万+覆盖", options:{breakLine:true} },
], { x:5.4, y:1.8, w:4.0, h:2.2, fontSize:12, color:C.dark, fontFace:"Calibri", lineSpacingMultiple:1.5, margin:0 });
pill(s3, 0.4, 4.4, 9.2, '"展览公司招商有多难，我最清楚。AI展会营销产品，我不用培训就能卖。"', C.navy);

// ====== SLIDE 4: AI Agent 实操 ======
let s4 = pres.addSlide(); s4.background = { color: C.white }; navyBar(s4);
sectionTitle(s4, "AI Agent 实操能力 — 开源项目证明");
card(s4, 0.4, 1.2, 5.2, 3.5, C.navy);
s4.addText("PLM AI Agent 开源项目", { x:0.6, y:1.35, w:4.8, h:0.35, fontSize:20, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
s4.addText("github.com/yongmababa-pixel/plm-ai-agent", { x:0.6, y:1.7, w:4.8, h:0.25, fontSize:10, color:C.teal, margin:0 });
s4.addText("MIT开源 · 56页技术方案PPT · 4角色16页面 · 独立全栈开发", { x:0.6, y:1.95, w:4.8, h:0.2, fontSize:9, color:C.gray, margin:0 });
s4.addText([
  { text:"LangGraph 多智能体编排 (5类Agent协同)", options:{bullet:true, breakLine:true} },
  { text:"MCP 工具协议 (标准化Agent-系统交互)", options:{bullet:true, breakLine:true} },
  { text:"三层 Memory架构 (工作/会话/长期记忆)", options:{bullet:true, breakLine:true} },
  { text:"FastAPI + WebSocket 实时Agent可视化", options:{bullet:true, breakLine:true} },
  { text:"Coze风格工作流画布 · 拖拽编排Agent", options:{bullet:true} },
], { x:0.8, y:2.3, w:4.6, h:2.2, fontSize:12, color:C.dark, fontFace:"Calibri", lineSpacingMultiple:1.4, margin:0 });
// Right: value
s4.addShape(pres.shapes.RECTANGLE, { x:6.0, y:1.2, w:3.6, h:3.5, fill:{color:C.midnight} });
s4.addText("这对星谷云意味着", { x:6.2, y:1.4, w:3.2, h:0.35, fontSize:14, fontFace:"Calibri", bold:true, color:C.accent, margin:0 });
s4.addText([
  { text:"不是\"了解AI\"", options:{bold:true, breakLine:true, color:C.accent} },
  { text:"是亲自设计+开发了Multi-Agent系统", options:{breakLine:true, breakLine:true, color:C.white} },
  { text:"客户问技术原理", options:{bold:true, breakLine:true, color:C.accent} },
  { text:"我不用等技术，自己就能答", options:{breakLine:true, breakLine:true, color:C.white} },
  { text:"你们的MCP/Multi-Agent", options:{bold:true, breakLine:true, color:C.accent} },
  { text:"我已经实操过了", options:{color:C.white} },
], { x:6.2, y:2.0, w:3.2, h:2.5, fontSize:12, fontFace:"Calibri", lineSpacingMultiple:1.6, margin:0 });

// ====== SLIDE 5: 销售+KA经验 ======
let s5 = pres.addSlide(); s5.background = { color: C.white }; navyBar(s5);
sectionTitle(s5, "销售与KA客户经验");
card(s5, 0.4, 1.2, 4.4, 3.5, C.navy);
s5.addText("深圳中房信息 · 副总经理", { x:0.6, y:1.35, w:4, h:0.3, fontSize:16, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
s5.addText("从0组建销售团队 · 获客→招投标→签约→回款", { x:0.6, y:1.65, w:3.8, h:0.2, fontSize:10, color:C.gray, margin:0 });
["建设银行","税务总局","中国移动"].forEach((n,i) => {
  s5.addShape(pres.shapes.RECTANGLE, { x:0.6+i*1.45, y:2.1, w:1.3, h:0.7, fill:{color:C.white}, shadow:{type:"outer",blur:2,offset:1,color:"000000",opacity:0.06} });
  s5.addText(n, { x:0.6+i*1.45, y:2.1, w:1.3, h:0.7, fontSize:12, fontFace:"Calibri", bold:true, color:C.navy, align:"center", valign:"middle", margin:0 });
});
s5.addText("▸ 服务30家一级评估机构 · 覆盖21省", { x:0.6, y:3.0, w:3.8, h:0.25, fontSize:11, color:C.dark, margin:0 });
s5.addText("▸ 累计签约数千万元 · 多轮资本引入", { x:0.6, y:3.3, w:3.8, h:0.25, fontSize:11, color:C.gray, margin:0 });
s5.addText("▸ 产品→市场→数据反哺→盈利闭环", { x:0.6, y:3.55, w:3.8, h:0.25, fontSize:11, color:C.gray, margin:0 });
card(s5, 5.2, 1.2, 4.4, 3.5, C.accent);
s5.addText("九象展览 · 产品总监", { x:5.4, y:1.35, w:4, h:0.3, fontSize:16, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
s5.addText("主导招投标全流程 · 方案+报价+述标答辩", { x:5.4, y:1.65, w:3.8, h:0.2, fontSize:10, color:C.gray, margin:0 });
["广州保利","重庆科学会堂","法国智奥"].forEach((n,i) => {
  s5.addShape(pres.shapes.RECTANGLE, { x:5.4+i*1.45, y:2.1, w:1.3, h:0.7, fill:{color:C.white}, shadow:{type:"outer",blur:2,offset:1,color:"000000",opacity:0.06} });
  s5.addText(n, { x:5.4+i*1.45, y:2.1, w:1.3, h:0.7, fontSize:12, fontFace:"Calibri", bold:true, color:C.navy, align:"center", valign:"middle", margin:0 });
});
s5.addText("▸ 中标千万级项目 · Demo+方案推动签约", { x:5.4, y:3.0, w:4, h:0.25, fontSize:11, color:C.dark, margin:0 });
s5.addText("▸ 1条产品线→3条 · 年实收1,200万+", { x:5.4, y:3.3, w:4, h:0.25, fontSize:11, color:C.gray, margin:0 });
s5.addText("▸ 拉通算法/工程/业务/销售四线团队", { x:5.4, y:3.55, w:4, h:0.25, fontSize:11, color:C.gray, margin:0 });

// ====== SLIDE 6: 我能带来什么 ======
let s6 = pres.addSlide(); s6.background = { color: C.white }; navyBar(s6);
sectionTitle(s6, "我能为星谷云带来什么");
const vals = [
  { title:"会展客户直通", sub:"我认识展览主办方、会展中心决策人。AI展会营销产品可以直接切入我的人脉圈，不用从零拓客。", x:0.4 },
  { title:"AI说服力降维", sub:"普通销售说\"AI很厉害\"，我能打开GitHub给客户看Multi-Agent怎么工作。客户信任度完全不一样。", x:3.4 },
  { title:"全流程操盘闭环", sub:"从获客到签约到回款，我自己跑通过。不需要培训销售流程，来了就能打。", x:6.4 },
];
vals.forEach(v => {
  card(s6, v.x, 1.2, 2.9, 2.5, C.navy);
  s6.addText(v.title, { x:v.x+0.1, y:1.35, w:2.7, h:0.35, fontSize:16, fontFace:"Calibri", bold:true, color:C.dark, margin:0 });
  s6.addText(v.sub, { x:v.x+0.1, y:1.85, w:2.7, h:1.5, fontSize:11, color:C.gray, fontFace:"Calibri", lineSpacingMultiple:1.5, margin:0 });
});
// Big numbers bar
s6.addShape(pres.shapes.RECTANGLE, { x:0.4, y:3.9, w:9.2, h:0.7, fill:{color:C.navy} });
const bn = [{n:"1,200万+",l:"年实收"},{n:"30家",l:"一级机构"},{n:"3条",l:"产品线"},{n:"35%+",l:"利润率"},{n:"5人",l:"团队管理"}];
bn.forEach((b,i) => {
  s6.addText(b.n, { x:0.4+i*1.85, y:3.9, w:1.7, h:0.4, fontSize:20, fontFace:"Calibri", bold:true, color:C.accent, align:"center", margin:0 });
  s6.addText(b.l, { x:0.4+i*1.85, y:4.3, w:1.7, h:0.2, fontSize:9, color:C.white, align:"center", margin:0 });
});
s6.addShape(pres.shapes.RECTANGLE, { x:0.4, y:4.7, w:9.2, h:0.04, fill:{color:C.accent} });
s6.addText("面试时我可以打开GitHub现场演示PLM AI Agent开源项目", { x:0.6, y:4.85, w:8.8, h:0.3, fontSize:11, color:C.gray, margin:0 });

// ====== SLIDE 7: 我的定位 ======
let s7 = pres.addSlide(); s7.background = { color: C.white }; navyBar(s7);
sectionTitle(s7, "我的定位");
const comps = [
  { title:"不是", label:"普通销售", desc:"只会打电话发传单", x:0.4, color:C.red },
  { title:"不是", label:"纯技术人员", desc:"只懂代码不懂客户", x:3.83, color:C.red },
  { title:"我是", label:"懂行业的AI销售", desc:"会展 + AI Agent + 销售 = 三合一", x:7.27, color:C.green },
];
comps.forEach(c => {
  const w = 3.03;
  card(s7, c.x, 1.2, w, 2.6, c.color);
  s7.addText(c.title, { x:c.x+0.1, y:1.35, w:w-0.2, h:0.3, fontSize:13, color:C.gray, fontFace:"Calibri", align:"center", margin:0 });
  s7.addText(c.label, { x:c.x+0.1, y:1.8, w:w-0.2, h:0.5, fontSize:22, fontFace:"Calibri", bold:true, color:c.color, align:"center", margin:0 });
  s7.addText(c.desc, { x:c.x+0.1, y:2.6, w:w-0.2, h:0.5, fontSize:11, color:C.gray, align:"center", margin:0 });
});
// Keywords
const kws = [{t:"🏗️ 会展行业专家",x:0.6},{t:"🤖 AI Agent实操者",x:4.0},{t:"💼 B端全流程销售",x:7.4}];
kws.forEach(k => {
  pill(s7, k.x, 4.2, 2.8, k.t);
});
s7.addText("星谷云需要的不是会打电话的人，而是能跟展览公司老板聊行业痛点、能跟技术团队聊AI架构、能独立完成从获客到签约全流程的人。这就是我。", { x:0.6, y:4.9, w:8.8, h:0.5, fontSize:11, color:C.gray, italic:true, margin:0 });

// ====== SLIDE 8: ENDING ======
let s8 = pres.addSlide();
s8.background = { color: C.midnight };
s8.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:10, h:0.12, fill:{color:C.accent} });
s8.addShape(pres.shapes.RECTANGLE, { x:0, y:0.12, w:10, h:3.5, fill:{color:C.navy} });
s8.addShape(pres.shapes.RECTANGLE, { x:0, y:3.62, w:10, h:2.01, fill:{color:C.midnight} });
s8.addText("期待加入星谷云", { x:0.8, y:1.0, w:8.4, h:0.9, fontSize:40, fontFace:"Calibri", bold:true, color:C.white, align:"center", margin:0 });
s8.addText("用AI助力中国企业出海 · 这是我认同的事业", { x:0.8, y:2.0, w:8.4, h:0.5, fontSize:16, color:C.ice, align:"center", margin:0 });
// Contacts
const cts = ["📱 18503016885", "📧 44484660@qq.com", "🔗 github.com/yongmababa-pixel"];
cts.forEach((c,i) => {
  s8.addText(c, { x:1.5+i*2.5, y:4.0, w:2.3, h:0.3, fontSize:11, color:C.ice, align:"center", margin:0 });
});
s8.addText("感谢您的时间 · 期待共事", { x:0.8, y:4.7, w:8.4, h:0.4, fontSize:13, color:C.gray, align:"center", margin:0 });

// Write
const outPath = "/Users/kuma/plm-ai-agent/docs/星谷云-面谈自我介绍.pptx";
await pres.writeFile({ fileName: outPath });
console.log("✅ PPTX generated: " + outPath);
