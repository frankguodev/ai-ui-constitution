# UI Build Workflow

Use this workflow to create a website, complete page, or user-task-oriented feature module inside an existing page. `build-ui` should deliver real, usable, maintainable UI that fits the project context, not a fragile concept image.

Build inherits the quality standards from audit, review, polish, and fix: understand goals and constraints first, create structure and implementation second, then self-check, verify, and repair obvious issues.

## Locale Rule

The skill's Locale Contract has already selected one runtime locale before this workflow is read. Stay in this locale. Do not open the paired `.zh.md` or English workflow/checklist/module files unless the user explicitly asks for translation, bilingual comparison, localization, or locale consistency.

## 1. Build Scope

Every build must meet a production-grade baseline: runnable, readable, clickable, responsive without breakage, state-complete for the relevant task, truthful about content, and aligned with the existing project system. Scope changes verification depth and completeness; it does not lower the quality floor.

- `Site Build`: build a website, product site, multi-page skeleton, or complete static site from zero. Focus on information architecture, global navigation, homepage structure, key page entries, overall visual system, and extensible structure.
- `Page Build`: default scope for one complete page. Focus on first-viewport hierarchy, page structure, CTA, content sections, states, responsive behavior, content pressure, and basic accessibility.
- `Feature Build`: build a page area or feature module with a clear user task. Focus on task loop, entry and exit, forms/lists/action feedback, states, error recovery, and integration with the existing page.

Small buttons, individual inputs, isolated cards, icon buttons, and similar small components usually do not need `build-ui`; implement them directly with project conventions. Treat them as `Feature Build` only when they carry a clear user task, affect page structure, or belong to a functional module.

If the user explicitly asks for a prototype, quick mock, or rough draft, reduce content, state, and verification scope, but keep it runnable, responsive, clear about placeholders, and free of invented business facts.

## 2. Input And Content Truthfulness

Do not mechanically ask for every missing detail, and do not fabricate facts.

Ask first or put into `Open Questions` when:

- Page subject, product name, audience, or core task is completely unclear.
- The user wants high fidelity, launch quality, or a real business page but core content is missing.
- Existing style, preset choice, or external asset permission will affect implementation direction.
- The request depends on real prices, customers, metrics, cases, compliance, promises, team, awards, or sensitive business facts.

Reasonable filling is allowed for section order, secondary button copy, empty-state copy, FAQ placeholders, example lists, placeholder image descriptions, non-critical helper copy, and mock content in prototype mode. Filling must be restrained, concrete, credible, and labeled as placeholder.

When real facts are missing, use neutral, replaceable placeholders instead of copy that reads like a real business promise. Landing pages may fill information structure and helper explanations, but not proof. Product names, prices, customers, cases, metrics, compliance claims, team background, and awards must come from the user, existing project, or explicit source material.

## 3. Build Gate

Before editing, establish the delivery boundary. Do not generate a large page while entry point, visual source, content source, and verification path are all unclear:

- `Scope`: Site / Page / Feature, or a small-component task that does not need `build-ui`.
- `Entry`: new file, new route, insertion point in an existing page, feature mount point, navigation entry, return path, or demo container.
- `System`: existing components, routing conventions, global styles, design tokens, type, color, spacing, radius, border, shadow, and component states.
- `Content`: real content, user-provided content, replaceable placeholders, or business facts that must not be invented.
- `Verify`: lint, typecheck, test, build, dev / preview, browser open, static HTML, or screenshot check.

If the user asked for a feature module, build only that module and do not casually rebuild the whole page. If the user asked for a small component, usually implement it directly using project conventions. If the user asked for a prototype, do not expand it into a complex product. The closer the scope is to a real page, real flow, or launch use, the more complete states, content stress, and verification should be.

## 4. Existing System, References, And Presets

Inside an existing project, default to the current system: directories and routes, component library, tokens, global styles, component states, page tone, and tech stack. Do not introduce another visual system, component library, preset, or dependency for a new page.

When the user provides a screenshot, design image, Figma export, or reference page, determine its role:

