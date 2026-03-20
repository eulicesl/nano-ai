# N.O.V.A. Identity Migration PRD

**Project:** Nano AI → N.O.V.A.
**Owner:** Eulices Lopez
**Status:** Draft for execution
**Last Updated:** 2026-03-20
**Related:** `DESIGN.md`, `docs/micro-prds/`

---

## 1. Executive Summary

Nano AI currently presents a split identity: the product is increasingly being framed as **N.O.V.A.**, while the codebase, package identifiers, repo copy, and release surfaces still materially reflect **Nano AI**.

This project aligns the product into a single coherent identity without breaking:
- installed user continuity
- store/update continuity
- analytics/logging continuity where needed
- release automation
- internal engineering velocity

The objective is not a reckless global rename. The objective is a **controlled, phased identity migration** that moves the user-facing product to N.O.V.A. first, then normalizes internals, then handles high-risk identifiers only where justified.

---

## 2. Product Goal

Ship a stable, professional identity transition from **Nano AI** to **N.O.V.A.** such that:
1. Users consistently see N.O.V.A. across app, docs, screenshots, and support surfaces.
2. Existing installs continue to work without data loss or broken upgrades.
3. Engineering can execute the migration via small, reviewable PRs.
4. Parallel subagents can work safely on non-overlapping seams.
5. The resulting repo feels like a product with a native identity, not a re-skinned legacy shell.

---

## 3. Why This Matters

### Product credibility
A split identity weakens trust. If the app says one thing while package names, docs, and metadata say another, the product feels transitional rather than intentional.

### Brand coherence
N.O.V.A. should become the primary mental model for users, reviewers, and future collaborators.

### Engineering hygiene
A disciplined migration prevents the worst-case pattern: random renames, broken storage keys, mismatched auth/config, and release regressions.

### Portfolio strength
If this app is going to represent original product work, its naming and execution need to feel deliberate all the way through.

---

## 4. Product Principles

### P1. Identity before cosmetics
The goal is not just prettier copy. The goal is a product identity users can trust.

### P2. User continuity beats internal purity
If preserving upgrades or existing installs requires temporary compatibility shims, do that.

### P3. Public surfaces first, risky identifiers later
Start where value is highest and blast radius is lowest.

### P4. One PR, one clear purpose
Every migration slice should be legible to reviewers and safe to roll back.

### P5. Parallelize only on stable seams
Do not let subagents collide in app config, storage, or routing-critical files.

---

## 5. Success Criteria

The migration is successful when all are true:
- app name, README, screenshots, and support copy consistently present **N.O.V.A.**
- no user-visible Nano AI residue remains in primary flows
- upgrade path preserves chats/settings/history unless explicitly redesigned
- release pipeline still produces valid iOS/Android artifacts
- any retained legacy identifiers are documented and intentional
- future contributors can understand what changed, why, and what still remains

---

## 6. Scope

## In Scope

### A. Brand Surface Migration
- app display name
- README and repo copy
- screenshots and visual assets plan
- in-app copy and titles
- support/privacy references where relevant

### B. Internal Naming Normalization
- safe file/module/type/constant renames
- canonical naming guidance (`N.O.V.A.`, `NOVA`, `nova`)
- removal of avoidable legacy Nano naming in product-critical code

### C. Compatibility Layer
- legacy storage key reads
- migration to new keys where applicable
- fallback support for legacy app-level naming assumptions
- explicit telemetry/logging notes for legacy/new identities

### D. Release and Platform Identity Audit
- Expo config
- app slug/scheme decisions
- iOS bundle identifier decision
- Android package decision
- store metadata plan
- app icon and launch assets alignment

### E. Verification and Rollout
- fresh install verification
- upgrade verification
- artifact capture
- rollback notes per phase

---

## 7. Explicitly Out of Scope

These are not required for identity migration completion unless discovered as blockers:
- large UX redesigns unrelated to naming/identity
- feature roadmap expansion
- broad architecture rewrites unrelated to migration safety
- platform-specific redesign beyond naming/metadata surfaces
- unrelated Apple polish work already tracked elsewhere

---

## 8. Primary User Flows Affected

### Flow 1 — Fresh Install
1. User installs the app.
2. User sees N.O.V.A. from icon/title/launch onward.
3. User never encounters Nano AI in first-run flow.

### Flow 2 — Upgrade from Existing Install
1. Existing Nano AI user updates.
2. App becomes N.O.V.A. without losing chats/settings.
3. No broken persistence, no reset, no invalid package/store behavior.

