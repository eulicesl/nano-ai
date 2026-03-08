# Apple-Level Production Readiness Plan (Senior Workflow)

## Phase 1 — Apple Review Blockers (Accessibility + Interaction Safety)

### Goals
- Ensure all primary controls meet Apple HIG ergonomics/accessibility baseline.
- Remove high-risk interaction inconsistencies before deeper polish.

### Workstreams
1. **Touch targets**
   - Raise icon-only controls to >=44x44pt equivalent.
2. **Accessibility semantics**
   - Add labels/hints/roles to icon-only controls in primary flows.
3. **Haptic policy**
   - Remove global haptics from all button presses.
   - Keep haptics only for meaningful high-intent actions.
4. **Visual safety**
   - Replace hardcoded non-semantic text colors in core states.
   - Remove baseline/offset hacks for inline links.

### Exit Criteria
- Accessibility audit of core chat/settings flow passes.
- Tap-target audit passes on small and large iPhone sizes.
- No hardcoded non-semantic contrast token in critical UI.

---

## Phase 2 — Apple UX Polish (Copy + Hierarchy + Dialogs)

### Goals
- Raise interaction and language quality to “senior iOS app” level.

### Workstreams
1. **Microcopy standardization**
   - Consistent status/action wording (e.g., “Thinking…”).
2. **Destructive action language**
   - Use concise iOS-style confirmations and hierarchy.
3. **Typography hierarchy**
   - Improve legibility and hierarchy for metadata/secondary text.
4. **Layout rhythm refinement**
   - Tighten spacing and control rhythm in header + composer.

### Exit Criteria
- UI copy style guide applied to all primary screens.
- Destructive flows are clear and minimally verbose.
- Visual pass approved in light and dark modes.

---

## Phase 3 — Platform Hardening (iPad + Navigation + Perf)

### Goals
- Complete production quality for Apple ecosystem breadth.

### Workstreams
1. **Navigation strategy review**
   - Evaluate iPhone/iPad-native patterns vs persistent drawer model.
2. **iPad behavior**
   - Align `supportsTablet` behavior with orientation/layout decisions.
3. **Performance and responsiveness**
   - Validate startup, scroll performance, and interaction latency.
4. **Release hardening**
   - Final QA matrix and release checklist.

### Exit Criteria
- iPhone + iPad QA matrix passes.
- No major HIG deviations in core flows.
- Release checklist signed off.

---

## Senior Engineer Workflow Rules

1. Work is tracked by issue -> branch -> PR -> review -> merge.
2. Each PR must include:
   - problem statement
   - HIG rule/UX principle addressed
   - before/after screenshots
   - test notes + rollback notes
3. Keep PRs small and single-purpose.
4. Re-validate against Apple HIG after each phase before proceeding.
