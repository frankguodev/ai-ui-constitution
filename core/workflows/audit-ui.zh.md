# UI Audit 工作流

用于严格、系统地排查页面、组件、截图或整站前端 UI 质量。`audit-ui` 负责执行流程，`ui-audit` rubric 负责判断标准。

审查的目标是发现问题、给出证据和修复顺序，不是直接重写设计。只有当用户明确要求修复时，才进入修复流程。

## 职责边界

- 本 workflow 只定义如何执行 audit：选择模式、收集上下文、验证视口、采集证据、组织报告、决定是否转入修复。
- 具体什么算问题、如何分级、评分、模块含义、报告归属和输出规则，读取 `references/checklists/ui-audit.zh.md`。
- 本 workflow 负责决定本次 audit 要读哪些模块；不要把模块选择规则复制成报告内容。
- `Quick / Standard / Focused / Deep Audit` 的硬预算读取 `references/modes/audit-modes.json`；本文件负责解释这些预算如何执行。
- 不要把 rubric 逐条复制进报告；只输出有证据、有影响、真实存在的问题。
- 不要同时读取英文和中文 reference，除非任务是翻译、双语对齐或一致性检查。

## 语言规则

读取本 workflow 前，skill 的 Locale Contract 已经选择了一个运行语言。继续使用这个语言，不要再打开配对的英文或中文 workflow/checklist/module 文件，除非用户明确要求翻译、双语比较、本地化或语言一致性检查。

## 1. 选择审查模式

根据用户请求选择审查深度：

- `Quick Audit`：用户说“快速看看”“有没有大问题”。只报告 Critical 和明显 Major。
- `Standard Audit`：默认模式。报告 Critical、Major 和少量有价值的 Minor。
- `Focused Audit`：用户说“认真检查”“聚焦深查”“上线前先看主要风险”“不要太重但要仔细”。比 Standard 更深入，但不默认评分，不默认完整分类报告；最多 32 条 findings。
- `Deep Audit`：用户说“全面排查”“严格 audit”“准备上线”“找细节问题”。使用完整 audit 体系：主 rubric、相关 modules、评分模型、Content Stress Test、更多视口，并额外检查媒体比例、表格/富文本/代码块、滚动行为、原生控件、动效和高对比度风险。

如果用户没有指定，使用 `Standard Audit`。

### 模式预算

完整 audit 体系是判断背景，不是每次都要完整执行的任务清单。硬预算以 `references/modes/audit-modes.json` 为准；下面是执行解释：

- `Quick Audit`：只做主路径和当前可见界面的风险扫描。页面可运行时，最多检查当前视口或 1 个最关键视口；只做明显的布局/可点击/响应式 smoke check。最多 8 条 findings，只报告 Critical 和明显 Major，不做评分，不输出 Minor，不展开长尾细节。
- `Standard Audit`：默认实用模式。覆盖主要页面/功能和 2 个关键视口：1280px 桌面 + 1 个移动端视口；检查首屏关系，并在每个主要页面至少抽查 1 个核心功能模块的内部空间和状态。先找 Critical / Major，再挑少量高价值 Minor。通常 8 到 16 条 findings，不输出完整分类报告，不做完整 Content Stress Test，不默认评分。
- `Focused Audit`：聚焦深查模式。覆盖主要页面/功能、关键视口和风险触发视口；最多 32 条 findings，不默认评分，不输出完整分类报告。核心视口下检查所有主要功能模块，并抽查重复组件内部细节，再按风险扩展平板、宽屏、小手机、媒体、滚动、原生控件和内容压力。
- `Deep Audit`：系统展开主 rubric、相关 modules、评分模型、Content Stress Test、更多视口和深度审查细项。至少在一个核心视口完成页面级、模块级、组件内部三级扫描，再在风险视口复查暴露问题的层级。即便是 Deep Audit，也先输出 Top Findings，不把所有通过项写进报告。

任何模式都不要为了“覆盖分类”而制造 finding。发现多个同源问题时，优先合并为一个系统性 finding。

## 2. 收集上下文

正式审查前，先确认或推断：

