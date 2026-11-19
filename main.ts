// gta6-meme-x-01 — main.ts
//
// Copies POST.json from the repository to /output. That is all it has to do:
// the house reads the post itself from X and makes the dossier from it.
// Before copying, it checks POST.json parses as JSON and holds a non-empty
// string url, and fails with a clear error if it does not.
// Node 22, standard library only, no network, no clock, deterministic.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
const source = join(repo, "POST.json");

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch {
  throw new Error(`POST.json does not parse as JSON: ${source}`);
}
const url = (parsed as { url?: unknown } | null)?.url;
if (typeof url !== "string" || url.trim().length === 0) {
  throw new Error(`POST.json holds no non-empty string url: ${source}`);
}

mkdirSync(output, { recursive: true });
copyFileSync(source, join(output, "POST.json"));
console.log(`copied POST.json to ${join(output, "POST.json")}`);
