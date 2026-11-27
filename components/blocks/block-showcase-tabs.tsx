"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/documentation/code-block";
import { useState } from "react";
import {
  Code2,
  Eye,
  Maximize,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from "lucide-react";

import {
  BlockPreviewFrame,
  type BlockPreviewWidth,
} from "@/components/blocks/block-preview-frame";
import { BlockSourceExplorer } from "@/components/blocks/block-source-explorer";
import { DocumentationCommand } from "@/components/documentation/package-manager-preference";
import {
  type ComponentPreviewSize,
  previewMinimumHeights,
} from "@/components/documentation/preview-size";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "cn";
import type { BlockInstallCommands } from "@/registry/install";
import type { BlockSourceFile } from "@/registry/types";

type BlockTab = "preview" | "code";

const previewWidths = [
  { value: "full", label: "Desktop", icon: Monitor },
  { value: 768, label: "Tablet", icon: Tablet },
  { value: 390, label: "Mobile", icon: Smartphone },
] satisfies readonly {
  value: BlockPreviewWidth;
  label: string;
  icon: typeof Monitor;
}[];

type BlockShowcaseTabsProps = {
  blockId: string;
  title: string;
  previewPath: string;
  commands: BlockInstallCommands;
  sourceFiles: BlockSourceFile[];
  exampleSource?: BlockSourceFile;
  previewSize?: ComponentPreviewSize;
};

export function BlockShowcaseTabs({
  blockId,
  title,
  previewPath,
  commands,
  sourceFiles,
  exampleSource,
  previewSize,
}: BlockShowcaseTabsProps) {
  const [activeTab, setActiveTab] = useState<BlockTab>("preview");
  const [previewWidth, setPreviewWidth] = useState<BlockPreviewWidth>("full");
  const [reloadKey, setReloadKey] = useState(0);

  function selectPreviewWidth(width: BlockPreviewWidth) {
    setPreviewWidth(width);
    setActiveTab("preview");
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as BlockTab)}
      className="gap-0"
    >
      <div className="relative mb-3 flex min-w-0 items-center gap-2 py-1">
        <div className="flex shrink-0 items-center gap-2">
          <TabsList aria-label={`${title} view`}>
            <TabsTrigger value="preview">
              <Eye aria-hidden="true" data-icon="inline-start" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code2 aria-hidden="true" data-icon="inline-start" />
              Code
            </TabsTrigger>
          </TabsList>

          <div
            role="group"
            aria-label="Preview width"
            className="hidden h-9 items-center gap-0.5 rounded-lg bg-muted p-0.75 sm:flex"
          >
            {previewWidths.map(({ value, label, icon: Icon }) => {
              const isActive = previewWidth === value;

              return (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "rounded-md text-muted-foreground",
                    isActive &&
                      "bg-background text-foreground shadow-sm hover:bg-background",
                  )}
                  aria-label={`${label} preview`}
                  aria-pressed={isActive}
                  title={`${label} preview`}
                  onClick={() => selectPreviewWidth(value)}
                >
                  <Icon aria-hidden="true" className="size-3.5" />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="ms-auto flex min-w-48 flex-1 items-center justify-end gap-2">
          <DocumentationCommand
            commands={commands}
            className="showcase-command h-9 min-w-0 flex-1 overflow-hidden rounded-lg border-transparent bg-muted"
            commandClassName="px-2 [&_code]:text-[11px] [&_svg]:size-3.5"
          />

          <div className="flex h-9 shrink-0 items-center gap-0.5 rounded-lg bg-muted p-0.75">
            <Button
              render={
                <Link
                  href={previewPath}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="ghost"
              size="icon-sm"
              nativeButton={false}
              className="rounded-md bg-background shadow-sm hover:bg-background/80"
              aria-label={`Open ${title} preview in a new tab`}
              title="Open full-screen preview"
            >
              <Maximize aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="rounded-md"
              onClick={() => setReloadKey((key) => key + 1)}
              aria-label={`Reload ${title} preview`}
              title="Reload preview"
            >
              <RotateCcw aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <TabsContent value="preview" className="min-w-0">
        <BlockPreviewFrame
          blockId={blockId}
          previewPath={previewPath}
          reloadKey={reloadKey}
          title={title}
          width={previewWidth}
          minimumHeight={
            previewSize ? previewMinimumHeights[previewSize] : undefined
          }
        />
      </TabsContent>

      <TabsContent
        value="code"
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
      >
        {exampleSource ? (
          <CodeBlock file={exampleSource} />
        ) : (
          <BlockSourceExplorer files={sourceFiles} />
        )}
      </TabsContent>
    </Tabs>
  );
}
