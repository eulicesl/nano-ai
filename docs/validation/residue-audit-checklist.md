# Residue Audit Checklist

## Goal
Find and classify remaining `Nano AI` / `nano-ai` residue after scoped migration work.

## Audit rules
- Distinguish visible residue from hidden compatibility residue.
- Do not treat every legacy string as a bug; some identifiers are intentionally retained for continuity.
- Log exact file/path evidence so cleanup can be reviewable.

## Search targets
- `Nano AI`
- `nano-ai`
- `Nano` where context suggests product branding

## Suggested commands
```bash
rg -n "Nano AI|nano-ai|\bNano\b" app components lib docs README.md PRIVACY app.json package.json targets
```

For a tighter visible-surface pass:
```bash
rg -n "Nano AI|\bNano\b" app components README.md PRIVACY docs
```

## Classification buckets

### Bucket 1 — Must remove now
Visible product-brand residue in scoped migration surfaces.
Examples:
- app header text
- README title/body
- privacy/support copy

### Bucket 2 — Defer intentionally
High-risk or continuity-sensitive identifiers retained on purpose.
Examples:
- Expo slug
- URL scheme
- iOS bundle identifier
- Android package
- widget app-group identifiers

### Bucket 3 — Needs decision
Ambiguous surfaces that might be attribution, fork history, or real residue.
Examples:
- upstream GitHub URL constants
- legal copyright strings

## Output expectations
Produce:
- a short `report.md`
- optional raw grep output
- a final list of intentional legacy identifiers still remaining

## Pass criteria
- no unclassified legacy residue remains in the audited scope
- visible residue is either fixed or explicitly logged as follow-up
- retained legacy identifiers are documented with rationale
