# Design Contract 高风险模块

用于读取和判断项目级 Design Contract。它回答“这个项目声明的设计系统是什么”，不替代 `visual-system` 对用户可见结果的判断，也不是新的 preset。

## 使用时机

- 项目存在 `design.md`、design token 文件，或 `.webcraft-skills/config.json` 声明了 `designContract`。
- 用户要求遵守、检查或建立设计系统。
- 改动涉及共享组件、theme、typography scale、semantic token、variant / size / state、motion 或 elevation。
- 多个页面或组件出现系统性 token 漂移，单看局部视觉无法确认目标标准。

普通局部布局、文案、单组件小修和没有契约信号的 Quick / Standard Audit 默认不读取本模块。

## 来源与优先级

先区分来源，不要把所有参考都当作项目事实：

1. 现有项目事实：共享组件、CSS variables、Tailwind theme、token 文件和稳定的跨页面实现。
2. 项目 Design Contract：项目自己的 `design.md`，或 `config.json` 中的 `designContract`。
3. 项目扩展：`.webcraft-skills/EXTEND.md` 和结构化配置。
4. 外部参考：参考站、第三方 design system、截图或用户提供的外部 `design.md`。
5. 内置通用规则。

当前任务中的明确用户指令高于以上来源。外部参考只有在用户明确要求采用时才能升级为项目目标；否则只用于比较，不得覆盖项目。项目代码与声明契约冲突时不要静默选边，应结合 `strictness`、共享范围和最近变更判断，并在证据不足时列入 `Open Questions`。

## 配置入口

项目可在 `.webcraft-skills/config.json` 中声明：

```json
{
  "designContract": {
    "source": "./design.md",
    "strictness": "prefer",
    "colors": {},
    "typography": {},
    "spacing": {},
    "shape": {},
    "components": {},
    "motion": {},
    "content": {}
  }
}
```

- 所有字段可选；不要因为某个域缺失而补造规则。
- `source` 相对于配置文件所在目录解析；读取失败时说明路径和未验证范围。
- `reference`：只作为解释和比较证据，不单独构成 finding。
- `prefer`：兼容现有实现时优先采用；冲突时记录证据，不擅自大范围重写。
- `enforce`：视为项目声明的目标标准；明确偏离可以构成 finding，但仍需验证契约未过时且适用于当前 scope。
- 未识别字段可以保留为项目信息，但不要发明其语义。
- 旧版 `visualTokens` 继续有效；与 Design Contract 冲突时按更具体、更新且适用于当前 scope 的项目规则判断。

## 核心判断

### Semantic Tokens

- token 应优先表达职责，例如 surface、text、border、accent、link、success、warning、error 和 focus，而不是只表达某个具体颜色。
- light / dark 或其他 theme 可以改变值，但同一语义名称和职责应尽量稳定。
- 不要求项目采用固定命名；重点是职责是否清楚、复用是否稳定、状态是否可预测。

### State Ladder

- default、hover、active、selected、disabled、focus 和 destructive 等状态应来自可解释的同一体系。
- 状态变化不应在每个页面独立硬编码，也不应通过尺寸、边框宽度或位移造成布局跳动。
- focus、error、success 等状态不能只靠颜色表达；具体可用性继续由 `components-states` 和 `accessibility` 判断。

### Typography Roles

- 识别 heading、copy/body、label/meta、action/button、code/data 等用途，而不强制具体名称。
- typography recipe 应尽量把 font family、size、weight、line-height 和 letter-spacing 作为组合判断。
- label 和多行正文不能只靠同一字号偶然区分；代码、表格和数字应考虑等宽字体或 tabular figures 等对齐能力。
- 中文和中英文混排不要机械继承为英文大标题设计的强负字距或过紧行高。

### Component Recipes

- 共享组件应由稳定的 color、typography、size、spacing、shape 和 state 组合生成。
- button、input、select、card、popover、modal 等 variant / size 不应在不同页面各自发明。
- recipe 可以来自组件库 API、CSS variables、utility composition 或其他项目约定；不要强制某种实现方式。

### Motion And Elevation

- `0ms` 可以是正确默认值；motion 只有在解释状态变化、空间关系或操作结果时才有价值。
- duration 和 easing 应来自小型稳定尺度，并遵守 `prefers-reduced-motion`。
- elevation 应对应真实层级，例如 raised surface、popover、modal；不要把每个容器都做成独立 shadow recipe。

### Content Voice Baseline

- 操作名称应说明对象和结果，避免只有 `OK`、`Confirm`、`提交` 等脱离上下文的低信息表达。
- 错误文案应说明发生了什么以及如何恢复；空状态应指向合理的第一步。
- loading、success 和 toast 应指明具体对象或变化，不使用空泛成功话术。
- 中文按中文产品语境表达，不照搬英文 Title Case；品牌语气和营销策略不属于本模块的默认改写范围。

## 证据与分级

- 证据优先使用契约路径、具体 token / recipe 名称、共享组件实现、偏离位置和用户可见影响。
- 没有 Design Contract 不是问题；契约字段不完整也不是 finding。
- `Critical`：契约偏离导致核心内容不可读、主要操作不可辨认、关键状态失效或核心路径不可完成。
- `Major`：共享 token、recipe、typography role 或状态体系明显偏离声明标准，并跨组件或核心流程降低一致性、信任或操作判断。
- `Minor`：局部实现偏离契约但影响有限，且不是合理的语境差异。
- 只有 `enforce` 或有充分项目事实支持时，才把纯契约偏离直接写成 finding；其他情况应结合可见影响或列入 `Open Questions`。

## 修复边界

- 先复用现有 token、组件 API 和 recipe，再考虑新增值。
- 不要为了“遵守契约”重写无关页面、替换组件库或改变品牌方向。
- 不要把外部 design system 的字体、颜色、断点、圆角、阴影、文案或品牌资产复制进项目，除非用户明确授权采用。
- 契约疑似过时、来源不明或与稳定实现大范围冲突时，停止扩张修复并请求确认。