- Scope：单页、组件、截图、整站、代码目录或 localhost。
- Page type：landing page、dashboard、app screen、portfolio、docs、form、checkout、admin 等。
- Tech constraints：已有组件库、工具类 CSS、CSS Modules、自定义 CSS、设计 token、路由、断点、框架和渲染方式。
- Verification level：已运行浏览器、代码静态审查、截图审查，或混合审查。

缺少信息时可以根据项目结构和页面内容推断，但要标明“推断”。

如果用户使用中文提问，报告默认使用中文；必要的字段名和模式名可以保留英文，方便和命令、文档、自动化输出保持一致。

## 3. 识别现有视觉体系

审查必须先识别当前网站或产品已有的视觉体系，包括：

- 颜色：品牌色、背景色、文字色、状态色、强调色使用方式。
- 字体：字号层级、字重、行高、标题和正文节奏。
- spacing：页面容器、section 间距、组件内边距、grid gap。
- 圆角、边框、阴影：按钮、卡片、输入框、弹窗和菜单的共同规律。
- 组件风格：按钮、表单、导航、卡片、表格、弹窗、toast 的既有样式。
- 布局和滚动：容器宽度、grid/flex 降级、sticky/fixed 层级、滚动区域、锚点和表格横向滚动。
- 媒体和富内容：图片、视频、iframe、图表、代码块、富文本和表格的比例、裁切、加载前占位和小屏策略。
- 交互层：dropdown、popover、modal、toast、drawer、loading overlay 的层级和互相遮挡关系。
- 页面语气：营销型、工具型、内容型、后台型、个人品牌型等。

除非用户明确要求重设风格，否则所有审查建议都必须在现有视觉体系内判断。

## 4. 读取审查标准

运行时读取 `references/checklists/ui-audit.zh.md`。重点应用其中：

- 总原则
- 严重程度
- 证据标准
- 评分模型
- 模块路由
- 输出格式
- 去重优先级

具体细项通过 modules 读取，例如 layout、responsive、components-states、forms-controls、visual-system、design-contract、accessibility 和 ai-template-smell。

### 模块读取策略

`references/checklists/modules/` 是高风险问题的聚焦检查路径。不要每次把所有模块都读完；先按模式和页面信号选择：

- `Quick Audit`：默认不展开模块。只有当问题明显命中时，读取相关 1 个模块，例如移动端崩坏读 `responsive`，可点击信号缺失读 `components-states`，首屏关系异常读 `layout`。
- `Standard Audit`：默认优先考虑 `layout`、`components-states`、`responsive`。如果页面包含表单/筛选/上传/批量操作，补读 `forms-controls`；如果主要风险是风格拼贴、token 混乱或主题保持，补读 `visual-system`。
- `Focused Audit`：默认读取 Standard 相关模块，并按页面风险补读 `forms-controls`、`visual-system`、`design-contract`、`accessibility` 或 `ai-template-smell`。`design-contract` 只在项目存在契约、用户要求设计系统检查或出现系统性 token / recipe 漂移时读取。不要为了“完整”读取无关模块。
- `Deep Audit`：按页面类型和风险读取所有相关模块，可包括 `design-contract`、`accessibility` 和 `ai-template-smell`。没有契约信号时不要为了 Deep 而自动读取 `design-contract`。

模块触发规则：

- 首屏、hero、搜索框、视觉容器、下一段内容关系异常：读 `modules/layout.zh.md`。
- cursor、hover、focus-visible、loading、disabled、自定义 clickable 区域异常：读 `modules/components-states.zh.md`。
- 375px、768px、1280px、中间断点、横向滚动、固定宽度、sticky/fixed 遮挡异常：读 `modules/responsive.zh.md`。
- 表单、搜索筛选、选择控件、上传、批量操作、错误恢复、原生控件混用异常：读 `modules/forms-controls.zh.md`。
- 字体层级、颜色职责、spacing、radius、border、shadow、装饰语言、主题保留异常：读 `modules/visual-system.zh.md`。
- 项目存在 `design.md` / `designContract`，用户要求检查设计系统，或共享 token、recipe、typography role、variant / size / state 系统性漂移：读 `modules/design-contract.zh.md`。
- 键盘路径、focus-visible、可访问名称、语义结构、目标尺寸、高对比度异常：读 `modules/accessibility.zh.md`。
- AI 模板感、空泛 slogan、虚假数据、过度 badge/bento/渐变、section 拼贴异常：读 `modules/ai-template-smell.zh.md`。

