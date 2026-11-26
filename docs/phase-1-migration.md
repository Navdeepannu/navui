# Phase 1 migration

Source: [Navdeepannu/Portfolio](https://github.com/Navdeepannu/Portfolio), commit
`c4fcc26d0fb10293cf549398e331cb5cc7ec350c`. The source contributor guide,
`src/registry/items/components.ts`, colocated item manifests/implementations/demos,
and `src/features/navui/catalog/components` were inspected. The published
[component inventory](https://ui.navdeepsingh.dev/components) matches all ten items.
Portfolio and its deployed website were not modified.

| Source component | Destination implementation | Npm dependencies | Issue / boundary |
| --- | --- | --- | --- |
| animated-numbers | `registry/components/animated-numbers.tsx` | motion, cn | No migration blocker identified |
| animated-tabs | `registry/components/animated-tabs.tsx` | motion, @radix-ui/react-use-controllable-state, cn, radix-ui | No migration blocker identified |
| contribution-graph | `registry/components/contribution-graph.tsx` | cn | No migration blocker identified |
| expandable-card | `registry/components/expandable-card.tsx` | motion, lucide-react, radix-ui, @radix-ui/react-use-controllable-state, cn, class-variance-authority | No migration blocker identified |
| keyboard-shortcut | `registry/components/keyboard-shortcut.tsx` | cn | Optional sound asset is demo-only |
| magnetic-button | `registry/components/magnetic-button.tsx` | motion, cn, radix-ui, class-variance-authority | No migration blocker identified |
| package-manager-command | `registry/components/package-manager-command.tsx` | lucide-react, @radix-ui/react-use-controllable-state, cn, radix-ui, class-variance-authority | No migration blocker identified |
| proximity-nav | `registry/components/proximity-nav.tsx` | motion, cn, next | Next.js App Router required |
| rail-nav | `registry/components/rail-nav.tsx` | motion, @radix-ui/react-use-controllable-state, cn | Consumer controls responsive visibility |
| segment-spotlight | `registry/components/segment-spotlight.tsx` | motion, radix-ui, @radix-ui/react-use-controllable-state, cn | No migration blocker identified |

The executable manifest is `registry/catalog.ts`; this table records the migration,
not a second catalog. All ten use their existing public slugs as registry names.
Implementations install into `components/navui/<slug>.tsx`. Demos live under
`components/examples` and are excluded from installable payloads. The keyboard
sound demo uses the original local MP3; consumer sound is an opt-in URL prop.

## Retained and removed

- Retained 45 Base blocks, their source paths, and public `base-*` names.
- Retained neutral semantic tokens, typography, theme toggle, iframe isolation,
  source explorer, responsive previews, copy, and shadcn installation tools.
- Removed Iris/Atelier theme files and imports, Iris/Pro configuration and selector,
  paid-source gates and copy, and retired system placeholder output. No retired-only
  registry implementations existed in the starting catalog.
- Old Iris/Pro block and preview paths redirect to the retained Base paths.
- Kept one package-manager-command implementation: Portfolio’s richer controlled
  implementation now serves the site and registry. Removed the old site-only copy.
- Shared Radix button/tabs/menu helpers have one source and explicit shared file
  targets. Base UI site primitives remain separate. Existing Kbd is reused.
- Original MIT attribution and license ship in every migrated payload.

## Focused migration adaptations

Imports use declared files and the existing `cn` package. Source APIs and Motion
interactions are retained. Inactive animated tab panels are inert during exit
transitions. Contribution history scrolls to the latest days initially and remains
scrollable when keyboard focus moves to earlier days. Rail Nav no longer hardcodes
its desktop-only visibility; its original line-to-link reveal is preserved.
Named Segment Spotlight color variants remain intentional component styling.
Website demo images use Next Image with reserved dimensions; generic implementations
remain free of Next imports except the explicitly documented Proximity Nav.

## Validation

- `pnpm run registry:build`: exit 0; 55 items (45 retained blocks, 10 components).
- `pnpm run check`: exit 0; TypeScript, lint, seven registry tests, and shadcn
  validation passed. One existing unused `buttonVariants` warning remains in
  `components/blocks/blocks-toolbar.tsx`; unrelated behavior was left alone.
- `pnpm run build`: exit 0; static component pages and isolated previews generated.
  The existing broad filesystem tracing warning was resolved by scoping source
  reads to registry, demo, and primitive directories.
- A disposable Next.js consumer configured `@navui` to a local HTTP registry.
  The real shadcn CLI installed all ten components, declared npm dependencies,
  shared helpers, Kbd, and LICENSE (15 files). Consumer TypeScript and production
  build both passed without any NavUI website imports.
- Browser checks covered discovery/search, component pages, mobile source selection
  and clipboard copy, animated-tab arrow navigation, expandable-dialog opening
  and Escape dismissal, contribution-history keyboard navigation, spotlight
  activation, rail selection, and light/dark layouts at 360px and desktop widths.
  Mobile spotlight labels and the compact rail column were adjusted after inspection.
- Additional browser inspection stopped at the user's request. Reduced-motion
  branches were reviewed in source; media emulation was unavailable through the
  connected browser controls, so that runtime check remains unverified. Exhaustive
  testing of every component/theme/viewport combination was not performed.
- Production URLs and deployment remain unverified; all distribution verification
  in this phase used the local generated registry.

## Phase 2 priorities

1. Review stable component APIs and interaction contracts before expanding the library.
2. Migrate suitable new or revised interactions to UI SDK: animated tabs, expandable
   dialogs, and the package-manager selector are candidates; preserve current APIs.
3. Decouple Proximity Nav from Next.js through link composition or an optional adapter.
4. Add deeper interaction coverage for keyboard shortcuts, contribution data edge
   cases, touch, dialog focus, and all reduced-motion states.
5. Build production-ready styled components on the neutral tokens, then compose
   larger blocks. Verify deployment and public registry URLs separately.

No new AI components, agent bridge, model connection, backend, or NavUI CLI was added.
