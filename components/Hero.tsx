import { IoChevronDown } from "react-icons/io5";
import { FeatureCards } from "./FeatureCards";
import { HeroActions } from "./HeroActions";
import { HeroCanvas } from "./HeroCanvas";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(120,255,0,0.08),transparent_50%)]"
        aria-hidden
      />
      <HeroCanvas />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 bg-gradient-to-t from-[#02040a]/90 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-6 sm:pb-10 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <HeroContent />
          <HeroActions />
          <HeroStats />
        </div>

        <div className="mt-8 w-full lg:mt-10">
          <FeatureCards />
        </div>

        <a
          href="#live-stream"
          className="mx-auto mt-6 inline-flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[#8E978E] transition-colors hover:text-primary"
          aria-label="Scroll to live stream"
        >
          <span className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-black/30">
            <IoChevronDown className="size-4" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
