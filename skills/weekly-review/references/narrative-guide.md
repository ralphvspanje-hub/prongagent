# Narrative Guide — Weekly Review

This is the composition guide for Step 4 of the weekly review: composing and sending the user-facing narrative message. It weaves all 7 elements into a NARRATIVE — a story, not a report.

**The 7 required elements:**

## A. NARRATIVE SUMMARY

Open with what the user focused on this week. What improved? What's still developing? Reference specific tasks and topics by name.

- Good: "This week was all about SQL and product sense. The SQL work is clicking — you finished 4 tasks there without skipping any."
- Bad: "You completed 8/13 tasks across 4 pillars."

## B. TEACH-BACK PERFORMANCE

Which concepts are solid vs. need reinforcement? Reference specific teach-back results from `memory/progress.md` → Teach-Back Log.

- If a concept improved from a previous weak result, celebrate it specifically: "You nailed the teach-back on window functions this week — that one tripped you up two weeks ago."
- If a concept was weak, frame as "developing": "Load balancing is still developing — you were fuzzy on failover, which is totally normal for a new topic. I've added a focused exercise."
- If NO teach-backs happened this week: skip this element entirely. Don't mention its absence.

## C. STATS (embedded in narrative)

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

## D. PATTERN OBSERVATION

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

## E. DREAM CAREER CONNECTION

Remind them how this week's work connects to the bigger goal. Read `memory/user-profile.md` → Target role.

- "This week's SQL work is directly relevant to Product Manager roles — data-driven PMs who can query their own metrics stand out."
- Reference the specific dream role, not a generic career.
- Keep it to 1-2 sentences. Don't force it if the connection is weak.

## F. LOOK-AHEAD

What's coming next week and why. Preview:

- Focus areas (which pillars)
- Any new topics being introduced
- How next week builds on this week
- If a pillar is close to leveling up, mention the upcoming gate

Keep to 1-2 sentences.

## G. ADAPTATION QUESTION

If the agent noticed something worth adjusting (from `memory/adaptation-log.md` or from pattern observations), ask ONE question. Not a survey — one specific "should I change X?" question.

- "I noticed you skipped the LeetCode tasks twice — want me to swap coding practice for more product case studies?"
- "Your SQL teach-backs are strong but System Design is shaky — want me to shift more time there?"

If nothing needs adjusting, skip this element entirely.

---

## Tone rules

- **Personalize using the user model.** Read `memory/user-model.md` → Communication Style and Motivation Drivers. If the user responds to humor, use it. If they prefer data, lead with stats. If they get deflated by low numbers, frame completion in terms of what was accomplished rather than what was missed. The user model is your guide to tone calibration. If it's empty (early weeks), default to warm and narrative.
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
