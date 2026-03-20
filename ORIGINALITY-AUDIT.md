# N.O.V.A. Originality Audit

**Project:** N.O.V.A.
**Context:** fork-to-original-product transition
**Status:** Active audit
**Last Updated:** 2026-03-20

---

## 1. Purpose

This document defines what must be true for N.O.V.A. to read as **unmistakably Eulices's product** rather than a lightly modified fork.

The goal is not to erase lineage dishonestly.
The goal is to:
- honor legal obligations
- preserve truthful attribution where required
- remove unnecessary inherited identity residue
- establish a product that clearly belongs to its current author

---

## 2. The Standard

N.O.V.A. counts as fully your own work when a reasonable outsider can inspect the:
- repo
- README
- screenshots
- app identity
- settings/about/privacy surfaces
- release metadata

and conclude:

> This is Eulices's product, with Eulices's identity, direction, and authorship center of gravity.

Not:
- “someone else’s app with a new name”
- “an upstream app with a light reskin”
- “a fork still borrowing its core identity from the original project”

---

## 3. Legal vs Identity Boundary

## 3.1 What must remain
Because this project incorporates MIT-licensed code, the following must remain intact where required:
- MIT license text
- required copyright/license notice
- truthful attribution where legally necessary

## 3.2 What does NOT need to remain
The following do **not** need to remain unless you intentionally want them:
- upstream product identity as the main brand
- upstream repo links in user-facing product surfaces
- upstream naming in package/store/app identity
- upstream screenshots or presentation style
- generic “anonymous” identifiers that make the product feel provisional

## 3.3 Core rule
**Keep the legal paper trail. Replace the inherited product identity.**

---

## 4. Current State Assessment

Current posture: **branded fork in transition**

This repo is no longer purely upstream, but it is not yet fully authored in outward identity.

### What already helps
- N.O.V.A. migration planning now exists
- visible brand surface pass has begun
- persistence keys appear mostly brand-neutral
- repo is under your control

### What still weakens authorship perception
- upstream repo references still exist
- `nano-ai` remains in package/platform identity
- widget/deeplink/app-group identifiers remain legacy
- screenshots/assets may still feel inherited
- `com.anonymous.*` identifiers feel temporary and non-authored
- README still reads more like a forked app description than a strongly authored product story

---

## 5. Keep / Replace / Rewrite Matrix

## KEEP
These are appropriate to preserve.

### Legal
- `LICENSE` text
- MIT notice requirements

### Honest attribution
- a concise upstream attribution/history note where appropriate
- dependency acknowledgments
- truthful references to inspiration if they are not allowed to dominate identity

### Functional lineage
- legitimate technical dependency on Ollama, if still core to the app

---

## REPLACE
These are high-value identity surfaces that should move to your ownership.

### Repo/product ownership surfaces
- canonical GitHub repo URL in app constants/docs
- repo naming if `nano-ai` remains the public canonical home
- support/contact references

### Product identity surfaces
- app display identity everywhere
- package/store-facing names over time
- app icon, splash, screenshots, marketing visuals
- About/help/support surfaces

### Platform/release identifiers
- Expo slug
- URL scheme
- iOS bundle ID
- Android package
- widget app-group identifiers
- deeplink scheme usage

### Weak-authorship signals
- `com.anonymous.*`
- any temporary or inherited placeholder publisher identity

---

## REWRITE
These are the places where voice and narrative matter.

### README
README should answer:
- what N.O.V.A. is
- why it exists
- what makes it distinct
- who it is for
- where it is going

### Product story
The narrative should become:
- not “a version of Nano AI”
- but “a product authored and directed by Eulices”

### Privacy/support docs
These should read like they belong to a maintained product with a clear owner.

### UI copy
Onboarding, settings, and help text should sound intentional and authored, not generic leftover fork language.

---

## 6. High-Signal Residue List

These are the strongest current signals that the app is still inherited.

### Critical
- `lib/constants.ts`
  - upstream GitHub URL still points to `TonyL1u/nano-ai`
