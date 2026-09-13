"use client";

import { useReducedMotion } from "framer-motion";
import { GiMedal, GiTrophyCup } from "react-icons/gi";
import { IoGameController, IoPeople } from "react-icons/io5";
import { TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";
import { DimensionalCard } from "../DimensionalCard";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

const flow = [
  { title: "Play", desc: "Join with Kick and wager under the affiliate code.", Icon: IoGameController },
  { title: "Leaderboard", desc: "Compete in the live monthly rankings.", Icon: IoPeople },
  { title: `Top ${TOP_MONTHLY_PRIZES.length}`, desc: "Finish inside the paid prize bracket.", Icon: GiMedal },
  { title: "Rewards", desc: "Split the monthly pool and unlock VIP perks.", Icon: GiTrophyCup },
] as const;

export function CompetitionFlow() {
  const reduce = useReducedMotion();

  return (
    <section
      id="competition-flow"
      className="relative isolate border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,197,66,0.06),transparent_45%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Competition flow</SectionLabel>
          <h2 className="type-section-uppercase mt-6 font-sans text-[clamp(2.2rem,5vw,3.6rem)] uppercase leading-none text-white">
            Play → Leaderboard → Top {TOP_MONTHLY_PRIZES.length} → <span className="text-primary">Rewards</span>
          </h2>
          <p className="mt-5 font-golos text-base leading-7 text-[#8E978E]">
            How DEMACS turns play into ranking, VIP progress, and rewards.
          </p>
        </ScrollReveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6" role="list">
          {flow.map(({ title, desc, Icon }, index) => (
            <ScrollReveal key={title} delay={index * 0.06} className="relative h-full">
              {index < flow.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-[calc(50%+2.25rem)] top-12 z-0 hidden h-px w-[calc(100%-0.5rem)] lg:block"
                  aria-hidden
                >
                  <div
                    className={[
                      "h-px w-full bg-gradient-to-r from-primary/55 via-primary/20 to-transparent",
                      !reduce ? "demacs-line-draw" : "",
                    ].join(" ")}
                    style={!reduce ? { animationDelay: `${0.12 + index * 0.1}s` } : undefined}
                  />
                </div>
              ) : null}
              <DimensionalCard className="relative z-10 flex h-full min-h-[210px] flex-col rounded-[24px] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="type-label font-sans text-[0.7rem] uppercase text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="demacs-icon-plate flex size-12 items-center justify-center rounded-2xl text-primary sm:size-[52px]">
                    <Icon className="size-6 sm:size-7" aria-hidden />
                  </div>
                </div>
                <h3 className="type-card-title mt-7 font-sans text-xl text-white sm:text-2xl sm:font-bold">
                  {title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#8E978E]">{desc}</p>
              </DimensionalCard>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
