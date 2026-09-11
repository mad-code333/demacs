"use client";

import Link from "next/link";
import { IoArrowForward, IoPlay, IoRadio } from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { DimensionalCard } from "./DimensionalCard";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function LiveStream() {
  return (
    <section
      id="live-stream"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(120,255,0,0.06),transparent_52%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-12 xl:grid-cols-[0.85fr_1.5fr_0.85fr]">
            <div>
              <SectionLabel icon={IoRadio} tone="live">
                Live now
              </SectionLabel>
              <h2 className="mt-6 font-sports text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-[0.92] tracking-tight text-white">
                Join the <span className="text-primary">action</span>
              </h2>
              <p className="mt-5 max-w-md font-golos text-base leading-7 text-secondary/75">
                Watch DEMACS live on Kick — sessions, hunts, and community energy in the official player.
              </p>
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <PrimaryButton href="https://kick.com/gambanator" nativeAnchor size="lg">
                  <IoPlay className="size-5 shrink-0" aria-hidden />
                  Watch live
                </PrimaryButton>
                <Link
                  href="/stream/tournaments"
                  className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:text-white"
                >
                  Tournaments
                  <IoArrowForward className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            <DimensionalCard className="overflow-hidden rounded-[28px]" interactive={false}>
              <div className="flex items-center justify-between border-b border-white/8 bg-[#0a0b10]/80 px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 font-golos text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                  </span>
                  Live
                </div>
                <span className="font-golos text-[0.65rem] uppercase tracking-[0.16em] text-secondary/50">
                  Kick player
                </span>
              </div>
              <div className="relative aspect-video w-full bg-[#050508]">
                <iframe
                  title="Kick live player"
                  src="https://kick-player-public.pages.dev/gambanator"
                  className="absolute inset-0 size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </DimensionalCard>

            <DimensionalCard className="rounded-[28px] p-6 sm:p-7 xl:block">
              <div className="flex items-center gap-3.5">
                <div className="demacs-icon-plate flex size-12 items-center justify-center rounded-full text-primary">
                  <SiKick className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-golos text-base font-semibold text-white">DEMACS Live</p>
                  <p className="font-golos text-[0.68rem] uppercase tracking-[0.16em] text-secondary/55">
                    kick.com/gambanator
                  </p>
                </div>
              </div>
              <p className="mt-5 font-golos text-[0.95rem] leading-7 text-secondary/70">
                Official broadcast for hunts, competition talk, and community sessions.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  href="/stream/bonus-hunters"
                  className="rounded-full border border-white/10 px-3.5 py-2 font-golos text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-secondary/75 transition-colors hover:border-primary/30 hover:text-white"
                >
                  Bonus hunters
                </Link>
                <Link
                  href="/stream/tournaments"
                  className="rounded-full border border-white/10 px-3.5 py-2 font-golos text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-secondary/75 transition-colors hover:border-primary/30 hover:text-white"
                >
                  Tournaments
                </Link>
              </div>
              <a
                href="https://kick.com/gambanator"
                className="mt-6 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-[#9dff4a]"
              >
                Open Kick
                <IoArrowForward className="size-3.5" aria-hidden />
              </a>
            </DimensionalCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
