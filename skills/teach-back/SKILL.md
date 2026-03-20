---
name: prongagent-teach-back
description: "Active recall prompts and level-up gate evaluation"
tags: [learning, assessment, recall]
user-invocable: true
metadata:
  openclaw:
    emoji: "🧠"
---

# Teach-Back Skill

## When to trigger

Three activation paths:

**1. SCHEDULED** — after check-in flags a completed conceptual task as teach-back eligible.
- Frequency: ~1 in 3 conceptual tasks (controlled by `config/settings.md` → Frequencies → Teach-back)
- Only for tasks with Type = "conceptual" that the user completed (status: "done")
- Maximum 1 scheduled teach-back per day
- Do NOT trigger during another conversation — queue it for the next interaction
- Do NOT trigger on practice tasks (LeetCode, coding exercises, etc.) — those are already active recall
- Do NOT trigger on practice_prompt tasks — those are already active recall evaluated during check-in

**2. LEVEL-UP GATE** — when check-in reports a pillar at 5/5 blocks at current level.
- This is mandatory, not probabilistic — the user MUST pass teach-back to level up
- Exempt from the 1-per-day limit (milestone-triggered, not scheduled)
- Takes priority over scheduled teach-back if both would fire

**3. REACTIVE** — when the user says they're confused about a topic.
- Instead of just giving the answer, ask what they DO understand, then fill the gap
- This is conversational — no formal evaluation logging unless the topic maps to a pillar concept

## What to read

