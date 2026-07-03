# UI Fix Workflow

Use this workflow to directly fix UI code from review / audit results. The goal of `fix-ui` is to make confirmed issues usable, clear, and consistent without turning a fix into a full page redesign.

By default, prioritize issues with evidence, impact, and a clear fix direction. It is allowed to also fix direct dependencies, new errors introduced by the current change, and adjacent issues that must be fixed to complete the original issue. Put unsupported or product-decision issues into `Open Questions`; do not pretend they are confirmed.

## Locale Rule

The skill's Locale Contract has already selected one runtime locale before this workflow is read. Stay in this locale. Do not open the paired English or Chinese workflow/checklist/module files unless the user explicitly asks for translation, bilingual comparison, localization, or locale consistency checks.

## 1. Baseline Gate

Before editing code, confirm the fix boundary and verification baseline. If full confirmation is not possible, establish the smallest baseline from available information. Do not make broad changes before understanding the entry point, verification path, and change boundary:

- Fix source and scope: audit, review, user issue, screenshot, or code observation; single page, component, whole site, viewport, or state.
- Risk type: media, table / rich text / code block, scroll layer, native control, motion, high contrast, page entry, route, or data rendering.
- Verification baseline: existing dev, lint, typecheck, test, build, preview commands; affected page entry, localhost URL, or reusable running page.
- Adjacent navigation surfaces: navigation, menu, list, card, search result, or CTA that enters the page; sibling list/detail routes in the same feature area; return links, related links, or core actions that leave the page.
- Preservation boundary: existing style, theme direction, business logic, real data, and tech stack.

If the user says "fix it directly" or "just make it work", proceed. If the scope may become large, provide a short fix plan first.

### Adjust Gate Depth By Risk

The first goal of `fix-ui` is to fix the issue while keeping the system usable.

- Small style fix: establish the minimum baseline, run available verification commands, and do page-and-path verification when needed.
- Fixes affecting page entry, routing, component logic, data rendering, state, or interaction: page-and-path verification is required.
- Fixes involving multiple files, shared components, layout breakpoints, forms, dialogs, navigation, or native-control replacement: run the corresponding UI recheck.
- If the current change may affect runtime, open the affected page even when build passes.
- Do not run every fix as a full path matrix. Full page-and-path verification is required only when the fix involves page entry, routing, navigation, list/detail flows, Next.js App Router, shared components, data rendering, or client state. Pure visual touch-ups usually need only light engineering verification and a direct route check.

If verification fails and cannot be repaired in the current context, stop expanding the change, keep only the smallest necessary edits, and report the failing command, symptom, attempted repair, and remaining blocker.

## 2. Preserve Existing Visual System

Before fixing, identify and respect the existing theme style, framework, components, style system, and naming habits related to this change. Unless the user explicitly requests it, do not turn the page into a different style to repair one issue.

Preserving the theme does not mean freezing defects. If a visual trait causes a confirmed usability, readability, responsive, state, interaction, or accessibility issue, fix it. The repair should happen inside the original theme by correcting, reducing, constraining, adding states, or adjusting local tokens instead of replacing the visual direction.

If the fix would fundamentally change the overall style direction, put it into `Open Questions` and ask the user to confirm.

Do not load the Design Contract for ordinary local fixes. Read `references/checklists/modules/design-contract.md` only when the finding explicitly comes from contract divergence or the repair affects shared tokens, component recipes, typography roles, variant / size / state, motion, or elevation. Recheck the corresponding contract item after the fix, and do not expand contract repair into redesign. If the contract appears stale or conflicts broadly with stable implementation, stop expanding and put it in `Open Questions`.

## 3. Choose Strategy By Source

- `audit`: fix by Critical / Major / Minor and Fix Order. If the source is `Focused Audit`, prioritize Top Findings, systemic Major issues, and risk-viewport issues; do not expand into Deep-level refactoring.
- `review`: prioritize risks explicitly identified by the reviewer; turn directional suggestions into executable issues first, without expanding into a redesign.
- `user issue`: prioritize the named issue and direct dependencies. Fix adjacent issues only when they block the original issue, make the page fail to open, or were introduced by the current change, and explain why.
- `screenshot`: fix visible layout, visual hierarchy, state, and copy. Behavior that cannot be confirmed from the screenshot must be checked by running the page before fixing.
- `code observation`: state the inference source. When the page can run, verify first; when it cannot, stay conservative and report unverified risk.

