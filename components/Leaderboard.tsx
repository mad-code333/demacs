"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getNextBerlinPeriodEnd } from "@/lib/leaderboard-berlin-period";
import { prizeForRank } from "@/lib/leaderboard-prizes";
import { ChampionshipCountdown } from "./championship/ChampionshipCountdown";
import { ChampionshipPlayer } from "./championship/ChampionshipPlayer";

export type Player = {
  rank: number;
  username: string;
  wagered: number;
  prize: number;
  avatar?: string;
  /** True when this is a visual stand-in (no real qualifier yet). */
  isPlaceholder?: boolean;
};

const PLACEHOLDER_NAMES: Record<1 | 2 | 3, string> = {
  1: "DEMACS_Leader",
  2: "CryptoKing",
  3: "LuckyPlayer",
};

/** Fake podium occupant used when no real qualifier exists for that rank. */
export function emptyPodiumSlot(rank: 1 | 2 | 3): Player {
  return {
    rank,
    username: PLACEHOLDER_NAMES[rank],
    wagered: 0,
    prize: 0,
    isPlaceholder: true,
  };
}

function toMoneyNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value.replace(/,/g, ""));
    if (Number.isFinite(n)) return n;
  }
  return 0;
}

export function formatCurrency(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatWageredParts(value: number) {
  const str = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [whole, frac = "00"] = str.split(".");
  return { whole, frac };
}

export function getNextPeriodEnd() {
  return getNextBerlinPeriodEnd();
}

export function useCountdown(target: Date) {
  // Defer live clock until after mount so SSR and first client paint match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
  if (now === null) {
    return { days: "0", hours: "00", minutes: "00", seconds: "00" };
  }

  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days: String(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function parsePlayers(raw: unknown[]): Player[] {
  return raw.map((row, index) => {
    const r = row as Record<string, unknown>;
    const rank = toMoneyNumber(r.rank) || index + 1;
    const wagered = toMoneyNumber(
      r.wagered ?? r.weightedWagered ?? r.totalWagered ?? r.wager,
    );
    const prizeRaw = toMoneyNumber(r.prize);
    return {
      rank,
      username: String(r.username ?? r.name ?? "—"),
      wagered,
      prize: prizeRaw > 0 ? prizeRaw : prizeForRank(rank),
      avatar:
        typeof r.avatar === "string" && r.avatar.length > 0
          ? r.avatar
          : typeof r.rankLevelImage === "string" && r.rankLevelImage.length > 0
            ? r.rankLevelImage
            : undefined,
    };
  });
}

export type LeaderboardFetchState = {
  players: Player[] | null;
  phase: "loading" | "ok" | "error";
};

/** Shared Home + page fetch against `/api/leaderboard` (no mock data). */
export function useLeaderboardPlayers(): LeaderboardFetchState {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" });
        const body: unknown = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (
          !res.ok ||
          typeof body !== "object" ||
          body === null ||
          !("players" in body) ||
          !Array.isArray((body as { players: unknown }).players)
        ) {
          setPlayers([]);
          setPhase("error");
          return;
        }
        const list = parsePlayers((body as { players: unknown[] }).players);
        setPlayers(list);
        setPhase("ok");
      } catch {
        if (!cancelled) {
          setPlayers([]);
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { players, phase };
}

export function PodiumCard({ player }: { player: Player }) {
  return <ChampionshipPlayer player={player} />;
}

export function CountdownStrip({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}) {
  return (
    <div className="flex w-full justify-center py-2">
      <ChampionshipCountdown
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
  );
}

export function LeaderboardTable({ players }: { players: Player[] }) {
  return (
    <div className="demacs-glass-panel overflow-x-auto rounded-xl">
      <table className="w-full min-w-[520px] border-collapse text-left font-golos text-sm">
        <thead>
          <tr className="border-b border-secondary/10 bg-secondary/5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary/60">
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Rank
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Player
            </th>
            <th scope="col" className="px-4 py-3.5 text-right sm:px-6">
              Wagered
            </th>
            <th scope="col" className="px-4 py-3.5 text-right sm:px-6">
              Prize
            </th>
          </tr>
        </thead>
        <tbody className="text-secondary/90">
          {players.map((player) => {
            const avatar =
              player.avatar ?? "/leaderboard/avatar-placeholder.svg";
            const topThree = player.rank <= 3;
            return (
              <tr
                key={`${player.rank}-${player.username}`}
                className={`border-b border-secondary/5 transition-colors last:border-0 hover:bg-white/3 ${
                  topThree ? "bg-primary/4" : ""
                }`}
              >
                <td className="px-4 py-3.5 font-semibold tabular-nums text-white sm:px-6">
                  #{player.rank}
                </td>
                <td className="px-4 py-3.5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-secondary/15 bg-[#0d0d14]">
                      <Image
                        src={avatar}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover object-center"
                      />
                    </div>
                    <span
                      className={`truncate font-medium ${
                        topThree ? "text-primary" : "text-white"
                      }`}
                    >
                      {player.username}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-right tabular-nums text-white/90 sm:px-6">
                  <span className="text-primary">$</span>
                  {formatCurrency(player.wagered)}
                </td>
                <td className="px-4 py-3.5 text-right tabular-nums sm:px-6">
                  {player.prize > 0 ? (
                    <span className="font-semibold text-white">
                      ${formatCurrency(player.prize)}
                    </span>
                  ) : (
                    <span className="text-secondary/45">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
