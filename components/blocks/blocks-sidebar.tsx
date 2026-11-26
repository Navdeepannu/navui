"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "cn";

import { Logo } from "@/components/site/logo";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import type { DesignSystemId } from "@/config/design-systems";
import type { BlockCategoryId } from "@/registry/categories";

type BlockCategoryNavigationItem = {
  id: BlockCategoryId;
  name: string;
  count: number;
};

type BlocksSidebarProps = {
  activeSystem: DesignSystemId;
  categories: BlockCategoryNavigationItem[];
};

const mainNavigation = [
  { name: "Blocks", href: "/blocks" },
  { name: "Components", href: "/components" },
  { name: "Illustrations", href: "/illustrations" },
  { name: "Docs", href: "/docs" },
] as const;

const categoryItemStyles = cn(
  "min-h-11 w-full rounded-md px-2 py-1.5",
  "md:min-h-9",

  // Typography
  "text-[15px] leading-5 font-normal",
  "tracking-[-0.01em]",
  "md:text-[13px]",

  // Default appearance
  "text-sidebar-foreground/75",

  // Interaction
  "transition-colors duration-150",
  "hover:bg-sidebar-accent/70",
  "hover:text-sidebar-foreground",

  // Accessibility
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-sidebar-ring",

  // Active state
  "data-[active=true]:bg-sidebar-accent",
  "data-[active=true]:font-medium",
  "data-[active=true]:text-sidebar-accent-foreground",
);

export function BlocksSidebar({
  activeSystem,
  categories,
}: BlocksSidebarProps) {
  const pathname = usePathname();

  const { isMobile, setOpenMobile, state } = useSidebar();

  function closeMobile() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  function isMainNavigationActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isAllCategoriesActive =
    pathname === "/blocks" || pathname === `/blocks/${activeSystem}`;

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="inset"
      className="border-none md:absolute"
    >
      <SidebarHeader className={cn("shrink-0", "px-4 pb-2")}>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="NavUI home"
            onClick={closeMobile}
            className={cn(
              "inline-flex items-center",
              "rounded-md outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-sidebar-ring",
            )}
          >
            <Logo
              className={cn(
                "[&_svg]:size-6",
                "[&_span]:text-base",
                "[&_span]:font-semibold",
                "[&_span]:tracking-tight",
              )}
            />
          </Link>

          {/* Mobile close button */}
          {isMobile && (
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpenMobile(false)}
              className={cn(
                "inline-flex size-11",
                "items-center justify-center",
                "rounded-md",
                "text-sidebar-foreground/70",
                "transition-colors",
                "hover:bg-sidebar-accent",
                "hover:text-sidebar-foreground",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-sidebar-ring",
              )}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          )}

          {/* Desktop collapse control */}
          {!isMobile && state === "expanded" && (
            <SidebarTrigger
              className={cn(
                "size-8",
                "text-sidebar-foreground/65",
                "hover:bg-sidebar-accent",
                "hover:text-sidebar-foreground",
              )}
            />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent
        className={cn("min-h-0", "gap-0 overflow-hidden", "pb-3")}
      >
        <nav aria-label="Primary navigation" className="shrink-0 px-2 pt-2">
          <ul>
            {mainNavigation.map((item) => {
              const isActive = isMainNavigationActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center",
                      "rounded-md px-2",
                      "md:min-h-9",

                      // Typography
                      "text-base leading-5",
                      "tracking-[-0.015em]",
                      "md:text-sm",

                      // Interactions
                      "transition-colors duration-150",
                      "hover:bg-sidebar-accent/60",

                      // Accessibility
                      "outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-sidebar-ring",

                      isActive
                        ? cn("font-medium", "text-sidebar-foreground")
                        : cn(
                            "font-normal",
                            "text-sidebar-foreground/75",
                            "hover:text-sidebar-foreground",
                          ),
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---------------------------------------
            CATEGORY SECTION
        ---------------------------------------- */}

        <SidebarGroup
          className={cn("flex min-h-0 flex-1 flex-col", "p-0 pt-5")}
        >
          {/* Fixed section heading */}

          <SidebarGroupLabel
            className={cn(
              "mb-2 h-auto shrink-0",
              "px-4 py-0",
              "text-[11px] leading-5",
              "font-medium uppercase",
              "tracking-widest",
              "text-sidebar-foreground/65",
            )}
          >
            Categories
          </SidebarGroupLabel>

          {/* Only the category list scrolls */}

          <SidebarGroupContent
            className={cn(
              "min-h-0 flex-1",
              "overflow-y-auto",
              "overscroll-contain",
              "px-2 pb-4",
              "scrollbar-none",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <nav aria-label="Block categories">
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isAllCategoriesActive}
                    tooltip="All categories"
                    render={
                      <Link
                        href={`/blocks/${activeSystem}`}
                        aria-current={
                          isAllCategoriesActive ? "page" : undefined
                        }
                      />
                    }
                    onClick={closeMobile}
                    className={categoryItemStyles}
                  >
                    <span className="min-w-0 flex-1 truncate">
                      All categories
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {categories.map((category) => {
                  const href = `/blocks/${activeSystem}/${category.id}`;

                  const isActive = pathname === href;

                  return (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={category.name}
                        render={
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                          />
                        }
                        onClick={closeMobile}
                        className={categoryItemStyles}
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {category.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
