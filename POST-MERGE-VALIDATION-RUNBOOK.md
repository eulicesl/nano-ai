# N.O.V.A. Post-Merge Validation Runbook

**Project:** N.O.V.A.
**Purpose:** Validate the merged identity/platform cutover after PR #5 and PR #6
**Last Updated:** 2026-03-20
**Related:** `docs/validation/`, `PLATFORM-IDENTITY-CUTOVER.md`

---

## 1. Goal

Confirm that the merged N.O.V.A. migration is not just repo-complete, but runtime-sane.

This runbook focuses on the highest-risk post-merge checks:
- fresh install behavior
- upgrade continuity behavior
- widget / live-activity routing
- visible identity consistency

---

## 2. Highest-Risk Surfaces

These changed and deserve explicit validation:
- Expo slug → `nova`
- app scheme → `nova`
- iOS bundle identifier → `com.eulices.nova`
- Android package → `com.eulices.nova`
- widget app-group → `group.com.eulices.nova`
- live-activity deeplink → `nova://...`

---

## 3. Validation Order

## Pass A — Fresh install sanity
1. Install the latest merged build on a clean simulator/device.
2. Confirm the app installs and launches normally.
3. Confirm the app label presents as `N.O.V.A.`.
4. Confirm primary screen branding presents as `N.O.V.A.`.
5. Confirm settings/about/repo-link surfaces look sane.
6. Confirm model selection/chat launch still works.

### Pass criteria
- app launches without config/runtime failure
- no obvious legacy `Nano AI` visible in primary flow
- no broken startup due to scheme/package changes

---

## Pass B — Upgrade continuity sanity
1. Start from an older build if available.
2. Upgrade into the merged build.
3. Check whether prior chats/settings remain accessible.
4. Confirm no reset or startup failure occurs.
5. Check whether model/server settings still behave correctly.

### Pass criteria
- app upgrades cleanly
- prior local state is either preserved or any reset is understood/documented
- no silent crash loop or broken initialization

---

## Pass C — Deeplink / routing sanity
1. Trigger the `nova://` scheme manually if possible.
2. Confirm the app opens and route parsing still works.
3. Verify there is no obvious broken behavior from the scheme rename.

### Pass criteria
- `nova://` resolves
- no malformed-route crash
- routing assumptions still hold

---

## Pass D — Widget / Live Activity sanity
1. Start a chat flow that triggers the live activity.
2. Confirm the widget/live activity appears correctly.
3. Trigger the stop action from the live activity.
4. Confirm the app receives and handles the `nova://?from=dynamic-island&action=stop-live-activity` path correctly.

### Pass criteria
- live activity still appears
- stop action still resolves
- no obvious entitlement/app-group breakage

---

## 4. Artifact Capture

Store results under:

```text
artifacts/identity-migration/post-merge-validation/
```

Recommended contents:
- `summary.md`
- `fresh-install/`
- `upgrade-continuity/`
- `deeplink/`
- `widget-live-activity/`
- screenshots as needed

---

## 5. If Something Fails

## If fresh install fails
- suspect package/bundle/slug config first
- inspect `app.json`
- inspect generated native metadata

## If upgrade continuity fails
- verify whether this is expected due to bundle/package identity cutover
- document exactly what continuity was lost
- decide whether rollback or user-facing migration notes are required

## If deeplink fails
- inspect `APP_SCHEME`
- inspect app scheme in `app.json`
- inspect widget deeplink sender

## If widget/live activity fails
- inspect:
  - `targets/widget/expo-target.config.js`
  - `targets/widget/generated.entitlements`
  - `targets/widget/WidgetLiveActivity.swift`
- treat entitlement/app-group mismatch as the prime suspect

---

## 6. Success Definition

Post-merge validation is good enough when:
- fresh install works
- primary branding is clean
- no obvious broken routing exists
- widget/live activity still works or any breakage is explicitly documented
- upgrade behavior is understood, even if imperfect

---

## 7. Blunt Summary

The code and PR work are merged.
This runbook is the piece that turns “merged” into “trusted.”
