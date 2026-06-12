# Webcraft Skills

English | [中文](./README_zh_CN.md)

Webcraft skills collection for Codex and Claude Code, currently focused on reviewing, fixing, polishing, and building more mature web UI.

AI coding tools can generate code quickly, but their UI often feels too crowded, flashy, inconsistent, or obviously AI-generated.

---

# Download Environment And Tips

Before installing Webcraft Skills, make sure the machine can download and write the skill files:

- Node.js and npm are installed, with `npx` available.
- The current network can access the npm registry, or npm is configured with a working mirror.
- The current user directory is writable, because the installer writes to paths such as `~/.agents/skills`, `~/.codex/skills`, or `~/.claude/skills`.
- If you are behind a company proxy, private network, or restricted terminal, confirm npm proxy and certificate settings first.
- Recommended projects: web apps, static sites, React / Next.js / Vue / Svelte / Astro / plain HTML CSS projects, and frontends with component libraries or custom design systems.
- Recommended inputs: a runnable project entry, page files, component files, screenshots, PR diffs, or a clear description of the page scope to inspect, fix, polish, or build.
- Browser access is not required for every task, but it helps when judging responsive behavior, hover, dialogs, form states, client navigation, or real layout.
- If a workflow starts a temporary dev / preview / static server, it records the port, shuts it down afterward, and checks for residue. Pre-existing services are not shut down by default.
- Except for retained screenshots, reports, evidence artifacts, or real project changes, temporary files created during a workflow are deleted before output.

When asking for help, try to name three things:

- Target: page, component, PR, screenshot, feature flow, whole site, or new module.
- Goal: audit, review, fix, polish, or build.
- Focus: mobile, forms, dialogs, navigation, content stress, AI-template smell, pre-launch quality, etc.

---

# What Is This?

Webcraft Skills is a skills collection for AI agents. Its first stable skill is the web UI quality system `webcraft-ui`.

It is not a UI framework, design system, component library, or visual site builder.

The `webcraft-ui` core scope covers five workflows: **Audit, Review, Fix, Polish, and Build**. The current installable skill is `webcraft-ui`; the npm package is `webcraft-skills`.

The broader goal is:

- audit layout, typography, color, borders, radius, modals, responsive behavior, and interaction states
- review PRs, diffs, components, screenshots, or local page areas
- fix rough AI-generated UI based on concrete findings
- polish existing pages while preserving product meaning
- build more realistic, restrained, runnable web pages or feature modules
- refine the core reusable skill first, then gradually expand Codex, Claude, Cursor, and plain prompt adapters
- help AI act more like a senior UI/UX and frontend reviewer

The recommended workflows are `audit`, `review`, `fix`, `polish`, and `build`. Claude Code command prompt files are included for those workflows. In Codex, use `/skills`, `$webcraft-ui`, or explicit natural-language invocation.

---

# Stable Scope

Use this package when you want an AI agent to:

- audit an existing page, component, feature flow, screenshot, localhost app, or group of pages
- review UI risk in a PR, diff, single component, screenshot, or specified page area
- find UI problems with evidence, severity, affected viewport, and fix direction
- fix confirmed audit/review findings without casually redesigning the product
- polish an existing page without changing product meaning
- build pages, sites, or user-task-oriented feature modules inside an existing project
- preserve the existing visual system, business logic, content, and technical stack
- verify results with build checks, browser opening, and path checks when possible

Cursor and plain-prompt adapters are still experimental or documentation-level capabilities. Presets are optional visual references and are not forced unless you choose one.

---

# Self-Test Example

This repository includes a small audit / fix self-test. The rough page intentionally includes horizontal overflow, overlay conflicts, broken media ratio, mismatched native controls, table overflow, and AI-template noise. The fixed version keeps the original purple/cyan gradient and glass-card style while tightening layout, controls, tables, states, and readability.

| Before audit | After fix |
| --- | --- |
| ![Before audit: rough upload review page](./examples/reports/assets/self-audit-before.png) | ![After fix: theme-preserving upload review page](./examples/reports/assets/self-audit-after.png) |

See the full report in [`examples/reports/self-audit-rough-ui-report.md`](./examples/reports/self-audit-rough-ui-report.md), and the test page in [`examples/test-cases/self-audit-rough-ui/`](./examples/test-cases/self-audit-rough-ui/).

---

# Quick Start

## Current Recommended Install

Standard skill-ecosystem install:

```bash
npx skills add frankguodev/webcraft-skills --skill webcraft-ui
```

