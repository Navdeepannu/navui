import { EllipsisIcon } from "lucide-react";
import { Button } from "@/registry/components/button";

const sizes = [
  { size: "xs", iconSize: "icon-xs", height: 24 },
  { size: "sm", iconSize: "icon-sm", height: 28 },
  { size: "default", iconSize: "icon", height: 32 },
  { size: "lg", iconSize: "icon-lg", height: 40 },
] as const;

export default function ButtonSizes() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-x-4 gap-y-5">
      {sizes.map(({ size, iconSize, height }) => (
        <div key={size} className="grid w-30 justify-items-center gap-2">
          <p className="font-mono text-xs text-muted-foreground">{height}px · {size}</p>
          <div className="flex items-center gap-1.5">
            <Button size={size}>Export</Button>
            <Button variant="outline" size={iconSize} aria-label="More export options">
              <EllipsisIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
