# 更新日志

[English](./CHANGELOG.md) | 中文

---

## v0.1.25 - 2026-05-27

### Build

- 将页面呼吸感融入 `build-ui` 的信息结构、质量底线和自检规则，要求 section 节奏、容器宽度、卡片密度、段落行长和 CTA 权重共同服务扫描路径。
- 补充不同页面类型的密度判断：Dashboard / Admin 可以更紧凑，但仍需清楚分组；Landing / Portfolio / Content 页面应保留更明显的纵向节奏。
- 增加禁止项，避免为了“内容丰富”把页面填满，导致 section 无停顿、主次不清或用户难以快速扫描。

### Polish

- 将“呼吸感不足”并入 `polish-ui` 的 spacing / rhythm 诊断、润色优先级、分项策略和复检规则。
- 强化润色时对页面扫描路径、section 停顿、主 CTA 可见性、分组关系和移动端密度的检查。
- 增加禁止项，避免只靠压缩间距、缩小字号或塞满卡片制造表面整齐，从而破坏可读性和页面层次。
- 强化 `polish-ui` 对页面类型、构图轴线和呼吸感过量的判断，避免搜索 / 词典 / 资源索引页被润色成松散 landing。
- 补充搜索 / 列表信息页的中心轴规则，要求标题、说明、搜索栏、热门标签和后续内容容器共享稳定对齐逻辑。
- 将过度拉开 section、稀释内容密度和首屏内容下沉列为失败信号，避免用大留白制造伪高级感。
- 精简 `polish-ui` workflow，将 Audit / Fix 衔接、模式、复检和输出模板压缩进更短的执行路径，降低规则读取成本。
- 增加参考驱动润色规则：允许借鉴参考页的布局骨架、模块职责、元素种类、密度关系和图标语义，但禁止复制参考站品牌、文案、数据和业务承诺。
- 强化内容结构判断，要求识别重复 section、连续卡片网格、卡片面积与信息量不匹配以及图标语义重复等产品感问题。
- 将 `polish-ui` 的 Light / Standard / Deep 调整为内部执行深度，对外只暴露 `polish`，由 Agent 根据目标、风险和范围自行匹配。
- 强化参考驱动 polish 的防叠加约束：先盘点现有模块与可迁移参考模块，默认先合并再新增，避免把参考结构直接叠到现有页面上。
- 增加目录 / 搜索 / 词条 / 资源索引页的卡片密度规则，短内容入口优先使用紧凑列表、小入口卡、分组入口或降低视觉权重。
- 增加 polish 后的模块职责复盘，要求每个 section 回答清楚问题，避免多个 section 用相同形态回答同一入口问题。
- 调整 `polish-ui` 验证边界：默认不主动启动浏览器、不保存截图，只有用户明确要求浏览器验证、before / after 截图、多视口检查或已实测交付时才执行。

## v0.1.24 - 2026-05-25

### Review

- 将 `review-ui` 的运行页面验证约束轻量融入现有流程，保持 review 不默认启动浏览器或本地服务的定位。
- 要求混合审查运行页面时区分复用已有服务和本轮临时启动服务，并在输出中简短说明服务来源、URL / 端口和最终状态。
- 增加临时服务关闭后的端口检查规则，避免 Windows、npm、Next.js、Vite、Storybook 等多进程场景下只停止父 PID 后仍残留服务。
- 增加 review 证据产物存放规则，默认不写文件；保存截图、浏览器证据或报告时使用 `examples/reports/assets/review/<review-run>/`，其他临时文件在 final 前删除。

### Audit

- 强化 `audit-ui` 临时 dev / preview / static server 生命周期规则，要求关闭后检查目标端口和进程残留。
- 服务证据增加端口或进程残留说明，避免 audit 报告只记录启动信息而遗漏清理状态。
- 将 audit 截图保存规则扩展到所有实际保存截图的 audit 模式，并明确报告文件默认不写入；临时脚本、页面、数据和下载文件默认在报告前删除。

### Fix

- 强化 `fix-ui` 页面与路径验证中的服务来源管理，启动临时服务前先识别目标端口是否已有服务。
- 清理临时服务时要求结合端口和子进程检查，不能只依赖启动返回的父 PID。
- 明确 fix 证据目录只存截图、报告或证据产物，真实修复代码写入项目真实位置；验证临时文件默认在输出前删除。

### Polish

