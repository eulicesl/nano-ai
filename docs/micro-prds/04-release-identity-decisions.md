# Micro-PRD 04 — Release Identity Decisions

**Phase:** 4  
**Status:** Decisioned / ready for future PR execution  
**Depends on:** `00-INVENTORY.md`, `03-persistence-and-compatibility-layer.md`  
**Primary Goal:** lock the go/no-go decisions for high-risk platform identity surfaces before any runtime/config PR touches them.

---

## 1. Executive Decision Summary

The correct posture for the next release window is:

- **keep** the current **Expo slug** for now
- **keep** the current **primary app URL scheme** for now
- **defer then change** the **iOS bundle identifier** only when store/update continuity is explicitly understood
- **defer then change** the **Android package name** only when Play/installer continuity is explicitly understood
- **change later in the same release-identity phase** the **widget app-group identifier**, but only as part of a coordinated iOS identity migration
- **keep current deeplink scheme behavior for now**, with a forward plan to support a future `nova://` alias before any primary-scheme cutover

### Why
The display identity is already `N.O.V.A.` in `app.json`, while the platform/runtime identity still carries:
- `slug: nano-ai`
- `scheme: nano-ai`
- `ios.bundleIdentifier: com.anonymous.nano-ai`
- `android.package: com.anonymous.nanoai`
- widget app group: `group.com.anonymous.nano-ai`
- live-activity deeplink: `nano-ai://...`

That means the app is already in the ideal **phased migration posture**:
- visible product identity can move first
- release-critical identity can remain stable until explicitly migrated

This is the senior move. Changing everything now would optimize for purity instead of continuity.

---

## 2. Current State Snapshot

### Confirmed current values
From the repo as of this decision:

| Surface | Current Value | Source |
| --- | --- | --- |
| Expo display name | `N.O.V.A.` | `app.json` |
| Expo slug | `nano-ai` | `app.json` |
| Primary app scheme | `nano-ai` | `app.json`, `lib/constants.ts` |
| iOS bundle identifier | `com.anonymous.nano-ai` | `app.json` |
| Android package | `com.anonymous.nanoai` | `app.json` |
| Widget app-group identifier | `group.com.anonymous.nano-ai` | `targets/widget/expo-target.config.js`, `targets/widget/generated.entitlements` |
| Live Activity deeplink | `nano-ai://?from=dynamic-island&action=stop-live-activity` | `targets/widget/WidgetLiveActivity.swift` |
| npm package name | `nano-ai` | `package.json` |

### Important observation
This repo’s **user-visible identity** and **release/runtime identity** are already intentionally separated.
That is not a bug right now. It is a useful staging state.

---

## 3. Decision Matrix

| Surface | Decision | Recommendation | Rationale |
| --- | --- | --- | --- |
| Expo slug | **KEEP now** | keep current value in next release | High blast radius, low user value, likely entangled with EAS/project/update assumptions |
| Primary app URL scheme | **KEEP now** | keep `nano-ai` as canonical runtime scheme in next release | Changing breaks deep links, widget/live-activity actions, and any external callers unless dual-scheme compatibility is added |
| iOS bundle identifier | **DEFER, then CHANGE intentionally** | target owned identifier later | Strategically worth fixing because `com.anonymous.*` weakens authorship, but too risky to touch casually |
| Android package | **DEFER, then CHANGE intentionally** | target owned identifier later | Same reasoning as iOS; ownership/authorship value is real, but install/update continuity must be proven first |
| Widget app-group identifier | **DEFER, then CHANGE with iOS identifier migration** | do not change standalone; migrate together with iOS release identity work | Shared-state/app-group changes can break widget continuity and should be versioned with iOS identity work, not earlier |
| Deeplink scheme | **KEEP now; ADD alias before future cutover** | keep `nano-ai://` working; later introduce `nova://` as additive alias before any default switch | Lowest-risk migration path is compatibility-first, not replacement-first |

---

## 4. Concrete Identifier Recommendations

## 4.1 Expo slug

### Current
- `nano-ai`

### Decision
- **KEEP**

### Why
The Expo slug is mostly an infrastructure/distribution identity surface, not a user-trust surface. Users do not meaningfully experience value from a slug rename, but the project may pay real cost if it is tied to:
- Expo project identity
- EAS update/build assumptions
- dashboard/project linkage
- release automation or project ownership metadata

### Blast radius
Potentially affects:
- Expo/EAS project continuity
- OTA/update associations
- CI/release docs
- any tooling/scripts keyed to slug

### Migration risk
- **Medium to high**, with **low direct user upside**

### Recommendation
- Keep `slug: nano-ai` through the current N.O.V.A. identity release sequence.
- Revisit only after the app is otherwise stable and build/release ownership is documented.

### Preferred sequencing
1. Finish visible N.O.V.A. migration
2. Validate release pipeline under current slug
3. Only then decide whether a slug change buys enough value to justify disruption

---

## 4.2 Primary app URL scheme

### Current
- `nano-ai`

