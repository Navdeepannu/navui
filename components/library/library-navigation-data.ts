import { blockCatalog, componentCatalog } from "@/registry/catalog";
import { blockCategories } from "@/registry/categories";
import { getComponentDocumentationPolicy } from "@/components/documentation/component-documentation-policy";
import type { LibraryNavigationData } from "./library-navigation";

export function getLibraryNavigation(
  section: "components" | "blocks",
): LibraryNavigationData {
  return section === "components"
    ? {
        title: "Components",
        items: [],
        groups: [
          { title: "Primitives", items: componentCatalog.filter((item) => item.status === "published" && getComponentDocumentationPolicy(item)?.ownership === "foundation").map((item) => ({ title: item.title, href: `/components/${item.slug}` })) },
          { title: "Custom", items: componentCatalog.filter((item) => item.status === "published" && getComponentDocumentationPolicy(item)?.ownership !== "foundation").map((item) => ({ title: item.title, href: `/components/${item.slug}` })) },
        ],
        overview: { title: "All components", href: "/components" },
      }
    : {
        title: "Categories",
        items: [
          { title: "All categories", href: "/blocks/base" },
          ...blockCategories.map((item) => ({
            title: item.name,
            href: `/blocks/base/${item.id}`,
            count: blockCatalog.filter(
              (block) =>
                block.status === "published" &&
                block.designSystem === "base" &&
                block.category === item.id,
            ).length,
          })),
        ],
      };
}
