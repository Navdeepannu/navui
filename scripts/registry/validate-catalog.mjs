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
    const expectedId = `${block.designSystem}/${block.slug}`;
    const expectedRegistryName = `${block.designSystem}-${block.slug}`;
    const expectedSource =
      `registry/blocks/${block.designSystem}/${block.category}/` +
      `${block.slug}/${block.slug}.tsx`;
    const expectedTarget =
      `components/blocks/${block.designSystem}/${block.category}/` +
      `${block.slug}.tsx`;
    const routeKey = `${block.designSystem}/${block.slug}`;
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

    if (!knownDesignSystems.has(block.designSystem)) {
      errors.push(`${owner}: unknown design system "${block.designSystem}".`);
    }

    if (!knownCategories.has(block.category)) {
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

    if (block.registry.type !== "registry:block") {
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

    if (primaryFile.type !== "registry:component") {
      errors.push(`${owner}: primary file type must be "registry:component".`);
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
      addDuplicateError(
        errors,
        installTargets,
        "install target",
        file.target,
        owner,
      );
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
