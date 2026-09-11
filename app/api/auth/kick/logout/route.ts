import { NextRequest, NextResponse } from "next/server";
import { KICK_COOKIE_SESSION, clearedCookie } from "@/lib/kick/cookies";

export const runtime = "nodejs";

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(req: NextRequest) {
  const next = safeNextPath(req.nextUrl.searchParams.get("next"));
  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set(KICK_COOKIE_SESSION, "", { ...clearedCookie(), maxAge: 0 });
  return res;
}
