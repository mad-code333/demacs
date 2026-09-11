"use client";

import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import {
  formatVipWager,
  VIP_PROGRESSION_MILESTONES,
  vipTierBadgeSrc,
} from "@/lib/vip-tiers";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

export function VIPProgression() {
  return (
    <section id="vip-progression" className="relative isolate border-t border-white/5 px-4 py-20 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(120,255,0,0.07),transparent_50%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <SectionLabel>VIP progression</SectionLabel>
            <h2 className="mt-6 font-sports text-[clamp(2.1rem,5vw,3.5rem)] uppercase leading-none tracking-tight text-white">
              Climb the <span className="text-primary">published ladder</span>
            </h2>
            <p className="mt-4 font-golos text-sm text-[#8E978E] sm:text-base">
              Real lifetime-wager thresholds. Higher tiers unlock stronger perks.
            </p>
          </div>
          <Link
            href="/affiliates/vip-rewards"
            className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.18em] text-secondary/75 transition-colors hover:text-white"
          >
            Full VIP list
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {VIP_PROGRESSION_MILESTONES.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={index * 0.05} className="relative h-full">
              {index < VIP_PROGRESSION_MILESTONES.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-[calc(50%+1.5rem)] top-[3.25rem] z-0 hidden h-px w-[calc(100%-0.5rem)] lg:block"
                  aria-hidden
                >
                  <div className="h-px w-full bg-gradient-to-r from-primary/40 to-transparent" />
                </div>
              ) : null}
              <li
                className={[
                  "demacs-card relative z-10 flex h-full flex-col items-center rounded-2xl p-5 text-center",
                  index === VIP_PROGRESSION_MILESTONES.length - 1 ? "border-primary/25 shadow-[0_0_0_1px_rgba(120,255,0,0.08),0_16px_40px_rgba(0,0,0,0.35)]" : "",
                ].join(" ")}
              >
                <Image
                  src={vipTierBadgeSrc(tier.name)}
                  alt={`${tier.name} badge`}
                  width={256}
                  height={160}
                  className="h-12 w-auto max-w-[110px] object-contain"
                />
                <p className="mt-4 font-golos text-lg font-semibold text-white">{tier.name}</p>
                <p className="mt-1 font-golos text-xs uppercase tracking-[0.16em] text-[#8E978E]">
                  {formatVipWager(tier.wagerUsd)}+
                </p>
                <p className="mt-3 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  Step {index + 1}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
