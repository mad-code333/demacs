"use client";

import { useEffect } from "react";
import { DemacsLogo, USERNAME_LOGO_H, USERNAME_LOGO_W } from "./DemacsLogo";

type HeroContentProps = {
  onLogoReady?: () => void;
};

export function HeroContent({ onLogoReady }: HeroContentProps) {
  useEffect(() => {
    if (!onLogoReady) return;
    const id = window.setTimeout(onLogoReady, 800);
    return () => window.clearTimeout(id);
  }, [onLogoReady]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <p className="type-label font-sans text-[0.72rem] uppercase text-[#8E978E]">
        Welcome to
      </p>

      <h1
        className="demacs-hero-logo relative mt-5 w-full max-w-[min(92vw,860px)] sm:mt-6"
        style={{ aspectRatio: `${USERNAME_LOGO_W} / ${USERNAME_LOGO_H}` }}
      >
        <span className="sr-only">DEMACS</span>
        <DemacsLogo
          priority
          fetchPriority="high"
          width={860}
          frameClassName="demacs-img--hero relative z-[1] mx-auto block h-full w-full"
          className="h-full w-full object-contain drop-shadow-[0_0_28px_rgba(120,255,0,0.28)]"
          onReady={onLogoReady}
        />
        <span
          className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-8 rounded-full bg-primary/18 blur-2xl"
          aria-hidden
        />
      </h1>

      <p className="type-hero-uppercase mt-6 font-sans text-[clamp(1.15rem,2.7vw,1.85rem)] uppercase text-white sm:mt-7">
        Play. <span className="text-primary">Earn.</span> Climb.
      </p>
      <p className="type-body mt-4 max-w-xl font-sans text-[0.95rem] leading-7 text-[#D8DDD8]/78 sm:mt-5 sm:text-[1.05rem] sm:leading-8 sm:font-medium">
        Compete, climb the rankings, unlock VIP rewards,
        <br className="hidden sm:block" /> and chase the monthly prize pool.
      </p>
    </div>
  );
}
