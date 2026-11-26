import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockPreviewBoundary } from "@/components/blocks/block-preview-boundary";
import { BlockPreviewResizeReporter } from "@/components/blocks/block-preview-resize-reporter";
import { BlockPreviewShell } from "@/components/blocks/block-preview-shell";
import { DesignSystemRoot } from "@/components/design-system-root";
import { getComponentPreview, getComponentPreviewSlugs } from "@/registry/component-previews";
import { isDesignSystemId } from "@/config/design-systems";
import { getBlockDefinition, publishedBlocks } from "@/registry/blocks";

type BlockPreviewPageProps = {
  params: Promise<{
    designSystem: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...publishedBlocks.map((block) => ({ designSystem: block.designSystem, slug: block.slug })),
    ...getComponentPreviewSlugs().map((slug) => ({ designSystem: "components", slug })),
  ];
}

export async function generateMetadata({
  params,
}: BlockPreviewPageProps): Promise<Metadata> {
  const { designSystem, slug } = await params;

  if (designSystem === "components") {
    const preview = getComponentPreview(slug);
    return preview ? { title: `${preview.item.title} Preview`, description: preview.item.description } : {};
  }

  if (!isDesignSystemId(designSystem)) return {};

  const block = getBlockDefinition(designSystem, slug);
  if (!block) return {};

  return {
    title: `${block.title} Preview`,
    description: block.description,
  };
}

export default async function BlockPreviewPage({
  params,
}: BlockPreviewPageProps) {
  const { designSystem, slug } = await params;

  if (designSystem === "components") {
    const preview = getComponentPreview(slug);
    if (!preview) notFound();
    const { item, Preview } = preview;
    const previewId = `components/${slug}`;
    return (
      <div data-block-preview-page data-block-preview-root className="min-h-0 bg-background text-foreground">
        <BlockPreviewResizeReporter blockId={previewId} />
        <BlockPreviewShell backPath={`/components/${item.slug}`} title={item.title}>
          <BlockPreviewBoundary blockId={previewId}>
            <div className="flex min-h-80 w-full items-center justify-center px-3 py-8 sm:px-6"><Preview /></div>
          </BlockPreviewBoundary>
        </BlockPreviewShell>
      </div>
    );
  }

  if (!isDesignSystemId(designSystem)) notFound();

  const block = getBlockDefinition(designSystem, slug);
  if (!block) notFound();

  const Block = block.component;
  const backPath = `/blocks/${block.designSystem}/${block.category}#${block.slug}`;

  return (
    <DesignSystemRoot
      designSystem={block.designSystem}
      data-block-preview-page
      data-block-preview-root
      className="min-h-0"
    >
      <BlockPreviewResizeReporter blockId={block.id} />
      <BlockPreviewShell backPath={backPath} title={block.title}>
        <BlockPreviewBoundary blockId={block.id}>
          <Block />
        </BlockPreviewBoundary>
      </BlockPreviewShell>
    </DesignSystemRoot>
  );
}
