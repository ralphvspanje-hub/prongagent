---
name: prongagent-mock-interview
description: "Mock interview conductor with behavioral, technical, and system design modes"
tags: [learning, interview, practice]
user-invocable: true
metadata:
  openclaw:
    emoji: "🎭"
---

# Mock Interview Skill

## Configuration

This skill uses `config.json` for user preferences. If it doesn't exist, use the defaults below and offer to save the user's preferences.

| Field | Default | What it controls |
|-------|---------|-----------------|
| `default_mode` | `"behavioral"` | Default mock type when agent picks (`behavioral`, `technical`, `system_design`) |
| `difficulty` | `"intermediate"` | Question difficulty baseline (`beginner`, `intermediate`, `advanced`) |
| `follow_up_depth` | `2` | How many follow-up questions to ask per answer (1-3) |

## When to trigger

Three activation paths:

**1. SCHEDULED** — interview-prep skill includes mock interview sessions as crash course tasks. User opens the task (e.g., "Practice: Mock interview — behavioral (with learning companion) ~30min").

**2. MANUAL** — user says "let's do a mock interview", "practice interview", "mock me", "can we do a practice round", or similar.

**3. RECOMMENDED** — agent detects interview date in `memory/interview-context.md` is 5 or fewer days away AND `Prep Checklist → Mock interviews completed` is 0. Surface the suggestion:

> "Your interview is in [X] days and you haven't done a mock yet. Want to run one now? Even a quick behavioral round helps."

Do NOT push if the user declines. Note the decline and don't re-suggest for 2 days.

## Skill files

| File | When to read |
|------|-------------|
| `modes/behavioral.md` | User selects (or agent picks) behavioral mode |
| `modes/technical.md` | User selects (or agent picks) technical mode |
| `modes/system-design.md` | User selects (or agent picks) system design mode |
| `references/session-summary.md` | After the mock ends — summary format + mistake journal protocol |
| `references/mistake-patterns.md` | After 2+ mocks — cross-mock pattern detection + delivery tracking |
| `examples/sample-session.md` | Reference examples of behavioral mock, technical mock, and session summary |
| `session-log.md` | At skill start — read last 5-10 entries for continuity |

## What to read

Read ALL of the following before starting any mock:

| File | What to look for |
|------|-----------------|
| `memory/interview-context.md` | Target company, role, interview format, key requirements, industry/domain, days remaining, prep checklist (mocks completed, readiness) |
| `memory/win-log/wins.md` | Polished STAR stories — count, topics, content. Use these to coach during behavioral rounds ("your API redesign story is a better fit for this question"). |
| `memory/win-log/interview-mapping.md` | Wins by question type — detect gaps (question types with no mapped win). Target gaps in behavioral question selection. |
| `memory/mistake-journal.md` | Previous mock mistakes and patterns — don't repeat the same questions that exposed weaknesses without first checking if the user has practiced. Surface recurring patterns in feedback. |
| `memory/user-profile.md` | Dream career, target role, current skills, experience level — calibrate question difficulty and relevance |
| `memory/resume-context.md` | Work experience, projects, technologies — source material for behavioral questions based on real background. Ask about specific roles/projects. |
| `memory/current-plan.md` | Pillar levels — calibrate technical question difficulty. Plan type (should be `interview_prep` if interview is active). |
| `memory/progress.md` | Teach-back log — which concepts are solid vs weak. Weak concepts are fair game for technical questions. |
| `memory/spaced-repetition.md` | Active concepts — may inform technical question topics (concepts the user is still reviewing = likely weak spots) |
| `memory/user-model.md` | Communication Style (coaching tone under pressure), Avoidance Patterns (areas of anxiety — push but with awareness), Knowledge Anchors (calibrate question difficulty to demonstrated understanding) |
| `skills/mock-interview/config.json` | Default mode, difficulty, follow-up depth |
| `files/` (STAR story bank) | During debrief, for comparing user answers to existing stories |
| `config/settings.md` | Verbosity preference — adjust feedback depth |

## What to write

