# UI Audit 审查标准

审查网页、应用界面、截图或整站的前端 UI 质量。目标不是表达审美偏好，而是识别会让页面显得粗糙、不可用、不真实、不像成熟产品的前端 UI问题。

本文件是主索引和判定总纲。具体检查路径已经拆到 `modules/*.zh.md`，审查时按页面信号选择模块，不要把所有模块都完整跑一遍。

## 目录

- 总原则
- 严重程度
- 评分模型
- 模块索引
- 输出格式
- 去重优先级

## 总原则

1. 先确认审查对象：单页、组件、功能模块还是整站。Rubric 是判断库，不是每次 audit 都要完整执行的任务清单；实际深度由 `Quick / Standard / Focused / Deep Audit` 决定。
2. 先看核心功能能否完成，再看信息是否清楚，然后看视觉体系、响应式、状态和精致度。
3. 修复建议默认保留原主题风格。只有用户明确要求 redesign，或当前视觉方向本身阻断理解/使用时，才建议重做方向。
4. 有浏览器环境时优先实测；没有实测时必须说明“未实测”，并把基于代码/结构推断的风险写清楚。
5. 证据优先来自用户可见结果，其次来自组件、CSS、设计 token、项目 Design Contract、DOM 结构、断点、截图或交互实测。
6. 输出时先列问题，再给修复顺序；不要先写长篇总结，也不要为了覆盖分类强行制造问题。

### 必须先识别的语境

- 页面类型：landing page、dashboard、app screen、portfolio、docs、form、checkout、admin、marketing site 等。
- 目标用户：普通用户、开发者、企业客户、创作者、内部运营、管理者等。
- 内容密度：低密度品牌表达、中密度产品介绍、高密度数据操作。
- 技术约束：已有组件库、工具类 CSS、CSS Modules、自定义 CSS、设计 token、响应式断点、框架和渲染方式。
- 设计语气：工具型、内容型、产品型、品牌型、编辑型、运营后台型。

### 不要报告的问题

- 纯主观偏好，且无法说明对可用性、清晰度、一致性或真实感的影响。
- 没有位置、没有证据、无法复现或无法推断的问题。
- “可以更好”但没有明确修复方向的问题。
- 为了凑数量而输出的低价值 `Minor`。
- 与用户目标无关的品牌、营销、文案策略扩展。
- 需要产品决策才能判断的问题，除非明确标为 `Open Question`。
- 把所有视觉差异都当成不一致；有些差异是为了建立层级。

## 严重程度

### Critical

会直接导致页面不可用、核心信息不可读、核心操作不可完成，或在常见设备上明显崩坏。

典型情况：

- 375px 等常见移动宽度出现横向滚动，或主要内容、表格、代码块、产品图被裁切。
- 主要 CTA、导航、表单、弹窗不可点击、不可关闭、不可读或键盘不可达。
- 首屏信息层级混乱到用户无法判断页面主题和下一步动作。
- 文本对比度严重不足，核心内容无法阅读。
- 弹窗、遮罩、sticky/fixed 元素遮挡主要内容且无法恢复。
- 关键图标按钮没有可访问名称，或 focus-visible 不可见导致核心路径无法完成。
- 表单提交、校验、loading、错误恢复缺失，导致用户无法完成或确认核心任务。
- 真实内容、长文案、不同图片比例或数据量变化导致核心信息/操作消失、溢出或不可点击。

### Major

不会完全阻断使用，但显著降低专业感、可信度、扫描效率、操作信心或响应式稳定性。

典型情况：

- 组件缺少关键状态，例如 hover、active、focus-visible、disabled、loading、empty、error、success。
- 可点击元素缺少明确可点击信号，例如 pointer、hover、focus-visible 或选中反馈。
- spacing、字体层级、圆角、边框、颜色、阴影或控件体系明显不统一。
- 移动端、平板或中间断点可用但拥挤、错位、换行不自然、点击区域偏小。
- 信息层级、CTA 优先级、导航位置、当前状态或页面叙事不清。
- 表单、筛选、搜索、表格、批量操作、危险操作等状态不完整。
- 输入框、选择框、下拉框、多选框等核心控件使用突兀原生样式，或项目已有自定义控件却没有沿用。
- 卡片、bento grid、徽章、统计数字、装饰图标过多，呈现明显模板拼贴感。
- 内容只适配理想短文案或固定数据量，真实内容会明显破坏布局节奏。

