import { DemacsLogo } from "./DemacsLogo";

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <p className="type-label font-sans text-[0.72rem] uppercase text-[#8E978E]">
        Welcome to
      </p>

      <h1 className="demacs-hero-logo relative mt-5 w-full sm:mt-6">
        <span className="sr-only">DEMACS</span>
        <DemacsLogo
          priority
          width={1100}
          sizes="(max-width: 430px) 92vw, (max-width: 768px) 86vw, (max-width: 1280px) 720px, 860px"
          className="relative z-[1] mx-auto h-auto w-[min(92vw,860px)] drop-shadow-[0_0_28px_rgba(120,255,0,0.28)]"
        />
        <span
          className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-8 rounded-full bg-primary/18 blur-2xl"
          aria-hidden
        />
      </h1>

      <p className="type-hero-uppercase mt-6 font-sans text-[clamp(1.15rem,2.7vw,1.85rem)] uppercase text-white sm:mt-7">
        Play. <span className="text-primary">Earn.</span> Climb.
      </p>
      <p className="type-body mt-4 max-w-xl font-sans text-[0.95rem] leading-7 text-[#D8DDD8]/78 sm:mt-5 sm:text-[1.05rem] sm:leading-8 sm:font-medium">
        Compete, climb the rankings, unlock VIP rewards,
        <br className="hidden sm:block" /> and chase the monthly prize pool.
      </p>
    </div>
  );
}
