import type { DesignSystemId } from "@/config/design-systems";
import {
  blockCategories,
  type BlockCategoryId,
} from "@/registry/categories";
import { blockDefinitions } from "@/registry/items";

export const publishedBlocks = blockDefinitions.filter(
  (block) => block.status === "published",
);

export function getBlocksByDesignSystem(designSystem: DesignSystemId) {
  return publishedBlocks.filter(
    (block) => block.designSystem === designSystem,
  );
}

export function getBlocksByCategory(
  designSystem: DesignSystemId,
  category: BlockCategoryId,
) {
  return getBlocksByDesignSystem(designSystem).filter(
    (block) => block.category === category,
  );
}

export function getBlockCategorySummaries(designSystem: DesignSystemId) {
  const blocks = getBlocksByDesignSystem(designSystem);

  return blockCategories.map((category) => {
    const categoryBlocks = blocks.filter(
      (block) => block.category === category.id,
    );

    return {
      ...category,
      count: categoryBlocks.length,
      previewBlock: categoryBlocks[0],
    };
  });
}

export function getBlockDefinition(
  designSystem: DesignSystemId,
  slug: string,
) {
  return publishedBlocks.find(
    (block) =>
      block.designSystem === designSystem && block.slug === slug,
  );
}
