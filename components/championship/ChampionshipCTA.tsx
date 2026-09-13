import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export function ChampionshipCTA({
  href = "/affiliates/leaderboard",
}: {
  href?: string;
}) {
  return (
    <Link href={href} className="champ-cta font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030504]">
      <span className="champ-cta__shine motion-reduce:hidden" aria-hidden>
        <span />
      </span>
      <span className="relative z-10">Open full leaderboard</span>
      <IoArrowForward className="champ-cta__arrow relative z-10 size-4" aria-hidden />
    </Link>
  );
}
