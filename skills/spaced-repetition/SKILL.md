---
name: prongagent-spaced-repetition
description: "Review scheduling and retention tracking with spacing algorithm"
tags: [learning, retention, review]
user-invocable: false
metadata:
  openclaw:
    emoji: "🔄"

---

# Spaced Repetition Skill

## When to trigger

Two activation paths:

**1. QUEUE MANAGEMENT** — runs daily before `daily_message` mode in the daily-plan skill.
- Checks what concepts are due for review today
- Prepares one review question and writes it to the Review Queue in `memory/spaced-repetition.md`
- The daily-plan skill reads the Review Queue and embeds the question in the daily message
- This is the primary trigger — it's how review questions reach the user

**2. RESPONSE PROCESSING** — after the user answers a review question.
- The user's answer arrives through check-in (most common — they respond in the evening) or direct conversation
- Evaluates the answer as correct or wrong
- Updates the concept's interval and next review date in `memory/spaced-repetition.md`

## What to read

| File | What to look for |
|------|-----------------|
| `memory/spaced-repetition.md` | Active Review Items table (due dates, consecutive correct, status), Retired table, Review Queue |
| `memory/user-profile.md` | Dream career, target role (for framing review questions) |
| `memory/user-model.md` | Knowledge Anchors (for framing review questions using analogies that work), Communication Style (for question tone) |
| `memory/concept-links.md` | Use `builds-on` and `applies-to` connections to add context to review questions — instead of testing a concept in isolation, reference a connected concept: "When you used GROUP BY last week, what would a window function let you do differently?" |
| `memory/current-plan.md` | Pillar levels (for calibrating question difficulty) |
| `memory/progress.md` | Teach-back log (cross-reference — avoid reviewing a concept teach-back already covered today) |
| `config/settings.md` | Spaced repetition frequency (default: 1 review per day max) |

## What to write

| File | When |
|------|------|
| `memory/spaced-repetition.md` | Every run — update Active Review Items (intervals, dates, consecutive correct), move concepts to Retired when mastered, update Review Queue daily |
| `memory/progress.md` | Optionally — note in Teach-Back Log if a review revealed a gap worth cross-referencing |

---

## Skill files

| File | When to use |
|------|------------|
| `scripts/srs-calculator.ts` | Step 1 of queue management — run this to get due/overdue concepts |

### scripts/srs-calculator.ts

**What it does:** Reads spaced-repetition.md, calculates which concepts are due/overdue today.

**Usage:** `bun run skills/spaced-repetition/scripts/srs-calculator.ts <path-to-spaced-repetition.md> [today-date]`

- `path-to-spaced-repetition.md` — typically `memory/spaced-repetition.md`
- `today-date` — YYYY-MM-DD (defaults to today if omitted)

**Output:**
```
due_count: 3
overdue_count: 1

## Due Concepts (priority order)
| Concept | Pillar | Next review | Days overdue | Consecutive correct | Status |
...
```

Concepts are sorted by priority: overdue first (most overdue at top), then by lowest consecutive correct count.

**Why scripted:** Date comparison and interval calculation across multiple table rows should be deterministic.

---

## Queue management (daily, before daily message)

### Step 1: Calculate due concepts

Run `scripts/srs-calculator.ts` to get the due/overdue list:

```bash
bun run skills/spaced-repetition/scripts/srs-calculator.ts "memory/spaced-repetition.md"
```

Use the output to determine what's due. If `due_count: 0` → write nothing to Review Queue. The daily message will skip the review section.

### Step 2: Pick the highest-priority item

If multiple items are due or overdue, pick ONE using this priority:

1. **Overdue items first** — the most overdue item (oldest "Next review" date) gets priority
2. **Among same-day items:** lowest "Consecutive correct" wins — these are the most fragile concepts and most likely to decay
3. **Among ties:** pick the concept most relevant to the user's dream career (read `memory/user-profile.md` → Target role)

Only 1 review per day max. If multiple items are due, pick the most urgent one. The rest will still be due tomorrow (or remain overdue) and will be picked up naturally.

### Step 3: Check for teach-back conflict

Read `memory/progress.md` → Teach-Back Log. If the selected concept was already covered by a teach-back today, skip SRS for today. Teach-back is a richer interaction — SRS defers to it.

