# Authoring NavUI components

Use `registry/catalog.ts` as the only metadata source. Runtime maps connect its
preview paths to examples; the existing registry pipeline generates distribution.
New NavUI items omit Portfolio provenance. Adapted code retains its MIT notice.

## Neutral visual foundation

Use existing semantic colors and font tokens, in both themes. Standard controls
use text-sm / medium weight, rounded-md, a one-pixel semantic input border,
40px default height, 36px compact height and 44px large height. Icons are 16px;
icon actions are 40px square. Groups use 8–12px gaps; related sections use 24px.
Allow labels to wrap; use minimum heights rather than fixing content height.

Use primary/primary-foreground for the strongest action, background/foreground for
surfaces, muted-foreground for secondary copy and accent for interaction. Focus is
a 2px outline in ring with a 2px offset. Disabled is marked semantically as well as
visually; pending retains focus. Validate contrast in the painted light/dark states.

Keep motion purposeful: CSS for color/fades and tab indicators, Motion for paired
card/media layout and distinctive pointer effects. Gate movement, scale and blur
with reduced motion, including when a preference changes. Do not hide content
until an entrance animation runs. Unique component variants are not design systems.

## UI SDK contract (installed beta.17)

Read `.agents/skills/ui-sdk/SKILL.md`, then the relevant installed docs and public
.d.ts files before changing an interaction. Use documented subpath imports. Keep
SDK behavior intact: refs, render functions, cancellation details, disabled state,
controlled/uncontrolled values, focus and presence. Do not implement a parallel
selection or popup lifecycle in a wrapper. `@layer ui-sdk` stays before Tailwind.

Findings verified against the installed package:

- Dialog and Select roots accept ReactNode children, not state-render callbacks.
  Parts expose render/state callbacks. Package Manager Command uses SelectValue's
  documented value state to render a sibling copy button and trigger without a
  second selection store.
- Select's public options are a single/multiple union even when a generic is supplied.
  Extract the `{ multiple?: false }` branch for a single-selection public wrapper.
- Tabs uses `TabsTab`/`TabsPanel`, `activation`, `data-selected`, and measured
  `--active-tab-*` variables. Radix data-state/activationMode/forceMount do not apply.
- Dialog exit presence is SDK-owned through data-starting-style/data-ending-style.
  Avoid AnimatePresence or a second open store. Use SDK render for a Motion surface.
- CSS indicator geometry is physically measured from the left; keep its left origin
  with --active-tab-left rather than combining that variable with logical start.
- Native Enter-to-click is not implemented by jsdom; the test helper explicitly
  simulates that browser default after an uncanceled Enter keydown on a button.

## Canonical dependencies and source

A composition imports `./button` or `./dialog` and declares `@navui/button` or
`@navui/dialog`, alongside pinned SDK packages. Never use a generic `button` registry
dependency for an SDK composition: that could silently install Base UI or Radix.
Source browsing recursively includes canonical dependencies. Helpers have one
source/target; demos are not registry files. Generated JSON is never hand-edited.

Retire items explicitly in the catalog's retiredComponents list and remove exclusive
files, previews, assets and payloads. Redirect only an equivalent replacement.
Do not change retained blocks except to keep required imports working.

## Verification and guidance

Run registry:build, check, then build serially. Tests cover behavior wiring and
regressions with the installed version, including cancellation, keyboard, forms,
focus return and reduced motion. Use a real disposable shadcn consumer, configured
with a local @navui namespace, for reference components and their compositions.
Use one dev server and close temporary validation processes afterward.

Guidance used: installed ui-sdk and shadcn; installed design-better and its source
index/quality gates; retrieved Interfaces accessibility, layout, typography, motion
and interface-review instructions with focused keyboard, motion/zoom, adaptivity,
layout-animation and review-scope references. These extend the repository's tokens
and conventions; they do not authorize unrelated work or override installed SDK APIs.

## Form collection (beta.17)

Use canonical Field/Input/Select/Checkbox/Switch from `registry/components`. Field
owns label, description and error associations; one control belongs to each Field.
FieldGroup supplies spacing, while FieldSet and its first-child FieldLegend give
related controls a native group. Keep validation messages and policy in examples.
Inputs retain 16px text on narrow screens to avoid iOS focus zoom, and 14px on desktop.
Checkbox/Switch have an enlarged pointer area without changing their visual size.

Select's generic root is re-exported directly; SelectItem retains its value generic.
Single selection uses `T | null`, multiple uses `T[]`. Keep items on the root for
server-rendered labels and render styled items in SelectGroup. Content bounds its
height to available space and 20rem; long labels wrap in options and truncate only
in the trigger. Canonical parts also power Package Manager Command.

A focused reproduction found a beta.17 documentation/runtime mismatch: the Forms
page recommends controlled `checked` plus `defaultChecked`, but development runtime
warns when both are supplied (same for Select value/defaultValue). Input also causes
React's controlled/defaultValue warning. Our wrappers preserve SDK public props;
examples pass one state mode, reset controlled React state in the consuming form's
onReset, and leave the native reset event uncanceled. Uncontrolled defaults reset
through SDK. Do not suppress these warnings or invent another reset engine.

See `docs/form-components.md` and `pnpm run consumer:verify` for the runtime-controlled
baseline/install comparison. Browser reduced-motion verification is distinct from
the jsdom matchMedia stub; report a missing browser preference check explicitly.
