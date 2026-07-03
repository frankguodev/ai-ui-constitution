# UI Audit Workflow

Use this workflow to inspect frontend UI quality for a page, component, screenshot, local app, or whole site. `audit-ui` defines the execution process; the `ui-audit` rubric defines the judging criteria.

The goal is to find issues, collect evidence, and recommend fix order. Do not redesign or edit code during audit unless the user explicitly asks to audit and fix.

## Responsibility Boundary

- This workflow defines how to run the audit: choose depth, collect context, verify viewports, capture evidence, structure findings, and decide whether to hand off to fixing.
- For what counts as an issue, severity definitions, scoring, module meaning, reporting ownership, and output rules, read `references/checklists/ui-audit.md`.
- This workflow decides which modules to read for the current audit; do not copy module-selection rules into the report.
- For hard budgets for `Quick / Standard / Focused / Deep Audit`, read `references/modes/audit-modes.json`; this file explains how to apply those budgets.
- Do not mechanically dump every rubric category into the report. Report only issues that are real, evidence-backed, and have clear impact.
- Do not read both English and Chinese references unless the task is translation, bilingual comparison, localization, or consistency checking.

## Locale Rule

The skill's Locale Contract has already selected one runtime locale before this workflow is read. Stay in this locale. Do not open the paired `.zh.md` or English workflow/checklist/module files unless the user explicitly asks for translation, bilingual comparison, localization, or locale consistency.

## 1. Choose Audit Mode

Choose depth from the user's request:

- `Quick Audit`: for "quick look" or "any big issues". Report only Critical and obvious Major issues.
- `Standard Audit`: default. Report Critical, Major, and a small number of valuable Minor findings.
- `Focused Audit`: for "serious check", "focused deep review", "pre-launch main risks", or "be thorough but not too heavy". Deeper than Standard, but no default score and no default full category report; up to 32 findings.
- `Deep Audit`: for "thorough audit", "strict audit", "pre-launch", or "find details". Use the full audit system: main rubric, relevant modules, scoring model, content stress testing, extra viewports, and deeper checks for media ratios, tables/rich content/code blocks, scrolling behavior, native controls, motion, and high-contrast risks.

Use `Standard Audit` when the user does not specify.

### Mode Budget

The full audit system is judging context, not a task list to fully execute every time. Hard budgets come from `references/modes/audit-modes.json`; the notes below explain how to apply them:

- `Quick Audit`: scan the main path and currently visible UI for risk. When the page can run, check the current viewport or 1 most important viewport; run only obvious layout/clickability/responsive smoke checks. Up to 8 findings, Critical and obvious Major only, no score, no Minor, no long-tail detail.
- `Standard Audit`: default practical mode. Cover main pages/features and 2 key viewports: 1280px desktop + 1 mobile viewport; inspect first-viewport relationships and sample at least 1 core functional module per main page for internal spacing and states. Find Critical / Major issues first, then include a few high-value Minor findings. Usually 8 to 16 findings, no full category report, no full Content Stress Test, no default score.
- `Focused Audit`: focused deep practical mode. Cover main pages/features, key viewports, and risk-triggered extra viewports; up to 32 findings, no default score, no full category report. Inspect every major functional module at core viewports and sample repeated component internals, then expand by risk to tablet, wide desktop, small mobile, media, scrolling, native controls, and content stress.
- `Deep Audit`: systematically use the main rubric, relevant modules, scoring model, Content Stress Test, extra viewports, and deep-audit details. Complete page-level, module-level, and component-internal scanning at least at one core viewport, then recheck the affected level at risk viewports. Lead with Top Findings and do not list passing checks.

In every mode, do not create findings just to cover categories. When multiple issues share one root cause, prefer one systemic finding.

## 2. Collect Context

Before judging, confirm or infer:

- Scope: single page, component, screenshot, whole site, code directory, or localhost.
- Page type: landing page, dashboard, app screen, portfolio, docs, form, checkout, admin, etc.
- Tech constraints: component library, utility CSS, CSS Modules, custom CSS, design tokens, routes, breakpoints, framework, and rendering model.
- Verification level: browser-tested, static code review, screenshot review, or mixed.

If information is missing, infer from structure and content, but label it as inferred.

## 3. Identify Existing Visual System

First identify the product's current visual system:

