"use client";
import Link from "next/link";
import { Button } from "@/registry/components/button";
export default function ButtonExample() {
  return (
    <section
      aria-label="Button examples"
      className="flex max-w-lg flex-wrap items-center justify-center gap-3 p-6"
    >
      <Button>Create project</Button>
      <Button variant="outline">View details</Button>
      <Button variant="ghost">Cancel</Button>
      <Button disabled>Unavailable</Button>
      <Button
        variant="secondary"
        onClick={() => new Promise((resolve) => setTimeout(resolve, 600))}
        pendingAnnouncement="Running local example"
      >
        Try pending state
      </Button>
      <Button render={<Link href="/components" />} variant="outline">
        Browse components
      </Button>
    </section>
  );
}
