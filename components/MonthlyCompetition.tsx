"use client";

import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL, TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";
import {
  emptyPodiumSlot,
  formatCurrency,
  getNextPeriodEnd,
  useCountdown,
} from "./Leaderboard";
import { useSharedLeaderboard } from "./LeaderboardDataProvider";
import {
  ChampionshipArenaFx,
  ChampionshipCountdown,
  ChampionshipCTA,
  ChampionshipPodium,
} from "./championship";
import { ScrollReveal } from "./ScrollReveal";

export function MonthlyCompetition() {
  const countdown = useCountdown(getNextPeriodEnd());
  const { players, phase } = useSharedLeaderboard();
  const loading = phase === "loading";
  const list = players ?? [];
  const noRealUsers = !loading && list.length === 0;

  // Always fill missing top-3 seats with fake $0.00 stand-ins.
  const podiumFirst = loading ? null : list[0] ?? emptyPodiumSlot(1);
  const podiumSecond = loading ? null : list[1] ?? emptyPodiumSlot(2);
  const podiumThird = loading ? null : list[2] ?? emptyPodiumSlot(3);

  return (
    <section
      id="monthly-competition"
      className="champ-arena relative scroll-mt-24 overflow-hidden border-t border-white/5 bg-transparent px-4 py-20 sm:px-6 lg:py-28"
    >
      <ChampionshipArenaFx />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <ScrollReveal className="flex flex-col items-center text-center">
          <p className="type-label font-sans text-[0.72rem] uppercase text-[#A1A1AA]">
            DEMACS Championship
          </p>
          <h2 className="type-section-uppercase mt-4 font-sans text-[clamp(2.2rem,6vw,4rem)] uppercase leading-none text-white">
            Fight for the{" "}
            <span className="text-primary">${formatCurrency(MONTHLY_PRIZE_POOL)}</span>
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-[#A1A1AA] sm:text-base">
            Wager under{" "}
            <span className="font-semibold text-primary">demacskick</span>. Top{" "}
            {TOP_MONTHLY_PRIZES.length} finishers share the pool — 1st takes $
            {formatCurrency(TOP_MONTHLY_PRIZES[0] ?? 0)}.
          </p>

          <div className="mt-9 flex w-full justify-center">
            <ChampionshipCountdown
              days={countdown.days}
              hours={countdown.hours}
              minutes={countdown.minutes}
              seconds={countdown.seconds}
            />
          </div>
        </ScrollReveal>

        <div className="mt-12 sm:mt-14">
          {noRealUsers ? (
            <p className="mb-8 text-center font-sans text-sm text-[#A1A1AA]">
              No qualifying players yet — showing the empty podium at $0.00.
            </p>
          ) : null}
          <ChampionshipPodium
            first={podiumFirst}
            second={podiumSecond}
            third={podiumThird}
            loading={loading}
          />
        </div>

        <ScrollReveal className="mt-14 flex flex-col items-center gap-4 sm:mt-16" delay={0.08}>
          <ChampionshipCTA />
          <Link
            href="#leaderboard"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#A1A1AA] transition-colors hover:text-primary"
          >
            Preview live ranks
            <IoArrowForward className="size-3.5" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
