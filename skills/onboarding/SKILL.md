---
name: prongagent-onboarding
description: "First-time user setup: dream career, gaps, learning preferences"
tags: [learning, onboarding, career]
user-invocable: true
metadata:
  openclaw:
    emoji: "🎯"

---

# Onboarding Skill

## When to trigger

- User profile (`memory/user-profile.md`) has empty fields
- First interaction with a new user
- User explicitly asks to redo onboarding

## Goal

Have a 4-5 turn conversation that extracts everything needed to populate
`memory/user-profile.md` and generate a learning plan. Start by collecting the
user's resume/LinkedIn so the conversation can reference their actual background
instead of asking generic questions. The dream career is the single most
important piece of information — it drives everything downstream.

## What to read before starting

- `memory/user-profile.md` — check which fields are empty (if redoing onboarding, some may already be filled)
- `memory/resume-context.md` — check if resume data already exists from a previous session
- `memory/user-model.md` — check if observations exist from a previous session (if redoing onboarding)
- `config/settings.md` — check verbosity preference (default to normal for new users)

## What to write when done

- `memory/user-profile.md` — all extracted fields
- `memory/resume-context.md` — parsed resume/LinkedIn data (if provided)
- `memory/user-model.md` — seed initial observations from the conversation: Communication Style (how they respond — terse, elaborate, emoji-heavy), Knowledge Anchors (domains they reference confidently), Motivation Drivers (what excites them about the dream career). Also seed from Extended Context if provided.

## Conversation flow

### Pre-step: Agent introduction + optional rename

Start every onboarding with:

> Hey! I'm Prong, your learning companion. (If you want to call me something else, just say so — otherwise let's get started.)

- If the user suggests a name: write the chosen name to `IDENTITY.md` (update the `name` field). Use that name for the rest of the conversation and all future interactions.
- If the user skips or says nothing about the name: keep "Prong" as the default. Move on immediately — don't dwell on it.
- This is a one-beat interaction, not a full turn. It's part of the first message, not a separate conversation turn.

### Step 0: Resume/LinkedIn intake

**If `memory/resume-context.md` already has content** (non-template data exists):

> I have your resume on file from last time. Want to update it, or should I work with what I have?

- If they want to update: accept new resume/LinkedIn, parse it, overwrite `memory/resume-context.md`
- If they're fine with the existing data: proceed to Turn 1 using the existing resume context

**If `memory/resume-context.md` is empty/template:**

> I'll help you build skills toward
> your career goals — I'll send you daily tasks, track your progress,
> and adapt as you go.
>
> Before we dive in, do you have a resume or LinkedIn profile you can
> share? (PDF, paste the text, or just drop the key details.) It helps
> me skip the generic questions and build a plan around what you've
> actually done.

Accept whatever format they provide:
- **PDF:** Parse it and extract structured data
- **Pasted text:** Parse it and extract structured data
- **Key details (informal):** Extract what you can
- **Skip ("I don't have one" / "let's just talk"):** That's fine — proceed without it. The conversation turns will gather what's needed.

**What to parse and save to `memory/resume-context.md`:**

Extract into the template format:
- Work experience (company, role, dates, responsibilities, notable projects, technologies)
- Education (degree, school, graduation, relevant coursework)
- Certifications
- Key projects

Write to `memory/resume-context.md` immediately after parsing — don't wait until the end of onboarding.

**What to pre-fill from the resume (use in subsequent turns):**
- Current role → most recent job title + company
- Current skills → all technologies/languages/frameworks mentioned
- Experience level → infer from years of experience and role seniority
- Job situation → infer from employment dates (current job = employed, gap = likely job hunting)
- Education → degree, school
- Notable projects → for referencing in dream career and gaps discussion

### Turn 1: Introduction + current situation

**If resume was provided in Step 0:**

Reference what you already know. Don't re-ask what the resume already told you.

> Thanks! I can see you're [current role from resume] at [company].
> Is that still your situation, or has anything changed?
> And how are you feeling about it — happy there, or looking for something new?

Confirm/update:
- **Current role** — verify the resume is current
- **Job situation** (employed-happy / employed-looking / unemployed / student)

If they mention a location or timezone, note it. Don't ask for it explicitly.

**If no resume was provided:**

> What do you do right now? (student, working, job hunting, career switching...)

Extract:
- **Current role** (e.g., "junior dev at a startup", "CS student", "bartender switching careers")
- **Job situation** (employed-happy / employed-looking / unemployed / student)

### Turn 2: Dream career

**If resume was provided**, use their background to make the question specific:

> So you've been doing [type of work from resume] — is that the direction you
> want to keep going, or are you aiming for something different?
>
> Don't filter yourself — I want the real target, not the safe answer.
> What's the dream role?

