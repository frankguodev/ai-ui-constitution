# Changelog

English | [中文](./CHANGELOG_zh_CN.md)

---

## v0.1.25 - 2026-05-27

### Build

- Integrated page breathing room into `build-ui` information structure, quality baselines, and self-check rules so section rhythm, container width, card density, paragraph line length, and CTA weight support scanning paths together.
- Added density guidance by page type: Dashboard / Admin screens can stay tighter with clear grouping, while Landing / Portfolio / Content pages should preserve stronger vertical rhythm.
- Added a prohibition against filling pages only to make them feel "richer" when it removes section pauses, weakens hierarchy, or makes scanning harder.

### Polish

- Strengthened `polish-ui` spacing and rhythm judgment in both directions: insufficient breathing room and excessive whitespace are now both treated as polish risks when they harm scan paths, content density, or first-screen balance.
- Added page-type and composition-axis guidance, especially for search / glossary / resource-index pages that need a stable centered entry across title, supporting copy, search field, popular chips, and following content.
- Compressed the `polish-ui` workflow by folding Audit / Fix handoff, execution depth, recheck, and output guidance into a shorter execution path.
- Added reference-guided polish rules: borrow layout skeletons, section roles, element types, density relationships, and icon semantics from references, but do not copy reference branding, copy, data, metrics, logos, or business claims.
- Strengthened content-structure checks for repeated sections, repeated card grids, card area that exceeds information value, repeated icon semantics, and directory / search / glossary / resource-index density.
- Changed Light / Standard / Deep Polish into internal execution depth; externally `polish` remains the only user-facing workflow and the agent chooses depth from goal, risk, and scope.
- Added anti-stacking rules for reference-guided polish: inventory existing modules and transferable reference modules first, then merge, replace, weaken, delete, or add sparingly, with merge-before-add as the default.
- Added post-polish section-role review so each section answers a clear question and multiple sections do not use the same form to answer the same entry problem.
- Changed `polish-ui` verification boundaries: polish does not start browsers or save screenshots by default, and only does so when the user explicitly asks for browser verification, before / after screenshots, multi-viewport checks, or verified delivery.

## v0.1.24 - 2026-05-25

### Review

- Lightly integrated running-page verification constraints into `review-ui` while keeping review from starting browsers or local services by default.
- Required mixed reviews that run a page to distinguish reused existing services from temporary services started by the review, with a short output note for service ownership, URL / port, and final state.
- Added post-shutdown port checks for temporary services so Windows, npm, Next.js, Vite, Storybook, and similar multi-process launches are not treated as closed just because the parent PID stopped.
- Added review evidence artifact placement rules: review does not write files by default; saved screenshots, browser evidence, or report files use `examples/reports/assets/review/<review-run>/`, and other temporary files are deleted before final.

### Audit

- Strengthened `audit-ui` temporary dev / preview / static server lifecycle rules by requiring target-port and process-residue checks after shutdown.
- Added service-evidence reporting for port or process residue so audit reports do not record startup details while omitting cleanup state.
- Expanded audit screenshot placement to any audit mode that saves screenshots, kept report-file writing opt-in, and made temporary scripts, pages, data, and downloads delete-by-default before reporting.

### Fix

- Strengthened service ownership management in `fix-ui` page-and-path verification by checking whether the target port already has a service before starting a temporary one.
- Required temporary service cleanup to use port and child-process checks instead of relying only on the parent PID returned at startup.
- Clarified that fix evidence directories are for screenshots, reports, and artifacts while real fix code goes to real project locations; verification temporary files are deleted before output by default.

### Polish

- Strengthened temporary service shutdown and port checks in `polish-ui` light rechecks.
- Required unclear remaining port ownership to be preserved instead of shutting down pre-existing services, with the result reported in `Temporary service`.
- Clarified that polish before / after screenshots and retained evidence share the same `examples/reports/assets/polish/<polish-run>/` directory, while temporary comparison files, drafts, and verification files are deleted by default.
- Tightened `polish-ui` execution boundaries: review / audit findings are diagnostic clues only, polish does not add page-level information modules by default, decoration reduction starts with subtraction, and rechecks must catch same-page information duplication.
- Strengthened polish interaction-detail checks for cursor / pointer on truly clickable elements, focus-visible, non-shifting state feedback, icon/text alignment, hit targets, and long label / badge / chip / error-text pressure.

