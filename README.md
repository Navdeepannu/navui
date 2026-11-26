# NavUI

NavUI is a reusable React block library built with Next.js, TypeScript,
Tailwind CSS, shadcn/ui, and Base UI. It ships three visually distinct design
systems through one catalog and one registry contract:

- **Base** — free, neutral, and sourced from the existing NavUI collection.
- **Iris** — free, cool-toned, and intended for modern product interfaces.
- **Pro** — paid, warm, restrained, and excluded from the public registry.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/blocks](http://localhost:3000/blocks) to browse the
catalog.

## Registry workflow

The typed catalog in `registry/catalog.ts` is the source of truth for block
metadata. Generated registry files are not hand-edited.

```bash
pnpm run registry:build
pnpm run registry:check
pnpm run check
```

`registry:build` generates the root `registry.json` and the public shadcn
payloads under `public/r`. Only published blocks from free design systems are
included in the public output.

See [docs/block-authoring.md](docs/block-authoring.md) for the directory
contract and the checklist for adding a block.
