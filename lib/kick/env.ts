function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export function getKickRedirectUri() {
  const explicit = process.env.KICK_REDIRECT_URI?.trim();
  if (explicit) return explicit;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  if (!base) {
    throw new Error(
      "Set KICK_REDIRECT_URI or NEXT_PUBLIC_SITE_URL so Kick OAuth knows the callback URL.",
    );
  }

  return `${stripTrailingSlash(base)}/api/auth/kick/callback`;
}

export function getKickClientId() {
  const id = process.env.KICK_CLIENT_ID?.trim();
  if (!id) throw new Error("KICK_CLIENT_ID is not set.");
  return id;
}

export function getKickClientSecret() {
  const secret = process.env.KICK_CLIENT_SECRET?.trim();
  if (!secret) throw new Error("KICK_CLIENT_SECRET is not set.");
  return secret;
}

export function getKickSessionSecret() {
  const secret = process.env.KICK_SESSION_SECRET?.trim() || process.env.AUTH_SECRET?.trim();
  if (!secret) throw new Error("Set KICK_SESSION_SECRET (or AUTH_SECRET) to sign session cookies.");
  return secret;
}
