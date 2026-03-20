# N.O.V.A. Identity Migration — Execution Board

**Project:** Nano AI → N.O.V.A.
**Purpose:** Senior-engineer execution plan for parallel subagent work
**Related:** `../../PRD.md`, `../../DESIGN.md`, `./README.md`
**Last Updated:** 2026-03-20

---

## 1. Operating Model

This migration should run as a **serial backbone with controlled parallel lanes**.

### Serial backbone
These phases should remain dependency gates:
1. **Phase 00** — inventory + naming contract
2. **Phase 03** — persistence + compatibility layer
3. **Phase 04** — release identity decisions

### Parallel lanes
Once **Phase 00** is complete, we can safely run:
- **Lane A:** brand surface pass
- **Lane B:** safe internal naming normalization
- **Lane C:** validation scaffolding / residue audit prep

### Rule
No subagent should edit `app.json`, shared storage helpers, or central migration docs concurrently unless explicitly assigned as sole owner.

---

## 2. Recommended Wave Plan

## Wave 0 — Contract lock
### Owner
- **Lead agent / main session**

### Work
- complete `00-inventory-and-naming-contract.md`
- produce inventory of identity-bearing surfaces
- classify buckets A/B/C/D
- confirm canonical naming policy
- mark exact seams for parallel work

### Exit gate
- explicit keep/change inventory exists
- parallel work assignments can be made without guessing

---

## Wave 1 — Parallel visible and low-risk work
Run these after Wave 0 is merged or at least fully specified.

### Lane A — Brand surface pass
**Micro-PRD:** `01-brand-surface-pass.md`

**Primary goal**
- move user-visible and repo-visible branding to N.O.V.A.

**Safe scope**
- README
- public docs
- app-visible strings
- support/privacy copy where applicable

**Avoid**
- config identifiers
- storage keys
- release-critical metadata

**Suggested branch**
- `pr/nova-identity-002-brand-surface-pass`

---

### Lane B — Safe internal naming normalization
**Micro-PRD:** `02-safe-internal-naming-normalization.md`

**Primary goal**
- normalize low-risk code naming to `nova`

**Safe scope**
- isolated helpers
- low-risk symbols/files
- comments/docs-in-code

**Avoid**
- storage namespaces
- analytics/event identifiers unless proven safe
- shared config files

**Suggested branch**
- `pr/nova-identity-003-safe-internal-normalization`

---

### Lane C — Validation scaffolding and residue audit prep
**Pre-phase support lane**

**Primary goal**
- prepare proof machinery before deeper migration lands

**Safe scope**
- draft validation checklist
- define screenshot list
- grep residue audit scripts/notes
- create artifact folder plan

**Avoid**
- touching runtime logic
- renaming actual identifiers

**Suggested branch**
- `pr/nova-identity-003b-validation-scaffold`

---

## Wave 2 — Controlled compatibility work

### Lane D — Persistence and compatibility layer
**Micro-PRD:** `03-persistence-and-compatibility-layer.md`

**Owner**
- one senior implementation agent only

**Primary goal**
- keep upgrades safe if storage keys/namespaces change

**Suggested branch**
- `pr/nova-identity-004-persistence-compat-layer`

**Rule**
- no other subagent edits storage/persistence helpers during this lane

---

## Wave 3 — High-risk decision gate

### Lane E — Release identity decisions
**Micro-PRD:** `04-release-identity-decisions.md`

**Owner**
- lead agent / main session or one explicitly delegated senior agent

**Primary goal**
- decide whether to keep/change slug, scheme, bundle/package identifiers
- align platform identity with ownership goals in `../../OWNERSHIP-MIGRATION.md`

**Suggested branch**
- `pr/nova-identity-005-release-identity-decisions`

**Rule**
- do not parallelize `app.json` edits

---

## Wave 4 — Proof and cleanup

### Lane F — Validation and cleanup
**Micro-PRD:** `05-validation-artifacts-and-cleanup.md`

**Primary goal**
- prove fresh install + upgrade continuity
- remove safe dead residue

**Suggested branch**
- `pr/nova-identity-006-validation-cleanup`

---

## 3. Dependency Graph

```text
00 Inventory + Naming Contract
   ├── 01 Brand Surface Pass
   ├── 02 Safe Internal Naming Normalization
   └── Validation Scaffold (support lane)

01 + 02 + inventory findings
   └── 03 Persistence + Compatibility Layer

03 + config inventory
   └── 04 Release Identity Decisions

01 + 02 + 03 + 04
   └── 05 Validation / Artifacts / Cleanup
```

---

## 4. PR Review Checklist

Every PR should include:
- problem statement
- exact phase/micro-PRD link
- scope boundary
- files intentionally not touched
- acceptance criteria checklist
- test/build notes
- rollback notes
- screenshots if user-visible

### Preferred review order
1. correctness / blast radius
2. continuity / migration safety
3. naming consistency
4. docs/artifacts completeness
5. polish

---

## 5. Ready-to-Send Subagent Prompts

## Prompt A — Phase 00 Inventory + Naming Contract

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: execute the N.O.V.A. identity migration inventory/naming-contract phase.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/00-inventory-and-naming-contract.md

