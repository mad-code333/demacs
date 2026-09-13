"use client";

import { InstantImage } from "./InstantImage";

/** Intrinsic aspect of the DEMACS wordmark. */
export const USERNAME_LOGO_W = 2170;
export const USERNAME_LOGO_H = 725;

/** Optimized static WebPs — served directly, never through /_next/image. */
export const HERO_WORDMARK_SRC = "/images/hero/username.webp";
export const HERO_LOGO_MARK_SRC = "/images/hero/logo.webp";

type DemacsLogoProps = {
  className?: string;
  frameClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fetchPriority?: "high" | "low" | "auto";
  onReady?: () => void;
};

/** Full brand wordmark — direct WebP (bypasses Next image optimizer). */
export function DemacsLogo({
  className,
  frameClassName,
  width = 860,
  height,
  priority = false,
  fetchPriority,
  onReady,
}: DemacsLogoProps) {
  const h = height ?? Math.round((width * USERNAME_LOGO_H) / USERNAME_LOGO_W);

  return (
    <InstantImage
      src={HERO_WORDMARK_SRC}
      alt="DEMACS"
      width={width}
      height={h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "auto")}
      frameClassName={["block max-w-full", frameClassName].filter(Boolean).join(" ")}
      className={["h-auto w-auto max-w-full object-contain", className].filter(Boolean).join(" ")}
      showPlaceholder
      onReady={onReady}
    />
  );
}

/** Nav/footer brand: compact logo mark beside EMACS text. */
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
      <InstantImage
        src={HERO_LOGO_MARK_SRC}
        alt=""
        width={72}
        height={72}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
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
