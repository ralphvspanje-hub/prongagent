# ProngAgent — Future Ideas

Ideas that came up during development but aren't needed for the current phase. Review before each new phase to see if anything should be pulled in.

---

## Job search plan type

A plan type between `learning` and `interview_prep` for users who are actively searching for jobs but don't have a specific interview date yet. Current plan types assume you're either learning (no urgency) or prepping for a known interview (high urgency, compressed timeline). Job search mode would:

- Balance skill-building with application activities (resume polish, networking, company research)
- Include weekly application targets alongside learning tasks
- Shift pillar weights toward interview-relevant skills without going full interview-prep intensity
- Activate win-log passive capture earlier (to build up stories before interviews happen)
- Transition to `interview_prep` automatically when the user reports an interview date

### Sub-feature: Proactive job scanning

Agent scans job boards, company career pages, and LinkedIn for openings that match the user's dream career, skills, and pillar levels. Runs daily or on a configurable schedule. Surfaces 1-3 relevant listings with context the user can't get from a generic alert: "This role asks for X — you're Level 3 in that pillar" or "Your portfolio project maps to their requirements."

**Blocked on:** OpenClaw capabilities (can it browse? which APIs?). LinkedIn scraping is against ToS — needs LinkedIn API or alternative sources (Adzuna, Indeed API, company RSS feeds). Build only after the job search plan type itself is validated.

**Scope guard:** This is a feature *within* the job search plan type, not a standalone skill. The agent should only scan when the user is in job_search mode. Don't scan for users who are just learning.

## Newsletter/X scanning for current topics

Enhancement to the resource search layer (Priority 2 in daily-plan.md). Instead of only searching when curated resources are missing, proactively scan newsletters, X/Twitter, and tech blogs for current topics. Useful for fast-moving pillars (AI, cloud, frameworks) where the best resources change monthly. Could use RSS feeds, API integrations, or agent web search on a weekly schedule. Output: append fresh resources to curated-resources.md with a `[scanned]` tag and let the graduation system vet them through user ratings.

## RAG for learning resources

When the curated resources library grows large (200+) or includes full content (not just links), a vector store would let the agent search semantically ("find me a beginner-friendly video on recursion") instead of reading the entire file. Not needed while resources fit in context.

## Resume versioning

Track resume changes over time so the agent can say "you added a new project since last month — want to tell me about it for your win log?" Currently: simple overwrite in resume-context.md.

## Multi-user database

When multiple users run ProngAgent, memory files per user don't scale. Move to SQLite (local) or Supabase (cloud) at that point. File-based is fine for single user.

## Community resource ratings

Aggregate resource feedback across users — "87% of Level 2 learners rated this resource 'great'." Requires multi-user infrastructure first.

## Accountability buddy matching

Agent connects users working on similar skills for weekly check-ins. Requires multi-user + some kind of matching service.

## Voice mock interviews

More realistic interview practice. Could use browser speech API in the dashboard, or a voice-enabled Discord bot.

## Platform API integrations

Connect to LinkedIn Learning, Coursera, Udemy APIs for richer resource metadata (completion tracking, course ratings, progress sync).

## AI-generated practice problems

Instead of just linking to LeetCode, generate custom problems tailored to the user's weak areas and dream career context.

## Resource quality audit (before Phase 5 open source release)

The initial ~40 curated resources were ported from ProngGSD and were AI-generated — URLs are real but quality/relevance hasn't been human-verified. Before open-sourcing, do a proper audit:

**Approach:** Use Perplexity Pro to research best resources per pillar per level. Perplexity is ideal because it cites sources, so you can verify recommendations aren't hallucinated. For each pillar/level combo, ask:

> "What are the best free resources for learning [topic] at a [beginner/intermediate/advanced] level? I need: resource name, platform, URL, type (video/article/interactive/book), and estimated completion time. Prioritize resources that are frequently recommended by developers on Reddit, Hacker News, and dev blogs."

**What to check for each resource:**

- URL actually works and goes to the right place
- Content is free (or has a meaningful free tier)
- Content matches the level range (a "beginner" resource should actually be beginner-friendly)
- Resource is actively maintained (not abandoned in 2019)
- Covers what the description claims

**Target:** 10-15 vetted resources per pillar per level. Aim for 150-200 total. The resource-feedback system will handle quality refinement after that — but the starting set should be solid.

**Alternative tools:** If Perplexity isn't available, Claude web search or ChatGPT with browsing can do the same thing but verify URLs manually since they hallucinate links more often.

## "Got extra time?" prompt in daily message

During the first week, add an optional footer to the daily message: "Got extra time? Just ask and I'll add more." Teaches the user they can request more tasks on days they have bandwidth. Remove after week 1 — by then they know. Trivial to implement: one conditional line in daily_message mode based on current week number.

## Doomscroll nudge (depends on OpenClaw context)

If OpenClaw exposes screen activity / app usage context, the agent could detect idle scrolling and send a gentle nudge: "Hey, I noticed you're free — want to knock out today's task? It's only 20min." Framed as opportunity, never guilt. Hard constraints: max once per day, never during quiet hours, if user ignores twice in a row stop doing it entirely. **Blocked on:** Step 0.6 — need to know what context OpenClaw actually exposes before designing this.

## CLI / notebook interface

A CLI tool to interact with ProngAgent from a terminal — trigger skills, view tasks, log check-ins, browse progress. Flips the agent-native model (agent reaches out to you) into a pull model (you go to it). Only build if dogfooding reveals a genuine need to query progress or trigger skills manually. If after 4+ weeks of use you find yourself wanting this, that's signal. Until then, the agent pushing via Discord is the differentiator.
