import type { ComponentType } from "react";

import AnimatedNumbers from "@/components/examples/animated-numbers";
import Tabs from "@/components/examples/tabs";
import TabsVariants from "@/components/examples/tabs-variants";
import Button from "@/components/examples/button";
import Dialog from "@/components/examples/dialog";
import ContributionGraph from "@/components/examples/contribution-graph";
import ExpandableCard from "@/components/examples/expandable-card";
import KeyboardShortcut from "@/components/examples/keyboard-shortcut";
import KeyboardShortcutWithSound from "@/components/examples/keyboard-shortcut-with-sound";
import MagneticButton from "@/components/examples/magnetic-button";
import PackageManagerCommand from "@/components/examples/package-manager-command";
import ProximityNav from "@/components/examples/proximity-nav";
import RailNav from "@/components/examples/rail-nav";
import RailNavCompact from "@/components/examples/rail-nav-compact";
import SegmentSpotlight from "@/components/examples/segment-spotlight";
import { componentCatalog } from "@/registry/catalog";
import type { ComponentCatalogEntry } from "@/registry/types";

type CatalogItem = (typeof componentCatalog)[number];
type PreviewSource = CatalogItem["preview"] | CatalogItem["examples"][number]["source"];

const previews = {
  "components/examples/animated-numbers.tsx": AnimatedNumbers,
  "components/examples/tabs.tsx": Tabs,
  "components/examples/tabs-variants.tsx": TabsVariants,
  "components/examples/button.tsx": Button,
  "components/examples/dialog.tsx": Dialog,
  "components/examples/contribution-graph.tsx": ContributionGraph,
  "components/examples/expandable-card.tsx": ExpandableCard,
  "components/examples/keyboard-shortcut.tsx": KeyboardShortcut,
  "components/examples/keyboard-shortcut-with-sound.tsx": KeyboardShortcutWithSound,
  "components/examples/magnetic-button.tsx": MagneticButton,
  "components/examples/package-manager-command.tsx": PackageManagerCommand,
  "components/examples/proximity-nav.tsx": ProximityNav,
  "components/examples/rail-nav.tsx": RailNav,
  "components/examples/rail-nav-compact.tsx": RailNavCompact,
  "components/examples/segment-spotlight.tsx": SegmentSpotlight,
} satisfies Record<PreviewSource, ComponentType>;

export const publishedComponents: readonly ComponentCatalogEntry[] = componentCatalog.filter(
  (item) => item.status === "published",
);

export function getComponentDefinition(slug: string) {
  return publishedComponents.find((item) => item.slug === slug);
}

export function getComponentPreview(slug: string) {
  for (const item of publishedComponents) {
    const example = item.examples.find((example) => `${item.slug}--${example.id}` === slug);
    const source = item.slug === slug ? item.preview : example?.source;
    if (source && source in previews) {
      return { item, example, Preview: previews[source as keyof typeof previews] };
    }
  }
}

export function getComponentPreviewSlugs(): string[] {
  return publishedComponents.flatMap((item) => [
    item.slug,
    ...item.examples.map((example) => `${item.slug}--${example.id}`),
  ]);
}
