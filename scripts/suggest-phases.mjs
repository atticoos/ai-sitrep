#!/usr/bin/env node
/**
 * Drafts campaign phases from the day reports in data/days/ using an LLM.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... npm run phases:suggest            # writes data/phases.suggested.json
 *   OPENAI_API_KEY=sk-... npm run phases:suggest               # same, via OpenAI
 *   npm run phases:suggest -- --write                          # overwrite data/phases.json directly
 *
 * Review the draft, edit freely (numbers, accents, boundaries), then commit.
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DAYS_DIR = path.join(DATA_DIR, "days");
const WRITE_DIRECT = process.argv.includes("--write");

const ACCENTS = ["amber", "red", "blue", "orange", "green", "violet"];

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

async function loadDays() {
  let files;
  try {
    files = await readdir(DAYS_DIR);
  } catch {
    die("data/days/ not found — nothing to summarize.");
  }
  const days = [];
  for (const f of files.filter((f) => f.endsWith(".json")).sort()) {
    try {
      days.push(JSON.parse(await readFile(path.join(DAYS_DIR, f), "utf8")));
    } catch (e) {
      die(`could not parse ${f}: ${e.message}`);
    }
  }
  if (days.length === 0) die("no day reports found in data/days/");
  return days.sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function digest(days) {
  return days
    .map((d) =>
      [
        `${d.date} [${String(d.tempo ?? "low").toUpperCase()} TEMPO] ${d.theme}`,
        `    US: ${d.us ?? "—"}`,
        `    Effects: ${d.effects ?? "—"}`,
        `    Iran: ${d.iran ?? "—"}`,
      ].join("\n"),
    )
    .join("\n\n");
}

function prompt(days) {
  const first = days[0].date;
  const last = days[days.length - 1].date;
  const existing = "existing phases may exist in data/phases.json — produce a fresh full set";
  return `You are an intelligence analyst building the phase structure for a dark-ops-style SITREP timeline of the US–Iran campaign.

Below are all filed daily reports (${first} through ${last}; some calendar days have no report and render as intermissions — do not create phases for empty gaps unless they mark a real inflection).

Group the reports into semantic PHASES: stretches with one coherent operational character (e.g. "Initial maritime retaliation", "Operational pause", "Truce and Hormuz talks"). Rules:

- Phases must be chronological, non-overlapping, and together cover every REPORTED date. They need not be contiguous with each other.
- number: zero-padded ordinal starting at "01" in chronological order.
- title: 2-5 words, lowercase sentence style.
- accent: one of ${ACCENTS.join(", ")} — pick to match character (kinetic=red/orange, pause/diplomatic=blue/green, pressure/siege=violet, opening/maritime=amber).
- summary: one line, three short fragments separated by ' · ' (e.g. "Strike halt · Corridor diplomacy · Blockade tightens daily").
- start/end are YYYY-MM-DD inclusive.

${existing}

Return ONLY JSON:
{ "phases": [ { "id": "kebab-slug", "number": "01", "title": "...", "start": "YYYY-MM-DD", "end": "YYYY-MM-DD", "accent": "amber", "summary": "..." } ] }

Daily reports:

${digest(days)}`;
}

async function callAnthropic(p) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.MODEL ?? "claude-sonnet-4-5",
      max_tokens: 8000,
      messages: [{ role: "user", content: p }],
    }),
  });
  if (!res.ok) die(`anthropic api ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.content?.[0]?.text;
}

async function callOpenAI(p) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: process.env.MODEL ?? "gpt-4o",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: p }],
    }),
  });
  if (!res.ok) die(`openai api ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content;
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) die("model did not return JSON");
  return JSON.parse(text.slice(start, end + 1));
}

const days = await loadDays();
console.log(`loaded ${days.length} day reports (${days[0].date} → ${days[days.length - 1].date})`);

const p = prompt(days);
let text = await callAnthropic(p);
if (text === null) text = await callOpenAI(p);
if (text === null) die("set ANTHROPIC_API_KEY or OPENAI_API_KEY");

const out = extractJson(text);
if (!Array.isArray(out.phases) || out.phases.length === 0) die("no phases in model output");

// Light validation; the app's build-time parser is the strict gate.
for (const [i, ph] of out.phases.entries()) {
  for (const f of ["id", "number", "title", "start", "end", "accent", "summary"]) {
    if (!(f in ph)) die(`phase[${i}] missing "${f}"`);
  }
  if (!ACCENTS.includes(ph.accent)) die(`phase[${i}] accent "${ph.accent}" not in ${ACCENTS.join(", ")}`);
}
out.phases.sort((a, b) => String(a.start).localeCompare(String(b.start)));
out.phases.forEach((ph, i) => {
  ph.number = String(i + 1).padStart(2, "0");
});

const file = WRITE_DIRECT
  ? path.join(DATA_DIR, "phases.json")
  : path.join(DATA_DIR, "phases.suggested.json");
await writeFile(
  file,
  `${JSON.stringify({ updated: new Date().toISOString(), notes: "LLM draft — review numbers, accents and boundaries before committing.", ...out }, null, 2)}\n`,
);
console.log(`wrote ${path.relative(process.cwd(), file)} (${out.phases.length} phases)`);
if (!WRITE_DIRECT) console.log("review it, edit freely, then: mv data/phases.suggested.json data/phases.json");
