#!/usr/bin/env bun
/**
 * task-selector.ts — Calculate pillar distribution gaps for task generation
 *
 * Usage: bun run skills/daily-plan/scripts/task-selector.ts <path-to-current-plan.md> <path-to-week-file.md>
 *
 * Output (structured text):
 *   total_tasks_this_week: N
 *
 *   ## Pillar Distribution
 *   | Pillar | Target weight | Actual count | Actual % | Gap | Needs tasks |
 *   ...
 *
 *   ## Recommendation
 *   Prioritize: Pillar1, Pillar2
 */

import { readFileSync } from "fs";

const planPath = process.argv[2];
const weekPath = process.argv[3];

if (!planPath || !weekPath) {
  console.error("Usage: bun run task-selector.ts <path-to-current-plan.md> <path-to-week-file.md>");
  process.exit(1);
}

const planContent = readFileSync(planPath, "utf-8");

let weekContent: string;
try {
  weekContent = readFileSync(weekPath, "utf-8");
} catch {
  weekContent = "";
}

interface PillarWeight {
  name: string;
  level: number;
  weight: number; // as a percentage 0-100
}

interface PillarCount {
  name: string;
  count: number;
}

function parsePillarWeights(md: string): PillarWeight[] {
  const pillars: PillarWeight[] = [];
  const lines = md.split("\n");

  // Find the Pillars table
  let inTable = false;
  let headerFound = false;
  let separatorSkipped = false;
  let nameIdx = 0;
  let levelIdx = 1;
  let weightIdx = 3;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ") && inTable) break;

    if (!trimmed.startsWith("|")) {
      if (inTable && headerFound && separatorSkipped && pillars.length > 0) break;
      continue;
    }

    const cells = trimmed
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

    if (!headerFound) {
      const lower = cells.map((c) => c.toLowerCase());
      if (!lower.some((h) => h.includes("pillar"))) continue;

      nameIdx = lower.findIndex((h) => h.includes("pillar"));
      levelIdx = lower.findIndex((h) => h.includes("level"));
      weightIdx = lower.findIndex((h) => h.includes("weight"));
      headerFound = true;
      inTable = true;
      continue;
    }

    if (!separatorSkipped) {
      separatorSkipped = true;
      continue;
    }

    if (cells.length < 2) continue;
    const name = cells[nameIdx] || "";
    if (!name) continue;

    const weightStr = (cells[weightIdx] || "0").replace("%", "").trim();
    pillars.push({
      name,
      level: parseInt(cells[levelIdx] || "1") || 1,
      weight: parseFloat(weightStr) || 0,
    });
  }

  return pillars;
}

function countTasksByPillar(md: string, pillarNames: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  pillarNames.forEach((name) => counts.set(name, 0));

  if (!md) return counts;

  // Tasks in week files are typically in sections per day or as a table
  // They reference pillars by name. Count occurrences of each pillar name.
  const lowerMd = md.toLowerCase();

  for (const name of pillarNames) {
    const lowerName = name.toLowerCase();
    // Count how many times this pillar appears in task rows or bullet points
    // Match table rows or bullet lines containing the pillar name
    const lines = md.split("\n");
    let count = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      // Skip headings, separators, empty lines
      if (trimmed.startsWith("#") || trimmed.startsWith("| -") || !trimmed) continue;
      // Count if this line is a task row (table or bullet) mentioning this pillar
      if (
        (trimmed.startsWith("|") || trimmed.startsWith("-") || /^\d+\./.test(trimmed)) &&
        line.toLowerCase().includes(lowerName)
      ) {
        count++;
      }
    }
    counts.set(name, count);
  }

  return counts;
}

const pillars = parsePillarWeights(planContent);
if (pillars.length === 0) {
  console.log("No pillars found in current-plan.md");
  process.exit(0);
}

const taskCounts = countTasksByPillar(weekContent, pillars.map((p) => p.name));
const totalTasks = Array.from(taskCounts.values()).reduce((a, b) => a + b, 0);

console.log(`total_tasks_this_week: ${totalTasks}`);
console.log(`\n## Pillar Distribution\n`);
console.log("| Pillar | Target weight | Actual count | Actual % | Gap | Needs tasks |");
console.log("| ------ | ------------- | ------------ | -------- | --- | ----------- |");

interface PillarGap {
  name: string;
  gap: number;
}

const gaps: PillarGap[] = [];

for (const pillar of pillars) {
  const count = taskCounts.get(pillar.name) || 0;
  const actualPct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
  const gap = Math.round(pillar.weight - actualPct);
  const needsTasks = gap > 0 ? "yes" : "no";

  gaps.push({ name: pillar.name, gap });

  console.log(
    `| ${pillar.name} | ${pillar.weight}% | ${count} | ${actualPct}% | ${gap > 0 ? "+" : ""}${gap}% | ${needsTasks} |`
  );
}

// Recommendation
const underRepresented = gaps
  .filter((g) => g.gap > 0)
  .sort((a, b) => b.gap - a.gap)
  .map((g) => g.name);

if (underRepresented.length > 0) {
  console.log(`\n## Recommendation\n`);
  console.log(`Prioritize: ${underRepresented.join(", ")}`);
} else {
  console.log(`\n## Recommendation\n`);
  console.log("Pillar distribution is balanced. No specific priority needed.");
}
