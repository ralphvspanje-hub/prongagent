---
name: prongagent-weekly-review
description: "Weekly narrative progress digest with dream career connection"
tags: [learning, review, progress]
user-invocable: true
metadata:
  openclaw:
    emoji: "📊"

---

# Weekly Review Skill

## Skill files

| File | When to use |
|------|------------|
| `references/digest-format.md` | Step 3 — writing the stored digest to `memory/weekly-digests/` |
| `references/narrative-guide.md` | Step 4 — composing and sending the user-facing narrative message |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |
| `examples/sample-digest.md` | When you need reference examples of the narrative message or stored digest |
| `scripts/stats-compiler.ts` | Step 1 (Gather the data) — run this first to compile weekly statistics |

### scripts/stats-compiler.ts

**What it does:** Reads progress.md, history.md, and the week file to compile weekly statistics.

**Usage:** `bun run skills/weekly-review/scripts/stats-compiler.ts <progress.md> <history.md> <week-file.md>`

- All three paths are required

**Output:**
```
## Weekly Stats
completion_rate: 75%
tasks_completed: 9
tasks_total: 12
current_streak: 5
longest_streak: 12

## Pillar Breakdown
| Pillar | Tasks completed | % of total |
| SQL & Data Analysis | 4 | 44% |
| Product Sense | 3 | 33% |
| Behavioral | 2 | 22% |

## Teach-Back Results
| Concept | Result |
| LEFT JOIN vs INNER JOIN | Strong |
| Product metrics | Partial |
```

**Why scripted:** Compiling stats from multiple files with counting, percentages, and date filtering is error-prone for LLMs.

## Configuration

This skill uses `config.json` for user preferences. If it doesn't exist, use the defaults below and offer to save the user's preferences.

| Field | Default | What it controls |
|-------|---------|-----------------|
| `include_adaptation_details` | `false` | Show full adaptation details in the digest (vs. one-line summary) |
| `comparison_depth` | `"summary"` | Week-over-week comparison depth (`summary`, `detailed`) |

## When to trigger

Three activation paths:

**1. SCHEDULED** — fires on the configured weekly digest day (from `config/settings.md` → Weekly review day, default Sunday evening).
- Read `config/settings.md` for the exact day
- If the weekly review day is also a day off, still fire — the digest is a reflection, not a task

