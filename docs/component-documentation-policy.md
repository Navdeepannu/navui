# Component ownership and API documentation

The documentation renderer classifies each published component in
`components/documentation/component-documentation-policy.ts`. The mapping is
exhaustive for the current component catalog, so a new catalog slug must receive
an ownership classification and, where appropriate, a verified UI SDK link
before it can be documented.

## Ownership audit

| Ownership | Components | Source basis |
| --- | --- | --- |
| Foundation | Button, Dialog, Tabs, Field, Input, Select, Checkbox, Switch | Styled wrappers or exports of UI SDK React primitives. |
| Extended | Magnetic Button | Adds pointer movement and spring behavior to the NavUI Button wrapper. |
| Custom | Animated Numbers, Contribution Graph, Expandable Card, Keyboard Shortcut, Proximity Nav, Rail Nav | Original NavUI behavior or composition. Expandable Card uses UI SDK Dialog lifecycle. |

Ownership is about the component's public purpose and source, not whether it
uses an SDK primitive internally. Custom compositions may rely on UI SDK
behavior while keeping a NavUI-owned API.

## Rendering rules

- Foundation pages keep their preview, install command, and usage example. Their
  API section gives the ownership label and direct UI SDK link. Inherited SDK
  props are omitted; an explicit allowlist is required for any essential
  component-specific props.
- Extended pages list only their additional public props and link to UI SDK for
  inherited props. Magnetic Button documents movement, wrapper styling, and
  spring options; native Button props stay upstream.
- Custom pages document their public component props and composition. They omit
  generic native attribute spreads such as `...props` and avoid repeating every
  inherited HTML attribute. Expandable Card's root dialog state is inherited
  from UI SDK and is therefore omitted from its custom reference.
- The shared API renderer returns no section if neither an ownership summary nor
  component-specific props are present. The page outline is generated from
  rendered headings, so removed sections do not leave stale entries.
- Preserve source attribution and licenses independently of the ownership label.

## Verified UI SDK references

These React documentation URLs were checked against the installed UI SDK docs
and the official documentation site:

- [Button](https://ui-sdk.dev/docs/react/components/button)
- [Dialog](https://ui-sdk.dev/docs/react/components/dialog)
- [Tabs](https://ui-sdk.dev/docs/react/components/tabs)
- [Field](https://ui-sdk.dev/docs/react/components/field)
- [Input](https://ui-sdk.dev/docs/react/components/input)
- [Select](https://ui-sdk.dev/docs/react/components/select)
- [Checkbox](https://ui-sdk.dev/docs/react/components/checkbox)
- [Switch](https://ui-sdk.dev/docs/react/components/switch)

Do not add API tables copied from UI SDK. Keep behavior, public props, registry
metadata, source files, attribution, and licenses unchanged when maintaining
this documentation policy.
