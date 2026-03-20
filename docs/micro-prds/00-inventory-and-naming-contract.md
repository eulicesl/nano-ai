# Micro-PRD 00 — Inventory and Naming Contract

**Phase:** 0
**Status:** Ready
**Depends on:** none
**Primary Goal:** lock naming decisions and produce a complete migration inventory before code churn begins.

---

## Problem
We cannot safely migrate identity if contributors are guessing which surfaces matter or what the canonical naming forms should be.

## Scope
- define canonical forms: `N.O.V.A.`, `NOVA`, `nova`
- inventory all identity-bearing surfaces
- classify each surface by risk bucket A/B/C/D
- identify likely persistence keys and release-critical config
- document what will *not* be changed in early phases

## Out of scope
- changing app-visible strings
- changing assets
- changing bundle/package/scheme/slug
- changing storage keys

## Deliverables
- completed inventory doc: `00-INVENTORY.md`
- list of safe parallel seams
- list of high-risk identifiers requiring explicit approval

## Likely files
- `PRD.md`
- `DESIGN.md`
- `README.md` (read-only inspection unless needed for notes)
- `app.json` (read-only inspection)
- storage/config helper files discovered during inventory

## Suggested branch
- `pr/nova-identity-001-inventory-contract`

## Suggested commit shape
1. `docs: define nova naming contract`
2. `docs: inventory identity-bearing surfaces`
3. `docs: map migration risk buckets and seams`

## Acceptance criteria
- canonical naming policy is explicit
- all known identity-bearing surfaces are listed
- each surface has a risk classification
- next PRs can be assigned without guessing boundaries

## Validation
- grep/search proof for key name surfaces
- reviewer can point to a single source of truth for migration scope

## Rollback
Pure docs phase; safe to revert fully.

## Parallelization notes
This phase should be completed before any parallel subagent implementation work begins.