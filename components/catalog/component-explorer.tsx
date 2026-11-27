"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, FieldLabel } from "@/registry/components/field";
import { Input } from "@/registry/components/input";

type ComponentSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: readonly string[];
};

export function ComponentExplorer({
  items,
}: {
  items: readonly ComponentSummary[];
}) {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const matches = items.filter((item) =>
    [item.title, item.description, item.category, ...item.tags]
      .join(" ")
      .toLowerCase()
      .includes(search),
  );

  return (
    <div className="flex flex-col gap-8">
      <Field className="max-w-md">
        <FieldLabel>Search components</FieldLabel>
        <Input
          type="search"
          value={query}
          onValueChange={setQuery}
          placeholder="Search by name, use, or interaction…"
        />
      </Field>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {matches.length} {matches.length === 1 ? "component" : "components"}
      </p>
      {matches.length ? (
        <ul className="grid gap-x-8 gap-y-2 @xl:grid-cols-2">
          {matches.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/components/${item.slug}`}
                className="group flex h-full flex-col gap-2 rounded-lg border border-border px-5 py-5 outline-none hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <h2 className="text-base font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-8 text-sm text-muted-foreground">
          No matching components. Try a shorter name or a different interaction.
        </p>
      )}
    </div>
  );
}
