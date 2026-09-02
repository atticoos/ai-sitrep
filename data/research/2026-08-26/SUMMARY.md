# Research summary — 2026-08-26

**Tempo call:** medium — the Hormuz reopening question advanced from rhetoric to a concrete Iran–Oman corridor blueprint (routing, exclusions, 30–60-day permanent plan) while confirmed strikes inside Iran stayed paused for a 27th consecutive night; the action remained economic/diplomatic/maritime.

**Events filed:** 10 (significance ≥4: 3)
**Corpus:** 8 articles

## What I searched

- Bing News RSS seeds (scratch/*.xml): `rss-aug26`, `rss-hormuz`, `rss-iran-sanctions`, `rss-centcom` (+retry), `rss-nbc` (+retry), `rss-netanyahu`, `rss-ofac`, `rss-oil-halt`, `rss-respond`, `rss-rial` (+retry), `rss-shishah-id`, `rss-tanker` (+retry), `rss-toi` (+retry), `rss-aj` (×3) — targeting the corridor talks, CENTCOM accounting, OFAC/Outcast follow-through, oil-halt threat, tanker/UKMTO follow-ups, rial, and Iranian responses.
- Full-article fetches filed to corpus 01–08: CNN Aug 26 live page, USA Today (Reuters Hormuz accord), Mint liveblog, CNBC TV18 liveblog, Yahoo (AP Trump "very big victory"), Yahoo (Daily Beast NBC intel-damage), TradeWinds (Greek tanker), TOI liveblog.
- Follow-ups: UKMTO site and CENTCOM feed for the Ash Shishah/tally threads; Al Jazeera liveblog, MSN shells (UPI/Al Jazeera), Times Union (AP), The Hill, US News attempted — blocked (JS shells, 403, timeout).

## Confidence calls worth scrutiny

- **NBC intel-damage report (medium):** single originating outlet (via Daily Beast syndication), four anonymous sources, no official confirmation — Pentagon declined comment. Filed at significance 4 precisely because it's unconfirmed; treat as claim, not fact.
- **Rubio "no new strikes for now" (medium):** Axios single-origin, carried on wires; corroborates the pause but covers no sanctions steps.
- **Barron Trump state-TV threat (medium):** sourced via liveblogs; Secret Service "aware" is per Reuters attribution, not a direct statement.
- **TradeWinds Greek-tanker ID (thread 5, not filed as event):** paywalled headline/standfirst only, single outlet — vessel name/flag unconfirmed.
- **Timing hedges baked into the day file:** Gharibabadi's routing detail is "late Tuesday" (UTC-straddling); the Araghchi UN letter is Wednesday per CNN but "published on Thursday" per the Reuters wire (treated as Wednesday, flagged); Netanyahu's speech was late-Tuesday Israel time with an Aug 27 IST stamp in Mint; the AP/Yahoo live page was updated after Aug 26 — only Aug-26-or-earlier items used.

## Open threads status

Prior threads — none resolved, all carried:
1. Treasury bank designation "by end of week" (Aug 24) — **carried**; only Outcast follow-through was the Bessent–Bahrain call; no designations. Watch Fri Aug 28.
2. Xi–Trump meeting vs Chinese-bank sanctions (Aug 24) — **carried/updated**: CSIS's Kagan (AP) says rollout avoided China specifics to protect the summit; Beijing held its line; still no Chinese banks named.
3. Bessent "broad array" of countries (Aug 24) — **carried**; no new country cut ties.
4. Iran halt-all-oil-exports threat (Aug 24) — **carried**; no escalation; Hormuz "remains closed" re-affirmed.
5. Ash Shishah tanker (Aug 25) — **carried/updated**: TradeWinds IDs a Greek tanker (paywalled, single outlet); no attribution/claim/tow update.
6. CENTCOM tally 71 vs carried 70 (Aug 25) — **carried/unresolved**: no new CENTCOM accounting; ledger unchanged at 70/3/2.
7. Pakistan mediation round two (Aug 25) — **carried/updated**: "significant progress" reported from Munir's talks; no round two announced; Qatar PM to visit Tehran Thursday.

New threads added (since 2026-08-26): Iran–Oman corridor formalization; Qatar PM Tehran visit (Aug 27) + Pezeshkian–Putin SCO Bishkek (Sept 1); Barron Trump threat follow-up; NBC intel-damage official response; southern-route friction/enforcement (HAANA deterrence, STS loads, mine-laying warning).

## Flags

- **Previous-day check:** 2026-08-25 report exists in `data/days/` — no missed-run flag.
- **Validation:** clean — 0 schema errors, 0 lint warnings on `data/days/2026-08-26.json`.
- **Fetch failures (non-fatal):** centcom.mil (Akamai) — the 71-vs-70 tally remains unverified against the primary; The Hill (403 curl + webfetch); US News (timeout ×2); Times Union (JS shell); MSN shells; Al Jazeera liveblog JS-rendered; TradeWinds body paywalled; UKMTO page fetched but yielded little beyond 120-26 context.
- **Dossier-only item:** an NBC piece (Aug 30, no URL captured) calling Sunday's Houthi-claimed strike the "first military action in a month" is used as soft corroboration for the streak only — not citable, not in sources[].
- **Hero metrics:** no new official CENTCOM cumulative target figure — `cumulativeTargetsStruck` stays at the "300+" floor.
