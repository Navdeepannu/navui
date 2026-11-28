import type { ReactNode } from "react";
import { ApiReference } from "@/components/documentation/api-reference";
import {
  getUsageCode,
  getUsageIntroduction,
  getAccessibilityNotes,
} from "@/components/documentation/component-content";
import { CodeBlock } from "@/components/documentation/code-block";
import { CommandBlock } from "@/components/documentation/command-block";
import { InstallationTabs } from "@/components/documentation/installation-tabs";
import {
  highlightCode,
  readBlockSources,
  getSourceDependencies,
} from "@/registry/source";
import type { BlockInstallCommands } from "@/registry/install";
import { getBlockInstallCommands } from "@/registry/install";
import type { ComponentCatalogEntry } from "@/registry/types";

export async function ComponentDocumentation({
  item,
  children,
}: {
  item: ComponentCatalogEntry;
  children?: ReactNode;
}) {
  const accessibilityNotes = getAccessibilityNotes(item);
  const usageCode = getUsageCode(item);
  const commands = getBlockInstallCommands(item);
  async function highlightCommands(
    values: BlockInstallCommands,
  ): Promise<BlockInstallCommands> {
    const [npm, pnpm, yarn, bun] = await Promise.all(
      [values.npm, values.pnpm, values.yarn, values.bun].map((code) =>
        highlightCode(code, "shellscript"),
      ),
    );
    return { npm, pnpm, yarn, bun };
  }
  const sourceFiles = (await readBlockSources(item)).filter((file) =>
    /\.(tsx?|jsx?|css|json)$/.test(file.target),
  );
  const dependencies = getSourceDependencies(item).join(" ");
  const dependencyCommands = {
    npm: `npm install ${dependencies}`,
    pnpm: `pnpm add ${dependencies}`,
    yarn: `yarn add ${dependencies}`,
    bun: `bun add ${dependencies}`,
  };
  const [usageHtml, highlighted, dependencyHighlighted] = await Promise.all([
    highlightCode(usageCode, "tsx"),
    highlightCommands(commands),
    highlightCommands(dependencyCommands),
  ]);
  return (
    <>
      <section
        aria-labelledby="installation-heading"
        className="flex min-w-0 flex-col gap-4"
      >
        <h2
          id="installation-heading"
          className="text-xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <InstallationTabs
          command={
            <CommandBlock commands={commands} highlighted={highlighted} />
          }
          manual={
            <>
              {dependencies && (
                <>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Install the required packages.
                  </p>
                  <CommandBlock
                    commands={dependencyCommands}
                    highlighted={dependencyHighlighted}
                  />
                </>
              )}
              {item.registry.registryDependencies.length > 0 && (
                <p className="text-sm leading-6 text-muted-foreground">
                  Registry dependencies:{" "}
                  <code className="text-xs text-foreground">
                    {item.registry.registryDependencies.join(", ")}
                  </code>
                  . Their supporting source files are included below.
                </p>
              )}
              <p className="text-sm leading-6 text-muted-foreground">
                Copy these files to the indicated paths and adjust aliases to
                your project. Keep the original copyright notices and MIT
                license with your copy.
              </p>
              {sourceFiles.map((file) => (
                <div key={file.target} className="flex min-w-0 flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Save as{" "}
                    <code className="font-mono text-xs text-foreground">
                      {file.target}
                    </code>
                    .
                  </p>
                  <CodeBlock file={file} collapsible />
                </div>
              ))}
            </>
          }
        />
      </section>
      <section
        aria-labelledby="usage-heading"
        className="flex min-w-0 flex-col gap-4"
      >
        <h2 id="usage-heading" className="text-xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          {getUsageIntroduction(item)}
        </p>
        <CodeBlock
          file={{
            target: "example.tsx",
            code: usageCode,
            highlightedCode: usageHtml,
          }}
          collapsible={usageCode.split("\n").length > 14}
        />
      </section>
      {children}
      <ApiReference item={item} />
      {accessibilityNotes.length > 0 && (
        <section
          aria-labelledby="notes-heading"
          className="flex flex-col gap-4"
        >
          <h2
            id="notes-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Accessibility
          </h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted-foreground">
            {accessibilityNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
