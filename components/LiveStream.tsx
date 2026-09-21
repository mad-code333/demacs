"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowForward, IoPlay, IoRadio } from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { DimensionalCard } from "./DimensionalCard";
import { PrimaryButton } from "./PrimaryButton";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

function StreamStatusBadge({ live }: { live: boolean }) {
  if (live) {
    return (
      <span className="pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-red-500/45 bg-black/60 px-2.5 py-1 shadow-[0_0_16px_rgba(239,68,68,0.22)] backdrop-blur-md">
        <span
          className="demacs-live-dot size-1.5 shrink-0 rounded-full bg-red-500"
          aria-hidden
        />
        <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white">
          Live
        </span>
      </span>
    );
  }

  return (
    <span className="pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center rounded-full border border-white/14 bg-black/55 px-2.5 py-1 backdrop-blur-md">
      <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/75">
        Offline
      </span>
    </span>
  );
}

export function LiveStream() {
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/stream/status", { cache: "no-store" });
        const data: unknown = await res.json();
        const next =
          typeof data === "object" &&
          data !== null &&
          "live" in data &&
          (data as { live: unknown }).live === true;
        if (!cancelled) setLive(next);
      } catch {
        if (!cancelled) setLive(false);
      }
    };

    void load();
    const id = window.setInterval(() => void load(), 60_000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section
      id="live-stream"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/5 px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(168,85,247,0.1),transparent_52%),radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.06),transparent_40%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[960px]">
        <ScrollReveal>
          <div className="mb-6 flex flex-col gap-5 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionLabel icon={IoRadio}>On Kick</SectionLabel>
              <h2 className="type-section-uppercase mt-4 font-sans text-[clamp(1.8rem,4vw,3.2rem)] uppercase leading-[0.92] text-white">
                Watch <span className="text-primary">DEMACS</span>
              </h2>
              <p className="mt-3 max-w-xl font-golos text-[0.95rem] leading-7 text-secondary/75">
                Watch DEMACS live on Kick — sessions, hunts, and community energy in the official player.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="https://kick.com/demacs" nativeAnchor size="md">
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

          <DimensionalCard
            className="overflow-hidden rounded-[28px] shadow-[0_0_0_1px_rgba(168,85,247,0.18),0_24px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(168,85,247,0.12)]"
            interactive={false}
          >
            <div className="relative aspect-video w-full bg-[#050508]">
              <iframe
                title="Kick live player"
                src="https://kick-player-public.pages.dev/demacs"
                className="absolute inset-0 size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
              {live !== null ? <StreamStatusBadge live={live} /> : null}
            </div>
          </DimensionalCard>

          <DimensionalCard className="mt-5 rounded-[28px] p-5 sm:mt-6 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3.5 sm:items-center">
                <div className="demacs-icon-plate flex size-12 shrink-0 items-center justify-center rounded-full text-primary">
                  <SiKick className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-golos text-base font-semibold text-white">DEMACS Live</p>
                  <p className="font-golos text-[0.68rem] uppercase tracking-[0.16em] text-secondary/55">
                    kick.com/demacs
                  </p>
                  <p className="mt-2 max-w-xl font-golos text-[0.9rem] leading-6 text-secondary/70">
                    Official broadcast for hunts, competition talk, and community sessions.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
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
                <a
                  href="https://kick.com/demacs"
                  className="inline-flex items-center gap-2 px-1 font-golos text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-[#C084FC]"
                >
                  Open Kick
                  <IoArrowForward className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </DimensionalCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
