import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { findUserByKickId, isProfileComplete } from "@/lib/db/users";
import { KICK_COOKIE_SESSION } from "@/lib/kick/cookies";
import { getKickSessionSecret } from "@/lib/kick/env";
import { parseKickSession } from "@/lib/kick/session-cookie";

export const runtime = "nodejs";

export async function GET() {
  try {
    const token = (await cookies()).get(KICK_COOKIE_SESSION)?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }
    const parsed = parseKickSession(token, getKickSessionSecret());
    if (!parsed) {
      return NextResponse.json({ user: null });
    }

    let profile: Awaited<ReturnType<typeof findUserByKickId>> = null;
    try {
      profile = await findUserByKickId(parsed.userId);
    } catch (e) {
      console.error("session_profile_lookup", e);
    }

    return NextResponse.json({
      user: {
        userId: parsed.userId,
        username: parsed.username,
        kickDisplayName: profile?.kickDisplayName ?? null,
        roobetUsername: profile?.roobetUsername ?? null,
        registrationComplete: isProfileComplete(profile),
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
