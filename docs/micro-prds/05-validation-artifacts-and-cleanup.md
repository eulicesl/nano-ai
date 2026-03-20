# Micro-PRD 05 — Validation, Artifacts, and Cleanup

**Phase:** 5
**Status:** Ready
**Depends on:** phases 01–04 as applicable
**Primary Goal:** prove the migration worked, capture artifacts, and remove obvious dead residue.

---

## Problem
Without proof, identity migration remains aspirational. We need explicit validation for both fresh installs and upgrades.

## Scope
- fresh install validation
- upgrade validation
- screenshot/artifact capture
- residue audit for intended scope
- cleanup of dead docs/comments/shims safe to remove now

## Out of scope
- new feature work
- major refactors hidden as cleanup

## Deliverables
- validation summary
- screenshots/artifacts
- final residue list or completion statement
- cleanup of low-risk dead migration residue
- execution scaffold in `docs/validation/`

## Likely files
- docs validation notes
- screenshots/artifacts folders if created
- targeted dead-residue removals in touched areas

## Suggested branch
- `pr/nova-identity-006-validation-cleanup`

## Suggested commit shape
1. `validation: capture nova migration proof set`
2. `docs: summarize fresh install and upgrade results`
3. `cleanup: remove safe dead identity residue`

## Acceptance criteria
- fresh install presents N.O.V.A. consistently
- upgrade path preserves user continuity
- remaining legacy identifiers are either removed or documented intentionally
- artifact pack exists for reviewer confidence

## Validation
- screenshot proof
- build/lint/smoke notes
- grep residue report for scoped migration surfaces

## Rollback
Validation/docs changes are trivial to revert; cleanup reverts should be isolated and safe.

## Parallelization notes
Artifact capture can overlap with cleanup only after functional migration phases are stable.