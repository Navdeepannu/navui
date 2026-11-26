"use client";

import {
  TabsList as SdkList,
  TabsTab as SdkTab,
  TabsPanel as SdkPanel,
  TabsIndicator as SdkIndicator,
} from "@ui-sdk/react/tabs";
import type { ComponentProps } from "react";
import { cn } from "cn";

export { Tabs } from "@ui-sdk/react/tabs";

export function TabsList({
  className,
  children,
  ...props
}: ComponentProps<typeof SdkList>) {
  return (
    <SdkList
      {...props}
      className={(state) =>
        cn(
          "relative isolate flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg bg-muted p-1 data-[orientation=vertical]:flex-col",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {children}
    </SdkList>
  );
}
export function TabsTab({
  className,
  ...props
}: ComponentProps<typeof SdkTab>) {
  return (
    <SdkTab
      {...props}
      className={(state) =>
        cn(
          "relative z-10 inline-flex min-h-9 shrink-0 items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-selected:bg-background data-selected:text-foreground data-selected:shadow-xs data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
export function TabsIndicator({
  className,
  ...props
}: ComponentProps<typeof SdkIndicator>) {
  return (
    <SdkIndicator
      {...props}
      className={(state) =>
        cn(
          "pointer-events-none absolute left-0 top-0 -z-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-md bg-background shadow-xs motion-safe:transition-[translate,width,height] motion-safe:duration-200 motion-safe:ease-out",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
export function TabsPanel({
  className,
  ...props
}: ComponentProps<typeof SdkPanel>) {
  return (
    <SdkPanel
      {...props}
      className={(state) =>
        cn(
          "min-w-0 py-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
