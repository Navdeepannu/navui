import { getComponentPreviewSize } from "@/components/documentation/preview-size";
import { CompactExample } from "@/components/documentation/compact-example";
import type { Metadata } from "next";
import { DocumentationLayout } from "@/components/library/documentation-layout";
import { notFound } from "next/navigation";

import { BlockShowcaseTabs } from "@/components/blocks/block-showcase-tabs";
import { ComponentDocumentation } from "@/components/catalog/component-documentation";
import { componentCatalog } from "@/registry/catalog";
import { getComponentDefinition, getComponentPreview } from "@/registry/component-previews";
import { getBlockInstallCommands } from "@/registry/install";
import { readExampleSource } from "@/registry/source";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return componentCatalog
    .filter((item) => item.status === "published")
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getComponentDefinition((await params).slug);
  return item
    ? { title: `${item.title} — NavUI`, description: item.description }
    : {};
}

export default async function ComponentPage({ params }: Props) {
  const item = getComponentDefinition((await params).slug);
  if (!item) notFound();
  const sourceFiles = [await readExampleSource(item.preview)];
  const commands = getBlockInstallCommands(item);
  const examples = await Promise.all(
    item.examples.map(async (example) => ({
      ...example,
      file: await readExampleSource(example.source),
      preview: example.presentation === "compact"
        ? getComponentPreview(`${item.slug}--${example.id}`)?.Preview
        : undefined,
    })),
  );

  return (
    <DocumentationLayout contentId={`documentation-${item.slug}`}>
      <header className="flex max-w-3xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight font-heading sm:text-3xl">
          {item.title}
        </h1>
        <p className="sm:text-base sm:text-balance text-[1.05rem] leading-6 text-muted-foreground">
          {item.description}
        </p>
      </header>
      <section aria-label={`${item.title} preview and source`}>
        <BlockShowcaseTabs
          blockId={item.id}
          title={item.title}
          previewPath={`/preview/components/${item.slug}`}
          commands={commands}
          sourceFiles={sourceFiles}
          exampleSource={sourceFiles[0]}
          previewSize={getComponentPreviewSize(item.slug)}
        />
      </section>
      <ComponentDocumentation item={item}>
        {examples.length > 0 && (
          <section
            aria-labelledby="examples-heading"
            className="flex min-w-0 flex-col gap-8"
          >
            <h2
              id="examples-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Examples
            </h2>
            {examples.map(({ preview: Preview, ...example }) => (
              <section
                key={example.id}
                aria-labelledby={`example-${example.id}`}
                className="flex min-w-0 flex-col gap-3"
              >
                <h3
                  id={`example-${example.id}`}
                  className="text-base font-semibold tracking-tight"
                >
                  {example.title}
                </h3>
                {example.description && (
                  <p className="text-sm leading-6 text-muted-foreground">
                    {example.description}
                  </p>
                )}
                {Preview ? (
                  <CompactExample file={example.file}><Preview /></CompactExample>
                ) : (
                  <BlockShowcaseTabs
                    blockId={`${item.id}--${example.id}`}
                    title={`${item.title}: ${example.title}`}
                    previewPath={`/preview/components/${item.slug}--${example.id}`}
                    commands={commands}
                    sourceFiles={[example.file]}
                    exampleSource={example.file}
                    previewSize={getComponentPreviewSize(item.slug)}
                  />
                )}
              </section>
            ))}
          </section>
        )}
      </ComponentDocumentation>
    </DocumentationLayout>
  );
}
