# Research summary — 2026-09-01

**Tempo call:** high — the pause broke for the second time in three days and held: ~100 US targets struck across southern Iran (biggest exchange since July, NIGHT 02 opens), Iranian missiles/drones at US positions in four countries, WTI at a six-week high.
**Events filed:** 10 (significance ≥4: 4)
**Corpus:** 16 articles (+ `00-context.md` Stage 1/2 handoff)

## What I searched

- Bing News RSS seeds (curl): `iran-strikes`, `iran-hormuz`, `bessent`, `centcom` — scratch `*.xml`.
- Targeted Bing RSS follow-ups on the open threads: tanker-for-tanker, CENTCOM vessels redirected 84, INTERTANKO Hormuz, Putin–Pezeshkian, oil refiners White House, Bessent "asphyxiate", Iran sanctions bank OFAC, Chevron Venezuela sign, Banque Misr UAE, Bessent allies G20, CENTCOM blockade accounting, Chevron $7B, G20 statement China, Iran halt oil exports, prize court vessel seized, rosatom ($25B MOU).
- Articles fetched with firecrawl (markdown); syndication wrappers (MSN/Yahoo) labeled with the true outlet. Bing feed stamps were twice wrong (03, 04) — publication dates checked against article text before windowing.
- NYT (nytimes.com) is blocked by firecrawl ("we do not support this site") — its "Two More Oil Tankers Are Attacked" piece is not in corpus; substance covered via corpus 02/09.

## Confidence calls worth scrutiny

- **'Tanker-for-tanker' (sig 5, inside the strikes event):** Axios single-chain (via Newsmax), two Iranian government tankers struck in their engine rooms — filed explicitly marked "(single-chain via Axios; unconfirmed)". Not treated as an official cumulative and now tracked as its own thread.
- **Second tanker name "Senegal Prosperity":** single-chain via Newsmax citing shipping-intelligence/vessel-tracking firms; SIDR is operator-confirmed. No UKMTO bulletin in-window.
- **Kuhestak wedding strike (medium):** Iranian-side tolls only, contested and revised (5 incl. a child per deputy governor → 4: two women, two children aged 4 and 16, no explanation; wounded ≥63–68); Reuters could not independently verify. Filed as "4–5 killed (Iranian tolls revised)" with CENTCOM's denial alongside.
- **Blockade ledger: 84/3/2 NOT adopted.** The Peninsula (QNA) quotes no "as of" label and no second outlet confirms it; 83/3/2 carried unchanged as the last CENTCOM-labeled accounting. Expect tomorrow's run to check for a primary CENTCOM post.
- **Oil numbers:** MarketWatch/FactSet anchors WTI +5.2% to $90.22 (6-week high); Brent $94.55 +4.49% rests on The Punch via MSN rail; The Hill's intraday $92.50/$88 predates the settle — all attribute-per-outlet.
- **Transit-count claims:** Axios's US-official 15–20 tankers/night (~10M bpd) vs Kpler's preliminary 5 Monday vessels (no liquid tankers) vs Trump's "30 ships a night" — reported as competing claims, unreconciled.
- **Iranian damage/casualty claims** (Jordan hangars, US personnel killed, Erbil damage) — all unverified; US officials say no casualties; Al Jazeera flagged it could not verify.
- **FT-via-CNBC Russia supersonic anti-ship missile report** — single-chain, likely Sep 2-dated; deliberately NOT filed as an event; added as a verify thread.
- **$25B Rosatom–Iran nuclear MOU** — unconfirmed by any fetched Sep 1 coverage; kept in the Pezeshkian–Putin thread with that hedge.

## Open threads status

Resolved (pruned from state.json):
- **US refiners meeting** — RESOLVED: held Sep 1, Cabinet Room, ~a dozen executives (Delek, PBF, Marathon, Valero); RFS earful, Venezuelan-crude processing, Jones Act praise; no price-relief promise (filed as an event).
- **Venezuela pact signings this week** — RESOLVED post-window: Chevron signed Sep 2 ($7B, two more Orinoco fields, 600K bpd by 2031; NABEP granted DoD 35%); folded into the US–Venezuela implementation thread.

