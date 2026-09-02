import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  buildSourceIndex,
  dayNumber,
  getDays,
  getSitrep,
  monthLabel,
  phaseForDate,
} from "@/lib/data";

interface Params {
  date: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const days = await getDays();
  return days.map((d) => ({ date: d.date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { date } = await params;
  const day = (await getDays()).find((d) => d.date === date);
  if (!day) return { title: "Not found — Campaign / Sitrep" };
  return {
    title: `${monthLabel(day.date)} ${dayNumber(day.date)} · ${day.theme}`,
    description: day.tldr ?? `${day.us} — ${day.iran}`,
  };
}

export default async function DayPage({ params }: { params: Promise<Params> }) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const { days, phases } = await getSitrep();
  const index = days.findIndex((d) => d.date === date);
  if (index === -1) notFound();

  const day = days[index];
  const prev = index > 0 ? days[index - 1] : undefined;
  const next = index < days.length - 1 ? days[index + 1] : undefined;
  const phase = phaseForDate(phases, date);
  const accent = phase?.accent ?? "amber";
  const sourceIndex = buildSourceIndex(day);
  const stamp = `${dayNumber(day.date)} ${monthLabel(day.date)} ${day.date.slice(0, 4)}`;

  const events = [...(day.events ?? [])].sort(
    (a, b) => (b.significance ?? 0) - (a.significance ?? 0),
  );

  return (
    <main>
      <header className="masthead">
        <div className="nav-line">
          <Link className="brand" href="/" aria-label="Back to campaign timeline">
            <span className="brand-mark">◉</span>
            <span>CAMPAIGN / SITREP</span>
          </Link>
          <div className="status"><i /> DAY REPORT <span>{stamp}</span></div>
        </div>
      </header>

      <section className="report">
        <div className="report-crumbs">
          <Link href="/">← CAMPAIGN TIMELINE</Link>
          <span className="report-crumbs-right">
            <span>{phase ? `PHASE ${phase.number} · ${phase.title}` : "UNPHASED"}</span>
            <Link href={`/research/${date}`} className="pow-link">PROOF OF WORK ↗</Link>
          </span>
        </div>

        <article className={`day-card single ${day.tempo}`}>
          <div className="date-block">
            <span>{monthLabel(day.date)}</span>
            <strong>{dayNumber(day.date)}</strong>
            {day.night && <small>{day.night}</small>}
          </div>
          <div className={`timeline-node ${accent}`} aria-hidden="true"><span /></div>
          <div className="day-content">
            <div className="day-heading">
              <h3>{day.theme}</h3>
              <span className={`tempo ${day.tempo}`}><i />{day.tempo === "pause" ? "PAUSE" : `${day.tempo.toUpperCase()} TEMPO`}</span>
            </div>
            <div className="signal-grid">
              <div className="signal">
                <span className="mark" aria-hidden="true">✦</span>
                <div><span className="eyebrow">U.S. ACTIVITY</span><p>{day.us}</p></div>
              </div>
              <div className="signal effects">
                <span className="mark" aria-hidden="true">⌖</span>
                <div><span className="eyebrow">EFFECTS / METRICS</span><p>{day.effects ?? "—"}</p></div>
              </div>
              <div className="signal iran">
                <span className="mark" aria-hidden="true">◈</span>
                <div><span className="eyebrow">IRAN ACTIVITY</span><p>{day.iran}</p></div>
              </div>
            </div>
          </div>
        </article>

        {day.tldr ? <p className="report-note">{day.tldr}</p> : null}

        {events.length > 0 ? (
          <div className="report-section">
            <h4>EVENTS · BY SIGNIFICANCE</h4>
            {events.map((e, i) => (
              <div className="event-row" key={i}>
                <div className="event-time">{e.time ?? "—"}</div>
                <div>
                  <p className="event-title">
                    {e.actor ? <span className="event-actor">{e.actor} — </span> : null}
                    {e.title}
                    {e.confidence ? (
                      <span
                        className={`conf-dot conf-${e.confidence}`}
                        title={`Confidence: ${e.confidence}`}
                      />
                    ) : null}
                    {e.significance ? <span className="sig-chip">SIG {e.significance}</span> : null}
                  </p>
                  {e.summary ? <p className="event-sum">{e.summary}</p> : null}
                  {(e.sources?.length ?? 0) > 0 ? (
                    <div className="src-links">
                      {(e.sources ?? []).map((u) => (
                        <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                          [{sourceIndex.get(u) ?? "?"}] SOURCE
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {(day.sources?.length ?? 0) > 0 ? (
          <div className="report-section">
            <h4>SOURCES</h4>
            <ol className="src-list">
              {(day.sources ?? []).map((s, i) => {
                let host = s.url;
                try {
                  host = new URL(s.url).hostname.replace(/^www\./, "");
                } catch {}
                return (
                  <li key={s.url}>
                    <span>[{String(i + 1).padStart(2, "0")}]</span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title ?? host}
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}

        {day.dossier ? (
          <details className="dossier">
            <summary>RAW RESEARCH DOSSIER</summary>
            <pre>{day.dossier}</pre>
          </details>
        ) : null}

        <nav className="pager">
          {prev ? (
            <Link href={`/day/${prev.date}`}>← {monthLabel(prev.date)} {dayNumber(prev.date)} · {prev.theme}</Link>
          ) : (
            <span>CAMPAIGN START</span>
          )}
          {next ? (
            <Link href={`/day/${next.date}`}>{monthLabel(next.date)} {dayNumber(next.date)} · {next.theme} →</Link>
          ) : (
            <span>LATEST REPORT</span>
          )}
        </nav>
      </section>
    </main>
  );
}
