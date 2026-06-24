# Design Contract High-Risk Module

Use this module to read and judge a project-level Design Contract. It answers "what design system does this project declare?" It does not replace `visual-system` judgment of visible outcomes and is not a new preset.

## When To Use

- The project has `design.md`, design-token files, or a `designContract` entry in `.webcraft-skills/config.json`.
- The user asks to follow, inspect, or establish a design system.
- The change affects shared components, themes, typography scales, semantic tokens, variant / size / state, motion, or elevation.
- Multiple pages or components show systemic token drift and local visual inspection cannot establish the intended standard.

Do not load this module by default for small layout/copy fixes, isolated component edits, or Quick / Standard Audits without contract signals.

## Sources And Priority

Separate sources before treating anything as project truth:

1. Existing project facts: shared components, CSS variables, Tailwind theme, token files, and stable cross-page implementation.
2. Project Design Contract: the project's own `design.md` or `designContract` in `config.json`.
3. Project extensions: `.webcraft-skills/EXTEND.md` and structured config.
4. External references: reference sites, third-party design systems, screenshots, or external `design.md` files supplied by the user.
5. Built-in general guidance.

Explicit instructions in the current task override these sources. An external reference becomes a project target only when the user explicitly adopts it; otherwise it is comparison material and must not override the project. When project code conflicts with the declared contract, do not silently choose a side. Use `strictness`, shared scope, and recent changes as evidence, and put unresolved conflicts in `Open Questions`.

## Configuration Entry

A project may declare this in `.webcraft-skills/config.json`:

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

- Every field is optional; do not invent rules for missing domains.
- Resolve `source` relative to the config file directory; report the path and unverified scope when it cannot be read.
- `reference`: explanatory and comparison evidence only; deviation alone is not a finding.
- `prefer`: use it when compatible with existing implementation; record conflicts instead of silently rewriting broad surfaces.
- `enforce`: treat it as the project's declared target; clear deviation may be a finding after confirming the contract is current and applies to the scope.
- Preserve unknown fields as project information, but do not invent their meaning.
- Legacy `visualTokens` remains valid; when it conflicts with the Design Contract, use the more specific, current project rule that applies to the scope.

## Core Judgment

### Semantic Tokens

- Tokens should prefer responsibilities such as surface, text, border, accent, link, success, warning, error, and focus instead of only naming a concrete color.
- Light, dark, or other themes may change values, while semantic names and responsibilities should remain stable where possible.
- Do not require fixed naming. Judge whether responsibilities are clear, reuse is stable, and states are predictable.

### State Ladder

- Default, hover, active, selected, disabled, focus, and destructive states should come from one explainable system.
- States should not be independently hard-coded per page or cause layout shifts through size, border-width, or position changes.
- Focus, error, and success cannot rely on color alone; detailed usability remains owned by `components-states` and `accessibility`.

### Typography Roles

- Identify heading, copy/body, label/meta, action/button, and code/data roles without enforcing exact names.
- Judge typography recipes as combinations of font family, size, weight, line-height, and letter-spacing.
- Labels and multiline copy should not depend on accidental same-size styling; code, tables, and numeric data should consider monospace or tabular-figure alignment.
- Chinese and mixed Chinese/English content should not mechanically inherit strong negative tracking or tight line-height intended for large English headings.

### Component Recipes

- Shared components should be generated from stable color, typography, size, spacing, shape, and state combinations.
- Button, input, select, card, popover, and modal variants / sizes should not be reinvented per page.
- Recipes may come from component-library APIs, CSS variables, utility composition, or other project conventions; do not enforce one implementation method.

### Motion And Elevation

- `0ms` can be the correct default. Motion is valuable only when it explains state change, spatial relationship, or operation result.
- Duration and easing should come from a small stable scale and honor `prefers-reduced-motion`.
- Elevation should map to real layers such as raised surfaces, popovers, and modals; do not give every container an independent shadow recipe.

### Content Voice Baseline

- Action names should identify the object and result instead of relying on context-free labels such as `OK`, `Confirm`, or `Submit`.
- Errors should state what happened and how to recover; empty states should point to a reasonable first action.
- Loading, success, and toast copy should identify the specific object or change instead of using vague success language.
- Follow the product language and locale rather than copying English Title Case rules; brand voice and marketing strategy are outside this module's default rewrite scope.

## Evidence And Severity

- Prefer evidence that names the contract path, exact token / recipe, shared component implementation, deviation location, and visible impact.
- Missing Design Contract is not a problem; incomplete contract domains are not findings.
- `Critical`: deviation makes core content unreadable, primary actions indistinguishable, key states fail, or a core path impossible.
- `Major`: shared tokens, recipes, typography roles, or state systems clearly diverge from the declared standard across components or core flows, reducing consistency, trust, or operation judgment.
- `Minor`: a local implementation diverges with limited impact and is not a justified contextual difference.
- Treat contract-only deviation as a direct finding only under `enforce` or with strong project-fact support; otherwise combine it with visible impact or put it in `Open Questions`.

## Fix Boundaries

- Reuse existing tokens, component APIs, and recipes before adding values.
- Do not rewrite unrelated pages, replace the component library, or change brand direction in the name of contract compliance.
- Do not copy fonts, colors, breakpoints, radii, shadows, copy, or brand assets from an external design system unless the user explicitly authorizes adoption.
- When the contract appears stale, has unclear provenance, or conflicts broadly with stable implementation, stop expanding the fix and request confirmation.
