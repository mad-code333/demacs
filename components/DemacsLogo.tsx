"use client";

import Image from "next/image";

type DemacsLogoProps = {
  className?: string;
  /** Intrinsic display width hint for Next Image */
  width?: number;
  height?: number;
  priority?: boolean;
};

/** Real brand mark from `/public/logo.png`. */
export function DemacsLogo({
  className,
  width = 160,
  height = 160,
  priority = false,
}: DemacsLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="DEMACS"
      width={width}
      height={height}
      priority={priority}
      className={["h-auto w-auto object-contain", className].filter(Boolean).join(" ")}
    />
  );
}

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
    <span className={["inline-flex items-center gap-2.5", className].filter(Boolean).join(" ")}>
      <DemacsLogo className={logoClassName ?? "h-8 w-8"} width={64} height={64} priority={priority} />
      <span className="font-golos text-[0.95rem] font-extrabold uppercase tracking-[0.22em] text-white">
        Demacs
      </span>
    </span>
  );
}
