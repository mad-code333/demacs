"use client";

import Image from "next/image";
import Link from "next/link";
import { GiTrophyCup } from "react-icons/gi";
import { IoTrendingUp } from "react-icons/io5";
import { formatCurrency, type Player } from "./Leaderboard";
import { useSharedLeaderboard } from "./LeaderboardDataProvider";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

function RankRow({ player }: { player: Player }) {
  const avatar = player.avatar ?? "/leaderboard/avatar-placeholder.svg";
  const topThree = player.rank <= 3;

  return (
    <li
      className={[
        "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/5 px-3 py-3.5 transition-colors last:border-0 sm:grid-cols-[3rem_1fr_7rem_5.5rem] sm:gap-4 sm:px-5",
        topThree ? "bg-primary/[0.04]" : "hover:bg-white/[0.03]",
      ].join(" ")}
    >
      <span
        className={[
          "font-golos text-sm font-semibold tabular-nums",
          topThree ? "text-primary" : "text-white/85",
        ].join(" ")}
      >
        #{player.rank}
      </span>
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0d0d14]">
          <Image src={avatar} alt="" fill sizes="36px" className="object-cover" />
        </div>
        <span
          className={[
            "truncate font-golos text-sm font-medium",
            topThree ? "text-primary" : "text-white",
          ].join(" ")}
        >
          {player.username}
        </span>
      </div>
      <span className="hidden text-right font-golos text-sm tabular-nums text-white/90 sm:block">
        <span className="text-primary">$</span>
        {formatCurrency(player.wagered)}
      </span>
      <span className="text-right font-golos text-sm tabular-nums">
        {player.prize > 0 ? (
          <span className="font-semibold text-white">${formatCurrency(player.prize)}</span>
        ) : (
          <span className="text-secondary/40">—</span>
        )}
      </span>
    </li>
  );
}

export function HomeLeaderboardPreview() {
  const { players, phase } = useSharedLeaderboard();
  const preview = (players ?? []).slice(0, 10);

  return (
    <section
      id="leaderboard"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#08090e] px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <SectionLabel icon={IoTrendingUp}>Live leaderboard</SectionLabel>
            <h2 className="mt-6 font-sports text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-none tracking-tight text-white">
              Current <span className="text-primary">standings</span>
            </h2>
            <p className="mt-4 font-golos text-sm text-secondary/75 sm:text-base">
              Top ranks from the live affiliate feed. Same data powering the full leaderboard page.
            </p>
          </div>
          <PrimaryButton href="/affiliates/leaderboard">
            <GiTrophyCup className="size-5 shrink-0" aria-hidden />
            View full leaderboard
          </PrimaryButton>
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.06}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12]/95 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]">
            <div className="hidden grid-cols-[3rem_1fr_7rem_5.5rem] gap-4 border-b border-white/8 bg-white/[0.03] px-5 py-3 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary/55 sm:grid">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Wagered</span>
              <span className="text-right">Prize</span>
            </div>

            {phase === "loading" ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center px-6 py-16">
                <div className="size-10 animate-pulse rounded-full bg-primary/20" aria-hidden />
                <p className="mt-4 font-golos text-sm text-secondary/70">Loading rankings…</p>
              </div>
            ) : null}

            {phase === "error" ? (
              <div className="px-6 py-14 text-center" role="alert">
                <p className="font-golos text-sm font-medium text-white">Couldn&apos;t load rankings</p>
                <p className="mt-2 font-golos text-sm text-secondary/65">
                  Try again from the{" "}
                  <Link href="/affiliates/leaderboard" className="text-primary hover:underline">
                    full leaderboard
                  </Link>
                  .
                </p>
              </div>
            ) : null}

            {phase === "ok" && preview.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <p className="font-golos text-sm text-secondary/75">
                  No wager activity for this period yet.
                </p>
              </div>
            ) : null}

            {phase === "ok" && preview.length > 0 ? (
              <ul role="list">
                {preview.map((player) => (
                  <RankRow key={`${player.rank}-${player.username}`} player={player} />
                ))}
              </ul>
            ) : null}
          </div>

          <p className="mt-5 text-center font-golos text-xs text-secondary/50">
            Updated in real time. Rankings reset at the start of each month (Europe/Berlin).
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
