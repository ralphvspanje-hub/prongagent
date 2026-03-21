# Cross-Mock Pattern Detection

After 2+ mocks, analyze `mistake-journal.md` for patterns. Surface them in the session summary.

## Common patterns to detect

| Pattern | Signal | Coaching |
|---------|--------|----------|
| Always rushing Situation | Multiple "spent too long on Situation" entries | "Open with one sentence of context, then get to the action. Practice: 'At [company], [one-line context]. The challenge was [constraint].'" |
| Never mentioning metrics in Results | Multiple "no metrics" or "vague result" entries | "End every story with a number. Even rough estimates: 'about 40% faster', 'used by 50+ people', 'saved ~2 hours/week'." |
| Going too deep on technical details in behavioral | Multiple "too technical for behavioral" entries | "Behavioral questions test judgment and communication, not technical depth. Explain WHAT you decided and WHY, not HOW it works under the hood." |
| Not clarifying requirements in system design | Multiple "jumped straight to design" entries | "First 5 minutes: ask clarifying questions. Users? Scale? Read/write ratio? Availability requirements? This is expected and shows maturity." |
| Using the same story for everything | Multiple "same story" or "story selection" entries | "You have [N] wins. Spread them across question types. For [type] questions, lead with [specific win]." |
| Not thinking aloud in technical | Multiple "silent while solving" entries | "Interviewers can't evaluate what they can't hear. Narrate your thinking: 'I'm considering X because Y, but Z might be better because...'" |

## Escalation: pattern persists after coaching

If the same pattern appears in 3+ mocks despite coaching (check that coaching was given in previous session summaries):

> "We've practiced [pattern] several times and it keeps coming up. Let's try a different approach: [specific targeted exercise]."

Targeted exercises by pattern:
- **Vague results:** "Before our next mock, go through your 3 best wins and add a concrete metric to each Result section. Even approximate numbers."
- **Long situations:** "Practice the 'one-sentence setup' drill: tell each of your STAR stories starting with exactly one sentence of situation."
- **No requirements clarification:** "For your next system design mock, I'm going to stop you if you start designing before asking at least 3 clarifying questions."
- **Same story for everything:** "Let's map your wins to question types right now so you have a cheat sheet."

Flag persistent patterns for adaptation — adaptation skill should add targeted practice to the daily plan.

## Score-based pattern detection

In addition to category-based patterns, use per-question dimension scores to detect weaknesses:

**Dimension weakness:** When a specific dimension scores 4 or below across 2+ mocks, flag it as a persistent weakness regardless of overall session performance.

> "Your [dimension] score has been consistently low: [X/10] in mock 1, [Y/10] in mock 2. This is your biggest lever for improvement."

**Score trend analysis:** Compare session averages across mocks:
- Improving (each mock higher) → encourage: "You're trending up — [X/10] → [Y/10]."
- Flat (same range) → diagnose: "You've plateaued around [X/10]. The [dimension] gap is holding you back."
- Declining → investigate: "Score dropped from [X/10] to [Y/10]. What changed? Were you more nervous, or were the questions harder?"

---

# Delivery Tracking (win-log integration)

When the user tells the same STAR story across multiple mocks:

## Compare delivery

Check `wins.md` and previous `mistake-journal.md` entries. If the same story was told before:

- **Is the Situation tighter?** (shorter, more focused)
- **Is the Result stronger?** (more specific, better metrics)
- **Are they incorporating previous feedback?** (check coaching from prior mocks)
- **Is the overall delivery more confident and concise?**

## Note improvements

> "You told the [win title] story in your last mock too — your delivery is way tighter this time. The Situation was half the length and you led with the impact."

Or if not improving:

> "You told the [win title] story again but the same issue came up — [specific issue]. Let's work on that one thing."

## Feed back to win-log

If the new delivery is significantly stronger, suggest updating the saved version:

> "Your latest telling of this story is stronger. Want me to update the saved version in your win log?"