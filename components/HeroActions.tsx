import { GiTrophyCup } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";
import { PrimaryButton } from "./PrimaryButton";

export function HeroActions() {
  return (
    <div className="mt-9 flex w-full max-w-xl flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:items-center lg:justify-start">
      <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor size="lg">
        Claim Rewards
        <IoArrowForward className="size-5 shrink-0" aria-hidden />
      </PrimaryButton>
      <PrimaryButton href="/affiliates/leaderboard" variant="secondary" size="lg">
        View Leaderboard
        <GiTrophyCup className="size-5 shrink-0 text-primary" aria-hidden />
      </PrimaryButton>
    </div>
  );
}
