import Link from "next/link";
import {
  buildSections,
  dayNumber,
  diffDays,
  getMeta,
  getSitrep,
  monthLabel,
  phaseForDate,
  rangeLabel,
  type Intermission,
  type TimelineSection,
} from "@/lib/data";
import type { Accent, DayReport } from "@/lib/types";

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark" aria-hidden="true">{children}</span>;
}

function DayCard({ day, accent, featured }: { day: DayReport; accent: Accent; featured?: boolean }) {
  return (
    <article className={`day-card ${day.tempo}${featured ? " fresh featured" : ""}`}>
      <div className="date-block">
        <span>{monthLabel(day.date)}</span>
        <strong>{dayNumber(day.date)}</strong>
        {day.night && <small>{day.night}</small>}
      </div>
      <div className={`timeline-node ${accent}`} aria-hidden="true"><span /></div>
      <div className="day-content">
        <div className="day-heading">
          <div className="heading-stack">
            {featured && <span className="latest-tag"><i />LATEST SITREP</span>}
            <h3><Link href={`/day/${day.date}`}>{day.theme}</Link></h3>
          </div>
          <span className={`tempo ${day.tempo}`}><i />{day.tempo === "pause" ? "PAUSE" : `${day.tempo.toUpperCase()} TEMPO`}</span>
        </div>
        {featured && day.tldr ? <p className="featured-note">{day.tldr}</p> : null}
        <div className="signal-grid">
          <div className="signal">
            <Mark>✦</Mark>
            <div><span className="eyebrow">U.S. ACTIVITY</span><p>{day.us}</p></div>
          </div>
          <div className="signal effects">
            <Mark>⌖</Mark>
            <div><span className="eyebrow">EFFECTS / METRICS</span><p>{day.effects ?? "—"}</p></div>
          </div>
          <div className="signal iran">
            <Mark>◈</Mark>
            <div><span className="eyebrow">IRAN ACTIVITY</span><p>{day.iran}</p></div>
          </div>
        </div>
      </div>
    </article>
  );
}

function GapBlock({ gap }: { gap: Intermission }) {
  return (
    <div className="intermission" aria-label="Operational gap">
      <div className="intermission-label"><span>{gap.label.days}</span>{gap.label.month && <small>{gap.label.month}</small>}</div>
      <div className="intermission-line"><i /></div>
      <div><strong>OPERATIONAL GAP</strong><p>No publicly announced strike package or quantified activity</p></div>
    </div>
  );
}

function PhaseSection({ section }: { section: TimelineSection }) {
  const accent = section.phase?.accent;
  return (
    <section
      className={section.phase ? `phase is-past phase-${accent}` : "phase"}
      id={section.phase ? `phase-${section.phase.number}` : undefined}
      key={section.phase?.id ?? "unphased"}
    >
      {section.phase ? (
        <header className="phase-header">
          <div className="phase-number">PHASE {section.phase.number}</div>
          <div>
            <div className="phase-title-row">
              <h2>{section.phase.title}</h2>
              <span>{rangeLabel(section.phase.start, section.phase.end)}</span>
            </div>
            <p>{section.phase.summary}</p>
          </div>
        </header>
      ) : null}
      <div className="days">
        {section.entries.map((entry, i) =>
          entry.kind === "day" ? (
            <DayCard day={entry.day} accent={accent ?? "amber"} key={entry.day.date} />
          ) : (
            <GapBlock gap={entry.gap} key={`${entry.gap.label.days}-${i}`} />
          ),
        )}
      </div>
    </section>
  );
}

