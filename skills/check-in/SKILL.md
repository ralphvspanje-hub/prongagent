---
name: prongagent-check-in
description: "Evening progress check-in conversation with streak tracking"
tags: [learning, progress, check-in]
user-invocable: true
metadata:
  openclaw:
    emoji: "✅"
---

# Check-In Skill

## When to trigger

- Evening at configured check-in time (from `config/settings.md`, default 20:00)
- User messages the agent about their progress unprompted ("I did the SQL thing", "finished today's tasks", etc.)
- User checks in the next morning about yesterday — still counts for yesterday's tasks

Do NOT trigger if:
- No plan has been generated yet (no `memory/plan-tasks/week-{N}.md` exists or all days are empty)
- Today is a day off AND the user hasn't messaged about progress — just let them rest

## What to read

- `memory/plan-tasks/week-{N}.md` — today's assigned tasks (the source of truth for what to check against)
- `memory/current-plan.md` — current week number, pillar info
- `memory/progress.md` — current streak, completion counts, pillar levels and blocks
- `memory/history.md` — to avoid duplicate entries if user checks in twice
- `config/settings.md` — check-in time, teach-back frequency, resource feedback frequency, verbosity
- `memory/user-profile.md` — name, dream career (for warm responses)
- `memory/user-model.md` — communication style (for response tone and length), motivation drivers (for framing acknowledgments)

## What to write

- `memory/plan-tasks/week-{N}.md` — update task statuses (pending → done/skipped/partial)
- `memory/history.md` — append one row per completed task (append-only, never delete)
- `memory/progress.md` — update streak, completion counts, pillar blocks
- `memory/user-model.md` — append observation to Observation Log if the check-in reveals: completion patterns (time-of-day, which pillars get done vs skipped), communication style signals (response length, tone), engagement signals (enthusiasm vs. terse reporting)
- `session-log.md` (this skill directory) — after execution if anything notable happened

## Session log

This skill maintains `session-log.md` in this directory. Read the last 5-10 entries at the start of every execution for continuity and self-improvement.

After execution, append an entry if anything notable happened. Don't log routine executions.

**What to log:**
- How the user reports (terse vs detailed), what format they use
- "User always says 'did all 3' — doesn't elaborate" → keep responses equally terse
- Notable patterns in what gets completed vs skipped

**Entry format:**
```markdown
### YYYY-MM-DD — [brief title]
- **Context:** [what triggered the skill]
- **Notable:** [what's worth remembering for next time]
- **User reaction:** [accepted / pushed back / modified / skipped]
```

**Archival:** If the log exceeds ~100 entries, summarize old entries into `session-log-archive.md` and start fresh.

## Conversation flow

### Turn 1: Open the check-in

Keep it short. One message. Match the user's energy — this is texting a friend, not filing a report.

**Normal opener:**

> Hey — how'd today go?

**If user has a streak going (3+ days):**

> Day [N] — how'd it go?

**If user missed yesterday (streak = 0 or broke recently):**

> How was today?

No guilt, no commentary about yesterday. Just ask about today.

**If user already messaged about progress** (they initiated the check-in):

Skip the opener entirely. Go straight to processing their message.

### Turn 2: Process the response

Accept ANY response format. The user should never feel like they're filling out a form.

**Examples of valid responses and how to parse them:**

| User says | Interpretation |
|-----------|----------------|
| "Did all 3" / "finished everything" | All tasks → done |
| "Only the first one" | Task 1 → done, rest → skipped |
| "Did the SQL thing but skipped LeetCode" | Match by topic/resource name → done/skipped |
| "Didn't do anything" / "0" / "nope" | All tasks → skipped |
| "Did 1 and 3" | Tasks 1, 3 → done, task 2 → skipped |
| "Half-finished the video" | Match task → partial |
| "I did some stuff" | Vague — ask one clarifying question (see below) |
| "✅✅❌" / emoji reactions | Map positionally to task list |
| "Did the Python thing and also watched an extra video on Docker" | Task match → done + extra task noted |

**Matching logic:** Match the user's description against today's tasks by:
1. Task number ("the first one", "1 and 3")
2. Resource name ("the SQL thing", "LeetCode")
3. Pillar name ("the system design one")
4. Action type ("the video", "the reading")

If the match is ambiguous, ask one brief clarifying question:

> Which one — the [resource A] or the [resource B]?

**If the user is vague** ("I did some stuff"):

Ask ONE clarifying question, then accept whatever they give:

