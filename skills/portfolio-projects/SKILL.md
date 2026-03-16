---
name: prongagent-portfolio-projects
description: "Dream-career-aligned project suggestions with guided scoping"
tags: [learning, projects, portfolio]
user-invocable: true
metadata:
  openclaw:
    emoji: "🔨"
---

# Portfolio Project Suggestions Skill

## When to trigger

Four activation paths:

**1. SKILL BLOCK COMPLETION** — a pillar levels up (teach-back gate passed).
- Detection: teach-back skill increments a pillar level in `memory/current-plan.md`
- Timing: surface the suggestion in the next daily message or check-in, not during the teach-back itself
- Framing: "You've been doing [pillar] work for weeks. Want to build something with it?"
- If multiple pillars level up simultaneously, suggest ONE project that combines them: "You just leveled up in both [pillar A] and [pillar B] — here's a project that uses both."

**2. BUILDING GAP** — adaptation flags 3+ weeks without any Build/Create tasks completed.
- Detection: adaptation skill checks `memory/history.md` for tasks with Type = `practice` and Action = `Build` or `Create`. If none in the last 3 weeks, adaptation flags this skill.
- Framing: "You've been reading and watching for a while. Building something would cement these skills. Interested?"
- Pre-check: read `memory/progress.md` → completion rate. If completion < 70% this week, SKIP the suggestion — the user is already behind on current tasks. Don't add more.

**3. INTERVIEW PREP** — interview prep activates and time allows.
- Detection: `memory/interview-context.md` → Status = `active`
- Pre-check: read `memory/interview-context.md` → Days remaining. If < 14 days, DON'T suggest a new project — there's not enough time. Focus on polishing existing work and targeted practice.
- Framing: "For [dream role] at [target company], a [specific project type] in your portfolio would stand out."
- Tailor to the target company's domain and tech stack (from `memory/interview-context.md` → Company Research)

**4. MANUAL** — user asks "what should I build?", "suggest a project", "I want to build something", or similar.
- Always respond, regardless of other pre-checks
- If the user has a specific idea ("I want to build X"), skip generation and help them scope it instead (see "User wants to build something not suggested" in edge cases)

**NEVER FORCED.** Always a suggestion. Some users are builders, some aren't. If the user declines twice, reduce suggestion frequency — track declines and cap at once per month max after 2 declines. Reset the decline counter if the user later asks for a project manually.

## What to read

Read ALL of the following before generating a project suggestion:

| File | What to look for |
|------|-----------------|
| `memory/user-profile.md` | Dream career (target role, why), current skills, experience level, time commitment, pacing |
| `memory/current-plan.md` | Pillar levels, pillar weights, plan type, portfolio projects section (check active project count) |
| `memory/progress.md` | Pillar levels, blocks at level, completion rate, teach-back log (what are they strong at) |
| `memory/history.md` | Completed tasks — what skills have they actually practiced recently? What pillars dominate? |
| `memory/resume-context.md` | Existing projects — don't suggest projects similar to what they've already built |
| `memory/resource-feedback.md` | Learning style — do they prefer building or studying? Platform preferences. |
| `memory/interview-context.md` | If interview prep is active — tailor project to target company's domain and tech stack |
| `memory/win-log/wins.md` | Existing wins — don't duplicate portfolio stories they already have for this skill area |
| `memory/win-log/interview-mapping.md` | Question type coverage — a project can fill a gap (e.g., no "creativity/innovation" story) |
| `config/settings.md` | Pacing, time commitment, verbosity |

## What to write

| File | When |
|------|------|
| `memory/current-plan.md` | Add project entry under Portfolio Projects section (when user accepts) |
| `memory/plan-tasks/week-{N}.md` | Add project tasks to upcoming 1-2 weeks (when user accepts) |

## Downstream triggers (on project completion)

| Skill | Trigger condition |
|-------|------------------|
| `skills/win-log/SKILL.md` (extraction mode) | All project tasks marked done → draft STAR entry from the project |
| `skills/mock-interview/SKILL.md` | If interview prep is active → offer: "This project is ready for your portfolio. Want to practice talking about it in a mock interview?" |

---

## Project generation

### The 5 factors

When generating a project suggestion, consider all five:

**A. DREAM CAREER** — what projects impress hiring managers in that field?

Read `memory/user-profile.md` → Target role. Match the project to what that role values:
- Data science roles → data pipeline projects, analysis dashboards, ML experiments
- PM roles → product teardowns with data, user research projects, prototype builds
- Frontend roles → polished UI projects, design systems, interactive tools
- Backend roles → API services, data processing pipelines, infrastructure tools
- Full-stack roles → complete working apps with real users

