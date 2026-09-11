import { NextRequest, NextResponse } from "next/server";
import { defaultBerlinMonthRange } from "@/lib/leaderboard-berlin-period";
import { prizeForRank } from "@/lib/leaderboard-prizes";
import {
  AffiliateStatsHttpError,
  fetchAffiliateStats,
  getAffiliateStatsEnv,
} from "@/lib/roobet/affiliate-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clampLimit(raw: string | null, fallback: number) {
  const n = raw === null ? NaN : Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, 500);
}

export async function GET(req: NextRequest) {
  const { token, userId } = getAffiliateStatsEnv();
  if (!token || !userId) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Set ROOBET_AFFILIATE_STATS_TOKEN and ROOBET_AFFILIATE_USER_ID on the server.",
      },
      { status: 503 },
    );
  }

  const sp = req.nextUrl.searchParams;
  const useDefaultRange = sp.get("allTime") !== "1" && !sp.get("startDate");
  const { startDate: defaultStart, endDate: defaultEnd } = defaultBerlinMonthRange();

  const startDate = sp.get("startDate")?.trim() || (useDefaultRange ? defaultStart : undefined);
  const endDate = sp.get("endDate")?.trim() || (useDefaultRange ? defaultEnd : undefined);

  const sortByRaw = sp.get("sortBy")?.trim();
  const sortBy =
    sortByRaw === "highestMultiplier" || sortByRaw === "wagered"
      ? sortByRaw
      : ("wagered" as const);

  const limit = clampLimit(sp.get("limit"), 100);

  try {
    const rows = await fetchAffiliateStats({
      token,
      userId,
      startDate,
      endDate,
      sortBy,
      categories: sp.get("categories")?.trim() || undefined,
      providers: sp.get("providers")?.trim() || undefined,
      gameIdentifiers: sp.get("gameIdentifiers")?.trim() || undefined,
    });

    const players = rows.slice(0, limit).map((row, i) => {
      const rank = i + 1;
      return {
        rank,
        username: row.username,
        wagered: row.wagered,
        prize: prizeForRank(rank),
        uid: row.uid,
        rankLevel: row.rankLevel,
        rankLevelImage: row.rankLevelImage,
        favoriteGameTitle: row.favoriteGameTitle,
        highestMultiplier: row.highestMultiplier,
      };
    });

    return NextResponse.json({
      players,
      meta: {
        sortBy,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        count: players.length,
      },
    });
  } catch (e) {
    if (e instanceof AffiliateStatsHttpError) {
      console.error("leaderboard_affiliate_stats", e.status, e.bodySnippet);
      return NextResponse.json(
        { error: "upstream_error", status: e.status },
        { status: 502 },
      );
    }
    console.error("leaderboard", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
