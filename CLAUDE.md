# ProngAgent — Agent Context

## What this is

ProngAgent is an **open-source, agent-native learning companion** that runs inside OpenClaw. It is NOT a traditional codebase — the product is a set of `.md` skill files and memory templates that an AI agent executes.

**The skill files in `skills/` are the product.** They are instruction sets for the OpenClaw agent (the user-facing agent). They are not code, documentation, or prompts for you (Claude Code). When editing skill files, you are editing the product itself.

## Repo structure

```
prongagent/                        # OpenClaw workspace template
├── AGENTS.md                      # Agent operating instructions (for OpenClaw agent)
├── SOUL.md                        # Agent persona and tone
├── USER.md                        # User info (populated during onboarding)
├── IDENTITY.md                    # Agent name ("Prong") and personality
├── MEMORY.md                      # Curated long-term memory summary
├── HEARTBEAT.md                   # Periodic lightweight checks
├── BOOTSTRAP.md                   # First-run setup (self-deleting)
├── TOOLS.md                       # Available tools documentation
├── README.md                      # User-facing install guide
├── CLAUDE.md                      # You are here. For Claude Code (dev agent).
├── PROGRESS.md                    # Implementation progress tracker
├── CHANGELOG.md                   # Skill file iteration log (product learnings)
├── AGENT_LEARNING_COMPANION.md    # Product report (full spec)
├── IMPLEMENTATION_GUIDE.md        # Step-by-step build guide
├── FUTURE_IDEAS.md                # Parked ideas
├── skills/                        # THE PRODUCT — 12 skill directories
│   ├── onboarding/SKILL.md        # First-time user setup: dream career, goals, prefs
│   ├── daily-plan/SKILL.md        # Daily task generation + delivery
│   ├── check-in/SKILL.md          # Evening progress check-in conversation
│   ├── adaptation/SKILL.md        # Autonomous plan adjustment
│   ├── weekly-review/SKILL.md     # Weekly narrative digest
│   ├── teach-back/SKILL.md        # Active recall prompts + evaluation
│   ├── resource-feedback/SKILL.md # Post-task resource quality collection
│   ├── spaced-repetition/SKILL.md # Review scheduling + retention pings
│   ├── win-log/SKILL.md           # Achievement extraction + interview mapping
│   ├── portfolio-projects/SKILL.md# Dream-career-aligned project suggestions
│   ├── interview-prep/SKILL.md    # Job search detection + crash course
│   └── mock-interview/SKILL.md    # Mock interview conductor + coaching
├── memory/                        # Agent's persistent state (templates until first use)
│   ├── user-profile.md            # User identity, dream career, preferences
│   ├── current-plan.md            # Active plan: pillars, levels, weeks
│   ├── plan-tasks/                # Per-week task files
│   ├── progress.md                # Streaks, completion, pillar levels, teach-back log
│   ├── history.md                 # Completed tasks (append-only)
│   ├── resource-feedback.md       # Ratings + derived learning style profile
│   ├── spaced-repetition.md       # SRS schedule: active, retired, queue
│   ├── adaptation-log.md          # Every autonomous change with reasoning
│   ├── mistake-journal.md         # Mock interview mistakes + patterns
│   ├── resume-context.md          # Resume/LinkedIn parsed context
│   ├── interview-context.md       # Target company, role, date, prep status
│   ├── agent-observations.md      # Self-observations about skill file issues
│   ├── win-log/                   # Achievement system
│   │   ├── wins.md                # Polished wins (STAR format)
│   │   ├── candidates.md          # Agent-observed potential wins
│   │   └── interview-mapping.md   # Wins categorized by question type
│   └── weekly-digests/            # One narrative digest per week
├── resources/                     # Curated learning resources
│   └── curated-resources.md       # 55+ resources by pillar + level
└── config/
    └── settings.md                # User preferences (schedule, frequencies, etc.)
```

## OpenClaw workspace files

ProngAgent is distributed as an **OpenClaw workspace template**. The workspace files tell the OpenClaw agent how to behave:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Master operating instructions — skill invocation, memory system, handoff protocol |
| `SOUL.md` | Agent persona — zero-guilt, encouraging, dream-career-focused |
| `USER.md` | User info — populated by onboarding skill |
| `IDENTITY.md` | Agent name ("Prong" by default, user can rename during onboarding) |
| `MEMORY.md` | Curated summary loaded every session — name, dream career, pillar levels |
| `HEARTBEAT.md` | Lightweight periodic checks (every 30 min) — SRS overdue, absence detection |
| `BOOTSTRAP.md` | First-run onboarding trigger — deleted after completion |
| `TOOLS.md` | Documents available tools for the agent |

These files are for the **OpenClaw agent** (the user-facing agent). `CLAUDE.md` is for **you** (Claude Code, the dev agent).

## Key rules

### Skill files are the product

- Each skill is a directory in `skills/` containing a `SKILL.md` file with YAML frontmatter
- They define: when to trigger, what to read, what to do, what to write, example outputs
- Edit them when the product behavior needs to change
- Test changes by having Claude Code simulate the agent (read the skill file, act it out, check the output)

### Memory files are templates until populated

- Files in `memory/` start as empty templates with the expected format
- The OpenClaw agent fills them during use
- The format (headings, tables, fields) matters — the agent reads and writes structured markdown
- If you change a memory format, update all skill files that read/write that file

### Do not edit during use

- When a user is actively using ProngAgent, their memory files contain real data
- Only edit skill files (the instructions), not memory files (the data)
- Exception: `resources/curated-resources.md` can be updated anytime (it's reference data)

## Reference docs

Full product spec and implementation guide live in the repo root:

- `AGENT_LEARNING_COMPANION.md` — Product report (what to build, why, full feature specs with sections 3.4-3.10)
- `IMPLEMENTATION_GUIDE.md` — Step-by-step build guide (phases 0-5, updated for OpenClaw-native format)
- `README.md` — User-facing installation guide

## Related projects

ProngAgent is the third generation of the Prong learning platform:

- **DailyProng** (v1) — Claude Cowork plugin (pure .md files, no deployable code)
- **ProngGSD** (v2) — React + Supabase web app (traditional SPA)
- **ProngAgent** (v3) — OpenClaw agent + messaging (agent-native, file-based)

Some prompts and resources are ported from ProngGSD. See Section 5 of the product report for what ports and how.

## Self-Improving Loop

After every change to a skill file, log what changed and why in `CHANGELOG.md`. This tracks product iterations — why skill files are shaped the way they are. Format:

```markdown
## YYYY-MM-DD — [short title]

**What happened:** [what you observed during testing or real usage]
**Changed:** [what you modified in the skill file]
**File:** [which skill file]
```
