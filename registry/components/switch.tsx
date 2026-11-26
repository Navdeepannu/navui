"use client";
import { Switch as SdkSwitch, SwitchThumb } from "@ui-sdk/react/switch";
import type { ComponentProps } from "react";
import { cn } from "cn";
export type SwitchProps = ComponentProps<typeof SdkSwitch>;
export function Switch({ className, children, ...props }: SwitchProps) {
  return (
    <SdkSwitch
      {...props}
      className={(state) =>
        cn(
          "group relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-input bg-muted-foreground before:absolute before:-inset-y-2 before:inset-x-0 data-checked:border-primary data-checked:bg-primary outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive motion-safe:transition-colors",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {children ?? (
        <SwitchThumb className="pointer-events-none ms-0.5 block size-4 rounded-full bg-background shadow-xs motion-safe:transition-transform motion-safe:duration-150 group-data-checked:translate-x-5 rtl:group-data-checked:-translate-x-5" />
      )}
    </SdkSwitch>
  );
}

export { SwitchThumb } from "@ui-sdk/react/switch";
