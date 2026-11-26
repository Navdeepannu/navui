import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { BlocksSidebar } from "@/components/blocks/blocks-sidebar";
import { BlocksSidebarReopen } from "@/components/blocks/blocks-sidebar-reopen";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";

import { getDesignSystem, isDesignSystemId } from "@/config/design-systems";
import { getBlockCategorySummaries } from "@/registry/blocks";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/components/icons/github-icon";
import { siteConfig } from "@/config/site";
import { cn } from "cn";
import { BlocksSearchButton } from "@/components/blocks/blocks-search-button";
import { BlocksStyleSwitcher } from "@/components/blocks/blocks-style-switcher";

type DesignSystemLayoutProps = {
  children: ReactNode;
  params: Promise<{
    designSystem: string;
  }>;
};

export default async function DesignSystemLayout({
  children,
  params,
}: DesignSystemLayoutProps) {
  const { designSystem: designSystemParam } = await params;

  if (!isDesignSystemId(designSystemParam)) {
    notFound();
  }

  const system = getDesignSystem(designSystemParam);

  if (!system) {
    notFound();
  }

  const categories = getBlockCategorySummaries(system.id).map(
    ({ id, name, count }) => ({
      id,
      name,
      count,
    }),
  );

  return (
    <TooltipProvider>
      <div className="h-svh overflow-hidden bg-sidebar">
        <SidebarProvider
          className="relative mx-auto h-svh min-h-0 max-w-[96rem] overflow-hidden p-2 md:p-0"
          style={
            {
              "--sidebar-width": "13.25rem",
            } as CSSProperties
          }
        >
          <BlocksSidebar activeSystem={system.id} categories={categories} />

          <SidebarInset
            className={cn(
              "relative flex h-svh min-h-0 min-w-0 flex-col overflow-hidden",
              "rounded-2xl bg-background",
              "md:h-[calc(100svh-1rem)]",
              "md:shadow-xl",
              "border",
            )}
          >
            {/* -------------------------------------------------
                TOP APP BAR
            -------------------------------------------------- */}

            {/* -------------------------------------------------
                SCROLLING CONTENT
            -------------------------------------------------- */}
            <div className="min-h-0 flex-1">
              <div className="no-scrollbar h-full overflow-y-auto overscroll-contain">
                <header
                  className={cn(
                    "relative z-30 shrink-0",
                    "flex h-12 items-center justify-between",
                    "px-2 sm:px-3",
                  )}
                >
                  {/* LEFT CONTROLS */}
                  <div className="flex min-w-0 items-center gap-1">
                    {/* Only visible when sidebar is collapsed */}
                    <BlocksSidebarReopen />

                    {/* Search */}
                    <BlocksSearchButton />

                    {/* Style switcher */}
                    <BlocksStyleSwitcher activeSystem={system.id} />
                  </div>

                  {/* RIGHT CONTROLS */}
                  <nav
                    aria-label="Blocks utility navigation"
                    className="ml-auto flex shrink-0 items-center gap-1"
                  >
                    <ThemeToggle />

                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View NavUI on GitHub"
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon-sm",
                        }),
                        "rounded-full",
                      )}
                    >
                      <GitHubIcon className="size-4" />
                      <span className="sr-only">View NavUI on GitHub</span>
                    </Link>
                  </nav>
                </header>
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
