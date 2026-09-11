export function HeroContent() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <p className="font-golos text-[0.68rem] font-semibold uppercase tracking-[0.42em] text-[#8E978E]">
        Welcome to
      </p>

      <h1 className="demacs-hero-title demacs-hero-float mt-5">
        <span className="demacs-hero-d">D</span>
        <span className="demacs-hero-emacs">emacs</span>
      </h1>

      <p className="mt-6 font-golos text-[clamp(0.95rem,2.2vw,1.4rem)] font-extrabold uppercase tracking-[0.34em] text-white">
        Play. <span className="text-primary drop-shadow-[0_0_18px_rgba(120,255,0,0.35)]">Earn.</span> Climb.
      </p>
      <p className="mt-5 max-w-xl font-golos text-sm leading-7 text-[#D8DDD8]/80 sm:text-[0.98rem]">
        Compete, climb the rankings, unlock VIP rewards,
        <br className="hidden sm:block" /> and chase the monthly prize pool.
      </p>
    </div>
  );
}
