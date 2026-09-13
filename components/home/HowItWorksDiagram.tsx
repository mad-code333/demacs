"use client";

import { useReducedMotion } from "framer-motion";
import { GiMedal, GiTrophyCup } from "react-icons/gi";
import { IoGameController, IoWallet } from "react-icons/io5";
import { DimensionalCard } from "../DimensionalCard";
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
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-24 border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,255,0,0.07),transparent_55%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="type-section mt-6 font-sans text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.05] text-white">
            Play → Earn → Climb → <span className="text-primary">Reward</span>
          </h2>
          <p className="mt-5 font-body text-base leading-7 text-[#8E978E]">
            A clear path from your first session to the monthly prize pool.
          </p>
        </ScrollReveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-4 md:gap-6" role="list">
          {steps.map(({ n, title, desc, Icon }, index) => (
            <ScrollReveal key={n} delay={index * 0.07} className="relative h-full">
              {index < steps.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-[calc(50%+2.25rem)] top-12 z-0 hidden h-px w-[calc(100%-0.5rem)] md:block"
                  aria-hidden
                >
                  <div
                    className={[
                      "h-px w-full bg-gradient-to-r from-primary/45 via-primary/18 to-transparent",
                      !reduce ? "demacs-line-draw" : "",
                    ].join(" ")}
                    style={!reduce ? { animationDelay: `${0.15 + index * 0.12}s` } : undefined}
                  />
                  {!reduce ? (
                    <span className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(120,255,0,0.45)] demacs-pulse-dot" />
                  ) : null}
                </div>
              ) : null}
              <DimensionalCard className="relative z-10 flex h-full min-h-[220px] flex-col rounded-[24px] p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="type-label font-sans text-[0.7rem] uppercase text-primary">
                    {n}
                  </span>
                  <div className="demacs-icon-plate flex size-12 items-center justify-center rounded-2xl text-primary sm:size-[52px]">
                    <Icon className="size-6 sm:size-7" aria-hidden />
                  </div>
                </div>
                <h3 className="type-card-title mt-7 font-sans text-2xl text-white sm:font-bold">{title}</h3>
                <p className="mt-3 font-body text-[0.95rem] leading-7 text-[#8E978E]">{desc}</p>
              </DimensionalCard>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