| File | When |
|------|------|
| `memory/mistake-journal.md` | After EVERY mock — append mistakes, patterns, coaching notes |
| `memory/win-log/candidates.md` | When user gives a strong answer with a real achievement not already in `wins.md` — flag for mock capture (win-log skill) |
| `memory/interview-context.md` | Update prep checklist: increment mocks completed count, update readiness assessment |
| `memory/progress.md` | Optionally note mock performance in general sense (e.g., "Mock #2: behavioral — Almost there") |
| `memory/user-model.md` | Append observation: Communication Style under pressure (verbose vs. terse, confident vs. hedging), Avoidance Patterns (questions they struggle with or try to dodge), confidence shifts visible during mock performance |
| `session-log.md` (this skill directory) | After execution if anything notable happened |

## Session log

This skill maintains `session-log.md` in this directory. Read the last 5-10 entries at the start of every execution for continuity and self-improvement.

After execution, append an entry if anything notable happened. Don't log routine executions.

**What to log:**
- Which mode was used, which questions were asked, performance (strong/partial/weak)
- Patterns across sessions: "user struggles with 'tell me about a time you failed' consistently"
- Delivery improvements or regressions compared to previous mocks

**Entry format:**
```markdown
### YYYY-MM-DD — [brief title]
- **Context:** [what triggered the skill]
- **Notable:** [what's worth remembering for next time]
- **User reaction:** [accepted / pushed back / modified / skipped]
```

**Archival:** If the log exceeds ~100 entries, summarize old entries into `session-log-archive.md` and start fresh.

## Downstream triggers

| Skill | Trigger condition |
|-------|------------------|
| `skills/win-log/SKILL.md` (mock capture mode) | Strong answer contains a real achievement not in `wins.md` |
| `skills/adaptation/SKILL.md` | Mock reveals a weak technical area — flag so adaptation adds targeted practice to next week |

---

## Setup — before the mock starts

### Step 1: Read context

Read all files from the "What to read" table. Note:
- Company, role, and interview format from `interview-context.md`
- Available STAR stories from `wins.md` and their question type mappings
- Previous mistakes and patterns from `mistake-journal.md`
- Pillar levels for difficulty calibration
- Weak concepts from teach-back log and SRS

### Step 2: Ask the user what mode

> "What type of mock do you want? Behavioral, technical, or system design? Or want me to pick based on what you need most?"

**If user picks a mode:** Use that mode.

**If user says "you pick" / "whatever you think" / "surprise me":**

Analyze the data to pick the mode that addresses the biggest gap:

1. Check `interview-mapping.md` — if 2+ question types have no mapped wins, pick **behavioral** (need more story practice)
2. Check `mistake-journal.md` — if recurring patterns exist in a specific mode, pick **that mode** (need to break the pattern)
3. Check pillar levels vs job requirements — if technical gaps are severe, pick **technical**
4. Check interview format from `interview-context.md` — if system design round is expected and user hasn't practiced, pick **system design**
5. Default tiebreaker: behavioral (most approachable, most commonly asked)

Tell the user what you picked and why:

> "I'm going with [mode] because [brief reason — e.g., 'you don't have a failure story yet and most interviews ask for one' or 'your SQL is Level 2 but the job needs Level 3+']."

### Step 3: First mock ever — adjust approach

Check `mistake-journal.md` and `interview-context.md → mocks completed`. If this is the first mock ever:

- Default to **behavioral** if the user says "you pick" (most approachable)
- Use common, well-known questions (not curveballs)
- Be extra encouraging in feedback — the goal is building confidence, not crushing it
- Save tough system design for mock 2+

### Step 4: Time constraint check

If the user mentions limited time ("I only have 10 minutes", "quick one"):

Offer a **lightning round**:

> "Let's do a lightning round — 2 behavioral questions, focused feedback on one thing to improve. ~10 minutes."

Lightning round rules:
- 2 questions only (behavioral by default, or 1 technical if user prefers)
- Feedback is focused on ONE actionable improvement, not comprehensive
- Still write to mistake-journal (abbreviated)
- Still counts toward mocks completed

---

