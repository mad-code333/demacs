import { NextRequest, NextResponse } from "next/server";
import {
  KICK_COOKIE_NEXT,
  KICK_COOKIE_STATE,
  KICK_COOKIE_VERIFIER,
  oauthCookieOptions,
} from "@/lib/kick/cookies";
import { getKickClientId } from "@/lib/kick/env";
import { buildKickAuthorizeUrl, getKickRedirectUri } from "@/lib/kick/oauth";
import { createCodeChallenge, createCodeVerifier, createOAuthState } from "@/lib/kick/pkce";

export const runtime = "nodejs";

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(req: NextRequest) {
  try {
    const redirectUri = getKickRedirectUri();
    const clientId = getKickClientId();
    const verifier = createCodeVerifier();
    const challenge = createCodeChallenge(verifier);
    const state = createOAuthState();
    const next = safeNextPath(req.nextUrl.searchParams.get("next"));

    const authorizeUrl = buildKickAuthorizeUrl({
      clientId,
      redirectUri,
      codeChallenge: challenge,
      state,
    });

    const res = NextResponse.redirect(authorizeUrl);
    res.cookies.set(KICK_COOKIE_VERIFIER, verifier, oauthCookieOptions(600));
    res.cookies.set(KICK_COOKIE_STATE, state, oauthCookieOptions(600));
    res.cookies.set(KICK_COOKIE_NEXT, next, oauthCookieOptions(600));
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Kick OAuth configuration error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
