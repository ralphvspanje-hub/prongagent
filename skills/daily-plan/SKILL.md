---
name: prongagent-daily-plan
description: "Daily task generation and Discord delivery with resource matching"
tags: [learning, planning, daily]
user-invocable: true
metadata:
  openclaw:
    emoji: "📋"
---

# Daily Plan Skill

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
- `resources/curated-resources.md` — available resources by pillar and level
- `config/settings.md` — message timing, verbosity, days off, quiet hours

## What to write

- `memory/current-plan.md` — plan outline (mode: full_plan)
- `memory/plan-tasks/week-{N}.md` — weekly task files (mode: weekly)
- `memory/progress.md` — update pillar levels section after plan generation

## Modes

### Mode: full_plan

Triggered after onboarding. Generates the overall multi-week learning plan.

**Step 0: Precondition check**

Before generating, verify `memory/user-profile.md` has non-empty values for:
- Target role (Dream Career → Target role)
- Daily time commitment (Learning Preferences → Daily time commitment)
- At least one known gap (Dream Career → Known gaps)

If any of these are empty, abort plan generation and trigger the onboarding skill instead. Do not attempt to generate a plan from incomplete profile data.

**Step 1: Select pillars (2-4)**

Analyze the dream career and known gaps from `memory/user-profile.md`. Pick 2-4 skill pillars that close the biggest gaps toward the target role.

How to choose:
- Map the dream role to its core competencies (e.g., "Senior Full-Stack Engineer" → backend architecture, databases, system design, testing)
- Cross-reference with the user's known gaps — prioritize gaps over strengths
- Cross-reference with `resources/curated-resources.md` — only pick pillars you have resources for
- If the user has resume context, use their existing skills to identify what's genuinely missing vs. what they think is missing

Example pillar selection for "Senior Full-Stack Engineer":
| Pillar | Why |
|--------|-----|
| Backend Architecture | Gap: user only has basic Node.js, needs API design + patterns |
| Databases | Gap: only basic CRUD, needs query optimization + data modeling |
| System Design | Gap: no exposure, critical for senior roles |
| Testing | Gap: mentioned by user, important for production code quality |

**Step 2: Set initial pillar levels**

Each pillar has levels 1-5. Set initial levels based on the user's experience:

| User's experience with this pillar | Starting level |
|-------------------------------------|----------------|
| No exposure | Level 1 |
| Some basics / coursework | Level 1 |
| Has used it at work (basic) | Level 2 |
| Comfortable, uses regularly | Level 3 |
| Strong, could teach others | Level 4 |

Never start at Level 5 — that's mastery, earned through the program.

**Block definition:** A "block" is one completed task in that pillar. Each level requires 5 blocks (completed tasks) to level up. When a pillar reaches 5/5 blocks, increment its level by 1 and reset blocks to 0/5. The adaptation skill may adjust the blocks-per-level threshold based on teach-back results.

**Step 3: Set pillar weights**

Weights determine how many tasks per week go to each pillar. Heavier weight = more daily tasks from that pillar.

- Weight the biggest gaps higher (they need more time)
- Weight user's strengths lower (maintenance mode)
- Weights should sum to 100%
- Reassessed during adaptation (if a pillar levels up fast, shift weight to slower ones)

**Step 4: Outline the plan**

Write to `memory/current-plan.md`:
- Plan duration: 8-12 weeks (default 8 for moderate pacing, 12 for relaxed)
- Which pillars focus in which weeks (not rigid — adaptation will shift this)
- Plan type: `learning` (or `interview_prep` if user is actively job hunting with a timeline)

**Step 5: Generate Week 1**

Immediately proceed to mode: `weekly` to generate the first week's tasks.

**Step 6: Send Day 1**

After Week 1 is generated, immediately proceed to mode: `daily_message` to send the first day's tasks. The user should receive their first tasks in the same session as onboarding — don't make them wait until tomorrow.

### Mode: weekly

Generates tasks for one week. Called after `full_plan`, and again when a week's tasks are all completed.

**Step 1: Determine the week**

Read `memory/current-plan.md` for current week number. Create `memory/plan-tasks/week-{N}.md`.

