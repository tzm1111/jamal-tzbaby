const figure=(file,alt,caption)=>`<figure class="article-figure"><img src="../../assets/${file}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;
const POSTS={
  'business-first':{mark:'BUSINESS FIRST',format:'场景笔记',tags:'业务判断 · AI 产品',title:'懂业务的人，才知道 AI 该用在哪',deck:'“我要退款”只有四个字。真正的产品问题，藏在这四个字之后。',visual:'business-bridge.svg',body:`
    <p class="opening-paragraph">如果一个模型能识别“退款意图”，是否意味着它已经能处理退款？我的答案是：还没有。识别出用户说了什么，只解决了服务链路的开头。</p>
    <div class="case-dialogue"><span>一个常见售后例子</span><p>“东西还没收到，我想退款。”</p></div>
    <p>这句话可以进入完全不同的路径。订单尚未发货，需要确认取消规则；已经在运输中，需要核对拦截或拒收流程；显示已签收，用户却说没收到，则需要先处理状态冲突。用户表达相同，产品动作不同。</p>
    <h2>把一句话，翻译成一个待判断的问题</h2>
    <p>在这样的任务里，我会先拆开三件事：用户想要的结果是什么，当前事实是什么，哪些处理方式适用。不能因为用户表达了一个目标，就跳过事实核实和适用条件。</p>
    <div class="decision-table"><div><b>表达</b><span>我要退款</span><em>告诉我们目标</em></div><div><b>事实</b><span>订单与履约状态</span><em>决定现在能做什么</em></div><div><b>规则</b><span>平台要求与商家授权</span><em>决定哪些动作适用</em></div></div>
    <p>产品设计需要把这三层组织起来。比如先查询订单，再辨认是否存在状态冲突，最后选择可用路径。每个步骤都应有明确输入，缺少输入时也要知道该补问什么。</p>
    <h2>不是所有步骤都需要模型判断</h2>
    <p>用户的诉求表达有歧义，模型可以帮助理解；订单状态有明确字段，应从业务系统读取；金额与规则可以计算，就不应该让模型凭语言估计。把不同性质的问题分配给合适的机制，比让一个模型包办整条流程更重要。</p>
    <p>我会反问：如果这个步骤不使用 AI，最直接的做法是什么？这个问题能暴露很多被包装成“智能化”的普通查询和规则判断，也能帮助找到真正需要语义理解的部分。</p>
    ${figure('business-bridge.svg','业务判断到产品行动的翻译关系','把诉求、事实、规则和行动连接起来')}
    <h2>立项前，先写清楚失败长什么样</h2>
    <p>只写成功 Demo，很容易漏掉关键条件。对于退款任务，错误承诺、读取过期状态、执行没有完成却宣告成功，都是不同的失败。定义这些失败之后，才知道要补哪些验证和恢复路径。</p>
    <p>“懂业务”不是会使用行业术语，而是能辨认这些差异。我的工作是把差异变成产品结构：什么时候获取事实，什么时候做判断，什么时候行动，以及结果如何被确认。</p>
    <p>我也会把能力存在、商家开启、真实触发、执行成功和任务解决分开。高咨询量不自动代表高改善空间，低接待量也不证明需求少。需要理解服务进入了哪里，为什么没有进入，以及什么条件会改变结果。</p><p class="essay-ending">AI 应该出现在哪里，答案往往藏在业务里最容易被省略的那一步。</p><div class="action-links"><a href="../service-delivery/">把能力变成可交付的价值 →</a><a href="../evidence-to-action/">让判断进入可验证的行动 →</a></div>`},
  'decagon-lessons':{mark:'DECAGON',format:'产品观察',tags:'Agent · 产品研究',title:'我从 Decagon 学到的，不是产品功能',deck:'我最关心的不是它增加了什么按钮，而是谁能够持续修改 Agent 的行为。',visual:'aop-system.svg',body:`
    <p class="opening-paragraph">看一个 Agent 产品，我会先问：上线之后，业务规则变了，谁来改？如果一个小变化还要在业务、产品和工程之间反复翻译，团队就很难持续经营它的行为。</p>
    <h2>AOP 让工作流成为可维护的东西</h2>
    <p>Decagon 的 <a href="https://decagon.ai/product/aop" target="_blank" rel="noreferrer">Agent Operating Procedures</a> 把自然语言流程与代码控制结合在一起。它吸引我的地方，是业务流程可以被阅读、检查和修改，同时保留工程上的控制能力。</p>
    <p>这里要分开两个问题：让配置更容易，和让修改更可靠。自然语言降低了表达门槛，但不自动保证规则正确。一个真正可经营的系统，还需要测试、运行轨迹和版本管理，把“改了什么”连接到“发生了什么”。</p>
    ${figure('aop-system.svg','Agent 工作流的维护闭环','定义流程只是开始，测试、观测和更新才让它持续运转')}
    <h2>我会用三个问题拆产品</h2>
    <div class="observation-list"><article><span>谁能改？</span><h3>流程的表达权</h3><p>业务能否直接说明条件和动作？工程能否检查它的执行方式？两者应该共享一份可理解的描述。</p></article><article><span>怎么知道改对了？</span><h3>修改的验证方式</h3><p>一次退款规则调整，要能回放相关任务，也要覆盖未命中条件、工具失败和用户改口的情况。</p></article><article><span>出了问题找哪里？</span><h3>运行的可观察性</h3><p>看到最终回答还不够。需要知道当时读取了什么、选择了什么路径，以及哪个动作没有完成。</p></article></div>
    <h2>流程编排不能跳过办事的前提</h2><p>我在竞品研究里会继续追问：即使能发现对话中的流程缺口并生成新策略，如果缺少业务动作、商家授权和系统接入，策略还能推进什么？有了流程表达，并不自动具备执行和判责能力。</p><p>同样的功能名，也可能指引用户自行操作，或直接执行获授权动作。比较之前，要先核对操作主体、输入输出和完成证据。不能因为竞品给模块起了名字，就推断自己的产品没有对应能力。</p><h2>映射到电商售后，要重新设计什么</h2>
    <p>我正在把这套思路映射到店小蜜售后场景。可以借鉴的是流程维护与验证机制，具体的订单状态、商家授权和处理阈值，必须回到本地业务重新定义。</p>
    <div class="article-table-wrap"><table><thead><tr><th>可以借鉴</th><th>需要重新定义</th></tr></thead><tbody><tr><td>自然语言表达工作流程</td><td>哪些条件允许进入协商或处理</td></tr><tr><td>修改后先测试与回放</td><td>本场景里的典型失败和异常样本</td></tr><tr><td>用轨迹解释 Agent 行为</td><td>订单、知识与工具返回之间的证据关系</td></tr></tbody></table></div>
    <p>关键阈值还需要校准。我不会把“流程能写出来”当作“流程已经可以稳定运行”。产品能力应该让业务判断更清晰，而不是让复杂判断藏在更漂亮的配置界面里。</p>
    <p class="essay-ending">功能可以被复制。持续拥有和改进 Agent 行为的方式，更值得研究。</p>`},
  'ai-drama-business':{mark:'AI DRAMA',format:'商业评论',tags:'内容生意 · AI 短剧',title:'AI 短剧真的赚钱吗？',deck:'生成便宜了，但观众没有因此多出一小时。',visual:'ai-drama-economics.svg',body:`
    <p class="opening-paragraph">“一个人也能做短剧”解决的是生产资格，不是赚钱资格。我研究 AI 短剧时，最想拆开的就是这两个常被混在一起的问题。</p>
    <p>画面生成更快、团队可以更小，这些变化确实有意义。但观众是否点开、是否看完、是否愿意继续看，仍然取决于内容和分发。制作成本下降，并不会自动提高一部作品的吸引力。</p>
    <div class="economic-equation"><span>一门内容生意</span><p>收入 − 制作 − 分发 − 返工</p><small>成本里省下的一部分，不能直接当作利润。</small></div>
    <h2>最容易漏算的是“没被看见”</h2>
    <p>创作者往往能算出生成一个镜头用了多少工具成本，却不容易算清为一个选题做了多少轮尝试。镜头能用，不代表故事成立；成片完成，不代表能进入有效分发。</p>
    <p>还有一些成本不会消失，只会换位置。角色跨镜头不一致，要返工；人物动机说不通，要重写；画面漂亮但节奏拖沓，要重新剪辑。效率提高之后，瓶颈可能从生成转移到判断和审核。</p>
    ${figure('ai-drama-economics.svg','从内容生产到收益的链路','观众的注意力，仍然需要经过选题、叙事与分发才能获得')}
    <h2>三种生意，三套要求</h2>
    <div class="business-models"><article><h3>做作品</h3><p>靠付费、平台分成或广告获得收入。核心是持续获得观看，不能只证明一条片子能做出来。</p></article><article><h3>做制作服务</h3><p>承接品牌或客户的内容需求。比起爆款概率，更需要交付稳定、角色统一和返工可控。</p></article><article><h3>做 IP</h3><p>积累人物与世界观，再探索授权和衍生。单条视频的热度，需要沉淀成被记住的资产。</p></article></div>
    <p>这三条路不能用同一种“低成本生成”叙事解释。选哪种生意，决定了要建立哪种能力，也决定了应该验证什么。</p>
    <h2>我会怎样验证一个起步项目</h2>
    <p>先确定题材和受众，再做一个有限的内容实验。观察开头是否能留住人、人物是否值得继续看、同一题材能否稳定产出。把制作与分发的实际投入记下来，避免用想象中的成功作品摊薄失败成本。</p>
    <p>我更看重能否解释一次失败：是选题没有吸引力，还是故事推进慢，或者分发没有触达？这些结论能改变下一部作品，才构成可复用的内容能力。</p>
    <p class="essay-ending">我对这门生意的判断仍然谨慎。会出现成功者，但“人人能制作”远远不等于“人人能赚钱”。</p>`},
  'agent-work-system':{mark:'AGENT',format:'工作手册',tags:'任务设计 · Agent 实践',title:'把 AI 当同事之前，先给它一套工作系统',deck:'以“处理退差价”为例，写一份能执行、能停止、能验收的任务说明。',visual:'agent-loop.svg',body:`
    <p class="opening-paragraph">“帮用户处理退差价”看起来是一项清楚的任务。真正开始执行时，问题才出现：哪一笔订单？价格变化是否适用？谁允许处理？工具失败后能不能再试？</p>
    <p>给 Agent 一个目标，还需要给它一份工作说明书。下面用一个通用退差价任务，拆开最容易遗漏的内容。</p>
    <div class="task-sheet"><div class="task-sheet-head"><span>TASK BRIEF</span><h2>处理退差价</h2></div><dl><div><dt>目标</dt><dd>判断诉求是否符合适用规则；符合时完成获授权的处理，并确认结果。</dd></div><div><dt>输入</dt><dd>订单、当前价格、适用规则和商家授权。订单与价格需要重新读取，不能只依赖历史对话。</dd></div><div><dt>行动</dt><dd>查询事实、补问缺失信息、核对条件、执行处理、检查返回结果。</dd></div><div><dt>停止</dt><dd>规则冲突、授权不足、状态不明，或无法确认前一次执行结果时，进入确认或转交。</dd></div><div><dt>完成</dt><dd>业务结果可确认，并准确告知用户。只调用了工具，不能直接算完成。</dd></div></dl></div>
    <h2>执行前后，要问不同的问题</h2>
    <p>执行前问“现在能不能做”；执行后问“到底有没有做成”。这两次检查不能被一句“调用成功”合并。工具返回收到请求，与业务动作完成，可能是不同状态。</p>
    <p>尤其是超时场景：没有收到返回，不代表没有执行。直接重试可能重复处理。先确认业务状态，再决定重试还是停止，需要在任务定义里写清楚。</p>
    ${figure('agent-loop.svg','任务执行与结果验证的闭环','检查结果，再决定下一步')}
    <h2>把失败设计成可定位的出口</h2>
    <p>点击一种失败，看它应该留下什么信息。</p>
    <div class="failure-notes"><details open><summary>缺少事实</summary><p>记录缺少的是订单、价格还是规则。明确补问或查询路径，避免让模型把缺口猜成答案。</p></details><details><summary>执行超时</summary><p>保留请求状态和已知返回；先查询实际结果。无法确认时停止重复操作，交给后续流程接续。</p></details><details><summary>结果与预期不一致</summary><p>保留执行前后的状态与关键步骤。区分适用条件判断错、执行没完成，还是结果检查遗漏。</p></details></div>
    <h2>验收至少覆盖三条路径</h2>
    <ul class="acceptance-list"><li><strong>条件齐全</strong>可以处理，并正确确认结果。</li><li><strong>条件不适用</strong>解释原因，给出可行的后续方式。</li><li><strong>执行异常</strong>不误报成功，不盲目重复操作，保留接续信息。</li></ul>
    <p class="essay-ending">先让一项任务在正常和异常路径里都说得清楚，再扩大 Agent 的覆盖面。</p>`},
  'why-build-aurora':{mark:'AURORA',format:'创造手记',tags:'音乐 · 个人实验',title:'为什么我仍然自己做 AI 音乐播放器',deck:'我想保留一块地方，让细小的感受也值得认真处理。',visual:'aurora-discover.png',body:`
    <p class="opening-paragraph">世界上不缺音乐播放器。缺的也许是一个完全按自己的感受搭起来的小空间。</p>
    <p>我喜欢看声音怎样变成画面：低频推开一圈频谱，波形跟着振幅起伏，粒子在屏幕里留下呼吸感。这些细节不一定改变听歌效率，却能改变“正在听音乐”的感觉。</p>
    <p>所以 Aurora 的起点不是多做一张歌曲列表。我想把城市天气、当下心情、封面颜色和声音放在一起，看它们能否组成一个有氛围的界面。</p>
    <h2 id="aurora-gallery">Aurora：把感受做成一个界面</h2>
    <p>从城市天气和当下心情进入，也保留直接找歌的路径。下面是这个个人项目的实际界面。</p>
    <div class="aurora-article-gallery"><div class="aurora-view-tabs" role="tablist" aria-label="Aurora 界面视角"><button id="aurora-tab-player" role="tab" aria-selected="true" aria-controls="aurora-article-panel" data-aurora-view="player">今日推荐</button><button id="aurora-tab-discover" role="tab" aria-selected="false" aria-controls="aurora-article-panel" tabindex="-1" data-aurora-view="discover">发现与频谱</button><button id="aurora-tab-search" role="tab" aria-selected="false" aria-controls="aurora-article-panel" tabindex="-1" data-aurora-view="search">曲库与搜索</button></div><figure class="article-figure" id="aurora-article-panel" role="tabpanel" aria-labelledby="aurora-tab-player"><img id="aurora-article-image" src="../../assets/aurora-player.png" alt="Aurora 今日推荐界面"><figcaption id="aurora-article-caption">城市天气与当下心情提供进入音乐的线索。</figcaption></figure></div>
    <h2>画面要回应正在发生的声音</h2>
    <p>如果音乐暂停了，画面还按同样的速度跳动，那只是一个漂亮的循环。我要的是声音和视觉之间真实的联系。</p>
    <p>频域数据适合驱动频谱，时域数据适合表现波形，粒子负责更松弛的空间感。它们不需要每一刻都很热闹，也应该允许安静、停顿和变化。</p>
    <div class="listening-note"><span>一个交互细节</span><p>播放器留在底部。<br>浏览和对话可以变化，正在听的音乐不用重新开始。</p></div>
    <p>另一部分是普通但不可少的功能：播放进度、音量、队列、收藏、本地 MP3 与 LRC 歌词导入。它们让氛围有了可以日常使用的骨架。</p>
    <h2>限制，会把注意力拉回来</h2>
    <p>演示音频由 Web Audio 在浏览器本地合成，不依赖外部音源 CDN。少了现成歌曲的帮助，就要直接面对音色、节奏和层次的问题。</p>
    <p>这种限制也让我发现，界面的流畅感经常出现在第一次使用里：用户点击播放时有没有响应，声音开始的瞬间画面是否跟上，切换视图有没有打断听感。我仍然在打磨这些衔接。</p>
    <p>做兴趣项目，不必每次都证明一个市场机会。它让我能把一个模糊的感受，变成一个可以打开、可以使用、也可以继续改的东西。</p>
    <p class="essay-ending">听一会儿音乐，改一点画面。<br>这就是 Aurora 继续生长的方式。</p>
    <a class="inline-related" href="../../projects/tzbaby-music/">听听我以 TZBABY 的名字发布的音乐 →</a>`},
  'learn-ai-pm':{mark:'AI PM',format:'教学实战',tags:'模拟实习 · 产品训练',title:'非技术背景，怎么真正学会做 AI 产品',deck:'五周做完一个项目，再用十五分钟追问，检查每个选择是不是真的想过。',visual:'ai-pm-curriculum.svg',body:`
    <p class="opening-paragraph">学员交来一份完整 PRD，我并不会立刻认为他学会了。文字可以被润色，结构可以被套用。更有区分度的问题是：为什么这样选？如果证据换了，方案还成立吗？</p>
    <p>我的五周 1 对 1 AI PM 模拟实习训练营，让同一个项目贯穿需求、方案、原型和评估。下一次交付必须使用上一次的判断，避免作业各自漂亮，却接不到一起。</p>
    <h2>每周，都给下一周留下一个东西</h2>
    <ol class="course-weeks"><li><span>WEEK 01</span><div><h3>找到值得解决的问题</h3><p>交付需求洞察。分开用户的表达、真实问题和已有处理方式，说明为什么值得做。</p></div></li><li><span>WEEK 02</span><div><h3>做方案，也做取舍</h3><p>交付方案选择。保留替代方案，说明哪些环节使用模型，哪些使用规则或人工确认。</p></div></li><li><span>WEEK 03</span><div><h3>让判断变成可操作的原型</h3><p>交付关键路径。用户怎么进入、系统怎么反馈、异常时如何接续，都要在界面里看得见。</p></div></li><li><span>WEEK 04</span><div><h3>给结果一把尺子</h3><p>交付指标与评估。明确分子、分母、基线和数据来源，写清楚哪些变化能支持产品判断。</p></div></li><li><span>WEEK 05</span><div><h3>解释完整项目</h3><p>交付项目总结并参加验收。把问题、选择、证据和结果接成一条完整的链路。</p></div></li></ol>
    <h2>十五分钟，不问背了多少名词</h2>
    <p>我围绕一个指标做三层追问。下面用“任务完成率”演示这套验收方式。</p>
    <div class="interview"><details open><summary><b>01</b> 定义是什么？</summary><p>什么算完成？部分完成算不算？一次对话有多个诉求时，以哪个任务为单位？如果分母含混，后面的数字就无法解释。</p></details><details><summary><b>02</b> 基线在哪里？</summary><p>与什么结果比较？比较的是同一批任务、同一段流程和同一种条件吗？没有可比基线，变化不能直接归因给新方案。</p></details><details><summary><b>03</b> 为什么发生？</summary><p>是模型判断改善、知识补齐，还是任务构成发生变化？能不能找到支持解释的样本，以及不支持解释的样本？</p></details></div>
    <p>真正做过判断的人，不一定回答得很顺，却能说出证据在哪里、当时放弃了什么、还有什么没有验证。只背过文档的人，常常会在第二层停住。</p>
    <h2>非技术背景，先补判断接口</h2>
    <p>不必先把自己训练成后端工程师。但要知道模型需要什么输入、工具能执行什么动作、结果怎样检查，以及什么时候需要工程师一起判断。这些知识要跟着项目使用，才能变成产品能力。</p>
    <p>验收也要检查最终产物：文档保存了，正文是否遗漏；脚本跑完了，统计是否重复；原型能打开，异常路径是否有出口。讨论里说清楚的条件，需要进入需求与验收。</p><p>我更愿意教判断过程：同一现象为何可能有不同根因，哪些证据还不足，目标测算为何不能直接成为承诺。把没有成立的解释和失败条件也保留下来，才能复用方法。</p><p class="essay-ending">课程的终点，是能独立解释自己的选择。<br>不是交出一份“像产品经理写的”文档。</p>`}
};
const PDD_PRACTICE_CONTEXT={"business-first": "<section class=\"practice-context\" id=\"pdd-practice\"><h2 id=\"pdd-practice-heading\">这套判断，来自服务产品实践</h2><p>在拼多多参与鹦鹉智能客服与消费者服务体验产品建设时，我需要把模型识别、知识、工具与服务策略连接起来。用户问题被识别出来之后，还要进入合适的处理路径，并得到结果反馈。这段经历让我持续关注：理解用户、选择动作和确认结果，分别需要什么依据。</p><a class=\"case-related\" href=\"../../projects/parrot-service/#parrot\">查看鹦鹉智能客服案例 →</a></section>", "service-delivery": "<section class=\"practice-context\" id=\"pdd-practice\"><h2 id=\"pdd-practice-heading\">从消费者服务，到方案维护平台</h2><p>在拼多多的服务体验工作中，我参与过智能客服建设，也负责过服务跟进、自助解决与内部问题管理能力的产品设计。消费者端的处理路径，和团队配置、发布、改进方案的工作方式，需要一起考虑。知识库、工具、模块编辑、权限与版本管理，让我开始从交付和持续维护的角度看产品。</p><a class=\"case-related\" href=\"../../projects/parrot-service/#self-service\">查看体验治理与自助解决案例 →</a></section>", "evidence-to-action": "<section class=\"practice-context\" id=\"pdd-practice\"><h2 id=\"pdd-practice-heading\">在产品迭代里，让分析真正改变下一步</h2><p>在拼多多的智能客服与服务体验工作中，我参与建设数据监控和业务问题分析机制，协同数据团队输出体验分析，并通过 A/B 测试与反馈验证产品优化。分析需要帮助团队决定优先改哪里，再连接到方案、协作与验收；它也构成了我今天这套工作方法的实践背景。</p><a class=\"case-related\" href=\"../../projects/parrot-service/#logistics\">查看物流协作与工单案例 →</a></section>"};
for(const [slug,markup] of Object.entries(PDD_PRACTICE_CONTEXT)){const entry=(window.PRACTICE_NOTES||{})[slug]||POSTS[slug];if(entry)entry.body+=markup;}
Object.assign(POSTS,window.PRACTICE_NOTES||{});
const slug=document.body.dataset.slug,post=POSTS[slug];
if(!post)throw new Error('文章不存在');
if(document.body.dataset.prerendered!=='true'){
document.body.classList.add(`editorial-${slug}`);
document.title=`${post.title} — Jamal`;
document.querySelector('#postMark').textContent=post.mark;
document.querySelector('#postTags').textContent=`${post.format} / ${post.tags}`;
document.querySelector('#postTitle').textContent=post.title;
document.querySelector('#postDeck').textContent=post.deck;
const plain=post.body.replace(/<[^>]*>/g,'');
document.querySelector('#postRead').textContent=`约 ${Math.max(2,Math.ceil(plain.length/300))} 分钟`;
document.querySelector('.article-meta span:last-child').textContent=post.format;
const cover=document.querySelector('.article-cover');
cover.classList.add('has-image');cover.insertAdjacentHTML('afterbegin',`<img src="../../assets/${post.visual}" alt="${post.title}">`);
document.querySelector('#postBody').innerHTML=post.body;
document.querySelector('#year').textContent=new Date().getFullYear();
}


// 在文章内切换真实界面，键盘与鼠标共享同一选择状态。
const auroraViews={player:['aurora-player.png','Aurora 今日推荐界面','城市天气与当下心情提供进入音乐的线索。'],discover:['aurora-discover.png','Aurora 发现与频谱界面','频谱、波形与粒子共同构成声音的空间感。'],search:['aurora-search.png','Aurora 曲库与搜索界面','知道想听什么时，可以从曲库与搜索直接进入。']};
const auroraTabs=[...document.querySelectorAll('[data-aurora-view]')];
function selectAuroraView(button){const v=auroraViews[button.dataset.auroraView];auroraTabs.forEach(t=>{t.setAttribute('aria-selected',String(t===button));t.tabIndex=t===button?0:-1;});const img=document.querySelector('#aurora-article-image');PortfolioMotion.swapImage(img,`../../assets/${v[0]}`,v[1],document.querySelector('#aurora-article-caption'),v[2]);document.querySelector('#aurora-article-panel').setAttribute('aria-labelledby',button.id);}
auroraTabs.forEach((button,i)=>{button.addEventListener('click',()=>selectAuroraView(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=auroraTabs[(i+1)%auroraTabs.length];if(event.key==='ArrowLeft')next=auroraTabs[(i+auroraTabs.length-1)%auroraTabs.length];if(event.key==='Home')next=auroraTabs[0];if(event.key==='End')next=auroraTabs.at(-1);if(next){event.preventDefault();selectAuroraView(next);next.focus();}});});
