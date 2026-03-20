# N.O.V.A. Identity Migration — Micro-PRDs

Execution order:
1. `00-inventory-and-naming-contract.md`
   - working inventory artifact: `00-INVENTORY.md`
2. `01-brand-surface-pass.md`
3. `02-safe-internal-naming-normalization.md`
4. `03-persistence-and-compatibility-layer.md`
5. `04-release-identity-decisions.md`
   - ownership context: `../../OWNERSHIP-MIGRATION.md`
6. `05-validation-artifacts-and-cleanup.md`

## Parallel-safe work after phase 00
- Phase 01: public/docs/app-visible brand surface pass
- Phase 02: safe internal naming normalization in isolated seams
- validation scaffolding/artifact prep can begin early if it does not touch config

## Keep serial
- Phase 03 persistence compatibility
- Phase 04 release identity decisions

## Workflow rule
Each micro-PRD maps to one primary PR. If a phase needs multiple PRs, split by seam, not by random file count.