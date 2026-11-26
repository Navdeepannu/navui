import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

import type { RegistryCatalogEntry, BlockSourceFile } from "@/registry/types";

const languageByExtension = {
  ".css": "css",
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
  if (path.isAbsolute(sourcePath)) throw new Error(`Source must stay inside the project: ${sourcePath}`);

  if (normalized.startsWith("registry/")) {
    return readFile(path.join(process.cwd(), "registry", normalized.slice("registry/".length)), "utf8");
  }
  if (normalized.startsWith("components/examples/")) {
    return readFile(path.join(process.cwd(), "components/examples", normalized.slice("components/examples/".length)), "utf8");
  }
  if (normalized.startsWith("components/ui/")) {
    return readFile(path.join(process.cwd(), "components/ui", normalized.slice("components/ui/".length)), "utf8");
  }
  throw new Error(`Source must belong to the registry, examples, or shared primitives: ${sourcePath}`);
});

export const readBlockSources = cache(
  async (block: Pick<RegistryCatalogEntry, "registry">): Promise<BlockSourceFile[]> =>
    Promise.all(
      block.registry.files.map(async (file) => {
        const target = normalizeSourceTarget(file.target);
        const code = await readBlockSource(file.source);
        const highlightedCode = await codeToHtml(code, {
          lang: getSourceLanguage(target),
          themes: {
            light: "github-light",
            dark: "github-dark-default",
          },
        });

        return { target, code, highlightedCode };
      }),
    ),
);
