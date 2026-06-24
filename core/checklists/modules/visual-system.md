# Visual System High-Risk Module

Use this module to strengthen visual-system checks in `ui-audit.md`, especially spacing, typography, color, radius, border, shadow, and decorative language that do not behave like one product.

## When To Use

- The page feels stitched from multiple templates, or the user says it looks unpolished, inconsistent, or AI-generated.
- One screen contains multiple radius systems, border weights, shadows, button styles, card densities, icon strokes, or accent-color roles.
- Fix/polish work needs to preserve the theme while improving maturity and consistency.

## Required Checks

- Hierarchy system: H1, H2, body, caption, and button type should use a small stable scale of size, weight, line-height, and spacing.
- Color roles: primary, accent, state, link, and data-highlight colors need clear responsibilities; avoid one-hue domination or saturated overuse.
- Container language: card, panel, modal, popover, table, and form controls should share a radius, border, and shadow scale.
- Spatial rhythm: container width, section spacing, card padding, grid gaps, and button gaps should be proportional; spacing should express content relationships instead of uniformly enlarging or compressing whitespace.
- Decorative restraint: gradients, glass effects, glow, background images, textures, masks, filters, and blend modes should support information, not hide weak content.
- Icons and media: icon stroke, size, color inheritance, illustration/mockup/screenshot ratios should fit the component system.
- Theme preservation: fixes should refine the existing direction, not switch to another aesthetic without permission.

### Spatial Relationship Model

- Element level: icon/text, heading/supporting copy, label/control, and button label/icon should read as one unit; gaps should neither disconnect the pair nor crowd recognition and interaction.
- Group level: card contents, form groups, filters, button groups, and toolbars should keep within-group spacing smaller than between-group spacing; padding and occupied area should fit information and action density.
- Section level: heroes, content areas, lists, FAQs, CTAs, and footers need clear pauses without using uniform large section padding that breaks related paths or pushes core content below the first viewport.
- Relative relationships come before fixed values: judge whether element, group, and section density form a clear hierarchy before applying specific spacing tokens; do not mechanically apply values such as `8/16/32px` to every page type.

### Whitespace Judgment

- Effective whitespace: strengthens grouping, hierarchy, reading pauses, or primary-action priority.
- Ineffective whitespace: communicates no relationship and only creates hollowness, content sinking, broken scan paths, or mismatched density.
- Content hollowness: when a container occupies far more area than its real information, inspect section purpose, content structure, or the visual object first; do not hide the root cause by only shrinking or enlarging spacing.

## Severity Hints

- `Critical`: visual-system issues make core content unreadable, primary actions indistinguishable, or the theme/content relationship so confused that users cannot understand the page.
- `Major`: tokens, components, color roles, or decorative language visibly split within the same screen, or repeated local crowding, glued relationships, and unclear grouping appear across core modules, reducing professionalism, scan efficiency, trust, or operation judgment.
- `Minor`: local spacing, radius, shadow, icon stroke, or motion rhythm is inconsistent without breaking the overall system.

## Browser Verification

- Inspect page-level rhythm first, then core modules such as navigation, filters, forms, cards, table toolbars, or CTAs, and finally component-internal relationships such as heading/copy, label/control/help text, icon/text, and action groups.
- Standard samples at least one core functional module; Focused covers major modules and representative repeated components; Deep completes page, module, and component-internal checks at one core viewport.
- Check desktop and mobile for type scale, spacing, card density, and button hierarchy. Use source spacing values to explain crowding or hollowness already visible in browser or screenshot evidence.
- Verify hover, focus, and active states use the same color and border system.

## Common Signals

- Primary buttons use pill radius, cards use large radius, inputs use small radius, and dialogs use another radius.
- Every highlighted element uses the same saturated color, so users cannot identify the primary action.
- Each section uses a different background, card, icon, or decoration pattern and feels like a collage.
- Shadows, glass effects, or glow are heavy enough to make the interface feel cheap or tiring.
- Nearly every element uses similar spacing, so within-group, between-group, and section-level density are indistinguishable.
- Padding and gaps are uniformly enlarged to create breathing room, disconnecting related content, hollowing the first viewport, or pushing core actions downward.
- A fix reduces defects but changes the theme so before and after feel like different products.

## Fix Boundaries

- Do not change the theme because it is supposedly more premium; tie changes to clarity, consistency, usability, or product realism.
- Confirm content grouping and page composition first, then normalize spacing tokens and component relationships, and only then apply local polish.
- Preserve business content and product tone; do not use decoration as a substitute for real information structure.
