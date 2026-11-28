# Component documentation

The site uses one shared template for every published component. The global header,
sidebar, public APIs, installation commands, registry metadata, and licenses remain
unchanged by this documentation refinement.

## Reading order

Title and description → preview → installation → usage → examples (when present)
→ API reference → component-specific accessibility notes when needed. Examples use nested headings; empty sections are
omitted. Keep usage small and explanatory. The preview's Code tab shows the actual
example with consumer import paths, while Manual installation contains the reusable
implementation and its supporting files. Demo-only dependencies and assets are not
part of the registry payload.

`components/catalog/component-documentation.tsx` owns the shared document template.
`components/documentation/component-content.ts` contains presentation copy and focused
minimal examples. Existing API entries remain the fallback; `api-reference.tsx`
provides detailed Button and Dialog references checked against the installed beta.17
SDK and the canonical wrappers. Required markers are explicit, never inferred from
an absent default. Empty default cells do not imply that a property is required.

## Preview and code

`preview-size.ts` sets the minimum heights for the advanced component preview.
Content can grow through the existing resize reporter. Use the advanced showcase
for the main preview and for examples that need viewport or fullscreen controls.

Set `presentation: "compact"` on an example to render it in the page’s theme.
The inline preview sizes to its content and provides View code and Copy actions.
The corresponding source file supplies both the preview and the snippet. The
source reader rewrites registry imports to consumer paths. The advanced
showcase continues to expose example code in its Code tab.

UI SDK Collapsible owns disclosures for compact examples and for long Manual
installation and Usage snippets; decorative teasers are inert and hidden from
assistive technology. Expanded code scrolls within 28rem. The Code tab uses the same
renderer without a tree. Manual installation lists actual required files, with license files
excluded from the viewer but retained in distribution and source notices.

Shiki runs on the server through `registry/source.ts` and `lib/highlight-code.ts`.
`components/documentation/code-viewer.tsx` owns CodeFrame, CodeSurface, and
CodeContent. Their frame padding, muted surround, inset background, corners, shadow,
typography, and line numbers come from the Blocks viewer. Blocks composes its file
explorer inside these primitives; Components, Usage, and configuration show code and
a floating top-right copy button without a filename header. Manual file destinations
are installation instructions outside the viewer. CommandBlock uses the shared frame and code renderer in a compact terminal variant,
with package-manager tabs, a top-right copy action, and a divided command row. Do not duplicate these
styles in individual viewers. The shared renderer consumes Shiki's escaped dual-theme HTML. Code uses Shiki's unmodified
`github-light-default` theme in light mode and `vesper` in dark mode across source,
examples, usage, configuration, and installation commands. Typography, surface, borders,
spacing, and focus styling use NavUI tokens. Language support includes TypeScript,
TSX, JavaScript, JSON, CSS, and shell. Do not add another highlighter or ship Shiki
in the client bundle.

## Installation and navigation

Command is the default method. `@navui` is listed in shadcn’s public registry
directory, so consumers do not need to add the namespace manually. The directory
currently resolves to `https://ui.navdeepsingh.dev/r/{name}.json`; this deployment
must serve the generated `public/r` files for public installs to work. Manual installation derives the npm dependency closure and source files from
the existing canonical registry manifests; it does not invent another pipeline.

Command blocks expose package-manager tabs; preview toolbars retain the compact
PackageManagerCommand selector. Both share the canonical command strings and preference.
A site-only useSyncExternalStore subscription persists the package manager in
`navui:package-manager`, synchronizing controls across pages and tabs. Storage denial
falls back to memory. The server snapshot remains deterministic for hydration.
Registry components have no dependency on this site preference.

The TOC derives actual h2/h3 elements, including asynchronously streamed headings.
It coalesces mutation, resize, hash and scroll updates into animation frames and
leaves the initial preview unhighlighted until a documentation heading is reached.
Native hash links account for the sticky header; no smooth-scroll animation is added.

## References and verification

Presentation references: [shadcn Accordion](https://ui.shadcn.com/docs/components/base/accordion),
[Chánh Đại Cover Flow](https://chanhdai.com/components/cover-flow), and
[Code Block Command](https://chanhdai.com/components/code-block-command).
The ncdai registry implementation was inspected through the real shadcn CLI. Its
presentation informed the command bar; its additional behavior dependencies were
not imported. The existing SDK controls supply that interaction.

Focused tests cover disclosure, exact copying, package selection/preference sync,
keyboard method tabs, language highlighting/escaping, preview sizing, API semantics,
and streamed TOC headings. Browser verification distinguishes actual rendered
behavior from jsdom's reduced-motion stub. Full validation uses registry:build,
check, and build; no public deployment is implied.
