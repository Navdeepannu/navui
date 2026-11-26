"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function BlocksSidebarReopen() {
  const { state, isMobile } = useSidebar();

  if (!isMobile && state !== "collapsed") {
    return null;
  }

  return (
    <SidebarTrigger
      className="size-8 shrink-0 rounded-md"
      aria-label="Open sidebar"
    />
  );
}
