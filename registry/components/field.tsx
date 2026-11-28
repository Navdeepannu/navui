"use client";

import * as Sdk from "@ui-sdk/react/field";
import type { ComponentProps } from "react";
import { cn } from "cn";

export function Field({
  className,
  ...props
}: ComponentProps<typeof Sdk.Field>) {
  return (
    <Sdk.Field
      {...props}
      className={(state) =>
        cn(
          "flex min-w-0 flex-col gap-1.5",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldGroup({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldGroup>) {
  return (
    <Sdk.FieldGroup
      {...props}
      className={(state) =>
        cn(
          "flex min-w-0 flex-col gap-4",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldLabel>) {
  return (
    <Sdk.FieldLabel
      {...props}
      className={(state) =>
        cn(
          "w-fit text-[13px] leading-5 font-medium text-foreground data-disabled:text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldDescription>) {
  return (
    <Sdk.FieldDescription
      {...props}
      className={(state) =>
        cn(
          "text-[13px] leading-5 text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldError({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldError>) {
  return (
    <Sdk.FieldError
      {...props}
      className={(state) =>
        cn(
          "text-[13px] leading-5 text-destructive",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldSet({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldSet>) {
  return (
    <Sdk.FieldSet
      {...props}
      className={(state) =>
        cn(
          "flex min-w-0 flex-col gap-4",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

export function FieldLegend({
  className,
  ...props
}: ComponentProps<typeof Sdk.FieldLegend>) {
  return (
    <Sdk.FieldLegend
      {...props}
      className={(state) =>
        cn(
          "mb-3 text-base leading-6 font-semibold text-foreground data-disabled:text-muted-foreground",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}
