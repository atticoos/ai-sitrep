import {
  parseDayReport,
  parseMetaFile,
  parsePhasesFile,
  type DayReport,
  type MetaFile,
  type Phase,
  type SitrepSnapshot,
} from "./types";
import { RAW_DAYS } from "@/data/days/index";
import phasesJson from "@/data/phases.json";
import metaJson from "@/data/meta.json";

// Data is bundled at build time (see scripts/generate-day-index.mjs): the
// deployed Worker has no project filesystem, so nothing may read from disk
// at request time. Bad JSON still fails the build loudly via the parsers.
//
// Everything renders from a single SitrepSnapshot. When the research workflow
// lands, its only integration point is producing this same envelope (e.g.
// written to KV) and swapping the source in getSnapshot() — no app changes.

// ---------- snapshot ----------

interface Cache {
  snapshot?: SitrepSnapshot;
}
const cache: Cache = {};

export async function getSnapshot(): Promise<SitrepSnapshot> {
  if (cache.snapshot) return cache.snapshot;
  const seen = new Set<string>();
  const days = RAW_DAYS.map(({ file, data }) => parseDayReport(data, file));
  for (const r of days) {
    if (seen.has(r.date)) throw new Error(`Duplicate day report for date ${r.date}`);
    seen.add(r.date);
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  const phases = parsePhasesFile(phasesJson, "data/phases.json").phases;
  const meta = parseMetaFile(metaJson, "data/meta.json");
  cache.snapshot = { schemaVersion: 1, generatedAt: new Date().toISOString(), days, phases, meta };
  return cache.snapshot;
}

// ---------- date helpers (pure UTC string math) ----------

export function toUTC(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

export function diffDays(a: string, b: string): number {
  return Math.round((toUTC(b).getTime() - toUTC(a).getTime()) / 86_400_000);
}

export function addDays(date: string, n: number): string {
  const d = toUTC(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** "2026-07-07" -> "JUL" */
export function monthLabel(date: string): string {
  return MONTHS[toUTC(date).getUTCMonth()];
}

/** "2026-07-07" -> "07" */
export function dayNumber(date: string): string {
  return date.slice(8, 10);
}

function short(date: string): string {
  return `${dayNumber(date)} ${monthLabel(date)}`;
}

/** Phase range label in masthead style: "AUG 01—10" / "JUL 28—AUG 03". */
export function rangeLabel(start: string, end: string): string {
  if (monthLabel(start) === monthLabel(end)) {
    return `${monthLabel(start)} ${dayNumber(start)}—${dayNumber(end)}`;
  }
  return `${short(start)}—${short(end)}`;
}

/** Intermission label pair: the missed days between two reports. */
export function gapLabel(from: string, to: string): { days: string; month: string } | null {
  const first = addDays(from, 1);
  const last = addDays(to, -1);
  if (last < first) return null;
  if (monthLabel(first) === monthLabel(last)) {
    return { days: `${dayNumber(first)}—${dayNumber(last)}`, month: monthLabel(first) };
  }
  return { days: `${short(first)}—${short(last)}`, month: "" };
}

// ---------- loading ----------

export async function getDays(): Promise<DayReport[]> {
  return (await getSnapshot()).days;
}

export async function getPhases(): Promise<Phase[]> {
  return (await getSnapshot()).phases;
}

export async function getMeta(): Promise<MetaFile> {
  return (await getSnapshot()).meta;
}

export async function getDay(date: string): Promise<DayReport | undefined> {
  return (await getDays()).find((d) => d.date === date);
}

// ---------- derived views ----------

export interface Sitrep {
  days: DayReport[]; // chronological
  phases: Phase[]; // sorted by start
  latest: DayReport | null;
}

export async function getSitrep(): Promise<Sitrep> {
  const [days, phases] = await Promise.all([getDays(), getPhases()]);
  const sorted = [...phases].sort((a, b) => a.start.localeCompare(b.start));
  return { days, phases: sorted, latest: days.length > 0 ? days[days.length - 1] : null };
}

export function phaseForDate(phases: Phase[], date: string): Phase | undefined {
  return phases.find((p) => p.start <= date && date <= p.end);
}

export interface Intermission {
  label: { days: string; month: string };
}

export interface TimelineSection {
  phase?: Phase;
  entries: ({ kind: "day"; day: DayReport } | { kind: "gap"; gap: Intermission })[];
}

/**
 * Groups reported days under their phase, NEWEST FIRST (the page reads top =
 * latest). Intermission blocks are inserted for calendar gaps of two or more
 * missed days, landing between the two reports they separate — including at
 * phase boundaries, where the gap attaches to the head of the older section.
 */
export function buildSections(days: DayReport[], phases: Phase[]): TimelineSection[] {
  const sections = new Map<string, TimelineSection>();
  const ensure = (key: string, phase?: Phase): TimelineSection => {
    let s = sections.get(key);
    if (!s) {
      s = { phase, entries: [] };
      sections.set(key, s);
    }
    return s;
  };

  for (const p of [...phases].sort((a, b) => a.start.localeCompare(b.start))) {
    ensure(p.id, p);
  }

  let prev: DayReport | null = null;
  for (const day of [...days].reverse()) {
    const phase = phaseForDate(phases, day.date);
    const key = phase?.id ?? "__unphased__";
    const section = ensure(key, phase);

    // Calendar gap of two or more missed days → intermission before this card.
    if (prev && Math.abs(diffDays(prev.date, day.date)) >= 3) {
      // gapLabel expects chronological order; the walk runs newest-first.
      const [a, b] = prev.date < day.date ? [prev.date, day.date] : [day.date, prev.date];
      const gap = gapLabel(a, b);
      if (gap) {
        section.entries.push({ kind: "gap", gap: { label: gap } });
      }
    }

    section.entries.push({ kind: "day", day });
    prev = day;
  }

  return [...sections.values()];
}

/** Builds a stable numbered index of source URLs for a day (events first, then top-level). */
export function buildSourceIndex(day: DayReport): Map<string, number> {
  const idx = new Map<string, number>();
  for (const e of day.events ?? []) {
    for (const u of e.sources ?? []) {
      if (!idx.has(u)) idx.set(u, idx.size + 1);
    }
  }
  for (const s of day.sources ?? []) {
    if (!idx.has(s.url)) idx.set(s.url, idx.size + 1);
  }
  return idx;
}