- Color: brand, background, text, status, and accent usage.
- Typography: type scale, weight, line-height, heading/body rhythm.
- Spacing: containers, section spacing, component padding, grid gaps.
- Radius, border, shadow: shared rules across buttons, cards, inputs, dialogs, menus.
- Component style: buttons, forms, navigation, cards, tables, dialogs, toasts.
- Layout and scroll: container width, grid/flex collapse, sticky/fixed layers, scroll regions, anchors, and table horizontal scrolling.
- Media and rich content: images, video, iframes, charts, code blocks, rich text, and tables across ratios, cropping, placeholders, and small-screen behavior.
- Interaction layers: dropdowns, popovers, modals, toasts, drawers, and loading overlays.
- Product tone: marketing, tool, content, admin, personal brand, etc.

Unless the user asks for a new direction, judge recommendations within the existing visual system.

## 4. Read Audit Rubric

At runtime, read `references/checklists/ui-audit.md`. Apply:

- General principles
- Severity definitions
- Evidence standards
- Scoring model
- Module routing
- Output format
- Deduplication priority

Use focused modules for detailed checks such as layout, responsive behavior, components/states, forms/controls, visual-system consistency, design contracts, accessibility, and AI-template smell.

### Module Reading Strategy

`references/checklists/modules/` contains focused inspection paths for high-risk issues. Do not read every module every time; select modules by mode and page signals:

- `Quick Audit`: do not expand modules by default. Read at most the directly relevant module when the issue clearly matches it, such as `responsive` for mobile breakage, `components-states` for missing click affordance, or `layout` for first-viewport relationship problems.
- `Standard Audit`: prioritize `layout`, `components-states`, and `responsive` by default. If the page includes forms, filters, uploads, or bulk actions, also read `forms-controls`; if the risk is visual collage, token drift, or theme preservation, also read `visual-system`.
- `Focused Audit`: read Standard modules by default, then add `forms-controls`, `visual-system`, `design-contract`, `accessibility`, or `ai-template-smell` when page risk calls for them. Read `design-contract` only when the project has a contract, the user requests design-system inspection, or systemic token / recipe drift is present. Do not read unrelated modules for completeness.
- `Deep Audit`: read all relevant modules based on page type and risk, including `design-contract`, `accessibility`, and `ai-template-smell` when applicable. Do not load `design-contract` merely because the mode is Deep when no contract signal exists.

Module triggers:

- First viewport, hero, search box, visual container, or next-section relationship issues: read `modules/layout.md`.
- Cursor, hover, focus-visible, loading, disabled, or custom clickable-region issues: read `modules/components-states.md`.
- `375px`, `768px`, `1280px`, intermediate breakpoint, horizontal scroll, fixed width, or sticky/fixed overlap issues: read `modules/responsive.md`.
- Forms, search/filter UI, selection controls, uploads, bulk actions, error recovery, or mixed native controls: read `modules/forms-controls.md`.
- Type hierarchy, color roles, spacing, radius, border, shadow, decorative language, or theme-preservation issues: read `modules/visual-system.md`.
- Project `design.md` / `designContract`, a design-system inspection request, or systemic shared-token, recipe, typography-role, variant / size / state drift: read `modules/design-contract.md`.
- Keyboard path, focus-visible, accessible name, semantic structure, target size, or high-contrast issues: read `modules/accessibility.md`.
- AI-template smell, vague slogans, fabricated data, excessive badges/bento/gradients, or section collage: read `modules/ai-template-smell.md`.

Do not mechanically output every category. Report only issues with evidence, impact, and worthwhile fixes.

## 5. Choose Inspection Method

### Code Project

- Inspect project structure, page entry points, global styles, components, and routes first.
- Judge risks from component implementation, style rules, breakpoints, state logic, content structure, and browser capabilities.
- Audit the visible user outcome first, then use the current stack for evidence; do not treat Tailwind, any component library, or any CSS approach as the only valid standard.
- If the app can run, verify key viewports and interactions in the browser.
- If the page can run but was not opened in a browser, do not present layout, hover, cursor, focus, overlay, or responsive judgments as verified; state the untested risk in the report.

### Localhost / Runnable Page

- Prefer browser inspection for real layout, scrolling, click, focus, dialogs, dropdowns, inputs, and responsive behavior.
- Record actual viewport, page region, scroll position, interaction state, and visible symptom.
- Judge breathing room, local density, and visual weight from actual rendering first. Use source gap, padding, margin, and token values to locate causes, not as standalone proof that a compact or spacious layout is defective.
- For runnable pages, verify what source alone cannot prove: media cropping, overlay layering, scroll snap, anchor jumps, form states, and mobile touch behavior.
- For runnable pages, run a pointer / hover smoke check: primary buttons, search buttons, links, chips, card actions, icon buttons, and custom clickable regions should show correct click affordance and state feedback on hover.
- Do not make final claims from source alone when the page is runnable.

