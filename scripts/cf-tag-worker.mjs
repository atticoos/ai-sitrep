// Applies project tags to the deployed Worker via the Cloudflare script-settings
// API, so all of this project's resources are filterable/groupable in the CF
// dashboard (Workers -> filter by tag). Run automatically after `npm run deploy`,
// or standalone with CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN in the env.
//
// Wrangler only manages its own `cf:service=` / `cf:environment=` tags; custom
// tags are not supported in wrangler.jsonc, hence this script. Existing tags are
// merged (never removed), so manual dashboard tags survive redeploys.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const jsonc = await readFile(path.join(ROOT, "wrangler.jsonc"), "utf8");
const WORKER_NAME = JSON.parse(jsonc.replace(/^\s*\/\/.*$/gm, "")).name;

const PROJECT_TAGS = [`project:${WORKER_NAME}`, "env:production"];

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!accountId || !apiToken) {
  console.error(
    "[cf:tag] Missing CLOUDFLARE_ACCOUNT_ID and/or CLOUDFLARE_API_TOKEN — cannot tag Worker."
  );
  process.exit(1);
}

const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${WORKER_NAME}`;
const headers = {
  Authorization: `Bearer ${apiToken}`,
  "Content-Type": "application/json",
};

async function call(endpoint, init) {
  const res = await fetch(`${base}${endpoint}`, init);
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const errors = body?.errors?.map((e) => e.message).join("; ") ?? res.statusText;
    console.error(`[cf:tag] Cloudflare API ${endpoint} failed (${res.status}): ${errors}`);
    process.exit(1);
  }
  return body.result;
}

const settings = await call("/script-settings");
const existing = Array.isArray(settings?.tags) ? settings.tags : [];
const missing = PROJECT_TAGS.filter((t) => !existing.includes(t));

if (missing.length === 0) {
  console.log(`[cf:tag] Worker "${WORKER_NAME}" already tagged: ${existing.join(", ")}`);
} else {
  const nextTags = [...existing, ...missing];
  await call("/script-settings", { method: "PATCH", headers, body: JSON.stringify({ tags: nextTags }) });
  console.log(`[cf:tag] Tagged worker "${WORKER_NAME}": ${nextTags.join(", ")}`);
}
