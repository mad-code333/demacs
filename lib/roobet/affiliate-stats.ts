const ROOBET_CONNECT_BASE = "https://roobetconnect.com";

/** Row from `GET /affiliate/v2/stats` (Roobet Affiliate Stats API v2). */
export type AffiliateStatsRow = {
  uid: string;
  username: string;
  wagered: number;
  favoriteGameId?: string;
  favoriteGameTitle?: string;
  weightedWagered?: number;
  rankLevel?: number;
  rankLevelImage?: string;
  highestMultiplier?: {
    multiplier: number;
    wagered: number;
    payout: number;
    gameId: string;
    gameTitle: string;
  };
};

export type FetchAffiliateStatsParams = {
  token: string;
  userId: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "wagered" | "highestMultiplier";
  categories?: string;
  providers?: string;
  gameIdentifiers?: string;
};

export class AffiliateStatsHttpError extends Error {
  constructor(
    readonly status: number,
    readonly bodySnippet: string,
  ) {
    super(`affiliate_stats_http_${status}`);
    this.name = "AffiliateStatsHttpError";
  }
}

export function getAffiliateStatsEnv() {
  const token = process.env.ROOBET_AFFILIATE_STATS_TOKEN?.trim();
  const userId = process.env.ROOBET_AFFILIATE_USER_ID?.trim();
  return { token, userId };
}

export async function fetchAffiliateStats(
  p: FetchAffiliateStatsParams,
): Promise<AffiliateStatsRow[]> {
  const url = new URL(`${ROOBET_CONNECT_BASE}/affiliate/v2/stats`);
  url.searchParams.set("userId", p.userId);
  if (p.startDate) url.searchParams.set("startDate", p.startDate);
  if (p.endDate) url.searchParams.set("endDate", p.endDate);
  if (p.sortBy) url.searchParams.set("sortBy", p.sortBy);
  if (p.categories) url.searchParams.set("categories", p.categories);
  if (p.providers) url.searchParams.set("providers", p.providers);
  if (p.gameIdentifiers)
    url.searchParams.set("gameIdentifiers", p.gameIdentifiers);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${p.token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    const snippet = text.slice(0, 500);
    throw new AffiliateStatsHttpError(res.status, snippet);
  }

  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("affiliate_stats_invalid_shape");
  }

  return data as AffiliateStatsRow[];
}