不要逐条机械输出所有分类。只报告有证据、有影响、有修复价值的问题。

## 5. 根据输入类型选择审查方式

### 代码项目

- 先读项目结构、页面入口、全局样式、组件和路由。
- 基于组件实现、样式规则、断点、状态逻辑、内容结构和浏览器能力判断风险。
- 先看用户可见结果，再用当前技术栈寻找证据；不要把 Tailwind、某个组件库或某种 CSS 写法当成唯一标准。
- 如果能运行，再用浏览器验证关键视口和交互。
- 如果页面可运行但没有实际打开浏览器，不能把布局、hover、cursor、focus、弹层或响应式判断写成已验证结论；必须在报告中标明未实测风险。

### localhost / 可运行页面

- 优先用浏览器检查真实布局、滚动、点击、focus、弹窗和响应式。
- 记录实际视口、页面区域、滚动位置、交互状态和可见现象。
- 呼吸感、局部密度和视觉重量必须优先根据实际渲染判断；代码中的 gap、padding、margin 和 token 只用于定位根因，不能仅凭数值把紧凑或宽松写成确定缺陷。
- 对可运行页面，重点验证 source code 难以确认的内容：媒体裁切、弹层层级、滚动吸附、锚点跳转、表单状态和移动端触控。
- 对可运行页面，必须做一轮 pointer / hover smoke check：主要按钮、搜索按钮、链接、标签、卡片操作、图标按钮和自定义 clickable 区域在鼠标悬停时应显示正确可点击意图和状态反馈。
- 不要只看源码就下最终结论。

### 截图

- 只能审查可见的视觉、布局、层级、文案和明显状态。
- 不要断言 hover、focus、键盘路径、弹窗关闭、loading 等无法从截图验证的行为。
- 需要交互判断时，列入 `Open Questions`。

### 单组件

- 重点检查尺寸、状态、长内容、组合变体、可访问名称和与周边组件的关系。
- 同时检查组件是否适配真实内容：长标签、图标、数字、错误文案、loading、disabled、empty、media ratio 和不同容器宽度。
- 不要按整页 landing page 标准审查一个组件。

### 整站

- 先抽样核心路径，不要逐页穷举。
- 至少覆盖首页、核心转化页、核心功能页、表单/登录/设置等状态密集页面。
- 覆盖至少一个数据/列表密集页面、一个表单或设置页、一个弹层/菜单密集流程；如果是后台产品，优先抽样表格、筛选、批量操作和危险操作。
- 输出系统性问题和 Top Findings，而不是把每一页的小问题堆在一起。

## 6. 检查项目结构

如果审查的是代码项目，先找到：

- 页面入口：`app/`、`pages/`、`src/routes/`、`src/pages/`、`index.html` 等。
- 全局样式：`globals.css`、`app.css`、CSS Modules、Sass、工具类配置、design tokens、主题变量、断点规则。
- 组件：button、card、input、select、combobox、dropdown、checkbox、radio、switch、textarea、file upload、modal、drawer、popover、tooltip、nav、tabs、table、list、toast。
- 路由和页面类型：home、pricing、dashboard、settings、docs、auth、checkout。
- 已有 UI 系统：shadcn、Radix、MUI、Bootstrap、自定义组件、工具类 CSS、自定义 CSS 或原生 HTML 控件体系。
- 富内容和媒体：图片、视频、iframe、图表、代码块、富文本、表格、长列表和空/错误/loading 状态。
- 交互层和滚动：sticky/fixed header、dropdown、popover、modal、toast、drawer、scroll container、锚点、scroll snap。

不要在不了解项目结构时直接给大范围设计建议。

### 自定义控件一致性检查

