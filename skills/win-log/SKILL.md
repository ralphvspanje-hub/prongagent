---
name: prongagent-win-log
description: "Achievement extraction, STAR formatting, and interview mapping"
tags: [learning, interview, achievements]
user-invocable: true
metadata:
  openclaw:
    emoji: "🏆"
---

# Win Log Skill

## When to trigger

Three activation paths (modes):

**1. PASSIVE REVIEW** — surface candidates from `memory/win-log/candidates.md` for polishing.
- Trigger: `candidates.md` has 3+ entries with Status = `draft`, OR during weekly review (weekly-review skill can hand off)
- Maximum 1 passive review session per week — don't nag
- Do NOT interrupt another conversation to surface candidates — queue for the next natural interaction

**2. EXTRACTION** — proactive win mining from the user's background.
- Trigger: interview prep activates and win log has < 5 polished entries in `memory/win-log/wins.md`, OR user explicitly asks to work on wins ("help me with my win log", "let's work on interview stories", etc.)
- Read `memory/resume-context.md` for roles and projects to mine
- If no resume context exists, use open-ended conversation instead

**3. MOCK CAPTURE** — receive flagged moments from the mock-interview skill.
- Trigger: mock-interview skill flags a strong answer or a real achievement mentioned during a mock
- Lighter touch than extraction — the user already told the story, just needs STAR formatting
- Do NOT trigger independently — always receives from mock-interview skill

## What to read

| File | What to look for |
|------|-----------------|
| `memory/win-log/wins.md` | Existing polished wins — count, topics, question type coverage. Never overwrite. |
| `memory/win-log/candidates.md` | Draft candidates with Status = `draft` — these are your input for passive review |
| `memory/win-log/interview-mapping.md` | Current category coverage — detect gaps after every new win |
| `memory/resume-context.md` | Work experience, projects, technologies — source material for extraction. Check "Win extraction status" per role. |
| `memory/user-profile.md` | Dream career (target role, why), current role — for framing wins toward the target |
| `memory/interview-context.md` | Target company, role, date — for tailoring wins when interview prep is active |
| `memory/mistake-journal.md` | Mock interview mistakes — cross-reference to avoid surfacing stories the user struggled to tell |
| `memory/progress.md` | Pillar levels, teach-back log — for identifying learning plan wins (portfolio projects, pillar mastery) |
| `config/settings.md` | Verbosity preference |

## What to write

| File | When |
|------|------|
| `memory/win-log/wins.md` | Append polished STAR entry after user approves (NEVER overwrite existing wins) |
| `memory/win-log/candidates.md` | Update status: `draft` → `surfaced to user` → `accepted → wins.md` or `rejected` |
| `memory/win-log/interview-mapping.md` | Update category assignments + gap analysis after every new polished win |
| `memory/resume-context.md` | Update "Win extraction status" for processed roles/projects: `not started` → `extracted` → `polished` |

---

## Mode: PASSIVE REVIEW

### When candidates.md has 3+ draft entries

**Step 1: Read candidates**

Read `memory/win-log/candidates.md`. Filter for entries with Status = `draft`. If < 3, skip — not enough to warrant a session.

**Step 2: Pick the strongest 1-2 candidates**

Rank by interview usefulness:
1. Candidates that fill a gap in `memory/win-log/interview-mapping.md` (highest priority)
2. Candidates with concrete outcomes or numbers mentioned in the raw notes
3. Candidates most relevant to the user's dream career from `memory/user-profile.md`

**Step 3: Surface to the user**

> "I've noticed a few things you've done that could make great interview stories. Here's one:
>
> [Short description of candidate]. [Why it might be a win — 1 sentence].
>
> Want to polish this into a proper STAR story? Takes about 2 minutes."

**Step 4: Handle response**

| User says | Action |
|-----------|--------|
| Yes / sure / let's do it | Move into extraction flow for this candidate (see Extraction Turn 1-3 below, but pre-filled with the candidate's raw notes) |
| No / not now / skip | Update candidate status to `surfaced to user`. Note the date. Don't re-surface this specific candidate for at least 2 weeks. |
| "I don't see that as a win" / rejection | Update candidate status to `rejected`. Never re-surface. |
| "Not now but remind me later" | Keep as `draft`. Try again next week. |

