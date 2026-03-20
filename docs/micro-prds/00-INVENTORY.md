# Phase 00 Inventory — N.O.V.A. Identity Migration

**Project:** Nano AI → N.O.V.A.
**Status:** Working inventory
**Last Updated:** 2026-03-20
**Related:** `../../PRD.md`, `../../DESIGN.md`, `./00-inventory-and-naming-contract.md`

---

## 1. Canonical Naming Contract

### Public product name
- `N.O.V.A.`

### Plain-text fallback
- `NOVA`

### Internal slug target
- `nova`

### Legacy forms
- `Nano AI`
- `nano-ai`
- `Nano`

### Contract notes
- Use **`N.O.V.A.`** in user-facing product presentation where punctuation is acceptable.
- Use **`NOVA`** in constrained contexts where periods are awkward or likely to degrade UX.
- Use **`nova`** for new internal slugs, helper names, and migration docs where a slug is needed.
- Do **not** mass-rewrite all legacy `nano-*` identifiers until each surface is classified below.

---

## 2. Risk Buckets

### Bucket A — Low risk / user-visible
Safe to change early.
Examples:
- app-visible labels
- README title/copy
- PRIVACY text
- support copy
- screenshots and external docs

### Bucket B — Low-to-medium risk / internal naming
Safe only in isolated seams.
Examples:
- helper names
- file names
- constants that do not affect persisted or external identifiers
- comments/docs-in-code

### Bucket C — Medium-to-high risk / persistence and app-group continuity
Must be compatibility-aware.
Examples:
- AsyncStorage keys
- any future exported/imported settings identifiers
- app group identifiers for widget/shared state
- deep-link targets already used externally

### Bucket D — High risk / release identity
Decision-gated only.
Examples:
- Expo slug
- URL scheme
- iOS bundle identifier
- Android package name
- store listing identity
- GitHub repo URL if referenced in app/runtime docs

---

## 3. Concrete Inventory

| Surface | Current Value | Files / Evidence | Bucket | Recommendation |
| --- | --- | --- | --- | --- |
| Product display name | `Nano AI` | `app/index.tsx`, `app.json`, `README.md`, `PRIVACY`, `LICENSE` | A | migrate early on visible surfaces |
| Repo/package name | `nano-ai` | `package.json`, repo path, `README.md` | D/B | keep temporarily unless explicit repo/package migration decision |
| Expo app name | `Nano AI` | `app.json` | A/D edge | likely change display name before slug |
| Expo slug | `nano-ai` | `app.json` | D | do not change in early phase |
| URL scheme | `nano-ai` | `app.json`, `lib/constants.ts`, `targets/widget/WidgetLiveActivity.swift` | D/C | defer; high continuity risk |
| iOS bundle identifier | `com.anonymous.nano-ai` | `app.json` | D | defer pending release decision |
| Android package | `com.anonymous.nanoai` | `app.json` | D | defer pending release decision |
| App group identifier | `group.com.anonymous.nano-ai` | `targets/widget/expo-target.config.js`, `targets/widget/generated.entitlements` | C/D | defer; coupled to widget/shared state |
| Live Activity deep-link target | `nano-ai://?from=dynamic-island&action=stop-live-activity` | `targets/widget/WidgetLiveActivity.swift` | C/D | defer until scheme decision |
| App-visible header branding | `Nano AI` | `app/index.tsx` | A | migrate in brand surface pass |
| GitHub URL constant | `https://github.com/TonyL1u/nano-ai` | `lib/constants.ts` | B/D | decide if this remains legacy/upstream reference or is app-owned |
| Privacy-policy branding | `Nano AI app` | `PRIVACY` | A | migrate early |
| License copyright text | `Copyright (c) 2025 Nano AI` | `LICENSE` | A/B | update only if legally intended for this fork/product |
| AsyncStorage keys | `chats_history`, `settings` | `lib/local-storage.ts` | C | currently brand-neutral; do not change unless needed |
| Settings/chat state atoms | storage key enum references | `lib/local-storage.ts`, `store/settings.ts`, `store/chats.ts` | C | keep as-is unless migration reveals branded namespace need |
| Widget target config identity | nano-based group identifiers | `targets/widget/*` | C/D | explicit later-phase review only |

