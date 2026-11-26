function addDuplicateError(errors, seen, label, value, owner) {
  const existingOwner = seen.get(value);

  if (existingOwner) {
    errors.push(
      `${owner}: duplicate ${label} "${value}" already belongs to ${existingOwner}.`,
    );
    return;
  }

  seen.set(value, owner);
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

export function validateBlockCatalog(
  blocks,
  { designSystemIds, categoryIds },
) {
  const errors = [];
  const knownDesignSystems = new Set(designSystemIds);
  const knownCategories = new Set(categoryIds);
  const ids = new Map();
  const registryNames = new Map();
  const routes = new Map();
  const installTargets = new Map();

  for (const block of blocks) {
    const owner = block.id || block.registryName || block.slug || "Unknown block";
    const isComponent = block.registry.type === "registry:ui";
    const expectedId = isComponent ? `components/${block.slug}` : `${block.designSystem}/${block.slug}`;
    const expectedRegistryName = isComponent ? block.slug : `${block.designSystem}-${block.slug}`;
    const expectedSource = isComponent ? `registry/components/${block.slug}.tsx` :
      `registry/blocks/${block.designSystem}/${block.category}/` +
      `${block.slug}/${block.slug}.tsx`;
    const expectedTarget = isComponent ? `components/navui/${block.slug}.tsx` :
      `components/blocks/${block.designSystem}/${block.category}/` +
      `${block.slug}.tsx`;
    const routeKey = expectedId;
    const primaryFile = block.registry.files[0];

    addDuplicateError(errors, ids, "catalog id", block.id, owner);
    addDuplicateError(
      errors,
      registryNames,
      "registry name",
      block.registryName,
      owner,
    );
    addDuplicateError(errors, routes, "preview route", routeKey, owner);

    if (!isComponent && !knownDesignSystems.has(block.designSystem)) {
      errors.push(`${owner}: unknown design system "${block.designSystem}".`);
    }

    if (!isComponent && !knownCategories.has(block.category)) {
      errors.push(`${owner}: unknown block category "${block.category}".`);
    }

    if (block.id !== expectedId) {
      errors.push(`${owner}: id must be "${expectedId}".`);
    }

    if (block.registryName !== expectedRegistryName) {
      errors.push(
        `${owner}: registryName must be "${expectedRegistryName}" to avoid cross-kit collisions.`,
      );
    }

    if (!isComponent && block.registry.type !== "registry:block") {
      errors.push(`${owner}: registry.type must be "registry:block".`);
    }

    if (!primaryFile) {
      errors.push(`${owner}: registry.files must declare a primary component.`);
      continue;
    }

    if (primaryFile.source !== expectedSource) {
      errors.push(`${owner}: primary source must be "${expectedSource}".`);
    }

    if (primaryFile.target !== expectedTarget) {
      errors.push(`${owner}: primary target must be "${expectedTarget}".`);
    }

    if (primaryFile.type !== (isComponent ? "registry:ui" : "registry:component")) {
      errors.push(`${owner}: primary file type must be "${isComponent ? "registry:ui" : "registry:component"}".`);
    }

    const duplicateSources = findDuplicates(
      block.registry.files.map((file) => file.source),
    );
    const duplicateTargets = findDuplicates(
      block.registry.files.map((file) => file.target),
    );

    for (const source of duplicateSources) {
      errors.push(`${owner}: source "${source}" is declared more than once.`);
    }

    for (const target of duplicateTargets) {
      errors.push(`${owner}: target "${target}" is declared more than once.`);
    }

    for (const file of block.registry.files) {
      const previous = installTargets.get(file.target);
      if (previous && file.shared && previous.shared && previous.source === file.source) continue;
      if (!previous) {
        installTargets.set(file.target, { source: file.source, shared: file.shared, owner });
        continue;
      }
      errors.push(`${owner}: duplicate install target "${file.target}" already belongs to ${previous.owner}. Shared files must have the same source and target.`);
    }

    for (const dependency of findDuplicates(block.registry.dependencies)) {
      errors.push(`${owner}: dependency "${dependency}" is declared more than once.`);
    }

    for (const dependency of findDuplicates(
      block.registry.registryDependencies,
    )) {
      errors.push(
        `${owner}: registry dependency "${dependency}" is declared more than once.`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid block catalog:\n- ${errors.join("\n- ")}`);
  }
}
