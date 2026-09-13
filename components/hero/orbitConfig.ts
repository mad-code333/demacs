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

/** Optimized hero jewels — 256px WebP (see /public/images/hero/jewels). */
export const JEWEL_SRC: Record<JewelKind, string> = {
  coin: "/images/hero/jewels/1.webp",
  gem: "/images/hero/jewels/2.webp",
  crown: "/images/hero/jewels/3.webp",
  ring: "/images/hero/jewels/4.webp",
  crystal: "/images/hero/jewels/5.webp",
  trophy: "/images/hero/jewels/6.webp",
};

/**
 * Jewels clustered tightly around the DEMACS wordmark.
 * Radii sit near / just outside a compact ellipse so crowns & gems hug the letters.
 * Black-backed PNGs use screen blend.
 */
export const ORBIT_JEWELS: OrbitJewelConfig[] = [
  /* —— BACKGROUND (soft depth, still near the mark) —— */
  { id: "bg-1", kind: "crystal", angle: -32, radius: 0.98, size: 22, depth: "bg", rotate: -18, duration: 16, delay: 0.2, bob: 7, opacity: 0.38, visible: "md", blend: "screen" },
  { id: "bg-2", kind: "gem", angle: 22, radius: 1.0, size: 18, depth: "bg", rotate: 22, duration: 18, delay: 1.1, bob: 6, opacity: 0.34, visible: "lg", blend: "screen" },
  { id: "bg-3", kind: "coin", angle: 158, radius: 0.96, size: 18, depth: "bg", rotate: -8, duration: 15, delay: 0.7, bob: 6, opacity: 0.32, visible: "lg", blend: "screen" },
  { id: "bg-4", kind: "ring", angle: 205, radius: 1.0, size: 20, depth: "bg", rotate: 40, duration: 17, delay: 1.8, bob: 6, opacity: 0.36, visible: "md", blend: "screen" },
  { id: "bg-5", kind: "crystal", angle: 98, radius: 1.02, size: 16, depth: "bg", rotate: 12, duration: 14, delay: 2.2, bob: 5, opacity: 0.3, visible: "lg", blend: "screen" },

  /* —— MIDGROUND — hug the wordmark —— */
  /* Upper-left of D */
  { id: "mid-ul-coin", kind: "coin", angle: -138, radius: 0.88, size: 48, depth: "mid", rotate: -24, duration: 13, delay: 0, bob: 10, opacity: 0.9, visible: "sm", blend: "screen" },
  { id: "mid-ul-gem", kind: "gem", angle: -112, radius: 0.84, size: 36, depth: "mid", rotate: 14, duration: 11.5, delay: 0.4, bob: 10, opacity: 0.84, visible: "sm", blend: "screen" },
  { id: "mid-top-crystal", kind: "crystal", angle: -92, radius: 0.9, size: 30, depth: "mid", rotate: -10, duration: 12, delay: 0.8, bob: 9, opacity: 0.76, visible: "md", blend: "screen" },
  { id: "mid-top-ring", kind: "ring", angle: -68, radius: 0.82, size: 32, depth: "mid", rotate: 8, duration: 14, delay: 1.2, bob: 8, opacity: 0.8, visible: "lg", blend: "screen" },

  /* Upper-right around S / end of mark */
  { id: "mid-ur-gem", kind: "gem", angle: -42, radius: 0.86, size: 34, depth: "mid", rotate: 20, duration: 10.5, delay: 0.3, bob: 10, opacity: 0.86, visible: "sm", blend: "screen" },
  { id: "mid-ur-crown", kind: "crown", angle: -14, radius: 0.9, size: 58, depth: "mid", rotate: 4, duration: 15, delay: 0.15, bob: 9, opacity: 0.94, visible: "always", blend: "screen" },
  { id: "mid-ur-coin", kind: "coin", angle: 10, radius: 0.86, size: 34, depth: "mid", rotate: 22, duration: 12.5, delay: 0.9, bob: 9, opacity: 0.86, visible: "sm", blend: "screen" },

  /* Right flank — trophy close to letters */
  { id: "mid-r-trophy", kind: "trophy", angle: 28, radius: 0.92, size: 62, depth: "mid", rotate: 6, duration: 14, delay: 0.5, bob: 11, opacity: 0.92, visible: "sm", blend: "screen" },
  { id: "mid-r-gem", kind: "gem", angle: 48, radius: 0.84, size: 28, depth: "mid", rotate: -16, duration: 11, delay: 1.5, bob: 9, opacity: 0.8, visible: "md", blend: "screen" },
  { id: "mid-r-coin", kind: "coin", angle: 62, radius: 0.92, size: 30, depth: "mid", rotate: -30, duration: 13.5, delay: 1.0, bob: 8, opacity: 0.8, visible: "sm", blend: "screen" },
  { id: "mid-br-crystal", kind: "crystal", angle: 78, radius: 0.88, size: 26, depth: "mid", rotate: 6, duration: 12, delay: 2.0, bob: 7, opacity: 0.74, visible: "lg", blend: "screen" },

  /* Left flank — crown beside D */
  { id: "mid-l-gem", kind: "gem", angle: -168, radius: 0.9, size: 44, depth: "mid", rotate: -14, duration: 13, delay: 0.6, bob: 11, opacity: 0.88, visible: "sm", blend: "screen" },
  { id: "mid-l-crown", kind: "crown", angle: 172, radius: 0.86, size: 48, depth: "mid", rotate: -8, duration: 16, delay: 1.3, bob: 9, opacity: 0.9, visible: "md", blend: "screen" },
  { id: "mid-l-ring", kind: "ring", angle: 152, radius: 0.9, size: 38, depth: "mid", rotate: 14, duration: 11, delay: 0.2, bob: 10, opacity: 0.88, visible: "always", blend: "screen" },
  { id: "mid-bl-coin", kind: "coin", angle: 128, radius: 0.86, size: 36, depth: "mid", rotate: 36, duration: 14.5, delay: 1.7, bob: 9, opacity: 0.82, visible: "sm", blend: "screen" },
  { id: "mid-bl-trophy", kind: "trophy", angle: 108, radius: 0.9, size: 34, depth: "mid", rotate: -4, duration: 12, delay: 2.4, bob: 8, opacity: 0.8, visible: "md", blend: "screen" },

  /* Small accents just off the path */
  { id: "mid-extra-1", kind: "crystal", angle: -155, radius: 0.98, size: 22, depth: "mid", rotate: -20, duration: 10, delay: 2.1, bob: 7, opacity: 0.7, visible: "lg", blend: "screen" },
  { id: "mid-extra-2", kind: "coin", angle: 38, radius: 1.0, size: 24, depth: "mid", rotate: 42, duration: 15, delay: 0.75, bob: 7, opacity: 0.72, visible: "lg", blend: "screen" },
  { id: "mid-extra-3", kind: "gem", angle: -28, radius: 1.02, size: 20, depth: "mid", rotate: 12, duration: 13, delay: 1.9, bob: 6, opacity: 0.68, visible: "lg", blend: "screen" },

  /* —— FOREGROUND — pulled in from the corners —— */
  { id: "fg-bl-crystal", kind: "crystal", angle: 135, radius: 1.08, size: 88, depth: "fg", rotate: -22, duration: 16, delay: 0.25, bob: 9, opacity: 0.78, visible: "sm", blend: "screen" },
  { id: "fg-br-coin", kind: "coin", angle: 55, radius: 1.1, size: 92, depth: "fg", rotate: 28, duration: 17, delay: 0.5, bob: 8, opacity: 0.74, visible: "sm", blend: "screen" },
  { id: "fg-r-crown", kind: "crown", angle: 8, radius: 1.04, size: 72, depth: "fg", rotate: 8, duration: 15.5, delay: 0.35, bob: 8, opacity: 0.78, visible: "md", blend: "screen" },
  { id: "fg-l-trophy", kind: "trophy", angle: -155, radius: 1.06, size: 80, depth: "fg", rotate: -10, duration: 14, delay: 0.9, bob: 8, opacity: 0.76, visible: "sm", blend: "screen" },
];

export const PARALLAX_BY_DEPTH: Record<JewelDepth, number> = {
  bg: 3,
  mid: 8,
  fg: 16,
};

/** Compact ellipse hugging the DEMACS logo (matches HeroCanvas orbit) */
export const ORBIT_GEOMETRY = {
  cx: 50,
  cy: 30,
  rx: 34,
  ry: 17.5,
  /** radians — matches HeroCanvas orbit.rot */
  rot: -0.3,
} as const;
