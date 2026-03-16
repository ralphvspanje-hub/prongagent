---
name: prongagent-interview-prep
description: "Job search detection and interview crash course generation"
tags: [learning, interview, career]
user-invocable: true
metadata:
  openclaw:
    emoji: "🎤"
---

# Interview Prep Skill

## When to trigger

Two entry points:

**1. DETECTED** — the adaptation skill detects interview/job search mention in conversation and surfaces the option. User confirms they want interview prep. Adaptation passes control to this skill.

**2. EXPLICIT** — user directly says "I have an interview at [company] on [date]", "help me prep for an interview", "I'm interviewing at [company]", or similar.

## What to read

Read ALL of the following before starting the interview onboarding conversation:

| File | What to look for |
|------|-----------------|
| `memory/user-profile.md` | Dream career, current skills, known gaps, experience level, time commitment — base context for assessing readiness |
| `memory/resume-context.md` | Work experience, projects, technologies — for company-specific prep and identifying transferable experience |
| `memory/current-plan.md` | Current pillars, levels, weights, plan type — you will change plan type to `interview_prep` and save the current plan for restoration |
| `memory/interview-context.md` | Check if already active (multiple interviews). Check existing data if returning to an in-progress prep. |
| `memory/win-log/wins.md` | Count polished wins — if < 5, trigger extraction mode after onboarding |
| `memory/win-log/interview-mapping.md` | Check question type coverage — flag gaps |
| `memory/progress.md` | Current pillar levels, blocks at level — assess readiness against job requirements |
| `memory/spaced-repetition.md` | Active concepts — flag relevant ones for interview burst review |
| `config/settings.md` | Schedule, frequencies — interview mode tightens adaptation settings |

## What to write

| File | When |
|------|------|
| `memory/interview-context.md` | After interview onboarding — all gathered context (company, role, date, format, requirements, readiness, prep status) |
| `memory/current-plan.md` | Plan type change to `interview_prep`, pillar weight shifts, compressed timeline. Save previous plan state for restoration. |
| `config/settings.md` | Tighten adaptation settings for interview mode (noted in file so adaptation skill reads them) |
| `memory/adaptation-log.md` | Log the plan type change as an adaptation entry |

## Downstream triggers (after activation)

| Skill | Trigger condition |
|-------|------------------|
| `skills/win-log/SKILL.md` (extraction mode) | Win log has < 5 polished entries in `wins.md` |
| `skills/spaced-repetition/SKILL.md` (interview burst) | Pull relevant Active + Retired concepts to due-today |
| `skills/daily-plan/SKILL.md` (mode: full_plan, interview_prep context) | Generate the crash course plan |
| `skills/mock-interview/SKILL.md` | Schedule at least 2 mock sessions before the interview date |

---

## Interview onboarding conversation

A 3-4 turn conversation to gather everything needed for a targeted crash course. Keep it focused — the user has an interview to prepare for, not a personality quiz to fill out.

### Pre-check: edge case routing

Before starting the conversation, check the timeline:

- **Interview is tomorrow (or today):** Skip to ultra-compressed mode (see edge cases). Don't run the full onboarding.
- **Interview is 2+ months away:** Don't switch to full `interview_prep` yet. Note the interview in `memory/interview-context.md` but keep plan type as `learning`. Shift pillar weights toward interview-relevant skills within the regular plan. Switch to `interview_prep` mode 3-4 weeks before the date.
- **Already in `interview_prep` for another interview:** Handle the multi-interview case (see edge cases).

### Turn 1: Company + role

> "What company and role? Share the job posting if you have it — I'll pull out exactly what they're looking for."

Accept whatever format:
- **Full job posting:** Parse it — extract required skills, nice-to-haves, team info, company description, seniority level
- **Company + role title only:** Work with that. Use general requirements for that role type. Note that details are incomplete — update if the user gets more info later.
- **Just "an interview" (no company/role yet):** That's fine — recruiter outreach, still figuring it out. Do general interview prep (see edge cases).

