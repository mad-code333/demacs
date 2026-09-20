"use client";

import { GiTrophyCup } from "react-icons/gi";
import { IoCashOutline, IoPodiumOutline } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL, TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";
import { DimensionalCard } from "./DimensionalCard";

function money(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const stats = [
  {
    value: money(MONTHLY_PRIZE_POOL),
    label: "Monthly prize pool",
    Icon: IoCashOutline,
  },
  {
    value: money(TOP_MONTHLY_PRIZES[0] ?? 0),
    label: "First place prize",
    Icon: GiTrophyCup,
  },
  {
    value: `Top ${TOP_MONTHLY_PRIZES.length}`,
    label: "Paid leaderboard ranks",
    Icon: IoPodiumOutline,
  },
] as const;

export function HeroStats() {
  return (
    <ul className="mt-9 grid w-full max-w-3xl grid-cols-1 gap-3.5 sm:mt-10 sm:grid-cols-3 sm:gap-4" role="list">
      {stats.map(({ value, label, Icon }) => (
        <li key={label} className="h-full">
          <DimensionalCard className="flex h-full flex-col items-center rounded-[22px] px-4 py-5 text-center sm:px-5 sm:py-6">
            <span className="demacs-icon-plate mb-3 flex size-10 items-center justify-center rounded-full text-primary">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <p className="type-hero font-sans text-[1.35rem] text-primary sm:text-[1.65rem]">
              {value}
            </p>
            <p className="type-label mt-2 font-sans text-[0.62rem] uppercase text-[#A1A1AA] sm:text-[0.7rem]">
              {label}
            </p>
          </DimensionalCard>
        </li>
      ))}
    </ul>
  );
}
