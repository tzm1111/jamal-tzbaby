# 搜索与 AI 引用维护

本站采用静态 HTML：正文必须存在于首次返回的 HTML 中。JavaScript 只增强筛选、图片切换与场景标签，不能把文章正文留成空容器。

## 更新内容时

1. 正文变更后，同步对应 HTML 与 `sources/` 下的 Markdown，并重新合并 `llms-full.txt`。`posts/practice.js`、`posts/editorial.js` 和 `projects/cases.js` 是旧动态内容来源，若继续编辑它们，必须同步静态页面；`data-prerendered` 会避免旧模板覆盖 HTML。
2. 为新增页面设置唯一标题、描述、绝对 canonical、分享卡和 JSON-LD。人物统一引用主页 `#person`，文章作者与可见作者一致。
3. 新文章加入主页、`llms.txt`、`sitemap.xml` 和 `feed.xml`。文章目录与段落链接的 id 应保持稳定。
4. 更新可见页面维护日期与 `dateModified`；首次创作或首次发布日期不明确时，不编造 `datePublished`。
5. 检查桌面、手机和禁用 JavaScript 的阅读效果，并验证所有本地资源与段落链接。

## 抓取与发现

- 此站位于 GitHub Pages 子目录 `/jamal-tzbaby/`。有效 robots.txt 必须位于 `https://tzm1111.github.io/robots.txt`；子目录中的 robots.txt 不控制爬虫。根目录返回 404 表示没有提供限制规则，不等同于禁止抓取。
- `sitemap.xml` 列出 19 个有效规范页面，已有 Aurora 项目别名指向真正文章，并排除出 sitemap。主页与各页提供 sitemap 和全文索引入口。
- `llms.txt` 是可选的内容导航约定，并非所有 AI 都支持；它不能取代正文、链接与搜索收录。FAQ 结构化数据也不保证 Google 展示 FAQ 富媒体结果。
- `indexnow-key.txt` 是公开的站点验证文件，按 IndexNow 的 keyLocation 方式验证本子目录。发布后可向支持 IndexNow 的搜索引擎通知规范 URL 更新。HTTP 200/202 仅代表收到通知或等待验证，不代表已收录。
- Google Search Console 与 Bing Webmaster Tools 的站点验证和 sitemap 提交，需要站主对应账号；部署不等同于完成这些账号内操作。

## 数据与引用

对外介绍只依据公开网站。业务文章属于作者个人方法与观察，不代替公司官方规则。引用请使用规范 HTML URL，署名唐哲马（Jamal）；具体判断可以引用文章的固定段落链接。不要把维护日期解释为观点首次产生日期。

## 首页展示约定

首页不展示独立问答模块和页面维护、Markdown 全文、内容索引提示条。问答在关于页以普通 details 折叠，可由首页关于区的常见问题链接进入；FAQ 结构化数据对应关于页。各页 head 的全文、索引、订阅与 sitemap 链接仍保留。


## 思考展示与新增文章顺序

- 首页固定展示四篇，顺序为：`business-first`、`agent-work-system`、`personal-ai-work-system`、`qualified-ai-pm`。新增文章不自动加入首页，也不替换这四篇。
- 其余文章通过首页“全部思考与方法”进入 `/posts/` 查看；全文和原文链接继续保留。
- 全部文章列表先显示上述四篇，其余已有文章保持顺序。新增文章默认追加到列表末尾，不插到顶部。
- 更新时同步列表的 JSON-LD、首页 Markdown 与 `llms.txt` 的导航顺序；RSS 保持订阅内容的时间顺序。
