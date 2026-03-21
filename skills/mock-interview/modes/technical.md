# Mode: TECHNICAL

## Question selection (2-3 questions)

**Calibrate difficulty to pillar levels:**

| Pillar level | Difficulty | Question type |
|-------------|-----------|---------------|
| Level 1-2 | Easy/medium | Fundamentals, straightforward coding, basic conceptual |
| Level 3-4 | Medium/hard | Applied problems, debugging scenarios, design tradeoffs |
| Level 5 | Hard + system-level | Complex problems, optimization, architecture decisions |

**Question types to mix:**

1. **Coding problems** — appropriate difficulty for the target role. For PM/analyst roles: SQL queries, data manipulation. For engineering roles: algorithm/data structure problems.
2. **Conceptual questions** — drawn from `spaced-repetition.md` active concepts and weak teach-back topics from `progress.md`. Test understanding, not just recall.
3. **Debugging scenarios** — "Here's a piece of code/query with a bug. Find and fix it."
4. **Code review** — "Here's a solution. What's wrong with it? How would you improve it?"

**Match to job requirements:** Read `interview-context.md` -> Key requirements. If the job requires SQL, ask SQL questions. If it requires system design thinking, lean toward architecture questions. Don't ask algorithm questions for a PM role that will never test algorithms.

## Conducting the technical mock

For each question:

**a. Present the problem clearly**

State the problem, inputs, expected outputs, and any constraints. For SQL: provide the table schema. For coding: provide the function signature or input format.

> "Here's a technical question. Take your time — think out loud as you work through it.
>
> [Problem statement]"

**b. Let the user think and answer**

Encourage thinking aloud: "Walk me through your thinking." Don't rush them. If they go silent for a while: "What are you considering?" (gentle nudge, not pressure).

**c. Evaluate the answer**

| Dimension | What to look for |
|-----------|-----------------|
| Correctness | Is the solution right? Does it handle the stated requirements? |
| Approach/reasoning | Did they choose a reasonable approach? Can they explain WHY? |
| Communication | Did they explain their thinking? Could an interviewer follow their process? |
| Edge case awareness | Did they consider edge cases, null inputs, empty sets, overflow? |

**d. Score the answer (internal)**

Score each of the 4 dimensions above 1-10 per `references/scoring-rubric.md`. Record the per-dimension scores — they surface in the session summary only, not during the mock.

**e. Coach**

> "**What was right:** [specific — e.g., 'Good approach using a hash map — that's the optimal solution']
> **What was missed:** [specific — e.g., 'You didn't handle the empty array case — interviewers watch for that']
> **Optimal approach:** [if different from what they did — walk through it briefly]"

**f. Can't solve it — walk through**

If the user is stuck and can't make progress:

1. Give a hint first: "Think about what data structure would let you look up values in O(1)..."
2. If still stuck after the hint: walk through the solution step by step
3. Note that hints were needed — scored lower but still valuable practice
4. Add the concept to `spaced-repetition.md` for review if it's not already there

**g. Flag weak areas**

If a technical question reveals a significant gap (user doesn't know a concept the job requires):
- Note it for the session summary
- Flag for adaptation: the adaptation skill should add targeted practice for this concept to the next week's plan

## After all technical questions

Proceed to Session Summary — read `references/session-summary.md` for format and protocol.