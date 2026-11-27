"use client";

import { ProximityNav } from "@/registry/components/proximity-nav";

export type LibraryNavigationItem = {
  title: string;
  href: string;
  count?: number;
};
export type LibraryNavigationData = {
  title: string;
  items: LibraryNavigationItem[];
  groups?: { title: string; items: LibraryNavigationItem[] }[];
  overview?: LibraryNavigationItem;
};

export function LibraryNavigation({
  navigation,
  pathname,
  onNavigate,
}: {
  navigation: LibraryNavigationData;
  pathname: string;
  onNavigate?: () => void;
}) {
  const renderNav = (title: string, items: LibraryNavigationItem[]) => (
    <ProximityNav
      label={`${title} navigation`}
      items={items.map((item) => ({
        href: item.href,
        title:
          item.count === undefined
            ? item.title
            : `${item.title} (${item.count})`,
      }))}
      activeHref={pathname}
      onActiveHrefChange={onNavigate}
      className="library-proximity"
    />
  );
  if (!navigation.groups) return renderNav(navigation.title, navigation.items);
  return (
    <div>
      {navigation.groups.map((group) => (
        <section key={group.title} aria-label={group.title} className="mb-6">
          <h2 className="pb-1 text-xs font-medium text-muted-foreground">
            {group.title}
          </h2>
          {renderNav(group.title, group.items)}
        </section>
      ))}
    </div>
  );
}
