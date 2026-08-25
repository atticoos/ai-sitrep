#!/usr/bin/env bash
# Research one day of the US-Iran campaign and file a day report.
#
# Usage:
#   scripts/research-day.sh 2026-08-25          # local run, writes files only
#   RESEARCH_MODEL=openrouter/stealth/ox-alpha scripts/research-day.sh 2026-08-25
#
# Requires: opencode (https://opencode.ai), node >= 22.
# Git/PR handling lives in .github/workflows/daily-research.yml — this script
# only writes files under data/.
set -euo pipefail

DATE="${1:-}"
if [[ ! "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "usage: scripts/research-day.sh YYYY-MM-DD" >&2
  exit 1
fi

command -v opencode >/dev/null 2>&1 || {
  echo "error: opencode is not installed (https://opencode.ai/docs)" >&2
  exit 1
}

TODAY="$(date -u +%F)"
if [[ "$DATE" > "$TODAY" ]]; then
  echo "error: ${DATE} is in the future (today UTC: ${TODAY})" >&2
  exit 1
fi

MODEL="${RESEARCH_MODEL:-openrouter/stealth/ox-alpha}"
mkdir -p "data/research/${DATE}"

echo "[research] ${DATE} via ${MODEL} (this can take several minutes)"
opencode run -m "$MODEL" \
  "Read spec/RESEARCH_BRIEF.md and execute it in full for DATE=${DATE}. Work autonomously through all stages to completion."

DAY_FILE="data/days/${DATE}.json"
if [[ ! -f "$DAY_FILE" ]]; then
  echo "error: agent finished without writing ${DAY_FILE}" >&2
  echo "       partial corpus (if any) is in data/research/${DATE}/" >&2
  exit 1
fi

node scripts/validate-day.mjs "$DATE"
echo "[research] filed ${DAY_FILE}. Review locally; CI opens the PR."
