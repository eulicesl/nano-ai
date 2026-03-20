# Phase 02A — Internal Naming Seam Discovery for N.O.V.A.

**Phase:** 2  
**Status:** Discovery complete  
**Related:** `../../PRD.md`, `../../DESIGN.md`, `../../ORIGINALITY-AUDIT.md`, `./02-safe-internal-naming-normalization.md`, `./00-INVENTORY.md`

---

## 1. Purpose

This document identifies the **lowest-risk internal seams** for future Nano → NOVA normalization work.

It is intentionally optimized for **parallel PR planning**, not broad mechanical renames.

---

## 2. Blunt finding

The repo currently has **fewer safe internal nano-derived names than expected**.

Most remaining `nano-ai` residue is concentrated in **runtime identity and release-coupled surfaces**, not ordinary helpers/types/files.

That means the safest Phase 02 move is:

1. **document exact seams first**
2. **avoid broad code renames**
3. **split preparatory refactors from identity-critical changes**

---

## 3. What was inspected

Targeted discovery reviewed:

- `PRD.md`
- `DESIGN.md`
- `ORIGINALITY-AUDIT.md`
- `docs/micro-prds/02-safe-internal-naming-normalization.md`
- `docs/micro-prds/00-INVENTORY.md`
- repo grep for `Nano AI`, `nano-ai`, `nano`, `Nano`
- app/runtime files most likely to carry identity constants

Key files sampled:

- `lib/constants.ts`
- `app/index.tsx`
- `app/settings.tsx`
- `app/_layout.tsx`
- `components/drawer-content.tsx`
- `hooks/use-live-activity.ts`
- `store/settings.ts`

---

## 4. Discovery summary

## 4.1 Safe internal rename inventory is small

Outside docs, the main remaining nano-derived runtime references are:

- `lib/constants.ts`
  - `APP_SCHEME = 'nano-ai'`
  - `PROJECT_GITHUB_URL = 'https://github.com/eulicesl/nano-ai'`
- `app.json`
  - slug / scheme / bundle / package
- `targets/widget/*`
  - widget app-group and live-activity deeplink scheme
- `package.json`
  - package name `nano-ai`

These are **not** good candidates for a blind “internal normalization” PR.

## 4.2 Core app code is already mostly brand-neutral

The main app implementation uses neutral names such as:

- `useChats`
- `useMessage`
- `useModel`
- `useSettings`
- `useLiveActivity`
- `DEFAULT_CUSTOM_HOST`
- `STOP_LIVE_ACTIVITY_ACTION_TARGET`

There do **not** appear to be many obvious internal symbols like `nanoSomething`, `NanoFoo`, or `nano-*` filenames in ordinary app/components/hooks/store code.

## 4.3 Remaining code-level nano residue is coupled to decisions, not cleanup

The biggest remaining internal identity points are not mere naming clutter; they are **decision-bearing surfaces**:

- app URL scheme
- canonical GitHub/project URL
- package/runtime identifiers
- widget/deeplink continuity

So the right posture is **seam isolation first, rename later**.

---

## 5. Low-risk seams worth using later

These are the best seams for future normalization work, ordered from safest to least safe.

## Seam A — Docs-only internal naming map

**Risk:** very low  
**Parallelizable:** yes  
**Purpose:** make future renames explicit before code changes start

### Scope

- phase docs
- migration notes
- residue checklists
- mapping tables for legacy → canonical internal names

### Why this seam is good

It creates a shared contract for later PRs without creating merge risk in runtime files.

### Suggested outputs

- deferred residue table
- safe rename allowlist
- explicit do-not-touch list for release/persistence identity

### Example safe files

- `docs/micro-prds/*`
- `OWNERSHIP-MIGRATION.md`
- validation docs

---

## Seam B — Constant-boundary isolation around `lib/constants.ts`

**Risk:** low to medium  
**Parallelizable:** only if nobody else touches settings/runtime identity imports  
**Purpose:** separate safe app metadata/constants from risky identity constants

### Current problem

`lib/constants.ts` mixes:

- risky identity constants
  - `APP_SCHEME`
  - `PROJECT_GITHUB_URL`
- safe operational constants
  - `DEFAULT_CUSTOM_HOST`
  - `OLLAMA_CLOUD_HOST`
  - `OLLAMA_CLOUD_DOCS_LINK`
  - `STOP_LIVE_ACTIVITY_ACTION_TARGET`

### Why this seam matters

As long as these live together, any future rename PR touching constants risks colliding with runtime identity decisions.

### Safe future split

A prep PR could isolate constants into categories such as:

- `lib/runtime-identity.ts`
- `lib/app-links.ts`
- `lib/ollama-constants.ts`

### Important caveat

This is only safe as a **file-organization refactor**, not as an identity rewrite.  
Do **not** change scheme values, repo URL policy, or deep-link behavior in the same PR.

---

## Seam C — Settings/About action naming cleanup after repo-URL policy is decided

**Risk:** low to medium  
**Parallelizable:** limited  
**Purpose:** normalize product/repo wording once canonical repo policy is locked

