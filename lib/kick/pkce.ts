import { createHash, randomBytes } from "node:crypto";

export function createCodeVerifier() {
  return randomBytes(32).toString("base64url");
}

export function createCodeChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function createOAuthState() {
  return randomBytes(24).toString("base64url");
}