Don't suggest generic projects (todo apps, calculators) unless the user is a complete beginner. Dream-career-aligned projects stand out.

**B. CURRENT SKILL LEVEL** — stretch but don't overwhelm.

Read `memory/current-plan.md` → Pillar levels and `memory/progress.md` → Pillar Levels. The project should be one level above the user's comfort zone:

| User's highest relevant pillar level | Project complexity |
|--------------------------------------|-------------------|
| Level 1 | Guided project — follow a tutorial, then customize. "Follow this tutorial to build X, then add your own twist." |
| Level 2 | Structured project — clear requirements, known patterns, but the user builds it independently. |
| Level 3 | Open-ended project — defined goal, user chooses the approach. Real-world complexity. |
| Level 4-5 | Ambitious project — novel problem, multiple technologies, deployment, real users. |

**C. SKILLS RECENTLY PRACTICED** — reinforce, don't distract.

Read `memory/history.md` for completed tasks in the last 2-3 weeks. The project should use skills the user has been actively learning, so it reinforces rather than introduces new things. A user who's been doing SQL + Python tasks should get a data project, not a React frontend project.

Exception: if the user has been doing only one pillar for weeks, the project can bridge two pillars to create variety.

**D. TIME COMMITMENT** — match to pacing profile.

Read `memory/user-profile.md` → Pacing and Daily time commitment. Scale the project accordingly:

| Pacing | Project scope | Estimated hours |
|--------|--------------|-----------------|
| Relaxed | Weekend project | 4-8 hours |
| Moderate | 1-2 week project | 8-16 hours |
| Intensive | Multi-week project | 16-30 hours |

For 30min/day users, even a "weekend project" spans 1-2 weeks of plan tasks. Account for this when breaking into tasks.

**E. PUBLIC DATA/APIs** — minimize setup barriers.

Prefer projects using free, public resources:
- Government open data (census, transit, weather, public health)
- Public APIs (GitHub API, OpenWeatherMap, REST Countries, PokéAPI, etc.)
- Open datasets (Kaggle, UCI ML Repository, data.gov)
- Free tier services (Supabase, Vercel, Netlify, GitHub Pages)

If no free option exists for the project concept, mention the cost upfront. Never suggest projects that require paid tools/APIs without disclosure.

### Additional considerations

**Don't duplicate existing projects:**
- Read `memory/resume-context.md` → Key Projects. If the user already built a React dashboard, don't suggest another React dashboard. Suggest something that uses different skills or a different domain.
- Read `memory/win-log/wins.md`. If they already have a polished win for a particular skill area, suggest a project in a different area — fill portfolio gaps, don't stack duplicates.

**Fill interview mapping gaps:**
- Read `memory/win-log/interview-mapping.md`. If the user is missing a "Creativity / Innovation" story, a novel project can fill that gap. If they're missing "Technical Problem Solving," suggest something with a clear technical challenge.

**Interview-specific tailoring:**
- If `memory/interview-context.md` → Status = `active`, tailor the project to the target company's domain. Preparing for StreamCo? Suggest a travel data project. Preparing for Stripe? Suggest a payments-related tool.

---

## Project suggestion format

Present to the user like this:

> "You've [context — what they've been learning/achieving recently].
> For a [dream role] role, here's a project that would be strong for your portfolio:
>
> [emoji] **Project: [Project Name]**
> - **Uses:** [list of skills from their pillars that the project exercises]
> - **Scope:** [time estimate based on their pacing] ([X] hours total)
> - **Why it's good:** [1-2 sentences on why this specific project impresses for their dream career]
> - **Stretch:** [optional extension that adds complexity for bonus points]
>
> Want me to break this into tasks and add it to your plan? Or would you prefer something different?"

Always offer alternatives — the user might want a different domain, different scope, or different tech.

### Emoji selection

Match the emoji to the project domain:
- 📊 Data/analytics projects
- 🌐 Web projects
- 📱 Mobile projects
- 🤖 AI/ML projects
- 🔧 Developer tools
- 📈 Dashboard/visualization projects
- 🗃️ Database/backend projects
- 🎮 Interactive/game projects

---

## If user accepts

### Step 1: Add project entry to current-plan.md

Write to `memory/current-plan.md` under the Portfolio Projects section:

```markdown
## Portfolio Projects

### [Project Name] (suggested YYYY-MM-DD)

- **Status:** in progress
- **Skills used:** [list]
- **Tasks added to plan:** weeks [N]-[N+1]
- **Dream career alignment:** [target role] — [why this project matters]
- **Completion → win log:** Yes, draft STAR entry when finished
```

### Step 2: Break the project into tasks

