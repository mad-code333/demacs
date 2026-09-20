"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FeatureCards } from "./FeatureCards";
import { HeroActions } from "./HeroActions";
import { HeroCanvas } from "./HeroCanvas";
import { HeroStats } from "./HeroStats";
import { FloatingOrbitJewels } from "./hero/FloatingOrbitJewels";

type HeroProps = {
  /** Server-rendered LCP wordmark (`username.png`). */
  wordmark: ReactNode;
};

/**
 * Hero: username.png wordmark + CTAs, purple jewels atmosphere.
 * Mascot character image removed per brand preference.
 */
export function Hero({ wordmark }: HeroProps) {
  const [showFx, setShowFx] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const enable = () => {
      if (!cancelled) setShowFx(true);
    };

    timeoutId = window.setTimeout(() => {
      const ric =
        window.requestIdleCallback ??
        ((cb: IdleRequestCallback) => window.setTimeout(cb, 1) as unknown as number);
      idleId = ric(() => enable(), { timeout: 400 }) as number;
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[#050507]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(139,92,246,0.22),transparent_45%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(ellipse_at_50%_0%,rgba(16,12,23,0.9),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#09070D_0%,transparent_28%,transparent_72%,#050507_100%)]"
        aria-hidden
      />
      {showFx ? <HeroCanvas /> : null}
      {showFx ? <FloatingOrbitJewels /> : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-[#050507]/95 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8 lg:pt-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="type-label font-sans text-[0.72rem] uppercase tracking-[0.18em] text-[#A1A1AA]">
              Welcome to
            </p>
            {wordmark}
            <p className="type-hero-uppercase mt-5 font-sans text-[clamp(1.15rem,2.7vw,1.85rem)] uppercase text-white sm:mt-6">
              Play. <span className="text-primary">Earn.</span> Climb.
            </p>
            <p className="type-body mt-4 max-w-xl font-sans text-[0.95rem] leading-7 text-[#A1A1AA] sm:mt-5 sm:text-[1.05rem] sm:leading-8 sm:font-medium">
              Compete, climb the rankings, unlock VIP rewards,
              <br className="hidden sm:block" /> and chase the monthly prize pool.
            </p>
            <HeroActions />
            <HeroStats />
          </div>
        </div>

        <div className="relative z-20 mt-8 w-full sm:mt-10 lg:mt-12">
          <FeatureCards />
        </div>

        <a
          href="#live-stream"
          className="group relative z-20 mx-auto mt-8 inline-flex flex-col items-center gap-1.5 rounded-full px-3 py-2 font-body text-[#71717A] transition-colors hover:text-primary sm:mt-9"
          aria-label="Scroll to live stream"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/[0.08] bg-black/40 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_8px_24px_rgba(168,85,247,0.15)]">
            <IoChevronDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden
            />
          </span>
        </a>
      </div>
    </section>
  );
}
