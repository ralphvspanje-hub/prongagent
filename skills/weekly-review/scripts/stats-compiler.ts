#!/usr/bin/env bun
/**
 * stats-compiler.ts — Compile weekly statistics from multiple memory files
 *
 * Usage: bun run skills/weekly-review/scripts/stats-compiler.ts <progress.md> <history.md> <week-file.md>
 *
 * Output (structured text):
 *   ## Weekly Stats
 *   completion_rate: N%
 *   tasks_completed: N
 *   tasks_total: N
 *   current_streak: N
 *   longest_streak: N
 *
 *   ## Pillar Breakdown
 *   | Pillar | Tasks completed | % of total |
 *   ...
 *
 *   ## Teach-Back Results
 *   | Concept | Result |
 *   ...
 */

import { readFileSync } from "fs";

const progressPath = process.argv[2];
const historyPath = process.argv[3];
const weekPath = process.argv[4];

if (!progressPath || !historyPath || !weekPath) {
  console.error("Usage: bun run stats-compiler.ts <progress.md> <history.md> <week-file.md>");
  process.exit(1);
}

const progressContent = readFileSync(progressPath, "utf-8");

let historyContent: string;
try {
  historyContent = readFileSync(historyPath, "utf-8");
} catch {
  historyContent = "";
}

let weekContent: string;
try {
  weekContent = readFileSync(weekPath, "utf-8");
} catch {
  weekContent = "";
}

function extractField(text: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

// --- Parse streak info from progress.md ---
const currentStreak = parseInt(extractField(progressContent, "Current")) || 0;
const longestStreak = parseInt(extractField(progressContent, "Longest")) || 0;

// --- Parse week file for task counts ---
function parseWeekTasks(md: string): { total: number; completed: number; byPillar: Map<string, number> } {
  const byPillar = new Map<string, number>();
  let total = 0;
  let completed = 0;

  if (!md) return { total, completed, byPillar };

  const lines = md.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    // Look for task lines — typically bullets or table rows with status indicators
    // Common patterns: "- [x] Task (Pillar)" or table rows with done/skipped/partial
    const checkboxMatch = trimmed.match(/^-\s*\[([ xX])\]\s*(.*)/);
    if (checkboxMatch) {
      total++;
      const isDone = checkboxMatch[1].toLowerCase() === "x";
      if (isDone) completed++;

      // Try to extract pillar from parentheses or after a pipe
      const pillarMatch = checkboxMatch[2].match(/\(([^)]+)\)\s*$/);
      if (pillarMatch && isDone) {
        const pillar = pillarMatch[1].trim();
        byPillar.set(pillar, (byPillar.get(pillar) || 0) + 1);
      }
      continue;
    }

    // Table row with status column (done/skipped/partial)
    if (trimmed.startsWith("|") && !trimmed.startsWith("| -") && !trimmed.startsWith("| =")) {
      const cells = trimmed
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length < 2) continue;

      // Check if any cell contains a status keyword
      const hasStatus = cells.some((c) => /^(done|skipped|partial|completed)$/i.test(c));
      if (!hasStatus) continue;

      total++;
      const isDone = cells.some((c) => /^(done|completed)$/i.test(c));
      if (isDone) {
        completed++;
        // Try to find pillar — typically the second or third column
        const pillarCell = cells.find(
          (c) => !/^(done|skipped|partial|completed|\d)$/i.test(c) && c.length > 1 && !c.startsWith("http")
        );
        if (pillarCell) {
          byPillar.set(pillarCell, (byPillar.get(pillarCell) || 0) + 1);
        }
      }
    }
  }

  return { total, completed, byPillar };
}

