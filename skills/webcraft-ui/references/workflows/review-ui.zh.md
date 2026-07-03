# UI Review 工作流

用于审查 PR、diff、局部改动、单组件、截图或指定页面区域中的 UI 风险。`review-ui` 是轻量到中等深度的 UI review，不是全量体检，也不是 `Quick Audit` 的同义词。

Review 的目标是判断“这个局部或这次变更有没有值得修的 UI 风险”，并给出短、准、可执行的 findings。不要把 review 写成审美散文，也不要默认展开完整 audit。

## 语言规则

读取本 workflow 前，skill 的 Locale Contract 已经选择了一个运行语言。继续使用这个语言，不要再打开配对的英文或中文 workflow/checklist/module 文件，除非用户明确要求翻译、双语比较、本地化或语言一致性检查。

## 1. Review 与 Audit 的边界

- `review-ui`：适合 PR / diff / 单文件 / 单组件 / 截图 / 局部页面区域 / 指定改动的风险审查。
- `Quick Audit`：适合“快速看看这个页面/网站有没有明显 UI 大问题”。
- `Standard Audit`：适合页面、功能或模块的主要 UI 风险排查。
- `Focused Audit`：适合认真但控成本地排查页面、功能或模块的主要系统性风险。
- `Deep Audit`：适合整站、上线前、严格排查、多视口和系统性问题。

区别不只是深度，而是对象：

- Review 关注“这次改动或这个局部是否有问题”。
- Audit 关注“页面、功能、模块或整站本身的 UI 质量如何”。

如果用户说“review 这个 PR / 这段 diff / 这个组件 / 这个截图 / 这个区域”，使用 `review-ui`。

如果用户说“快速看下首页/当前页面/整个网站有没有明显问题”，使用 `Quick Audit`，不要用 Review 冒充 Audit。

如果用户说“认真检查这个页面/模块，但不要太重”，通常升级为 `Focused Audit`，不要把局部 Review 拉成变相 Deep Audit。

Review 默认不做评分、不做完整视口矩阵、不做完整 Content Stress Test、不输出完整 Fix Order。Review 只报告当前范围内有证据、有影响、有修复价值的问题。

如果 review 中发现系统性问题，例如全站 token 混乱、多个页面响应式崩坏、组件状态体系缺失，可以建议升级为 `audit-ui`，但不要擅自扩大审查范围。

## 2. 确认审查范围

先确认或推断：

- Scope：PR / diff / 单文件 / 单组件 / 截图 / 局部页面区域 / 指定页面。
- Review target：本次变更、当前组件、可见截图、指定区域，还是用户点名的问题。
- Change type：新增 UI、重构组件、样式调整、交互状态、响应式修复、文案调整。
- Page type：landing page、dashboard、app screen、form、docs、portfolio 等。
- Existing visual system：当前颜色、字体、spacing、圆角、边框、组件风格和页面语气。
- Verification level：代码审查、截图审查、静态推断，或混合审查；如果混合审查需要运行页面，先区分复用已有服务还是本轮临时启动服务。

如果范围像整页或整站体检，先判断是否应该改用 `audit-ui`。不要为了方便把一个 Audit 请求压成 Review。

如果当前改动涉及 design token、共享组件、theme、typography scale、variant / size / state、motion 或 elevation，并且项目存在 `design.md` 或 `designContract`，读取 `references/checklists/modules/design-contract.zh.md`。Review 只判断本次改动是否偏离适用契约，不扩大成整站设计系统审查；没有契约信号时不读取。

## 3. Review 模式

### Quick Review / 快速审查

- 用于 PR / diff / 组件 / 截图的快速风险检查。
- 最多 5 条 finding。
- 只报告 Critical 和明显 Major。
- 不报告低价值 Minor。

### Standard Review / 标准审查

- 默认模式。
- 建议 5 到 10 条 finding。
- 聚焦当前范围内的可用性、响应式、组件状态、视觉一致性和明显回归风险。

### PR Review / PR 审查

