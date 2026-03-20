# Crash Course Task Types

Interview prep daily tasks are different from regular learning tasks. Each day should include a mix:

## Technical practice

- LeetCode/HackerRank problems matched to job requirements + current pillar level
- SQL exercises if the role requires data skills
- System design exercises if the role is senior or technical
- Match difficulty to timeline: if 2 weeks out, focus on medium problems in the most likely topics. Don't grind hards unless the user is already strong.

Resource format: `Practice: [problem type] on [platform] [link] ~[time]`

## System design

- Design exercises relevant to the company's domain
- If preparing for Stripe: design a payment system
- If preparing for Spotify: design a music recommendation system
- If preparing for a startup: design a feature from their product
- Scale complexity to the role level — associate PM gets simpler systems than senior engineer

Resource format: `Practice: System design — [topic] ~[time]`

## Behavioral prep

- Review and practice STAR stories from win log
- Draft new stories for gap question types in `interview-mapping.md`
- Practice delivery: tell each story in under 2 minutes
- Common behavioral questions for the role type (leadership, failure, collaboration, conflict, initiative)
- Self-guided tasks — no external resource needed, just structured practice

Resource format: `Practice: Behavioral — draft STAR story for [question type] ~[time]` (URL: N/A)

## Company research

- Read the company blog, engineering blog, product updates
- Understand their tech stack and technical challenges
- Recent news, funding rounds, product launches
- Culture and values (from careers page, Glassdoor, LinkedIn)
- Prepare 2-3 thoughtful questions to ask the interviewer

Resource format: `Research: [company] — [specific topic] ~[time]` (URL: company blog/careers page if known, or `Search: "[company] engineering blog" on Google`)

## Mock interviews

- Schedule mock interview sessions — trigger the mock-interview skill
- At least 2 mocks before the real interview
- Mix of formats matching the expected interview format
- Space them out: first mock early in prep (to identify weak areas), second mock 2-3 days before (to build confidence)
- If time allows, 3+ mocks with different formats (behavioral, technical, system design)

Resource format: `Practice: Mock interview — [format] (with learning companion) ~[time]`

## Take-home prep

- If the interview format includes a take-home assignment, allocate dedicated time
- Practice projects in the company's tech stack
- Focus on: clean code, clear documentation, good testing, reasonable scope management
- If the company's stack is known, practice with that stack specifically

Resource format: `Build: Take-home practice — [stack/topic] ~[time]`

---

## Countdown + progress tracking

### Daily message integration

When plan type is `interview_prep`, the daily-plan skill's daily_message mode adjusts:

- **Countdown:** "Interview in [X] days. Today's focus: [area]"
- **Prep area progress:** reference which prep areas are on track vs. need attention
- **Urgency calibration:**
  - 14+ days: normal pacing, "plenty of time"
  - 7-13 days: focused, "this week is key"
  - 3-6 days: urgent, "final push — focus on the highest-impact items"
  - 1-2 days: wind-down, "trust your prep. Light review only."

### Weekly review integration

When plan type is `interview_prep`, the weekly-review skill shifts:

- Countdown instead of week number: "9 days until your [company] interview"
- Readiness assessment instead of general progress: "Behavioral is solid. Product sense needs work — especially metrics questions."
- Look-ahead is interview-focused: "Next week: 2 mock interviews + gap-filling on system design."
- Prep checklist status from `interview-context.md`

### Prep area tracking

Track in `memory/interview-context.md` under Prep Checklist. Update status after each check-in:

- Win log: [X/5 minimum wins, gap categories]
- Mock interviews: [completed/target]
- Technical: [topics covered, confidence level]
- Behavioral: [STAR stories prepared, delivery practiced]
- Company research: [done/not done]
- SRS review: [relevant concepts reviewed]

### Early completion

If the user completes all prep areas with 3+ days to spare:

> "You're as ready as you can be. Trust your prep. Light review tomorrow — go over your STAR stories once, skim your company research notes, and get a good night's sleep. You've got this."

Switch to maintenance mode: 1 light task per day (review only), no new material.