If the selected concept conflicts, pick the next highest-priority item from Step 2. If all due items conflict with teach-back, skip the review for today.

### Step 4: Formulate the review question

Write a 1-sentence question for the selected concept. Follow these rules:

**Keep it short.** The user should be able to answer in 1-2 sentences. This is a quick check, not an exam.

**Make it practical, not abstract:**
- Good: "When would you use a LEFT JOIN instead of an INNER JOIN?"
- Bad: "Define LEFT JOIN."
- Good: "A product manager asks you to measure engagement on a new feature. What's the first metric you'd look at and why?"
- Bad: "What is a product metric?"

**Calibrate to the concept's pillar level** (from `memory/current-plan.md`):

| Level | Question style |
|-------|---------------|
| 1 | "What is X?" / "What does X do?" |
| 2 | "How does X relate to Y?" / "What's the difference between X and Y?" |
| 3 | "When would you use X instead of Y?" |
| 4 | "What are the tradeoffs of X in scenario Z?" |
| 5 | "Explain X to someone who's never seen it" |

**Reference dream career when natural.** Use the target role from `memory/user-profile.md`:
- "As a [target role], when would you reach for X over Y?"
- Only when the connection is genuine — don't force it.

**Vary the question format.** If the same concept has been reviewed before, don't ask the exact same question. Rotate between:
- "What is the difference between X and Y?"
- "When would you use X?"
- "Give a quick example of X in practice"
- "Why does X matter for [pillar]?"

Check the Review Queue history — if the previous question for this concept is visible, ask a different angle.

### Step 5: Write to Review Queue

Update the `## Review Queue (tomorrow)` section in `memory/spaced-repetition.md`:

```markdown
## Review Queue (tomorrow)

1. [Concept name] — "[The review question]"
```

If nothing is due, clear the queue:

```markdown
## Review Queue (tomorrow)

(nothing due)
```

The daily-plan skill's `daily_message` mode reads this section and embeds the question in the message as:

```
🔄 Quick review: [question text]
```

---

## Response processing (after user answers)

### Step 1: Identify the concept

Match the user's response to the review question that was in today's daily message. The question is in the Review Queue — read it to know which concept was asked.

### Step 2: Evaluate the response — binary (correct or wrong)

SRS evaluation is simpler than teach-back. Two outcomes only:

| Evaluation | Criteria |
|------------|----------|
| **Correct** | Clear, accurate explanation. Doesn't need to be perfect — if the user demonstrates they understand the concept, it's correct. Minor imprecision is fine. |
| **Wrong/skipped** | Blank, "I don't know", fundamentally incorrect, or the user skipped/ignored the review question entirely. Vague non-answers ("something about data?") count as wrong. |

