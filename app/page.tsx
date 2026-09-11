import { FinalCTA } from "../components/home/FinalCTA";
import { HowItWorksDiagram } from "../components/home/HowItWorksDiagram";
import { VIPProgression } from "../components/home/VIPProgression";
import { Hero } from "../components/Hero";
import { HomeLeaderboardPreview } from "../components/HomeLeaderboardPreview";
import { LeaderboardDataProvider } from "../components/LeaderboardDataProvider";
import { LiveStream } from "../components/LiveStream";
import { MonthlyCompetition } from "../components/MonthlyCompetition";
import { RewardsPerks } from "../components/RewardsPerks";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-hidden text-white">
      <Hero />

      <LiveStream />

      <LeaderboardDataProvider>
        <MonthlyCompetition />
        <HomeLeaderboardPreview />
        <RewardsPerks />
        <VIPProgression />
      </LeaderboardDataProvider>

      <HowItWorksDiagram />
      <FinalCTA />
    </div>
  );
}
