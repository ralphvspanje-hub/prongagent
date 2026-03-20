#!/usr/bin/env bun
/**
 * srs-calculator.ts — Calculate which SRS concepts are due/overdue today
 *
 * Usage: bun run skills/spaced-repetition/scripts/srs-calculator.ts <path-to-spaced-repetition.md> [today-date]
 *
 * Output (structured text):
 *   due_count: N
 *   overdue_count: N
 *
 *   ## Due Concepts (priority order)
 *   | Concept | Pillar | Next review | Days overdue | Consecutive correct | Status |
 *   ...
 */

import { readFileSync } from "fs";

const srsPath = process.argv[2];
const todayStr = process.argv[3] || new Date().toISOString().slice(0, 10);

if (!srsPath) {
  console.error("Usage: bun run srs-calculator.ts <path-to-spaced-repetition.md> [today-date]");
  process.exit(1);
}

const content = readFileSync(srsPath, "utf-8");
const today = new Date(todayStr + "T00:00:00");

interface SrsItem {
  concept: string;
  pillar: string;
  lastReviewed: string;
  nextReview: string;
  consecutiveCorrect: number;
  status: string;
  daysOverdue: number;
}

function parseActiveTable(md: string): SrsItem[] {
  const items: SrsItem[] = [];

  // Find the Active Review Items table (first table in the file, or under "Active" heading)
  const lines = md.split("\n");
  let inTable = false;
  let headerParsed = false;
  let separatorSkipped = false;

  // Column indices
  let cols = { concept: 0, pillar: 1, lastReviewed: 2, nextReview: 3, consecutiveCorrect: 4, status: 5 };

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip retired/mastered section
    if (/^##\s+Retired/i.test(trimmed) || /^##\s+Review Queue/i.test(trimmed)) {
      break;
    }

    if (!trimmed.startsWith("|")) {
      if (inTable && headerParsed && separatorSkipped) break; // end of table
      inTable = false;
      headerParsed = false;
      separatorSkipped = false;
      continue;
    }

    const cells = trimmed
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

    if (!headerParsed) {
      // Parse header
      const lower = cells.map((c) => c.toLowerCase());
      const find = (keywords: string[]) =>
        lower.findIndex((h) => keywords.some((k) => h.includes(k)));

      cols.concept = Math.max(0, find(["concept"]));
      cols.pillar = Math.max(1, find(["pillar"]));
      cols.lastReviewed = Math.max(2, find(["last reviewed", "last review"]));
      cols.nextReview = Math.max(3, find(["next review"]));
      cols.consecutiveCorrect = Math.max(4, find(["consecutive", "correct"]));
      cols.status = Math.max(5, find(["status"]));

      headerParsed = true;
      inTable = true;
      continue;
    }

    if (!separatorSkipped) {
      separatorSkipped = true;
      continue;
    }

    // Data row
    if (cells.length < 3) continue;
    const get = (idx: number) => (idx < cells.length ? cells[idx] : "");
    const concept = get(cols.concept);
    if (!concept) continue;

    const nextReview = get(cols.nextReview);
    if (!nextReview || !/\d{4}-\d{2}-\d{2}/.test(nextReview)) continue;

    const nextDate = new Date(nextReview + "T00:00:00");
    const daysOverdue = Math.round((today.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));

    items.push({
      concept,
      pillar: get(cols.pillar),
      lastReviewed: get(cols.lastReviewed),
      nextReview,
      consecutiveCorrect: parseInt(get(cols.consecutiveCorrect)) || 0,
      status: get(cols.status),
      daysOverdue,
    });
  }

  return items;
}

const allItems = parseActiveTable(content);

// Due = next review date <= today (daysOverdue >= 0)
const dueItems = allItems
  .filter((item) => item.daysOverdue >= 0)
  .sort((a, b) => {
    // Overdue first (higher daysOverdue), then by fewer consecutive correct
    if (b.daysOverdue !== a.daysOverdue) return b.daysOverdue - a.daysOverdue;
    return a.consecutiveCorrect - b.consecutiveCorrect;
  });

const overdueItems = dueItems.filter((item) => item.daysOverdue > 0);

console.log(`due_count: ${dueItems.length}`);
console.log(`overdue_count: ${overdueItems.length}`);

if (dueItems.length > 0) {
  console.log(`\n## Due Concepts (priority order)\n`);
  console.log("| Concept | Pillar | Next review | Days overdue | Consecutive correct | Status |");
  console.log("| ------- | ------ | ----------- | ------------ | ------------------- | ------ |");
  for (const item of dueItems) {
    console.log(
      `| ${item.concept} | ${item.pillar} | ${item.nextReview} | ${item.daysOverdue} | ${item.consecutiveCorrect} | ${item.status} |`
    );
  }
} else {
  console.log("\nNo concepts due for review today.");
}
