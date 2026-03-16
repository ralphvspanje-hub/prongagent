---
name: prongagent-mock-interview
description: "Mock interview conductor with behavioral, technical, and system design modes"
tags: [learning, interview, practice]
user-invocable: true
metadata:
  openclaw:
    emoji: "🎭"
---

# Mock Interview Skill

## When to trigger

Three activation paths:

**1. SCHEDULED** — interview-prep skill includes mock interview sessions as crash course tasks. User opens the task (e.g., "Practice: Mock interview — behavioral (with learning companion) ~30min").

**2. MANUAL** — user says "let's do a mock interview", "practice interview", "mock me", "can we do a practice round", or similar.

**3. RECOMMENDED** — agent detects interview date in `memory/interview-context.md` is 5 or fewer days away AND `Prep Checklist → Mock interviews completed` is 0. Surface the suggestion:

> "Your interview is in [X] days and you haven't done a mock yet. Want to run one now? Even a quick behavioral round helps."

Do NOT push if the user declines. Note the decline and don't re-suggest for 2 days.

## What to read

Read ALL of the following before starting any mock:

| File | What to look for |
|------|-----------------|
| `memory/interview-context.md` | Target company, role, interview format, key requirements, industry/domain, days remaining, prep checklist (mocks completed, readiness) |
| `memory/win-log/wins.md` | Polished STAR stories — count, topics, content. Use these to coach during behavioral rounds ("your API redesign story is a better fit for this question"). |
| `memory/win-log/interview-mapping.md` | Wins by question type — detect gaps (question types with no mapped win). Target gaps in behavioral question selection. |
| `memory/mistake-journal.md` | Previous mock mistakes and patterns — don't repeat the same questions that exposed weaknesses without first checking if the user has practiced. Surface recurring patterns in feedback. |
| `memory/user-profile.md` | Dream career, target role, current skills, experience level — calibrate question difficulty and relevance |
| `memory/resume-context.md` | Work experience, projects, technologies — source material for behavioral questions based on real background. Ask about specific roles/projects. |
| `memory/current-plan.md` | Pillar levels — calibrate technical question difficulty. Plan type (should be `interview_prep` if interview is active). |
| `memory/progress.md` | Teach-back log — which concepts are solid vs weak. Weak concepts are fair game for technical questions. |
| `memory/spaced-repetition.md` | Active concepts — may inform technical question topics (concepts the user is still reviewing = likely weak spots) |
| `config/settings.md` | Verbosity preference — adjust feedback depth |

## What to write

| File | When |
|------|------|
| `memory/mistake-journal.md` | After EVERY mock — append mistakes, patterns, coaching notes |
| `memory/win-log/candidates.md` | When user gives a strong answer with a real achievement not already in `wins.md` — flag for mock capture (win-log skill) |
| `memory/interview-context.md` | Update prep checklist: increment mocks completed count, update readiness assessment |
| `memory/progress.md` | Optionally note mock performance in general sense (e.g., "Mock #2: behavioral — Almost there") |

## Downstream triggers

| Skill | Trigger condition |
|-------|------------------|
| `skills/win-log/SKILL.md` (mock capture mode) | Strong answer contains a real achievement not in `wins.md` |
| `skills/adaptation/SKILL.md` | Mock reveals a weak technical area — flag so adaptation adds targeted practice to next week |

---

## Setup — before the mock starts

### Step 1: Read context

Read all files from the "What to read" table. Note:
- Company, role, and interview format from `interview-context.md`
- Available STAR stories from `wins.md` and their question type mappings
- Previous mistakes and patterns from `mistake-journal.md`
- Pillar levels for difficulty calibration
- Weak concepts from teach-back log and SRS

### Step 2: Ask the user what mode

> "What type of mock do you want? Behavioral, technical, or system design? Or want me to pick based on what you need most?"

**If user picks a mode:** Use that mode.

**If user says "you pick" / "whatever you think" / "surprise me":**

Analyze the data to pick the mode that addresses the biggest gap:

1. Check `interview-mapping.md` — if 2+ question types have no mapped wins, pick **behavioral** (need more story practice)
2. Check `mistake-journal.md` — if recurring patterns exist in a specific mode, pick **that mode** (need to break the pattern)
3. Check pillar levels vs job requirements — if technical gaps are severe, pick **technical**
4. Check interview format from `interview-context.md` — if system design round is expected and user hasn't practiced, pick **system design**
5. Default tiebreaker: behavioral (most approachable, most commonly asked)

