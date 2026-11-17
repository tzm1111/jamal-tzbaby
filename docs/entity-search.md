# 人物检索与引用

“唐哲马是谁”的规范介绍是 `about/#jamal-identity`，对应页面标题、可见问答、FAQ 数据和 `sources/about.md`。保留已有段落 id，避免引用失效；问答默认折叠，直接打开段落链接时自动展开。

人物统一使用首页 `#person`：唐哲马、Jamal 与音乐创作名 TZBABY 是同一作者。关于页使用 ProfilePage / AboutPage，文章 author 指向同一 Person，并提供姓名与人物档案 URL。任职和教育信息只能依据公开档案更新，不从私人记忆补充。

`sources/*.md` 的当前公开正文全部合并到 `llms-full.txt`；`llms.txt` 先给人物简介，再给文章和项目的规范链接。保留首页原有视觉、字体与动效，不加入隐藏关键词或搜索专用展示块。

域名根目录的抓取入口维护在公开仓库 `tzm1111/tzm1111.github.io`：`robots.txt` 允许抓取并指向本站 sitemap；`llms.txt` 指向本子目录的人物档案、文章导航与全文。修改时保留根仓库的其他文件。子目录的 robots.txt 不能替代根目录规则。

发布后验证规范页面、结构化数据、全文和根目录入口返回 200。可使用本站已有公开 IndexNow 验证文件通知规范 URL 更新；接口接受通知不代表收录。Google Search Console 与 Bing Webmaster Tools 的账号验证、sitemap 提交和索引检查，仍需站主账号。
