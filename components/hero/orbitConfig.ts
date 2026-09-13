export type JewelDepth = "bg" | "mid" | "fg";
export type JewelVisibility = "always" | "sm" | "md" | "lg";
export type JewelKind = "coin" | "gem" | "crown" | "ring" | "crystal" | "trophy";
export type JewelBlend = "normal" | "screen";

export type OrbitJewelConfig = {
  id: string;
  kind: JewelKind;
  angle: number;
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

/** Optimized hero jewels — ~160px WebP. */
export const JEWEL_SRC: Record<JewelKind, string> = {
  coin: "/images/hero/jewels/1.webp",
  gem: "/images/hero/jewels/2.webp",
  crown: "/images/hero/jewels/3.webp",
  ring: "/images/hero/jewels/4.webp",
  crystal: "/images/hero/jewels/5.webp",
  trophy: "/images/hero/jewels/6.webp",
};

/**
 * Lean treasure field — fewer simultaneous image requests.
 * Mobile shows only the strongest marks; desktop fills the orbit.
 */
export const ORBIT_JEWELS: OrbitJewelConfig[] = [
  { id: "mid-ur-crown", kind: "crown", angle: -14, radius: 0.9, size: 54, depth: "mid", rotate: 4, duration: 15, delay: 0.1, bob: 9, opacity: 0.92, visible: "always", blend: "screen" },
  { id: "mid-l-ring", kind: "ring", angle: 152, radius: 0.9, size: 36, depth: "mid", rotate: 14, duration: 11, delay: 0.2, bob: 10, opacity: 0.86, visible: "always", blend: "screen" },
  { id: "mid-ul-coin", kind: "coin", angle: -138, radius: 0.88, size: 44, depth: "mid", rotate: -24, duration: 13, delay: 0, bob: 10, opacity: 0.88, visible: "sm", blend: "screen" },
  { id: "mid-r-trophy", kind: "trophy", angle: 28, radius: 0.92, size: 56, depth: "mid", rotate: 6, duration: 14, delay: 0.4, bob: 11, opacity: 0.9, visible: "sm", blend: "screen" },
  { id: "mid-ur-gem", kind: "gem", angle: -42, radius: 0.86, size: 32, depth: "mid", rotate: 20, duration: 10.5, delay: 0.3, bob: 10, opacity: 0.84, visible: "sm", blend: "screen" },
  { id: "mid-l-gem", kind: "gem", angle: -168, radius: 0.9, size: 40, depth: "mid", rotate: -14, duration: 13, delay: 0.5, bob: 11, opacity: 0.84, visible: "md", blend: "screen" },
  { id: "mid-l-crown", kind: "crown", angle: 172, radius: 0.86, size: 44, depth: "mid", rotate: -8, duration: 16, delay: 1.0, bob: 9, opacity: 0.86, visible: "md", blend: "screen" },
  { id: "mid-top-crystal", kind: "crystal", angle: -92, radius: 0.9, size: 28, depth: "mid", rotate: -10, duration: 12, delay: 0.7, bob: 9, opacity: 0.72, visible: "md", blend: "screen" },
  { id: "fg-bl-crystal", kind: "crystal", angle: 135, radius: 1.06, size: 72, depth: "fg", rotate: -22, duration: 16, delay: 0.2, bob: 8, opacity: 0.72, visible: "md", blend: "screen" },
  { id: "fg-br-coin", kind: "coin", angle: 55, radius: 1.08, size: 76, depth: "fg", rotate: 28, duration: 17, delay: 0.45, bob: 8, opacity: 0.7, visible: "lg", blend: "screen" },
  { id: "bg-1", kind: "crystal", angle: -32, radius: 0.98, size: 20, depth: "bg", rotate: -18, duration: 16, delay: 0.2, bob: 6, opacity: 0.34, visible: "lg", blend: "screen" },
  { id: "bg-4", kind: "ring", angle: 205, radius: 1.0, size: 18, depth: "bg", rotate: 40, duration: 17, delay: 1.4, bob: 6, opacity: 0.32, visible: "lg", blend: "screen" },
];

export const PARALLAX_BY_DEPTH: Record<JewelDepth, number> = {
  bg: 3,
  mid: 8,
  fg: 14,
};

export const ORBIT_GEOMETRY = {
  cx: 50,
  cy: 30,
  rx: 34,
  ry: 17.5,
  rot: -0.3,
} as const;
