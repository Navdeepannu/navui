# NavUI contributor guide

NavUI has one neutral foundation with light/dark modes. UI SDK owns new standard interactive behavior. See `component-authoring.md` for
the canonical Button, Tabs and Dialog pattern. Unique custom components are retained
on their merits; redundant public controls are consolidated. Build reusable styled components first and
compose blocks afterward. No separate CLI or AI connection belongs in Phase 1.

## Source and catalog

`registry/catalog.ts` is the canonical metadata and install manifest for both
collections. Use the existing registry pipeline; do not add a parallel generator.

- Components: `registry/components/<slug>.tsx` → `components/navui/<slug>.tsx`.
- Existing blocks: `registry/blocks/base/<category>/<slug>/<slug>.tsx` →
  `components/blocks/base/<category>/<slug>.tsx`.
- Demos: `components/examples`, connected through `registry/component-previews.ts`.
- Existing block import map: `registry/components.ts`.

Preserve public item names and Base source paths. A registry implementation must
never import website data, examples, preview infrastructure, or application state.
Use semantic tokens. Keep generic components framework-independent; explicitly
label any framework-specific item and declare its framework dependency.

Each catalog entry declares title, description, status, category, source files,
consumer targets, npm dependencies, and registry dependencies. Components also
declare usage, props, accessibility notes, demo sources, and source provenance.
Keep demo data outside installable files. Never create a second metadata list for
navigation, docs, installation, or source browsing.

Required primitive helpers are declared files. Shared files must use the same
source and consumer target with `shared: true`; never duplicate helper source.
The public SDK foundation is isolated from the site’s retained Base UI primitives.
The existing Kbd implementation is reused directly. Preserve license notices and
include the original MIT license with migrated components.

## Verify

```bash
pnpm run registry:build
pnpm run check
pnpm run build
```

Inspect `/components/<slug>` and `/preview/components/<slug>` in light/dark mode,
on narrow and desktop screens, with keyboard and reduced-motion settings.
Check examples, source selection/copy, installation controls, and console errors.
For blocks, inspect `/blocks/base/<category>` and `/preview/base/<slug>`.
Smoke-test installation in a disposable configured shadcn consumer. Compile the
installed files without imports from the NavUI website. Never edit `registry.json`
or `public/r/*.json` by hand; `registry:build` regenerates and prunes stale items.

## Consumer configuration

```json
{
  "registries": {
    "@navui": "https://navui.dev/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @navui/tabs
npx shadcn@latest add @navui/base-blog-section-one
```

Deployment must be verified separately. For local testing, use an absolute
`http://localhost:3000/r/<name>.json` URL. Use `docs/phase-1-migration.md` for the
source inventory, known limitations, and later UI SDK migration candidates.
