# Webcraft Skills

[English](./README.md) | 中文

适合 Codex 和 Claude Code 的 Webcraft skills collection，当前聚焦审查、修复、润色和构建更成熟的网页 UI。

AI Coding 工具已经很会写代码，但生成的 UI 经常会显得太拥挤、太花哨、层级混乱，或者有很强的“AI 模板感”。

---

# 下载环境和使用提示

安装 Webcraft Skills 前，先确认当前机器具备下载和写入 skill 的基础环境：

- 已安装 Node.js 和 npm，可以运行 `npx`。
- 当前网络可以访问 npm registry，或已经配置可用的 npm 镜像源。
- 当前用户目录可写，安装器需要写入 `~/.agents/skills`、`~/.codex/skills` 或 `~/.claude/skills` 等目录。
- 如果使用公司代理、私有网络或受限终端，先确认 npm 代理和证书配置可用。
- 推荐项目：Web 应用、静态站点、React / Next.js / Vue / Svelte / Astro / 原生 HTML CSS 项目，以及带组件库或自定义设计体系的前端项目。
- 推荐前提：项目里已有可运行入口、页面文件、组件文件、截图、PR diff，或你能说明要检查 / 修复 / 构建的页面范围。
- 浏览器不是每次都必须，但如果需要判断响应式、hover、弹窗、表单状态、客户端导航或真实布局，最好允许 Agent 打开页面验证。
- 如果 workflow 临时启动 dev / preview / static server，会记录端口、结束后关闭，并检查残留；已有服务默认不会被关闭。
- 除明确保留的截图、报告、证据产物或真实项目改动外，过程中创建的临时文件会在输出前删除。

使用时尽量说明三件事：

- 对象：页面、组件、PR、截图、功能流程、整站或新建模块。
- 目标：审查、review、修复、润色，还是构建。
- 重点：移动端、表单、弹窗、导航、内容压力、AI 模板感、上线前质量等。

---

# 这是什么？

Webcraft Skills 是一个面向 AI Agent 的 skills collection。当前第一个稳定 skill 是网页 UI 质量系统 `webcraft-ui`。

它不是 UI 框架、设计系统、组件库，也不是可视化建站工具。

`webcraft-ui` 的核心能力覆盖五个工作流：**Audit、Review、Fix、Polish 和 Build**。当前可安装的 skill 名称是 `webcraft-ui`，npm 包名是 `webcraft-skills`。

更完整的长期目标是：

- 排查布局、字体、颜色、边框、圆角、弹窗、响应式和交互状态
- 针对 PR、diff、组件、截图或局部页面做轻量 review
- 根据具体 findings 修复粗糙的 AI 生成 UI
- 在保留产品含义的前提下润色现有页面
- 生成更真实、更克制、能运行的网页或功能模块
- 先打磨可复用的核心 Skill，再逐步扩展 Codex / Claude / Cursor 等平台适配
- 让 AI 不只会生成 UI，也会像资深 UI/UX + 前端 reviewer 一样修 UI

当前推荐使用五个工作流：`audit`、`review`、`fix`、`polish` 和 `build`。Claude Code 会安装对应 command prompt 文件；Codex 中请使用 `/skills`、`$webcraft-ui` 或明确的自然语言调用。

---

# 稳定范围

适合用在这些场景：

- 审查现有页面、组件、功能流程、截图、localhost 页面或一组页面
- Review PR、diff、单组件、截图或指定页面区域中的 UI 风险
- 找出 UI 问题，并给出证据、严重程度、影响视口和修复方向
- 根据明确的 audit / review findings 修复问题
- 在不改变产品含义的前提下做视觉润色和模板感收敛
- 在现有项目中构建页面、站点或有明确任务的功能模块
- 默认保留现有视觉体系、业务逻辑、文案内容和技术栈
- 在可能时通过构建检查、浏览器页面打开和路径验证确认结果可用

Cursor 和 Plain Prompt 适配仍属于实验性或文档级能力。Preset 是可选视觉参考，不会在用户未指定时强行套用。

---

# 自测效果

下面是项目内置自测页的一次 audit / fix 对比。测试页故意加入横向滚动、弹层遮挡、媒体比例失控、原生控件割裂、表格溢出和 AI 模板感等问题；修复后保留原有紫/青渐变和玻璃卡片风格，只收敛布局、控件、表格、状态和可读性问题。

