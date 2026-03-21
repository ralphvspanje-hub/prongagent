# Session Summary — after EVERY mock (regardless of mode)

## A. Immediate feedback (already given per question — see mode files)

Brief, per-question feedback was delivered during the mock. The session summary is the holistic view.

## B. Session summary

After the last question, give a comprehensive wrap-up:

**Per-question score table:**

Present the scores that were recorded internally during the mock:

> | # | Question | Score | Strongest Dimension | Weakest Dimension |
> |---|----------|-------|--------------------|--------------------|
> | 1 | [question summary] | [X/10] | [dimension name] | [dimension name] |
> | 2 | [question summary] | [X/10] | [dimension name] | [dimension name] |
> | ... | | | | |
>
> **Session average: [X/10]**

**Overall rating** — derive from session average using the scale in `references/scoring-rubric.md` (8+ = Ready, 5-7.9 = Almost there, <5 = Needs work).

**Note:** This is *mock session performance* — a different assessment from *interview readiness tiers* (see `skills/interview-prep/references/readiness-tiers.md`), which measures structural prep completeness.

**Format:**

> "**Overall: [Ready / Almost there / Needs work]** for [behavioral / technical / system design] (session average: [X/10])
>
> **Top strength:** [the single best thing about their performance — be specific]
>
> **Top improvement area:** [the single most impactful thing to fix — be specific and actionable]
>
> **Action items:**
> 1. [Specific thing to practice — e.g., 'Practice telling the RetainIt story in under 2 minutes — you went over 3 today']
> 2. [Another specific action — e.g., 'Add metrics to your Result sections — 3 of 4 answers had vague outcomes']
> 3. [Optional third action]"

**Comparison to previous mocks:**

If `mistake-journal.md` has entries from previous mocks, compare:

> "Compared to your last mock: [specific improvement or persistent issue]"
>
> Examples:
> - "Your STAR structure is much tighter than last time — the Situation section was half the length."
> - "You're still rushing through the Result section. That's 3 mocks in a row now. Let's specifically practice leading with the outcome next time."

## C. Win-log capture prompt

If any answer scored **8 or higher** on overall question score AND contained a real achievement not already in `wins.md`:

> "One more thing — that answer about [topic] scored [X]/10. That's a strong interview story. Want me to save it as a polished win?"

If yes -> trigger win-log skill (mock capture mode) — see `skills/win-log/modes/mock-capture.md`.

If multiple answers scored 8+, offer the highest-scoring one first. Don't overwhelm with multiple captures in one session — max 2.

---

# Mistake Journal — write after EVERY mock

Append to `memory/mistake-journal.md` after each mock session.

## Entry format

```markdown
## YYYY-MM-DD — Mock Interview ([behavioral / technical / system design])

**Mock #:** [sequence number — count from interview-context prep checklist]
**Session average:** [X/10]
**Overall rating:** [Ready / Almost there / Needs work]

### Per-Question Scores

| # | Question | Score | Dimensions |
|---|----------|-------|-----------|
| 1 | [question summary] | [X/10] | [dimension1:X, dimension2:X, ...] |
| 2 | [question summary] | [X/10] | [dimension1:X, dimension2:X, ...] |

### Mistake 1

- **Question:** [What was asked]
- **Score:** [X/10]
- **What you said:** [Summary of the user's response]
- **What would've been better:** [Specific coaching — not "be better" but "lead with the 40% latency improvement number"]
- **Category:** [structuring / specificity / technical accuracy / delivery / story selection / requirements clarification / edge cases / communication]
- **Pattern?:** [first time / recurring — if recurring, reference the date of the previous instance]

### Mistake 2

...

### Strengths noted

- [What went well — track improvements too, not just mistakes]
```

**What counts as a mistake (be specific):**

- "Result section had no metrics" (NOT "answer was weak")
- "Spent 90 seconds on Situation, 10 seconds on Result" (NOT "answer was too long")
- "Used the pipeline story for a collaboration question — the API redesign story fits better" (NOT "wrong story")
- "Didn't clarify requirements before starting the design" (NOT "bad approach")
- "Missed the edge case where the input array is empty" (NOT "incomplete solution")

## Pattern detection

After writing the entry, cross-reference with previous entries in `mistake-journal.md`:

1. **Category frequency:** Count how often each mistake category appears across all mocks. If any category has 3+ entries, it's a pattern.
2. **Specific recurring issues:** Look for the same specific mistake repeated (e.g., "vague results" appearing in mock 1, 2, and 3).
3. **Mode-specific patterns:** Are mistakes concentrated in one mode? (e.g., all mistakes are in behavioral = story telling needs work, not technical skills)