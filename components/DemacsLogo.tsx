"use client";

import { PremiumImage } from "./PremiumImage";

/** Intrinsic aspect of `/public/images/username.png` (2170×725). */
export const USERNAME_LOGO_W = 2170;
export const USERNAME_LOGO_H = 725;

/** Intrinsic size of `/public/images/logo.png` (square D mark). */
export const LOGO_MARK_SIZE = 1254;

type DemacsLogoProps = {
  className?: string;
  frameClassName?: string;
  /** Display width hint for Next Image (height follows aspect ratio). */
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

/** Full brand wordmark from `/public/images/username.png` — never stretch or crop. */
export function DemacsLogo({
  className,
  frameClassName,
  width = 480,
  height,
  priority = false,
  sizes,
}: DemacsLogoProps) {
  const h = height ?? Math.round((width * USERNAME_LOGO_H) / USERNAME_LOGO_W);

  return (
    <PremiumImage
      src="/images/username.png"
      alt="DEMACS"
      width={width}
      height={h}
      priority={priority}
      sizes={sizes}
      frameClassName={["block max-w-full", frameClassName].filter(Boolean).join(" ")}
      className={["h-auto w-auto max-w-full object-contain", className].filter(Boolean).join(" ")}
      showPlaceholder
    />
  );
}

/** Nav/footer brand: `logo.png` D mark beside EMACS text. */
export function DemacsWordmark({
  className,
  logoClassName,
  priority = false,
}: {
  className?: string;
  logoClassName?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 transition-transform duration-300 group-hover:scale-[1.03] sm:gap-2.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PremiumImage
        src="/images/logo.png"
        alt=""
        width={72}
        height={72}
        priority={priority}
        sizes="40px"
        aria-hidden
        frameClassName="inline-flex size-8 shrink-0 sm:size-9"
        className={
          logoClassName ??
          "h-full w-full object-contain drop-shadow-[0_0_14px_rgba(120,255,0,0.35)]"
        }
        showPlaceholder
      />
      <span className="type-card-title font-sans text-[1.05rem] tracking-[0.04em] text-white sm:text-[1.15rem] sm:font-bold">
        <span className="sr-only">DEMACS</span>
        <span aria-hidden className="text-white/95 drop-shadow-[0_0_12px_rgba(120,255,0,0.18)]">
          EMACS
        </span>
      </span>
    </span>
  );
}
