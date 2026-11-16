const PROJECTS = {
  'dianxiaomi-agent': {mark:'ALIBABA / AI PRODUCT', title:'阿里巴巴\nAI 客服Agent', lead:'用户带着一件要处理的事来。产品要证明事情怎样往前走。', tags:['可信闭环','商家配置','服务交付'], image:'service-closure.svg', next:'parrot-service', nextName:'拼多多智能客服系统'},
  'parrot-service': {mark:'PINDUODUO / 2019—2024', title:'拼多多\n智能客服系统', lead:'从 0 到 1 做智能客服，也从单个功能走向完整的服务产品。', tags:['产品经历','智能客服','消费者服务体验'], image:'parrot-system.svg', next:'xiaoba-home', nextName:'小八 · 鹦鹉之家'},
  'xiaoba-home': {mark:'A PERSONAL STORY / XIAO BA', title:'小八 ·\n鹦鹉之家', lead:'先有一只鸟，才有一个品牌。', tags:['绿颊锥尾鹦鹉','角色设计','保护品牌'], image:'xiaoba-brand.svg', next:'aurora-music', nextName:'AI 音乐播放器的创造手记'},
  'aurora-music': {mark:'SOUND / MOOD / ATMOSPHERE', title:'Aurora\nMusic', lead:'给音乐一个空间，而不只是一张歌单。', tags:['个人音乐实验','声音可视化','浏览器体验'], image:'aurora-player.png', next:'dianxiaomi-agent', nextName:'阿里巴巴 AI 客服Agent'}
};
const figure=(file,alt,caption='')=>`<figure class="project-figure"><img src="../../assets/${file}" alt="${alt}" loading="lazy">${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`;
const section=(label,title,body,cls='')=>`<section class="case-section ${cls}"><header><span class="project-kicker">${label}</span><h2>${title}</h2></header><div class="case-content">${body}</div></section>`;
const CASES = {
  'dianxiaomi-agent': `
    <div class="case-intro"><span>我的工作</span><p>我关注售后、发货物流、商家配置与辅助服务。它们连接着同一个问题：能力如何进入真实服务，商家怎样控制，结果怎样确认。我的工作从业务与会话分析开始，进入需求澄清、产品设计和验证。</p></div>
    ${section('THREE DIFFERENT TASKS','会解释、会执行、能判责，<br>不能用一个功能名概括。',`<p class="section-lead">从三个具体任务，拆开服务的前提与完成证据。</p><div class="scenario-tabs" role="tablist" aria-label="售后场景"><button role="tab" id="tab-installation" aria-controls="scenarioPanel" aria-selected="true" data-scenario="installation">安装服务</button><button role="tab" id="tab-quality" aria-controls="scenarioPanel" aria-selected="false" data-scenario="quality" tabindex="-1">质量与判责</button><button role="tab" id="tab-ticket" aria-controls="scenarioPanel" aria-selected="false" data-scenario="ticket" tabindex="-1">工单接续</button></div><div id="scenarioPanel" role="tabpanel" aria-labelledby="tab-installation" class="scenario-panel"></div>`,'scenario-section')}
    ${section('DIAGNOSIS TO ACTION','归因不是给样本贴标签。<br>是找到谁能改变问题。',`<div class="diagnosis-flow"><div><span>事实</span><h3>先找对分析单位</h3><p>看完整会话，还是定位一次触发？对话轮次、当前状态与当时配置，需要回到同一条证据链。</p></div><div><span>区别</span><h3>分开不同根因</h3><p>知识缺失、有知识未召回、条件未满足和执行失败，不能都交给同一种修复动作。</p></div><div><span>行动</span><h3>补上责任转换</h3><p>明确可改变的环节、推动者、动作和验收。系统记录与模型分类提供线索，还需要事实核验。</p></div></div><div class="case-pullquote">好的归因，应该回答：<br>发生了什么，在哪一步，谁能够改变它。</div>`)}
    ${section('VALUE & DELIVERY','增长，是让商家<br>更容易把能力用起来。',`<div class="editorial-split"><div><p class="large-copy">看得懂、敢授权、配得完，<br>才有机会真正用起来。</p><p>开通、使用与效果是不同问题。行业模板要复用共性路径，也要把商家需要确认的规则与权限留清楚。</p><a class="case-related" href="../../posts/service-delivery/">读我的服务交付思考 →</a></div><div class="plain-list"><p><strong>已有能力扩覆盖</strong>检查入口、配置和适用条件，验收真实启用与触发。</p><p><strong>现有能力优化</strong>改进理解、召回和对话推进，验证对应问题是否改善。</p><p><strong>跨团队共建</strong>补齐业务事实、权限、动作、状态与接续。</p></div></div>${figure('delivery-assets.svg','通用能力、行业组合与商家差异','让每次交付留下下一次可以复用的资产')}`)}
    ${section('A TRUSTWORTHY RESULT','完成，要有真实状态作证。',`<div class="editorial-split"><p>申请创建成功，可能仍在等待处理；字段预填完成，可能仍需检查提交。聊天答复和通知都不能代替业务状态。再次进入服务时，要从已有状态继续。</p><div class="plain-list"><p><strong>任务是否前进</strong>当前承担的部分，是否到达可确认状态？</p><p><strong>接续是否清楚</strong>剩余任务由谁处理，已有事实能否继续使用？</p><p><strong>指标是否可解释</strong>未转交只能提供代理口径，不能单独证明自主完成。</p></div></div><a class="case-related" href="../../posts/agent-work-system/">拆开执行、判责与可信闭环 →</a>`)}
  `,
  'parrot-service': `
    <div class="career-strip"><div><b>2019—2024</b><span>拼多多</span></div><div><b>上海</b><span>智能客服 · 消费者服务体验</span></div><div><b>0 → 1</b><span>鹦鹉智能客服系统</span></div></div>
    ${section('THE START','服务产品的起点，<br>不是一个聊天框。',`<p class="large-copy">一端是自然语言，另一端是业务流程。智能客服需要把两端接起来。</p><p>在拼多多的这段经历中，我负责智能客服与消费者服务体验产品，从 0 到 1 搭建鹦鹉智能客服系统。它让我开始从完整服务链路看问题：听懂用户之后，还要知道如何处理，以及怎样把处理结果反馈回来。</p><p>如果只优化回复，复杂问题仍然会停在原地。产品要处理的是表达、状态和服务动作之间的关系。</p>`)}
    ${section('A SERVICE EXAMPLE','“怎么还没到？”<br>不能直接对应一条答案。',`<p class="section-lead">用一个常见物流问题拆开服务链路。</p><div class="service-thread"><div class="thread-message">怎么还没到？</div><ol><li><strong>先辨认诉求</strong><p>用户想知道当前位置、需要确定送达时间，还是希望取消订单？</p></li><li><strong>再读取状态</strong><p>未发货、运输中、派送异常，需要进入不同的处理路径。</p></li><li><strong>最后连接行动</strong><p>解释状态、推进查询或接续其他服务，让回答指向实际处理。</p></li></ol></div>${figure('parrot-system.svg','自然表达与服务行动之间的三层关系','表达 → 判断 → 行动')}`,'thread-section')}
    ${section('WHAT STAYED WITH ME','这段经历留下的三种判断。',`<div class="career-lessons"><article><span>识别之后</span><h3>标签要连接动作。</h3><p>分类体系只有进入路由与处理流程，才会成为产品能力。否则它只是统计结果。</p></article><article><span>流程之间</span><h3>交接也是体验。</h3><p>问题从一个处理环节进入另一个环节时，已确认的事实和未完成的任务需要一起传递。</p></article><article><span>系统之外</span><h3>产品经理要看全程。</h3><p>从问题进入，到服务结束，再回到反馈。局部功能的改善，需要放在完整链路里判断。</p></article></div><a class="case-related" href="../dianxiaomi-agent/">这条产品路径，后来走向了店小蜜 →</a>`)}
  `,
  'xiaoba-home': `
    <div class="case-pullquote brand-opening">让人记住一只鸟，<br>也记住如何对待它。</div>
    ${section('THE ENCOUNTER','2026 年 8 月 1 日，<br>在楼下遇见小八。',`<div class="editorial-split"><p class="large-copy">它是一只绿颊锥尾鹦鹉。<br>这次相遇，让“鹦鹉保护”变成了一件具体的事。</p><div><p>我不知道它是飞丢了，还是被遗弃了。但从那天起，它进入了我的生活，也成为“鹦鹉之家”的起点。</p><p>这个项目先从真实的陪伴出发，再延伸到角色、视觉与内容。喜欢是入口，照护才是关系的日常。</p></div></div>`)}
    ${section('CHARACTER LANGUAGE','把小八，变成能被记住的角色。',`<div class="brand-board"><div class="brand-art">${figure('xiaoba-brand.svg','小八品牌角色插画')}</div><div class="brand-notes"><span>角色线索</span><h3>绿羽 · 红腹 · 弯喙</h3><p>从绿颊锥尾鹦鹉的形态提炼识别线索，让角色在小尺寸里也保留轮廓。</p><div class="brand-swatches"><i style="--swatch:#3e725c"></i><i style="--swatch:#b85d4f"></i><i style="--swatch:#d78948"></i><i style="--swatch:#efe5d4"></i></div><small>羽色、腹色、喙色与温暖的纸张底色</small></div></div>`,'brand-section')}
    ${section('FROM CHARACTER TO OBJECT','一个角色，<br>可以住进不同的载体。',`<div class="brand-deliverables"><article><span>视觉</span><h3>Logo 与贴纸</h3><p>让小八出现在轻便、可分享的日常物件上。</p></article><article><span>物件</span><h3>手办概念</h3><p>从平面轮廓走向体积，继续探索姿态与触感。</p></article><article><span>叙事</span><h3>网站与短片</h3><p>从第一眼的喜欢，接续到角色故事和保护议题。</p></article></div><p class="brand-closing">下一步是商标核查与 3D 打样。<br>让屏幕里的小八，慢慢走进现实。</p>`)}
  `,
  'aurora-music': `
    <div class="case-intro"><span>为什么做</span><p>成熟的音乐 App 已经很擅长找歌。我想探索的是另一件事：天气、心情和声音，能不能一起构成一个愿意停留的空间？Aurora 是我给这份好奇心留的试验场。</p></div>
    ${section('INSIDE AURORA','换一个视角，<br>看声音怎样占据空间。',`<div class="gallery-tabs" role="tablist" aria-label="Aurora 界面"><button role="tab" id="view-player" aria-selected="true" aria-controls="galleryPanel" data-view="player">今日推荐</button><button role="tab" id="view-discover" aria-selected="false" aria-controls="galleryPanel" data-view="discover" tabindex="-1">发现与频谱</button><button role="tab" id="view-search" aria-selected="false" aria-controls="galleryPanel" data-view="search" tabindex="-1">曲库与搜索</button></div><figure class="aurora-gallery" id="galleryPanel" role="tabpanel" aria-labelledby="view-player"><img id="galleryImage" src="../../assets/aurora-player.png" alt="Aurora 今日推荐界面"><figcaption id="galleryCaption">从城市天气和当下心情进入音乐，播放栏始终留在同一位置。</figcaption></figure>`,'gallery-section')}
    ${section('THE EXPERIENCE','操作可以轻，<br>体验要有层次。',`<div class="aurora-notes"><article><span>BEFORE PLAY</span><h3>从情境进入</h3><p>天气与心情提供推荐线索；曲库、收藏与文字歌单保留直接找到音乐的路径。</p></article><article><span>WHILE LISTENING</span><h3>让画面回应声音</h3><p>频谱环表现频域变化，波形表现声音振幅，粒子构成空间感。三层画面共享正在播放的声音。</p></article><article><span>YOUR OWN MUSIC</span><h3>把自己的音乐带进来</h3><p>导入本地 MP3 和 LRC 歌词，让原型不仅能浏览，也能承接个人听歌习惯。</p></article></div>`)}
    ${section('A SMALL EXPERIMENT','给自己设一道限制：<br>声音也从浏览器里长出来。',`<div class="editorial-split"><p class="large-copy">不用外部音源 CDN，<br>先做出一个完整的声音实验。</p><div><p>Web Audio 在本地合成演示音频；音频分析再把正在发生的声音传给画面。这个限制把注意力从“找一首合适的歌”，转向音色、节奏和视觉之间的关系。</p><p>我仍然在打磨第一次播放和画面初始化的衔接。个人项目的乐趣，是让这些细小的感受也值得认真处理。</p><a class="case-related" href="../../posts/why-build-aurora/">读 Aurora 的创造手记 →</a></div></div>`)}
  `
};
const SCENARIOS={
  installation:{quote:'“包安装吗？我该怎么预约？”',title:'规则咨询与实际办理，走两条轨道。',rows:[['先区分','收费、权益、型号视频属于知识咨询；预约办理才需要核对订单与服务状态。'],['产品判断','不强迫所有问题先选订单；知识解释与办理采用一致的规则。'],['完成证据','入口展示只代表提供路径，实际提交与处理状态需要分别确认。']]},
  quality:{quote:'“商品破了，应该怎么处理？”',title:'看见现象，还没有完成责任判断。',rows:[['核实事实','凭证、发生时间、物流状态、商品特点和适用规则。'],['产品判断','识别破损不直接推出退款或换货；证据不足、规则不清需要保留。'],['接续方式','整理已有事实，补充必要材料；需要判断或授权时交给正确处理者。']]},
  ticket:{quote:'“资料已经填好了，事情办完了吗？”',title:'保存草稿、正式提交与处理完成，是不同状态。',rows:[['操作主体','预填、检查与提交分别由谁完成，不能被一个“AI 建单”名字遮住。'],['真实状态','草稿只是准备；申请已创建还可能待处理。通知不等于业务动作成功。'],['再次进线','查询既有状态继续服务，保留已查事实与未完成任务，避免重复建单。']]}
};
const slug=document.body.dataset.slug,p=PROJECTS[slug];
if(!p)throw new Error('项目不存在');
document.body.classList.add(`case-${slug}`);
document.title=`${p.title.replace('\n',' ')} — Jamal`;
document.querySelector('#pMark').textContent=p.mark;
document.querySelector('#pTitle').innerHTML=p.title.replace('\n','<br>');
document.querySelector('#pLead').textContent=p.lead;
document.querySelector('#pTags').innerHTML=p.tags.map(x=>`<span>${x}</span>`).join('');
const art=document.querySelector('.project-art');art.classList.add('has-image');
art.innerHTML=`<img src="../../assets/${p.image}" alt="${p.title.replace('\n',' ')}"><i>${p.mark}</i>`;
document.querySelectorAll('.project-section').forEach(x=>x.remove());
document.querySelector('.project-next').insertAdjacentHTML('beforebegin',CASES[slug]);
document.querySelector('#pNext').href=p.next==='aurora-music'?'../../posts/why-build-aurora/':`../${p.next}/`;
document.querySelector('#pNext').textContent=`${p.nextName} →`;
function setupTabs(selector,callback){
  const buttons=[...document.querySelectorAll(selector)];
  const select=button=>{buttons.forEach(x=>{x.setAttribute('aria-selected',String(x===button));x.tabIndex=x===button?0:-1;});callback(button);};
  buttons.forEach((button,i)=>{button.addEventListener('click',()=>select(button));button.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=buttons[(i+1)%buttons.length];if(event.key==='ArrowLeft')target=buttons[(i+buttons.length-1)%buttons.length];if(event.key==='Home')target=buttons[0];if(event.key==='End')target=buttons.at(-1);if(target){event.preventDefault();select(target);target.focus();}});});
  if(buttons.length)select(buttons[0]);
}
setupTabs('[data-scenario]',button=>{const s=SCENARIOS[button.dataset.scenario],panel=document.querySelector('#scenarioPanel');panel.setAttribute('aria-labelledby',button.id);panel.getAnimations().forEach(a=>a.cancel());if(!matchMedia('(prefers-reduced-motion:reduce)').matches)panel.animate([{opacity:.4,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.22,1,.36,1)'});panel.innerHTML=`<div class="scenario-question"><span>常见诉求</span><p>${s.quote}</p><h3>${s.title}</h3></div><dl>${s.rows.map(x=>`<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('')}</dl>`;});
const VIEWS={player:['aurora-player.png','Aurora 今日推荐界面','从城市天气和当下心情进入音乐，播放栏始终留在同一位置。'],discover:['aurora-discover.png','Aurora 发现与频谱界面','频谱、粒子与波形响应声音；对话入口保留在沉浸体验旁边。'],search:['aurora-search.png','Aurora 曲库与搜索界面','当你知道想听什么，就从曲库和搜索直接进入。']};
setupTabs('[data-view]',button=>{const v=VIEWS[button.dataset.view];document.querySelector('#galleryPanel').setAttribute('aria-labelledby',button.id);const image=document.querySelector('#galleryImage');image.src=`../../assets/${v[0]}`;image.alt=v[1];document.querySelector('#galleryCaption').textContent=v[2];});
