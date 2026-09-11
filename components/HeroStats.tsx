import { MONTHLY_PRIZE_POOL, TOP_MONTHLY_PRIZES } from "@/lib/leaderboard-prizes";

function money(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const stats = [
  {
    value: money(MONTHLY_PRIZE_POOL),
    label: "Monthly prize pool",
  },
  {
    value: money(TOP_MONTHLY_PRIZES[0] ?? 0),
    label: "First place prize",
  },
  {
    value: `Top ${TOP_MONTHLY_PRIZES.length}`,
    label: "Paid leaderboard ranks",
  },
] as const;

export function HeroStats() {
  return (
    <ul className="mt-9 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-3" role="list">
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="demacs-card group rounded-2xl px-2 py-3 text-center sm:px-4 sm:py-4"
        >
          <p className="font-golos text-sm font-extrabold tracking-tight text-primary sm:text-xl">
            {stat.value}
          </p>
          <p className="mt-1 font-golos text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-[#8E978E] sm:text-[0.62rem] sm:tracking-[0.16em]">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
