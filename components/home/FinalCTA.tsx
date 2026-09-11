import Link from "next/link";
import { FaKickstarterK } from "react-icons/fa6";
import { IoArrowForward, IoPeople } from "react-icons/io5";
import { DemacsLogo } from "../DemacsLogo";
import { PrimaryButton } from "../PrimaryButton";
import { ScrollReveal } from "../ScrollReveal";
import { SectionLabel } from "../SectionLabel";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative isolate border-t border-white/5 px-4 py-20 sm:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,255,0,0.12),transparent_40%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-6xl">
        <ScrollReveal className="demacs-card overflow-hidden rounded-[28px] border-primary/20 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <DemacsLogo width={56} height={56} className="h-12 w-12" />
                <SectionLabel>
                  <IoPeople className="size-3.5 shrink-0" aria-hidden />
                  Ready to compete
                </SectionLabel>
              </div>
              <h2 className="font-sports text-[clamp(2.2rem,5vw,4rem)] uppercase leading-none tracking-tight text-white">
                Start your next <span className="text-primary">rank push</span>
              </h2>
              <p className="mt-4 max-w-xl font-golos text-base text-[#D8DDD8]/75">
                Sign in with Kick, join the live competition, and stay locked into rewards, VIP progress, and the stream.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor>
                <FaKickstarterK className="size-4 shrink-0" aria-hidden />
                Sign in with Kick
              </PrimaryButton>
              <Link
                href="/affiliates/leaderboard"
                className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.18em] text-[#8E978E] transition-colors hover:text-white"
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
