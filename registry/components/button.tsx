"use client";

import { Button as SdkButton } from "@ui-sdk/react/button";
import type { ComponentProps } from "react";
import { cn } from "cn";

const variants = {
  default:
    "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-accent",
  outline: "border-input bg-background text-foreground hover:bg-accent",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-accent",
};
const sizes = {
  sm: "min-h-9 px-3",
  default: "min-h-10 px-4",
  lg: "min-h-11 px-5",
  icon: "size-10 p-0",
};

export type ButtonProps = ComponentProps<typeof SdkButton> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <SdkButton
      {...props}
      className={(state) =>
        cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-medium outline-none motion-safe:transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pending:cursor-wait data-pending:opacity-70 [&_svg]:size-4 [&_svg]:shrink-0",
          variants[variant],
          sizes[size],
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