Do NOT use the 4-category teach-back evaluation (strong/partial/can't explain/skipped). SRS is binary. Keep it simple.

### Step 3: Apply the spacing algorithm

Look up the concept's current interval (time since "Last reviewed" to "Next review") and apply:

| Current interval | If correct | If wrong/skipped |
|------------------|-----------|-----------------|
| 3 days | Next review in 1 week | Next review in 3 days |
| 1 week | Next review in 2 weeks | Next review in 1 week |
| 2 weeks | Next review in 1 month | Next review in 1 week |
| 1 month | Next review in 3 months | Next review in 2 weeks |
| 3+ months | Retire (mastered) | Next review in 1 month |

**For new concepts** (first review, no previous interval): treat as "3 days" row — if correct, next review in 1 week; if wrong, next review in 3 days.

**Interval matching:** Match the concept's current interval to the closest row. For example:
- 4 days → use the "3 days" row
- 10 days → use the "1 week" row
- 3 weeks → use the "2 weeks" row
- 6 weeks → use the "1 month" row
- 2+ months → use the "3+ months" row

### Step 4: Update Active Review Items

In `memory/spaced-repetition.md`, update the concept's row:

- **Last reviewed:** today's date
- **Next review:** calculated from Step 3
- **Consecutive correct:**
  - If correct: increment by 1
  - If wrong/skipped: reset to 0
- **Status:** update based on state:
  - Consecutive correct = 0 → "Reinforcing"
  - Consecutive correct 1-2 → "On track"
  - Consecutive correct 3-4 → "Spacing out"
  - Consecutive correct 5+ → "Nearly mastered"

### Step 5: Brief acknowledgment

Keep the response minimal — this is a quick check, not a teaching moment:

| Result | Response |
|--------|----------|
| Correct | "Solid." / "Locked in." / "That's right." — one line, then move on |
| Wrong/skipped | "Not quite — [1-sentence clarification]. I'll bring this back in a few days." |

If the user got it wrong, give the correct answer in ONE sentence. Don't lecture. The next review will reinforce it.

### Step 6: Cross-reference (optional)

If a review reveals a significant gap (user was confident but wrong, or can't recall a concept they previously answered correctly):
- Note it in `memory/progress.md` → Teach-Back Log with trigger: "SRS review"
- This helps the adaptation skill detect concepts that aren't sticking despite being reviewed

---

## Concept lifecycle

### Entry

Concepts enter the Active Review Items table from two sources:

**1. From teach-back** (most common):
- The teach-back skill adds concepts after evaluation
- Initial interval depends on teach-back response quality:
  - Strong → next review in 7 days
  - Partial → next review in 3-5 days
  - Can't explain → next review in 3 days
- Teach-back writes the entry — this skill doesn't need to add it

**2. From completed skill blocks:**
- When the user completes a block of tasks in a pillar (5 tasks → level up), the agent picks 1-2 core concepts from that block
- Only pick CONCEPTUAL topics, not practice exercises
- Initial interval: 3 days (first review)
- Consecutive correct: 0
- Status: "Reinforcing"

**What does NOT enter SRS:**
- Practice problems (LeetCode solutions, coding exercises) — these are skills, not concepts
- Resources or platforms — SRS is for knowledge, not "did you like Real Python"
- Anything the user skipped during teach-back — no data to act on

### Active

The concept lives in the Active Review Items table. It gets reviewed on schedule. Each correct answer advances the interval; each wrong answer compresses it.

### Retiring

A concept is eligible for retirement when BOTH conditions are met:
- Consecutive correct ≥ 5
- Current interval is 3+ months (the last spacing was at least 3 months out)

When both conditions are met AND the user answers correctly on the current review:
- Move the concept from Active Review Items to the Retired table
- Record: Concept, Pillar, Date mastered (today), Total reviews (count all reviews from when it entered Active)

### Retired

Mastered concepts stay in the Retired table for reference. They are NOT reviewed unless interview prep re-activates them (see edge cases).

---

## Example: queue management output

After running queue management for a user with 3 active concepts:

Active Review Items (before):

| Concept | Pillar | Last reviewed | Next review | Consecutive correct | Status |
|---------|--------|---------------|-------------|---------------------|--------|
| LEFT JOIN vs INNER JOIN | SQL & Data Analysis | 2026-03-10 | 2026-03-17 | 2 | On track |
| Product metrics vs business metrics | Product Sense | 2026-03-13 | 2026-03-16 | 0 | Reinforcing |
| STAR format structure | Behavioral | 2026-03-05 | 2026-03-19 | 3 | Spacing out |

Today is 2026-03-16. Due items: "Product metrics vs business metrics" (due today). "LEFT JOIN vs INNER JOIN" is due tomorrow, not today.

Review Queue output:

```markdown
## Review Queue (tomorrow)

1. Product metrics vs business metrics — "A PM asks you to track the success of a new feature. Give one example of a product metric and one business metric you'd look at."
```

## Example: response processing

```
Daily message includes:
🔄 Quick review: A PM asks you to track the success of a new feature.
   Give one example of a product metric and one business metric you'd look at.

User: "Product metric would be like daily active users on the feature,
       business metric would be revenue impact or conversion rate."

Agent: "Solid. Logged."
```

Processing:
- Evaluation: Correct (clear, accurate, gives concrete examples)
- Current interval: 3 days (last reviewed 2026-03-13, was due 2026-03-16)
- If correct at 3-day interval → next review in 1 week
- Update: Last reviewed = 2026-03-16, Next review = 2026-03-23, Consecutive correct = 1, Status = "On track"

## Example: wrong answer

```
🔄 Quick review: What's the difference between a LEFT JOIN and an INNER JOIN?

User: "Uh... LEFT JOIN gets everything from the left table and INNER JOIN
       gets everything from both? Something like that."

Agent: "Close but not quite — INNER JOIN returns only rows that match in
       both tables, LEFT JOIN returns all rows from the left table plus
       matches from the right (NULLs where there's no match). I'll bring
       this back in a few days."
```

Processing:
- Evaluation: Wrong (vague, missing the key distinction about NULL behavior)
- Current interval: 2 weeks (last reviewed 2026-03-03, next was 2026-03-17)
- If wrong at 2-week interval → next review in 1 week
- Update: Last reviewed = 2026-03-16, Next review = 2026-03-23, Consecutive correct = 0, Status = "Reinforcing"

---

## Edge cases

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- The spacing intervals don't feel right for a specific concept — advancing too aggressively (user keeps getting it wrong at longer intervals) or too lazily (user nails it every time at short intervals) (log the concept and its review history)
- Queue is growing faster than the 1-per-day cap can service — many items are becoming overdue and the backlog is building (log the queue size and how long items have been overdue)
- A concept keeps bouncing between "correct" and "wrong" without converging — consecutive correct resets repeatedly (log the concept and its pattern over 4+ reviews)

---
### Queue is empty (no concepts tracked yet)
Nothing to review. Don't write anything to the Review Queue. The daily message skips the review section entirely. This is normal for the first 1-2 weeks before teach-backs generate SRS entries.
### Queue has 10+ overdue items
Don't try to catch up. Pick the 1 most important item (highest priority per Step 2) and review it. The rest stay overdue and will be picked up one per day. They'll naturally spread out as they get reviewed and rescheduled.
### Same concept reviewed by both SRS and teach-back in the same day
SRS defers to teach-back. If a teach-back prompt already covered this concept today (check `memory/progress.md` → Teach-Back Log for today's date), skip the SRS review for this concept. Teach-back is a richer, multi-turn interaction — SRS shouldn't duplicate it.
During queue management (Step 3): if the concept selected for today's review was already teach-backed today, pick the next item instead.
During response processing: if the user's check-in references both a teach-back response and an SRS response for the same concept, only process the teach-back. The teach-back skill will update `memory/spaced-repetition.md` with the appropriate interval.
### User never answers review questions (always skips)
Track consecutive skips across ALL concepts (not per-concept). Count any review question that appears in the daily message but gets no response during check-in.
After 5 consecutive skips across any concepts:
- Reduce review frequency from 1 per day to 1 per week
- Note the change in `config/settings.md` under Frequencies: `Spaced repetition: 1 review per week (reduced — 5 consecutive skips)`
- If the user starts answering again (2+ correct answers), restore to 1 per day
### Concept is from a pillar the user is no longer studying
Keep reviewing it. Foundational knowledge shouldn't decay just because the plan shifted focus. The concept follows the normal retirement path — it only leaves Active Review Items through mastery (5+ consecutive correct at 3+ month interval), not through plan changes.
### Interview prep activates
When `memory/current-plan.md` → Plan type changes to `interview_prep` or `memory/interview-context.md` has a target date:
**Active items:** Pull all Active Review Items relevant to the target role to "due today" regardless of their scheduled Next review date. "Relevant" = the concept's pillar matches one of the interview prep pillars, OR the concept directly relates to the target role's core competencies.
**Retired items:** Pull relevant Retired items back into the Active Review Items table:
- Set Next review = today
- Set Consecutive correct = 0
- Set Status = "Refreshing"
- Set Last reviewed to their original "Date mastered" (so interval calculation works correctly on the next review)
This is a one-time pull — after the initial activation, concepts follow the normal spacing algorithm again. The increased frequency comes from having more items due at once, not from changing the algorithm.
### Concept already exists in Active Review Items
When teach-back or block completion tries to add a concept that's already in the table:
- Do NOT add a duplicate row
- Update the existing entry: set Last reviewed to today, recalculate Next review based on the new response quality, adjust Consecutive correct accordingly
### First concept enters the system
When the first concept is added (usually from the first teach-back), the next queue management run will find it. If it's due, it'll be queued for the daily message. No special handling needed — the system bootstraps naturally.
### User answers review question outside of check-in
If the user responds to a review question directly (not during evening check-in), process it immediately. Don't wait for check-in. Update `memory/spaced-repetition.md` right away.
### Multiple concepts due but only 1 review allowed
This is normal operation, not an edge case. Always pick the highest-priority item per Step 2. The unreviewed items stay at their current "Next review" date — they'll be overdue tomorrow and get higher priority then.