### Build

- Added temporary service lifecycle rules to `build-ui` self-check and verification, covering pre-start port ownership, startup records, post-shutdown port checks, and multi-process launch paths.
- Added a `Temporary service` output field so build verification can state whether a service was reused, closed, or left with residue.
- Added build artifact rules: delivered files go to real project locations, verification screenshots and retained evidence go under `examples/reports/assets/build/<build-run>/`, and temporary previews, mocks, verification scripts, and downloads are deleted by default.

### Docs

- Updated README and README_zh_CN to present Audit, Review, Fix, Polish, and Build as the five public workflows instead of limiting the stable scope to audit / fix.
- Added review, polish, and build usage examples, fit guidance, artifact locations, and temporary-file cleanup notes.
- Reorganized README usage guidance so examples live under each workflow, and added environment, browser-verification, temporary-service, and temporary-file cleanup tips.
- Kept Cursor and plain-prompt adapters experimental, and clarified presets as optional visual references.
- Added acknowledgements to README and README_zh_CN thanking `baoyu-skills`, `mattpocock/skills`, and their authors for inspiration in the AI Agent skill ecosystem.
- Added a disclaimer to README and README_zh_CN reminding users to review AI agent findings, code changes, generated content, and release risk themselves.
- Further improved the README reader path with workflow selection guidance, artifact and temporary-file behavior, and FAQ / troubleshooting sections.

### Release

- Updated the package version to `0.1.24` so it matches the changelog version.
- Tightened `SKILL.md` and slash command entry guidance: Build covers sites, pages, and feature modules; Fix supports user-specified issues; presets are read only when the user chooses one or the workflow explicitly needs preset guidance.
- Corrected `/ui-review` and `/ui-build` prompt boundaries to avoid treating whole-site health checks as Review or auto-applying presets when none were specified.

## v0.1.23 - 2026-05-25

### Fix

- Upgraded `fix-ui` page-open verification into page-and-path verification with separate direct route, client navigation, and deep-link checks.
- Added entry surface, adjacent navigation surface, and downstream exit rechecks to reduce blind spots from validating only the target URL.
- Added risk-based verification cost control: pure visual touch-ups stay lightweight, while high-risk route / navigation / data / client-state fixes use the full path matrix.
- Added Next.js App Router / RSC / `next/link` guidance clarifying that build success, HTTP 200, or returned SSR HTML cannot replace client navigation verification.
- Added fallback rules for failed browser automation: curl, HTTP checks, or passing builds cannot be reported as browser path verification; unverified items and residual risk must be output.

### Build

- Strengthened the `build-ui` pre-build gate around build target, project environment, entry location, route/navigation, visual source, content source, and verification path.
- Added content truthfulness rules to avoid inventing customers, prices, metrics, cases, or business claims in landing pages, product pages, and high-fidelity builds.
- Added route and navigation integration requirements for existing projects so new pages are reachable and have a way out.
- Added a post-build verification gate scaled by static HTML, existing project page, navigation entry, component, and pure visual local build risk.
- Added output fields for entry / route, navigation integration, placeholder content, unverified items, and residual risk.
- Simplified `build-ui` modes into Site / Page / Feature build scopes, removed production quality as a separate mode, and clarified that every build should meet a production-grade baseline.
- Compressed the `build-ui` workflow structure by merging repeated input, reference, preset, implementation-boundary, quality-baseline, and verification rules to reduce runtime token cost.

## v0.1.22 - 2026-05-24

Focused audit and safer fix verification release.

### Audit

- Added `Focused Audit`, a practical deep-review mode between Standard and Deep.
- Set `Focused Audit` to no default scoring, up to 32 findings, and risk-triggered viewport expansion.
- Clarified audit mode budgets, module loading, viewport behavior, screenshot artifacts, and temporary dev-server cleanup.
- Added screenshot artifact guidance for browser-based audit runs.