This installs the `webcraft-ui` skill directory, including `SKILL.md` and the audit / review / fix / polish / build workflows under `references/`. After installing, invoke it with natural language, `/skills`, or `$webcraft-ui`.

If you use Claude Code and want `/ui-audit`, `/ui-review`, `/ui-fix`, `/ui-polish`, `/ui-build`, and related slash command prompts installed too, use this package's full installer.

Install for Codex:

```bash
npx webcraft-skills install --agent codex
```

For Claude Code:

```bash
npx webcraft-skills install --agent claude
```

To install for both:

```bash
npx webcraft-skills install --agent all
```

Install only one skill:

```bash
npx webcraft-skills install --agent codex --skill webcraft-ui
```

List skills included in the npm package:

```bash
npx webcraft-skills list
```

For Codex, this installs:

```text
~/.agents/skills/webcraft-ui
~/.codex/skills/webcraft-ui
```

The installer writes both Codex-compatible paths to support different current clients.

For Claude Code, it installs:

```text
~/.claude/skills/webcraft-ui
~/.claude/commands/*.md
```

This repository is organized as a skills collection. Future skills should live under `skills/<skill-name>/SKILL.md`. `npx skills add` is the general installation entry; `npx webcraft-skills install` additionally installs the Claude Code command prompts maintained by this project.

## Invocation

In Codex, invoke `webcraft-ui` with natural language. You can also run `/skills` or type `$` to mention the installed `webcraft-ui` skill.

In Claude Code, use the installed slash command prompts: `/ui-audit`, `/ui-review`, `/ui-fix`, `/ui-polish`, `/ui-build`, and `/ui-preset`. Text after the command is a prompt convention for the agent, not a separate CLI parser.

See each workflow section below for copyable prompt examples.

## Choosing A Workflow

| Your goal | Recommended workflow | Example prompt |
| --- | --- | --- |
| You are not sure what is wrong and want a risk pass | `audit` | `Use webcraft-ui to run a Standard Audit on the current website` |
| You only want PR, diff, screenshot, or local-change risk review | `review` | `Use webcraft-ui to review the current diff and only inspect this change` |
| You already know the issue and want it repaired | `fix` | `Use webcraft-ui to fix Critical and Major issues from the last audit` |
| The page works, but should feel more refined and less templated | `polish` | `Use webcraft-ui to polish the current homepage while preserving content and theme` |
| You need a new page, site, or feature module | `build` | `Use webcraft-ui to build a settings page using the current project components` |

The most reliable prompts usually name the target page or file, the workflow, important viewports or interactions, whether code edits are allowed, and whether you want a plan first. The agent then decides whether to read code, open a browser, start a temporary service, save screenshots, or rely on static inspection.

### Audit: Find Issues

`Audit` finds issues, provides evidence, and recommends a fix order. It does not edit code by default. Use it when you want to understand UI risk before changing the implementation.

Audit depth:

- `Quick Audit`: fast pass for "take a quick look" requests. Reports only Critical and obvious Major issues, up to 8 findings.
- `Standard Audit`: default practical mode. Reports Critical, Major, and a small number of high-value Minor issues, usually 8 to 16 findings.
- `Focused Audit`: deeper practical audit for serious review without the full cost of Deep Audit. No score by default, up to 32 findings, and expands viewports only when risk signals justify it.
- `Deep Audit`: full pass for launch readiness or strict review. Uses the full audit system, scoring model, content stress tests, broader viewport coverage, and deeper checks.

These audit depths use structured budgets for finding counts, severity scope, scoring expectations, viewport coverage, and output detail, so agents are less likely to make light audits too heavy or deep audits too shallow.

Default viewport checks start from 375px mobile and 1280px desktop. Standard may add 768px when useful. Focused adds tablet, wide desktop, or small-mobile viewports by risk. Deep expands to a broader matrix including small mobile, tablet, large desktop, and wide desktop when the project can be run or inspected that way.

Browser evidence:

- When audit opens a browser, it records viewport, page region, interaction state, scroll position, and visible symptoms.
- If screenshots are saved, audit reports the screenshot directory and key files. Saved audit screenshots default to `examples/reports/assets/audit/<audit-run>/`.
- If audit starts a temporary dev / preview / static server, it records URL / port and shuts the temporary service down afterward unless you ask to keep it running.
- Except for report-listed evidence artifacts, temporary files created during audit are deleted before reporting.
- If audit cannot run the page, it marks layout, hover, focus, overlay, and responsive conclusions as static inference instead of verified browser results.

Common audit targets:

- Current page: quickly check the page you are editing for obvious layout, hierarchy, responsive, or state issues.
- Specific page: homepage, pricing page, login page, settings page, article page, checkout page.
- Specific feature: upload flow, search and filters, bulk actions, signup/login, edit forms, confirmation dialogs.
- Specific module: all admin pages, user center, content management, order flow, analytics dashboard.
- Specific viewport or device: mobile only, 375px, tablet breakpoints, desktop breakpoints.
- Pre-launch check: run a `Deep Audit` for stricter coverage and a fix priority order.

Audit examples:

```text
Use webcraft-ui to run a Standard Audit on the current website.
Use webcraft-ui to run a Quick Audit on the homepage and report only Critical and obvious Major issues.
Use webcraft-ui to run a Focused Audit on the admin pages before launch, but keep it practical.
Use webcraft-ui to run a Standard Audit on the upload flow, focusing on forms, states, errors, and mobile.
Use webcraft-ui to run a Deep Audit on all admin pages before launch.
Use webcraft-ui to audit the current localhost page, focusing on 375px and 1280px.
Use webcraft-ui to audit this screenshot, judging only visible layout, hierarchy, copy, and obvious state.
```

Claude Code examples:

```text
/ui-audit Standard Audit for the whole site
/ui-audit Quick Audit for the homepage, report only Critical and obvious Major issues
/ui-audit Focused Audit for admin pages before launch, keep it practical
/ui-audit Standard Audit for the upload flow, focusing on forms, states, errors, and mobile
/ui-audit Deep Audit for all admin pages before launch
```

### Review: Lightweight Risk Review

`Review` inspects UI risk in a PR, diff, local change, single component, screenshot, or specified page area. It is lighter than Audit and answers: "Does this change or local surface contain UI risks worth fixing?"

Use it for:

- PR / diff UI review
- single component or single file risk checks
- visible layout, hierarchy, copy, and obvious state checks from screenshots
- regression-risk checks for a named page area or named change

Review does not score by default, does not run a full viewport matrix, and does not produce a full audit report. It reports only issues with location, evidence, impact, and fix direction. Issues that require a real page, multiple viewports, or complex interaction verification go into `Open Questions` or should be upgraded to `audit-ui`.

If Review starts a temporary local service for verification, it shuts it down and checks the port before final. If screenshots or browser evidence are saved, they default to `examples/reports/assets/review/<review-run>/`. Other temporary files are deleted before final by default.

Review examples:

```text
Use webcraft-ui to review this PR and only report UI risk introduced by the change.
Use webcraft-ui to review the current diff, focusing on responsive regressions and component states.
Use webcraft-ui to review src/components/Header.tsx for navigation, mobile menu, and clickable-state risks.
Use webcraft-ui to review this screenshot and only report visible layout, hierarchy, and copy issues.
Use webcraft-ui to review the settings page filter area without expanding to the whole admin app.
Use webcraft-ui to review this button component, focusing on long copy, loading, disabled, and focus-visible states.
```

Claude Code examples:

```text
/ui-review review this PR and only report UI risk introduced by the change
/ui-review review the current diff, focusing on responsive regressions and component states
/ui-review review the settings page filter area without expanding to the whole admin app
/ui-review review this button component, focusing on long copy, loading, disabled, and focus-visible states
```

### Fix: Repair Issues

`Fix` edits code based on confirmed audit/review findings or a user-specified issue. Its goal is to make confirmed problems usable, clear, and consistent, not to casually redesign the whole page.

In Codex:

```text
Use webcraft-ui to fix Critical and Major issues from the last audit.
Use webcraft-ui to fix only the homepage mobile horizontal overflow.
Use webcraft-ui to fix form states, error messages, and loading states in the upload flow.
Use webcraft-ui to fix native select controls in admin pages so they match the existing component system.
Use webcraft-ui to propose a fix plan first, without editing code yet.
Use webcraft-ui to fix the CTA wrapping and hover-state issues from the last review.
Use webcraft-ui to fix settings-page dialog close, scrolling, and focus-visible issues, then recheck mobile.
Use webcraft-ui to fix only Critical issues and leave Minor polish alone.
```

In Claude Code:

```text
/ui-fix Critical and Major issues from the last audit
/ui-fix only fix homepage mobile horizontal overflow
/ui-fix fix form states, error messages, and loading states in the upload flow
/ui-fix fix native select controls in admin pages so they match the existing component system
/ui-fix propose a fix plan first, without editing code yet
/ui-fix fix the CTA wrapping and hover-state issues from the last review
/ui-fix fix only Critical issues and leave Minor polish alone
```

Common fix scopes:

- By severity: fix only `Critical`, or fix `Critical` and `Major`.
- By page: fix only the homepage, login page, settings page, checkout page, etc.
- By feature: fix upload, search and filters, bulk actions, edit forms, confirmation dialogs.
- By issue type: fix responsive overflow, component states, form errors, modal close behavior, inconsistent visual tokens.
- By plan: ask for a `fix plan` first, then confirm before editing code.

`Fix` preserves the existing visual system, copy, business logic, and technical stack by default. Unless you explicitly request a redesign or specify a preset, it should not turn the page into a different visual direction.

Fix verification:

- Fix aligns verification with the target the user would actually open: command, URL / port, route, auth state, data state, and operation path when available.
- Build passing is not treated as proof that the page is usable. When the page can run, fix opens the affected page or route and checks for blank screens, runtime errors, error boundaries, missing key assets, broken initialization, and obvious console errors.
- If fix starts a temporary dev / preview / static server, it records the command and URL / port, then shuts the temporary service down after verification.
- If screenshots are generated during fix, they are saved under `examples/reports/assets/fix/<fix-run>/` when possible, with `before` / `after` naming when both phases are captured.
- Except for screenshots, reports, explicitly retained evidence artifacts, or real project changes, temporary files created for fix verification are deleted before output.
- When fixing findings from `Focused Audit`, fix prioritizes Top Findings, systemic Major issues, and risk viewports without expanding into a Deep-level rewrite.

### Polish: Refine Existing UI

`Polish` makes existing UI more refined, realistic, and less AI-generated while preserving product meaning, information structure, technical stack, and visual direction. It is not redesign and it is not the workflow for blocking bugs.

Use it to:

- tighten spacing, typography, color, radius, borders, and shadows
- complete hover, focus-visible, disabled, loading, empty, and error states
- remove excessive badges, bento grids, gradient glows, vague slogans, and meaningless decoration
- make a page feel more mature and restrained without changing its style direction

If the core flow is unusable, severe overflow exists, content is blocked, forms cannot submit, or dialogs cannot close, use `fix-ui` first. If the issue has spread across pages, use `audit-ui` first.

Polish before / after screenshots default to `examples/reports/assets/polish/<polish-run>/`. Temporary comparison files, drafts, verification scripts, and temporary data are deleted before output unless you ask to keep them or they are listed as evidence artifacts.

Polish examples:

```text
Use webcraft-ui to polish the current homepage while preserving content and theme.
Use webcraft-ui to polish the pricing page, focusing on spacing, type hierarchy, and CTA priority.
Use webcraft-ui to polish the admin list page while preserving density and making filters, table, and pagination more consistent.
Use webcraft-ui to polish the login page with only visual details and state completion, without changing copy.
Use webcraft-ui to polish this hero section by reducing badges and gradient decoration while keeping the brand color.
Use webcraft-ui to diagnose why the current page feels rough, then propose a polish plan.
```

Claude Code examples:

```text
/ui-polish polish the current homepage while preserving content and theme
/ui-polish polish the pricing page, focusing on spacing, type hierarchy, and CTA priority
/ui-polish polish the admin list page while preserving density and making filters, table, and pagination more consistent
/ui-polish diagnose why the current page feels rough, then propose a polish plan
```

### Build: Create Pages Or Features

`Build` creates a website, complete page, or user-task-oriented feature module inside an existing page. Its goal is real, usable, maintainable UI that fits the project context, not a fragile pretty mockup.

Use it for:

- `Site Build`: website, product site, multi-page skeleton, or complete static site
- `Page Build`: a complete page such as settings, pricing, login, or detail page
- `Feature Build`: a page region or feature module such as filters, upload panel, empty state, or form flow

Build follows the existing project's directories, routes, components, tokens, global styles, and visual system by default. When real business facts are missing, it uses replaceable placeholders instead of inventing customers, prices, metrics, cases, teams, or awards.

Delivered files go to the real project location or user-specified path, not the report directory. Verification screenshots or retained evidence default to `examples/reports/assets/build/<build-run>/`. Temporary previews, mocks, verification HTML / scripts, and downloads are deleted before output by default.

Build examples:

```text
Use webcraft-ui to build a settings page using the current project's components and route conventions.
Use webcraft-ui to build an upload feature module with empty, loading, error, and success states.
Use webcraft-ui to build a pricing page with replaceable placeholder content, without inventing real customers or prices.
Use webcraft-ui to build an admin data-table page with filters, bulk actions, empty state, and mobile fallback.
Use webcraft-ui to build a static portfolio homepage using the existing global styles and make it work at 375px / 768px / 1280px.
Use webcraft-ui to build an onboarding stepper as frontend UI only, without adding backend, auth, or database.
```