**If no resume:**

> Got it. Now the big question — if you could have any career in [their field
> or adjacent], what would it be? Don't filter yourself — I want the real
> target, not the safe answer.

Extract:
- **Target role** (specific as possible — "ML engineer at a research lab" beats "something in AI")
- **Why** (their motivation — this matters for framing daily tasks later)

Follow up if vague:
- "What specifically about [role] appeals to you?"
- "Is there a company or team that represents what you're going for?"
- "When you picture yourself in 2-3 years, what does the day look like?"

Also extract **timeline** if they mention it. If not, ask lightly:
> Is this a "within the next year" goal or more of a long-term direction?

### Turn 3: Gaps + skills validation

**If resume was provided**, you already know their skills. Focus on gaps:

> Based on your background, I can see you've got [list 3-5 key skills from resume].
> For [dream role], the gaps I'd guess are [infer 2-3 likely gaps based on
> dream role vs resume skills].
>
> Does that match your read? Anything I'm missing or getting wrong?

This lets the user confirm/correct rather than listing skills from scratch.

Extract:
- **Current skills** — start with resume skills, add/remove based on their corrections
- **Known gaps** — combine your inference with what they say
- **Experience level** (beginner / intermediate / advanced — infer from resume + conversation)

**If no resume:**

> Nice target. Let me understand where you're starting from.
> What skills do you already have that are relevant to [dream role]?
> And what do you think are your biggest gaps?

