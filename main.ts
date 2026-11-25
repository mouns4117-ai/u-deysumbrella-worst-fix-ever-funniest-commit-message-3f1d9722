import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: silence the deprecation warning; it now emails the team daily";

// Fail fast: the gate needs 1-100 characters of non-whitespace UTF-8 text.
if (ENTRY.length < 1 || ENTRY.length > 100 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters; gate needs 1-100`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
