# Examples

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
