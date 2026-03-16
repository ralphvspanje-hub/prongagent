# Tools

## File operations

- Read and write markdown files in the workspace (memory files, config, resources)
- Create new files (weekly task files, weekly digests)

## Messaging (built-in)

- Send and receive messages via any configured channel (Discord, WhatsApp, Telegram, Slack, etc.)
- OpenClaw handles channel routing — skills just compose messages
- No external bot needed — OpenClaw manages channel connections natively

## Memory tools

- `memory_search` — Semantic search across all memory files (vector + keyword)
- `memory_get` — Read specific files or line ranges

## Scheduling

- Cron jobs handle time-triggered actions (daily messages, check-ins)
- Heartbeat runs periodic lightweight checks every 30 minutes
- Skills can be invoked manually by the user at any time regardless of schedule
