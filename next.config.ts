import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Exposes the wrangler.jsonc bindings (e.g. the US_IRAN_RESEARCH R2 bucket) to
// `next dev` through a local miniflare proxy. Seed it with
// `scripts/upload-research-r2.sh <DATE> --local`.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
