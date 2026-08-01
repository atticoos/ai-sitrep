# Iran Campaign Timeline Tracker

## Overview

This project tracks the day-by-day military activity during the 2026 U.S.–Iran campaign. The goal is **not** to reproduce news headlines, but to build a concise operational timeline that shows how the campaign evolved over time.

The tracker should resemble an intelligence or military operations log ("SITREP") rather than a traditional news summary.

Each row should answer four questions:

1. **What did the United States do?**
2. **What did Iran do?**
3. **How was it done?**
4. **What was the operational significance of the day?**

The end result should allow someone to scroll through the campaign and quickly understand:
- How the tempo changed
- Which military capabilities were employed
- Which target sets were prioritized
- How each side adapted
- Major escalations and de-escalations

---

# Design Goals

## 1. Extremely concise

Each day should be readable in roughly 10–20 seconds.

Avoid paragraphs.

Prefer:

- Metrics
- Categories
- Icons
- Short phrases

Instead of:

> The United States conducted another series of precision strikes against Iranian military infrastructure.

Use:

> ✈️ Precision strikes • Missile depots • Air defenses • IRGC HQ

---

## 2. Operational rather than political

Prioritize military facts over political commentary.

Good:

- Number of strikes
- Number of targets
- Missile launches
- Aircraft involved
- Naval operations
- Air-defense activity
- Target categories

Avoid focusing on:

- Diplomatic statements
- Political speeches
- Editorial analysis

unless they directly affect military operations.

---

## 3. Daily progression

Each day should make it obvious how the campaign evolved.

For example:

Phase 1
- Initial suppression
- Massive strike packages

↓

Phase 2
- Logistics
- Command & Control
- Air defenses

↓

Phase 3
- Maritime infrastructure
- Strait of Hormuz

↓

Phase 4
- Pause
- Retaliation
- Escalation

---

# Recommended Table

| Date | Strike Package | U.S. Platforms | U.S. Effects | Iran Activity | Theme |
|------|----------------|----------------|--------------|---------------|-------|

---

# Column Definitions

## Date

Campaign day.

Example:

- Jul 11
- Jul 12

---

## Strike Package

Very quick assessment of the size of the U.S. operation.

Possible values:

- Small
- Medium
- Large
- Massive

Optionally include:

- Number of targets
- Number of strikes

Example:

Large (100+ targets)

---

## U.S. Platforms

How the strikes were carried out.

Possible categories:

✈️ Tactical aircraft

- F-35
- F-22
- F-15E
- F/A-18
- etc.

💣 Strategic bombers

- B-2
- B-1
- B-52

🚢 Navy

- Tomahawk missiles
- Destroyers
- Cruisers

⚓ Carrier Air Wing

🛰️ ISR

- Reconnaissance
- Surveillance
- Targeting support

🛡️ Missile Defense

- Patriot
- THAAD
- Aegis

🚁 Special Operations

Only when confirmed.

If a platform is not publicly confirmed, avoid speculation.

---

## U.S. Effects

What was actually attacked.

Examples:

🚀 Missile launchers

🛸 Drone depots

🏛️ IRGC headquarters

🛡️ Air defenses

📡 Radar

📦 Logistics

⚓ Naval facilities

🌊 Coastal surveillance

🏭 Military industry

🏗️ Infrastructure

Command & Control

Communications

Fuel storage

Ports

Airfields

---

## Iran Activity

Track Iran separately from U.S. actions.

Suggested categories:

🚀 Ballistic missiles

✈️ Cruise missiles

🛸 Attack drones

⚓ Naval activity

🤝 Proxy attacks

🛡️ Air defenses

📡 Electronic warfare

🚢 Shipping disruption

Military dispersal

Information operations

Include quantitative metrics whenever available.

Examples:

- 18 ballistic missiles
- 40 drones launched
- 2 proxy attacks
- No significant activity

---

## Theme

Very short operational summary.

Examples:

- Shock & Awe
- Pressure
- Attrition
- Sea Control
- Maritime Pressure
- Air Defense Suppression
- Escalation
- Retaliation
- Operational Pause
- Strategic Degradation
- Campaign Culmination

---

# Confidence Levels

Not every day's details are publicly released.

Each data point should be assigned a confidence level.

Suggested values:

🟢 High

Officially confirmed by:

- CENTCOM
- DoD
- White House
- Iranian MoD
- Satellite imagery
- Official press release

🟡 Medium

Reported by multiple credible outlets or supported by strong evidence.

🔴 Low

Reasonable inference only.

Avoid presenting inferred information as confirmed fact.

---

# Sources

Prioritize sources in roughly this order:

1. CENTCOM
2. Department of Defense
3. U.S. Navy
4. U.S. Air Force
5. White House
6. Reuters
7. AP
8. BBC
9. ABC News
10. Al Jazeera
11. Defense-focused reporting

Avoid relying on a single secondary news source when official releases are available.

---

# Future Enhancements

Potential additions include:

## Metrics Dashboard

- Total targets struck
- Total missile launches
- Total drone launches
- Total naval engagements
- Running cumulative totals

## Campaign Phases

Group days into operational phases.

Example:

- Opening Offensive
- Air Defense Suppression
- Strategic Degradation
- Maritime Campaign
- Retaliation Phase

## Equipment Tracking

Track confirmed use of major systems:

United States
- F-35
- F-22
- B-2
- B-52
- F/A-18
- Tomahawk
- JDAM
- Patriot
- THAAD

Iran
- Ballistic missiles
- Cruise missiles
- Shahed drones
- Fast attack craft
- Air-defense systems

## Interactive Filters

Allow filtering by:

- Platform
- Target type
- Strike size
- Missile activity
- Naval operations
- Campaign phase

---

# Example Row

| Date | Strike Package | U.S. Platforms | U.S. Effects | Iran Activity | Theme |
|------|----------------|----------------|--------------|---------------|-------|
| Jul 11 | Massive (100+ targets) | ✈️ Tactical aircraft • 🚢 Tomahawks | 🚀 Missile sites • 🛡️ Air defenses • 🏛️ IRGC C2 | 🚀 Ballistic missiles • 🛸 Drones • Air defenses activated | Shock & Awe |

This format should remain consistent throughout the campaign so that readers can quickly compare one day to the next and identify changes in operational tempo, targeting priorities, and tactics.