"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/registry/components/dialog";
import { Button } from "@/registry/components/button";
import {
  LibraryNavigation,
  type LibraryNavigationData,
} from "./library-navigation";
import { ScrollNavigation } from "./scroll-navigation";

export function MobileNavigation({
  navigation,
  pathname,
}: {
  navigation?: LibraryNavigationData;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
        aria-label="Open navigation"
      >
        <MenuIcon aria-hidden="true" />
      </DialogTrigger>
      <DialogBackdrop />
      <DialogContent
        className="inset-y-0 inset-s-0 inset-e-auto m-0 flex h-dvh max-h-dvh w-[min(20rem,calc(100%-2rem))] flex-col gap-4 rounded-none border-0 border-e p-0"
        initialFocus="content"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
          <DialogTitle>Navigation</DialogTitle>
          <DialogClose
            render={<Button variant="ghost" size="icon" />}
            aria-label="Close navigation"
          >
            <XIcon aria-hidden="true" />
          </DialogClose>
        </div>
        <nav
          aria-label="Main navigation"
          className="flex shrink-0 gap-4 px-5 text-sm font-medium"
        >
          {[
            { href: "/components", title: "Components" },
            { href: "/blocks", title: "Blocks" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-sm py-2 outline-none hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {navigation && (
          <>
            {!navigation.groups && <p className="px-5 text-xs font-medium text-muted-foreground">
              {navigation.title}
            </p>}
            <ScrollNavigation className="flex-1 pt-0">
              <LibraryNavigation
                navigation={navigation}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </ScrollNavigation>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
