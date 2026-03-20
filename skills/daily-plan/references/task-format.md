# Task Format Reference

## Task fields

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

## Task types

- **conceptual** — learning tasks: reading, watching, studying. Eligible for teach-back prompts (~1 in 3). Always include a self-check question in the Action field.
- **practice** — hands-on tasks: coding, building, exercises on external platforms. Not eligible for teach-back (they're already active recall).
- **practice_prompt** — the task IS a question the user answers in conversation. No external resource needed. The agent asks the question, evaluates the response using the teach-back evaluation table (strong/partial/can't explain/skipped), gives feedback, and marks done/partial. Platform = "ProngAgent", Search = `N/A`. Format the Action as: "Practice prompt: [question]. Reply when ready." Frequency: 1-2 per week for regular plans, 2-3 per week for crash courses. Mix across pillars. These are NOT eligible for additional teach-back (they already are active recall).

## Resource selection rules

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
| 3 | Practice prompt: Explain the difference between a stack and a queue. Give a real-world example of when you'd use each. Reply when ready. | N/A | ProngAgent | Short | System Design | practice_prompt | System design questions come up in every senior interview | pending |

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
