---
name: prongagent-interview-prep
description: "Job search detection and interview crash course generation"
tags: [learning, interview, career]
user-invocable: true
metadata:
  openclaw:
    emoji: "🎤"
---

# Interview Prep Skill

## Skill files

| File | When to read |
|------|-------------|
| `modes/onboarding.md` | At skill start — the 3-4 turn conversation to gather interview context (pre-check routing, company+role, timeline+format, readiness assessment, confirm+activate) |
| `modes/activation.md` | After user confirms — the 7-step activation sequence (Steps A-G: write interview-context, change plan type, generate crash course, win log activation, SRS burst, config tightening, log activation) |
| `modes/post-interview.md` | After interview date passes — check-in conversation, handle response, transition back to learning plan |
| `references/crash-course-tasks.md` | During crash course generation — task types (technical, system design, behavioral, company research, mock interviews, take-home) and countdown/progress tracking integration |
| `examples/activation-flow.md` | Reference — full activation flow example, post-interview check-in example, transition back example |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |

## When to trigger

Two entry points:

**1. DETECTED** — the adaptation skill detects interview/job search mention in conversation and surfaces the option. User confirms they want interview prep. Adaptation passes control to this skill.

**2. EXPLICIT** — user directly says "I have an interview at [company] on [date]", "help me prep for an interview", "I'm interviewing at [company]", or similar.

## What to read

Read ALL of the following before starting the interview onboarding conversation:

| File | What to look for |
|------|-----------------|
| `memory/user-profile.md` | Dream career, current skills, known gaps, experience level, time commitment — base context for assessing readiness |
| `memory/resume-context.md` | Work experience, projects, technologies — for company-specific prep and identifying transferable experience |
| `memory/current-plan.md` | Current pillars, levels, weights, plan type — you will change plan type to `interview_prep` and save the current plan for restoration |
| `memory/interview-context.md` | Check if already active (multiple interviews). Check existing data if returning to an in-progress prep. |
| `memory/win-log/wins.md` | Count polished wins — if < 5, trigger extraction mode after onboarding |
| `memory/win-log/interview-mapping.md` | Check question type coverage — flag gaps |
| `memory/progress.md` | Current pillar levels, blocks at level — assess readiness against job requirements |
| `memory/spaced-repetition.md` | Active concepts — flag relevant ones for interview burst review |
| `memory/user-model.md` | Communication Style (for coaching tone), Avoidance Patterns (topics they dodge — may need extra attention in prep), Growth Edges (confidence shifts, readiness signals) |
| `files/` (technical prep notes) | When building crash course or assessing readiness |
| `config/settings.md` | Schedule, frequencies — interview mode tightens adaptation settings |

## What to write

| File | When |
|------|------|
| `memory/interview-context.md` | After interview onboarding — all gathered context (company, role, date, format, requirements, readiness, prep status) |
| `memory/current-plan.md` | Plan type change to `interview_prep`, pillar weight shifts, compressed timeline. Save previous plan state for restoration. |
| `config/settings.md` | Tighten adaptation settings for interview mode (noted in file so adaptation skill reads them) |
| `memory/adaptation-log.md` | Log the plan type change as an adaptation entry |
| `session-log.md` (this skill directory) | After execution if anything notable happened |

## Session log

This skill maintains `session-log.md` in this directory. Read the last 5-10 entries at the start of every execution for continuity and self-improvement.

After execution, append an entry if anything notable happened. Don't log routine executions.

**What to log:**
- Company research that was useful, prep areas that mattered most
- "User valued the culture fit analysis more than technical prep"
- Timeline decisions, readiness shifts, what prep activities had the most impact

**Entry format:**
```markdown
### YYYY-MM-DD — [brief title]
- **Context:** [what triggered the skill]
- **Notable:** [what's worth remembering for next time]
- **User reaction:** [accepted / pushed back / modified / skipped]
```

**Archival:** If the log exceeds ~100 entries, summarize old entries into `session-log-archive.md` and start fresh.

## Downstream triggers (after activation)

| Skill | Trigger condition |
|-------|------------------|
| `skills/win-log/SKILL.md` (extraction mode) | Win log has < 5 polished entries in `wins.md` |
| `skills/spaced-repetition/SKILL.md` (interview burst) | Pull relevant Active + Retired concepts to due-today |
| `skills/daily-plan/SKILL.md` (mode: full_plan, interview_prep context) | Generate the crash course plan |
| `skills/mock-interview/SKILL.md` | Schedule at least 2 mock sessions before the interview date |

---

## Interview onboarding conversation

Read `modes/onboarding.md` for the full onboarding flow. Summary: a 3-4 turn conversation that gathers company+role, timeline+format, assesses readiness, and presents a plan for confirmation. Check edge cases first — interview-tomorrow and 2+-months-away have special routing.

## What happens on activation

After user confirms, read `modes/activation.md` for the 7-step activation sequence (Steps A-G: write interview-context, change plan type, generate crash course, win log activation, SRS burst, config tightening, log activation).

## Post-interview

