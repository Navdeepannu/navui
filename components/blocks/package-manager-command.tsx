"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { CopyButton } from "@/components/blocks/copy-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  packageManagerIds,
  type BlockInstallCommands,
  type PackageManagerId,
} from "@/registry/install";

type PackageManagerCommandProps = {
  commands: BlockInstallCommands;
};

type PackageManagerMeta = {
  id: PackageManagerId;
  name: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
};

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <path
        fill="#CB3837"
        d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
      />
    </svg>
  );
}

function PnpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#F9AD00"
        d="M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5zM16 9.5h5v5h-5z"
      />
      <path
        fill="#4E4E4E"
        d="M9.5 9.5h5v5h-5zM3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z"
      />
    </svg>
  );
}

function YarnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#2C8EBB" />
      <path
        fill="white"
        d="M14.8 7.2c-.4-.2-.9.6-1.1 1.1a2.7 2.7 0 0 0-2.4.9c-.3.3-.6.3-.8.4-.3.1-.6.8-.7 1.2-.3.9.5 1.8.5 1.8s-1.2.8-1.6 1.9a5 5 0 0 0-.3 2.2s-.8.7-.9 1.5c-.1.7.2 1.4.4 1.6.2.3.6.2.6.2s-.5.6 0 .9c.5.2 1.3.4 1.7 0 .3-.3.4-1 .5-1.3 0-.1.1.1.2.2.2.2.4.3.4.3s-.7.3-.4 1c.1.3.5.4 1.1.4.2 0 2.7-.1 3.4-.3.2-.1.4-.2.5-.3 1.1-.3 2.1-.8 3-1.4.9-.6 1.3-.8 2-1 .6-.1.6-1.1-.2-1.1s-1.6.4-2.2.8c-1.2.7-1.8.7-1.8.7s.4-1.3-.1-2.7c-.5-1.5-1.4-1.9-1.3-2 .3-.5 1-1.3 1.3-2.8.2-.9.1-2.4-.3-3.2-.1-.1-.7.2-.7.2s-.6-1.3-.8-1.4z"
      />
    </svg>
  );
}

function BunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FBF0DF" />
      <path
        fill="black"
        d="M12 3.2c1.1 0 2 .5 3.2 1.3.6.4 1.3.9 2.4 1.5 2.5 1.4 4 3.7 4 6.2 0 4.5-4.3 8.1-9.6 8.1s-9.6-3.6-9.6-8.1c0-2.5 1.5-4.8 4-6.2 1.1-.6 1.8-1.1 2.4-1.5C10 3.7 10.9 3.2 12 3.2Zm0 1.2c-.8 0-1.5.4-2.6 1.1-.6.4-1.4.9-2.5 1.5-2.1 1.2-3.3 3.1-3.3 5.2 0 3.8 3.8 6.9 8.4 6.9s8.4-3.1 8.4-6.9c0-2.1-1.2-4-3.3-5.2-1.1-.6-1.9-1.1-2.5-1.5-1.1-.7-1.8-1.1-2.6-1.1Z"
      />
      <circle cx="8.8" cy="11.7" r="1.1" fill="black" />
      <circle cx="15.2" cy="11.7" r="1.1" fill="black" />
      <path
        fill="black"
        d="M9.6 14.2h4.8c-.3 1.2-1.3 2-2.4 2s-2.1-.8-2.4-2Z"
      />
      <path
        fill="#FF6164"
        d="M10.8 15.1c.4.4.8.6 1.2.6s.8-.2 1.2-.6c-.4-.3-.8-.4-1.2-.4s-.8.1-1.2.4Z"
      />
    </svg>
  );
}

const packageManagers: readonly PackageManagerMeta[] = [
  { id: "npm", name: "npm", Icon: NpmIcon },
  { id: "pnpm", name: "pnpm", Icon: PnpmIcon },
  { id: "yarn", name: "yarn", Icon: YarnIcon },
  { id: "bun", name: "bun", Icon: BunIcon },
];

function isPackageManagerId(value: string): value is PackageManagerId {
  return packageManagerIds.some((id) => id === value);
}

export function PackageManagerCommand({
  commands,
}: PackageManagerCommandProps) {
  const [packageManager, setPackageManager] =
    React.useState<PackageManagerId>("npm");
  const command = commands[packageManager];
  const selectedPackageManager =
    packageManagers.find((item) => item.id === packageManager) ??
    packageManagers[0];
  const SelectedIcon = selectedPackageManager.Icon;

  return (
    <div className="flex h-9 min-w-0 flex-1 items-stretch overflow-hidden rounded-lg border bg-background shadow-xs sm:w-[min(25rem,48vw)] sm:flex-none">
      <span className="flex min-w-0 flex-1 items-center gap-2 px-2.5">
        <SelectedIcon className="size-4 shrink-0" />

        <code
          className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground max-sm:hidden"
          title={command}
        >
          {command}
        </code>
      </span>

      <CopyButton
        value={command}
        label={`Copy ${packageManager} install command`}
        copiedLabel={`${packageManager} command copied`}
        showLabel={false}
        className="h-auto rounded-none border-l"
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              className="h-auto shrink-0 gap-1 rounded-none border-l px-2.5 shadow-none"
              aria-label={`Choose package manager. ${packageManager} selected`}
              title={`Choose package manager: ${selectedPackageManager.name}`}
            />
          }
        >
          <SelectedIcon />
          <ChevronDown aria-hidden="true" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={6} className="min-w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="sr-only">
              Select package manager
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={packageManager}
              onValueChange={(value) => {
                if (isPackageManagerId(value)) setPackageManager(value);
              }}
            >
              {packageManagers.map(({ id, name, Icon }) => (
                <DropdownMenuRadioItem
                  key={id}
                  value={id}
                  className="cursor-pointer"
                >
                  <Icon />
                  <span className="flex-1">{name}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
