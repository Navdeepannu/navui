export const designSystemIds = ["base", "iris", "pro"] as const;

export type DesignSystemId = (typeof designSystemIds)[number];

export type DesignSystemAccess = "free" | "pro";

export type DesignSystemDefinition = {
  id: DesignSystemId;
  name: string;
  access: DesignSystemAccess;
  description: string;
  sourceLabel: string;
};

export const designSystems: readonly DesignSystemDefinition[] = [
  {
    id: "base",
    name: "Base",
    access: "free",
    description:
      "A neutral, adaptable system built from the original NavUI block collection.",
    sourceLabel: "NavUI Base",
  },
  {
    id: "iris",
    name: "Iris",
    access: "free",
    description:
      "A focused SaaS system with cool neutrals and restrained indigo accents.",
    sourceLabel: "iris.css",
  },
  {
    id: "pro",
    name: "Pro",
    access: "pro",
    description:
      "A paid, refined system with warm neutrals and controlled olive accents.",
    sourceLabel: "Atelier.css",
  },
];

export function isDesignSystemId(value: string): value is DesignSystemId {
  return designSystemIds.some((id) => id === value);
}

export function getDesignSystem(id: DesignSystemId) {
  return designSystems.find((system) => system.id === id);
}

export function isFreeDesignSystem(id: DesignSystemId) {
  return getDesignSystem(id)?.access === "free";
}