### Decision
- **KEEP** for the next release

### Why
This is a real runtime surface, not just metadata. It is currently referenced in:
- `app.json`
- `lib/constants.ts`
- `targets/widget/WidgetLiveActivity.swift`

The widget/live-activity stop action already depends on:
- `nano-ai://?from=dynamic-island&action=stop-live-activity`

If the scheme changes outright, any of the following can break:
- Dynamic Island / Live Activity action routing
- future automation shortcuts or external launches
- internal routing assumptions
- backward compatibility for existing integrations/tests

### Blast radius
A scheme change touches:
- app config
- iOS runtime behavior
- widget/live-activity deeplink actions
- any route handlers or parsing logic
- possible docs/QA automation

### Migration risk
- **High**, because it is externally callable runtime behavior

### Recommendation
- Keep `nano-ai` as the **primary canonical runtime scheme** for now.
- Do **not** replace it in the immediate Phase 04 PR.

### Preferred future migration shape
If later changing:
1. add support for `nova://` first
2. keep `nano-ai://` working as a compatibility alias
3. update internal constants and docs to prefer `nova://`
4. after at least one stable compatibility phase, decide whether `nano-ai://` can ever be retired

That is the only migration posture that respects continuity.

---

## 4.3 iOS bundle identifier

### Current
- `com.anonymous.nano-ai`

### Decision
- **DEFER now, but strategically CHANGE later**

### Why
This is the strongest authorship/credibility problem in the current release identity stack.

`com.anonymous.nano-ai` is bad for a maintained product because it signals:
- temporary ownership
- weak publisher identity
- fork/prototype posture rather than authored app posture

So unlike the slug, the bundle ID is **worth fixing eventually**.

But changing it is also one of the most dangerous release moves because iOS bundle identifiers influence:
- app identity in Apple’s ecosystem
- install/update continuity
- push/capability/provisioning assumptions
- associated entitlements/capabilities
- widget target relationships

### Blast radius
Potentially affects:
- App Store / TestFlight continuity
- upgrade path for existing installs
- provisioning/certificates/capabilities
- any associated targets/extensions
- widget and app-group alignment

### Migration risk
- **High to very high**

### Recommendation
- Do **not** change bundle ID in the first release-identity PR unless there is explicit confirmation that continuity expectations allow it.
- Create a dedicated later PR for iOS owned-identity migration.

### Preferred target
Use an owned, stable publisher namespace. The exact org root should reflect Eulices’s long-term product namespace, but structurally the target should look like:
- `com.<owned-namespace>.nova`

Examples of acceptable shape:
- `com.eulices.nova`
- `com.eulicesl.nova`
- `ai.nova.app` style only if that namespace is truly intended and controllable

### Preferred sequencing
1. decide owned publisher namespace once
2. validate Apple continuity constraints
3. migrate bundle ID and widget/app-group surfaces together
4. run explicit install/upgrade verification

---

## 4.4 Android package

### Current
- `com.anonymous.nanoai`

### Decision
- **DEFER now, but strategically CHANGE later**

### Why
This has the same authorship problem as iOS: `com.anonymous.*` makes the app feel provisional.

It is worth fixing, but not casually.

Android package changes can affect:
- app identity in Play/internal distribution
- install/update continuity
- signing/release process assumptions
- platform service integrations if added later

### Blast radius
Potentially affects:
- installer recognition of upgrades
- release/signing automation
- Play Console identity continuity
- Android-specific deep link or manifest assumptions later

### Migration risk
- **High**

### Recommendation
- Do not change in the immediate N.O.V.A. identity cleanup PR.
- Handle as a dedicated release-identity migration once continuity expectations are verified.

### Preferred target
Use a stable owned namespace aligned with iOS:
- `com.<owned-namespace>.nova`

Preferred pattern: keep iOS and Android rooted in the same publisher identity unless there is a strong reason not to.

### Preferred sequencing
1. choose owned publisher namespace
2. check Android distribution/update implications
3. migrate package name in a dedicated release PR
4. validate clean install + upgrade path intentionally

---

## 4.5 Widget app-group identifier

### Current
- `group.com.anonymous.nano-ai`

### Decision
- **DEFER now; CHANGE only with coordinated iOS identity migration**

### Why
This is not just naming. It is a shared-state entitlement boundary.

If changed independently from broader iOS identity work, it can break:
- widget shared storage assumptions
- entitlement alignment
- extension/app communication
- rollout/debugging clarity

### Blast radius
Touches:
- widget entitlement config
- generated entitlements
- iOS app/target alignment
- shared-state continuity if currently used

### Migration risk
- **High**, especially if changed without validating existing widget data/state behavior

### Recommendation
- Do not change in isolation.
- When bundle ID migration happens, move app-group identity in the same PR/phase.

### Preferred target
- `group.com.<owned-namespace>.nova`

### Preferred sequencing
1. lock iOS bundle identifier target
2. update widget app-group to same owned namespace family
3. regenerate/revalidate entitlements
4. test widget + live activity end-to-end

