"use client";
import * as Sdk from "@ui-sdk/react/select";
import type { ComponentProps } from "react";
import { cn } from "cn";
export { Select } from "@ui-sdk/react/select";
export type {
  SelectProps,
  SelectOptions,
  ListData,
} from "@ui-sdk/react/select";

export function SelectTrigger({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectTrigger>) {
  return (
    <Sdk.SelectTrigger
      {...props}
      className={(state) =>
        cn(
          "flex min-h-10 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none motion-safe:transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive [&_svg]:size-4 [&_svg]:shrink-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectValue({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectValue>) {
  return (
    <Sdk.SelectValue
      {...props}
      className={(state) =>
        cn(
          "min-w-0 truncate text-start data-placeholder:text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectContent({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectContent>) {
  return (
    <Sdk.SelectContent
      {...props}
      className={(state) =>
        cn(
          "max-h-[min(var(--available-height),20rem)] min-w-(--anchor-width) max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectGroup({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectGroup>) {
  return (
    <Sdk.SelectGroup
      {...props}
      className={(state) =>
        cn(
          "min-w-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectGroupLabel({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectGroupLabel>) {
  return (
    <Sdk.SelectGroupLabel
      {...props}
      className={(state) =>
        cn(
          "px-3 py-2 text-xs font-medium text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectItemIndicator({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectItemIndicator>) {
  return (
    <Sdk.SelectItemIndicator
      {...props}
      className={(state) =>
        cn(
          "ms-auto flex size-4 shrink-0 items-center justify-center [&_svg]:size-4",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function SelectItem<T = string>({
  className,
  ...props
}: ComponentProps<typeof Sdk.SelectItem<T>>) {
  return (
    <Sdk.SelectItem<T>
      {...props}
      className={(state) =>
        cn(
          "flex min-h-10 min-w-0 cursor-default items-center gap-3 rounded-sm px-3 py-2 text-sm wrap-anywhere outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
