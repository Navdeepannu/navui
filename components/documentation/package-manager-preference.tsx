"use client";

import { useSyncExternalStore, type ComponentProps } from "react";
import { PackageManagerCommand } from "@/registry/components/package-manager-command";
import { packageManagerIds, type PackageManagerId } from "@/registry/install";

const key = "navui:package-manager";
let preference: PackageManagerId = "npm";
let storageWriteFailed = false;
function snapshot(): PackageManagerId {
  if (storageWriteFailed) return preference;
  try {
    const saved = localStorage.getItem(key);
    if (packageManagerIds.some((value) => value === saved))
      return saved as PackageManagerId;
  } catch {
    /* Storage may be unavailable in private browsing. */
  }
  return preference;
}
function subscribe(listener: () => void) {
  window.addEventListener(key, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(key, listener);
    window.removeEventListener("storage", listener);
  };
}
export function usePackageManagerPreference() {
  const manager = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "npm" as PackageManagerId,
  );
  function setManager(value: PackageManagerId) {
    preference = value;
    try {
      localStorage.setItem(key, value);
      storageWriteFailed = false;
    } catch {
      storageWriteFailed = true;
    }
    window.dispatchEvent(new Event(key));
  }
  return [manager, setManager] as const;
}
export function DocumentationCommand(
  props: Omit<
    ComponentProps<typeof PackageManagerCommand>,
    "value" | "defaultValue" | "onValueChange"
  >,
) {
  const [value, setValue] = usePackageManagerPreference();
  return (
    <PackageManagerCommand
      {...props}
      value={value}
      onValueChange={(next) => {
        if (next) setValue(next);
      }}
    />
  );
}
