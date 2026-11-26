import { siteConfig } from "@/config/site";
type InstallableItem = { registryName: string };

export const packageManagerIds = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManagerId = (typeof packageManagerIds)[number];

export type BlockInstallCommands = Record<PackageManagerId, string>;

const shadcnExecutors: BlockInstallCommands = {
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

export function getBlockRegistryUrl(block: InstallableItem) {
  return new URL(`/r/${block.registryName}.json`, siteConfig.url).toString();
}

export function getBlockInstallCommand(block: InstallableItem) {
  return getBlockInstallCommands(block).npm;
}

export function getBlockInstallCommands(
  block: InstallableItem,
): BlockInstallCommands {
  const registryUrl = `@navui/${block.registryName}`;

  return {
    npm: `${shadcnExecutors.npm} ${registryUrl}`,
    pnpm: `${shadcnExecutors.pnpm} ${registryUrl}`,
    yarn: `${shadcnExecutors.yarn} ${registryUrl}`,
    bun: `${shadcnExecutors.bun} ${registryUrl}`,
  };
}
