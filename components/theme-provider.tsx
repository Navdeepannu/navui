"use client";

import type { ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useThemeShortcut } from "@/hooks/use-theme-shortcut";

function ThemeShortcut() {
  useThemeShortcut();

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeShortcut />
      {children}
    </NextThemesProvider>
  );
}
