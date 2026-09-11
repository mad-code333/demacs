"use client";

import Image from "next/image";
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
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const perkCards = [
  {
    title: "Daily bonuses",
    description:
      "Play under code gambanatorkick and unlock rewards tied to your active affiliate progress.",
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
      className="relative isolate overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(120,255,0,0.09),transparent_36%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel icon={GiSparkles}>Rewards & VIP</SectionLabel>
          <h2 className="mt-6 font-sports text-[clamp(2.3rem,5vw,4rem)] uppercase leading-none tracking-tight text-white">
            Perks that <span className="text-primary">scale</span> with you
          </h2>
          <p className="mt-4 font-golos text-sm text-secondary/75 sm:text-base">
            Bonuses, VIP progression, and monthly competition — all tied to the same DEMACS ecosystem.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {perkCards.map(({ title, description, icon: Icon, href, cta, native }, index) => (
            <ScrollReveal key={title} delay={index * 0.06} className="h-full">
              <article className="demacs-card group flex h-full flex-col rounded-2xl p-6">
                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-6 font-golos text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-secondary/70">{description}</p>
                {native ? (
                  <a
                    href={href}
                    className="mt-6 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors group-hover:text-[#9dff4a]"
                  >
                    {cta}
                    <IoArrowForward className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="mt-6 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-colors group-hover:text-[#9dff4a]"
                  >
                    {cta}
                    <IoArrowForward className="size-3.5" aria-hidden />
                  </Link>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="demacs-card mt-10 overflow-hidden rounded-2xl p-5 sm:p-7" delay={0.08}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-golos text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                VIP snapshot
              </p>
              <h3 className="mt-2 font-sports text-2xl uppercase tracking-tight text-white sm:text-3xl">
                Climb the published ladder
              </h3>
            </div>
            <Link
              href="/affiliates/vip-rewards"
              className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.18em] text-secondary/75 transition-colors hover:text-white"
            >
              Full VIP list
              <IoArrowForward className="size-3.5" aria-hidden />
            </Link>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {VIP_PROGRESSION_MILESTONES.map((tier) => (
              <li
                key={tier.name}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3"
              >
                <Image
                  src={vipTierBadgeSrc(tier.name)}
                  alt={`${tier.name} badge`}
                  width={256}
                  height={160}
                  className="h-10 w-auto max-w-[88px] shrink-0 object-contain"
                />
                <div className="min-w-0">
                  <p className="truncate font-golos text-sm font-semibold text-white">{tier.name}</p>
                  <p className="font-golos text-xs text-secondary/65">{formatVipWager(tier.wagerUsd)}+</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