Extract:
- **Company name** (or "unknown" if recruiter stage)
- **Role title** (as specific as possible)
- **Job description details:** required skills, nice-to-haves, team info, seniority expectations
- **Industry/domain** (for company-specific prep — if Stripe, payments domain; if Spotify, audio streaming)

### Turn 2: Timeline + format

> "When is it? And do you know the format — phone screen, technical round, behavioral, take-home, panel?"

Extract:
- **Interview date** (exact date if known, "next week" or "in 2 weeks" if approximate — convert to absolute date)
- **Interview format/stages:** phone screen, technical, behavioral, system design, take-home, panel, or unknown
- **Any known details about the process** (number of rounds, who's interviewing, time limits)
- **Calculate days remaining** from today

If the user doesn't know the format:
> "No worries — I'll prep you for the most likely formats for [role] at [company]. We can adjust when you know more."

### Turn 3: Readiness assessment

Compare job requirements against the user's current state. Read:
- `memory/user-profile.md` → current skills, experience level
- `memory/current-plan.md` → pillar levels
- `memory/resume-context.md` → work experience, technologies
- `memory/win-log/wins.md` → count polished wins
- `memory/win-log/interview-mapping.md` → question type coverage

Present the assessment:

> "Based on your profile and the job requirements, here's where I think you stand:
>
> **Strong:** [skills/experience that match the job requirements]
> **Needs work:** [gaps between job requirements and current levels]
> **Win log:** [X polished wins — need Y more / gaps in Z question type]
>
> Does that match your read? Anything else you're worried about?"

Be honest about gaps. If the user's pillar levels are very low for the job requirements:

> "The job asks for [X] at a level you haven't reached yet. Here's what we can realistically cover in [days]. I'll prioritize the highest-impact areas."

Don't sugarcoat, but don't discourage either. Frame it as triage — what's the highest-ROI prep given the timeline.

### Turn 4: Confirm + activate

> "Here's my plan:
>
> - **Technical prep:** [brief — e.g., "focused SQL practice + system design fundamentals"]
> - **Behavioral prep:** [brief — e.g., "polish 3-4 STAR stories, practice delivery"]
> - **Company research:** [brief — e.g., "understand their stack, recent news, culture"]
> - **Mock interviews:** [number] before the real thing
> - **Timeline:** [days] days, starting tomorrow
>
> I'll shift your daily tasks to focus on interview prep starting tomorrow. Your regular learning plan is paused but saved — we'll pick it back up after.
>
> Sound good?"

Wait for confirmation before activating. If they want changes, adjust the plan summary and re-confirm.

---

## What happens on activation

After the user confirms, execute these steps in order:

### Step A: Write interview-context.md

Write all gathered info to `memory/interview-context.md`:

```markdown
# Interview Context

## Active Interview Prep

- **Status:** active
- **Target company:** [company name]
- **Target role:** [role title]
- **Interview date:** YYYY-MM-DD
- **Job description summary:** [key requirements, nice-to-haves]
- **Key requirements:** [bulleted list of must-have skills from JD]
- **Interview format:** [phone screen / technical / behavioral / system design / take-home / panel / unknown]
- **Interview stages:** [what's known about the process]
- **Prep started:** [today's date]
- **Days remaining:** [calculated]

## Readiness Assessment

- **Strong areas:** [skills that match]
- **Gap areas:** [skills that need work]
- **Priority gaps:** [ranked by interview impact — what's most likely to come up]

## Crash Course Plan

(generated in Step C)

## Company Research

- **Company size:** [if known]
- **Industry:** [domain]
- **Tech stack (if known):** [technologies]
- **Culture notes:** [from JD, company website, etc.]
- **Recent news:** [anything notable]

## Prep Checklist

- [ ] Win log has 5+ polished entries
- [ ] Interview mapping covers: leadership, technical, failure, collaboration
- [ ] Mock interviews completed: 0
- [ ] Key concepts reviewed via spaced repetition
- [ ] Company research done
- [ ] Portfolio project relevant to role identified (if time allows)

## Post-Interview Notes

(filled after the interview)
```

### Step B: Change plan type

Update `memory/current-plan.md`:

1. **Save the current plan state** — copy the current Pillars table, weights, and week number into a `## Saved Learning Plan` section at the bottom of the file. This is what gets restored after interview prep ends.

2. **Change plan type** to `interview_prep`:

```markdown
## Plan Info

- **Created:** [today's date]
- **Current week:** 1
- **Total weeks:** [days until interview / 7, rounded up, max 4]
- **Plan type:** interview_prep
- **Interview date:** YYYY-MM-DD
- **Previous plan type:** learning
```

3. **Remap pillars** to interview requirements:
   - Map each job requirement to a pillar
   - Set weights based on gap severity (biggest gaps get highest weight)
   - Compress levels — if the user is Level 1 in a critical skill and the interview is in 2 weeks, don't try to get them to Level 3. Focus on solid Level 2 fundamentals.
   - Keep 2-4 pillars. Interview prep pillars may differ from learning plan pillars.

Example pillar remapping for a PM interview:

```markdown
## Pillars

| Pillar | Level | Blocks at level | Weight |
| ------ | ----- | --------------- | ------ |
| SQL & Data Analysis | 2 | 0/5 | 25% |
| Product Sense & Case Interviews | 1 | 0/5 | 35% |
| Behavioral & STAR Stories | 2 | 0/5 | 25% |
| Company-Specific Research | 1 | 0/5 | 15% |
```

### Step C: Generate crash course

Trigger the daily-plan skill with mode: `full_plan` in `interview_prep` context. The daily-plan skill reads plan type and adjusts accordingly (see daily-plan edge case for interview_prep mode). Key differences from a regular plan:

- **Compressed timeline:** days until interview, not 8-12 weeks
- **Pillar weights remapped** to interview requirements
- **Task types shift** — see crash course task types below
- **Daily tasks include** a mix of: technical practice + behavioral prep + company-specific research
- **No ramp-up period** — full intensity from Day 1

### Step D: Win log activation

Check `memory/win-log/wins.md`:

| Win count | Action |
|-----------|--------|
| < 5 polished wins | Trigger `skills/win-log/SKILL.md` extraction mode immediately. Flag in daily message: "Your win log needs work — I'll help you build STAR stories this week." |
| 5+ wins but `interview-mapping.md` has gaps | Flag the specific gaps: "You're missing a [gap category] story. Let's work on that." |
| 8+ wins, all question types covered | Note readiness: "Your win log is solid — [X] stories covering all major question types." |

### Step E: SRS burst

Notify the spaced-repetition skill to activate interview mode:

- Pull all Active Review Items relevant to the target role to due-today
- Pull relevant Retired items back into Active at due-today
- This is a one-time burst — after the initial pull, concepts follow the normal spacing algorithm
- "Relevant" = concept's pillar matches interview prep pillars OR concept directly relates to job requirements

### Step F: Config tightening

Add an interview mode section to `config/settings.md` (or update if it exists):

```markdown
## Interview Mode (active)

- **Adaptation cooldown:** 1 day (was 3)
- **Adaptation review cycle:** daily (was weekly pattern detection)
- **New pillars:** blocked (stay focused on interview prep)
- **Portfolio projects:** blocked unless directly relevant to target role
- **Mock interview target:** 2+ before interview date
```

The adaptation skill reads these overrides when plan type is `interview_prep`.

### Step G: Log the activation

Write to `memory/adaptation-log.md`:

```markdown
## YYYY-MM-DD — Interview prep activated

- **Trigger:** User confirmed interview at [company] for [role] on [date]
- **Change:** Plan type changed from learning to interview_prep. Pillars remapped to interview requirements. Crash course generated. Win log extraction triggered. SRS burst activated.
- **Reasoning:** [days] days until interview. Priority gaps: [list]. Win log has [X] polished entries ([sufficient/needs extraction]). Adaptation tightened to daily review cycle.
- **Files modified:** memory/interview-context.md, memory/current-plan.md, config/settings.md
```

---

## Crash course task types

Interview prep daily tasks are different from regular learning tasks. Each day should include a mix:

### Technical practice

- LeetCode/HackerRank problems matched to job requirements + current pillar level
- SQL exercises if the role requires data skills
- System design exercises if the role is senior or technical
- Match difficulty to timeline: if 2 weeks out, focus on medium problems in the most likely topics. Don't grind hards unless the user is already strong.

Resource format: `Practice: [problem type] on [platform] [link] ~[time]`

### System design

- Design exercises relevant to the company's domain
- If preparing for Stripe: design a payment system
- If preparing for Spotify: design a music recommendation system
- If preparing for a startup: design a feature from their product
- Scale complexity to the role level — associate PM gets simpler systems than senior engineer

Resource format: `Practice: System design — [topic] ~[time]`

### Behavioral prep

- Review and practice STAR stories from win log
- Draft new stories for gap question types in `interview-mapping.md`
- Practice delivery: tell each story in under 2 minutes
- Common behavioral questions for the role type (leadership, failure, collaboration, conflict, initiative)
- Self-guided tasks — no external resource needed, just structured practice

Resource format: `Practice: Behavioral — draft STAR story for [question type] ~[time]` (URL: N/A)

### Company research

- Read the company blog, engineering blog, product updates
- Understand their tech stack and technical challenges
- Recent news, funding rounds, product launches
- Culture and values (from careers page, Glassdoor, LinkedIn)
- Prepare 2-3 thoughtful questions to ask the interviewer

Resource format: `Research: [company] — [specific topic] ~[time]` (URL: company blog/careers page if known, or `🔍 Search: "[company] engineering blog" on Google`)

### Mock interviews

- Schedule mock interview sessions — trigger the mock-interview skill
- At least 2 mocks before the real interview
- Mix of formats matching the expected interview format
- Space them out: first mock early in prep (to identify weak areas), second mock 2-3 days before (to build confidence)
- If time allows, 3+ mocks with different formats (behavioral, technical, system design)

Resource format: `Practice: Mock interview — [format] (with learning companion) ~[time]`

### Take-home prep

- If the interview format includes a take-home assignment, allocate dedicated time
- Practice projects in the company's tech stack
- Focus on: clean code, clear documentation, good testing, reasonable scope management
- If the company's stack is known, practice with that stack specifically

Resource format: `Build: Take-home practice — [stack/topic] ~[time]`

---

## Countdown + progress tracking

### Daily message integration

When plan type is `interview_prep`, the daily-plan skill's daily_message mode adjusts:

- **Countdown:** "Interview in [X] days. Today's focus: [area]"
- **Prep area progress:** reference which prep areas are on track vs. need attention
- **Urgency calibration:**
  - 14+ days: normal pacing, "plenty of time"
  - 7-13 days: focused, "this week is key"
  - 3-6 days: urgent, "final push — focus on the highest-impact items"
  - 1-2 days: wind-down, "trust your prep. Light review only."

### Weekly review integration

When plan type is `interview_prep`, the weekly-review skill shifts:

- Countdown instead of week number: "9 days until your [company] interview"
- Readiness assessment instead of general progress: "Behavioral is solid. Product sense needs work — especially metrics questions."
- Look-ahead is interview-focused: "Next week: 2 mock interviews + gap-filling on system design."
- Prep checklist status from `interview-context.md`

### Prep area tracking

Track in `memory/interview-context.md` under Prep Checklist. Update status after each check-in:

- Win log: [X/5 minimum wins, gap categories]
- Mock interviews: [completed/target]
- Technical: [topics covered, confidence level]
- Behavioral: [STAR stories prepared, delivery practiced]
- Company research: [done/not done]
- SRS review: [relevant concepts reviewed]

### Early completion

If the user completes all prep areas with 3+ days to spare:

> "You're as ready as you can be. Trust your prep. Light review tomorrow — go over your STAR stories once, skim your company research notes, and get a good night's sleep. You've got this."

Switch to maintenance mode: 1 light task per day (review only), no new material.

---

## Post-interview

### Check-in (after interview date passes)

The day after the interview date (or when the user next engages), check in:

> "How did the interview go?"

### Handle the response

| User says | Action |
|-----------|--------|
| **Got the job / advancing to next round** | Celebrate genuinely. If more rounds: stay in `interview_prep`, adjust based on feedback about round 1. If offer accepted: "That's huge. Want help prepping for your first week?" Transition back to learning plan with an onboarding-for-the-new-job focus. |
| **Didn't get it** | Encourage without being fake: "That's rough. But you put in real prep and that carries forward." Capture learnings: "What questions surprised you? Anything you wish you'd practiced more?" Add weak areas to the plan for next time. Transition back to learning plan with targeted reinforcement on the gaps they identified. |
| **Waiting to hear back** | "Fingers crossed. While you wait, want to keep prepping (in case there's another round) or go back to your regular plan?" Respect their choice. |
| **More rounds coming** | Stay in `interview_prep` mode. Ask what round 1 was like — format, questions, what felt good, what was hard. Adjust the crash course for the next round. Update `interview-context.md` with round 1 feedback. |
| **Got another interview at a different company** | Handle the multi-interview case (see edge cases). |

### Transition back to learning plan

When interview prep ends (job secured, user wants to stop, or interview process concluded):

1. **Change plan type** back to `learning` in `memory/current-plan.md`
2. **Restore previous plan** from the `## Saved Learning Plan` section — restore pillars, weights, and week number
3. **Incorporate learnings** — if the interview revealed specific weak areas, adjust pillar weights to address them
4. **Update interview-context.md** — set Status to `completed` or `cancelled`, add post-interview notes
5. **Resume daily plan** from where they left off

> "Your interview prep is wrapped up. I've restored your regular learning plan — picking up where you left off at Week [N]. [If weak areas identified:] I've also bumped up [pillar] weight based on what came up in your interview."

---

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Interview-prep-specific:**
- The crash course didn't cover something the user actually needed for the interview (log what was missing and how you found out — post-interview debrief, user feedback, etc.)
- The 2-month threshold for deferring full `interview_prep` mode felt wrong — either too early (user wasn't ready to shift) or too late (they needed more time in interview mode) (log the timeline and what would have been better)
- Post-interview transition back to the learning plan was jarring — the user's context had shifted during interview prep and the saved plan felt stale (log what felt off about the restored plan)

## Edge cases

### Interview is tomorrow

Ultra-compressed mode. Skip the full crash course. Focus on highest-impact, lowest-effort prep:

1. **Review win log** — read through existing STAR stories. If win log is empty, do a 10-minute rapid extraction of 2-3 stories.
2. **Quick mock** — one behavioral mock (15-20 minutes). Focus on delivery, not new content.
3. **Company basics** — 10 minutes reading the company's about page and recent news. Prepare 2 questions to ask.
4. **Confidence framing** — "Not much time, but let's make the most of it. You know more than you think — the goal tomorrow is to communicate clearly, not to be perfect."

Don't generate a multi-day crash course. Don't trigger SRS burst. Don't change plan type (one day isn't worth the overhead).

Write a minimal `interview-context.md` entry so the post-interview check-in still fires.

### User doesn't know company or role yet

General interview prep — recruiter outreach, early-stage job search, exploring options:

- **Behavioral:** STAR stories from win log (universally useful)
- **Technical:** common questions for their dream career role type
- **System design:** general design exercises at their level
- **No company-specific research** — skip until details arrive

Set `interview-context.md` with Target company = "TBD" and Target role = "[dream career role type]". Update when the user gets more details.

> "I'll start with general prep for [dream career role type] interviews. When you know which company, I'll tailor the plan."

### Already in interview_prep — gets another interview

Multiple interviews running in parallel:

1. **Update interview-context.md** — add a second interview section:

```markdown
## Interview 2

- **Status:** active
- **Target company:** [company 2]
- **Target role:** [role 2]
- **Interview date:** YYYY-MM-DD
...
```

2. **Prioritize the sooner interview** — daily tasks focus on what's next
3. **Shared prep covers both** — if both interviews need behavioral prep, one set of STAR stories serves both. Technical prep diverges only where company-specific requirements differ.
4. **After the first interview concludes**, shift full focus to the second

### User wants to cancel interview prep

Respect it immediately. No pushback, no "are you sure?"

1. Change plan type back to `learning` in `memory/current-plan.md`
2. Restore previous plan from `## Saved Learning Plan`
3. Update `interview-context.md` — set Status to `cancelled`

> "Done — your regular plan is back. Your interview prep progress is saved if you need it later."

### User's pillar levels are very low for the job

Be honest about the gap, then triage:

> "The job asks for [X] at a level you haven't reached yet. In [days] days, here's what we can realistically cover:
>
> - **High impact:** [1-2 areas where focused practice will show the most improvement]
> - **Foundation only:** [areas where we can cover basics but not depth]
> - **Skip for now:** [areas that need more time than we have — be strategic about what to deprioritize]
>
> I'll prioritize the highest-impact areas. Even partial prep is better than none."

Don't pretend they can master everything in 2 weeks. Don't discourage them from interviewing. Frame it as strategic triage.

### No job posting available

Work from the role title and company name:

- Use general requirements for that role type (e.g., "PM at a mid-size tech company" has well-known patterns)
- Research the company to infer tech stack, culture, interview style
- Prep for the most common interview formats for that role
- Update the plan if the user gets the job posting later

> "I don't have the job posting, but I know what [role] interviews at [company type] typically look like. I'll prep you for the standard format and we can adjust if you get more details."

### Interview is 2+ months away

Don't switch to full `interview_prep` yet — that's too early to go into intensive mode:

1. Write the interview to `memory/interview-context.md` with Status = `scheduled`
2. Keep plan type as `learning`
3. Shift pillar weights toward interview-relevant skills within the regular plan (+10-15% to relevant pillars)
4. Start win log extraction if win count is low (this can happen at a relaxed pace)
5. Set a reminder: switch to `interview_prep` mode 3-4 weeks before the date

> "Your interview is [X] weeks out — plenty of time. I'm not going to flip your whole plan yet, but I'll start steering your regular tasks toward skills that matter for this role. I'll switch to full interview prep mode about 3-4 weeks before."

When the 3-4 week mark arrives, run the full activation (Steps A-G) as if the user just confirmed.

### User returns to interview prep after cancelling

If the user previously cancelled and now wants to resume:

1. Check `memory/interview-context.md` for the cancelled entry
2. Ask: "I have your previous prep for [company/role]. Want to pick up where you left off, or start fresh?"
3. If picking up: restore the interview context, recalculate days remaining, resume the crash course
4. If starting fresh: treat as a new activation

### Interview process takes longer than expected

If the interview date passes but the user says they're still in the process (waiting, more rounds, rescheduled):

- Keep `interview_prep` active
- Adjust the timeline
- If the user is in a waiting period between rounds: reduce to maintenance mode (1 light task/day) until the next round date is known

---

## Example: full activation flow

```
[Adaptation skill detects: user says "I just got an email from StreamCo
for a product analyst interview"]

Adaptation: "Sounds like you might be entering interview mode. I can spin up
             an interview crash course — company research, mock interviews,
             targeted practice. Want me to set that up?"

User: "Yeah, let's do it."

[Control passes to interview-prep skill]

Agent: "Nice — StreamCo product analyst. Do you have the job posting?
        If so, share it and I'll pull out exactly what they're looking for."

User: "Here's the posting: [pastes JD with requirements for SQL, A/B testing,
       product metrics, stakeholder communication, 2+ years experience]"

Agent: "Got it. When's the interview? And do you know the format —
        phone screen, case study, technical, panel?"

User: "March 28th. First round is a phone screen with the hiring manager,
       then a case study round if I pass."

Agent: "Alright, that's 12 days. Here's where you stand based on your profile:

        Strong:
        - Product thinking (you've built 2 products from scratch — that's rare)
        - SQL basics (Level 2, comfortable with joins and aggregations)
        - Communication (STAR format practiced, bilingual)

        Needs work:
        - A/B testing (not in your current plan — need to add)
        - Product metrics depth (Level 1 — need frameworks like HEART, AARRR)
        - SQL at interview depth (window functions, complex queries)
        - StreamCo-specific knowledge (travel/marketplace domain)

        Win log: 0 polished wins — we need to extract at least 5 STAR stories.

        Does that match your read? Anything else you're worried about?"

User: "Yeah that's accurate. I'm also nervous about the case study format —
       never done one before."

Agent: "Good to flag. Here's my plan:

        - Technical prep: SQL drills (window functions, subqueries) +
          A/B testing fundamentals + product metrics frameworks
        - Behavioral prep: Extract 5+ STAR stories from your resume,
          practice delivery — your LearnFlow and RetainIt stories are strong
        - Case study prep: Practice 3-4 product cases (metrics, prioritization,
          go-to-market) — I'll run these as mock sessions
        - Company research: StreamCo's marketplace model, recent product
          changes, their analytics approach
        - Mock interviews: 2 before March 28 — one behavioral, one case study
        - Timeline: 12 days, starting tomorrow

        I'll shift your daily tasks to focus on interview prep. Your regular
        plan is paused but saved — we'll pick it back up after.

        Sound good?"

User: "Let's go."

Agent: [Executes Steps A-G. Writes interview-context.md. Changes plan type.
        Generates crash course. Flags win log for extraction. Triggers SRS burst.
        Tightens adaptation settings. Logs activation.]

        "You're locked in. Tomorrow's plan will be interview-focused. First
         thing I want to do is work on your win log — you've got great
         material from LearnFlow, RetainIt, and your side business. Let's turn
         those into polished interview stories. Ready?"
```

## Example: post-interview check-in

```
[March 29 — day after interview]

Agent: "How did the StreamCo interview go?"

User: "Phone screen went well! They asked about my product experience
       and seemed impressed by RetainIt. Moving to the case study round
       next week."

Agent: "That's great — your product building experience is exactly what
        differentiates you. Did anything come up that surprised you or
        felt shaky?"

User: "They asked about A/B testing in more detail than I expected —
       like how I'd design an experiment for a specific feature."

Agent: "Good intel. I'll add more A/B test design exercises to this week's
        plan — not just the theory but actually designing experiments for
        StreamCo-style features (search ranking, pricing display, etc.).

        Your case study round is next week — let's make sure you're ready.
        I'll schedule a case study mock for Wednesday and another Friday."
```

## Example: transition back

```
[After interview process concludes]

Agent: "Your StreamCo interview prep is wrapped up. Here's what we covered:
        - 5 polished STAR stories (covering leadership, technical, failure,
          collaboration, initiative)
        - 2 mock interviews (1 behavioral, 1 case study)
        - SQL leveled up from 2 to 3 during prep
        - A/B testing fundamentals covered

        I've restored your regular learning plan — picking up where you left
        off at Week 3. I've bumped up Product Sense weight to 35% since the
        interview showed that's the area with the most room to grow.

        Back to the regular rhythm tomorrow."
```
