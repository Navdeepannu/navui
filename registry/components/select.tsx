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

const triggerSizes = {
  xs: "min-h-6 px-2 text-xs [&_svg]:size-3",
  sm: "min-h-7 px-2.5",
  default: "min-h-8 px-3",
  lg: "min-h-10 px-4 text-sm leading-5",
};

export type SelectTriggerProps = ComponentProps<typeof Sdk.SelectTrigger> & {
  size?: keyof typeof triggerSizes;
};

export function SelectTrigger({
  size = "default",
  className,
  ...props
}: SelectTriggerProps) {
  return (
    <Sdk.SelectTrigger
      {...props}
      className={(state) =>
        cn(
          "flex w-full min-w-0 items-center justify-between gap-1.5 rounded-md border border-ring/85 bg-background py-0.5 text-[13px] leading-4 text-foreground outline-none pointer-coarse:min-h-11",
          "enabled:not-data-disabled:not-data-invalid:not-aria-invalid:hover:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "data-disabled:cursor-not-allowed data-disabled:border-input data-disabled:bg-muted data-disabled:text-muted-foreground data-invalid:border-destructive aria-invalid:border-destructive motion-safe:transition-colors motion-safe:duration-150",
          "[&_svg]:size-4 [&_svg]:shrink-0",
          triggerSizes[size],
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
          "px-3 py-1.5 text-xs font-medium text-muted-foreground",
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
          "flex min-h-8 min-w-0 cursor-default items-center gap-3 rounded-sm px-3 py-1.5 text-[13px] leading-4 wrap-anywhere outline-none pointer-coarse:min-h-11 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
