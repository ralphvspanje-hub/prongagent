# Interview Mapping

After every new polished win is saved to `wins.md`, update `memory/win-log/interview-mapping.md`.

## Question types

| Category | What it tests | Example interview question |
|----------|--------------|---------------------------|
| Leadership / Initiative | Driving change, taking ownership without being asked | "Tell me about a time you led a project or initiative" |
| Technical Problem Solving | Debugging, architecture, technical decisions | "Describe a difficult technical problem you solved" |
| Failure / Learning | Handling setbacks, growth mindset | "Tell me about a time you failed and what you learned" |
| Collaboration / Conflict | Working with others, resolving disagreements | "Describe a time you disagreed with a teammate" |
| Creativity / Innovation | Novel approaches, thinking differently | "Tell me about a time you came up with a creative solution" |
| Time Pressure / Prioritization | Working under constraints, making tradeoffs | "Tell me about a time you had to deliver under a tight deadline" |

## Mapping rules

- Each win maps to 1-2 question types
- Mark the strongest mapping (the question type this story best answers)
- A win can be a backup for a second category
- Format in `interview-mapping.md`:

```markdown
## Leadership / Initiative

- [Win title] (strongest -- [why this fits])
- [Another win title] (backup -- [why this also works])

## Technical Problem Solving

- [Win title] (strongest -- [why])
...
```

## Gap detection

After EVERY new win is added, scan the full mapping. Run this check:

1. Count polished wins per question type
2. If any question type has 0 wins AND total polished wins >= 5: flag it

Surface the gap to the user:

> "You've got [N] solid wins now, but I notice you don't have a [gap category] story yet. Most interviews ask about this. Want to think of one?"

If multiple gaps exist, flag the most commonly asked one first:
1. Failure / Learning (almost always asked)
2. Collaboration / Conflict (very common)
3. Leadership / Initiative (common for PM/senior roles)
4. Time Pressure / Prioritization
5. Creativity / Innovation
6. Technical Problem Solving

## Imbalance detection

If all wins map to the same 1-2 categories:

> "All your stories are [category]. Interviewers also ask about [missing categories]. Want to work on those?"

## Integration with mock interviews

The mock-interview skill has full access to `wins.md` and `interview-mapping.md`. Win-log provides:

1. **Story suggestions for specific question types:** When the mock-interview skill needs a story for a behavioral question, it looks up the mapping and suggests the strongest win for that category.

2. **Gap alerts:** If the mock-interview skill encounters a question type with no mapped wins, it notes it as a coaching point: "You didn't have a ready story for that question type. Want to work on one after the mock?"

3. **Delivery tracking:** If the user tells the same win story across multiple mocks, note improvements in delivery (tighter framing, better numbers, clearer structure). Track in the win entry or in a note appended to the mock-interview feedback.

4. **Polished stories for practice:** The user can review their wins before a mock or real interview. The mapping serves as an interview cheat sheet: "For leadership questions, lead with [win title]. For failure questions, use [other win title]."
