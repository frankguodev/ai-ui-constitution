# Responsive High-Risk Module

Use this module to strengthen responsive-stability checks in `ui-audit.md`. It is focused on pages that look fine on desktop but break at key viewports.

## When To Use

- Auditing pages, whole sites, admin modules, table/card lists, rich content, search/filter UI, forms, dialogs, or first-viewport heroes.
- The page uses fixed widths, horizontal layouts, complex grids, long headings, images/mockups, tables, code blocks, charts, or sticky regions.
- The user reports compression, hollow space, misalignment, or horizontal scrolling on mobile, tablet, or a specific window width.

## Required Checks

- Key viewports: check or infer at least `375px`, `768px`, and `1280px`; Deep Audit expands to small mobile, large mobile, tablet-large, and wide desktop.
- Horizontal scrolling: body, sections, tables, code blocks, images, mockups, button groups, and chip groups should not cause unintended horizontal scroll.
- Degradation strategy: desktop columns, split layouts, card grids, toolbars, filters, and tables need clear stack, wrap, scroll, collapse, or reflow behavior on small and tablet widths.
- Stable dimensions: images, video, iframes, charts, screenshots, cards, buttons, and toolbars should use stable ratios, min/max constraints, container constraints, or reasonable wrapping.
- Intermediate breakpoints: tablet, small desktop, and half-window widths should not be worse than either mobile or desktop.
- Spatial hierarchy: breakpoints may change concrete spacing tokens, but should preserve the relationship `element < group < section`; do not scale desktop spacing uniformly or collapse every mobile gap to one value.
- Sticky/fixed regions: nav bars, bottom action bars, sidebars, and filter bars should not hide content, form errors, dialogs, or anchor targets.

## Mode Budget

- `Quick Audit`: check only the current viewport or the 1 key viewport most likely to fail, prioritizing horizontal scroll, clipping, overlap, and unreachable core actions.
- `Standard Audit`: default to checking or inferring `375px` and `1280px`; add `768px` when sidebars, tables, multi-column layouts, filters, or tablet risk are present.
- `Deep Audit`: expand to `360px`, `390px/430px`, `834px`, `1440px`, and `1920px`, with content stress, media ratio, scrolling, and sticky/fixed checks.
- Do not automatically turn `Standard Audit` into a full viewport matrix; viewport count must serve the current risk and user request.

## Severity Hints

- `Critical`: common mobile or tablet viewports show page-level horizontal scroll, clipped core content, unreachable primary actions, or unrecoverable sticky/fixed overlap.
- `Major`: the UI works but switches breakpoints too early, feels cramped, or makes tables, filters, and cards require inefficient horizontal operation.
- `Minor`: spacing, media crop, card height, or wrapping rhythm is imperfect in a few viewports, but core content and actions remain stable.

## Browser Verification

- Do not rely only on final screenshots; resize the window or switch widths and watch for sudden jumps, hollow space, or compression.
- Check whether the body gets a horizontal scrollbar and locate the exact overflowing element when it does.
- Run a minimal content stress pass with long copy, many chips, varied card counts, table columns, and different image ratios.

## Common Signals

- Mobile is just a shrunken desktop: visible but hard to read and tap.
- `768px` or `834px` is messier than mobile, showing that only phone and desktop were considered.
- Mobile uniformly shrinks padding and gaps until labels, controls, action groups, and sections lose their grouping hierarchy.
- Images or mockups lack aspect-ratio and jump in height during loading.
- Tables, code blocks, or long filters lack a horizontal scroll container or collapse strategy.
- Sticky headers cover anchor headings, or bottom action bars cover submit buttons or form errors.

## Fix Boundaries

- Fix inoperable UI, horizontal scrolling, overlap, and clipping before spacing or visual polish.
- Responsive fixes should preserve the original information architecture and not remove business content casually.
- Do not hide overflow as a bandage; confirm hidden content is not core information or an action.
