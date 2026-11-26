"use client";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  TabsIndicator,
} from "@/registry/components/tabs";
export default function TabsVariants() {
  const [value, setValue] = useState<string | null>("overview");
  return (
    <div className="flex w-full max-w-lg flex-col gap-6 p-4">
      <Tabs
        value={value}
        onValueChange={setValue}
        activation="manual"
        orientation="vertical"
        className="flex gap-6"
      >
        <TabsList aria-label="Project sections">
          <TabsTab
            value="overview"
            className="data-selected:bg-transparent data-selected:shadow-none"
          >
            Overview
          </TabsTab>
          <TabsTab
            value="activity"
            className="data-selected:bg-transparent data-selected:shadow-none"
          >
            Activity
          </TabsTab>
          <TabsTab value="settings" disabled>
            Settings
          </TabsTab>
          <TabsIndicator />
        </TabsList>
        <div className="min-w-0 flex-1">
          <TabsPanel value="overview" keepMounted>
            Use Up and Down, then Enter or Space.
          </TabsPanel>
          <TabsPanel value="activity" keepMounted>
            The selected panel is controlled by the example.
          </TabsPanel>
        </div>
      </Tabs>
      <p className="text-sm text-muted-foreground">Current section: {value}</p>
    </div>
  );
}
