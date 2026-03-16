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
| `config/settings.md` | Weekly review day, verbosity preference |
| `memory/agent-observations.md` | Count observations logged this week — mention in the digest if any were logged: "I logged [N] observations this week about my own instructions. Worth reviewing if you want to fine-tune how I work." |

## What to write

- `memory/weekly-digests/week-{N}.md` — the stored digest (structured format for agent records and future comparison)
- Message — the user-facing narrative (warmer, shorter, story-driven)

These are TWO separate outputs. The stored digest is structured data. The message is a narrative woven from that data.

---

## Generating the digest

### Step 1: Gather the data

Read all files listed above. Calculate:

- **Completion rate:** done + partial tasks / total assigned tasks for this week (from `memory/plan-tasks/week-{N}.md`)
- **Pillar breakdown:** which pillars had the most completed tasks, which had the most skips
- **Streak status:** current streak, whether it's a personal best, how it compares to last week
- **Teach-back results this week:** filter `memory/progress.md` → Teach-Back Log for entries dated this week. Note which were strong, partial, can't-explain
- **SRS stats:** count active review items, retired items, any concepts with consecutive correct = 0 (struggling concepts)
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

Write to `memory/weekly-digests/week-{N}.md`:

```markdown
## Week {N} Digest ({start-date} to {end-date})

### Focus areas: [list pillars with the most completed tasks]

### Tasks: {completed}/{total} completed ({percentage}%)

### Streak: {current} days {(personal best) if applicable}

### Pillar progress:

- {Pillar}: Level {N}, {X}/5 blocks at level {(leveled up this week!) if applicable}
- ...

### Teach-back results:

- {Concept}: {Strong/Partial/Can't explain} {(improved from {previous} — confirmed improvement) if applicable}
- ...
(or: No teach-backs this week)

### SRS stats:

- Active concepts: {count}
- Retired (mastered) this month: {count}
- Struggling concepts: {list any with consecutive correct = 0}

### Observations:

- {Pattern observation 1}
- {Pattern observation 2}
- ...

### Adaptations made:

- {Summary of adaptations this week, or "None"}

### Week-over-week:

- Completion: {last week}% → {this week}%
- Streak: {last week} → {this week}
- Notable changes: {what improved or declined}
(or: First week — no comparison baseline)
```

### Step 4: Compose the message

This is the user-facing output. It weaves all 7 elements into a NARRATIVE — a story, not a report.

**The 7 required elements:**

#### A. NARRATIVE SUMMARY

Open with what the user focused on this week. What improved? What's still developing? Reference specific tasks and topics by name.

- Good: "This week was all about SQL and product sense. The SQL work is clicking — you finished 4 tasks there without skipping any."
- Bad: "You completed 8/13 tasks across 4 pillars."

#### B. TEACH-BACK PERFORMANCE

Which concepts are solid vs. need reinforcement? Reference specific teach-back results from `memory/progress.md` → Teach-Back Log.

- If a concept improved from a previous weak result, celebrate it specifically: "You nailed the teach-back on window functions this week — that one tripped you up two weeks ago."
- If a concept was weak, frame as "developing": "Load balancing is still developing — you were fuzzy on failover, which is totally normal for a new topic. I've added a focused exercise."
- If NO teach-backs happened this week: skip this element entirely. Don't mention its absence.

#### C. STATS (embedded in narrative)

Streak, pillar levels, completion rate — but woven into the story, not a raw table.

- Streak: mention if it's notable (5+, 10+, new record). "That's 12 days in a row — your longest yet."
- Pillar levels: mention level-ups or near-level-ups. "SQL is at Level 2 with 4/5 blocks — one more and you'll hit the gate."
- Completion rate: use as context, not judgment. "8 out of 10 tasks done — solid week."
- Week-over-week changes (if previous digest exists): "Your completion jumped from 60% to 85% this week."

Stats can also be presented as a small visual block within the narrative (emoji + short lines), matching the example from Section 3.9:

```
🔥 Streak: 12 days (your longest yet)
📈 SQL: Level 2 → almost Level 3 (2 more blocks)
🆕 System Design: Level 1 (just started)
```

#### D. PATTERN OBSERVATION

What trends did the agent notice? Surface non-judgmentally:

- Skipping certain task types consistently
- Completion speed changes (faster = getting easier, slower = might need adjustment)
- Format preferences from resource feedback (videos rated great, articles meh)
- Pillar avoidance patterns
- Time-of-day patterns if visible

**Always frame as observation + question, not judgment:**
- Good: "I noticed you skipped LeetCode twice this week — want me to reduce coding practice to 2x/week?"
- Bad: "You skipped LeetCode twice. You should do more coding practice."

If no patterns are notable this week, skip this element.

#### E. DREAM CAREER CONNECTION

Remind them how this week's work connects to the bigger goal. Read `memory/user-profile.md` → Target role.

