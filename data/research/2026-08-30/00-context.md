# Stage 1 — Context carry-forward for DATE=2026-08-30

Written at run start from `data/state.json` (asOf 2026-08-29) and `data/days/`. Later stages
(synthesize/validate/state-update) must read this file plus the corpus below.

## Missed-prior-day check

`data/days/2026-08-29.json` EXISTS → no missed-run flag for the immediate prior calendar date.
No SUMMARY.md flag needed on this account.

## Counters carried forward

- `nightsWithoutConfirmedStrikesInIran`: **30** as of the Aug 29 report. **Aug 30 must RESET to 0** —
  confirmed US strikes occurred Sunday Aug 30 (two IRGC rocket launchers on Larak Island, Strait of
  Hormuz; first US military action since Jul 29). Proof corpus (pre-loaded, from the Aug 29 run):
  `data/research/2026-08-29/06-ap-first-action-month.md`,
  `data/research/2026-08-29/07-nbc-first-strikes-since-july.md`,
  `data/research/2026-08-29/08-ap-markets-first-action.md`.
- `night` guidance (Stage 3 call): state.json thread says set `night` if a consecutive-strike
  campaign is BEGINNING. The Aug 29 dossier explicitly said do NOT set night on Aug 29; the
  campaign begins Aug 30 → if Stage 3 judges the exchange to be a resumption of consecutive
  strikes, this is "NIGHT 01"; CENTCOM calls it a "limited, precise action" — weigh that.
- `cumulativeTargetsStruck`: "300+" (unchanged; CENTCOM last quantified Jul 11).

## Blockade ledger carried forward

`redirected: 82 / disabled: 3 / boarded: 2` — CENTCOM accounting "as of August 28" (QNA via The
Peninsula). Carry unchanged unless an Aug 30-dated CENTCOM accounting is found. Known post-window
data point: The Peninsula (Sep 1) reports 84 redirected — that belongs to a later day unless a
same-day Aug 30 release surfaces.

## Open threads to actively search today (from state.json, since dates in parens)

1. (08-24) Xi–Trump meeting vs secondary sanctions on Chinese banks — Trump coy Aug 27; no major
   Chinese institution listed.
2. (08-24) Bessent: 'broad array' of countries follows UAE in cutting trade ties — watch for names.
3. (08-24) Iran threatened to halt ALL oil exports in response to sanctions.
4. (08-25) Tanker strikes in the strait: Saturday Aug 29 al-Khasab strike (third of week) — watch
   attribution, tow/salvage, UKMTO follow-ups; Ash Shishah name; Kuwaiti tanker tow status;
   UKMTO SEVERE risk, IRGC harassment.
5. (08-25) Pakistan mediation round two / Islamabad MoU return; Qatar visible channel.
6. (08-26) Iran–Oman Hormuz corridor — 'reached' claim gated on US Islamabad MoU compliance; watch
   implementation, US reaction, IMO notification, corridor usage.
7. (08-26) Pezeshkian–Putin meeting at SCO Bishkek Sept 1, reported $25B nuclear MOU — pre-meeting
   news may land today.
8. (08-26) NBC intel-damage report (≥20 US sites, 8 countries, 2,000+ projectiles) — official
   confirmation/denial?
9. (08-26) Southern-route friction: mines/lanes, Kpler transit counts vs dark-trade gap, Saudi STS.
10. (08-27) Rezaei conditions list (up to $300B compensation) — formal list / US response.
11. (08-27) DOJ maritime prize courts — first condemnation filings.
12. (08-28) FinCEN Banque Misr UAE NPRM — Federal Register publication (30-day clock start).
13. (08-28) US–Venezuela oil deal implementation — SPR purchases, OPEC exit, challenges.
14. (08-29) **US strike resumption (PRIMARY):** US struck two IRGC rocket launchers on Larak
    Island Sunday Aug 30 — CENTCOM 'limited', first action since Jul 29; Iran retaliated, state TV
    showing ballistic-missile fire at US bases in Jordan (8 intercepted early Monday per Jordan);
    IRGC Gen. Hossein Mohebi: 'fatal mistake… during the economic war.' File as Aug 30 events;
    reset streak to 0.

## Voice notes from last five day files

- Tempo scale: medium = active non-kinetic pressure; high = kinetic strikes/escalation. Sunday's
  US strike + Iranian missile retaliation is the first kinetic exchange in a month — likely `high`,
  but Stage 3 decides (CENTCOM's 'limited' framing is a counterweight).
- Aug 28–29 pattern: no new CENTCOM accounting Aug 29; G20 Asheville Aug 31–Sep 1; refiners meeting
  reported for Sep 1. Aug 30 is a Sunday — thin official-calendar day except the strike exchange.
- Recurring sources that fetch cleanly: Fox live blog, Reuters, AP, Mehr, Iran International,
  Moneycontrol syndications, CNBC TV18/Mint/TOI liveblogs, Yahoo syndications of AP/Reuters.
- Known fetch walls: centcom.mil (Akamai), Politico/USNI/NYT (403/Cloudflare), CNN liveblog
  JS-gated, MSN shells. Bing News RSS via curl is the seed feed.
