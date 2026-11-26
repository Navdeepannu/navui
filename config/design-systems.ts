// Base identifiers remain stable for existing block URLs and registry names.
export const designSystemIds = ["base"] as const;
export type DesignSystemId = (typeof designSystemIds)[number];

export const designSystems = [{
  id: "base",
  name: "NavUI",
  description: "Polished, customizable React components and blocks on one neutral foundation.",
}] as const;

export function isDesignSystemId(value: string): value is DesignSystemId {
  return value === "base";
}

export function getDesignSystem(id: DesignSystemId) {
  return designSystems.find((system) => system.id === id);
}
