import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db/contact-messages";
import { parseContactBody } from "@/lib/validation/contact";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseContactBody(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await saveContactMessage(parsed.value);
  } catch (e) {
    console.error("contact_submit", e);
    return NextResponse.json({ error: "database_error" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