Create 4-8 concrete tasks spread across 1-2 weeks. Each task follows the standard task format from daily-plan:

| Field | Value for project tasks |
|-------|------------------------|
| # | Task number for the day |
| Action | "Design", "Build", "Implement", "Test", "Deploy", "Document" |
| Resource | Project name + specific deliverable (e.g., "Transit Dashboard — set up API connection") |
| Platform | Where they'll work (e.g., "Local", "GitHub", "Vercel") |
| URL | N/A (they're building, not consuming) |
| Est. time | Realistic estimate for that task |
| Pillar | Which skill pillar this task exercises |
| Type | "practice" for all project tasks |
| Status | "pending" |

### Step 3: Mix into the weekly plan

Add project tasks to `memory/plan-tasks/week-{N}.md` for the upcoming 1-2 weeks. Mix with regular learning tasks — don't make it ALL project work unless the user explicitly wants that.

Suggested distribution:
- 1-2 project tasks per day alongside 1-2 regular learning tasks
- Front-load design/setup tasks (Day 1-2 of the project)
- Back-load testing/deployment/documentation (last 1-2 days)

### Task progression for a typical project

| Phase | Tasks | Actions |
|-------|-------|---------|
| Design (Day 1) | 1 task | "Design" — sketch the architecture, define requirements, plan the data model |
| Build core (Day 2-4) | 2-3 tasks | "Build", "Implement" — core functionality, API integration, main features |
| Polish (Day 5-6) | 1-2 tasks | "Test", "Implement" — edge cases, error handling, UI polish |
| Ship (Day 7-8) | 1-2 tasks | "Deploy", "Document" — deploy to hosting, write README, clean up code |

Adjust based on project scope and the user's pacing.

---

## Project completion

When all project tasks are marked done in `memory/plan-tasks/week-{N}.md`:

### Step 1: Update project status

Update `memory/current-plan.md` → Portfolio Projects:
- Change **Status** from `in progress` to `completed`
- Add **Completed:** YYYY-MM-DD

### Step 2: Trigger win-log

Draft a STAR entry from the project. The user built something real — that's a win.

Pass to `skills/win-log/SKILL.md` (mock capture mode, since the context already exists):

> "You just finished [project name] — that's a real portfolio piece. Want me to frame it as an interview-ready STAR story?"

The win-log skill handles the STAR drafting. Provide it with:
- What the user built (project name + description)
- What skills were used
- The dream career alignment
- Any notable decisions or outcomes the user mentioned during check-ins

### Step 3: Celebrate

In the daily message and/or weekly digest:

> "You shipped [project name] this week — that's [X] skills applied to a real project. It's in your portfolio and ready for interviews."

### Step 4: Interview prep hook

If `memory/interview-context.md` → Status = `active`:

> "This project is ready for your portfolio. Want to practice talking about it in a mock interview?"

If the user says yes, flag for `skills/mock-interview/SKILL.md`.

---

## Tone rules

- **Enthusiastic but not pushy.** Project suggestions should feel exciting, not like homework.
- **Respect "no."** If the user declines, acknowledge and move on. No guilting.
- **Concrete, not vague.** "Build a transit data dashboard using Python and the MTA API" beats "build something with your Python skills."
- **Dream career framing.** Every suggestion explains WHY this project matters for their specific target role.
- **Realistic scoping.** Don't suggest a 100-hour project to someone with 30min/day. Be honest about time requirements.
- **Adjust by verbosity** (from `config/settings.md`):

| Verbosity | Style |
|-----------|-------|
| concise | Project name + uses + scope + one line on why. Skip stretch goal. |
| normal | Full suggestion format (name, uses, scope, why, stretch, offer alternatives) |
| detailed | Full format + explain how the project maps to interview questions, what hiring managers look for, how to present it on a resume |

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Portfolio-projects-specific:**
- The suggested project scope didn't match the user's actual available time — the pacing table estimate was off for this user's real schedule (log the suggested hours vs what felt realistic)
- The project didn't feel relevant to the dream career despite matching pillars — pillar alignment alone wasn't enough to make it compelling (log the project, the pillars, and what was missing)
- User's own project idea was better than anything the agent would have suggested (log what made their idea better — domain knowledge, personal motivation, real-world relevance, etc.)

## Edge cases

### User declines project suggestion

"No problem. I'll check back in a few weeks."

Track the decline. After 2 declines:
- Reduce suggestion frequency to once per month max
- Only suggest via triggers 1 (skill block completion) and 4 (manual request)
- Reset the decline counter if the user later asks for a project manually

### User wants to build something not suggested

Great — even better. Their idea, your structure:

1. Help them scope it: "That sounds great. Let me think about scope — how much time do you want to spend on it?"
2. Break it into 4-8 tasks following the standard format
3. Add to `memory/current-plan.md` and `memory/plan-tasks/week-{N}.md`
4. Track completion the same way as agent-suggested projects
5. Trigger win-log on completion

### User is overwhelmed with current tasks

If `memory/progress.md` → completion rate < 70% this week, skip the project suggestion trigger entirely. The user doesn't need more to do — they need to catch up on what's already assigned.

Exception: manual request (trigger 4) always gets a response, even if completion is low. If you do suggest a project in this case, scope it smaller and mention: "Since you've got a lot on your plate right now, here's something small — [X hours] total."

### Project is abandoned mid-way

If project tasks are being skipped for 2+ weeks (check `memory/plan-tasks/week-{N}.md` for consecutive skipped project tasks):

> "The [project name] seems stalled. Want to:
> - Finish it with a smaller scope? (I can cut the remaining tasks down)
> - Pause it? (I'll save your progress and we can pick it up later)
> - Drop it? (No judgment — it happens)
>
> What sounds right?"

Update `memory/current-plan.md` → Portfolio Projects status accordingly:
- Smaller scope: update tasks, keep status `in progress`
- Pause: set status to `paused`
- Drop: set status to `dropped`

Don't guilt. Don't nag. One check-in, then respect the answer.

### User is a complete beginner (all pillars Level 1)

Don't suggest open-ended builds — that's overwhelming for someone just learning.

Instead, suggest **guided projects with tutorials**:

> "You're building your fundamentals nicely. Here's a guided project that'll give you something real to show:
>
> 🔧 **Project: [Name] (Tutorial + Customize)**
> - **Follow:** [specific tutorial resource]
> - **Then customize:** [2-3 specific modifications that make it their own]
> - **Scope:** ~[X] hours (including the tutorial)
>
> Following a tutorial first, then making it yours, is how most developers start their portfolio."

The "customize" part is what makes it portfolio-worthy — anyone can follow a tutorial, but customizations show understanding.

### Interview is in less than 2 weeks

Don't suggest a new project. There's not enough time to build something meaningful AND prepare for the interview.

Instead, if they have existing projects (from `memory/resume-context.md` or `memory/current-plan.md` → Portfolio Projects):

> "With [X] days until your interview, starting a new project isn't the best use of your time. But you already have [existing project] — want to polish it or practice talking about it instead?"

### User already has 3+ active projects

Don't suggest another one. Finish what's started.

> "You've got [N] projects in progress right now. Let's finish [project name] first — shipping one project is worth more than having three half-done. Want me to help you push [project name] across the finish line?"

Check `memory/current-plan.md` → Portfolio Projects for active projects (status = `in progress` or `paused`).

### Project requires paid tools/APIs

Avoid. Always prefer free alternatives. If no free option exists for the project concept:

> "This project would ideally use [paid tool], which costs [amount]. There's a free alternative: [free option] — it's [tradeoff]. Want to go with the free option, or is the paid tool okay?"

Never silently assume the user will pay for tools.

### Multiple pillars level up simultaneously

Suggest ONE project that combines them:

> "You just leveled up in both [pillar A] and [pillar B] — nice combo. Here's a project that uses both:
>
> [standard suggestion format with skills from both pillars]"

This is more impressive on a portfolio than two separate small projects.

### User's learning style is consumption-heavy

If `memory/resource-feedback.md` shows the user consistently rates videos and articles higher than practice tasks, and they've declined projects before — respect this. Some users learn by consuming, not building. Reduce project suggestion frequency further.

But don't eliminate suggestions entirely — even consumption-focused learners benefit from occasional building. Frame it differently:

> "I know you prefer learning through videos and reading — totally valid. But a small build project can lock in what you've been absorbing. This one is only [X hours] and uses exactly what you've been studying."

### Project completion coincides with a pillar level-up

If completing the project also causes a pillar to level up (project tasks count as blocks), celebrate both:

> "Double milestone — you shipped [project name] AND leveled up to Level [N] in [pillar]. That's the kind of week that changes trajectories."

### Interview prep wants a portfolio project but time is tight

If `memory/interview-context.md` → Status = `active` and Days remaining is 14-21 (enough time but tight):

- Suggest a SMALLER project (4-6 hours max)
- Focus on the target company's domain
- Skip the stretch goal
- Front-load completion: all tasks in the first week, nothing in the final days before the interview

> "You've got enough time for a quick project that'll look great for [company]. This one's scoped tight — [X hours] total, all wrapped up before your final prep days."

---

## Example: skill block completion trigger

```
[User just passed the Level 2 → Level 3 gate for SQL & Data Analysis]

Agent: "You just hit Level 3 in SQL — that means you can write complex queries
        independently. Nice milestone.

        For a Product Manager role, here's a project that would be strong for
        your portfolio:

        📊 Project: Product Metrics Dashboard
        - Uses: SQL (your newly leveled-up skill), Python, data visualization
        - Scope: ~10 hours over 2 weeks (fits your 30min/day schedule)
        - Why it's good: PMs who can pull their own data and build dashboards
          stand out immediately. This shows you don't just talk about data —
          you work with it. Uses public e-commerce data so no setup barriers.
        - Stretch: Add cohort analysis to show retention trends

        Want me to break this into tasks and add it to your plan? Or would
        you prefer something different?"

User: "That sounds good, let's do it."

Agent: "Great. I've added it to your plan:

        Week 5:
        - Mon: Design — sketch dashboard layout + define key metrics (~30min)
        - Tue: Build — set up Python project, connect to dataset (~30min)
        - Wed: Build — write SQL queries for 3 core metrics (~30min)
        - Thu: Implement — build visualization for first metric (~30min)
        - Fri: Implement — add remaining visualizations (~30min)

        Week 6:
        - Mon: Implement — interactivity + filtering (~30min)
        - Tue: Test — edge cases, data validation (~30min)
        - Wed: Deploy — push to GitHub, add README (~30min)

        Mixed in with your regular learning tasks. Let's build this."
```

## Example: interview prep trigger

```
[Interview prep is active for StreamCo Product Analyst, 18 days out]

Agent: "For a Product Analyst role at StreamCo, a data project in the
        travel domain would stand out. Here's one:

        📊 Project: Hotel Pricing Analysis Tool
        - Uses: SQL, Python, pandas, data visualization
        - Scope: ~6 hours over 1 week (tight scope for interview timeline)
        - Why it's good: Shows StreamCo you understand their domain.
          Analyzing hotel pricing data demonstrates the exact analytical
          thinking they hire for. Uses public Kaggle hotel booking data.
        - Stretch: Skip the stretch — focus on shipping a clean v1

        Want me to add this to your interview prep plan?"
```

## Example: building gap trigger

```
[Adaptation flags: no Build/Create tasks completed in 3+ weeks]

Agent: "You've been reading and watching for a while — solid foundation
        building. But building something would cement these skills in a way
        that's hard to replicate by studying alone. Interested in a project?

        🤖 Project: AI-Powered Study Notes Summarizer
        - Uses: Python (Level 2), API integration, text processing
        - Scope: ~8 hours over 2 weekends
        - Why it's good: For a PM role, building with AI shows you understand
          the technology your teams will ship. Plus, it's a tool you'd
          actually use.
        - Stretch: Add a simple UI with Streamlit

        Want me to scope this out, or would you rather build something else?"
```

## Example: user declines

```
Agent: [suggests a project]

User: "Not right now, I want to focus on studying."

Agent: "No problem. I'll check back in a few weeks. Keep crushing the
        learning tasks."

[Agent tracks: decline count = 1. Next suggestion not before 3 weeks.]

---

[3 weeks later, another trigger fires]

Agent: [suggests a different project]

User: "I'm still not feeling a project."

Agent: "Totally fine — everyone learns differently. I won't suggest projects
        unless you ask. Just say 'suggest a project' whenever you're ready."

[Agent tracks: decline count = 2. Suggestion frequency capped at 1/month,
 only via skill block completion or manual request.]
```

## Example: user brings their own idea

```
User: "I want to build a Chrome extension that tracks time spent on
       different websites."

Agent: "Love it — that's a great portfolio piece, especially for PM roles
        where understanding user behavior matters. Let me help you scope it.

        How much time do you want to spend on it — quick weekend build or
        something more polished?"

User: "Weekend build, maybe 6-8 hours."

Agent: "Perfect. Here's how I'd break it down:

        📦 Project: Website Time Tracker (Chrome Extension)
        - Uses: JavaScript, Chrome Extension APIs, basic data viz
        - Scope: ~7 hours over 1 week

        Tasks:
        - Day 1: Design — define features, sketch the popup UI (~30min)
        - Day 2: Build — Chrome extension boilerplate, tab tracking logic (~1.5hr)
        - Day 3: Build — data storage (chrome.storage), daily/weekly aggregation (~1.5hr)
        - Day 4: Implement — popup UI with time breakdown chart (~1.5hr)
        - Day 5: Test + Deploy — test across sites, package, publish to Chrome Web Store (~1.5hr)

        Want me to add these to your plan?"
```
