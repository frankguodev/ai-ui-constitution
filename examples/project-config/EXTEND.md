# Project UI Extensions

Use this file in a target project to define UI preferences that should override the built-in skill defaults.

Examples:

- Preferred radius scale.
- Brand color constraints.
- Typography preferences.
- Product-specific UI anti-patterns.
- Default audit viewports.
- Design Contract clarifications that are easier to express in prose.

When the project has a structured design system, point `config.json` to the project's own `design.md` or declare only the contract domains the project actually uses. External design systems remain references unless the current task explicitly adopts them.
