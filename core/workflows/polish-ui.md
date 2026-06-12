# UI Polish Workflow

Use this workflow to make existing UI more refined, realistic, and less AI-generated while preserving product meaning, information structure, technical stack, and visual direction. Polish is restrained refinement, not redesign.

## Locale Rule

The skill's Locale Contract has already selected one runtime locale before this workflow is read. Stay in that locale; do not open the paired locale file unless the user explicitly asks for translation, bilingual comparison, localization, or locale consistency.

## 1. Diagnose

Before editing, identify the main source of roughness. Do not tweak everywhere without diagnosis:

- Page type / composition: page type and composition goal do not match, such as a search / glossary / resource index being treated like a loose landing page, or headings, search, and content sections lacking a stable shared axis.
- Spacing / rhythm: spacing is cramped or hollow, sections lack pauses, or breathing room disconnects related modules and pushes core first-screen content down.
- Typography: disordered scale, tight line-height, awkward heading wraps.
- Color: weak hierarchy, overused accents, insufficient contrast.
- Radius / border / shadow: no consistent system.
- States: cursor / pointer, hover, focus-visible, disabled, loading, or error missing or rough.
- Responsive: mobile crowding, overflow, small buttons, unstable media ratio.
- Template smell: vague copy, too many badges, decoration over information.

If roughness mainly comes from composition or a page-type mismatch, make the layout relationships work before local token polish.

## 2. Boundary

Use polish when the page is basically usable but rough, unstable, or not realistic enough; spacing, typography, color, radius, border, shadow, states, or template noise need convergence; or the user asks for more refinement, less AI-looking output, detail cleanup, less crowding, or better breathing room.

Do not use polish when the core flow is unusable, severe overflow/overlap exists, controls are unclickable, dialogs cannot close, or forms cannot submit; or when information architecture, product positioning, core copy, conversion path, cross-page component systems, or visual direction need to be rebuilt.

Review / audit findings are diagnostic clues only; before acting, confirm they still fit polish scope and will not change information structure or repeat existing page content. Critical, blocking Major, or core-task issues go to `fix-ui`; cross-page systemic issues go to `audit-ui`. If the user only says "make it more polished" and risk is unclear, diagnose lightly first. When the user provides a reference site, screenshot, or design direction, first inventory existing modules and transferable reference modules, then decide whether to replace, merge, weaken, delete, or add a little; merge before adding by default. Borrow layout skeleton, section roles, element types, density relationships, icon semantics, and interaction entry points only; do not copy the reference site's brand visuals, copy, data, metrics, logo, or business claims. Stop and provide a plan when factual content, product positioning, or information architecture would need to change.

## 3. Preserve And Converge

Preserve product meaning, business logic, information structure, main content order, user-provided real copy/data/pricing/cases/brand information, existing tech stack, component library, routes, state logic, brand direction, page tone, and visual system.

Converge with existing tokens; do not create a second color, radius, shadow, or spacing system for polish. Prefer local fixes over component refactors, remove noise instead of adding decoration, and unify component states instead of adding new visual effects.

Polish does not add page-level information modules, data overviews, leaderboards, maps, recommendation areas, or content collections by default; stop and state that the work is beyond polish when those are needed. Lightly adjust vague, repeated, or visibly templated copy only when product meaning stays intact; put risky content changes under `Open Questions`.

## 4. Execution Depth

Externally expose only `polish`. Do not ask the user to choose Light / Standard / Deep; choose execution depth from the user's goal, page risk, and change scope.

- Light: one region, one component, or a few same-type components; only adjust spacing, alignment, local radius, border, hover/focus states.
- Standard: default depth for one page, one main flow, or a tightly related component group; converge local visual tokens, typography, section rhythm, component states, and responsive details.
- Deep: for a broadly rough page that does not need redesign; allows page-level convergence of spacing, type hierarchy, color hierarchy, radius, border, shadow, shared states, and presentation structure. Stop and provide a plan or handoff when information architecture, positioning, cross-page systems, routes, dependencies, or UI library replacement appear.

## 5. Priority

1. Usability boundary: blocking issues go to `fix-ui`.
2. Responsive details: mobile wrapping, button height, media ratio, sticky overlap, dialog scroll.
3. Information hierarchy: page type, first-screen priority, composition axis, section breathing room, heading/body rhythm, CTA hierarchy.
4. Visual tokens: spacing, font scale, color, radius, border, shadow.
5. AI Template Smell: excessive badges, bento grids, gradient glows, vague slogans, decorative icons.
6. Microinteraction: cursor / pointer, hover, active, focus-visible, transition, icon/text alignment, and hit targets.

## 6. Strategies

