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
- `memory/user-model.md` — Learning Patterns (cross-reference format preferences with ratings)
- `memory/progress.md` — total tasks completed (to know when to trigger)
- `resources/curated-resources.md` — to check if a user-discovered resource should be promoted to gold-standard

## What to write

- `memory/resource-feedback.md` — append rating, update learning style profile
- `resources/curated-resources.md` — promote graduated resources (see graduation system below)
- `memory/user-model.md` — append observation to Observation Log if rating reveals a pattern: format preferences beyond just ratings (e.g., user's comment tone when rating "great" vs "didn't click"), platform avoidance patterns

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

The **Source** column tracks where the resource came from: `curated` (from curated-resources.md), `search` (user found via search suggestion), or `user` (user-recommended platform/resource).

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

## Graduation system: user-discovered → curated gold-standard

When a resource the user found via search suggestion proves its quality through real usage, it can be promoted to the curated gold-standard list. This is how `resources/curated-resources.md` grows organically with proven resources.

**Promotion rules:**

1. Track ratings for resources with Source = `search` or `user` in the feedback table
2. When a resource accumulates **3 "great" ratings**, it qualifies for promotion to gold-standard
3. On promotion:
   - Add the resource to `resources/curated-resources.md` under the appropriate pillar/level section with full URL
   - Add a note in the Description: `(promoted — 3x great)`
   - Log the promotion in `memory/resource-feedback.md` under a `## Promotions` section
4. Resources rated "didn't click" 3 times should be **blocklisted** — add them to a `## Blocklist` section in `memory/resource-feedback.md` so the agent avoids recommending them

**Preferred platforms tracking:**

In addition to individual resources, the agent tracks which platforms the user prefers for different task types:

- When a user rates a platform's resources consistently well (3+ "great" ratings for the same platform), note it as a preferred platform in the Learning Style Profile
- When crafting search suggestions (daily-plan Priority 3), direct search queries to these preferred platforms: "Search for [topic] on [preferred platform]"

**Promotion check:** Run the promotion check every time a new rating is recorded. Don't wait for a batch.

## Example promotion

```
## Promotions

| Date | Resource | Platform | Pillar | Level | Ratings before promotion |
|------|----------|----------|--------|-------|--------------------------|
| 2026-04-02 | React Hooks Tutorial | freeCodeCamp | Frontend | 2-3 | great x3, okay x1 |
```

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- The graduation threshold (3x "great" for promotion) feels too high or too low based on observed usage patterns (log the resource and ratings pattern)
- User's ratings don't match their actual behavior — rates resources "great" but skips that format, or rates "didn't click" but keeps completing similar resources (log the discrepancy)

## Edge cases
- **User gives no response:** Don't nag. Skip this resource and try again on the next eligible task.
- **Resource was self-guided (URL: N/A):** Still ask for feedback — the task format matters even without a specific resource.
- **Same resource used by different tasks:** Each task gets its own rating opportunity. A resource can accumulate ratings across tasks.
- **User asks to stop getting asked:** Respect this. Add a flag to `config/settings.md` and stop triggering. Learning style profile still updates from teach-back data.
