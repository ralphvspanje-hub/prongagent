---
name: prongagent-resource-feedback
description: "Post-task resource quality collection and learning style profiling"
tags: [learning, feedback, resources]
user-invocable: false
metadata:
  openclaw:
    emoji: "⭐"
---

# Resource Feedback Skill

## When to trigger

- After ~1 in 3 completed tasks (not every task — that's annoying)
- Only for tasks the user actually completed (status: "done"), not skipped or partial
- Never ask about the same resource twice
- Don't ask during check-in or weekly review — this is a standalone micro-interaction

## What to read

- `memory/plan-tasks/week-{N}.md` — to find the most recently completed task
- `memory/resource-feedback.md` — existing ratings, learning style profile
- `memory/progress.md` — total tasks completed (to know when to trigger)
- `resources/curated-resources.md` — to check if a searched resource should be promoted

## What to write

- `memory/resource-feedback.md` — append rating, update learning style profile
- `resources/curated-resources.md` — promote graduated resources (see graduation system below)

## How to ask

One question. Three options. Zero friction.

```
Agent: "You finished that [resource name] on [topic]. Quick —
        was it helpful? (great / okay / didn't click)"
```

Accept single-word answers. Also accept variants:
- "great" / "loved it" / "yes" / "good" → great
- "okay" / "fine" / "meh" / "it was alright" → okay
- "didn't click" / "no" / "bad" / "not helpful" → didn't click

Do NOT ask follow-up questions about why. The rating is enough. Move on.

## What to write after getting a rating

1. **Append to Recent Feedback table** in `memory/resource-feedback.md`:

| Date | Resource | Platform | Type | Rating | Topic | Source |
|------|----------|----------|------|--------|-------|--------|
| 2026-03-16 | Decorators deep dive | Real Python | Article | great | Python | curated |

The **Source** column tracks where the resource came from: `curated`, `searched`, or `user`.

2. **Update Learning Style Profile** — after 10+ ratings, auto-derive:
   - Preferred format: rank formats by average rating
   - Preferred length: compare short (< 20 min) vs long (> 30 min) ratings
   - Platform preferences: rank platforms by average rating

3. **Brief acknowledgment** based on rating:

| Rating | Response style |
|--------|---------------|
| great | "Nice — noted. More like that coming." |
| okay | "Got it. I'll keep [platform] in the mix but look for more [preferred format] alternatives." |
| didn't click | "Noted — I'll find a different approach for [topic] next time." |

## Agent response patterns

| Pattern detected | Agent action |
|---|---|
| User consistently rates videos as "great" | Shift resource mix toward more video content |
| User rates long articles as "didn't click" | Switch to shorter, more interactive alternatives |
| Specific platform consistently underperforms | Deprioritize that platform in future recommendations |
| User rates everything as "great" | Reduce feedback frequency — rely more on teach-back performance |
| User rates everything as "didn't click" | Resources aren't the problem — difficulty level might be wrong. Trigger adaptation skill. |

## Graduation system: [searched] → curated

When a resource that was found via web search proves its quality through real usage, it should be promoted to the curated list. This is how the curated resource library grows organically.

**Promotion rules:**

1. Track ratings for `[searched]` resources (Source column = `searched` in feedback table)
2. When a searched resource accumulates **3 "great" ratings** (across any number of tasks or users), it qualifies for promotion
3. On promotion:
   - Add the resource to `resources/curated-resources.md` under the appropriate pillar/level section
   - Remove the `[searched]` prefix — it's now a first-class curated resource
   - Add a note in the Description: `(promoted from search — 3x great)`
   - Log the promotion in `memory/resource-feedback.md` under a `## Promotions` section
4. Resources rated "didn't click" 3 times should be **blocklisted** — add them to a `## Blocklist` section in `memory/resource-feedback.md` so the agent never searches for them again

**Promotion check:** Run the promotion check every time a new rating is recorded for a searched resource. Don't wait for a batch — promote as soon as the threshold is hit.

**[unvetted] resources:** Resources marked `[unvetted]` in curated-resources.md follow the same graduation path. They need 3 "great" ratings to lose the `[unvetted]` prefix. If they get 3 "didn't click" ratings, remove them from curated-resources.md entirely.

## Example promotion

```
## Promotions

| Date | Resource | Platform | Pillar | Level | Ratings before promotion |
|------|----------|----------|--------|-------|--------------------------|
| 2026-04-02 | React Hooks Tutorial | freeCodeCamp | Frontend | 2-3 | great x3, okay x1 |
```

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Resource-feedback-specific:**
- The graduation threshold (3x "great" for promotion) feels too high or too low based on observed usage patterns (log the resource and ratings pattern)
- User's ratings don't match their actual behavior — rates resources "great" but skips that format, or rates "didn't click" but keeps completing similar resources (log the discrepancy)

## Edge cases

- **User gives no response:** Don't nag. Skip this resource and try again on the next eligible task.
- **Resource was self-guided (URL: N/A):** Still ask for feedback — the task format matters even without a specific resource.
- **Same resource used by different tasks:** Each task gets its own rating opportunity. A resource can accumulate ratings across tasks.
- **User asks to stop getting asked:** Respect this. Add a flag to `config/settings.md` and stop triggering. Learning style profile still updates from teach-back data.
