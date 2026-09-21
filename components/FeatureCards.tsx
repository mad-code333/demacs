"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GiCrown, GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoGameController } from "react-icons/io5";

const features = [
  {
    title: "Play",
    description: "Enjoy your favorite games and get started.",
    href: "/api/auth/kick?next=/",
    native: true,
    Icon: IoGameController,
    featured: false,
  },
  {
    title: "Get Rewards",
    description: "Unlock exclusive rewards, bonuses and more.",
    href: "#rewards",
    native: false,
    Icon: GiTrophyCup,
    featured: false,
  },
  {
    title: "Go VIP",
    description: "Reach higher tiers and get bigger rewards.",
    href: "/affiliates/vip-rewards",
    native: false,
    Icon: GiCrown,
    featured: true,
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function FeatureCards() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      id="play-earn"
      role="list"
      className="mx-auto grid w-full max-w-[1080px] grid-cols-1 items-stretch gap-3.5 md:grid-cols-3 md:gap-4 lg:gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
        },
      }}
    >
      {features.map(({ title, description, href, native, Icon, featured }) => {
        const inner = (
          <article
            className={[
              "demacs-action-card flex h-full min-h-[10rem] flex-col rounded-2xl px-5 py-5 sm:px-6 sm:py-6",
              featured ? "demacs-action-card--featured" : "",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="demacs-icon-plate flex size-9 items-center justify-center rounded-[0.7rem] text-primary transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:-translate-y-px motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:size-10">
                <Icon className="size-[18px] sm:size-5" aria-hidden />
              </span>
              <IoArrowForward
                className="mt-1 size-4 shrink-0 text-white/25 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </div>
            <h2 className="type-card-title mt-auto pt-6 font-sans text-[1.12rem] text-white sm:text-[1.2rem]">
              {title}
            </h2>
            <p className="type-body mt-2 font-sans text-[0.84rem] leading-[1.55] text-[#9B9BA8] sm:text-[0.875rem]">
              {description}
            </p>
          </article>
        );

        const itemClass = "group block h-full";

        return (
          <motion.li
            key={title}
            className="h-full min-w-0"
            variants={{
              hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: reduceMotion ? 0 : 0.38, ease },
              },
            }}
          >
            {native ? (
              <a href={href} className={itemClass}>
                {inner}
              </a>
            ) : (
              <Link href={href} className={itemClass}>
                {inner}
              </Link>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