// --- Parse history.md for this week's entries ---
function parseHistoryThisWeek(md: string): { completed: number; byPillar: Map<string, number> } {
  const byPillar = new Map<string, number>();
  let completed = 0;

  if (!md) return { completed, byPillar };

  // Get current week boundaries (Monday to Sunday)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const lines = md.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.startsWith("| -") || trimmed.startsWith("| Date")) continue;

    const cells = trimmed
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 3) continue;

    // First column should be a date
    const dateStr = cells[0];
    if (!/\d{4}-\d{2}-\d{2}/.test(dateStr)) continue;

    const entryDate = new Date(dateStr + "T00:00:00");
    if (entryDate >= monday && entryDate <= today) {
      completed++;
      const pillar = cells[2] || ""; // Pillar is typically 3rd column
      if (pillar) {
        byPillar.set(pillar, (byPillar.get(pillar) || 0) + 1);
      }
    }
  }

  return { completed, byPillar };
}

// --- Parse teach-back results from progress.md ---
function parseTeachBackLog(md: string): Array<{ concept: string; result: string }> {
  const results: Array<{ concept: string; result: string }> = [];

  // Find Teach-Back Log section
  const tbMatch = md.match(/##\s+Teach-Back Log/i);
  if (!tbMatch) return results;

  const section = md.slice(tbMatch.index!);
  const nextHeading = section.slice(tbMatch[0].length).search(/^##\s/m);
  const tbSection = nextHeading === -1 ? section : section.slice(0, tbMatch[0].length + nextHeading);

  // Parse entries — could be table rows or bullet points
  const lines = tbSection.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();

    // Bullet format: "- Concept: Strong/Partial/Can't explain"
    const bulletMatch = trimmed.match(/^-\s+(.+?):\s*(Strong|Partial|Can't explain|Skipped)/i);
    if (bulletMatch) {
      results.push({ concept: bulletMatch[1].trim(), result: bulletMatch[2] });
      continue;
    }

    // Table format
    if (trimmed.startsWith("|") && !trimmed.startsWith("| -")) {
      const cells = trimmed
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length >= 2 && /Strong|Partial|Can't explain|Skipped/i.test(cells[cells.length - 1])) {
        results.push({ concept: cells[0], result: cells[cells.length - 1] });
      }
    }
  }

  return results;
}

// Compile stats from both sources
const weekTasks = parseWeekTasks(weekContent);
const historyTasks = parseHistoryThisWeek(historyContent);

// Use whichever source has more data
const tasksCompleted = Math.max(weekTasks.completed, historyTasks.completed);
const tasksTotal = Math.max(weekTasks.total, tasksCompleted);
const completionRate = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

// Merge pillar data
const pillarData = new Map<string, number>();
const mergePillars = (source: Map<string, number>) => {
  for (const [pillar, count] of source) {
    pillarData.set(pillar, Math.max(pillarData.get(pillar) || 0, count));
  }
};
mergePillars(weekTasks.byPillar);
mergePillars(historyTasks.byPillar);

const teachBack = parseTeachBackLog(progressContent);

// Output
console.log("## Weekly Stats\n");
console.log(`completion_rate: ${completionRate}%`);
console.log(`tasks_completed: ${tasksCompleted}`);
console.log(`tasks_total: ${tasksTotal}`);
console.log(`current_streak: ${currentStreak}`);
console.log(`longest_streak: ${longestStreak}`);

if (pillarData.size > 0) {
  console.log("\n## Pillar Breakdown\n");
  console.log("| Pillar | Tasks completed | % of total |");
  console.log("| ------ | --------------- | ---------- |");
  for (const [pillar, count] of pillarData) {
    const pct = tasksCompleted > 0 ? Math.round((count / tasksCompleted) * 100) : 0;
    console.log(`| ${pillar} | ${count} | ${pct}% |`);
  }
}

if (teachBack.length > 0) {
  console.log("\n## Teach-Back Results\n");
  console.log("| Concept | Result |");
  console.log("| ------- | ------ |");
  for (const tb of teachBack) {
    console.log(`| ${tb.concept} | ${tb.result} |`);
  }
} else {
  console.log("\n## Teach-Back Results\n");
  console.log("No teach-back entries found this period.");
}
