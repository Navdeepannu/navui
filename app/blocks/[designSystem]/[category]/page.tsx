import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockShowcase } from "@/components/blocks/block-showcase";
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
import { getBlocksByCategory } from "@/registry/blocks";
import {
  blockCategories,
  getBlockCategory,
  isBlockCategoryId,
} from "@/registry/categories";
import { readBlockSources } from "@/registry/source";

type BlockCategoryPageProps = {
  params: Promise<{
    designSystem: string;
    category: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return designSystemIds.flatMap((designSystem) =>
    blockCategories.map((category) => ({
      designSystem,
      category: category.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: BlockCategoryPageProps): Promise<Metadata> {
  const { designSystem: designSystemParam, category: categoryParam } =
    await params;

  if (
    !isDesignSystemId(designSystemParam) ||
    !isBlockCategoryId(categoryParam)
  ) {
    return {};
  }

  const system = getDesignSystem(designSystemParam);
  const category = getBlockCategory(categoryParam);

  if (!system || !category) return {};

  return {
    title: `${category.name} — ${system.name} Blocks`,
    description: `${category.description} Browse the ${system.name} collection.`,
  };
}

export default async function BlockCategoryPage({
  params,
}: BlockCategoryPageProps) {
  const { designSystem: designSystemParam, category: categoryParam } =
    await params;

  if (
    !isDesignSystemId(designSystemParam) ||
    !isBlockCategoryId(categoryParam)
  ) {
    notFound();
  }

  const system = getDesignSystem(designSystemParam);
  const category = getBlockCategory(categoryParam);

  if (!system || !category) notFound();

  const blocks = getBlocksByCategory(system.id, category.id);
  const publicSources = await Promise.all(
          blocks.map(
            async (block) => [block.id, await readBlockSources(block)] as const,
          ),
        );
  const sourceById = new Map(publicSources);

  return (
    <DesignSystemRoot
      designSystem={system.id}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="w-full min-w-0 pb-4">
        <header className="flex max-w-3xl flex-col gap-3 pb-6">
          <p className="text-sm text-muted-foreground">NavUI / Blocks</p>
          <h1 className="text-3xl font-semibold tracking-tight">{category.name}</h1>
          <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
        </header>

        {blocks.length > 0 ? (
          <div className="mt-8 flex flex-col gap-16 sm:mt-10">
            {blocks.map((block) => {
              return (
                <BlockShowcase
                  key={block.id}
                  block={block}
                  sourceFiles={sourceById.get(block.id)}
                />
              );
            })}
          </div>
        ) : (
          <Empty className="mt-8 min-h-72 border sm:mt-10">
            <EmptyHeader>
              <EmptyTitle>No {category.name.toLowerCase()} yet</EmptyTitle>
              <EmptyDescription>
                The {system.name} foundation and route are ready. Add the first
                block to the registry catalog and it will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </DesignSystemRoot>
  );
}
