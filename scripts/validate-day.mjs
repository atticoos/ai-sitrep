#!/usr/bin/env node
/**
 * Validates day report files: schema via lib/types.ts parseDayReport, plus
 * editorial lint rules from spec/DAY_STYLE.md.
 *
 * Usage:
 *   node scripts/validate-day.mjs data/days/2026-08-24.json
 *   node scripts/validate-day.mjs 2026-08-24            # same, by date
 *
 * Exit codes: 0 = schema valid (lint warnings allowed), 1 = schema error.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

// lib/types.ts is TypeScript; on runtimes without native type stripping
// (< 23.6), re-exec self with --experimental-strip-types.
if (!process.features.typescript) {
  const { spawnSync } = await import("node:child_process");
  const res = spawnSync(
    process.execPath,
    ["--experimental-strip-types", ...process.argv.slice(1)],
    { stdio: "inherit" },
  );
  process.exit(res.status ?? 1);
}

const { parseDayReport } = await import(new URL("../lib/types.ts", import.meta.url));

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) die("usage: node scripts/validate-day.mjs <YYYY-MM-DD | path.json> [...]");

const files = args.map((a) =>
  /^\d{4}-\d{2}-\d{2}$/.test(a) ? path.join("data", "days", `${a}.json`) : a,
);

let schemaErrors = 0;
let lintWarnings = 0;

for (const file of files) {
  const name = path.basename(file);
  let raw;
  try {
    raw = JSON.parse(await readFile(file, "utf8"));
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
    schemaErrors++;
    continue;
  }

  try {
    parseDayReport(raw, name);
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`);
    schemaErrors++;
    continue;
  }

  const warnings = [];

  if (name !== `${raw.date}.json`)
    warnings.push(`filename "${name}" does not match date "${raw.date}"`);

  for (const [field, value] of [
    ["us", raw.us],
    ["effects", raw.effects],
    ["iran", raw.iran],
  ]) {
    if (typeof value !== "string") continue;
    if (value.trim().endsWith("."))
      warnings.push(`${field}: ends with a period - grid fragments should not`);
    if (value.length > 60 && !value.includes(" · "))
      warnings.push(`${field}: long text without ' · ' fragment separators`);
  }

  if ((raw.theme.match(/\S+/g) ?? []).length > 6) warnings.push("theme: more than 6 words");

  const events = Array.isArray(raw.events) ? raw.events : [];
  events.forEach((ev, i) => {
    const sig = ev.significance ?? 0;
    if (sig >= 4 && !(Array.isArray(ev.sources) && ev.sources.length > 0))
      warnings.push(`events[${i}] (significance ${sig}): no sources - significance >=4 needs citations`);
    if (!ev.confidence) warnings.push(`events[${i}]: no confidence rating`);
  });
  for (let i = 1; i < events.length; i++) {
    if ((events[i - 1].significance ?? 0) < (events[i].significance ?? 0))
      warnings.push(`events: not sorted by significance descending (index ${i - 1}, ${i})`);
  }

  if (!Array.isArray(raw.sources) || raw.sources.length === 0) {
    warnings.push("sources: none filed");
  } else {
    const urls = raw.sources.map((s) => s.url);
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    if (dupes.length > 0) warnings.push(`sources: duplicate URLs (${dupes.join(", ")})`);
  }

  console.log(`OK   ${name} - schema ok${warnings.length ? `, ${warnings.length} lint warning(s)` : ""}`);
  for (const w of warnings) {
    console.warn(`WARN   ${w}`);
    lintWarnings++;
  }
}

console.log(`\n${files.length} file(s): ${schemaErrors} schema error(s), ${lintWarnings} lint warning(s)`);
process.exit(schemaErrors > 0 ? 1 : 0);
