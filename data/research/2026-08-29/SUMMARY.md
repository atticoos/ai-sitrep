# Research summary — 2026-08-29

**Tempo call:** medium — a third tanker in a week struck off al-Khasab and Iran's first "reached" claim on the Oman corridor (gated on the Islamabad MoU), plus the leadership's first acknowledgment of economic pain — but zero confirmed strikes inside Iran (streak 30) and no new US designations or CENTCOM accounting.
**Events filed:** 8 (significance ≥4: 2)
**Corpus:** 9 articles (plus 00-context.md carry-forward; items 06–09 are post-window Aug 30 — see Flags)

## What I searched

- Bing News RSS seeds (kept on curl per the brief): `iran strikes`, `strait of hormuz`, `iran sanctions`, `khamenei`, `tanker hormuz`, `CENTCOM iran`, `SCO bishkek`, `oil prices iran`, `venezuela oil deal`, `xi trump meeting` — scratch files: hormuz.xml, iran-strikes.xml, sanctions.xml, khamenei.xml, gulf.xml, corridor.xml, tanker.xml, centcom.xml, bishkek.xml, oil.xml, venezuela.xml, xitrump.xml.
- Uncached scrape (`maxAge` 0) of the Fox Aug 29 live blog — the day's richest rolling page (scratch: fox-live-0829.md, fox-extracts.txt).
- Targeted full-article fetches: Reuters economy piece, Iran International (Gharibabadi/Islamabad MoU), Independent/Reuters (Unity Week letter), dpa via Yahoo (UKMTO tanker), then AP (strike + markets), NBC, and Forbes (Aug 30) to prove the streak math and pre-load the Aug 30 handoff.
- NYT island headline probe returned only a stub (nyt-island.html); abandoned rather than reconstructed.

## Confidence calls worth scrutiny

- **Tanker strike (event 1, significance 4, medium):** single wire report (dpa) carrying UKMTO's X post; no attribution, no Iranian claim or denial; struck Saturday but UKMTO warned "late on Sunday" — filed to the occurrence day with the delay disclosed.
- **Gharibabadi "reached" claim (event 2, significance 4, medium):** Iran International citing Iranian media, carried by Fox; no independent confirmation of "reached," and CENTCOM maintains Iran does not control the strait.
- **Unity Week letter (event 5, medium):** landing date approximate — Economic Times syndication ran Aug 29, the Independent's Reuters bulletin Aug 30.
- **Events 6–8 (medium):** single-outlet provenance on the Fox live page (Nili dialogue comments, IMO 6,000-stranded figures, reported Sept 1 refiners meeting that the White House would not confirm).
- **Not filed:** teachers'-crackdown figures (15 dead, 78 arrested) — single-source via Fox Digital, "could not be independently verified"; Embassy Beirut Hezbollah-disarmament demand — X post via Fox only.
- **Post-window items 06–09** (AP strike, NBC, AP markets, Forbes, all Aug 30): filed deliberately to prove no strikes occurred Aug 29 and to hand the strike-resumption facts to the Aug 30 run — they are not Aug 29 events.

## Open threads status

1. Xi–Trump / Chinese banks — **carried** (no Aug 29 development; post-window Forbes note: Trump–Xi meeting listed for Sep 24, single source).
2. Bessent "broad array" of countries — **carried**.
3. Iran oil-export halt threat — **carried** (no formal halt announced; Iran's central bank per Forbes says exports have stopped, but the thread didn't move).
4. Tanker strikes in the strait — **updated** (week's third strike: al-Khasab, Aug 29, unknown projectile; UKMTO SEVERE, IRGC harassment continuing).
5. Pakistan mediation / Qatar channel — **updated** (Gharibabadi: Qatari and Pakistani visits aimed at returning to Islamabad MoU implementation).
6. Iran–Oman Hormuz corridor — **updated** (first "reached" claim, gated on the US honoring the Islamabad MoU; strait "remains closed").
7. Pezeshkian–Putin at SCO Bishkek — **carried** (summit material begins Aug 30–31, post-window).
8. NBC intel-damage report — **carried** (no confirmation/denial).
9. Southern-route friction — **carried** (no new enforcement incident; UKMTO traffic/route notes folded into the tanker thread).
10. Rezaei conditions list — **carried**.
11. DOJ prize courts — **carried** (no condemnation filings).
12. FinCEN Banque Misr NPRM — **updated** (Banque Misr and Egypt's central bank respond publicly; Federal Register publication still pending as of Aug 30).
13. US–Venezuela oil deal — **carried**.
14. US strike resumption — **resolved/pruned**: pause held through Aug 28–29 (streak 30). Replaced with a new thread (since: 2026-08-29) carrying the Aug 30 resumption facts (Larak Island rocket launchers, first US action since Jul 29; Iranian ballistic-missile retaliation at US bases in Jordan) and instructing the Aug 30 run to reset the streak to 0 and set `night` if the campaign is beginning.

State now: `asOf` 2026-08-29; streak 30; blockade ledger carried unchanged at 82 redirected / 3 disabled / 2 boarded (CENTCOM "as of August 28"); cumulative targets unchanged "300+".

## Flags

- **Missed previous day:** none — the 2026-08-28 report exists; no flag needed.
- **Validation:** `node scripts/validate-day.mjs data/days/2026-08-29.json` — 0 schema errors, 0 lint warnings; nothing left standing.
- **Aug 30 handoff is critical:** the streak hits 30 on Aug 29, but strikes resumed Sunday Aug 30 (Larak Island). The Aug 30 run must reset `nightsWithoutConfirmedStrikesInIran` to 0 — the instruction is encoded in the new state thread, and proof corpus items 06/07/08 sit in `data/research/2026-08-29/`.
- **Next CENTCOM blockade accounting** is expected Sep 1 (The Peninsula: 84 redirected — seen in the Bing feed, post-window, unfiled); the ledger was correctly left at Aug 28 figures.
- **Banque Misr NPRM comment clock** had not started as of Aug 30 (no Federal Register publication yet) — watch item, not a data conflict.
- **Attribution limits carried in the day file:** the al-Khasab strike and the "reached" claim are both medium-confidence single-source items; please eyeball those two events first.
- **Hero metrics:** none stale — cumulative "300+" unchanged, streak mirrored to state.
