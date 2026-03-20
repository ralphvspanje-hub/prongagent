# Example: behavioral mock (with win-log coaching)

```
Agent: "What type of mock do you want? Behavioral, technical, or system
        design? Or want me to pick based on what you need most?"

User:  "You pick."

Agent: "I'm going with behavioral — your interview mapping shows you don't
        have a failure/learning story ready, and StreamCo will almost
        certainly ask about it. Let's practice that.

        Imagine I'm the hiring manager. Here's my first question:

        'Tell me about a time something went wrong — a project that didn't
        work out, a mistake you made, or a setback you had to deal with.
        What happened and what did you learn?'"

User:  "So when I was building LearnFlow, the first version was just
        a simple plugin. It worked but it was really limited —
        users couldn't see their progress, the plan wasn't persistent,
        and I realized I'd built the wrong thing. So I scrapped it and
        rebuilt it as a full web app."

Agent: "**What worked:** Good that you owned the mistake — 'I built the
        wrong thing' is honest and shows self-awareness.

        **What to improve:** Your result is vague. You said you rebuilt
        it, but what happened after? Did users engage more? What specific
        problems did the web version solve? Add a number or concrete
        outcome to the Result section.

        Also — you skipped the constraint. What made this decision hard?
        Scrapping work is emotionally tough. That's the 'T' in STAR.

        Next question: 'Describe a time you had to influence someone
        without having authority over them.'"

[... continues for 3-5 questions ...]

Agent: "**Overall: Almost there** for behavioral

        **Top strength:** You're honest about mistakes and clearly
        articulate what you did — your Action sections are strong.

        **Top improvement area:** Results. 4 out of 4 answers had vague
        outcomes. Every story needs a concrete result — a metric, user
        feedback, something that changed.

        **Action items:**
        1. Go through your 3 STAR stories and add a specific metric or
           outcome to each Result section
        2. Practice telling the LearnFlow failure story with this
           ending: 'The web version has [X feature], [Y engagement],
           and [Z improvement over the plugin]'
        3. You need a collaboration story — think about the thesis
           research workflow. You coordinated multiple AI agents to
           validate sources — that's a collaboration/systems story.

        That answer about running 7 user interviews for RetainIt was
        strong — want me to save it as a polished win?"
```

# Example: technical mock (with difficulty calibration)

```
Agent: "Technical round. Your SQL is Level 2 and the StreamCo role
        needs strong data skills, so I'll focus there. Think aloud as
        you work through these.

        Question 1: You have a 'bookings' table with columns: booking_id,
        user_id, hotel_id, check_in_date, check_out_date, total_price,
        created_at. And a 'users' table with: user_id, country, signup_date.

        Write a query to find the top 3 countries by total booking revenue
        in the last 30 days, but only include countries with at least
        10 bookings."

User:  "Okay so I need to join bookings and users... then group by
        country... and filter by date... Let me think.

        SELECT u.country, SUM(b.total_price) as revenue
        FROM bookings b
        JOIN users u ON b.user_id = u.user_id
        WHERE b.created_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY u.country
        HAVING COUNT(*) >= 10
        ORDER BY revenue DESC
        LIMIT 3"

Agent: "**What was right:** Clean query, correct JOIN, good use of HAVING
        for the minimum bookings filter. You thought aloud which helps
        the interviewer follow your reasoning.

        **What was missed:** You used created_at (when the booking was made)
        instead of check_in_date (when the stay happened). In a real
        interview, that ambiguity is a chance to ask a clarifying
        question: 'Do you want revenue by booking date or stay date?'
        That shows maturity.

        **Edge case:** What if a user has no country set (NULL)? Your
        current query includes them as a group. Add WHERE u.country
        IS NOT NULL or ask whether to include unknowns."
```

# Example: session summary with cross-mock comparison

```
Agent: "**Overall: Almost there** for behavioral

        **Top strength:** Your story selection has improved — you used
        different stories for different question types this time instead
        of defaulting to the RetainIt story for everything.

        **Top improvement area:** Result specificity. Still vague on
        2 of 4 answers — that's down from 4 of 4 last time, so you're
        improving, but keep pushing for concrete metrics.

        **Action items:**
        1. Before the real interview, rehearse each of your 5 STAR
           stories once with a timer — aim for under 2 minutes each
        2. For the side business story, lead with '€18K/year revenue'
           — that number is impressive and you buried it

        Compared to your last mock: Your STAR structure is much tighter.
        The Situation sections were half the length of last time. The
        story selection issue from mock #1 is gone — nice improvement.
        The results specificity is better but still the main thing to
        work on."
```
