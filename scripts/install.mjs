#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const args = process.argv.slice(2);
const command = args[0] ?? "install";

const usage = `Usage:
  npx webcraft-skills install --agent codex
  npx webcraft-skills install --agent claude
  npx webcraft-skills install --agent all
  npx webcraft-skills install --agent codex --skill webcraft-ui
  npx webcraft-skills list

Options:
  --agent <codex|claude|all>  Target agent. Default: codex.
  --skill <name|all>          Skill to install. Default: all.
  --copy                     Copy files. This installer always copies.
  -y, --yes                  Non-interactive. This installer is non-interactive.
`;

if (command === "help" || args.includes("--help") || args.includes("-h")) {
  console.log(usage);
  process.exit(0);
}

function discoverSkills() {
  const skillsRoot = join(root, "skills");
  if (!existsSync(skillsRoot)) return [];

  return readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(skillsRoot, name, "SKILL.md")))
    .sort();
}

const availableSkills = discoverSkills();

if (command === "list") {
  if (availableSkills.length === 0) {
    console.log("No skills found.");
  } else {
    console.log(availableSkills.join("\n"));
  }
  process.exit(0);
}

if (command !== "install") {
  console.error(`Unknown command: ${command}\n\n${usage}`);
  process.exit(1);
}

function getOption(name, fallback) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

const agent = getOption("--agent", "codex").toLowerCase();
const skillOption = getOption("--skill", "all");
const targets =
  agent === "all" || agent === "*"
    ? ["codex", "claude"]
    : [agent];

const commandSource = join(root, "commands");

if (availableSkills.length === 0) {
  console.error("No installable skills found under skills/*/SKILL.md");
  process.exit(1);
}

const selectedSkills =
  skillOption === "all" || skillOption === "*"
    ? availableSkills
    : skillOption.split(",").map((name) => name.trim()).filter(Boolean);

for (const skillName of selectedSkills) {
  if (!availableSkills.includes(skillName)) {
    console.error(`Unknown skill: ${skillName}. Available skills: ${availableSkills.join(", ")}`);
    process.exit(1);
  }
}

const legacySkillNamesBySkill = {
  "webcraft-ui": ["webcraft-skills"]
};

if (!existsSync(commandSource)) {
  console.error(`Command source not found: ${commandSource}`);
  process.exit(1);
}

const agentConfig = {
  codex: {
    skillRoots: [
      join(homedir(), ".agents", "skills"),
      join(homedir(), ".codex", "skills")
    ],
    supportsCommands: false
  },
  claude: {
    skillRoots: [join(homedir(), ".claude", "skills")],
    commandRoot: join(homedir(), ".claude", "commands"),
    supportsCommands: true
  }
};

for (const target of targets) {
  const config = agentConfig[target];
  if (!config) {
    console.error(`Unsupported agent: ${target}. Use codex, claude, or all.`);
    process.exit(1);
  }

  for (const skillName of selectedSkills) {
    const skillSource = join(root, "skills", skillName);
    const skillTargets = config.skillRoots.map((skillRoot) => join(skillRoot, skillName));
    const legacySkillNames = legacySkillNamesBySkill[skillName] ?? [];

    for (const skillTarget of skillTargets) {
      mkdirSync(dirname(skillTarget), { recursive: true });

      for (const legacySkillName of legacySkillNames) {
        const legacySkillTarget = join(dirname(skillTarget), legacySkillName);
        if (existsSync(legacySkillTarget)) {
          rmSync(legacySkillTarget, { recursive: true, force: true });
          console.log(`Removed legacy ${legacySkillName} skill from ${legacySkillTarget}`);
        }
      }

      if (existsSync(skillTarget)) {
        rmSync(skillTarget, { recursive: true, force: true });
      }

      cpSync(skillSource, skillTarget, { recursive: true });
      console.log(`Installed ${skillName} skill to ${skillTarget}`);
    }
  }

  if (config.supportsCommands) {
    mkdirSync(config.commandRoot, { recursive: true });
    for (const entry of readdirSync(commandSource, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
      cpSync(join(commandSource, entry.name), join(config.commandRoot, entry.name));
    }
  }

  if (config.supportsCommands) {
    console.log(`Installed Claude Code slash command prompts to ${config.commandRoot}`);
  }
}

console.log("\nTry:");
console.log("  Use webcraft-ui to audit the current website.");
console.log("  Use webcraft-ui to fix Critical and Major issues from the last audit.");
console.log("\nCodex: run /skills or type $ to mention the webcraft-ui skill.");
console.log("Claude Code: slash command prompts are installed when using --agent claude or --agent all.");
