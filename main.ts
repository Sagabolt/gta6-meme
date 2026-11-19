// gta6-meme-x-01 — main.ts
//
// Copies POST.json from the repository to /output. That is all it has to do:
// the house reads the post itself from X and makes the dossier from it.
// Node 22, standard library only, no network, no clock, deterministic.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? "./out";
mkdirSync(output, { recursive: true });
copyFileSync(join(repo, "POST.json"), join(output, "POST.json"));
