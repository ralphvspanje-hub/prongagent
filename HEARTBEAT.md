# Heartbeat

Lightweight checks only. If something needs attention, note it — don't do heavy processing here.

- [ ] Check if `memory/user-profile.md` has empty fields (onboarding incomplete?)
- [ ] Check if any SRS concepts in `memory/spaced-repetition.md` are overdue by 3+ days
- [ ] Check `memory/progress.md` — if last active date is 3+ days ago and no absence ping has been sent, flag for adaptation skill
- [ ] Check `memory/win-log/candidates.md` — if 3+ draft entries, note for next interaction
- [ ] Check `memory/agent-observations.md` — if 5+ unreviewed entries, mention to user in next interaction
- [ ] If `job_scan_active` is true in `config/settings.md`, check if last scan in `memory/job-scan-state.md` is 2+ days old (scan may have been missed)
- [ ] Check `dispatch/daily-brief.md` — if `last_run` timestamp is 2+ days old, the dispatch agent may have stopped running. Flag for attention.