### Screenshot

- Audit only visible visual, layout, hierarchy, copy, and obvious states.
- Do not assert hover, focus, keyboard paths, dialog closing, dropdown styling, loading states, or other behavior not visible in the screenshot.
- Put interaction questions under `Open Questions`.

### Single Component

- Focus on size, states, long content, variants, accessible names, and relationship to surrounding components.
- Also check real-content fit: long labels, icons, numbers, error copy, loading, disabled, empty, media ratio, and different container widths.
- Do not audit a single component using whole-page landing-page standards.

### Whole Site

- Sample core paths; do not enumerate every page.
- Cover at least homepage, primary conversion page, core product/function page, and state-heavy pages such as forms, auth, or settings.
- Cover at least one data/list-heavy page, one form or settings page, and one overlay/menu-heavy flow. For admin products, prioritize tables, filters, bulk actions, and destructive actions.
- Report systemic issues and Top Findings instead of piling up page-by-page minor problems.

## 6. Inspect Project Structure

For code audits, locate:

- Page entries: `app/`, `pages/`, `src/routes/`, `src/pages/`, `index.html`, etc.
- Global styles: `globals.css`, `app.css`, CSS Modules, Sass, utility CSS config, design tokens, theme variables, breakpoint rules.
- Components: button, card, input, select, combobox, dropdown, checkbox, radio, switch, textarea, file upload, modal, drawer, popover, tooltip, nav, tabs, table, list, toast.
- Routes and page types: home, pricing, dashboard, settings, docs, auth, checkout.
- UI system: shadcn, Radix, MUI, Bootstrap, custom components, utility CSS, custom CSS, or native HTML controls.
- Rich content and media: images, video, iframes, charts, code blocks, rich text, tables, long lists, and empty/error/loading states.
- Interaction layers and scroll: sticky/fixed headers, dropdowns, popovers, modals, toasts, drawers, scroll containers, anchors, scroll snap.

Do not give broad visual advice before understanding the project structure.

### Custom Control Consistency

When auditing code, actively check whether the project already has custom base controls, then check whether pages still mix in native controls:

- First locate existing components: `Select`, `Combobox`, `Dropdown`, `MultiSelect`, `Checkbox`, `RadioGroup`, `Input`, `Textarea`, `Button`, etc.
- Then look for native usage: `<select>`, `<option>`, `<input type="checkbox">`, `<input type="radio">`, `<input type="file">`, unwrapped `<input>` / `<textarea>`, and controls relying on browser defaults.
- Check whether appearance, accent-color, caret-color, color-scheme, field-sizing, and resize behavior match the current visual system.
- If a custom control exists but a page still uses a visually jarring native control, evaluate it as a `Components And States` or `Forms` finding, not only as `Content Stress` or `Pass Notes`.
- If no custom control exists but native controls visibly clash with the product style, report it and recommend establishing or wrapping controls that fit the existing system.
- If the mismatch is minor and non-core, usually mark `Minor`; if it appears in core filters, bulk actions, or edit flows and hurts confidence, usually mark `Major`.

## 7. Run Viewport Checks

If the project can run, prefer browser verification. Control viewport count by mode; do not run every audit like a Deep Audit.

Manage server lifecycle when starting or reusing a service:

- If reusing a user-started localhost / dev server, record the URL / port and do not shut it down.
- If this audit starts a temporary dev / preview / static server for browser verification, record the start command, URL / port, and process information.
- After the audit, shut down any service started temporarily by this audit to avoid occupying ports. Leave it running only when the user explicitly asks for that or shutting it down would affect a pre-existing user service, and state that in the report.
- After shutting down a temporary service, check whether the target port is still occupied; on Windows, npm, Next.js, Vite, Storybook, and similar multi-process launch paths, do not rely only on the parent PID returned at startup.
- If the port is still occupied, clean up only processes that can be confirmed as started by this audit; if ownership cannot be confirmed, do not shut them down and state the remaining port / PID / reason in the report.

`Quick Audit`:

- Check the current viewport or the 1 key viewport the user most cares about.
- Look only for Critical usability, obvious responsive risk, first-screen hierarchy, and core clickability.
- If the likely issue is mobile-only or desktop-only, choose that viewport first.