---

## Mode: EXTRACTION

### Conversation flow

**Pre-check: Pick the target**

If resume context exists (`memory/resume-context.md` has roles/projects):
- Pick a role or project with Win extraction status = `not started`
- Prefer roles/projects most relevant to the dream career
- Update status to `extracted` when you start the conversation

If no resume context exists:
- Use open-ended questions (see edge cases)

If interview prep is active (`memory/interview-context.md` → Status = active):
- Prioritize wins that fill gaps in `memory/win-log/interview-mapping.md`
- Prioritize wins relevant to the target company's likely questions

**Turn 1: Set up the situation**

Reference the specific role/project from the resume:

> "Tell me about [project/role from resume]. What was the situation when you started — what was already in place, and what needed to happen?"

If working from a candidate (passive review → extraction):

> "You [what happened from candidate raw notes]. Walk me through the situation — what were you working with?"

Keep it conversational. Don't say "tell me the S in STAR."

**Turn 2: Find the constraint and the action**

> "What was tricky about it? What made this harder than it sounds? And what did YOU specifically do — not the team, your contribution?"

Push gently for specifics if the user is vague:
- "When you say 'helped with the project,' what was your specific role?"
- "What decision did you make that someone else might have made differently?"
- "Was there an obvious approach you rejected? Why?"

**Turn 3: Get the result**

> "What happened? Any concrete outcomes — numbers, metrics, feedback, things that changed?"

If user is vague on results:
- "Did it ship? Is anyone using it?"
- "How did it compare to before you touched it?"
- "What feedback did you get?"

If user genuinely has no concrete numbers, that's okay — frame the result around impact or what changed.

**After Turn 3: Draft the STAR entry**

Compose the win in STAR format (see format below) and present it to the user:

> "Here's how I'd frame that as an interview story:
>
> ### [Title — names the insight, not the task]
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

> "Nice — that's [N] polished wins now. Want to do another, or call it here?"

Don't push past 2-3 extractions in one session. Quality over quantity.

---

## Mode: MOCK CAPTURE

### Receiving a flagged moment from mock-interview

The mock-interview skill identifies a strong answer or real achievement during the mock and passes it to this skill.

**Step 1: Acknowledge the moment**

> "That answer about [topic] was strong. Want me to save it as a polished win?"

**Step 2: Light-touch extraction**

The user already told the story during the mock — you have the content. Draft the STAR entry from what they said, filling in any gaps:

- If the story was complete (clear situation, action, result): draft immediately
- If the story was missing the result or context: ask ONE follow-up question, not the full 3-turn extraction

> "Quick — what was the concrete outcome of that? Any numbers or feedback?"

**Step 3: Present the draft**

Same as extraction — show the STAR entry, ask for approval.

**Step 4: Compare with existing wins**

If the user told the same story in a previous mock (check `memory/win-log/wins.md`):
- Don't create a duplicate
- Instead, note delivery improvement: "You told this story last time too — your delivery is much tighter now. The version from today is stronger. Want me to update the saved version?"

---

## STAR Format

Every polished win in `memory/win-log/wins.md` follows this exact structure:

```markdown
### [Title that names the insight, not the task]

- **Source:** observed / extracted / mock-capture
- **Date added:** YYYY-MM-DD
- **Pillar:** Which skill area this relates to (or "career" for non-learning-plan wins)

**S:** The situation — what system, what stage, what was already in place. (2-3 sentences)
**T:** The constraint or challenge — what made this non-trivial. (2-3 sentences)
**A:** The reasoning — why you rejected obvious approaches, what you chose and why. (2-3 sentences)
**R:** The outcome — what now works and why it matters. (2-3 sentences)

**Best for question type:** [primary type] (also: [secondary type if applicable])
```

### Title rules

- Name the INSIGHT or decision, not the task
- Good: "Chose event-driven over polling to handle scale"
- Good: "Ran user interviews before writing code to avoid building the wrong thing"
- Bad: "Fixed the notification system"
- Bad: "Worked on the database"