---

## 4.6 Deeplink scheme

### Current
- live activity uses `nano-ai://...`

### Decision
- **KEEP current scheme behavior now**
- **future migration should be additive first**

### Why
The deeplink scheme is effectively a runtime contract. Even if the app’s visible name is N.O.V.A., the currently deployed mechanism appears to rely on `nano-ai://`.

The best migration posture is:
- keep old contract working
- add new contract
- prefer new contract in docs/internal code later

Not:
- switch contract abruptly and hope nothing depends on it

### Blast radius
Affects:
- widget stop action
- route handling
- possible future external automation/Shortcuts integrations
- QA scripts or docs

### Migration risk
- **High**, but manageable if handled as an additive compatibility move

### Recommendation
- In the near term, keep `nano-ai://` working exactly as-is.
- In a future PR, introduce `nova://` as an alias if the framework/platform supports dual-scheme handling cleanly.

### Preferred sequencing
1. retain `nano-ai://`
2. add `nova://` support
3. update internal references to prefer `nova://`
4. keep old scheme indefinitely unless there is a compelling reason to remove it

---

## 5. Proposed Owned Targets

These should be treated as **provisional target shapes**, not approved config changes yet.

| Surface | Current | Preferred Future Shape |
| --- | --- | --- |
| Expo slug | `nano-ai` | likely still `nano-ai` unless later tooling review justifies change |
| Primary app scheme | `nano-ai` | additive future alias: `nova` |
| iOS bundle ID | `com.anonymous.nano-ai` | `com.<owned-namespace>.nova` |
| Android package | `com.anonymous.nanoai` | `com.<owned-namespace>.nova` |
| Widget app-group | `group.com.anonymous.nano-ai` | `group.com.<owned-namespace>.nova` |
| Deeplink scheme | `nano-ai://` | support `nova://` before any primary cutover |

### Namespace guidance
Use **one long-term owned publisher namespace** across iOS, Android, and widget identities.
Do not invent multiple roots unless there is a legal or organizational reason.

---

## 6. Preferred Sequencing for Future PRs

## Sequence A — safe now
1. keep all current release identifiers stable
2. complete visible brand migration and originality work
3. validate builds and install behavior under current release identity

## Sequence B — compatibility-first runtime identity
4. if desired, add `nova://` deeplink alias while preserving `nano-ai://`
5. prove routing/widget/live-activity behavior under both paths

## Sequence C — owned publisher identity migration
6. choose final owned namespace
7. migrate iOS bundle ID and widget app-group together
8. migrate Android package in same broader phase or an adjacent dedicated PR
9. validate fresh install, upgrade expectations, and release tooling

## Sequence D — optional infrastructure cleanup
10. reconsider Expo slug only after all higher-value identity work is complete

---

## 7. Blast-Radius Ranking

From highest strategic caution to lowest:

1. **iOS bundle identifier**
2. **Android package name**
3. **widget app-group identifier**
4. **primary app URL scheme / deeplink contract**
5. **Expo slug**

### Important nuance
The slug is not necessarily technically safest, but it has the **worst value-to-risk ratio**. That is why it should remain unchanged the longest unless concrete tooling evidence proves it is cheap.

---

## 8. Go / No-Go Calls

## Go now
- document all decisions
- keep release identifiers stable in current release window
- plan owned publisher namespace
- optionally design dual-scheme compatibility for a future PR

## No-go now
- no immediate bundle/package flip
- no standalone widget app-group change
- no abrupt `nano-ai://` → `nova://` replacement
- no slug change just for aesthetic purity

---

## 9. Validation Requirements for Future Execution PRs

Any PR that changes one of these surfaces must include:

### For slug changes
- Expo/EAS continuity notes
- build proof
- release automation impact notes
- rollback plan

### For scheme/deeplink changes
- route handling proof
- live-activity stop action proof
- backward compatibility notes
- explicit list of accepted schemes

### For iOS bundle/app-group changes
- provisioning/capability notes
- widget entitlement validation
- install/upgrade expectations
- TestFlight/App Store continuity notes
- rollback constraints documented up front

### For Android package changes
- signing/distribution notes
- install/upgrade expectations
- artifact proof
- rollback constraints documented up front

---

## 10. Final Recommendation

For the next N.O.V.A. migration PR series:

- **KEEP**: Expo slug
- **KEEP**: primary runtime scheme
- **KEEP**: current deeplink behavior
- **DEFER THEN CHANGE**: iOS bundle identifier
- **DEFER THEN CHANGE**: Android package
- **DEFER THEN CHANGE WITH iOS**: widget app-group identifier
- **FUTURE ADDITIVE CHANGE**: `nova://` deeplink alias

If forced to summarize in one sentence:

> Ship N.O.V.A. as the user-facing product now, preserve legacy runtime identity where continuity matters, and only migrate owned publisher identifiers in a dedicated, evidence-backed release phase.

That is the cleanest path to a future PR that feels senior, safe, and intentional.
