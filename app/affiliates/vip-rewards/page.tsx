"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

/** Wager thresholds (USD) from VIP tier reference */
const VIP_TIERS = [
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

/** Public path to tier badge PNG (`public/vip/{Tier-Name}.png`) — assets are 256×160 */
function vipTierBadgeSrc(tierName: string) {
  return `/vip/${tierName.replace(/ /g, "-")}.png`;
}

const VIP_BADGE_INTRINSIC_W = 256;
const VIP_BADGE_INTRINSIC_H = 160;

function formatWager(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd);
}

export default function VipRewardsPage() {
  const reduceMotion = useReducedMotion();

  const listContainerVariants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.028, delayChildren: 0.06 },
        },
      };

  const listItemVariants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
      };

  return (
    <div className="min-h-screen bg-[#111115] px-4 py-16 font-golos text-bright sm:px-6 sm:py-20">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >

        <header className="mt-8">
          <h1 className="font-sports text-3xl uppercase tracking-wide text-white sm:text-4xl">
            VIP rewards
          </h1>
          <p className="mt-3 font-golos text-sm leading-relaxed text-secondary/75">
            Each tier unlocks after the listed lifetime wager. Amounts match the published VIP ladder.
          </p>
        </header>

        <motion.ul
          role="list"
          className="mt-10 space-y-2"
          initial="hidden"
          animate="show"
          variants={listContainerVariants}
        >
          {VIP_TIERS.map((tier) => (
            <motion.li key={tier.name} role="listitem" variants={listItemVariants}>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-[#0c0c10]/90 px-3 py-3 sm:gap-4 sm:px-4">
                <Image
                  src={vipTierBadgeSrc(tier.name)}
                  alt={`${tier.name} badge`}
                  width={VIP_BADGE_INTRINSIC_W}
                  height={VIP_BADGE_INTRINSIC_H}
                  quality={100}
                  sizes="(max-width: 640px) 128px, 152px"
                  className="h-11 w-auto max-w-[100px] shrink-0 object-contain object-left"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate font-golos text-sm font-semibold text-white sm:text-base">
                      {tier.name}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <p className="mt-0.5 font-golos text-xs text-secondary/80 sm:text-sm">
                    <span className="font-semibold tabular-nums text-primary">
                      {formatWager(tier.wagerUsd)}
                    </span>
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
