---
name: prongagent-daily-plan
description: "Daily task generation and delivery with resource matching"
tags: [learning, planning, daily]
user-invocable: true
metadata:
  openclaw:
    emoji: "📋"

---

# Daily Plan Skill

## Skill files

| File | When to read |
|------|-------------|
| `modes/full-plan.md` | When generating the initial plan after onboarding (mode: full_plan) |
| `references/task-format.md` | When generating tasks — contains field definitions, task types, resource selection rules (5-9), and example outputs |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |
| `scripts/task-selector.ts` | Step 3 of weekly mode — run this to check pillar distribution before generating tasks |

### scripts/task-selector.ts

**What it does:** Reads current-plan.md (pillar weights) and the current week file, calculates which pillars are under-represented.

**Usage:** `bun run skills/daily-plan/scripts/task-selector.ts <path-to-current-plan.md> <path-to-week-file.md>`

- `path-to-current-plan.md` — typically `memory/current-plan.md`
- `path-to-week-file.md` — typically `memory/plan-tasks/week-{N}.md`

**Output:**
```
total_tasks_this_week: 12

## Pillar Distribution
| Pillar | Target weight | Actual count | Actual % | Gap | Needs tasks |
| Python | 40% | 3 | 25% | +15% | yes |
| SQL | 30% | 5 | 42% | -12% | no |
| Product Sense | 30% | 4 | 33% | -3% | no |

## Recommendation
Prioritize: Python
```

**Why scripted:** Percentage distribution math across pillars should be exact, not estimated by LLM reasoning.

## Configuration

This skill uses `config.json` for user preferences. If it doesn't exist, use the defaults below and offer to save the user's preferences.

| Field | Default | What it controls |
|-------|---------|-----------------|
| `youtube_percentage` | `50` | Target percentage of video-based resources (0-100) |
| `prefer_interactive` | `false` | Prioritize interactive/hands-on resources over passive ones |
| `include_practice_prompts` | `true` | Include practice prompt tasks in daily plans |

## When to trigger

- Every morning at the configured time (from `config/settings.md`)
- After onboarding completes (first plan generation — mode: `full_plan`)
- When current week's tasks are all completed (generate next week)
- User explicitly asks for a new plan or plan refresh

## What to read

- `memory/user-profile.md` — dream career, skills, gaps, preferences, time commitment
- `memory/resume-context.md` — work experience, projects (for contextualizing tasks)
- `memory/current-plan.md` — current pillars, levels, week number
- `memory/progress.md` — streak, recent completion rates, teach-back results, pillar levels
- `memory/spaced-repetition.md` — check if any concepts are due for review today
- `memory/resource-feedback.md` — learning style profile (preferred formats, platform ratings)
- `memory/adaptation-log.md` — recent adaptations (avoid contradicting recent changes)
- `memory/user-model.md` — learning patterns (format preferences, session length), motivation drivers (for task framing), knowledge anchors (for analogies and "why" connections)
- `memory/concept-links.md` — existing concept connections for task framing: "This builds on [concept] you learned last week." Use `builds-on` links to create continuity between days.
- `resources/curated-resources.md` — available resources by pillar and level
- `skills/daily-plan/config.json` — resource format preferences (YouTube %, interactive, practice prompts)
- `config/settings.md` — message timing, verbosity, days off, quiet hours

## What to write

- `memory/current-plan.md` — plan outline (mode: full_plan)
- `memory/plan-tasks/week-{N}.md` — weekly task files (mode: weekly)
- `memory/progress.md` — update pillar levels section after plan generation
- `session-log.md` (this skill directory) — after execution if anything notable happened

## Session log

See `AGENTS.md` for session log protocol. Skill-specific logging:
- Which task types the user completed vs skipped (supplements adaptation skill)
- "User always does the YouTube task first" → put it first
- Resource format preferences that emerge from completion patterns

## Modes

### Mode: full_plan

Triggered after onboarding. Generates the overall multi-week learning plan.

When generating the initial plan, read `modes/full-plan.md` for the 6-step process.

### Mode: weekly

