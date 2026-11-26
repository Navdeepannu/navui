"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeShortcut() {
  const { forcedTheme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== "d" ||
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        forcedTheme
      ) {
        return;
      }

      // Include ancestors and shadow DOM editors, not just the event target.
      const isEditing = event.composedPath().some(
        (target) =>
          target instanceof HTMLElement &&
          (target.isContentEditable ||
            target.matches(
              'input, textarea, select, [role="textbox"], [role="searchbox"], [role="combobox"]',
            )),
      );

      if (isEditing) return;

      event.preventDefault();
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [forcedTheme, resolvedTheme, setTheme]);
}
