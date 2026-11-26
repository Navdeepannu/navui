import { BlockShowcaseTabs } from "@/components/blocks/block-showcase-tabs";
import { getBlockInstallCommands } from "@/registry/install";
import type { BlockDefinition, BlockSourceFile } from "@/registry/types";

type BlockShowcaseProps = {
  block: BlockDefinition;
  sourceFiles?: BlockSourceFile[];
};

export function BlockShowcase({
  block,
  sourceFiles = [],
}: BlockShowcaseProps) {
  const previewPath = `/preview/${block.designSystem}/${block.slug}`;

  return (
    <article id={block.slug} className="scroll-mt-24">
      <BlockShowcaseTabs
        blockId={block.id}
        title={block.title}
        previewPath={previewPath}
        commands={getBlockInstallCommands(block)}
        sourceFiles={sourceFiles}
      />
    </article>
  );
}
