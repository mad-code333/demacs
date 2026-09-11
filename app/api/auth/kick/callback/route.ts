import { NextRequest, NextResponse } from "next/server";
import {
  KICK_COOKIE_NEXT,
  KICK_COOKIE_SESSION,
  KICK_COOKIE_STATE,
  KICK_COOKIE_VERIFIER,
  clearedCookie,
  sessionCookieOptions,
} from "@/lib/kick/cookies";
import { isProfileComplete, upsertUserFromKickOAuth } from "@/lib/db/users";
import { getKickSessionSecret } from "@/lib/kick/env";
import { exchangeKickAuthorizationCode, fetchKickCurrentUser, getKickRedirectUri } from "@/lib/kick/oauth";
import { kickSessionCookieMaxAge, serializeKickSession } from "@/lib/kick/session-cookie";

export const runtime = "nodejs";

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const err = url.searchParams.get("error");
  const errDesc = url.searchParams.get("error_description");

  const failRedirect = (message: string) => {
    const to = new URL("/", req.url);
    to.searchParams.set("kick_error", message);
    return NextResponse.redirect(to);
  };

  if (err) {
    return failRedirect(errDesc || err);
  }

  if (!code || !state) {
    return failRedirect("missing_code");
  }

  const jar = req.cookies;
  const expectedState = jar.get(KICK_COOKIE_STATE)?.value;
  const verifier = jar.get(KICK_COOKIE_VERIFIER)?.value;
  const next = safeNextPath(jar.get(KICK_COOKIE_NEXT)?.value ?? null);

  if (!expectedState || !verifier || state !== expectedState) {
    return failRedirect("invalid_state");
  }

  try {
    const redirectUri = getKickRedirectUri();
    const tokens = await exchangeKickAuthorizationCode({
      code,
      codeVerifier: verifier,
      redirectUri,
    });
    const user = await fetchKickCurrentUser(tokens.access_token);
    const sessionSecret = getKickSessionSecret();
    const sessionValue = serializeKickSession(
      { userId: user.user_id, username: user.name },
      sessionSecret,
    );

    let redirectPath = next;
    try {
      const dbUser = await upsertUserFromKickOAuth(user.user_id, user.name);
      if (!isProfileComplete(dbUser)) {
        redirectPath = "/register/complete";
      }
    } catch (e) {
      console.error("kick_oauth_mongo_upsert", e);
      redirectPath = "/register/complete";
    }

    const res = NextResponse.redirect(new URL(redirectPath, req.url));
    const clear = clearedCookie();
    res.cookies.set(KICK_COOKIE_VERIFIER, "", { ...clear, maxAge: 0 });
    res.cookies.set(KICK_COOKIE_STATE, "", { ...clear, maxAge: 0 });
    res.cookies.set(KICK_COOKIE_NEXT, "", { ...clear, maxAge: 0 });
    res.cookies.set(KICK_COOKIE_SESSION, sessionValue, sessionCookieOptions(kickSessionCookieMaxAge()));
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "kick_callback_failed";
    return failRedirect(message);
  }
}
