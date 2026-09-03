# Stage 1 (Context) handoff + Stage 2 (Gather) findings — DATE=2026-09-01

Stage 1 written at session start; Stage 2 findings appended below at end of gathering
(see "## Stage 2 findings" and "## Filing conventions"). Corpus = articles 01–NN in this
directory; scratch (RSS feeds) in `scratch/` (gitignored). Stop point: after Stage 2 —
no day JSON written, no state.json touched.

## Missed-day check

`data/days/2026-08-31.json` exists → yesterday's calendar date has a report, **no
missed-run flag** needed in SUMMARY.md.

## Carry-forwards from state.json (asOf 2026-08-31)

- **No-strikes streak = 1** (rebuilt 0→1 after a strike-free Aug 31, following the Aug 30
  Larak Island reset). Tomorrow's dossier states the incremented count — **2nd consecutive
  day without confirmed strikes inside Iran** — UNLESS confirmed strikes occurred Sep 1,
  in which case reset to 0 and open `night` at NIGHT 02. Leads handed off by the Aug 31
  run (post-window there, unverified here — must be confirmed by fetched sources): a
  reported US strike wave on southern Iran dated Sep 1, a possible "wedding strike",
  attacks on Bahrain/Jordan/Iraq, a "two tankers hit mines" IRGC claim, and G20-day-two
  Bessent remarks incl. an "asphyxiate" quote. Verify each before filing; do not carry
  them as fact.
