# Phase 01 Notes — Brand Surface Pass

**Status:** In progress
**Last Updated:** 2026-03-20
**Related:** `01-brand-surface-pass.md`, `00-INVENTORY.md`

---

## Changes made in this pass

### Updated visible brand surfaces
- `app/index.tsx`
  - header branding changed from `Nano AI` → `N.O.V.A.`
- `app.json`
  - Expo display name changed from `Nano AI` → `N.O.V.A.`
  - slug/scheme/bundle/package intentionally unchanged
- `README.md`
  - title and opening product description changed to `N.O.V.A.`
- `PRIVACY`
  - simplified and updated product naming to `N.O.V.A.`

---

## Intentionally retained legacy identifiers in this phase

These were intentionally left unchanged because they are release-critical, compatibility-sensitive, or need an explicit later decision:
- Expo slug: `nano-ai`
- URL scheme: `nano-ai`
- iOS bundle identifier: `com.anonymous.nano-ai`
- Android package: `com.anonymous.nanoai`
- widget app-group identifiers
- Live Activity deep-link scheme usage
- package name: `nano-ai`
- upstream GitHub URL constant in `lib/constants.ts`

---

## Validation notes

### Expected visible result
- app header now presents `N.O.V.A.`
- app display name should present `N.O.V.A.` via Expo app name metadata
- repo README now presents the product as `N.O.V.A.`
- privacy text no longer references `Nano AI`

### Not validated yet
- simulator screenshot capture
- App Store listing alignment
- icon/splash/store asset naming review

---

## Follow-up recommendations

1. Run a residue audit for additional UI-visible `Nano AI` strings beyond the main header.
2. Decide whether the GitHub URL constant is intentional upstream attribution or legacy residue.
3. Keep scheme/slug/bundle/package changes for Phase 04 only.
