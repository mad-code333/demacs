/** Published VIP ladder (matches `/affiliates/vip-rewards`). */

export type VipTier = {
  name: string;
  wagerUsd: number;
  family: string;
};

export const VIP_TIERS: readonly VipTier[] = [
  { name: "Beginner", wagerUsd: 0, family: "beginner" },
  { name: "Silver I", wagerUsd: 1_000, family: "silver" },
  { name: "Silver II", wagerUsd: 2_700, family: "silver" },
  { name: "Silver III", wagerUsd: 5_500, family: "silver" },
  { name: "Silver IV", wagerUsd: 10_000, family: "silver" },
  { name: "Gold I", wagerUsd: 18_500, family: "gold" },
  { name: "Gold II", wagerUsd: 32_000, family: "gold" },
  { name: "Gold III", wagerUsd: 56_000, family: "gold" },
  { name: "Gold IV", wagerUsd: 95_000, family: "gold" },
  { name: "Emerald I", wagerUsd: 160_000, family: "emerald" },
  { name: "Emerald II", wagerUsd: 275_000, family: "emerald" },
  { name: "Emerald III", wagerUsd: 460_000, family: "emerald" },
  { name: "Ruby I", wagerUsd: 785_000, family: "ruby" },
  { name: "Ruby II", wagerUsd: 1_300_000, family: "ruby" },
  { name: "Ruby III", wagerUsd: 2_250_000, family: "ruby" },
  { name: "Diamond I", wagerUsd: 3_800_000, family: "diamond" },
  { name: "Diamond II", wagerUsd: 6_500_000, family: "diamond" },
  { name: "Diamond III", wagerUsd: 10_000_000, family: "diamond" },
  { name: "Champion I", wagerUsd: 18_000_000, family: "champion" },
  { name: "Champion II", wagerUsd: 30_000_000, family: "champion" },
  { name: "Champion III", wagerUsd: 50_000_000, family: "champion" },
  { name: "Legend I", wagerUsd: 88_000_000, family: "legend" },
  { name: "Legend II", wagerUsd: 150_000_000, family: "legend" },
  { name: "Legend III", wagerUsd: 250_000_000, family: "legend" },
  { name: "Master I", wagerUsd: 425_000_000, family: "master" },
  { name: "Master II", wagerUsd: 720_000_000, family: "master" },
  { name: "Master III", wagerUsd: 1_200_000_000, family: "master" },
  { name: "Grandmaster I", wagerUsd: 2_000_000_000, family: "grandmaster" },
  { name: "Grandmaster II", wagerUsd: 3_500_000_000, family: "grandmaster" },
  { name: "Grandmaster III", wagerUsd: 6_000_000_000, family: "grandmaster" },
  { name: "Immortal", wagerUsd: 10_000_000_000, family: "immortal" },
] as const;

/** Featured progression milestones for Home diagrams (real thresholds). */
export const VIP_PROGRESSION_MILESTONES = [
  VIP_TIERS.find((t) => t.name === "Silver I")!,
  VIP_TIERS.find((t) => t.name === "Gold I")!,
  VIP_TIERS.find((t) => t.name === "Emerald I")!,
  VIP_TIERS.find((t) => t.name === "Diamond I")!,
] as const;

export function vipTierBadgeSrc(tierName: string) {
  return `/vip/${tierName.replace(/ /g, "-")}.png`;
}

export function formatVipWager(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd);
}
