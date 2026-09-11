"use client";

import Image from "next/image";

/** Intrinsic aspect of `/public/images/username.png` (2170×725). */
export const USERNAME_LOGO_W = 2170;
export const USERNAME_LOGO_H = 725;

type DemacsLogoProps = {
  className?: string;
  /** Display width hint for Next Image (height follows aspect ratio). */
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

/** Brand wordmark from `/public/images/username.png` — never stretch or crop. */
export function DemacsLogo({
  className,
  width = 480,
  height,
  priority = false,
  sizes,
}: DemacsLogoProps) {
  const h = height ?? Math.round((width * USERNAME_LOGO_H) / USERNAME_LOGO_W);

  return (
    <Image
      src="/images/username.png"
      alt="DEMACS"
      width={width}
      height={h}
      priority={priority}
      sizes={sizes}
      className={["h-auto w-auto max-w-full object-contain", className].filter(Boolean).join(" ")}
    />
  );
}

/** Logo-only brand mark for nav/footer (no text). */
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
        "inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <DemacsLogo
        className={
          logoClassName ??
          "h-8 w-auto max-w-[148px] drop-shadow-[0_0_16px_rgba(120,255,0,0.22)] sm:h-9 sm:max-w-[168px]"
        }
        width={336}
        priority={priority}
        sizes="(max-width: 640px) 148px, 168px"
      />
    </span>
  );
}
