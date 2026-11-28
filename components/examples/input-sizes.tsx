import { Button } from "@/registry/components/button";
import { Input } from "@/registry/components/input";

const sizes = [
  { size: "xs", height: 24 },
  { size: "sm", height: 28 },
  { size: "default", height: 32 },
  { size: "lg", height: 40 },
] as const;

export default function InputSizes() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      {sizes.map(({ size, height }) => (
        <div key={size} className="grid grid-cols-[2.75rem_minmax(0,1fr)_4rem] items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{height}px</span>
          <Input controlSize={size} aria-label={`Project name (${size})`} placeholder="Project name" />
          <Button size={size} variant="outline" className="justify-self-end" aria-label={`Save (${size})`}>
            Save
          </Button>
        </div>
      ))}
    </div>
  );
}