- Spacing: normalize page container, section spacing, grouping, and component padding first; check both "too cramped" and "too empty" so breathing room does not disconnect related modules, push core first-screen content down, or reduce list scanning efficiency. Reduce mobile spacing without edge crowding or directly compressing desktop density onto small screens.
- Composition: choose the composition goal from the page type. Search, glossary, and resource-index pages with a large search field usually need a centered first-screen axis where title, supporting copy, search field, popular chips, and following content container share a clear alignment logic; centering is not mechanical, so also check visual weight, width, whitespace, and next-section visibility. Admin, dashboard, and dense list pages can keep a left axis, but need enough content density and clear grouping to support it.
- Content Structure: check whether sections repeat the same role, same card grid, or cards whose area exceeds their information. Same-type content should have one primary expression; repeated appearances must carry different roles, weight, or form, otherwise merge, weaken, or delete first. Directory / search / glossary / resource-index pages should not default short entries to large-padding, tall cards; when a card only has a title, one-line description, and one status, use compact lists, small entry cards, grouped entries, trending lists, or lower visual weight. Without changing product facts, repeated modules may be reorganized into category entries, trending lists, scenario entries, compact update lists, complete lists, or methodology notes so the page forms a product path instead of a card pile.
- Typography: reduce levels, control type/weight jumps, improve line-height, paragraph width, and heading wraps.
- Color: preserve brand color, limit accent usage, and make contrast/state recognition work first.
- Radius / Border / Shadow: converge a small token scale; borders structure, shadows show real elevation.
- Components / States: add cursor / pointer, hover, active, focus-visible, disabled, loading, empty, error, and success for truly clickable elements; state feedback should not change element size, adjacent layout, or scroll position.
- Icons / Click targets: align icon size, stroke width, text baseline, and icon/text spacing; icons must support category, state, or action recognition, and repeated same-icon usage should mean the same thing; icon buttons and adjacent actions need clear click / touch targets.
- AI Template Smell: first delete, weaken, or converge meaningless badges, decorative icons, repeated CTAs, and filler cards; add only small supporting content when it does not repeat information already present on the page and serves the current task.
When boundaries are unclear, reference only needed modules: `layout`, `visual-system`, `components-states`, `responsive`, `forms-controls`, and `ai-template-smell`. If module judgment shows core task, accessibility, or data-operation risk, stop polish and move to `fix-ui` or `audit-ui`.

## 7. Recheck

After polishing, check:

- 375px, 768px, 1280px key viewports, plus long headings, long button copy, mixed Chinese/English, long labels, badges, chips, and error text.
- Cursor / pointer, hover, active, focus-visible, disabled, loading, and error states for truly clickable elements.
- Icon/text alignment, icon stroke and size, icon-button hit targets, and whether dialogs, menus, forms, and navigation still work.
- Visual tokens are more unified and no new inconsistency was introduced.
- The page is easier to scan, sections pause without feeling hollow, and the main CTA is not buried by equal-weight elements.
- First-screen title, supporting copy, search area, chip group, card group, or next section stay within one composition logic; for search / list information pages, especially check the center axis, container width, and first-screen content visibility.
- Each section answers one clear question, serves one clear entry, or supports one decision; two sections should not use the same form to answer the same entry question.
- Original page style and product meaning are preserved, and existing lists, stats, categories, tags, or CTAs were not copied into a new decorative or summary area.

Polish does not start a browser or save screenshots by default. Prefer diff review, code review, type checks, or existing context for rechecks, and state any residual risk from not doing browser verification. Open the page or save screenshots only when the user explicitly asks for browser verification, before/after screenshots, multi-viewport checks, or a verified delivery; saved screenshots go under `examples/reports/assets/polish/<polish-run>/`. If the polish changes broad layout, responsiveness, interaction paths, or reference-guided structure and the user did not request verification, state `Not verified in browser` and, when useful, suggest follow-up `audit-ui` or `fix-ui` verification.

## 8. Output

Output `Source`, `Boundary`, `Preserved`, `Adjusted`, `Removed`, `Changed Files`, `Verification`, and `Remaining Questions`. State which visual details were converged, what template noise was removed, whether the original style was preserved, and what was not verified.

## 9. Prohibited

- Do not turn polish into redesign or force a preset when the user did not choose one.
- Do not add gradients, blobs, cards, or motion to create "premium" feel.
- Do not delete real business information, rewrite positioning, or rewrite core copy unless requested.
- Do not treat a reference site as a visual skin to copy, or copy its brand, copy, data, metrics, logo, or business claims.
- Do not add dependencies, change component library, rewrite routes, or change business logic.
- Do not hide overflow, clip content, make text unreadable, or delete necessary information to create fake polish.
- Do not create "neatness" only by compressing spacing, shrinking type, or filling the page with cards; do not create "premium" feel only by enlarging section padding, pulling modules apart, or diluting content density.
- Do not start a browser, save screenshots, or manage local services for polish unless the user asked for it.
