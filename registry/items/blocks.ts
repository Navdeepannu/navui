import { blockCatalog } from "@/registry/catalog";
import { blockComponents } from "@/registry/components";
import type { BlockDefinition } from "@/registry/types";

export const blockDefinitions: readonly BlockDefinition[] = blockCatalog.map(
  (block) => ({
    ...block,
    registry: {
      ...block.registry,
      dependencies: [...block.registry.dependencies],
      registryDependencies: [...block.registry.registryDependencies],
      files: block.registry.files,
    },
    component: blockComponents[block.id],
  }),
);
