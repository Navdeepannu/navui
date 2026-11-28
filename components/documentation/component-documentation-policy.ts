import type { ComponentCatalogEntry } from "@/registry/types";

type ComponentSlug =
  | "animated-numbers"
  | "button"
  | "contribution-graph"
  | "dialog"
  | "expandable-card"
  | "keyboard-shortcut"
  | "magnetic-button"
  | "proximity-nav"
  | "rail-nav"
  | "tabs"
  | "field"
  | "input"
  | "select"
  | "checkbox"
  | "switch";

type ComponentDocumentationPolicy = {
  ownership: "foundation" | "extended" | "custom";
  uiSdkUrl?: string;
  uiSdkLabel?: string;
  includeProps?: readonly string[];
  excludeProps?: readonly string[];
  summary: string;
};

const reactDocs = "https://ui-sdk.dev/docs/react/components";
const sdk = (name: string) => `${reactDocs}/${name}`;

export const componentDocumentationPolicy = {
  "animated-numbers": {
    ownership: "custom",
    excludeProps: ["...props"],
    summary: "Custom NavUI component.",
  },
  button: {
    ownership: "foundation",
    uiSdkUrl: sdk("button"),
    includeProps: ["variant", "size"],
    summary:
      "Foundation component styled on UI SDK Button.",
  },
  "contribution-graph": {
    ownership: "custom",
    excludeProps: ["className / figure props"],
    summary: "Custom NavUI component.",
  },
  dialog: {
    ownership: "foundation",
    uiSdkUrl: sdk("dialog"),
    summary: "Foundation component built on UI SDK Dialog.",
  },
  "expandable-card": {
    ownership: "custom",
    excludeProps: ["ExpandableCard"],
    summary:
      "Custom NavUI card composition. UI SDK Dialog provides its accessible dialog lifecycle.",
  },
  "keyboard-shortcut": {
    ownership: "custom",
    summary: "Custom NavUI keyboard shortcut component.",
  },
  "magnetic-button": {
    ownership: "extended",
    uiSdkUrl: sdk("button"),
    uiSdkLabel: "Button",
    includeProps: ["movement", "wrapperClassName", "springOptions"],
    excludeProps: ["...props"],
    summary:
      "Extends UI SDK Button with pointer movement and spring configuration. Button props are inherited; see UI SDK for their complete API.",
  },
  "proximity-nav": {
    ownership: "custom",
    summary: "Custom NavUI navigation component.",
  },
  "rail-nav": {
    ownership: "custom",
    excludeProps: ["RailNav"],
    summary: "Custom NavUI navigation component.",
  },
  tabs: {
    ownership: "foundation",
    uiSdkUrl: sdk("tabs"),
    summary: "Foundation component built on UI SDK Tabs.",
  },
  field: {
    ownership: "foundation",
    uiSdkUrl: sdk("field"),
    summary: "Foundation component built on UI SDK Field.",
  },
  input: {
    ownership: "foundation",
    uiSdkUrl: sdk("input"),
    includeProps: ["controlSize"],
    summary: "Foundation component styled on UI SDK Input.",
  },
  select: {
    ownership: "foundation",
    uiSdkUrl: sdk("select"),
    includeProps: ["size"],
    summary: "Foundation component styled on UI SDK Select.",
  },
  checkbox: {
    ownership: "foundation",
    uiSdkUrl: sdk("checkbox"),
    summary: "Foundation component styled on UI SDK Checkbox.",
  },
  switch: {
    ownership: "foundation",
    uiSdkUrl: sdk("switch"),
    summary: "Foundation component styled on UI SDK Switch.",
  },
} satisfies Record<ComponentSlug, ComponentDocumentationPolicy>;

export function getComponentDocumentationPolicy(
  item: ComponentCatalogEntry,
): ComponentDocumentationPolicy {
  return componentDocumentationPolicy[item.slug as ComponentSlug];
}
