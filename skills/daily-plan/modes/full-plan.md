# Mode: full_plan

Triggered after onboarding. Generates the overall multi-week learning plan.

**Step 0: Precondition check**

Before generating, verify `memory/user-profile.md` has non-empty values for:
- Target role (Dream Career → Target role)
- Daily time commitment (Learning Preferences → Daily time commitment)
- At least one known gap (Dream Career → Known gaps)

If any of these are empty, abort plan generation and trigger the onboarding skill instead. Do not attempt to generate a plan from incomplete profile data.

**Step 1: Select pillars (2-4)**

Analyze the dream career and known gaps from `memory/user-profile.md`. Pick 2-4 skill pillars that close the biggest gaps toward the target role.

How to choose:
- Map the dream role to its core competencies (e.g., "Senior Full-Stack Engineer" → backend architecture, databases, system design, testing)
- Cross-reference with the user's known gaps — prioritize gaps over strengths
- Cross-reference with `resources/curated-resources.md` — only pick pillars you have resources for
- If the user has resume context, use their existing skills to identify what's genuinely missing vs. what they think is missing

Example pillar selection for "Senior Full-Stack Engineer":
| Pillar | Why |
|--------|-----|
| Backend Architecture | Gap: user only has basic Node.js, needs API design + patterns |
| Databases | Gap: only basic CRUD, needs query optimization + data modeling |
| System Design | Gap: no exposure, critical for senior roles |
| Testing | Gap: mentioned by user, important for production code quality |

**Step 2: Set initial pillar levels**

Each pillar has levels 1-5. Set initial levels based on the user's experience:

| User's experience with this pillar | Starting level |
|-------------------------------------|----------------|
| No exposure | Level 1 |
| Some basics / coursework | Level 1 |
| Has used it at work (basic) | Level 2 |
| Comfortable, uses regularly | Level 3 |
| Strong, could teach others | Level 4 |

Never start at Level 5 — that's mastery, earned through the program.

**Block definition:** A "block" is one completed task in that pillar. Each level requires 5 blocks (completed tasks) to level up. When a pillar reaches 5/5 blocks, increment its level by 1 and reset blocks to 0/5. The adaptation skill may adjust the blocks-per-level threshold based on teach-back results.

**Step 3: Set pillar weights**

Weights determine how many tasks per week go to each pillar. Heavier weight = more daily tasks from that pillar.

- Weight the biggest gaps higher (they need more time)
- Weight user's strengths lower (maintenance mode)
- Weights should sum to 100%
- Reassessed during adaptation (if a pillar levels up fast, shift weight to slower ones)

**Step 4: Outline the plan**

Write to `memory/current-plan.md`:
- Plan duration: 8-12 weeks (default 8 for moderate pacing, 12 for relaxed)
- Which pillars focus in which weeks (not rigid — adaptation will shift this)
- Plan type: `learning` (or `interview_prep` if user is actively job hunting with a timeline)

**Step 5: Generate Week 1**

Immediately proceed to mode: `weekly` to generate the first week's tasks.

**Step 6: Send Day 1**

After Week 1 is generated, immediately proceed to mode: `daily_message` to send the first day's tasks. The user should receive their first tasks in the same session as onboarding — don't make them wait until tomorrow.