Generates tasks for one week. Called after `full_plan`, and again when a week's tasks are all completed.

**Step 1: Determine the week**

Read `memory/current-plan.md` for current week number. Create `memory/plan-tasks/week-{N}.md`.

**Step 2: Check for days off**

Read `config/settings.md` for days off — this is the source of truth. (`memory/user-profile.md` may also list days off from onboarding; if they conflict, `config/settings.md` wins. The onboarding skill should sync user preferences to settings.) Skip days off entirely (leave them blank or mark "day off").

**Step 3: Check pillar distribution and generate tasks**

Before generating tasks, run `scripts/task-selector.ts` to check current pillar distribution:

```bash
bun run skills/daily-plan/scripts/task-selector.ts "memory/current-plan.md" "memory/plan-tasks/week-{N}.md"
```

Use the Recommendation output to prioritize under-represented pillars when selecting tasks for the remaining days. Do NOT manually calculate pillar percentages — the script handles distribution math.

For each day, assign tasks that fit within the user's daily time commitment. Use this table as a **guideline, not a rule** — the agent should optimize for learning quality, not hitting a task count:

| Time commitment | Typical tasks | Typical sizes |
|-----------------|---------------|---------------|
| 15min | 1 task | 1 Short |
| 30min | 1-2 tasks | 1-2 Short |
| 1hr | 1-3 tasks | Mix of Short + Medium |
| 2hr+ | 2-4 tasks | Mix of Short + Medium + Long allowed |

**Size definitions:** Short (~20min) = quick concept video, short read, practice questions, brief exercise. Medium (~40min) = standard tutorial, moderate exercises, documentation deep-dive, hands-on practice. Long (~60min) = full lecture, comprehensive tutorial, complex hands-on project, in-depth course. Only these three sizes are allowed — no arbitrary minute values.

**Single-task days are fine.** A focused Medium or Long deep practice session (e.g., SQL exercises, a long-form tutorial, a hands-on build) can be more valuable than 3 Short tasks with context-switching. Use single-task days when:
- A Medium or Long task is exceptionally well-matched to the user's level, pillar, and dream career
- The task is practice-heavy and benefits from sustained focus (coding, building, exercises)
- The user's resource feedback shows they prefer longer deep-dive formats

**Time flexibility:** The daily time commitment is a target, not a hard cap. If a Long task is exceptionally well-matched (right pillar, right level, directly tied to dream career), a 30min/day user can get one Long task instead of their usual Short tasks. When this happens: assign only that one task for the day, and note in the daily message why ("Today's a deeper dive — this one's worth the extra time"). Never exceed on consecutive days.

For each task, specify all fields in the task format (see `references/task-format.md`).

**Task selection rules:**

1. **Pillar distribution** — follow the weights from `current-plan.md`. If Python has 40% weight and there are 3 tasks, ~1-2 should be Python tasks. On single-task days, rotate the pillar — don't always deep-dive the same one.

2. **Format mix** — shift toward the user's preferred format (from `resource-feedback.md` learning style profile), but don't make every task the same format over a week. Variety prevents fatigue. Single-task days naturally vary format since you pick the best resource regardless.

3. **Type mix** — alternate between conceptual tasks (reading, watching, studying) and practice tasks (coding, building, exercises). Aim for roughly 50/50 over a week unless the user's profile suggests otherwise. Individual days don't need to be balanced — a full practice day followed by a full conceptual day is fine.

4. **Difficulty match** — tasks should match the current pillar level:
   - Level 1: beginner resources, fundamentals, introductions
   - Level 2: intermediate resources, applied concepts, guided practice
   - Level 3: advanced resources, independent practice, real-world scenarios
   - Level 4: expert resources, complex problems, system-level thinking
   - Level 5: mastery-level challenges, teaching others, original work

For resource selection rules and task format spec, read `references/task-format.md`.

**Step 4: Write to file**

Write to `memory/plan-tasks/week-{N}.md` using the exact table format from the template. Every task row must have all fields filled.

**Step 5: Update plan**

Increment current week in `memory/current-plan.md` if generating a new week (not the first week).

