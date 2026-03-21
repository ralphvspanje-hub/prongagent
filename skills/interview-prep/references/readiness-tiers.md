# Interview Readiness Tiers

Objective assessment of interview preparedness. Calculated from Skill Requirements gaps, prep checklist completion, and mock performance. Displayed in the daily message during interview mode.

**Important:** This is *interview readiness* (structural prep completeness), not *mock session performance* (which uses its own Ready/Almost There/Needs Work scale in `skills/mock-interview/references/session-summary.md`). They measure different things and may differ — a user can perform well in a mock but still be structurally unprepared (e.g., no company research done).

## Tier Definitions

### Ready
The user has covered their bases: skill gaps are closed or small, they have enough polished STAR stories to draw from, they've done mock interviews and performed well, and they know the company. The agent should feel confident they'd hold their own in the interview.

**Daily message tone:** Confidence-building. "You're ready. Trust your prep."

### Almost There
Most prep is solid but 1-2 specific gaps remain — a missing question type in the win log, a mock that revealed a weak area, incomplete company research. The gaps are addressable in the remaining time.

**Daily message tone:** Focused. "Almost there — [specific gap] is the last piece."

### Partially Ready
Multiple gaps exist: several skills need work, few wins polished, no mocks completed, or company research barely started. There's enough time to make meaningful progress but the user needs to engage consistently.

**Daily message tone:** Urgent but constructive. "Real gaps to close — here's what to prioritize today."

### Unprepared
The interview is close and readiness is low — large skill gaps remain with little time, no mocks done, or the user hasn't been engaging with prep tasks.

**Daily message tone:** Honest. "I want to be straight with you — we have significant gaps. Here's the highest-impact thing you can do today."

**Daily message tone:** Honest. "I want to be straight with you — we have significant gaps. Here's the highest-impact thing you can do today."

## What to read

To assess the tier, read: `memory/interview-context.md` (Skill Requirements gaps + Prep Checklist), `memory/win-log/wins.md` (count + coverage), and mock results from `memory/mistake-journal.md`. Apply the tier that best fits the overall picture — start from Ready and work down.

## Timeline-Relative Framing

Readiness is relative to how much time remains. Frame assessments accordingly:

| Days remaining | Framing |
|---------------|---------|
| 14+ | "You have time to close these gaps. Here's the plan." |
| 7-13 | "This week is key. Focus on [top 2 gaps]." |
| 3-6 | "Final push. Prioritize [highest-impact gap] — the rest is good enough." |
| 1-2 | "Trust your prep. Review only. No new material." |

## When to Warn

Trigger an explicit warning if:
- Readiness is "Unprepared" with < 7 days remaining
- Readiness dropped since last assessment (e.g., missed 3 days of tasks)
- A critical skill (must-have in JD) has Gap = "large" with < 5 days remaining

Warning format:
> "Heads up: [specific concern]. Here's what I recommend: [1-2 highest-impact actions]."

Don't catastrophize. Be direct about the gap and prescriptive about the fix.

## Gotchas

- **Early assessments will almost always say "Partially Ready" or worse.** That's expected — the user just started prepping. Frame the tier as a starting point, not a verdict: "Starting at Partially Ready — that's normal at this stage. Here's the path to Almost There by [date]."
- **Don't fight the user's self-assessment.** If the user feels ready but the tier says otherwise (or vice versa), acknowledge their perspective first. The tier is a structural checklist — the user may have knowledge or confidence that isn't captured in the data. Say "The checklist shows gaps in [X], but you know your strengths better than I do. Want to focus elsewhere?"
- **Tier calculation is a guide, not a formula.** The criteria above are guidelines for the agent's judgment, not a rigid algorithm. A user with 4 wins instead of 5 but excellent mock performance is probably "Almost There", not "Partially Ready."
- **Don't display the tier name if it would be demoralizing without context.** "Unprepared" with 14 days remaining is fine — there's time. "Unprepared" the day before is just cruel. In the final 1-2 days, drop the tier label and focus on confidence: "Focus on what you know."