### Flow 3 — Repo / OSS / External Evaluation
1. Visitor lands on repo or support surfaces.
2. They understand the product is N.O.V.A.
3. Internal/legacy naming does not undermine confidence.

---

## 9. Functional Requirements

### FR-1 Canonical Naming Policy
Define and enforce canonical naming forms:
- product presentation: `N.O.V.A.`
- broad-text fallback when punctuation is awkward: `NOVA`
- internal slug/identifier target: `nova`

### FR-2 Surface Inventory
Create and maintain an inventory of identity-bearing surfaces, including:
- app.json / Expo metadata
- package.json
- README
- in-app visible strings
- icons / splash / screenshots
- support/privacy references
- iOS and Android identifiers
- storage keys
- deep links / scheme

### FR-3 Safe Migration Behavior
- Existing persisted data must remain accessible after rename.
- New writes should prefer canonical new keys where safe.
- Legacy reads should remain supported for at least one compatibility phase.

### FR-4 Release Integrity
- builds must still work after each phase
- EAS / Expo assumptions must be revalidated if metadata changes
- store-facing metadata changes must be staged intentionally

### FR-5 Documentation for Parallel Work
Each phase must define:
- exact scope
- files likely touched
- branch naming convention
- validation requirements
- safe parallelization boundaries

---

## 10. Non-Functional Requirements

### Reliability
No migration phase should silently break startup, persistence, or release configuration.

### Maintainability
Future contributors should be able to tell:
- what is fully migrated
- what still uses compatibility shims
- which legacy identifiers are intentionally retained

### Reviewability
Every phase must fit senior-engineer review norms:
- small enough to audit
- explicit acceptance criteria
- clear rollback path
- proof via screenshots/build/test notes where applicable

---

## 11. Risks

### R1. Over-renaming
Renaming everything at once could break persistence, package continuity, store metadata, or automation.

### R2. Under-specifying canonical names
If `N.O.V.A.` vs `NOVA` vs `nova` is not settled, contributors will create drift.

### R3. Identifier churn
Changing bundle IDs, package names, schemes, or slugs without a strict reason could cause avoidable release pain.

### R4. Subagent merge thrash
Parallel work without seam discipline will create conflicts in app config, shared copy, and documentation.

### R5. Hidden legacy surfaces
There may be identity-bearing strings in release config, assets, or storage that are easy to miss without an inventory pass.

---

## 12. Milestones

### Milestone 0 — Inventory and Naming Contract
Lock canonical naming policy and enumerate migration surfaces.

### Milestone 1 — Brand Surface Pass
Move visible product surfaces to N.O.V.A. without touching high-risk identifiers.

### Milestone 2 — Internal Naming Normalization
Refactor safe internals toward `nova` naming conventions.

### Milestone 3 — Compatibility and Persistence Migration
Add read-old/write-new compatibility where required.

### Milestone 4 — Release Identity Decisions
Handle high-risk identifiers only after evidence and explicit decisions.

### Milestone 5 — Validation and Cleanup
Validate fresh install + upgrade, capture artifacts, remove obvious dead migration residue.

---

## 13. Launch / Completion Criteria

This project is complete when:
- the product feels like **N.O.V.A. all the way down** on all user-visible surfaces
- compatibility for legacy installs is proven
- unresolved legacy identifiers are documented with rationale
- the micro-PRD queue is complete and validated

---

## 14. Senior Engineer Workflow Rules

1. Work proceeds via **micro-PRD → issue/branch → PR → review → merge**.
2. Each PR must include:
   - problem statement
   - scope boundary
   - acceptance criteria
   - test/build notes
   - rollback notes
   - screenshots when user-visible surfaces change
3. No direct-to-main work.
4. No broad mechanical rename PR without an approved inventory and seam map.
5. High-risk identifier changes require explicit go/no-go decision in their micro-PRD.

---

## 15. Open Questions

- Should the repo name remain `nano-ai` temporarily even if the app becomes N.O.V.A. first?
- Is the final user-facing punctuation always `N.O.V.A.`, or should some surfaces standardize to `NOVA`?
- Is changing the Expo slug and scheme worth the migration risk in the current release window?
- Are bundle/package identifiers strategically worth changing, or should they remain legacy-internal?

---

## 16. Execution Instruction

If a decision trades off **identity purity vs user continuity**, choose continuity.

If a decision trades off **parallel speed vs merge safety**, choose merge safety.

If a decision trades off **full rename now vs phased migration**, choose phased migration.