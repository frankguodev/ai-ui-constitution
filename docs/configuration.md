# Configuration

Projects can extend Webcraft Skills without editing the installed skill.

## Project Config

Create:

```text
.webcraft-skills/
├── EXTEND.md
├── config.json
└── presets/
    └── brand.md
```

## User Config

Create:

```text
~/.webcraft-skills/
├── EXTEND.md
└── presets/
```

## Priority

Apply configuration layers in this order:

1. Built-in skill rules.
2. User-level `~/.webcraft-skills/EXTEND.md`.
3. Project-level `.webcraft-skills/EXTEND.md` and `.webcraft-skills/config.json`.
4. Explicit user instructions in the current task.

Later layers override earlier layers.

Existing implementation and a declared Design Contract are project evidence, not simple configuration layers. They can disagree because one may be stale. Use `designContract.strictness`, shared scope, and recent changes as evidence instead of silently rewriting either side.

## `EXTEND.md`

Use `EXTEND.md` for human-written design preferences:

```markdown
# UI Extensions

- Use 8px card radius and 6px button radius.
- Prefer neutral backgrounds over saturated brand surfaces.
- Do not use decorative gradient blobs.
- Default audit viewports: 375, 768, 1280, 1440.
- Always check modal focus and mobile overflow.
```

## `config.json`

Use `config.json` for structured defaults:

```json
{
  "defaultPreset": "cinematic-minimal",
  "defaultViewports": [375, 768, 1280, 1440],
  "auditStrictness": "normal",
  "designContract": {
    "source": "../design.md",
    "strictness": "prefer"
  },
  "visualTokens": {
    "radius": {
      "card": "8px",
      "button": "6px",
      "input": "6px",
      "modal": "10px"
    },
    "avoid": [
      "decorative gradient blobs",
      "excessive bento grids",
      "neon glow"
    ]
  }
}
```

## Design Contract

`designContract` is a lightweight project-level entry for structured design intent. It is not a preset and does not import another brand's visual values automatically.

Supported optional fields:

```json
{
  "designContract": {
    "source": "../design.md",
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

All fields are optional:

- `source`: path to the project's contract file, resolved relative to `.webcraft-skills/config.json`.
- `strictness`: `reference`, `prefer`, or `enforce`.
- `colors`: semantic color responsibilities and theme relationships.
- `typography`: heading, copy, label, action, and code/data roles.
- `spacing`: project spacing scale or relationship rules.
- `shape`: radius, border, and shape conventions.
- `components`: shared component recipes, variants, sizes, and states.
- `motion`: duration, easing, reduced-motion, and transition guidance.
- `content`: action naming, error recovery, empty-state, loading, and toast guidance.

Strictness:

- `reference`: use the contract only to explain and compare. Deviation alone is not a finding.
- `prefer`: follow it when compatible with existing implementation. Surface unresolved conflicts instead of rewriting broad areas.
- `enforce`: treat it as the declared project target after confirming the contract is current and applies to the task scope.

Missing domains do not authorize the agent to invent values. Unknown fields may be retained as project information but should not be assigned invented meaning.

## Existing `visualTokens`

`visualTokens` remains supported for compact legacy preferences such as radius values and anti-pattern lists. It does not need to be migrated immediately.

When `visualTokens` and `designContract` overlap, use the more specific, current rule that applies to the target scope. If the conflict cannot be resolved from project evidence, report it instead of silently choosing one.

## External References

A third-party `design.md`, reference site, screenshot, or design system is comparison material by default. It becomes a project target only when the user explicitly asks to adopt it. Do not copy external fonts, colors, breakpoints, radii, shadows, copy, logos, or brand assets merely because a reference is available.

