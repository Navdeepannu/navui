"use client";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@ui-sdk/react/collapsible";
import { CopyButton } from "@/components/blocks/copy-button";
import { Button } from "@/registry/components/button";
import { CodeContent, CodeFrame, CodeSurface } from "./code-viewer";
import type { BlockSourceFile } from "@/registry/types";

type CodeBlockProps = {
  file: BlockSourceFile;
  collapsible?: boolean;
  lineNumbers?: boolean;
  compact?: boolean;
};

export function CodeBlock({
  file,
  collapsible = false,
  lineNumbers = true,
  compact = false,
}: CodeBlockProps) {
  const copy = (
    <CopyButton
      value={file.code}
      label={`Copy ${file.target}`}
      showLabel={false}
      className="absolute end-2 top-2 z-10 bg-background/90"
    />
  );
  const content = (
    <CodeContent
      html={file.highlightedCode}
      label={`Code for ${file.target}`}
      lineNumbers={lineNumbers}
      compact={compact}
    />
  );
  if (!collapsible) {
    return (
      <CodeFrame>
        <CodeSurface>
          {copy}
          {content}
        </CodeSurface>
      </CodeFrame>
    );
  }
  return (
    <Collapsible className="group/code">
      <CodeFrame>
        <CodeSurface>
          {copy}
          <div
            aria-hidden="true"
            inert
            className="code-teaser group-data-open/code:hidden"
            dangerouslySetInnerHTML={{ __html: file.highlightedCode }}
          />
          <CollapsiblePanel>{content}</CollapsiblePanel>
        </CodeSurface>
        <div className="flex justify-center pt-1.5">
          <CollapsibleTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer rounded-lg"
              />
            }
          >
            <span className="group-data-open/code:hidden">View code</span>
            <span className="hidden group-data-open/code:inline">
              Collapse code
            </span>
            <span className="sr-only"> for {file.target}</span>
          </CollapsibleTrigger>
        </div>
      </CodeFrame>
    </Collapsible>
  );
}
