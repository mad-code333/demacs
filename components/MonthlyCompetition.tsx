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
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#0a0b10] px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,0,0.11),transparent_40%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="flex flex-col items-center text-center">
          <SectionLabel icon={IoTimeOutline}>Monthly competition</SectionLabel>
          <h2 className="mt-6 font-sports text-[clamp(2.4rem,7vw,4.6rem)] uppercase leading-none tracking-tight text-white">
            Fight for the{" "}
            <span className="text-primary">${formatCurrency(MONTHLY_PRIZE_POOL)}</span>
          </h2>
          <p className="mt-4 max-w-2xl font-golos text-sm text-secondary/75 sm:text-base">
            Wager under{" "}
            <span className="font-semibold text-primary">gambanatorkick</span>. Top{" "}
            {TOP_MONTHLY_PRIZES.length} finishers split the monthly pool — 1st takes $
            {formatCurrency(TOP_MONTHLY_PRIZES[0] ?? 0)}.
          </p>

          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-[#101218]/90 px-4 py-4">
              <p className="font-golos text-[0.6rem] uppercase tracking-[0.2em] text-secondary/55">
                Prize pool
              </p>
              <p className="mt-2 font-golos text-2xl font-semibold text-primary">
                ${formatCurrency(MONTHLY_PRIZE_POOL)}
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#101218]/90 px-4 py-4">
              <p className="font-golos text-[0.6rem] uppercase tracking-[0.2em] text-secondary/55">
                Current leader
              </p>
              <p className="mt-2 truncate font-golos text-2xl font-semibold text-white">
                {phase === "loading" ? "…" : leaderName ?? "—"}
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#101218]/90 px-4 py-4">
              <p className="font-golos text-[0.6rem] uppercase tracking-[0.2em] text-secondary/55">
                Status
              </p>
              <p className="mt-2 font-golos text-2xl font-semibold text-primary">Active</p>
            </div>
          </div>

          <div className="mt-4 w-full max-w-2xl">
            <CountdownStrip
              days={countdown.days}
              hours={countdown.hours}
              minutes={countdown.minutes}
              seconds={countdown.seconds}
            />
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
          <ScrollReveal className="order-2 sm:order-1" delay={0.05}>
            <div className="sm:pt-12">
              <PodiumCard player={podiumSecond} />
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-1 sm:order-2" delay={0}>
            <div className="sm:pt-2">
              <PodiumCard player={podiumFirst} />
            </div>
          </ScrollReveal>
          <ScrollReveal className="order-3" delay={0.1}>
            <div className="sm:pt-12">
              <PodiumCard player={podiumThird} />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-14 flex flex-col items-center gap-4" delay={0.08}>
          <PrimaryButton href="/affiliates/leaderboard">
            <GiTrophyCup className="size-5 shrink-0" aria-hidden />
            Open full leaderboard
          </PrimaryButton>
          <Link
            href="#leaderboard"
            className="inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.18em] text-secondary/65 transition-colors hover:text-primary"
          >
            Preview live ranks
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