代码审查时必须主动检查项目是否已有自定义基础控件，并反查页面是否仍混用原生控件：

- 先找已有组件：`Select`、`Combobox`、`Dropdown`、`MultiSelect`、`Checkbox`、`RadioGroup`、`Input`、`Textarea`、`Button` 等。
- 再找原生用法：`<select>`、`<option>`、`<input type="checkbox">`、`<input type="radio">`、`<input type="file">`、未封装的 `<input>` / `<textarea>`，以及只靠浏览器默认样式的控件。
- 检查 appearance、accent-color、caret-color、color-scheme、field-sizing、resize 等原生控件能力是否和当前视觉体系一致。
- 如果项目已有对应自定义控件，但某个页面仍使用突兀原生控件，必须作为 `Components And States` 或 `Forms` finding 评估，不要只放进 `Content Stress` 或 `Pass Notes`。
- 如果项目没有对应自定义控件，但原生控件明显不符合当前网站风格，也要报告；修复方向是建立或封装与现有视觉体系一致的基础控件，而不是只调整单个页面。
- 如果原生控件只是视觉略不协调且不影响操作，通常是 `Minor`；如果出现在筛选、批量操作、编辑表单等核心后台流程，并明显破坏视觉系统或操作信心，通常是 `Major`。

## 7. 运行与视口检查

如果项目可运行，优先用浏览器验证真实布局和交互，并可用截图记录证据。视口数量按模式控制，不要把所有 audit 都跑成 Deep Audit。

启动或复用服务时必须管理生命周期：

- 如果复用用户已启动的 localhost / dev server，只记录 URL / 端口，不要擅自关闭。
- 如果本次 audit 为浏览器验证临时启动 dev / preview / static server，记录启动命令、URL / 端口和进程信息。
- 审查结束后关闭本次 audit 临时启动的服务，避免占用端口；只有用户明确要求保留运行，或关闭会影响用户已有服务时才不关闭，并在报告中说明。
- 关闭临时服务后检查目标端口是否仍被占用；在 Windows、npm、Next.js、Vite、Storybook 等多进程启动场景下，不要只依赖启动返回的父 PID。
- 如果端口仍被占用，只清理能确认属于本次 audit 启动的进程；无法确认时不要关闭，并在报告中说明残留端口 / PID / 原因。

`Quick Audit`：

- 检查当前视口，或用户最关心的 1 个关键视口。
- 只看 Critical usability、明显响应式风险、首屏主次和核心可点击元素。
- 如果当前问题明显来自移动端或桌面端，优先选择该视口。

`Standard Audit` 默认检查：

- 375px mobile
- 1280px desktop

`Standard Audit` 可按页面类型增加 768px tablet，但不是强制矩阵。只有当问题明显涉及平板断点、侧栏、表格或多列布局时才补查。

`Standard Audit` 在核心视口还应对每个主要页面抽查至少 1 个核心功能模块，例如导航、筛选区、表单、卡片、表格工具栏或 CTA。抽查模块时进入组件内部，不只看模块外框。

`Focused Audit` 默认检查：

- 375px mobile
- 1280px desktop

`Focused Audit` 按风险增加视口：

- 平板/侧栏/表格/多列风险：768px 或 834px
- 宽屏构图/大屏留白/容器约束风险：1440px 或 1920px
- 移动端已经出现裁切、横向滚动或密度风险：360px 或 390px

`Focused Audit` 在核心视口检查所有主要功能模块，并对重复出现的卡片、表单项、按钮组或工具栏抽查至少一个代表实例；相同根因跨模块出现时合并 finding，但保留代表位置。

如果时间或环境只能检查部分视口，至少检查当前问题最可能出现的 1 个视口，并在报告中写清未验证项。

`Standard Audit`、`Focused Audit` 和 `Deep Audit` 的浏览器检查先扫首屏布局关系：

- hero 两栏、搜索区、主要视觉容器和下一段内容之间是否有压住、断裂、错位或空洞感。
- mockup、插画、截图、图表或装饰容器是否内容过少但占位过大，导致首屏构图失衡。
- 搜索框、CTA、标签组、卡片组是否与上下 section 的间距、对齐和层级关系自然。
- 可点击元素是否有 cursor、hover、active 和 focus-visible 等基本交互信号。

