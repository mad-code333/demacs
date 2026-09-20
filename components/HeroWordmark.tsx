import type { CSSProperties } from "react";
import {
  HERO_WORDMARK_SRC,
  USERNAME_LOGO_H,
  USERNAME_LOGO_W,
} from "../lib/hero-assets";
import { JEWEL_SRC } from "./hero/orbitConfig";

type FlankJewel = {
  id: string;
  src: string;
  size: number;
  className: string;
  rotate: string;
  delay: string;
};

/** Left: cup + 1 gem · Right: 2 gems — spaced, no overlap. */
const LEFT_JEWELS: FlankJewel[] = [
  {
    id: "cup-left",
    src: JEWEL_SRC.trophy,
    size: 88,
    className: "left-[-14%] top-[8%] sm:left-[-16%] md:left-[-18%]",
    rotate: "-8deg",
    delay: "0s",
  },
  {
    id: "gem-left",
    src: JEWEL_SRC.gem,
    size: 72,
    className: "left-[-12%] bottom-[4%] sm:left-[-14%] md:left-[-16%]",
    rotate: "10deg",
    delay: "0.45s",
  },
];

const RIGHT_JEWELS: FlankJewel[] = [
  {
    id: "gem-right-top",
    src: JEWEL_SRC.crystal,
    size: 70,
    className: "right-[-12%] top-[6%] sm:right-[-14%] md:right-[-16%]",
    rotate: "14deg",
    delay: "0.2s",
  },
  {
    id: "gem-right-bottom",
    src: JEWEL_SRC.gem,
    size: 78,
    className: "right-[-13%] bottom-[2%] sm:right-[-15%] md:right-[-17%]",
    rotate: "-12deg",
    delay: "0.65s",
  },
];

function FlankJewelImg({ jewel }: { jewel: FlankJewel }) {
  return (
    <span
      className={`pointer-events-none absolute z-[2] ${jewel.className}`}
      style={{ width: jewel.size, height: jewel.size }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={jewel.src}
        alt=""
        width={jewel.size}
        height={jewel.size}
        decoding="async"
        loading="eager"
        className="hero-wordmark-gem h-full w-full object-contain"
        style={
          {
            ["--gem-rot" as string]: jewel.rotate,
            animationDelay: jewel.delay,
          } as CSSProperties
        }
        draggable={false}
      />
    </span>
  );
}

/**
 * Hero wordmark with left cup + spaced gold gems.
 */
export function HeroWordmark() {
  return (
    <h1
      className="demacs-hero-logo relative mt-5 w-full max-w-[min(92vw,860px)] overflow-visible sm:mt-6"
      style={{ aspectRatio: `${USERNAME_LOGO_W} / ${USERNAME_LOGO_H}` }}
    >
      <span className="sr-only">DEMACS</span>

      {LEFT_JEWELS.map((jewel) => (
        <FlankJewelImg key={jewel.id} jewel={jewel} />
      ))}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_WORDMARK_SRC}
        alt="DEMACS"
        width={USERNAME_LOGO_W}
        height={USERNAME_LOGO_H}
        decoding="async"
        loading="eager"
        fetchPriority="high"
        className="relative z-[1] mx-auto block h-auto w-full object-contain"
      />

      {RIGHT_JEWELS.map((jewel) => (
        <FlankJewelImg key={jewel.id} jewel={jewel} />
      ))}
    </h1>
  );
}
