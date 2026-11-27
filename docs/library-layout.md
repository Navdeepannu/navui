# Shared library website layout

This is website chrome only. The canonical component APIs, registry catalog/payloads,
installation commands, block implementations, preview cards and aspect ratios remain
unchanged. The current local form-component commit was preserved.

## Ownership

- `components/site/navbar.tsx`: one sticky 64px header, site logo, section links,
  repository link, theme control and mobile trigger. Standalone previews hide it.
- `components/library/library-layout.tsx`: shared server shell and navigation derived
  from the existing component/block catalogs and category definitions. Only link
  summaries cross the client boundary; block implementation modules are not imported.
- `library-sidebar.tsx`, `library-navigation.tsx`, `scroll-navigation.tsx`: the same
  viewport-aligned sidebar with the canonical Proximity Nav and an independently
  scrolling inner list. It is 14rem at tablet widths and 15rem from 1024px. A route
  change reveals an offscreen active link by scrolling only its navigation container.
- `mobile-navigation.tsx`: the existing canonical SDK Dialog supplies modality,
  dismissal and focus return. Link selection closes the drawer; resizing to desktop
  closes it too. Both global and collection links are available in one drawer.
- `documentation-layout.tsx`, `table-of-contents.tsx`: real h2/h3 elements with IDs
  inside the documentation main supply the outline. No parallel per-item TOC list.
  Anchor IDs are preserved; native hash navigation, history and instant scrolling
  work without a custom click engine. A passive, frame-coalesced scroll listener
  tracks the current heading through long sections. Resize updates track previews.
- `app/components/layout.tsx` and the retained Blocks layout use the shared shell.
  The old Blocks-only sidebar, reopen control and toolbar were removed after checking
  references. Gallery/category pages retain their content and preview tools.

Sidebar and header use `library-divider`: the same semantic border color, dashed
style and one-pixel width. Border ownership is outside the masked scroll viewport.
Main content uses document scrolling, without a second rounded application frame.
Components listing uses container-based card columns; Blocks has no TOC reservation.

## Scrolling and responsive rules

The existing `shadcn/tailwind.css` import supplies `scroll-fade`, with a subtle 16px
mask and 24px reveal distance. Modern browsers use its CSS scroll timelines; older
browsers get a minimal passive edge listener because the packaged fallback fades
both edges statically. A ResizeObserver watches viewport/content size in both paths.
Real-browser testing found a native timeline can retain its last mask after resizing
away overflow, so `data-overflow=false` removes the mask explicitly. There is no new
scrolling dependency. Keyboard focus removes the mask so focused links stay clear.

Both sidebar and documentation TOC persist at 768px and above. At smaller widths,
the SDK drawer replaces the sidebar. Main content and independently scrollable code
use the remaining width. Hash targets have a combined 96px header clearance. TOC
links use native instant scrolling and no movement animation, including reduced motion.

## Design sources

The attached NavUI screenshots supplied the identity and existing gallery treatment.
The Evil Charts reference supplied the compact hierarchy and rail treatment; no chart
implementation or assets were copied.

Reviewed shadcn/ui source at `0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4`:

- [documentation layout](https://github.com/shadcn-ui/ui/blob/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/app/%28app%29/docs/layout.tsx)
- [documentation sidebar](https://github.com/shadcn-ui/ui/blob/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/components/docs-sidebar.tsx)
- [table of contents](https://github.com/shadcn-ui/ui/blob/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/components/docs-toc.tsx)
- [scroll-fade documentation](https://github.com/shadcn-ui/ui/blob/0e5b2e621a9ee4cf6a604bbe6c5c0d5b70561eb4/apps/v4/content/docs/utils/scroll-fade.mdx)
- [Evil Charts outline reference](https://evilcharts.com/docs/recharts/line-chart/static#buffer-line)

NavUI uses the installed shadcn CSS utility and its own small layout components,
without importing upstream Radix/sidebar architecture. shadcn's MIT notice is retained
in `docs/licenses/shadcn-ui.txt`. Installed Design Better, UI SDK and shadcn guidance,
plus the available Interfaces layout, accessibility and review references, informed
implementation and verification.

## Verification

The initial type check encountered stale generated Next layout-route declarations;
regenerating through the normal production build resolved them. Focused tests cover
heading-derived/nested TOC entries, hash/scroll state through section gaps, meaningful
section visibility, fallback fade edges, and native resize-to-no-overflow behavior.

Final local results:

- `pnpm run check`: passed with clean lint, TypeScript, 20 interaction/layout tests,
  8 registry tests and registry schema/source checks (62 unchanged published items).
- `pnpm run build`: passed; 112 prerendered pages.
- Browser checks at 360, 768, 1280 and 1440px covered representative light/dark
  documentation, collection, gallery and block-category pages, without page overflow.
- Verified exact matching header/sidebar border colors and dashed style; header height
  and sticky sidebar top both 64px. Sidebar scroll changed while document scroll stayed 0.
- Verified native CSS fades at start (0/16px), middle (16/16px), end (16/0px), and no
  mask when all entries fit after resizing. The unsupported-browser path has DOM tests;
  an additional physical browser without CSS timelines was not available.
- Verified TOC direct URL hashes and click navigation with heading top at 96px,
  active sections, source tabs, mobile preview width/reload, copy feedback, component
  search, mobile cross-section links, drawer Tab/Escape and focus return.
- The unchanged gallery thumbnails and block previews loaded successfully. Fresh
  documentation load had no console warnings/errors or hydration warnings. One
  transient MutationObserver error occurred during the long HMR/iframe-reload session;
  its origin was not established and it did not recur on a fresh page load.
- Real OS reduced-motion preference switching, physical touch devices and screen readers
  were not exercised. Native instant anchor navigation introduces no smooth-scroll motion.
  Existing SDK Dialog supplies focus trapping; desktop/tablet/mobile keyboard paths were
  checked in the browser. Temporary tabs/viewport overrides were cleaned up; the user's
  existing dev server was reused. Nothing was pushed or deployed.

## Viewport-aligned rails

The shared library shell and header have no maximum-width cap. The collection
sidebar stays at the viewport's left edge. Documentation uses a flexible center
track and an 8rem right outline from 768px (10rem from 1024px), with a small outer
gutter. Only the reading column is capped at 52rem and centered within its track;
the navigation rails never move inward to follow that cap. Below 768px, the existing
SDK drawer supplies collection navigation and the right outline is hidden.

LibraryNavigation renders the existing canonical ProximityNav, with current route
passed as controlled activeHref. Website CSS removes its standalone card surface
and allows long labels to wrap. Native links preserve modified-click and keyboard
behavior. Blocks keep category counts; no registry implementation or public API was
changed. The same component is used in the mobile drawer.