- 强化 `polish-ui` 轻量复检中的临时服务关闭和端口检查规则。
- 要求无法确认端口残留归属时不误关已有服务，并在 `Temporary service(临时服务)` 中说明。
- 明确 polish 的 before / after 截图和保留证据放入同一 `examples/reports/assets/polish/<polish-run>/` 目录，临时对照文件、草稿和验证文件默认删除。
- 收紧 `polish-ui` 的执行边界：review / audit finding 只能作为诊断线索，polish 默认不新增页面级信息模块，并要求去装饰时先做减法、复检同页信息重复。
- 强化 polish 交互细节检查，覆盖真实可点击元素的 cursor / pointer、focus-visible、状态不跳动、图标文字对齐、点击热区和长标签 / badge / chip / 错误文案压力。

### Build

- 为 `build-ui` 的自检与验证补充临时服务生命周期规则，覆盖启动前端口识别、启动记录、关闭后端口检查和多进程场景。
- 输出模板增加 `临时服务` 字段，便于说明 build 验证期间服务是否复用、关闭或残留。
- 增加 build 证据产物规则：交付文件放真实项目位置，验证截图和需保留证据放入 `examples/reports/assets/build/<build-run>/`，临时预览、mock、验证脚本和下载文件默认删除。

### 文档

- 更新 README 和 README_zh_CN，将公开说明从 audit / fix 稳定范围扩展为 Audit、Review、Fix、Polish 和 Build 五个工作流。
- 补充 review、polish、build 的使用示例、适用范围、验证产物位置和临时文件清理说明。
- 重排 README 使用方式，把示例分摊到每个具体 workflow 下，并补充使用环境、浏览器验证、临时服务和临时文件清理提示。
- 将 Cursor 和 Plain Prompt 保留为实验性适配，Preset 明确为可选视觉参考。
- 在 README 和 README_zh_CN 底部增加致谢，感谢 `baoyu-skills`、`mattpocock/skills` 及其作者对 AI Agent skill 生态的启发。
- 在 README 和 README_zh_CN 中增加免责声明，提醒使用者自行审查 AI Agent 的结论、代码变更、生成内容和发布风险。
- 继续优化 README 和 README_zh_CN 的外部读者路径，增加 workflow 选择速查、产物与临时文件说明，以及 FAQ / 故障排查。

### 发布

- 将 package 版本更新为 `0.1.24`，与 changelog 版本保持一致。
- 收紧 `SKILL.md` 与 slash command 入口说明：Build 覆盖站点、页面和功能模块，Fix 支持用户指定问题，Preset 仅在用户指定或 workflow 明确需要时读取。
- 修正 `/ui-review` 和 `/ui-build` 的提示边界，避免把整站体检误导为 Review，或在未指定 preset 时自动套用 preset。

## v0.1.23 - 2026-05-25

### Fix

- 将 `fix-ui` 的页面打开验证升级为页面与路径验证，要求区分直接路由、客户端导航和深链刷新。
- 增加真实上游入口、相邻导航面和下游出口的识别与复检规则，减少只验证目标 URL 的盲区。
- 补充按风险分层的验证成本控制：纯视觉小修保持轻量，高风险路由 / 导航 / 数据 / 客户端状态修复才进入完整路径矩阵。
- 强化 Next.js App Router / RSC / `next/link` 场景提醒，明确 build、HTTP 200 或 SSR HTML 不能替代客户端导航验证。
- 增加浏览器自动化失败时的降级规则：不能用 curl、HTTP 检查或 build 通过冒充浏览器路径验证，必须输出未验证项和剩余风险。

### Build

- 增强 `build-ui` 的构建前门槛，明确构建对象、项目环境、入口位置、路由导航、视觉来源、内容来源和验证方式。
- 增加内容真实性规则，避免在落地页、产品页和高保真页面中编造客户、价格、指标、案例或业务承诺。
- 增加现有项目中的路由与导航集成要求，避免只创建孤立页面而没有真实入口或离开路径。
- 增加构建后验证门槛，按静态 HTML、现有项目页面、导航入口、组件和纯视觉局部构建分层验证。
- 输出模板补充入口 / 路由、导航集成、占位内容、未验证项和剩余风险。
- 将 `build-ui` 模式收敛为 Site / Page / Feature 三类构建范围，移除把生产级作为单独模式的表达，明确所有 build 都应达到生产级基础质量。
- 压缩 `build-ui` workflow 结构，合并重复的输入、参考图、preset、实现边界、质量底线和验证规则，降低执行时 token 成本。

## v0.1.22 - 2026-05-24

Focused Audit 和更安全的 fix 验证版本。

### Audit

