import { GiTrophyCup } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";
import { PrimaryButton } from "./PrimaryButton";

export function HeroActions() {
  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-9 sm:max-w-lg sm:flex-row sm:items-center">
      <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor size="md">
        Claim Rewards
        <IoArrowForward className="size-4 shrink-0" aria-hidden />
      </PrimaryButton>
      <PrimaryButton href="/affiliates/leaderboard" variant="secondary" size="md">
        View Leaderboard
        <GiTrophyCup className="size-4 shrink-0 text-primary" aria-hidden />
      </PrimaryButton>
    </div>
  );
}
