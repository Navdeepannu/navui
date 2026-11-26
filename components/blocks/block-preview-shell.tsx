"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const subscribeNoop = () => () => {};

function getStandaloneSnapshot() {
  try {
    return window.self === window.top;
  } catch {
    return false;
  }
}

function useIsStandalone() {
  return useSyncExternalStore(subscribeNoop, getStandaloneSnapshot, () => false);
}

type BlockPreviewShellProps = {
  backPath: string;
  children: ReactNode;
  title: string;
};

export function BlockPreviewShell({
  backPath,
  children,
  title,
}: BlockPreviewShellProps) {
  const isStandalone = useIsStandalone();

  return (
    <div className={isStandalone ? "min-h-dvh" : undefined}>
      {children}

      {isStandalone ? (
        <div className="fixed inset-x-4 bottom-6 z-30 mx-auto grid h-12 w-[calc(100%-2rem)] max-w-lg grid-cols-[1fr_auto_1fr] items-center rounded-full border bg-background/90 px-2 shadow-lg backdrop-blur-md">
          <Button
            render={<Link href={backPath} />}
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="justify-self-start rounded-full"
          >
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Back
          </Button>
          <span className="max-w-[45vw] truncate px-2 text-sm font-medium">
            {title}
          </span>
          <div className="justify-self-end">
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