然后按模式执行空间关系扫描：

1. 页面级：首屏、section、主要内容区和行动路径之间是否过挤、断裂、空洞或主次失衡。
2. 模块级：导航、筛选、表单、卡片、表格、工具栏、弹层和 CTA 的 padding、分组、密度和操作区是否成立。
3. 组件内部：图标/文字、标题/说明、label/控件/帮助或错误文本、按钮组、状态标签等紧密关系是否拥挤、粘连或被过大间距拆散。

不要把三级扫描理解为逐 DOM 节点穷举。Standard 做核心模块抽查，Focused 覆盖主要模块并抽查重复组件，Deep 才系统覆盖三级关系。

Deep Audit 增加：

- 360px
- 390px 或 430px
- 834px
- 1440px
- 1920px

Deep Audit 还应尽量检查：

- 媒体：图片、视频、iframe、图表和产品截图的 aspect-ratio、object-fit、裁切焦点和加载前占位。
- 滚动：sticky header 下的锚点跳转、scroll-margin / scroll-padding、scroll snap、滚动条出现时的布局跳动。
- 数据内容：表格、代码块、富文本、长列表和多列内容在移动端、平板和大屏的降级方式。
- 状态和可访问性：focus-visible、键盘路径、forced colors / 高对比度风险、reduced motion。
- 局部完成度：在表单、筛选/工具栏、卡片或数据密集区中选择有代表性的模块，确认组件内部 spacing、line-height、状态文案和点击热区没有被页面级结论掩盖。

如果 audit 实际打开浏览器并保存截图，优先把截图保存到当前项目的 `examples/reports/assets/audit/` 下，按本次审查建立子目录，例如 `examples/reports/assets/audit/2026-05-24-home/`。文件名应包含页面或区域、视口和状态，例如 `home-375.png`、`dashboard-1280-filter-open.png`。如果项目不可写、用户指定了其他目录，或只能使用工具内临时截图，也要在报告中说明截图保存位置或未落盘原因。

Audit 默认不写报告文件；只有用户明确要求记录、生成报告或写入 issue log 时才写入，优先放到 `examples/reports/` 或用户指定路径。除用户要求保留、报告中明确列出的证据产物或真实项目改动外，audit 过程中创建的临时文件应在报告前删除；无法删除时说明路径和原因。

如果无法运行页面：

- 基于 CSS、布局代码、断点和组件结构做静态推断。
- 明确写出未验证的视口和交互。
- 不要虚构“已看到”的浏览器结果。

## 8. 证据采集

根据审查方式记录证据：

- 浏览器证据：视口宽度、页面区域、交互状态、滚动位置、具体元素组合和可见现象；空间 finding 应说明是页面级、模块级还是组件内部关系。
- 服务证据：如果本次 audit 启动或复用了 dev / preview / static server，报告中写明 URL / 端口、服务来源、是否已关闭临时服务，以及是否存在端口或进程残留。
- 代码证据：文件路径、组件名、CSS 类、断点、状态分支、样式 token、组件 props、语义结构；spacing 数值通常用于解释可见问题，不应脱离渲染结果单独证明“太挤”或“太空”。
- 截图证据：截图区域、可见元素、层级关系、裁切或遮挡现象。
- 截图文件：如果本次 audit 保存了截图，在报告中列出截图目录和关键截图文件；如果截图只用于临时观察且没有落盘，也要说明。
- 临时文件：如果本次 audit 创建了临时脚本、临时页面、临时数据或一次性下载文件，默认在报告前删除；只有作为证据产物保留时才列入 `Artifacts(证据产物)`。
- 推断证据：基于代码或截图推断的风险，必须标明“未实测”或“需要验证”。
- 系统性证据：同类问题跨多个页面、组件或状态出现时，记录共同根因，例如 token 不一致、控件体系混用、断点策略缺失或滚动层级混乱。

证据要服务判断，不要为了显得详细而罗列无关实现。