### Content rules

- Focus on the USER's specific contribution, not the team's
- Include concrete numbers/outcomes in R when possible
- Keep each section to 2-3 sentences — tight enough to tell in an interview without rambling
- If the user's words are stronger than your draft, use their words
- Don't inflate — a small win told honestly is better than a big win that sounds fake

---

## Interview Mapping

After every new polished win is saved to `wins.md`, update `memory/win-log/interview-mapping.md`.

### Question types

| Category | What it tests | Example interview question |
|----------|--------------|---------------------------|
| Leadership / Initiative | Driving change, taking ownership without being asked | "Tell me about a time you led a project or initiative" |
| Technical Problem Solving | Debugging, architecture, technical decisions | "Describe a difficult technical problem you solved" |
| Failure / Learning | Handling setbacks, growth mindset | "Tell me about a time you failed and what you learned" |
| Collaboration / Conflict | Working with others, resolving disagreements | "Describe a time you disagreed with a teammate" |
| Creativity / Innovation | Novel approaches, thinking differently | "Tell me about a time you came up with a creative solution" |
| Time Pressure / Prioritization | Working under constraints, making tradeoffs | "Tell me about a time you had to deliver under a tight deadline" |

### Mapping rules

- Each win maps to 1-2 question types
- Mark the strongest mapping (the question type this story best answers)
- A win can be a backup for a second category
- Format in `interview-mapping.md`:

```markdown
## Leadership / Initiative

- [Win title] (strongest — [why this fits])
- [Another win title] (backup — [why this also works])

## Technical Problem Solving

- [Win title] (strongest — [why])
...
```

### Gap detection

After EVERY new win is added, scan the full mapping. Run this check:

1. Count polished wins per question type
2. If any question type has 0 wins AND total polished wins ≥ 5: flag it

Surface the gap to the user:

> "You've got [N] solid wins now, but I notice you don't have a [gap category] story yet. Most interviews ask about this. Want to think of one?"

If multiple gaps exist, flag the most commonly asked one first:
1. Failure / Learning (almost always asked)
2. Collaboration / Conflict (very common)
3. Leadership / Initiative (common for PM/senior roles)
4. Time Pressure / Prioritization
5. Creativity / Innovation
6. Technical Problem Solving

### Imbalance detection

If all wins map to the same 1-2 categories:

> "All your stories are [category]. Interviewers also ask about [missing categories]. Want to work on those?"

---

## Integration with mock interviews

The mock-interview skill has full access to `wins.md` and `interview-mapping.md`. Win-log provides:

1. **Story suggestions for specific question types:** When the mock-interview skill needs a story for a behavioral question, it looks up the mapping and suggests the strongest win for that category.

2. **Gap alerts:** If the mock-interview skill encounters a question type with no mapped wins, it notes it as a coaching point: "You didn't have a ready story for that question type. Want to work on one after the mock?"

3. **Delivery tracking:** If the user tells the same win story across multiple mocks, note improvements in delivery (tighter framing, better numbers, clearer structure). Track in the win entry or in a note appended to the mock-interview feedback.

4. **Polished stories for practice:** The user can review their wins before a mock or real interview. The mapping serves as an interview cheat sheet: "For leadership questions, lead with [win title]. For failure questions, use [other win title]."

---

## Tone rules

- **Collaborative, not interrogative.** You're helping them articulate what they already did — not grilling them.
- **Respect rejection.** If they say something isn't a win, it isn't. Don't argue or re-frame.
- **Celebrate specifics.** When they share a concrete number or outcome, call it out: "That's a great detail — interviewers love specifics like that."
- **Frame toward the dream career.** Reference `memory/user-profile.md` → target role when explaining why a win matters: "This story shows exactly the kind of [skill] that [target role] requires."
- **Keep sessions short.** 2-3 wins per session max. Quality extraction takes energy.
- **Adjust by verbosity** (from `config/settings.md`):

