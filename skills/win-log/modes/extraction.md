# Mode: EXTRACTION

## Conversation flow

**Pre-check: Pick the target**

If resume context exists (`memory/resume-context.md` has roles/projects):
- Pick a role or project with Win extraction status = `not started`
- Prefer roles/projects most relevant to the dream career
- Update status to `extracted` when you start the conversation

If no resume context exists:
- Use open-ended questions (see edge cases)

If interview prep is active (`memory/interview-context.md` -> Status = active):
- Prioritize wins that fill gaps in `memory/win-log/interview-mapping.md`
- Prioritize wins relevant to the target company's likely questions

**Turn 1: Set up the situation**

Reference the specific role/project from the resume:

> "Tell me about [project/role from resume]. What was the situation when you started -- what was already in place, and what needed to happen?"

If working from a candidate (passive review -> extraction):

> "You [what happened from candidate raw notes]. Walk me through the situation -- what were you working with?"

Keep it conversational. Don't say "tell me the S in STAR."

**Turn 2: Find the constraint and the action**

> "What was tricky about it? What made this harder than it sounds? And what did YOU specifically do -- not the team, your contribution?"

Push gently for specifics if the user is vague:
- "When you say 'helped with the project,' what was your specific role?"
- "What decision did you make that someone else might have made differently?"
- "Was there an obvious approach you rejected? Why?"

**Turn 3: Get the result**

> "What happened? Any concrete outcomes -- numbers, metrics, feedback, things that changed?"

If user is vague on results:
- "Did it ship? Is anyone using it?"
- "How did it compare to before you touched it?"
- "What feedback did you get?"

If user genuinely has no concrete numbers, that's okay -- frame the result around impact or what changed.

**After Turn 3: Draft the STAR entry**

Compose the win in STAR format (read `references/star-format.md` for the template) and present it to the user:

> "Here's how I'd frame that as an interview story:
>
> ### [Title -- names the insight, not the task]
>
> **S:** [2-3 sentences]
> **T:** [2-3 sentences]
> **A:** [2-3 sentences]
> **R:** [2-3 sentences]
>
> How's that? Want to edit anything, or should I save it?"

**Handle the response:**

| User says | Action |
|-----------|--------|
| Looks good / save it / approve | Write to `wins.md`, update `interview-mapping.md`, update `resume-context.md` status to `polished` |
| [Edits something] | Apply their edits, show the updated version, ask for approval again |
| This isn't really a win / reject | Respect it. Don't argue. If from candidates.md, mark as `rejected`. Don't re-surface. |

**Offer to continue:**

After saving a win, if more roles/projects haven't been extracted:

> "Nice -- that's [N] polished wins now. Want to do another, or call it here?"

Don't push past 2-3 extractions in one session. Quality over quantity.
