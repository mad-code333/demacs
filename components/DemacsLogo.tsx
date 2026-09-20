"use client";

import { InstantImage } from "./InstantImage";
import {
  HERO_WORDMARK_SRC,
  USERNAME_LOGO_H,
  USERNAME_LOGO_W,
} from "../lib/hero-assets";

export {
  HERO_LOGO_MARK_SRC,
  HERO_WORDMARK_SRC,
  USERNAME_LOGO_H,
  USERNAME_LOGO_W,
} from "../lib/hero-assets";

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

/** Wordmark for below-fold / secondary surfaces (Final CTA, etc.). */
export function DemacsLogo({
  className,
  frameClassName,
  width = 420,
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
      fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
      frameClassName={["block max-w-full", frameClassName].filter(Boolean).join(" ")}
      className={["h-auto w-auto max-w-full object-contain", className].filter(Boolean).join(" ")}
      showPlaceholder
      onReady={onReady}
    />
  );
}

/** Nav/footer brand: `username.png` wordmark. */
export function DemacsWordmark({
  className,
  logoClassName,
  priority = false,
}: {
  className?: string;
  logoClassName?: string;
  priority?: boolean;
}) {
  const navW = 168;
  const navH = Math.round((navW * USERNAME_LOGO_H) / USERNAME_LOGO_W);

  return (
    <span
      className={[
        "inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <InstantImage
        src={HERO_WORDMARK_SRC}
        alt="DEMACS"
        width={navW}
        height={navH}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "auto" : "low"}
        frameClassName="inline-flex h-8 w-auto max-w-[min(42vw,168px)] overflow-visible sm:h-9"
        className={
          logoClassName ??
          "h-full w-auto object-contain object-left"
        }
        showPlaceholder={false}
      />
    </span>
  );
}
