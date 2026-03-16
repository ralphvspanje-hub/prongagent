---
name: prongagent-adaptation
description: "Autonomous plan adjustment based on progress and behavior patterns"
tags: [learning, adaptation, planning]
user-invocable: false
metadata:
  openclaw:
    emoji: "⚙️"
---

# Adaptation Skill

## When to trigger

- **After every check-in completes** — runs silently, no user-facing output
- **After weekly review completes** — runs silently (when weekly-review skill exists)
- **ONE EXCEPTION:** If the user mentions job search or interview in any conversation, adaptation CAN surface the interview prep option directly to the user. This is the only case where this skill produces user-facing output.

This skill NEVER sends messages to the user (except the interview prep exception above). It adjusts the plan silently — the user sees changes reflected in tomorrow's daily message.

## What to read

This skill has the widest read scope of any skill. Read ALL of the following before making decisions:

| File | What to look for |
|------|-----------------|
| `memory/progress.md` | Current streak, completion rates (this week + all time), pillar levels, blocks at level, teach-back log (response quality patterns, gate failures) |
| `memory/history.md` | Completed task patterns over time — pillar distribution, frequency, gaps in dates, extra tasks |
| `memory/resource-feedback.md` | Learning style profile, platform ratings, recent ratings, format preferences, blocklist |
| `memory/adaptation-log.md` | **CRITICAL:** Previous adaptations — dates, triggers, changes. Check for 3-day cooldown. Never contradict recent changes. |
| `memory/current-plan.md` | Pillar weights, plan type (learning vs interview_prep), current week, total weeks, blocks at level |
| `memory/plan-tasks/week-{N}.md` | Current week task statuses — what's pending, done, skipped, partial. Task counts per day. |
| `memory/user-profile.md` | Dream career, time commitment, pacing preference, days off, experience level |
| `memory/spaced-repetition.md` | Active review items, queue length, concept statuses |
| `config/settings.md` | Teach-back frequency, resource feedback frequency, days off, quiet hours, verbosity |
| `memory/agent-observations.md` | Recent observations — check if any flagged issues affect current adaptation decisions. Also check for patterns across observations (same skill file flagged multiple times = systemic issue). |

## What to write

| File | When |
|------|------|
| `memory/adaptation-log.md` | **EVERY change, no exceptions.** Entry format below. |
| `memory/current-plan.md` | Pillar weight changes, plan duration changes, plan type changes |
| `memory/plan-tasks/week-{N}.md` | Task additions, removals, swaps for UPCOMING days only |
| `config/settings.md` | Frequency adjustments (teach-back, resource feedback) |
| `memory/win-log/candidates.md` | Passive win capture when user describes achievements |
| `memory/agent-observations.md` | Append observation if adaptation notices something about its own rules during trigger analysis (e.g., conflicting triggers, cooldown blocking an obviously needed change, conservative default feeling wrong) |

### Adaptation log entry format

```markdown
## YYYY-MM-DD — [short title]

- **Trigger:** [what the agent observed — include specific data]
- **Change:** [what the agent modified]
- **Reasoning:** [why this change was made — include data that supports it]
- **Files modified:** [list of files changed]
```

## Adaptation rules (apply to ALL triggers)

These rules constrain every decision this skill makes. Check them BEFORE writing any changes.

### Rule 1: Maximum 2 changes per run

Too many simultaneous changes makes it impossible to know what helped. If 3+ triggers fire, pick the 2 highest-priority ones (see priority order below) and defer the rest to the next run.

**Change counting:** A "change" is one coherent action, not one trigger. If a single action (e.g., swapping System Design articles to videos) addresses multiple triggers simultaneously (weak teach-backs + format preference), it counts as 1 change, not 2. The question is "how many distinct modifications am I making?" not "how many triggers am I satisfying?"

### Rule 2: 3-day cooldown

Read `memory/adaptation-log.md` and check the dates of recent entries. NEVER contradict an adaptation made in the last 3 days. "Contradict" means reversing the direction — if you increased difficulty 2 days ago, don't decrease it today even if new data suggests it.

**Exception:** Cooldown is 1 day (not 3) when plan type is `interview_prep`.
**Exception:** User explicitly says "this is too easy" or "this is too hard" — bypass cooldown entirely.

### Rule 3: Future only

NEVER modify tasks for today or already-completed days. Only modify tomorrow onward. Check the current day and task statuses before editing `memory/plan-tasks/week-{N}.md`.

