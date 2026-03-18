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

5. **Resource selection** — four priority tiers (search-first approach):
   - **Priority 1: Search suggestions (DEFAULT)** — the primary delivery method. The agent crafts a good search query, the user picks the best resource themselves. Format: `Search: "[topic] [level] tutorial" on YouTube` or `Search: "[topic] practice problems" on LeetCode`. This produces better results than curated links because: users pick resources that match their learning style, no hallucinated or stale URLs, and users develop resource-finding skills. **YouTube dominance:** 50-60% of search suggestions should target YouTube — it has the widest coverage and users can preview before committing.
   - **Priority 2: Curated gold-standard** — use ONLY for resources in `resources/curated-resources.md` that are genuinely vetted and confirmed excellent. These are the "we know this one is gold" entries. Don't default to curated just because an entry exists — a good search suggestion often beats a mediocre curated link.
   - **Priority 3: User-preferred platforms** — resources or platforms the user has told the agent they like (tracked in `resource-feedback.md`). "You said you like freeCodeCamp for Python — search there for decorators."
   - **Priority 4: Platform discovery** — for skills with well-known free platforms (coding: LeetCode, HackerRank, Exercism, Codewars; SQL: SQLBolt, Mode Analytics, HackerRank SQL; data: Kaggle), suggest 2-3 free platforms and ask the user to try one and report back. "Find a free interactive SQL trainer you like — popular options: SQLBolt, Mode Analytics, HackerRank SQL. Try one this week and tell me which clicks." Use in the first 1-2 weeks for practice-type tasks.
   - **Banned platforms:** Never recommend paid or paywalled platforms: Udemy, Coursera, edX, LinkedIn Learning, Pluralsight, DataCamp, Codecademy Pro. Free tiers of otherwise-paid platforms are fine if the free content is substantial.
   - **Fast-moving topics exception:** For pillars like AI, current tech trends, or any topic where content goes stale quickly, always use search suggestions (Priority 1) — curated resources for these topics go stale within months.

6. **Search query quality** — search suggestions are only as good as the query. Craft specific, level-appropriate queries:
   - Include the topic AND the level: "python decorators beginner tutorial" not just "python decorators"
   - Include the format when relevant: "SQL joins visual explanation" for conceptual, "SQL joins practice exercises" for practice
   - Never name specific creators or channels — let the user pick
   - For YouTube: add "tutorial", "explained", or "crash course" to improve results
   - For practice platforms: add "free", "interactive", or "exercises"

7. **URL handling** — most tasks will have no URL (search suggestions are the default). Only Priority 2 curated gold-standard resources have URLs. For self-guided tasks (e.g., "draft STAR stories"), leave the Search field as `N/A`. Never fabricate URLs.

8. **No repeats within a week** — don't assign the same resource or search query twice in one week. Check previous weeks too — avoid re-assigning topics the user already completed (check `memory/history.md`).

9. **Platform preferences** — respect platform ratings from `resource-feedback.md`. If the user rated a platform "didn't click" multiple times, avoid it.

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

## Task format

Each task in the weekly file must include all these fields:

| Field | Description | Examples |
|-------|-------------|----------|
| # | Task number for the day | 1, 2, 3 |
| Action | Mini learning objective — what to learn/do, not just a verb. For conceptual tasks, include a self-check question: "After this, you should be able to answer: [question]" | "Learn Python decorators — what they are, when to use them, how to write a simple one. Self-check: What's the difference between @decorator syntax and calling the decorator function directly?" |
| Search | Search suggestion (default) or curated URL. Format: `Search: "[query]" on [platform]`. For curated gold-standard resources, use the actual URL. For self-guided tasks, use `N/A`. | `Search: "python decorators explained beginner" on YouTube` |
| Platform | Where the user should search or the curated resource lives | "YouTube", "LeetCode", "freeCodeCamp", "HackerRank" |
| Size | Task size — only three values allowed | Short (~20min), Medium (~40min), Long (~60min) |
| Pillar | Which skill pillar this serves | "Python", "DSA", "System Design", "Databases" |
| Type | Affects teach-back eligibility + task delivery | "conceptual", "practice", or "practice_prompt" |
| Why | Dream career connection (1 sentence) | "Decorators are table stakes for Python frameworks used at [dream career] companies" |
| Status | Current state | "pending", "done", "skipped", "partial" |

