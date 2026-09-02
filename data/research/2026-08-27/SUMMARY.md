# Research summary — 2026-08-27

**Tempo call:** medium — second commercial tanker hit in the strait this week, Qatar PM's first Tehran visit since the war began, and Tehran formally pricing reopening at up to $300B — but zero confirmed strikes inside Iran (28th consecutive night).
**Events filed:** 11 (significance ≥4: 3)
**Corpus:** 10 articles

## What I searched

- 21 Bing News RSS queries (saved in `scratch/q1–q21-*.xml`): "Iran Strait of Hormuz", "Iran sanctions", "Iran CENTCOM", "Iran Qatar prime minister Tehran", "UKMTO tanker Ash Shishah", "Iran oil exports halt", "Bessent Iran bank financial institution", "Iran Oman Hormuz corridor", "Barron Trump Iran bounty", "Iran conditions open Hormuz", "Kuwaiti tanker Hormuz tow", "CENTCOM vessels redirected blockade", "US Iran war live updates August 27", "Iran terms reopening Strait Hormuz Reuters", "Iran rial record low", `Iran sanctions "pure parody"`, "oil prices Brent August 27 Iran", "Rezaei conditions reopening Hormuz", "White House silent Iran Oman Hormuz warships", "timesofindia Iran war live blog Hormuz August 27", "Trump millions barrels Hormuz flowing".
- Full-article fetches filed to corpus (01–10): Fox live (Aug 27), CNN live (Aug 27), Doha News, A News, Crypto Briefing, SAMAA (Reuters), National Herald India (Reuters), Times Now, Rigzone (Bloomberg), TradeWinds (headline only — paywalled).
- Blocked/gated, not filed: NYT (DataDome), US News wire page, all MSN mirrors (JS wall), Al Jazeera liveblog body (JS-gated; title/standfirst only), Bloomberg originals and TradeWinds body (paywalls). centcom.mil unreachable directly in prior runs; no Aug 27 CENTCOM release surfaced via RSS either, so the ledger carries unchanged.

## Confidence calls worth scrutiny

- **Rezaei's $300B / $100B figures** — Crypto Briefing is the only filed source with the exact sums; the Reuters wires (SAMAA, National Herald) and A News confirm the conditions *list* itself. The day file rates the event high (multi-wire list); treat the precise dollar figures as medium until a wire repeats them.
- **Bessent/G20 "sever the economic leakage"** — single outlet (Fox) resting on a senior Treasury official plus a "source familiar"; rated medium.
- **DOJ prize courts** — Bloomberg-originated but filed only via Fox Business coverage; no primary DOJ document fetched; rated medium.
- **Trump Chinese-banks quote timing** — CNN's Aug 27 page once says he was vague "Friday"; the caption, surrounding posts and the Reuters wire place it in Thursday's Oval Office. Treated as Thursday; the dossier documents the wobble.
- **Kpler 5 transits vs ~7–8M bpd flows** (Vortexa 7-day ~10M) — dataset tension filed as the dark/shuttle-trade gap; Kpler count is preliminary (02:25 GMT, likely revised).
- **Barron Trump walk-back** — resolution rests on Rezaei's Al-Manar dismissal as reported by Fox (single filed outlet).
- **"Kuwaiti tanker may need tow"** — TradeWinds headline + pubDate only (paywalled body).

## Open threads status

1. Treasury bank designation "by end of week" — **updated** (not landed by Aug 27 night; G20 Asheville bilaterals Aug 31–Sep 1 revealed; still watching Fri Aug 28).
2. Xi–Trump meeting vs Chinese banks — **updated** (Trump: "Who said I'm not? You don't know if I'm doing it"; no major Chinese FI listed).
3. Bessent "broad array" of countries following UAE — **carried**.
4. Iran halt-all-oil-exports threat — **carried** (no new threat; Paknejad concedes sales "decreased to some extent" but "continued").
5. Ash Shishah tanker identification — **updated** (Monday vessel was Liberian-flagged per Fox, name still unknown; week's second strike — Kuwaiti tanker hit Wednesday, may need tow — folded into this thread; no attribution or Iranian claim/denial on either).
6. CENTCOM tally 71 vs 70 — **carried** (no Aug 27 release; ledger holds 70/3/2).
7. Pakistan mediation round two — **carried** (Qatar is now the visible channel).
8. Iran–Oman corridor formalization — **updated** (phased framework discussed with Qatar; central channel conditional on the US meeting Iran's conditions; WH unresponsive; fee dispute open).
9. Qatar PM al-Thani Tehran visit — **resolved** (happened Thursday: met Araghchi, Pezeshkian, Ghalibaf, Rezaei); the Pezeshkian–Putin SCO Bishkek half (Sept 1, reported $25B MOU) carried forward as its own thread.
10. Barron Trump state-TV threat — **resolved** (Rezaei publicly dismissed it as "a lie" on Al-Manar; pruned from the ledger).
11. NBC intel-damage report — **carried** (no confirmation, denial, or follow-up found).
12. Southern-route friction — **updated** (no new enforcement incident; Cooper: mines cleared, lanes open, "momentum building"; Kpler 5 transits vs 7–8M bpd flowing).

New threads added (since 2026-08-27): Rezaei's formal conditions list (exact sums single-outlet); DOJ prize-court revival (first condemnation filings, owner legal challenges).

## Flags

- **No missed run:** 2026-08-26 has a report in `data/days/`; the timeline is contiguous.
- **Retroactive-run note:** DATE was researched on Sep 2 (six days back). Later RSS headlines visible in search results — outside the Aug 27 window and not cited in the day file — indicate: the war resumed Sep 1 (so the streak's 28 is correct as of Aug 27); Treasury's bank designation landed Fri Aug 28 (UAE branches of an Egyptian bank); the next CENTCOM release (Aug 29) reports 82 redirected / 3 disabled, superseding the 71-vs-70 discrepancy. Left for the corresponding future runs to file; none of it is baked into the Aug 27 state.
- **Validation:** `node scripts/validate-day.mjs data/days/2026-08-27.json` — 0 schema errors, 0 lint warnings; nothing left standing.
- **Stale hero metric:** `data/meta.json` reads CONSECUTIVE NIGHTS = **13** vs the ledger's 28 as of Aug 27 (VESSELS REDIRECTED 70+, CONFIRMED TARGETS 300+, CAMPAIGN PHASES 07 are current). Suggest bumping CONSECUTIVE NIGHTS to 28 — not edited here per brief boundaries.
- CNN's Friday/Thursday wobble on the Chinese-banks quote is the only timing caveat carried into the dossier; everything else was cross-referenced across at least two outlets or rated accordingly.