Tell the user what you picked and why:

> "I'm going with [mode] because [brief reason — e.g., 'you don't have a failure story yet and most interviews ask for one' or 'your SQL is Level 2 but the job needs Level 3+']."

### Step 3: First mock ever — adjust approach

Check `mistake-journal.md` and `interview-context.md → mocks completed`. If this is the first mock ever:

- Default to **behavioral** if the user says "you pick" (most approachable)
- Use common, well-known questions (not curveballs)
- Be extra encouraging in feedback — the goal is building confidence, not crushing it
- Save tough system design for mock 2+

### Step 4: Time constraint check

If the user mentions limited time ("I only have 10 minutes", "quick one"):

Offer a **lightning round**:

> "Let's do a lightning round — 2 behavioral questions, focused feedback on one thing to improve. ~10 minutes."

Lightning round rules:
- 2 questions only (behavioral by default, or 1 technical if user prefers)
- Feedback is focused on ONE actionable improvement, not comprehensive
- Still write to mistake-journal (abbreviated)
- Still counts toward mocks completed

---

## Mode: BEHAVIORAL

### Question selection (3-5 questions)

**Sources for questions (in priority order):**

1. **Gap-filling:** Check `interview-mapping.md` — if question types have no mapped wins, ask questions in those categories. The user needs practice finding stories for these.
2. **Company-specific:** If company culture is known from `interview-context.md`, craft questions that test those values (e.g., if the company values "ownership", ask a leadership/initiative question).
3. **Role-specific:** Common behavioral questions for the target role type:
   - PM roles: product decisions, stakeholder management, prioritization, data-driven decisions
   - Engineering roles: technical leadership, debugging under pressure, code quality tradeoffs
   - Analyst roles: ambiguity, communicating findings, influencing without authority
4. **Resume-based:** Reference specific roles/projects from `resume-context.md` to ask targeted questions: "Tell me about your time at [company] — describe a challenge you faced there."
5. **Weakness-targeting:** Check `mistake-journal.md` — if the user has a recurring weakness (e.g., vague results, no metrics), ask questions that force them to practice the weak area.

**Question calibration:**
- First mock: use standard, well-known questions ("Tell me about a time you failed", "Describe a conflict with a teammate")
- Subsequent mocks: mix standard with company-specific and curveball questions
- Never ask the exact same question from a previous mock — check `mistake-journal.md` for previous questions

### Conducting the behavioral mock

For each question:

**a. Ask the question**

Present one question at a time. Frame it naturally:

> "Let's start. Imagine I'm the hiring manager at [company]. Here's my first question:
>
> 'Tell me about a time you had to make a decision with incomplete information. What did you do?'"

**b. Let the user answer fully**

Do NOT interrupt. Let them finish their complete answer. If they ask "should I keep going?" — say "keep going, I'll give feedback after."

**c. Evaluate the answer**

Score on five dimensions:

| Dimension | What to look for |
|-----------|-----------------|
| STAR structure | Did they set up the situation, explain the task/constraint, describe their specific action, and give a result? |
| Specificity | Concrete details, names, numbers, timelines — not vague generalizations |
| Relevance | Does the story actually answer the question asked? |
| Conciseness | Told in ~2 minutes? Situation section wasn't 90 seconds with 10 seconds on result? |
| Impact of result | Did the result include outcomes — metrics, feedback, changes, things that happened because of their action? |

**d. Give immediate feedback**

Brief, specific, actionable. Format:

> "**What worked:** [1 specific strength — e.g., 'Great structure — clear situation, strong action section']
> **What to improve:** [1 specific fix — e.g., 'Your result was vague — add the number. You said it improved performance, but by how much?']"

**Win-log aware coaching:** Check `wins.md` and `interview-mapping.md`. If a better story exists for this question type:

> "That was decent, but your [win title] story is a stronger fit for this question — it shows [specific quality the question tests]. Want to try it with that story instead?"

**e. Win-log capture**

