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

Everything renders from a single versioned snapshot (`SitrepSnapshot` in lib/types.ts): `{ schemaVersion, generatedAt, days, phases, meta }`. Today it is compiled into the bundle at build time — the deployed Worker has no filesystem, so nothing reads `data/` at request time. Bad data still fails the build loudly with file + field. The planned research workflow will write the same envelope to KV; its only integration point is `getSnapshot()` in lib/data.ts.

Day pages prerender at build and also render on demand (unknown dates 404), so entries added without a rebuild will serve correctly once the workflow writes new snapshots.

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
      "id": "operation-economic-outcast",
      "number": "07",
      "title": "Operation Economic Outcast",
      "start": "2026-08-23",
      "accent": "violet",
      "summary": "'Economic D-Day' lands · Five lifelines on notice"
    }
  ]
}
```

- `number` is the display ordinal; phases render newest-first on the page.
- `accent`: `amber` `red` `blue` `orange` `green` `violet` (kinetic=red/orange, pause/talks=blue/green, siege=violet).
- `end` is optional: omit it on the **current** phase and it stays open-ended — every new day
  report automatically joins it, and the masthead renders `AUG 23—NOW`. When a real transition
  happens, set its `end` retroactively and start a new open-ended phase. Exactly one open-ended
  phase allowed; it must be the chronologically last. Closed phases require `end`.
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

## Research automation

The daily research pass is automated (prototype): a dispatched GitHub Action runs the agent
headless against `spec/RESEARCH_BRIEF.md`, files `data/days/YYYY-MM-DD.json` plus an updated
continuity ledger (`data/state.json`) and a source corpus (`data/research/YYYY-MM-DD/`), then
opens a PR for review.

- **CI:** Actions → "Daily research" → Run workflow with a date (defaults to yesterday UTC)
  and model (defaults to `openrouter/stealth/ox-alpha`). Provide whichever API key the chosen
  provider needs as a repo secret: `OPENROUTER_API_KEY` or `ANTHROPIC_API_KEY`.
  Re-running a date overwrites its branch/PR cleanly.
- **Local:** `npm run research -- 2026-08-25` (writes files only; no git operations). Uses
  whatever provider auth your local opencode already has; override with `RESEARCH_MODEL`.
- **Validate any day:** `npm run validate:day -- 2026-08-24` — schema gate + style lint from
  [spec/DAY_STYLE.md](spec/DAY_STYLE.md).

Merge the PR and deploy happens via the normal flow.

## Proof of work (research transcripts)

Every research run also captures each stage's **full agent transcript** — prompts,
thinking blocks, tool calls and outputs — as browsable "proof of work":

- Capture happens in `scripts/research-day.sh` (NDJSON events + `opencode export`
  per stage) under `data/research/<DATE>/scratch/sessions/`, which is gitignored —
  transcripts never enter the repo.
- The workflow uploads them to the **R2 bucket** (`us-iran-research`, bound as
  `US_IRAN_RESEARCH` — see `wrangler.jsonc`) via `scripts/upload-research-r2.sh`;
  resumed runs restore
  what's already there first (`scripts/restore-research-r2.sh`) so the day's
  manifest always covers all stages. Upload failures never fail the research job.
- The app serves them at **`/research`** (index) and **`/research/<DATE>`**
  (interactive viewer with expandable thinking + tool calls), reading straight
  from the R2 binding at request time; `/day/<DATE>` pages link to it.

### One-time setup

```sh
npx wrangler r2 bucket create us-iran-research
npm run cf-typegen          # regenerates cloudflare-env.d.ts with the US_IRAN_RESEARCH binding
```

Add repo secrets (Actions → Settings → Secrets): `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_API_TOKEN` with an R2-edit token scoped to the bucket.

### Local development

`next dev` binds to a local miniflare store (`.wrangler/state`). Seed it with any
transcripts you have on disk:

```sh
node scripts/build-research-manifest.mjs 2026-08-25   # if you ran research locally
npm run research:upload -- 2026-08-25 --local         # push into local R2
```

Backfill an older session by exporting it manually:
`opencode export <sessionID> > data/research/<DATE>/scratch/sessions/session-A.json`,
then build the manifest and upload.

## Develop & deploy

```sh
npm run dev        # local dev
npm run build      # static build (validates all data)
npm run preview    # build + preview on Cloudflare Workers locally
npm run deploy     # deploy to Cloudflare Workers via OpenNext
```

Day reports render from build-time data; only the proof-of-work pages read from
R2 at request time. No runtime environment variables needed.
