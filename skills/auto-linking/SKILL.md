---
name: prongagent-auto-linking
description: "Cross-reference new learnings with existing knowledge, create concept connections"
tags: [learning, connections, knowledge-graph]
user-invocable: false
metadata:
  openclaw:
    emoji: "🔗"
---

# Auto-Linking Skill

## When to trigger

Runs silently after two skills complete — no user-facing output.

**1. AFTER CHECK-IN** — when check-in marks tasks as done.
- Runs after check-in processing is complete
- Only runs if at least 1 task was marked "done" (not just skipped)

**2. AFTER TEACH-BACK** — when teach-back evaluates a concept.
- Runs after teach-back evaluation is logged
- Especially valuable after strong or partial responses — these reveal what the user connected and what they missed

Do NOT trigger:
- After resource-feedback (too noisy, not enough conceptual signal)
- After adaptation (no new learning happened)
- If the last auto-linking run was today AND no new tasks were completed since (avoid redundant runs)

## What to read

| File | What to look for |
|------|-----------------|
| `memory/history.md` | Recently completed tasks — topics, pillars, concepts covered. Focus on today's entries. |
| `memory/progress.md` | Teach-back log — concepts evaluated, response quality, identified gaps |
| `memory/spaced-repetition.md` | Active review items — concepts being tracked, their pillars, status |
| `memory/current-plan.md` | Pillar structure — which pillars exist, their levels |
| `memory/user-model.md` | Knowledge Anchors — what mental models the user already has, analogies that work |
| `memory/plan-tasks/week-{N}.md` | This week's tasks — context for what was just completed |
| `memory/concept-links.md` | Existing links — to avoid duplicates, to strengthen existing connections |

## What to write

| File | When |
|------|------|
| `memory/concept-links.md` | Every run — append new connections or update strength of existing ones |

All output goes to `memory/concept-links.md`. This skill NEVER messages the user.

---

## How it works

### Step 1: Identify the new learning

Read what just happened from the triggering skill:

**After check-in:**
- Which tasks were marked done today? Extract the topics and pillars.
- Were any marked partial? Note partial concepts — they may have weak connections.

**After teach-back:**
- Which concept was tested? What pillar and level?
- Was the response strong (user made connections), partial (user knew the concept but missed relationships), or can't-explain?
- Did the user spontaneously reference another concept in their answer? That's a demonstrated connection.

### Step 2: Search for connections

For each new concept, check against existing knowledge:

**Connection types to look for:**

| Type | What it means | Example |
|------|--------------|---------|
| `builds-on` | Concept A is prerequisite knowledge for Concept B | "GROUP BY" builds-on "SELECT basics" |
| `contrasts` | Understanding A helps by comparison with B | "LEFT JOIN" contrasts "INNER JOIN" |
| `applies-to` | Concept A is theoretical, B is the practical application | "REST principles" applies-to "building an API endpoint" |
| `bridges-pillars` | Connection spans two different pillars (most valuable) | "data storytelling" bridges SQL & Data Analysis ↔ Product Sense |
| `analogous` | Concepts from different domains that share a pattern | "database indexing" analogous "book index" |

**Where to search:**
1. `memory/history.md` — completed tasks from previous weeks in the same and different pillars
2. `memory/concept-links.md` — existing connections that the new concept might extend
3. `memory/spaced-repetition.md` — active review items (if the new concept relates to something being reviewed, that's a reinforcement opportunity)
4. `memory/user-model.md` → Knowledge Anchors — prior knowledge bridges from the user's background

### Step 3: Write connections

**New connections:** Append to the Active Connections table in `memory/concept-links.md`.

**Existing connections:** If a connection already exists, update its strength:
- `mentioned` → `demonstrated` — if the user made the connection in a teach-back or conversation
- `demonstrated` → `strong` — if the user demonstrated the connection multiple times

**Cross-pillar bridges:** Also add to the Cross-Pillar Bridges section — these are the highest-value connections for the weekly review narrative and for framing new tasks.

**Concept clusters:** If a new concept joins a group of 3+ related concepts in the same pillar, create or update a Concept Cluster entry.

### Step 4: Quality over quantity

**Do NOT create connections that are:**
- Trivially obvious (every SQL concept connects to every other SQL concept)
- Based on surface similarity only (both mention "data" ≠ meaningful connection)
- Forced — if the connection requires a 3-step explanation, it's not useful

**DO create connections that are:**
- Useful for framing tomorrow's tasks ("This builds on what you learned last week")
- Good teach-back material ("How does X relate to Y?")
- Cross-pillar (these are rare and valuable — always capture them)
- Based on what the user actually demonstrated understanding of

**Target:** 1-3 new or updated connections per run. If nothing meaningful connects, write nothing. Don't force links for the sake of activity.

---

## How other skills use concept-links.md

This skill writes. Other skills read. The connections enrich user-facing output without the user ever seeing the raw data.

| Skill | How it uses concept-links.md |
|-------|------------------------------|
| `daily-plan` | Task framing: "This builds on the GROUP BY work you did last week." Reference `builds-on` connections to create continuity. |
| `teach-back` | Cross-concept questions: "How does [concept A] relate to [concept B] you learned earlier?" Use `contrasts` and `bridges-pillars` connections for richer prompts. |
| `weekly-review` | Narrative connections: "Your SQL and Product Sense pillars are starting to connect — the metrics work this week used both." Highlight `bridges-pillars` connections. |
| `spaced-repetition` | Richer review questions: instead of testing a concept in isolation, reference a connected concept for context. Use `builds-on` and `applies-to` connections. |
| `career-mentor` | Skill gap framing: surface which concepts cluster together and where clusters have gaps. |

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Auto-linking-specific:**
- A concept had no meaningful connections to anything the user has learned (log the concept and pillar — this might indicate the learning path has gaps)
- The same connection keeps getting "mentioned" but never "demonstrated" — the user isn't making the link despite multiple exposures (log for teach-back to target)
- A cross-pillar bridge was surprisingly strong — the user connected concepts from different pillars unprompted (log for weekly review to highlight)

## Edge cases

- **First week (no history):** Very few connections will exist. That's fine — the graph builds over time. Don't force connections between day 1 and day 2 concepts.

- **User is in interview_prep mode:** Still run auto-linking, but prioritize connections that are interview-relevant. Cross-pillar bridges to the target role's key skills are especially valuable.

- **Concept-links.md is getting long (50+ connections):** Start pruning `mentioned` connections that haven't been upgraded to `demonstrated` after 3+ weeks. They're noise. Keep all `demonstrated` and `strong` connections.

- **Teach-back reveals a misconception:** If the user incorrectly connected two concepts (e.g., confused JOIN types), do NOT create a link. Instead, check if a wrong link exists and remove it. The teach-back skill handles the correction; auto-linking should reflect accurate understanding only.

- **Multiple concepts completed in one day:** Process each independently. Don't create connections between concepts just because they were completed on the same day — that's coincidence, not relationship.
