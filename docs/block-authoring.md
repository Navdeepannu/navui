# Block authoring

The catalog is organized by design system, category, and block slug:

```text
registry/blocks/
  base/
    blog/
      blog-section-one/
        blog-section-one.tsx
  iris/
  pro/
```

Keep each block self-contained and consumer-safe. A registry block must not
import documentation-site components or data. It may use normal shadcn aliases
such as `cn` and must declare every npm and registry dependency in the
catalog.

## Add a block

1. Add the component at
   `registry/blocks/<system>/<category>/<slug>/<slug>.tsx`.
2. Add one metadata entry to `registry/catalog.ts`.
3. Import the component and map its catalog ID in `registry/components.ts`.
4. Run `pnpm run registry:build`.
5. Run `pnpm run check`.
6. Inspect the system category page at
   `/blocks/<system>/<category>` on mobile and desktop, in light and dark mode.

Published catalog entries automatically appear in navigation, category counts,
isolated previews, Preview/Code tabs, responsive viewport controls, CLI commands,
source-file navigation, static routes, and generated registry files. Draft and
archived entries remain out of the public catalog.

## Showcase data flow

`registry/catalog.ts` is the canonical metadata and install manifest. Keep the
runtime component import in `registry/components.ts`; everything else is derived:

```text
catalog entry + component map
  -> category listing and counts
  -> /preview/<system>/<slug>
  -> Preview / Code showcase
  -> registry.json and public/r/*.json
```

The preview route is intentionally isolated in an iframe. A block can use its
own links, sticky positioning, and responsive layout without interfering with
the documentation shell. The frame reports its content height to the showcase,
while the toolbar supplies desktop, tablet, mobile, reload, and full-screen
controls.

Every file declared in `registry.files` is loaded into the Code tab and is
included in the generated shadcn item. A block must declare at least one file;
use `registry:component` for the primary block component and add supporting
`registry:ui`, `registry:lib`, or `registry:hook` files to the same array rather
than building a second source-preview list.

The registry check also rejects duplicate IDs, preview routes, registry names,
install targets, dependencies, and source entries. Primary source and install
paths must follow the directory contract above, so catalog mistakes fail before
they reach the site or a consumer project.

## Free and Pro boundaries

Base and Iris are public systems. Their published blocks receive source panels
and public shadcn registry payloads.

Pro is a paid system. Its public pages can render previews, but the catalog does
not expose source or install commands and the registry generator excludes Pro
items. Authentication and paid delivery can be attached later without changing
the block directory contract.

## Consumer install command

Every public block exposes npm, pnpm, Yarn, and Bun commands from the same
registry URL. The npm form is:

```bash
npx shadcn@latest add https://navui.dev/r/base-blog-section-one.json
```

Consumers may also configure the registry namespace in `components.json`:

```json
{
  "registries": {
    "@navui": "https://navui.dev/r/{name}.json"
  }
}
```

Then install with `npx shadcn@latest add @navui/base-blog-section-one`.
