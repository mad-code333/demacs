import { FinalCTA } from "../components/home/FinalCTA";
import { CompetitionFlow } from "../components/home/CompetitionFlow";
// import { HowItWorksDiagram } from "../components/home/HowItWorksDiagram";
import { VIPProgression } from "../components/home/VIPProgression";
import { Hero } from "../components/Hero";
import { HeroWordmark } from "../components/HeroWordmark";
import { HomeLeaderboardPreview } from "../components/HomeLeaderboardPreview";
import { LeaderboardDataProvider } from "../components/LeaderboardDataProvider";
import { LiveStream } from "../components/LiveStream";
import { MonthlyCompetition } from "../components/MonthlyCompetition";
import { RewardsPerks } from "../components/RewardsPerks";
import { HERO_WORDMARK_SRC_960 } from "../lib/hero-assets";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden text-white">
      {/* Single-URL preload — starts LCP fetch in <head> before body parse. */}
      <link
        rel="preload"
        as="image"
        href={HERO_WORDMARK_SRC_960}
        type="image/webp"
        fetchPriority="high"
      />

      <Hero wordmark={<HeroWordmark />} />

      <LiveStream />

      <LeaderboardDataProvider>
        <MonthlyCompetition />
        <HomeLeaderboardPreview />
        <RewardsPerks />
        <VIPProgression />
      </LeaderboardDataProvider>

      {/* <HowItWorksDiagram /> */}
      <CompetitionFlow />
      <FinalCTA />
    </div>
  );
}
