# NavUI Repository Instructions

## Project purpose

NavUI is a production-quality collection of polished, customizable React components and blocks built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and accessible UI primitives.

Every public component should be:

- Visually intentional and polished.
- Reusable outside the NavUI documentation site.
- Accessible by default.
- Responsive from small mobile screens through large desktops.
- Easy for another engineer to understand, customize, and maintain.
- Suitable for copying through the NavUI registry without hidden dependencies.

Do not optimize only for making a screenshot look attractive. Optimize for usability, accessibility, implementation quality, responsiveness, and real product use.

## Working approach

Before changing code:

1. Read `package.json` and the relevant existing files.
2. Inspect nearby components and established repository patterns.
3. Inspect the current page in the browser when visual tooling is available.
4. Find and reuse existing tokens, primitives, utilities, and components.
5. Identify whether the change affects the NavUI site, a distributable registry item, or both.
6. Preserve existing behavior and visual intent unless the task explicitly requests a redesign.

Do not rewrite an entire component or page when a focused change is sufficient.

For substantial UI work, establish a clear design direction before implementation. Consider:

- The user and purpose of the interface.
- Primary and secondary actions.
- Information hierarchy and reading order.
- Content density.
- Responsive behavior.
- Interaction and accessibility requirements.
- How the result fits NavUI’s neutral visual foundation.

Resolve material requirement conflicts before proceeding. This foundation cleanup authorizes component replacement, consolidation, retirement, and necessary API changes; document breaking changes and update local consumers.

## NavUI design architecture

NavUI has one neutral visual foundation with light and dark modes. Existing
`base-*` registry names, Base block source paths, and `/blocks/base` links are
compatibility contracts, not a separate product offering.

UI SDK owns behavior for new standard interactive components. Useful existing
components migrate where feasible. Unique visual/data components may remain custom;
redundant public components should be consolidated or retired. Do not retain obsolete
APIs through permanent compatibility layers. Use SDK's documented composition and
public types; do not copy Radix/Base UI semantics into SDK wrappers.

Read the installed ui-sdk and shadcn skills, relevant design guidance, and the
version-matched docs before each interaction. Use public SDK subpaths; forward refs,
render functions, callbacks and cancellation. SDK owns selection, focus, keyboard,
modality and presence. Motion may enhance visuals without duplicating those states.
See `docs/component-authoring.md` and `docs/component-migration.md`.

Components come first; marketing blocks come later. Preserve all 45 existing Base
blocks and their dependencies; do not redesign or migrate them in foundation work.
Distribution uses the shadcn CLI and NavUI registry, with no separate CLI. No model
connection, shipped agent bridge, generic plugin framework or backend belongs here.
Agent-related SDK guidance is scoped to tests. Preserve SDK and package-manager pins.

Treat the neutral foundation CSS and semantic tokens as the source of truth. Do not duplicate token values inside components.

Components should consume semantic values such as:

- `background`
- `foreground`
- `card`
- `muted`
- `primary`
- `secondary`
- `border`
- `input`
- `ring`

Avoid raw hex, RGB, or OKLCH values inside reusable components unless the value is part of an intentional standalone visual asset.

## Design-engineering quality bar

Every user-facing surface must be evaluated for:

- Visual hierarchy.
- Typography and readable line length.
- Consistent spacing and alignment.
- Color contrast.
- Component density.
- Responsive composition.
- Interaction feedback.
- Empty, loading, error, disabled, hover, active, and focus states when relevant.
- Accessibility.
- Motion quality.
- Implementation feasibility and maintainability.

Use spacing and typography to create hierarchy before adding decoration.

Prefer:

- Clear grouping.
- Consistent alignment.
- A restrained spacing scale.
- One obvious primary action.
- Purposeful whitespace.
- Realistic content lengths.
- Subtle depth and borders.
- Consistent icon size and stroke weight.

Do not default to generic AI-generated aesthetics such as:

- Excessive gradients, glows, or blurred blobs.
- Glassmorphism without a functional reason.
- Card containers around every piece of content.
- Excessive pill-shaped controls.
- Oversized headings that overwhelm the interface.
- Arbitrary floating elements.
- Decorative charts or statistics without meaning.
- Multiple competing accent colors.
- Excessive animation.
- Large empty hero sections with weak hierarchy.

Decoration must support the product concept rather than compensate for weak layout or hierarchy.

## Responsive design

Build mobile-first and treat responsive behavior as part of the component design, not as a final patch.

- Components must work at approximately 360px, 768px, 1024px, and 1440px widths.
- Avoid horizontal overflow at every supported viewport.
- Do not rely on fixed heights for content containers unless the interaction requires them.
- Allow text and controls to wrap intentionally.
- Preserve logical reading order when layouts collapse.
- Keep essential actions available on mobile.
- Ensure touch targets are comfortably usable.
- Adjust spacing, type scale, density, and layout—not only column count.
- Test realistic long headings, labels, and descriptions.
- Avoid hiding important content merely to make mobile layouts fit.

## Accessibility

Accessibility is a requirement, not an optional improvement.

- Prefer native semantic HTML.
- Use actual `button`, `a`, `input`, `label`, `nav`, `main`, and heading elements.
- Never use a clickable `div` when a native interactive element is appropriate.
- All functionality must be keyboard accessible.
- Preserve a logical heading hierarchy.
- Provide visible `focus-visible` states.
- Icon-only controls require accessible names.
- Form controls require associated labels and understandable validation messages.
- Do not communicate state using color alone.
- Decorative images must use empty alt text.
- Meaningful images require useful alt text.
- Dialogs, menus, popovers, and drawers must manage focus correctly.
- Ensure sufficient text and UI contrast.
- Respect `prefers-reduced-motion`.
- Avoid nested interactive elements.