- Structure reference: layout, information order, and component relationships.
- Style reference: color, type feel, radius, border, shadow, and mood.
- Full design: structure and style should both be followed closely.

For a new project with no visual system, use the reference image's structure and style, with necessary responsive, accessibility, and real-content adaptation. In an existing project, if the user did not explicitly request a style change, default to "structure from the reference, visual style from the existing project." Ask when unclear; if the user does not want to pause, use the conservative path.

Use presets only when the user explicitly chooses one. When no preset is specified, choose direction from page type and project context. If an existing project has a clear system, a preset is only reference material and must not override it. Do not default to `cinematic-minimal`, and do not force dark, cinematic, minimal, or SaaS styling for "premium" feel. Presets are not product-fact sources.

## 5. Information Structure

Plan structure before styling. Do not start from backgrounds, gradients, cards, or motion.

- First viewport: what it is, who it is for, and what to do next.
- Body: each section expresses one core idea, with headings, copy, media, and actions arranged into a scannable pause.
- Action path: primary CTA, secondary CTA, contact/buy/sign-up/continue-reading path.
- Trust: only real cases, work, feature explanation, FAQ, or data explanation.
- State boundaries: loading, empty, error, success, disabled, long content, missing images.

Page-type templates are starting points, not rigid layouts:

- Landing / Product: hero, value, workflow or features, real proof, CTA / FAQ.
- Dashboard / Admin: overview, controls, main content, detail/action, data states.
- Portfolio / Personal: hero, selected work, process, about, contact.
- Form / Checkout / Onboarding: step context, input groups, review, submit states.
- Docs / Content: title/summary, TOC, content sections, code/table, next step.

## 6. Implementation Boundary

New static pages should be complete runnable files with organized CSS, no dependency on unavailable remote resources, and usable mobile/tablet/desktop layouts.

Existing project pages should follow current directories, routes, components, and styling methods. Prefer existing components and tokens, do not add new dependencies, and do not break existing routes or business logic. When adding a page, decide whether it needs navigation, menu, list, card, CTA, search result, or parent page entry; if an entry is added, provide a return-to-list, breadcrumb, related page, or next action.

Feature Build should serve the task loop. Do not overdesign it as a whole page and do not rely on accidental parent dimensions to make it work.

Do not add login, permissions, user systems, databases, CMS, backend APIs, payment, localization, theme switching, animation systems, complex state management, mock APIs, or large filter/bulk-action systems by default. If necessary for the experience, add light UI placeholders or explain.

## 7. Quality Baseline

Cover relevant states for buttons, forms, lists/data, dialogs/menus, and navigation: hover, active, focus-visible, disabled, loading, empty, error, success, and current state where applicable. Do not force unrelated state demos, but every user action needs a state loop.

Consider at least 375px, 768px, and 1280px. Avoid horizontal scrolling, edge-touching text, small buttons, overflowing copy, overflowing media/tables/code blocks, sticky/fixed overlap, and desktop layouts merely shrinking on mobile. Use `max-width`, `min-width: 0`, `aspect-ratio`, wrapping, and sensible breakpoints for fixed-format elements.

Control page density and breathing room: section spacing, container width, line length, card density, and CTA weight should help scanning instead of crowding equal-weight elements into one viewport. Dashboard / Admin pages may be denser, but still need clear grouping; Landing / Portfolio / Content pages need stronger vertical rhythm.

Build for realistic content variation: longer titles, longer button copy, mixed language, varied image ratios, uneven card content, lists of 0/1/3/10/20 items, longer errors, and very long names, emails, project names, or filenames. Do not build layouts that only fit ideal short copy.

Check for AI-template smell: excessive badges, bento grids, gradient blobs, vague slogans, fake data, meaningless icons, repeated CTAs, and filler cards. Replace decoration stacking with real content and clear structure.

## 8. Self-Check And Verification

After building, self-check and fix obvious issues:

1. Critical issues: unreadable, unclickable, overflow, overlap, broken nav/form/dialog.
2. Fit with the existing visual system, reference role, or selected preset.
3. Section rhythm, spacing, typography, color, radius, border, shadow, and component states.
4. Mobile, long content, and realistic content pressure.
5. Obvious AI-template smell or invented facts.