> Cool — which ones specifically? [list today's tasks briefly]

If they're still vague after the clarifying question, mark what you can confidently map and mark the rest as "skipped". Don't interrogate.

### Turn 3 (optional): Respond and close

This is the last turn. Acknowledge, update, done.

## Skill files

| File | When to use |
|------|------------|
| `scripts/streak-counter.ts` | Step 3 (Update progress) — run this to calculate updated streak values |

### scripts/streak-counter.ts

**What it does:** Reads progress.md and calculates the updated streak based on tasks completed today.

**Usage:** `bun run skills/check-in/scripts/streak-counter.ts <path-to-progress.md> <tasks-completed-today>`

- `path-to-progress.md` — typically `memory/progress.md`
- `tasks-completed-today` — integer count of done + partial tasks

**Output:**
```
current_streak: 8
previous_streak: 7
longest_streak: 12
is_new_record: false
last_active: 2026-03-20
tasks_completed_today: 2
tasks_completed_all_time: 47
```

**Why scripted:** Streak counting requires date awareness (was yesterday the last active day, or was there a gap?) and sequential logic that an LLM can miscount.

---

## Processing logic (after extracting task statuses)

### Step 1: Update task statuses

In `memory/plan-tasks/week-{N}.md`, change the Status column for each of today's tasks:

| User reported | New status |
|---------------|------------|
| Completed | done |
| Skipped / didn't do | skipped |
| Half-finished / partially done | partial |
| Not mentioned (and not vague) | skipped |

### Step 2: Append to history

For each task marked "done", append a row to `memory/history.md`:

| Date | Task | Pillar | Type | Resource | Size | Notes |
|------|------|--------|------|----------|------|-------|
| [today] | [action summary] | [pillar] | [type] | [search suggestion or curated resource name] | [Short/Medium/Long] | [any user context, or blank] |

For tasks marked "partial", also append but note "(partial)" in the Notes column.

Do NOT append skipped tasks — history is for completed work only.

**Extra tasks** (user did something not on the plan): Append to history with Pillar = best guess, Type = best guess, Resource = what they described. These count as completed tasks for streak purposes.

### Step 3: Update progress

Run `scripts/streak-counter.ts` to calculate updated streak values:

```bash
bun run skills/check-in/scripts/streak-counter.ts "memory/progress.md" <tasks-completed-today>
```

Use the output values to update `memory/progress.md`:

**Streak:**
- Set **Current** to `current_streak` from the script output
- Set **Longest** to `longest_streak` from the script output
- Set **Last active** to `last_active` from the script output
- If `is_new_record: true`, mention the new record in the response

Do NOT manually calculate streak logic — the script handles date gaps, same-day check-ins, and reset logic.

**Completion:**
- Set "All time" to `tasks_completed_all_time` from the script output
- Increment "This week" completed count by number of done + partial tasks

**Pillar Levels — blocks:**
- Each "done" task adds +1 block to that task's pillar
- Each "partial" task adds +0.5 block (round down when checking threshold — 4.5 is not 5)
- **IMPORTANT: When a pillar reaches 5/5 blocks, do NOT auto-level-up.** Leave it at 5/5. The teach-back skill handles the level-up gate — the user must pass a teach-back before advancing. Just note that it's ready (see response section below).

### Step 4: Check for downstream triggers

After processing, check two things. Do NOT act on them during this check-in — just flag them internally for the next interaction.

**Resource feedback eligibility:**
- Count total completed tasks (all time) from `memory/progress.md`
- Roughly 1 in 3 completed tasks should trigger resource feedback
- If eligible: note which completed task to ask about (prefer the most recent "done" task with a specific resource — not self-guided tasks)
- The resource-feedback skill will handle asking the question in a separate interaction

**Teach-back eligibility:**
- Check if any completed task is type: "conceptual"
- Roughly 1 in 3 conceptual tasks should trigger teach-back
- If eligible: note which conceptual task to ask about
- The teach-back skill will handle the prompt in a separate interaction
- Tasks with Type = "practice_prompt" are NOT eligible for teach-back — they are already active recall

**Practice prompt completion:**
- If a task has Type = "practice_prompt", the user's response to the check-in may include their answer to the practice prompt question. Process it as follows:
  - Evaluate the response using the teach-back evaluation table (strong/partial/can't explain) from `skills/teach-back/SKILL.md`
  - Give brief feedback (1-2 sentences) as part of the check-in response
  - Mark the task as "done" if strong or partial, "partial" if can't explain but attempted
  - Log the evaluation in `memory/progress.md` → Teach-Back Log (treat it as a teach-back entry with trigger: "practice_prompt")
  - Update `memory/spaced-repetition.md` per the teach-back SRS entry rules
- If the user doesn't answer the practice prompt during check-in (just reports other tasks), mark the practice_prompt task based on what they report (done/skipped like any other task)

**Auto-linking:**
- After all processing is complete, if at least 1 task was marked "done", trigger `skills/auto-linking/SKILL.md` silently. Auto-linking cross-references new completions with existing knowledge — it runs in the background and writes to `memory/concept-links.md`. No user-facing output.

Do NOT ask resource feedback or teach-back questions during the check-in. The check-in ends cleanly after acknowledging the user's progress.

## Response to user

After processing, send ONE closing message. Keep it warm and brief. Match verbosity from `config/settings.md`.

Read `memory/user-model.md` → Communication Style to calibrate response tone and length. If the user checks in with terse messages ("2/3"), respond tersely. If they elaborate, match their energy. If user-model.md has no data yet, default to the warm-but-brief examples below.

### What to include

**Always:**
- Brief acknowledgment of what they did

**Conditionally:**

| Condition | Include |
|-----------|---------|
| Notable streak (5, 10, 15, 20, or new record) | "That's [N] days in a row." / "New record — [N] days." |
| Completed everything | "Clean sweep today." or similar — brief praise, not over-the-top |
| Completed nothing | "No worries, tomorrow's a fresh start." — zero guilt |
| User volunteered context (busy day, hard task, etc.) | Acknowledge it: "Sounds like a packed day." / "Yeah, [topic] is a step up." |
| Pillar hit 5/5 blocks | "You've hit the threshold for [pillar] — I'll quiz you on the key concepts before leveling you up." |
| Partial completion | Acknowledge what they did, not what they didn't |

**Never:**
- Suggest specific task changes — that's the adaptation skill's job
- Lecture about consistency or missing tasks
- Give unsolicited advice about study techniques
- Ask follow-up questions after the closing message (the check-in is done)

### Example responses

**All tasks done, streak notable:**
> Nice — all 3 done. That's 7 days in a row now. See you tomorrow.

**Partial completion, user gave context:**
> Got it — SQL and the video, skipped the case practice. Sounds like a busy one. Logged.

**Nothing done:**
> No worries. Tomorrow's a fresh start.

**Pillar hit threshold:**
> Two for two today. That puts you at 5/5 blocks for SQL & Data Analysis — I'll quiz you on the key concepts before leveling you up. Nice work.

**User checks in next morning:**
> Morning! Logging yesterday's progress — the product sense video and the STAR stories. Two out of three, solid.

**Concise verbosity:**
> Logged — 2/3 done. Streak: 4.

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Check-in-specific:**
- User's response didn't match any of the parsing patterns in the matching logic table (log the exact response and how you interpreted it)
- User reported completing tasks not on the plan 3+ times (suggests plan misalignment — log what they did instead and why it might be more relevant)
- Streak reset felt unfair — user did meaningful work but it didn't count because it didn't match plan tasks (log the situation)

## Edge cases

- **User checks in before the scheduled time:** That's fine — process it exactly the same way. An early check-in is still a check-in.

- **User checks in the next morning instead of evening:** Still counts for yesterday. Match their tasks against yesterday's plan, not today's. If today's plan has already been sent, clarify: "Is this about yesterday's tasks or today's?"

- **User reports doing tasks not on the plan (extra credit):** Log them in `memory/history.md`. Count them toward the streak (≥1 task = streak continues). Do NOT add blocks to pillar progress unless the extra task clearly maps to a pillar — if it does, add the block. Don't penalize or question extra work.

- **User is vague ("I did some stuff"):** Ask one clarifying question listing today's tasks briefly. Accept whatever they give after that — don't push further. If still unclear, mark what's clear as done and the rest as skipped.

- **User hasn't received tasks yet today (no plan generated):** Don't check in. If the user messages about progress, respond conversationally but don't try to process task statuses. Example: "Looks like today's plan hasn't been sent yet — I'll get that to you. How are things going otherwise?"

- **Multiple check-ins in one day:** Only the first check-in updates `progress.md`, `history.md`, and task statuses. Subsequent messages about progress are just conversation — respond warmly but don't double-count. Check `memory/history.md` for today's date to detect duplicates.

- **User reports doing a task partially:** Mark as "partial" in the week file. Count as 0.5 block for pillar progress. Append to history with "(partial)" note. Counts toward streak (partial > nothing).

- **All tasks already marked done/skipped for today:** The user already checked in. Respond conversationally: "Already got you logged for today — anything else on your mind?"

- **User mentions difficulty or frustration:** Acknowledge it, don't try to fix it. "Yeah, [topic] is tough — the fact that you sat with it counts." The adaptation skill will detect patterns and adjust if needed.

- **User mentions they loved a resource:** Note it in the history entry's Notes column. The resource-feedback skill may follow up later, but don't ask for a rating here.

- **Weekend / day off check-in:** If the user checks in on a configured day off, process it normally. They chose to work — respect that and log it.

---

## Hooks

While this skill is active, enforce these constraints:

| Hook | What it prevents | Why |
|------|-----------------|-----|
| No guilt language | Using phrases like "you should have", "you missed", "you only did X", or any language that implies the user fell short | Check-in is the highest-risk moment for making the user feel bad — reinforces SOUL.md's zero-guilt principle |
| No interrogation on zero | Asking why the user completed 0 tasks — just log it and move on with "No worries. Tomorrow's a fresh start." | Asking "what happened?" when they did nothing puts them on the defensive |
| One follow-up max | Asking more than 1 clarifying question before closing the check-in | The check-in should be quick — multiple follow-ups make it feel like a report, not a text to a friend |
