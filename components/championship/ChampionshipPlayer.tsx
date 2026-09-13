"use client";

import { useState } from "react";
import { prizeForRank } from "@/lib/leaderboard-prizes";
import type { Player } from "../Leaderboard";
import { InstantImage } from "../InstantImage";
import {
  GoldCrown,
  LaurelWreath,
  RankMedal,
  metalToneForRank,
} from "./ChampionshipMarks";
import { RewardPlaque } from "./RewardPlaque";

function formatMoney(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Premium championship podium card — gold / silver / bronze variants.
 * Visual language follows the DEMACS reference medallion card.
 */
export function ChampionshipPlayer({
  player,
  className,
}: {
  player: Player;
  className?: string;
}) {
  const rank = (player.rank === 1 || player.rank === 2 || player.rank === 3
    ? player.rank
    : 3) as 1 | 2 | 3;
  const placeholder = Boolean(player.isPlaceholder);
  const tone = metalToneForRank(rank);
  const [imgFailed, setImgFailed] = useState(false);
  const showAvatar = Boolean(player.avatar) && !placeholder && !imgFailed;

  const wagered = placeholder
    ? 0
    : Number.isFinite(player.wagered)
      ? player.wagered
      : 0;
  const prize = placeholder
    ? 0
    : Number.isFinite(player.prize) && player.prize > 0
      ? player.prize
      : prizeForRank(rank);

  return (
    <article
      className={[
        "champ-card",
        `champ-card--${rank}`,
        rank === 1 ? "champ-card--winner" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-rank={rank}
      aria-label={
        placeholder
          ? `Rank ${rank} placeholder ${player.username}, wagered $0.00, reward $0.00`
          : `Rank ${rank}: ${player.username}, wagered $${formatMoney(wagered)}, reward $${formatMoney(prize)}`
      }
    >
      <div className="champ-card__shell">
        <div className="champ-card__inner">
          <div className="champ-card__aura" aria-hidden />
          <div className="champ-card__grain" aria-hidden />

          <div className="champ-card__hero">
            {rank === 1 ? <GoldCrown /> : null}

            <div className="champ-medallion">
              <LaurelWreath tone={tone} />
              <div className="champ-medallion__ring">
                <div className="champ-medallion__core">
                  {showAvatar && player.avatar ? (
                    <InstantImage
                      src={player.avatar}
                      alt=""
                      width={128}
                      height={128}
                      loading="lazy"
                      fetchPriority="low"
                      frameClassName="champ-medallion__img"
                      className="h-full w-full rounded-full object-cover"
                      showPlaceholder
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <div className="champ-medallion__fallback" aria-hidden>
                      <span>D</span>
                    </div>
                  )}
                </div>
              </div>
              <RankMedal rank={rank} className="champ-medallion__badge" />
            </div>
          </div>

          <h3 className="champ-card__name">{player.username}</h3>
          <span className="champ-card__rule" aria-hidden />

          <p className="champ-card__wager-label">Wagered</p>
          <p
            className={[
              "champ-card__wager",
              placeholder || wagered <= 0 ? "champ-card__wager--muted" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            ${formatMoney(wagered)}
          </p>

          <div className="champ-card__plaque-wrap">
            <RewardPlaque amount={prize} rank={rank} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Alias matching the requested LeaderboardPodiumCard API. */
export const LeaderboardPodiumCard = ChampionshipPlayer;

export function ChampionshipPlayerSkeleton({ rank = 2 }: { rank?: 1 | 2 | 3 }) {
  return (
    <div
      className={["champ-skeleton", `champ-skeleton--${rank}`].join(" ")}
      aria-hidden
    />
  );
}
