import { DemacsLogo } from "./DemacsLogo";

export function HeroContent() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <p className="font-golos text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#8E978E]">
        Welcome to
      </p>

      <h1 className="demacs-hero-logo relative mt-5 w-full sm:mt-6">
        <span className="sr-only">DEMACS</span>
        <DemacsLogo
          priority
          width={1100}
          sizes="(max-width: 430px) 92vw, (max-width: 768px) 86vw, (max-width: 1280px) 720px, 860px"
          className="mx-auto h-auto w-[min(92vw,860px)]"
        />
        <span
          className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-10 rounded-full bg-primary/25 blur-3xl demacs-glow-pulse"
          aria-hidden
        />
      </h1>

      <p className="mt-7 font-sports text-[clamp(1.15rem,2.8vw,1.85rem)] uppercase tracking-[0.18em] text-white sm:mt-8 sm:tracking-[0.22em]">
        Play. <span className="text-primary drop-shadow-[0_0_20px_rgba(120,255,0,0.45)]">Earn.</span> Climb.
      </p>
      <p className="mt-5 max-w-2xl font-golos text-[0.98rem] leading-7 text-[#D8DDD8]/82 sm:mt-6 sm:text-[1.08rem] sm:leading-8">
        Compete, climb the rankings, unlock VIP rewards,
        <br className="hidden sm:block" /> and chase the monthly prize pool.
      </p>
    </div>
  );
}
