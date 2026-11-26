import { siteConfig } from "@/config/site";
import type { BlockDefinition } from "@/registry/types";

export const packageManagerIds = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManagerId = (typeof packageManagerIds)[number];

export type BlockInstallCommands = Record<PackageManagerId, string>;

const shadcnExecutors: BlockInstallCommands = {
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

export function getBlockRegistryUrl(block: BlockDefinition) {
  return new URL(`/r/${block.registryName}.json`, siteConfig.url).toString();
}

export function getBlockInstallCommand(block: BlockDefinition) {
  return getBlockInstallCommands(block).npm;
}

export function getBlockInstallCommands(
  block: BlockDefinition,
): BlockInstallCommands {
  const registryUrl = getBlockRegistryUrl(block);

  return {
    npm: `${shadcnExecutors.npm} ${registryUrl}`,
    pnpm: `${shadcnExecutors.pnpm} ${registryUrl}`,
    yarn: `${shadcnExecutors.yarn} ${registryUrl}`,
    bun: `${shadcnExecutors.bun} ${registryUrl}`,
  };
}
