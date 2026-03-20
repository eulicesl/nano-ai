# Visible Brand Verification Checklist

## Goal
Audit the intended user-visible surfaces and confirm the product now reads as `N.O.V.A.` consistently.

## Canonical naming contract
- public product name: `N.O.V.A.`
- plain-text fallback: `NOVA`
- legacy visible `Nano AI` should be treated as residue unless explicitly documented

## Surfaces to verify

### App surfaces
- app display name
- launch / landing header
- settings/about/help text
- privacy/support references reachable in-app
- any onboarding or empty states encountered during smoke test

### Repo / docs surfaces
- `README.md`
- `PRIVACY`
- screenshots and caption text if updated

### Platform-facing visible metadata
- Expo display name / installed app label
- any store-facing draft copy when available

## Verification method
1. Review intended surfaces one by one.
2. Capture screenshot or text evidence for each changed surface.
3. Mark each surface as:
   - pass
   - pass with intentional legacy retention
   - fail
4. For failures, classify whether the residue is:
   - user-visible and must be fixed now
   - hidden / release-critical and should move to a later decision gate

## Pass criteria
- Primary user-visible surfaces consistently say `N.O.V.A.` or approved `NOVA`
- No accidental mixed-brand experience remains in the scoped surfaces
- Any remaining legacy identifier is documented with rationale

## Suggested output table
| Surface | Evidence | Status | Notes |
| --- | --- | --- | --- |
| App header | screenshot | pass | `N.O.V.A.` visible |
| Expo display name | screenshot | pass | install label updated |
| README title | screenshot/text | pass | repo presents N.O.V.A. |
| URL scheme | config note | intentional legacy retention | hidden, deferred to Phase 04 |