### Fix

- Strengthened page-open verification so fixes align with the user's real command, URL / port, route, auth state, data state, and operation path when available.
- Added temporary dev / preview / static server lifecycle rules to avoid leaving ports occupied after verification.
- Added screenshot artifact guidance for fix runs, including before/after naming.
- Added `Focused Audit` source handling so fix prioritizes Top Findings, systemic Major issues, and risk viewports without expanding into Deep-level refactoring.
- Added output fields for source mode, verification target, dev server status, and screenshots.

### Review

- Kept `review-ui` lightweight for code, diff, and screenshot review by removing default browser, screenshot, and temporary service handling.
- Moved issues that require a real page, multiple viewports, or interaction states into `Open Questions`, with follow-up guidance for `audit-ui` or post-fix verification in `fix-ui`.

### Docs

- Reworked README structure around stable scope, installation, usage, audit modes, fix verification, artifacts, and capability status.
- Updated audit/fix examples to include `Focused Audit`.
- Updated public capability descriptions to reflect the current stable audit/fix scope.

## v0.1.2 - 2026-05-22
 - Optimize audit and fix functions


## v0.1.1 - 2026-05-21

Public release preparation for `webcraft-skills`.

### Changed

- Renamed the project and package from the UI-specific name to `webcraft-skills`, leaving room for a broader website skill pack.
- Renamed the installable UI skill to `webcraft-ui` while keeping `webcraft-skills` as the npm package and repository name.
- Updated the public README and usage docs to present only the currently verified stable workflows: audit and fix.
- Removed maintainer-only implementation details from public-facing documentation.
- Aligned installer help, package metadata, and skill paths with the new package name.
- Corrected Codex installation and usage guidance: Codex installs the skill under both `~/.agents/skills` and `~/.codex/skills` for compatibility, and uses `/skills`, `$webcraft-ui`, or explicit natural-language invocation instead of package-defined custom slash commands.

### Audit

- Tightened the audit checklist around native form controls, custom component reuse, responsive breakpoints, admin workflows, and content stress.
- Clarified that native inputs, selects, dropdowns, multiselects, and menus should be flagged when they clash with the product style or bypass existing custom controls.

### Fix

- Added clearer repair guidance for replacing or wrapping mismatched native controls with project-appropriate custom components.
- Strengthened post-fix verification for forms, dialogs, menus, navigation, responsive layouts, and interaction states.

### Release

- Verified the skill package with validation and npm dry-run packaging.

## v0.1.0 - 2026-05-20

Skill-focused foundation release.

### Stable

- Installs both the skill package and slash command prompts.
- Stable workflows:
  - Audit: run a strict UI quality audit.
  - Fix: fix confirmed audit findings.
- Added bilingual runtime references for audit and fix workflows.
- Added locale routing so Chinese users read `.zh.md` references and English users read English references.

### Audit

- Expanded the UI audit rubric with clearer Critical / Major / Minor severity definitions.
- Added stronger checks for admin/dashboard workflows, responsive breakpoints, interaction states, content stress, accessibility, and visual consistency.
- Added explicit detection for native controls that do not match the product style or fail to use existing custom controls.
- Added audit workflow guidance for evidence, viewport coverage, code/static inspection, screenshots, and whole-site sampling.

### Fix

- Expanded the fix workflow with scoped repair rules, fix priority, verification steps, and output format.
- Added repair guidance for replacing or wrapping native inputs, selects, dropdowns, multiselects, menus, and other base controls.
- Added post-fix recheck rules for responsive behavior, component states, dialogs, menus, forms, navigation, and content stress.

### Docs

- Reworked README for public users.
- Clearly marks audit and fix as stable.
- Marks `/ui-review`, `/ui-polish`, `/ui-build`, and `/ui-preset` as experimental and not yet fully tested.
- Removed maintainer-only sync/runtime details from public README.

## v0.0.1 - 2026-05-16

Initial public version of the project.