`Standard Audit` default checks:

- 375px mobile
- 1280px desktop

`Standard Audit` may add 768px tablet when the page type suggests breakpoint risk, such as sidebars, tables, or multi-column layouts, but it is not a mandatory matrix.

At core viewports, `Standard Audit` should sample at least 1 core functional module per main page, such as navigation, filters, forms, cards, table toolbars, or CTAs. Enter the component internals instead of judging only the module boundary.

`Focused Audit` default checks:

- 375px mobile
- 1280px desktop

`Focused Audit` adds viewports by risk:

- Tablet/sidebar/table/multi-column risk: 768px or 834px
- Wide-desktop composition, large-screen whitespace, or container constraint risk: 1440px or 1920px
- Mobile clipping, horizontal scroll, or density risk already found: 360px or 390px

At core viewports, `Focused Audit` checks every major functional module and samples at least one representative repeated card, form item, action group, or toolbar. Merge shared-root findings, but retain representative locations.

If time or environment allows only partial viewport coverage, check at least the 1 viewport most likely to show the issue, then state what was not verified.

For `Standard Audit`, `Focused Audit`, and `Deep Audit`, browser checks first scan first-viewport layout relationships:

- Whether hero columns, search areas, primary visual containers, and the next section overlap, disconnect, misalign, or feel hollow.
- Whether mockups, illustrations, screenshots, charts, or decorative containers occupy too much space for too little content and unbalance the first viewport.
- Whether search bars, CTAs, chip groups, and card groups have natural spacing, alignment, and hierarchy with neighboring sections.
- Whether clickable elements expose cursor, hover, active, and focus-visible affordance.

Then scan spatial relationships by mode:

1. Page level: whether first viewport, sections, main content areas, and action paths feel cramped, disconnected, hollow, or incorrectly prioritized.
2. Module level: whether navigation, filters, forms, cards, tables, toolbars, overlays, and CTAs have workable padding, grouping, density, and action areas.
3. Component internal: whether icon/text, heading/supporting copy, label/control/help or error text, action groups, and status labels feel crowded, glued together, or separated by excessive gaps.

Do not interpret the three levels as exhaustive DOM-node inspection. Standard samples core modules, Focused covers major modules and representative repeated components, and Deep systematically covers all three relationships.

For Deep Audit, add:

- 360px
- 390px or 430px
- 834px
- 1440px
- 1920px

For Deep Audit, also check when possible:

- Media: aspect ratio, object fit, focal crop, and loading placeholders for images, video, iframes, charts, and product screenshots.
- Scrolling: anchor jumps under sticky headers, scroll-margin / scroll-padding, scroll snap, and layout shifts when scrollbars appear.
- Data content: tables, code blocks, rich text, long lists, and multi-column content across mobile, tablet, and wide screens.
- States and accessibility: focus-visible, keyboard paths, forced colors / high-contrast risk, and reduced motion.
- Local completion: sample representative forms, filters/toolbars, cards, or dense data regions and verify that internal spacing, line-height, state copy, and hit targets are not hidden by page-level conclusions.

If audit opens a browser and saves screenshots, prefer saving them under `examples/reports/assets/audit/` in the current project, with one subdirectory per audit run, for example `examples/reports/assets/audit/2026-05-24-home/`. Filenames should include page or region, viewport, and state, such as `home-375.png` or `dashboard-1280-filter-open.png`. If the project is not writable, the user requested another directory, or screenshots are only available as temporary tool artifacts, state the screenshot location or why they were not saved in the report.

Audit does not write report files by default. Write only when the user explicitly asks to record findings, generate a report, or update an issue log, preferably under `examples/reports/` or the user-specified path. Except for user-requested retained data, report-listed evidence artifacts, or real project changes, temporary files created during audit should be deleted before the report; if deletion fails, state the path and reason.

If the page cannot run, infer from CSS, layout code, breakpoints, and component structure. State which viewports and interactions were not verified.

## 8. Capture Evidence

Capture evidence according to inspection method:

