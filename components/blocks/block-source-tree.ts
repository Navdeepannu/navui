export type BlockSourceTreeFile = {
  type: "file";
  name: string;
  path: string;
};

export type BlockSourceTreeDirectory = {
  type: "directory";
  name: string;
  path: string;
  children: BlockSourceTreeNode[];
};

export type BlockSourceTreeNode =
  | BlockSourceTreeDirectory
  | BlockSourceTreeFile;

function sortTree(nodes: BlockSourceTreeNode[]): BlockSourceTreeNode[] {
  return [...nodes]
    .sort((first, second) => {
      if (first.type !== second.type) {
        return first.type === "directory" ? -1 : 1;
      }

      return first.name.localeCompare(second.name);
    })
    .map((node) =>
      node.type === "directory"
        ? { ...node, children: sortTree(node.children) }
        : node,
    );
}

export function buildBlockSourceTree(
  paths: readonly string[],
): BlockSourceTreeNode[] {
  const root: BlockSourceTreeNode[] = [];

  for (const filePath of new Set(paths)) {
    const segments = filePath.split("/").filter(Boolean);

    if (segments.length === 0) continue;

    let siblings = root;
    const ancestors: string[] = [];

    for (const segment of segments.slice(0, -1)) {
      ancestors.push(segment);

      const directoryPath = ancestors.join("/");
      let directory = siblings.find(
        (node): node is BlockSourceTreeDirectory =>
          node.type === "directory" && node.path === directoryPath,
      );

      if (!directory) {
        directory = {
          type: "directory",
          name: segment,
          path: directoryPath,
          children: [],
        };
        siblings.push(directory);
      }

      siblings = directory.children;
    }

    const name = segments.at(-1);

    if (name) {
      siblings.push({ type: "file", name, path: filePath });
    }
  }

  return sortTree(root);
}

export function getBlockSourceDirectoryPaths(
  nodes: readonly BlockSourceTreeNode[],
): string[] {
  return nodes.flatMap((node) =>
    node.type === "directory"
      ? [node.path, ...getBlockSourceDirectoryPaths(node.children)]
      : [],
  );
}
