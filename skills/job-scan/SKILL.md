---
name: prongagent-job-scan
description: "Surface job opportunities from external tracker and sync status updates"
tags: [career, jobs, tracking]
user-invocable: true
metadata:
  openclaw:
    emoji: "🔍"

---

# Job Scan

## Configuration

This skill uses `config.json` for user preferences. If it doesn't exist, use the defaults below and offer to save the user's preferences.

| Field | Default | What it controls |
|-------|---------|-----------------|
| `job_tracker_path` | `"(user-configured path)"` | Path to the external job tracker file |
| `min_fit_score` | `7` | Minimum fit score to surface in daily scans |
| `max_jobs_per_daily` | `3` | Maximum jobs to show in the daily message block |
| `show_expired` | `false` | Whether to show recently expired/closed jobs |
| `nag_unapplied_days` | `5` | Days before nudging about high-fit unapplied jobs |

**Note:** `job_tracker_path` is installation-specific — if missing, ask the user for their path before proceeding.

## Skill files

| File | When to use |
|------|------------|
| `scripts/parse-tracker.ts` | At start of daily_scan or interactive mode — run this first to get structured job data |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |

### scripts/parse-tracker.ts

**What it does:** Reads the external job_tracker.md, extracts Active Jobs into structured output.

**Usage:** `bun run skills/job-scan/scripts/parse-tracker.ts <path-to-job_tracker.md> [last-scan-date]`

- `path-to-job_tracker.md` — the path from `config.json` → `job_tracker_path`
- `last-scan-date` — YYYY-MM-DD from `memory/job-scan-state.md` → Last Scan → Date (omit for first scan)

**Output:**
```
active_count: 5
new_count: 2
urgent_count: 1

## New Jobs (since 2026-03-15)
| Title | Company | Added | Deadline | Fit | Status |
...

## Urgent Jobs (deadline within 3 days)
| Title | Company | Deadline | Days left | Fit | Status |
...
```

**Why scripted:** The job tracker is 170+ lines of markdown with variable formatting. Parsing it, comparing dates, and filtering by recency/urgency are deterministic operations that should not be done by LLM reasoning.

---

## When to trigger

Two activation paths:

**1. DAILY SCAN** — runs automatically as part of the daily message sequence, before daily-plan composes the message. Only runs if `job_scan_active: true` in `config/settings.md`.

**2. USER REQUEST** — user asks "any new jobs?", "what's open?", "job updates?", "show me jobs", or similar.

Do NOT trigger if:
- `job_scan_active` is `false` or missing in `config/settings.md`
- The job tracker file doesn't exist at the configured path (log an observation, don't error to the user)

## What to read

| File | What to look for |
|------|-----------------|
| External job tracker (path from `config.json` → `job_tracker_path`) | Active jobs, expired/closed jobs, fit scores, statuses, dates |
| `memory/job-scan-state.md` | Last scan date, notified job IDs, user surfacing preferences, nag tracking |
| `memory/user-profile.md` | Dream career, target role, constraints (for contextualizing fit commentary) |
| `memory/resume-context.md` | Experience, skills (for contextualizing fit score commentary) |
| `memory/user-model.md` | Motivation Drivers (for framing job suggestions), Avoidance Patterns (sensitivity around career direction), Growth Edges (emerging interests that might shift job preferences) |
| `memory/interview-context.md` | Check if already prepping for an interview at a listed company |
| `skills/job-scan/config.json` | Job tracker path, fit score threshold, surfacing preferences |
| Path from `config/settings.md` → `job_tracker_path` | Every scan — the default path is `files/job-tracker/job_tracker.md` |
| `config/settings.md` | `job_scan_active`, verbosity |

## What to write

| File | When |
|------|------|
| External job tracker file | When user updates a job status — only update `Status`, `Applied`, `Next step`, and `Notes` fields. Can add `## ProngAgent Notes` subsection at the bottom of individual entries. |
| `memory/job-scan-state.md` | After every scan: update last scan date, add newly notified job IDs, update nag tracking |
| `memory/user-model.md` | Append observation during interactive mode: Motivation Drivers (which jobs excite them vs. get skipped), Avoidance Patterns (types of roles they consistently pass on), Growth Edges (emerging interest shifts based on which jobs they engage with) |
| `session-log.md` (this skill directory) | After execution if anything notable happened |

## Session log

See `AGENTS.md` for session log protocol. Skill-specific logging:
- Which jobs were surfaced, which the user acted on, which were ignored
- "User consistently skips grad programs" → stop surfacing them (feed into config)
- Job types or companies that consistently get engagement vs. dismissal
## Two-way sync rules

The external job tracker is shared between the dispatch agent (writes new jobs, updates closures) and ProngAgent (writes user status updates). These rules prevent conflicts:

| Rule | Detail |
|------|--------|
| **NEVER delete or restructure** | Do not delete, move, reorder, or restructure any entry the dispatch agent created |
| **Only update specific fields** | `Status`, `Applied` (date), `Next step`, `Notes` — nothing else |
| **ProngAgent Notes subsection** | If adding context to an entry, append a `## ProngAgent Notes` subsection at the bottom of that entry |
| **Don't touch dispatch fields** | Title, company, fit score, date posted, applicant count, closing date — owned by dispatch agent |
| **Status conventions** | Use the exact status values from the Allowed statuses table below so the dispatch agent can recognize them |

**Allowed statuses** (set by user action):

| Status | When to set |
|--------|-------------|
| Applied | User confirms they submitted an application |
| Skip | User doesn't want to apply now but may reconsider later |
| Not interested | Firm no — dispatch agent can stop tracking this one |
| Waiting for response | Applied, waiting to hear back |
| Interviewing | Got a response, in the interview process |
| Offered | Received an offer |

---

## Mode: daily_scan

Passive mode that runs as part of the daily message flow. Produces a block for the daily-plan skill to embed — not a standalone message.

### Step 1: Parse the job tracker

Run `scripts/parse-tracker.ts` to get structured job data:

```bash
bun run skills/job-scan/scripts/parse-tracker.ts "<job_tracker_path>" "<last-scan-date>"
```

Use the `active_count`, `new_count`, `urgent_count` values and the New Jobs / Urgent Jobs tables from the output. Do NOT manually parse job_tracker.md — the script handles extraction and date comparison.

### Step 2: Compare against last known state

Read `memory/job-scan-state.md` for the `notified_jobs` list. Cross-reference the script's New Jobs output against notified jobs to identify truly unseen entries. Also identify:

- **Expired since last scan** — entries that moved to an Expired/Closed section since the last scan (not covered by the script — check manually)

### Step 3: Apply surfacing rules

Read user preferences from `memory/job-scan-state.md` (minimum fit score, excluded types, excluded companies). Then select what to show:

1. **New jobs** since last scan (always shown, subject to user preference filters)
2. **Urgent jobs** closing within 3 days (always shown, marked with warning — overrides preference filters)
3. **Top 3 by fit score** — shown if new + urgent together yield fewer than 3 jobs, to ensure the section has useful content. Omit if the new/urgent jobs already cover the top fits.
4. **Nag check** — any job with fit score >= nag minimum (default 8) that has been active for nag threshold days (default 5) with status still "New" or equivalent. Surface once as a gentle nudge. Track in `job-scan-state.md` to avoid repeated nagging — nag once, then stop unless the user asks.

If nothing to surface (no new, no urgent, no nags, user has seen everything), skip the job section entirely. Do not send an empty "no updates" block.

### Step 4: Format the daily message block

Produce a block that daily-plan embeds in the daily message.

**Placement:** After the task list and review question, before the closing context line. Exception: if there are urgent jobs (closing within 3 days), place the block BEFORE the task list to ensure visibility.

**Normal verbosity:**

```
🔍 Job updates:
- NEW: Business Analyst at Adyen — Fit: 7/10. Posted yesterday, 46 applicants.
- NEW: Product Analyst at Stripe — Fit: 9/10. Posted 2 days ago.
- ⚠️ CLOSING SOON: APM at Instacart — closes in 2 days. Fit: 6/10.
- 📌 Still open: Data Analyst at Booking — Fit: 8/10, posted 6 days ago. Worth a look?

Reply with a job name to get my take, update a status, or ask for help applying.
```

**Concise verbosity:**

```
🔍 Jobs: 2 new (Adyen BA 7/10, Stripe PA 9/10), 1 closing soon (Instacart APM).
```

**Detailed verbosity:** Same as normal but add 1-line dream career connection for the highest-fit new job.

### Step 5: Mention expired jobs

If any jobs moved to Expired/Closed since last scan, add a brief line:

```
(Booking grad program closed — removed from active list.)
```

One line, informational, no guilt. If multiple expired, combine: "(3 jobs closed since last scan — Booking, Uber, Deliveroo.)"

### Step 6: Update state

Write to `memory/job-scan-state.md`:
- Update `last_scan` to today's date
- Add all surfaced job identifiers to the `notified_jobs` table
- Update nag tracking (mark which jobs were nagged today)

---

## Mode: interactive

Triggered when the user asks about jobs directly.

### Step 1: Full scan

Run the same read + compare logic as daily_scan but present ALL active jobs, not just new/urgent.

### Step 2: Present ranked list

Show all active jobs ranked by fit score, grouped:

| Group | Fit score | When to show |
|-------|-----------|-------------|
| Strong matches | 8-10 | Always |
| Worth considering | 5-7 | Always |
| Long shots | 1-4 | Only if user asks ("show me everything") |

For each job show: title, company, fit score, days since posted, current status, applicant count (if available).

### Step 3: Accept user actions

The user can:

