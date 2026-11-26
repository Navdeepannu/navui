import { CopyButton } from "@/components/blocks/copy-button";
import { getBlockInstallCommands } from "@/registry/install";
import type { ComponentCatalogEntry } from "@/registry/types";

const codeClasses = "overflow-auto rounded-lg border bg-muted/40 p-4 text-xs leading-6 outline-none focus-visible:outline-2 focus-visible:outline-ring";

export function ComponentDocumentation({ item }: { item: ComponentCatalogEntry }) {
  const commands = getBlockInstallCommands(item);
  return (
    <>
      <section aria-labelledby="installation-heading" className="flex min-w-0 flex-col gap-4">
        <h2 id="installation-heading" className="text-xl font-semibold tracking-tight">Installation</h2>
        <p className="text-sm leading-6 text-muted-foreground">Add the NavUI namespace to your shadcn <code className="text-foreground">components.json</code>, then install. Registry URLs are intended for deployment; local builds can use the local JSON URL.</p>
        <pre tabIndex={0} className={codeClasses}><code>{JSON.stringify({ registries: { "@navui": "https://navui.dev/r/{name}.json" } }, null, 2)}</code></pre>
        <div className="flex min-w-0 items-start gap-2 rounded-lg border bg-muted/40 p-3">
          <pre tabIndex={0} className="min-w-0 flex-1 overflow-auto py-1 text-xs leading-6 outline-none focus-visible:outline-2 focus-visible:outline-ring"><code>{commands.npm}</code></pre>
          <CopyButton value={commands.npm} label="Copy install command" showLabel={false} />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">Npm dependencies: <span className="font-mono text-xs text-foreground">{item.registry.dependencies.join(", ") || "None"}</span>. Required primitive helpers and the MIT license are included; demos are excluded.</p>
      </section>
      <section aria-labelledby="usage-heading" className="flex min-w-0 flex-col gap-4">
        <div className="flex items-center justify-between gap-4"><h2 id="usage-heading" className="text-xl font-semibold tracking-tight">Usage</h2><CopyButton value={item.usageExample} label="Copy usage example" showLabel={false} /></div>
        <pre tabIndex={0} className={codeClasses}><code>{item.usageExample}</code></pre>
      </section>
      <section aria-labelledby="props-heading" className="flex min-w-0 flex-col gap-4">
        <h2 id="props-heading" className="text-xl font-semibold tracking-tight">Props</h2>
        <dl className="divide-y divide-border border-y border-border">
          {item.api.map((prop) => (
            <div key={prop.prop} className="grid min-w-0 gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6">
              <dt className="flex min-w-0 flex-col gap-1"><code className="text-sm font-medium wrap-anywhere">{prop.prop}</code><span className="font-mono text-xs leading-5 wrap-anywhere text-muted-foreground">{prop.type}</span></dt>
              <dd className="flex min-w-0 flex-col gap-1 text-sm leading-6"><span>{prop.description}</span><span className="text-xs wrap-anywhere text-muted-foreground">Default: {prop.default}</span></dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="notes-heading" className="flex flex-col gap-4">
        <h2 id="notes-heading" className="text-xl font-semibold tracking-tight">Accessibility and dependencies</h2>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted-foreground">{item.notes.map((note) => <li key={note}>{note}</li>)}</ul>
        <p className="text-xs leading-6 text-muted-foreground">Migrated from <a href={`${item.provenance.repository}/blob/${item.provenance.commit}/${item.provenance.path}`} className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">Portfolio’s original source</a>. Copyright © 2026 Navdeep Singh. MIT licensed.</p>
      </section>
    </>
  );
}