Read the relevant mode file from `modes/` based on user selection. After the mock ends, read `references/session-summary.md` for summary format and mistake journal protocol. After 2+ mocks, also read `references/mistake-patterns.md` for cross-mock pattern detection and delivery tracking.

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Mock-interview-specific:**
- Question difficulty was miscalibrated for the user's level — too easy (user answered instantly with no effort) or too hard (user couldn't engage at all) (log the question, user's pillar level, and what difficulty would have been appropriate)
- The coaching feedback contradicted what a previous mock suggested (log both pieces of advice and what changed)
- Mistake pattern detection flagged something that isn't actually a pattern — false positive from too few data points or coincidental repetition (log the "pattern" and why it's not real)

## Edge cases

### User gets frustrated during mock

Pause immediately. Do NOT push through frustration.

> "Want to take a break, switch to a different question, or call it here? All good either way."

If they want to stop: end the mock gracefully, still write session summary and mistake-journal for questions completed. Frame positively: "We covered [N] questions — that's useful data. [One positive thing from the session]."

### User asks for hints during technical round

Give a nudge, not the answer:

> "Think about [relevant concept or approach]..."

Note the hint in your evaluation. Hint-assisted answers are scored lower but still valuable practice. In the mistake journal, note: "Required hint — [what hint was given]."

### No interview context (general practice)

User just wants general practice — no active interview in `interview-context.md`:

- Run a generic mock using common questions for their dream career role from `user-profile.md`
- Calibrate difficulty to pillar levels
- Still write to `mistake-journal.md` — patterns from general practice carry forward
- Skip company-specific questions and research-based questions
- Still use `wins.md` for coaching if populated

### User wants to redo a question

Allow it. This is great practice.

> "Sure — take another shot. I'll compare both attempts."

After the second attempt:
- Note what improved and what didn't
- In the mistake journal, log both attempts: "Attempt 1: [issue]. Attempt 2: [improvement or persistent issue]."
- Only the better attempt counts toward the overall session rating

### First mock ever

Go easier (already covered in Setup Step 3):
- Default to behavioral
- Use standard, well-known questions
- Be extra encouraging
- Save system design for mock 2+
- Feedback focuses on 1 thing to improve, not a list

### User has done 5+ mocks and still makes the same mistakes

Escalate — standard coaching isn't working:

> "We've practiced this pattern several times and it keeps coming up. Let's try a different approach: [specific exercise targeting the root cause]."

See the escalation section in `references/mistake-patterns.md`.

### Time constraint — lightning round

Already covered in Setup Step 4:
- 2 questions, ~10 minutes
- 1 actionable feedback point
- Abbreviated mistake-journal entry
- Counts toward mocks completed

### Post-interview debrief

User comes back after the REAL interview — not a mock:

> "How did it go? What questions did they ask? How did you feel about your answers?"

Capture everything:
- Questions they were asked -> add to `mistake-journal.md` under a "## YYYY-MM-DD — Real Interview Debrief" section
- What felt good -> reinforce in future mocks
- What felt shaky -> target in next mock or future prep
- New information about the process -> update `interview-context.md`
- Strong answers the user gave -> consider for `win-log/candidates.md` if they describe real achievements

This is a learning opportunity, not a mock. Don't score it — just listen, capture, and adjust.

### User wants a specific question type

If the user requests a specific question (e.g., "ask me about failure", "give me a SQL question"):

- Honor the request — ask exactly that type
- Still conduct it as a proper mock (full evaluation, feedback, mistake-journal)
- Note in the session summary that the question was user-requested

### Mixed mode request

User says "can we do 2 behavioral and 1 technical?":

- Honor it — run a mixed mock
- Apply the relevant mode rules for each question type
- Session summary covers both modes
- Mistake journal entries note the mode per question

---

## Hooks

While this skill is active (during a mock interview session), enforce these constraints:

| Hook | What it prevents | Why |
|------|-----------------|-----|
| No meta-breaks | Breaking character with "as an AI" caveats or disclaimers during the interview portion | Destroys immersion — the mock loses value if the interviewer reminds them it's simulated |
| No mid-session coaching | Giving hints, feedback, or coaching during the interview — save ALL evaluation for the debrief after the mock ends | Mock interviews test performance under pressure; real-time coaching trains dependency, not readiness |
| No answer sheet | Reading `memory/win-log/wins.md` during the interview portion (read it during setup, not during questions) | Reading their polished STAR stories while asking questions is like giving them the answer sheet — defeats the purpose of testing recall |