- "This week's SQL work is directly relevant to Product Manager roles — data-driven PMs who can query their own metrics stand out."
- Reference the specific dream role, not a generic career.
- Keep it to 1-2 sentences. Don't force it if the connection is weak.

#### F. LOOK-AHEAD

What's coming next week and why. Preview:

- Focus areas (which pillars)
- Any new topics being introduced
- How next week builds on this week
- If a pillar is close to leveling up, mention the upcoming gate

Keep to 1-2 sentences.

#### G. ADAPTATION QUESTION

If the agent noticed something worth adjusting (from `memory/adaptation-log.md` or from pattern observations), ask ONE question. Not a survey — one specific "should I change X?" question.

- "I noticed you skipped the LeetCode tasks twice — want me to swap coding practice for more product case studies?"
- "Your SQL teach-backs are strong but System Design is shaky — want me to shift more time there?"

If nothing needs adjusting, skip this element entirely.

---

## Tone rules

- **Conversational, warm, like a coach who knows you.** Not a teacher grading papers.
- **Encouraging without being fake.** Acknowledge struggles honestly: "System Design is newer territory and it shows — that's expected, not a problem."
- **"Numbers don't motivate. Stories do."** — the product report's exact framing. Lead with narrative, embed stats naturally.
- **NEVER guilt trip** about missed tasks or low completion. Frame everything as data for adjustment: "Quiet week — that's useful info. Want me to lighten the load?"
- **Adjust length by verbosity setting** (from `config/settings.md`):

| Verbosity | Message length | Elements |
|-----------|----------------------|----------|
| concise | 5-8 lines | A + C + F only (narrative summary, key stats, look-ahead) |
| normal | 10-15 lines | All 7 elements, woven together |
| detailed | Full narrative, all elements expanded | All 7 elements with more context, examples, week-over-week detail |

---

## Example message (normal verbosity)

```
Agent: "📊 Week 4 Recap

        This week you focused on SQL and system design. The SQL work is
        paying off — you nailed the teach-back on window functions, which
        tripped you up two weeks ago. Real progress there.

        System design is newer territory. You watched 3 videos and rated
        them all 'great', but when I asked you to explain load balancing,
        you were fuzzy on failover. That's normal for week 1 of a new topic.
        I've added a hands-on exercise for next week.

        🔥 Streak: 12 days (your longest yet)
        📈 SQL: Level 2 → almost Level 3 (2 more blocks)
        🆕 System Design: Level 1 (just started — give it time)

        One thing I noticed: you skipped the LeetCode tasks twice this week.
        No judgment — want me to reduce coding practice to 2x/week instead
        of daily? Or was this just a busy week?

        Looking ahead: next week I'm introducing API design, which bridges
        your Python skills and system design knowledge. It's directly relevant
        to Product Manager roles — PMs who understand APIs make better
        technical tradeoff calls.

        Keep going. You're 4 weeks into a path most people never start. 💪"
```

## Example message (concise verbosity)

```
Agent: "📊 Week 4 Recap

        Strong SQL week — window functions teach-back was solid.
        System Design just getting started.

        🔥 12-day streak (record)
        📈 SQL almost Level 3 | System Design Level 1

        Next week: API design, bridging your Python and system design work."
```

## Example stored digest

```markdown
## Week 4 Digest (2026-03-10 to 2026-03-16)

### Focus areas: SQL & Data Analysis, System Design

### Tasks: 12/15 completed (80%)

### Streak: 12 days (personal best)

### Pillar progress:

- SQL & Data Analysis: Level 2, 4/5 blocks at level
- System Design: Level 1, 1/5 blocks at level
- Behavioral & Communication: Level 2, 3/5 blocks at level

### Teach-back results:

- SQL window functions: Strong (was Partial 2 weeks ago — confirmed improvement)
- Load balancing: Partial (failover gap — remediation task added)

### SRS stats:

- Active concepts: 6
- Retired (mastered) this month: 2
- Struggling concepts: LEFT JOIN vs INNER JOIN (consecutive correct = 0)

### Observations:

- Skipped LeetCode 2x this week — asked user about preference adjustment
- All video resources rated "great" — user may prefer video for new topics
- SQL completion speed increasing (avg 25min → 18min this week)

### Adaptations made:

- Added hands-on load balancing exercise to Week 5
- Shifted system design resources from article to video (user preference)

### Week-over-week:

- Completion: 67% → 80%
- Streak: 5 → 12
- Notable changes: SQL teach-back improved from partial to strong. System Design added as new pillar.
```

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

## Edge cases

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Weekly-review-specific:**
- The narrative tone felt off for the user's situation — too cheerful for a bad week, too cautious for a great week (log what tone you used and what would have been better)
- Week-over-week comparison was misleading — e.g., different number of active days, plan type changed mid-week, or days off shifted (log what made the comparison unreliable)

---

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

- "Midweek you activated interview prep mode — the plan shifted focus to [company/role]. Here's how both halves went."