**Step 2: Check for days off**

Read `config/settings.md` for days off — this is the source of truth. (`memory/user-profile.md` may also list days off from onboarding; if they conflict, `config/settings.md` wins. The onboarding skill should sync user preferences to settings.) Skip days off entirely (leave them blank or mark "day off").

**Step 3: Generate tasks for each active day**

For each day, assign tasks that fit within the user's daily time commitment. Use this table as a **guideline, not a rule** — the agent should optimize for learning quality, not hitting a task count:

| Time commitment | Typical tasks | Typical total time |
|-----------------|---------------|-------------------|
| 15min | 1 task | ~15 min |
| 30min | 1-2 tasks | ~30 min |
| 1hr | 1-3 tasks | ~50-60 min |
| 2hr+ | 2-4 tasks | ~90-120 min |

**Single-task days are fine.** A focused 1-hour deep practice session (e.g., SQL exercises, a long-form tutorial, a hands-on build) can be more valuable than 3 short tasks with context-switching. Use single-task days when:
- The best available resource is longer than a typical task (45min-1.5hr) and is exceptionally well-matched to the user's level, pillar, and dream career
- The task is practice-heavy and benefits from sustained focus (coding, building, exercises)
- The user's resource feedback shows they prefer longer deep-dive formats

**Time flexibility:** The daily time commitment is a target, not a hard cap. If a resource is exceptionally well-matched (right pillar, right level, highly rated platform, directly tied to dream career), it can exceed the daily budget by up to 50%. When this happens: assign only that one task for the day, and note in the daily message why ("Today's a deeper dive — this one's worth the extra time"). Never exceed on consecutive days.

For each task, specify all fields in the task format (see below).

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

5. **Resource selection** — three priority tiers:
   - **Priority 1: Curated** — pull from `resources/curated-resources.md` first. Match pillar + level. These are vetted and preferred.
   - **Priority 2: Web search** — when curated doesn't cover the pillar/level, search YouTube, Google, etc. for "[topic] [level] tutorial/course". Mark these resources with a `[searched]` prefix in the task file. Include the actual URL you found — do not fabricate URLs.
   - **Priority 3: User-suggested** — resources the user mentions in conversation. Add them to the task as-is with no prefix (the user vouched for them).
   - **Fast-moving topics exception:** For pillars like AI, current tech trends, or any topic where content goes stale quickly, prefer searched resources over curated even when curated entries exist. Curated AI resources from 6 months ago may already be outdated.
   - Resources marked `[unvetted]` in `curated-resources.md` are placeholders without verified URLs — treat them as Priority 2 (search for the actual URL before assigning).
   - **Priority 4: Search suggestion** — when the agent can't find a specific high-quality resource but knows the topic is important, provide a search query instead of a link. Format the task with URL set to `N/A` and Resource as: `🔍 Search: "[exact query]" on [platform]`. Use sparingly — this is a fallback, not a default. Most common for: niche topics, company-specific interview prep, content that changes weekly (AI news, new framework releases).

6. **URL handling** — for curated resources, use the URL from `curated-resources.md`. For searched resources, use the URL you found during search. For search suggestion tasks (Priority 4), set URL to `N/A` — the search query in the resource name IS the guidance. For self-guided tasks or tasks without a specific URL (e.g., "draft STAR stories"), set URL to `N/A`. Never fabricate URLs — if you can't find a working URL, use a search suggestion (Priority 4) instead.

7. **No repeats within a week** — don't assign the same resource twice in one week. Check previous weeks too — avoid re-assigning resources the user already completed (check `memory/history.md`).

8. **Platform preferences** — respect platform ratings from `resource-feedback.md`. If the user rated a platform "didn't click" multiple times, avoid it.

**Step 4: Write to file**

Write to `memory/plan-tasks/week-{N}.md` using the exact table format from the template. Every task row must have all fields filled.

**Step 5: Update plan**

Increment current week in `memory/current-plan.md` if generating a new week (not the first week).

### Mode: daily_message

Compose and send the daily Discord message. This is the user-facing output.

