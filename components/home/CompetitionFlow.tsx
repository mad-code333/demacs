"use client";

import { GiMedal, GiTrophyCup } from "react-icons/gi";
import { IoGameController, IoPeople, IoWallet } from "react-icons/io5";
import { TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

const flow = [
  { title: "Play", desc: "Join with Kick and wager under the affiliate code.", Icon: IoGameController },
  { title: "Earn", desc: "Track volume, bonuses, and VIP progress.", Icon: IoWallet },
  { title: "Climb leaderboard", desc: "Compete in the live monthly rankings.", Icon: IoPeople },
  { title: `Top ${TOP_MONTHLY_PRIZES.length}`, desc: "Finish inside the paid prize bracket.", Icon: GiMedal },
  { title: "Rewards", desc: "Split the monthly pool and unlock VIP perks.", Icon: GiTrophyCup },
] as const;

export function CompetitionFlow() {
  return (
    <section id="competition-flow" className="relative isolate border-t border-white/5 px-4 py-20 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,197,66,0.06),transparent_45%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Competition flow</SectionLabel>
          <h2 className="mt-6 font-sports text-[clamp(2.1rem,5vw,3.5rem)] uppercase leading-none tracking-tight text-white">
            From session to <span className="text-primary">payout</span>
          </h2>
          <p className="mt-4 font-golos text-sm text-[#8E978E] sm:text-base">
            How DEMACS turns play into ranking, VIP progress, and rewards.
          </p>
        </ScrollReveal>

        <ol className="mt-12 space-y-3" role="list">
          {flow.map(({ title, desc, Icon }, index) => (
            <ScrollReveal key={title} delay={index * 0.04}>
              <li className="demacs-card relative flex items-start gap-4 rounded-2xl p-4 sm:items-center sm:p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-golos text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-golos text-lg font-semibold text-white">{title}</h3>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#8E978E]">{desc}</p>
                </div>
                {index < flow.length - 1 ? (
                  <span
                    className="pointer-events-none absolute -bottom-3 left-[2.05rem] hidden h-3 w-px bg-gradient-to-b from-primary/50 to-transparent sm:block"
                    aria-hidden
                  />
                ) : null}
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
