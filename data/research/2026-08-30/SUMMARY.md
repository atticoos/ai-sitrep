# Research summary — 2026-08-30

**Tempo call:** high — the month-long lull broke in both directions: the first acknowledged US strike inside Iran since late July (two IRGC launchers on Larak Island) and same-day Iranian ballistic-missile/drone retaliation on two US air bases in Jordan.
**Events filed:** 9 (significance ≥4: 3)
**Corpus:** 12 articles

**MISSED RUN: no 2026-08-29 day report exists on disk — see Flags before reading the timeline.**

## What I searched

Bing News RSS via curl (18 queries, XMLs in `scratch/feed*.xml`): seeded general feeds (`iran-general`, `strikes`) plus targeted queries — Larak Island strike (×2), CENTCOM strike statement, CENTCOM vessels-redirected blockade tally, Iran missiles Jordan / US forces, Hormuz mine + UKMTO warnings, tanker Strait of Hormuz, Iran sanctions Bessent, Iran vows retaliation US strike, oil prices Iran strike, Iran oil exports halt, Iran–Oman Hormuz corridor, Qatar Iran mediation Hormuz, Pezeshkian–Putin Bishkek, Xi–Trump summit Iran sanctions, Iran June truce terms offer. Articles fetched via firecrawl scrape (markdown); MSN JS-shell links avoided. Missed-run catch-up folded into the corpus: Cooper's mine-clearance announcement (Task & Purpose) and the Khasab tanker strike (dpa/UKMTO 122-26).

## Confidence calls worth scrutiny

- **CENTCOM blockade ledger 83/3/2 — medium.** Single official post (CENTCOM X, edited 9:16 PM Aug 30) carried only via the Fox live blog; no second outlet corroborated the tally.
- **Larak casualty names (Hamid Avazzadeh, Ali Fayazi) — single-outlet.** Crypto Briefing citing Iranian state media; the same outlet calls the strike a "drone strike" while US officials say launchers were struck — platform unconfirmed. The event itself is high confidence (CENTCOM on record); the names are hedged inside the event summary.
- **IRGC MQ-9 shootdown claim over the strait — NOT filed as an event.** Single source (JPost via Yahoo), unconfirmed; logged in the dossier and open threads only.
- **Timing/wording straddles:** Trump's Kharg post is late Sunday ET → early Aug 31 UTC, and wording differs (CNBC: "going to be blown to smithereens!" vs The Hill: "been blown to smithereens!!!"); Jordan's 8-intercept announcement is dated Monday local (Fox/Jordan state TV date the attacks Sunday UTC); CENTCOM's "act of aggression" rebuttal is timestamped 12:57 AM Aug 31 but refers to Sunday's action. All filed with the straddle noted.
- **UAE items excluded:** The Hill's Al Minhad strike claim (Fars-only), the UAE drone intercept over territorial waters, and the UAE FM "dangerous escalation" quote are Aug 31 — handed to the next report as an open thread rather than filed as Aug 30 events.
- **Morung's "Aug 19" Outcast-launch date** conflicts with the corpus's Aug 24 — ignored.

## Open threads status

- **US strike resumption (since 08-28): RESOLVED** — strikes began Aug 30 (Larak); pruned from state.json.
- **Tanker strikes in the strait (08-25): UPDATED** — Khasab (UKMTO 122-26) is the week's third strike; still no names or attribution on any of the three.
- **Pakistan mediation / Qatar channel (08-25): UPDATED** — Qatar says efforts "intensifying," no "tangible result" yet.
- **Southern-route friction (08-26): UPDATED** — TankerTrackers counts 6.7M bpd crossing the blockade line; UKMTO: traffic "reduced… slight increase," harassment continues; the IRGC mine-redeployment plot triggered the Larak strike.
- **Xi–Trump / Chinese banks (08-24): carried** — no new designations Aug 30; Bloomberg: China defiant, Bank Melli Gulf branches open.
- **Bessent "broad array" followers (08-24): carried** — none named; pledge now "weekly, banks first."
- **Iran halt-oil-exports threat (08-24): carried** — no action.
- **Iran–Oman corridor (08-26): carried** — no Aug 30 movement found.
- **Pezeshkian–Putin Bishkek (08-26): carried** — summit is Aug 31–Sep 1, outside this window.
- **NBC intel-damage report (08-26): carried** — no movement found.
- **Rezaei conditions list (08-27): carried** — no movement found.
- **DOJ prize courts (08-27): carried** — no filings found.
- **FinCEN Banque Misr finalization (08-28): carried** — no movement found.
- **US–Venezuela implementation (08-28): carried** — Fox segment only, no implementation news.
- **Added (since 2026-08-30):** US strike campaign / Kharg threat; Iran's retaliation round(s) in Jordan and possible widening; UAE front verification (Al Minhad claim).

## Flags

- **MISSED RUN: no 2026-08-29 day report exists on disk.** Aug 29 was NOT an operational gap — the day's activity was caught up in this run's corpus (Cooper's mine-clearance announcement, carried Aug 28–29; the Khasab tanker strike, incident time 20:53 UTC Aug 29 per UKMTO, confirmed Sunday Aug 30, where it is filed). Timeline rendering of Aug 29 should reflect the missed run, not silence.
- **state.json mirrored per the day dossier:** asOf → 2026-08-30; no-strikes streak reset 29 → 0 (confirmed strikes at Larak); blockade ledger 82 → 83 redirected (3 disabled / 2 boarded unchanged); "US strike resumption" thread pruned; 3 threads updated, 11 carried untouched, 3 added.
- **Validation clean:** `node scripts/validate-day.mjs data/days/2026-08-30.json` — 0 schema errors, 0 lint warnings; nothing left standing.
- **Stage-2 next-day leads (Sep 1 — NOT filed as Aug 30 events):** further US strikes ("NIGHT 02"?), Iranian attacks widening to Gulf states and more US bases, a reported Saudi Bahri tanker hit with seafarers killed, Putin–Pezeshkian meeting held, Iran's offer to honour June truce terms. Tomorrow's session should open with these.
- **Gaps:** no CNN/NYT Aug 30 live page fetched (paywall/404 risk); no fresh rial print Aug 30; Bloomberg body paywalled (takeaways only, filed as 09); Fox's Aug 29 live page seen in feeds but unfetched — would deepen the Aug 29 catch-up if ever needed.
- **Hero metrics:** no manual edits suggested — the streak reset flows from state.json and the day file already carries NIGHT 01.
