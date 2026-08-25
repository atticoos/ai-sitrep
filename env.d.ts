// Worker bindings declared in wrangler.jsonc. This mirrors what
// `npm run cf-typegen` generates into cloudflare-env.d.ts (gitignored,
// per-machine); committing these few lines keeps lint/tsc/worker-build green
// on fresh clones without running cf-typegen first. Keep both in sync.
declare global {
	interface CloudflareEnv {
		US_IRAN_RESEARCH: R2Bucket;
	}
}

export {};
