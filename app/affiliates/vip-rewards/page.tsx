"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { VIP_TIERS, vipTierBadgeSrc } from "@/lib/vip-tiers";

const ease = [0.22, 1, 0.36, 1] as const;

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
    <div className="min-h-screen bg-transparent px-4 py-16 font-golos text-bright sm:px-6 sm:py-20">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >

        <header className="mt-8">
          <h1 className="type-section-uppercase font-sans text-3xl uppercase text-white sm:text-4xl">
            VIP rewards
          </h1>
          <p className="type-body mt-3 font-sans text-sm leading-relaxed text-secondary/75 sm:font-medium">
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