Deliverables:
1. complete inventory of identity-bearing surfaces
2. classify each surface into risk bucket A/B/C/D
3. identify likely persistence/storage keys and release-critical identifiers
4. document exact safe parallel seams for later agents

Constraints:
- do not change runtime logic
- do not rename user-visible strings yet unless strictly needed for documentation clarity
- do not edit bundle/package/scheme/slug
- keep work senior, crisp, and reviewable

Expected output:
- updated docs only
- concise summary of findings
- recommended next parallel lanes
```

---

## Prompt B — Phase 01 Brand Surface Pass

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: execute the N.O.V.A. brand surface pass.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/01-brand-surface-pass.md
- docs/micro-prds/00-inventory-and-naming-contract.md (if already completed)

Goal:
Move user-visible and repo-visible branding from Nano AI to N.O.V.A. while avoiding high-risk identifiers.

Scope:
- README
- user-visible app strings
- public/support-facing copy where applicable

Do not touch:
- app.json slug/scheme/bundle/package identifiers
- storage keys
- migration compatibility logic

Output requirements:
- small, clean diff
- list any intentionally retained Nano strings
- include validation notes and screenshot targets
```

---

## Prompt C — Phase 02 Safe Internal Naming Normalization

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: execute safe internal naming normalization for the N.O.V.A. migration.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/02-safe-internal-naming-normalization.md
- docs/micro-prds/00-inventory-and-naming-contract.md (if available)

Goal:
Normalize low-risk internal names toward `nova` in isolated seams.

Scope:
- low-risk helpers
- comments/docs-in-code
- isolated symbol/file renames

Do not touch:
- app.json
- storage keys/namespaces
- analytics/event identifiers unless clearly low-risk and documented
- broad cross-cutting refactors

Output requirements:
- isolated, reviewable changes
- exact seam boundary explained
- build/lint notes if relevant
```

---

## Prompt D — Validation Scaffold / Residue Audit Prep

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: prepare validation scaffolding for the N.O.V.A. identity migration.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/05-validation-artifacts-and-cleanup.md

Goal:
Set up the proof framework without touching runtime logic.

Deliverables:
- validation checklist for fresh install and upgrade
- screenshot/artifact capture plan
- residue audit approach (grep/report/checklist)
- suggested artifact folder structure

Do not touch:
- runtime code
- app config
- storage logic

Output requirements:
- docs-only or script-light changes
- clear artifact plan for later phases
```

---

## Prompt E — Phase 03 Persistence + Compatibility Layer

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: implement the N.O.V.A. persistence and compatibility layer.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/03-persistence-and-compatibility-layer.md
- completed inventory outputs from phase 00

Goal:
Preserve upgrade continuity if storage keys/namespaces change.

Requirements:
- read-old/write-new where necessary
- document every changed key
- avoid unrelated persistence refactors
- keep rollback implications explicit

Do not touch:
- release identifiers unless strictly necessary and documented
- unrelated UI branding work

Output requirements:
- focused compatibility diff
- migration table for changed keys
- test notes for fresh install + upgrade behavior
```

---

## Prompt F — Phase 04 Release Identity Decisions

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: evaluate and implement only justified high-risk release identity changes for the N.O.V.A. migration.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/04-release-identity-decisions.md
- completed inventory outputs

Goal:
Produce a decision matrix for slug, scheme, iOS bundle identifier, and Android package, then implement only approved changes.

Requirements:
- justify each keep/change decision
- document release/build consequences
- include rollback notes before merge

Do not touch:
- unrelated runtime refactors
- broad branding changes already covered by earlier phases

Output requirements:
- explicit decision matrix
- minimal config diff
- build/install validation notes
```

---

## Prompt G — Phase 05 Validation / Cleanup

```text
Work in /home/eulices/.openclaw/workspace/nano-ai.

Task: complete validation and cleanup for the N.O.V.A. identity migration.

Read first:
- PRD.md
- DESIGN.md
- docs/micro-prds/05-validation-artifacts-and-cleanup.md
- outputs from prior phases

Goal:
Prove fresh install and upgrade continuity, capture artifacts, and remove safe dead residue.

Requirements:
- verify user-visible identity consistency
- verify upgrade continuity
- document any intentionally retained legacy identifiers
- keep cleanup low-risk and reviewable

Output requirements:
- final validation summary
- artifact list/screenshots checklist
- cleanup notes
```

---

## 6. Recommended Initial Parallel Batch

If you want the cleanest first fan-out, start with:
1. **Lead/main:** Phase 00 inventory contract
2. **Subagent A:** Phase 01 brand surface pass prep (read-only until 00 findings confirmed)
3. **Subagent B:** Phase 02 safe internal naming seam discovery
4. **Subagent C:** validation scaffold prep

Then promote A/B/C to write mode once Phase 00 is locked.

---

## 7. My Recommendation

Best execution shape:
- finish **Phase 00** first in one tight PR
- then run **01 + 02 + validation scaffold** in parallel
- then do **03** solo
- then treat **04** as an explicit leadership decision point
- close with **05** as proof, not vibes

That gives you parallel speed without turning identity migration into a merge-conflict swamp.