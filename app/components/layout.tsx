import type { ReactNode } from "react";
import { LibraryLayout } from "@/components/library/library-layout";
export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <LibraryLayout section="components">{children}</LibraryLayout>;
}
