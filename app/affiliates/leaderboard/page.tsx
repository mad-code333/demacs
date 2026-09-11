"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IoChevronBack, IoTrendingUp } from "react-icons/io5";
import {
  CountdownStrip,
  emptyPodiumSlot,
  getNextPeriodEnd,
  LeaderboardTable,
  PodiumCard,
  type Player,
  useCountdown,
} from "@/components/Leaderboard";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  berlinYearMonthKey,
  LEADERBOARD_TIME_ZONE,
} from "@/lib/leaderboard-berlin-period";

const ease = [0.22, 1, 0.36, 1] as const;

type LeaderboardMeta = {
  sortBy: string;
  startDate: string | null;
  endDate: string | null;
  count: number;
};

type ApiSuccess = {
  players: Array<
    Player & {
      uid?: string;
      rankLevel?: number;
      rankLevelImage?: string;
      favoriteGameTitle?: string;
    }
  >;
  meta: LeaderboardMeta;
};

function toPlayers(data: ApiSuccess): Player[] {
  return data.players.map((p) => ({
    rank: p.rank,
    username: p.username,
    wagered: p.wagered,
    prize: p.prize,
    avatar: p.avatar,
  }));
}

function formatMetaRange(meta: LeaderboardMeta | null) {
  if (!meta?.startDate || !meta?.endDate) return null;
  try {
    const start = new Date(meta.startDate);
    const end = new Date(meta.endDate);
    const sameMonth =
      berlinYearMonthKey(start) === berlinYearMonthKey(end);
    const fmt: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      timeZone: LEADERBOARD_TIME_ZONE,
    };
    if (sameMonth) {
      return `${start.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: LEADERBOARD_TIME_ZONE })} (Europe/Berlin)`;
    }
    return `${start.toLocaleDateString("en-US", fmt)} – ${end.toLocaleDateString("en-US", { ...fmt, year: "numeric" })} (Europe/Berlin)`;
  } catch {
    return null;
  }
}

export default function AffiliatesLeaderboardPage() {
  const reduceMotion = useReducedMotion();
  const countdown = useCountdown(getNextPeriodEnd());

  const [players, setPlayers] = useState<Player[] | null>(null);
  const [meta, setMeta] = useState<LeaderboardMeta | null>(null);
  const [phase, setPhase] = useState<"loading" | "ok" | "error">("loading");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setPhase("loading");
      setErrorDetail(null);
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const body: unknown = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (!res.ok) {
          setPhase("error");
          const msg =
            typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof (body as { message: unknown }).message === "string"
              ? (body as { message: string }).message
              : typeof body === "object" &&
                  body !== null &&
                  "error" in body &&
                  typeof (body as { error: unknown }).error === "string"
                ? (body as { error: string }).error
                : "Could not load leaderboard.";
          setErrorDetail(msg);
          setPlayers([]);
          setMeta(null);
          return;
        }

        const data = body as ApiSuccess;
        if (!Array.isArray(data.players)) {
          setPhase("error");
          setErrorDetail("Invalid response from server.");
          setPlayers([]);
          setMeta(null);
          return;
        }

        setPlayers(toPlayers(data));
        setMeta(data.meta ?? null);
        setPhase("ok");
      } catch {
        if (cancelled) return;
        setPhase("error");
        setErrorDetail("Network error. Check your connection and try again.");
        setPlayers([]);
        setMeta(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const first = players?.[0];
  const second = players?.[1];
  const third = players?.[2];
  const podiumSecond = second ?? emptyPodiumSlot(2);
  const podiumFirst = first ?? emptyPodiumSlot(1);
  const podiumThird = third ?? emptyPodiumSlot(3);

  const rangeLabel = formatMetaRange(meta);
  const tablePlayers =
    phase === "ok" && players
      ? players.filter((p) => p.rank > 3)
      : [];
  const showTable = tablePlayers.length > 0;
  const showEmpty = phase === "ok" && players && players.length === 0;

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 font-golos text-bright sm:px-6 sm:py-16">
      <motion.div
        className="mx-auto w-full max-w-6xl"
        initial={
          reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-0.5 font-golos text-sm font-medium text-secondary/70 transition-colors hover:text-primary"
        >
          <IoChevronBack className="size-4 shrink-0" aria-hidden />
          Back to home
        </Link>

        <div className="mt-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
            <IoTrendingUp className="size-3.5" aria-hidden />
            Monthly competition
          </span>
          <h1 className="mt-5 font-sports text-[clamp(2.25rem,7vw,4.5rem)] uppercase leading-none tracking-tight text-white">
            Leader<span className="text-primary">board</span>
          </h1>
          <p className="mt-4 max-w-xl font-golos text-sm text-secondary/75 sm:text-base">
            Wager under code{" "}
            <span className="font-semibold text-primary">gambanatorkick</span>{" "}
            and climb the ranks. The top spots share a monthly prize pool.
          </p>
          {rangeLabel ? (
            <p className="mt-2 font-golos text-xs text-secondary/50">
              Period: {rangeLabel}
              {meta?.sortBy ? ` · Sorted by ${meta.sortBy}` : ""}
            </p>
          ) : null}

          <div className="mt-8 flex w-full max-w-2xl flex-col items-center gap-2">
            <CountdownStrip
              days={countdown.days}
              hours={countdown.hours}
              minutes={countdown.minutes}
              seconds={countdown.seconds}
            />
          </div>
        </div>

        {phase === "error" ? (
          <div
            className="mx-auto mt-10 max-w-xl rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-4 text-center sm:px-6"
            role="alert"
          >
            <p className="font-golos text-sm font-medium text-white">
              Couldn&apos;t load rankings
            </p>
            <p className="mt-2 font-golos text-sm text-secondary/70">
              {errorDetail}
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
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
        )}

        <ScrollReveal className="mt-16 w-full" delay={0.06}>
          {phase === "loading" ? (
            <div className="mx-auto flex min-h-[200px] max-w-2xl flex-col items-center justify-center rounded-xl border border-secondary/10 bg-[#0c0c10]/80 px-6 py-16 text-center">
              <div
                className="size-10 animate-pulse rounded-full bg-primary/20"
                aria-hidden
              />
              <p className="mt-4 font-golos text-sm text-secondary/70">
                Loading rankings…
              </p>
            </div>
          ) : null}

          {showEmpty ? (
            <div className="mx-auto max-w-xl rounded-xl border border-secondary/10 bg-[#0c0c10]/80 px-6 py-12 text-center">
              <p className="font-golos text-sm text-secondary/80">
                No wager activity for this period yet. Check back after players
                start wagering under your code.
              </p>
            </div>
          ) : null}

          {showTable ? <LeaderboardTable players={tablePlayers} /> : null}
        </ScrollReveal>

        <p className="mx-auto mt-10 max-w-xl text-center font-golos text-xs text-secondary/55">
          Updated in real time. Rankings reset at the start of each month
          (Europe/Berlin).
        </p>
      </motion.div>
    </div>
  );
}
