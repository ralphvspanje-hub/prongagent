# ProngAgent Dashboard

Local dashboard for viewing ProngAgent data — job tracker, learning progress, interview readiness.

## Setup

```bash
cd dashboard
bun install
```

## Running

```bash
bun run start       # Start on http://localhost:3737
bun run dev         # Start with auto-reload on file changes (recommended)
```

## Stopping

**If the terminal is still open:** Ctrl+C

**If you closed the terminal:** Open any terminal and run:

```bash
cd dashboard
bun run stop        # Kills whatever is using port 3737
```

## Restarting

```bash
bun run restart     # Stop + start in one command
```

## "Port 3737 already in use"

This means an old instance is still running. Run `bun run stop` first, then start again.

## What it shows

| Panel | Shows when |
|-------|-----------|
| Daily Brief | Always (dispatch agent runs daily) |
| Job Tracker | Always (active jobs, watchlist, application log) |
| Learning Progress | Plan has started (streaks, pillar levels) |
| Crash Course | Plan type is `interview_prep` (countdown, checklist) |
| Interview Readiness | Any active interview prep (readiness tier, skill gaps, mock/win counts, question type coverage) |
| Quick Stats | Always (applied count, response rate) |
