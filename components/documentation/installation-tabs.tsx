"use client";

import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/registry/components/tabs";

export function InstallationTabs({
  command,
  manual,
}: {
  command: ReactNode;
  manual: ReactNode;
}) {
  return (
    <Tabs defaultValue="cli">
      <TabsList
        aria-label="Installation method"
        className="gap-4 rounded-none bg-transparent p-0"
      >
        <TabsTab
          value="cli"
          className="rounded-none border-b-2 border-transparent px-0 data-[selected]:border-foreground data-[selected]:bg-transparent data-[selected]:text-foreground data-[selected]:shadow-none"
        >
          Command
        </TabsTab>
        <TabsTab
          value="manual"
          className="rounded-none border-b-2 border-transparent px-0 data-[selected]:border-foreground data-[selected]:bg-transparent data-[selected]:text-foreground data-[selected]:shadow-none"
        >
          Manual
        </TabsTab>
      </TabsList>
      <TabsPanel value="cli" className="flex flex-col gap-4 py-4">
        {command}
      </TabsPanel>
      <TabsPanel value="manual" className="flex flex-col gap-5 py-4">
        {manual}
      </TabsPanel>
    </Tabs>
  );
}
