import type { Metadata } from "next";
import { ComponentExplorer } from "@/components/catalog/component-explorer";
import { componentCatalog } from "@/registry/catalog";

export const metadata: Metadata = {
  title: "Components — NavUI",
  description:
    "Discover polished, customizable React components with working previews, source, and shadcn installation.",
};

export default function ComponentsPage() {
  return (
    <main className="flex min-w-0 w-full flex-col gap-8 pb-12">
      <header className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          NavUI collection
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Components
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Small, expressive pieces for real interfaces. Preview the interaction,
          inspect the source, and make it your own. One neutral foundation, in
          light and dark.
        </p>
      </header>
      <ComponentExplorer
        items={componentCatalog
          .filter((item) => item.status === "published")
          .map(({ slug, title, description, category, tags }) => ({
            slug,
            title,
            description,
            category,
            tags,
          }))}
      />
    </main>
  );
}
