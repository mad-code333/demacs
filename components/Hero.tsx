"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GiChest, GiTrophyCup } from "react-icons/gi";
import { IoFlash, IoPulse } from "react-icons/io5";
import { MONTHLY_PRIZE_POOL } from "@/lib/leaderboard-prizes";
import { HeroParticlesCanvas } from "./HeroParticlesCanvas";
import { PrimaryButton } from "./PrimaryButton";
import { formatCurrency } from "./Leaderboard";

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="flex h-fit w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.03] px-6 py-3.5 text-center font-golos text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-secondary/85 antialiased transition-all duration-300 hover:border-primary/45 hover:bg-primary/8 hover:text-white sm:w-auto"
    >
      {children}
    </Link>
  );
}

const heroEase = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#050508] text-white">
      <Image
        src="/images/game-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.34]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,255,0,0.18),transparent_42%),linear-gradient(180deg,rgba(5,5,8,0.55)_0%,rgba(5,5,8,0.82)_55%,#050508_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />
      <HeroParticlesCanvas />

      <div className="pointer-events-none absolute -left-6 bottom-0 hidden w-[min(38vw,420px)] select-none lg:block">
        <Image
          src="/images/jeus/left.png"
          alt=""
          width={420}
          height={560}
          className="h-auto w-full opacity-80 drop-shadow-[0_0_40px_rgba(120,255,0,0.12)]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute -right-8 bottom-0 hidden w-[min(38vw,420px)] select-none lg:block">
        <Image
          src="/images/jeus/right.png"
          alt=""
          width={420}
          height={560}
          className="h-auto w-full opacity-80 drop-shadow-[0_0_40px_rgba(120,255,0,0.12)]"
          priority
        />
      </div>

      <div className="relative mx-auto flex min-h-[min(88vh,820px)] w-full max-w-6xl flex-col items-center justify-center px-4 pb-20 pt-10 text-center sm:px-6 lg:px-8">
        <motion.div
          className="relative z-10 w-full max-w-4xl"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: heroEase }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary shadow-[0_0_24px_rgba(120,255,0,0.12)]">
            <IoPulse className="size-3.5 animate-pulse" aria-hidden />
            Gambanator rewards · Live
          </div>

          <p className="mt-7 font-sports text-[clamp(1.15rem,2.8vw,1.65rem)] uppercase tracking-[0.28em] text-white/70">
            Gamba<span className="text-primary">nator</span>
          </p>

          <h1 className="mt-4 font-sports text-[clamp(2.8rem,9vw,6.75rem)] uppercase leading-[0.88] tracking-[-0.04em] text-white">
            Play. Wager.
            <span className="block text-primary drop-shadow-[0_0_28px_rgba(120,255,0,0.35)]">
              Climb. Win.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-golos text-base text-secondary/80 sm:text-lg">
            Compete under code{" "}
            <span className="font-semibold text-primary">gambanatorkick</span>, chase the{" "}
            <span className="font-semibold text-white">
              ${formatCurrency(MONTHLY_PRIZE_POOL)}
            </span>{" "}
            monthly prize pool, and climb VIP with every session.
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor>
              <GiChest className="size-5 shrink-0" aria-hidden />
              Claim bonuses
            </PrimaryButton>
            <SecondaryButton href="/affiliates/leaderboard">
              <GiTrophyCup className="size-5 shrink-0" aria-hidden />
              View leaderboard
            </SecondaryButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-golos text-sm text-secondary/70">
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(120,255,0,0.9)]"
                aria-hidden
              />
              Live rankings
            </div>
            <div className="flex items-center gap-2">
              <IoFlash className="size-4 text-primary" aria-hidden />
              VIP progression
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-white/55" aria-hidden />
              Kick stream
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050508] to-transparent"
        aria-hidden
      />
    </section>
  );
}