**Step 1: Check preconditions**

- Is today a day off? If yes, don't send (or send a brief "enjoy your day off" if the user has a streak going)
- Is it within quiet hours? If yes, delay until quiet hours end
- Does today have tasks? If the week file is empty or all tasks are done, trigger mode: `weekly` first

**Step 2: Read today's tasks**

Pull today's tasks from `memory/plan-tasks/week-{N}.md`.

**Step 3: Check spaced repetition**

Read `memory/spaced-repetition.md`. If a concept is due for review today, include one review question in the message. Only one per day — don't overwhelm.

**Step 4: Add context**

- Reference yesterday's progress if relevant:
  - Streak going? → "That's [N] days in a row now."
  - Missed yesterday? → "Let's pick up where you left off." (no guilt)
  - Completed everything? → "Clean sweep yesterday — nice."
- Connect at least one task to the dream career: "This matters because [dream role] requires [skill], and [task] builds exactly that."
- If the user has resume context, reference their background: "You've worked with [tech from resume] before — this builds on that foundation."

**Step 5: Format the message**

Strip `[searched]` and `[unvetted]` prefixes from resource names before composing the Discord message — those tags exist for internal tracking in the task file, not for the user. The user should see clean resource names.

Keep it concise — 5-8 lines max for normal verbosity. Adjust based on `config/settings.md` verbosity setting:

| Verbosity | Message style |
|-----------|--------------|
| concise | Task list only, no commentary |
| normal | Task list + 1-2 lines of context/motivation |
| detailed | Task list + context + dream career connection + streak info + review question |

**Step 6: Send via Discord**

Send the formatted message to the configured Discord channel.

## Task format

Each task in the weekly file must include all these fields:

| Field | Description | Examples |
|-------|-------------|----------|
| # | Task number for the day | 1, 2, 3 |
| Action | Verb describing what to do | "Read", "Practice", "Watch", "Build", "Complete", "Review" |
| Resource | Specific resource name | "Python decorators deep dive", "LeetCode #206 Reverse Linked List" |
| Platform | Where the resource lives | "Real Python", "LeetCode", "YouTube", "freeCodeCamp", "Coursera" |
| URL | Direct link to the resource | Full URL (from curated-resources.md or known) |
| Est. time | How long it should take | "15 min", "20 min", "45 min", "1 hr" |
| Pillar | Which skill pillar this serves | "Python", "DSA", "System Design", "Databases" |
| Type | Affects teach-back eligibility | "conceptual" or "practice" |
| Status | Current state | "pending", "done", "skipped", "partial" |

## Example daily message (normal verbosity)

```
Morning! Here's your plan for today:

1. 📖 Read: Python decorators deep dive (Real Python) [link] ~20min
2. 💻 Practice: 2 medium LeetCode problems on trees [link] ~40min
3. 🎥 Watch: System design — load balancers (YouTube) [link] ~15min

🔄 Quick review: What's the difference between a stack and a queue?

Yesterday you finished the SQL section — that's 8 days in a row now.
The tree problems build directly on the recursion you practiced last
week. This is core for [dream role] interviews.
```

## Example daily message (concise verbosity)

```
Today's tasks:

1. 📖 Python decorators (Real Python) ~20min
2. 💻 LeetCode trees x2 ~40min
3. 🎥 Load balancers (YouTube) ~15min

🔄 Review: stack vs. queue?
```

## Example full_plan output

After running mode: `full_plan`, `memory/current-plan.md` should look like:

```markdown
# Current Learning Plan

## Plan Info

- **Created:** 2026-03-16
- **Current week:** 1
- **Total weeks:** 8
- **Plan type:** learning

## Pillars

| Pillar | Level | Blocks at level | Weight |
| ------ | ----- | --------------- | ------ |
| Backend Architecture | 1 | 0/5 | 30% |
| Databases | 2 | 0/5 | 25% |
| System Design | 1 | 0/5 | 30% |
| Testing | 1 | 0/5 | 15% |

## Portfolio Projects

(none yet)
```

## Example weekly output

`memory/plan-tasks/week-01.md` after generation:

