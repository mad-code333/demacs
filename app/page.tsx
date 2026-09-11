import Link from "next/link";
import { FaKickstarterK } from "react-icons/fa6";
import { GiMedal } from "react-icons/gi";
import { IoArrowForward, IoPeople } from "react-icons/io5";
import { Hero } from "../components/Hero";
import { HomeLeaderboardPreview } from "../components/HomeLeaderboardPreview";
import { LeaderboardDataProvider } from "../components/LeaderboardDataProvider";
import { LiveStream } from "../components/LiveStream";
import { MonthlyCompetition } from "../components/MonthlyCompetition";
import { PrimaryButton } from "../components/PrimaryButton";
import { RewardsPerks } from "../components/RewardsPerks";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionLabel } from "../components/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Play",
    description: "Sign in with Kick and play under code gambanatorkick to enter the rewards ecosystem.",
  },
  {
    number: "02",
    title: "Earn",
    description: "Track bonuses, VIP progress, and monthly competition standing as you wager.",
  },
  {
    number: "03",
    title: "Climb",
    description: "Push your rank on the live leaderboard and compete for the top monthly prizes.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-hidden bg-[#04060a] text-white">
      <Hero />
      <LiveStream />

      <LeaderboardDataProvider>
        <MonthlyCompetition />
        <RewardsPerks />
        <HomeLeaderboardPreview />
      </LeaderboardDataProvider>

      <section id="how-it-works" className="border-t border-white/5 bg-[#04060a] px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>
              <GiMedal className="size-3.5 shrink-0" aria-hidden />
              How it works
            </SectionLabel>
            <h2 className="mt-6 font-sports text-[clamp(2.1rem,5vw,3.6rem)] uppercase leading-none tracking-tight text-white">
              Simple flow. <span className="text-primary">Fast climb.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map(({ number, title, description }, index) => (
              <ScrollReveal key={number} delay={index * 0.05} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-6 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <span className="font-golos text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                      {number}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" aria-hidden />
                  </div>
                  <h3 className="mt-6 font-golos text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-secondary/70">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="border-t border-white/5 bg-[#04060a] px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal className="overflow-hidden rounded-[28px] border border-primary/25 bg-[radial-gradient(circle_at_top,_rgba(120,255,0,0.14),transparent_34%),linear-gradient(180deg,#0c1016_0%,#08090d_100%)] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_28px_60px_rgba(0,0,0,0.4)] sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>
                  <IoPeople className="size-3.5 shrink-0" aria-hidden />
                  Ready to compete
                </SectionLabel>
                <h2 className="mt-6 font-sports text-[clamp(2.2rem,5vw,4rem)] uppercase leading-none tracking-tight text-white">
                  Start your next <span className="text-primary">rank push</span>
                </h2>
                <p className="mt-4 max-w-xl font-golos text-base text-secondary/75">
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
                  className="inline-flex items-center gap-2 font-golos text-sm font-semibold uppercase tracking-[0.18em] text-secondary/80 transition-colors hover:text-white"
                >
                  View leaderboard
                  <IoArrowForward className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
