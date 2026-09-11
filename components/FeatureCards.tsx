import Link from "next/link";
import { GiCrown, GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoGameController, IoWallet } from "react-icons/io5";

const features = [
  {
    title: "Play",
    description: "Enjoy your favorite games and get started.",
    href: "/api/auth/kick?next=/",
    native: true,
    Icon: IoGameController,
  },
  {
    title: "Earn",
    description: "Collect points and climb the ranks.",
    href: "/affiliates/leaderboard",
    native: false,
    Icon: IoWallet,
  },
  {
    title: "Get Rewards",
    description: "Unlock exclusive rewards, bonuses and more.",
    href: "#rewards",
    native: false,
    Icon: GiTrophyCup,
  },
  {
    title: "Go VIP",
    description: "Reach higher tiers and get bigger rewards.",
    href: "/affiliates/vip-rewards",
    native: false,
    Icon: GiCrown,
  },
] as const;

export function FeatureCards() {
  return (
    <ul id="play-earn" className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
      {features.map(({ title, description, href, native, Icon }) => {
        const className =
          "demacs-card group flex h-full items-center gap-4 rounded-2xl px-4 py-4";
        const inner = (
          <>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <Icon className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-golos text-[0.95rem] font-semibold text-white">{title}</h2>
                <IoArrowForward
                  className="size-4 shrink-0 text-white/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              <p className="mt-1 font-golos text-[0.8rem] leading-5 text-[#8E978E]">{description}</p>
            </div>
          </>
        );

        return (
          <li key={title} className="h-full">
            {native ? (
              <a href={href} className={className}>
                {inner}
              </a>
            ) : (
              <Link href={href} className={className}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
