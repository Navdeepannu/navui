import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { codeToHtml, type BundledLanguage } from "shiki";

import type { BlockDefinition, BlockSourceFile } from "@/registry/types";

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
  const root = process.cwd();
  const absolutePath = path.resolve(root, sourcePath);
  const relativePath = path.relative(root, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Block source must stay inside the project: ${sourcePath}`);
  }

  return readFile(absolutePath, "utf8");
});

export const readBlockSources = cache(
  async (block: BlockDefinition): Promise<BlockSourceFile[]> =>
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
