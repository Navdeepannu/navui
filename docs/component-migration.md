# UI SDK foundation and existing-component decisions

This supersedes the preservation-only guidance of Phase 1. Local source was audited;
the Portfolio import and single-theme migration were not repeated. Blocks are deferred.

| Existing component | Decision | Implemented evidence |
| --- | --- | --- |
| Animated Numbers | Keep unique | Locale-aware in-view counter; final value remains available to screen readers and reduced motion skips counting. No artificial SDK wrapper. |
| Animated Tabs | Consolidate / retire legacy item | Canonical SDK `tabs` owns selection, roving focus, indicator measurement, orientation, cancellation and panel presence. Workflow motion is an example. Old implementation, Radix helper and registry output removed; equivalent page URLs redirect. |
| Contribution Graph | Keep unique | Contribution normalization and calendar navigation remain custom. Invalid calendar dates are now rejected; duplicate and missing dates have regression tests. Native scroll preserves keyboard access to older history. |
| Expandable Card | Rebuild | SDK Dialog owns open state, focus, Escape, scrolling and presence. Motion pairs card/media layout IDs only, with reduced-motion guards. Canonical Dialog is a declared registry dependency. |
| Keyboard Shortcut | Keep unique / fix behavior | SDK `matchesShortcut` matches exact modifier chords. Editing, IME and repeat are ignored by default; editable opt-in, key-up/blur reset and listener cleanup are explicit. |
| Magnetic Button | Rebuild composition | Distinctive pointer enhancement over canonical SDK Button. Native props/ref/callbacks and disabled/pending behavior come from Button. Reduced-motion and disabled changes reset the visual origin. |
| Package Manager Command | Rebuild | SDK Select alone owns package selection; SDK Button owns press/pending copying. Partial command sets, controlled state, cancellation, clipboard success/error and cleanup are retained. One implementation still powers docs. |
| Proximity Nav | Keep unique / remove framework coupling | Native anchors replace Next Link/usePathname. Router-specific activeHref comes from the consumer. Focus/pointer guide lines and reduced motion remain distinctive. |
| Rail Nav | Keep unique | Custom line-to-link reveal, controlled expansion and optional section observation remain useful. Caller-canceled link events no longer change selection. Its small controlled-state utility remains an intentional dependency. |
| Segment Spotlight | Rebuild interaction / keep unique canvas | Spatial many-target highlights are not tabs or radios. SDK Toolbar owns one tab stop and arrow navigation; custom target mapping owns the canvas preview. Click mode does not select on focus; default motion guards cover scale, translation and blur. |

## Reference implementations

- `button`: one neutral default plus secondary, outline and ghost; SDK press, refs,
  rendering, forms, disabled and async pending behavior are forwarded.
- `tabs`: SDK root exported directly to preserve generic typing. Styled documented
  parts use `data-selected`, SDK indicator variables, and SDK panel presence.
- `dialog`: SDK root/trigger/close exported directly; styled parts use SDK lifecycle
  attributes. Expandable Card is a composition, not another modal implementation.

## Breaking changes

- Install `@navui/tabs` instead of `@navui/animated-tabs`. Imports become `Tabs`,
  `TabsList`, `TabsTab`, `TabsPanel`, `TabsIndicator`. Use ordinary layout markup
  instead of AnimatedTabsViewport. `activation` replaces `activationMode`.
- Button/Magnetic Button use SDK `render`, not Radix `asChild`.
- Expandable Card uses SDK `render`, `container`, `inline`, `initialFocus` and
  `finalFocus`; `portalContainer`, `contained`, forceMount and Radix event APIs are
  removed. Callback details support cancellation. Root `container` is SDK-owned.
- Package Manager Command forwards nullable SDK selection and cancellation details.
  Its trigger is a named combobox rather than a menu. Consumers should accept null.
- Segment Spotlight uses SDK render and toolbar props. Arrow keys move focus;
  click mode activates on press. Its unique target mapping and variants remain.
- Proximity Nav no longer reads the router: supply activeHref when route tracking
  matters. Keyboard shortcuts no longer run in editable content unless opted in.

Local examples, docs, imports, installation snippets and runtime maps were updated.
There are no permanent wrappers preserving retired APIs. Radix button/tabs/menu
helpers and the unused `radix-ui` package are removed. The separate
`@radix-ui/react-use-controllable-state` utility remains for Rail Nav and Spotlight;
Base UI controls required by the shell and 45 blocks remain internal.

## Verification

Validation record (local, November 26, 2026): `jsdom` is a development-only dependency;
SDK verification uses React act and Node's existing test runner. The test loader
only transpiles local TS/TSX; it is not shipped. Agent inspection exists only in a
test, with no application bridge. Browser checks are focused; screen-reader testing
and exhaustive device coverage are separate from automated DOM assertions.

## Next small batch

1. Input/Field: consistent validation, descriptions, error states and form examples.
2. Select: reusable styled parts and long-label/mobile examples, using lessons from
   Package Manager Command.
3. Checkbox/Switch: labelled settings patterns and controlled/form examples.

Finish those components before composing new marketing blocks.

## Validation record

- `pnpm run registry:build`: passed; 57 items (12 components, 45 retained blocks).
- `pnpm run check`: passed; TypeScript, 8 interaction tests, 7 registry tests,
  generated-source checks and schema validation. Lint has one existing unused
  `buttonVariants` warning in `components/blocks/blocks-toolbar.tsx`.
- `pnpm run build`: passed with 97 prerendered pages.
- Focused browser checks: Tabs arrows/selection at 360px in light/dark;
  Expandable Card keyboard opening, Escape/focus return, bounded content and scroll
  locking at mobile/desktop; package selector Home/Enter selection and focus return,
  with no mobile horizontal overflow. No package-preview console errors/warnings.
  This was not an exhaustive browser/device or assistive-technology audit.
- Reduced motion is enabled in the DOM test harness; a browser OS preference toggle
  and live preference changes were not verified. Shared-layout animation was inspected
  in ordinary motion; precise animation timing is not asserted by jsdom.
- Real installed shadcn CLI installed Button, Tabs, Dialog, Expandable Card,
  Magnetic Button, Package Manager Command, Segment Spotlight and Proximity Nav
  from a local `@navui` namespace into a fresh disposable Next consumer. Supporting
  canonical components and pinned SDK dependencies installed without site/demo files.
  Installed TypeScript passed independently of the NavUI workspace.
- Consumer production build remains blocked by its newly resolved Tailwind toolchain:
  `@tailwindcss/node@4.3.5` attempts to require ESM `magic-string@1.4.5` under Node
  22.17. Pinning direct Tailwind packages to 4.3.3 did not replace that transitive
  resolution. This is an actual consumer build failure, not a successful build claim.
  NavUI's locked toolchain builds successfully; its working versions were preserved.
- No deploy, push, model connection or application agent bridge. The pre-existing
  localhost dev server was reused; no additional persistent server was started.
