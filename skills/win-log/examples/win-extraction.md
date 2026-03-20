# Examples

## Example: passive review -> extraction

```
Agent: "I've noticed something from your learning log worth capturing. Two weeks
        ago you were struggling with SQL window functions -- couldn't explain them
        in the teach-back. This week you nailed the Level 2 gate on the first try,
        including a correlated subquery question. That's a real skill-building story.

        Want to polish this into an interview-ready win?"

User:  "Sure, but is that really impressive enough for an interview?"

Agent: "Absolutely. Interviewers love 'I identified a gap, worked on it
        systematically, and can now demonstrate mastery.' It shows self-awareness
        and follow-through. Let me ask a few questions to frame it right.

        What was the situation -- what were you trying to learn and why?"

User:  "I was preparing for PM interviews and realized I couldn't query my own
        data. Like, I understood conceptually what a JOIN does but couldn't write
        one without Googling every syntax detail."

Agent: "Good. What made this tricky? What did you try that didn't work at first?"

User:  "I tried just reading documentation but it didn't stick. I switched to
        doing actual exercises on real datasets -- Mode Analytics problems. The
        window functions in particular took me like 3 different resources before
        it clicked."

Agent: "And the result?"

User:  "I can now write complex queries from scratch. I actually used SQL to
        pull data for a class project last week and my professor commented that
        my analysis was more detailed than most students who've been using SQL
        for years."

Agent: "Here's how I'd frame that:

        ### Identified SQL as a gap and closed it through deliberate practice

        **S:** Preparing for Product Manager interviews. Had conceptual
        understanding of databases but couldn't write queries beyond basic
        SELECT statements -- a critical gap for data-driven PM roles.
        **T:** Documentation and passive learning weren't sticking.
        Window functions and JOINs required a different approach -- the
        syntax was secondary to understanding how data flows through
        these operations.
        **A:** Switched from reading docs to hands-on exercises with
        real datasets (Mode Analytics). Tried 3 different resources for
        window functions until finding one that clicked. Practiced daily
        for 3 weeks, building complexity gradually.
        **R:** Can now write complex queries from scratch. Used SQL to
        pull data for a university project -- professor noted the analysis
        was more detailed than most students with years of SQL experience.
        Passed the Level 2 SQL gate on the first attempt.

        **Best for question type:** Technical Problem Solving (also: Initiative / Self-Direction)

        How's that? Want to change anything?"

User:  "That's good. Save it."

Agent: "Saved. That's your 3rd polished win. Quick note: you don't have
        a failure/learning story yet -- most interviews ask this. Want to
        think of one next time?"
```

## Example: mock capture

```
[During mock interview, user gives a strong answer about building RetainIt]

Agent: "That answer about running 7 user interviews before writing code
        for RetainIt was really strong -- it shows product thinking, not just
        engineering. Want me to save it as a polished win?"

User:  "Yeah, that felt like a good answer."

Agent: "Quick -- what was the concrete outcome of the user research?
        Did it change what you built?"

User:  "Totally. I discovered the 'Google Effect' -- people don't retain
        info they know they can look up. That insight shaped the entire
        app's spaced repetition approach. Without those interviews I
        would've just built a flashcard app."

Agent: "Here's the draft:

        ### Ran user interviews before writing code to avoid building the wrong thing

        **S:** Building RetainIt, an AI-powered knowledge retention app.
        Had a working concept for a flashcard-style app but no validation
        that the core assumption -- people want to memorize facts -- was
        correct.
        **T:** Most developers skip user research and jump to building.
        Needed to validate the core value proposition before investing
        months of development, but had no UX research background.
        **A:** Conducted 7 structured user interviews before writing a
        line of code. Discovered the 'Google Effect' -- people don't
        retain information they know they can look up. This insight
        reframed the product from 'memorize facts' to 'build lasting
        knowledge through spaced repetition.'
        **R:** The app's entire architecture was shaped by this research.
        RetainIt uses FSRS-based spaced repetition instead of simple
        flashcards -- a fundamentally different product than what would
        have been built without the interviews. Live at retainit.app.

        **Best for question type:** Creativity / Innovation (also: Initiative / Self-Direction)

        Save it?"
```

## Example: gap detection

```
Agent: "You've got 5 polished wins now -- nice set. Here's your coverage:

        Leadership / Initiative -- 1 story
        Technical Problem Solving -- 2 stories
        Creativity / Innovation -- 1 story
        Initiative / Self-Direction -- 1 story (backup)
        Failure / Learning -- no story yet
        Collaboration / Conflict -- no story yet

        Most interviews ask about failure and what you learned from it.
        Can you think of a time something went wrong -- a project that
        didn't work out, a bad decision, a deadline you missed? The key
        is showing what you learned, not the failure itself."
```