- `memory/plan-tasks/week-{N}.md` — find the completed task's topic, pillar, level, resource
- `memory/current-plan.md` — pillar levels, blocks at level (detect 5/5 for level-up gate)
- `memory/progress.md` — teach-back log (check for duplicates, review history), pillar levels table
- `memory/history.md` — recent completions to pick teach-back topics
- `memory/user-profile.md` — dream career, target role (for contextualizing prompts)
- `memory/spaced-repetition.md` — check if concept already has an SRS entry (update, don't duplicate)
- `memory/adaptation-log.md` — check for repeated gate failures on same pillar
- `memory/user-model.md` — Knowledge Anchors (for analogies and framing), Communication Style (for prompt tone), Avoidance Patterns (handle gently if topic is one they dodge)
- `memory/concept-links.md` — use `contrasts` and `bridges-pillars` connections for cross-concept questions: "How does [concept A] relate to [concept B]?" These are higher-order questions that test real understanding.
- `config/settings.md` — teach-back frequency, verbosity

## What to write

- `memory/progress.md` — Teach-Back Log section (every teach-back, always)
- `memory/spaced-repetition.md` — new or updated SRS entry based on response quality
- `memory/current-plan.md` — update pillar level + reset blocks (only on successful level-up gate)
- `memory/progress.md` — Pillar Levels table (only on level-up)
- `memory/plan-tasks/week-{N}.md` — add reinforcement tasks (on partial or can't-explain)
- `memory/win-log/candidates.md` — flag surprisingly deep responses
- `memory/adaptation-log.md` — log if level-up gate fails twice for same pillar/level
- `config/settings.md` — reduce teach-back frequency if user skips 3+ times total
- `memory/user-model.md` — append observation to Observation Log: concept stickiness (which topics click fast vs. need multiple attempts), teaching ability (how clearly they explain), knowledge anchors (analogies they use spontaneously), teach-back comfort (do they engage or avoid?)
- `session-log.md` (this skill directory) — after execution if anything notable happened

## Session log

This skill maintains `session-log.md` in this directory. Read the last 5-10 entries at the start of every execution for continuity and self-improvement.

After execution, append an entry if anything notable happened. Don't log routine executions.

**What to log:**
- Which concepts were strong, which were weak, what follow-up helped
- "Explaining with analogies worked better than definitions for this user"
- Level-up gate outcomes and what made the difference

**Entry format:**
```markdown
### YYYY-MM-DD — [brief title]
- **Context:** [what triggered the skill]
- **Notable:** [what's worth remembering for next time]
- **User reaction:** [accepted / pushed back / modified / skipped]
```

**Archival:** If the log exceeds ~100 entries, summarize old entries into `session-log-archive.md` and start fresh.

## Formulating the teach-back prompt

### Make it specific and practical

Bad: "Explain decorators."
Good: "Explain what happens when you stack two decorators on the same function."

Bad: "What are SQL JOINs?"
Good: "You have a users table and an orders table. A user placed an order yesterday but another user hasn't ordered anything yet. What does a LEFT JOIN return vs an INNER JOIN?"

### Calibrate to pillar level

| Level | Cognitive depth | Prompt style | Example |
|-------|----------------|--------------|---------|
| 1 | Basic recall | "What is X?" | "What does GROUP BY do in SQL?" |
| 2 | Understanding | "How does X relate to Y?" | "How does a window function differ from GROUP BY?" |
| 3 | Application | "When would you use X instead of Y?" | "When would you use a CTE instead of a subquery?" |
| 4 | Analysis | "What are the tradeoffs of X vs Y in scenario Z?" | "Your query is slow on a 10M row table — when would you add an index vs restructure the query?" |
| 5 | Teaching | "Explain X to a junior who's never seen it" | "A new analyst asks you what a window function is — walk them through it with an example" |

### Use the user model for better prompts

Read `memory/user-model.md` before formulating:
- **Knowledge Anchors → Analogies that work:** If the user thinks in terms of cooking analogies, frame the teach-back using one: "Think of a database index like a recipe book's index — what happens when you add a new recipe?"
- **Communication Style → Prompt tone:** If the user prefers direct, skip the framing and just ask. If they engage more with context, add a brief setup.
- **Avoidance Patterns:** If the topic is one they've been dodging, be extra warm in the setup: "This one's tricky — no pressure, just tell me what you remember."
- If user-model.md is empty (early days), default to the standard prompt style below.

### Connect to dream career when natural

Use the user's target role from `memory/user-profile.md` to frame the ask:

> "As a [target role], you'd need to explain this in a [design review / stakeholder meeting / interview]. Give it a shot."

Only do this when the connection is genuine — don't force it.

### Keep the ask small

Always scope the expected response:
- "1-3 sentences"
- "In one sentence"
- "Quick — how would you explain this?"

This is a check, not an exam. Low friction = higher participation.

## Response evaluation

### STRONG — user explains correctly and clearly

The user gets the concept right and articulates it well. May include details beyond what was asked.

**Agent response:**
- Confirm briefly: "Solid. You nailed the core concept."
- Optionally add one enrichment detail they didn't mention — a related concept, edge case, or practical tip
- Keep acknowledgment to 1-2 sentences, not a lecture

**What to write:**
- `memory/progress.md` Teach-Back Log — log with response quality: Strong, gap: none
- `memory/spaced-repetition.md` — add concept at longest initial interval (next review in 1 week). If concept already exists in Active Review Items, update its "Last reviewed" to today and advance the interval per the spacing algorithm
- If the explanation was surprisingly deep (covered edge cases, made connections unprompted, or went beyond the level) → flag in `memory/win-log/candidates.md`

### PARTIAL — user gets the gist but misses key details or is vague

The user is in the right neighborhood but hasn't locked it in. They might confuse related concepts or give a surface-level answer.

**Agent response:**
- Ask ONE targeted follow-up to find the specific gap — don't re-ask the whole thing
  - "You've got the right idea. What happens when [specific scenario that tests the gap]?"
  - "Close — you're right about [X]. But what about [Y]?"
- After the follow-up (whether they get it or not), acknowledge what they got right and clarify the gap briefly
- Don't lecture — one sentence of clarification, then move on

**What to write:**
- `memory/progress.md` Teach-Back Log — log with response quality: Partial, specify the gap identified
- `memory/spaced-repetition.md` — add concept at medium interval (next review in 3-5 days). If concept already exists, reset interval to 3-5 days
- `memory/plan-tasks/week-{N}.md` — add a focused reinforcement task to the next available day. Use a DIFFERENT resource type than the original (video → article, article → interactive, etc.). Target the specific gap, not the whole topic

### CAN'T EXPLAIN — user draws a blank or is completely wrong

The user either says "I don't know" or gives an answer that shows fundamental misunderstanding.

**Agent response:**
- No judgment: "No worries, that one's tricky. I'll add a different resource on this topic — sometimes a second explanation clicks."
- Do NOT correct them in detail right now — that defeats the purpose. The reinforcement task will teach it
- Keep it warm and move on

**What to write:**
- `memory/progress.md` Teach-Back Log — log with response quality: Can't explain, note the gap
- `memory/spaced-repetition.md` — add concept at shortest interval (next review in 3 days). If concept already exists, reset interval to 3 days
- `memory/plan-tasks/week-{N}.md` — schedule a different resource on the same topic. Swap format from the original (video → interactive, article → video, etc.)
- Do NOT mark this as a failure anywhere — it's useful data, not a judgment

### SKIPPED / DECLINED — user says "not now", "skip", or ignores

The user doesn't want to do the teach-back right now.

**Agent response:**
- Respect it completely: "No problem."
- That's it. Don't explain why teach-back matters, don't try again in the same conversation

**What to write:**
- `memory/progress.md` Teach-Back Log — log with response quality: Skipped, no gap (no data)
- Do NOT add to `memory/spaced-repetition.md` — there's no data to act on
- Count total skips in the teach-back log. If the user has skipped 3+ times total across all teach-backs, reduce frequency in `config/settings.md` (e.g., "1 in 3" → "1 in 5")

### Special case: wrong but confident

User gives an incorrect answer but says it with certainty.

- Correct gently: "Close — you've got [X] right, but [Y] actually works differently. [brief clarification]."
- Treat as PARTIAL, not can't-explain — they have a mental model, it just needs adjustment
- The follow-up should target exactly where their model breaks

### Special case: user asks for a hint

- Give a small nudge (not the answer): "Think about what happens when [scenario]..."
- Let them try again
- Hint-assisted correct answer = PARTIAL at best, even if their final answer is correct
- Log as "Partial (hint-assisted)" in the teach-back log

### Special case: user answers with surprising depth

- Acknowledge it enthusiastically: "That's a really strong answer — you went deeper than I expected."
- Mark as STRONG
- Flag for `memory/win-log/candidates.md` — this shows genuine understanding

## Level-up gate

This is the most important function of this skill. The teach-back gate is the ONLY path to leveling up a pillar.

### When it triggers

Check-in marks a pillar at 5/5 blocks at its current level. The check-in skill flags this and tells the user: "I'll quiz you on the key concepts before leveling you up."

### How it works

**Step 1: Pick 1-2 core concepts from the current level**

Choose FUNDAMENTAL concepts, not obscure details. These should be things the user absolutely must understand before moving to the next level.

- Read the completed tasks for this pillar at this level from `memory/history.md` and `memory/plan-tasks/`
- Pick the 1-2 most important conceptual topics (skip practice-only tasks)
- If the pillar only had practice tasks at this level, pick the underlying concepts those practices tested

**Step 2: Ask the teach-back questions**

Can ask both questions in the same conversation turn:

> "Before I level you up in [pillar], quick check on the fundamentals:
>
> 1. [Question about concept A — calibrated to current level per the table above]
> 2. [Question about concept B]
>
> 1-2 sentences each is fine."

**Step 3: Evaluate**

| Result | Action |
|--------|--------|
| BOTH strong | Level up. Increment pillar level in `memory/current-plan.md`, reset blocks to 0/5. Update Pillar Levels table in `memory/progress.md`. Celebrate: "You just hit Level [N] in [pillar] — nice work." |
| ANY partial | Don't level up. Add reinforcement task for the weak concept. Tell user: "Almost there — [concept] needs a bit more work. I've added a focused task." Leave blocks at 5/5. |
| ANY can't-explain | Don't level up. Add a different resource for the weak concept. Tell user: "Not quite there yet on [concept] — I've added a different resource. We'll try again after you've gone through it." Leave blocks at 5/5. |

**Step 4: Handle repeated gate failures**

Track gate attempts per pillar/level in the teach-back log.

- If the gate fails TWICE for the same pillar at the same level:
  - Log in `memory/adaptation-log.md`: "Level-up gate for [pillar] Level [N] failed twice. Review whether resources at this level are teaching effectively or if the level threshold needs adjusting."
  - Do NOT keep retrying automatically — the adaptation skill should review the situation
  - The user can still attempt the gate again after completing the reinforcement tasks, but the adaptation skill may intervene first

## Teach-Back Log format

Append to the `## Teach-Back Log` section in `memory/progress.md`:

```markdown
### YYYY-MM-DD — [concept name] ([pillar] pillar, Level [N])

- **Trigger:** scheduled / level-up gate / reactive
- **Prompt:** [the question you asked]
- **Response quality:** Strong / Partial / Can't explain / Skipped
- **Gap identified:** [specific gap, or "none"]
- **Action taken:** [what you did — added SRS entry, added reinforcement task, leveled up, etc.]
```

For level-up gates, log each concept separately even if asked in the same turn.

### Auto-linking trigger

After every teach-back evaluation (regardless of response quality), trigger `skills/auto-linking/SKILL.md` silently. Teach-backs are especially valuable for auto-linking because:
- Strong responses may reveal connections the user made spontaneously
- Partial responses reveal gaps in the connection map
- The concept being tested + its pillar + level is high-quality input for building links

## Spaced repetition entry format

When adding to `memory/spaced-repetition.md`, use the Active Review Items table:

| Concept | Pillar | Last reviewed | Next review | Consecutive correct | Status |
|---------|--------|---------------|-------------|---------------------|--------|
| [concept name] | [pillar] | [today's date] | [calculated date] | [0 for new, or updated count] | [see below] |

**Initial intervals by response quality:**

| Response quality | Next review | Status |
|------------------|-------------|--------|
| Strong | today + 7 days | On track |
| Partial | today + 3-5 days | Reinforcing |
| Can't explain | today + 3 days | Reinforcing |

**If the concept already exists in the table:** Update "Last reviewed" to today, recalculate "Next review" based on the new response, and adjust "Consecutive correct" (increment on strong, reset to 0 on partial/can't-explain).

## Example: scheduled teach-back

```
Agent: "You finished that Product Sense Interview Framework video yesterday.
        Quick one: a PM asks you to improve Instagram's Explore page.
        What's the first thing you'd do before proposing any changes?
        One sentence."

User:  "I'd define the goal metric first — like what does 'improve' mean,
        is it engagement, discovery, or retention."

Agent: "Solid — defining the metric before solutioning is exactly right.
        One thing to add: after picking the metric, segment your users.
        'Improve for whom?' changes the answer completely. Logged."
```

## Example: level-up gate (pass)

```
Agent: "You've hit 5/5 blocks for SQL & Data Analysis at Level 2.
        Before I level you up, two quick checks:

        1. You have a users table and a large orders table.
           When would you use a subquery vs a JOIN to get each user's
           latest order? One sentence on the tradeoff.

        2. What does a window function let you do that GROUP BY can't?
           One sentence."

User:  "1. JOIN is usually faster for large tables since the optimizer
           handles it better, but a correlated subquery is cleaner when
           you only need one column from the related table.
        2. Window functions let you compute aggregates without collapsing
           rows — you keep the detail and the summary side by side."

Agent: "You just hit Level 3 in SQL & Data Analysis — nice work.
        Both answers were solid. Level 3 is where it gets practical —
        real queries, optimization, and messy data. See you tomorrow."
```

## Example: level-up gate (partial fail)

```
Agent: "You've hit 5/5 blocks for Product Sense at Level 1.
        Before I level you up:

        1. What's the difference between a product metric and a
           business metric? Give an example of each.

        2. A PM asks you to 'improve engagement' on a feature.
           What's the first question you'd ask before doing anything?"

User:  "1. Hmm... a product metric is like daily active users and a
           business metric is revenue? Not sure about the difference.
        2. I'd ask what they mean by engagement — clicks, time spent,
           or something else."

Agent: "Number 2 is spot on — clarifying the metric is exactly right.
        For number 1, you're close but the distinction is sharper than
        that. Almost there — the product vs business metric distinction
        needs a bit more work. I've added a focused task on that."
```

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Teach-back-specific:**
- The teach-back question didn't match what the resource actually taught (log the resource, what you asked, and what the resource covered — indicates a content mismatch)
- Level-up gate felt too easy or too hard for the pillar (log the pillar, level, questions asked, and user's response quality)
- User's response was hard to categorize — not clearly strong, partial, or can't-explain (log the response and what you chose)

## Edge cases

- **User gives a wrong but confident answer:** Correct gently ("Close — you've got [X] right, but [Y] actually works differently"). Treat as partial, not can't-explain. They have a mental model that needs adjusting, not building from scratch.

- **User asks for a hint:** Give a small nudge, not the answer. Let them try again. Hint-assisted response = partial at best, even if correct after the hint.

- **User answers with much more depth than expected:** Acknowledge enthusiastically, mark strong, flag for `memory/win-log/candidates.md`.

- **Level-up gate fails twice for same pillar/level:** Log for the adaptation skill in `memory/adaptation-log.md`. Don't keep retrying in a loop — let adaptation review whether the resources or thresholds need adjusting.

- **Practice tasks (LeetCode, coding exercises, etc.):** NEVER trigger teach-back on these. They're already active recall by nature.

- **Practice prompt tasks:** NEVER trigger teach-back on these. They are already evaluated as active recall during check-in. The check-in skill handles response evaluation and SRS entry for practice_prompt tasks.

- **Maximum 1 scheduled teach-back per day:** Level-up gates are exempt from this limit since they're triggered by a milestone.

- **User is in the middle of another conversation:** Don't interrupt with teach-back. Queue it for the next interaction.

- **Concept already in `memory/spaced-repetition.md`:** Update the existing entry's interval and review date rather than adding a duplicate row.

- **No conceptual tasks completed recently:** Don't force a teach-back. Wait until there's something meaningful to ask about.

- **User declined onboarding or has sparse profile:** Still trigger teach-back, but skip the dream-career framing. Use generic prompts.

- **Multiple concepts eligible:** Pick the most recently completed one for scheduled teach-back. For level-up gates, pick the 1-2 most fundamental concepts regardless of recency.
