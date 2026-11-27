import { getComponentPreviewSize } from "@/components/documentation/preview-size";
import type { Metadata } from "next";
import { DocumentationLayout } from "@/components/library/documentation-layout";
import { notFound } from "next/navigation";

import { BlockShowcaseTabs } from "@/components/blocks/block-showcase-tabs";
import { ComponentDocumentation } from "@/components/catalog/component-documentation";
import { componentCatalog } from "@/registry/catalog";
import { getComponentDefinition } from "@/registry/component-previews";
import { getBlockInstallCommands } from "@/registry/install";
import { readExampleSource } from "@/registry/source";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
      files: [await readExampleSource(example.source)],
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
            {examples.map((example) => (
              <section
                key={example.id}
                aria-labelledby={`example-${example.id}`}
                className="flex min-w-0 flex-col gap-4"
              >
                <h3
                  id={`example-${example.id}`}
                  className="text-base font-semibold tracking-tight"
                >
                  {example.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {example.description}
                </p>
                <BlockShowcaseTabs
                  blockId={`${item.id}--${example.id}`}
                  title={`${item.title}: ${example.title}`}
                  previewPath={`/preview/components/${item.slug}--${example.id}`}
                  commands={commands}
                  sourceFiles={example.files}
                  exampleSource={example.files[0]}
                  previewSize={getComponentPreviewSize(item.slug)}
                />
              </section>
            ))}
          </section>
        )}
      </ComponentDocumentation>
    </DocumentationLayout>
  );
}
