"use client";

import Link from "next/link";
import { GiCrown, GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoGameController, IoWallet } from "react-icons/io5";
import { DimensionalCard } from "./DimensionalCard";
import { ScrollReveal } from "./ScrollReveal";

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
    <ul
      id="play-earn"
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      role="list"
    >
      {features.map(({ title, description, href, native, Icon }, index) => {
        const inner = (
          <DimensionalCard className="demacs-card--secondary group flex h-full min-h-[148px] flex-col gap-5 rounded-[24px] px-5 py-6 sm:min-h-[160px] sm:px-6 sm:py-7">
            <div className="flex items-start justify-between gap-3">
              <div className="demacs-icon-plate flex size-12 items-center justify-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-105 sm:size-[52px]">
                <Icon className="size-6 sm:size-7" aria-hidden />
              </div>
              <IoArrowForward
                className="mt-1 size-5 shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
                aria-hidden
              />
            </div>
            <div className="min-w-0">
              <h2 className="type-card-title font-sans text-lg text-white sm:text-xl sm:font-bold">
                {title}
              </h2>
              <p className="type-body mt-2 font-sans text-[0.92rem] leading-6 text-[#8E978E]">{description}</p>
            </div>
          </DimensionalCard>
        );

        return (
          <ScrollReveal key={title} delay={index * 0.05} className="h-full">
            <li className="h-full">
              {native ? (
                <a href={href} className="block h-full">
                  {inner}
                </a>
              ) : (
                <Link href={href} className="block h-full">
                  {inner}
                </Link>
              )}
            </li>
          </ScrollReveal>
        );
      })}
    </ul>
  );
}
