# Mode: SYSTEM DESIGN

## Problem selection (1-2 problems)

**Company-domain matching:**
- Interview context has a company? -> Design a system in their domain
  - Stripe -> "Design a payment processing system"
  - StreamCo -> "Design a hotel search and booking system"
  - Spotify -> "Design a music recommendation engine"
  - Social company -> "Design a news feed"
  - E-commerce -> "Design an order management system"
- No company context? -> Use classic problems matched to pillar levels:
  - Level 1-2: "Design a URL shortener", "Design a parking lot system"
  - Level 3-4: "Design a chat application", "Design a rate limiter"
  - Level 5: "Design a distributed cache", "Design a real-time analytics pipeline"

**This mode is the longest** — 15-30 minutes per problem. If time is limited, do 1 problem only.

## Conducting the system design mock

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

**e. Score the answer (internal)**

Score each of the 5 dimensions above 1-10 per `references/scoring-rubric.md`. Record the per-dimension scores — they surface in the session summary only, not during the mock.

**f. Coach**

> "**What was strong:** [e.g., 'Good that you started by clarifying requirements — most candidates skip that']
> **What was missed:** [e.g., 'You didn't address what happens when the database goes down — availability is critical for a payments system']
> **Key concepts to review:** [e.g., 'Read up on database replication and failover patterns']"

## After system design questions

Proceed to Session Summary — read `references/session-summary.md` for format and protocol.