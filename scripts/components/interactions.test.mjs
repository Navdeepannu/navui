import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { createElement as h, act, createRef } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../../registry/components/button.tsx";
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from "../../registry/components/tabs.tsx";
import {
  ExpandableCard,
  ExpandableCardTrigger,
  ExpandableCardContent,
  ExpandableCardTitle,
  ExpandableCardDescription,
} from "../../registry/components/expandable-card.tsx";
import { PackageManagerCommand } from "../../registry/components/package-manager-command.tsx";
import { KeyboardShortcut } from "../../registry/components/keyboard-shortcut.tsx";
import { createContributionGraphData } from "../../registry/components/contribution-graph.tsx";
import {
  SegmentSpotlight,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
  SegmentSpotlightSegment,
} from "../../registry/components/segment-spotlight.tsx";
import { createAgent } from "@ui-sdk/react/agent";
let root, host;
const agent = createAgent();
async function mount(element) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => {
    root.render(element);
  });
}
async function settle(action) {
  await act(async () => {
    action?.();
    await new Promise((resolve) => setTimeout(resolve, 5));
  });
}
afterEach(async () => {
  if (root) await act(() => root.unmount());
  host?.remove();
  root = null;
});
// jsdom has no native Enter-to-click default action for buttons.
const key = (el, value, extra = {}) => {
  const event = new KeyboardEvent("keydown", {
    key: value,
    bubbles: true,
    cancelable: true,
    ...extra,
  });
  el.dispatchEvent(event);
  if (value === "Enter" && el.tagName === "BUTTON" && !event.defaultPrevented)
    el.click();
  el.dispatchEvent(
    new KeyboardEvent("keyup", { key: value, bubbles: true, ...extra }),
  );
};