### Task types

- **conceptual** — learning tasks: reading, watching, studying. Eligible for teach-back prompts (~1 in 3). Always include a self-check question in the Action field.
- **practice** — hands-on tasks: coding, building, exercises on external platforms. Not eligible for teach-back (they're already active recall).
- **practice_prompt** — the task IS a question the user answers in conversation. No external resource needed. The agent asks the question, evaluates the response using the teach-back evaluation table (strong/partial/can't explain/skipped), gives feedback, and marks done/partial. Platform = "ProngAgent", Search = `N/A`. Format the Action as: "Practice prompt: [question]. Reply when ready." Frequency: 1-2 per week for regular plans, 2-3 per week for crash courses. Mix across pillars. These are NOT eligible for additional teach-back (they already are active recall).

## Example daily message (normal verbosity)

```
Morning! Here's your plan for today:

1. 📖 Learn Python decorators — what they are, when to use them, how
   to write a simple one. Search: "python decorators explained beginner"
   on YouTube [Short]
   Self-check: What's the difference between @decorator and calling the function directly?

2. 💻 Practice tree traversal — BFS vs DFS, when to use each.
   Search: "binary tree traversal practice problems" on LeetCode [Medium]
   Decorators are table stakes for Python frameworks used at [dream career] companies.

3. ❓ Practice prompt: Explain the difference between a stack and a queue.
   Give a real-world example of when you'd use each. Reply when ready. [Short]

🔄 Quick review: What does Big O notation tell you about an algorithm?

Yesterday you finished the SQL section — that's 8 days in a row now.
The tree problems build directly on the recursion you practiced last week.
```

## Example daily message (concise verbosity)

```
Today's tasks:

1. 📖 Python decorators — Search: "python decorators explained beginner" on YouTube [Short]
2. 💻 Tree traversal — Search: "binary tree BFS DFS practice" on LeetCode [Medium]
3. ❓ Practice prompt: stack vs. queue — explain + real-world example [Short]

🔄 Review: What does Big O notation tell you?
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

| # | Action | Search | Platform | Size | Pillar | Type | Why | Status |
|---|--------|--------|----------|------|--------|------|-----|--------|
| 1 | Learn REST API design principles — request/response cycle, HTTP methods, status codes. Self-check: When would you use PUT vs PATCH? | Search: "REST API design principles beginner" on YouTube | YouTube | Short | Backend Architecture | conceptual | API design is the foundation of every backend role | pending |
| 2 | Practice SQL joins — INNER, LEFT, RIGHT, FULL OUTER with real data | Search: "SQL joins practice exercises free" on SQLBolt | SQLBolt | Medium | Databases | practice | Every data-touching role requires fluent SQL joins | pending |
| 3 | Practice prompt: Explain scalability — what does it mean for a system to "scale horizontally" vs "vertically"? Give an example of each. Reply when ready. | N/A | ProngAgent | Short | System Design | practice_prompt | System design questions come up in every senior interview | pending |

## Tuesday

| # | Action | Search | Platform | Size | Pillar | Type | Why | Status |
|---|--------|--------|----------|------|--------|------|-----|--------|
| 1 | Learn Express.js routing — how routes, middleware, and request handlers work together. Self-check: What's the difference between app.use() and app.get()? | Search: "express.js routing tutorial beginner" on YouTube | YouTube | Medium | Backend Architecture | conceptual | Express is the most common Node.js framework in production | pending |
| 2 | Learn database indexing — what indexes do, when to add them, and the tradeoff with write speed. Self-check: Why might adding an index slow down INSERT operations? | Fundamentals of Database Indexing | Use The Index, Luke | Medium | Databases | conceptual | Query optimization separates junior from senior DB work | pending |

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
