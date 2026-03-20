# Portfolio Projects — Example Scenarios

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
