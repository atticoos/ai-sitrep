import { getCloudflareContext } from "@opennextjs/cloudflare";

// Proof-of-work transcripts live in the US_IRAN_RESEARCH R2 bucket, written by the
// daily research workflow (scripts/upload-research-r2.sh). Key layout:
//
//   research/<DATE>/manifest.json     small index: which stages exist + meta
//   research/<DATE>/session-A.json    full opencode session export per stage
//
// Unlike day reports, these are read at request time through the binding —
// Workers have no filesystem but bindings are always available.

export const RESEARCH_STAGES = ["A", "B", "C"] as const;
export type ResearchStage = (typeof RESEARCH_STAGES)[number];

export interface ResearchStageMeta {
  sessionId?: string;
  title?: string;
  model?: string;
  agentVersion?: string;
  tokens?: Record<string, unknown>;
  startedAt?: string;
  endedAt?: string;
  messages: number;
  toolCalls: number;
  thinkingBlocks?: number;
}

export interface ResearchManifest {
  schemaVersion: number;
  date: string;
  generatedAt: string;
  stages: Partial<Record<ResearchStage, ResearchStageMeta>>;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isResearchDate(date: string): boolean {
  return DATE_RE.test(date);
}

export function isResearchStage(stage: string): stage is ResearchStage {
  return (RESEARCH_STAGES as readonly string[]).includes(stage);
}

function key(date: string, name: string): string {
  return `research/${date}/${name}`;
}

/** R2 object key for a day's proof-of-work artifact (manifest or transcript). */
export function researchObjectKey(date: string, name: string): string {
  return key(date, name);
}

/** The R2 bucket holding proof-of-work transcripts, per wrangler.jsonc. */
export function bucket(): R2Bucket {
  const binding = getCloudflareContext().env.US_IRAN_RESEARCH;
  if (!binding) throw new Error("R2 bucket binding US_IRAN_RESEARCH is not configured");
  return binding;
}

/** Lists dates that have an uploaded proof-of-work manifest, oldest first. */
export async function listResearchedDays(): Promise<string[]> {
  const r2 = bucket();

  const dates = new Set<string>();
  let cursor: string | undefined;
  do {
    const listing = await r2.list({ prefix: "research/", cursor });
    for (const object of listing.objects) {
      const m = /^research\/(\d{4}-\d{2}-\d{2})\/manifest\.json$/.exec(object.key);
      if (m) dates.add(m[1]);
    }
    cursor = listing.truncated ? listing.cursor : undefined;
  } while (cursor);

  return [...dates].sort();
}

export async function getResearchManifest(
  date: string,
): Promise<ResearchManifest | null> {
  if (!isResearchDate(date)) return null;
  const r2 = bucket();

  const object = await r2.get(key(date, "manifest.json"));
  if (!object) return null;

  try {
    const raw = (await object.json()) as ResearchManifest;
    if (raw.schemaVersion !== 1 || typeof raw.date !== "string") return null;
    return { ...raw, stages: raw.stages ?? {} };
  } catch {
    return null;
  }
}

export function availableStages(manifest: ResearchManifest | null): ResearchStage[] {
  if (!manifest) return [];
  return RESEARCH_STAGES.filter((s) => Boolean(manifest.stages[s]));
}

/** Stage to show when none is selected: the latest one that exists. */
export function defaultStage(manifest: ResearchManifest | null): ResearchStage | null {
  const stages = availableStages(manifest);
  return stages.length > 0 ? stages[stages.length - 1] : null;
}