| Verbosity | Style |
|-----------|-------|
| concise | Minimal prompts, draft quickly, skip coaching commentary |
| normal | Standard 3-turn extraction, brief coaching on framing |
| detailed | Full extraction with coaching: why STAR works, what makes this story strong, how to deliver it |

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Win-log-specific:**
- User's achievement didn't fit the STAR format naturally — the story was strong but S/T/A/R felt forced (log what the achievement was and what format would have worked better)
- Interview mapping categories don't cover the type of story the user told (log the story and what category it would need)
- Extraction conversation felt formulaic or interrogative — the 3-turn flow didn't match the natural rhythm of the conversation (log what happened and what flow would have felt better)

## Edge cases

### User has no resume context

Extraction mode relies entirely on conversation. Ask open-ended:

> "Tell me about something you've built or done that you're proud of. Doesn't have to be work — school projects, personal projects, side hustles, anything."

Follow the same 3-turn flow but without referencing specific roles.

### User rejects a drafted win

Respect it completely. Update status in `candidates.md` to `rejected`. Never re-surface it. They may not see it as a win or may not want to discuss it — both are valid.

### User's wins are all from one category

Flag the imbalance after the 3rd win in the same category:

> "All your stories are [category]. Interviewers also ask about [missing categories]. Want to work on those?"

Suggest which resume roles or learning plan achievements might fill the gap.

### Win from the learning plan (not job history)

Completing a portfolio project, mastering a pillar, or building something during the plan IS a win. Frame it:

> "You built [project] using [skills] in [timeframe] — that's a legitimate portfolio story. Want me to frame it as a STAR entry?"

These are especially valuable for career switchers or students who don't have extensive work history.

### Interview prep not active

Win-log still works in passive review + extraction mode. Interview mapping is maintained regardless — it's always useful to categorize wins even if no interview is imminent. When interview prep activates, the mapping is ready.

### Very senior user with 20+ potential wins

Don't try to extract all of them. Target 8-12 polished wins covering all 6 question types. After reaching coverage:

> "You've got [N] wins covering all the major question types. That's a solid set. We can always add more later, but quality > quantity."

Prioritize wins most relevant to the dream career and target role.

### User's stories are vague

Push gently for specifics — this is coaching, not interrogation:

- "What did YOU specifically do? Not the team — your contribution."
- "Can you give me a number? Even a rough estimate helps — 'about 50 users' is better than 'some users.'"
- "What would have happened if you hadn't done this?"

If they genuinely can't be specific after prompting, work with what you have. A slightly vague win is still better than no win.

### User wants to edit an existing win

Read the current entry from `wins.md`, show it, let them dictate changes. Rewrite and present for approval. Don't treat this as a new extraction — it's a revision.

### Candidate was rejected but user later brings it up

If the user independently brings up a story that matches a previously rejected candidate, treat it fresh — they may now see it differently. Don't mention the previous rejection.

### Mock interview reveals a new framing for an existing win

If the user tells an existing win story differently during a mock and the new framing is stronger:

> "You told the [win title] story differently this time — the new framing is stronger because [reason]. Want me to update the saved version?"

### Learning plan achievements as wins (specific cases)

These learning plan events are win-worthy:
- Leveled up a pillar significantly faster than the plan expected
- Built a working portfolio project from the plan
- Passed a level-up gate on the first attempt for a pillar they initially struggled with
- Teach-back response was surprisingly deep (flagged by teach-back skill in candidates.md)

Frame these as "self-directed learning" wins — interviewers value demonstrated learning ability.

---

## Example: passive review → extraction

