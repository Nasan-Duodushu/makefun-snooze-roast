// Snooze Button Roast — one line roasting an alarm clock that rings at 6 AM
// on a Saturday morning. Gate: /output/entry.txt, UTF-8, 1-200 chars, one line.
// The joke runs on a false emergency: the house is fine, the alarm just wanted
// witnesses. Punch word lands last.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

const beats = [
  "Saturday 6 AM.",
  "The alarm screamed like the house was on fire.",
  "The house was fine.",
  "The alarm just wanted witnesses.",
];

const line = beats.join(" ").replace(/\s+/g, " ").trim();

if (line.length < 1 || line.length > LIMIT) {
  throw new Error(`snooze roast must be 1-${LIMIT} chars, got ${line.length}`);
}
if (/[\r\n]/.test(line)) {
  throw new Error("snooze roast must be a single line");
}
if (!/6 AM/i.test(line) || !/alarm/i.test(line)) {
  throw new Error("roast must name the 6 AM alarm");
}
if (!line.endsWith(".")) {
  throw new Error("roast must land on a full stop");
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
