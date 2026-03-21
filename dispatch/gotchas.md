# Gotchas

Known failure patterns. Read this before every scan. Add new gotchas as you discover them.

---

## Search quality

- **LinkedIn results include sponsored/promoted roles.** Verify the company actually has the role on their careers page before adding to the tracker.
- **Broad role titles (e.g., "Data Analyst", "Business Analyst") return noisy results.** Always read the full JD. If it's internal reporting with no connection to your dream career path, skip it.
- **Graduate programs are mixed bags.** Only flag if (a) the company name justifies it AND (b) the program includes exposure to your target function.

## Tracker hygiene

- **Don't re-add roles already in the tracker.** Always read the full tracker before writing. Match on company + role title.
- **Don't duplicate entries that moved to Expired/Closed.** Check that section too.
- **Verify existing entries are still open.** Check 2-3 posting links per run. If closed, move to Expired/Closed with the date.
- **Preserve ProngAgent fields.** If a tracker entry has `Status`, `Applied`, `Next step`, or `Notes` filled in by ProngAgent, do NOT overwrite those. Only update dispatch-owned fields.

## Career page scanning

- **Some company career pages use JS rendering or iframes.** If a page returns nothing, note it in `dispatch/observations.md` rather than assuming no jobs exist.
- **Career page URLs change.** If a URL 404s, search for the new one and update `dispatch/company-tiers.md`.
- **Some companies use Greenhouse, Lever, or Workday.** The direct career page may redirect. Follow the redirect. If blocked, try the ATS URL directly (e.g., `boards.greenhouse.io/[company]`).

## Fit scoring

- **Roles requiring 2-3 years experience are NOT automatic skips.** Many entry-level candidates apply for these. If the role genuinely fits your profile and you have a credible case, include it. Only skip 5+ year requirements unless at a Tier 1 company.
- **Don't inflate fit scores.** Better to surface fewer high-quality matches than pad the list with weak ones. Minimum threshold is 7/10 unless the company is Tier 1.

## Output

- **"Better nothing new than poor fits."** If a run finds nothing new, say so in the daily brief. Don't pad with weak matches to fill space.
- **Always include the last_run timestamp** in daily-brief.md so staleness is detectable.
