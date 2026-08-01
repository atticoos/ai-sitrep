type Activity = {
  day: string;
  night?: string;
  theme: string;
  us: string;
  effects: string;
  iran: string;
  level: "high" | "medium" | "low" | "pause";
};

type Phase = {
  number: string;
  title: string;
  range: string;
  summary: string;
  accent: "amber" | "red" | "blue" | "orange";
  activities: Activity[];
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Initial maritime retaliation",
    range: "JUL 07—08",
    summary: "170+ targets struck · Hormuz security · IRGC naval capabilities degraded",
    accent: "amber",
    activities: [
      {
        day: "07",
        theme: "Maritime retaliation",
        us: "Precision strike assets",
        effects: "80+ targets · 60+ IRGC small boats · Air defenses · C2 · Coastal radar · Anti-ship missiles",
        iran: "3 commercial vessels attacked in the Strait of Hormuz",
        level: "high",
      },
      {
        day: "08",
        theme: "Follow-on degradation",
        us: "Precision strike assets",
        effects: "~90 targets · Air defenses · Coastal surveillance · Missile & drone storage · Naval capabilities · Logistics",
        iran: "No major quantified response announced",
        level: "high",
      },
    ],
  },
  {
    number: "02",
    title: "13 consecutive nights",
    range: "JUL 11—23",
    summary: "Sustained strike campaign · Command, missile, drone and coastal target sets",
    accent: "red",
    activities: [
      {
        day: "11",
        night: "NIGHT 01",
        theme: "Campaign surge",
        us: "Land-based fighters · Carrier aircraft · Naval vessels · Strike drones",
        effects: "~140 targets · Missile & drone sites · Naval assets · Ammunition · Communications · 300+ cumulative targets",
        iran: "Attacks on commercial shipping continue",
        level: "high",
      },
      {
        day: "12",
        night: "NIGHT 02",
        theme: "Drone-enabled maritime strike",
        us: "Fighters · Naval vessels · One-way aerial and sea drones",
        effects: "Dozens of targets · Air defenses · Coastal radar · Missile & drone capabilities · Small boats",
        iran: "Maritime threats and proxy pressure continue",
        level: "high",
      },
      {
        day: "13",
        night: "NIGHT 03",
        theme: "Geographic expansion",
        us: "Precision strike package",
        effects: "5-hour operation · Bushehr · Chabahar · Jask · Konarak · Abu Musa · Bandar Abbas · Coastal and maritime targets",
        iran: "Limited direct response",
        level: "medium",
      },
      {
        day: "14",
        night: "NIGHT 04",
        theme: "Blockade & escalation",
        us: "Fighters · Drones · Naval vessels",
        effects: "7-hour operation · Dozens of targets · Missile & drone sites · Naval assets · Coastal defenses · Blockade resumes",
        iran: "Cruise missiles reportedly strike 2 Emirati tankers",
        level: "high",
      },
      {
        day: "15",
        night: "NIGHT 05",
        theme: "Two-wave coastal attack",
        us: "Precision strike aircraft",
        effects: "90-minute morning strike on Greater Tunb · Evening strikes on C2 · Air defenses · Missile, drone and surveillance sites",
        iran: "Maritime confrontation continues",
        level: "medium",
      },
      {
        day: "16",
        night: "NIGHT 06",
        theme: "Combined air-sea strike",
        us: "Fighters · Drones · Warships",
        effects: "Dozens of targets · Coastal surveillance · Air defenses · Logistics · Maritime capabilities",
        iran: "Defensive posture",
        level: "medium",
      },
      {
        day: "17",
        night: "NIGHT 07",
        theme: "Regional counterattack",
        us: "Fighters · Drones · Warships",
        effects: "Underground storage · Logistics · Maritime targets · Command & control",
        iran: "Regional attacks · Strike on U.S. forces in Jordan",
        level: "high",
      },
      {
        day: "18",
        night: "NIGHT 08",
        theme: "Deadly escalation",
        us: "Precision strike package",
        effects: "Coastal surveillance · Air defenses · Maritime assets · Missile & drone depots · IRGC facilities",
        iran: "2 U.S. personnel killed · 1 missing after Jordan attack",
        level: "high",
      },
      {
        day: "19",
        night: "NIGHT 09",
        theme: "Retaliation for casualties",
        us: "Precision strike package",
        effects: "Command centers · Air defenses · Maritime assets · Launch sites · Communications",
        iran: "Regional pressure continues",
        level: "high",
      },
      {
        day: "20",
        night: "NIGHT 10",
        theme: "Pressure on shipping",
        us: "Precision strike package",
        effects: "Command centers · Missile launch sites · Maritime capabilities · Air defenses",
        iran: "Hormuz traffic falls to 4 commodity vessels per day",
        level: "medium",
      },
      {
        day: "21",
        night: "NIGHT 11",
        theme: "Sustainment infrastructure",
        us: "Precision strike package",
        effects: "Operations centers · Aircraft hangars · Drone storage · Logistics",
        iran: "Blamed for attacks on 30+ commercial vessels over previous months",
        level: "medium",
      },
      {
        day: "22",
        night: "NIGHT 12",
        theme: "Strike & blockade",
        us: "Precision strike package",
        effects: "Maritime capabilities · Missile & drone storage · Coastal surveillance · Air defenses",
        iran: "Blockade effects continue",
        level: "medium",
      },
      {
        day: "23",
        night: "NIGHT 13",
        theme: "Campaign culmination",
        us: "Precision strike package",
        effects: "Command centers · Drone storage · Communications · Coastal surveillance · Maritime capabilities",
        iran: "Pressure on regional shipping continues",
        level: "high",
      },
    ],
  },
  {
    number: "03",
    title: "Operational pause",
    range: "JUL 24—27",
    summary: "Kinetic pause · Naval blockade maintained · ISR and force protection",
    accent: "blue",
    activities: [
      {
        day: "24",
        theme: "Mutual pause",
        us: "No new strike package",
        effects: "Operational pause · ISR · Force protection · Naval blockade",
        iran: "Direct attacks pause",
        level: "pause",
      },
      {
        day: "25",
        theme: "Diplomatic space",
        us: "No new strike package",
        effects: "Naval blockade maintained",
        iran: "No major kinetic activity",
        level: "pause",
      },
      {
        day: "26",
        theme: "Pause holds",
        us: "No new strike package",
        effects: "Blockade continues · 12 ships redirected · 2 disabled · 2 boarded",
        iran: "No major kinetic activity",
        level: "pause",
      },
      {
        day: "27",
        theme: "Fragile lull",
        us: "Readiness operations",
        effects: "No major strike package",
        iran: "No major kinetic activity",
        level: "pause",
      },
    ],
  },
  {
    number: "04",
    title: "Renewed escalation",
    range: "JUL 28—31",
    summary: "Iranian missile attack · U.S. retaliation · Maritime pressure resumes",
    accent: "orange",
    activities: [
      {
        day: "28",
        theme: "Ceasefire collapse",
        us: "Missile defense · Regional force protection",
        effects: "Iranian ballistic missiles intercepted",
        iran: "Multiple ballistic missiles launched toward U.S. forces",
        level: "high",
      },
      {
        day: "29",
        theme: "Major retaliation",
        us: "Major CENTCOM strike package",
        effects: "~2-hour operation · Dozens of IRGC targets · Command · Missile & drone facilities · Coastal defenses · Maritime assets",
        iran: "Recovering from Jul 28 exchange",
        level: "high",
      },
      {
        day: "30",
        theme: "Regional spillover",
        us: "No additional overnight strike package",
        effects: "Blockade and regional operations continue",
        iran: "Drone strike at Damietta port · Attribution unconfirmed",
        level: "low",
      },
      {
        day: "31",
        theme: "Maritime pressure resumes",
        us: "No new strike package announced",
        effects: "Force posture maintained",
        iran: "Claims 2 ships struck · 4 turned back · Drones launched toward Kuwait and Bahrain",
        level: "medium",
      },
    ],
  },
];

