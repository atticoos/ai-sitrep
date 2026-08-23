export const TEMPOS = ["high", "medium", "low", "pause"] as const;
export type Tempo = (typeof TEMPOS)[number];

export const ACCENTS = ["amber", "red", "blue", "orange", "green", "violet"] as const;
export type Accent = (typeof ACCENTS)[number];

export interface DayEvent {
  time?: string;
  actor?: string;
  title: string;
  summary?: string;
  significance?: number; // 1-5
  confidence?: "high" | "medium" | "low";
  sources?: string[];
}

export interface DaySource {
  title?: string;
  url: string;
}

/** One reported day, shaped for the signal-grid day card. */
export interface DayReport {
  date: string; // YYYY-MM-DD
  night?: string; // e.g. "NIGHT 04"
  theme: string;
  tempo: Tempo;
  us: string;
  effects?: string;
  iran: string;
  tldr?: string; // longer prose for the detail page
  events?: DayEvent[];
  sources?: DaySource[];
  dossier?: string;
}

export interface Phase {
  id: string;
  number: string; // zero-padded display ordinal, e.g. "05"
  title: string;
  start: string; // YYYY-MM-DD inclusive
  end: string; // YYYY-MM-DD inclusive
  accent: Accent;
  summary: string;
}

export interface PhasesFile {
  updated?: string;
  notes?: string;
  phases: Phase[];
}

export interface MetaFile {
  metrics: { label: string; value: string; suffix?: string }[];
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isStr(v: unknown): v is string {
  return typeof v === "string";
}

function fail(file: string, msg: string): never {
  throw new Error(`Invalid data file ${file}: ${msg}`);
}

function checkDate(file: string, v: unknown, field: string): string {
  if (!isStr(v) || !DATE_RE.test(v) || Number.isNaN(Date.parse(`${v}T00:00:00Z`))) {
    fail(file, `"${field}" must be a YYYY-MM-DD date, got ${JSON.stringify(v)}`);
  }
  return v;
}

export function parseDayReport(raw: unknown, file: string): DayReport {
  if (typeof raw !== "object" || raw === null) fail(file, "expected an object");
  const o = raw as Record<string, unknown>;

  const date = checkDate(file, o.date, "date");
  const base = `data/days/${file}`;
  if (!isStr(o.theme) || o.theme.trim() === "") fail(`${base} (#${date})`, '"theme" must be a non-empty string');
  const tempo = isStr(o.tempo) ? o.tempo : "low";
  if (!(TEMPOS as readonly string[]).includes(tempo))
    fail(base, `"tempo" "${tempo}" not in ${TEMPOS.join(", ")}`);
  if (!isStr(o.us)) fail(base, '"us" must be a string');
  if (!isStr(o.iran)) fail(base, '"iran" must be a string');

  let events: DayEvent[] | undefined;
  if (o.events !== undefined) {
    if (!Array.isArray(o.events)) fail(base, '"events" must be an array');
    events = o.events.map((e, i): DayEvent => {
      if (typeof e !== "object" || e === null) fail(base, `events[${i}] must be an object`);
      const ev = e as Record<string, unknown>;
      if (!isStr(ev.title) || ev.title.trim() === "")
        fail(base, `events[${i}].title must be a non-empty string`);
      let confidence: DayEvent["confidence"];
      if (ev.confidence !== undefined) {
        if (!isStr(ev.confidence) || !["high", "medium", "low"].includes(ev.confidence))
          fail(base, `events[${i}].confidence must be "high", "medium" or "low"`);
        confidence = ev.confidence as DayEvent["confidence"];
      }
      return {
        time: isStr(ev.time) ? ev.time : undefined,
        actor: isStr(ev.actor) ? ev.actor : undefined,
        title: ev.title,
        summary: isStr(ev.summary) ? ev.summary : undefined,
        significance:
          typeof ev.significance === "number"
            ? Math.min(5, Math.max(1, Math.round(ev.significance)))
            : undefined,
        confidence,
        sources: Array.isArray(ev.sources) ? ev.sources.filter(isStr) : undefined,
      };
    });
  }

  let sources: DaySource[] | undefined;
  if (o.sources !== undefined) {
    if (!Array.isArray(o.sources)) fail(base, '"sources" must be an array');
    sources = o.sources.map((s, i): DaySource => {
      if (isStr(s)) return { url: s };
      if (typeof s === "object" && s !== null && isStr((s as DaySource).url))
        return s as DaySource;
      fail(base, `sources[${i}] must be a URL string or {title,url}`);
    });
  }

  return {
    date,
    night: isStr(o.night) ? o.night : undefined,
    theme: o.theme,
    tempo: tempo as Tempo,
    us: o.us,
    effects: isStr(o.effects) ? o.effects : undefined,
    iran: o.iran,
    tldr: isStr(o.tldr) ? o.tldr : undefined,
    events,
    sources,
    dossier: isStr(o.dossier) ? o.dossier : undefined,
  };
}

export function parsePhasesFile(raw: unknown, file: string): PhasesFile {
  if (typeof raw !== "object" || raw === null) fail(file, "expected an object");
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.phases)) fail(file, '"phases" must be an array');
  const phases: Phase[] = o.phases.map((p, i): Phase => {
    if (typeof p !== "object" || p === null) fail(file, `phases[${i}] must be an object`);
    const ph = p as Record<string, unknown>;
    if (!isStr(ph.id) || !/^[a-z0-9-]+$/.test(ph.id))
      fail(file, `phases[${i}].id must be a lowercase-slug string`);
    if (!isStr(ph.number) || !/^\d{2}$/.test(ph.number))
      fail(file, `phases[${i}].number must be a zero-padded two-digit string`);
    if (!isStr(ph.title)) fail(file, `phases[${i}].title must be a string`);
    const accent = isStr(ph.accent) ? ph.accent : "amber";
    if (!(ACCENTS as readonly string[]).includes(accent))
      fail(file, `phases[${i}].accent "${accent}" not in ${ACCENTS.join(", ")}`);
    const start = checkDate(file, ph.start, `phases[${i}].start`);
    const end = checkDate(file, ph.end, `phases[${i}].end`);
    if (end < start) fail(file, `phases[${i}] end (${end}) is before start (${start})`);
    if (!isStr(ph.summary)) fail(file, `phases[${i}].summary must be a string`);
    return {
      id: ph.id,
      number: ph.number,
      title: ph.title,
      start,
      end,
      accent: accent as Accent,
      summary: ph.summary,
    };
  });
  return {
    updated: isStr(o.updated) ? o.updated : undefined,
    notes: isStr(o.notes) ? o.notes : undefined,
    phases,
  };
}

export function parseMetaFile(raw: unknown, file: string): MetaFile {
  if (typeof raw !== "object" || raw === null) fail(file, "expected an object");
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.metrics)) fail(file, '"metrics" must be an array');
  const metrics = o.metrics.map((m, i): MetaFile["metrics"][number] => {
    if (typeof m !== "object" || m === null) fail(file, `metrics[${i}] must be an object`);
    const mm = m as Record<string, unknown>;
    if (!isStr(mm.label) || !isStr(mm.value))
      fail(file, `metrics[${i}] needs "label" and "value" strings`);
    return { label: mm.label, value: mm.value, suffix: isStr(mm.suffix) ? mm.suffix : undefined };
  });
  return { metrics };
}
