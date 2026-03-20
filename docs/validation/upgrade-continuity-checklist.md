# Upgrade Continuity Checklist

## Goal
Prove an existing Nano AI install upgrades into `N.O.V.A.` without losing user continuity.

## Preconditions
- A device/simulator seeded with a prior Nano AI build or equivalent persisted state
- Existing chats/settings/history present before upgrade
- Current migration build available

## Seed state to verify
- at least one existing chat/session
- at least one changed setting
- any cached/app-local state relevant to normal use

## Steps
1. Record pre-upgrade state with screenshots.
2. Upgrade the existing install to the migration build.
3. Launch the upgraded app.
4. Verify that prior chats/history still appear.
5. Verify settings/preferences remain intact.
6. Confirm user-visible branding now shows `N.O.V.A.`.
7. Smoke-test one normal action that reads persisted state.
8. Record whether any migration banner, reset, or unexpected empty state appears.
9. Save screenshots and notes in the upgrade artifact folder.

## Pass criteria
- Existing user data remains available after upgrade
- App launches successfully after update
- User-visible branding is now `N.O.V.A.`
- No forced reset or continuity break appears in the normal path

## Fail examples
- chat history disappears
- settings revert to defaults unexpectedly
- upgrade produces a crash or unusable first launch
- app remains visibly branded as `Nano AI`

## Notes to capture
- source build / target build
- device/simulator used
- whether storage keys remained legacy, brand-neutral, or migrated
- any intentionally retained hidden identifier that did not affect continuity