### Mode: daily_message

Compose and send the daily message. This is the user-facing output.

**Step 1: Check preconditions**

- Is today a day off? If yes, don't send (or send a brief "enjoy your day off" if the user has a streak going)
- Is it within quiet hours? If yes, delay until quiet hours end
- Does today have tasks? If the week file is empty or all tasks are done, trigger mode: `weekly` first

**Step 2: Read today's tasks**

Pull today's tasks from `memory/plan-tasks/week-{N}.md`.

**Step 3: Check spaced repetition**

Read `memory/spaced-repetition.md`. If a concept is due for review today, include one review question in the message. Only one per day — don't overwhelm.

**Step 4: Add context**

Read `memory/user-model.md` to personalize the message:
- Use Knowledge Anchors to frame "Why" connections: reference the user's prior domain knowledge ("You've worked with marketing analytics — this SQL work builds directly on that data intuition")
- Use Motivation Drivers to pick the right framing: if the user is energized by dream career connections, lead with that. If streaks motivate them, emphasize the streak.
- Use Learning Patterns to note format matches: if you know they prefer video and today's task is a video, no need to mention it. If it's an article and they usually prefer video, acknowledge: "This one's a read — give it a shot, the interactive examples are worth it."
- If user-model.md is empty (early days), fall back to `user-profile.md` context only. Don't mention the user model's absence.

- Reference yesterday's progress if relevant:
  - Streak going? → "That's [N] days in a row now."
  - Missed yesterday? → "Let's pick up where you left off." (no guilt)
  - Completed everything? → "Clean sweep yesterday — nice."
- Connect at least one task to the dream career: "This matters because [dream role] requires [skill], and [task] builds exactly that."
- If the user has resume context, reference their background: "You've worked with [tech from resume] before — this builds on that foundation."

**Step 5: Format the message**

For each task, present: the learning objective (Action), the search suggestion or curated link (Search), the size, and the dream career connection (Why). For practice_prompt tasks, present the question directly — the user answers in conversation.

If the user has extended context in `memory/user-profile.md` (§ Extended Context), reference specific details when framing "why this matters" — e.g., "You mentioned loving the data analysis part of your marketing internship — this SQL work builds directly on that."

Keep it concise — 5-8 lines max for normal verbosity. Adjust based on `config/settings.md` verbosity setting:

| Verbosity | Message style |
|-----------|--------------|
| concise | Task list only, no commentary |
| normal | Task list + 1-2 lines of context/motivation |
| detailed | Task list + context + dream career connection + streak info + review question |

**Step 6: Send the message**

