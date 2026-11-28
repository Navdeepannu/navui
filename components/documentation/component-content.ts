import type { ComponentCatalogEntry } from "@/registry/types";

const usageIntroductions: Record<string, string> = {
  "animated-numbers":
    "Pass the final value; add a prefix, suffix, or locale when the number needs context. Screen readers receive the final formatted value.",
  button:
    'Use variant to set the visual emphasis of an action. Set type="submit" to submit a form, or return a Promise from onClick to show pending feedback.',
  dialog:
    "Compose a trigger, backdrop, and content inside Dialog. Give the content a title and a description, then provide an explicit close action.",
  "contribution-graph":
    "Pass daily dates and counts. Missing days and intensity levels are calculated by the component.",
  "expandable-card":
    "Compose a compact trigger and expanded content within one card. Include a title, description, and explicit close action in the expanded view.",
  "keyboard-shortcut":
    "Describe the complete key combination with keys. Use onTrigger for the action; editable fields are ignored by default.",
  "magnetic-button":
    "Use it like Button. The pointer effect enhances the action without changing keyboard activation or disabled behavior.",
  "proximity-nav":
    "Provide destination titles and links. Keep the active destination tied to your application's route or controlled state.",
  "rail-nav":
    "Use meaningful anchor destinations and match them to the sections in your page. The reveal effect supplements ordinary links.",
  tabs: "Match each tab and panel by value, and give the tab list an accessible name. Choose defaultValue for uncontrolled selection.",
  field:
    "Place a label, one control, and optional supporting text inside Field. Install NavUI Input alongside Field to use the examples on this page.",
  input:
    "Choose a native type and autocomplete value for the data you need. Use a visible label in forms, or provide an accessible name when the surrounding context already identifies the input.",
  select:
    "Provide items and render the matching options. Install NavUI Field to use the example’s visible label. Set size on SelectTrigger to match neighboring controls.",
  checkbox:
    "Use a checkbox for an independent choice. Give it a stable label and a name and value when it participates in a form.",
  switch:
    "Use a switch for an on/off setting. Keep its label stable; checked controls submit their configured value when named.",
};

export function getUsageIntroduction(item: ComponentCatalogEntry) {
  return (
    usageIntroductions[item.slug] ??
    "Import the component from its installed path and compose the parts shown below."
  );
}
export function getUsageCode(item: ComponentCatalogEntry) {
  if (item.slug === "animated-numbers")
    return `import { AnimatedNumber } from "@/components/navui/animated-numbers";

export function Example() {
  return <AnimatedNumber value={1240} prefix="$" locale="en-CA" />;
}`;
  const code = item.usageExample;
  return /on[A-Z]\w*=|\buse[A-Z]\w*\(/.test(code) &&
    !/^['"]use client['"]/m.test(code)
    ? '"use client";\n\n' + code
    : code;
}
export const requiredProps: Record<string, readonly string[]> = {
  "animated-numbers": ["value"],
  "contribution-graph": ["data"],
  "keyboard-shortcut": ["keys"],
};

export function getAccessibilityNotes(
  item: ComponentCatalogEntry,
): readonly string[] {
  if (item.slug === "button") return [];
  if (item.slug === "dialog")
    return [
      "Use DialogTitle to give the dialog an accessible name and DialogDescription for supporting context.",
      "Tab and Shift+Tab stay within modal content. Escape closes a dismissible dialog and focus returns to the opening trigger; initialFocus and finalFocus customize this policy.",
      "Long content scrolls within the dialog. The neutral opacity transition is disabled when reduced motion is requested.",
    ];
  return item.notes.filter(
    (note) =>
      /keyboard|arrow|focus|accessible|accessibility|screen reader|motion|label|aria|shortcut|disabled|validation|form|touch|rtl/i.test(
        note,
      ) && !note.startsWith("Breaking change:"),
  );
}