## 4. User Decisions

Do not decide the following silently. Put them into `Open Questions`:

- Product positioning, target users, or core value proposition is unclear.
- Real data, cases, customers, pricing, or metrics need confirmation.
- Brand color, typeface, or visual direction requires a tradeoff.
- Removing business content may harm information completeness.
- The fix requires a new dependency, UI library replacement, or design-system refactor.
- The fix requires changing core information architecture, data model, real business flow, or deleting important content.

## 5. Recheck Gate

After each fix, recheck the dimensions touched by the issue. Do not expand into an unrelated matrix:

- If the fix source includes an audit mode, prioritize the viewports and risk viewports actually checked by that audit; do not automatically expand to a Deep-level matrix just because the source is an audit.
- Layout / responsive: recheck relevant viewports, especially the width where the issue appeared. Confirm the first viewport, search area, hero, mockup, section spacing, overflow, sticky/fixed behavior, scrolling, and layering did not gain new overlap, clipping, or jump.
- Media / rich content: recheck images, video, iframes, charts, tables, code blocks, rich text, and long lists for ratio, crop, scrolling, collapse, and long-content behavior.
- Components / controls / interaction: recheck hover, active, focus-visible, disabled, loading, error, hit targets, and the open/close/keyboard path of select, dropdown, multiselect, menu, dialog, and navigation.
- Visual / content / accessibility: recheck token consistency, theme direction, long copy and mixed-language text, accessible names, label/error association, forced colors / high contrast, and reduced motion.
- Page / route: recheck at least one real entry path and the target route; if navigation, menus, list items, card links, or shared components changed, also recheck one adjacent exit, sibling route, or core action.

If the page cannot run, state which rechecks are based only on code.

## 6. Verification And Recovery Gate

Verification is not optional polish. Whenever `fix-ui` changes code, first confirm that the project still runs. If a new error comes from the current change, repair that error before continuing UI rechecks. A passing build does not prove the page is usable. HTTP 200 or returned SSR HTML also does not prove client navigation works. When the page can run and the environment allows it, open the affected page and, when possible, enter it through the user's real path. Confirm there is no page-level runtime error, blank screen, error boundary, key asset loading failure, or obvious console error.

### Engineering Verification

Prefer existing project commands:

- lint
- typecheck
- test
- build
- dev / preview (when page-and-path verification is needed)

If these commands do not exist, do not force new tools into the project. State what could not be verified.

For plain HTML / static-file projects:

- Do not force lint, typecheck, or build checks.
- Open the entry HTML first, such as `index.html`, and check relevant links or entries into the affected area.
- If direct browser opening affects relative paths, module scripts, or fetch behavior, start a simple static server before verifying.
- Check console errors, asset 404s, blank screens, missing styles, script initialization failures, and key interactions.
- After changing CSS / JS, recheck at least the affected page and related asset loading.

If any verification command fails:

- First decide whether it was introduced by the current change.
- If it was introduced by the current change, keep fixing until the command passes or the blocker is explicit.
- If it is pre-existing, state that it is pre-existing and explain whether the current change introduced any new error.
- Do not claim the fix is complete while build fails, the page cannot open, or a key route crashes.

### Page And Path Verification

When the page can run and the environment allows it, open the affected page, route, or component preview, and prefer the user's real path. Follow this order:

1. Align the verification target: prefer the start command, URL / port, route, auth state, and operation path provided by the user or project docs. Do not use a different temporary port, empty-state page, direct URL, or different run mode as proof that the fix is complete unless you can explain why it is equivalent. If the page can be reached through navigation, menu, list, card, search result, or CTA, verify at least one real upstream entry; direct URL access is only supplementary.
2. Manage service ownership: first check whether the target port already has a service. If reusing a user-started server, record the URL / port and do not shut it down; if this fix run starts a temporary dev / preview / static server for verification, record the start command, URL / port, startup directory, and process information.
3. Separate path results: record `Direct route check` (opening the target URL), `Client navigation check` (clicking from a real entry), and `Deep link check` (refreshing or directly deep-linking the target). Route/page/client-component/data-rendering fixes should cover direct route, client navigation, and console/runtime errors. Navigation/header/menu fixes should cover one entry path to the target page and one adjacent page or core action from the target.
4. Check page usability: confirm at minimum that there is no blank screen, error boundary, hydration/runtime error, key asset 404, failed initialization of critical interaction, or obvious console error. For Next.js App Router, RSC, client components, and `next/link` routes, verify direct load and client-side navigation separately; a passing build, HTTP 200, or returned SSR HTML does not prove client navigation has no runtime error.
5. Handle failure and light checks: if page or path verification fails and the failure comes from the current change, enter Recovery Gate, repair the page-level error, then continue UI rechecks. If only styles changed but the page entry is clear, still do a light page-open check. If browser, Playwright, CDP, or screenshot verification cannot run, mark browser verification as not completed; do not replace browser path verification with curl, Invoke-WebRequest, HTTP 200, or a passing build, and list uncovered items as residual risk.
6. Save evidence: if screenshots are generated, prefer saving them under `examples/reports/assets/fix/` in the current project, with one subdirectory per fix run, for example `examples/reports/assets/fix/2026-05-25-admin-terms/`. Filenames should include page or region, viewport, state, and phase, such as `terms-375-after.png` or `terms-1280-filter-open-after.png`; when before screenshots are captured too, use paired `before` / `after` names. Fix code itself must be written to the real project location, not the evidence directory. Except for user-requested retained data, output-listed screenshots / reports / evidence artifacts, or real project changes, temporary scripts, temporary pages, temporary data, and one-off downloads created for verification should be deleted before output; if deletion fails, record it in `Residual risk`.
7. Clean up services: after verification, shut down any service started temporarily by this fix run and check whether the target port is still occupied. Leave it running only when the user explicitly asks for that or shutting it down would affect a pre-existing user service, and report that decision. On Windows, npm, Next.js, Vite, Storybook, and similar multi-process launch paths, do not treat a stopped parent process as proof that the service is closed; if the port is still occupied, clean up only processes confirmed to belong to this fix run's process chain. If ownership cannot be confirmed, do not shut them down and record it in `Dev server` / `Residual risk`.

### UI Verification

- Recheck relevant viewports, at least the width where the issue appeared. When the page can run, prefer browser or screenshot confirmation.
- For layout, media, tables, scrolling, overlays, and visual tokens, confirm the issue did not move elsewhere and the theme direction was not replaced.
- For buttons, forms, menus, dialogs, navigation, native-control replacement, and custom controls, recheck key states, keyboard paths, hit targets, mobile behavior, and consistency with same-type UI.
- Without a browser, explain unverified layout, pointer, hover, interaction, and visual risks based on code.

## 7. Output Gate

```markdown
## Fix Summary
- Fixed:
- Preserved:
- Still runnable:
- Not handled:

## Gate Results
- Baseline:
- Source mode:
- Scope:
- Verification:
- Direct route check:
- Client navigation check:
- Deep link check:
- Runtime errors:
- Dev server:
- Verification target:
- Recovery:
- Recheck:
- Screenshots:
- Not verified:
- Residual risk:

## Changed Files
- `path/to/file`

## Remaining Questions
- ...
```

Be specific. Do not only say "optimized the UI". State which issue was fixed, how it was fixed, and whether it was rechecked. If screenshots were saved, list the screenshot directory and key files; if screenshots were only temporary or could not be saved, state why. When real browser path verification was not completed, fill `Not verified` and `Residual risk`; do not omit them.

If temporary files were created for verification, confirm they were deleted before output. Retained files must be user-requested, evidence artifacts, or real project changes, and must be listed under `Screenshots`, `Changed Files`, or `Residual risk`.

## 8. Prohibited

- Do not turn fix into redesign, or change theme, light/dark mode, brand direction, page tone, or preset unless the user requested it.
- Do not rewrite the page for taste, do unrelated refactors, switch tech stack, introduce unnecessary dependencies, or delete user content, business logic, or real data.
- Do not fabricate lint/build/browser verification results. Do not finish when the current change caused build failure, an unopenable page, or a key route crash.
- Do not leave a dev / preview / static server started only for this verification running in the background and occupying a port, unless the user explicitly asked to keep it running.
- Do not claim a service is closed only because the parent PID returned at startup was stopped; use a port or child-process check as evidence.
- Do not fix one issue by introducing new responsive, state, accessibility, or global visual regressions.
- Do not fake-fix overflow, tables, media, or long-copy issues by hiding, clipping, or deleting necessary content.