### Minor

不会明显影响使用，但会降低精致度、节奏感或整体完成度。

典型情况：

- 局部对齐、间距、边框透明度、阴影强度略不稳定。
- 同一视觉体系内，该有圆角的地方没有圆角，导致视觉不协调，棱角感很强
- 文案略空泛，标签、图标或装饰略多。
- 动效存在但不够克制，或 transition 节奏不够统一。
- hover、focus、loading、empty 等状态存在，但反馈强度、节奏或文案不够统一。
- 个别标题、按钮、标签或辅助文字换行不够自然，但仍可阅读和操作。
- 个别视口下 section spacing、图片裁切或卡片高度略不理想，但不影响核心流程。
- 同类组件在尺寸、内边距、图标线宽、圆角或文案语气上有轻微差异。
- 非核心输入框、选择框、下拉框、多选框仍使用突兀原生样式；如果出现在核心筛选、编辑或批量操作流程，应升为 `Major`。

## 评分模型

Deep Audit 或用户要求评分时使用。每项 0 到 5 分：

- `Usability(可用性)`：核心功能是否能顺利完成。
- `Clarity(清晰度)`：信息层级、页面主题、下一步动作是否清楚。
- `Consistency(一致性)`：spacing、typography、颜色、圆角、边框、组件体系是否统一。
- `Responsiveness(响应式稳定性)`：移动端、平板、桌面是否稳定。
- `Interaction States(交互状态)`：hover、active、focus-visible、disabled、loading、empty、error、success 是否完整。
- `Control System Fit(控件体系匹配度)`：输入、选择、下拉、多选、菜单、批量操作等基础控件是否沿用项目已有组件体系。
- `Visual Maturity(视觉成熟度)`：是否像成熟产品，而不是粗糙 demo。
- `AI Template Smell(AI 模板感)`：分数越高表示 AI 模板味越低。

`Overall(总体评分)` 不要简单平均。`Critical` 问题会显著拉低总分；如果核心流程不可用，总分最高不应超过 2.5。

## 模块索引

`modules/` 是具体检查路径。主文件负责判断框架、模块含义和报告归属；具体“本次 audit 要读哪些模块”由 `audit-ui` workflow 按模式和页面信号决定。

### `modules/layout.zh.md`

用于首屏关系、hero/search/chip/next section、区域边界、视觉容器、对齐系统、层叠关系和布局内容压力。

优先使用场景：

- landing page、产品页、首页、搜索页、后台首页。
- 首屏看着怪、空洞、压住、错位、漂移或像资源未加载。
- 需要判断“布局关系是否成立”，而不是单纯 polish。

### `modules/responsive.zh.md`

用于 375px / 768px / 1280px 关键视口、横向滚动、固定宽度、降级策略、媒体比例、表格/代码块/富文本、sticky/fixed 遮挡。

优先使用场景：

- 页面有复杂 grid、表格、卡片列表、筛选器、弹窗、mockup、长标题或 sticky 区域。
- 用户要求 mobile/tablet/desktop 检查。
- 代码里出现固定宽度、min-width、nowrap、overflow、absolute/fixed/sticky 等风险信号。

### `modules/components-states.zh.md`

用于 cursor、hover、active、focus-visible、disabled、loading、empty、error、success、selected、pressed、可点击信号和自定义 clickable 区域。

优先使用场景：

- 页面有按钮、链接、chip、card action、icon button、tab、accordion、menu 或 clickable div。
- 用户反馈“不知道哪里能点”“状态不明显”“操作没反馈”。
- 需要审查组件状态是否完整且不造成布局跳动。

### `modules/forms-controls.zh.md`

用于表单、搜索、筛选、选择控件、下拉、多选、批量操作、错误恢复、原生控件混用和移动端表单可用性。

优先使用场景：

