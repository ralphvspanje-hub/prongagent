# Daily Morning Brief -- Cowork Scheduled Task Prompt

**Schedule:** Daily at 07:00 (adjust to your timezone)
**Working directory:** prongagent/

---

## Your mission

Compose and send the user their daily morning message via Telegram. The message combines job search highlights with today's learning tasks. One message, sent once, every morning.

## How to send the Telegram message

Use the Telegram Bot API via curl. Read the bot token and chat ID from `dispatch/telegram.env`.

```bash
source dispatch/telegram.env
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d chat_id=${TELEGRAM_CHAT_ID} \
  -d parse_mode=HTML \
  -d text="<your composed message>"
```

If curl fails (network error, bad token, etc.), write the composed message to `dispatch/daily-message-outbox.md` as a fallback so the user sees it when they open their machine.

## Step 1: Check dispatch freshness

Read `dispatch/daily-brief.md`. Extract the `last_run` timestamp. Compare it to today's date (use the timezone from `dispatch/config.json`).

- If `last_run` is from today: dispatch is FRESH. Proceed normally.
- If `last_run` is NOT from today: dispatch is STALE. Include a warning in the message and note the last run date.

## Step 2: Summarize job highlights

If dispatch is fresh, extract from `dispatch/daily-brief.md`:
- The "Act Now" items (high-fit roles not yet applied to)
- The "Top 3" action items
- Any notable tracker updates

Summarize in 3-5 lines max. Be direct -- role name, company, why it's urgent.

If dispatch is stale, replace the job section with:
"Job scan didn't run overnight (last update: [date]). Check dispatch agent."

## Step 3: Run daily-plan in daily_message mode

Follow the daily_message mode from `skills/daily-plan/SKILL.md` exactly. In short:

1. Read `config/settings.md` -- check if today is a day off (Saturday, Sunday). If yes, send a brief "enjoy your day off" message and stop.
2. Read the current week's task file from `memory/plan-tasks/week-{N}.md` (get N from `memory/current-plan.md`)
3. Read `memory/spaced-repetition.md` -- pick 1 review question that's due today
4. Read `memory/user-model.md` for personalization (motivation drivers, knowledge anchors, learning patterns)
5. Read `memory/interview-context.md` -- check if interview mode is active
6. Read `memory/progress.md` for streak info

## Step 4: Compose the message

Combine everything into ONE plain-text message. NO markdown (no ##, no **, no backticks). Use emoji and line breaks for structure. Max 2000 characters.

Format:

```
Good morning [USER]

[JOB HIGHLIGHTS section]
-- Fresh: summarize Act Now + Top 3 from dispatch
-- Stale: warning + last run date

[TODAY'S TASKS section]
-- List today's tasks numbered, with time estimate and pillar
-- Include dream career connection for at least one task
-- Reference streak if active

[REVIEW QUESTION section]
-- One spaced repetition question if due

[INTERVIEW MODE section -- only if active]
-- Readiness tier + days until interview
-- See daily-plan SKILL.md edge cases for interview_prep rules
```

## Step 5: Send it

Send via curl using the bot token from `dispatch/telegram.env` (see "How to send the Telegram message" above).

After sending, log the result briefly to `dispatch/observations.md`:
```
## [today's date] -- Morning brief
Delivery method: [which option worked]
Dispatch status: [fresh/stale]
Tasks sent: [count]
```

## Rules

- Plain text only in the Telegram message. No markdown formatting.
- Keep it under 2000 characters.
- Be direct. No fluff, no "hope you slept well", no motivational quotes.
- If any file is missing or unreadable, work with what you have and note the gap in observations.
- Do NOT run the job scan -- that's a separate agent. You only READ the dispatch output.
- Do NOT modify any memory files. You are read-only except for dispatch/observations.md.