| 检测前 | 修复后 |
| --- | --- |
| ![检测前：粗糙上传审核页面](./examples/reports/assets/self-audit-before.png) | ![修复后：保留原主题的上传审核页面](./examples/reports/assets/self-audit-after.png) |

完整过程见 [`examples/reports/self-audit-rough-ui-report.md`](./examples/reports/self-audit-rough-ui-report.md)，测试页面见 [`examples/test-cases/self-audit-rough-ui/`](./examples/test-cases/self-audit-rough-ui/)。

---

# 快速开始

## 当前推荐安装

标准 skill 生态安装方式：

```bash
npx skills add frankguodev/webcraft-skills --skill webcraft-ui
```

这种方式会安装 `webcraft-ui` skill 目录，包括 `SKILL.md` 和 `references/` 中的 audit / review / fix / polish / build 工作流。安装后可通过自然语言、`/skills` 或 `$webcraft-ui` 调用。

如果你使用 Claude Code，并希望同时安装 `/ui-audit`、`/ui-review`、`/ui-fix`、`/ui-polish`、`/ui-build` 等 slash command prompts，请使用本项目自带的完整安装器。

安装到 Codex：

```bash
npx webcraft-skills install --agent codex
```

Claude Code 使用：

```bash
npx webcraft-skills install --agent claude
```

同时安装 Codex 和 Claude Code：

```bash
npx webcraft-skills install --agent all
```

只安装指定 skill：

```bash
npx webcraft-skills install --agent codex --skill webcraft-ui
```

查看 npm 包内包含的 skill：

```bash
npx webcraft-skills list
```

Codex 会安装到：

```text
~/.agents/skills/webcraft-ui
~/.codex/skills/webcraft-ui
```

安装器会同时写入两个 Codex 兼容路径，以支持不同的当前客户端。

Claude Code 会安装到：

```text
~/.claude/skills/webcraft-ui
~/.claude/commands/*.md
```

当前仓库按 skills collection 组织，后续新增 skill 会继续放在 `skills/<skill-name>/SKILL.md` 下。`npx skills add` 适合作为通用安装入口；`npx webcraft-skills install` 负责安装本项目额外维护的 Claude Code command prompts。

## 唤起方式

Codex 中可以直接用自然语言点名 `webcraft-ui`，也可以运行 `/skills`，或输入 `$` 来选择已安装的 `webcraft-ui` skill。

Claude Code 可使用已安装的 slash command prompts：`/ui-audit`、`/ui-review`、`/ui-fix`、`/ui-polish`、`/ui-build` 和 `/ui-preset`。命令后面的内容是给 Agent 的提示约定，不是独立 CLI 解析器。

具体怎么写 prompt，请看下面每个 workflow 的使用示例。

## 五个 workflow 怎么选

| 你的目标 | 推荐 workflow | 你可以这样说 |
| --- | --- | --- |
| 不确定页面哪里有问题，想先排查 | `audit` | `使用 webcraft-ui 对当前网站进行 Standard Audit` |
| 只看 PR、diff、截图或局部改动风险 | `review` | `使用 webcraft-ui review 当前 diff，只看本次改动` |
| 已经知道问题，想让 Agent 修掉 | `fix` | `使用 webcraft-ui 修复上次 audit 里的 Critical 和 Major` |
| 页面可用，但想更精致、更少模板感 | `polish` | `使用 webcraft-ui polish 当前首页，保留内容和主题` |
| 要新建页面、站点或功能模块 | `build` | `使用 webcraft-ui build 一个设置页，沿用当前项目组件` |

最稳的 prompt 通常包含：目标页面或文件、想用的 workflow、重点视口或交互、是否允许改代码、是否需要先给计划。Agent 会根据范围选择是否读取代码、打开浏览器、启动临时服务、保存截图或只做静态判断。

### Audit：审查问题

`Audit` 用来找问题、给证据和修复顺序，默认不直接改代码。适合在你想先知道 UI 风险时使用。

审查深度：

