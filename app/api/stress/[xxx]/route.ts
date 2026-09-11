import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ xxx: string }> },
) {
  const { xxx: rawXxx } = await params;
  const xxx = decodeURIComponent(rawXxx ?? "").trim();
  if (!xxx) {
    return NextResponse.json(
      { error: "missing_xxx", message: "Provide /api/stress/{xxx}." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();
    const res = await db.collection("stress").insertOne({
      xxx,
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (e) {
    console.error("stress_insert", e);
    return NextResponse.json({ error: "database_error" }, { status: 503 });
  }
}

