// Everyday Wonder — writes one sentence (<= 200 chars) to /output/entry.txt.
// Deterministic: the sentence is a fixed constant, written with no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The line: a blackout at dinner, a phone light under a plastic water
// bottle, and a ceiling that briefly becomes water. Revised after a first
// read-through: "plastic" pins the bottle to something real, and the flat
// past tense of "reached up and swam" lets the wonder land in one read
// instead of trailing off into an infinitive.
const SENTENCE =
  "When the power died at dinner, a phone flashlight under a plastic water bottle turned our ceiling into the bottom of a swimming pool, and my father, sixty-eight, reached up and swam.";

function validate(sentence: string): void {
  const chars = [...sentence];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`sentence must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (sentence.trim().length === 0) {
    throw new Error("sentence must not be only whitespace");
  }
  if (sentence !== sentence.trim()) {
    throw new Error("sentence must not have leading or trailing whitespace");
  }
  // Exactly one sentence: a single terminal period and no other sentence enders.
  const enders = sentence.match(/[.!?]/g) ?? [];
  if (enders.length !== 1 || !sentence.endsWith(".")) {
    throw new Error("sentence must be exactly one sentence ending in a period");
  }
}

validate(SENTENCE);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, SENTENCE, { encoding: "utf8" });
console.log(`wrote ${[...SENTENCE].length} chars to ${OUTPUT_PATH}`);
