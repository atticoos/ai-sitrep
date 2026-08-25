#!/usr/bin/env node
// Builds the proof-of-work manifest for a researched day by inspecting the
// exported opencode session transcripts under
// data/research/<DATE>/scratch/sessions/session-<STAGE>.json.
//
// Usage: node scripts/build-research-manifest.mjs 2026-08-25
//
// The manifest is the small index the web app reads first; stage transcripts
// are fetched separately. Output: <sessions dir>/manifest.json

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const DATE = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE ?? "")) {
  console.error("usage: node scripts/build-research-manifest.mjs YYYY-MM-DD");
  process.exit(1);
}

const SESSIONS_DIR = path.join("data", "research", DATE, "scratch", "sessions");
const STAGES = ["A", "B", "C"];

function iso(ms) {
  return typeof ms === "number" ? new Date(ms).toISOString() : undefined;
}

function summarizeStage(file) {
  const raw = JSON.parse(readFileSync(file, "utf8"));
  const info = raw.info ?? {};
  const messages = Array.isArray(raw.messages) ? raw.messages : [];

  let toolCalls = 0;
  let thinkingBlocks = 0;
  let started;
  let ended;
  for (const m of messages) {
    const created = m.info?.time?.created;
    if (typeof created === "number") {
      started = started === undefined ? created : Math.min(started, created);
      ended = ended === undefined ? created : Math.max(ended, created);
    }
    for (const p of m.parts ?? []) {
      if (p.type === "tool") toolCalls += 1;
      if (p.type === "reasoning") thinkingBlocks += 1;
      const completed = p.time?.end;
      if (typeof completed === "number") {
        ended = ended === undefined ? completed : Math.max(ended, completed);
      }
    }
  }

  return {
    sessionId: info.id,
    title: info.title,
    model: info.model ? `${info.model.providerID}/${info.model.id}` : undefined,
    agentVersion: info.version,
    tokens: info.tokens,
    startedAt: iso(started),
    endedAt: iso(ended),
    messages: messages.filter((m) => m.info?.role).length,
    toolCalls,
    thinkingBlocks,
  };
}

const stages = {};
for (const stage of STAGES) {
  const file = path.join(SESSIONS_DIR, `session-${stage}.json`);
  if (!existsSync(file)) continue;
  try {
    stages[stage] = summarizeStage(file);
  } catch (err) {
    console.error(`[manifest] warn: could not parse session-${stage}.json: ${err.message}`);
  }
}

const manifest = {
  schemaVersion: 1,
  date: DATE,
  generatedAt: new Date().toISOString(),
  stages,
};

writeFileSync(path.join(SESSIONS_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const listed = Object.keys(stages)
  .map((s) => `${s}(${stages[s].messages} msgs / ${stages[s].toolCalls} tools)`)
  .join(", ");
console.log(`[manifest] ${DATE}: ${listed || "no transcripts found"} → ${SESSIONS_DIR}/manifest.json`);
