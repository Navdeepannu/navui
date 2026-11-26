// Fresh, disposable consumer; never copies NavUI node_modules or implementation files.
import { mkdtemp, readFile, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
const root = process.cwd();
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 17))
  throw new Error(
    "Use NavUI's verified Node 22.17+ runtime for both baseline and installed builds.",
  );
const registry =
  process.env.NAVUI_REGISTRY_URL ?? "http://localhost:3000/r/{name}.json";
const dir = await mkdtemp(path.join(tmpdir(), "navui-forms-consumer-"));
const env = {
  ...process.env,
  PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH}`,
  NEXT_TELEMETRY_DISABLED: "1",
};
function run(command, args, cwd = dir) {
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(
      `${command} ${args.join(" ")} exited ${result.status}. Consumer retained at ${dir}`,
    );
}
const json = (filename, value) =>
  writeFile(path.join(dir, filename), JSON.stringify(value, null, 2) + "\n");
await mkdir(path.join(dir, "app"));
await json("package.json", {
  name: "navui-forms-consumer",
  version: "0.0.0",
  private: true,
  scripts: { build: "next build", typecheck: "tsc --noEmit" },
  dependencies: {
    next: "16.3.3",
    react: "19.2.8",
    "react-dom": "19.2.8",
    tailwindcss: "4.3.5",
  },
  devDependencies: {
    "@tailwindcss/postcss": "4.3.5",
    typescript: "5.9.3",
    "@types/node": "^22",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19",
  },
});
await writeFile(path.join(dir, ".nvmrc"), "22.17.0\n");
const config = JSON.parse(
  await readFile(path.join(root, "components.json"), "utf8"),
);
config.registries = { "@navui": registry };
await json("components.json", config);
await json("tsconfig.json", {
  compilerOptions: {
    target: "ES2017",
    lib: ["dom", "dom.iterable", "esnext"],
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    jsx: "react-jsx",
    resolveJsonModule: true,
    isolatedModules: true,
    plugins: [{ name: "next" }],
    paths: { "@/*": ["./*"] },
  },
  include: ["**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"],
});
await writeFile(
  path.join(dir, "postcss.config.mjs"),
  'export default { plugins: { "@tailwindcss/postcss": {} } };',
);
// Reuse neutral consumer tokens, without NavUI's CSS/package imports or site shell.
const css = (await readFile(path.join(root, "app/globals.css"), "utf8"))
  .split("@layer base")[0]
  .replace('@import "tw-animate-css";', "")
  .replace('@import "shadcn/tailwind.css";', "");
await writeFile(
  path.join(dir, "app/globals.css"),
  css +
    "\n:root {--design-radius-sm:4px;--design-radius-md:6px;--design-radius-lg:8px;--design-radius-xl:12px;} body {margin:0;background:var(--background);color:var(--foreground);font-family:system-ui,sans-serif}",
);
await writeFile(
  path.join(dir, "app/layout.tsx"),
  'import "./globals.css"; export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }',
);
await writeFile(
  path.join(dir, "app/page.tsx"),
  "export default function Page(){return <main>Independent baseline</main>}",
);
console.log(
  `Consumer: ${dir}\nRuntime: ${process.execPath} (${process.version})\nPhase: baseline without NavUI`,
);
run("pnpm", ["install", "--ignore-scripts"]);
run(process.execPath, ["node_modules/next/dist/bin/next", "build"]);
const cli = path.join(root, "node_modules/shadcn/dist/index.js");
console.log("Phase: install actual registry payloads");
run(process.execPath, [
  cli,
  "add",
  "@navui/field",
  "@navui/input",
  "@navui/select",
  "@navui/checkbox",
  "@navui/switch",
  "@navui/button",
  "@navui/package-manager-command",
  "--cwd",
  dir,
  "--yes",
]);
const page = (
  await readFile(
    path.join(root, "app/playground/project-settings/page.tsx"),
    "utf8",
  )
).replaceAll("@/registry/components/", "@/components/navui/");
await writeFile(path.join(dir, "app/page.tsx"), page);
// Render and bundle an existing composition to verify its canonical Select dependency.
await mkdir(path.join(dir, "app/install"));
await writeFile(
  path.join(dir, "app/install/page.tsx"),
  '"use client"; import {PackageManagerCommand} from "@/components/navui/package-manager-command"; export default function Page(){return <PackageManagerCommand commands={{npm:"npx shadcn@latest add @navui/input"}}/>}',
);
console.log("Phase: installed components under the SAME runtime");
run(process.execPath, ["node_modules/typescript/bin/tsc", "--noEmit"]);
run(process.execPath, ["node_modules/next/dist/bin/next", "build"]);
// A production HTTP smoke check, with a bounded startup wait and guaranteed cleanup.
const port = process.env.NAVUI_CONSUMER_PORT ?? "3100";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    port,
  ],
  { cwd: dir, env, stdio: ["ignore", "pipe", "pipe"] },
);
let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk;
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});
try {
  let html;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`Production server exited: ${serverOutput}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}`);
      if (response.ok) {
        html = await response.text();
        break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!html)
    throw new Error(`Production server did not become ready: ${serverOutput}`);
  for (const slot of [
    "field",
    "input",
    "select-trigger",
    "checkbox",
    "switch",
  ]) {
    if (!html.includes(`data-slot="${slot}"`))
      throw new Error(`Production response missing ${slot}`);
  }
  const composition = await fetch(`http://127.0.0.1:${port}/install`);
  if (
    !composition.ok ||
    !(await composition.text()).includes("Package manager")
  )
    throw new Error("Installed composition failed production rendering");
  console.log(
    "PASS: production HTTP rendering includes all five controls and the existing composition.",
  );
} finally {
  if (server.exitCode === null) {
    const stopped = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await stopped;
  }
}
await writeFile("/tmp/navui-forms-consumer-path", dir);
console.log(
  `PASS: baseline and installed TypeScript/build. Start production rendering with:\ncd ${dir}\n${process.execPath} node_modules/next/dist/bin/next start --port 3100\nRemove this disposable directory after review.`,
);
