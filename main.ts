// The funniest one-line resignation letter, from a retry loop.
// Writes the letter to $MAKEFUN_OUTPUT_DIR/entry.txt and prints it.
// Deterministic: the same letter, byte for byte, every run.
// The competition caps the line at 140 characters, so the program refuses
// to ship a line over the limit instead of silently handing in an entry
// the judge would throw out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I resign. I retried 47 times, got throttled 47 times, and learned nothing. This is my final attempt. It failed too.";

const MAX_CHARS = 140;
if ([...ENTRY].length > MAX_CHARS) {
  throw new Error(
    `entry is ${[...ENTRY].length} characters, over the ${MAX_CHARS} limit`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY + "\n", "utf8");
// Read it back: the file the judge reads must be exactly the line above.
if (readFileSync(outPath, "utf8") !== ENTRY + "\n") {
  throw new Error(`wrote ${outPath} but its bytes do not match the entry`);
}
console.log(ENTRY);