- 登录、注册、上传、编辑、结算、设置页、后台筛选或批量操作。
- 项目已有自定义控件，但局部混用浏览器默认控件。
- 需要判断表单是否“能提交、能理解错误、能恢复”。

### `modules/visual-system.zh.md`

用于 typography、color、spacing、radius、border、shadow、装饰语言、图标/媒体一致性和主题保留。

优先使用场景：

- 页面像多个模板拼接，或用户反馈“不精致”“风格乱”“AI 味重”。
- 同屏出现多套圆角、边框、阴影、按钮风格、图标线宽或强调色。
- fix/polish 必须保留现有主题，只提升成熟度和一致性。

### `modules/design-contract.zh.md`

用于读取项目声明的 Design Contract，判断 semantic token、state ladder、typography role、component recipe、motion / elevation 和 content voice 基线。

优先使用场景：

- 项目存在 `design.md`、design token 文件，或 `.webcraft-skills/config.json` 声明 `designContract`。
- 用户要求遵守或检查设计系统，或改动涉及共享组件、theme、typography scale、variant / size / state。
- 多个页面或组件出现系统性 token 漂移，需要确认项目目标标准。

没有 Design Contract 不是问题；外部 design system 默认只是参考，只有用户明确采用后才成为项目目标。

### `modules/accessibility.zh.md`

用于键盘路径、focus-visible、可访问名称、语义结构、目标尺寸、状态表达、高对比度和 reduced motion 风险。

优先使用场景：

- 页面有表单、弹窗、菜单、自定义控件、图标按钮、危险操作或复杂状态。
- 用户要求 a11y、keyboard、screen reader 或 WCAG 风险检查。
- 交互能用鼠标完成，但键盘路径或状态表达不确定。

### `modules/ai-template-smell.zh.md`

用于首屏产品清晰度、虚假内容、模板拼贴、过度装饰、空泛文案、信息可信度和“看起来完整但不能决策”的问题。

优先使用场景：

- 页面有大量 badge、统计数字、bento grid、渐变光斑、抽象 mockup、通用图标。
- 文案充满“下一代”“重新定义”“释放潜能”等泛化表达。
- 页面氛围很足，但用户无法理解产品是什么、给谁用、下一步做什么。

### 常见交叉对象归属

- 导航：布局位置和响应式折叠归 `Layout / Responsive`，当前态、hover、菜单反馈归 `Components And States`，键盘路径和 aria 归 `Accessibility`。
- 弹窗、drawer、popover、toast：遮挡、滚动和层级归 `Layout / Responsive`，打开/关闭/loading/empty/error 状态归 `Components And States`，焦点管理和 Escape 归 `Accessibility`。
- 动效：状态反馈动效归 `Components And States`，装饰性动效和视觉节奏归 `Visual System`，reduced motion 或眩晕风险归 `Accessibility`。
- Design Contract：项目标准、token / recipe 来源和 strictness 归 `Design Contract`；用户可见的一致性结果仍归 `Visual System`，状态可用性仍归 `Components And States / Accessibility`。

## 输出规则

使用这个结构。中文语境下保留字段英文名是为了稳定识别，但必须同时给出中文含义：

### 输出结构

```markdown
### Context(上下文)

- Scope(范围):
- Audit mode(审查模式):
- Page type(页面类型):
- Viewports checked(已检查视口):
- Verification level(验证方式):
- Constraints(约束):

### Coverage(覆盖范围)

- Checked(已检查):
- Partially checked(部分检查):
- Not checked(未检查):

### Top Findings(主要问题)

- ...

### Critical
Location(位置):
Evidence(证据):
Impact(影响):
Fix(修复建议):

### Major

...

### Minor

...

### Open Questions(待确认问题)

- 需要用户确认或需要运行页面才能判断的问题。

### Pass Notes(通过说明)

- 简短说明没有发现明显问题的关键方面。

### Fix Order(修复顺序)

1.
2.
3.

### Score(评分)

- Usability(可用性):
- Clarity(清晰度):
- Consistency(一致性):
- Responsiveness(响应式稳定性):
- Interaction States(交互状态):
- Control System Fit(控件体系匹配度):
- Visual Maturity(视觉成熟度):
- AI Template Smell(AI 模板感):
- Overall(总体评分):

### Artifacts(证据产物)

- Screenshots(截图):
- Tools(工具):
- Changed files(已改文件):
```

