import type { ComponentProps } from "react";
import { cn } from "cn";

export function CodeFrame({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-code-frame=""
      className={cn(
        "relative flex w-full min-w-0 flex-col overflow-hidden rounded-xl bg-muted/60 dark:bg-zinc-900 p-1.5 shadow-inner",
        className,
      )}
    />
  );
}

export function CodeSurface({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-code-surface=""
      className={cn(
        "relative min-h-0 min-w-0 overflow-hidden rounded-lg bg-background shadow-sm",
        className,
      )}
    />
  );
}

export function CodeContent({
  html,
  label,
  lineNumbers = true,
  compact = false,
  className,
}: {
  html: string;
  label: string;
  lineNumbers?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      tabIndex={0}
      aria-label={label}
      data-code-content=""
      data-compact={compact || undefined}
      className={cn(
        "code-content",
        lineNumbers && "code-line-numbers",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