Updated (11):
- Xi–Trump/Chinese banks — G20 closed with no communiqué, China lone holdout; asphyxiation vow + BVI/freezes; still no Chinese institution listed.
- Tanker strikes in the strait — two MORE laden tankers hit overnight Aug 31→Sep 1 (SIDR + Senegal Prosperity); CENTCOM cites shipping attacks as trigger.
- Pakistan mediation — Sharif–Pezeshkian at SCO; Islamabad "remains engaged".
- Iran–Oman corridor — Pezeshkian's immediate-reciprocity offer; IRGC says closure "tightened"; deadlock stands.
- Pezeshkian–Putin — meeting held, readout quotes, SCO condemnation; $25B MOU still unconfirmed.
- Southern-route friction — INTERTANKO "not sufficient" landed; counts fight widened; mines-vs-projectiles is now a CENTCOM-vs-IRGC information war.
- US–Venezuela deal — refiners asked about Venezuelan crude; post-window Chevron signing absorbed here.
- Weekly secondary-sanctions cadence — no designations Sep 1; banks "expected to start this week"; next targets airlines/maritime/digital assets.
- WaPo Hegseth leak — Driscoll exit public; Army leaderless as strikes resume; bipartisan criticism.
- SIDR aftermath — second tanker named; no CENTCOM/UKMTO statement on SIDR; post-window Sep 2: Cacdac (remains + 14 survivors home, ~3,000 Filipinos still in the Gulf), Saudi MOFA condemnation.
- Trump "30 ships a night" — new US datapoints (15–20/night, ~10M bpd, >17M bbl exited) still don't reconcile with Kpler's 5.

Carried unchanged (7): Bessent "broad array" following UAE; Iran oil-export halt threat; NBC intel-damage report; Rezaei conditions list; DOJ prize courts; FinCEN Banque Misr NPRM; Larak casualty figures.

Added (since 2026-09-01, 5): 'tanker-for-tanker' precedent; Kuhestak wedding-strike fallout; FT Russia supersonic ASM report (verify); Gulf-states exposure (Kuwait hit, Qatar blames Iran); Treasury IRGC-asset-freeze implementation.

## Flags

- **Missed previous day: NO** — `data/days/2026-08-31.json` exists; no missed-run flag.
- **Validation:** `node scripts/validate-day.mjs data/days/2026-09-01.json` → 0 errors, 0 lint warnings; nothing left standing.
- **Timing straddle:** CENTCOM's "completed" statement is "Tuesday evening" US ET (~Sep 2 00:00–04:00 UTC) — the exchange straddles Sep 1→2 like Aug 30→31. The day is filed as Sep 1 with `night: "NIGHT 02"`.
- **Post-window Sep 2 items deliberately not filed as events** (kept out of the day JSON, folded into thread texts marked "post-window Sep 2" for tomorrow's run): Chevron $7B signing; IRGC two-tankers-hit-mines claim + CENTCOM "no ships have hit mines" denial (addresses mines, not projectiles, and predates SIDR's confirmation); rial record low 2.20M/USD (Sep 2 print — Hemmati's $2B pledge IS Sep 1 and sits in the day file's iran line); Bessent Fox & Friends "sever every tie"; Cacdac/Saudi MOFA statements; "Trump Strait" tease (unfetched).
- **Streak bookkeeping:** `nightsWithoutConfirmedStrikesInIran` reset to 0 and NIGHT 02 is open — if Sep 2 is strike-free, tomorrow's dossier states the rebuilt count of 1; if strikes continue, NIGHT 03 opens.
- No hero-metric staleness observed; nothing to suggest for `meta.json`/`phases.json`.