const quietDays: Activity[] = [
  { day: "09", theme: "Operational gap", us: "No publicly announced major strike package", effects: "—", iran: "No major quantified activity", level: "low" },
  { day: "10", theme: "Operational gap", us: "No publicly announced major strike package", effects: "—", iran: "No major quantified activity", level: "low" },
];

function Mark({ children }: { children: React.ReactNode }) {
  return <span className="mark" aria-hidden="true">{children}</span>;
}

function DayCard({ activity, phase }: { activity: Activity; phase: Phase["accent"] }) {
  return (
    <article className={`day-card ${activity.level}`}>
      <div className="date-block">
        <span>JUL</span>
        <strong>{activity.day}</strong>
        {activity.night && <small>{activity.night}</small>}
      </div>
      <div className={`timeline-node ${phase}`} aria-hidden="true"><span /></div>
      <div className="day-content">
        <div className="day-heading">
          <h3>{activity.theme}</h3>
          <span className={`tempo ${activity.level}`}><i />{activity.level === "pause" ? "PAUSE" : `${activity.level.toUpperCase()} TEMPO`}</span>
        </div>
        <div className="signal-grid">
          <div className="signal">
            <Mark>✦</Mark>
            <div><span className="eyebrow">U.S. ACTIVITY</span><p>{activity.us}</p></div>
          </div>
          <div className="signal effects">
            <Mark>⌖</Mark>
            <div><span className="eyebrow">EFFECTS / METRICS</span><p>{activity.effects}</p></div>
          </div>
          <div className="signal iran">
            <Mark>◈</Mark>
            <div><span className="eyebrow">IRAN ACTIVITY</span><p>{activity.iran}</p></div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="masthead">
        <div className="nav-line">
          <a className="brand" href="#top" aria-label="Campaign timeline home">
            <span className="brand-mark">◉</span>
            <span>CAMPAIGN / SITREP</span>
          </a>
          <div className="status"><i /> ARCHIVE COMPLETE <span>31 JUL 2026 · 2359Z</span></div>
        </div>
        <div className="hero" id="top">
          <div className="hero-copy">
            <span className="kicker">OPERATIONAL TIMELINE · 25 DAYS</span>
            <h1>U.S.–Iran<br /><em>Campaign</em></h1>
            <p>A concise, day-by-day record of military activity, operational effects and campaign tempo across the July 2026 theater.</p>
          </div>
          <div className="metric-panel" aria-label="Campaign summary metrics">
            <div><span>CONFIRMED TARGETS</span><strong>300<span>+</span></strong></div>
            <div><span>CONSECUTIVE NIGHTS</span><strong>13</strong></div>
            <div><span>CAMPAIGN PHASES</span><strong>04</strong></div>
            <div><span>IRGC BOATS DESTROYED</span><strong>60<span>+</span></strong></div>
          </div>
        </div>
        <nav className="phase-nav" aria-label="Campaign phases">
          {phases.map((phase) => <a href={`#phase-${phase.number}`} key={phase.number}><span>{phase.number}</span>{phase.title}</a>)}
        </nav>
      </header>

      <section className="timeline" aria-label="Campaign activity timeline">
        {phases.map((phase, index) => (
          <section className={`phase phase-${phase.accent}`} id={`phase-${phase.number}`} key={phase.number}>
            <header className="phase-header">
              <div className="phase-number">PHASE {phase.number}</div>
              <div>
                <div className="phase-title-row"><h2>{phase.title}</h2><span>{phase.range}</span></div>
                <p>{phase.summary}</p>
              </div>
            </header>
            <div className="days">
              {phase.activities.map((activity) => <DayCard activity={activity} phase={phase.accent} key={activity.day} />)}
              {index === 0 && (
                <div className="intermission" aria-label="Operational gap July 9 to July 10">
                  <div className="intermission-label"><span>09—10</span><small>JUL</small></div>
                  <div className="intermission-line"><i /></div>
                  <div><strong>OPERATIONAL GAP</strong><p>{quietDays.length} days · No major publicly announced strike package or quantified activity</p></div>
                </div>
              )}
            </div>
          </section>
        ))}
      </section>

      <footer>
        <div><span className="brand-mark">◉</span><strong>CAMPAIGN / SITREP</strong></div>
        <p>Open-source operational summary · Times and activity reflect publicly announced information</p>
        <a href="#top">RETURN TO TOP ↑</a>
      </footer>
    </main>
  );
}
