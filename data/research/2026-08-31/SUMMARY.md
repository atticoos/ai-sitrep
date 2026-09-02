# Research summary — 2026-08-31

**Tempo call:** medium — the first exchange in a month stayed contained (no US strikes inside Iran, no new sanctions designations) but produced the tanker sequence's first confirmed fatalities (SIDR, two Filipino seafarers killed), a G20 economic-campaign push with EU backing, and Brent settling above $90.
**Events filed:** 10 (significance ≥4: 2 — SIDR fatal attack; Bessent G20 Outcast push)
**Corpus:** 21 articles

## What I searched

- Bing News RSS seeds via curl (kept in `scratch/`): `rss-seed1.xml` (US–Iran campaign/Hormuz/sanctions seed), `rss-sidr.xml` (Bahri SIDR / tanker attack), `rss-hegseth.xml` (Hegseth / Pentagon non-concurs). No Google News RSS per brief.
- Firecrawl scrapes (markdown; `maxAge` 0 on rolling pages — Guardian live blog, CNBC G20 live blog) of: Reuters day-wrap (keystone, published 05:40Z updated 21:51Z), Guardian live blog, CNN wrap, WaPo via MSN wrappers + the original WaPo Hegseth piece, CNBC G20 live, MarketWatch oil-settles, The Straits Times ×2 (SIDR; Banque Misr probe), CNA (IRGC supertanker-mines), Argaam (Bahri statement text), The Peninsula (CENTCOM 84 tally), Ahram (Bessent on Banque Misr parent), Oilprice + Reuters (Venezuela final pacts), TheStreet (equities), ThePrint (Modi–Pezeshkian), NSJ (CENTCOM mine denial / corridor), Arab Times (UAE denies Al Minhad hit), Yahoo/AP-CNN wrappers (true outlets labeled in file headers).
- Three sweeps under the resume rule: 01–14 first pass, 15–19 resume (SIDR, Venezuela pacts, Reuters keystone, equities), 20–21 second resume (original WaPo Hegseth fetch; Argaam corroboration of Bahri).
- Confirmed absences checked: no new OFAC designations Aug 31; no UKMTO update in-window; no CENTCOM tally with a confirmable 'as of Aug 31' label; no Aug 31-dated rial datapoint; no NBC intel-damage, prize-court, or Rezaei-list follow-up.

## Confidence calls worth scrutiny

