"use client";

import {
  DialogBackdrop as SdkBackdrop,
  DialogContent as SdkContent,
  DialogTitle as SdkTitle,
  DialogDescription as SdkDescription,
} from "@ui-sdk/react/dialog";
import type { ComponentProps } from "react";
import { cn } from "cn";

export { Dialog, DialogTrigger, DialogClose } from "@ui-sdk/react/dialog";

export function DialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof SdkBackdrop>) {
  return (
    <SdkBackdrop
      {...props}
      className={(state) =>
        cn(
          "fixed inset-0 bg-foreground/25 motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
export function DialogContent({
  className,
  ...props
}: ComponentProps<typeof SdkContent>) {
  return (
    <SdkContent
      {...props}
      className={(state) =>
        cn(
          "fixed inset-0 m-auto h-fit max-h-[min(90dvh,48rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-xl border border-border bg-background p-6 text-foreground shadow-xl outline-none motion-safe:transition-opacity motion-safe:duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof SdkTitle>) {
  return (
    <SdkTitle
      {...props}
      className={(state) =>
        cn(
          "text-lg font-semibold tracking-tight",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof SdkDescription>) {
  return (
    <SdkDescription
      {...props}
      className={(state) =>
        cn(
          "text-sm leading-6 text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
