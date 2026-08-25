# Research summary — 2026-08-25

**Tempo call:** medium — Outcast day two stayed pressure-led: a tanker disabled by an unknown projectile near Hormuz, Tehran vowing retaliation, Beijing pushing back formally; no strikes inside Iran.
**Events filed:** 7 (significance ≥4: 2)
**Corpus:** 10 articles

## What I searched

Bing News RSS seeds: `Iran sanctions`, `Iran`, `Strait of Hormuz`, `CENTCOM Iran`, `Bessent Iran`, `Iran oil exports`, `Pakistan Iran mediation`. Follow-on queries: `UKMTO tanker struck Oman`, `tanker struck Strait of Hormuz`, `"Operation Economic Outcast"`, `State Department sanctions Iran petroleum petrochemical`, `CENTCOM vessels redirected`, `Munir Tehran visit`, `Iran bank designation Treasury`, `Xi Trump meeting`. Full-text fetches: TWZ, Anadolu, Mint live blog, JPost Aug 25 live page, CNBC TV18, AOL/Reuters markets wire, Indian Express live blog, Crypto Briefing, ABC explainer, Reuters Aug 25 retaliation wire (via webfetch after curl was blocked). MSN wrappers (Reuters/JPost syndications) are JS-walled even via webfetch — original outlets used instead.

## Confidence calls worth scrutiny

- **Tanker strike attribution** — event itself is high (UKMTO advisory echoed by Anadolu/NDTV/TASS/Mint/TWZ), but actor is filed as `Iran (attributed)`: UKMTO assigned no blame; TWZ's "extremely likely" is analysis, not confirmation. No Iranian claim found in the window.
- **Event timing** — UKMTO 120-26 issued late Monday US Eastern / early Tuesday Gulf local per NDTV ("early Tuesday") and Mint ("Tuesday local time"); it straddles the UTC boundary and was not in yesterday's report. Filed as `overnight` under Aug 25 with the caveat recorded in the dossier. Treat exact minute as approximate.
- **Hegseth kinetic warning** — sourced to JPost's live page (Reuters byline) plus Indian Express's Pentagon-signal line; I could not open the standalone JPost article (only headline+summary visible on the live page), hence kept at significance 3 rather than higher.
- **Murphy item (sig 2, medium)** — his own X thread relayed via Indian Express only; claims like "US has run out" of munitions are the senator's characterization, not verified.
- **Netanyahu assassination claim** — left out of events entirely: single-source (his Channel 14 call), Israel-track rather than campaign; noted in dossier.

## Open threads status

- Bank designation "by Friday Aug 28" — carried (no movement expected before Fri).
- Xi–Trump complicates action on Chinese banks — updated context: China's FM formally rejected the campaign; banks still unnamed. Thread kept.
- Bessent "broad array" of countries following UAE — carried (no new country named).
- Iran halt-all-oil-exports threat — carried (reiterated in rhetoric, not executed).
- OFAC compliance fights / vessel incidents — **resolved**: tanker struck near Ash Shishah ~a day after the guidance. Replaced by a thread to identify the vessel/attribution.
- Pakistan mediation follow-up — **resolved**: Munir's one-day visit concluded (met Pezeshkian/Araghchi); replaced by watch-for-round-two thread.
- New: verify CENTCOM tally (Crypto Briefing says 71 diverted vs ledger's 70).

## Flags

- **Early-window run:** executed at ~03:20–03:55 UTC, ~3.5 hours into the target day. The report covers the overnight boundary plus the early Asia session; US daytime/evening developments for Aug 25 will land in tomorrow's run. Not an operational gap — but this file should be read as an incomplete-day snapshot.
- Previous calendar date (2026-08-24) has a report in `data/days/` — no missed-day flag needed.
- **centcom.mil blocked** (Akamai Access Denied): blockade ledger carried unchanged at 70/3/2; the 71-diverted claim rests on Crypto Briefing alone and is parked as an open thread rather than written into the ledger.
- Bloomberg robot-walled (both the Munir wrap and the China analysis); both facts corroborated via Mint's live blog and Reuters, which are cited instead. Reuters' Aug 24 live blog had expired entries at fetch time.
- Validation: clean — 0 schema errors, 0 lint warnings; none left standing.
- Hero metrics (`data/meta.json`) not touched per boundaries; if any reference the streak or blockade tally, they may need a bump alongside tomorrow's merge.
