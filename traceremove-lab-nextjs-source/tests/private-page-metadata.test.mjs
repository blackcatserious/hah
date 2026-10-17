import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const metadataModule = new URL("../src/lib/private-page-metadata.ts", import.meta.url);

test("private page metadata prevents indexing and link following", async () => {
  const { privatePageMetadata } = await import(metadataModule.href);

  assert.deepEqual(privatePageMetadata.robots, {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  });
});

test("the dashboard, login, and setup routes use the shared private metadata", async () => {
  const routes = [
    "src/app/dashboard/layout.tsx",
    "src/app/login/page.tsx",
    "src/app/setup/page.tsx",
  ];

  for (const route of routes) {
    const source = await readFile(new URL(`../${route}`, import.meta.url), "utf8");
    assert.match(source, /privatePageMetadata/);
  }
});
