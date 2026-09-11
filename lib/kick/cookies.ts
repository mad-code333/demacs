export const KICK_COOKIE_SESSION = "gamba_kick";
export const KICK_COOKIE_VERIFIER = "gamba_kick_pv";
export const KICK_COOKIE_STATE = "gamba_kick_st";
export const KICK_COOKIE_NEXT = "gamba_kick_nx";

const isProd = process.env.NODE_ENV === "production";

type CookieOpts = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
};

export function oauthCookieOptions(maxAgeSec: number): CookieOpts {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  };
}

export function sessionCookieOptions(maxAgeSec: number): CookieOpts {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSec,
  };
}

export function clearedCookie(): CookieOpts {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  };
}
