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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(120,255,0,0.12),transparent_55%)]"
        aria-hidden
      />
      <HeroCanvas />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-t from-[#02040a]/92 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col px-4 pb-10 pt-8 sm:px-6 sm:pb-12 lg:px-8 lg:pt-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <HeroContent />
          <HeroActions />
          <HeroStats />
        </div>

        <div className="mt-12 w-full lg:mt-14">
          <FeatureCards />
        </div>

        <a
          href="#live-stream"
          className="group mx-auto mt-9 inline-flex flex-col items-center gap-1.5 rounded-full px-3 py-2 text-[#8E978E] transition-colors hover:text-primary"
          aria-label="Scroll to live stream"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-black/35 shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-primary/35 group-hover:shadow-[0_8px_24px_rgba(120,255,0,0.12)]">
            <IoChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
