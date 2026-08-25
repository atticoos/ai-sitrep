#!/usr/bin/env bash
# Upload one day's research transcripts to the proof-of-work R2 bucket.
#
# Usage:
#   scripts/upload-research-r2.sh 2026-08-25           # remote bucket (CI)
#   scripts/upload-research-r2.sh 2026-08-25 --local   # miniflare local store
#
# Auth: wrangler credentials. In CI set CLOUDFLARE_API_TOKEN (+ optionally
# CLOUDFLARE_ACCOUNT_ID) with an R2-edit token. Locally `wrangler login` or
# those same env vars.
#
# Objects: research/<DATE>/{manifest.json, session-A.json, session-B.json, ...}
set -euo pipefail

usage() {
  echo "usage: scripts/upload-research-r2.sh YYYY-MM-DD [--local]" >&2
}

DATE="${1:-}"
[[ "$DATE" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || {
  usage
  exit 1
}
case "${2:-}" in
  "" | --local) LOCAL_FLAG="${2:-}" ;;
  *)
    usage
    exit 1
    ;;
esac

BUCKET="${RESEARCH_R2_BUCKET:-us-iran-research}"
SESSIONS="data/research/${DATE}/scratch/sessions"

if [[ ! -d "$SESSIONS" ]]; then
  echo "[upload] no transcripts for ${DATE} (${SESSIONS} missing); nothing to do"
  exit 0
fi

uploaded=0
for file in "${SESSIONS}/manifest.json" "${SESSIONS}"/session-*.json; do
  [[ -f "$file" ]] || continue
  name="${file##*/}"
  echo "[upload] ${BUCKET} → research/${DATE}/${name}"
  npx --no-install wrangler r2 object put \
    "${BUCKET}/research/${DATE}/${name}" \
    --file "$file" \
    --content-type application/json \
    -y $LOCAL_FLAG
  uploaded=$((uploaded + 1))
done

echo "[upload] ${DATE}: ${uploaded} object(s) uploaded"
