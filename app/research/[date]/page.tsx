import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  availableStages,
  defaultStage,
  getResearchManifest,
  isResearchDate,
  isResearchStage,
  type ResearchStage,
} from "@/lib/research";
import { SessionViewer } from "./session-viewer";

interface Params {
  date: string;
}

interface SearchParams {
  stage?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { date } = await params;
  if (!isResearchDate(date)) return { title: "Not found — Campaign / Sitrep" };
  return {
    title: `Proof of work · ${date}`,
    description: "Raw research agent transcript for this day report.",
  };
}

const STAGE_LABELS: Record<string, string> = {
  A: "GATHER",
  B: "SYNTHESIZE",
  C: "STATE + SUMMARY",
};

function StageTabs({
  date,
  stages,
  selected,
}: {
  date: string;
  stages: ResearchStage[];
  selected: ResearchStage;
}) {
  return (
    <div className="pow-tabs">
      {stages.map((stage) => (
        <Link
          key={stage}
          href={`/research/${date}?stage=${stage}`}
          className={`pow-tab ${stage === selected ? "is-active" : ""}`}
        >
          <strong>{stage}</strong>
          <span>{STAGE_LABELS[stage] ?? stage}</span>
        </Link>
      ))}
    </div>
  );
}

export default async function ResearchDayPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ date }, query] = await Promise.all([params, searchParams]);
  if (!isResearchDate(date)) notFound();

  const manifest = await getResearchManifest(date);
  const stages = availableStages(manifest);

  if (stages.length === 0) {
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
            <span>{date}</span>
          </div>
          <p className="pow-empty">
            No research transcript was recorded for {date}. Transcripts are captured
            from the daily research run onward.
          </p>
        </section>
      </main>
    );
  }

  const requested = typeof query.stage === "string" ? query.stage.toUpperCase() : "";
  const stage = isResearchStage(requested) && stages.includes(requested)
    ? requested
    : (defaultStage(manifest) as ResearchStage);
  const meta = manifest?.stages[stage];

  return (
    <main>
      <header className="masthead">
        <div className="nav-line">
          <Link className="brand" href="/" aria-label="Back to campaign timeline">
            <span className="brand-mark">◉</span>
            <span>CAMPAIGN / SITREP</span>
          </Link>
          <div className="status"><i /> PROOF OF WORK <span>{date}</span></div>
        </div>
      </header>

      <section className="report">
        <div className="report-crumbs">
          <Link href={`/day/${date}`}>← DAY REPORT {date}</Link>
          <Link href="/research">ALL TRANSCRIPTS</Link>
        </div>

        <div className="pow-head">
          <h1>
            SESSION <em>{stage}</em> — {date}
          </h1>
          <p>
            Unedited agent transcript. Prompts, thinking, tool calls and outputs as
            they happened{meta?.model ? ` · model ${meta.model}` : ""}.
          </p>
        </div>

        <StageTabs date={date} stages={stages} selected={stage} />

        <SessionViewer date={date} stage={stage} />
      </section>
    </main>
  );
}
