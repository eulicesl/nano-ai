# N.O.V.A. Migration Validation Pack

This folder is the execution scaffold for Phase 05 of the Nano AI → N.O.V.A. identity migration.

## Purpose
Provide a lightweight, reviewable place to capture proof that:
- a fresh install presents `N.O.V.A.` consistently
- an upgrade preserves user continuity
- visible Nano AI residue is removed from intended surfaces
- any remaining legacy identifiers are documented intentionally

## Suggested artifact structure

```text
artifacts/
  identity-migration/
    phase-05-validation-cleanup/
      summary.md
      fresh-install/
        checklist.md
        screenshots/
      upgrade-continuity/
        checklist.md
        screenshots/
      brand-verification/
        checklist.md
        screenshots/
      residue-audit/
        report.md
        raw-grep.txt
```

## Files in this folder
- `fresh-install-checklist.md`
- `upgrade-continuity-checklist.md`
- `visible-brand-verification-checklist.md`
- `residue-audit-checklist.md`
- `artifact-template.md`

## Execution notes
- Keep validation evidence scoped and boring: screenshots, build notes, grep output, and short observations.
- If a legacy identifier is intentionally retained for continuity, record it in the artifact summary instead of treating it as a failure.
- Do not mix runtime changes into the validation PR unless they are extremely small and directly required to unblock evidence capture.