---

## 4. Findings That Matter

### 4.1 Good news
The **actual AsyncStorage keys are brand-neutral** right now:
- `chats_history`
- `settings`

That means the persistence migration may be much lighter than feared unless other hidden namespaces exist.

### 4.2 Real risk is more in platform identity than local app state
The most dangerous surfaces are:
- Expo slug
- URL scheme
- iOS bundle identifier
- Android package
- widget app group identifiers
- Live Activity deeplink scheme coupling

### 4.3 The first visible win is straightforward
User-visible branding appears to have at least one direct app residue:
- `app/index.tsx` → `Nano AI`

And obvious external residues:
- `README.md`
- `PRIVACY`
- possibly more UI copy in app/components after a fuller app-string pass

### 4.4 Repo-origin ambiguity needs explicit handling
`PROJECT_GITHUB_URL` points to:
- `https://github.com/TonyL1u/nano-ai`

That means the app still carries an upstream-origin identity surface. This must be classified as either:
1. intentional attribution/upstream reference, or
2. legacy residue to replace

That should be resolved before the brand surface PR is considered complete.

---

## 5. Keep / Change Guidance by Surface

## Change early
- app-visible branding strings
- README branding
- privacy/support branding text
- docs/migration copy

## Change later, only in isolated seams
- low-risk helper names
- local symbol/file names with no runtime identity effect
- comments/docs-in-code

## Do not change yet
- Expo slug
- URL scheme
- iOS bundle identifier
- Android package
- app group identifiers
- Live Activity deeplink scheme

## Probably do not need to change at all
- AsyncStorage keys `chats_history` and `settings`, unless a stronger branding need emerges

---

## 6. Safe Parallel Seams

### Seam A — Public/docs brand surfaces
Safe files:
- `README.md`
- `PRIVACY`
- docs-only references

### Seam B — In-app visible copy
Likely safe files:
- `app/index.tsx`
- other UI-only copy files discovered in `app/` and `components/`

### Seam C — Validation scaffolding
Safe outputs:
- validation checklist docs
- screenshot plan
- residue audit notes/scripts

### Seam D — Low-risk internal normalization
Safe only after exact files are enumerated.
Avoid shared config and storage helpers.

---

## 7. Unsafe Shared Seams

Do not parallelize edits to:
- `app.json`
- `lib/constants.ts` if scheme/repo URL decisions are mixed into the same work
- `lib/local-storage.ts`
- `targets/widget/*`

These are too close to release/runtime identity.

---

## 8. Recommended First PR Content

### PR 1 — `pr/nova-identity-001-inventory-contract`
Include only:
- naming contract
- risk buckets
- concrete surface inventory
- keep/change recommendations
- safe/unsafe seam map

Do **not** include runtime identity changes in this PR.

---

## 9. Recommended Next Parallel PRs After Phase 00

### PR 2A — Brand surface pass
- README
- PRIVACY
- app-visible strings

### PR 2B — Validation scaffold
- screenshot list
- fresh-install vs upgrade checklist
- residue audit plan

### PR 2C — Safe internal normalization discovery or isolated low-risk renames
Only after exact seam list is confirmed.

---

## 10. Open Questions

1. Should `PROJECT_GITHUB_URL` remain the upstream repo for attribution, or change to the canonical app repo?
2. Is `LICENSE` copyright text meant to remain as upstream attribution, or reflect the current maintained product identity?
3. Is changing the app display name in `app.json` acceptable in the early brand pass even if slug/scheme remain legacy?
4. Are there additional identity-bearing assets/screens not captured in the grep pass yet (icons, splash text, App Store screenshots)?

---

## 11. Summary

This repo is in a better migration posture than expected:
- **user-visible naming is still legacy in a few obvious places**
- **storage keys are currently brand-neutral**
- **the real danger zone is release/platform identity, not local persistence**

That means the correct senior move is still:
1. lock inventory/contract
2. take the easy visible win
3. keep scheme/bundle/package/app-group changes behind an explicit later decision gate