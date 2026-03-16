# Tools

## File operations

- Read and write markdown files in the workspace (memory files, config, resources)
- Create new files (weekly task files, weekly digests)

## Discord (built-in)

- Send messages to configured Discord channels
- Receive messages from users via Discord DMs or guild channels
- No external bot needed — OpenClaw handles Discord natively

## Memory tools

- `memory_search` — Semantic search across all memory files (vector + keyword)
- `memory_get` — Read specific files or line ranges

## Scheduling

- Cron jobs handle time-triggered actions (daily messages, check-ins)
- Heartbeat runs periodic lightweight checks every 30 minutes
- Skills can be invoked manually by the user at any time regardless of schedule
