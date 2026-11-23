import { NextRequest, NextResponse } from "next/server";
import { LUMA_EVENTS } from "@/data/communityData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  // Allows testing both the resilient fallback state (matches chennaireact.in) and live events
  if (mode === "fallback") {
    return NextResponse.json(
      { ok: false, error: "We couldn't load events right now.", events: [] },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    events: LUMA_EVENTS,
    syncedAt: new Date().toISOString(),
  });
}
