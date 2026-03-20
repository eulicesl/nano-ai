# Fresh Install Validation Checklist

Use this after the brand-surface and any required config phases are stable.

## Goal
Prove a brand-new install experiences the product as `N.O.V.A.` from launch onward.

## Preconditions
- Clean simulator/device with no prior Nano AI install or app data
- Current migration branch/build available
- Validation artifact folder created for this run

## Steps
1. Install the current app build on a clean device/simulator.
2. Launch the app for the first time.
3. Capture the home screen icon label / installed app name if visible.
4. Capture the first launch screen and main landing screen.
5. Traverse first-run visible surfaces:
   - top-level title/header
   - settings/about/help if present
   - privacy/support links if reachable in-app
6. Note any user-visible `Nano AI` / `Nano` residue.
7. Save screenshots into `artifacts/identity-migration/phase-05-validation-cleanup/fresh-install/screenshots/`.
8. Record results in the run summary.

## Pass criteria
- Installed app presents `N.O.V.A.` as display name where expected
- First-run visible surfaces do not show `Nano AI` residue
- No broken launch, blank states, or obvious branding regressions

## Fail examples
- App icon label still shows `Nano AI`
- Landing screen or settings surface still says `Nano AI`
- User sees mixed `N.O.V.A.` and `Nano AI` branding in the first-run path

## Suggested artifacts
- `checklist.md` with date/device/build
- 2–5 screenshots
- short note for any intentionally retained legacy platform identifier not visible to users
