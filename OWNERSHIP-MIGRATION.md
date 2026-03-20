# N.O.V.A. Ownership Migration Plan

**Project:** N.O.V.A.
**Status:** Active
**Last Updated:** 2026-03-20
**Related:** `ORIGINALITY-AUDIT.md`, `PRD.md`, `DESIGN.md`, `docs/micro-prds/04-release-identity-decisions.md`

---

## 1. Purpose

This document converts the originality audit into an ownership migration plan.

The question it answers is:

> What must change, in what order, for N.O.V.A. to become fully owned in product identity without breaking install continuity or release infrastructure?

---

## 2. Ownership Layers

## Layer 1 — Narrative ownership
These surfaces shape perception fastest:
- README
- app name
- visible UI copy
- support/privacy/about docs
- repo links

**Status:** in progress

## Layer 2 — Visual ownership
These surfaces determine whether the product *looks* authored:
- icon
- splash
- screenshots
- App Store visuals
- marketing imagery

**Status:** not yet complete

## Layer 3 — Platform ownership
These surfaces determine whether the product is technically and operationally yours:
- package name
- slug
- URL scheme
- iOS bundle ID
- Android package
- widget app-group ID
- release metadata

**Status:** deferred / decision-gated

---

## 3. Current State

### Already moving in the right direction
- product name is shifting to N.O.V.A.
- repo narrative is shifting to a product story rather than a fork description
- canonical repo URL now points to `eulicesl/nano-ai`
- attribution is separated into `ATTRIBUTION.md`

### Still unresolved
- `package.json` name remains `nano-ai`
- `app.json` slug remains `nano-ai`
- `app.json` scheme remains `nano-ai`
- iOS bundle ID remains `com.anonymous.nano-ai`
- Android package remains `com.anonymous.nanoai`
- widget app-group remains legacy/anonymous
- Live Activity deeplink still uses legacy scheme
- screenshots/assets still need authorship review

---

## 4. Ownership Decision Matrix

| Surface | Current | Target posture | Recommended action | Timing |
| --- | --- | --- | --- | --- |
| README / docs story | mixed / now improving | fully owned | continue rewrite + polish | immediate |
| Visible app name | `N.O.V.A.` | fully owned | keep | immediate |
| Repo URL constant | upstream before, now yours | fully owned | done | immediate |
| Attribution | mixed/inherited | legally clean, brand-subordinate | done, may refine | immediate |
| Package name | `nano-ai` | owned or intentionally transitional | decide whether to rename to `nova`-family | phase 04 |
| Expo slug | `nano-ai` | owned | change only with explicit migration plan | phase 04 |
| URL scheme | `nano-ai` | owned | change with deeplink/widget migration | phase 04 |
| iOS bundle ID | `com.anonymous.nano-ai` | owned | replace with owned identifier | phase 04 |
| Android package | `com.anonymous.nanoai` | owned | replace with owned identifier | phase 04 |
| Widget app-group | `group.com.anonymous.nano-ai` | owned | migrate after bundle/scheme decision | phase 04 |
| Screenshots/assets | inherited risk | owned | refresh visuals | phase 05 / visual pass |
| License/legal notice | MIT | compliant | preserve and clarify if needed | ongoing |

---

## 5. Recommended Target Identity

These are recommendation placeholders pending your explicit approval.

### Product name
- `N.O.V.A.`

### Internal slug family
- `nova`

### Repo direction
- if repo stays temporary: `eulicesl/nano-ai` may remain transitional
- if you want clean ownership long-term: move toward a canonical repo name aligned with N.O.V.A.

### Package / identifier direction
Recommended style:
- package name: `nova` or `nova-ai` family
- bundle/package IDs under a real owned namespace, not `anonymous`

Example direction only:
- iOS bundle ID: `com.eulices.nova`
- Android package: `com.eulices.nova`
- app group: `group.com.eulices.nova`
- URL scheme: `nova`

These are examples, not final decisions.

---

## 6. Migration Principles

### P1. Ownership clarity beats temporary convenience
If an identifier makes the app feel temporary or inherited, it should eventually move.

### P2. Continuity still matters
Do not break installs, widgets, deeplinks, or release flows just to satisfy aesthetics.

### P3. Anonymous identifiers must die
`com.anonymous.*` is one of the clearest anti-authorship signals in the whole repo.

### P4. Visual proof matters as much as metadata
Even with perfect identifiers, inherited screenshots/icons will still weaken authorship.

---

## 7. Execution Sequence

## Sprint A — Narrative ownership
- done/in progress
- complete docs/product story/support tone cleanup

## Sprint B — Visual ownership
- audit screenshots/icons/splash
- replace inherited-feeling marketing visuals
- ensure store-facing presentation feels original

## Sprint C — Platform ownership design
- choose final owned namespace
- choose final slug/scheme strategy
- map deeplink/widget/blast radius
- confirm whether repo/package rename happens now or later

## Sprint D — Platform ownership execution
- migrate slug/scheme/bundle/package/app-group identifiers
- update widget/deeplink logic
- validate install/build continuity

## Sprint E — Ownership validation
- run “would an outsider call this your app?” review
- capture artifacts
- document remaining intentional lineage

---

## 8. What “Complete All Sprints” Actually Means Here

This ownership migration is complete when:
- branding is yours
- repo narrative is yours
- visuals are yours
- platform identifiers are yours
- legal attribution remains intact
- no major inherited identity surface remains as the default user impression

---

## 9. Immediate Next Actions

1. Finish the release-identity decision package.
2. Decide your owned identifier namespace.
3. Run a visual originality pass.
4. Then execute the high-risk config migration in one carefully controlled phase.

---

## 10. Blunt Recommendation

If you truly want this to be fully yours, do **not** stop at naming and README cleanup.

The line is crossed when:
- the product looks yours,
- the repo reads as yours,
- and the platform identifiers belong to you.

That is the real end of the fork-to-owned-product transition.