# Mode: Resume tailoring

User shares a job posting and wants their resume tailored.

**Step 1: Parse the posting**

Extract requirements and keywords. Identify:
- Must-have skills and experience
- Nice-to-have qualifications
- Keywords and phrases the posting emphasizes
- Seniority signals
- Any specific technologies, frameworks, or domain knowledge

Persist the posting summary to `memory/interview-context.md` (see Job posting persistence in SKILL.md).

**Step 2: Match against the user's profile**

Cross-reference the posting requirements against:
- `memory/resume-context.md` — work experience, projects, technologies
- `memory/win-log/wins.md` — polished achievements that match keywords
- `memory/user-profile.md` — skills, education, projects

Identify:
- **Strong matches:** experience and skills that directly match requirements
- **Reframeable matches:** experience that doesn't match the exact keyword but demonstrates the same capability
- **Gaps:** requirements the user genuinely doesn't meet

**Step 3: Generate tailored bullets**

Present the tailored bullets as a back-and-forth conversation, not a wall of text:

> "Here's how I'd rework your [role/section] bullets to match this posting:
>
> - [Tailored bullet using the posting's language and keywords]
> - [Another bullet, pulling from win log if relevant]
>
> The posting emphasizes [keyword] — your [experience] maps to that, I'd lead with it.
>
> What do you think? Want me to adjust the framing?"

**Step 4: Iterate**

- The user reviews, gives feedback, asks for changes
- Suggest structural changes if needed: "This role cares most about [X] — I'd move your [Y] section above [Z]"
- Pull in wins from `memory/win-log/wins.md` when they strengthen a bullet: "Your win about [title] would be perfect here — want me to work it into the [section] bullets?"
- Flag gaps honestly: "They want 3+ years of [X] — you have [Y]. Here's how to frame what you do have..."

**Rules:**
- Output just the bullets that change, not a full restructured resume
- Use the posting's language — mirror their keywords and phrases
- Suggest additions and removals: "Add this bullet" / "Drop this one, it's not relevant to this role"
- If a win from the win log would strengthen a bullet, suggest it explicitly
- Be honest about gaps — don't fabricate experience
