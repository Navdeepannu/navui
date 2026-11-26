import type { ComponentType } from "react";

import type { DesignSystemId } from "@/config/design-systems";
import type { BlockCategoryId } from "@/registry/categories";

export type BlockStatus = "draft" | "published" | "archived";

export type RegistryFileType =
  | "registry:component"
  | "registry:ui"
  | "registry:lib"
  | "registry:hook"
  | "registry:file";

export type RegistryFile = {
  source: string;
  target: string;
  type: RegistryFileType;
  shared?: boolean;
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

export type ComponentCatalogEntry = {
  id: `components/${string}`;
  registryName: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: BlockStatus;
  tags: readonly string[];
  usageExample: string;
  api: readonly {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
  notes: readonly string[];
  preview: string;
  examples: readonly {
    id: string;
    title: string;
    description: string;
    source: string;
  }[];
  provenance: { repository: string; commit: string; path: string };
  registry: {
    type: "registry:ui";
    dependencies: readonly string[];
    registryDependencies: readonly string[];
    files: readonly [RegistryFile, ...RegistryFile[]];
  };
};

export type RegistryCatalogEntry = BlockCatalogEntry | ComponentCatalogEntry;