- `Quick Audit`：适合“快速看看”“有没有大问题”。只报告 Critical 和明显 Major，最多 8 条 findings。
- `Standard Audit`：默认实用模式。报告 Critical、Major 和少量高价值 Minor，通常 8 到 16 条 findings。
- `Focused Audit`：适合“认真检查”“聚焦深查”“上线前先看主要风险”。比 Standard 更深入，但不默认评分，最多 32 条 findings，并按风险扩展视口。
- `Deep Audit`：适合“全面排查”“严格 audit”“准备上线”。使用完整 audit 体系、评分模型、Content Stress Test 和更完整的视口检查。

这些审查模式的 findings 数量、严重级别、评分要求、视口范围和输出细节已经用结构化预算管理，因此不同 Agent 执行时会更稳定，不会把轻量审查做得过重，也不会把深度审查做得过浅。

默认视口从 375px mobile 和 1280px desktop 开始。Standard 可按需增加 768px。Focused 会按风险增加平板、宽屏或小手机视口。Deep 在项目可运行或可检查时，会扩大到小手机、平板、大桌面和宽屏视口。

浏览器证据：

- audit 打开浏览器时，会记录视口、页面区域、交互状态、滚动位置和可见现象。
- 如果保存截图，会在报告中列出截图目录和关键文件。audit 截图默认保存到 `examples/reports/assets/audit/<audit-run>/`。
- 如果 audit 临时启动 dev / preview / static server，会记录 URL / 端口，并在审查结束后关闭临时服务，除非你明确要求保留运行。
- 除报告中明确保留的证据产物外，audit 过程中创建的临时文件会在报告前删除。
- 如果无法运行页面，布局、hover、focus、弹层和响应式结论会标记为静态推断，而不是浏览器实测。

常见审查对象：

- 当前页面：快速判断正在编辑的页面有没有明显布局、层级、响应式或状态问题。
- 指定页面：例如首页、定价页、登录页、设置页、文章详情页、结算页。
- 指定功能：例如上传功能、搜索筛选、批量操作、注册登录、编辑表单、弹窗确认。
- 指定模块：例如所有后台管理页面、用户中心、内容管理、订单流程、数据看板。
- 指定视口或设备：例如只看移动端、重点检查 375px、检查平板和桌面断点。
- 上线前检查：使用 `Deep Audit` 做更严格的全局排查，并输出修复优先级。

Audit 使用示例：

```text
使用 webcraft-ui 对当前网站进行 Standard Audit。
使用 webcraft-ui 对首页进行 Quick Audit，只看 Critical 和明显 Major。
使用 webcraft-ui 对后台管理页面进行 Focused Audit，上线前认真检查但不要太重。
使用 webcraft-ui 对上传功能进行 Standard Audit，重点检查表单、状态、错误提示和移动端。
使用 webcraft-ui 对所有后台管理页面进行 Deep Audit，准备上线前全面排查。
使用 webcraft-ui 对当前 localhost 页面做 Standard Audit，重点看 375px 和 1280px。
使用 webcraft-ui audit 这个截图，只判断可见布局、层级、文案和明显状态。
```

Claude Code 示例：

```text
/ui-audit 对整个网站进行 Standard Audit
/ui-audit 对首页进行 Quick Audit，只看 Critical 和明显 Major
/ui-audit 对后台管理页面进行 Focused Audit，上线前认真检查但不要太重
/ui-audit 对上传功能进行 Standard Audit，重点检查表单、状态、错误提示和移动端
/ui-audit 对所有后台管理页面进行 Deep Audit，准备上线前全面排查
```

### Review：轻量审查

`Review` 用来审查 PR、diff、局部改动、单组件、截图或指定页面区域中的 UI 风险。它比 Audit 更轻，目标是回答“这次改动或这个局部有没有值得修的问题”。

适合：

- PR / diff UI review
- 单组件或单文件风险检查
- 截图中可见的布局、层级、文案和明显状态检查
- 指定页面区域或指定改动的回归风险检查

Review 默认不评分、不展开完整视口矩阵、不生成完整 audit 报告。它只报告有位置、有证据、有影响、有修复方向的问题。需要真实页面、多视口或复杂交互验证的问题，会放入 `Open Questions`，或建议升级为 `audit-ui`。

如果 Review 为了验证问题临时启动本地服务，会在 final 前关闭并检查端口；如果保存截图或浏览器证据，优先放到 `examples/reports/assets/review/<review-run>/`。其他临时文件默认在 final 前删除。

