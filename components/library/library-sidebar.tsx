"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  LibraryNavigation,
  type LibraryNavigationData,
} from "./library-navigation";
import { ScrollNavigation } from "./scroll-navigation";

export function LibrarySidebar({
  navigation,
}: {
  navigation: LibraryNavigationData;
}) {
  const pathname = usePathname();
  const aside = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = aside.current?.querySelector<HTMLElement>(
      "[data-library-scroll]",
    );
    const active = container?.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );
    if (!container || !active) return;
    const bounds = container.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    if (item.top < bounds.top + 16 || item.bottom > bounds.bottom - 16)
      container.scrollTop +=
        item.top - bounds.top - (bounds.height - item.height) / 2;
  }, [pathname]);
  return (
    <aside
      ref={aside}
      aria-label="Library sidebar"
      className="border-e border-border border-dashed mask-y-from-90% sticky top-16 hidden h-[calc(100dvh-4rem)] min-w-0 flex-col md:flex"
    >
      {!navigation.groups && (
        <p className="px-5 pt-8 pb-1 text-xs font-medium text-muted-foreground">
          {navigation.title}
        </p>
      )}
      <ScrollNavigation>
        <LibraryNavigation navigation={navigation} pathname={pathname} />
      </ScrollNavigation>
    </aside>
  );
}
