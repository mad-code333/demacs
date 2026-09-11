"use client";

import Link from "next/link";
import { GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoTimeOutline } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL, TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";
import {
  CountdownStrip,
  emptyPodiumSlot,
  formatCurrency,
  getNextPeriodEnd,
  PodiumCard,
  useCountdown,
} from "./Leaderboard";
import { useSharedLeaderboard } from "./LeaderboardDataProvider";
import { DimensionalCard } from "./DimensionalCard";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function MonthlyCompetition() {
  const countdown = useCountdown(getNextPeriodEnd());
  const { players, phase } = useSharedLeaderboard();

  const first = players?.[0];
  const second = players?.[1];
  const third = players?.[2];
  const podiumSecond = second ?? emptyPodiumSlot(2);
  const podiumFirst = first ?? emptyPodiumSlot(1);
  const podiumThird = third ?? emptyPodiumSlot(3);
  const leaderName = first?.username;

  return (
    <section
      id="monthly-competition"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,0,0.12),transparent_42%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="flex flex-col items-center text-center">
          <SectionLabel icon={IoTimeOutline}>Monthly competition</SectionLabel>
          <h2 className="mt-6 font-sports text-[clamp(2.4rem,6.5vw,4.4rem)] uppercase leading-none tracking-tight text-white">
            Fight for the{" "}
            <span className="text-primary">${formatCurrency(MONTHLY_PRIZE_POOL)}</span>
          </h2>
          <p className="mt-5 max-w-2xl font-golos text-base leading-7 text-secondary/75">
            Wager under{" "}
            <span className="font-semibold text-primary">gambanatorkick</span>. Top{" "}
            {TOP_MONTHLY_PRIZES.length} finishers split the monthly pool — 1st takes $
            {formatCurrency(TOP_MONTHLY_PRIZES[0] ?? 0)}.
          </p>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="font-golos text-[0.65rem] uppercase tracking-[0.16em] text-secondary/55">
                Prize pool
              </p>
              <p className="mt-3 font-golos text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                ${formatCurrency(MONTHLY_PRIZE_POOL)}
              </p>
            </DimensionalCard>
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="font-golos text-[0.65rem] uppercase tracking-[0.16em] text-secondary/55">
                Current leader
              </p>
              <p className="mt-3 truncate font-golos text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {phase === "loading" ? "…" : leaderName ?? "—"}
              </p>
            </DimensionalCard>
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="font-golos text-[0.65rem] uppercase tracking-[0.16em] text-secondary/55">
                Status
              </p>
              <p className="mt-3 font-golos text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                Active
              </p>
            </DimensionalCard>
          </div>

          <div className="mt-6 w-full max-w-3xl">
            <CountdownStrip
              days={countdown.days}
              hours={countdown.hours}
              minutes={countdown.minutes}
              seconds={countdown.seconds}
            />
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-start sm:gap-6">
          <ScrollReveal className="order-2 sm:order-1" delay={0.05}>
            <div className="sm:pt-14">
              <PodiumCard player={podiumSecond} />
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 sm:order-2" delay={0}>
            <div className="sm:scale-[1.04] sm:pt-2">
              <PodiumCard player={podiumFirst} />
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-3" delay={0.1}>
            <div className="sm:pt-14">
              <PodiumCard player={podiumThird} />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 flex flex-col items-center gap-4" delay={0.08}>
          <PrimaryButton href="/affiliates/leaderboard" size="lg">
            <GiTrophyCup className="size-5 shrink-0" aria-hidden />
            Open full leaderboard
          </PrimaryButton>
          <Link
            href="#leaderboard"
            className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-secondary/65 transition-colors hover:text-primary"
          >
            Preview live ranks
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
