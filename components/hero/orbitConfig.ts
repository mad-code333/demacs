export type JewelDepth = "bg" | "mid" | "fg";
export type JewelVisibility = "always" | "sm" | "md" | "lg";
export type JewelKind = "coin" | "gem" | "crown" | "ring" | "crystal" | "trophy";
export type JewelBlend = "normal" | "screen";

export type OrbitJewelConfig = {
  id: string;
  kind: JewelKind;
  /** Angle on the elliptical orbit in degrees (0 = right, 90 = bottom) */
  angle: number;
  /** Radial scale relative to orbit (1 = on path, >1 outside, <1 inside) */
  radius: number;
  size: number;
  depth: JewelDepth;
  rotate: number;
  duration: number;
  delay: number;
  bob: number;
  opacity: number;
  visible: JewelVisibility;
  blend?: JewelBlend;
};

/** public/images/1.png–6.png */
export const JEWEL_SRC: Record<JewelKind, string> = {
  coin: "/images/1.png",
  gem: "/images/2.png",
  crown: "/images/3.png",
  ring: "/images/4.png",
  crystal: "/images/5.png",
  trophy: "/images/6.png",
};

/**
 * Intentionally placed jewels along the hero elliptical orbit.
 * Center clear zone reserved for DEMACS logo + headline + CTAs.
 * Black-backed PNGs use screen blend.
 */
