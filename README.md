# NavUI

Polished, customizable React components and blocks on one neutral foundation,
with light and dark modes. UI SDK is the preferred foundation for new interactive
work. Existing Motion, Radix, and Base UI implementations remain supported while
we migrate the collection without discarding their visual character or APIs.

The development direction is styled reusable components first, larger composed
blocks afterward. Distribution uses the **shadcn CLI and NavUI registry**, not a
separate NavUI CLI. Phase 1 adds no AI components, agents, or model connections.

## Develop and preview

```bash
pnpm install
pnpm dev
```

- `/components`: searchable component collection.
- `/components/animated-tabs`: preview, source, install, usage, props, and notes.
- `/preview/components/animated-tabs`: isolated interactive preview.
- `/blocks` or `/blocks/base`: retained 45-block collection.
- `/playground/project-settings`: existing local UI SDK form.

Base source paths and public `base-*` item names remain stable. The retired
style routes redirect to the retained collection. There is no style selector or
paid source/install restriction.

## Install in a consumer

NavUI uses a shadcn-compatible registry. Configure the namespace in the
consumer’s `components.json`:

```json
{
  "registries": {
    "@navui": "https://navui.dev/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @navui/animated-tabs
```

Production URLs are intended deployment endpoints, not a claim that this local
migration is deployed. With NavUI running locally, test installation using:

```bash
npx shadcn@latest add http://localhost:3000/r/animated-tabs.json
```

Consumers need React 19, Tailwind CSS 4, and a configured shadcn project with
semantic theme tokens. Proximity Nav is currently Next.js App Router-specific.
Each item declares its npm dependencies and required supporting files. Demos and
website code are excluded; migrated items include the original MIT notice.

## Registry workflow

`registry/catalog.ts` is the single canonical metadata source for components and
blocks. Runtime import maps only connect those entries to implementations/demos.
Navigation, documentation, preview routing, source views, and distribution derive
from that catalog. Do not hand-edit generated JSON.

```bash
pnpm run registry:build
pnpm run check
pnpm run build
```

The existing pipeline produces `registry.json` and `public/r/*.json`; checks cover
inventory, collisions, declared files/dependencies, portable imports, and output
consistency. See [contributor guidance](docs/block-authoring.md) and the
[Phase 1 migration inventory](docs/phase-1-migration.md).
