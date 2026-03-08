# Phase 3 — Platform Hardening (iPad + Navigation + Stability)

## Focus
- Better large-screen behavior (iPad)
- Navigation ergonomics
- Runtime stability/perf hygiene

## Implemented in this phase
- iPad/large-screen orientation policy moved from forced portrait to default platform orientation.
  - `app.json`: `orientation` changed to `default`.
- Drawer width now adapts to screen width with sane min/max bounds for large screens.
  - `app/index.tsx`: dynamic width based on current window dimensions.
- Message rendering keys now derive from message timestamp + index instead of index-only.
  - Improves reconciliation stability during streaming updates.

## Remaining hardening (future)
- Dedicated iPad layout mode (split view/sidebar first-class pattern).
- FlatList migration for very long chat histories.
- Device-matrix QA pass (small iPhone, large iPhone, iPad portrait/landscape).
