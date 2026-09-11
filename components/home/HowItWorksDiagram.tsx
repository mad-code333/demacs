"use client";

import { useReducedMotion } from "framer-motion";
import { GiMedal, GiTrophyCup } from "react-icons/gi";
import { IoGameController, IoWallet } from "react-icons/io5";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

const steps = [
  { n: "01", title: "Play", desc: "Sign in and start under code gambanatorkick.", Icon: IoGameController },
  { n: "02", title: "Earn", desc: "Build wagered volume and unlock progress.", Icon: IoWallet },
  { n: "03", title: "Climb", desc: "Push your rank on the live leaderboard.", Icon: GiMedal },
  { n: "04", title: "Reward", desc: "Claim VIP perks and monthly prizes.", Icon: GiTrophyCup },
] as const;

export function HowItWorksDiagram() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative isolate scroll-mt-24 border-t border-white/5 px-4 py-20 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,255,0,0.06),transparent_55%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-6 font-sports text-[clamp(2.1rem,5vw,3.6rem)] uppercase leading-none tracking-tight text-white">
            Play → Earn → Climb → <span className="text-primary">Reward</span>
          </h2>
          <p className="mt-4 font-golos text-sm text-[#8E978E] sm:text-base">
            A clear path from your first session to the monthly prize pool.
          </p>
        </ScrollReveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-4" role="list">
          {steps.map(({ n, title, desc, Icon }, index) => (
            <ScrollReveal key={n} delay={index * 0.06} className="relative h-full">
              {index < steps.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-[calc(50%+2rem)] top-10 z-0 hidden h-px w-[calc(100%-1rem)] md:block"
                  aria-hidden
                >
                  <div className="h-px w-full bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
                  {!reduce ? (
                    <span className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(120,255,0,0.8)] demacs-pulse-dot" />
                  ) : null}
                </div>
              ) : null}
              <li className="demacs-card relative z-10 flex h-full flex-col rounded-2xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-golos text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    {n}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                </div>
                <h3 className="mt-5 font-golos text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8E978E]">{desc}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
