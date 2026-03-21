# Post-Interview

## Check-in (after interview date passes)

The day after the interview date (or when the user next engages), check in:

> "How did the interview go?"

## Handle the response

| User says | Action |
|-----------|--------|
| **Got the job / advancing to next round** | Celebrate genuinely. If more rounds: stay in `interview_prep`, adjust based on feedback about round 1. If offer accepted: "That's huge. Want help prepping for your first week?" Transition back to learning plan with an onboarding-for-the-new-job focus. |
| **Didn't get it** | Encourage without being fake: "That's rough. But you put in real prep and that carries forward." Capture learnings: "What questions surprised you? Anything you wish you'd practiced more?" Add weak areas to the plan for next time. Transition back to learning plan with targeted reinforcement on the gaps they identified. |
| **Waiting to hear back** | "Fingers crossed. While you wait, want to keep prepping (in case there's another round) or go back to your regular plan?" Respect their choice. |
| **More rounds coming** | Stay in `interview_prep` mode. Ask what round 1 was like — format, questions, what felt good, what was hard. Adjust the crash course for the next round. Update `interview-context.md` with round 1 feedback. |
| **Got another interview at a different company** | Handle the multi-interview case (see edge cases). |

## Capture real interview questions

After discussing how it went, capture the actual questions asked:

> "What questions were you actually asked? I'll save them — they're gold for future mock improvement."

For each question the user recalls:
1. Write to `memory/real-interview-questions.md` under a `## [Company] — [Role] — YYYY-MM-DD` heading
2. Categorize each question: behavioral / technical / system-design / product-sense / other
3. Note any surprises — questions that weren't expected based on the JD or prep

If the user can't remember specifics, don't push — even partial recall is useful.

## Transition back to learning plan

When interview prep ends (job secured, user wants to stop, or interview process concluded):

1. **Change plan type** back to the previous plan type. Check `## Saved Plan (before interview_prep)` → `Previous plan type`:
   - If `learning` → restore to `learning`
   - If `job_search` → restore to `job_search` (the user was job searching before this specific interview — they're likely still searching)
   - If unclear → ask: "Want to go back to your regular learning plan, or stay in job search mode?"
2. **Restore previous plan** from the `## Saved Plan (before interview_prep)` section — restore pillars, weights, and week number. If restoring to `job_search`, also restore the `job_search_started` date.
3. **Incorporate learnings** — if the interview revealed specific weak areas, adjust pillar weights to address them
4. **Update interview-context.md** — set Status to `completed` or `cancelled`, add post-interview notes
5. **Resume daily plan** from where they left off

> "Your interview prep is wrapped up. I've restored your regular learning plan — picking up where you left off at Week [N]. [If weak areas identified:] I've also bumped up [pillar] weight based on what came up in your interview."