```
Agent: "I've noticed something from your learning log worth capturing. Two weeks
        ago you were struggling with SQL window functions — couldn't explain them
        in the teach-back. This week you nailed the Level 2 gate on the first try,
        including a correlated subquery question. That's a real skill-building story.

        Want to polish this into an interview-ready win?"

User:  "Sure, but is that really impressive enough for an interview?"

Agent: "Absolutely. Interviewers love 'I identified a gap, worked on it
        systematically, and can now demonstrate mastery.' It shows self-awareness
        and follow-through. Let me ask a few questions to frame it right.

        What was the situation — what were you trying to learn and why?"

User:  "I was preparing for PM interviews and realized I couldn't query my own
        data. Like, I understood conceptually what a JOIN does but couldn't write
        one without Googling every syntax detail."

Agent: "Good. What made this tricky? What did you try that didn't work at first?"

User:  "I tried just reading documentation but it didn't stick. I switched to
        doing actual exercises on real datasets — Mode Analytics problems. The
        window functions in particular took me like 3 different resources before
        it clicked."

Agent: "And the result?"

User:  "I can now write complex queries from scratch. I actually used SQL to
        pull data for a class project last week and my professor commented that
        my analysis was more detailed than most students who've been using SQL
        for years."

Agent: "Here's how I'd frame that:

        ### Identified SQL as a gap and closed it through deliberate practice

        **S:** Preparing for Product Manager interviews. Had conceptual
        understanding of databases but couldn't write queries beyond basic
        SELECT statements — a critical gap for data-driven PM roles.
        **T:** Documentation and passive learning weren't sticking.
        Window functions and JOINs required a different approach — the
        syntax was secondary to understanding how data flows through
        these operations.
        **A:** Switched from reading docs to hands-on exercises with
        real datasets (Mode Analytics). Tried 3 different resources for
        window functions until finding one that clicked. Practiced daily
        for 3 weeks, building complexity gradually.
        **R:** Can now write complex queries from scratch. Used SQL to
        pull data for a university project — professor noted the analysis
        was more detailed than most students with years of SQL experience.
        Passed the Level 2 SQL gate on the first attempt.

        **Best for question type:** Technical Problem Solving (also: Initiative / Self-Direction)

        How's that? Want to change anything?"

User:  "That's good. Save it."

Agent: "Saved. That's your 3rd polished win. Quick note: you don't have
        a failure/learning story yet — most interviews ask this. Want to
        think of one next time?"
```

## Example: mock capture

```
[During mock interview, user gives a strong answer about building RetainIt]

Agent: "That answer about running 7 user interviews before writing code
        for RetainIt was really strong — it shows product thinking, not just
        engineering. Want me to save it as a polished win?"

User:  "Yeah, that felt like a good answer."

Agent: "Quick — what was the concrete outcome of the user research?
        Did it change what you built?"

User:  "Totally. I discovered the 'Google Effect' — people don't retain
        info they know they can look up. That insight shaped the entire
        app's spaced repetition approach. Without those interviews I
        would've just built a flashcard app."

Agent: "Here's the draft:

        ### Ran user interviews before writing code to avoid building the wrong thing

        **S:** Building RetainIt, an AI-powered knowledge retention app.
        Had a working concept for a flashcard-style app but no validation
        that the core assumption — people want to memorize facts — was
        correct.
        **T:** Most developers skip user research and jump to building.
        Needed to validate the core value proposition before investing
        months of development, but had no UX research background.
        **A:** Conducted 7 structured user interviews before writing a
        line of code. Discovered the 'Google Effect' — people don't
        retain information they know they can look up. This insight
        reframed the product from 'memorize facts' to 'build lasting
        knowledge through spaced repetition.'
        **R:** The app's entire architecture was shaped by this research.
        RetainIt uses FSRS-based spaced repetition instead of simple
        flashcards — a fundamentally different product than what would
        have been built without the interviews. Live at retainit.app.

        **Best for question type:** Creativity / Innovation (also: Initiative / Self-Direction)

        Save it?"
```

## Example: gap detection

```
Agent: "You've got 5 polished wins now — nice set. Here's your coverage:

        ✅ Leadership / Initiative — 1 story
        ✅ Technical Problem Solving — 2 stories
        ✅ Creativity / Innovation — 1 story
        ✅ Initiative / Self-Direction — 1 story (backup)
        ❌ Failure / Learning — no story yet
        ❌ Collaboration / Conflict — no story yet

        Most interviews ask about failure and what you learned from it.
        Can you think of a time something went wrong — a project that
        didn't work out, a bad decision, a deadline you missed? The key
        is showing what you learned, not the failure itself."
```
