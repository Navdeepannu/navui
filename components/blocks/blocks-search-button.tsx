"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function BlocksSearchButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 gap-2 rounded-md px-2 text-muted-foreground hover:text-foreground"
      aria-label="Search blocks"
      onClick={() => {
        // Open your command/search dialog here.
      }}
    >
      <Search aria-hidden="true" className="size-3.5" />

      <KbdGroup className="hidden sm:flex">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  );
}