### Rule 4: Gradual weight shifts

Pillar weight changes should be ±5-10% per adaptation, not dramatic swings. Weights must always sum to 100%.

### Rule 5: Always log reasoning

Good: "Reduced daily tasks from 3 to 2 because completion was 40% this week and teach-back on SQL showed difficulty mismatch (partial on Level 2 concepts)"
Bad: "Reduced tasks"

### Rule 6: Conservative default

When in doubt, don't adapt. False positives (unnecessary changes) are worse than false negatives (missing an opportunity to adjust). If the signal is weak or ambiguous, wait for more data.

### Rule 7: Respect explicit user preferences

If the user explicitly asked for a certain pace during onboarding, respect it even if data suggests otherwise. Only override explicit preferences if the user is clearly struggling: completion < 30% for 2+ weeks.

### Rule 8: Minimum task guarantee

Adaptation NEVER removes all tasks for a day. Every active day must have at least 1 task.

## Trigger priority order

When multiple triggers fire simultaneously, prioritize by impact:

1. **Learning-quality triggers** (teach-back signals) — highest priority
2. **Completion-based triggers** (skip/completion patterns)
3. **Resource-based triggers** (format/platform preferences)
4. **Engagement-based triggers** (responsiveness, dream career shifts)
5. **Milestone-based triggers** (celebrations, suggestions) — lowest priority

Apply max 2 changes from the highest-priority triggers that fired.

---

## Adaptation triggers

### COMPLETION-BASED

#### Trigger: User skips ALL tasks 2 days in a row

**Detection:** Read `memory/plan-tasks/week-{N}.md`. Check if the most recent 2 active days (not days off) have all tasks with status = `skipped`.

**Response:** Reduce daily task count by 1 for all remaining days this week. If already at 1 task per day, don't reduce further — instead check if difficulty is too high (see "Completion below 50%" trigger).

**Log example:**
```
- **Trigger:** User skipped all tasks on Monday (2/2 skipped) and Tuesday (2/2 skipped)
- **Change:** Reduced remaining week days from 2 tasks/day to 1 task/day
- **Reasoning:** Two consecutive full-skip days indicates the load is too high or life got in the way. Reducing to 1 task lowers the barrier to re-engage. Will monitor for further adjustment.
- **Files modified:** memory/plan-tasks/week-01.md
```

#### Trigger: User completes everything early 3+ days in a row

**Detection:** Read `memory/plan-tasks/week-{N}.md`. Check if the user has 3+ consecutive active days where all tasks = `done` (no skips, no partial). Also check `memory/progress.md` for streak confirmation.

**Response:** Depends on pacing preference from `memory/user-profile.md`:
- **Intensive pacing:** Increase difficulty — swap upcoming tasks for higher-level resources from the same pillar
- **Moderate pacing:** Add 1 stretch task to upcoming days (mark it clearly as optional/stretch)
- **Relaxed pacing:** Do nothing yet — wait for a full week of this pattern before adjusting

#### Trigger: Completion rate below 50% for a full week

**Detection:** Read `memory/progress.md` → "This week" completion count. Calculate: completed / total assigned for days that have been checked in (not future pending days). A "week" here means the checked-in portion — don't wait for all 7 days to pass. If < 50% and at least 4 active days have been checked in:

**Response (2 changes, pick up to 2):**
1. Reduce daily task count by 1 for next week
2. Check if difficulty is too high: compare pillar levels in `memory/current-plan.md` against task difficulty in the week file. If tasks are pulling from resources above the user's pillar level, that's a mismatch — adjust tasks to match current level
3. Check teach-back log — if recent teach-backs were "can't explain" or "partial", difficulty is confirmed too high

#### Trigger: Completion rate above 90% for a full week

**Detection:** Read `memory/progress.md` → "This week" completion. If ≥ 90% and the week is complete:

