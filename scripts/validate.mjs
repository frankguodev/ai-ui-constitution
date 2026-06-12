import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "skills/webcraft-ui/SKILL.md",
  "skills/webcraft-ui/agents/openai.yaml",
  "skills/webcraft-ui/references/checklists/ui-audit.md",
  "skills/webcraft-ui/references/checklists/ui-audit.zh.md",
  "core/checklists/modules/layout.md",
  "core/checklists/modules/layout.zh.md",
  "core/checklists/modules/components-states.md",
  "core/checklists/modules/components-states.zh.md",
  "core/checklists/modules/responsive.md",
  "core/checklists/modules/responsive.zh.md",
  "core/checklists/modules/forms-controls.md",
  "core/checklists/modules/forms-controls.zh.md",
  "core/checklists/modules/visual-system.md",
  "core/checklists/modules/visual-system.zh.md",
  "core/checklists/modules/accessibility.md",
  "core/checklists/modules/accessibility.zh.md",
  "core/checklists/modules/ai-template-smell.md",
  "core/checklists/modules/ai-template-smell.zh.md",
  "skills/webcraft-ui/references/checklists/modules/layout.md",
  "skills/webcraft-ui/references/checklists/modules/layout.zh.md",
  "skills/webcraft-ui/references/checklists/modules/components-states.md",
  "skills/webcraft-ui/references/checklists/modules/components-states.zh.md",
  "skills/webcraft-ui/references/checklists/modules/responsive.md",
  "skills/webcraft-ui/references/checklists/modules/responsive.zh.md",
  "skills/webcraft-ui/references/checklists/modules/forms-controls.md",
  "skills/webcraft-ui/references/checklists/modules/forms-controls.zh.md",
  "skills/webcraft-ui/references/checklists/modules/visual-system.md",
  "skills/webcraft-ui/references/checklists/modules/visual-system.zh.md",
  "skills/webcraft-ui/references/checklists/modules/accessibility.md",
  "skills/webcraft-ui/references/checklists/modules/accessibility.zh.md",
  "skills/webcraft-ui/references/checklists/modules/ai-template-smell.md",
  "skills/webcraft-ui/references/checklists/modules/ai-template-smell.zh.md",
  "skills/webcraft-ui/references/workflows/audit-ui.md",
  "skills/webcraft-ui/references/workflows/audit-ui.zh.md",
  "skills/webcraft-ui/references/workflows/build-ui.md",
  "skills/webcraft-ui/references/workflows/build-ui.zh.md",
  "skills/webcraft-ui/references/workflows/review-ui.md",
  "skills/webcraft-ui/references/workflows/review-ui.zh.md",
  "skills/webcraft-ui/references/workflows/polish-ui.md",
  "skills/webcraft-ui/references/workflows/polish-ui.zh.md",
  "skills/webcraft-ui/references/workflows/fix-ui.md",
  "skills/webcraft-ui/references/workflows/fix-ui.zh.md",
  "skills/webcraft-ui/references/modes/audit-modes.json",
  "skills/webcraft-ui/references/presets/cinematic-minimal.md",
  "skills/webcraft-ui/references/presets/cinematic-minimal.zh.md",
  "commands/ui-audit.md",
  "docs/commands.md",
  "docs/configuration.md",
  "scripts/sync-runtime.mjs",
  "scripts/validate-examples.mjs",
  "scripts/capture-example-screenshots.mjs",
  "examples/project-config/EXTEND.md",
  "examples/project-config/config.json",
  "examples/test-cases/README.md",
  "examples/test-cases/rough-landing/index.html",
  "examples/test-cases/rough-landing/expected-findings.md",
  "examples/test-cases/broken-mobile/index.html",
  "examples/test-cases/broken-mobile/expected-findings.md",
  "examples/test-cases/missing-states/index.html",
  "examples/test-cases/missing-states/expected-findings.md",
  "examples/test-cases/click-affordance/before.html",
  "examples/test-cases/click-affordance/index.html",
  "examples/test-cases/click-affordance/expected-findings.md",
  "examples/test-cases/click-affordance/test.json",
  "examples/test-cases/hero-layout-balance/before.html",
  "examples/test-cases/hero-layout-balance/index.html",
  "examples/test-cases/hero-layout-balance/expected-findings.md",
  "examples/test-cases/hero-layout-balance/test.json",
  "examples/test-cases/existing-style-plus-design-ref/index.html",
  "examples/test-cases/existing-style-plus-design-ref/reference-layout.txt",
  "examples/reports/rough-landing-audit.md",
  "examples/reports/broken-mobile-audit.md",
  "examples/reports/missing-states-review.md",
  "examples/reports/existing-style-build.md",
  "examples/reports/broken-mobile-fix.md",
  "examples/reports/missing-states-fix.md",
  "examples/reports/rough-landing-polish.md",
  "examples/reports/workflow-test-matrix.md"
];

