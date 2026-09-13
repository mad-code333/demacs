"use client";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import {
  formatVipWager,
  VIP_PROGRESSION_MILESTONES,
  vipTierBadgeSrc,
} from "@/lib/vip-tiers";
import { DimensionalCard } from "../DimensionalCard";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

export function VIPProgression() {
  return (
    <section
      id="vip-progression"
      className="relative isolate border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(120,255,0,0.08),transparent_52%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <SectionLabel>VIP progression</SectionLabel>
            <h2 className="type-section-uppercase mt-6 font-sans text-[clamp(2.2rem,5vw,3.6rem)] uppercase leading-none text-white">
              Climb the <span className="text-primary">published ladder</span>
            </h2>
            <p className="mt-5 font-golos text-base leading-7 text-[#8E978E]">
              Real lifetime-wager thresholds. Higher tiers unlock stronger perks.
            </p>
          </div>
          <Link
            href="/affiliates/vip-rewards"
            className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:text-white"
          >
            Full VIP list
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" role="list">
          {VIP_PROGRESSION_MILESTONES.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={index * 0.06} className="relative h-full">
              {index < VIP_PROGRESSION_MILESTONES.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-[calc(50%+1.75rem)] top-[3.75rem] z-0 hidden h-px w-[calc(100%-0.25rem)] lg:block"
                  aria-hidden
                >
                  <div
                    className="h-px w-full bg-gradient-to-r from-primary/45 to-transparent demacs-line-draw"
                    style={{ animationDelay: `${0.12 + index * 0.1}s` }}
                  />
                </div>
              ) : null}
              <DimensionalCard
                className={[
                  "relative z-10 flex h-full min-h-[240px] flex-col items-center rounded-[24px] p-6 text-center sm:p-7",
                  index === VIP_PROGRESSION_MILESTONES.length - 1 ? "demacs-card--featured" : "",
                ].join(" ")}
              >
                <Image
                  src={vipTierBadgeSrc(tier.name)}
                  alt={`${tier.name} badge`}
                  width={256}
                  height={160}
                  className="h-14 w-auto max-w-[130px] object-contain drop-shadow-[0_0_18px_rgba(120,255,0,0.18)]"
                />
                <p className="type-card-title mt-5 font-sans text-xl text-white sm:font-bold">{tier.name}</p>
                <p className="mt-2 font-golos text-sm uppercase tracking-[0.14em] text-[#8E978E]">
                  {formatVipWager(tier.wagerUsd)}+
                </p>
                <p className="mt-4 font-golos text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  Step {index + 1}
                </p>
              </DimensionalCard>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
