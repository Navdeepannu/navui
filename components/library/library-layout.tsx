import type { ReactNode } from "react";
import { LibrarySidebar } from "./library-sidebar";
import { getLibraryNavigation } from "./library-navigation-data";
export { getLibraryNavigation } from "./library-navigation-data";

export function LibraryLayout({
  section,
  children,
}: {
  section: "components" | "blocks";
  children: ReactNode;
}) {
  return (
    <div className="library-shell grid w-full min-w-0 flex-1 md:grid-cols-[14rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
      <LibrarySidebar navigation={getLibraryNavigation(section)} />
      <div className="@container min-w-0 px-5 py-12 md:px-4 lg:px-6 xl:px-6">
        {children}
      </div>
    </div>
  );
}
