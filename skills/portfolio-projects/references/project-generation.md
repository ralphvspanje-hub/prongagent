# Project Generation — 5-Factor Decision Framework

## The 5 factors

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

## Additional considerations

**Don't duplicate existing projects:**
- Read `memory/resume-context.md` → Key Projects. If the user already built a React dashboard, don't suggest another React dashboard. Suggest something that uses different skills or a different domain.
- Read `memory/win-log/wins.md`. If they already have a polished win for a particular skill area, suggest a project in a different area — fill portfolio gaps, don't stack duplicates.

**Fill interview mapping gaps:**
- Read `memory/win-log/interview-mapping.md`. If the user is missing a "Creativity / Innovation" story, a novel project can fill that gap. If they're missing "Technical Problem Solving," suggest something with a clear technical challenge.

**Interview-specific tailoring:**
- If `memory/interview-context.md` → Status = `active`, tailor the project to the target company's domain. Preparing for StreamCo? Suggest a travel data project. Preparing for Stripe? Suggest a payments-related tool.
