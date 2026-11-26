"use client";
import {
  Checkbox as SdkCheckbox,
  CheckboxIndicator,
} from "@ui-sdk/react/checkbox";
import type { ComponentProps } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "cn";
export type { CheckedState } from "@ui-sdk/react/checkbox";
export type CheckboxProps = ComponentProps<typeof SdkCheckbox>;
export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <SdkCheckbox
      {...props}
      className={(state) =>
        cn(
          "relative inline-flex size-5 shrink-0 items-center justify-center rounded border border-input bg-background text-primary-foreground before:absolute before:-inset-2.5 data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive motion-safe:transition-colors",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {children ?? (
        <CheckboxIndicator>
          {(state) =>
            state.indeterminate ? (
              <MinusIcon aria-hidden="true" className="size-3.5" />
            ) : (
              <CheckIcon aria-hidden="true" className="size-3.5" />
            )
          }
        </CheckboxIndicator>
      )}
    </SdkCheckbox>
  );
}

export { CheckboxIndicator } from "@ui-sdk/react/checkbox";
