"use client";

import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/blocks/copy-button";
import { Tabs, TabsList, TabsTab } from "@/registry/components/tabs";
import { CodeContent, CodeFrame, CodeSurface } from "./code-viewer";
import { usePackageManagerPreference } from "./package-manager-preference";
import type { BlockInstallCommands } from "@/registry/install";

const managers = ["pnpm", "npm", "yarn", "bun"] as const;

export function CommandBlock({
  commands,
  highlighted,
}: {
  commands: BlockInstallCommands;
  highlighted: BlockInstallCommands;
}) {
  const [manager, setManager] = usePackageManagerPreference();
  return (
    <Tabs
      value={manager}
      onValueChange={(value) => {
        if (value) setManager(value);
      }}
    >
      <CodeFrame className="p-0 shadow-none">
        <div className="flex min-h-12 items-center gap-2 px-3">
          <Terminal aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          <TabsList
            aria-label="Command package manager"
            className="min-w-0 gap-0 rounded-none bg-transparent p-0"
          >
            {managers.map((value) => (
              <TabsTab
                key={value}
                value={value}
                className="min-h-8 rounded-lg border border-transparent px-2 py-1 font-mono font-normal data-[selected]:border-border data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-none sm:px-3"
              >
                {value}
              </TabsTab>
            ))}
          </TabsList>
          <CopyButton
            key={manager}
            value={commands[manager]}
            label={`Copy ${manager} install command`}
            showLabel={false}
            className="ms-auto text-muted-foreground"
          />
        </div>
        <CodeSurface className="rounded-none border-t bg-transparent shadow-none">
          <CodeContent
            html={highlighted[manager]}
            label={`${manager} install command`}
            lineNumbers={false}
            compact
            className="min-h-[2.75rem]"
          />
        </CodeSurface>
      </CodeFrame>
    </Tabs>
  );
}