If the user gives a strong answer that contains a real achievement NOT already in `wins.md`:
- Note it silently in `memory/win-log/candidates.md` with Status = `draft` and source = `mock-capture`
- After the mock session (not during), flag it: "That answer about [topic] was strong — want me to save it as a polished win?"
- The win-log skill (mock capture mode) handles the actual polishing

**f. Struggle detection**

If the user struggles with a question type (can't think of a story, gives a very weak answer):
- Note it — don't dwell on it during the mock
- In the session summary, suggest practicing with a specific win from the mapping: "For [question type] questions, your [win title] story works. Practice telling it."
- If no mapped win exists for that type: "You need a [question type] story. Want to work on one after the mock?"

### After all behavioral questions

Proceed to Session Summary (see Section 5 below).

---

## Mode: TECHNICAL

### Question selection (2-3 questions)

**Calibrate difficulty to pillar levels:**

| Pillar level | Difficulty | Question type |
|-------------|-----------|---------------|
| Level 1-2 | Easy/medium | Fundamentals, straightforward coding, basic conceptual |
| Level 3-4 | Medium/hard | Applied problems, debugging scenarios, design tradeoffs |
| Level 5 | Hard + system-level | Complex problems, optimization, architecture decisions |

**Question types to mix:**

1. **Coding problems** — appropriate difficulty for the target role. For PM/analyst roles: SQL queries, data manipulation. For engineering roles: algorithm/data structure problems.
2. **Conceptual questions** — drawn from `spaced-repetition.md` active concepts and weak teach-back topics from `progress.md`. Test understanding, not just recall.
3. **Debugging scenarios** — "Here's a piece of code/query with a bug. Find and fix it."
4. **Code review** — "Here's a solution. What's wrong with it? How would you improve it?"

**Match to job requirements:** Read `interview-context.md → Key requirements`. If the job requires SQL, ask SQL questions. If it requires system design thinking, lean toward architecture questions. Don't ask algorithm questions for a PM role that will never test algorithms.

### Conducting the technical mock

For each question:

**a. Present the problem clearly**

State the problem, inputs, expected outputs, and any constraints. For SQL: provide the table schema. For coding: provide the function signature or input format.

> "Here's a technical question. Take your time — think out loud as you work through it.
>
> [Problem statement]"

**b. Let the user think and answer**

Encourage thinking aloud: "Walk me through your thinking." Don't rush them. If they go silent for a while: "What are you considering?" (gentle nudge, not pressure).

**c. Evaluate the answer**

| Dimension | What to look for |
|-----------|-----------------|
| Correctness | Is the solution right? Does it handle the stated requirements? |
| Approach/reasoning | Did they choose a reasonable approach? Can they explain WHY? |
| Communication | Did they explain their thinking? Could an interviewer follow their process? |
| Edge case awareness | Did they consider edge cases, null inputs, empty sets, overflow? |

**d. Coach**

> "**What was right:** [specific — e.g., 'Good approach using a hash map — that's the optimal solution']
> **What was missed:** [specific — e.g., 'You didn't handle the empty array case — interviewers watch for that']
> **Optimal approach:** [if different from what they did — walk through it briefly]"

**e. Can't solve it — walk through**

If the user is stuck and can't make progress:

1. Give a hint first: "Think about what data structure would let you look up values in O(1)..."
2. If still stuck after the hint: walk through the solution step by step
3. Note that hints were needed — scored lower but still valuable practice
4. Add the concept to `spaced-repetition.md` for review if it's not already there

**f. Flag weak areas**

If a technical question reveals a significant gap (user doesn't know a concept the job requires):
- Note it for the session summary
- Flag for adaptation: the adaptation skill should add targeted practice for this concept to the next week's plan

### After all technical questions

Proceed to Session Summary (see Section 5 below).

---

## Mode: SYSTEM DESIGN

### Problem selection (1-2 problems)

**Company-domain matching:**
- Interview context has a company? → Design a system in their domain
  - Stripe → "Design a payment processing system"
  - StreamCo → "Design a hotel search and booking system"
  - Spotify → "Design a music recommendation engine"
  - Social company → "Design a news feed"
  - E-commerce → "Design an order management system"
- No company context? → Use classic problems matched to pillar levels:
  - Level 1-2: "Design a URL shortener", "Design a parking lot system"
  - Level 3-4: "Design a chat application", "Design a rate limiter"
  - Level 5: "Design a distributed cache", "Design a real-time analytics pipeline"

**This mode is the longest** — 15-30 minutes per problem. If time is limited, do 1 problem only.

### Conducting the system design mock

For each problem:

**a. Present the problem and scope**

> "Let's do a system design question. I want you to drive the conversation — ask me clarifying questions, then walk me through your design.
>
> 'Design [system]. You have 30 minutes.'"

**b. Let the user drive**

Do NOT lead them. This tests whether they can structure their own approach. If they jump straight into components without clarifying requirements: note it as a weakness, but don't stop them.

**c. Ask probing follow-ups**

After they present their initial design, push deeper:

- **Failure handling:** "What happens when [component] goes down?"
- **Scale:** "How would you scale this to 10x users?"
- **Tradeoffs:** "You chose [X] over [Y] — what are the tradeoffs?"
- **Data model:** "Walk me through the data model. What are the key entities and relationships?"
- **Bottlenecks:** "Where's the bottleneck in this design? How would you address it?"

Ask 2-4 follow-ups per problem. Don't ask all of them — pick the ones most relevant to what the user presented.

**d. Evaluate**

| Dimension | What to look for |
|-----------|-----------------|
| Requirements clarification | Did they ask clarifying questions before designing? Did they define scope? |
| Component design | Are the components reasonable? Do they fit together? |
| Data model | Did they think about the data — entities, relationships, storage? |
| Scalability | Did they consider scale — load balancing, caching, partitioning? |
| Tradeoff awareness | Did they acknowledge tradeoffs in their choices? |

**e. Coach**

> "**What was strong:** [e.g., 'Good that you started by clarifying requirements — most candidates skip that']
> **What was missed:** [e.g., 'You didn't address what happens when the database goes down — availability is critical for a payments system']
> **Key concepts to review:** [e.g., 'Read up on database replication and failover patterns']"

### After system design questions

Proceed to Session Summary (see Section 5 below).

---

## 5. Session Summary — after EVERY mock (regardless of mode)

### A. Immediate feedback (already given per question — see above)

Brief, per-question feedback was delivered during the mock. The session summary is the holistic view.

### B. Session summary

After the last question, give a comprehensive wrap-up:

**Overall rating:**

| Rating | Criteria |
|--------|----------|
| **Ready** | Answers were consistently strong. Minor polish needed. Would pass this interview type. |
| **Almost there** | Solid foundation with 1-2 fixable weaknesses. Targeted practice will get them there. |
| **Needs work** | Significant gaps. Need more practice before the real interview. Not a judgment — a roadmap. |

**Format:**

> "**Overall: [Ready / Almost there / Needs work]** for [behavioral / technical / system design]
>
> **Top strength:** [the single best thing about their performance — be specific]
>
> **Top improvement area:** [the single most impactful thing to fix — be specific and actionable]
>
> **Action items:**
> 1. [Specific thing to practice — e.g., 'Practice telling the RetainIt story in under 2 minutes — you went over 3 today']
> 2. [Another specific action — e.g., 'Add metrics to your Result sections — 3 of 4 answers had vague outcomes']
> 3. [Optional third action]"

**Comparison to previous mocks:**

If `mistake-journal.md` has entries from previous mocks, compare:

> "Compared to your last mock: [specific improvement or persistent issue]"
>
> Examples:
> - "Your STAR structure is much tighter than last time — the Situation section was half the length."
> - "You're still rushing through the Result section. That's 3 mocks in a row now. Let's specifically practice leading with the outcome next time."

### C. Win-log capture prompt

If any answers during the mock contained strong, real achievements not in `wins.md`:

> "One more thing — that answer about [topic] was strong. Want me to save it as a polished interview story?"

If yes → trigger win-log skill (mock capture mode).

---

## 6. Mistake Journal — write after EVERY mock

Append to `memory/mistake-journal.md` after each mock session.

### Entry format

```markdown
## YYYY-MM-DD — Mock Interview ([behavioral / technical / system design])

**Mock #:** [sequence number — count from interview-context prep checklist]
**Overall rating:** [Ready / Almost there / Needs work]

### Mistake 1

- **Question:** [What was asked]
- **What you said:** [Summary of the user's response]
- **What would've been better:** [Specific coaching — not "be better" but "lead with the 40% latency improvement number"]
- **Category:** [structuring / specificity / technical accuracy / delivery / story selection / requirements clarification / edge cases / communication]
- **Pattern?:** [first time / recurring — if recurring, reference the date of the previous instance]

### Mistake 2

...

### Strengths noted

- [What went well — track improvements too, not just mistakes]
```

**What counts as a mistake (be specific):**

- "Result section had no metrics" (NOT "answer was weak")
- "Spent 90 seconds on Situation, 10 seconds on Result" (NOT "answer was too long")
- "Used the pipeline story for a collaboration question — the API redesign story fits better" (NOT "wrong story")
- "Didn't clarify requirements before starting the design" (NOT "bad approach")
- "Missed the edge case where the input array is empty" (NOT "incomplete solution")

### Pattern detection

After writing the entry, cross-reference with previous entries in `mistake-journal.md`:

1. **Category frequency:** Count how often each mistake category appears across all mocks. If any category has 3+ entries, it's a pattern.
2. **Specific recurring issues:** Look for the same specific mistake repeated (e.g., "vague results" appearing in mock 1, 2, and 3).
3. **Mode-specific patterns:** Are mistakes concentrated in one mode? (e.g., all mistakes are in behavioral = story telling needs work, not technical skills)

---

## 7. Cross-Mock Pattern Detection

After 2+ mocks, analyze `mistake-journal.md` for patterns. Surface them in the session summary.

### Common patterns to detect

| Pattern | Signal | Coaching |
|---------|--------|----------|
| Always rushing Situation | Multiple "spent too long on Situation" entries | "Open with one sentence of context, then get to the action. Practice: 'At [company], [one-line context]. The challenge was [constraint].'" |
| Never mentioning metrics in Results | Multiple "no metrics" or "vague result" entries | "End every story with a number. Even rough estimates: 'about 40% faster', 'used by 50+ people', 'saved ~2 hours/week'." |
| Going too deep on technical details in behavioral | Multiple "too technical for behavioral" entries | "Behavioral questions test judgment and communication, not technical depth. Explain WHAT you decided and WHY, not HOW it works under the hood." |
| Not clarifying requirements in system design | Multiple "jumped straight to design" entries | "First 5 minutes: ask clarifying questions. Users? Scale? Read/write ratio? Availability requirements? This is expected and shows maturity." |
| Using the same story for everything | Multiple "same story" or "story selection" entries | "You have [N] wins. Spread them across question types. For [type] questions, lead with [specific win]." |
| Not thinking aloud in technical | Multiple "silent while solving" entries | "Interviewers can't evaluate what they can't hear. Narrate your thinking: 'I'm considering X because Y, but Z might be better because...'" |

### Escalation: pattern persists after coaching

If the same pattern appears in 3+ mocks despite coaching (check that coaching was given in previous session summaries):

> "We've practiced [pattern] several times and it keeps coming up. Let's try a different approach: [specific targeted exercise]."

Targeted exercises by pattern:
- **Vague results:** "Before our next mock, go through your 3 best wins and add a concrete metric to each Result section. Even approximate numbers."
- **Long situations:** "Practice the 'one-sentence setup' drill: tell each of your STAR stories starting with exactly one sentence of situation."
- **No requirements clarification:** "For your next system design mock, I'm going to stop you if you start designing before asking at least 3 clarifying questions."
- **Same story for everything:** "Let's map your wins to question types right now so you have a cheat sheet."

Flag persistent patterns for adaptation — adaptation skill should add targeted practice to the daily plan.

---

## 8. Delivery Tracking (win-log integration)

When the user tells the same STAR story across multiple mocks:

### Compare delivery

Check `wins.md` and previous `mistake-journal.md` entries. If the same story was told before:

- **Is the Situation tighter?** (shorter, more focused)
- **Is the Result stronger?** (more specific, better metrics)
- **Are they incorporating previous feedback?** (check coaching from prior mocks)
- **Is the overall delivery more confident and concise?**

### Note improvements

> "You told the [win title] story in your last mock too — your delivery is way tighter this time. The Situation was half the length and you led with the impact."

Or if not improving:

> "You told the [win title] story again but the same issue came up — [specific issue]. Let's work on that one thing."

### Feed back to win-log

If the new delivery is significantly stronger, suggest updating the saved version:

> "Your latest telling of this story is stronger. Want me to update the saved version in your win log?"

---

## 9. Self-observation triggers

Write an entry to `memory/agent-observations.md` if any of the following occur:

**General (apply to all skills):**
- An edge case came up that isn't covered in the Edge cases section
- You had to make a judgment call not covered by any rule
- A rule produced a result that felt wrong for the specific user situation
- Two rules in the same or different skill files contradicted each other

**Mock-interview-specific:**
- Question difficulty was miscalibrated for the user's level — too easy (user answered instantly with no effort) or too hard (user couldn't engage at all) (log the question, user's pillar level, and what difficulty would have been appropriate)
- The coaching feedback contradicted what a previous mock suggested (log both pieces of advice and what changed)
- Mistake pattern detection flagged something that isn't actually a pattern — false positive from too few data points or coincidental repetition (log the "pattern" and why it's not real)

## 10. Edge cases

### User gets frustrated during mock

Pause immediately. Do NOT push through frustration.

> "Want to take a break, switch to a different question, or call it here? All good either way."

If they want to stop: end the mock gracefully, still write session summary and mistake-journal for questions completed. Frame positively: "We covered [N] questions — that's useful data. [One positive thing from the session]."

### User asks for hints during technical round

Give a nudge, not the answer:

> "Think about [relevant concept or approach]..."

Note the hint in your evaluation. Hint-assisted answers are scored lower but still valuable practice. In the mistake journal, note: "Required hint — [what hint was given]."

### No interview context (general practice)

User just wants general practice — no active interview in `interview-context.md`:

- Run a generic mock using common questions for their dream career role from `user-profile.md`
- Calibrate difficulty to pillar levels
- Still write to `mistake-journal.md` — patterns from general practice carry forward
- Skip company-specific questions and research-based questions
- Still use `wins.md` for coaching if populated

### User wants to redo a question

Allow it. This is great practice.

> "Sure — take another shot. I'll compare both attempts."

After the second attempt:
- Note what improved and what didn't
- In the mistake journal, log both attempts: "Attempt 1: [issue]. Attempt 2: [improvement or persistent issue]."
- Only the better attempt counts toward the overall session rating

### First mock ever

Go easier (already covered in Setup Step 3):
- Default to behavioral
- Use standard, well-known questions
- Be extra encouraging
- Save system design for mock 2+
- Feedback focuses on 1 thing to improve, not a list

### User has done 5+ mocks and still makes the same mistakes

Escalate — standard coaching isn't working:

> "We've practiced this pattern several times and it keeps coming up. Let's try a different approach: [specific exercise targeting the root cause]."

See the escalation section under Cross-Mock Pattern Detection above.

### Time constraint — lightning round

Already covered in Setup Step 4:
- 2 questions, ~10 minutes
- 1 actionable feedback point
- Abbreviated mistake-journal entry
- Counts toward mocks completed

### Post-interview debrief

User comes back after the REAL interview — not a mock:

> "How did it go? What questions did they ask? How did you feel about your answers?"

Capture everything:
- Questions they were asked → add to `mistake-journal.md` under a "## YYYY-MM-DD — Real Interview Debrief" section
- What felt good → reinforce in future mocks
- What felt shaky → target in next mock or future prep
- New information about the process → update `interview-context.md`
- Strong answers the user gave → consider for `win-log/candidates.md` if they describe real achievements

This is a learning opportunity, not a mock. Don't score it — just listen, capture, and adjust.

### User wants a specific question type

If the user requests a specific question (e.g., "ask me about failure", "give me a SQL question"):

- Honor the request — ask exactly that type
- Still conduct it as a proper mock (full evaluation, feedback, mistake-journal)
- Note in the session summary that the question was user-requested

### Mixed mode request

User says "can we do 2 behavioral and 1 technical?":

- Honor it — run a mixed mock
- Apply the relevant mode rules for each question type
- Session summary covers both modes
- Mistake journal entries note the mode per question

---

## Example: behavioral mock (with win-log coaching)

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

## Example: technical mock (with difficulty calibration)

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

## Example: session summary with cross-mock comparison

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
