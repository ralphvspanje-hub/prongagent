# What Happens on Activation

After the user confirms, execute these steps in order:

## Step A: Write interview-context.md

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

## Step B: Change plan type

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

## Step C: Generate crash course

Trigger the daily-plan skill with mode: `full_plan` in `interview_prep` context. The daily-plan skill reads plan type and adjusts accordingly (see daily-plan edge case for interview_prep mode). Key differences from a regular plan:

- **Compressed timeline:** days until interview, not 8-12 weeks
- **Pillar weights remapped** to interview requirements
- **Task types shift** — see `references/crash-course-tasks.md`
- **Daily tasks include** a mix of: technical practice + behavioral prep + company-specific research
- **No ramp-up period** — full intensity from Day 1

## Step D: Win log activation

Check `memory/win-log/wins.md`:

| Win count | Action |
|-----------|--------|
| < 5 polished wins | Trigger `skills/win-log/SKILL.md` extraction mode immediately. Flag in daily message: "Your win log needs work — I'll help you build STAR stories this week." |
| 5+ wins but `interview-mapping.md` has gaps | Flag the specific gaps: "You're missing a [gap category] story. Let's work on that." |
| 8+ wins, all question types covered | Note readiness: "Your win log is solid — [X] stories covering all major question types." |

## Step E: SRS burst

Notify the spaced-repetition skill to activate interview mode:

- Pull all Active Review Items relevant to the target role to due-today
- Pull relevant Retired items back into Active at due-today
- This is a one-time burst — after the initial pull, concepts follow the normal spacing algorithm
- "Relevant" = concept's pillar matches interview prep pillars OR concept directly relates to job requirements

## Step F: Config tightening

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

## Step G: Log the activation

Write to `memory/adaptation-log.md`:

```markdown
## YYYY-MM-DD — Interview prep activated

- **Trigger:** User confirmed interview at [company] for [role] on [date]
- **Change:** Plan type changed from learning to interview_prep. Pillars remapped to interview requirements. Crash course generated. Win log extraction triggered. SRS burst activated.
- **Reasoning:** [days] days until interview. Priority gaps: [list]. Win log has [X] polished entries ([sufficient/needs extraction]). Adaptation tightened to daily review cycle.
- **Files modified:** memory/interview-context.md, memory/current-plan.md, config/settings.md
```