const errors = [];
const warnings = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    errors.push(`Missing ${file}`);
  }
}

const skillsRoot = join(root, "skills");
if (existsSync(skillsRoot)) {
  const skillEntries = readdirSync(skillsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  if (skillEntries.length === 0) {
    errors.push("No skill directories found under skills/");
  }

  for (const entry of skillEntries) {
    const skillPath = join(skillsRoot, entry.name, "SKILL.md");
    if (!existsSync(skillPath)) {
      errors.push(`Missing SKILL.md for skills/${entry.name}`);
      continue;
    }

    const skill = readFileSync(skillPath, "utf8");
    const frontmatterMatch = skill.match(/^---\r?\nname: ([a-z0-9-]+)\r?\ndescription: .+\r?\n---/s);
    if (!frontmatterMatch) {
      errors.push(`Invalid frontmatter in skills/${entry.name}/SKILL.md`);
    } else if (frontmatterMatch[1] !== entry.name) {
      errors.push(`Skill name mismatch: skills/${entry.name}/SKILL.md declares ${frontmatterMatch[1]}`);
    }
  }
}

function collectMarkdownFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (extname(entry.name) === ".md") {
      files.push(fullPath);
    }
  }

  return files;
}

for (const referenceRoot of [
  "core",
  "skills/webcraft-ui/references"
]) {
  const directory = join(root, referenceRoot);
  if (!existsSync(directory)) continue;

  const files = collectMarkdownFiles(directory);
  const fileSet = new Set(files.map((file) => relative(directory, file).replaceAll("\\", "/")));

  for (const file of fileSet) {
    if (file.endsWith(".zh.md")) {
      const englishPair = file.replace(/\.zh\.md$/, ".md");
      if (!fileSet.has(englishPair)) {
        errors.push(`Missing English locale pair for ${referenceRoot}/${file}`);
      }
    } else {
      const chinesePair = file.replace(/\.md$/, ".zh.md");
      if (!fileSet.has(chinesePair)) {
        errors.push(`Missing Chinese locale pair for ${referenceRoot}/${file}`);
      }
    }
  }
}