- Browser evidence: viewport width, page region, interaction state, scroll position, exact element relationship, and visible symptom. Spatial findings should identify page, module, or component-internal level.
- Server evidence: if this audit started or reused a dev / preview / static server, state the URL / port, service ownership, whether the temporary service was shut down, and whether any port or process residue remains.
- Code evidence: file path, component name, CSS class, breakpoint, state branch, style token, component prop, semantic structure. Spacing values usually explain a visible issue; they do not prove "too cramped" or "too empty" without rendered evidence.
- Screenshot evidence: visible region, element relationship, clipping, overlap, hierarchy.
- Screenshot files: when this audit saves screenshots, list the screenshot directory and key files in the report; if screenshots were only used as temporary observation artifacts, state that too.
- Temporary files: if this audit creates temporary scripts, temporary pages, temporary data, or one-off downloads, delete them before the report by default; list them under `Artifacts` only when they are retained as evidence.
- Inferred evidence: risks based on code or screenshot must be labeled as untested or needs verification.
- Systemic evidence: when the same issue appears across pages, components, or states, record the shared cause such as token inconsistency, mixed control systems, missing breakpoint strategy, or confused scroll layering.

Evidence should support judgment; do not list irrelevant implementation details.

## 9. Audit Order

Check in this order:

1. Critical usability: overflow, overlap, unclickable controls, unreadable content, broken nav/dialog/form.
2. Responsive and layout stability: mobile, tablet, large desktop, fixed/sticky, z-index, media ratios, table/code/rich-content overflow, first-viewport relationships, and visual-container occupancy.
3. Information hierarchy: first-screen priority, page type, core task clarity.
4. Components and states: cursor, hover, active, focus-visible, disabled, loading, empty, error, success.
5. Form/control consistency: inputs, selects, dropdowns, multiselects, menus, and bulk actions should follow the project control system.
6. Data and rich content: tables, charts, code blocks, rich text, long lists, numeric typography, and density.
7. Visual system: inspect spacing, typography, color, radius, border, shadow, background, filter, and outline at page, module, and component-internal levels so global token checks do not hide core-module detail.
8. Interaction layers and motion: dropdowns, popovers, modals, toasts, drawers, scroll behavior, motion, reduced motion.
9. Content stress: long text, mixed languages, varied counts, varied image ratios, multi-column/print/page-break cases.
10. Accessibility baseline: keyboard paths, accessible names, semantic structure, forced colors, high contrast.
11. AI template smell: vague slogans, excessive badges, bento grids, gradient glows, fake data.
12. Minor polish: alignment, rhythm, motion, copy details.

## 10. Handoff To Fix

If the user asks to continue fixing, enter the `fix-ui` workflow.

Before fixing, confirm or infer:

- Whether the user asked for direct code changes.
- Whether only Critical/Major issues should be fixed.
- Whether visual tokens may be adjusted.
- Whether existing visual style and content must be preserved.

Fix order:

1. Critical: unusable, unreadable, unclickable, unclosable issues.
2. Major: responsive behavior, hierarchy, component states, visual tokens.
3. Content Stress: long copy, real data, varied counts and media ratios.
4. AI Template Smell: remove template noise and add real information structure.
5. Minor: alignment, motion, copy, visual polish.

Do not make broad code changes during audit unless the user explicitly asks to audit and fix.

## 11. Output Rules

Use the report structure and omission rules from `references/checklists/ui-audit.md`.

## 12. Stop Conditions

- If you find a blocking Critical issue, stop digging for Minor polish and report risk plus fix order.
- In Quick Audit, stop after finding a Critical issue or 5 to 8 obvious Major issues, then give fix order.
- In Standard Audit, even when Top Findings cover the meaningful risks, complete the internal-spacing sample for core functional modules before stopping; then skip low-value polish.
- In Focused Audit, expand systemic issues and risk viewports first, but cover every major functional module before stopping. Merge repeated local issues while retaining representative locations; do not chase low-value Minor polish or full scoring.
- In Deep Audit, prioritize systemic issues, but do not use systemic conclusions as a substitute for three-level scanning. Merge similar Minor issues instead of piling them up. When multiple local Minor issues collectively create clear crowding, scanning difficulty, or operation pressure, evaluate them as one systemic Major.
- If evidence is insufficient, stop inferring and mark it as `Open Questions` or needs verification.

## 13. Prohibited

- Do not fabricate browser verification.
- Do not report issues without location, evidence, and fix direction.
- Do not package personal taste as a defect.
- Do not force a preset when the user did not choose one.
- Do not remove necessary business information for the sake of visual consistency.
- Do not state unverified issues as fact.
- Do not leave a temporary service started by this audit running in the background; also do not shut down a service that existed before audit or cannot be confirmed as owned by this audit.
