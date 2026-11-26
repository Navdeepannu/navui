import { readFile, access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import ts from "typescript";
const root = process.cwd();
export async function resolve(specifier, context, next) {
  let candidate;
  if (specifier.startsWith("@/"))
    candidate = path.join(root, specifier.slice(2));
  else if (specifier.startsWith(".") && context.parentURL?.startsWith("file:"))
    candidate = path.resolve(
      path.dirname(fileURLToPath(context.parentURL)),
      specifier,
    );
  if (candidate && !path.extname(candidate)) {
    for (const extension of [".tsx", ".ts"]) {
      try {
        await access(candidate + extension);
        return {
          url: pathToFileURL(candidate + extension).href,
          shortCircuit: true,
        };
      } catch {}
    }
  }
  return next(specifier, context);
}
export async function load(url, context, next) {
  if (/\.tsx?$/.test(url) && !url.includes("/node_modules/")) {
    const text = await readFile(new URL(url), "utf8");
    return {
      format: "module",
      shortCircuit: true,
      source: ts.transpileModule(text, {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText,
    };
  }
  return next(url, context);
}