- **SIDR fatal attack (significance 4, filed medium):** facts are double-sourced (Straits Times/AFP/Reuters + Argaam direct text of Bahri's statement), but attribution is unclaimed and contested — Bahri says only 'security incident', Marisks says 'unknown projectiles' on two tankers, and the IRGC's competing 'mines' claim landed Sep 2, post-window. Operator confirmation came Sep 2 via X, outside the window; filed as an in-window tail ('late on Aug 31') with explicit hedges.
- **WaPo Hegseth non-concurs (filed medium):** anonymous sourcing on a classified document. The story is Aug 30-dated (Bing stamp Sun Aug 30 10:27 GMT) — filed in the Aug 31 report with the dateline flagged because the Guardian carried the Pentagon's response that day; it had never been filed in the Aug 30 report.
- **Brent settle conflict:** Reuters (Aug 30) quoted +2.71% for Monday's settle; MarketWatch/FactSet (Aug 31) says +1.3% to the same $90.49 — contract-roll/attribution discrepancy. Filed per MarketWatch/FactSet with the conflict noted.
- **Trump inflation figure:** 300% (Truth Social, per Al Jazeera's quote of the post) vs '350 percent inflation' (WaPo's Oval Office quote) — attributed per outlet in the event text.
- **Blockade ledger:** The Peninsula's 84/3/2 was NOT adopted — published Sep 1 18:38 UTC with no quoted 'as of Aug 31' label; handed to Sep 1's run. Ledger carried 83/3/2.
- **CENTCOM 'No ships have hit mines' (Aug 31) vs the Sep 2 SIDR confirmation:** projectiles ≠ mines, and the dossier explicitly forbids asserting the Aug 31 single-supertanker claim was a garbled preview of SIDR — the tension is flagged, not resolved.

## Open threads status

18 carried in from asOf 2026-08-30 → 3 resolved/pruned, 9 updated, 6 carried untouched; 5 added (since 2026-08-31). Ledger now holds 20.

Resolved and pruned:

1. **US–Iran exchange follow-up** — resolved for Aug 31: no US follow-up strikes inside Iran; streak rebuilds 0→1 (mirrored into counters). The NIGHT-02 watch now lives in the counters note.
2. **Retaliation-wave scope** — resolved for Aug 31: Iran claimed 'dozens of explosive drones' toward Al Minhad; UAE denied the base was hit; Al Jazeera counts missiles at three airbases across UAE/Jordan, none reaching targets. Note: the UAE's 'full right to respond' is an implicit watch, no longer a tracked thread.
3. **IRGC supertanker-mines claim** — resolved as claim + CENTCOM denial ('This is FALSE'), vessel never named; substance folded into the tanker-strikes thread.

Updated (9): tanker strikes in the strait (supertanker-mines claim + denial; SIDR folded in); Xi–Trump/Chinese banks (Bessent–Pan call, 'all options', no listing); Islamabad MoU/Pakistan mediation (Pezeshkian: US 'has not fulfilled its commitments'); Iran–Oman corridor (Gharibabadi terms re-detailed; deadlock framing stands); southern-route friction (Trump '30 ships a night', CENTCOM Hawkins, UBS impact call); FinCEN Banque Misr (UAE 'special and urgent examination', parent spared, comment clock to Oct 1); US–Venezuela deal (final pacts on track, ~64B bbl per Reuters); weekly sanctions cadence (no package Aug 31, bank promised this week, EU welcomes Outcast); Larak casualties (IRNA/governor 'at least two' — third Iranian-side variant).

Carried untouched (6): 'broad array' of countries; Iran oil-export halt threat; Pezeshkian–Putin at SCO (meeting falls Sep 1 — still live); NBC intel-damage report; Rezaei $300B conditions list; DOJ maritime prize courts.

New threads (5, since 2026-08-31): Hegseth non-concurs / force sustainability and Patriot depletion; SIDR aftermath (attribution, second tanker, UKMTO/CENTCOM response); Trump '30 ships a night' vs transit counts; reported refiners meeting Sep 1; Venezuela pact signings this week.

## Flags

- **Missed previous day? No** — `data/days/2026-08-30.json` exists; no operational-gap flag needed.
- **Validation:** clean — `node scripts/validate-day.mjs data/days/2026-08-31.json` reports 0 schema errors, 0 lint warnings; nothing left standing.
- **Post-window items deliberately NOT filed** (next runs own them): Sep 1 — US strike wave on southern Iran, wedding strike, Bahrain/Jordan/Iraq attacks, 'biggest attack of them all', CENTCOM 84/3/2 tally, Gulf Times rial 2.2mn record low, G20 wrap + Bessent 'asphyxiate'; Sep 2 — IRGC 'two tankers hit mines' claim, Bahri SIDR confirmation. Sep 1's report will open mid-crisis; expect a sharp tempo jump from this medium day.
- **Weakest new thread:** the reported refiners meeting Sep 1 — the preview piece was never captured into corpus (only a related-item link), so the thread text is hedged and thin; next run should verify from its own fetches.
- **Corpus 21 exceeds the 8–15 guidance:** two resume sweeps closed genuine gaps (SIDR, Venezuela pacts, Reuters keystone, original WaPo Hegseth) — justified, not padding.
- **Hero metrics:** `cumulativeTargetsStruck` remains '300+' — no new official cumulative figure, so no update suggested.
- **Dateline quirk:** Ahram's page is datelined Sep 1 (remarks made on the Asheville sidelines Aug 31) — noted in the corpus header and the day file.
