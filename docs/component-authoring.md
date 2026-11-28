# Authoring NavUI components

Use `registry/catalog.ts` as the only metadata source. Runtime maps connect its
preview paths to examples; the existing registry pipeline generates distribution.
New NavUI items omit Portfolio provenance. Adapted code retains its MIT notice.

## Neutral visual foundation

Use Geist and the existing shadcn semantic colors in both themes. Keep component
dimensions in Tailwind utilities. Default controls use 13px text, 12px horizontal
padding, and an 8px `rounded-md` radius. Use medium weight for action labels and
16px icons with 6px between the icon and label. Popovers and cards can use
`rounded-lg` (10px) or `rounded-xl` (14px). These radii derive from one shared
`--radius`.

Use 24px, 28px, 32px, and 40px at `xs`, `sm`, `default`, and `lg`.
Match icon button squares to the corresponding text heights. Enlarge Button,
Input, and SelectTrigger to a 44px minimum target when the primary pointer is
coarse. Use minimum heights on buttons so long labels can wrap. Use 8–12px gaps
in action groups and 24px between sections. Match neighboring control heights
when composing a row.

Use primary for the strongest action, secondary or outline for alternatives,
ghost for quiet actions, and destructive for actions that remove data. Use a
link appearance for low-emphasis actions or links composed through SDK render.
Use accent to show hover and selected states. Use a 2px focus outline with a
2px offset. Preserve SDK disabled and pending semantics. Keep pending labels
stable and reserve space for the indicator. Check contrast in both themes.

Use short CSS transitions for color and feedback, with Button using 150ms.
Use Motion for paired
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
Use the same size name for `Button.size`, `SelectTrigger.size`, and
`Input.controlSize`. Input retains the native numeric `size` attribute and uses
16px text on narrow screens and coarse pointers to avoid iOS focus zoom.
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

## Documentation presentation

Use the shared template in this order: overview, primary preview, installation,
usage, examples, and API reference. Set `presentation: "compact"` in the catalog
for examples that work inline. Use the advanced showcase for the hero, blocks,
and examples that depend on an isolated viewport or other toolbar controls.
Give each example a real task and a self-contained source file. Group actions
that belong to the same workflow, put the strongest action first in emphasis,
and name icon-only buttons for what they do. Inspect the examples at narrow and
wide widths in both themes before shipping. Its rendered
component and copied source come from that same file. Use installed import paths
in the copied source and identify any demo dependencies. Keep SDK API details in
the upstream reference and document NavUI-owned props in the table.

## Using NavUI in a new app

1. Set up React, Tailwind CSS v4, and shadcn. Start from a neutral semantic theme
   with light values in `:root` and overrides under `.dark`. Load Geist or set
   your own font through the shared font mapping.
2. Configure the `@navui` namespace in `components.json` when using a custom
   registry endpoint. Use the URL pattern in this repo’s `components.json` as a
   reference. Install the controls you need, for example
   `pnpm dlx shadcn@latest add @navui/button @navui/field @navui/input`.
3. Import from the generated component paths. Use variants, sizes, `className`,
   and SDK `render` to compose existing primitives. Wrap a primitive for a
   reusable product pattern. Create a separate component when the composition
   has a distinct purpose and public API.
4. Customize shared semantic colors and the radius at the theme level. Preserve
   the token names and recheck contrast, focus, and forms in both modes.

The reusable foundation for eventual standalone distribution is the Tailwind
semantic mapping, neutral light and dark values, radius scale, font mapping,
and shared base rules in `app/globals.css`. Site layout, navigation, preview
chrome, and code styling are specific to the documentation.

## Definition of done

Ship a component when it follows the foundation, exposes clear public TypeScript
props, and delegates existing behavior to UI SDK. Verify keyboard and pointer
interaction, accessibility, both themes, responsive sizing, and reduced motion
where relevant. Confirm the registry installs in a separate app. Include
copyable examples and document the NavUI-specific API. Button is the reference.