export const ORBIT_JEWELS: OrbitJewelConfig[] = [
  /* —— BACKGROUND —— */
  { id: "bg-1", kind: "crystal", angle: -28, radius: 1.1, size: 26, depth: "bg", rotate: -18, duration: 16, delay: 0.2, bob: 8, opacity: 0.4, visible: "md", blend: "screen" },
  { id: "bg-2", kind: "gem", angle: 18, radius: 1.14, size: 22, depth: "bg", rotate: 22, duration: 18, delay: 1.1, bob: 7, opacity: 0.36, visible: "lg", blend: "screen" },
  { id: "bg-3", kind: "coin", angle: 155, radius: 1.08, size: 20, depth: "bg", rotate: -8, duration: 15, delay: 0.7, bob: 7, opacity: 0.34, visible: "lg", blend: "screen" },
  { id: "bg-4", kind: "ring", angle: 210, radius: 1.12, size: 24, depth: "bg", rotate: 40, duration: 17, delay: 1.8, bob: 7, opacity: 0.38, visible: "md", blend: "screen" },
  { id: "bg-5", kind: "crystal", angle: 95, radius: 1.16, size: 18, depth: "bg", rotate: 12, duration: 14, delay: 2.2, bob: 6, opacity: 0.32, visible: "lg", blend: "screen" },

  /* —— MIDGROUND —— */
  { id: "mid-ul-coin", kind: "coin", angle: -145, radius: 1.05, size: 56, depth: "mid", rotate: -28, duration: 13, delay: 0, bob: 12, opacity: 0.9, visible: "always", blend: "screen" },
  { id: "mid-ul-gem", kind: "gem", angle: -118, radius: 1.02, size: 40, depth: "mid", rotate: 16, duration: 11.5, delay: 0.4, bob: 12, opacity: 0.82, visible: "sm", blend: "screen" },
  { id: "mid-top-crystal", kind: "crystal", angle: -95, radius: 1.08, size: 34, depth: "mid", rotate: -12, duration: 12, delay: 0.8, bob: 10, opacity: 0.74, visible: "md", blend: "screen" },
  { id: "mid-top-ring", kind: "ring", angle: -72, radius: 1.0, size: 36, depth: "mid", rotate: 8, duration: 14, delay: 1.2, bob: 9, opacity: 0.78, visible: "lg", blend: "screen" },
  { id: "mid-ur-gem", kind: "gem", angle: -48, radius: 1.04, size: 38, depth: "mid", rotate: 24, duration: 10.5, delay: 0.3, bob: 12, opacity: 0.84, visible: "always", blend: "screen" },
  { id: "mid-ur-crown", kind: "crown", angle: -20, radius: 1.1, size: 68, depth: "mid", rotate: 6, duration: 15, delay: 0.15, bob: 11, opacity: 0.92, visible: "always", blend: "screen" },
  { id: "mid-ur-coin", kind: "coin", angle: 8, radius: 1.05, size: 38, depth: "mid", rotate: 28, duration: 12.5, delay: 0.9, bob: 10, opacity: 0.84, visible: "sm", blend: "screen" },

  { id: "mid-r-trophy", kind: "trophy", angle: 30, radius: 1.08, size: 72, depth: "mid", rotate: 8, duration: 14, delay: 0.5, bob: 14, opacity: 0.9, visible: "always", blend: "screen" },
  { id: "mid-r-gem", kind: "gem", angle: 50, radius: 1.0, size: 32, depth: "mid", rotate: -20, duration: 11, delay: 1.5, bob: 11, opacity: 0.78, visible: "md", blend: "screen" },
  { id: "mid-r-coin", kind: "coin", angle: 64, radius: 1.1, size: 36, depth: "mid", rotate: -36, duration: 13.5, delay: 1.0, bob: 10, opacity: 0.8, visible: "sm", blend: "screen" },
  { id: "mid-br-crystal", kind: "crystal", angle: 80, radius: 1.04, size: 30, depth: "mid", rotate: 6, duration: 12, delay: 2.0, bob: 8, opacity: 0.72, visible: "lg", blend: "screen" },

  { id: "mid-l-gem", kind: "gem", angle: -170, radius: 1.08, size: 52, depth: "mid", rotate: -18, duration: 13, delay: 0.6, bob: 13, opacity: 0.86, visible: "sm", blend: "screen" },
  { id: "mid-l-crown", kind: "crown", angle: 170, radius: 1.04, size: 52, depth: "mid", rotate: -10, duration: 16, delay: 1.3, bob: 11, opacity: 0.86, visible: "md", blend: "screen" },
  { id: "mid-l-ring", kind: "ring", angle: 150, radius: 1.08, size: 44, depth: "mid", rotate: 18, duration: 11, delay: 0.2, bob: 12, opacity: 0.86, visible: "always", blend: "screen" },
  { id: "mid-bl-coin", kind: "coin", angle: 130, radius: 1.02, size: 42, depth: "mid", rotate: 44, duration: 14.5, delay: 1.7, bob: 10, opacity: 0.8, visible: "sm", blend: "screen" },
  { id: "mid-bl-trophy", kind: "trophy", angle: 112, radius: 1.08, size: 40, depth: "mid", rotate: -6, duration: 12, delay: 2.4, bob: 10, opacity: 0.78, visible: "md", blend: "screen" },

  { id: "mid-extra-1", kind: "crystal", angle: -160, radius: 1.14, size: 26, depth: "mid", rotate: -24, duration: 10, delay: 2.1, bob: 9, opacity: 0.68, visible: "lg", blend: "screen" },
  { id: "mid-extra-2", kind: "coin", angle: 40, radius: 1.16, size: 28, depth: "mid", rotate: 50, duration: 15, delay: 0.75, bob: 8, opacity: 0.7, visible: "lg", blend: "screen" },
  { id: "mid-extra-3", kind: "gem", angle: -35, radius: 1.2, size: 24, depth: "mid", rotate: 14, duration: 13, delay: 1.9, bob: 7, opacity: 0.66, visible: "lg", blend: "screen" },

  /* —— FOREGROUND —— */
  { id: "fg-bl-crystal", kind: "crystal", angle: 138, radius: 1.28, size: 100, depth: "fg", rotate: -28, duration: 16, delay: 0.25, bob: 11, opacity: 0.8, visible: "sm", blend: "screen" },
  { id: "fg-br-coin", kind: "coin", angle: 52, radius: 1.32, size: 108, depth: "fg", rotate: 36, duration: 17, delay: 0.5, bob: 10, opacity: 0.76, visible: "sm", blend: "screen" },
  { id: "fg-r-crown", kind: "crown", angle: 10, radius: 1.24, size: 84, depth: "fg", rotate: 10, duration: 15.5, delay: 0.35, bob: 9, opacity: 0.8, visible: "md", blend: "screen" },
  { id: "fg-l-trophy", kind: "trophy", angle: -158, radius: 1.28, size: 96, depth: "fg", rotate: -12, duration: 14, delay: 0.9, bob: 10, opacity: 0.78, visible: "sm", blend: "screen" },
];

export const PARALLAX_BY_DEPTH: Record<JewelDepth, number> = {
  bg: 4,
  mid: 10,
  fg: 20,
};

/** Ellipse matching HeroCanvas orbit (including tilt) */
export const ORBIT_GEOMETRY = {
  cx: 50,
  cy: 30,
  rx: 42,
  ry: 22.5,
  /** radians — matches HeroCanvas orbit.rot */
  rot: -0.3,
} as const;
