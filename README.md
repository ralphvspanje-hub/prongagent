# ProngAgent

An open-source, agent-native learning companion that runs inside [OpenClaw](https://github.com/openclaw/openclaw). Prong knows your dream career, sends daily learning tasks, tracks your progress, and adapts your plan autonomously — all through conversation.

## What it does

- **Onboards you** with a 4-5 turn conversation about your dream career and learning style
- **Sends daily tasks** via Discord, WhatsApp, Telegram, or any OpenClaw channel, matched to your skill level and preferred formats
- **Checks in** each evening — accepts any response format, zero guilt
- **Tests understanding** with teach-back prompts and gates level advancement
- **Adapts silently** — adjusts difficulty, format, and pacing based on your behavior
- **Tracks retention** with spaced repetition review questions
- **Builds your win log** — extracts STAR-format interview stories from your achievements
- **Runs interview crash courses** when you have an interview coming up
- **Conducts mock interviews** with coaching and cross-session pattern detection
- **Scans job boards daily** via the dispatch agent — career pages, LinkedIn, Indeed, Glassdoor
- **Shows a live dashboard** at localhost:3737 — job tracker, learning progress, interview readiness

## Quick start

### Prerequisites

- [OpenClaw](https://github.com/openclaw/openclaw) installed and running (Node.js v22+)
- A messaging account (optional — Prong works via direct conversation too)

### Install

```bash
# Clone as your OpenClaw workspace
git clone https://github.com/[your-username]/prongagent ~/.openclaw/workspace

# Or if you already have a workspace, clone into a subdirectory and copy:
# git clone https://github.com/[your-username]/prongagent /tmp/prongagent
# cp -r /tmp/prongagent/skills/* ~/.openclaw/workspace/skills/
# cp -r /tmp/prongagent/memory ~/.openclaw/workspace/
# ... (see Manual Installation below)
```

### Set up a messaging channel (optional)

ProngAgent works with any OpenClaw-supported channel. Pick one:

#### Discord

```bash
# Create a Discord bot at https://discord.com/developers/applications
# Enable Message Content Intent

openclaw config set channels.discord.token '"YOUR_BOT_TOKEN"' --json
openclaw config set channels.discord.enabled true --json
```

#### WhatsApp

<!-- verify these commands against OpenClaw docs before shipping -->
```bash
openclaw config set channels.whatsapp.enabled true --json
openclaw channels login whatsapp
# Follow the QR code pairing flow
```

#### Telegram

<!-- verify these commands against OpenClaw docs before shipping -->
```bash
openclaw config set channels.telegram.enabled true --json
openclaw config set channels.telegram.botToken '"YOUR_BOT_TOKEN"' --json
```

ProngAgent works with any OpenClaw-supported channel. See [OpenClaw channels docs](https://github.com/openclaw/openclaw) for the full list.

### Start

```bash
openclaw start
```

Message Prong via your configured channel or the OpenClaw CLI. On first run, `BOOTSTRAP.md` triggers onboarding automatically.

### Set up scheduled messages (optional)

After onboarding, set up daily task delivery and evening check-ins:

```bash
# Morning daily plan (weekdays at 8am)
openclaw cron add --name "Daily Plan" --cron "0 8 * * 1-5" \
  --tz "America/New_York" --session isolated \
  --message "Run the daily-plan skill in daily_message mode." \
  --announce

# Evening check-in (weekdays at 8pm)
openclaw cron add --name "Check-in" --cron "0 20 * * 1-5" \
  --tz "America/New_York" --session isolated \
  --message "Run the check-in skill." \
  --announce
```

Adjust times, timezone, and days to match your `config/settings.md` preferences.

### Set up the dispatch agent (optional — job scanning)

The dispatch agent scans job boards and company career pages daily. It runs as a separate scheduled task:

1. Configure your target companies and search terms in `dispatch/company-tiers.md` and `dispatch/scanning-protocol.md`
2. Populate your behavioral rules in `dispatch/CLAUDE.md` (target region, role preferences, constraints)
3. Schedule the dispatch agent to run daily (e.g., 05:00 AM via your host agent's task scheduler)
4. Set up a morning cron that reads the dispatch results and sends them via your messaging channel

The dispatch agent writes to `files/job-tracker/job_tracker.md` and `dispatch/daily-brief.md`. See `dispatch/CLAUDE.md` for full instructions.

### Set up the dashboard (optional)

A local web dashboard shows your ProngAgent state at a glance — job tracker, learning progress, interview readiness, and more.

```bash
cd dashboard
bun install
bun run start    # Opens at http://localhost:3737
```

| Command | What it does |
|---------|-------------|
| `bun run start` | Start the dashboard server |
| `bun run stop` | Stop an orphaned server process |
| `bun run restart` | Restart the server |

See `dashboard/README.md` for details.

## Manual installation

If you already have an OpenClaw workspace and want to add ProngAgent:

1. Copy `skills/` into your workspace's `skills/` directory
2. Copy `memory/` into your workspace (templates — won't overwrite existing data)
3. Copy `resources/` and `config/` into your workspace
4. Copy workspace files (`AGENTS.md`, `SOUL.md`, `USER.md`, `IDENTITY.md`, `MEMORY.md`, `HEARTBEAT.md`, `BOOTSTRAP.md`, `TOOLS.md`) to your workspace root
5. Start or restart OpenClaw

## Project structure

```
prongagent/
├── AGENTS.md              # Agent operating instructions
├── SOUL.md                # Agent persona and tone
├── USER.md                # User info (populated during onboarding)
├── IDENTITY.md            # Agent name and personality
├── MEMORY.md              # Curated long-term memory summary
├── HEARTBEAT.md           # Periodic lightweight checks
├── BOOTSTRAP.md           # First-run setup (self-deleting)
├── TOOLS.md               # Available tools documentation
├── dispatch/              # Job search dispatch agent
├── dashboard/             # Local web dashboard (Bun + Hono)
├── skills/                # THE PRODUCT — 16 skill directories
│   ├── onboarding/        # First-time setup conversation
│   ├── daily-plan/        # Daily task generation + delivery
│   ├── check-in/          # Evening progress check-in
│   ├── teach-back/        # Active recall + level-up gates
│   ├── resource-feedback/ # Resource quality ratings
│   ├── spaced-repetition/ # Review scheduling + retention
│   ├── adaptation/        # Autonomous plan adjustment
│   ├── weekly-review/     # Weekly narrative digest
│   ├── win-log/           # Achievement extraction + STAR formatting
│   ├── portfolio-projects/# Dream-career project suggestions
│   ├── career-mentor/     # Freeform career advisor
│   ├── interview-prep/    # Interview crash course
│   ├── mock-interview/    # Mock interview conductor
│   ├── auto-linking/      # Concept cross-referencing
│   ├── knowledge-drop/    # Save facts and resources
│   └── job-scan/          # Job board scanning
├── memory/                # Persistent state (templates until first use)
│   ├── user-profile.md
│   ├── current-plan.md
│   ├── progress.md
│   ├── history.md
│   ├── plan-tasks/
│   ├── spaced-repetition.md
│   ├── resource-feedback.md
│   ├── adaptation-log.md
│   ├── resume-context.md
│   ├── interview-context.md
│   ├── mistake-journal.md
│   ├── agent-observations.md
│   ├── win-log/
│   └── weekly-digests/
├── resources/
│   └── curated-resources.md  # 55+ vetted learning resources
├── config/
│   └── settings.md           # Schedule, frequencies, preferences
└── README.md
```

## Without a messaging channel

ProngAgent works without a messaging channel. You can:
- Talk to Prong directly via the OpenClaw CLI or web UI
- Invoke skills manually ("what's my plan today?", "let's do a check-in")
- Skip cron job setup — just interact when you want to

The daily loop still works — you just pull instead of Prong pushing.

## License

MIT
