import { NextRequest, NextResponse } from "next/server";
import { getKickSessionFromRequest } from "@/lib/auth/kick-session-request";
import { saveUserRegistration } from "@/lib/db/users";
import { parseRegistrationBody } from "@/lib/validation/registration";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const session = getKickSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseRegistrationBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await saveUserRegistration(session.userId, session.username, parsed.value);
  } catch (e) {
    console.error("register_complete", e);
    return NextResponse.json({ error: "database_error" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
