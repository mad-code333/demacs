"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { getNextBerlinPeriodEnd } from "@/lib/leaderboard-berlin-period";

export type Player = {
  rank: number;
  username: string;
  wagered: number;
  prize: number;
  avatar?: string;
};

export function emptyPodiumSlot(rank: 1 | 2 | 3): Player {
  return { rank, username: "—", wagered: 0, prize: 0 };
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
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    days: String(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

function parsePlayers(raw: unknown[]): Player[] {
  return raw.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      rank: Number(r.rank),
      username: String(r.username ?? "—"),
      wagered: Number(r.wagered),
      prize: Number(r.prize),
      avatar:
        typeof r.avatar === "string" && r.avatar.length > 0
          ? r.avatar
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
  const rank = player.rank as 1 | 2 | 3;
  const avatar = player.avatar ?? "/leaderboard/avatar-placeholder.svg";
  const { whole, frac } = formatWageredParts(player.wagered);

  return (
    <div
      className="relative flex min-h-[360px] w-full flex-col items-center bg-contain bg-center bg-no-repeat p-8 pb-28 transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundImage: "url('/leaderboard/leadercard.svg')" }}
    >
      <div className="relative h-fit w-fit rounded-full border-2 border-secondary/10 p-2">
        <div className="relative aspect-square w-[72px] overflow-hidden rounded-full bg-[#0d0d14]">
          <Image
            src={avatar}
            alt=""
            fill
            sizes="72px"
            className="rounded-full object-cover object-center"
          />
        </div>

        <Image
          src={`/leaderboard/rank${rank}-hex.svg`}
          alt=""
          width={80}
          height={80}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2"
        />
      </div>

      <h2 className="mx-auto my-6 w-36 truncate text-center font-golos text-xl font-medium uppercase leading-[1.3] tracking-normal text-white">
        {player.username}
      </h2>

      <h3 className="font-golos text-base uppercase leading-snug tracking-normal text-white">
        Wagered
      </h3>

      <h3 className="font-golos text-base uppercase leading-snug tracking-normal text-secondary/75">
        <span className="text-primary">$</span>
        {whole}
        <span className="opacity-75">.{frac}</span>
      </h3>

      <div className="absolute bottom-5 left-1/2 w-[210px] -translate-x-1/2">
        <div className="relative flex h-14 items-center justify-center">
          <Image
            src={`/leaderboard/rank${rank}-ribbon.svg`}
            alt=""
            fill
            sizes="210px"
            className="object-cover object-center"
          />
          <span className="relative z-10 mb-3 font-golos text-2xl font-bold uppercase leading-tight text-[#0b0b12]">
            ${formatCurrency(player.prize)}
          </span>
        </div>
      </div>
    </div>
  );
}

function HexCountdownCell({
  value,
  label,
  valueClassName,
}: {
  value: string;
  label: string;
  valueClassName: string;
}) {
  const clipId = useId();

  return (
    <div className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="currentColor"
        viewBox="0 0 16 16"
        className="absolute text-secondary/5"
        aria-hidden
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.606.165a1.199 1.199 0 0 0-1.212 0L1.606 3.55C1.231 3.77 1 4.175 1 4.614v6.772c0 .439.231.844.606 1.064l5.788 3.385c.375.22.837.22 1.212 0l5.788-3.385c.375-.22.606-.625.606-1.064V4.614c0-.439-.231-.844-.606-1.064L8.606.165Z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <path fill="#fff" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative z-10 -top-0.5 text-center">
        <h3
          className={`block font-golos text-base font-bold uppercase leading-snug tracking-normal ${valueClassName}`}
        >
          {value}
        </h3>
        <p className="block font-golos text-xs font-normal uppercase leading-none text-secondary/50">
          {label}
        </p>
      </div>
    </div>
  );
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
    <div className="flex w-full items-center py-6 pt-8 sm:py-8 sm:pt-10">
      <hr className="h-px w-full origin-right scale-x-100 border-0 bg-current text-secondary/5 transition-transform duration-1000" />
      <div className="flex shrink-0 px-4">
        <HexCountdownCell
          value={days}
          label="days"
          valueClassName="text-primary"
        />
        <HexCountdownCell
          value={hours}
          label="hrs"
          valueClassName="text-primary"
        />
        <HexCountdownCell
          value={minutes}
          label="min"
          valueClassName="text-primary"
        />
        <HexCountdownCell
          value={seconds}
          label="sec"
          valueClassName="text-secondary/75"
        />
      </div>
      <hr className="h-px w-full origin-left scale-x-100 border-0 bg-current text-secondary/5 transition-transform duration-1000" />
    </div>
  );
}

export function LeaderboardTable({ players }: { players: Player[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-secondary/10 bg-[#0c0c10]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
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
