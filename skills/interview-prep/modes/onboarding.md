# Interview Onboarding Conversation

A 3-4 turn conversation to gather everything needed for a targeted crash course. Keep it focused — the user has an interview to prepare for, not a personality quiz to fill out.

## Pre-check: edge case routing

Before starting the conversation, check the timeline:

- **Interview is tomorrow (or today):** Skip to ultra-compressed mode (see edge cases). Don't run the full onboarding.
- **Interview is 2+ months away:** Don't switch to full `interview_prep` yet. Note the interview in `memory/interview-context.md` but keep plan type as `learning`. Shift pillar weights toward interview-relevant skills within the regular plan. Switch to `interview_prep` mode 3-4 weeks before the date.
- **Already in `interview_prep` for another interview:** Handle the multi-interview case (see edge cases).

## Turn 1: Company + role

> "What company and role? Share the job posting if you have it — I'll pull out exactly what they're looking for."

Accept whatever format:
- **Full job posting:** Parse it — extract required skills, nice-to-haves, team info, company description, seniority level. **Save the JD** (see below).
- **Company + role title only:** Work with that. Use general requirements for that role type. Note that details are incomplete — update if the user gets more info later. Skip JD file creation.
- **Just "an interview" (no company/role yet):** That's fine — recruiter outreach, still figuring it out. Do general interview prep (see edge cases). Skip JD file creation.

### Save the job description

If the user shared a full job posting (pasted text or enough detail to constitute a JD), save it to `Files/Job Descriptions/[company]-[role-slug].md`:

```markdown
# [Role Title] — [Company]
**Saved:** YYYY-MM-DD
**Source:** [URL if available]
**Status:** active

## Original Job Description
[full JD text as pasted by user]

## Extracted Requirements
- [must-have skill 1]
- [must-have skill 2]
- [nice-to-have 1]
- [experience level required]
- [CS degree required? yes/no/preferred]
```

**Naming convention:** lowercase, hyphenated. Examples: `adyen-se.md`, `uber-strategy-planning-analyst.md`, `booking-data-analyst.md`

If no JD text was provided (just a company + role title), skip file creation — the file can be created later if the user shares the posting.

### Gotchas
- **Recruiter emails aren't JDs.** A brief recruiter outreach ("We have an exciting opportunity at...") doesn't have enough detail to extract requirements. Ask for the actual posting before creating a JD file.
- **Same company, different roles.** If the user has already prepped for a different role at the same company, the naming convention will produce different files (e.g., `adyen-se.md` vs `adyen-data-analyst.md`). Check `Files/Job Descriptions/` for existing files from the same company — the company research may be reusable.
- **JD text may include boilerplate.** Corporate JDs often have paragraphs of diversity statements, benefits, etc. Extract requirements from the substantive sections, not the boilerplate.

### Extract:
- **Company name** (or "unknown" if recruiter stage)
- **Role title** (as specific as possible)
- **Job description details:** required skills, nice-to-haves, team info, seniority expectations
- **Industry/domain** (for company-specific prep — if Stripe, payments domain; if Spotify, audio streaming)
- **JD file path** (if saved — reference in activation Step A)

## Turn 2: Timeline + format

> "When is it? And do you know the format — phone screen, technical round, behavioral, take-home, panel?"

Extract:
- **Interview date** (exact date if known, "next week" or "in 2 weeks" if approximate — convert to absolute date)
- **Interview format/stages:** phone screen, technical, behavioral, system design, take-home, panel, or unknown
- **Any known details about the process** (number of rounds, who's interviewing, time limits)
- **Calculate days remaining** from today

If the user doesn't know the format:
> "No worries — I'll prep you for the most likely formats for [role] at [company]. We can adjust when you know more."

## Turn 3: Readiness assessment

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

## Turn 4: Confirm + activate

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