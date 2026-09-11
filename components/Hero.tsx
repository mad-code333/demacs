"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GiTrophyCup } from "react-icons/gi";
import { IoArrowForward, IoGameController, IoPulse, IoWallet } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL } from "@/lib/leaderboard-prizes";
import { HeroAtmosphereCanvas } from "./HeroAtmosphereCanvas";
import { formatCurrency } from "./Leaderboard";

const ease = [0.22, 1, 0.36, 1] as const;

const valueCards = [
  {
    title: "Play",
    description: "Join with Kick and start sessions under the live Gambanator code.",
    href: "/api/auth/kick?next=/",
    native: true,
    Icon: IoGameController,
  },
  {
    title: "Earn",
    description: "Track wagered volume, rank, and monthly prize standing in real time.",
    href: "/affiliates/leaderboard",
    native: false,
    Icon: IoWallet,
  },
  {
    title: "Rewards",
    description: "Unlock VIP tiers and compete for the published monthly prize pool.",
    href: "/affiliates/vip-rewards",
    native: false,
    Icon: GiTrophyCup,
  },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#04060a] text-white">
      <div
        className="pointer-events-none absolute inset-0 min-h-[calc(100svh-78px)] lg:min-h-0"
        aria-hidden
      >
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.15, ease }}
        >
          <Image
            src="/images/gambanator-world.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={[
              "hero-world-mask object-cover object-[78%_42%] opacity-90",
              reduceMotion ? "" : "hero-kenburns",
            ].join(" ")}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#04060a] from-0% via-[#04060a]/80 via-30% to-transparent to-62%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-transparent to-[#04060a]/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060a] to-transparent" />

        <motion.div
          className="hero-core-mask pointer-events-none absolute -right-[8%] top-[4%] hidden h-[92%] w-[68%] lg:block"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease, delay: reduceMotion ? 0 : 0.12 }}
        >
          <Image
            src="/images/gambanator-core.png"
            alt=""
            fill
            priority
            sizes="60vw"
            className="object-contain object-[center_42%]"
          />
        </motion.div>

        <div
          className={[
            "pointer-events-none absolute right-[18%] top-[38%] hidden h-[28%] w-[28%] -translate-y-1/2 rounded-full bg-primary/16 blur-[90px] lg:block",
            reduceMotion ? "" : "animate-emblem-breathe",
          ].join(" ")}
          aria-hidden
        />

        <HeroAtmosphereCanvas />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-78px)] w-full max-w-6xl flex-col justify-end px-4 pb-10 pt-8 sm:px-6 sm:pb-12 lg:justify-center lg:px-8 lg:pb-16 lg:pt-6">
        <div className="grid lg:grid-cols-12 lg:items-center">
          <motion.div
            className="max-w-xl lg:col-span-6 xl:col-span-5"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease, delay: reduceMotion ? 0 : 0.08 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 font-golos text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur-sm">
              <IoPulse className="size-3.5 text-primary" aria-hidden />
              Play · Earn · Climb
            </div>

            <h1 className="mt-7 font-sports uppercase leading-[0.86] tracking-[-0.045em] text-white">
              <span className="block text-[clamp(1.05rem,2.1vw,1.35rem)] tracking-[0.22em] text-white/55">
                The ultimate
              </span>
              <span className="mt-3 block text-[clamp(3rem,8.2vw,6.4rem)] text-primary drop-shadow-[0_0_34px_rgba(120,255,0,0.18)]">
                Gaming
              </span>
              <span className="block text-[clamp(3rem,8.2vw,6.4rem)] text-primary drop-shadow-[0_0_34px_rgba(120,255,0,0.18)]">
                Rewards
              </span>
              <span className="mt-1 block text-[clamp(2.4rem,6.4vw,4.8rem)] text-white">
                Platform
              </span>
            </h1>

            <p className="mt-6 max-w-md font-golos text-[0.95rem] leading-7 text-white/62 sm:text-base">
              Compete under code{" "}
              <span className="font-semibold text-primary">gambanatorkick</span>, chase the{" "}
              <span className="font-semibold text-white">${formatCurrency(MONTHLY_PRIZE_POOL)}</span>{" "}
              monthly prize pool, and climb the published VIP ladder.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/api/auth/kick?next=/"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 font-golos text-sm font-semibold uppercase tracking-[0.08em] text-[#061000] shadow-[0_0_28px_rgba(120,255,0,0.22)] transition-[filter,transform,box-shadow] duration-300 hover:shadow-[0_0_36px_rgba(120,255,0,0.34)] hover:brightness-110 active:translate-y-px sm:w-auto"
              >
                Claim bonuses
                <IoArrowForward className="size-4" aria-hidden />
              </a>
              <Link
                href="/affiliates/leaderboard"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 font-golos text-sm font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:text-white sm:w-auto"
              >
                View leaderboard
                <GiTrophyCup className="size-4" aria-hidden />
              </Link>
            </div>
          </motion.div>

          <div className="relative mt-8 aspect-[5/4] w-full lg:hidden">
            <Image
              src="/images/gambanator-core.png"
              alt="Gambanator emblem"
              fill
              priority
              sizes="100vw"
              className="hero-core-mask object-contain object-center"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] sm:grid-cols-3 sm:mt-14 lg:mt-16">
          {valueCards.map(({ title, description, href, native, Icon }, index) => {
            const className =
              "group flex h-full items-start gap-4 bg-[#07090e]/80 px-5 py-5 backdrop-blur-md transition-colors duration-300 hover:bg-[#0b0f16]";
            const inner = (
              <>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-golos text-[0.95rem] font-semibold text-white">{title}</h2>
                    <IoArrowForward
                      className="size-4 shrink-0 text-white/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-1.5 font-golos text-[0.82rem] leading-6 text-white/50">{description}</p>
                </div>
              </>
            );

            return (
              <motion.div
                key={title}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease, delay: reduceMotion ? 0 : 0.28 + index * 0.07 }}
              >
                {native ? (
                  <a href={href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className={className}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