Review 使用示例：

```text
使用 webcraft-ui review 这个 PR，只看本次改动引入的 UI 风险。
使用 webcraft-ui review 当前 diff，重点检查响应式回归和组件状态。
使用 webcraft-ui review src/components/Header.tsx，判断导航、移动端菜单和可点击状态有没有风险。
使用 webcraft-ui review 这张截图，只指出可见的布局、层级和文案问题。
使用 webcraft-ui review 设置页的筛选区，不要扩大到整个后台。
使用 webcraft-ui review 这个按钮组件，重点看长文案、loading、disabled 和 focus-visible。
```

Claude Code 示例：

```text
/ui-review review 这个 PR，只看本次改动引入的 UI 风险
/ui-review review 当前 diff，重点检查响应式回归和组件状态
/ui-review review 设置页筛选区，不要扩大到整个后台
/ui-review review 这个按钮组件，重点看长文案、loading、disabled 和 focus-visible
```

### Fix：修复问题

`Fix` 用来根据明确的 audit / review findings 或用户指定问题修改代码。它的目标是把已确认的问题修到可用、清晰、一致，不是顺手重做整个页面。

在 Codex 中可以这样调用：

```text
使用 webcraft-ui 修复上次 audit 里的问题。
使用 webcraft-ui 修复上次 audit 里的 Critical 和 Major 问题。
使用 webcraft-ui 只修复首页移动端横向溢出问题。
使用 webcraft-ui 修复上传功能里的表单状态、错误提示和 loading 状态。
使用 webcraft-ui 修复后台管理页面里原生 select 和现有组件风格不一致的问题。
使用 webcraft-ui 先给 fix plan，不要直接改代码。
使用 webcraft-ui 修复 review 中指出的 CTA 按钮换行和 hover 状态问题。
使用 webcraft-ui 修复设置页弹窗关闭、滚动和 focus-visible 问题，并复检移动端。
使用 webcraft-ui 只修 Critical，不处理 Minor polish。
```

在 Claude Code 中可以这样调用：

```text
/ui-fix 修复上次 audit 里的 Critical 和 Major 问题
/ui-fix 只修复首页移动端横向溢出问题
/ui-fix 修复上传功能里的表单状态、错误提示和 loading 状态
/ui-fix 修复后台管理页面里原生 select 和现有组件风格不一致的问题
/ui-fix 先给 fix plan，不要直接改代码
/ui-fix 修复 review 中指出的 CTA 按钮换行和 hover 状态问题
/ui-fix 只修 Critical，不处理 Minor polish
```

常见修复范围：

- 按严重级别修：只修 `Critical`，或修 `Critical` 和 `Major`。
- 按页面修：只修首页、登录页、设置页、结算页等指定页面。
- 按功能修：只修上传、搜索筛选、批量操作、编辑表单、弹窗确认等流程。
- 按问题类型修：只修响应式溢出、组件状态、表单错误、弹窗关闭、视觉 token 不一致。
- 按计划修：先输出 `fix plan`，确认后再改代码。

`Fix` 会优先保留现有视觉体系、文案、业务逻辑和技术栈。除非你明确要求 redesign 或指定 preset，否则不会把页面改成另一种风格。

修复验证：

- fix 会尽量对齐用户实际会打开的环境：启动命令、URL / 端口、路由、登录态、数据状态和操作路径。
- build 通过不等于页面可用。页面可运行时，fix 会打开受影响页面或路由，检查白屏、runtime error、错误边界、关键资源加载失败、关键交互初始化失败和明显 console error。
- 如果 fix 临时启动 dev / preview / static server，会记录启动命令和 URL / 端口，并在验证结束后关闭临时服务。
- 如果 fix 过程中生成截图，会优先保存到 `examples/reports/assets/fix/<fix-run>/`，有修复前后对照时使用 `before` / `after` 命名。
- 除截图、报告、明确保留的证据产物或真实项目改动外，fix 验证过程中创建的临时文件会在输出前删除。
- 如果修复来源是 `Focused Audit`，fix 会优先处理 Top Findings、系统性 Major 和风险视口问题，不会自动扩展成 Deep 级别重构。