After the interview date passes, read `modes/post-interview.md` for the check-in conversation, response handling, and transition back to the learning plan.

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Interview-prep-specific:**
- The crash course didn't cover something the user actually needed for the interview (log what was missing and how you found out — post-interview debrief, user feedback, etc.)
- The 2-month threshold for deferring full `interview_prep` mode felt wrong — either too early (user wasn't ready to shift) or too late (they needed more time in interview mode) (log the timeline and what would have been better)
- Post-interview transition back to the learning plan was jarring — the user's context had shifted during interview prep and the saved plan felt stale (log what felt off about the restored plan)

## Edge cases

### Interview is tomorrow

Ultra-compressed mode. Skip the full crash course. Focus on highest-impact, lowest-effort prep:

1. **Review win log** — read through existing STAR stories. If win log is empty, do a 10-minute rapid extraction of 2-3 stories.
2. **Quick mock** — one behavioral mock (15-20 minutes). Focus on delivery, not new content.
3. **Company basics** — 10 minutes reading the company's about page and recent news. Prepare 2 questions to ask.
4. **Confidence framing** — "Not much time, but let's make the most of it. You know more than you think — the goal tomorrow is to communicate clearly, not to be perfect."

Don't generate a multi-day crash course. Don't trigger SRS burst. Don't change plan type (one day isn't worth the overhead).

Write a minimal `interview-context.md` entry so the post-interview check-in still fires.

### User doesn't know company or role yet

General interview prep — recruiter outreach, early-stage job search, exploring options:

- **Behavioral:** STAR stories from win log (universally useful)
- **Technical:** common questions for their dream career role type
- **System design:** general design exercises at their level
- **No company-specific research** — skip until details arrive

Set `interview-context.md` with Target company = "TBD" and Target role = "[dream career role type]". Update when the user gets more details.

> "I'll start with general prep for [dream career role type] interviews. When you know which company, I'll tailor the plan."

### Already in interview_prep — gets another interview

Multiple interviews running in parallel:

1. **Update interview-context.md** — add a second interview section:

```markdown
## Interview 2

- **Status:** active
- **Target company:** [company 2]
- **Target role:** [role 2]
- **Interview date:** YYYY-MM-DD
...
```

2. **Prioritize the sooner interview** — daily tasks focus on what's next
3. **Shared prep covers both** — if both interviews need behavioral prep, one set of STAR stories serves both. Technical prep diverges only where company-specific requirements differ.
4. **After the first interview concludes**, shift full focus to the second

### User wants to cancel interview prep

Respect it immediately. No pushback, no "are you sure?"

1. Change plan type back to `learning` in `memory/current-plan.md`
2. Restore previous plan from `## Saved Learning Plan`
3. Update `interview-context.md` — set Status to `cancelled`

> "Done — your regular plan is back. Your interview prep progress is saved if you need it later."

### User's pillar levels are very low for the job

Be honest about the gap, then triage:

> "The job asks for [X] at a level you haven't reached yet. In [days] days, here's what we can realistically cover:
>
> - **High impact:** [1-2 areas where focused practice will show the most improvement]
> - **Foundation only:** [areas where we can cover basics but not depth]
> - **Skip for now:** [areas that need more time than we have — be strategic about what to deprioritize]
>
> I'll prioritize the highest-impact areas. Even partial prep is better than none."

Don't pretend they can master everything in 2 weeks. Don't discourage them from interviewing. Frame it as strategic triage.

### No job posting available

Work from the role title and company name:

- Use general requirements for that role type (e.g., "PM at a mid-size tech company" has well-known patterns)
- Research the company to infer tech stack, culture, interview style
- Prep for the most common interview formats for that role
- Update the plan if the user gets the job posting later

> "I don't have the job posting, but I know what [role] interviews at [company type] typically look like. I'll prep you for the standard format and we can adjust if you get more details."

### Interview is 2+ months away

Don't switch to full `interview_prep` yet — that's too early to go into intensive mode:

1. Write the interview to `memory/interview-context.md` with Status = `scheduled`
2. Keep plan type as `learning`
3. Shift pillar weights toward interview-relevant skills within the regular plan (+10-15% to relevant pillars)
4. Start win log extraction if win count is low (this can happen at a relaxed pace)
5. Set a reminder: switch to `interview_prep` mode 3-4 weeks before the date

> "Your interview is [X] weeks out — plenty of time. I'm not going to flip your whole plan yet, but I'll start steering your regular tasks toward skills that matter for this role. I'll switch to full interview prep mode about 3-4 weeks before."

When the 3-4 week mark arrives, run the full activation (Steps A-G) as if the user just confirmed.

### User returns to interview prep after cancelling

If the user previously cancelled and now wants to resume:

1. Check `memory/interview-context.md` for the cancelled entry
2. Ask: "I have your previous prep for [company/role]. Want to pick up where you left off, or start fresh?"
3. If picking up: restore the interview context, recalculate days remaining, resume the crash course
4. If starting fresh: treat as a new activation

### Interview process takes longer than expected

If the interview date passes but the user says they're still in the process (waiting, more rounds, rescheduled):

- Keep `interview_prep` active
- Adjust the timeline
- If the user is in a waiting period between rounds: reduce to maintenance mode (1 light task/day) until the next round date is known

---

## Hooks

While this skill is active, enforce these constraints:

| Hook | What it prevents | Why |
|------|-----------------|-----|
| Focus mode | Daily-plan sending non-interview tasks — all tasks must route through the interview prep task taxonomy in `references/crash-course-tasks.md` | Everything should be interview-relevant during crash course |
| Plan freeze | Adaptation skill changing pillar weights or restructuring the plan | Plan is locked during interview prep — the crash course timeline is fixed |
