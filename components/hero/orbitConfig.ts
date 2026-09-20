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

/** Optimized hero jewels — gold/black DEMACS grade (~160px WebP). */
export const JEWEL_SRC: Record<JewelKind, string> = {
  coin: "/images/hero/jewels/1.webp?v=gold1",
  gem: "/images/hero/jewels/2.webp?v=gold1",
  crown: "/images/hero/jewels/3.webp?v=gold1",
  ring: "/images/hero/jewels/4.webp?v=gold1",
  crystal: "/images/hero/jewels/5.webp?v=gold1",
  trophy: "/images/hero/jewels/6.webp?v=gold1",
};

/**
 * Hero orbit: 4 large anchors + 7 gemstones nested in the gaps.
 * Angles are spaced so nothing stacks on the wordmark.
 */
export const ORBIT_JEWELS: OrbitJewelConfig[] = [
  // Orbit anchors kept away from wordmark flanks (crown left / coin right).
  {
    id: "hero-trophy",
    kind: "trophy",
    angle: -55,
    radius: 1.12,
    size: 72,
    depth: "bg",
    rotate: 8,
    duration: 14,
    delay: 0.25,
    bob: 10,
    opacity: 0.72,
    visible: "md",
    blend: "normal",
  },
  {
    id: "hero-gem-main",
    kind: "gem",
    angle: 55,
    radius: 1.14,
    size: 58,
    depth: "bg",
    rotate: -12,
    duration: 12,
    delay: 0.35,
    bob: 9,
    opacity: 0.7,
    visible: "md",
    blend: "normal",
  },
  {
    id: "gem-top",
    kind: "crystal",
    angle: -95,
    radius: 1.08,
    size: 42,
    depth: "bg",
    rotate: -16,
    duration: 12.5,
    delay: 0.55,
    bob: 8,
    opacity: 0.65,
    visible: "lg",
    blend: "normal",
  },
  {
    id: "gem-br",
    kind: "gem",
    angle: 125,
    radius: 1.16,
    size: 40,
    depth: "bg",
    rotate: 18,
    duration: 13.5,
    delay: 0.6,
    bob: 8,
    opacity: 0.62,
    visible: "lg",
    blend: "normal",
  },
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