## Motion and interaction

Motion should explain relationships, provide feedback, or improve spatial understanding.

- Prefer short, subtle transitions.
- Animate `transform` and `opacity` when possible.
- Avoid layout-thrashing animation.
- Do not animate every element simply because Motion is available.
- Provide reduced-motion behavior.
- Avoid delaying access to content for entrance animations.
- Keep hover effects from causing layout shifts.
- Ensure touch devices do not depend on hover.
- Preserve keyboard and screen-reader behavior when adding animation.

## React and TypeScript

Follow the versions and conventions actually installed in the repository.

- Use Server Components by default.
- Add `"use client"` only where hooks, browser APIs, or client interaction require it.
- Keep client boundaries as small as practical.
- Pass serializable data across Server and Client Component boundaries.
- Do not use `useEffect` for values that can be derived during render.
- Use effects only to synchronize with external systems.
- Keep state close to the component that owns it.
- Avoid unnecessary global state or context.
- Avoid premature `useMemo`, `useCallback`, and memoization.
- Use stable keys based on data identity.
- Prefer composition over large configuration-heavy components.
- Keep components focused, but do not split them into meaningless one-line wrappers.
- Avoid premature abstractions created for a single use case.
- Use existing helpers such as `cn` and established variant utilities.
- Do not introduce `any` or unsafe type assertions without a documented reason.
- Prefer explicit public prop types.
- Extend native element props when building reusable primitives.
- Model mutually exclusive props safely when the component API requires it.
- Do not suppress TypeScript or lint errors to make a change pass.
- Do not add a production dependency without explaining why existing tools are insufficient.

When a component is intentionally generic, do not introduce Next.js-only APIs unless it is declared as a Next.js-specific registry item.

## Tailwind CSS and styling

- Use the existing Tailwind CSS version and repository conventions.
- Prefer semantic utilities backed by CSS variables.
- Do not introduce legacy Tailwind configuration patterns.
- Avoid arbitrary values when an existing token or utility expresses the intent.
- Arbitrary values are acceptable for deliberate, component-specific geometry.
- Do not dynamically concatenate class names that Tailwind cannot statically detect.
- Use CSS for complex keyframes or behaviors that are clearer outside JSX.
- Keep responsive and state variants readable.
- Do not solve structural layout problems with excessive negative margins or absolute positioning.

## NavUI registry components

Distributable registry components must be self-contained and consumer-safe.

- Do not import documentation-site-only components or data.
- Use only imports that will exist after registry installation.
- Declare required files and external dependencies in registry metadata.
- Preserve the established registry naming and folder conventions.
- Keep example content separate from reusable behavior when practical.
- Avoid assumptions about a consumer's routes, authentication, database, or environment variables.
- Use a clear and minimal public API.
- Make useful customization possible through props, composition, class names, and semantic tokens.
- Do not expose internal implementation details unnecessarily.
- Verify that copied components render correctly outside the documentation shell.
- Keep primitive-specific implementations isolated.
- Ensure styling is token-driven instead of duplicated per block.

Intentional duplication is acceptable when it keeps a registry item portable and easy to copy. Do not extract shared code if doing so creates hidden coupling for consumers.

## Content and UX writing

- Use concise, credible, human-readable interface copy.
- Use realistic content lengths in component previews.
- Do not use lorem ipsum when content affects the layout.
- Do not invent customer claims, testimonials, revenue, or performance metrics.
- Labels should describe actions clearly.
- Error messages should explain what happened and what the user can do next.
- Avoid vague calls to action such as “Click here.”

## Performance

- Avoid unnecessary client-side JavaScript.
- Prefer CSS for visual states and simple transitions.
- Load large or non-critical content lazily when appropriate.
- Use correctly sized and optimized images.
- Prevent layout shift by reserving media dimensions.
- Avoid expensive effects during scroll or pointer movement.
- Do not add animation libraries or other dependencies for behavior already supported by the current stack.
- Preserve tree-shaking and avoid broad package imports when targeted imports exist.

## Verification

After a user-facing UI change, verify the result rather than relying only on code inspection.

When the necessary tooling is available:

1. Run the relevant page.
2. Inspect mobile, tablet, and desktop layouts.
3. Check light and dark themes when supported.
4. Check the neutral foundation in light and dark modes.
5. Check each affected primitive implementation.
6. Test keyboard navigation and visible focus.
7. Check hover, active, disabled, loading, empty, and error states when relevant.
8. Confirm there is no unexpected overflow or layout shift.
9. Check the browser console for warnings and hydration errors.

Use the scripts defined in `package.json`. Run applicable linting, type checking, tests, and builds. Do not invent script names, and do not fix unrelated failures without noting them.

Never state that a change is complete if it was not verified. If verification was not possible, state exactly what remains unverified.

## Completion standard

A task is complete only when:

- The requested behavior works.
- The result fits NavUI’s neutral design language.
- Mobile and desktop layouts are intentional.
- Accessibility requirements are satisfied.
- React and TypeScript code is maintainable.
- Registry components remain portable.
- Relevant validation has passed.
- No unrelated files were modified.

In the final handoff, briefly explain:

- What changed.
- Important design or architectural decisions.
- What was validated.
- Any remaining limitations or follow-up work.

Before using UI SDK:

- Follow the ui-sdk skill when available.
- Read node_modules/@ui-sdk/react/docs/llms.txt.
- For custom components, consult core.md and rendering.md
  in that documentation directory.
- Reuse the project's existing design tokens.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
