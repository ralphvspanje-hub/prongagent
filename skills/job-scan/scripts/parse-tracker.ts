#!/usr/bin/env bun
/**
 * parse-tracker.ts — Extract active jobs from job_tracker.md
 *
 * Usage: bun run skills/job-scan/scripts/parse-tracker.ts <path-to-job_tracker.md> [last-scan-date]
 *
 * Output (structured text):
 *   active_count: N
 *   new_count: N
 *   urgent_count: N
 *
 *   ## New Jobs (since YYYY-MM-DD)
 *   | Title | Company | Added | Deadline | Fit | Status |
 *   ...
 *
 *   ## Urgent Jobs (deadline within 3 days)
 *   | Title | Company | Deadline | Days left | Fit | Status |
 *   ...
 */

import { readFileSync } from "fs";

const trackerPath = process.argv[2];
const lastScanDate = process.argv[3] || "1970-01-01";

if (!trackerPath) {
  console.error("Usage: bun run parse-tracker.ts <path-to-job_tracker.md> [last-scan-date]");
  process.exit(1);
}

const content = readFileSync(trackerPath, "utf-8");
const today = new Date();
today.setHours(0, 0, 0, 0);
const lastScan = new Date(lastScanDate + "T00:00:00");

interface Job {
  title: string;
  company: string;
  added: string;
  deadline: string;
  fit: string;
  status: string;
  raw: string;
}

// Find the Active Jobs section and parse its table
function parseActiveJobs(md: string): Job[] {
  const jobs: Job[] = [];

  // Look for an "Active" section (## Active Jobs, ## Active, etc.)
  const activeMatch = md.match(/^##\s+Active\b[^\n]*/m);
  if (!activeMatch) return jobs;

  const startIdx = activeMatch.index! + activeMatch[0].length;
  // End at next ## heading or end of file
  const restAfterHeading = md.slice(startIdx);
  const nextHeading = restAfterHeading.search(/^##\s/m);
  const section = nextHeading === -1 ? restAfterHeading : restAfterHeading.slice(0, nextHeading);

  // Find table rows (skip header and separator)
  const lines = section.split("\n").filter((l) => l.trim().startsWith("|"));
  if (lines.length < 2) return jobs;

  // Parse header to find column indices
  const headers = lines[0]
    .split("|")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);

  const colIdx = (name: string) => {
    const variants: Record<string, string[]> = {
      title: ["title", "role", "position", "job"],
      company: ["company", "org", "organization"],
      added: ["added", "date added", "created", "date"],
      deadline: ["deadline", "due", "close date", "closing"],
      fit: ["fit", "fit score", "score", "match"],
      status: ["status", "state"],
    };
    const keys = variants[name] || [name];
    return headers.findIndex((h) => keys.some((k) => h.includes(k)));
  };

  const ti = colIdx("title");
  const ci = colIdx("company");
  const ai = colIdx("added");
  const di = colIdx("deadline");
  const fi = colIdx("fit");
  const si = colIdx("status");

  // Skip header (0) and separator (1)
  for (let i = 2; i < lines.length; i++) {
    const cols = lines[i]
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length < 2) continue;

    const get = (idx: number) => (idx >= 0 && idx < cols.length ? cols[idx] : "");

    jobs.push({
      title: get(ti),
      company: get(ci),
      added: get(ai),
      deadline: get(di),
      fit: get(fi),
      status: get(si),
      raw: lines[i],
    });
  }

  return jobs;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

const activeJobs = parseActiveJobs(content);

// New jobs: added after last scan date
const newJobs = activeJobs.filter((j) => {
  if (!j.added) return false;
  const addedDate = new Date(j.added + "T00:00:00");
  return addedDate > lastScan;
});

// Urgent jobs: deadline within 3 days
const urgentJobs = activeJobs.filter((j) => {
  if (!j.deadline) return false;
  const deadlineDate = new Date(j.deadline + "T00:00:00");
  const daysLeft = daysBetween(today, deadlineDate);
  return daysLeft >= 0 && daysLeft <= 3;
});

// Output
console.log(`active_count: ${activeJobs.length}`);
console.log(`new_count: ${newJobs.length}`);
console.log(`urgent_count: ${urgentJobs.length}`);

if (newJobs.length > 0) {
  console.log(`\n## New Jobs (since ${lastScanDate})\n`);
  console.log("| Title | Company | Added | Deadline | Fit | Status |");
  console.log("| ----- | ------- | ----- | -------- | --- | ------ |");
  for (const j of newJobs) {
    console.log(`| ${j.title} | ${j.company} | ${j.added} | ${j.deadline} | ${j.fit} | ${j.status} |`);
  }
}

if (urgentJobs.length > 0) {
  console.log(`\n## Urgent Jobs (deadline within 3 days)\n`);
  console.log("| Title | Company | Deadline | Days left | Fit | Status |");
  console.log("| ----- | ------- | -------- | --------- | --- | ------ |");
  for (const j of urgentJobs) {
    const deadlineDate = new Date(j.deadline + "T00:00:00");
    const daysLeft = daysBetween(today, deadlineDate);
    console.log(`| ${j.title} | ${j.company} | ${j.deadline} | ${daysLeft} | ${j.fit} | ${j.status} |`);
  }
}
