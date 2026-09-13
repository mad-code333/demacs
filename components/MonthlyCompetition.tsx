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

function PodiumSkeleton() {
  return (
    <div className="demacs-skeleton-podium flex flex-col items-center justify-center gap-3 px-6" aria-hidden>
      <div className="size-16 animate-pulse rounded-full bg-primary/15" />
      <div className="h-3 w-24 rounded bg-white/10" />
      <div className="h-3 w-16 rounded bg-white/8" />
    </div>
  );
}

export function MonthlyCompetition() {
  const countdown = useCountdown(getNextPeriodEnd());
  const { players, phase } = useSharedLeaderboard();
  const loading = phase === "loading";

  const first = players?.[0];
  const second = players?.[1];
  const third = players?.[2];
  const podiumSecond = second ?? emptyPodiumSlot(2);
  const podiumFirst = first ?? emptyPodiumSlot(1);
  const podiumThird = third ?? emptyPodiumSlot(3);
  const leaderName = first?.username;
  const periodLive = countdown.days !== "0" || countdown.hours !== "00" || countdown.minutes !== "00" || countdown.seconds !== "00";

  return (
    <section
      id="monthly-competition"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,0,0.08),transparent_44%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="flex flex-col items-center text-center">
          <SectionLabel icon={IoTimeOutline}>Monthly competition</SectionLabel>
          <h2 className="type-section-uppercase mt-6 font-sans text-[clamp(2.4rem,6.5vw,4.4rem)] uppercase leading-none text-white">
            Fight for the{" "}
            <span className="text-primary">${formatCurrency(MONTHLY_PRIZE_POOL)}</span>
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-secondary/75">
            Wager under{" "}
            <span className="font-semibold text-primary">demacskick</span>. Top{" "}
            {TOP_MONTHLY_PRIZES.length} finishers split the monthly pool — 1st takes $
            {formatCurrency(TOP_MONTHLY_PRIZES[0] ?? 0)}.
          </p>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="type-label font-sans text-[0.65rem] uppercase text-secondary/55">
                Prize pool
              </p>
              <p className="type-hero mt-3 font-sans text-3xl text-primary sm:text-4xl">
                ${formatCurrency(MONTHLY_PRIZE_POOL)}
              </p>
            </DimensionalCard>
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="type-label font-sans text-[0.65rem] uppercase text-secondary/55">
                Current leader
              </p>
              <p className="mt-3 truncate font-sans text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {loading ? (
                  <span className="inline-block h-8 w-28 animate-pulse rounded bg-white/10 align-middle" aria-hidden />
                ) : (
                  leaderName ?? "—"
                )}
              </p>
            </DimensionalCard>
            <DimensionalCard className="rounded-[22px] px-5 py-6">
              <p className="type-label font-sans text-[0.65rem] uppercase text-secondary/55">
                Status
              </p>
              <p className="mt-3 font-sans text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                {periodLive ? "Live" : "Ended"}
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
              {loading ? <PodiumSkeleton /> : <PodiumCard player={podiumSecond} />}
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 sm:order-2" delay={0}>
            <div className="sm:scale-[1.04] sm:pt-2">
              {loading ? <PodiumSkeleton /> : <PodiumCard player={podiumFirst} />}
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-3" delay={0.1}>
            <div className="sm:pt-14">
              {loading ? <PodiumSkeleton /> : <PodiumCard player={podiumThird} />}
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
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-secondary/65 transition-colors hover:text-primary"
          >
            Preview live ranks
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
