"use client";

import { Input as SdkInput } from "@ui-sdk/react/input";
import type { ComponentProps } from "react";
import { cn } from "cn";

const controlSizes = {
  xs: "h-6 px-2 sm:pointer-fine:text-xs",
  sm: "h-7 px-2.5",
  default: "h-8 px-3",
  lg: "h-10 px-4 sm:pointer-fine:text-sm",
};

export type InputProps = ComponentProps<typeof SdkInput> & {
  controlSize?: keyof typeof controlSizes;
};

export function Input({ controlSize = "default", className, ...props }: InputProps) {
  return (
    <SdkInput
      {...props}
      className={(state) =>
        cn(
          "w-full min-w-0 rounded-md border border-ring/85 bg-background py-0 text-base leading-5 text-foreground outline-none placeholder:text-muted-foreground pointer-coarse:min-h-11 sm:pointer-fine:text-[13px]",
          "enabled:not-data-readonly:not-data-invalid:not-aria-invalid:hover:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "data-readonly:bg-muted disabled:cursor-not-allowed disabled:border-input disabled:bg-muted disabled:text-muted-foreground",
          "data-invalid:border-destructive aria-invalid:border-destructive motion-safe:transition-colors motion-safe:duration-150",
          controlSizes[controlSize],
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
