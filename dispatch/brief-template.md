# Daily Brief Template

The dispatch agent overwrites `dispatch/daily-brief.md` after every run using this format. This file is what gets delivered to the user via their messaging channel.

---

```markdown
# Daily Job Brief

**last_run:** YYYY-MM-DDTHH:MM (ISO format, local timezone)
**jobs_scanned:** [number of career pages + job board searches completed]
**tracker_updated:** [yes/no — did anything change in job_tracker.md?]

## New (posted <48h)

- **[Role Title]** at **[Company]** ([Tier]) — Fit: [X/10]
  [1-line why it fits the user's profile]
  [Link]

[If none: "No new postings in the last 48 hours."]

## Act Now (high-fit, not yet applied)

- **[Role Title]** at **[Company]** — posted [X days ago], [deadline info if known]
  [1-line on why the user should prioritize this]

[If none: omit this section entirely]

## Tracker Updates

- [Role] at [Company]: [what changed — closed, reposted, applicant count update, etc.]

[If none: "No changes to existing entries."]

## Discovery

- **[New Company Name]** — [what they do], [why they might fit]
  Suggested tier: [X] — [brief evaluation against criteria]
  [Career page URL if found]

[If none: omit this section entirely]

## Top 3 — Act on These

1. [Most urgent/highest-fit action item]
2. [Second priority]
3. [Third priority]
```

---

## Rules for writing the brief

- Keep it scannable. Users read this on their phone via messaging apps.
- Bold company names and role titles for easy scanning.
- Every role mentioned must have a direct link.
- The "Top 3" section is opinionated — rank by urgency AND fit combined.
- If the run found nothing new and nothing changed: write a brief that says so. Don't pad.
- The `last_run` timestamp is critical — it lets the messaging relay detect staleness.
