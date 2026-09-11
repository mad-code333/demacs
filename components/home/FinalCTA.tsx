import Link from "next/link";
import { FaKickstarterK } from "react-icons/fa6";
import { IoArrowForward, IoPeople } from "react-icons/io5";
import { DemacsLogo } from "../DemacsLogo";
import { PrimaryButton } from "../PrimaryButton";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate border-t border-white/5 px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,255,0,0.14),transparent_42%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal className="demacs-card demacs-card-light overflow-hidden rounded-[32px] border-primary/22 p-8 sm:p-12 lg:p-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <DemacsLogo
                  width={420}
                  sizes="(max-width: 640px) 200px, 260px"
                  className="h-auto w-[min(70vw,260px)] drop-shadow-[0_0_24px_rgba(120,255,0,0.28)]"
                />
                <SectionLabel>
                  <IoPeople className="size-3.5 shrink-0" aria-hidden />
                  Ready to compete
                </SectionLabel>
              </div>
              <h2 className="font-sports text-[clamp(2.2rem,5vw,3.8rem)] uppercase leading-none tracking-tight text-white">
                Start your next <span className="text-primary">rank push</span>
              </h2>
              <p className="mt-5 max-w-xl font-golos text-base leading-7 text-[#D8DDD8]/78 sm:text-lg">
                Sign in with Kick, join the live competition, and stay locked into rewards, VIP progress, and the stream.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor size="lg">
                <FaKickstarterK className="size-5 shrink-0" aria-hidden />
                Sign in with Kick
              </PrimaryButton>
              <Link
                href="/affiliates/leaderboard"
                className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.12em] text-[#8E978E] transition-colors hover:text-white"
              >
                View leaderboard
                <IoArrowForward className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
