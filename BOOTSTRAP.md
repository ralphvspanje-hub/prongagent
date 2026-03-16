# Bootstrap — First Run

This file exists because ProngAgent was just installed. Follow these steps, then delete this file.

## Steps

1. **Verify workspace:** Check that these files exist:
   - `memory/user-profile.md`
   - `memory/current-plan.md`
   - `memory/progress.md`
   - `config/settings.md`
   - `resources/curated-resources.md`
   If any are missing, warn the user: "Some ProngAgent files are missing. Try re-cloning the repo."

2. **Check if already onboarded:** Read `memory/user-profile.md`. If the Name field is populated, the user already completed onboarding — skip to step 4.

3. **Run onboarding:** Invoke the `onboarding` skill. This will introduce you, collect the user's dream career and preferences, and generate their first learning plan.

4. **Set up scheduling (if a messaging channel is configured):** Suggest the user set up cron jobs for daily messages and check-ins:
   ```
   To get daily messages and evening check-ins automatically, run these commands
   (adjust times and timezone to your preference):

   openclaw cron add --name "Daily Plan" --cron "0 8 * * 1-5" \
     --tz "America/New_York" --message "Run the daily-plan skill in daily_message mode."

   openclaw cron add --name "Check-in" --cron "0 20 * * 1-5" \
     --tz "America/New_York" --message "Run the check-in skill."
   ```
   The user can also invoke skills manually anytime ("what's my plan today?", "let's check in").

5. **Delete this file:** Once onboarding is complete and scheduling is set up (or skipped), delete `BOOTSTRAP.md`. It should only run once.
