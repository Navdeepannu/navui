import type { ComponentProps } from "react";

import type { DesignSystemId } from "@/config/design-systems";
import { cn } from "cn";

type DesignSystemRootProps = ComponentProps<"div"> & {
  designSystem: DesignSystemId;
};

export function DesignSystemRoot({
  designSystem,
  className,
  ...props
}: DesignSystemRootProps) {
  return (
    <div
      {...props}
      data-design-system={designSystem}
      className={cn(
        "min-h-full bg-background font-sans text-foreground",
        className,
      )}
    />
  );
}