test("Button forwards refs, native forms, disabled and pending state", async () => {
  let calls = 0,
    presses = 0,
    release,
    reject;
  const ref = createRef();
  await mount(
    h(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          calls++;
        },
      },
      h(Button, { ref, type: "submit" }, "Submit"),
      h(Button, { disabled: true, onClick: () => calls++ }, "Disabled"),
      h(
        Button,
        {
          onClick: () => {
            presses++;
            return new Promise((resolve, rejectPress) => {
              release = resolve;
              reject = rejectPress;
            });
          },
        },
        (state) => (state.error ? "Retry save" : "Save"),
      ),
    ),
  );
  assert.equal(ref.current.tagName, "BUTTON");
  await settle(() => ref.current.click());
  assert.equal(calls, 1);
  await settle(() => host.querySelector("[disabled]").click());
  assert.equal(calls, 1);
  const pending = [...host.querySelectorAll("button")][2];
  await settle(() => {
    pending.focus();
    key(pending, "Enter");
  });
  assert.equal(pending.getAttribute("aria-busy"), "true");
  await settle(() => pending.click());
  assert.equal(presses, 1);
  assert.equal(document.activeElement, pending);
  await settle(() => reject(new Error("Save failed")));
  assert.notEqual(pending.getAttribute("aria-busy"), "true");
  assert.equal(pending.textContent, "Retry save");
  await settle(() => pending.click());
  assert.equal(presses, 2);
  assert.equal(pending.getAttribute("aria-busy"), "true");
  await settle(() => release());
  assert.notEqual(pending.getAttribute("aria-busy"), "true");
  assert.equal(pending.textContent, "Save");
});
test("Tabs own automatic/manual navigation, cancellation and inactive panel focus", async () => {
  const render = (options = {}) =>
    h(
      Tabs,
      { key: options.activation ?? "auto", defaultValue: "one", ...options },
      h(
        TabsList,
        { "aria-label": "Sections" },
        h(TabsTab, { value: "one" }, "One"),
        h(TabsTab, { value: "two" }, "Two"),
        h(TabsTab, { value: "disabled", disabled: true }, "Unavailable"),
      ),
      h(TabsPanel, { value: "one" }, "First"),
      h(TabsPanel, { value: "two" }, h("button", null, "Second action")),
    );
  await mount(render({ onValueChange: (_v, details) => details.cancel() }));
  const tabs = host.querySelectorAll("[role=tab]");
  await settle(() => tabs[1].click());
  assert.equal(tabs[0].getAttribute("aria-selected"), "true");
  await settle(() => root.render(render({ activation: "manual" })));
  const manual = host.querySelectorAll("[role=tab]");
  await settle(() => {
    manual[0].focus();
    key(manual[0], "ArrowRight");
  });
  assert.equal(document.activeElement, manual[1]);
  assert.equal(manual[0].getAttribute("aria-selected"), "true");
  await settle(() => key(manual[1], "Enter"));
  assert.equal(manual[1].getAttribute("aria-selected"), "true");
  assert.equal(
    host.querySelector("[role=tabpanel]:not([hidden])").textContent,
    "Second action",
  );
});
test("ExpandableCard uses SDK dismissal, title and focus return without duplicate dialogs", async () => {
  await mount(
    h(
      ExpandableCard,
      null,
      h(ExpandableCardTrigger, null, "Open card"),
      h(
        ExpandableCardContent,
        null,
        h(ExpandableCardTitle, null, "Card details"),
        h(ExpandableCardDescription, null, "Description"),
        h("p", null, "Body"),
      ),
    ),
  );
  const trigger = host.querySelector("button");
  await settle(() => {
    trigger.focus();
    trigger.click();
  });
  assert.equal(document.querySelectorAll("[role=dialog]").length, 1);
  const dialog = document.querySelector("[role=dialog]");
  assert.ok(
    document
      .getElementById(dialog.getAttribute("aria-labelledby"))
      .textContent.includes("Card details"),
  );
  await settle(() => key(document.activeElement, "Escape"));
  assert.equal(document.activeElement, trigger);
  assert.ok(
    !document.querySelector("[role=dialog]") ||
      document.querySelector("[role=dialog]").hidden,
  );
});
test("Package selector is agent-operable and clipboard failures announce a recovery", async () => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async () => {
        throw new Error("Denied");
      },
    },
  });
  await mount(
    h(PackageManagerCommand, {
      commands: { npm: "npm command", bun: "bun command" },
    }),
  );
  const snapshot = agent.snapshot().filter((e) => !e.offPage);
  assert.ok(snapshot.some((e) => e.label === "Package manager"));
  await act(async () => {
    const r = await agent.act({
      steps: [{ ref: "Package manager", action: "setValue", args: ["bun"] }],
    });
    assert.equal(r.ok, true, r.error?.message);
  });
  assert.ok(host.textContent.includes("bun command"));
  await settle(() => host.querySelector("button").click());
  assert.match(host.querySelector("[role=status]").textContent, /Copy failed/);
});
test("Shortcuts ignore editing, extra modifiers, IME and repeated presses and clean up", async () => {
  let count = 0;
  await mount(
    h(
      "div",
      null,
      h("input"),
      h(KeyboardShortcut, {
        keys: [{ key: "Control" }, { key: "k" }],
        onTrigger: () => count++,
      }),
    ),
  );
  await settle(() => key(host.querySelector("input"), "k", { ctrlKey: true }));
  await settle(() => key(window, "k", { ctrlKey: true, altKey: true }));
  await settle(() => key(window, "k", { ctrlKey: true, isComposing: true }));
  assert.equal(count, 0);
  await settle(() => key(window, "k", { ctrlKey: true }));
  assert.equal(count, 1);
  await settle(() => key(window, "k", { ctrlKey: true, repeat: true }));
  assert.equal(count, 1);
  await act(() => root.unmount());
  root = null;
  key(window, "k", { ctrlKey: true });
  assert.equal(count, 1);
});
test("Contribution normalization rejects invalid dates, merges duplicates and fills missing days", () => {
  const result = createContributionGraphData([
    { date: "2026-02-30", count: 100 },
    { date: "2026-11-01", count: 2 },
    { date: "2026-11-01", count: 3 },
    { date: "2026-11-03", count: 1 },
  ]);
  assert.equal(result.total, 6);
  assert.equal(result.days.length, 3);
  assert.equal(result.days[1].count, 0);
});
test("Spotlight is a toolbar: arrows move focus and click selection stays distinct", async () => {
  await mount(
    h(
      SegmentSpotlight,
      { activationMode: "click" },
      h(
        SegmentSpotlightViewport,
        null,
        h(SegmentSpotlightSegment, { value: "a" }, "A"),
        h(SegmentSpotlightSegment, { value: "b" }, "B"),
        h(
          SegmentSpotlightToolbar,
          { "aria-label": "Tools" },
          h(
            SegmentSpotlightTrigger,
            { value: "a", "aria-label": "First" },
            "First",
          ),
          h(
            SegmentSpotlightTrigger,
            { value: "b", "aria-label": "Second" },
            "Second",
          ),
        ),
      ),
    ),
  );
  const buttons = host.querySelectorAll("button");
  await settle(() => {
    buttons[0].focus();
    key(buttons[0], "ArrowRight");
  });
  assert.equal(document.activeElement, buttons[1]);
  assert.equal(buttons[1].getAttribute("aria-pressed"), "false");
  await settle(() => buttons[1].click());
  assert.equal(buttons[1].getAttribute("aria-pressed"), "true");
});

test('controlled Tabs wait for their consumer value', async () => {
  let requested;
  const view = (value) => h(Tabs, {value, onValueChange: next => { requested = next; }}, h(TabsList, {'aria-label':'Controlled'}, h(TabsTab,{value:'one'},'One'),h(TabsTab,{value:'two'},'Two')),h(TabsPanel,{value:'one'},'First'),h(TabsPanel,{value:'two'},'Second'));
  await mount(view('one'));
  await settle(() => host.querySelectorAll('[role=tab]')[1].click());
  assert.equal(requested, 'two');
  assert.equal(host.querySelector('[aria-selected=true]').textContent,'One');
  await settle(() => root.render(view(requested)));
  assert.equal(host.querySelector('[aria-selected=true]').textContent,'Two');
});
