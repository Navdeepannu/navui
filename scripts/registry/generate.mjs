import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { designSystems } from "../../config/design-systems.ts";
import { blockCatalog } from "../../registry/catalog.ts";
import { blockCategories } from "../../registry/categories.ts";
import { validateBlockCatalog } from "./validate-catalog.mjs";

const root = process.cwd();
const outputPath = path.join(root, "registry.json");
const checkOnly = process.argv.includes("--check");

validateBlockCatalog(blockCatalog, {
  designSystemIds: designSystems.map((designSystem) => designSystem.id),
  categoryIds: blockCategories.map((category) => category.id),
});

const publicSystems = new Set(
  designSystems
    .filter((designSystem) => designSystem.access === "free")
    .map((designSystem) => designSystem.id),
);

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "navui",
  homepage: "https://navui.dev",
  items: blockCatalog
    .filter(
      (block) =>
        block.status === "published" && publicSystems.has(block.designSystem),
    )
    .map((block) => ({
      name: block.registryName,
      type: block.registry.type,
      title: block.title,
      description: block.description,
      dependencies: [...block.registry.dependencies],
      registryDependencies: [...block.registry.registryDependencies],
      files: block.registry.files.map((file) => ({
        path: file.source,
        target: file.target,
        type: file.type,
      })),
    })),
};

const nextContents = `${JSON.stringify(registry, null, 2)}\n`;

if (checkOnly) {
  let currentContents = "";

  try {
    currentContents = await readFile(outputPath, "utf8");
  } catch {
    // A missing registry is reported as drift below.
  }

  if (currentContents !== nextContents) {
    console.error(
      "registry.json is out of date. Run `pnpm run registry:build`.",
    );
    process.exitCode = 1;
  }
} else {
  await writeFile(outputPath, nextContents);
  console.log(`Generated ${path.relative(root, outputPath)}.`);
}
