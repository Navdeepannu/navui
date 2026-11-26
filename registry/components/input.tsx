"use client";
import { Input as SdkInput } from "@ui-sdk/react/input";
import type { ComponentProps } from "react";
import { cn } from "cn";
export type InputProps = ComponentProps<typeof SdkInput>;
export function Input({ className, ...props }: InputProps) {
  return (
    <SdkInput
      {...props}
      className={(state) =>
        cn(
          "min-h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground shadow-xs outline-none placeholder:text-muted-foreground motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive aria-invalid:border-destructive sm:text-sm",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