### Polish：润色现有 UI

`Polish` 用来在保留产品含义、信息结构、技术栈和视觉方向的前提下，让现有页面更精致、更真实、更少 AI 模板感。它不是 redesign，也不是修阻断 bug 的 workflow。

适合：

- 收敛 spacing、typography、颜色、圆角、边框、阴影
- 补齐 hover、focus-visible、disabled、loading、empty、error 等状态细节
- 删除过度 badge、bento grid、渐变光斑、空泛 slogan 和无意义装饰
- 让页面在不换风格的前提下更成熟、更克制

如果发现核心流程不可用、严重溢出、遮挡、表单无法提交或弹窗不可关闭，应先转 `fix-ui`。如果问题已经跨页面扩散，应先转 `audit-ui`。

Polish 生成的 before / after 截图优先保存到 `examples/reports/assets/polish/<polish-run>/`。临时对照文件、视觉草稿、验证脚本和临时数据默认在输出前删除，除非你要求保留或它们被列为证据产物。

Polish 使用示例：

```text
使用 webcraft-ui polish 当前首页，保留内容和主题，只减少 AI 模板感。
使用 webcraft-ui polish 定价页，重点收敛 spacing、字体层级和 CTA 层级。
使用 webcraft-ui polish 后台列表页，保留信息密度，让筛选区、表格和分页更统一。
使用 webcraft-ui polish 登录页，只做视觉细节和状态完善，不改变文案。
使用 webcraft-ui polish 这个 hero 区域，减少 badge 和渐变装饰，保留原品牌色。
使用 webcraft-ui 先诊断当前页面粗糙感来源，再给 polish plan。
```

Claude Code 示例：

```text
/ui-polish polish 当前首页，保留内容和主题，只减少 AI 模板感
/ui-polish polish 定价页，重点收敛 spacing、字体层级和 CTA 层级
/ui-polish polish 后台列表页，保留信息密度，让筛选区、表格和分页更统一
/ui-polish 先诊断当前页面粗糙感来源，再给 polish plan
```

### Build：构建页面或功能

`Build` 用来从零生成网站、完整页面，或在现有页面中构建有明确用户任务的功能模块。它的目标是交付真实可用、符合项目语境、后续可维护的 UI，而不是一张漂亮但脆弱的概念图。

适合：

- `Site Build`：构建网站、官网、产品站、多页面骨架或完整静态站点
- `Page Build`：构建一个完整页面，例如设置页、定价页、登录页、详情页
- `Feature Build`：构建页面区域或功能模块，例如筛选区、上传面板、空状态、表单流程

Build 会默认沿用现有项目的目录、路由、组件、token、全局样式和视觉体系。缺少真实业务事实时，会使用可替换 placeholder，而不会编造客户、价格、指标、案例、团队或奖项。

Build 的交付文件会写入真实项目位置或用户指定位置，不放入报告目录。验证截图或需要保留的证据产物优先放到 `examples/reports/assets/build/<build-run>/`。临时预览、mock、验证 HTML / 脚本和下载文件默认在输出前删除。

Build 使用示例：

```text
使用 webcraft-ui build 一个设置页，沿用当前项目的组件和路由约定。
使用 webcraft-ui build 一个上传功能模块，包含空状态、loading、错误和成功状态。
使用 webcraft-ui build 一个 pricing page，内容使用可替换 placeholder，不要编造真实客户或价格。
使用 webcraft-ui build 一个后台数据表格页面，包含筛选、批量操作、空状态和移动端降级。
使用 webcraft-ui build 一个静态 portfolio 首页，使用现有全局样式，确保 375px / 768px / 1280px 可用。
使用 webcraft-ui build 一个 onboarding stepper，只实现前端 UI，不添加后端、认证或数据库。
```

Claude Code 示例：

```text
/ui-build build 一个设置页，沿用当前项目的组件和路由约定
/ui-build build 一个上传功能模块，包含空状态、loading、错误和成功状态
/ui-build build 一个 pricing page，内容使用可替换 placeholder，不要编造真实客户或价格
/ui-build build 一个后台数据表格页面，包含筛选、批量操作、空状态和移动端降级
```

## 输出产物和临时文件

