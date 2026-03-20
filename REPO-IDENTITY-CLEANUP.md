# N.O.V.A. Repo Identity Cleanup Plan

**Project:** N.O.V.A.
**Purpose:** Final high-signal cleanup of canonical repository identity
**Last Updated:** 2026-03-20
**Related:** `ORIGINALITY-AUDIT.md`, `OWNERSHIP-MIGRATION.md`, `POST-MERGE-VALIDATION-RUNBOOK.md`

---

## 1. Why this matters

At this point, the app/runtime identity has largely been moved to N.O.V.A.

The highest-signal remaining legacy surface is the **canonical repo identity**:
- current origin: `https://github.com/eulicesl/nano-ai.git`
- app constant: `https://github.com/eulicesl/nano-ai`

That means an outsider can still read the project as:
- “the app is N.O.V.A., but the repo is still Nano-era”

If you want the work to feel fully authored and internally coherent, the repo identity should eventually align too.

---

## 2. Goal

Move from a transitional canonical repo identity:
- `eulicesl/nano-ai`

to a N.O.V.A.-aligned canonical repo identity.

Examples:
- `eulicesl/nova`
- `eulicesl/nova-ai`
- another N.O.V.A.-aligned name you prefer

---

## 3. Recommended target

My recommendation:
- **repo name:** `nova`

Why:
- shortest
- strongest product identity
- clean URL
- matches slug/package direction already moving toward `nova`

If you want a more descriptive but slightly weaker product URL, second choice:
- `nova-ai`

---

## 4. Scope

## In scope
- rename GitHub repo
- update local git remote URLs
- update `PROJECT_GITHUB_URL`
- update any docs that point to the canonical repo URL
- run a residue pass for `eulicesl/nano-ai`

## Out of scope
- changing upstream remote
- removing upstream lineage references where historically useful
- broad unrelated docs cleanup

---

## 5. Order of operations

## Step 1 — Choose final repo name
Pick one:
- `nova`
- `nova-ai`
- custom

## Step 2 — Rename the GitHub repo
This is an external action and should be intentional.

## Step 3 — Update local remotes
After rename, verify:
- `origin` points to new repo
- `upstream` remains whatever you want for lineage/reference

## Step 4 — Update in-repo canonical references
At minimum:
- `lib/constants.ts`
- any README/docs references to the repo URL

## Step 5 — Residue audit
Search for:
- `eulicesl/nano-ai`
- `github.com/eulicesl/nano-ai`

Then classify hits as:
- intentional historical reference
- stale canonical repo reference

---

## 6. Risk notes

### Low technical risk
Repo renaming is lower risk than the bundle/package cutover you already merged.

### Main risks
- stale remote URLs locally
- stale docs links
- stale in-app repo links
- external bookmarks or references needing redirect awareness

### Good news
GitHub usually redirects renamed repo URLs, so this is mostly an authorship/coherence cleanup rather than a runtime-risk migration.

---

## 7. Definition of done

Repo identity cleanup is complete when:
- canonical repo name is N.O.V.A.-aligned
- `PROJECT_GITHUB_URL` points to the new repo
- origin remote is updated
- no stale canonical `eulicesl/nano-ai` references remain except intentional historical mentions

---

## 8. Recommended next action

Reply with the repo name you want.

Recommended:
- `nova`

Second choice:
- `nova-ai`

Once you choose it, the next sequence is:
1. rename repo
2. update remotes/constants
3. run final residue sweep
4. declare the repo identity migration finished
