const NAME_MAX = 120;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export function parseContactBody(body: unknown): { ok: true; value: ContactInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid_json" };
  }
  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!name || name.length > NAME_MAX) {
    return { ok: false, error: "invalid_name" };
  }
  if (!email || email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid_email" };
  }
  if (!message || message.length > MESSAGE_MAX) {
    return { ok: false, error: "invalid_message" };
  }

  return { ok: true, value: { name, email, message } };
}
