# Micro-PRD 02 — Safe Internal Naming Normalization

**Phase:** 2
**Status:** Ready
**Depends on:** `00-inventory-and-naming-contract.md`
**Primary Goal:** normalize low-risk internal names toward `nova` without touching persistence or release-critical identifiers.

---

## Problem
Even after public branding changes, the repo can still feel internally split if safe, low-risk naming remains heavily Nano-based.

## Scope
- safe symbol/type/helper renames
- file renames where import churn is manageable
- comments/docs-in-code updates
- normalization of low-risk internal naming to `nova`

## Out of scope
- storage key changes
- analytics namespaces unless proven low-risk
- package/bundle/scheme/slug changes
- wide-scope refactors mixed with business logic changes

## Deliverables
- cleaner internal naming in isolated seams
- minimal-risk symbol/file normalization
- notes for any deferred legacy internals

## Likely files
- isolated modules in `app/`, `components/`, `lib/`, `store/`, `hooks/`
- avoid central config files unless specifically approved

## Suggested branch
- `pr/nova-identity-003-safe-internal-normalization`

## Suggested commit shape
1. `refactor: normalize low-risk nova naming in shared helpers`
2. `refactor: rename isolated files and symbols`
3. `docs: record deferred legacy internals`

## Acceptance criteria
- touched seams use `nova` naming consistently
- no persistence behavior changed
- app behavior remains functionally identical
- PR remains reviewable and scoped

## Validation
- lint/build smoke check
- grep diff for touched directories
- reviewer can identify exact rename boundary

## Rollback
Revert isolated renames cleanly; no storage/release impact expected.

## Parallelization notes
Can be split across isolated folders, but do not assign two subagents to the same import graph.