Scale verification by build risk. Do not run every build as a full audit:

- New static HTML: open the entry HTML; if relative paths, module scripts, or fetch behavior may be affected, use a simple static server.
- New page in an existing project: run available project lint / typecheck / build commands and open the new route or target page.
- New navigation entry: click from a real entry into the new page or section. Direct URL access is only supplementary.
- New feature module: confirm it renders in the target page, demo container, or actual usage location, and check main entry points, states, and action feedback.
- Pure visual local build: light engineering verification and target-area check are enough; small-component tasks do not need to become a full build verification matrix.

If verification needs to start a dev / preview / static server:

- First check whether the target port already has a service; when reusing an existing service, record the URL / port and do not shut it down.
- If this build starts a temporary service, record the command, URL / port, startup directory, and process information.
- After verification, shut down the service started by this build and check whether the port is still occupied.
- On Windows, npm, Next.js, Vite, Storybook, and similar multi-process launch paths, do not rely only on the parent PID to decide the service is closed; if remaining port ownership cannot be confirmed as this build run's service, do not shut it down and state that in the output.

If verification generates files:

- Delivered pages, components, styles, and config must be placed in the real project location or user-specified path, not under `examples/reports`.
- Verification screenshots should be saved under `examples/reports/assets/build/<build-run>/`, with filenames that include page or region, viewport, and state.
- Temporary preview files, one-off mock data, verification HTML / scripts, or downloads should be deleted before output by default; retain them only when the user asks or when they are evidence artifacts, then place them under `examples/reports/assets/build/<build-run>/` and state the path.

If browser, dev server, or screenshot verification fails, do not replace page usability verification with a passing build, HTTP 200, or file existence. Report `Not verified` and residual risk.

## 9. When To Move To Another Workflow

- User asks to inspect an existing page: use `review-ui` or `audit-ui`.
- Generated result has page-level runtime errors, unreachable routes, broken key entries, or failing builds: use `fix-ui` first to make it runnable.
- Generated result only needs local refinement: use `polish-ui`.
- Generated result has systemic quality issues or the user asks for pre-launch inspection: suggest `Focused Audit` or `Deep Audit`.

Build does not own all quality work. It creates a usable first version and performs necessary self-checks and verification.

## 10. Output Format

```markdown
## Build Summary

- Built:
- Build scope:
- Structure used:
- Entry / route:
- Navigation integration:
- Design/reference used:
- Existing style or preset followed:
- Placeholder content:

## Changed Files

- `path/to/file`

## States Covered

- hover / active / focus-visible / disabled / loading / empty / error / success

## Responsive Checks

- 375px:
- 768px:
- 1280px:

## Verification

- Ran:
- Temporary service:
- Artifacts:
- Not verified:
- Residual risk:
```

Do not output only abstract design advice. Implement when possible and report verification.

Before output, confirm temporary verification files created during build were deleted. Retained files must be delivered files, user-requested retained data, or evidence artifacts, and must be listed under `Changed Files` or `Verification`.

## 11. Prohibited

- Do not force a preset when the user did not choose one.
- Do not treat a reference image's visual style as default inside an existing project unless requested.
- Do not introduce another visual system, component library, new dependency, or tech stack switch unless requested.
- Do not invent real customers, prices, metrics, cases, teams, awards, or business promises.
- Do not generate pages that only fit ideal short copy.
- Do not make static pretty screenshots while ignoring states, responsive behavior, entry paths, and content pressure.
- Do not fill the page just to make it feel rich if sections lose pause, hierarchy, or scannability.
- Do not add meaningless cards, badges, icons, gradients, or motion just to fill the page.
- Do not expand a simple page into backend, auth, database, and complex state management.
- Do not fabricate lint, build, browser, or screenshot verification results.
- Do not leave a dev / preview / static server started by this build running in the background; also do not shut down a service that existed before build or cannot be confirmed as owned by this build run.
