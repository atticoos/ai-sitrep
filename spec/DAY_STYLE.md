# Day report style guide

The editorial rubric for `data/days/YYYY-MM-DD.json`. Distilled from the strongest recent day
reports (e.g. 2026-08-24, 2026-08-22). Every day report — human or automated — should read like
it belongs next to those. The research brief (`spec/RESEARCH_BRIEF.md`) and the lint in
`scripts/validate-day.mjs` both enforce this file.

## Voice

- Scannable in seconds. Fragments over sentences in grid fields; prose only where prose earns its place.
- Specifics over narrative: numbers, names, hours, jurisdictions. "Sanctions announced" is weak; "~60 designations across five jurisdictions" is right.
- Absences are facts. When the expected thing didn't happen ("no countries named", "no Chinese banks touched", "little market reaction"), say so — it's often the story.
- No editorializing beyond the tempo call and significance scores. Attribute claims; hedge unconfirmed ones.
- Never state as fact what a single source claims without dropping confidence or adding "(attributed)" / "reportedly".

## Grid fields

### `theme`

2–6 words. Often quotes the day's defining phrase: `'Operation Economic Outcast'`, `Mutual pause`,
`Maritime retaliation`. Lowercase sentence style unless quoting.

### `tempo`

| Value | Means | Examples |
|---|---|---|
| `high` | Kinetic strikes on Iran, major escalation | Jul 7 maritime retaliation, Jul 28–29 missile exchange |
| `medium` | Active non-kinetic pressure: sanctions rollouts, blockade tightening, visible diplomacy | Aug 24 sanctions launch |
| `low` | Routine sustainment: blockade accounting, ISR, posturing, rhetoric | Most of mid-August |
| `pause` | Mutual lull, no new packages either side | Jul 24–25 |

### `us` / `effects` / `iran`

Three signal columns. Each is 1–5 terse fragments joined by `" · "` — never full sentences, no
trailing periods. Sentence case.

- `us`: platforms/actions ("Precision strike assets", "Bessent launches the economic campaign at Treasury")
- `effects`: quantified outcomes, numbers first ("~60 designations · Five lifelines on notice · Bank sanction promised by Friday"; "80+ targets · 60+ IRGC small boats · Air defenses · C2")
- `iran`: response/posture ("Madanizadeh: Tehran 'fully prepared' · Araghchi dismisses bluster")

### `night`

Only during consecutive strike campaigns: `"NIGHT 01"` … `"NIGHT 13"`. Omit otherwise — do not
invent night counts for non-strike periods; the no-strikes streak lives in `dossier` and
`data/state.json`.

## `tldr`

One paragraph, 2–4 sentences. Leads with the most consequential fact, includes concrete numbers,
and notes the notable absence if there is one. Reads like the single paragraph you'd wire to an
editor who has 15 seconds.

## `events[]`

Ordered by significance, highest first. Include only events that clear significance ≥ 2 — this is
a SITREP, not a news feed. Typical day: 5–10 events on active days, 2–5 on quiet days.

- `time`: `"~13:00"` (approximate ok, always flag with `~`), `"morning"`, `"afternoon"`,
  `"evening"`, `"overnight"`, or `"day"` when spread out.
- `actor` vocabulary: `US`, `Iran`, `Diplomacy`, or a named group (`Houthis`). Add
  `(attributed)` when attribution is unconfirmed: `"Iran (attributed)"`.
- `title`: one line, present tense, quotes the key phrase where one exists:
  `Bessent at Treasury: 'sever every economic lifeline… until Tehran stands alone'`.
- `summary`: 2–4 sentences. The specifics, the caveat, the context. This is where hedges live.
- `sources`: 1+ URLs per event; every event must cite what backs it.

### Significance rubric

| Score | Bar |
|---|---|
| 5 | Campaign-shaping. Changes the phase of the war or the story of record. |
| 4 | Major development with broad multi-outlet coverage. |
| 3 | Notable but not narrative-changing; routine-but-real pressure moves. |
| 2 | Context worth logging; minor moves, statements, delegations. |
| 1 | Do not file. |

### Confidence rubric

| Rating | Bar |
|---|---|
| `high` | Multiple independent top-tier outlets, or an official primary source (CENTCOM, Treasury, state TV broadcast). |
| `medium` | Single credible outlet, official-sourced but unconfirmed elsewhere, or partial attribution. |
| `low` | Unconfirmed, single anonymous sourcing, contested attribution. Use sparingly and say why in the summary. |

## `sources[]`

Day-level numbered list: `{ "title": "Outlet — Headline", "url": "..." }`. 4–8 typical.
Prefer the original over syndication (Reuters direct over "(Reuters)" republications); include
primary/official releases when they exist. Dedupe aggressively.

## `dossier`

Raw continuity notes — the analyst's scratchpad, collapsible on the day page. What goes here:

- Running counters: night streaks ("25th consecutive without confirmed strikes inside Iran"),
  blockade accounting ("70 redirected / 3 disabled / 2 boarded").
- Notable quotes from pressers/Q&As that didn't make event summaries.
- Open threads to watch tomorrow ("bank designation promised by Friday", upcoming leader meetings).
- Approximations flagged honestly ("no single Jul 24-dated account found, treat timing as approximate").

Mirror any counter that changed into `data/state.json`.

## Anti-patterns

- Editorial adjectives ("stunning", "unprecedented") — let facts carry weight.
- Significance 4+ backed by a single source.
- Vague attribution ("reports say") without a confidence drop or hedge.
- Inventing precision: ranges stay ranges (`~60`, `300+`), unknowns stay unknown.
- Duplicating syndicated copies in `sources[]`.
- Speculating about tomorrow's actions as if reported.
