# ProngAgent — What Can I Do?

Everything you can do with ProngAgent, organized by *when you'd want it*.

---

## Everyday — your daily flow

**How messaging works:** Prong sends you one combined morning message via your configured channel — job highlights + today's tasks + review question + readiness tier (if in interview mode).

Once running:

| What happens | How it works | You do |
|---|---|---|
| **Morning tasks** | Prong sends 1-3 daily tasks matched to your pillars, level, and time | Read them, do them |
| **Review question** | 1 spaced-repetition question embedded in your morning message | Answer it |
| **Evening check-in** | Prong asks "how'd today go?" when you message in the evening | Reply however you want: "did all 3", "skipped", "only SQL", emoji — all work |
| **Job highlights** | Top 1-3 new jobs from the daily scan (if job search is active) | Glance, ask about any, or ignore |

No guilt. Skip a day and Prong adjusts. Skip three and you get one gentle ping.

---

## When you want to learn something

| Say this | What Prong does |
|---|---|
| *"save: [insight/fact/resource]"* | Saves it to your knowledge drops with tags and connections |
| *"save: [link]"* | Fetches, summarizes, and saves the resource |
| *"what should I build?"* | Suggests a portfolio project aligned to your dream career |
| *(just do tasks and check in)* | Prong handles teach-backs, spaced repetition, difficulty scaling, and level-ups automatically |

---

## When you're job hunting (no specific interview yet)

| Say this | What Prong does |
|---|---|
| *"I'm starting to look for jobs"* | Shifts your plan toward interview-relevant skills, activates win-log capture, adds application targets |
| *"any new jobs?"* | Shows latest matches from the daily job scan |
| *[paste a job posting]* | Saves it, evaluates fit against your profile, advises whether to apply |
| *"is [company] a good move?"* | Company evaluation against your dream career |
| *"help with my resume"* | Tailors resume bullets to a specific JD |
| *"write a cover letter for [role]"* | Drafts a cover letter matched to the JD and your background |
| *"help with my LinkedIn"* | Optimizes headline, about, and experience sections |

---

## When you have an interview coming

| Say this | What Prong does |
|---|---|
| *"I have an interview at [company] on [date]"* | Activates crash course: compressed timeline, JD-weighted tasks, readiness tracking, mock scheduling |
| *"let's do a mock"* | Runs a mock interview (you pick: behavioral, technical, or system design) |
| *"let's do a quick mock"* | Lightning round: 2 questions in 10 minutes |
| *(after a real interview)* | Prong asks what questions came up, saves them for future prep |

**During crash course, your daily messages change:**
- Countdown to interview date
- Readiness tier (Ready / Almost There / Partially Ready / Unprepared)
- Tasks weighted by the actual job description requirements
- Company research items mixed in

---

## When you want to work on interview stories

| Say this | What Prong does |
|---|---|
| *"help with my wins"* | Coaching conversation to extract STAR stories from your experience |
| *"tell me about a time..."* | Practice answering — Prong coaches your delivery |
| *(after a strong mock answer)* | Prong asks "want me to save that to your win log?" |

Prong also passively watches for achievements during check-ins and mocks. When it spots one, it drafts a STAR entry and asks if you want to save it.

---

## Anytime — just ask

| Say this | What Prong does |
|---|---|
| *"what's my progress?"* | Current streaks, pillar levels, completion stats |
| *"what should I focus on?"* | Recommends based on gaps, weak teach-backs, upcoming interview |
| *any career question* | Freeform career advice — role evaluation, strategy, networking, salary |
| *"change my schedule to [X]"* | Updates daily message time, check-in time, days off |
| *"make tasks easier/harder"* | Adjusts difficulty level |
| *"I want to be a [new role]"* | Pivots your entire plan toward the new dream career |

---

## What runs silently (you never see these)

These happen automatically behind the scenes:

- **Adaptation** — After every check-in, Prong analyzes your patterns and adjusts (difficulty, task count, pillar weights). Max 2 changes per run, logged.
- **Auto-linking** — After check-ins and teach-backs, Prong maps connections between concepts you've learned across pillars.
- **Resource feedback** — Occasionally asks "was [resource] helpful?" to learn your preferences (video vs article, short vs long, which platforms you like).
- **Spaced repetition** — Manages review intervals. Concepts you nail get spaced further apart. Ones you miss come back sooner. After 3+ months of correct answers, a concept retires (mastered).
- **Heartbeat** — Every 30 minutes, checks for overdue SRS items and absence patterns.

---

## The Dashboard (read-only)

Open `http://localhost:3737` to see your scoreboard at a glance:

| Panel | Shows |
|---|---|
| **Daily Brief** | Today's job scan results, new listings, tracker updates |
| **Job Tracker** | Active applications, watchlist, pipeline status |
| **Learning Progress** | Pillar levels, completion rates, streaks |
| **Crash Course** | Countdown, prep checklist (only during interview prep) |
| **Interview Readiness** | Readiness tier, skill gaps, mock/win counts, question type coverage |
| **Prep Briefing** | Per-company: top mistakes, best stories, weak areas, struggling concepts |
| **Quick Stats** | Total jobs, applied, response rate |

**Starting/stopping the dashboard:**
```bash
cd dashboard
bun run start        # Start on http://localhost:3737
# Ctrl+C to stop     # (in the same terminal)
bun run stop         # (from any terminal, if you closed the original)
```

Auto-refreshes every 60 seconds.

---

## Where to interact

| Channel | Use for |
|---|---|
| **Your messaging app** | Everything — daily flow, mocks, career questions, check-ins. This is the primary UX. |
| **Dashboard** | Glancing at progress. Read-only. |
| **Claude Code** | Development — changing skill files, debugging, building new features. |

---

## What's NOT built yet

These are parked in [FUTURE_IDEAS.md](FUTURE_IDEAS.md):

- Newsletter/X scanning for fresh resources
- RAG search over large resource library
- Resume version tracking
- Calendar integration (Google Calendar MCP — busy-day awareness, auto-schedule interviews)
- Voice mock interviews
- Multi-user support
- Platform API integrations (LinkedIn Learning, Coursera)
- AI-generated practice problems
- CLI interface