- `package.json`
  - package name still `nano-ai`
- `app.json`
  - slug: `nano-ai`
  - scheme: `nano-ai`
  - bundle/package still legacy
- widget identity
  - app-group + deeplink scheme tied to legacy name

### Strong perception issues
- README still includes legacy App Store URL naming
- screenshots/assets likely still reflect inherited visual identity
- `com.anonymous.*` feels non-owned and temporary

### Medium
- inspiration/lineage references may be fine, but should not dominate your story
- license header phrasing may need a cleaner separation between legal attribution and product identity

---

## 7. Authorship-Critical Outcomes

For N.O.V.A. to feel fully yours, these outcomes matter most:

### O1. Ownership is visible
A user/reviewer sees your repo, your product name, your documentation, and your release story.

### O2. Identity is coherent
The app, repo, package/store metadata, screenshots, and settings/about screens all point to the same product identity.

### O3. Lineage is subordinate, not central
Upstream history may be acknowledged, but it is no longer the product’s defining identity.

### O4. Product direction is original
The roadmap, product framing, and user experience choices clearly reflect your own judgment rather than passive inheritance.

---

## 8. Execution Priorities

## Priority 1 — Immediate authorship wins
These have the highest perception payoff.

1. Replace upstream repo URL references.
2. Rewrite README around N.O.V.A. as your product.
3. Audit all screenshots/assets for inherited identity.
4. Add a short, clean attribution/history note separate from product branding.

## Priority 2 — Platform authorship
These make the app feel truly owned at the infrastructure layer.

5. Decide final canonical identifiers:
   - slug
   - scheme
   - iOS bundle ID
   - Android package
   - widget app-group
6. Replace `com.anonymous.*` with your owned identity.

## Priority 3 — Originality lock-in
These make the product unmistakably yours even if someone knows the lineage.

7. Refresh screenshots and store-style presentation.
8. Rewrite support/privacy/about surfaces in your own product voice.
9. Define a product direction/roadmap that is clearly yours.

---

## 9. Decision Rules

### Rule 1
If something is legally required, keep it.

### Rule 2
If something is not legally required and makes the product feel inherited, replace it.

### Rule 3
If something is user-visible and ambiguous about ownership, treat it as high priority.

### Rule 4
If a surface is high-risk technically but weakens authorship, stage it deliberately rather than ignoring it forever.

---

## 10. Suggested Deliverables

To finish the fork-to-original transition cleanly, create/complete:

- `PRD.md` — identity migration product spec
- `DESIGN.md` — migration design
- `docs/micro-prds/` — execution plan
- `ORIGINALITY-AUDIT.md` — this document
- `ATTRIBUTION.md` or README section — concise legal/history note
- refreshed screenshots/assets pack
- release identity decision record

---

## 11. Done Means

This audit is satisfied when all are true:

- app surfaces present N.O.V.A. consistently
- repo references point to your canonical project, not upstream by default
- screenshots/assets no longer feel inherited
- package/platform identity has an intentional ownership story
- legal attribution remains intact without dominating branding
- the README and product narrative clearly read as your authored product
- an outside reviewer would reasonably describe it as **your app**

---

## 12. Recommended Next Concrete Steps

### Next 3 steps
1. Replace upstream repo URL references and decide canonical repo identity.
2. Rewrite README from “forked app description” to “your product story.”
3. Create a concise `ATTRIBUTION.md` or attribution section so legal/history stays clean while branding stays yours.

### After that
4. Run a visual asset/screenshot originality pass.
5. Make the Phase 04 platform identity decisions.
6. Replace `com.anonymous.*` with owned identifiers.

---

## 13. Blunt Summary

Right now, N.O.V.A. is on the path from **renamed fork** to **owned product**.

To cross that line fully, the app needs:
- your identity at the center
- your repo as canonical
- your assets and presentation
- your release identifiers
- legal attribution preserved but demoted from brand identity

That is how this becomes unmistakably yours without pretending it came from nowhere.