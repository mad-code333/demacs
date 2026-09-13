"use client";

import type { Player } from "../Leaderboard";
import { ChampionshipPlayer, ChampionshipPlayerSkeleton } from "./ChampionshipPlayer";

function Slot({
  player,
  rank,
  loading,
  className,
}: {
  player: Player | null;
  rank: 1 | 2 | 3;
  loading?: boolean;
  className?: string;
}) {
  if (loading || !player) return <ChampionshipPlayerSkeleton rank={rank} />;
  return <ChampionshipPlayer player={player} className={className} />;
}

export function ChampionshipPodium({
  first,
  second,
  third,
  loading,
}: {
  first: Player | null;
  second: Player | null;
  third: Player | null;
  loading?: boolean;
}) {
  return (
    <div className="champ-podium pb-8 sm:pb-12">
      <span className="champ-podium__base hidden sm:block" aria-hidden />

      {/* Winner — dominant, elevated */}
      <div className="order-1 col-span-2 mx-auto w-full max-w-[22rem] sm:order-2 sm:col-span-1 sm:max-w-none sm:-translate-y-6 md:-translate-y-8">
        <Slot player={first} rank={1} loading={loading} />
      </div>

      <div className="order-2 sm:order-1 sm:pt-10 md:pt-14">
        <Slot player={second} rank={2} loading={loading} />
      </div>

      <div className="order-3 sm:pt-10 md:pt-14">
        <Slot player={third} rank={3} loading={loading} />
      </div>
    </div>
  );
}
