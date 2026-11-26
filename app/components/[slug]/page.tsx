import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlockShowcaseTabs } from "@/components/blocks/block-showcase-tabs";
import { ComponentDocumentation } from "@/components/catalog/component-documentation";
import { componentCatalog } from "@/registry/catalog";
import { getComponentDefinition } from "@/registry/component-previews";
import { getBlockInstallCommands } from "@/registry/install";
import { readBlockSources } from "@/registry/source";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return componentCatalog.filter((item) => item.status === "published").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getComponentDefinition((await params).slug);
  return item ? { title: `${item.title} — NavUI`, description: item.description } : {};
}

export default async function ComponentPage({ params }: Props) {
  const item = getComponentDefinition((await params).slug);
  if (!item) notFound();
  const sourceFiles = await readBlockSources(item);
  const commands = getBlockInstallCommands(item);
  const examples = await Promise.all(item.examples.map(async (example) => ({
    ...example,
    files: await readBlockSources({ registry: { ...item.registry, files: [{ source: example.source, target: example.source, type: "registry:component" }] } }),
  })));

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <aside className="min-w-0">
        <nav aria-label="Component navigation" className="flex flex-col gap-4 lg:sticky lg:top-24">
          <Link href="/components" className="w-fit rounded-sm text-sm font-medium outline-none hover:underline focus-visible:outline-2 focus-visible:outline-ring">All components</Link>
          <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col">
            {componentCatalog.filter((entry) => entry.status === "published").map((entry) => (
              <li key={entry.slug} className="shrink-0">
                <Link href={`/components/${entry.slug}`} aria-current={entry.slug === item.slug ? "page" : undefined} className="block rounded-md px-2 py-2 text-sm whitespace-nowrap text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground">{entry.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex min-w-0 flex-col gap-10">
        <header className="flex max-w-3xl flex-col gap-3">
          <p className="text-sm text-muted-foreground">NavUI / Components</p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
          <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
        </header>
        <section aria-label={`${item.title} preview and source`}>
          <BlockShowcaseTabs blockId={item.id} title={item.title} previewPath={`/preview/components/${item.slug}`} commands={commands} sourceFiles={sourceFiles} />
        </section>
        <ComponentDocumentation item={item} />
        {examples.map((example) => (
          <section key={example.id} aria-labelledby={`example-${example.id}`} className="flex min-w-0 flex-col gap-4">
            <h2 id={`example-${example.id}`} className="text-xl font-semibold tracking-tight">{example.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{example.description}</p>
            <BlockShowcaseTabs blockId={`${item.id}--${example.id}`} title={`${item.title}: ${example.title}`} previewPath={`/preview/components/${item.slug}--${example.id}`} commands={commands} sourceFiles={example.files} />
          </section>
        ))}
      </main>
    </div>
  );
}
