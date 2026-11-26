"use client";

// Copyright (c) 2026 Navdeep Singh. MIT license; see LICENSE.
import { useEffect, useRef, useState, type ComponentProps } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
} from "@ui-sdk/react/select";
import { Button } from "./button";
import { cn } from "cn";
import { Check, ChevronDown, CircleX, Copy } from "lucide-react";

export type PackageManagerId = "npm" | "pnpm" | "yarn" | "bun";
export type PackageManagerCommands = Partial<Record<PackageManagerId, string>>;
export type PackageManagerCommandProps = Pick<
  Extract<
    ComponentProps<typeof Select<PackageManagerId, false>>,
    { multiple?: false }
  >,
  "value" | "defaultValue" | "onValueChange"
> & {
  commands: PackageManagerCommands;
  className?: string;
  commandClassName?: string;
  align?: "start" | "center" | "end";
  copyLabel?: string;
  resetDelay?: number;
  onCopySuccess?: (command: string, packageManager: PackageManagerId) => void;
  onCopyError?: (error: Error) => void;
};

type PackageManagerMeta = {
  id: PackageManagerId;
  name: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
};

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <path
        fill="#CB3837"
        d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
      />
    </svg>
  );
}

function PnpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#F9AD00"
        d="M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5zM16 9.5h5v5h-5z"
      />
      <path
        fill="#4E4E4E"
        d="M9.5 9.5h5v5h-5zM3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z"
      />
    </svg>
  );
}

function YarnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#2C8EBB" />
      <path
        fill="white"
        d="M14.8 7.2c-.4-.2-.9.6-1.1 1.1a2.7 2.7 0 0 0-2.4.9c-.3.3-.6.3-.8.4-.3.1-.6.8-.7 1.2-.3.9.5 1.8.5 1.8s-1.2.8-1.6 1.9a5 5 0 0 0-.3 2.2s-.8.7-.9 1.5c-.1.7.2 1.4.4 1.6.2.3.6.2.6.2s-.5.6 0 .9c.5.2 1.3.4 1.7 0 .3-.3.4-1 .5-1.3 0-.1.1.1.2.2.2.2.4.3.4.3s-.7.3-.4 1c.1.3.5.4 1.1.4.2 0 2.7-.1 3.4-.3.2-.1.4-.2.5-.3 1.1-.3 2.1-.8 3-1.4.9-.6 1.3-.8 2-1 .6-.1.6-1.1-.2-1.1s-1.6.4-2.2.8c-1.2.7-1.8.7-1.8.7s.4-1.3-.1-2.7c-.5-1.5-1.4-1.9-1.3-2 .3-.5 1-1.3 1.3-2.8.2-.9.1-2.4-.3-3.2-.1-.1-.7.2-.7.2s-.6-1.3-.8-1.4z"
      />
    </svg>
  );
}

function BunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FBF0DF" />
      <path
        fill="black"
        d="M12 3.2c1.1 0 2 .5 3.2 1.3.6.4 1.3.9 2.4 1.5 2.5 1.4 4 3.7 4 6.2 0 4.5-4.3 8.1-9.6 8.1s-9.6-3.6-9.6-8.1c0-2.5 1.5-4.8 4-6.2 1.1-.6 1.8-1.1 2.4-1.5C10 3.7 10.9 3.2 12 3.2Zm0 1.2c-.8 0-1.5.4-2.6 1.1-.6.4-1.4.9-2.5 1.5-2.1 1.2-3.3 3.1-3.3 5.2 0 3.8 3.8 6.9 8.4 6.9s8.4-3.1 8.4-6.9c0-2.1-1.2-4-3.3-5.2-1.1-.6-1.9-1.1-2.5-1.5-1.1-.7-1.8-1.1-2.6-1.1Z"
      />
      <circle cx="8.8" cy="11.7" r="1.1" fill="black" />
      <circle cx="15.2" cy="11.7" r="1.1" fill="black" />
      <path fill="black" d="M9.6 14.2h4.8c-.3 1.2-1.3 2-2.4 2s-2.1-.8-2.4-2Z" />
      <path
        fill="#FF6164"
        d="M10.8 15.1c.4.4.8.6 1.2.6s.8-.2 1.2-.6c-.4-.3-.8-.4-1.2-.4s-.8.1-1.2.4Z"
      />
    </svg>
  );
}

