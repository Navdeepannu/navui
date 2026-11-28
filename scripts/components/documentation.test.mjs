import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { createElement as h, act } from "react";
import { createAgent } from "@ui-sdk/react/agent";
import { createRoot } from "react-dom/client";
import { BlockSourceExplorer } from "../../components/blocks/block-source-explorer.tsx";
import { CodeBlock } from "../../components/documentation/code-block.tsx";
import { CompactExample } from "../../components/documentation/compact-example.tsx";
import { CommandBlock } from "../../components/documentation/command-block.tsx";
import { InstallationTabs } from "../../components/documentation/installation-tabs.tsx";
import { DocumentationCommand } from "../../components/documentation/package-manager-preference.tsx";
import { ApiReference } from "../../components/documentation/api-reference.tsx";
import { componentCatalog } from "../../registry/catalog.ts";
import { getUsageCode } from "../../components/documentation/component-content.ts";
import {
  getComponentPreviewSize,
  previewMinimumHeights,
} from "../../components/documentation/preview-size.ts";
import { clampBlockPreviewHeight } from "../../components/blocks/block-preview-height.ts";
import { highlightCode } from "../../lib/highlight-code.ts";

let root, host;
async function mount(element) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(() => root.render(element));
}
async function settle(fn) {
  await act(async () => {
    fn();
    await new Promise((resolve) => setTimeout(resolve, 20));
  });
}
afterEach(async () => {
  if (root) await act(() => root.unmount());
  host?.remove();
  root = null;
});
const file = {
  target: "example.tsx",
  code: '<Input name="project" />',
  highlightedCode:
    '<pre class="shiki"><code><span class="line">&lt;Input name="project" /&gt;</span></code></pre>',
};

test("code disclosure exposes one named scroll region only when expanded; copying preserves exact source", async () => {
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async (value) => {
        copied = value;
      },
    },
  });
  await mount(h(CodeBlock, { file, collapsible: true }));
  const trigger = host.querySelector("button[aria-expanded]");
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.ok(
    createAgent()
      .snapshot()
      .some((entry) => !entry.offPage && entry.label.includes("View code")),
  );
  assert.equal(host.querySelector(".code-content"), null);
  assert.ok(host.querySelector('.code-teaser[aria-hidden="true"][inert]'));
  await settle(() => trigger.click());
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  assert.equal(
    host.querySelector(".code-content").getAttribute("tabindex"),
    "0",
  );
  assert.equal(host.querySelector(".code-content").textContent, file.code);
  await settle(() =>
    host.querySelector('[aria-label="Copy example.tsx"]').click(),
  );
  assert.equal(copied, file.code);
  assert.ok(host.querySelector('[aria-label="Copied"]'));
  await settle(() => trigger.click());
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
});

test("compact examples can be copied before opening their highlighted source", async () => {
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (value) => { copied = value; } },
  });
  await mount(h(CompactExample, { file }, h("input", { "aria-label": "Project" })));
  const trigger = host.querySelector("button[aria-expanded]");
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(host.querySelector(".code-content"), null);
  assert.ok(host.querySelector('input[aria-label="Project"]'));
  await settle(() => host.querySelector('[aria-label="Copy example.tsx"]').click());
  assert.equal(copied, file.code);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  await settle(() => trigger.click());
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  assert.equal(host.querySelector(".code-content .shiki").textContent, file.code);
});

test("installation tabs select CLI/manual with keyboard and commands copy the selected package manager", async () => {
  let copied;
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: async (value) => {
        copied = value;
      },
    },
  });
  const commands = {
    pnpm: "pnpm dlx shadcn@latest add @navui/input",
    npm: "npx shadcn@latest add @navui/input",
    yarn: "yarn dlx shadcn@latest add @navui/input",
    bun: "bunx --bun shadcn@latest add @navui/input",
  };
  const highlighted = Object.fromEntries(
    await Promise.all(
      Object.entries(commands).map(async ([key, value]) => [
        key,
        await highlightCode(value, "shellscript"),
      ]),
    ),
  );
  localStorage.clear();
  await mount(
    h(
      "div",
      null,
      h(DocumentationCommand, { commands }),
      h(InstallationTabs, {
        command: h(CommandBlock, { commands, highlighted }),
        manual: h(CodeBlock, { file }),
      }),
    ),
  );
  assert.ok(
    host.querySelector(
      "[data-code-frame] > [data-code-surface] [data-code-content][data-compact]",
    ),
  );
  assert.equal(
    host
      .querySelector("[data-code-content][data-compact]")
      .classList.contains("code-line-numbers"),
    false,
  );
  await settle(() =>
    host.querySelectorAll('[aria-label="Copy npm install command"]')[1].click(),
  );
  assert.equal(copied, commands.npm);
  await settle(() =>
    [...host.querySelectorAll('[role="tab"]')]
      .find((tab) => tab.textContent === "yarn")
      .click(),
  );
  assert.equal(localStorage.getItem("navui:package-manager"), "yarn");
  assert.equal(
    host.querySelectorAll('[role="combobox"]')[0].textContent.includes("yarn"),
    true,
  );
  await settle(() =>
    host
      .querySelectorAll('[aria-label="Copy yarn install command"]')[1]
      .click(),
  );
  assert.equal(copied, commands.yarn);
  const writeStorage = Storage.prototype.setItem;
  Storage.prototype.setItem = () => {
    throw new Error("Quota exceeded");
  };
  try {
    const yarn = [...host.querySelectorAll('[role="tab"]')]
      .find((tab) => tab.textContent === "yarn");
    await settle(() => {
      yarn.focus();
      yarn.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    });
    assert.equal(host.querySelector('[aria-label="bun install command"]').textContent.includes(commands.bun), true);
    assert.ok(
      host.querySelectorAll('[role="combobox"]')[0].textContent.includes("bun"),
    );
    assert.equal(localStorage.getItem("navui:package-manager"), "yarn");
  } finally {
    Storage.prototype.setItem = writeStorage;
  }
  const cli = [...host.querySelectorAll('[role="tab"]')].find(
    (tab) => tab.textContent === "Command",
  );
  await settle(() => {
    cli.focus();
    cli.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );
  });
  const manual = [...host.querySelectorAll('[role="tab"]')].find(
    (tab) => tab.textContent === "Manual",
  );
  assert.equal(manual.getAttribute("aria-selected"), "true");
  assert.equal(document.activeElement, manual);
  assert.ok(host.querySelector('[aria-label="Copy example.tsx"]'));
});

