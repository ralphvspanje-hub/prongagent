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

## Skill files

| File | When to read |
|------|-------------|
| `modes/extraction.md` | Entering extraction mode (proactive win mining) |
| `modes/mock-capture.md` | Receiving a flagged moment from mock-interview skill |
| `references/star-format.md` | Drafting any win into STAR format |
| `references/interview-mapping.md` | After saving a win -- mapping to question types and detecting gaps |
| `examples/win-extraction.md` | Reference examples of passive review, mock capture, and gap detection flows |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |

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
- When entering extraction mode, read `modes/extraction.md`.

**3. MOCK CAPTURE** — receive flagged moments from the mock-interview skill.
- Trigger: mock-interview skill flags a strong answer or a real achievement mentioned during a mock
- Lighter touch than extraction — the user already told the story, just needs STAR formatting
- Do NOT trigger independently — always receives from mock-interview skill
- When receiving a mock-interview flag, read `modes/mock-capture.md`.

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
| `memory/user-model.md` | Communication Style (how to prompt extraction — some users need questions, others narrate freely), Knowledge Anchors (for framing STAR stories using the user's strongest mental models) |
| `files/` (win log, STAR bank) | When extracting or mapping wins |
| `config/settings.md` | Verbosity preference |

## What to write

| File | When |
|------|------|
| `memory/win-log/wins.md` | Append polished STAR entry after user approves (NEVER overwrite existing wins) |
| `memory/win-log/candidates.md` | Update status: `draft` → `surfaced to user` → `accepted → wins.md` or `rejected` |
| `memory/win-log/interview-mapping.md` | Update category assignments + gap analysis after every new polished win |
| `memory/resume-context.md` | Update "Win extraction status" for processed roles/projects: `not started` → `extracted` → `polished` |
| `memory/user-model.md` | Append observation: Knowledge Anchors (how they tell stories — technical detail vs. narrative), Teaching Ability (can they explain impact clearly?), Communication Style (do they need prompting or narrate freely?) |
| `session-log.md` (this skill directory) | After execution if anything notable happened |

## Session log

This skill maintains `session-log.md` in this directory. Read the last 5-10 entries at the start of every execution for continuity and self-improvement.

After execution, append an entry if anything notable happened. Don't log routine executions.

**What to log:**
- Which wins the user approved, which they edited, which they rejected
- "User tends to undersell — always adds more impact than they initially describe"
- STAR formatting preferences, story framing that resonated

**Entry format:**
```markdown
### YYYY-MM-DD — [brief title]
- **Context:** [what triggered the skill]
- **Notable:** [what's worth remembering for next time]
- **User reaction:** [accepted / pushed back / modified / skipped]
```

**Archival:** If the log exceeds ~100 entries, summarize old entries into `session-log-archive.md` and start fresh.

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
| Yes / sure / let's do it | Move into extraction flow for this candidate (read `modes/extraction.md`, but pre-filled with the candidate's raw notes) |
| No / not now / skip | Update candidate status to `surfaced to user`. Note the date. Don't re-surface this specific candidate for at least 2 weeks. |
| "I don't see that as a win" / rejection | Update candidate status to `rejected`. Never re-surface. |
| "Not now but remind me later" | Keep as `draft`. Try again next week. |

---

When drafting a win, read `references/star-format.md` for the template.

After saving a win, read `references/interview-mapping.md` for mapping and gap detection.

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
