# Research summary — 2026-08-30

**Tempo call:** high — the month-long strike pause broke: first US kinetic action inside Iran since Jul 29 (Larak Island launchers) plus Iranian ballistic-missile retaliation at US bases in Jordan the same evening.
**Events filed:** 11 (significance ≥4: 3 — Larak strike, Jordan retaliation, Bessent weekly-sanctions cadence)
**Corpus:** 9 articles (01–09; 00-context and 10-notes are run files; the strike events are also backed by the pre-loaded proof corpus `data/research/2026-08-29/06–08`)

## What I searched

- Bing News RSS via curl (seed feeds): Larak, Jordan missiles, oil-export halt, Bishkek/MoU, Banque Misr, sanctions Aug 30, CENTCOM vessels, Hormuz Aug 30, Kharg — some queries rate-limited to 0 items, retried with simpler terms.
- firecrawl scrape (maxAge 0 where live): Fox Aug 30 live blog; Reuters ×5 (oil move, Bessent, Larak strike wire, SPR/Venezuela, Kharg/exchange wrap); AP Larak article; US News (Reuters IRGC wire); gCaptain (Kpler/UKMTO/CENTCOM); Crypto Briefing (Iranian counter-ledger).
- Known walls not re-attempted: centcom.mil (Akamai), NYT (paywall/Cloudflare), CNN liveblog (JS). MSN syndications treated as shells — publisher URLs used instead.
- All 14 prior open threads chased (statuses below).

## Confidence calls worth scrutiny

- **Larak casualties (3 killed per Tasnim; 2 IRGC Navy per Nournews)** — single-side Iranian sourcing; logged as a watch thread rather than filed as fact.
- **IRGC "heavy damage" at the Jordan bases vs US "nearly all intercepted, no significant impacts"** — contested; Iranian claim filed as attributed, US line is official.
- **Crypto Briefing's 30 vessels blocked / 45 tankers blacklisted** — single outlet, editorial aggregation → medium.
- **TankerTrackers 6.7M bpd** — single tracker (AIS + satellite), no second source.
- **CENTCOM 83/3/2** — official primary X post corroborated verbatim by gCaptain → high, despite the timestamp straddle (posted 9:16 PM ET Aug 30 = Aug 31 01:16 UTC, reads "As of Aug. 30"); filed as Aug 30.
- **Kharg "no attack took place"** — Reuters flat statement backed by Iran's denial and absence of evidence; Trump's post itself is high-confidence.

## Open threads status

- Xi–Trump / Chinese banks (08-24) — **updated**: Bessent's "Problem solved" on China-bank critics; still no Chinese institution listed; weekly bank-first cadence keeps it live.
- Bessent "broad array" of countries (08-24) — **carried**: no countries named; G20 Asheville (Aug 31–Sep 1) is the next venue.
- Iran oil-export halt threat (08-24) — **carried**: no halt declared; ~6.7M bpd still moving per TankerTrackers.
- Tanker strikes / al-Khasab (08-25) — **updated**: UKMTO 122-26 formalizes Saturday's strike; attribution and tow/salvage still unknown.
- Pakistan mediation / Islamabad MoU (08-25) — **carried**: nothing visible Aug 30.
- Iran–Oman Hormuz corridor (08-26) — **carried**: mediators still seeking reopening, "progress has stalled."
- Pezeshkian–Putin Bishkek (08-26) — **carried**: meeting still Sept 1.
- NBC intel-damage report (08-26) — **carried**: no confirmation/denial found.
- Southern-route friction (08-26) — **updated**: 5 visible transits/day weekend count; ~6.7M bpd per TankerTrackers; Larak strike tied to mine-rocket intel days after US mine clearance.
- Rezaei conditions list (08-27) — **carried**.
- DOJ prize courts (08-27) — **carried**: no filings found.
- FinCEN Banque Misr (08-28) — **carried**: no Federal Register publication found Aug 30.
- US–Venezuela deal (08-28) — **updated**: SPR "topping out" to "begin shortly" ("Gift from Venezuela").
- US strike resumption (08-29) — **resolved and pruned**: filed as Aug 30 events; streak reset to 0; replaced by five new watch threads (follow-up strikes/NIGHT counting, retaliation-wave scope, IRGC supertanker-mines claim, weekly sanctions cadence, Larak casualty tolls).

## Flags

- **Missed previous day: NO** — `data/days/2026-08-29.json` exists.
- **Validation:** `node scripts/validate-day.mjs data/days/2026-08-30.json` — clean, 0 schema errors, 0 lint warnings. No warnings left standing.
- **Late run / post-window filtering:** this run executed Sep 2 against DATE Aug 30. Monday–Tuesday reporting (Trump "hit them hard", Iran's UAE attacks, Vance's defense, CENTCOM 84, INTERTANKO, Pezeshkian–Modi, US "completes latest strikes") was actively excluded from events — the exclusion list lives in the day dossier and `10-notes-stage2-findings.md`; post-window items survive only as clearly labeled watch threads.
- **`night: "NIGHT 01"` is a judgment call** — CENTCOM's "limited, precise action" framing vs the pre-loaded "campaign begins Aug 30" guidance from the Aug 29 dossier/state thread. Counterweights are on record in the dossier; if no follow-up strikes materialize, NIGHT 02 never exists and the streak rebuilds from 0.
- **Hero metrics look stale** (suggested updates only, per the brief — not edited): `data/meta.json` shows CONSECUTIVE NIGHTS 13 (that streak ended Aug 30 — now 0/reset) and VESSELS REDIRECTED 70+ (now 83).
- **State-update interpretation note:** the brief says "keep unresolved ones untouched"; repo precedent (threads carrying "Updated <date>: …" clauses) was followed instead — the four threads marked UPDATED by the Stage 2 notes got additive clauses, carried threads verbatim, one resolved thread pruned, five new threads added with `since: 2026-08-30`. Revert if the stricter reading is intended.
- **No commits made** — task prompt did not enable per-item commits.