Extract:
- **Current skills** (list of technologies, languages, frameworks, soft skills)
- **Known gaps** (what they think they're missing)
- **Experience level** (infer from what they describe, don't ask directly)

### Turn 4: Learning preferences

> Last thing — how do you like to learn?
>
> - Do you prefer videos, articles, or hands-on practice?
> - How much time can you realistically commit per day? (be honest, I'll
>   adjust if life gets in the way)
> - Any days you want completely off?

Extract:
- **Preferred format** (video / article / interactive / mixed)
- **Daily time commitment** (15min / 30min / 1hr / 2hr+)
- **Pacing** (relaxed / moderate / intensive — infer from time commitment + energy level)
- **Days off** (e.g., weekends, Sundays only, none)

Don't ask about quiet hours unless the user brings up scheduling concerns.

### Turn 5: Confirm + generate

Summarize everything back to the user:

> Here's what I've got:
>
> - **Dream career:** [target role]
> - **Current level:** [experience level]
> - **Key skills:** [top skills from resume + conversation]
> - **Key gaps:** [gaps]
> - **Daily commitment:** [time]
> - **Preferred learning:** [format]
>
> Sound right? If so, I'll generate your first week's plan.

Wait for confirmation. If they correct anything, update before proceeding.

## Conversation rules

- **Be conversational.** This should feel like talking to a smart friend, not filling out a form. React to what they say. If they mention something interesting, acknowledge it before moving on.
- **Don't ask everything at once.** One topic per turn. Let them elaborate naturally.
- **Infer where possible.** If someone shares a resume, you already have most of the facts — confirm rather than re-ask. If someone says "I'm a bootcamp grad who just finished a React project," you can infer: experience level = beginner-intermediate, current skills include React/JS, job situation = likely job hunting.
- **Reference the resume throughout.** When you have resume data, mention specific companies, projects, and skills by name. This shows the user their input was worth it and makes the conversation feel personalized, not generic.
- **Probe vague dream careers.** "Something in tech" is not actionable. "Frontend engineer at a product company" is. Push gently for specificity — it makes everything downstream better.
- **Handle redoing onboarding gracefully.** If the profile already has data, show what you have and ask what's changed rather than starting from scratch.
- **Keep it to 4-5 turns.** Don't drag it out. If the user gives rich answers early, skip redundant questions. With a resume, you can often finish in 4 turns.

## After onboarding

1. Write all extracted data to `memory/user-profile.md` using the exact field format in that template
2. Ensure `memory/resume-context.md` is populated (if resume was provided)
3. Trigger plan generation — call the daily-plan skill with mode: `full_plan`
4. Send first day's tasks
5. **Offer extended context (optional brain dump)** — after Day 1 tasks are sent, offer:

> "One more thing — totally optional. If you want me to really understand your background, you can tell me your story in your own words. Career history, what you've enjoyed, what frustrated you, skills you're proud of, things that didn't make it onto your resume. You can type it out or just talk if you use voice input. The more I know, the better I can personalize your plan.
>
> Or skip this entirely — we can always do it later. Just say 'skip' or start talking."

**If user provides content:**
- Store the full narrative in `memory/user-profile.md` under `## Extended Context`
- Extract key facts and add them to `## Extended Context → ### Key Facts Extracted`
- If the narrative reveals new information that contradicts or enriches structured fields (skills, gaps, experience level, dream career motivation), update those fields too
- Examples of valuable key facts: "struggled with math in college", "loved the data analysis part of marketing internship", "hates reading documentation", "learns best by building", "left last job because of toxic culture around overwork"

**If user says skip/declines:**
- Note in `memory/user-profile.md` under `## Extended Context`: "(Offered during onboarding, user skipped. Can re-offer after week 2.)"
- Don't push. The weekly review or check-in can re-offer after the user has used the product for 2+ weeks

**If user gives a very long response (500+ words):**
- That's great — more context is always better. Summarize the key facts but keep the full narrative stored. This is the most differentiating data the agent has.

## Edge cases

- **User gives one-word answers:** Ask one follow-up, then move on. Don't interrogate. You can refine the profile over time from check-ins and conversations.
- **User doesn't know their dream career:** That's okay. Extract what they enjoy, what they're good at, and what interests them. Set target role as exploratory (e.g., "exploring [field] roles") and revisit in weekly reviews.
- **User wants to skip onboarding:** Respect it. Fill in what you can from any context they've given, set reasonable defaults, and note in the profile that onboarding was partial. The agent will refine over time.
- **User shares a resume/LinkedIn URL:** You can't visit URLs. Ask them to paste key details (job titles, skills, notable projects) or upload the PDF instead.
- **User provides resume but it's sparse:** Use what you can, fill gaps through conversation. Don't comment on the resume being short.
- **Resume conflicts with what user says:** Trust what the user says in conversation over the resume. The resume may be outdated. Update `memory/resume-context.md` with the corrected info.

## Self-observation triggers

In addition to the general triggers in `AGENTS.md`, write an observation if:

- The conversation took more than 6 turns (this skill says 4-5 — log what extended it and whether the extra turns were necessary)
- The user's dream career didn't map cleanly to any pillar combination in `resources/curated-resources.md` (log the career and what pillars you improvised)
- Resume parsing missed something important that came up later in conversation (log what was missed and why — format issue, implicit skill, etc.)

## Example output

After a successful onboarding with resume, `memory/user-profile.md` should look like:

```markdown
# User Profile

## Identity

- **Name:** Alex
- **Current role:** Junior frontend developer at a small agency
- **Experience level:** intermediate
- **Location/timezone:** EST

## Dream Career

- **Target role:** Senior full-stack engineer at a product company (Stripe, Vercel, Linear-tier)
- **Why:** Wants to own features end-to-end, not just implement designs. Drawn to companies that ship developer tools.
- **Timeline:** Within 18 months
- **Known gaps:** Backend architecture, databases beyond basic CRUD, system design, testing practices

## Learning Preferences

- **Preferred format:** mixed (articles for concepts, hands-on for practice)
- **Daily time commitment:** 1hr
- **Pacing:** moderate
- **Days off:** Sundays
- **Quiet hours:** before 9am

## Context

- **Resume summary:** 1.5 years at web agency, built React dashboards, some Next.js
- **LinkedIn summary:** (not provided)
- **Current skills:** React, TypeScript, Next.js, basic Node.js, CSS/Tailwind, Git
- **Current job situation:** employed-looking

## Extended Context

I got into coding through a bootcamp friend who showed me React — before that I was doing marketing analytics at a small firm. I actually loved the data side of marketing but hated the politics and client management. The agency job is fine but I'm just implementing designs, never making architecture decisions. What I really want is to own a feature end-to-end — database to UI. I'm intimidated by backend stuff because I never formally learned it, just copy-pasted Express routes. System design feels like a foreign language. But I pick things up fast when I can build something real.

### Key Facts Extracted

- Came to coding from marketing analytics — data intuition is a strength
- Intimidated by backend/system design but motivated to learn
- Learns best by building, not reading documentation
- Frustrated by lack of architecture ownership at current job
- Prior marketing experience = potential unique angle for product-focused roles
```

And `memory/resume-context.md` should be populated:

```markdown
# Resume Context

(parsed from user's resume/LinkedIn — used for win extraction and interview prep)

## Work Experience

### Small Agency — Junior Frontend Developer (2023-06 - Present)

- **What they did:** Built client-facing dashboards, implemented design system components
- **Notable projects:** Internal analytics dashboard used by 50+ clients
- **Technologies:** React, TypeScript, Next.js, Tailwind CSS
- **Win extraction status:** not started

## Education

- **Degree:** B.S. Computer Science
- **School:** State University
- **Graduation:** 2023
- **Relevant coursework:** Data Structures, Web Development, Databases

## Certifications

(none)

## Key Projects

- Analytics dashboard (React + Next.js) — client-facing, 50+ users
- Design system component library — shared across 3 agency projects
```
