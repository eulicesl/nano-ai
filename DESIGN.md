# N.O.V.A. Identity Migration Design

**Project:** Nano AI → N.O.V.A.
**Purpose:** Engineering design for a safe, phased identity migration
**Related:** `PRD.md`, `docs/micro-prds/`, `docs/APPLE_PRODUCTION_PLAN.md`

---

## 1. Design Intent

This migration is designed to convert Nano AI into **N.O.V.A.** without destabilizing:
- persistence
- release configuration
- update continuity
- developer workflow

The architecture of this work is intentionally phase-based so subagents can execute in parallel where seams are stable.

---

## 2. Canonical Naming Contract

These names must be used consistently:

### Public product name
- `N.O.V.A.`

### Plain-text fallback
Use `NOVA` when punctuation creates awkwardness in:
- variable names in docs examples
- URL/title constraints
- store metadata constraints
- filename slugging

### Internal slug target
- `nova`

### Legacy name
- `Nano AI` / `nano-ai`
- legacy-only after migration starts
- allowed only where compatibility or external continuity requires it

---

## 3. Identity Surface Model

All migration work must classify each identity-bearing surface into one of four buckets.

### Bucket A — Purely visual / user-facing
Examples:
- app display name
- in-app strings
- README headings
- screenshots
- support copy

**Risk:** low  
**Migration posture:** early

### Bucket B — Developer-facing but low runtime risk
Examples:
- file names
- component names
- docs references
- comments
- package display labels that do not affect runtime identity

**Risk:** low to medium  
**Migration posture:** after surface contract is locked

### Bucket C — Runtime/persistence compatibility surfaces
Examples:
- AsyncStorage keys
- local settings namespaces
- import/export keys
- analytics event names if consumed externally

**Risk:** medium to high  
**Migration posture:** only with explicit compatibility logic

### Bucket D — Platform/release identity surfaces
Examples:
- Expo slug
- URL scheme
- iOS bundle identifier
- Android package
- EAS/release assumptions
- store listing metadata with upgrade implications

**Risk:** high  
**Migration posture:** explicit go/no-go only

---

## 4. System Areas Likely to Change

## 4.1 Config surfaces
- `app.json`
- `package.json`
- app metadata assets

## 4.2 Product/documentation surfaces
- `README.md`
- support/privacy-facing text where relevant
- screenshots/assets references
- docs folder planning docs

## 4.3 App UI surfaces
- titles
- onboarding copy
- settings/about labels
- header/footer branding
- share/export labels if present

## 4.4 Persistence surfaces
Likely in:
- storage helpers
- settings stores
- chat/session persistence logic
- cached preferences

## 4.5 Build/release surfaces
- Expo scheme/slug
- iOS bundle identifier
- Android package
- icon/splash names if identity-sensitive

---

## 5. Migration Architecture

## 5.1 Phase ordering
The migration should follow this order:

1. **Inventory and naming contract**
2. **Brand surface migration**
3. **Internal naming normalization**
4. **Compatibility layer for persistence**
5. **High-risk identifier decision phase**
6. **Validation and cleanup**

This ordering keeps the first visible win low-risk while delaying the expensive decisions until after the repo has clarity.

## 5.2 Compatibility policy
Where old state may exist:
- read legacy key first if new key missing
- normalize value to canonical model
- write back using new canonical key when safe
- optionally retain old key for one phase if rollback risk is high

### Rule
Never ship a migration that writes only new keys if existing installs still depend on old keys and no read-fallback exists.

## 5.3 Rename policy
There are three rename types:

### Type 1 — Display-only rename
Change visible strings only.

### Type 2 — Safe internal rename
Rename code symbols/files with no persistence or release impact.

### Type 3 — Identity-critical rename
Rename slugs, schemes, bundle IDs, package IDs, or storage namespaces.

**Only Type 1 and selected Type 2 renames should happen early.**

---

## 6. Persistence Design

