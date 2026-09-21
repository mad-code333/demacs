import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KICK_CHANNEL_SLUG = "demacs";
const KICK_CHANNEL_URL = `https://kick.com/api/v2/channels/${KICK_CHANNEL_SLUG}`;

type KickLivestream = {
  id?: number;
  is_live?: boolean;
};

type KickChannel = {
  livestream?: KickLivestream | null;
};

function isLivePayload(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const livestream = (data as KickChannel).livestream;
  if (!livestream || typeof livestream !== "object") return false;
  if (livestream.is_live === false) return false;
  return true;
}

export async function GET() {
  try {
    const res = await fetch(KICK_CHANNEL_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ live: false }, { status: 200 });
    }

    const data: unknown = await res.json();
    return NextResponse.json({ live: isLivePayload(data) });
  } catch {
    return NextResponse.json({ live: false }, { status: 200 });
  }
}