- **Blockade ledger carried: 83 redirected / 3 disabled / 2 boarded** (CENTCOM, "as of
  Aug. 30"). Hand-off: The Peninsula (QNA), published Sep 1 18:38 UTC — CENTCOM
  "announced Tuesday" it had redirected 84 vessels, disabled 3, boarded 2 (Aug 31 corpus
  11) — but the piece quotes **no "as of" label**. Sep 1's run (this run) adopts 84/3/2
  only if a primary CENTCOM post or second outlet confirms the label; otherwise it stays
  post-window-approximate and 83/3/2 remains the last confirmed ledger. Watch item
  carried: Trump's "averaging 30 ships a night" escort claim vs Kpler's ~5 visible
  transits/day.
- **cumulativeTargetsStruck:** unchanged "300+" (floor; raise only with a new official
  cumulative figure).

## Open threads → what to search for on Sep 1

1. **Xi–Trump meeting complicates Chinese-bank sanctions** — G20 Asheville day two (Sep 1):
   Bessent remarks on China, any OFAC/FinCEN action naming a Chinese institution.
2. **'Broad array' of countries following UAE in cutting trade ties** — any newly named
   countries.
3. **Iran threatened to halt all oil exports** — any Iranian announcement implementing it.
4. **Tanker strikes in the strait** — SIDR attack (late Aug 31, two Filipino seafarers
   killed, confirmed Sep 2 by Bahri): Sep 1-window aftermath — attribution, second tanker
   (Marisks' unnamed vessel), UKMTO confirmation, CENTCOM statement, tow/salvage; prior
   strikes' status unchanged.
5. **Pakistan mediation round two / Islamabad MoU** — any Qatari/Pakistani follow-up or US
   engagement.
6. **Iran–Oman Hormuz corridor** — implementation, US reaction, IMO notification, corridor
   usage data.
7. **Pezeshkian–Putin meeting at SCO Bishkek (Sept 1)** — THE meeting is today; reported
   $25B nuclear-plants MOU — outcomes, quotes.
8. **NBC intel-damage report** (≥20 sites, 8 countries) — official confirmation/denial or
   original filing.
9. **Southern-route friction** — enforcement incidents, transit counts (Kpler/TankerTrackers
   vs Trump's 30/night), INTERTANKO "not sufficient" warning was to land Sep 1.
10. **Rezaei $300B conditions list** — formal list, US response.
11. **DOJ maritime prize courts** — first condemnation filings.
12. **FinCEN Banque Misr UAE NPRM** — Federal Register status, finalization, Egypt/UAE
    central-bank moves (comment clock runs to Oct 1).
13. **US–Venezuela oil deal implementation** — SPR replenishment purchases, OPEC exit.
14. **Weekly secondary-sanctions cadence** — Bessent promised another Iranian bank "this
    week"; first package of the new rhythm; G20 day two.
15. **Larak casualty figures** — independent tolls or official confirmation (Iranian-side
    variants: Tasnim 3 / Nournews 2 / IRNA ≥2).
16. **WaPo Hegseth leak (four-star non-concurs)** — follow-up reporting, official response,
    civil-military friction.
17. **SIDR aftermath** (own thread since Aug 31) — see 4.
18. **Trump "averaging 30 ships a night" escort claim** — reconcile vs next transit counts
    and CENTCOM accounting.
19. **US refiners meeting with administration Sep 1** — outcomes: crude purchases/SPR talk,
    price-cap or shipping arrangements.
20. **Venezuela pact signings this week** (Chevron, ONGC, GE Vernova, Eni, GeoPark) —
    signings, first SPR purchases.

## Stage 2 findings

Written 2026-09-03T00:35Z after gathering. Corpus: 16 articles (01–16). Scratch: Bing RSS
seeds in `scratch/*.xml`, decoded URLs in `scratch/decoded.txt`. NYT (nytimes.com) is
blocked by firecrawl ("we do not support this site") — NYT's Sep 1 "Two More Oil Tankers
Are Attacked" piece NOT in corpus; its substance is covered via corpus 02/09.

### Headline finding — the no-strikes streak RESETS

**Confirmed US strikes inside Iran on Sep 1** (multiple top-tier outlets: AP wire corpus 01,
AJ corpus 02, Reuters wrap corpus 05, Axios-via-Newsmax corpus 09) — the biggest exchange
since July (Reuters). CENTCOM said it completed a barrage against "air defense sites, radar
systems, maritime assets, mine-laying capabilities and communications" (corpus 01/05); Axios
put the operation at roughly 100 targets including two IRANIAN GOVERNMENT TANKERS struck in
their engine rooms off Iran's coast north of the blockade line — a new "tanker-for-tanker"
policy (corpus 09, single-chain via Axios; medium). Iranian media logged strikes on Sirik,
Konarak, Bandar Abbas, Jask, Asaluyeh, Ahvaz and Qeshm Island, the civilian Jiroft Airport
(projectile outside the runway, no damage), a fishmeal factory, a Sirik fishing pier and
PMO tower, and Hormozgan power-grid parts (corpus 01/02). **Stage 3: reset
nightsWithoutConfirmedStrikesInIran to 0 and open `night` at NIGHT 02** (per the
state.json counters note: strikes resumed → consecutive campaign resumes).
Trigger per CENTCOM/MarketWatch: Iran's overnight attacks on ships transiting the strait
(corpus 04 dek) and "recent attempted attacks" on shipping and US service members (corpus 03).

### Timeline (UTC, hedged — the exchange straddles Sep 1→2 like Aug 30→31 did)

- Overnight Aug 31→Sep 1: two laden tankers hit by unidentified projectiles within minutes
  of each other in the strait — Saudi-flagged SIDR and Liberian-flagged SENEGAL PROSPERITY,
  both carrying Saudi crude (corpus 09; Newsmax citing shipping intel/vessel trackers —
  names single-chain, medium). This is the Marisks "two tankers" claim with the second
  vessel now named. No attribution; no UKMTO bulletin captured.
- Sep 1 daytime: US strike wave (above); Iran retaliates: 13 ballistic missiles at Jordan
  (10 intercepted, 3 open ground — Jordan via corpus 01/03); IRGC claims Camp Titin and
  Prince Hassan AB (hangars with RQ-4/MQ-9; claims US personnel killed — US officials:
  no casualties, per corpus 02/05); drones at Bahrain's Sheikh Isa radar/airbase and at US
  positions; Kuwait's Ali Al Salem AB hit by missile+drone attack, drone-started residential
  blaze extinguished; IRGC claims Erbil repair-centre/warehouse/fuel-tank damage; UAE bases
  attacked per Iranian state media (corpus 07). All Iranian damage claims unverified (corpus 02).
- Sep 1 evening US ET: CENTCOM "completed" statement; Trump Truth Social — "I couldn't care
  less if they sign a worthless, to them, agreement… almost total control of the Hormuz
  Strait… When are the Iranian people going to rise up and fight?"; denied ABC report that
  strikes aimed at forcing Iran to the table; Fox call: struck rebuilt radars — "We waited
  until it was almost built and then we hit it"; warned of hits "at a much harder and higher
  level" if Iran retaliated (corpus 01/02/03).
- Iran: Mojtaba Khamenei — armed forces have "unforgettable lessons" in store (first message
  after the strikes, corpus 02); Zolfaghari (Khatam al-Anbiya): operations continue "until
  they regret their crimes"; Azizi: "these crimes will not go unpunished"; General Staff:
  "crushing and devastating blows"; IRGC: attacks "tightened" Iran's closure of the strait;
  MOFA: acting in self-defense (corpus 01/02/07). Kuwait framed it as "criminal Iranian
  aggression"; Qatar said it holds Iran responsible for attacks and their repercussions
  (corpus 05); Council of Arab Interior Ministers called the attacks on Kuwait, Jordan, UAE
  and Bahrain a "violation of international law" (corpus 07).
- CENTCOM Hawkins on the wedding strike: reports "originated from Iranian state media";
  "The U.S. military never targets civilians, unlike the IRGC" (corpus 01/05).

### Wedding strike (Kuhestak, Sirik County) — toll contested

US strike hit a home hosting a wedding: FIVE killed incl. a child per deputy Gov. Nafisi
same-day (corpus 01), revised to FOUR — two women, two children aged 4 and 16 — by IRNA/state
TV with no explanation (corpus 07); wounded ≥63–68 (variants: 63 corpus 02, "at least 68"
corpus 01/05/07); Reuters could not independently verify; location "Kuhestak"/"Kuhistik"
spelling varies (corpus 05/07). Iranian officials likened it to the war's first-night
girls'-school strike that killed 160 (Pentagon probe findings never released) (corpus 05).
Expect the "war crime" framing to develop Sep 2 (Yahoo/MSN pieces exist, not filed — see
below).

### Blockade ledger — 84/3/2 NOT label-confirmed; carry 83/3/2

No CENTCOM primary post and no second outlet confirming an explicit "as of" date was found
in any fetched source (targeted Bing sweep + the Aug 31 corpus 11 piece). The Peninsula
(QNA) remains the only source for 84/3/2, "announced Tuesday" (corpus on file from the Aug
31 run; re-verified Sep 1-dated). **Stage 3 decision:** either keep 83/3/2 as the last
confirmed ledger and treat 84 as QNA-reported/post-window approximate, or adopt 84/3/2 with
a "CENTCOM announced Tuesday per QNA; no 'as of' label captured" hedge. Do not present 84
as a CENTCOM-labeled accounting.

### Strait accounting vs Trump's "30 ships a night"

- Axios (via corpus 09): US officials say forces have been moving ~15–20 tankers through the
  southern corridor on many nights, ~10M bpd — roughly half prewar volume.
- Kpler preliminary (Reuters, via corpus 09): only FIVE vessels transited Monday Aug 31, no
  liquid tankers among them.
- Energy Secretary Chris Wright (Reuters, via corpus 05): >17M barrels of oil exited the
  strait Aug 31. CNN (unfetched, seen in syndication rail): "60 targets struck, 18M barrels
  of oil protected: The US military's record day" (Sep 2). The 30-ships-a-night claim
  remains unreconciled — the gap between US claims and Kpler's counts is still the story.

### Oil / markets (Sep 1 settles)

- Brent +4.49% to $94.55, WTI +5.18% to $90.20 (The Punch via MSN rail, corpus 12 footnote);
  MarketWatch (corpus 04): WTI Oct +5.2% to $90.22, highest in nearly six weeks, biggest
  daily gain since Jul 29 (FactSet) — the two agree on WTI. The Hill's intraday $92.50
  Brent/$88 WTI (corpus 06) predates the settle — attribute per outlet, use MarketWatch
  anchors. AP: crude up ~7% on the week (corpus 01). AAA gasoline $4.10/gal; diesel ~$6
  (Bloomberg corpus 12). Asian and European stocks tumbled (Reuters via corpus 05).
- Rial: Hemmati (CBI gov) said Tuesday Iran has sufficient FX reserves, ready to inject up
  to $2B to calm volatility, "collapse has never happened and will never happen… just
  psychological warfare" (corpus 14). The record-low print — 2.20M rials/USD, ~10% past the
  Aug 25 record of 2.02M — is dated WEDNESDAY Sep 2 by AP (corpus 07), "hours after the
  exchange": treat as Sep 2 aftermath, not a Sep 1 datapoint.

### G20 Asheville day two (Sep 1) — closes the "weekly sanctions cadence" window

- No joint communiqué: China the lone holdout, objecting to four sections incl. one on the
  Strait of Hormuz and ongoing wars; US issued a chair's statement agreed by all except
  China (corpus 15). Bessent closing presser: "incredible to get 19 countries to agree to
  anything… non-market-based economies pushing out a never-ending stream of cheap exports
  is not sustainable."
- Bessent at a Kudlow-moderated G20 event: "We are going to economically asphyxiate this
  regime" — targeting IRGC offshore accounts in the British Virgin Islands and "$100 million
  houses… We are going to freeze those"; snake metaphor; UK Chancellor Healey's prior
  Outcast-endorsement cited (corpus 10). Wednesday Fox & Friends: "My message to everyone is
  stay away… We are going to sever every tie that they have from the outside world" (corpus
  07 — Sep 2 item). Reuters (via corpus 05, Sep 2 pub): Washington eyeing airlines, maritime
  industry, digital assets as next targets.
- **No new designations were announced Sep 1**; bank sanctions "expected to start this week"
  (NTD/Algemeiner Sep 1, unfetched). A "Treasury moves to freeze IRGC assets worldwide"
  video item surfaces Sep 2 (MSN, unfetched) — post-window tease for the next run.

### Refiners meeting (thread resolved)

Trump met ~a dozen refining executives in the Cabinet Room Tuesday (~1 hour): Delek, PBF,
Marathon, Valero; Wright and Burgum present; asked how to expand capacity/lower pump prices;
got an earful on record-high Renewable Fuel Standard quotas (EPA granted small-refinery
exemptions Monday); refiners asked how to process more Venezuelan crude; Jones Act waiver
praised; Trump told reporters Monday he could not promise pre-election price relief
(corpus 12).

### Pezeshkian–Putin / SCO Bishkek (thread updated)

Meeting happened Sep 1: Pezeshkian thanked Putin for wartime support, urged joint opposition
to US sanctions — "we can counter U.S. unilateralism… within frameworks like the SCO";
Putin: "we are striving to provide you with the necessary assistance… supplying you with
essential goods"; Putin lamented the fragile June truce (corpus 11, Kremlin readout via
WaPo). SCO leaders' joint statement Tuesday condemned "military strikes on the territory of
the Islamic Republic of Iran" with civilian casualties and opposed "unilateral coercive
measures" (corpus 11). **The reported $25B nuclear-plants MOU is NOT confirmed by any
fetched Sep 1 meeting coverage** — the report dates to Aug 28 (Yahoo, unfetched). Also at
SCO: Pakistan PM Sharif met Pezeshkian; Islamabad says it "remains engaged" with both sides
(corpus 07) — updates the Pakistan-mediation thread. Pezeshkian's olive branch: ready to
return to the June MoU "if the U.S. returns to its commitments… will immediately reciprocate"
(corpus 01).

### SIDR aftermath (thread updated; still no attribution)

Philippine Migrant Workers Secretary Cacdac (Wednesday): two Filipino crew killed, 14
survivors' remains/crew to be flown home; ~3,000 Filipino seafarers still in the Gulf
(corpus 07). Saudi MOFA condemned the attack, called for return to negotiations, stressed
navigation/energy security (corpus 07). Saudi accusation of Iran is Sep 2 framing (HuffPost/
Moneycontrol headlines, unfetched); no CENTCOM/UKMTO statement addressing SIDR found in
fetched sources; second tanker now named Senegal Prosperity (corpus 09, medium).

### WaPo Hegseth thread (updated — civil-military friction goes public)

Army Secretary Dan Driscoll resigning: White House confirmed Monday Aug 31; Driscoll's X
post late Tuesday Sep 1 ("honor of a lifetime", no reason given, praised Hegseth); last full
day Wednesday Sep 2; departure leaves the Army without Senate-confirmed civilian or
uniformed leaders as strikes resume (Gen. Randy George ousted April; acting chief LaNeve).
Bipartisan criticism: Tillis — "find a new leader at the Pentagon who will retain and empower
our military talent"; Reed — Hegseth "cultivating a culture where dissent is punished and
competence is secondary to personal allegiance"; Rounds — Pentagon faces "serious questions";
Mast defends (corpus 13).

### INTERTANKO (thread resolved — warning landed Sep 1)

Mine clearance of the TSS is "a necessary condition… not sufficient on its own" (Marine
Director Phillip Belcher); "cannot be assumed that vessels using the TSS will be able to
transit without interference" — Iran insists on its northern corridor; JMIC still warns of
drifting/uncharted mines; Treasury has warned against three Iranian-linked safe-passage-fee
entities (Persian Gulf Strait Authority, Persian Gulf Marine Insurance Co., Hormuz Safe
Marine Services Authority) (corpus 08).

### Open-thread status (for Stage 3 dossier + Stage 5)

1. **Xi–Trump / Chinese banks** — updated, carried: China lone holdout at G20 (objected to
   Hormuz/wars section); Bessent "all options on the table" stands; no Chinese institution
   listed (corpus 15, 06).
2. **'Broad array' following UAE** — carried: no new countries named; UK Healey endorsement
   re-cited (corpus 10); EU backing stands (corpus 06).
3. **Iran oil-export halt threat** — carried, no update found.
4. **Tanker strikes in the strait** — updated/escalated: two MORE tankers hit overnight
   Aug 31→Sep 1 (SIDR + Senegal Prosperity per corpus 09); prior strikes' tow/salvage status
   unchanged; UKMTO SEVERE framing not re-confirmed this window.
5. **Pakistan mediation** — updated: Sharif–Pezeshkian at SCO; "remains engaged" (corpus 07).
6. **Iran–Oman corridor** — carried: INTERTANKO notes Iran still insists vessels use the
   northern (Iranian) corridor (corpus 08); no implementation/IMO news.
7. **Pezeshkian–Putin** — updated: meeting held Sep 1, readout quotes, SCO statement; $25B
   MOU unconfirmed (corpus 11).
8. **NBC intel-damage report** — carried untouched, no follow-up found.
9. **Southern-route friction** — updated: INTERTANKO landed (corpus 08); Axios 15–20
   tankers/night + ~10M bpd vs Kpler's 5 Monday vessels (corpus 09); Wright 17M bbl Aug 31
   (corpus 05); mines-vs-projectiles dispute now a CENTCOM-vs-IRGC information war (corpus 03).
10. **Rezaei $300B conditions list** — carried, no update found.
11. **DOJ prize courts** — carried, no filings found.
12. **FinCEN Banque Misr NPRM** — carried: no finalization/Federal Register movement found;
    American Banker Sep 2 analysis exists (unfetched).
13. **US–Venezuela deal** — updated (post-window): Chevron signed $7B / 600K bpd-by-2031 /
    two Orinoco fields Sep 2 (corpus 16); NABEP has granted DoD a 35% equity stake; Wright
    in Venezuela Wednesday (corpus 16).
14. **Weekly sanctions cadence** — updated: no designations Sep 1; "expected to start this
    week"; next targets airlines/maritime/digital assets; IRGC-asset freeze tease Sep 2
    (corpus 05, 10, 15).
15. **Larak casualties** — carried: no independent toll found.
16. **WaPo Hegseth** — updated: Driscoll resignation + public criticism (corpus 13).
17. **SIDR aftermath** — updated: see above (corpus 07, 09).
18. **Trump "30 ships a night"** — updated: still unreconciled; new US-side datapoints
    (15–20/night, 10M bpd, 17M bbl) vs Kpler 5 (corpus 09, 05).
19. **Refiners meeting** — RESOLVED (corpus 12).
20. **Venezuela pact signings** — RESOLVED post-window: Chevron signed Sep 2 (corpus 16);
    ONGC/GE Vernova/Eni/GeoPark signings per TRT "tens of billions" (unfetched).

### New thread candidates for Stage 5 (`since: "2026-09-01"`)

- **"Tanker-for-tanker" precedent**: US strikes on Iranian government tankers set up
  tit-for-tat tanker warfare — watch Iranian retaliation against commercial shipping and
  tanker insurance/war-risk premiums (corpus 09).
- **Wedding-strike fallout**: contested toll, "war crime" framing vs US denial, comparison
  to the unpublished girls'-school probe — watch independent verification and whether it
  drives further Iranian escalation or Gulf opinion (corpus 01, 05, 07).
- **FT report (via corpus 03): Russia secretly helping Iran develop supersonic anti-ship
  cruise missiles** threatening US carriers — single-chain; verify date (likely Sep 2) and
  follow-ups next run.
- **Gulf-states exposure**: Kuwait hit directly (Ali Al Salem, drone blaze), Qatar holds
  Iran responsible, Arab interior ministers condemn — watch US basing politics and Gulf
  public opinion (corpus 05, 07).
- **Treasury IRGC-asset freeze implementation** (Sep 2 video tease) — the asphyxiation
  package's concrete steps.
- Minor: Trump floats renaming the strait "Trump Strait" (Sep 2 MSN, unfetched).

### Confirmed absences (for tldr/dossier hedges)

- No new OFAC/FinCEN designations announced Sep 1.
- No CENTCOM accounting with a confirmable "as of Sep 1" label; 84/3/2 rests on QNA alone.
- No UKMTO bulletin or CENTCOM statement on the two-tanker projectiles or SIDR found in
  fetched sources (CENTCOM's "no ships hit mines" denial addresses mines, not projectiles).
- No update on: Iran oil-export halt, prize courts, Rezaei list, NBC intel-damage, Larak
  independent tolls, Banque Misr finalization.
- $25B Rosatom–Iran nuclear MOU: no Sep 1 confirmation.

### Filing conventions used

- UTC-day window Sep 1; Sep 2-dated follow-ons (rial record print, Bessent Fox & Friends,
  Chevron signing, Cacdac/Philippines statements, IRGC two-tankers-mines claim + CENTCOM
  denial) filed in corpus but flagged OUTSIDE-WINDOW in headers — Stage 3 must not file
  them as Sep 1 events (they are aftermath/thread updates).
- MSN/Yahoo wrappers labeled with the true outlet (CNBC, WaPo, Bloomberg, Newsmax, AP,
  The Hill, Al Jazeera).
- Sept 2 wedding-toll revision (5→4) noted in corpus 01/07 — Stage 3 should use 4 with the
  revision history hedged, or "4–5 killed (Iranian tolls revised)".
