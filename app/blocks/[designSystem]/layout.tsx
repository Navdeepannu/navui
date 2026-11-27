import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LibraryLayout } from "@/components/library/library-layout";
import { getDesignSystem, isDesignSystemId } from "@/config/design-systems";

export default async function DesignSystemLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ designSystem: string }>;
}) {
  const { designSystem } = await params;
  if (!isDesignSystemId(designSystem) || !getDesignSystem(designSystem))
    notFound();
  return <LibraryLayout section="blocks">{children}</LibraryLayout>;
}
