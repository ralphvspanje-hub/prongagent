# ProngAgent — Implementation Progress

**Product spec:** `AGENT_LEARNING_COMPANION.md`
**Implementation guide:** `IMPLEMENTATION_GUIDE.md`

---

## Phase 0: Foundation & Validation (Week 1-2)

- [x] **Step 0.1:** Create repo structure (skills/, memory/, resources/, config/)
- [x] **Step 0.2:** Write memory templates (user-profile, current-plan, progress, plan-tasks, etc.)
- [x] **Step 0.3:** Write first skill files (onboarding, daily-plan)
- [x] **Step 0.4:** Port curated resources from ProngGSD (55+ entries)
- [x] **Step 0.5:** Test with Claude Code (validate onboarding + plan generation logic)
- [x] **Step 0.6:** Convert to OpenClaw-native format — skills converted to directory-per-skill with YAML frontmatter, workspace files created (AGENTS.md, SOUL.md, USER.md, IDENTITY.md, MEMORY.md, HEARTBEAT.md, BOOTSTRAP.md, TOOLS.md), README.md written, Discord integration uses OpenClaw built-in (no bridge bot)

**Exit gate:** Receive personalized daily tasks via Discord from onboarding conversation.

---

## Phase 1: The Daily Loop + Learning Feedback (Week 3-5)

- [x] **Step 1.1:** Write core skill files (check-in, adaptation)
- [x] **Step 1.2:** Write learning feedback skills (teach-back, resource-feedback)
- [ ] **Step 1.3:** Port curated resources fully (all 55+ with URLs, pillar, level)
- [ ] **Step 1.4:** Dogfood for 1 full week — adjust based on real usage

**Exit gate:** 7 consecutive days used. Agent adapted once. Teach-back happened. Resource feedback influenced a recommendation.

---

## Phase 2: Context + Spaced Repetition + Weekly Digest (Week 6-8)

- [x] **Step 2.1:** Write spaced repetition skill (spaced-repetition)
- [x] **Step 2.2:** Write weekly review skill (weekly-review)
- [ ] **Step 2.3:** Context awareness (calendar, activity — depends on OpenClaw capabilities)
- [ ] **Step 2.4:** Settings system (config/settings.md respected by all skills)

**Exit gate:** 2+ weeks used. SRS tracking 5+ concepts. Two weekly digests generated.

---

## Phase 3: Interview Prep + Win Log + Portfolio (Week 9-12)

- [x] **Step 3.1:** Write interview prep skills (interview-prep, mock-interview) — ported from ProngGSD
- [x] **Step 3.2:** Write win log skill (win-log) — passive capture, extraction, mock capture
- [x] **Step 3.3:** Write portfolio projects skill (portfolio-projects)
- [x] **Step 3.4:** End-to-end interview scenario test

**Exit gate:** Full interview flow works. Mock interview with win log coaching. 3+ wins mapped to question types.

---

## Phase 4: Web Dashboard (Week 13-16)

- [ ] **Step 4.1:** Decide if needed (after 12 weeks Discord-only)
- [ ] **Step 4.2:** Minimal Vite app (if yes)
- [ ] **Step 4.3:** Build pages in priority order (mock interview UI, win log, progress, plan, history)

**Exit gate:** Dashboard adds value Discord can't. Or: decision to skip.

---

## Phase 5: Polish & Open Source (Week 17-19)

- [x] **Step 5.1:** First-run experience (BOOTSTRAP.md triggers onboarding on first interaction)
- [x] **Step 5.2:** README.md (step-by-step install guide)
- [ ] **Step 5.3:** Test with friend (installs from README alone)
- [ ] **Step 5.4:** Ship (GitHub, MIT license, v0.1.0)

**Exit gate:** Someone else installs and uses it for 3+ days without help.
