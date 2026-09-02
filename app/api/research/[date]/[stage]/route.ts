import {
  bucket,
  isResearchDate,
  isResearchStage,
  researchObjectKey,
} from "@/lib/research";

// Streams a stage transcript straight from the US_IRAN_RESEARCH R2 binding. The
// client viewer (app/research/[date]/session-viewer.tsx) fetches this so the
// multi-MB JSON never bloats the page payload.
//
// Transcripts are effectively immutable per date+stage (re-runs overwrite
// rarely), so responses are CDN-cacheable for a day.

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ date: string; stage: string }> },
) {
  const { date, stage } = await ctx.params;
  if (!isResearchDate(date) || !isResearchStage(stage)) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  const object = await bucket().get(researchObjectKey(date, `session-${stage}.json`));
  if (!object) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=60, s-maxage=86400",
    },
  });
}