function countHeadings(content) {
  return content
    .split(/\r?\n/)
    .filter((line) => /^#{2,3}\s+\S/.test(line))
    .length;
}

for (const referenceRoot of [
  "core",
  "skills/webcraft-ui/references"
]) {
  const directory = join(root, referenceRoot);
  if (!existsSync(directory)) continue;

  const files = collectMarkdownFiles(directory);
  const fileSet = new Set(files.map((file) => relative(directory, file).replaceAll("\\", "/")));

  for (const file of fileSet) {
    if (file.endsWith(".zh.md")) continue;

    const chinesePair = file.replace(/\.md$/, ".zh.md");
    if (!fileSet.has(chinesePair)) continue;

    const englishContent = readFileSync(join(directory, file), "utf8");
    const chineseContent = readFileSync(join(directory, chinesePair), "utf8");
    const englishHeadings = countHeadings(englishContent);
    const chineseHeadings = countHeadings(chineseContent);
    const smaller = Math.min(englishHeadings, chineseHeadings);
    const larger = Math.max(englishHeadings, chineseHeadings);

    if (larger >= 8 && (smaller === 0 || larger / smaller > 2)) {
      warnings.push(
        `Locale pair may be unbalanced: ${referenceRoot}/${file} has ${englishHeadings} headings, ${referenceRoot}/${chinesePair} has ${chineseHeadings}`
      );
    }
  }
}

const skillPath = join(root, "skills/webcraft-ui/SKILL.md");
if (existsSync(skillPath)) {
  const skill = readFileSync(skillPath, "utf8");
  if (!/^---\r?\nname: webcraft-ui\r?\ndescription: .+\r?\n---/s.test(skill)) {
    errors.push("Invalid SKILL.md frontmatter");
  }
  for (const phrase of [
    "## Locale Contract",
    "Choose exactly one runtime locale",
    "Do not choose locale from the repository's available files",
    "After choosing `zh`, read only `.zh.md`",
    "After choosing `en`, read only non-`.zh.md`"
  ]) {
    if (!skill.includes(phrase)) {
      errors.push(`Missing locale contract phrase in SKILL.md: ${phrase}`);
    }
  }
}

for (const file of [
  "core/workflows/audit-ui.md",
  "core/workflows/fix-ui.md",
  "core/workflows/review-ui.md",
  "core/workflows/polish-ui.md",
  "core/workflows/build-ui.md",
  "skills/webcraft-ui/references/workflows/audit-ui.md",
  "skills/webcraft-ui/references/workflows/fix-ui.md",
  "skills/webcraft-ui/references/workflows/review-ui.md",
  "skills/webcraft-ui/references/workflows/polish-ui.md",
  "skills/webcraft-ui/references/workflows/build-ui.md"
]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  if (!text.includes("## Locale Rule") || !text.includes("The skill's Locale Contract has already selected one runtime locale")) {
    errors.push(`Missing Locale Rule in ${file}`);
  }
}

for (const file of [
  "core/workflows/audit-ui.zh.md",
  "core/workflows/fix-ui.zh.md",
  "core/workflows/review-ui.zh.md",
  "core/workflows/polish-ui.zh.md",
  "core/workflows/build-ui.zh.md",
  "skills/webcraft-ui/references/workflows/audit-ui.zh.md",
  "skills/webcraft-ui/references/workflows/fix-ui.zh.md",
  "skills/webcraft-ui/references/workflows/review-ui.zh.md",
  "skills/webcraft-ui/references/workflows/polish-ui.zh.md",
  "skills/webcraft-ui/references/workflows/build-ui.zh.md"
]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  if (!text.includes("## 语言规则") || !text.includes("Locale Contract 已经选择了一个运行语言")) {
    errors.push(`Missing 语言规则 in ${file}`);
  }
}

for (const file of [
  "commands/ui-audit.md",
  "commands/ui-fix.md",
  "commands/ui-review.md",
  "commands/ui-polish.md",
  "commands/ui-build.md",
  "commands/ui-preset.md"
]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  const text = readFileSync(path, "utf8");
  if (!text.includes("Locale Contract") || !text.includes("choose exactly one locale")) {
    errors.push(`Missing locale contract instruction in ${file}`);
  }
}

for (const file of [
  "examples/project-config/config.json",
  "package.json",
  "core/modes/audit-modes.json",
  "skills/webcraft-ui/references/modes/audit-modes.json"
]) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  try {
    JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

function validateAuditModes(file) {
  const path = join(root, file);
  if (!existsSync(path)) {
    errors.push(`Missing ${file}`);
    return;
  }

  let modes;
  try {
    modes = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${file}: ${error.message}`);
    return;
  }

  const requiredModes = ["quick", "standard", "deep"];
  const requiredFields = [
    "label",
    "intent",
    "maxFindings",
    "severity",
    "includeMinor",
    "score",
    "fullCategoryReport",
    "contentStressTest",
    "browserRequiredWhenRunnable",
    "requiredViewports",
    "optionalViewports",
    "checks",
    "output"
  ];

  for (const mode of requiredModes) {
    if (!modes[mode]) {
      errors.push(`Missing ${mode} mode in ${file}`);
      continue;
    }

    for (const field of requiredFields) {
      if (!(field in modes[mode])) {
        errors.push(`Missing ${mode}.${field} in ${file}`);
      }
    }

    if (!Array.isArray(modes[mode].severity) || modes[mode].severity.length === 0) {
      errors.push(`${mode}.severity must be a non-empty array in ${file}`);
    }

    if (!Array.isArray(modes[mode].requiredViewports)) {
      errors.push(`${mode}.requiredViewports must be an array in ${file}`);
    }

    if (!Number.isInteger(modes[mode].maxFindings) || modes[mode].maxFindings < 1) {
      errors.push(`${mode}.maxFindings must be a positive integer in ${file}`);
    }
  }

  if (
    modes.quick &&
    modes.standard &&
    modes.deep &&
    !(modes.quick.maxFindings < modes.standard.maxFindings && modes.standard.maxFindings <= modes.deep.maxFindings)
  ) {
    errors.push(`Audit mode maxFindings should increase from quick to standard to deep in ${file}`);
  }

  if (modes.quick?.includeMinor !== false) {
    errors.push(`quick.includeMinor must be false in ${file}`);
  }

  if (modes.deep?.score !== true) {
    errors.push(`deep.score must be true in ${file}`);
  }
}

validateAuditModes("core/modes/audit-modes.json");
validateAuditModes("skills/webcraft-ui/references/modes/audit-modes.json");

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(warnings.join("\n"));
}

console.log("webcraft-skills validation ok");