**2. ADAPTATION HANDOFF** — the adaptation skill detects "end of week reached" (all days checked in or it's the digest day) and flags this skill.

**3. MANUAL REQUEST** — user asks "how did my week go?", "weekly summary", "recap", "digest", or similar.
- Generate the digest immediately for the current week's data, even if it's mid-week
- Note in the digest that it's a partial-week summary if not all days have been checked in

## What to read

Read ALL of the following before generating the digest:

| File | What to look for |
|------|-----------------|
| `memory/progress.md` | Current streak, longest streak, completion counts (this week + all time), pillar levels + blocks at level, teach-back log (response quality, gaps, improvements) |
| `memory/history.md` | Completed tasks this week — what did the user actually do? Group by pillar and day. |
| `memory/current-plan.md` | Pillar weights, plan type (learning vs interview_prep), current week number, total weeks, portfolio projects |
| `memory/plan-tasks/week-{N}.md` | This week's task statuses — per-day breakdown of done/skipped/partial/pending. Calculate completion rate. |
| `memory/user-profile.md` | Dream career (target role, why, timeline), name, experience level |
| `memory/resource-feedback.md` | Learning style profile, recent ratings this week, platform preferences |
| `memory/adaptation-log.md` | Adaptations made this week — what changed and why |
| `memory/spaced-repetition.md` | Active review count, retired (mastered) count, concepts that keep resetting (can't lock in), queue status |
| `memory/weekly-digests/week-{N-1}.md` | Previous week's digest — for week-over-week comparison |
| `skills/weekly-review/config.json` | Adaptation detail level, comparison depth |
| `config/settings.md` | Weekly review day, verbosity preference |
| `memory/user-model.md` | Communication Style (for narrative tone), Motivation Drivers (for framing progress), Growth Edges (for highlighting breakthroughs) |
| `memory/concept-links.md` | Cross-Pillar Bridges and new connections this week — highlight in the narrative: "Your SQL and Product Sense pillars are starting to connect." Concept Clusters to show knowledge consolidation. |
| `memory/agent-observations.md` | Count observations logged this week — mention in the digest if any were logged: "I logged [N] observations this week about my own instructions. Worth reviewing if you want to fine-tune how I work." |

## What to write

- `memory/weekly-digests/week-{N}.md` — the stored digest (structured format for agent records and future comparison)
- `memory/user-model.md` — append observation to Observation Log: how the user responds to the digest (engaged vs dismissive → communication style), difficulty self-assessment accuracy (growth edges), motivation signals from the recap conversation
- Message — the user-facing narrative (warmer, shorter, story-driven)
- `session-log.md` (this skill directory) — after execution if anything notable happened

These are TWO separate outputs. The stored digest is structured data. The message is a narrative woven from that data.

## Session log

See `AGENTS.md` for session log protocol. Skill-specific logging:
- What the user engaged with in the digest, what they skipped
- "User always asks about pillar progress, ignores streak stats" → lead with pillars
- Format or framing preferences that emerge from user reactions
---

## Generating the digest

### Step 1: Gather the data

Run `scripts/stats-compiler.ts` to compile the core statistics:

```bash
bun run skills/weekly-review/scripts/stats-compiler.ts "memory/progress.md" "memory/history.md" "memory/plan-tasks/week-{N}.md"
```

Use the script output for completion rate, pillar breakdown, streak info, and teach-back results. Do NOT manually count tasks or calculate percentages — the script handles this.

Then read the remaining files for qualitative data the script doesn't cover:

- **SRS stats:** count active review items, retired items, any concepts with consecutive correct = 0 (struggling concepts) from `memory/spaced-repetition.md`
- **Adaptations this week:** filter `memory/adaptation-log.md` for entries dated this week
- **Resource feedback this week:** filter `memory/resource-feedback.md` → Recent Feedback for this week's entries

### Step 2: Read previous digest (if it exists)

Check `memory/weekly-digests/week-{N-1}.md`. If it exists, extract:

- Previous completion rate
- Previous streak
- Previous pillar levels and blocks
- Previous teach-back performance by pillar
- Previous observations

This enables week-over-week comparison. If no previous digest exists (first week), skip comparisons.

### Step 3: Write the stored digest

Read `references/digest-format.md` for the stored digest template.

### Step 4: Compose and send the narrative message

Read `references/narrative-guide.md` for the 7-element composition guide and tone rules.

---

## Step 5: Conversation phase (recap dialogue)

After sending the narrative digest (Step 4), the weekly review becomes a **conversation**. This is where the agent assesses comprehension across the week's topics and collects user feedback — serving dual purpose as practice for the user and calibration signal for the agent.

### Turn 1: Recall questions (immediately after digest)

Ask 1-2 recall questions about the week's key concepts. Pick from completed conceptual tasks, targeting different pillars if possible.

**How to pick questions:**
- Choose concepts from tasks the user completed (status: "done") this week
- Prefer conceptual tasks over practice tasks
- Prefer different pillars for the 1-2 questions (breadth check)
- Calibrate question depth to pillar level (use the teach-back calibration table from `skills/teach-back/SKILL.md`)
- If the user had practice_prompt tasks this week, don't re-ask those — pick different concepts

**Format:**

> "Before we wrap up the week — quick check on what stuck:
>
> 1. [Question about concept from pillar A — calibrated to current level]
> 2. [Question about concept from pillar B]
>
> 1-2 sentences each is fine."

### Turn 2: Evaluate + difficulty check

Evaluate the user's responses using the teach-back 4-tier scale:

| Response quality | Action |
|------------------|--------|
| **Strong** | "Solid." Brief acknowledgment. |
| **Partial** | Ask one targeted follow-up to find the gap. Note for reinforcement. |
| **Can't explain** | "No worries — we'll revisit that next week." Note for reinforcement. |
| **Skipped** | "No problem." Respect it. |

After evaluating (or if they skip), ask about difficulty:

> "How did this week feel overall? Too easy, about right, or too hard?"

### Turn 3: Adjustment prompt + close

Based on their difficulty feedback and recall performance:

> "Anything you want me to change for next week? Different topics, more/less practice, different format?"

Accept their response, acknowledge it, and close the conversation.

### What to write after the conversation

1. **Stored digest file** — append a `### Recap Conversation` section:
   ```markdown
   ### Recap Conversation

   - Concept 1: [concept] — [Strong/Partial/Can't explain/Skipped]
   - Concept 2: [concept] — [Strong/Partial/Can't explain/Skipped]
   - Difficulty feedback: [too easy / about right / too hard / skipped]
   - User adjustment request: [what they asked for, or "none"]
   ```

2. **`memory/progress.md` → Teach-Back Log** — log each recall question as a teach-back entry with trigger: "weekly_recap"

3. **`memory/spaced-repetition.md`** — update SRS entries per teach-back rules (strong → advance interval, partial/can't explain → compress interval)

4. **Flag for adaptation** — if difficulty feedback contradicts completion data (e.g., user says "too easy" but completion is 90%, or "too hard" but teach-backs are strong), flag this in the stored digest for the adaptation skill to review

### Interview prep mode — enhanced conversation

When plan type is `interview_prep`:

- Ask **3-4 recall questions** instead of 1-2 (more assessment-heavy)
- Frame as readiness check: "Let's make sure you're solid on the key areas before next week:"
- Include at least one behavioral/STAR question if the crash course includes behavioral prep
- Difficulty question becomes: "How confident are you feeling about the interview? Scale of 1-5 is fine."
- Results feed directly into next week's crash course task selection — weak areas get more coverage
- If interview is ≤5 days away, skip recall questions entirely — shift to confidence building: "You've put in the work. What are you most and least confident about?"

### Edge case: user doesn't respond to recall questions

If the user doesn't reply after the digest + questions (no response within the session):
- Don't re-send the questions
- Still write the stored digest (without the recap conversation section)
- The weekly review is still valuable as a one-way digest — the conversation phase is an enhancement, not a requirement

### Edge case: user only answers difficulty, skips recall

Respect it. Log recall as "Skipped" for both questions. Process the difficulty feedback normally. Don't push.

---

## Spaced repetition stats in the narrative

Include SRS performance naturally in the digest:

- How many concepts are active: "You've got 6 concepts in active rotation."
- How many retired (mastered): "You've mastered 2 concepts this month — your SQL foundations are locking in."
- Struggling concepts (consecutive correct = 0, keep coming back): "LEFT JOIN vs INNER JOIN keeps coming back — we'll keep at it until it sticks."
- Frame positively: celebrate mastery, normalize struggle.

If the SRS table is empty (no concepts tracked yet), skip this. Don't mention SRS hasn't started.

---

## Week-over-week comparison

When a previous digest exists (`memory/weekly-digests/week-{N-1}.md`):

- **Completion rate:** "Your completion jumped from 60% to 85% this week" or "Completion dipped to 50% — life happens."
- **Streak:** "Streak went from 3 to 12 — momentum building."
- **Pillar progress:** "SQL went from Level 1 to Level 2" or "System Design is still at Level 1 — early days."
- **Teach-back quality:** "System Design teach-backs went from weak to strong — that remediation worked."

Only mention meaningful changes. Don't compare every metric — pick the 1-2 most interesting shifts.

If it's the first week (no previous digest), skip comparisons entirely. Don't mention that there's nothing to compare.

---

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- The narrative tone felt off for the user's situation — too cheerful for a bad week, too cautious for a great week (log what tone you used and what would have been better)
- Week-over-week comparison was misleading — e.g., different number of active days, plan type changed mid-week, or days off shifted (log what made the comparison unreliable)

---

## Edge cases
### First week (no previous digest)
Still generate the full narrative with all applicable elements, but skip week-over-week comparisons. Extra encouraging tone:
- "You're 1 week into a path most people never start."
- Don't compare against nothing — just tell the story of this week.
### Zero completion week
Don't skip the digest. Acknowledge it honestly without guilt:
- "Quiet week — life happens. Your progress from previous weeks is saved and your plan is waiting whenever you're ready."
- Offer to adjust: "Want me to lighten the load for next week, or keep the plan as-is?"
- Skip elements B (teach-back), D (pattern observation), and H (SRS) — there's nothing to analyze.
- Still include E (dream career connection) and F (look-ahead) — keep the bigger picture visible.
### Perfect week (100% completion)
Celebrate genuinely. Mention the streak. Tease what's next.
- "Clean sweep — every single task done. That's the kind of consistency that compounds."
- If teach-backs were also strong: "And you're not just completing tasks — the teach-backs show you're actually learning this. Want me to bump the difficulty?"
- If teach-backs were weak despite perfect completion: "You're putting in the work — the teach-backs show some concepts need more time to sink in. That's normal. Keep going."
- Only suggest increasing difficulty if teach-backs are also strong.
### No teach-backs happened this week
Skip element B entirely. Don't mention its absence — the user doesn't know what elements "should" be there.
### Interview prep mode (plan type = `interview_prep`)
Shift tone to urgency-aware:
- If interview date is known (from `memory/interview-context.md`): include countdown. "You're 9 days out from your [company] interview."
- Focus on readiness gaps rather than general progress: "Behavioral is solid. Product sense needs work — especially metrics questions."
- Look-ahead should be interview-focused: "Next week: 2 mock interviews + gap-filling on system design."
- Still keep the narrative warm — urgency, not panic.
### Multiple adaptations happened this week
Summarize in one sentence, don't list each one:
- "I adjusted your plan a couple of times this week based on your progress — shifted more time to System Design and swapped some articles for videos."
- The stored digest has the full list. The message summarizes.
### Very long history (week 10+)
Keep the digest the SAME length. Don't let it grow with more data — summarize more aggressively:
- Focus on this week's story, not cumulative history
- Week-over-week comparisons only against last week, not Week 1
- Pillar progress: mention current state and recent changes, not full history
- The stored digest can be slightly longer for records, but the message stays at the verbosity-appropriate length
### Mid-week manual request
If the user asks for a digest mid-week:
- Generate from available data (checked-in days only)
- Note it's partial: "Here's where things stand so far this week — I'll send the full recap on [digest day]."
- Don't write the stored digest file — that's reserved for the actual end-of-week digest. This is a conversational response only.
### Days off had activity
If the user worked on a configured day off and the check-in logged it, include that activity in the digest. Don't call out that they worked on their day off — just count the work.
### No resource feedback this week
Skip format preference observations in element D. Don't mention the absence.
### Plan type changed mid-week
If the plan switched from `learning` to `interview_prep` (or vice versa) during the week, acknowledge the transition:
- "Midweek you activated interview prep mode — the plan shifted focus to [company/role]. Here's both halves went."
## Examples
See `examples/sample-digest.md` for example outputs.
