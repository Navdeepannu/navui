import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  designSystems,
  getDesignSystem,
  type DesignSystemId,
} from "@/config/design-systems";

import { DesignSystemRoot } from "@/components/design-system-root";

type BlocksStyleSwitcherProps = {
  activeSystem: DesignSystemId;
};

export function BlocksStyleSwitcher({
  activeSystem,
}: BlocksStyleSwitcherProps) {
  const activeDefinition = getDesignSystem(activeSystem);

  if (!activeDefinition) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 rounded-2xl px-3 font-normal"
          />
        }
      >
        <DesignSystemRoot
          designSystem={activeDefinition.id}
          className="inline-flex min-h-0 shrink-0 bg-transparent"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
        </DesignSystemRoot>

        <span className="text-sm">{activeDefinition.name}</span>

        <ChevronDown
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={6} className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Styles</DropdownMenuLabel>

          {designSystems.map((system) => {
            const isActive = system.id === activeSystem;

            return (
              <DropdownMenuItem
                key={system.id}
                render={
                  <Link
                    href={`/blocks/${system.id}`}
                    aria-current={isActive ? "page" : undefined}
                  />
                }
              >
                <DesignSystemRoot
                  designSystem={system.id}
                  className="inline-flex min-h-0 shrink-0 bg-transparent"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-primary"
                  />
                </DesignSystemRoot>

                <span>{system.name}</span>

                <DropdownMenuShortcut>
                  {isActive ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : (
                    system.access
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
