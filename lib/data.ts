import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  parseDayReport,
  parseMetaFile,
  parsePhasesFile,
  type DayReport,
  type MetaFile,
  type Phase,
  type PhasesFile,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DAYS_DIR = path.join(DATA_DIR, "days");

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

interface Cache {
  days?: DayReport[];
  phases?: PhasesFile;
  meta?: MetaFile;
}
const cache: Cache = {};

export async function getDays(): Promise<DayReport[]> {
  if (cache.days) return cache.days;
  let files: string[] = [];
  try {
    files = await readdir(DAYS_DIR);
  } catch {
    cache.days = [];
    return cache.days;
  }
  const reports = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (f) => {
        const raw = JSON.parse(await readFile(path.join(DAYS_DIR, f), "utf8"));
        return parseDayReport(raw, f);
      }),
  );
  const seen = new Set<string>();
  for (const r of reports) {
    if (seen.has(r.date)) throw new Error(`Duplicate day report for date ${r.date}`);
    seen.add(r.date);
  }
  cache.days = reports.sort((a, b) => a.date.localeCompare(b.date));
  return cache.days;
}

export async function getPhases(): Promise<PhasesFile> {
  if (cache.phases) return cache.phases;
  try {
    const raw = JSON.parse(await readFile(path.join(DATA_DIR, "phases.json"), "utf8"));
    cache.phases = parsePhasesFile(raw, "data/phases.json");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      cache.phases = { phases: [] };
    } else {
      throw err;
    }
  }
  return cache.phases;
}

export async function getMeta(): Promise<MetaFile> {
  if (cache.meta) return cache.meta;
  try {
    const raw = JSON.parse(await readFile(path.join(DATA_DIR, "meta.json"), "utf8"));
    cache.meta = parseMetaFile(raw, "data/meta.json");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      cache.meta = { metrics: [] };
    } else {
      throw err;
    }
  }
  return cache.meta;
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
  const [days, phasesFile] = await Promise.all([getDays(), getPhases()]);
  const phases = [...phasesFile.phases].sort((a, b) => a.start.localeCompare(b.start));
  return { days, phases, latest: days.length > 0 ? days[days.length - 1] : null };
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
