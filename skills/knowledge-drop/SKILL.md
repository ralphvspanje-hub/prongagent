---
name: prongagent-knowledge-drop
description: "Save interesting facts, insights, and learnings from Telegram with 'save' trigger"
tags: [knowledge, learning, memory]
user-invocable: true
metadata:
  openclaw:
    emoji: "💡"

---

# Knowledge Drop Skill

## When to trigger

User starts a message with "save", "save:", or "save this". The rest of the message (or the previous message they're replying to) is the content to save.

Examples:
- "save: window functions are just GROUP BY without collapsing rows"
- "save this — saying 'what do you think?' instead of 'here's what I think' got way better responses in the meeting"
- "save" (as reply to a link or screenshot they just sent)

Do NOT trigger on messages that just contain the word "save" in normal conversation (e.g., "how do I save a file in vim?").

## What to read

| File | Why |
|------|-----|
| `memory/knowledge-drops.md` | Append new entry |
| `memory/concept-links.md` | Check if this connects to existing concepts |
| `memory/user-profile.md` | Dream career context — helps with tagging relevance |

## What to write

| File | When |
|------|------|
| `memory/knowledge-drops.md` | Every save — append a new entry |
| `memory/concept-links.md` | If the drop clearly connects to an existing concept |

## Behavior

1. **Parse the content.** Extract what the user is saving — could be a fact, insight, link, quote, personal observation, or lesson learned.

2. **Classify the type:**
   - `fact` — something objectively true ("PostgreSQL uses MVCC for concurrency")
   - `insight` — a personal realization ("asking 'what do you think?' gets better meeting responses than stating your opinion first")
   - `technique` — a method that worked ("using STAR format even in casual standups makes updates clearer")
   - `resource` — a link, article, video, book recommendation
   - `quote` — something someone said that stuck

3. **Tag it:**
   - **Topic** — what domain (SQL, product sense, communication, leadership, etc.)
   - **Relevance** — how it connects to dream career (if at all)
   - **Source** — where it came from (personal experience, article, conversation, course, etc.)

4. **Write the entry** to `memory/knowledge-drops.md` in the format below.

5. **Confirm** with a short message: "Saved — [one-line summary]". Keep it brief. Don't repeat the whole thing back.

6. **Optionally connect** — if this clearly relates to an existing concept in `memory/concept-links.md`, add the connection. Don't force it.

## Entry format

```markdown
### YYYY-MM-DD — [short title that captures the insight]

- **Type:** fact | insight | technique | resource | quote
- **Topic:** [domain tag]
- **Source:** [where this came from]
- **Content:** [the actual knowledge — 1-3 sentences max, in the user's own words when possible]
- **Review status:** new
```

## Edge cases

- **User sends a link with "save"** — fetch the link if possible, extract the key takeaway, save both the link and the summary
- **User sends a screenshot with "save"** — read the image, extract the key content, save it
- **User sends "save" with no content** — ask "What do you want to save?"
- **Duplicate** — if a very similar entry already exists in knowledge-drops.md, mention it: "You saved something similar on [date] — want me to update that one or save this as a new entry?"
- **Long content** — if the user dumps a whole article or long text, distill it to the core insight (1-3 sentences). Save the source link/reference for the full version.

## Self-observation triggers

Write an entry to `memory/agent-observations.md` if:
- The user saves something that doesn't fit any type category cleanly
- The user corrects how you categorized or summarized a drop
- A pattern emerges (user keeps saving the same topic — might indicate a learning interest not captured in their plan)
