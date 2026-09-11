"use client";

import { createContext, useContext } from "react";
import {
  useLeaderboardPlayers,
  type LeaderboardFetchState,
} from "./Leaderboard";

const LeaderboardDataContext = createContext<LeaderboardFetchState | null>(null);

export function LeaderboardDataProvider({ children }: { children: React.ReactNode }) {
  const state = useLeaderboardPlayers();
  return (
    <LeaderboardDataContext.Provider value={state}>{children}</LeaderboardDataContext.Provider>
  );
}

export function useSharedLeaderboard(): LeaderboardFetchState {
  const ctx = useContext(LeaderboardDataContext);
  if (!ctx) {
    throw new Error("useSharedLeaderboard must be used within LeaderboardDataProvider");
  }
  return ctx;
}
