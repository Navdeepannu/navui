import type { ComponentCatalogEntry } from "@/registry/types";

const usageIntroductions: Record<string, string> = {
  "animated-numbers":
    "Pass the final value; add a prefix, suffix, or locale when the number needs context. Screen readers receive the final formatted value.",
  button:
    'Use a native button for an action. Set type="submit" explicitly when submitting a form; return a Promise from onClick to show pending feedback.',
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
    "Place a label, one control, and optional supporting text inside Field. Field connects descriptions and visible errors to its control.",
  input:
    "Pair Input with a visible FieldLabel. Choose a native type and autocomplete value appropriate to the information being collected.",
  select:
    "Provide items for selection and render the matching options. Use a visible FieldLabel; leave value empty when the user must choose.",
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
  if (item.slug === "button")
    return [
      "Use a descriptive visible label. Give icon-only buttons an accessible name with aria-label.",
      "Enter and Space activate native buttons. Disabled buttons cannot activate; focusableWhenDisabled keeps an explanatory control reachable without enabling its action.",
      "SDK pending feedback follows a returned Promise. Use pendingAnnouncement to describe longer actions to screen readers.",
    ];
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