| workflow | 默认会保留什么 | 默认会清理什么 |
| --- | --- | --- |
| `audit` | 报告中列出的截图、证据路径和 findings | 临时脚本、临时页面、下载文件、未列为证据的中间文件 |
| `review` | 必要时保留局部截图或浏览器证据 | 临时截图、临时 diff 辅助文件、临时服务 |
| `fix` | 真实代码改动、必要的 before / after 截图 | 验证脚本、临时数据、临时服务 |
| `polish` | 真实代码改动、必要的 before / after 截图 | 临时对照文件、视觉草稿、验证文件 |
| `build` | 新建或修改的真实项目文件、必要验证截图 | 临时预览、mock、下载文件、验证脚本 |

如果你希望保留某个临时产物，可以在 prompt 里直接说明，例如“保留验证截图”或“保留 polish 前后对照图”。如果 workflow 启动了本地服务，它会区分已有服务和本轮临时服务；本轮临时服务会在输出前关闭并检查端口。

## Cursor

Cursor 暂时不属于稳定安装路径。如果你熟悉 Cursor Project Rules，可以先手动参考这些 workflow 规则。

## Plain Prompt

Plain Prompt 暂时不属于稳定发布能力。

## 项目扩展

在目标项目中创建 `.webcraft-skills/EXTEND.md` 和 `.webcraft-skills/config.json`，可覆盖默认 UI 审查标准、品牌约束、圆角体系、默认视口等。

用户级默认配置和优先级规则见 [`docs/configuration.md`](./docs/configuration.md)。

---

# 能力

稳定能力：

- 使用 Quick / Standard / Focused / Deep Audit 模式审查 UI 质量
- Review PR、diff、组件、截图或指定页面区域
- 根据明确的 audit / review findings 修复问题
- 保留业务含义的前提下润色页面
- 生成网站、页面或功能模块

可选能力：

- 查看和应用视觉 preset

---

# FAQ / 故障排查

**安装后找不到 skill？**  
先确认安装目标和你使用的客户端一致。Codex 通常检查 `~/.agents/skills/webcraft-ui` 和 `~/.codex/skills/webcraft-ui`；Claude Code 通常检查 `~/.claude/skills/webcraft-ui` 和 `~/.claude/commands/`。

**`npx skills add` 和 `npx webcraft-skills install` 有什么区别？**  
`npx skills add frankguodev/webcraft-skills --skill webcraft-ui` 是标准 skill 生态安装方式，会安装 `webcraft-ui` skill 本体。`npx webcraft-skills install --agent claude` 是本项目完整安装器，会额外安装 Claude Code slash command prompts。

**不知道该用 Audit 还是 Review？**  
整页、整站、上线前或多视口检查用 `audit`；PR、diff、截图、单组件或指定区域用 `review`。

**Polish 会不会把页面重做？**  
不应该。`polish` 默认保留内容、信息结构和视觉方向，只处理细节、状态、间距、层级和模板感。需要新增模块或重做结构时，应改用 `build` 或先做 `audit`。

**Agent 启动的本地服务会一直占着端口吗？**  
workflow 会把本轮启动的临时服务纳入清理，并在输出前检查端口。已有服务默认只复用，不会擅自关闭。

---

# 致谢

本项目的 skill 组织方式、安装体验和 README 结构受到这些项目和作者的启发。

特别感谢：

- [baoyu-skills](https://github.com/JimLiu/baoyu-skills)
- 作者 [宝玉](https://github.com/JimLiu) / [@dotey](https://x.com/dotey)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- 作者 [Matt Pocock](https://github.com/mattpocock) / [@mattpocockuk](https://x.com/mattpocockuk)

感谢他们对 AI Agent skill 生态的探索与分享。

---

# 免责声明

Webcraft Skills 是给 AI Agent 使用的辅助规则和工作流，不保证审查结论、修复结果或生成代码完全正确。使用前请理解 Agent 可能会误判 UI 问题、遗漏风险、产生不符合项目约束的修改，或在运行验证时触发本地命令和临时服务。

在生产项目中使用前，请自行审查变更、运行必要测试，并确认生成内容、业务文案、数据、视觉表达和第三方素材符合你的项目要求。由使用本项目产生的代码变更、发布风险、数据问题或业务影响，需要由使用者自行负责。

---

# 许可证

MIT
