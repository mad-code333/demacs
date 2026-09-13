"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FeatureCards } from "./FeatureCards";
import { HeroActions } from "./HeroActions";
import { HeroCanvas } from "./HeroCanvas";
import { HeroStats } from "./HeroStats";
import { FloatingOrbitJewels } from "./hero/FloatingOrbitJewels";

type HeroProps = {
  /** Server-rendered LCP wordmark (must start in HTML, not after hydration). */
  wordmark: ReactNode;
};

/**
 * Hero shell: wordmark paints from SSR HTML first.
 * Canvas + jewels mount only after the browser is idle / logo has had a head start.
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

    // Give the LCP wordmark network priority, then enable atmosphere.
    timeoutId = window.setTimeout(() => {
      const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 1) as unknown as number);
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
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(120,255,0,0.09),transparent_52%)]"
        aria-hidden
      />
      {showFx ? <HeroCanvas /> : null}
      {showFx ? <FloatingOrbitJewels /> : null}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-[#02040a]/90 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col px-4 pb-10 pt-8 sm:px-6 sm:pb-12 lg:px-8 lg:pt-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <p className="type-label font-sans text-[0.72rem] uppercase text-[#8E978E]">Welcome to</p>
            {wordmark}
            <p className="type-hero-uppercase mt-6 font-sans text-[clamp(1.15rem,2.7vw,1.85rem)] uppercase text-white sm:mt-7">
              Play. <span className="text-primary">Earn.</span> Climb.
            </p>
            <p className="type-body mt-4 max-w-xl font-sans text-[0.95rem] leading-7 text-[#D8DDD8]/78 sm:mt-5 sm:text-[1.05rem] sm:leading-8 sm:font-medium">
              Compete, climb the rankings, unlock VIP rewards,
              <br className="hidden sm:block" /> and chase the monthly prize pool.
            </p>
          </div>
          <HeroActions />
          <HeroStats />
        </div>

        <div className="mt-10 w-full sm:mt-12 lg:mt-14">
          <FeatureCards />
        </div>

        <a
          href="#live-stream"
          className="group mx-auto mt-8 inline-flex flex-col items-center gap-1.5 rounded-full px-3 py-2 font-body text-[#8E978E] transition-colors hover:text-primary sm:mt-9"
          aria-label="Scroll to live stream"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-black/35 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-primary/35 group-hover:shadow-[0_8px_24px_rgba(120,255,0,0.1)]">
            <IoChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
