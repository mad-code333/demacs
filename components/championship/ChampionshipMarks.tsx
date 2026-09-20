"use client";

import { useId } from "react";

type MetalTone = "gold" | "silver" | "bronze";

const METAL: Record<
  MetalTone,
  { hi: string; mid: string; lo: string; deep: string }
> = {
  gold: { hi: "#f3e8ff", mid: "#C084FC", lo: "#9333EA", deep: "#5b21b6" },
  silver: { hi: "#ffffff", mid: "#c8d0dc", lo: "#7a8494", deep: "#3a424c" },
  bronze: { hi: "#e9d5ff", mid: "#a78bfa", lo: "#7c3aed", deep: "#4c1d95" },
};

export function metalToneForRank(rank: 1 | 2 | 3): MetalTone {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  return "bronze";
}

/** Metallic shield medal with rank number. */
export function RankMedal({
  rank,
  className,
}: {
  rank: 1 | 2 | 3;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const tone = metalToneForRank(rank);
  const m = METAL[tone];

  return (
    <svg
      className={["champ-medal-svg", className].filter(Boolean).join(" ")}
      viewBox="0 0 48 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`medal-${id}`} x1="8" y1="2" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={m.hi} />
          <stop offset="0.35" stopColor={m.mid} />
          <stop offset="0.7" stopColor={m.lo} />
          <stop offset="1" stopColor={m.hi} />
        </linearGradient>
      </defs>
      <path
        d="M24 2 L42 12 V32 L24 50 L6 32 V12 Z"
        fill={`url(#medal-${id})`}
        stroke={m.deep}
        strokeWidth="1.4"
      />
      <path
        d="M24 8 L36 15 V31 L24 42 L12 31 V15 Z"
        fill={m.deep}
        opacity="0.35"
      />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fill={m.hi}
        fontSize="16"
        fontWeight="800"
        fontFamily="var(--font-jakarta-stack), system-ui, sans-serif"
      >
        {rank}
      </text>
    </svg>
  );
}

export const CHAMP_CROWN_SRC = "/images/championship/crown.webp";
export const CHAMP_LAUREL_SRC = "/images/championship/laurel.webp";

export function GoldCrown({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={CHAMP_CROWN_SRC}
      alt=""
      width={420}
      height={225}
      decoding="async"
      loading="eager"
      draggable={false}
      className={["champ-crown", className].filter(Boolean).join(" ")}
      aria-hidden
    />
  );
}

export function LaurelWreath({
  tone = "gold",
  className,
}: {
  tone?: MetalTone;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={CHAMP_LAUREL_SRC}
      alt=""
      width={480}
      height={381}
      decoding="async"
      loading="lazy"
      draggable={false}
      className={[
        "champ-laurel",
        `champ-laurel--${tone}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    />
  );
}

export function TrophyGlyph({
  tone = "gold",
  className,
}: {
  tone?: MetalTone;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const m = METAL[tone];

  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`trophy-${id}`} x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor={m.hi} />
          <stop offset="0.45" stopColor={m.mid} />
          <stop offset="1" stopColor={m.lo} />
        </linearGradient>
      </defs>
      <path
        d="M7 3.5h10v2.4c0 3.3-2.2 5.9-5 6.5v1.7h2.6V16H9.4v-2.4H12v-1.7c-2.8-.6-5-3.2-5-6.5V3.5Z"
        fill={`url(#trophy-${id})`}
        stroke={m.deep}
        strokeWidth="0.7"
      />
      <path d="M7 5H4.6c0 2.5 1.5 4.3 3.4 4.9" stroke={`url(#trophy-${id})`} strokeWidth="1.5" />
      <path d="M17 5h2.4c0 2.5-1.5 4.3-3.4 4.9" stroke={`url(#trophy-${id})`} strokeWidth="1.5" />
      <path d="M9 18.2h6v1.4H9v-1.4Z" fill={`url(#trophy-${id})`} />
      <path d="M8 19.8h8V21H8v-1.2Z" fill={`url(#trophy-${id})`} />
    </svg>
  );
}
