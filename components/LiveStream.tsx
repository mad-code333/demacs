"use client";

import Link from "next/link";
import { IoArrowForward, IoRadio } from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function LiveStream() {
  return (
    <section
      id="live-stream"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#07080c] px-4 py-20 sm:px-6 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,255,0,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <div>
            <SectionLabel icon={IoRadio} tone="live">
              Live now
            </SectionLabel>
            <h2 className="mt-6 font-sports text-[clamp(2.4rem,6vw,4.4rem)] uppercase leading-[0.92] tracking-tight text-white">
              Catch the{" "}
              <span className="text-primary">stream</span>
            </h2>
            <p className="mt-4 max-w-md font-golos text-sm leading-relaxed text-secondary/75 sm:text-base">
              Watch Gambanator live on Kick — sessions, hunts, and community energy in one premium player embed.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="https://kick.com/gambanator" nativeAnchor>
                <SiKick className="size-4 shrink-0" aria-hidden />
                Tune in on Kick
              </PrimaryButton>
              <Link
                href="/stream/tournaments"
                className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.18em] text-secondary/80 transition-colors hover:text-white"
              >
                Tournaments
                <IoArrowForward className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_28px_80px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(120,255,0,0.08)]">
            <div className="flex items-center justify-between border-b border-white/8 bg-[#0a0b10]/95 px-4 py-3">
              <div className="flex items-center gap-2 font-golos text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                </span>
                Kick · gambanator
              </div>
              <span className="font-golos text-[0.6rem] uppercase tracking-[0.18em] text-secondary/55">
                Player
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
        </ScrollReveal>
      </div>
    </section>
  );
}
