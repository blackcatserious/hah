import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("not-found route overrides global index/follow metadata", () => {
  const source = readFileSync(new URL("../src/app/not-found.tsx", import.meta.url), "utf8");
  assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(source, /Return to the research home/);
});
