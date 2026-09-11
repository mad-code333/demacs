"use client";

import Link from "next/link";
import { IoArrowForward, IoPlay, IoRadio } from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function LiveStream() {
  return (
    <section
      id="live-stream"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#04060a] px-4 pb-16 pt-4 sm:px-6 lg:pb-20 lg:pt-6"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(120,255,0,0.05),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.25fr_0.75fr] lg:items-center lg:gap-8">
            <div>
              <SectionLabel icon={IoRadio} tone="live">
                Live now
              </SectionLabel>
              <h2 className="mt-5 font-sports text-[clamp(2.1rem,5vw,3.6rem)] uppercase leading-[0.92] tracking-tight text-white">
                Join the <span className="text-primary">action</span>
              </h2>
              <p className="mt-4 max-w-sm font-golos text-sm leading-relaxed text-secondary/75">
                Watch Gambanator live on Kick — sessions, hunts, and community energy in the official player.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PrimaryButton href="https://kick.com/gambanator" nativeAnchor className="rounded-full">
                  <IoPlay className="size-4 shrink-0" aria-hidden />
                  Watch live
                </PrimaryButton>
                <Link
                  href="/stream/tournaments"
                  className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.16em] text-secondary/75 transition-colors hover:text-white"
                >
                  Tournaments
                  <IoArrowForward className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_28px_80px_-24px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between border-b border-white/8 bg-[#0a0b10]/95 px-4 py-3">
                <div className="flex items-center gap-2 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                  </span>
                  Live
                </div>
                <span className="font-golos text-[0.6rem] uppercase tracking-[0.16em] text-secondary/50">
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
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/35 p-5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                  <SiKick className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="font-golos text-sm font-semibold text-white">Gambanator Live</p>
                  <p className="font-golos text-[0.65rem] uppercase tracking-[0.16em] text-secondary/55">
                    kick.com/gambanator
                  </p>
                </div>
              </div>
              <p className="mt-4 font-golos text-sm leading-6 text-secondary/70">
                Official broadcast for hunts, competition talk, and community sessions.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/stream/bonus-hunters"
                  className="rounded-full border border-white/10 px-3 py-1.5 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:border-primary/30 hover:text-white"
                >
                  Bonus hunters
                </Link>
                <Link
                  href="/stream/tournaments"
                  className="rounded-full border border-white/10 px-3 py-1.5 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-secondary/75 transition-colors hover:border-primary/30 hover:text-white"
                >
                  Tournaments
                </Link>
              </div>
              <a
                href="https://kick.com/gambanator"
                className="mt-5 inline-flex items-center gap-2 font-golos text-xs font-semibold uppercase tracking-[0.16em] text-primary"
              >
                Open Kick
                <IoArrowForward className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
