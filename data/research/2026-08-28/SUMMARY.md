# Research summary — 2026-08-28

**Tempo call:** medium — active non-kinetic pressure with no confirmed strikes: Treasury's first Outcast financial-institution package, first CENTCOM tally since Aug 21 (70→82 redirected), and an open/closed claims battle over the strait.
**Events filed:** 7 (significance ≥4: 1)
**Corpus:** 12 articles

## What I searched

- Seed + chase via Bing News RSS (`https://www.bing.com/news/search?q=<query>&format=RSS`), 17 queries: iran sanctions; Strait of Hormuz; Iran sanctions Treasury bank; Bessent Iran; CENTCOM Iran blockade; Iran Oman Hormuz corridor; Banque Misr UAE; Kuwaiti tanker tow; Iran rial oil exports; Iran Qatar mediation; IRGC "decisive control"; oil prices settle; Iran war six months; mediators reopening Hormuz; tanker transits pre-war; CENTCOM vessels redirected boarded; Trump "biggest oil deal".
- Full articles fetched into corpus 01–12: Arab Times, JNS, Moneycontrol ×3, CNBC, Mehr News, OilPrice.com, Crypto Briefing, The Peninsula (QNA), NPR, Al Jazeera six-month feature. Scratch feed XMLs in `scratch/`.
- Blocked or unusable: Politico, USNI News, NYT (403/Cloudflare via curl **and** webfetch); MSN syndications are JS shells; no CNN Aug 28 live page (URL attempt 404'd); Al Jazeera's Aug 28 liveblog body is JS-gated (headline-only — used for day scope and to date the IRGC statement, not filed as a corpus article).

## Confidence calls worth scrutiny

- **CENTCOM tally 82/3/2 (event 2, `medium`):** single QNA-carried report of CENTCOM's Friday X-post — no second outlet independently reproduced the 82/3/2 text. Indirect corroboration only: Crypto Briefing's independent 75-diverted claim earlier Friday and a Sep 1 follow-up (84) bracketing the figure.
- **IRGC Navy "decisive control" statement (event 4, `medium`):** Mehr's full-text page is stamped Aug 29 07:14 Tehran (03:44 UTC) but Al Jazeera's Friday Aug 28 UTC live page carried the statement — filed as Aug 28 UTC evening. Day-of evidence for the exact wording is headline-only (AJ liveblog is JS-gated).
- **Crypto Briefing (corpus 03):** editorial-team outlet — used only for Kpler export figures (~260k bpd August) and tally corroboration, never as sole source for anything sig ≥4.
- **Kpler transit-count revision:** Thursday's count printed as 5 in early preliminary data (filed in the Aug 27 report) and revised to 7 in Friday's preliminary print — same UTC Thursday; 10-day average (15) unchanged.
- **Timing straddles, all flagged in the dossier:** Trump's Axios interview was Thursday (UTC-straddling), carried as Friday's framing (Moneycontrol published Fri 19:20 IST); the Venezuela-deal write-up published Aug 29 16:02 IST; CNBC's weekly wrap published Thu EDT/updated Sat but its settle figures are Friday Aug 28's.
- **No fresh Aug 28 rial print found** — the record low above 2M/USD stands from Aug 27; the day file cites no rial event.

## Open threads status

Resolved (pruned from state.json):
1. **Treasury financial-institution designation "by end of week"** — RESOLVED: FinCEN NPRM against Banque Misr UAE + OFAC sanctions on Bank Melli Dubai manager Taeedi and Kameng Trading (HK); no Chinese FI touched.
2. **Verify CENTCOM tally 71 vs 70** — RESOLVED: official Friday release shows 82/3/2; Crypto Briefing's interim 71 (Aug 24) and 75 (Aug 28) were not CENTCOM's.

Carried untouched in state.json (unresolved, per brief):
3. **Xi–Trump meeting / Chinese banks** — carried; Friday's package hit UAE/Egypt/HK periphery, no Chinese institution listed.
4. **Bessent's "broad array" of followers** — carried; no new country cut trade ties.
5. **Iran's halt-all-oil-exports threat** — carried; no action (exports ~260k bpd per Crypto Briefing).
6. **Tanker strikes (Ash Shishah name, Kuwaiti tow/salvage, UKMTO follow-ups)** — carried; no Aug 28 movement.
7. **Pakistan round two / Qatar channel** — carried; no new round announced.
8. **Iran–Oman corridor formalization** — carried; no announcement (DBS cites corridor talks as a risk-premium factor; a Palestine Chronicle headline — unfetched, headline-only — says "Iran Agrees Hormuz Route with Oman, Says Full Reopening Depends on US").
9. **Pezeshkian–Putin at SCO Bishkek** — carried; summit Aug 31–Sep 1, prep coverage only.
10. **NBC intel-damage report** — carried; no confirmation/denial found.
12. **Rezaei conditions list** — carried; still reported "being drafted".
13. **DOJ prize courts** — carried; no condemnation filings found.

Updated in substance but text kept untouched per the brief (new datapoints live in the day dossier):
11. **Southern-route friction / transits vs flows** — updated: Trump/Axios 20–30 tankers nightly claim, ≥50 ships/night by mid-Sept target, Windward 6 tankers (3 dark), Kpler 7 transits.

New threads added (`since: "2026-08-28"`):
- **FinCEN finalization** of the Banque Misr UAE special measure + Egyptian/UAE central-bank responses.
- **US–Venezuela oil deal implementation** (SPR replenishment, reported OPEC exit, legal challenges).
- **US strike resumption watch** — Aug 30-dated feed headlines show strikes resuming (outside window; confirms the pause held through Aug 28–29).

## Flags

- **Missed previous day?** No — `data/days/2026-08-27.json` exists; Aug 28 follows a continuous run.
- **Validation:** clean — 0 schema errors, 0 lint warnings; nothing left standing.
- **Source-quality caveat:** with Politico/USNI/NYT blocked and CNN's Aug 28 live page not found, some events rest on regional/syndication outlets (Moneycontrol, Arab Times, QNA via The Peninsula) rather than the usual top-tier pair — the sig-4 Treasury event does have multi-outlet backing (JNS, Moneycontrol, Arab Times).
- **Hero metrics stale:** `data/meta.json` shows CONSECUTIVE NIGHTS 13 (now 29) and VESSELS REDIRECTED 70+ (now 82). Not edited per hard boundaries — reviewer should update.
- **Streak nuance:** the 29 count is corroborated negatively (no strike reporting in corpus/feeds) plus Aug 30-dated headlines calling the Aug 30 exchange the end of a "weeks-long lull" — outside-window evidence, noted in the dossier.
- **Commits:** none made in stages 5–6 (task prompt does not enable them). Corpus 01–12 and the day report were committed during stages 2–4; `state.json` and this SUMMARY are left uncommitted.
- **AJ Aug 28 liveblog** (fetched, JS shell, day-scope only): https://www.aljazeera.com/news/liveblog/2026/8/28/iran-war-live-tehran-prepares-conditions-to-open-strait-of-hormuz
