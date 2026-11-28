"use client";

import type { ReactNode } from "react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@ui-sdk/react/collapsible";
import { CopyButton } from "@/components/blocks/copy-button";
import { Button } from "@/registry/components/button";
import type { BlockSourceFile } from "@/registry/types";
import { CodeContent, CodeFrame, CodeSurface } from "./code-viewer";

export function CompactExample({
  children,
  file,
}: {
  children: ReactNode;
  file: BlockSourceFile;
}) {
  return (
    <Collapsible className="group/example min-w-0 rounded-xl border border-border">
      <div className="grid min-h-24 min-w-0 place-items-center p-5 sm:p-6">
        {children}
      </div>
      <div className="flex items-center justify-end gap-1 border-t border-border px-2 py-1">
        <CollapsibleTrigger
          render={<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" />}
        >
          <span className="group-data-open/example:hidden">View code</span>
          <span className="hidden group-data-open/example:inline">Hide code</span>
          <span className="sr-only"> for {file.target}</span>
        </CollapsibleTrigger>
        <CopyButton value={file.code} label={`Copy ${file.target}`} showLabel={false} />
      </div>
      <CollapsiblePanel className="min-w-0 px-2 pb-2">
        <CodeFrame>
          <CodeSurface>
            <CodeContent html={file.highlightedCode} label={`Code for ${file.target}`} compact />
          </CodeSurface>
        </CodeFrame>
      </CollapsiblePanel>
    </Collapsible>
  );
}
