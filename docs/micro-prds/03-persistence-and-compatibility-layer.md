# Micro-PRD 03 — Persistence and Compatibility Layer

**Phase:** 3
**Status:** Ready
**Depends on:** `00-inventory-and-naming-contract.md`
**Primary Goal:** preserve continuity for existing installs when identity-related storage keys or namespaces change.

---

## Problem
If identity migration changes storage assumptions without compatibility handling, existing users may lose chats, preferences, or session continuity.

## Scope
- identify old vs new storage keys/namespaces
- implement read-old/write-new logic where required
- document migration behavior for each changed key
- add minimal migration utilities if needed

## Out of scope
- unrelated persistence refactors
- broad data model redesign
- package/bundle changes

## Deliverables
- compatibility map for each changed key
- storage migration logic merged in a focused PR
- documented rollback implications

## Likely files
- storage helpers in `lib/`, `store/`, or equivalent
- settings/chat/session persistence code
- migration notes docs if created

## Suggested branch
- `pr/nova-identity-004-persistence-compat-layer`

## Suggested commit shape
1. `storage: add legacy read fallback for nova migration`
2. `storage: write canonical nova keys`
3. `docs: document key migration behavior`

## Acceptance criteria
- existing install data remains available after update
- new canonical keys are used where intended
- changed keys are documented explicitly
- no silent data loss paths introduced

## Validation
- fresh install test
- upgrade-path test using existing local data if feasible
- key-level verification notes

## Rollback
If rollback occurs after new writes land, note whether old keys remain sufficient for downgrade safety.

## Parallelization notes
Single-owner phase. Do not parallelize storage-key migration across multiple subagents.