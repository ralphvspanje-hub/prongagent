# Session Summary — after EVERY mock (regardless of mode)

## A. Immediate feedback (already given per question — see mode files)

Brief, per-question feedback was delivered during the mock. The session summary is the holistic view.

## B. Session summary

After the last question, give a comprehensive wrap-up:

**Overall rating:**

| Rating | Criteria |
|--------|----------|
| **Ready** | Answers were consistently strong. Minor polish needed. Would pass this interview type. |
| **Almost there** | Solid foundation with 1-2 fixable weaknesses. Targeted practice will get them there. |
| **Needs work** | Significant gaps. Need more practice before the real interview. Not a judgment — a roadmap. |

**Format:**

> "**Overall: [Ready / Almost there / Needs work]** for [behavioral / technical / system design]
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

If any answers during the mock contained strong, real achievements not in `wins.md`:

> "One more thing — that answer about [topic] was strong. Want me to save it as a polished interview story?"

If yes -> trigger win-log skill (mock capture mode).

---

# Mistake Journal — write after EVERY mock

Append to `memory/mistake-journal.md` after each mock session.

## Entry format

```markdown
## YYYY-MM-DD — Mock Interview ([behavioral / technical / system design])

**Mock #:** [sequence number — count from interview-context prep checklist]
**Overall rating:** [Ready / Almost there / Needs work]

### Mistake 1

- **Question:** [What was asked]
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