- 用户给出 PR、diff、变更文件或变更描述时使用。
- 只审查本次变更引入的问题，以及变更可能影响的相邻 UI。
- 不把旧问题全部翻出来，除非它会被本次变更放大。
- 历史遗留问题只在三种情况下报告：本次改动引入回归、本次改动让旧问题更严重、旧问题会阻断本次改动的核心体验。
- 不审查与本次 PR 无关的整站风格问题。

## 4. 输入类型分支

### PR / Diff

- 先看改动文件和影响范围。
- 优先找回归风险：布局破坏、状态丢失、响应式断点变化、样式覆盖范围过大、组件 API 影响相邻场景。
- 只指出与本次改动相关的问题。

### 单组件

- 检查尺寸、状态、长内容、禁用/错误/加载、可访问名称、组合变体。
- 结合组件真实使用场景，但不要按整页标准审查一个组件。

### 截图

- 只能审查可见视觉、布局、层级、文案和明显状态。
- 不断言 hover、focus、loading、弹窗关闭、键盘路径等无法从截图验证的行为。
- 需要验证的交互放到 `Open Questions`。

### 指定页面或页面区域

- 只审查用户点名的区域、功能或改动影响范围。
- 可以检查首屏主次、核心操作、响应式风险、导航、CTA、内容压力和明显视觉体系问题。
- 不默认做整站一致性审查。
- 如果用户实际想要“快速体检整个页面”，建议改用 `Quick Audit`。

### 代码静态审查

- 基于结构、CSS、组件状态和断点推断风险。
- 对未运行页面的问题标明“基于代码推断”或“需要运行页面验证”。
- 如果某个问题必须依赖真实页面、多个视口或交互状态才能判断，放入 `Open Questions`，并建议转为 `audit-ui` 或在修复后由 `fix-ui` 验证。

### 运行页面验证

Review 不默认启动浏览器或本地服务。只有当前 finding 需要真实页面、视口或交互证据才能判断时，才做轻量运行验证。

- 优先复用用户已启动的 localhost / dev server；只记录 URL / 端口，不关闭。
- 如果本轮 review 临时启动 dev / preview / static server，记录命令、URL / 端口和进程信息，并在 final 前关闭。
- 关闭后检查目标端口是否仍被占用；在 Windows、npm、Next.js、Vite、Storybook 等多进程启动场景下，不要只依赖启动返回的父 PID。
- 如果端口仍被占用，只清理能确认属于本轮启动的进程；无法确认时不要关闭，并在 final 中说明。

## 5. 审查重点

按优先级检查：

1. 变更相关回归：本次改动是否破坏已有布局、状态、响应式、可访问性或组件契约。
2. 可用性：核心内容是否可读，核心操作是否可点击，关键路径是否可完成。
3. 响应式风险：当前范围在常见移动端、平板、桌面是否有明显风险。
4. 组件状态：hover、active、focus-visible、disabled、loading、error、empty、success。
5. 视觉一致性：颜色、spacing、字体层级、圆角、边框、阴影是否符合现有体系。
6. 内容压力：长文案、中英文混排、列表数量变化、图片比例变化、长选项和错误文案。
7. 明显 AI 模板感：过度 badge、bento grid、渐变光斑、空泛口号、疑似虚构数据。

不要为了覆盖所有分类而强行输出问题。Review 的价值是准确，不是全面。

## 6. 严重程度

- `Critical`：导致核心内容不可读、核心操作不可用、主要视口崩坏、关键流程中断，或本次改动引入明显回归。
- `Major`：显著降低可用性、响应式稳定性、一致性、可信度、扫描效率或组件复用安全性。
- `Minor`：不影响主要使用，但降低精致度或局部完成度。

Review 中不要输出太多 Minor。除非用户要求 polish，否则 Minor 应该少而准。

## 7. 问题质量标准

好的 review finding 应该短、准、可定位、能修复。

必须做到：

