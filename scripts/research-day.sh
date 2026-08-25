#!/usr/bin/env bash
# Research one day of the US-Iran campaign and file a day report.
#
# Usage:
#   scripts/research-day.sh 2026-08-25          # local run, writes files only
#   RESEARCH_MODEL=openrouter/stealth/ox-alpha scripts/research-day.sh 2026-08-25
#   RESEARCH_GIT=1 scripts/research-day.sh …    # CI mode: commit artifacts as produced
#
# Requires: opencode (https://opencode.ai), node >= 22.
# Branch/PR handling lives in .github/workflows/daily-research.yml — this script
# only writes files under data/. The brief's stages run as separate agent
# sessions that hand off through files on disk:
#   A: Stage 1+2 (context, gather)     — one corpus file per source, committed per item in CI
#   B: Stage 3+4 (synthesize, validate)
#   C: Stage 5+6 (state update, summary)
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
GIT_MODE="${RESEARCH_GIT:-0}"
CORPUS="data/research/${DATE}"

mkdir -p "$CORPUS"

commit() {
  [[ "$GIT_MODE" == "1" ]] || return 0
  local msg="$1"
  shift
  local paths=()
  local f
  for f in "$@"; do
    if [[ -e "$f" ]]; then paths+=("$f"); fi
  done
  [ "${#paths[@]}" -gt 0 ] || return 0
  git add -- "${paths[@]}"
  git commit -m "research(${DATE}): ${msg}" || echo "[git] nothing new to commit"
}

run_stage() {
  opencode run --print-logs --log-level WARN -m "$MODEL" "$1"
}

COMMIT_NOTE=""
if [[ "$GIT_MODE" == "1" ]]; then
  COMMIT_NOTE="
Commits are ENABLED for this session. Immediately after you save each corpus
file, record it with one commit — do not batch:
  git add data/research/${DATE}/NN-slug.md && git commit -m \"research(${DATE}): NN-slug\""
fi

echo "[research] ${DATE} via ${MODEL} — stage A: context + gather"
run_stage "Read spec/RESEARCH_BRIEF.md and execute ONLY Stage 1 (Context) and \
Stage 2 (Gather) for DATE=${DATE}.${COMMIT_NOTE}
Stop after Stage 2 — do not synthesize. Every finding a later stage needs must
be written to disk under data/research/${DATE}/; conversation memory does not
carry into the next session."

echo "[research] stage B: synthesize + validate"
run_stage "Read spec/RESEARCH_BRIEF.md and execute ONLY Stage 3 (Synthesize) and \
Stage 4 (Validate) for DATE=${DATE}. The gathered corpus is in data/research/${DATE}/.
Stop after Stage 4."

DAY_FILE="data/days/${DATE}.json"
if [[ ! -f "$DAY_FILE" ]]; then
  echo "error: agent finished without writing ${DAY_FILE}" >&2
  echo "       partial corpus (if any) is in ${CORPUS}/" >&2
  exit 1
fi
node scripts/validate-day.mjs "$DATE"
commit "day report" "$DAY_FILE" "$CORPUS"

echo "[research] stage C: state + summary"
run_stage "Read spec/RESEARCH_BRIEF.md and execute ONLY Stage 5 (Update state) and \
Stage 6 (Run summary) for DATE=${DATE}. Stop after Stage 6."
commit "state + summary" data/state.json "$CORPUS/SUMMARY.md"

echo "[research] filed ${DAY_FILE}. Review locally; CI opens the PR."
