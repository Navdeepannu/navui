import { BlocksSidebarReopen } from "@/components/blocks/blocks-sidebar-reopen";
import { GitHubIcon } from "@/components/icons/github-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function BlocksToolbar() {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 bg-background px-3 md:h-8 md:bg-transparent">
      <BlocksSidebarReopen />

      <nav
        aria-label="Blocks utility navigation"
        className="ml-auto flex h-full items-center gap-1"
      >
        <ThemeToggle />
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Button variant="ghost" size="icon-sm" className="rounded-full">
            <GitHubIcon />
          </Button>
        </Link>
      </nav>
    </header>
  );
}
