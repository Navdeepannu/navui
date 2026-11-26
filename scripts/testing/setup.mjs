import { register } from "node:module";
import { JSDOM } from "jsdom";
register("./loader.mjs", import.meta.url);
const dom = new JSDOM(
  '<!doctype html><html lang="en"><head></head><body></body></html>',
  { url: "http://localhost", pretendToBeVisual: true },
);
for (const key of [
  "AbortController",
  "AbortSignal",
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLInputElement",
  "HTMLButtonElement",
  "HTMLDialogElement",
  "Element",
  "Node",
  "NodeFilter",
  "Event",
  "CustomEvent",
  "MouseEvent",
  "KeyboardEvent",
  "FocusEvent",
  "MutationObserver",
  "DOMRect",
  "HTMLFormElement",
  "FormData",
]) {
  if (dom.window[key])
    Object.defineProperty(globalThis, key, {
      value: dom.window[key],
      configurable: true,
    });
}
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis))
    Object.defineProperty(globalThis, key, {
      value: dom.window[key],
      writable: true,
      configurable: true,
    });
}
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(
  dom.window,
);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(
  dom.window,
);
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.__UI_SDK_STRICT__ = true;
window.matchMedia = () => ({
  matches: true,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
});
HTMLElement.prototype.showPopover = function () {};
HTMLElement.prototype.hidePopover = function () {};
Element.prototype.getAnimations = () => [];
Element.prototype.scrollIntoView = function () {};
Element.prototype.checkVisibility = () => true;
Element.prototype.getClientRects = () => [];
document.elementFromPoint = () => null;
document.elementsFromPoint = () => [];
document.head.append(
  Object.assign(document.createElement("style"), {
    textContent: "[popover] { display: block !important }",
  }),
);
