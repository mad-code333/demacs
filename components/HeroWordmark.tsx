import type { CSSProperties } from "react";
import {
  HERO_WORDMARK_SRC,
  USERNAME_LOGO_H,
  USERNAME_LOGO_W,
} from "../lib/hero-assets";
import { JEWEL_SRC } from "./hero/orbitConfig";

type Jewel = {
  id: string;
  src: string;
  /** Size ratio against the responsive base (--jw). */
  ratio: number;
  /** Offset from the cluster centre, in multiples of --jw. */
  dx: number;
  dy: number;
  rotate: string;
  delay: string;
};

/**
 * Clusters are laid out in multiples of --jw, so the gaps grow with the jewels
 * and the grouping keeps its shape (and its breathing room) at every size.
 * Left: crown-led rosette. Right: coin-led rosette, mirrored.
 */
const LEFT: Jewel[] = [
  { id: "crown-left", src: JEWEL_SRC.crown, ratio: 1.15, dx: 0, dy: -0.72, rotate: "-12deg", delay: "0s" },
  { id: "cup-left", src: JEWEL_SRC.trophy, ratio: 0.85, dx: -0.68, dy: 0.02, rotate: "-6deg", delay: "0.2s" },
  { id: "gem-left", src: JEWEL_SRC.gem, ratio: 0.6, dx: 0.6, dy: 0.12, rotate: "10deg", delay: "0.45s" },
  { id: "ring-left", src: JEWEL_SRC.ring, ratio: 0.52, dx: -0.2, dy: 0.72, rotate: "-8deg", delay: "0.7s" },
  { id: "crystal-left", src: JEWEL_SRC.crystal, ratio: 0.46, dx: 0.42, dy: 0.82, rotate: "16deg", delay: "0.9s" },
];

const RIGHT: Jewel[] = [
  { id: "coin-right", src: JEWEL_SRC.coin, ratio: 1.1, dx: 0.12, dy: -0.7, rotate: "8deg", delay: "0.15s" },
  { id: "crystal-right", src: JEWEL_SRC.crystal, ratio: 0.6, dx: -0.66, dy: 0.08, rotate: "14deg", delay: "0.35s" },
  { id: "gem-right", src: JEWEL_SRC.gem, ratio: 0.68, dx: 0.58, dy: 0.28, rotate: "-12deg", delay: "0.6s" },
  { id: "ring-right", src: JEWEL_SRC.ring, ratio: 0.48, dx: -0.16, dy: 0.8, rotate: "-18deg", delay: "0.85s" },
];

function JewelImg({ jewel }: { jewel: Jewel }) {
  const size = `calc(var(--jw) * ${jewel.ratio})`;

  return (
    <span
      className="hero-wordmark-arc__item pointer-events-none absolute z-[2]"
      style={{
        left: `calc(var(--cx) + var(--jw) * ${jewel.dx})`,
        top: `calc(var(--cy) + var(--jw) * ${jewel.dy})`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={jewel.src}
        alt=""
        width={128}
        height={128}
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

/** Hero wordmark flanked by two grouped jewel clusters. */
export function HeroWordmark() {
  return (
    <h1 className="demacs-hero-logo hero-wordmark-arc relative mt-5 w-full max-w-[min(96vw,1040px)] overflow-visible py-[5%] sm:mt-6">
      <span className="sr-only">DEMACS</span>

      <div className="hero-wordmark-arc__side hero-wordmark-arc__side--left">
        {LEFT.map((jewel) => (
          <JewelImg key={jewel.id} jewel={jewel} />
        ))}
      </div>

      <span
        className="relative z-[1] mx-auto block w-[56%] sm:w-[58%] lg:w-[60%] max-w-[620px]"
        style={{ aspectRatio: `${USERNAME_LOGO_W} / ${USERNAME_LOGO_H}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_WORDMARK_SRC}
          alt="DEMACS"
          width={USERNAME_LOGO_W}
          height={USERNAME_LOGO_H}
          decoding="async"
          loading="eager"
          fetchPriority="high"
          className="block h-auto w-full object-contain"
        />
      </span>

      <div className="hero-wordmark-arc__side hero-wordmark-arc__side--right">
        {RIGHT.map((jewel) => (
          <JewelImg key={jewel.id} jewel={jewel} />
        ))}
      </div>
    </h1>
  );
}
