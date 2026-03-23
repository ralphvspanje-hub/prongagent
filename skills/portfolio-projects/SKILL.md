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

## Skill files

| File | When to read |
|------|-------------|
| `references/project-generation.md` | Before generating any project suggestion — contains the 5-factor decision framework and additional considerations |
| `examples/scenarios.md` | When you need example conversations for skill block completion, interview prep, building gap, user declines, or user's own idea |

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
| `memory/user-model.md` | Motivation Drivers (how to pitch the project), Growth Edges (readiness signals), Knowledge Anchors (what they're strong at — build on it) |
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

Before generating a suggestion, read `references/project-generation.md` for the 5-factor decision framework.

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
| Action | "Design", "Build", "Implement", "Test", "Deploy", "Document" + specific deliverable |
| Search | N/A (they're building, not consuming) |
| Platform | Where they'll work (e.g., "Local", "GitHub", "Vercel") |
| Size | Short / Medium / Long |
| Pillar | Which skill pillar this task exercises |
| Type | "practice" for all project tasks |
| Why | How this project connects to dream career |
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

In addition to the general triggers in `AGENTS.md`, write an observation if:

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
For full example conversations, see `examples/scenarios.md`.
