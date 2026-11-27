"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/components/icons/github-icon";
import { Button } from "@/registry/components/button";
import { MobileNavigation } from "@/components/library/mobile-navigation";
import type { LibraryNavigationData } from "@/components/library/library-navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";

export function Navbar({
  componentNavigation,
  blockNavigation,
}: {
  componentNavigation: LibraryNavigationData;
  blockNavigation: LibraryNavigationData;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/preview/")) return null;
  const section = pathname.startsWith("/components")
    ? componentNavigation
    : pathname.startsWith("/blocks")
      ? blockNavigation
      : undefined;
  return (
    <header className="sticky top-0 z-40 h-16 w-full shrink-0 bg-background/95 backdrop-blur-sm relative">
      <span className="border-b border-border border-dashed mask-x-from-90% absolute bottom-0 inset-x-0"></span>
      <div className="flex h-full w-full items-center gap-6 px-4 sm:px-6 lg:px-6">
        <Link
          href="/"
          aria-label="NavUI home"
          className="shrink-0 rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Logo showWordmark />
        </Link>
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex gap-7 text-sm">
            {[
              { title: "Components", href: "/components" },
              { title: "Blocks", href: "/blocks" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                      ? "page"
                      : undefined
                  }
                  className="rounded-sm py-2 text-muted-foreground outline-none motion-safe:transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring aria-[current=page]:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <Button
            render={
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              />
            }
            variant="ghost"
            size="icon"
            aria-label="View NavUI on GitHub"
            className="rounded-full"
          >
            <GitHubIcon aria-hidden="true" />
          </Button>
          <ThemeToggle />
          <MobileNavigation navigation={section} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
