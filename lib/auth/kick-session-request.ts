import type { NextRequest } from "next/server";
import { KICK_COOKIE_SESSION } from "@/lib/kick/cookies";
import { getKickSessionSecret } from "@/lib/kick/env";
import { parseKickSession, type KickSessionPayload } from "@/lib/kick/session-cookie";

export function getKickSessionFromRequest(req: NextRequest): KickSessionPayload | null {
  const token = req.cookies.get(KICK_COOKIE_SESSION)?.value;
  if (!token) return null;
  try {
    return parseKickSession(token, getKickSessionSecret());
  } catch {
    return null;
  }
}
