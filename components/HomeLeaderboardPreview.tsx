"use client";

import Link from "next/link";
import { GiTrophyCup } from "react-icons/gi";
import { IoTrendingUp } from "react-icons/io5";
import { formatCurrency, type Player } from "./Leaderboard";
import { useSharedLeaderboard } from "./LeaderboardDataProvider";
import { PremiumImage } from "./PremiumImage";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

function RankRow({ player }: { player: Player }) {
  const avatar = player.avatar ?? "/leaderboard/avatar-placeholder.svg";
  const topThree = player.rank <= 3;

  return (
    <li
      className={[
        "grid min-h-[4.25rem] grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/5 px-4 py-4 transition-colors last:border-0 sm:grid-cols-[3rem_1fr_7rem_5.5rem] sm:gap-4 sm:px-6 sm:py-[1.15rem]",
        topThree ? "bg-primary/[0.06]" : "hover:bg-white/[0.03]",
      ].join(" ")}
    >
      <span
        className={[
          "font-sans text-base font-semibold tabular-nums",
          topThree ? "text-primary" : "text-white/85",
        ].join(" ")}
      >
        #{player.rank}
      </span>
      <div className="flex min-w-0 items-center gap-3">
        <PremiumImage
          src={avatar}
          alt=""
          width={36}
          height={36}
          sizes="36px"
          unoptimized={avatar.startsWith("http")}
          frameClassName="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#0d0d14]"
          className="size-9 object-cover"
        />
        <span
          className={[
            "truncate font-sans text-sm font-medium",
            topThree ? "text-primary" : "text-white",
          ].join(" ")}
        >
          {player.username}
        </span>
      </div>
      <span className="hidden text-right font-sans text-sm tabular-nums text-white/90 sm:block">
        <span className="text-primary">$</span>
        {formatCurrency(player.wagered)}
      </span>
      <span className="text-right font-sans text-sm tabular-nums">
        {player.prize > 0 ? (
          <span className="font-semibold text-white">${formatCurrency(player.prize)}</span>
        ) : (
          <span className="text-secondary/40">—</span>
        )}
      </span>
    </li>
  );
}

function LoadingRows() {
  return (
    <ul role="presentation" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="demacs-skeleton-row border-b border-white/5 last:border-0" />
      ))}
    </ul>
  );
}

export function HomeLeaderboardPreview() {
  const { players, phase } = useSharedLeaderboard();
  const preview = (players ?? []).slice(0, 10);

  return (
    <section
      id="leaderboard"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/5 bg-transparent px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,255,0,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <SectionLabel icon={IoTrendingUp}>Live leaderboard</SectionLabel>
            <h2 className="type-section-uppercase mt-6 font-sans text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-none text-white">
              Current <span className="text-primary">standings</span>
            </h2>
            <p className="mt-5 font-sans text-base leading-7 text-secondary/75">
              Top ranks from the live affiliate feed. Same data powering the full leaderboard page.
            </p>
          </div>
          <PrimaryButton href="/affiliates/leaderboard" size="lg">
            <GiTrophyCup className="size-5 shrink-0" aria-hidden />
            View full leaderboard
          </PrimaryButton>
        </ScrollReveal>

        <ScrollReveal className="mt-12" delay={0.06}>
          <div className="demacs-card demacs-card-light demacs-card--featured overflow-hidden rounded-[28px]">
            <div className="hidden grid-cols-[3rem_1fr_7rem_5.5rem] gap-4 border-b border-primary/15 bg-primary/[0.04] px-6 py-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-secondary/55 sm:grid">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Wagered</span>
              <span className="text-right">Prize</span>
            </div>

            {phase === "loading" ? (
              <div aria-busy="true" aria-label="Loading rankings">
                <LoadingRows />
              </div>
            ) : null}

            {phase === "error" ? (
              <div className="px-6 py-14 text-center" role="alert">
                <p className="font-sans text-sm font-medium text-white">Couldn&apos;t load rankings</p>
                <p className="mt-2 font-sans text-sm text-secondary/65">
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
                <p className="font-sans text-sm text-secondary/75">
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

          <p className="mt-5 text-center font-sans text-xs text-secondary/50">
            Updated in real time. Rankings reset at the start of each month (Europe/Berlin).
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
