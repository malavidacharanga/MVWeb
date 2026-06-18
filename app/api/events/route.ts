import { NextResponse } from "next/server";
import { getDisplayEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(Math.floor(limitParam), 1), 50)
    : undefined;
  const result = await getDisplayEvents(limit);

  return NextResponse.json({
    ...result,
    upcoming: result.mode === "upcoming" ? result.events : []
  });
}
