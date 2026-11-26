import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

import { blockCatalog, componentCatalog, registryCatalog, retiredComponents } from "../../registry/catalog.ts";
import { validateBlockCatalog } from "./validate-catalog.mjs";

test("keeps the published inventory and existing Base names", () => {
  assert.equal(blockCatalog.length, 45);
  assert.ok(blockCatalog.every((item) => item.registryName === `base-${item.slug}`));
  assert.ok(componentCatalog.some(item => item.slug === 'button' && item.status === 'published'));
  assert.ok(componentCatalog.some(item => item.slug === 'tabs' && item.status === 'published'));
  for (const retired of retiredComponents) assert.ok(!componentCatalog.some(item => item.slug === retired.slug && item.status === 'published'));
  validateBlockCatalog(registryCatalog, { designSystemIds: ["base"], categoryIds: [...new Set(blockCatalog.map((item) => item.category))] });
});

test("every public import is declared, portable, and independent of demos", () => {
  for (const item of componentCatalog) {
    const closure = new Set();
    function include(entry) {
      if (closure.has(entry)) return;
      closure.add(entry);
      for (const dependency of entry.registry.registryDependencies) {
        if (!dependency.startsWith('@navui/')) continue;
        const local = componentCatalog.find(candidate => candidate.registryName === dependency.slice('@navui/'.length));
        assert.ok(local, `Unknown canonical dependency: ${dependency}`);
        include(local);
      }
    }
    include(item);
    const files = [...closure].flatMap(entry => entry.registry.files);
    const sources = new Set(files.map((file) => file.source));
    const dependencies = new Set([...closure].flatMap(entry => entry.registry.dependencies).map(dep => dep.includes('@', 1) ? dep.slice(0, dep.lastIndexOf('@')) : dep));
    for (const file of item.registry.files) {
      assert.doesNotMatch(file.source, /examples|\.demo\./);
      const code = readFileSync(file.source, "utf8");
      const ast = ts.createSourceFile(file.source, code, ts.ScriptTarget.Latest, true);
      for (const node of ast.statements) {
        if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
        const specifier = node.moduleSpecifier.text;
        if (specifier.startsWith(".")) {
          assert.ok(sources.has(path.posix.normalize(path.posix.join(path.posix.dirname(file.source), `${specifier}.tsx`))), `${item.slug}: missing supporting file ${specifier}`);
        } else if (specifier.startsWith("@/")) {
          assert.ok(sources.has(`${specifier.slice(2)}.tsx`), `${item.slug}: hidden local dependency ${specifier}`);
        } else {
          const dependency = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
          assert.ok(dependency === "react" || dependencies.has(dependency), `${item.slug}: undeclared npm dependency ${dependency}`);
        }
      }
    }
    assert.ok(item.registry.files.some((file) => file.target.endsWith("/LICENSE")));
    assert.ok(readFileSync(item.preview, "utf8").length);
    for (const example of item.examples) assert.ok(readFileSync(example.source, "utf8").length);
  }
});

test("generated payloads contain current source and no retired or demo items", () => {
  const names = new Set(registryCatalog.filter((item) => item.status === "published").map((item) => item.registryName));
  for (const filename of readdirSync("public/r")) {
    if (!filename.endsWith(".json") || filename === "registry.json") continue;
    assert.ok(names.has(filename.slice(0, -5)), `Stale registry output: ${filename}`);
  }
  for (const item of componentCatalog) {
    const payload = JSON.parse(readFileSync(`public/r/${item.registryName}.json`, "utf8"));
    assert.deepEqual(payload.dependencies, [...item.registry.dependencies]);
    assert.equal(payload.files.length, item.registry.files.length);
    for (const file of item.registry.files) {
      const generated = payload.files.find((entry) => entry.target === file.target);
      assert.ok(generated, `${item.slug}: missing generated file ${file.target}`);
      assert.equal(generated.content, readFileSync(file.source, "utf8"));
    }
  }
});

test("shared targets reject conflicting source and missing shared declarations", () => {
  const first = structuredClone(componentCatalog.find((item) => item.slug === "expandable-card"));
  const second = structuredClone(componentCatalog.find((item) => item.slug === "magnetic-button"));
  const options = { designSystemIds: ["base"], categoryIds: [] };
  assert.doesNotThrow(() => validateBlockCatalog([first, second], options));
  const helper = second.registry.files.find((file) => file.target.endsWith("/LICENSE"));
  helper.source = "registry/components/conflicting-button.tsx";
  assert.throws(() => validateBlockCatalog([first, second], options), /duplicate install target/);
  helper.source = first.registry.files.find((file) => file.target.endsWith("/LICENSE")).source;
  helper.shared = false;
  assert.throws(() => validateBlockCatalog([first, second], options), /duplicate install target/);
});