- 指明位置：文件、组件、页面区域、截图区域或 PR diff。
- 给出证据：具体视口、状态、代码结构、变更点或可见现象。
- 说明影响：为什么这会影响用户、产品质感、回归风险或组件复用。
- 给出修复方向：至少说明应该从哪里改。

不要写：

```text
这里不够高级。
```

要写：

```text
在 375px 宽度下，主按钮文案会换成两行并撑高按钮，导致 CTA 组高度跳动。建议给按钮组改为纵向排列，或限制按钮文案换行策略。
```

## 8. 输出格式

```markdown
## Context / 上下文

- Source(来源):
- Scope(范围):
- Review mode(审查模式):
- Review target(审查对象):
- Change type(变更类型):
- Page type(页面类型):
- Verification level(验证方式):
- Runtime note(运行说明):

## Findings / 问题列表

### Critical

#### 1. 问题标题
Location(位置):
Evidence(证据):
Impact(影响):
Fix(修复建议):

### Major

...

### Minor

...

## Open Questions

- 需要用户确认或运行页面才能判断的问题。

## Suggested Next Step / 建议下一步

- 建议先修什么，是否进入 `fix-ui`，是否需要升级为 `audit-ui`。
```

规则：

- 没有问题的级别不要输出。
- 每个 finding 必须可定位、有证据、有影响、有修复方向。
- 对截图或未运行页面，不要把推断写成事实。
- 如果本轮 review 启动或复用了本地服务，在 `Runtime note` 中简短说明服务来源、URL / 端口和最终状态。
- 如果本轮 review 启动了临时服务，final 前必须关闭并检查端口；无法确认已关闭时，说明残留端口 / PID / 原因。
- Review 默认不写文件；如果本轮保存截图、浏览器证据或报告文件，优先放到 `examples/reports/assets/review/<review-run>/`，并在 `Runtime note` 或输出中说明路径。
- 除用户要求保留、报告中明确列出的证据产物或真实项目改动外，review 过程中创建的临时文件应在 final 前删除；无法删除时说明路径和原因。
- 如果没有发现问题，明确说“未发现 Critical / Major UI 问题”，并说明剩余未验证风险。

如果没有发现问题，使用：

```markdown
## Findings / 问题列表

未发现 Critical / Major UI 问题。

## Residual Risk / 剩余风险

- 未运行页面，移动端交互状态未验证。
```

## 9. Review 后的流转

- 如果 findings 明确、范围小、修复路径清楚，建议进入 `fix-ui`。
- PR / diff review 进入 `fix-ui` 时，只修本次变更引入或放大的问题；历史问题除非阻断本次改动，不要混入修复范围。
- 如果问题主要是视觉成熟度、状态完成度、模板噪音或少量非阻断 Minor，建议进入 `polish-ui`，不要包装成 bug fix。
- 如果问题系统性强、涉及多个页面、多个组件、多个视口或需要评分，建议进入 `audit-ui`。
- 如果问题依赖产品信息、品牌决策或真实数据，放入 `Open Questions`，不要直接修。
- 如果 review 未发现 Critical/Major，只给出剩余风险，不要强行建议修复。

## 10. 何时升级为 Audit

建议升级为 `audit-ui` 的情况：

- 用户要快速检查整个页面、整站或上线前质量。
- 发现多个页面共享同一系统性问题。
- 需要严格检查多个视口、状态和内容压力。
- 需要评分、Top Findings、Fix Order 和完整报告。
- 当前 review 范围已经无法解释问题根因，需要从 UI 质量角度做全量体检。

## 11. 禁止事项

- 不要把 review 变成 redesign。
- 不要把 Quick Audit 请求误处理成 Review。
- 不要因为个人审美否定现有产品风格。
- 不要在用户未指定 preset 时强行套用 preset。
- 不要输出没有证据、没有位置、没有修复方向的问题。
- 不要扩大 PR / diff 审查范围，除非发现明确回归风险。
- 不要为了显得全面而列出低价值 Minor。
- 不要把本轮 review 临时启动的服务留在后台；也不要关闭 review 开始前已存在或无法确认属于本轮的服务。
