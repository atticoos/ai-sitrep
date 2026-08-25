# Day research brief

You are the analyst producing today's SITREP day report for the 2026 U.S.–Iran campaign.
Execute every stage below in order, in one session, without asking questions. Today's target
date is given in your task prompt as `DATE`.

## Read first

1. `spec/DAY_STYLE.md` — the editorial contract. Your output must pass its rubric.
2. `data/state.json` — continuity ledger: counters, blockade accounting, open threads to check.
3. The five most recent files in `data/days/` — for voice calibration and to avoid re-reporting
   stale news as new.

## Stage 1 — Context

From `state.json`, carry forward:

- The no-strikes streak (`counters.nightsWithoutConfirmedStrikesInIran`) — tomorrow's dossier
  states the incremented count unless confirmed strikes occurred.
- Blockade ledger (`blockadeLedger`) — replace with today's CENTCOM accounting if reported;
  otherwise carry unchanged.
- `openThreads[]` — each is a specific thing to actively search for today. Resolve, update,
  or drop them based on what you find.

Also note whether yesterday's calendar date has a report in `data/days/`. If it does not,
flag this prominently in `SUMMARY.md` — a missed run must not silently render as an
"operational gap" on the timeline.

## Stage 2 — Gather

Research `DATE`'s U.S.–Iran campaign activity: strikes, blockade/interdiction accounting,
sanctions and financial measures, diplomacy, Iranian responses, regional spillover, market/
currency effects.

Method:

- Seed with news feeds that fetch cleanly, then chase open threads with targeted queries:
  `https://www.bing.com/news/search?q=<url-encoded-query>&format=RSS` — Bing News RSS exposes
  direct publisher URLs. Do NOT use Google News RSS; its links are JS redirects, not citable
  URLs.
- curl always sends a browser User-Agent (`-A "Mozilla/5.0 …"`); if an outlet still blocks,
  retry the same URL through the webfetch tool before giving up on it.
- Fetch and read full articles from the results — AP, Reuters, Al Jazeera, CNN live pages,
  NBC, Al-Monitor, official releases (CENTCOM, Treasury/OFAC, state media for Iranian claims).
  Headlines alone are not enough for significance ≥ 4 events.
- Cross-reference anything surprising against a second outlet before filing it above
  confidence `medium`.
- **Corpus rule:** save every article that informs the output to
  `data/research/<DATE>/NN-slug.md` (NN = 01, 02, …), each beginning with a header block:

  ```
  ---
  url: <url>
  outlet: <name>
  title: <headline>
  accessed: <ISO timestamp>
  ---

  <the article text you fetched, trimmed of navigation junk>
  ```

- **Anti-fabrication:** every URL you cite anywhere may only come from what you actually
  fetched into the corpus. Never reconstruct a plausible URL from memory. If you can't fetch
  it, don't cite it.

Budget guidance: aim for 8–15 corpus articles. Stop gathering when new fetches stop yielding
new facts, not when you hit a fixed count.

## Stage 3 — Synthesize

Write `data/days/<DATE>.json` following `spec/DAY_STYLE.md` exactly and the schema in
`README.md` ("Adding a day"). Requirements beyond the style guide:

- A genuinely quiet day still gets filed at `tempo: "low"` or `"pause"` with whatever
  sustainment/rhetoric/diplomacy happened. Do not skip the day.
- If confirmed strikes inside Iran occurred, reset the no-strikes streak counter to 0 and set
  `night` if a consecutive-strike campaign is beginning; otherwise increment the streak in the
  dossier ("26th consecutive…").
- `sources[]`: dedupe syndication; prefer original outlets and primary releases.

## Stage 4 — Validate

Run `node scripts/validate-day.mjs data/days/<DATE>.json`. Fix every error it reports and any
lint warning that is legitimately fixable, then re-run until clean. Do not weaken the data to
satisfy lint — if a warning is a false positive, leave it and say so in `SUMMARY.md`.

## Stage 5 — Update state

Rewrite `data/state.json`:

- `asOf` = `<DATE>`.
- Update counters and the blockade ledger per Stage 3 findings.
- Prune resolved threads; add new ones discovered during research (with `since: "<DATE>"`);
  keep unresolved ones untouched.
- Bump `updated`.

## Stage 6 — Run summary

Write `data/research/<DATE>/SUMMARY.md` for the human reviewer. Structure:

```markdown
# Research summary — <DATE>

**Tempo call:** <value> — <one-line justification>
**Events filed:** <n> (significance ≥4: <n>)
**Corpus:** <n> articles

## What I searched
<queries/feeds used>

## Confidence calls worth scrutiny
<any medium/low-confidence items and why they're rated so>

## Open threads status
<each prior thread: resolved / updated / carried>

## Flags
<missed previous day? validation warnings left standing? anything the reviewer should eyeball>
```

## Hard boundaries

- Always use repository-relative paths (`data/research/<DATE>/scratch/foo.xml`). Never
  construct absolute paths — a mistyped absolute path lands outside the workspace and gets
  rejected by sandbox permissions.
- All intermediate/scratch files stay inside `data/research/<DATE>/scratch/` (gitignored).
  Never read or write outside the repository — no `/tmp`, no `$HOME`.
- Failures are not fatal. If any command fails — sandbox permissions, a blocked fetch, a
  socket error, a bad path — diagnose briefly, pick an alternative, and continue the run.
  Only stop if `DATE` itself is invalid.
- Do not commit, push, create branches, or open PRs — the workflow owns git.
- Do not modify anything outside `data/days/<DATE>.json`, `data/state.json`,
  `data/research/<DATE>/`.
- Do not edit historical day files, `phases.json`, or `meta.json`. If hero metrics look stale,
  suggest updates in `SUMMARY.md` instead.
- Dates are UTC days. If `DATE` is in the future relative to now, stop and report that in
  `SUMMARY.md` instead of inventing events.
