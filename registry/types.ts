import type { ComponentType } from "react";

import type { DesignSystemId } from "@/config/design-systems";
import type { BlockCategoryId } from "@/registry/categories";

export type BlockStatus = "draft" | "published" | "archived";

export type RegistryFileType =
  | "registry:component"
  | "registry:ui"
  | "registry:lib"
  | "registry:hook";

export type RegistryFile = {
  source: string;
  target: string;
  type: RegistryFileType;
};

export type BlockSourceFile = {
  target: string;
  code: string;
  highlightedCode: string;
};

export type BlockCatalogEntry = {
  id: `${DesignSystemId}/${string}`;
  registryName: string;
  designSystem: DesignSystemId;
  slug: string;
  title: string;
  description: string;
  category: BlockCategoryId;
  status: BlockStatus;
  registry: {
    type: "registry:block";
    dependencies: readonly string[];
    registryDependencies: readonly string[];
    files: readonly [RegistryFile, ...RegistryFile[]];
  };
};

export type BlockDefinition = BlockCatalogEntry & {
  component: ComponentType;
};
