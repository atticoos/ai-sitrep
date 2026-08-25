import Link from "next/link";
import type { Metadata } from "next";
import { getResearchManifest, listResearchedDays, type ResearchStageMeta } from "@/lib/research";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proof of work · Campaign / Sitrep",
  description:
    "Raw research transcripts behind each day report: prompts, thinking, tool calls.",
};

function stageSummary(meta: ResearchStageMeta): string {
  const bits = [`${meta.messages} msgs`, `${meta.toolCalls} tools`];
  if (meta.thinkingBlocks) bits.push(`${meta.thinkingBlocks} thinking`);
  if (meta.startedAt && meta.endedAt) {
    const mins = Math.max(
      1,
      Math.round((new Date(meta.endedAt).getTime() - new Date(meta.startedAt).getTime()) / 60000),
    );
    bits.push(`${mins} min`);
  }
  return bits.join(" · ");
}

export default async function ResearchIndexPage() {
  let days: Awaited<ReturnType<typeof listResearchedDays>> = [];
  let error: string | null = null;
  try {
    days = (await listResearchedDays()).reverse();
  } catch (err) {
    error = err instanceof Error ? err.message : "storage unavailable";
  }

  const manifests = await Promise.all(
    days.map(async (date) => ({ date, manifest: await getResearchManifest(date) })),
  );

  return (
    <main>
      <header className="masthead">
        <div className="nav-line">
          <Link className="brand" href="/" aria-label="Back to campaign timeline">
            <span className="brand-mark">◉</span>
            <span>CAMPAIGN / SITREP</span>
          </Link>
          <div className="status"><i /> PROOF OF WORK</div>
        </div>
      </header>

      <section className="report">
        <div className="report-crumbs">
          <Link href="/">← CAMPAIGN TIMELINE</Link>
          <span>RESEARCH TRANSCRIPTS</span>
        </div>

        <div className="pow-head">
          <h1>PROOF OF <em>WORK</em></h1>
          <p>
            Every day report is produced by an autonomous research agent. These are
            its unedited session transcripts — prompts, thinking blocks, tool calls,
            and everything it fetched along the way.
          </p>
        </div>

        {error ? (
          <p className="pow-empty">Transcripts unavailable: {error}</p>
        ) : manifests.length === 0 ? (
          <p className="pow-empty">No transcripts uploaded yet.</p>
        ) : (
          <div className="pow-list">
            {manifests.map(({ date, manifest }) => {
              const stages = Object.entries(manifest?.stages ?? {}) as [
                string,
                ResearchStageMeta,
              ][];
              return (
                <Link key={date} href={`/research/${date}`} className="pow-row">
                  <span className="pow-date">{date}</span>
                  <span className="pow-stages">
                    {stages.map(([stage, meta]) => (
                      <span key={stage} className="pow-stage-chip">
                        STAGE {stage} — {stageSummary(meta)}
                      </span>
                    ))}
                  </span>
                  <span className="pow-arrow" aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
