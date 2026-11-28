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
  destructive:
    "border-transparent bg-destructive text-[color:var(--destructive-foreground,var(--background))] hover:bg-[color-mix(in_oklab,var(--destructive),var(--foreground)_6%)]",
  link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
};
const sizes = {
  xs: "min-h-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
  sm: "min-h-7 px-2.5",
  default: "min-h-8 px-3",
  lg: "min-h-10 px-4 text-sm leading-5",
  icon: "size-8 p-0",
  "icon-xs": "size-6 p-0 [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-7 p-0",
  "icon-lg": "size-10 p-0",
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
          "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border py-0.5 text-[13px] leading-4 font-medium outline-none",
          "pointer-coarse:min-h-11 pointer-coarse:min-w-11",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "motion-safe:transition-[background-color,border-color,color,opacity,translate] motion-safe:duration-150 motion-safe:active:not-aria-disabled:not-disabled:not-aria-[haspopup]:translate-y-px",
          "disabled:cursor-not-allowed disabled:opacity-65 data-disabled:cursor-not-allowed data-disabled:opacity-65 data-pending:cursor-wait data-pending:opacity-90",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          variants[variant],
          sizes[size],
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
