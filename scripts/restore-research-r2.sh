#!/usr/bin/env bash
# Restore previously uploaded transcripts for a day into the local scratch
# dir, so a resumed research run rebuilds its manifest on top of what already
# exists in R2 instead of clobbering it. Missing objects are not an error
# (first run of a date has nothing to restore).
#
# Usage:
#   scripts/restore-research-r2.sh 2026-08-25           # remote bucket (CI)
#   scripts/restore-research-r2.sh 2026-08-25 --local   # miniflare local store
set -uo pipefail

usage() {
  echo "usage: scripts/restore-research-r2.sh YYYY-MM-DD [--local]" >&2
}

DATE="${1:-}"
[[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || {
  usage
  exit 1
}
case "${2:-}" in
  "" | --remote) SCOPE_FLAG="--remote" ;;
  --local) SCOPE_FLAG="--local" ;;
  *)
    usage
    exit 1
    ;;
esac

BUCKET="${RESEARCH_R2_BUCKET:-us-iran-research}"
SESSIONS="data/research/${DATE}/scratch/sessions"
mkdir -p "$SESSIONS"

restored=0
for name in manifest.json session-A.json session-B.json session-C.json; do
  [[ -f "${SESSIONS}/${name}" ]] && continue
  if npx --no-install wrangler r2 object get \
    "${BUCKET}/research/${DATE}/${name}" \
    --file "${SESSIONS}/${name}" \
    -y $SCOPE_FLAG >/dev/null 2>&1; then
    echo "[restore] research/${DATE}/${name}"
    restored=$((restored + 1))
  fi
done

echo "[restore] ${DATE}: ${restored} object(s) restored"
exit 0
