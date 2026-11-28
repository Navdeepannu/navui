import assert from "node:assert/strict";
import { test, afterEach } from "node:test";
import { createElement as h, act, createRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
} from "../../registry/components/field.tsx";
import { Input } from "../../registry/components/input.tsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../registry/components/select.tsx";
import { Checkbox } from "../../registry/components/checkbox.tsx";
import { Switch } from "../../registry/components/switch.tsx";
import Settings from "../../app/playground/project-settings/page.tsx";
let root, host;
async function settle(action) {
  await act(async () => {
    action?.();
    await new Promise((resolve) => setTimeout(resolve, 10));
  });
}
async function mount(element) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await settle(() => root.render(element));
}
afterEach(async () => {
  if (root) await act(() => root.unmount());
  host?.remove();
  root = null;
});
function inputValue(element, value) {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
    element,
    value,
  );
  element.dispatchEvent(new Event("input", { bubbles: true }));
}
function key(element, value) {
  const down = new KeyboardEvent("keydown", {
    key: value,
    bubbles: true,
    cancelable: true,
  });
  const up = new KeyboardEvent("keyup", {
    key: value,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(down);
  element.dispatchEvent(up);
  if (
    value === " " &&
    element.tagName === "BUTTON" &&
    !down.defaultPrevented &&
    !up.defaultPrevented
  )
    element.click();
}
function labelledText(el, attribute) {
  return (el.getAttribute(attribute) || "")
    .split(" ")
    .map((id) => document.getElementById(id)?.textContent)
    .join(" ");
}

test("Field/Input preserve native refs, associations, invalid and disabled state", async () => {
  const ref = createRef();
  await mount(
    h(
      "form",
      null,
      h(
        Field,
        { name: "email", invalid: true },
        h(FieldLabel, null, "Email"),
        h(Input, { ref, type: "email", required: true, defaultValue: "bad" }),
        h(FieldDescription, null, "For reports"),
        h(FieldError, { match: true }, "Use a valid email"),
      ),
      h(
        FieldSet,
        { disabled: true },
        h(
          Field,
          null,
          h(FieldLabel, null, "Locked"),
          h(Input, { name: "locked", defaultValue: "omit" }),
        ),
      ),
    ),
  );
  assert.equal(ref.current.tagName, "INPUT");
  assert.match(labelledText(ref.current, "aria-labelledby"), /Email/);
  assert.match(
    labelledText(ref.current, "aria-describedby"),
    /For reports.*Use a valid email/,
  );
  assert.equal(ref.current.getAttribute("aria-invalid"), "true");
  assert.equal(ref.current.required, true);
  assert.equal(new FormData(host.querySelector("form")).has("locked"), false);
  assert.equal(host.querySelector("[name=locked]").matches(":disabled"), true);
});
test("Input supports controlled state, cancellable changes and uncontrolled reset", async () => {
  let next;
  const view = (value, cancel = false) =>
    h(
      "form",
      null,
      h(Input, {
        name: "controlled",
        value,
        "aria-label": "Controlled",
        onValueChange: (v, d) => {
          next = v;
          if (cancel) d.cancel();
        },
      }),
      h(Input, {
        name: "plain",
        defaultValue: "original",
        "aria-label": "Plain",
      }),
    );
  await mount(view("initial"));
  const input = host.querySelector("input");
  await settle(() => inputValue(input, "edited"));
  assert.equal(next, "edited");
  await settle(() => root.render(view(next)));
  assert.equal(input.value, "edited");
  await settle(() => root.render(view("edited", true)));
  await settle(() => inputValue(input, "blocked"));
  assert.equal(input.value, "edited");
  const plain = host.querySelector("[name=plain]");
  await settle(() => inputValue(plain, "changed"));
  await settle(() => host.querySelector("form").reset());
  assert.equal(plain.value, "original");
});

test("Input controlSize preserves native size and SDK className and render composition", async () => {
  const ref = createRef();
  await mount(
    h(Input, {
      ref,
      "aria-label": "Workspace ID",
      controlSize: "xs",
      size: 12,
      readOnly: true,
      className: (state) => state.readOnly ? "w-auto" : undefined,
      render: h("input", { "data-custom-input": "" }),
    }),
  );
  const input = ref.current;
  assert.equal(input.tagName, "INPUT");
  assert.equal(input.size, 12);
  assert.equal(input.hasAttribute("controlsize"), false);
  assert.equal(input.hasAttribute("data-custom-input"), true);
  assert.equal(input.readOnly, true);
  assert.ok(input.classList.contains("w-auto"));
  assert.ok(input.classList.contains("h-6"));
});
for (const [name, Control] of [
  ["checkbox", Checkbox],
  ["switch", Switch],
]) {
  test(`${name} preserves label, required, native FormData/reset and cancellation`, async () => {
    await mount(
      h(
        "form",
        null,
        h(
          Field,
          { name },
          h(FieldLabel, null, "Preference"),
          h(Control, {
            required: true,
            value: "enabled",
            defaultChecked: true,
          }),
          h(FieldDescription, null, "Local setting"),
          h(FieldError, { match: "valueMissing" }, "Enable this setting"),
        ),
      ),
    );
    const control = host.querySelector(`[role=${name}]`);
    assert.match(labelledText(control, "aria-labelledby"), /Preference/);
    assert.match(labelledText(control, "aria-describedby"), /Local setting/);
    assert.equal(new FormData(host.querySelector("form")).get(name), "enabled");
    assert.equal(control.getAttribute("aria-required"), "true");
    await settle(() => key(control, " "));
    assert.equal(control.getAttribute("aria-checked"), "false");
    assert.equal(new FormData(host.querySelector("form")).has(name), false);
    await settle(() =>
      assert.equal(host.querySelector("input").checkValidity(), false),
    );
    await settle(() => host.querySelector("form").reset());
    assert.equal(control.getAttribute("aria-checked"), "true");
    assert.equal(new FormData(host.querySelector("form")).get(name), "enabled");
    await settle(() =>
      root.render(
        h(Control, {
          "aria-label": "Canceled",
          defaultChecked: false,
          onCheckedChange: (_v, d) => d.cancel(),
        }),
      ),
    );
    await settle(() => host.querySelector(`[role=${name}]`).click());
    assert.equal(
      host.querySelector(`[role=${name}]`).getAttribute("aria-checked"),
      "false",
    );
  });
}
test("Checkbox mixed state renders its distinct indicator and disabled state cannot change", async () => {
  await mount(
    h(Checkbox, {
      "aria-label": "Permissions",
      defaultChecked: "indeterminate",
    }),
  );
  const control = host.querySelector("[role=checkbox]");
  assert.equal(control.getAttribute("aria-checked"), "mixed");
  assert.ok(control.querySelector("svg"));
  await settle(() => control.click());
  assert.equal(control.getAttribute("aria-checked"), "true");
  await settle(() =>
    root.render(
      h(Checkbox, {
        "aria-label": "Permissions",
        disabled: true,
        checked: false,
      }),
    ),
  );
  await settle(() => control.click());
  assert.equal(control.getAttribute("aria-checked"), "false");
});
const choices = [
  {
    value: "a",
    label: "A long workspace label that must remain the accessible name",
  },
  { value: "blocked", label: "Unavailable", disabled: true },
  { value: "c", label: "Canada" },
];
function select(props = {}) {
  return h(
    "form",
    null,
    h(
      Field,
      { name: "region" },
      h(FieldLabel, null, "Region"),
      h(
        Select,
        { items: choices, defaultValue: null, ...props },
        h(
          SelectTrigger,
          null,
          h(SelectValue, { placeholder: "Choose region" }),
        ),
        h(
          SelectContent,
          null,
          h(
            SelectGroup,
            null,
            ...choices.map((item) =>
              h(
                SelectItem,
                { key: item.value, value: item.value, disabled: item.disabled },
                item.label,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
test("Select opens, skips disabled options, preserves long labels, dismisses and resets", async () => {
  await mount(select());
  const trigger = host.querySelector("[role=combobox]");
  assert.match(trigger.textContent, /Choose region/);
  await settle(() => key(trigger, "ArrowDown"));
  assert.equal(trigger.getAttribute("aria-expanded"), "true");
  const options = document.querySelectorAll("[role=option]");
  assert.equal(options[1].getAttribute("aria-disabled"), "true");
  assert.match(options[0].textContent, /long workspace label/);
  await settle(() => {
    options[0].focus();
    key(options[0], "ArrowDown");
  });
  assert.equal(document.activeElement, options[2]);
  await settle(() => key(options[2], "Enter"));
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.match(trigger.textContent, /Canada/);
  assert.equal(new FormData(host.querySelector("form")).get("region"), "c");
  assert.equal(document.activeElement, trigger);
  await settle(() => host.querySelector("form").reset());
  assert.match(trigger.textContent, /Choose region/);
  await settle(() => key(trigger, "ArrowDown"));
  await settle(() => key(document.activeElement, "Escape"));
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
  assert.equal(document.activeElement, trigger);
});
test("Select forwards controlled cancellation and multiple values submit separately", async () => {
  await mount(select({ value: "a", onValueChange: (_v, d) => d.cancel() }));
  const trigger = host.querySelector("[role=combobox]");
  await settle(() => trigger.click());
  await settle(() =>
    [...document.querySelectorAll("[role=option]")]
      .find((el) => el.textContent === "Canada")
      .click(),
  );
  assert.match(trigger.textContent, /long workspace label/);
  await settle(() =>
    root.render(
      select({ multiple: true, defaultValue: ["a", "c"], key: "multiple" }),
    ),
  );
  assert.deepEqual(new FormData(host.querySelector("form")).getAll("region"), [
    "a",
    "c",
  ]);
});
test("Project settings submit actual FormData, validate whitespace and reset controlled defaults", async () => {
  await mount(h(Settings));
  const form = host.querySelector("form");
  const name = host.querySelector("input[name=projectName]");
  await settle(() => inputValue(name, "   "));
  await settle(() => form.requestSubmit());
  assert.match(host.textContent, /at least one non-space/);
  assert.equal(document.activeElement, name);
  await settle(() => inputValue(name, "Changed project"));
  await settle(() => host.querySelector("[role=switch]").click());
  await settle(() => host.querySelector("[role=checkbox]").click());
  await settle(() => form.requestSubmit());
  let submitted = host.querySelector(
    "[aria-labelledby=submitted-values-heading] pre",
  ).textContent;
  assert.match(submitted, /Changed project/);
  assert.match(submitted, /previewDeployments/);
  assert.doesNotMatch(submitted, /notifications/);
  await settle(() => form.reset());
  assert.equal(name.value, "My project");
  assert.equal(
    host.querySelector("[role=switch]").getAttribute("aria-checked"),
    "false",
  );
  assert.equal(
    host.querySelector("[role=checkbox]").getAttribute("aria-checked"),
    "true",
  );
  assert.equal(new FormData(form).get("region"), "Canada");
  assert.equal(new FormData(form).get("projectName"), "My project");
  assert.match(
    host.querySelector("[aria-labelledby=submitted-values-heading] pre")
      .textContent,
    /Not submitted/,
  );
  await settle(() => form.requestSubmit());
  submitted = host.querySelector(
    "[aria-labelledby=submitted-values-heading] pre",
  ).textContent;
  assert.match(submitted, /My project/);
  assert.match(submitted, /notifications/);
  assert.doesNotMatch(submitted, /previewDeployments/);
});