- **Ask about a specific job** ("tell me about the Adyen one") — provide a brief fit assessment using `memory/user-profile.md` + `memory/resume-context.md`. Match the user's experience against the job requirements. Note: deeper analysis (resume tailoring, cover letter help, application strategy) will be available when the `career-mentor` skill is built. For now, keep the assessment concise.

- **Update a status** ("I applied for Stripe", "skip Instacart", "not interested in the Booking one") — write the status update back to the tracker file following the two-way sync rules.

- **Set preferences** ("only show me 8+ from now on", "stop showing grad programs", "exclude McKinsey") — store in `memory/job-scan-state.md` under User Preferences.

- **Toggle the feature** ("pause job scan", "stop showing jobs") — set `job_scan_active: false` in `config/settings.md`. ("resume job scan", "turn jobs back on") — set it to `true`.

### Step 4: Write status updates to tracker

When updating the external job tracker:

1. Find the job entry in the Active Jobs section
2. Update ONLY the allowed fields: `Status`, `Applied` (date), `Next step`, `Notes`
3. If adding context, append a `## ProngAgent Notes` subsection at the bottom of that entry
4. NEVER delete, move, restructure, or modify fields the dispatch agent owns

---

## Integration with daily-plan

The job scan block is delivered as part of the daily message, not as a separate message. The sequence is:

1. Spaced repetition checks what's due (existing)
2. **Job scan runs daily_scan mode, produces a block or nothing** (this skill)
3. Daily-plan composes the daily message, embedding the job block if present

Jobs are supplementary — learning tasks are the primary content. The job block should never crowd out the task list.

## Career-mentor handoff

When the user wants deeper engagement with a specific job (fit analysis, resume tailoring, cover letter, application strategy), this is the natural handoff point to a future `skills/career-mentor/SKILL.md` skill. Until that skill exists:

- Provide a brief fit assessment (match user profile against job requirements)
- Note that the career-mentor skill will handle deeper analysis when built
- Don't try to replicate full career coaching within this skill

---

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- The job tracker file format changed and parsing failed or produced unexpected results (log the format difference and how you adapted)
- A high-fit job (8+) expired before the user saw it (log the timeline — was the scan frequency sufficient?)
- The dispatch agent overwrote a ProngAgent status update (log both values if detectable)
- User preferences filtered out a job they later asked about (the filter was too aggressive)
- Nag logic surfaced a job the user clearly wasn't interested in (nag threshold needs adjustment)

## Edge cases
- **Job tracker file doesn't exist or is empty:** Log an observation. In daily_scan mode, skip the job block silently. In interactive mode, tell the user: "I don't see your job tracker file at [path]. Check the path in config.json or ask me to update it."
- **Job tracker file format is unexpected:** The dispatch agent may change its format. Parse flexibly — look for common patterns (headings, tables, bullet lists). If truly unparseable, log an observation and tell the user.
- **job_scan_active is false:** Skip entirely in daily_scan mode. In interactive mode, tell the user the scan is paused and offer to re-enable it: "Job scan is currently paused. Want me to turn it back on?"
- **User is already in interview_prep for a listed company:** If `memory/interview-context.md` shows active prep for a company that appears in the tracker, flag it: "You're already prepping for [company] — this listing matches your active interview prep." Don't double-surface.
- **Dispatch agent and ProngAgent write conflict:** If the agent detects that a field it previously wrote has been overwritten (status reverted, notes removed), log an observation but don't re-write. Mention to the user if relevant during interactive mode.
- **User wants to toggle the feature:** Accept "pause job scan", "stop showing jobs", "disable job updates" — set `job_scan_active: false` in `config/settings.md`. Accept "resume job scan", "turn jobs back on" to re-enable.
- **Too many new jobs at once (10+):** Don't dump them all. Show top 5 by fit score, mention the count: "10 new jobs since last scan — here are the top 5 by fit. Say 'show all' for the full list."
- **User asks about a job not in the tracker:** They may have found it themselves. Help them evaluate it (brief fit assessment using their profile) and offer to add it to the tracker manually with a `## ProngAgent Notes` entry.
- **User sets preferences that filter everything:** If preferences would result in zero jobs being surfaced from the current active list, warn them: "With those filters, none of the current [X] active jobs would show up. Want to keep these settings anyway?"

---

## Hooks
While this skill is active and writing to the external job tracker, enforce these constraints:
| Hook | What it prevents | Why |
|------|-----------------|-----|
| Field-level write lock | Modifying any field other than `Status`, `Applied`, `Next step`, and `Notes` in existing tracker entries | The external tracker is shared with the dispatch agent — touching dispatch-owned fields breaks both systems |
| No deletions | Deleting any entry from the tracker, even if it looks expired or duplicate | Deletions are irreversible and may remove data the dispatch agent or user still needs |
| No restructuring | Changing the file format, reordering sections, or moving entries between sections | Format changes break the dispatch agent's parser |
| Corruption abort | If the tracker file has unexpected format or appears corrupted, abort the write and notify the user instead of attempting a fix | A bad write to a shared file is worse than no write — let the user investigate |
