import Link from "next/link";

type BlockCategoryCardProps = {
  blockCount: number;
  categoryName: string;
  href: string;
  preview?: {
    path: string;
    title: string;
  };
};

export function BlockCategoryCard({
  blockCount,
  categoryName,
  href,
  preview,
}: BlockCategoryCardProps) {
  return (
    <article className="group relative overflow-hidden ring-1 ring-foreground/10 rounded-2xl bg-muted/70 shadow-sm motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-background">
        {preview ? (
          <iframe
            src={preview.path}
            title={`${preview.title} thumbnail`}
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 bg-muted/70"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-foreground">
            Preview not available
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 rounded-2xl ring-inset"
        />
      </div>

      <div className="space-y-0.5 text-sm px-4 pt-3 pb-4">
        <h2 className="captalize tracking-tight">{categoryName}</h2>
        <p className="shrink-0 captalize text-sm text-muted-foreground tabular-nums">
          {blockCount} {blockCount === 1 ? "Block" : "Blocks"}
        </p>
      </div>

      <Link
        href={href}
        aria-label={`Browse ${categoryName}: ${blockCount} ${blockCount === 1 ? "block" : "blocks"}`}
        className="absolute inset-0 rounded-2xl focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset focus-visible:outline-none"
      />
    </article>
  );
}