- 新增 `Focused Audit`，作为 Standard 和 Deep 之间的实用深查模式。
- `Focused Audit` 默认不评分，最多 32 条 findings，并按风险触发额外视口检查。
- 明确 audit mode 预算、模块读取、视口策略、截图证据产物和临时 dev server 清理规则。
- 补充浏览器 audit 生成截图时的保存目录和报告说明规则。

### Fix

- 强化页面打开验证：fix 需要尽量对齐用户真实会打开的启动命令、URL / 端口、路由、登录态、数据状态和操作路径。
- 增加临时 dev / preview / static server 生命周期规则，避免验证结束后继续占用端口。
- 增加 fix 截图证据产物规则，支持 before / after 命名。
- 增加 `Focused Audit` 来源处理：优先修 Top Findings、系统性 Major 和风险视口问题，不自动扩展成 Deep 级别重构。
- 输出模板补充来源模式、验证目标、开发服务状态和截图字段。

### Review

- 明确 `review-ui` 保持轻量代码 / diff / 截图审查定位，不默认启动浏览器、不截图、不管理临时服务。
- 将需要真实页面、多视口或交互状态确认的问题放入 `Open Questions`，并建议转为 `audit-ui` 或由 `fix-ui` 修复后验证。

### 文档

- 重新整理 README 结构，补充稳定范围、安装、调用方式、audit 模式、fix 验证、证据产物和能力状态。
- 示例中加入 `Focused Audit`。
- 更新公开能力说明，使其匹配当前稳定的 audit / fix 范围。

## v0.1.2 - 2026-05-22
 - 优化audit和fix功能


## v0.1.1 - 2026-05-21

`webcraft-skills` 的公开发布准备版本。

### 变更

- 项目名和包名从偏 UI 的旧名称调整为 `webcraft-skills`，为后续扩展成更完整的网站 skill pack 预留空间。
- 可安装的 UI skill 改名为 `webcraft-ui`，`webcraft-skills` 继续作为 npm 包名和仓库名。
- 更新公开 README 和 usage 文档，只承诺当前已验证的稳定工作流：audit 和 fix。
- 从面向用户的文档中移除维护者内部实现和同步运行层说明。
- 统一安装器帮助、package metadata 和 skill 路径，使其全部指向新的包名。
- 修正 Codex 安装和使用说明：Codex 同时安装到 `~/.agents/skills` 和 `~/.codex/skills` 以提升兼容性，并通过 `/skills`、`$webcraft-ui` 或明确自然语言调用，而不是依赖本包自定义 slash commands。

### Audit

- 继续打磨 audit checklist，强化原生表单控件、自定义组件复用、响应式断点、后台工作流和真实内容压力检查。
- 明确输入框、选择框、下拉框、多选框、菜单等原生控件在不符合网站风格，或绕过项目已有自定义组件时，应被识别为问题。

### Fix

- 补充控件修复策略：将不协调的原生控件替换或封装为符合项目风格的自定义组件。
- 强化修复后的复检范围：表单、弹窗、菜单、导航、响应式布局和交互状态。

### 发布

- 已通过项目校验和 npm dry-run 打包预检。

## v0.1.0 - 2026-05-20

Skill 化基础版本。

### 稳定能力

- 安装时会同时安装 skill package 和 slash command prompts。
- 当前稳定工作流：
  - Audit：严格排查 UI 质量问题。
  - Fix：根据明确的 audit findings 修复问题。
- 补齐 audit / fix 的中英文运行时 reference。
- 增加语言路由：中文用户读取 `.zh.md` reference，英文用户读取英文 reference。

### Audit

- 扩展 UI audit rubric，明确 Critical / Major / Minor 的分级标准。
- 加强后台 / dashboard、响应式断点、交互状态、真实内容压力、可访问性和视觉一致性检查。
- 增加原生控件检查：发现不符合网站风格的原生控件，或已有自定义控件却没有使用的情况。
- 完善 audit workflow：覆盖证据采集、视口检查、代码静态审查、截图审查和整站抽样。

### Fix

- 扩展 fix workflow：增加修复边界、修复优先级、验证步骤和输出格式。
- 增加输入框、选择框、下拉框、多选框、菜单等基础控件的修复策略。
- 增加修复后的复检规则：响应式、组件状态、弹窗、菜单、表单、导航和真实内容压力。

### 文档

- 重写 README，使其更适合外部用户阅读。
- 明确 audit 和 fix 是当前稳定能力。
- 标注 `/ui-review`、`/ui-polish`、`/ui-build`、`/ui-preset` 为实验性能力，尚未完整测试。
- 从公开 README 中移除维护者使用的同步运行层说明。

## v0.0.1 - 2026-05-16

项目的第一个公开版本。
