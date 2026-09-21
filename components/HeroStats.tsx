"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MONTHLY_PRIZE_POOL, TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";

function money(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const stats = [
  { value: money(MONTHLY_PRIZE_POOL), label: "Monthly prize pool", lead: true },
  { value: money(TOP_MONTHLY_PRIZES[0] ?? 0), label: "First place", lead: false },
  { value: `Top ${TOP_MONTHLY_PRIZES.length}`, label: "Paid ranks", lead: false },
] as const;

/** One compact rewards strip — hairline separators, not three cards. */
export function HeroStats() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.dl
      className="demacs-rewards-strip mx-auto grid w-full max-w-[720px] grid-cols-1 overflow-hidden sm:max-w-[840px] sm:grid-cols-3"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {stats.map(({ value, label, lead }, index) => (
        <div
          key={label}
          className={[
            "flex flex-col items-center px-5 py-3.5 text-center sm:px-6 sm:py-4",
            index > 0 ? "border-t border-white/[0.07] sm:border-t-0 sm:border-l sm:border-white/[0.07]" : "",
          ].join(" ")}
        >
          <dt className="sr-only">{label}</dt>
          <dd
            className={[
              "type-hero font-sans text-[1.4rem] leading-none sm:text-[1.65rem]",
              lead ? "text-primary" : "text-white",
            ].join(" ")}
          >
            {value}
          </dd>
          <p
            aria-hidden
            className="type-label mt-1.5 font-sans text-[0.58rem] uppercase tracking-[0.18em] text-[#8A8A94] sm:text-[0.62rem]"
          >
            {label}
          </p>
        </div>
      ))}
    </motion.dl>
  );
}
