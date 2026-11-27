import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { BundledLanguage } from "shiki";
import { highlightCode } from "@/lib/highlight-code";
export { highlightCode } from "@/lib/highlight-code";

import { componentCatalog } from "@/registry/catalog";
import type { RegistryCatalogEntry, BlockSourceFile } from "@/registry/types";

const languageByExtension = {
  ".css": "css",
  ".sh": "shellscript",
  ".bash": "shellscript",
  ".html": "html",
  ".js": "javascript",
  ".jsx": "jsx",
  ".json": "json",
  ".md": "markdown",
  ".mdx": "mdx",
  ".ts": "typescript",
  ".tsx": "tsx",
} as const satisfies Record<string, BundledLanguage>;

function getSourceLanguage(target: string): BundledLanguage {
  return (
    languageByExtension[
      path.extname(target) as keyof typeof languageByExtension
    ] ?? "text"
  );
}

function normalizeSourceTarget(target: string) {
  return target
    .trim()
    .replaceAll("\\", "/")
    .replace(/^@\/?/, "")
    .replace(/^\/+/, "");
}

export const readBlockSource = cache(async (sourcePath: string) => {
  const normalized = path.posix.normalize(sourcePath.replaceAll("\\", "/"));
  if (path.isAbsolute(sourcePath))
    throw new Error(`Source must stay inside the project: ${sourcePath}`);

  if (normalized.startsWith("registry/")) {
    return readFile(
      path.join(
        process.cwd(),
        "registry",
        normalized.slice("registry/".length),
      ),
      "utf8",
    );
  }
  if (normalized.startsWith("components/examples/")) {
    return readFile(
      path.join(
        process.cwd(),
        "components/examples",
        normalized.slice("components/examples/".length),
      ),
      "utf8",
    );
  }
  if (normalized.startsWith("components/ui/")) {
    return readFile(
      path.join(
        process.cwd(),
        "components/ui",
        normalized.slice("components/ui/".length),
      ),
      "utf8",
    );
  }
  throw new Error(
    `Source must belong to the registry, examples, or shared primitives: ${sourcePath}`,
  );
});

export const readBlockSources = cache(
  async (
    block: Pick<RegistryCatalogEntry, "registry">,
  ): Promise<BlockSourceFile[]> =>
    Promise.all(
      collectSourceFiles(block.registry).map(async (file) => {
        const target = normalizeSourceTarget(file.target);
        const code = await readBlockSource(file.source);
        const highlightedCode = await highlightCode(
          code,
          getSourceLanguage(target),
        );

        return { target, code, highlightedCode };
      }),
    ),
);

function collectManifests(registry: RegistryCatalogEntry["registry"]) {
  const manifests = [registry];
  const visited = new Set<string>();
  function visit(manifest: RegistryCatalogEntry["registry"]) {
    for (const name of manifest.registryDependencies) {
      if (!name.startsWith("@navui/") || visited.has(name)) continue;
      visited.add(name);
      const item = componentCatalog.find(
        (entry) => entry.registryName === name.slice(7),
      );
      if (!item) throw new Error(`Unknown NavUI source dependency: ${name}`);
      manifests.push(item.registry);
      visit(item.registry);
    }
  }
  visit(registry);
  return manifests;
}

function collectSourceFiles(registry: RegistryCatalogEntry["registry"]) {
  return [
    ...new Map(
      collectManifests(registry).flatMap((manifest) =>
        manifest.files.map((file) => [file.target, file] as const),
      ),
    ).values(),
  ];
}

export const readExampleSource = cache(
  async (source: string): Promise<BlockSourceFile> => {
    let code = await readBlockSource(source);
    code = code.replaceAll("@/registry/components/", "@/components/navui/");
    if (!/^['"]use client['"]/m.test(code)) code = '\"use client\";\n\n' + code;
    return {
      target: source.split("/").at(-1)!,
      code,
      highlightedCode: await highlightCode(code, getSourceLanguage(source)),
    };
  },
);

export function getSourceDependencies(
  item: Pick<RegistryCatalogEntry, "registry">,
) {
  return [
    ...new Set(
      collectManifests(item.registry).flatMap(
        (manifest) => manifest.dependencies,
      ),
    ),
  ];
}
