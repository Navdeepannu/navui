import { readFile, writeFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";

import { designSystems } from "../../config/design-systems.ts";
import { registryCatalog } from "../../registry/catalog.ts";
import { blockCategories } from "../../registry/categories.ts";
import { validateBlockCatalog } from "./validate-catalog.mjs";

const root = process.cwd();
const outputPath = path.join(root, "registry.json");
const checkOnly = process.argv.includes("--check");

validateBlockCatalog(registryCatalog, {
  designSystemIds: designSystems.map((designSystem) => designSystem.id),
  categoryIds: blockCategories.map((category) => category.id),
});

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "navui",
  homepage: "https://navui.dev",
  items: registryCatalog
    .filter(
      (block) =>
        block.status === "published",
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
  const publishedNames = new Set(registry.items.map((item) => `${item.name}.json`));
  for (const filename of await readdir(path.join(root, "public/r"))) {
    if (filename.endsWith(".json") && filename !== "registry.json" && !publishedNames.has(filename)) {
      await unlink(path.join(root, "public/r", filename));
    }
  }
  await writeFile(outputPath, nextContents);
  console.log(`Generated ${path.relative(root, outputPath)}.`);
}
