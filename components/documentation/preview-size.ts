export type ComponentPreviewSize = "compact" | "default" | "large";
export const previewMinimumHeights = {
  compact: 400,
  default: 520,
  large: 640,
} as const;
const compact = new Set([
  "button",
  "dialog",
  "input",
  "checkbox",
  "switch",
  "select",
  "field",
  "magnetic-button",
  "keyboard-shortcut",
]);
const large = new Set([
  "expandable-card",
  "rail-nav",
  "proximity-nav",
]);
export function getComponentPreviewSize(slug: string): ComponentPreviewSize {
  if (large.has(slug)) return "large";
  return compact.has(slug) ? "compact" : "default";
}
export const previewSizeClasses = {
  compact: "min-h-100",
  default: "min-h-130",
  large: "min-h-160",
} as const;
