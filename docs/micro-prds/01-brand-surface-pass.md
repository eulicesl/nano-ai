# Micro-PRD 01 — Brand Surface Pass

**Phase:** 1
**Status:** Ready
**Depends on:** `00-inventory-and-naming-contract.md`
**Primary Goal:** move user-visible and repo-visible surfaces to N.O.V.A. without touching high-risk identifiers.

---

## Problem
The product still presents as Nano AI on high-visibility surfaces, which weakens the identity transition.

## Scope
- README title/copy updates
- app-visible labels/titles/about text
- support/privacy-facing references where applicable
- screenshot naming/caption plan
- docs references intended for external readers

## Out of scope
- storage key changes
- bundle/package/scheme/slug changes
- deep architectural refactors

## Deliverables
- repo and app visibly present N.O.V.A.
- no major user-facing Nano AI residue in primary screens
- explicit list of any intentionally retained legacy strings

## Likely files
- `README.md`
- UI copy files discovered in `app/`, `components/`, `lib/`
- support/privacy copy if present

## Suggested branch
- `pr/nova-identity-002-brand-surface-pass`

## Suggested commit shape
1. `docs: rename public-facing product copy to nova`
2. `ui: update visible branding strings`
3. `docs: record intentionally retained legacy identifiers`

## Acceptance criteria
- app primary UI shows N.O.V.A. where branding appears
- README and external copy use N.O.V.A. consistently
- no runtime config or persistence behavior changed

## Validation
- screenshots of primary app surfaces
- README render check
- grep-based residue check scoped to user-visible strings

## Rollback
Revert copy-only changes; no persistence or release risk expected.

## Parallelization notes
Can run in parallel with phase 02 only if 02 avoids overlapping files containing visible strings.