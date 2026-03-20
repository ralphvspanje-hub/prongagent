#!/usr/bin/env bun
/**
 * streak-counter.ts — Calculate updated streak from progress.md
 *
 * Usage: bun run skills/check-in/scripts/streak-counter.ts <path-to-progress.md> <tasks-completed-today>
 *
 * Output (structured text):
 *   current_streak: N
 *   previous_streak: N
 *   longest_streak: N
 *   is_new_record: true/false
 *   last_active: YYYY-MM-DD
 *   tasks_completed_today: N
 *   tasks_completed_all_time: N
 */

import { readFileSync } from "fs";

const progressPath = process.argv[2];
const tasksToday = parseInt(process.argv[3] || "0");

if (!progressPath) {
  console.error("Usage: bun run streak-counter.ts <path-to-progress.md> <tasks-completed-today>");
  process.exit(1);
}

const content = readFileSync(progressPath, "utf-8");
const today = new Date();
today.setHours(0, 0, 0, 0);
const todayStr = today.toISOString().slice(0, 10);

function extractField(text: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*(.+)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr || dateStr === "never") return null;
  const d = new Date(dateStr + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

// Parse current values from progress.md
const currentStreak = parseInt(extractField(content, "Current")) || 0;
const longestStreak = parseInt(extractField(content, "Longest")) || 0;
const lastActiveStr = extractField(content, "Last active");
const lastActive = parseDate(lastActiveStr);

const allTimeMatch = extractField(content, "All time");
const allTimeCompleted = parseInt(allTimeMatch) || 0;

// Calculate new streak
let newStreak: number;

if (tasksToday === 0) {
  // No tasks completed today — streak doesn't change (check-in with 0 tasks)
  newStreak = currentStreak;
} else if (!lastActive) {
  // First ever check-in
  newStreak = 1;
} else {
  const daysSinceLast = daysBetween(lastActive, today);

  if (daysSinceLast === 0) {
    // Same day — already checked in, keep streak
    newStreak = currentStreak;
  } else if (daysSinceLast === 1) {
    // Consecutive day — extend streak
    newStreak = currentStreak + 1;
  } else {
    // Gap > 1 day — streak resets
    newStreak = 1;
  }
}

const newLongest = Math.max(longestStreak, newStreak);
const isNewRecord = newStreak > longestStreak && newStreak > 1;
const newAllTime = allTimeCompleted + tasksToday;

console.log(`current_streak: ${newStreak}`);
console.log(`previous_streak: ${currentStreak}`);
console.log(`longest_streak: ${newLongest}`);
console.log(`is_new_record: ${isNewRecord}`);
console.log(`last_active: ${tasksToday > 0 ? todayStr : lastActiveStr || "never"}`);
console.log(`tasks_completed_today: ${tasksToday}`);
console.log(`tasks_completed_all_time: ${newAllTime}`);
