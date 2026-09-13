"use client";

import { useId } from "react";

type MetalTone = "gold" | "silver" | "bronze";

const METAL: Record<
  MetalTone,
  { hi: string; mid: string; lo: string; deep: string }
> = {
  gold: { hi: "#fff6c8", mid: "#e8c547", lo: "#b8860b", deep: "#6d4b00" },
  silver: { hi: "#ffffff", mid: "#c8d0dc", lo: "#7a8494", deep: "#3a424c" },
  bronze: { hi: "#f5d0a8", mid: "#c67b3a", lo: "#8b4513", deep: "#4a2408" },
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

export function GoldCrown({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      className={["champ-crown", className].filter(Boolean).join(" ")}
      viewBox="0 0 88 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`crown-${id}`} x1="6" y1="4" x2="82" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff8d0" />
          <stop offset="0.28" stopColor="#f0c14b" />
          <stop offset="0.55" stopColor="#b8860b" />
          <stop offset="0.82" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#8a6508" />
        </linearGradient>
        <filter id={`crown-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#e8c547" floodOpacity="0.65" />
        </filter>
      </defs>
      <g filter={`url(#crown-glow-${id})`}>
        <path
          d="M8 40 L14 16 L28 30 L44 8 L60 30 L74 16 L80 40 Z"
          fill={`url(#crown-${id})`}
          stroke="#6d4b00"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <rect
          x="10"
          y="40"
          width="68"
          height="9"
          rx="2"
          fill={`url(#crown-${id})`}
          stroke="#6d4b00"
          strokeWidth="1.1"
        />
        <circle cx="14" cy="16" r="3.2" fill="#fff8d0" />
        <circle cx="44" cy="8" r="3.6" fill="#fff8d0" />
        <circle cx="74" cy="16" r="3.2" fill="#fff8d0" />
        <path d="M22 34h44" stroke="#fff6c8" strokeWidth="1.2" opacity="0.55" />
      </g>
    </svg>
  );
}

export function LaurelWreath({
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
      className={["champ-laurel", className].filter(Boolean).join(" ")}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`laurel-${id}`} x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop stopColor={m.hi} />
          <stop offset="0.45" stopColor={m.mid} />
          <stop offset="1" stopColor={m.lo} />
        </linearGradient>
      </defs>
      {/* Left branch */}
      <g fill={`url(#laurel-${id})`} stroke={m.deep} strokeWidth="0.6">
        <path d="M52 118 C34 96 30 70 42 48" fill="none" stroke={`url(#laurel-${id})`} strokeWidth="2.4" />
        <ellipse cx="40" cy="52" rx="7" ry="12" transform="rotate(-38 40 52)" />
        <ellipse cx="36" cy="66" rx="7" ry="12" transform="rotate(-28 36 66)" />
        <ellipse cx="34" cy="80" rx="6.5" ry="11" transform="rotate(-18 34 80)" />
        <ellipse cx="36" cy="94" rx="6" ry="10" transform="rotate(-10 36 94)" />
        <ellipse cx="42" cy="106" rx="5.5" ry="9" transform="rotate(-2 42 106)" />
      </g>
      {/* Right branch */}
      <g fill={`url(#laurel-${id})`} stroke={m.deep} strokeWidth="0.6">
        <path d="M108 118 C126 96 130 70 118 48" fill="none" stroke={`url(#laurel-${id})`} strokeWidth="2.4" />
        <ellipse cx="120" cy="52" rx="7" ry="12" transform="rotate(38 120 52)" />
        <ellipse cx="124" cy="66" rx="7" ry="12" transform="rotate(28 124 66)" />
        <ellipse cx="126" cy="80" rx="6.5" ry="11" transform="rotate(18 126 80)" />
        <ellipse cx="124" cy="94" rx="6" ry="10" transform="rotate(10 124 94)" />
        <ellipse cx="118" cy="106" rx="5.5" ry="9" transform="rotate(2 118 106)" />
      </g>
    </svg>
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
