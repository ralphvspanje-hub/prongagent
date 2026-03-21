# What Happens on Activation

After the user confirms, execute these steps in order:

## Step A: Write interview-context.md

### Check for existing JD file

Before creating a new JD file, check `memory/interview-context.md` → Job Posting History for a matching company+role entry. If found and it has a `jd_file` path, verify the file exists at that path. If it does, reuse it — don't create a duplicate. Career-mentor may have already saved this JD.

Also check `Files/Job Descriptions/` directly for a file matching the company-role slug (e.g., `adyen-se.md`). If one exists from a prior career-mentor interaction, use that path.

Only create a new JD file if no existing match is found.

Write all gathered info to `memory/interview-context.md`:

```markdown
# Interview Context

## Active Interview Prep

- **Status:** active
- **Target company:** [company name]
- **Target role:** [role title]
- **Interview date:** YYYY-MM-DD
- **JD file:** [reuse existing path if found, otherwise path to `Files/Job Descriptions/[company]-[role-slug].md` if saved, or "none" if no JD available]
- **Job description summary:** [key requirements, nice-to-haves]
- **Key requirements:** [bulleted list of must-have skills from JD]
- **Interview format:** [phone screen / technical / behavioral / system design / take-home / panel / unknown]
- **Interview stages:** [what's known about the process]
- **Prep started:** [today's date]
- **Days remaining:** [calculated]

## Skill Requirements

Parse the JD file (if available) or key requirements from onboarding. For each skill the job requires, assess the user's current level and identify the gap. Weight the crash course toward the biggest gaps — skills the user is weakest in relative to the job's requirements should get the most prep time.

Write a skill requirements table to `interview-context.md`. Include at minimum: skill name, whether it's must-have or nice-to-have, the user's current level, the gap size, and a rough weight for crash course time allocation.

**Intent:** Every task category (technical, behavioral, company research, etc.) should get some time — don't zero out a category even if the user seems strong. But lean heavily toward the areas where the gap between "what the job needs" and "where the user is" is largest.

**Example:** Adyen SE interview → SQL (30%), API/payments domain (25%), behavioral (20%), system design (15%), company research (10%)

### Gotchas
- **Recruiter emails aren't JDs.** If the user pasted a recruiter outreach email rather than an actual job description, the extracted requirements will be thin. Note this and ask: "Do you have the full job posting? The recruiter message doesn't have enough detail to build a targeted crash course."
- **Behavioral always matters.** Even if a JD is 100% technical requirements, the interview will have behavioral questions. Don't let behavioral prep weight drop to near-zero just because the JD doesn't mention it.

## Readiness Assessment

Calculate the initial readiness tier using criteria from `references/readiness-tiers.md`. This is the baseline — it will be recalculated daily by the daily-plan skill.

- **Readiness tier:** [Ready / Almost There / Partially Ready / Unprepared]
- **Strong areas:** [skills that match — reference Skill Requirements where Gap = none]
- **Gap areas:** [skills that need work — reference Skill Requirements where Gap = large]
- **Priority gaps:** [ranked by interview impact — what's most likely to come up]

## Crash Course Plan

(generated in Step C — uses Skill Requirements weights)

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

1. **Save the current plan state** — copy the current Pillars table, weights, and week number into a `## Saved Plan (before interview_prep)` section at the bottom of the file. This is what gets restored after interview prep ends. If the current plan type is `job_search`, also save the `job_search_started` date and weekly application target. Label clearly:

```markdown
## Saved Plan (before interview_prep)

- **Previous plan type:** job_search  <!-- or learning -->
- **Job search started:** YYYY-MM-DD  <!-- only if previous was job_search -->
- **Pillars:** [saved pillar table]
- **Week:** [saved week number]
```

2. **Change plan type** to `interview_prep`:

```markdown
## Plan Info

- **Created:** [today's date]
- **Current week:** 1
- **Total weeks:** [days until interview / 7, rounded up, max 4]
- **Plan type:** interview_prep
- **Interview date:** YYYY-MM-DD
- **Previous plan type:** [learning or job_search]
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

If a JD file exists (see `jd_file` field from Step A), read `Files/Job Descriptions/[file].md` → Extracted Requirements section. Use these requirements to customize the crash course task mix (see `references/crash-course-tasks.md` → JD-Mapped Task Weighting for the algorithm).

Trigger the daily-plan skill with mode: `full_plan` in `interview_prep` context. The daily-plan skill reads plan type and adjusts accordingly (see daily-plan edge case for interview_prep mode). Key differences from a regular plan:

- **Compressed timeline:** days until interview, not 8-12 weeks
- **Pillar weights remapped** to interview requirements
- **Task types shift** — see `references/crash-course-tasks.md`
- **Daily tasks include** a mix of: technical practice + behavioral prep + company-specific research
- **No ramp-up period** — full intensity from Day 1

## Step D: Win log activation

**Cooldown check:** Before triggering win-log extraction, read `memory/win-log/candidates.md` → `## Cooldown`. If `last_surfaced` is today, defer extraction to tomorrow. Log in Step G: "Win log extraction deferred — cooldown active."

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
- **If SRS has 0 relevant concepts** (empty table or no matches): skip the burst. Note in the activation log (Step G): "SRS burst skipped — no relevant concepts in spaced-repetition queue." The crash course will build technical knowledge from scratch.

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