# Tracker Format Spec

The job tracker lives at `files/job-tracker/job_tracker.md`. This document defines the exact format you must follow when writing entries.

## File structure

```markdown
# Job Tracker

> Auto-updated by dispatch agent (daily).
> Last updated: YYYY-MM-DD

---

## How This Works
[keep existing content unchanged]

---

## Active Jobs — Ranked by Fit

### [rank]. [Role Title] — [Company] ([Tier])
- **Location:** [City, Remote/Hybrid/Office]
- **Posted:** [Date or "~Date" if approximate] [FRESH if <48h old]
- **Status:** [Open / Closing soon / High competition]
- **Strategy Fit:** [rating] — [1-line explanation]
- **Resume Fit:** [rating] — [1-line explanation]
- **Overall Score:** [X/10]
- **Applied:** [Not yet / Yes (date) / date]
- **Next step:** [Specific action]
- **Link:** [Direct application URL]

---

## Watchlist — Expected Openings
[table format — see existing tracker for reference]

---

## Expired / Closed
[table format — date closed, company, role, notes]

---

## Application Log
[table format — date, company, role, status, notes]
```

## Field ownership

| Field | Owned by | Can dispatch write? | Can ProngAgent write? |
|-------|----------|--------------------|-----------------------|
| Role title, Company, Tier | Dispatch | Yes | No |
| Location | Dispatch | Yes | No |
| Posted date | Dispatch | Yes | No |
| Strategy Fit (rating + text) | Dispatch | Yes | No |
| Resume Fit (rating + text) | Dispatch | Yes | No |
| Overall Score | Dispatch | Yes | No |
| Link | Dispatch | Yes | No |
| Status (Open/Closed) | Dispatch | Yes (for Open/Closed) | Yes (for Applied/Skip/etc.) |
| Applied | ProngAgent | No | Yes |
| Next step | Both | Yes (initial) | Yes (updates) |
| Notes | ProngAgent | No | Yes |

## Scoring rules

**Overall Score = Strategy Fit (60%) + Resume Fit (40%)** on a 1-10 scale.

- Strategy Fit: How well does this role advance the career trajectory? Use the role priority ranking from `dispatch/scanning-protocol.md`.
- Resume Fit: How well does the user's actual background match the job requirements? Be honest about filters and experience gaps.
- Tier discount: Tier 2 companies get a slight discount (max -1.5 points) reflecting lower stamp value.

## Ranking

Active jobs are ranked by Overall Score, highest first. Re-rank when adding new entries.

## When moving to Expired/Closed

1. Add a row to the Expired/Closed table with: date closed, company, role, brief notes
2. Remove the full entry from Active Jobs
3. Do NOT delete — the history matters

## When adding new entries

1. Check the entire tracker (Active + Expired + Application Log) for duplicates
2. Add the entry in the correct rank position
3. Renumber all entries below
4. If the role is from a company not on any tier list, mark it as "(New — pending tier assignment)"