### Evidence

`app/settings.tsx` contains the user action:

- `View on Github`
- handler using `PROJECT_GITHUB_URL`

### Why this is only conditionally safe

The handler itself is simple, but the **meaning** of the destination is unresolved:

- app-owned canonical repo?
- legacy repo path kept temporarily?
- attribution link vs product homepage?

### Safe work after policy lock

- tighten label casing (`GitHub`)
- rename local handler for clarity
- move link ownership concerns into a dedicated module

### Not safe yet

- changing the destination URL without explicit repo-identity decision

---

## Seam D — Purely local symbol cleanup if touched for other reasons

**Risk:** low  
**Parallelizable:** yes, if isolated by folder  
**Purpose:** opportunistic cleanup only

### Finding

There are very few explicit nano-derived symbols left in app/components/hooks/store.

### Recommendation

Do **not** open a dedicated PR just to rename neutral symbols to more “nova-like” names. That would create churn without identity payoff.

### Valid use

If another scoped PR already touches an isolated file, small local cleanups are fine, such as:

- clarifying handler names
- clarifying constant names
- reducing generic names where obviously beneficial

But this should stay secondary to real identity work.

---

## 6. Seams that look tempting but should stay deferred

## Defer 1 — `APP_SCHEME`

**File:** `lib/constants.ts`  
**Why deferred:** tied to `app.json` scheme and widget deep-link behavior

Do not normalize this to `nova` until Phase 04 identity decisions are approved.

## Defer 2 — `PROJECT_GITHUB_URL`

**File:** `lib/constants.ts`, consumed by `app/settings.tsx`  
**Why deferred:** repo identity is still a product/ownership decision, not a simple internal rename

## Defer 3 — package / slug / bundle / package identifiers

**Files:** `package.json`, `app.json`  
**Why deferred:** release continuity risk

## Defer 4 — widget/app-group/deeplink identifiers

**Files:** `targets/widget/*`  
**Why deferred:** explicitly out of scope for safe internal normalization; coupled to runtime continuity

---

## 7. Recommended PR splits

These are the cleanest future PR shapes for parallel planning.

## PR Split 02A — Discovery + rename map

**Goal:** lock the safe seam plan  
**Type:** docs-only  
**Risk:** very low

### Include

- this seam discovery doc
- explicit allowlist / defer list
- notes on what is actually left to normalize

### Exclude

- any runtime code changes
- any config changes

---

## PR Split 02B — Constant isolation prep

**Goal:** isolate identity-bearing constants from neutral operational constants  
**Type:** internal refactor  
**Risk:** low to medium

### Include

- move constants into narrower files/modules
- update imports only
- preserve exact values/behavior

### Exclude

- changing `APP_SCHEME`
- changing GitHub destination policy
- touching `app.json`
- touching widget targets

### Validation

- typecheck / lint / smoke build
- grep proof that constant values are unchanged

---

## PR Split 02C — Settings/About link cleanup

**Goal:** normalize repo/action wording after canonical repo decision  
**Type:** small UI + local naming pass  
**Risk:** low once policy is settled

### Include

- action label cleanup
- local handler naming cleanup
- optional link-module naming cleanup

### Exclude

- runtime scheme changes
- package/release identity changes

### Dependency

Requires explicit decision on what `PROJECT_GITHUB_URL` should represent.

---

## PR Split 02D — Opportunistic isolated symbol cleanups

**Goal:** pick off tiny local cleanups only where another PR already has the file open  
**Type:** opportunistic refactor  
**Risk:** low

### Include

- local non-behavioral naming cleanup in one isolated file/folder
- comments/docs-in-code updates

### Exclude

- cross-cutting renames
- file graph churn across many imports
- anything marketed as “rename everything internally”

---

## 8. Parallelization guidance

## Good parallel combinations

- **02A docs discovery** + **validation docs work**
- **02B constant isolation prep** + **README/ownership docs work**
- **02C settings/about wording cleanup** + **separate isolated app copy work**

## Bad parallel combinations

- two PRs both touching `lib/constants.ts`
- any Phase 02 PR touching `app.json`
- Phase 02 PR touching `targets/widget/*`
- one PR changing repo URL policy while another updates settings action wiring

---

## 9. Recommended do-not-touch list for Phase 02 safe work

For the internal normalization lane, keep these out of scope:

- `app.json`
- `package.json`
- `lib/local-storage.ts`
- `store/chats.ts`
- `store/settings.ts` storage behavior
- `targets/widget/*`
- bundle/package/scheme/app-group identifiers

---

## 10. Practical conclusion

There is **not** a strong case for a broad internal rename PR right now.

The repo’s remaining nano-derived internal residue is concentrated in:

- release identity
- runtime identity
- repo ownership linkage
- widget/deeplink continuity

So the best senior-engineer move is:

1. treat Phase 02 primarily as **seam isolation + documentation**
2. only do tiny low-risk code prep where value is clear
3. defer true identity-bearing renames to later decision-gated phases

That keeps the migration honest, parallelizable, and safe.
