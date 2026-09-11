import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export type KickSessionPayload = {
  userId: number;
  username: string;
  exp: number;
};

function signPayload(payloadB64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function serializeKickSession(data: Omit<KickSessionPayload, "exp">, secret: string) {
  const exp = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE_SEC;
  const body: KickSessionPayload = { ...data, exp };
  const payloadB64 = Buffer.from(JSON.stringify(body), "utf8").toString("base64url");
  const sig = signPayload(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function parseKickSession(token: string, secret: string): KickSessionPayload | null {
  const idx = token.lastIndexOf(".");
  if (idx <= 0) return null;
  const payloadB64 = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  if (!payloadB64 || !sig) return null;

  const expected = signPayload(payloadB64, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const raw = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8")) as KickSessionPayload;
    if (typeof raw.userId !== "number" || typeof raw.username !== "string" || typeof raw.exp !== "number") {
      return null;
    }
    if (raw.exp < Math.floor(Date.now() / 1000)) return null;
    return raw;
  } catch {
    return null;
  }
}

export function kickSessionCookieMaxAge() {
  return COOKIE_MAX_AGE_SEC;
}