## 6.1 Principle
Persistence migration must be **backward-readable** before it becomes forward-only.

## 6.2 Expected migration pattern
For any storage key change:

```text
read(newKey)
→ if missing, read(oldKey)
→ if found, normalize and adopt
→ write(newKey)
→ optionally keep/remove oldKey based on rollout policy
```

## 6.3 Required persistence notes per changed key
Each changed persistence surface must document:
- old key
- new key
- read fallback behavior
- write behavior
- rollback implications

---

## 7. Release Identity Decision Framework

Not every legacy identifier should change.

### 7.1 Change only if one of these is true
- users directly see it
- store/distribution credibility materially depends on it
- future engineering cost of keeping it is high
- current identifier is actively harmful/confusing

### 7.2 Prefer keeping legacy identifiers if
- changing them risks install/update continuity
- they are invisible to users
- they are expensive to migrate for low value
- they are entangled with release tooling

### 7.3 High-risk decision checklist
Before changing slug/scheme/bundle/package:
- what user benefit does this unlock?
- what continuity risks does it create?
- what toolchain/store assumptions depend on it?
- can we stage the change later instead?

---

## 8. Subagent Parallelization Design

Parallel work is allowed only across seams with low conflict probability.

## Good seams

### Seam A — Docs and external brand copy
- README
- PRD/design/micro-PRDs
- support text
- screenshot plan

### Seam B — In-app visible copy
- titles/labels/about/settings text
- non-config UI branding

### Seam C — Safe internal refactors
- isolated file/type renames
- helper names
- comments/docs-in-code

### Seam D — Validation/artifact work
- screenshot capture plan
- upgrade test checklist
- build notes and release verification docs

## Bad seams
- two agents editing `app.json`
- two agents editing shared storage helpers
- one agent renaming symbols while another changes the same feature flow
- config changes mixed with copy changes in a broad PR

---

## 9. Suggested Execution Topology

### Serial backbone
These should remain serial:
1. naming contract + inventory
2. compatibility-layer contract
3. high-risk identifier decisions

### Parallelizable clusters after contract lock
Once inventory exists, you can run in parallel:
- docs/repo copy pass
- in-app visible copy pass
- asset/screenshot planning pass
- safe internal naming pass in isolated folders
- validation scaffolding pass

### Merge order
1. inventory contract
2. public/docs surfaces
3. in-app surfaces
4. persistence compatibility
5. optional high-risk config changes
6. validation + cleanup

---

## 10. PR Shape and Branching

### Branch naming
Use one of:
- `pr/nova-identity-001-inventory-contract`
- `pr/nova-identity-00x-...`
- `pr/nova-identity-phase-x-...`

### PR requirements
Every PR should include:
- problem statement
- exact boundary of what is being renamed
- what is intentionally not changed
- validation notes
- rollback notes
- screenshots if visible text changed

### Anti-patterns
Do not open PRs titled broadly like:
- `rename everything to nova`
- `branding cleanup`
- `general identity pass`

Those are impossible to review safely.

---

## 11. Validation Architecture

Each phase must specify a minimum proof set.

## 11.1 Brand surface phases
- screenshot(s) of app-visible rename
- README/render proof
- grep-based residue check for intended scope

## 11.2 Persistence phases
- fresh install smoke test
- existing-state migration test
- explicit storage key verification notes

## 11.3 Release identity phases
- build proof
- install/launch proof
- scheme/deeplink proof if modified
- documented rollback path

## 11.4 Suggested artifact root
```text
artifacts/identity-migration/<phase-name>/
```

Capture:
- summary markdown
- screenshots
- grep reports if helpful
- build notes
- upgrade notes

---

## 12. Decision Summary

The engineering posture for this migration is:
- visible N.O.V.A. first
- stable internals second
- compatibility before purity
- risky identifiers only with explicit justification
- parallel work only after contracts are fixed

That is the shortest path to **N.O.V.A. all the way down** without turning the repo into a rollback nightmare.