Send the formatted message.

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- Couldn't craft a useful search suggestion for a pillar/level combo — topic is too niche or specialized for general search (log the pillar, level, and what you tried)
- The time flexibility rule was used (Long task for a Short-commitment user) — log which task and why it justified exceeding the daily budget
- A ramp-up rule (Week 1 gentle start) felt too aggressive or too gentle for this specific user (log the user's profile and what felt off)

## Edge cases
- **No curated resources for a pillar/level:** This is the normal case — most tasks use search suggestions (Priority 1). Only flag this as an observation if you can't even craft a good search query for the topic.
- **User completes all tasks early:** Generate the next week immediately. Don't make them wait.
- **User hasn't done any tasks for 3+ days:** Don't generate a new week. The check-in and adaptation skills handle this — daily-plan just generates and sends.
- **Interview prep mode:** When `plan type` is `interview_prep` in `memory/current-plan.md`, daily-plan operates differently:
  **What changes in weekly mode:**
  - Read `memory/interview-context.md` for target company, role, format, requirements, and days until interview
  - Read `memory/interview-context.md` → `## Skill Requirements` table for JD-mapped task weights. Use these weights (not the regular pillar weights) to determine the daily task mix. See `skills/interview-prep/references/crash-course-tasks.md` → JD-Mapped Task Weighting for the algorithm and examples.
  - If no Skill Requirements table exists (no JD available), use the default role-based mix from `crash-course-tasks.md` → "When no JD file exists"
  - Task types shift toward interview practice: behavioral prep (STAR story review, practice delivery), product/technical cases, company research, mock interview sessions, targeted skill practice
  - Timeline is compressed — generate only enough days to reach the interview date, not a full 8-week plan
  - No ramp-up: start at full intensity from Day 1 (the user chose interview prep, they're motivated)
  - Include at least 1 mock interview task in the first week and another in the week before the interview
  **What changes in daily_message mode:**
  - Include countdown: "Interview in [X] days. Today's focus: [area]."
  - Calculate readiness tier using `skills/interview-prep/references/readiness-tiers.md` criteria. Show tier name and the most relevant gap: "Readiness: Almost There — company research is the last piece." **Exception:** In the final 1-2 days before the interview, if the tier is "Unprepared" or "Partially Ready", drop the tier label entirely — it's demoralizing with no time to act on it. Focus on confidence-building language instead (see readiness-tiers.md → Gotchas).
  - If readiness tier triggers a warning (see readiness-tiers.md → When to Warn), include it prominently before the task list.
  - Connect tasks to interview readiness, not dream career: "This product case practice maps directly to StreamCo's Round 2 format"
  - If interview is 3 or fewer days away: shift tone to confidence-building, reduce task count, focus on review not new material. "You've put in the work. Trust your prep."
  - SRS burst: if spaced-repetition has role-relevant concepts marked as due, include up to 2 review questions (not the usual 1) in the first few days
  **What changes in full_plan mode:**
  - interview-prep.md handles the crash course plan generation and writes to current-plan.md
  - daily-plan's full_plan mode should check plan type — if interview_prep, defer to interview-prep.md for plan structure. Daily-plan still handles weekly task generation and daily messages within that structure.
  See `skills/interview-prep/SKILL.md` for activation flow, onboarding, and crash course task type definitions.
- **Job search mode:** When `plan type` is `job_search` in `memory/current-plan.md`, daily-plan operates with these adjustments:
  **What changes in weekly mode:**
  - Read `memory/interview-context.md` for target role types and company targets (general prep context)
  - Shift pillar weights ~15% toward interview-relevant skills. For each pillar, if it maps to a skill commonly tested in interviews for the target role, add weight proportionally. Reduce weights from pillars least relevant to interviews. Weights must still sum to 100%.
  - Add 1 application/job-search task per week as a recurring task type. Examples: "Review and update resume for [role type]", "Draft cover letter for [company]", "Research [company] culture and interview process", "Update LinkedIn profile section: [specific section]". These are in addition to learning tasks, not replacements.
  - Include more practice_prompt tasks (interview-relevant active recall) compared to pure learning mode
  - Keep regular 8-week cadence — no timeline compression
  - Ramp-up rules still apply for new users
  **What changes in daily_message mode:**
  - Include a brief job search context line: "Job search mode active. This week's application target: [target from config/settings.md or default 2-3]."
  - Connect at least one task to interview readiness (not just dream career): "This SQL practice is the kind of thing that shows up in analyst interviews."
  - If `memory/interview-context.md` has company-specific expectations, reference them when relevant: "Uber's analyst interview is heavy on window functions — today's practice hits that."
  - Do NOT include countdown (no interview date exists)
  - Do NOT display readiness tier (that's for interview_prep only)
  **What changes in full_plan mode:**
  - Generate the same multi-week plan structure as `learning`, but with the ~15% weight shift toward interview-relevant pillars applied
  - Do NOT generate a crash course — that's interview_prep only
- **Spaced repetition queue is long:** Still only include 1 review per daily message. The SRS skill manages the queue — daily-plan just surfaces what's due today.
- **First week after onboarding:** Start gently. Ramp up over the first 3-4 days:
  - Day 1-2: 1 task per day at normal length (not half-length — just fewer tasks). For 30min users this means 1 task at ~25-30min, not a 15min task.
  - Day 3-4: normal task count but pick easier/shorter resources
  - Day 5+: full commitment and normal difficulty
  The goal is habit-building through consistency, not reduced effort. One real task is better than a half-task that feels pointless.