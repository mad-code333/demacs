/** Monthly prize pool slices by rank (matches `/api/leaderboard`). */
export const TOP_MONTHLY_PRIZES: readonly number[] = [
  2000, 1000, 750, 500, 250, 175, 125, 100, 50, 50,
];

export const MONTHLY_PRIZE_POOL = TOP_MONTHLY_PRIZES.reduce((sum, n) => sum + n, 0);

export function prizeForRank(rank: number): number {
  if (rank >= 1 && rank <= TOP_MONTHLY_PRIZES.length) {
    return TOP_MONTHLY_PRIZES[rank - 1] ?? 0;
  }
  return 0;
}
