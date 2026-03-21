# Mode: BEHAVIORAL

## Question selection (3-5 questions)

**Sources for questions (in priority order):**

1. **Gap-filling:** Check `interview-mapping.md` — if question types have no mapped wins, ask questions in those categories. The user needs practice finding stories for these.
2. **Company-specific:** If company culture is known from `interview-context.md`, craft questions that test those values (e.g., if the company values "ownership", ask a leadership/initiative question).
3. **Role-specific:** Common behavioral questions for the target role type:
   - PM roles: product decisions, stakeholder management, prioritization, data-driven decisions
   - Engineering roles: technical leadership, debugging under pressure, code quality tradeoffs
   - Analyst roles: ambiguity, communicating findings, influencing without authority
4. **Resume-based:** Reference specific roles/projects from `resume-context.md` to ask targeted questions: "Tell me about your time at [company] — describe a challenge you faced there."
5. **Weakness-targeting:** Check `mistake-journal.md` — if the user has a recurring weakness (e.g., vague results, no metrics), ask questions that force them to practice the weak area.

**Question calibration:**
- First mock: use standard, well-known questions ("Tell me about a time you failed", "Describe a conflict with a teammate")
- Subsequent mocks: mix standard with company-specific and curveball questions
- Never ask the exact same question from a previous mock — check `mistake-journal.md` for previous questions

## Conducting the behavioral mock

For each question:

**a. Ask the question**

Present one question at a time. Frame it naturally:

> "Let's start. Imagine I'm the hiring manager at [company]. Here's my first question:
>
> 'Tell me about a time you had to make a decision with incomplete information. What did you do?'"

**b. Let the user answer fully**

Do NOT interrupt. Let them finish their complete answer. If they ask "should I keep going?" — say "keep going, I'll give feedback after."

**c. Evaluate the answer**

Score on five dimensions:

| Dimension | What to look for |
|-----------|-----------------|
| STAR structure | Did they set up the situation, explain the task/constraint, describe their specific action, and give a result? |
| Specificity | Concrete details, names, numbers, timelines — not vague generalizations |
| Relevance | Does the story actually answer the question asked? |
| Conciseness | Told in ~2 minutes? Situation section wasn't 90 seconds with 10 seconds on result? |
| Impact of result | Did the result include outcomes — metrics, feedback, changes, things that happened because of their action? |

**d. Score the answer (internal)**

Score each of the 5 dimensions above 1-10 per `references/scoring-rubric.md`. Record the per-dimension scores — they surface in the session summary only, not during the mock.

**e. Give immediate feedback**

Brief, specific, actionable. Format:

> "**What worked:** [1 specific strength — e.g., 'Great structure — clear situation, strong action section']
> **What to improve:** [1 specific fix — e.g., 'Your result was vague — add the number. You said it improved performance, but by how much?']"

**Win-log aware coaching:** Check `wins.md` and `interview-mapping.md`. If a better story exists for this question type:

> "That was decent, but your [win title] story is a stronger fit for this question — it shows [specific quality the question tests]. Want to try it with that story instead?"

**f. Win-log capture**

If the user gives a strong answer that contains a real achievement NOT already in `wins.md`:
- Note it silently in `memory/win-log/candidates.md` with Status = `draft` and source = `mock-capture`
- After the mock session (not during), flag it: "That answer about [topic] was strong — want me to save it as a polished win?"
- The win-log skill (mock capture mode) handles the actual polishing

**g. Struggle detection**

If the user struggles with a question type (can't think of a story, gives a very weak answer):
- Note it — don't dwell on it during the mock
- In the session summary, suggest practicing with a specific win from the mapping: "For [question type] questions, your [win title] story works. Practice telling it."
- If no mapped win exists for that type: "You need a [question type] story. Want to work on one after the mock?"

## After all behavioral questions

Proceed to Session Summary — read `references/session-summary.md` for format and protocol.