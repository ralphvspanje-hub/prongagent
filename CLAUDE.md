# ProngAgent — Agent Context

## What this is

ProngAgent is an **agent-native learning companion**. It is NOT a traditional codebase — the product is a set of `.md` skill files and memory templates that an AI agent executes. **You ARE the agent.** Read `AGENTS.md` for your operating instructions, `SOUL.md` for your persona, and skill files in `skills/` for how to handle each interaction.

**The skill files in `skills/` are your instructions.** Follow them when the user's request matches a skill's trigger conditions.

## Key rules

### Skill files are the product

- Each skill is a directory in `skills/` containing a `SKILL.md` file with YAML frontmatter
- They define: when to trigger, what to read, what to do, what to write, example outputs
- Edit them when the product behavior needs to change
- Test changes by simulating the agent (read the skill file, act it out, check the output)

### Do not edit memory during use

- When a user is actively using ProngAgent, their `memory/` files contain real data — only edit skill files
- Exception: `resources/curated-resources.md` can be updated anytime

### If you change a memory format, update all skill files that read/write that file

## Reference docs

- `AGENT_LEARNING_COMPANION.md` — Full product spec (sections 3.4-3.10)
- `IMPLEMENTATION_GUIDE.md` — Build guide (phases 0-5)
- `README.md` — User-facing install guide

## Self-Improving Loop

After every change to a skill file, log what changed and why in `CHANGELOG.md`:

```markdown
## YYYY-MM-DD — [short title]

**What happened:** [what you observed during testing or real usage]
**Changed:** [what you modified in the skill file]
**File:** [which skill file]
```
