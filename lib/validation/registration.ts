const MAX = 64;
/** Kick / Roobet-style handles: letters, numbers, underscore, hyphen, dot */
const HANDLE_RE = /^[a-zA-Z0-9_.-]+$/;

export type RegistrationInput = {
  kickDisplayName: string;
  roobetUsername: string;
};

export function parseRegistrationBody(body: unknown): { ok: true; value: RegistrationInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid_json" };
  }
  const o = body as Record<string, unknown>;
  const kickRaw = typeof o.kickDisplayName === "string" ? o.kickDisplayName : "";
  const roobetRaw = typeof o.roobetUsername === "string" ? o.roobetUsername : "";
  const kickDisplayName = kickRaw.trim();
  const roobetUsername = roobetRaw.trim();

  if (!kickDisplayName || kickDisplayName.length > MAX) {
    return { ok: false, error: "invalid_kick_display_name" };
  }
  if (!HANDLE_RE.test(kickDisplayName)) {
    return { ok: false, error: "invalid_kick_display_name_chars" };
  }
  if (!roobetUsername || roobetUsername.length > MAX) {
    return { ok: false, error: "invalid_roobet_username" };
  }
  if (!HANDLE_RE.test(roobetUsername)) {
    return { ok: false, error: "invalid_roobet_username_chars" };
  }

  return { ok: true, value: { kickDisplayName, roobetUsername } };
}
