# Styled form collection

Field, Input, Select, Checkbox and Switch extend the merged SDK foundation; the
migration is not repeated. Each has one canonical implementation, a minimal example
and a practical state example in the existing catalog. All 45 blocks and unique
components are preserved. SDK/package-manager pins and runtime dependencies remain
unchanged. The shared controls use Button's neutral borders, radii, focus and type.

- Field: SDK label/description/error wiring, grouped layout and native field sets.
- Input: native props/ref/form participation, state callbacks and input cancellation.
- Select: original generic root, typed items, single/multiple values, bounded scrolling
  and long labels. Package Manager Command reuses these parts and declares @navui/select.
- Checkbox: checked/mixed indicator, required/disabled states and native submission.
- Switch: stable labelled setting, RTL thumb and motion-safe transitions.

The settings playground consumes all five and existing Button. It validates empty
and whitespace-only names locally. Current React state and actual submitted FormData
are separate; unchecked preferences are omitted by native form rules. Reset restores
controlled values, clears errors and clears the previous submission. Submitting again
shows defaults in FormData. Component search reuses canonical Field/Input.

## Consumer build diagnosis

The previous report attributed the consumer error to Node 22.17. The actual consumer
shell resolves Node **20.17.0**. The workspace resolves **22.17.0**. Reproduction:

1. Run the previous consumer's `pnpm run build` in its default shell: fails requiring
   ESM magic-string@1.4.5 from @tailwindcss/node@4.3.5.
2. Replace its page with plain markup, with no NavUI imports: the same error remains.
3. Run the same build with the existing Node 22.17 executable: succeeds.
4. Restore NavUI imports and build with that executable: succeeds.

This is baseline consumer tooling/runtime compatibility, not installed component code
or registry dependency resolution. No dependency upgrades, error suppression, or
Tailwind overrides are required. The previous direct-package pins had not changed the
loaded transitive 4.3.5 tree. Use the same verified runtime in the baseline and installed
phases; do not infer a process runtime from the workspace's Node version.

## Repeatable independent check

With the local NavUI server running and registry output regenerated:

```sh
pnpm run registry:build
pnpm run consumer:verify
```

Run from NavUI under Node 22.17 (or explicitly invoke scripts/consumer/verify.mjs with
that executable). The script prints its executable/version, creates a disposable
Next project, installs baseline tooling and builds it BEFORE NavUI installation.
It uses the real installed shadcn CLI and a local @navui namespace to install the batch,
Button and Package Manager Command, then checks installed TypeScript, builds again,
and smoke-tests production HTTP rendering. All child commands use the same runtime
PATH. The temporary production process closes in finally. The script prints the
consumer path and command for optional browser review; no second application or
node_modules is committed.

`NAVUI_REGISTRY_URL` can override the local registry template;
`NAVUI_CONSUMER_PORT` can override the short-lived production server's default 3100.
The generated consumer's .nvmrc records the tested runtime. Installing dependencies
uses the package manager's existing security policies; no approvals are disabled.

## Local previews

- `/playground/project-settings`: all five controls, validation, submission and reset.
- `/components/{field,input,select,checkbox,switch}`: documentation and source.
- `/preview/components/select--states`: long/disabled options, scrolling and multiple selection.
- `/preview/components/{field,input,checkbox,switch}--states`: practical validation and states.

## Verification record

Final command and browser results are recorded after the batch checks below.

- `pnpm run registry:build`: exit 0; 62 items, including 17 components and 45 blocks.
- `pnpm run check`: exit 0; TypeScript, 16 interaction tests, 8 registry tests and
  schema/source consistency. Lint retains only the existing unused buttonVariants
  warning in the block toolbar; no new warnings.
- `pnpm run build`: exit 0; 112 prerendered pages.
- `pnpm run consumer:verify`: exit 0; clean baseline build, real shadcn CLI install,
  installed TypeScript/build, production HTTP responses for the batch and command
  composition. Latest consumer used Node 22.17.0, Next 16.3.3 and Tailwind 4.3.5.
- Production browser: installed controls hydrated, accepted text and Space toggles,
  submitted actual FormData, restored all displayed defaults on Reset, and submitted
  those defaults afterward. Fresh production console had no warnings/errors.
- NavUI browser: 360px and 1440px, light/dark, required error focus and label/error
  associations, Space toggles, Arrow/Home/End/Enter selection, disabled option skipping,
  popup scrolling, long labels, submit/reset, and canonical component search.
  No horizontal page overflow in the sampled form/select states. A validation scroll
  adjustment keeps the first invalid field visible below the sticky site header.
- Browser reduced-motion preference switching was unavailable through the exposed
  browser controls. The real browser reported no-preference; CSS motion-safe guards
  were inspected and the DOM harness runs reduced motion, but neither substitutes
  for an OS/browser preference-change test. Screen readers, Windows forced colors,
  and physical touch/iOS devices remain unverified.
- Temporary production processes and browser tabs were closed. The pre-existing
  development server was reused. Nothing was pushed or deployed; no block source,
  SDK pin, package-manager pin or runtime dependency was changed.

Local release status: ready for review, with the explicit device/assistive checks above
still outstanding. The consumer production-build gap is closed for the verified runtime.

Next batch: Textarea, Radio Group, and Combobox. These extend the same field/validation
composition to longer text, visible single-choice sets and larger searchable datasets.
