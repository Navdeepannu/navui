# NavUI

NavUI is an open-source collection of polished, customizable React components
built primarily on UI SDK, on one neutral foundation with light and dark modes.

UI SDK owns standard control behavior. Distinctive visual and data components
remain custom where that adds value. We build finished reusable components and
examples first, then compose marketing blocks later. The 45 existing blocks remain
available without redesign in this foundation pass.

Distribution uses the **shadcn CLI and NavUI registry**. There is no separate NavUI
CLI, model connection, agent bridge, or backend.

## Develop and preview

```bash
pnpm install
pnpm dev
```

- `/components`: searchable component collection.
- `/components/tabs`: preview, source, install, usage, props, and notes.
- `/preview/components/tabs`: isolated interactive preview.
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
npx shadcn@latest add @navui/tabs
```

Production URLs are intended deployment endpoints, not a claim that this local
migration is deployed. With NavUI running locally, test installation using:

```bash
npx shadcn@latest add http://localhost:3000/r/tabs.json
```

Consumers need React 19, Tailwind CSS 4, and a configured shadcn project with
semantic theme tokens. Proximity Nav uses native links; pass activeHref from your application router.
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

## Component foundation

Canonical `button`, `tabs`, and `dialog` entries use UI SDK 0.1.0-beta.17. Rebuilt
compositions depend on those exact NavUI components through the registry, not on
similarly named generic shadcn controls. `animated-tabs` is consolidated into `tabs`;
its documentation/preview URLs redirect, and its old registry payload is retired.

See [authoring guidance](docs/component-authoring.md) for visual rules and SDK
composition, and [component decisions and breaking changes](docs/component-migration.md).