Claude Code examples:

```text
/ui-build build a settings page using the current project's components and route conventions
/ui-build build an upload feature module with empty, loading, error, and success states
/ui-build build a pricing page with replaceable placeholder content, without inventing real customers or prices
/ui-build build an admin data-table page with filters, bulk actions, empty state, and mobile fallback
```

## Artifacts And Temporary Files

| Workflow | Retained by default | Deleted by default |
| --- | --- | --- |
| `audit` | Reported screenshots, evidence paths, and findings | Temporary scripts, pages, downloads, and unreported intermediate files |
| `review` | Local screenshots or browser evidence when needed | Temporary screenshots, diff helper files, and temporary services |
| `fix` | Real code changes and necessary before / after screenshots | Verification scripts, temporary data, and temporary services |
| `polish` | Real code changes and necessary before / after screenshots | Temporary comparison files, visual drafts, and verification files |
| `build` | New or edited real project files and necessary verification screenshots | Temporary previews, mocks, downloads, and verification scripts |

If you want to keep a temporary artifact, say so in the prompt, for example "keep the verification screenshots" or "keep the polish before/after images." If a workflow starts a local service, it distinguishes pre-existing services from temporary services started for the run; temporary services are shut down and port-checked before output.

## Cursor

Cursor support is not part of the stable install path yet. For now, use these workflow rules manually if you know how to configure Cursor Project Rules.

## Plain Prompt

Plain prompt usage is not part of the stable release yet.

## Project Extensions

Create `.webcraft-skills/EXTEND.md` and `.webcraft-skills/config.json` in the target project to override default audit standards, brand constraints, radius scale, viewports, and visual rules.

For user-level defaults and priority rules, see [`docs/configuration.md`](./docs/configuration.md).

---

# Capabilities

Stable:

- audit UI quality with Quick, Standard, Focused, or Deep Audit modes
- review PRs, diffs, components, screenshots, or specified page areas
- fix confirmed audit/review findings
- refine existing UI without changing product meaning
- build sites, pages, or feature modules

Optional:

- list and apply visual presets

---

# FAQ / Troubleshooting

**Installed, but the skill is not visible?**  
Check that the install target matches your client. Codex usually reads `~/.agents/skills/webcraft-ui` and `~/.codex/skills/webcraft-ui`; Claude Code usually reads `~/.claude/skills/webcraft-ui` and `~/.claude/commands/`.

**What is the difference between `npx skills add` and `npx webcraft-skills install`?**  
`npx skills add frankguodev/webcraft-skills --skill webcraft-ui` is the standard skill-ecosystem install and installs the `webcraft-ui` skill itself. `npx webcraft-skills install --agent claude` is this project's full installer and also installs Claude Code slash command prompts.

**Audit or Review?**  
Use `audit` for whole pages, whole sites, pre-launch checks, or multi-viewport inspection. Use `review` for PRs, diffs, screenshots, single components, or named page areas.

**Will Polish redesign my page?**  
It should not. `polish` preserves content, information structure, and visual direction by default. It focuses on details, states, spacing, hierarchy, and template smell. If new modules or structural changes are needed, use `build` or run an `audit` first.

**Will a local service started by the agent keep occupying a port?**  
The workflows treat temporary services as cleanup responsibilities and check ports before output. Pre-existing services are reused by default and are not shut down without permission.

---

# Acknowledgements

The skill organization, installation experience, and README structure of this project were inspired by these projects and authors.

Special thanks to:

- [baoyu-skills](https://github.com/JimLiu/baoyu-skills)
- [baoyu](https://github.com/JimLiu) / [@dotey](https://x.com/dotey)
- [mattpocock/skills](https://github.com/mattpocock/skills)
- [Matt Pocock](https://github.com/mattpocock) / [@mattpocockuk](https://x.com/mattpocockuk)

Thank you for exploring and sharing patterns for the AI Agent skill ecosystem.

---

# Disclaimer

Webcraft Skills provides auxiliary rules and workflows for AI agents. It does not guarantee that review findings, fixes, or generated code are complete, correct, or suitable for every project. Agents may misjudge UI issues, miss risks, produce changes that do not fit your constraints, or run local commands and temporary services during verification.

Before using it in production projects, review all changes yourself, run the necessary tests, and confirm that generated content, business copy, data, visual expression, and third-party assets meet your project requirements. You are responsible for code changes, release risks, data issues, or business impact caused by using this project.

---

# License

MIT