test("one highlighter supports every documentation language, Vesper/GitHub Light Default themes and escaped code", async () => {
  for (const [language, code] of Object.entries({
    typescript: 'const label: string = "NavUI";',
    tsx: '<Input name="project" />',
    javascript: 'console.log("NavUI")',
    json: '{"name":"NavUI"}',
    css: ".control { color: green; }",
    shellscript: "pnpm dlx shadcn@latest add @navui/input",
  })) {
    const html = await highlightCode(code, language);
    assert.match(html, /class="shiki/);
    assert.match(html, /--shiki-dark:/);
    assert.match(html, /<span style=/);
  }
  const html = await highlightCode(
    '<Input title="<script>alert(1)</script>" />',
    "tsx",
  );
  assert.ok(!html.includes("<script>"));
  assert.match(html, /shiki-themes github-light-default vesper/);
});

test("preview sizes keep simple controls compact, custom compositions large, and retain content-driven growth", () => {
  assert.equal(getComponentPreviewSize("button"), "compact");
  assert.equal(getComponentPreviewSize("dialog"), "compact");
  assert.equal(getComponentPreviewSize("animated-numbers"), "default");
  assert.equal(
    clampBlockPreviewHeight(100, previewMinimumHeights.compact),
    400,
  );
  assert.equal(
    clampBlockPreviewHeight(900, previewMinimumHeights.compact),
    910,
  );
  assert.equal(clampBlockPreviewHeight(100), 680);
});

test("API tables expose required props and defaults with an upstream link for inherited APIs", async () => {
  const numbers = componentCatalog.find(
    (item) => item.slug === "animated-numbers",
  );
  await mount(h(ApiReference, { item: numbers }));
  assert.equal(host.querySelector("h2").textContent, "API reference");
  assert.match(host.querySelector("tbody th").textContent, /valueRequired/);
  assert.equal(host.querySelectorAll("thead th").length, 4);
  assert.ok(!getUsageCode(numbers).includes("metrics"));
  assert.equal(
    (getUsageCode(numbers).match(/<AnimatedNumber /g) ?? []).length,
    1,
  );
  const button = componentCatalog.find((item) => item.slug === "button");
  await act(() => root.render(h(ApiReference, { item: button })));
  assert.deepEqual([...host.querySelectorAll("tbody th")].map((el) => el.textContent), ["variant", "size"]);
  assert.equal(host.querySelector("tbody tr td:nth-child(3) code").textContent, '"default"');
  assert.match(host.querySelector("a").href, /ui-sdk\.dev\/docs\/react\/components\/button$/);

  const input = componentCatalog.find((item) => item.slug === "input");
  await act(() => root.render(h(ApiReference, { item: input })));
  assert.deepEqual([...host.querySelectorAll("tbody th")].map((el) => el.textContent), ["controlSize"]);
  assert.match(host.querySelector("a").href, /ui-sdk\.dev\/docs\/react\/components\/input$/);

  const field = componentCatalog.find((item) => item.slug === "field");
  await act(() => root.render(h(ApiReference, { item: field })));
  assert.equal(host.querySelector("table"), null);
  assert.match(host.querySelector("a").href, /ui-sdk\.dev\/docs\/react\/components\/field$/);

  const dialog = componentCatalog.find((item) => item.slug === "dialog");
  await act(() => root.render(h(ApiReference, { item: dialog })));
  assert.equal(host.querySelector("table"), null);
  assert.match(host.querySelector("a").href, /ui-sdk\.dev\/docs\/react\/components\/dialog$/);
});

test("Components and Blocks share the inset code foundation while only Blocks exposes file navigation", async () => {
  await mount(h(CodeBlock, { file }));
  const componentFrame = host.querySelector("[data-code-frame]");
  const componentSurface = componentFrame.querySelector("[data-code-surface]");
  const copy = componentSurface.querySelector(
    '[aria-label="Copy example.tsx"]',
  );
  assert.ok(copy.classList.contains("absolute"));
  assert.ok(copy.classList.contains("inset-e-2"));
  assert.ok(copy.classList.contains("top-2"));
  assert.equal(componentSurface.querySelectorAll("pre").length, 1);
  assert.equal(componentSurface.querySelector("code[title]"), null);
  assert.equal(componentFrame.querySelector("nav"), null);
  assert.ok(
    componentSurface.querySelector("[data-code-content].code-line-numbers"),
  );
  await act(() =>
    root.render(
      h(BlockSourceExplorer, {
        files: [file, { ...file, target: "helper.ts" }],
      }),
    ),
  );
  assert.ok(host.querySelector("[data-code-frame] > [data-code-surface]"));
  assert.ok(host.querySelector('nav[aria-label="Source files"]'));
  await settle(() =>
    [...host.querySelectorAll("nav button")]
      .find((button) => button.textContent.includes("helper.ts"))
      .click(),
  );
  assert.ok(host.querySelector('[aria-label="Source code for helper.ts"]'));
});
