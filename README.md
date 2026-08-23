# U.S.–Iran Campaign / Sitrep

A concise operational timeline of the 2026 U.S.–Iran campaign — day-by-day activity, effects and tempo, grouped into semantic phases. Built to be scanned in seconds, not a news feed.

The design brief and editorial philosophy live in [spec/SAMPLE_ACTIVITY.md](spec/SAMPLE_ACTIVITY.md) (phases + table format) and the confidence/source guidance below.

## Architecture

```
data/days/YYYY-MM-DD.json   one file per reported day (the signal-grid card)
data/phases.json            phase structure (number, range, accent, summary)
data/meta.json              hero metrics
lib/                        loaders + validation + grouping
app/page.tsx                renders everything from data
app/day/[date]/             per-day report page (events, sources, dossier)
scripts/suggest-phases.mjs  LLM draft of phases (optional)
```

Everything renders statically at build time from `data/`. Bad data fails the build loudly with file + field.

## Adding a day

Drop `data/days/2026-08-11.json`:

```json
{
  "date": "2026-08-11",
  "night": "NIGHT 04",
  "theme": "Blockade & escalation",
  "tempo": "high",
  "us": "Fighters · Drones · Naval vessels",
  "effects": "7-hour operation · Dozens of targets · Blockade resumes",
  "iran": "Cruise missiles reportedly strike 2 Emirati tankers",
  "tldr": "Optional longer prose for the day page.",
  "events": [
    {
      "time": "~14:00",
      "actor": "US",
      "title": "...",
      "summary": "...",
      "significance": 4,
      "confidence": "high",
      "sources": ["https://..."]
    }
  ],
  "sources": [{ "title": "Outlet name", "url": "https://..." }],
  "dossier": "optional raw research text, collapsible on the day page"
}
```

| Field | Required | Notes |
|---|---|---|
| `date` | yes | `YYYY-MM-DD`, must match filename; drives sort + intermission gaps |
| `theme` | yes | Card headline |
| `tempo` | yes | `high` `medium` `low` `pause` → tempo badge color |
| `us` / `effects` / `iran` | yes* | The three signal columns (*`effects` optional, renders `—`) |
| `night` | no | e.g. `NIGHT 04`, shown under the date block |
| `tldr` | no | Prose paragraph on the detail page |
| `events[]` | no | Detailed items for the day page (`significance` 1–5 sorts them; `confidence` high/medium/low dots) |
| `sources[]` / `dossier` | no | Numbered source list / collapsible raw text |

Calendar gaps of 2+ days between reports render automatically as **OPERATIONAL GAP** intermissions — just don't create files for those days.

## Phases

`data/phases.json`:

```json
{
  "phases": [
    {
      "id": "economic-siege",
      "number": "06",
      "title": "Economic siege",
      "start": "2026-08-11",
      "end": "2026-08-22",
      "accent": "violet",
      "summary": "Disabling fire · Indefinite blockade doctrine · Sanctions 'one-two punch'"
    }
  ]
}
```

- `number` is the display ordinal; phases render newest-first on the page.
- `accent`: `amber` `red` `blue` `orange` `green` `violet` (kinetic=red/orange, pause/talks=blue/green, siege=violet).
- Phases need not be contiguous; ranges may overlap gaps freely but must not overlap each other.

### Drafting phases with the LLM script

```sh
ANTHROPIC_API_KEY=sk-... npm run phases:suggest        # → data/phases.suggested.json
npm run phases:suggest -- --write                      # overwrite data/phases.json directly
MODEL=gpt-4o npm run phases:suggest                    # or OpenAI with OPENAI_API_KEY
```

Keys stay local — the script never runs in the deployed app.

## Hero metrics

`data/meta.json` holds the four masthead stats. Update them as the campaign moves.

## Develop & deploy

```sh
npm run dev        # local dev
npm run build      # static build (validates all data)
npm run preview    # build + preview on Cloudflare Workers locally
npm run deploy     # deploy to Cloudflare Workers via OpenNext
```

No runtime environment variables needed.
