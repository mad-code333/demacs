import {
  HERO_WORDMARK_SRC,
  HERO_WORDMARK_SRC_640,
  HERO_WORDMARK_SRC_960,
  USERNAME_LOGO_H,
  USERNAME_LOGO_W,
} from "../lib/hero-assets";

const WORDMARK_SRCSET = `${HERO_WORDMARK_SRC_640} 640w, ${HERO_WORDMARK_SRC_960} 960w, ${HERO_WORDMARK_SRC} 1280w`;
const WORDMARK_SIZES = "(max-width: 480px) 92vw, (max-width: 900px) 86vw, 860px";

/**
 * Server-rendered LCP wordmark — present in the initial HTML so the browser
 * starts downloading before React hydrates. Uses responsive WebP sources
 * (no /_next/image) for fast, sharp paint without JPEG recompression.
 */
export function HeroWordmark() {
  return (
    <h1
      className="demacs-hero-logo relative mt-5 w-full max-w-[min(92vw,860px)] sm:mt-6"
      style={{ aspectRatio: `${USERNAME_LOGO_W} / ${USERNAME_LOGO_H}` }}
    >
      <span className="sr-only">DEMACS</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_WORDMARK_SRC_960}
        srcSet={WORDMARK_SRCSET}
        sizes={WORDMARK_SIZES}
        alt="DEMACS"
        width={960}
        height={Math.round((960 * USERNAME_LOGO_H) / USERNAME_LOGO_W)}
        decoding="async"
        loading="eager"
        fetchPriority="high"
        className="relative z-[1] mx-auto block h-auto w-full object-contain drop-shadow-[0_0_28px_rgba(120,255,0,0.28)]"
      />
      <span
        className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-8 rounded-full bg-primary/18 blur-2xl"
        aria-hidden
      />
    </h1>
  );
}