export default async function Home() {
  const [{ days, phases, latest }, meta] = await Promise.all([getSitrep(), getMeta()]);
  const sections = buildSections(days, phases);
  const statusStamp = latest ? `${dayNumber(latest.date)} ${monthLabel(latest.date)} ${latest.date.slice(0, 4)}` : "—";
  const currentPhase = latest ? phaseForDate(phases, latest.date) : undefined;
  const phaseDay = currentPhase && latest ? diffDays(currentPhase.start, latest.date) + 1 : 0;
  const liveSection = currentPhase
    ? sections.find((s) => s.phase?.id === currentPhase.id)
    : undefined;

  // Everything except the live phase reads as history; newest phases first,
  // unphased stragglers stay at the bottom.
  const history = [
    ...sections
      .filter((s) => s.phase && s.phase.id !== currentPhase?.id)
      .sort((a, b) => (b.phase?.start ?? "").localeCompare(a.phase?.start ?? "")),
    ...sections.filter((s) => !s.phase),
  ];

  if (!latest) {
    return (
      <main>
        <header className="masthead"><div className="nav-line"><a className="brand" href="#top"><span className="brand-mark">◉</span><span>CAMPAIGN / SITREP</span></a></div></header>
        <section style={{ maxWidth: 640, margin: "120px auto", padding: "0 24px" }}>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            No reports filed yet. Drop JSON files into{" "}
            <code>data/days/YYYY-MM-DD.json</code> — see the README.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <header className="masthead">
        <div className="nav-line">
          <a className="brand" href="#top" aria-label="Campaign timeline home">
            <span className="brand-mark">◉</span>
            <span>CAMPAIGN / SITREP</span>
          </a>
          <div className="status"><i /> ARCHIVE UPDATED <span>{statusStamp}</span></div>
        </div>
        <div className="hero" id="top">
          <div className="hero-copy">
            <span className="kicker">OPERATIONAL TIMELINE · {days.length} DAYS</span>
            <h1>U.S.–Iran<br /><em>Campaign</em></h1>
            <p>A concise, day-by-day record of military activity, operational effects and campaign tempo across the July–August 2026 theater. The current phase leads — earlier phases trace the build-up beneath it.</p>
          </div>
          <div className="metric-panel" aria-label="Campaign summary metrics">
            {meta.metrics.map((m) => (
              <div key={m.label}><span>{m.label}</span><strong>{m.value}{m.suffix && <span>{m.suffix}</span>}</strong></div>
            ))}
          </div>
        </div>
        <nav className="phase-nav" aria-label="Campaign phases">
          {[...phases].reverse().map((phase) => (
            <Link
              href={`#phase-${phase.number}`}
              key={phase.number}
              className={phase.id === currentPhase?.id ? "is-current" : undefined}
              aria-current={phase.id === currentPhase?.id ? "true" : undefined}
            >
              <span>{phase.number}</span>
              {phase.title}
            </Link>
          ))}
        </nav>
      </header>

      <section className="timeline" aria-label="Campaign activity timeline">
        {liveSection && currentPhase ? (
          <>
            <section className={`live-zone phase-${currentPhase.accent}`} id={`phase-${currentPhase.number}`}>
              <header className="live-head">
                <div className="live-meta-row">
                  <span className="live-row"><i className="live-dot" />LIVE</span>
                  <span>PHASE {currentPhase.number}</span>
                  <span>{rangeLabel(currentPhase.start, currentPhase.end)}</span>
                  <em>DAY {phaseDay}</em>
                </div>
                <h2>{currentPhase.title}</h2>
                <p>{currentPhase.summary}</p>
              </header>
              <div className="days">
                {liveSection.entries.map((entry, i) =>
                  entry.kind === "day" ? (
                    <DayCard
                      day={entry.day}
                      accent={currentPhase.accent}
                      featured={latest.date === entry.day.date}
                      key={entry.day.date}
                    />
                  ) : (
                    <GapBlock gap={entry.gap} key={`${entry.gap.label.days}-${i}`} />
                  ),
                )}
              </div>
            </section>

            {history.length > 0 ? (
              <>
                <div className="history-divider">
                  <strong>PRECEDING PHASES</strong>
                  <i aria-hidden="true" />
                  <em>THE BUILD-UP TO PRESENT</em>
                </div>
                {history.map((section) => (
                  <PhaseSection section={section} key={section.phase?.id ?? "unphased"} />
                ))}
              </>
            ) : null}
          </>
        ) : (
          [
            ...sections.filter((s) => s.phase).reverse(),
            ...sections.filter((s) => !s.phase),
          ].map((section) => <PhaseSection section={section} key={section.phase?.id ?? "unphased"} />)
        )}
      </section>

      <footer>
        <div><span className="brand-mark">◉</span><strong>CAMPAIGN / SITREP</strong></div>
        <p>Open-source operational summary · Times and activity reflect publicly announced information · Current through {statusStamp}</p>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}
