import { GiTrophyCup } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";
import { PrimaryButton } from "./PrimaryButton";

export function HeroActions() {
  return (
    <div className="mt-8 flex w-full max-w-lg flex-col items-center justify-center gap-3 sm:flex-row">
      <PrimaryButton href="/api/auth/kick?next=/" nativeAnchor className="min-w-[190px]">
        Claim Rewards
        <IoArrowForward className="size-4 shrink-0" aria-hidden />
      </PrimaryButton>
      <PrimaryButton href="/affiliates/leaderboard" variant="secondary" className="min-w-[190px]">
        View Leaderboard
        <GiTrophyCup className="size-4 shrink-0 text-primary" aria-hidden />
      </PrimaryButton>
    </div>
  );
}
