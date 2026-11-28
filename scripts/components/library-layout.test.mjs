import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { createElement as h, act } from "react";
import { createRoot } from "react-dom/client";
import { OnThisPage } from "../../components/library/on-the-page.tsx";
import { ScrollNavigation } from "../../components/library/scroll-navigation.tsx";
let root, host;
async function settle(fn) {
  await act(async () => {
    fn?.();
    await new Promise((resolve) => setTimeout(resolve, 35));
  });
}
async function mount(element) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(() => root.render(element));
  await settle();
}
afterEach(async () => {
  if (root) await act(() => root.unmount());
  host?.remove();
  window.history.replaceState(null, "", window.location.pathname);
  await new Promise((resolve) => setTimeout(resolve, 35));
  root = null;
});

test("OnThisPage derives real headings, depths, hashes and tracks both scroll directions", async () => {
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 10000,
  });
  let tops = { installation: 160, usage: 900, nested: 1100 };
  const heading = (tag, id, title) =>
    h(
      tag,
      {
        id,
        ref: (el) => {
          if (el) el.getBoundingClientRect = () => ({ top: tops[id] });
        },
      },
      title,
    );
  await mount(
    h(
      "div",
      null,
      h(
        "main",
        { id: "docs" },
        heading("h2", "installation", "Installation"),
        heading("h2", "usage", "Usage"),
        heading("h3", "nested", "Custom rendering"),
        h("h2", null, "Excluded without an anchor"),
      ),
      h(OnThisPage, { contentId: "docs" }),
    ),
  );
  const links = [...host.querySelectorAll("nav a")];
  assert.deepEqual(
    links.map((el) => el.textContent),
    ["Installation", "Usage", "Custom rendering"],
  );
  assert.equal(links[2].getAttribute("href"), "#nested");
  assert.equal(links[2].dataset.depth, "1");
  assert.equal(host.querySelector("[aria-current=location]").textContent, "Installation");
  tops = { installation: 90, usage: 900, nested: 1100 };
  await settle(() => window.dispatchEvent(new Event("scroll")));
  assert.equal(
    host.querySelector("[aria-current=location]").textContent,
    "Installation",
  );
  tops = { installation: -500, usage: 90, nested: 600 };
  await settle(() => window.dispatchEvent(new Event("scroll")));
  assert.equal(
    host.querySelector("[aria-current=location]").textContent,
    "Usage",
  );
  tops = { installation: 80, usage: 250, nested: 800 };
  await settle(() => window.dispatchEvent(new Event("scroll")));
  assert.equal(host.querySelector("[aria-current=location]").textContent, "Installation");
  tops = { installation: -900, usage: -200, nested: 92 };
  await settle(() => window.dispatchEvent(new Event("hashchange")));
  assert.equal(
    host.querySelector("[aria-current=location]").textContent,
    "Custom rendering",
  );
  tops = { installation: -900, usage: 90, nested: 140 };
  await settle(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 9500 });
    window.dispatchEvent(new Event("scroll"));
  });
  assert.equal(host.querySelector("[aria-current=location]").textContent, "Usage");
});
test("OnThisPage omits itself for a page without meaningful sections", async () => {
  await mount(
    h(
      "div",
      null,
      h("main", { id: "brief" }, h("h2", { id: "single" }, "One section")),
      h(OnThisPage, { contentId: "brief" }),
    ),
  );
  assert.equal(host.querySelector("nav"), null);
});
test("OnThisPage marks every visible section while retaining a single current link", async () => {
  const tops = { example: -200, api: 220, accessibility: 450 };
  const heading = (id, tag = "h2") => h(tag, {
    id,
    ref: (el) => { if (el) el.getBoundingClientRect = () => ({ top: tops[id] }); },
  }, id);
  await mount(h("div", null,
    h("main", { id: "visible-docs", ref: (el) => { if (el) el.getBoundingClientRect = () => ({ bottom: 700 }); } },
      heading("example", "h3"), heading("api"), heading("accessibility")),
    h(OnThisPage, { contentId: "visible-docs" }),
  ));
  assert.deepEqual([...host.querySelectorAll('[data-toc] a[data-visible]')].map((el) => el.textContent),
    ["example", "api", "accessibility"]);
  assert.equal(host.querySelectorAll('[data-toc] a[aria-current="location"]').length, 1);
});
test("clicked section stays active through smooth scrolling, then resumes scroll tracking", async () => {
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  let tops = { api: 500, accessibility: 900 };
  const heading = (id, title) => h("h2", {
    id,
    ref: (el) => { if (el) el.getBoundingClientRect = () => ({ top: tops[id] }); },
  }, title);
  await mount(h("div", null,
    h("main", { id: "api-docs" }, heading("api", "API reference"), heading("accessibility", "Accessibility")),
    h(OnThisPage, { contentId: "api-docs" }),
  ));
  const api = host.querySelector('a[href="#api"]');
  await settle(() => api.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 })));
  assert.equal(window.location.hash, "#api");
  assert.equal(host.querySelector('[aria-current="location"]').textContent, "API reference");

  tops = { api: -200, accessibility: 90 };
  window.dispatchEvent(new Event("scroll"));
  assert.equal(host.querySelector('[aria-current="location"]').textContent, "API reference");
  await settle(() => window.dispatchEvent(new Event("scrollend")));
  assert.equal(host.querySelector('[aria-current="location"]').textContent, "Accessibility");
  await settle(() => {
    window.dispatchEvent(new Event("wheel"));
    window.dispatchEvent(new Event("scroll"));
  });
  assert.equal(host.querySelector('[aria-current="location"]').textContent, "Accessibility");
});
test("a bottom-clamped direct hash keeps its requested heading active", async () => {
  Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 10000 });
  Object.defineProperty(window, "scrollY", { configurable: true, value: 9500 });
  let tops = { installation: -900, api: 500, accessibility: 600 };
  const heading = (id, title) => h("h2", { id, ref: (el) => { if (el) el.getBoundingClientRect = () => ({ top: tops[id] }); } }, title);
  window.history.replaceState(null, "", "#api");
  await mount(h("div", null,
    h("main", { id: "history-docs" }, heading("installation", "Installation"), heading("api", "API reference"), heading("accessibility", "Accessibility")),
    h(OnThisPage, { contentId: "history-docs" }),
  ));
  await settle();
  assert.equal(host.querySelector('[aria-current="location"]').textContent, "API reference");
});
test("unsupported-browser fades detect all edges and no overflow without masking the border", async () => {
  const oldCSS = globalThis.CSS;
  Object.defineProperty(globalThis, "CSS", {
    configurable: true,
    value: { supports: () => false },
  });
  try {
    await mount(h(ScrollNavigation, null, h("nav", null, "Navigation")));
    const viewport = host.querySelector("[data-library-scroll]");
    Object.defineProperty(viewport, "clientHeight", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(viewport, "scrollHeight", {
      configurable: true,
      value: 300,
    });
    const check = async (top, t, b) => {
      viewport.scrollTop = top;
      await settle(() => viewport.dispatchEvent(new Event("scroll")));
      assert.equal(viewport.style.getPropertyValue("--scroll-fade-t"), t);
      assert.equal(viewport.style.getPropertyValue("--scroll-fade-b"), b);
    };
    await check(0, "0px", "16px");
    await check(100, "16px", "16px");
    await check(200, "16px", "0px");
    Object.defineProperty(viewport, "scrollHeight", {
      configurable: true,
      value: 100,
    });
    await check(0, "0px", "0px");
    assert.equal(viewport.className.includes("border"), false);
  } finally {
    Object.defineProperty(globalThis, "CSS", {
      configurable: true,
      value: oldCSS,
    });
  }
});

test("native timeline navigation drops its mask when resizing removes overflow", async () => {
  const oldCSS = globalThis.CSS,
    oldObserver = globalThis.ResizeObserver;
  let resized;
  Object.defineProperty(globalThis, "CSS", {
    configurable: true,
    value: { supports: () => true },
  });
  globalThis.ResizeObserver = class {
    constructor(callback) {
      resized = callback;
    }
    observe() {}
    disconnect() {}
  };
  try {
    await mount(h(ScrollNavigation, null, "Links"));
    const viewport = host.querySelector("[data-library-scroll]");
    Object.defineProperty(viewport, "clientHeight", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(viewport, "scrollHeight", {
      configurable: true,
      value: 300,
    });
    await settle(() => resized());
    assert.equal(viewport.dataset.overflow, "true");
    Object.defineProperty(viewport, "clientHeight", {
      configurable: true,
      value: 300,
    });
    await settle(() => resized());
    assert.equal(viewport.dataset.overflow, "false");
    assert.equal(viewport.style.getPropertyValue("--scroll-fade-t"), "");
  } finally {
    Object.defineProperty(globalThis, "CSS", {
      configurable: true,
      value: oldCSS,
    });
    globalThis.ResizeObserver = oldObserver;
  }
});

test("OnThisPage discovers sections streamed after its initial mount", async () => {
  await mount(
    h(
      "div",
      null,
      h("main", { id: "streamed" }, h("h2", { id: "initial" }, "Installation")),
      h(OnThisPage, { contentId: "streamed" }),
    ),
  );
  assert.equal(host.querySelector("[data-toc]"), null);
  const heading = document.createElement("h3");
  heading.id = "late-usage";
  heading.textContent = "Composed example";
  await settle(() => host.querySelector("main").append(heading));
  await settle();
  assert.deepEqual(
    [...host.querySelectorAll("nav a")].map((el) => el.textContent),
    ["Installation", "Composed example"],
  );
  assert.equal(
    host.querySelector('a[href="#late-usage"]').dataset.depth,
    "1",
  );
  await settle(() => heading.remove());
  await settle();
  assert.equal(host.querySelector("[data-toc]"), null);
});

test("library navigation uses Proximity Nav with route-driven active links and category counts", async () => {
  const { LibraryNavigation } = await import(
    "../../components/library/library-navigation.tsx"
  );
  let navigated = 0;
  await mount(
    h(LibraryNavigation, {
      navigation: {
        title: "Categories",
        items: [
          { title: "All categories", href: "/blocks/base" },
          { title: "Headers", href: "/blocks/base/header", count: 4 },
        ],
      },
      pathname: "/blocks/base/header",
      onNavigate: () => navigated++,
    }),
  );
  assert.equal(
    host.querySelector("nav").getAttribute("aria-label"),
    "Categories navigation",
  );
  assert.equal(
    host.querySelector('[aria-current="page"]').textContent,
    "Headers (4)",
  );
  assert.ok(host.querySelector("nav").classList.contains("library-proximity"));
  const link = host.querySelector("a");
  assert.equal(link.getAttribute("href"), "/blocks/base");
  link.addEventListener("click", (event) => event.preventDefault());
  await settle(() => {
    link.focus();
    link.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });
  assert.equal(navigated, 1);
  assert.equal(
    host.querySelector('[aria-current="page"]').textContent,
    "Headers (4)",
  );
});

test("component navigation groups SDK primitives and custom components", async () => {
  const { getLibraryNavigation } = await import("../../components/library/library-navigation-data.ts");
  const { LibraryNavigation } = await import("../../components/library/library-navigation.tsx");
  const navigation = getLibraryNavigation("components");
  assert.deepEqual(navigation.groups.map((group) => group.title), ["Primitives", "Custom"]);
  assert.ok(navigation.groups[0].items.some((item) => item.title === "Field"));
  assert.ok(navigation.groups[1].items.some((item) => item.title === "Magnetic Button"));
  assert.ok(navigation.groups[1].items.some((item) => item.title === "Proximity Nav"));
  await mount(h(LibraryNavigation, { navigation, pathname: "/components/field" }));
  assert.deepEqual(
    [...host.querySelectorAll("nav.library-proximity")].map((nav) => nav.getAttribute("aria-label")),
    ["Primitives navigation", "Custom navigation"],
  );
  assert.equal(host.querySelector('[aria-current="page"]').textContent, "Field");
});