**Response (pick 1):**
- If teach-backs are consistently strong → increase difficulty (swap resources for next-level ones)
- If current pillars are all Level 3+ → suggest adding a new pillar in the daily message context (don't add it unilaterally — flag for the daily-plan skill to mention)
- If pacing is relaxed → acknowledge progress in the next daily message context but don't increase load

#### Trigger: Single pillar skip rate above 80% over 5+ tasks

**Detection:** Read `memory/history.md` and `memory/plan-tasks/week-{N}.md`. For each pillar, calculate: skipped tasks / total assigned tasks over the last 2 weeks. If any pillar has 80%+ skip rate over at least 5 assigned tasks:

**Response:** This pillar has a specific problem — the user is avoiding it. Investigate:
1. Check resource-feedback for that pillar — are the resources "didn't click"? → Format/platform mismatch
2. Check teach-back results for that pillar — are they weak? → Difficulty mismatch
3. Check if the pillar's tasks are consistently the longest ones scheduled → Time problem, not interest
4. If no clear cause: surface it gently in the daily message context — "I've noticed you've been skipping [pillar] tasks. Want to tell me what's not working? I can adjust."

Don't reduce the pillar's weight automatically — the user might need it for their dream career but the delivery format is wrong.

**Log example:**
```
- **Trigger:** System Design skip rate 85% (6/7 tasks skipped over 2 weeks)
- **Change:** Swapped remaining System Design articles to video format based on resource-feedback preference
- **Reasoning:** User skips System Design articles but completed the one System Design video assigned. Resource-feedback confirms: 2 "didn't click" on articles, 1 "great" on video. Format mismatch, not interest problem.
- **Files modified:** memory/plan-tasks/week-03.md
```

---

### ENGAGEMENT-BASED

#### Trigger: User hasn't responded to check-in in 3+ days

**Detection:** Read `memory/progress.md` → "Last active" date. Calculate days since last active. If ≥ 3 days with no check-in response:

**Response:** This is the ONE engagement trigger that sends a user-facing message (besides the interview prep exception). Send a gentle ping:

> "Hey — noticed you've been quiet for a few days. No pressure at all. Want to:
> - Keep going with a lighter plan?
> - Pause for a bit? (your progress is saved)
> - Restructure something?
>
> Or just let me know when you're back."

Do NOT follow up again if they don't respond to this. One ping, then wait.

**Log:** Record the ping in `memory/adaptation-log.md`. If user eventually responds, the check-in skill handles it.

#### Trigger: User mentions job search or interview

**Detection:** This is detected during ANY conversation (not just check-in). Key phrases: "interview", "job search", "applying", "got an offer", "recruiter", "hiring manager", "take-home assignment".

**Response:** Surface the interview prep option to the user:

> "Sounds like you might be entering job search mode. I can spin up an interview crash course alongside your regular plan — company research, mock interviews, targeted practice. Want me to set that up?"

If yes → flag for `skills/interview-prep/SKILL.md` to activate.

This is the ONLY trigger where adaptation directly messages the user (besides the 3-day absence ping).

#### Trigger: User describes an achievement in conversation

**Detection:** During any conversation, user mentions completing something notable: shipped a project, got positive feedback at work, solved a hard problem, taught someone a concept, built something outside the plan.

**Response:** Save to `memory/win-log/candidates.md`:

```markdown
## [Short description]

- **Date observed:** [today]
- **What happened:** [what the user described]
- **Why it might be a win:** [why this could be impressive in an interview]
- **Status:** draft
- **Raw notes:** [any supporting context]
```

This is passive capture — don't interrupt the conversation to ask about it. Just save it silently.

#### Trigger: User's dream career seems to be shifting

**Detection:** User mentions different career goals than what's in `memory/user-profile.md`. Examples: "I've been thinking about data engineering instead", "maybe PM isn't for me", "I'm more interested in [different role] now".

**Response:** Surface the observation — don't change anything unilaterally:

> "I've noticed you've been mentioning [new direction] more. Your current plan is built around [current dream role]. Want me to adjust the plan toward [new direction], or is [current dream role] still the target?"

If they confirm a shift → update `memory/user-profile.md` target role and trigger `skills/daily-plan/SKILL.md` mode: `full_plan` to regenerate.

---

### LEARNING-QUALITY-BASED

#### Trigger: Teach-back consistently weak on a pillar (2+ weak in a row)

**Detection:** Read `memory/progress.md` → Teach-Back Log. Look for 2+ consecutive teach-back entries for the same pillar with response quality = "Partial" or "Can't explain".

**Response (pick up to 2):**
1. Add more conceptual tasks for that pillar in upcoming days — the user needs more exposure before practice
2. Reduce that pillar's weight by 5% (shift weight to a stronger pillar) — slow down progression to consolidate
3. Swap upcoming practice tasks for that pillar to conceptual ones with different resource formats

#### Trigger: Teach-back consistently strong on a pillar

**Detection:** Read `memory/progress.md` → Teach-Back Log. Look for 3+ consecutive teach-back entries for the same pillar with response quality = "Strong".

**Response (pick 1):**
- Increase that pillar's weight by 5-10% — speed up progression
- Swap upcoming tasks for higher-level resources in that pillar
- If the pillar is at Level 4+ with strong teach-backs, consider reducing its task count and shifting time to weaker pillars

#### Trigger: Level-up gate failed twice for same pillar/level

**Detection:** Read `memory/adaptation-log.md` for entries from the teach-back skill logging gate failures. Read `memory/progress.md` → Teach-Back Log for gate attempts on the same pillar/level.

**Response:** This is an escalation — the teach-back skill flagged this for adaptation to review. Options (pick 1):
1. Add a focused remediation week: next week's tasks for this pillar are ALL conceptual, using different resources than what failed. Different formats, different perspectives on the same concepts.
2. Adjust the blocks-per-level threshold: if the user is consistently completing tasks but can't pass the gate, the tasks might not be effective. Consider whether the gate questions are too hard for the level, or the resources don't teach what the gate tests.
3. Check resource-feedback ratings for this pillar — if resources are rated "didn't click", the problem is the resources, not the user.

#### Trigger: All "didn't click" ratings on a pillar's resources

**Detection:** Read `memory/resource-feedback.md` → Recent Feedback. Filter by a specific pillar. If all recent ratings (3+) for that pillar are "didn't click":

**Response:** This is likely a difficulty mismatch, not a resource quality issue. Two options:
1. Consider adjusting the pillar's level down by 1 — the user may have been placed too high
2. Check if the resource formats match the user's learning style profile — if the user prefers video but all resources for this pillar are articles, switch formats

**Do NOT just swap to different resources at the same level/format** — that was already tried and failed.

---

### RESOURCE-BASED

#### Trigger: Resource feedback shows consistent format preference

**Detection:** Read `memory/resource-feedback.md` → Learning Style Profile. After 10+ ratings, check if a clear format preference has emerged (one format consistently rated "great", others "okay" or worse).

**Response:** Shift the resource mix in upcoming tasks toward the preferred format. When generating or modifying tasks in `memory/plan-tasks/week-{N}.md`:
- Preferred format: 50-60% of tasks (up from the default ~33% mix)
- Still include other formats for variety — don't make every task the same

This doesn't require an adaptation-log entry unless it's a significant shift (e.g., going from mixed to 60%+ video).

#### Trigger: Multiple "didn't click" on same platform

**Detection:** Read `memory/resource-feedback.md` → Recent Feedback. If a platform has 3+ "didn't click" ratings:

**Response:** Deprioritize that platform in future task generation. Check upcoming tasks in `memory/plan-tasks/week-{N}.md` — if any pending tasks use this platform, swap them for equivalent resources from a different platform.

Add the platform to a mental "avoid" list. The daily-plan skill checks resource-feedback when generating tasks, so this will take effect automatically on the next weekly generation.

#### Trigger: User rates everything as "didn't click"

**Detection:** Read `memory/resource-feedback.md` → Recent Feedback. If the last 5+ ratings are ALL "didn't click" regardless of pillar or format:

**Response:** Resources aren't the problem — the difficulty level or pillar selection is fundamentally wrong. This requires a deeper review:
1. Compare pillar levels against teach-back performance — are they placed too high?
2. Compare task topics against dream career gaps — are the pillars actually relevant?
3. Check if the user's time commitment is realistic vs. actual completion
4. Consider triggering a mini re-onboarding conversation: "The resources I've been picking don't seem to be landing. Can we take a step back — what's been feeling off?"

This is a high-severity signal. Prioritize over other triggers.

---

### MILESTONE-BASED

#### Trigger: User completes a skill block (pillar levels up)

**Detection:** Read `memory/current-plan.md` → Pillars table. Check if any pillar's level has increased since the last adaptation run (compare against `memory/adaptation-log.md` or previous state).

**Response:** No direct change — but flag context for the daily-plan skill's next daily message:
- Celebrate: "You just hit Level [N] in [pillar] — nice work."
- Introduce what's next: "Level [N] is about [brief description of what this level covers]."
- Shift upcoming tasks to new-level resources

This is informational, not a plan change. Don't count it against the 2-change limit.

#### Trigger: User hasn't built anything in 3+ weeks

**Detection:** Read `memory/history.md`. Check if any tasks with Type = "practice" and Action = "Build" have been completed in the last 3 weeks. Also check `memory/current-plan.md` → Portfolio Projects.

**Response:** Flag for the portfolio-projects skill (when it exists). In the meantime, add a building-oriented task to the upcoming week — something small and practical that maps to the user's dream career and current pillar levels.

#### Trigger: End of week reached

**Detection:** All days in the current week have been checked in (or it's the weekly digest day from `config/settings.md`).

**Response:** Flag for the weekly-review skill (when it exists). No adaptation changes — this is just a handoff signal.

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Adaptation-specific:**
- Two triggers fired that genuinely contradicted and the priority order didn't resolve it cleanly (log both triggers, the priority ranking, and what you chose)
- The 3-day cooldown prevented a change that felt obviously needed (log the trigger, the recent adaptation it would contradict, and why the new change felt urgent)
- Max 2 changes felt insufficient for the situation — 3+ triggers fired and deferring the rest felt like leaving real problems unaddressed (log all triggers and which were deferred)
- The conservative default (Rule 6: don't adapt when signal is weak) was chosen but you would have preferred to act (log the signal and why it felt meaningful despite being technically weak)

## Edge cases

### First week (no history yet)

Don't adapt — there's not enough data. Skip all trigger checks.

**Exception:** If the user completes everything on Day 1-2 AND explicitly says it was too easy (check conversation context), you can bump difficulty early. This bypasses both the cooldown and the first-week freeze.

### Conflicting signals

**High completion but weak teach-backs:** Prioritize the teach-back signal. Completion measures effort, teach-back measures learning. Someone can complete tasks without learning. Response: keep task count the same but increase conceptual task ratio and add reinforcement.

**High completion but all "didn't click" resource feedback:** The user is doing the work but the resources aren't effective. Don't increase difficulty — fix the resource selection first.

**Low completion but strong teach-backs:** The user is learning when they engage but life is getting in the way. Don't decrease difficulty — decrease volume (fewer tasks, same level).

**Low completion AND weak teach-backs:** The most concerning combination — the user isn't engaging AND isn't learning when they do. This is likely a difficulty or relevance problem, not a motivation problem. Response: (1) reduce task count to lower the barrier, (2) swap resource formats for the weak pillar based on learning style profile. Do NOT increase conceptual tasks for the weak pillar yet — the user can't handle more volume. Fix the format and difficulty first, then add volume once completion recovers.

### Interview prep mode (plan type = `interview_prep`)

Tighter adaptation cycle:
- Review progress daily instead of waiting for weekly patterns
- More aggressive difficulty scaling (bump up after 2 days of full completion instead of 3)
- Shorter cooldown: 1 day instead of 3
- Prioritize interview-relevant triggers (mock interview weaknesses, win log gaps)
- Don't suggest adding new pillars or portfolio projects — stay focused on the interview

### Explicit user override

User says "this is too easy" or "this is too hard" → treat as immediate override:
- Bypass cooldown
- Bypass pattern requirements (don't wait for 2-3 days of data)
- Make the adjustment immediately for tomorrow's tasks
- Log with reasoning: "User explicitly reported [too easy/too hard] — immediate adjustment"

### Multiple triggers fire simultaneously

Apply the trigger priority order (learning-quality > completion > resource > engagement > milestone). Pick the top 2 by priority. Defer the rest — they'll fire again on the next run if still relevant.

### Pillar stuck at same level for 3+ weeks

**Detection:** Read `memory/current-plan.md` → Pillars table. Check if any pillar has been at the same level for 3+ weeks without reaching 5/5 blocks.

**Response:** The tasks might not be generating enough blocks. Investigate:
1. Are too many tasks being skipped? → Volume problem, not difficulty
2. Are tasks being marked partial? → Difficulty problem, tasks are too long or hard
3. Is the pillar weight too low? → Not enough tasks assigned to this pillar to accumulate blocks
4. Is the user avoiding this pillar? → Engagement problem, the pillar may not feel relevant

Based on the finding, adjust weights (if too low), reduce task difficulty (if too hard), or surface the observation to the user in the daily message context (if engagement).

### Adaptation would contradict a very recent change

If a trigger fires that would reverse a change made in the last 3 days:
- Do NOT make the change
- Log it as "deferred" in `memory/adaptation-log.md`: "Trigger [X] fired but would contradict adaptation from [date]. Deferring until cooldown expires."
- Re-evaluate on the next run after cooldown

### No triggers fire

This is the expected outcome most days. Do nothing. Don't adapt for the sake of adapting.
