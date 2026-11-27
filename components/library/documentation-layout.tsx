import type { ReactNode } from "react";
import { OnThisPage } from "./on-the-page";
export function DocumentationLayout({
  children,
  contentId,
}: {
  children: ReactNode;
  contentId: string;
}) {
  return (
    <div className="documentation-layout grid min-w-0 items-start gap-8 md:gap-4 lg:gap-8 xl:gap-10">
      <main
        id={contentId}
        data-documentation-content=""
        className="flex min-w-0 flex-col gap-10"
      >
        {children}
      </main>
      <OnThisPage key={contentId} contentId={contentId} />
    </div>
  );
}