```markdown
# Week 1 Tasks

## Monday

| # | Action | Resource | Platform | URL | Est. time | Pillar | Type | Status |
|---|--------|----------|----------|-----|-----------|--------|------|--------|
| 1 | Read | REST API design principles | Real Python | [url] | 25 min | Backend Architecture | conceptual | pending |
| 2 | Practice | SQL joins exercises | Mode Analytics | [url] | 20 min | Databases | practice | pending |
| 3 | Watch | System design intro — scalability | YouTube | [url] | 15 min | System Design | conceptual | pending |

## Tuesday

| # | Action | Resource | Platform | URL | Est. time | Pillar | Type | Status |
|---|--------|----------|----------|-----|-----------|--------|------|--------|
| 1 | Complete | Express.js routing tutorial | freeCodeCamp | [url] | 30 min | Backend Architecture | practice | pending |
| 2 | Read | Database indexing explained | Use The Index, Luke | [url] | 20 min | Databases | conceptual | pending |

## Wednesday

...

## Sunday

(day off)
```

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Daily-plan-specific:**
- Couldn't find any suitable resource for a pillar/level combo after exhausting all 4 priority tiers (log the pillar, level, and what you tried)
- The time flexibility rule (50% over budget) was used — log which resource and why it justified exceeding the daily budget
- A ramp-up rule (Week 1 gentle start) felt too aggressive or too gentle for this specific user (log the user's profile and what felt off)

## Edge cases

- **No curated resources for a pillar/level:** Fall back to Priority 2 (web search). Mark the resource `[searched]` in the task file. The resource-feedback skill will collect ratings, and resources rated "great" 3 times get promoted to curated automatically.
- **User completes all tasks early:** Generate the next week immediately. Don't make them wait.
- **User hasn't done any tasks for 3+ days:** Don't generate a new week. The check-in and adaptation skills handle this — daily-plan just generates and sends.
- **Interview prep mode:** When `plan type` is `interview_prep` in `memory/current-plan.md`, daily-plan operates differently:

  **What changes in weekly mode:**
  - Read `memory/interview-context.md` for target company, role, format, requirements, and days until interview
  - Pillars are remapped by interview-prep — use the weights from current-plan.md (already adjusted)
  - Task types shift toward interview practice: behavioral prep (STAR story review, practice delivery), product/technical cases, company research, mock interview sessions, targeted skill practice
  - Timeline is compressed — generate only enough days to reach the interview date, not a full 8-week plan
  - No ramp-up: start at full intensity from Day 1 (the user chose interview prep, they're motivated)
  - Include at least 1 mock interview task in the first week and another in the week before the interview

  **What changes in daily_message mode:**
  - Include countdown: "Interview in [X] days. Today's focus: [area]."
  - Connect tasks to interview readiness, not dream career: "This product case practice maps directly to StreamCo's Round 2 format"
  - If interview is 3 or fewer days away: shift tone to confidence-building, reduce task count, focus on review not new material. "You've put in the work. Trust your prep."
  - SRS burst: if spaced-repetition has role-relevant concepts marked as due, include up to 2 review questions (not the usual 1) in the first few days

  **What changes in full_plan mode:**
  - interview-prep.md handles the crash course plan generation and writes to current-plan.md
  - daily-plan's full_plan mode should check plan type — if interview_prep, defer to interview-prep.md for plan structure. Daily-plan still handles weekly task generation and daily messages within that structure.

  See `skills/interview-prep/SKILL.md` for activation flow, onboarding, and crash course task type definitions.
- **Spaced repetition queue is long:** Still only include 1 review per daily message. The SRS skill manages the queue — daily-plan just surfaces what's due today.
- **First week after onboarding:** Start gently. Ramp up over the first 3-4 days:
  - Day 1-2: 1 task per day at normal length (not half-length — just fewer tasks). For 30min users this means 1 task at ~25-30min, not a 15min task.
  - Day 3-4: normal task count but pick easier/shorter resources
  - Day 5+: full commitment and normal difficulty
  The goal is habit-building through consistency, not reduced effort. One real task is better than a half-task that feels pointless.
