"use client";

import { useMemo, useState } from "react";
import { Atom, ChevronRight, Folder, FolderOpen } from "lucide-react";

import {
  buildBlockSourceTree,
  getBlockSourceDirectoryPaths,
  type BlockSourceTreeNode,
} from "@/components/blocks/block-source-tree";
import { CopyButton } from "@/components/blocks/copy-button";
import { cn } from "cn";
import type { BlockSourceFile } from "@/registry/types";

type BlockSourceExplorerProps = {
  files: BlockSourceFile[];
};

type FileTreeProps = {
  nodes: readonly BlockSourceTreeNode[];
  selectedPath: string;
  expandedDirectories: Set<string>;
  onSelect: (path: string) => void;
  onToggleDirectory: (path: string) => void;
  depth?: number;
};

function SourceFileIcon({ className }: { className?: string }) {
  return (
    <Atom
      aria-hidden="true"
      className={cn("size-3.5 shrink-0 text-primary/75", className)}
    />
  );
}

function FileTree({
  nodes,
  selectedPath,
  expandedDirectories,
  onSelect,
  onToggleDirectory,
  depth = 0,
}: FileTreeProps) {
  return (
    <ul className="flex flex-col">
      {nodes.map((node) => {
        const paddingInlineStart = 8 + depth * 14;

        if (node.type === "directory") {
          const isExpanded = expandedDirectories.has(node.path);

          return (
            <li key={node.path}>
              <button
                type="button"
                className="flex h-8 w-full items-center gap-1.5 rounded-md pr-2 text-left text-xs text-muted-foreground outline-none transition-colors hover:bg-background/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none"
                style={{ paddingInlineStart }}
                aria-expanded={isExpanded}
                onClick={() => onToggleDirectory(node.path)}
              >
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 shrink-0 transition-transform motion-reduce:transition-none",
                    isExpanded && "rotate-90",
                  )}
                />
                {isExpanded ? (
                  <FolderOpen
                    aria-hidden="true"
                    className="size-3.5 shrink-0"
                  />
                ) : (
                  <Folder
                    aria-hidden="true"
                    className="size-3.5 shrink-0"
                  />
                )}
                <span className="truncate">{node.name}</span>
              </button>

              {isExpanded ? (
                <FileTree
                  nodes={node.children}
                  selectedPath={selectedPath}
                  expandedDirectories={expandedDirectories}
                  onSelect={onSelect}
                  onToggleDirectory={onToggleDirectory}
                  depth={depth + 1}
                />
              ) : null}
            </li>
          );
        }

        const isSelected = node.path === selectedPath;

        return (
          <li key={node.path}>
            <button
              type="button"
              className={cn(
                "flex h-8 w-full items-center rounded-md pr-2 text-left font-mono text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none",
                isSelected
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
              )}
              style={{ paddingInlineStart: paddingInlineStart + 10 }}
              aria-current={isSelected ? "page" : undefined}
              title={node.path}
              onClick={() => onSelect(node.path)}
            >
              <span
                className={cn(
                  "flex min-w-0 max-w-full items-center gap-1.5 rounded-md px-2 py-1",
                  isSelected && "bg-background shadow-xs",
                )}
              >
                <SourceFileIcon />
                <span className="truncate">{node.name}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function HighlightedSource({ file }: { file: BlockSourceFile }) {
  return (
    <div
      aria-label={`Source code for ${file.target}`}
      className={cn(
        "min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain font-mono text-[13px] leading-6 [-webkit-overflow-scrolling:touch]",
        "[&_.shiki]:!bg-transparent",
        "[&_.shiki]:min-w-full [&_.shiki]:w-max [&_.shiki]:py-4",
        "[&_code]:grid [&_code]:min-w-full [&_code]:[counter-reset:line]",
        "[&_.line]:relative [&_.line]:min-h-6 [&_.line]:w-full [&_.line]:px-4",
        "[&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-5",
        "[&_.line]:before:[counter-increment:line] [&_.line]:before:content-[counter(line)]",
        "[&_.line]:before:text-right [&_.line]:before:text-muted-foreground/50 [&_.line]:before:select-none",
        "dark:[&_.shiki]:!text-[var(--shiki-dark)]",
        "dark:[&_.shiki_span]:!text-[var(--shiki-dark)]",
      )}
      dangerouslySetInnerHTML={{ __html: file.highlightedCode }}
    />
  );
}

export function BlockSourceExplorer({ files }: BlockSourceExplorerProps) {
  const tree = useMemo(
    () => buildBlockSourceTree(files.map((file) => file.target)),
    [files],
  );
  const [selectedTarget, setSelectedTarget] = useState(files[0]?.target ?? "");
  const [expandedDirectories, setExpandedDirectories] = useState(
    () => new Set(getBlockSourceDirectoryPaths(tree)),
  );
  const selectedFile =
    files.find((file) => file.target === selectedTarget) ?? files[0];

  if (!selectedFile) return null;

  function selectFile(path: string) {
    setSelectedTarget(path);
    setExpandedDirectories((current) => {
      const next = new Set(current);
      const segments = path.split("/");

      for (let index = 1; index < segments.length; index += 1) {
        next.add(segments.slice(0, index).join("/"));
      }

      return next;
    });
  }

  function toggleDirectory(path: string) {
    setExpandedDirectories((current) => {
      const next = new Set(current);

      if (next.has(path)) next.delete(path);
      else next.add(path);

      return next;
    });
  }

  return (
    <div className="flex h-[min(88svh,60rem)] min-h-[24rem] w-full min-w-0 flex-col overflow-hidden rounded-xl bg-muted/60 p-1.5 shadow-inner">
      <div className="grid h-full min-h-0 min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden rounded-lg bg-background shadow-sm md:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 min-w-0 flex-col border-r border-border/60 bg-muted/35 md:flex">
          <div className="flex h-11 shrink-0 items-center border-b border-border/50 px-3 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Files
            <span className="ml-auto rounded-full bg-background/80 px-1.5 py-0.5 font-mono text-[9px] leading-none tracking-normal shadow-xs">
              {files.length}
            </span>
          </div>
          <nav
            aria-label="Source files"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2.5"
          >
            <FileTree
              nodes={tree}
              selectedPath={selectedFile.target}
              expandedDirectories={expandedDirectories}
              onSelect={selectFile}
              onToggleDirectory={toggleDirectory}
            />
          </nav>
        </aside>

        <section
          aria-label="Selected source file"
          className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        >
          <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border/70 bg-background px-2">
            <SourceFileIcon className="size-4" />

            <select
              value={selectedFile.target}
              onChange={(event) => selectFile(event.target.value)}
              aria-label="Select source file"
              className="h-8 min-w-0 flex-1 truncate rounded-md border border-border/70 bg-background px-2 font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            >
              {files.map((file) => (
                <option key={file.target} value={file.target}>
                  {file.target}
                </option>
              ))}
            </select>

            <code
              className="hidden min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground md:block"
              title={selectedFile.target}
            >
              {selectedFile.target}
            </code>

            <CopyButton
              value={selectedFile.code}
              label="Copy selected file"
              copiedLabel="File copied"
              showLabel={false}
              className="shrink-0"
            />
          </div>

          <HighlightedSource key={selectedFile.target} file={selectedFile} />
        </section>
      </div>
    </div>
  );
}
