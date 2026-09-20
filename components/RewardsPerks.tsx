"use client";

import Link from "next/link";
import { GiCrown, GiSparkles, GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoFlash } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL } from "@/lib/leaderboard-prizes";
import {
  formatVipWager,
  VIP_PROGRESSION_MILESTONES,
  vipTierBadgeSrc,
} from "@/lib/vip-tiers";
import { formatCurrency } from "./Leaderboard";
import { DimensionalCard } from "./DimensionalCard";
import { InstantImage } from "./InstantImage";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const perkCards = [
  {
    title: "Daily bonuses",
    description:
      "Play under code demacskick and unlock rewards tied to your active affiliate progress.",
    icon: IoFlash,
    href: "/api/auth/kick?next=/",
    cta: "Claim with Kick",
    native: true,
  },
  {
    title: "VIP ladder",
    description:
      "Climb published tiers from Beginner through Immortal — each unlock is based on lifetime wager.",
    icon: GiCrown,
    href: "/affiliates/vip-rewards",
    cta: "See VIP tiers",
    native: false,
  },
  {
    title: "Monthly rewards",
    description: `Compete for a $${formatCurrency(MONTHLY_PRIZE_POOL)} prize pool with live rankings and Berlin month resets.`,
    icon: GiTrophyCup,
    href: "/affiliates/leaderboard",
    cta: "Open leaderboard",
    native: false,
  },
] as const;

export function RewardsPerks() {
  return (
    <section
      id="rewards"
      className="relative isolate overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.1),transparent_38%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel icon={GiSparkles}>Rewards & VIP</SectionLabel>
          <h2 className="type-section-uppercase mt-6 font-sans text-[clamp(2.3rem,5vw,3.8rem)] uppercase leading-none text-white">
            Perks that <span className="text-primary">scale</span> with you
          </h2>
          <p className="mt-5 font-golos text-base leading-7 text-secondary/75">
            Bonuses, VIP progression, and monthly competition — all tied to the same DEMACS ecosystem.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {perkCards.map(({ title, description, icon: Icon, href, cta, native }, index) => (
            <ScrollReveal key={title} delay={index * 0.06} className="h-full">
              <DimensionalCard className="group flex h-full min-h-[280px] flex-col rounded-[24px] p-7 sm:p-8">
                <div className="demacs-icon-plate flex size-12 items-center justify-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-105 sm:size-[52px]">
                  <Icon className="size-6 sm:size-7" aria-hidden />
                </div>
                <h3 className="type-card-title mt-7 font-sans text-2xl text-white sm:font-bold">{title}</h3>
                <p className="mt-3 flex-1 text-[0.98rem] leading-7 text-secondary/70">{description}</p>
                {native ? (
                  <a
                    href={href}
                    className="mt-7 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-all group-hover:gap-2.5 group-hover:text-[#C084FC]"
                  >
                    {cta}
                    <IoArrowForward className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="mt-7 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-all group-hover:gap-2.5 group-hover:text-[#C084FC]"
                  >
                    {cta}
                    <IoArrowForward className="size-3.5" aria-hidden />
                  </Link>
                )}
              </DimensionalCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12" delay={0.08}>
          <DimensionalCard className="overflow-hidden rounded-[28px] p-6 sm:p-8" interactive={false}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-golos text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  VIP snapshot
                </p>
                <h3 className="type-section-uppercase mt-2 font-sans text-2xl uppercase text-white sm:text-3xl">
                  Climb the published ladder
                </h3>
              </div>
              <Link
                href="/affiliates/vip-rewards"
                className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:text-white"
              >
                Full VIP list
                <IoArrowForward className="size-3.5" aria-hidden />
              </Link>
            </div>

            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {VIP_PROGRESSION_MILESTONES.map((tier) => (
                <li
                  key={tier.name}
                  className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5"
                >
                  <InstantImage
                    src={vipTierBadgeSrc(tier.name)}
                    alt={`${tier.name} badge`}
                    width={96}
                    height={60}
                    loading="lazy"
                    fetchPriority="low"
                    frameClassName="inline-flex h-11 max-w-[96px] shrink-0 items-center justify-center"
                    className="h-11 w-auto max-w-[96px] object-contain"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-golos text-sm font-semibold text-white">{tier.name}</p>
                    <p className="font-golos text-xs text-secondary/65">{formatVipWager(tier.wagerUsd)}+</p>
                  </div>
                </li>
              ))}
            </ul>
          </DimensionalCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