const PACKAGE_MANAGERS: readonly PackageManagerMeta[] = [
  { id: "npm", name: "npm", Icon: NpmIcon },
  { id: "pnpm", name: "pnpm", Icon: PnpmIcon },
  { id: "yarn", name: "yarn", Icon: YarnIcon },
  { id: "bun", name: "bun", Icon: BunIcon },
];

export function getAvailablePackageManagers(commands: PackageManagerCommands) {
  return PACKAGE_MANAGERS.filter((manager) => Boolean(commands[manager.id]));
}

export function PackageManagerCommand({
  commands,
  value,
  defaultValue,
  onValueChange,
  className,
  commandClassName,
  align = "end",
  copyLabel,
  resetDelay = 1600,
  onCopySuccess,
  onCopyError,
}: PackageManagerCommandProps) {
  const managers = getAvailablePackageManagers(commands);
  const [result, setResult] = useState<{
    command: string;
    status: "done" | "error";
  } | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);
  if (!managers.length) return null;
  async function copy(command: string, id: PackageManagerId) {
    if (timeout.current) clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(command);
      if (mounted.current) setResult({ command, status: "done" });
      onCopySuccess?.(command, id);
    } catch (error) {
      if (mounted.current) setResult({ command, status: "error" });
      onCopyError?.(error instanceof Error ? error : new Error("Copy failed"));
    }
    if (mounted.current)
      timeout.current = setTimeout(() => setResult(null), resetDelay);
  }
  return (
    <Select
      items={managers.map(({ id, name }) => ({ value: id, label: name }))}
      value={value}
      defaultValue={defaultValue ?? managers[0].id}
      onValueChange={onValueChange}
    >
      <SelectValue
        render={<div />}
        className={cn(
          "inline-flex min-w-0 max-w-full items-stretch rounded-md border border-input bg-background text-foreground",
          className,
        )}
      >
        {(state) => {
          const manager = managers.find(({ id }) => id === state.value);
          const command = manager ? (commands[manager.id] ?? "") : "";
          const status = result?.command === command ? result.status : null;
          const Icon = manager?.Icon ?? Copy;
          return (
            <>
              <Button
                variant="ghost"
                disabled={!command}
                onClick={() => manager && copy(command, manager.id)}
                aria-label={
                  copyLabel ??
                  `Copy ${manager?.name ?? "selected"} install command`
                }
                title={command}
                className={cn(
                  "min-w-0 flex-1 justify-start rounded-e-none px-3",
                  commandClassName,
                )}
              >
                <Icon aria-hidden="true" />
                <code className="hidden min-w-0 truncate text-xs sm:block">
                  {command || "Choose a package manager"}
                </code>
                <span className="text-xs sm:hidden">
                  {status === "done" ? "Copied" : "Copy"}
                </span>
                {status === "done" ? (
                  <Check aria-hidden="true" />
                ) : status === "error" ? (
                  <CircleX aria-hidden="true" />
                ) : (
                  <Copy aria-hidden="true" />
                )}
              </Button>
              <SelectTrigger
                aria-label="Package manager"
                className="flex min-h-10 shrink-0 items-center gap-2 rounded-e-md border-s border-input px-3 text-sm outline-none hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>{manager?.name ?? "Choose"}</span>
                <ChevronDown aria-hidden="true" className="size-4" />
              </SelectTrigger>
              <span role="status" className="sr-only">
                {status === "done"
                  ? "Command copied"
                  : status === "error"
                    ? "Copy failed. Select and copy the command manually."
                    : ""}
              </span>
            </>
          );
        }}
      </SelectValue>
      <SelectContent
        align={align}
        sideOffset={6}
        className="max-h-(--available-height) min-w-44 overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
      >
        {managers.map(({ id, name, Icon }) => (
          <SelectItem
            key={id}
            value={id}
            className="flex min-h-10 items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
          >
            <Icon aria-hidden="true" className="size-4" />
            <span className="flex-1">{name}</span>
            <SelectItemIndicator>
              <Check aria-hidden="true" className="size-4" />
            </SelectItemIndicator>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
