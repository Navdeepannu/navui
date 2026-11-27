import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockCategoryCard } from "@/components/blocks/block-category-card";
import { DesignSystemRoot } from "@/components/design-system-root";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  designSystemIds,
  getDesignSystem,
  isDesignSystemId,
} from "@/config/design-systems";
import { getBlockCategorySummaries } from "@/registry/blocks";

type DesignSystemPageProps = {
  params: Promise<{ designSystem: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return designSystemIds.map((designSystem) => ({ designSystem }));
}

export async function generateMetadata({
  params,
}: DesignSystemPageProps): Promise<Metadata> {
  const { designSystem: designSystemParam } = await params;

  if (!isDesignSystemId(designSystemParam)) return {};

  const system = getDesignSystem(designSystemParam);
  if (!system) return {};

  return {
    title: `${system.name} Blocks`,
    description: system.description,
  };
}

export default async function DesignSystemPage({
  params,
}: DesignSystemPageProps) {
  const { designSystem: designSystemParam } = await params;

  if (!isDesignSystemId(designSystemParam)) notFound();

  const system = getDesignSystem(designSystemParam);
  if (!system) notFound();

  const categories = getBlockCategorySummaries(system.id);
  const availableCategories = categories.filter(
    (category) => category.count > 0,
  );

  return (
    <DesignSystemRoot
      designSystem={system.id}
      className="flex min-h-0 flex-1 flex-col"
    >
      <main className="w-full min-w-0 pb-6">
        <header className="pb-8"><h1 className="text-2xl font-semibold tracking-tight">NavUI blocks</h1><p className="mt-2 text-sm text-muted-foreground">Reusable sections built on a neutral foundation. Light and dark by default.</p></header>
        {availableCategories.length > 0 ? (
          <section aria-labelledby="category-heading" className="mt-2">
            <h2 id="category-heading" className="sr-only">
              Categories
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-4">
              {availableCategories.map((category) => {
                const previewBlock = category.previewBlock;

                return (
                  <BlockCategoryCard
                    key={category.id}
                    categoryName={category.name}
                    blockCount={category.count}
                    href={`/blocks/${system.id}/${category.id}`}
                    preview={
                      previewBlock
                        ? {
                            path: `/preview/${previewBlock.designSystem}/${previewBlock.slug}`,
                            title: previewBlock.title,
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </section>
        ) : (
          <Empty className="mt-6 min-h-80 border">
            <EmptyHeader>
              <EmptyTitle>No published {system.name} blocks yet</EmptyTitle>
              <EmptyDescription>
                The design-system route and navigation are ready for the first
                registry block.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </main>
    </DesignSystemRoot>
  );
}