## 9. 审查顺序

按这个顺序检查，避免一开始陷入审美细节：

1. Critical usability：overflow、遮挡、不可点击、不可读、导航/弹窗/表单不可用。
2. Responsive and layout stability：移动端、平板、大屏、fixed/sticky、z-index、媒体比例、表格/代码块/富文本溢出、首屏区域关系和视觉容器占位是否稳定。
3. Information hierarchy：首屏主次、页面类型是否清楚、核心任务是否明确。
4. Components and states：cursor、hover、active、focus-visible、disabled、loading、empty、error、success。
5. Form/control consistency：输入、选择、下拉、多选、菜单、批量操作是否沿用项目已有组件体系。
6. Data and rich content：表格、图表、代码块、富文本、长列表、数字排版和内容密度。
7. Visual system：按页面级、模块级、组件内部检查 spacing、typography、color、radius、border、shadow、background、filter、outline，避免只发现全局 token 问题而漏掉核心模块细节。
8. Interaction layers and motion：dropdown、popover、modal、toast、drawer、scroll behavior、动效、reduced motion。
9. Content stress：长文案、中英文混排、不同数据数量、不同图片比例、多列/分页/打印场景。
10. Accessibility baseline：键盘路径、可访问名称、语义结构、forced colors、高对比度。
11. AI template smell：空泛口号、过度 badge、bento grid、渐变光斑、虚假数据。
12. Minor polish：对齐、节奏、动效、文案细节。

## 10. 修复衔接

如果用户要求继续修复，进入 `fix-ui` workflow。

修复前先确认：

- 用户是否要求直接改代码。
- 是否只修 Critical/Major。
- 是否允许调整视觉 token。
- 是否需要保持现有视觉风格和内容不变。

修复顺序：

1. Critical：先修不可用、不可读、不可点击、不可关闭。
2. Major：再修响应式、信息层级、组件状态、视觉 token。
3. Content Stress：再修长文案、真实数据和变体内容。
4. AI Template Smell：删除模板噪音，补真实信息结构。
5. Minor：最后做对齐、动效、文案和视觉 polish。

不要在 audit 阶段直接大改代码，除非用户明确要求“审查并修复”。

修复后必须复检对应问题：

- 修 overflow 的，复检对应视口。
- 修状态的，复检 hover、focus-visible、disabled、loading、error。
- 修弹窗的，复检关闭、滚动和 focus。
- 修视觉 token 的，复检同类组件是否一致。

## 11. 输出规则

报告结构和省略规则，以 `references/checklists/ui-audit.zh.md` 中的输出规则为准。

## 12. 停止条件

- 已经找到会阻断使用的 Critical 时，先停止深挖 Minor，优先输出风险和修复顺序。
- Quick Audit 中，找到 Critical 或 5 到 8 个明显 Major 后即可停止，直接给修复顺序。
- Standard Audit 中，如果 Top Findings 已覆盖主要风险，仍需完成核心功能模块的内部空间抽查；之后不继续列低价值 polish。
- Focused Audit 中，优先扩展系统性问题和风险视口，但在停止前应覆盖所有主要功能模块；同类局部问题合并后保留代表位置，不追逐低价值 Minor 或全量评分。
- Deep Audit 中，系统性问题优先于零散细节，但不能用系统性结论替代三级扫描；同类 Minor 应合并，不逐点堆叠。多个局部 Minor 共同造成明显拥挤、扫描困难或操作压迫时，评估为一个系统性 Major。
- 如果证据不足，不继续推断；把问题放入 `Open Questions` 或标注需要验证。

## 13. 禁止事项

- 不要虚构浏览器验证结果。
- 不要输出没有位置、没有证据、没有修复建议的问题。
- 不要把纯审美偏好包装成缺陷。
- 不要在用户未指定 preset 时强行套用 preset 风格。
- 不要因为统一视觉而删除必要业务信息。
- 不要把没有验证的问题写成确定事实。
- 不要把本次 audit 临时启动的服务留在后台；也不要关闭 audit 开始前已存在或无法确认属于本次 audit 的服务。
