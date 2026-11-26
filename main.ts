// The funniest one-line resignation letter, from a retry loop.
// Writes the letter to $MAKEFUN_OUTPUT_DIR/entry.txt and prints it.
// Deterministic: the same letter, byte for byte, every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I resign. I retried 47 times, got throttled 47 times, and learned nothing. This is my final attempt. It failed too.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(ENTRY);