规则：

- 中文报告使用模板中的双语字段标签，例如 `Location(位置):`、`Evidence(证据):`、`Impact(影响):`、`Fix(修复建议):`，不要简化成英文-only 字段。
- `Quick Audit` 可以省略 `Coverage(覆盖范围)`、`Artifacts(证据产物)`、`Score(评分)` 和 `Minor`。
- `Standard Audit` 可省略 `Score(评分)` 和 `Artifacts(证据产物)`，除非用户要求或已经生成截图、报告文件等证据产物。
- `Focused Audit` 默认省略 `Score(评分)`，保留 `Coverage(覆盖范围)`、`Top Findings`、`Fix Order(修复顺序)` 和必要的 `Open Questions(待确认问题)`；如果生成截图、浏览器证据或报告文件，保留 `Artifacts(证据产物)`。
- `Deep Audit` 保留 `Coverage(覆盖范围)`、`Open Questions(待确认问题)`、`Pass Notes(通过说明)`、`Fix Order(修复顺序)` 和 `Score(评分)`；如果使用了截图、浏览器或写入文件，保留 `Artifacts(证据产物)`。
- `Top Findings` 用于让用户先看到最重要风险；如果问题很少，可以省略。
- 每个 finding 必须有具体证据。
- 布局类 finding 优先给出浏览器证据：Viewport、区域、可见现象、可能根因和修复方向。
- Critical 和 Major 必须可定位、可修复。
- Deep Audit 中 Critical 如无发现也保留并写 `None found`；其他无发现分类可省略。
- `Open Questions` 只放需要确认的问题，不放建议。
- `Pass Notes` 不要逐项列通过，只保留 1 到 3 条高价值说明。
- `Score(评分)` 低于 4 分的项目要给一句扣分依据，避免只有数字没有判断。
- Audit 默认不写文件；只有用户明确要求记录、生成报告或写入 issue log 时才写入。若写入，列到 `Artifacts(证据产物)` 的 `Changed files(已改文件)`。
- 不要输出“检查了 X 项均通过”这类清单式通过项；只记录对用户决策有帮助的通过信息。

### 设备记录

- Quick Audit：按 `references/modes/audit-modes.json` 的预算执行，只做高风险视口/当前视口扫描。
- Standard Audit：默认检查或推断 `375px` 和 `1280px`，必要时增加 `768px`。
- Focused Audit：默认检查或推断 `375px` 和 `1280px`，按风险增加平板、宽屏或小手机视口。
- Deep Audit：按 mode 文件扩大到小手机、大手机、平板、大桌面和宽屏。

不能运行页面时，仍要基于 CSS、布局代码和断点推断风险，并明确哪些视口未验证。

## 去重优先级

1. 同一根因只报告一次，放在最能解释问题的模块或分类下。
2. 如果一个问题同时影响 Layout 和 Responsive，优先归到 `Responsive`。
3. 如果一个问题同时影响 Components 和 Accessibility，优先归到 `Accessibility`；但如果主要风险是状态缺失而非键盘/语义问题，可归到 `Components And States`。
4. 表单提交、校验、错误恢复、筛选、选择控件和批量操作，优先归到 `Forms Controls`；如果核心风险是可访问名称、键盘路径或语义，再归到 `Accessibility`。
5. 导航、弹窗、drawer、popover、toast 等交互层问题，按主要影响归属：遮挡/层级归 `Layout` 或 `Responsive`，状态反馈归 `Components And States`，焦点和键盘归 `Accessibility`。
6. 如果一个问题由 token 混乱导致，例如 radius、border、shadow 全部不一致，归为一个系统性 `Major`，不要拆成十几个 `Minor`。
7. `Critical` 不要被合并进大而泛的系统问题；阻断使用的问题必须单独列出。
8. 如果问题需要产品决策，放到 `Open Questions`，不要假装是确定缺陷。
9. 修复顺序永远是：先可用，再清晰，再一致，最后精致。
10. 除非用户要求 redesign，否则默认保留主题，只修阻断、混乱和不一致。
