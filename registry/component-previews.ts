import Field from "@/components/examples/field";
import FieldForm from "@/components/examples/field-form";
import FieldLabel from "@/components/examples/field-label";
import FieldRequired from "@/components/examples/field-required";
import FieldStates from "@/components/examples/field-states";
import Input from "@/components/examples/input";
import InputAction from "@/components/examples/input-action";
import InputSizes from "@/components/examples/input-sizes";
import InputStates from "@/components/examples/input-states";
import InputTypes from "@/components/examples/input-types";
import Select from "@/components/examples/select";
import SelectStates from "@/components/examples/select-states";
import Checkbox from "@/components/examples/checkbox";
import CheckboxStates from "@/components/examples/checkbox-states";
import Switch from "@/components/examples/switch";
import SwitchStates from "@/components/examples/switch-states";
import type { ComponentType } from "react";

import AnimatedNumbers from "@/components/examples/animated-numbers";
import Tabs from "@/components/examples/tabs";
import TabsVariants from "@/components/examples/tabs-variants";
import Button from "@/components/examples/button";
import ButtonAppearance from "@/components/examples/button-appearance";
import ButtonAsync from "@/components/examples/button-async";
import ButtonDisabled from "@/components/examples/button-disabled";
import ButtonForm from "@/components/examples/button-form";
import ButtonIcons from "@/components/examples/button-icons";
import ButtonLink from "@/components/examples/button-link";
import ButtonPending from "@/components/examples/button-pending";
import ButtonRounded from "@/components/examples/button-rounded";
import ButtonSizes from "@/components/examples/button-sizes";
import Dialog from "@/components/examples/dialog";
import ContributionGraph from "@/components/examples/contribution-graph";
import ExpandableCard from "@/components/examples/expandable-card";
import KeyboardShortcut from "@/components/examples/keyboard-shortcut";
import KeyboardShortcutWithSound from "@/components/examples/keyboard-shortcut-with-sound";
import MagneticButton from "@/components/examples/magnetic-button";
import ProximityNav from "@/components/examples/proximity-nav";
import RailNav from "@/components/examples/rail-nav";
import RailNavCompact from "@/components/examples/rail-nav-compact";
import { componentCatalog } from "@/registry/catalog";
import type { ComponentCatalogEntry } from "@/registry/types";

type CatalogItem = (typeof componentCatalog)[number];
type PreviewSource = CatalogItem["preview"] | CatalogItem["examples"][number]["source"];

const previews = {
  "components/examples/field.tsx": Field,
  "components/examples/field-form.tsx": FieldForm,
  "components/examples/field-label.tsx": FieldLabel,
  "components/examples/field-required.tsx": FieldRequired,
  "components/examples/field-states.tsx": FieldStates,
  "components/examples/input.tsx": Input,
  "components/examples/input-action.tsx": InputAction,
  "components/examples/input-sizes.tsx": InputSizes,
  "components/examples/input-states.tsx": InputStates,
  "components/examples/input-types.tsx": InputTypes,
  "components/examples/select.tsx": Select,
  "components/examples/select-states.tsx": SelectStates,
  "components/examples/checkbox.tsx": Checkbox,
  "components/examples/checkbox-states.tsx": CheckboxStates,
  "components/examples/switch.tsx": Switch,
  "components/examples/switch-states.tsx": SwitchStates,

  "components/examples/animated-numbers.tsx": AnimatedNumbers,
  "components/examples/tabs.tsx": Tabs,
  "components/examples/tabs-variants.tsx": TabsVariants,
  "components/examples/button.tsx": Button,
  "components/examples/button-appearance.tsx": ButtonAppearance,
  "components/examples/button-async.tsx": ButtonAsync,
  "components/examples/button-disabled.tsx": ButtonDisabled,
  "components/examples/button-form.tsx": ButtonForm,
  "components/examples/button-icons.tsx": ButtonIcons,
  "components/examples/button-link.tsx": ButtonLink,
  "components/examples/button-pending.tsx": ButtonPending,
  "components/examples/button-rounded.tsx": ButtonRounded,
  "components/examples/button-sizes.tsx": ButtonSizes,
  "components/examples/dialog.tsx": Dialog,
  "components/examples/contribution-graph.tsx": ContributionGraph,
  "components/examples/expandable-card.tsx": ExpandableCard,
  "components/examples/keyboard-shortcut.tsx": KeyboardShortcut,
  "components/examples/keyboard-shortcut-with-sound.tsx": KeyboardShortcutWithSound,
  "components/examples/magnetic-button.tsx": MagneticButton,
  "components/examples/proximity-nav.tsx": ProximityNav,
  "components/examples/rail-nav.tsx": RailNav,
  "components/examples/rail-nav-compact.tsx": RailNavCompact,
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
