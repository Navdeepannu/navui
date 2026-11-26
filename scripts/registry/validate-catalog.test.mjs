import assert from "node:assert/strict";
import test from "node:test";

import { validateBlockCatalog } from "./validate-catalog.mjs";

const options = {
  designSystemIds: ["base", "iris", "pro"],
  categoryIds: ["blog", "hero"],
};

function createBlock(overrides = {}) {
  return {
    id: "base/blog-section-one",
    registryName: "base-blog-section-one",
    designSystem: "base",
    slug: "blog-section-one",
    category: "blog",
    status: "published",
    registry: {
      type: "registry:block",
      dependencies: ["lucide-react"],
      registryDependencies: [],
      files: [
        {
          source:
            "registry/blocks/base/blog/blog-section-one/blog-section-one.tsx",
          target: "components/blocks/base/blog/blog-section-one.tsx",
          type: "registry:component",
        },
      ],
    },
    ...overrides,
  };
}

test("accepts a block that follows the catalog contract", () => {
  assert.doesNotThrow(() => validateBlockCatalog([createBlock()], options));
});

test("rejects route and registry-name collisions", () => {
  const duplicate = createBlock({
    id: "base/blog-section-one-copy",
  });

  assert.throws(
    () => validateBlockCatalog([createBlock(), duplicate], options),
    /duplicate registry name.*duplicate preview route/s,
  );
});

test("rejects primary files outside the canonical block paths", () => {
  const invalid = createBlock({
    registry: {
      ...createBlock().registry,
      files: [
        {
          source: "registry/blocks/blog-section-one.tsx",
          target: "components/blog-section-one.tsx",
          type: "registry:block",
        },
      ],
    },
  });

  assert.throws(
    () => validateBlockCatalog([invalid], options),
    /primary source must be.*primary target must be.*primary file type must be/s,
  );
});
