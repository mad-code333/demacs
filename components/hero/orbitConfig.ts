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
  // ── Primary anchors ──────────────────────────────────────────────
  {
    id: "hero-crown",
    kind: "crown",
    angle: -18,
    radius: 0.88,
    size: 108,
    depth: "mid",
    rotate: 6,
    duration: 15,
    delay: 0.1,
    bob: 11,
    opacity: 0.96,
    visible: "always",
    blend: "normal",
  },
  {
    id: "hero-trophy",
    kind: "trophy",
    angle: 34,
    radius: 0.94,
    size: 100,
    depth: "mid",
    rotate: 8,
    duration: 14,
    delay: 0.25,
    bob: 12,
    opacity: 0.94,
    visible: "always",
    blend: "normal",
  },
  {
    id: "hero-coin",
    kind: "coin",
    angle: -148,
    radius: 0.9,
    size: 92,
    depth: "mid",
    rotate: -18,
    duration: 13,
    delay: 0,
    bob: 11,
    opacity: 0.93,
    visible: "always",
    blend: "normal",
  },
  {
    id: "hero-gem-main",
    kind: "gem",
    angle: 168,
    radius: 0.86,
    size: 78,
    depth: "mid",
    rotate: -12,
    duration: 12,
    delay: 0.35,
    bob: 10,
    opacity: 0.9,
    visible: "always",
    blend: "normal",
  },

  // ── Sparse orbit gems (kept away from wordmark flanks) ───────────
  {
    id: "gem-top",
    kind: "crystal",
    angle: -90,
    radius: 0.95,
    size: 48,
    depth: "mid",
    rotate: -16,
    duration: 12.5,
    delay: 0.55,
    bob: 8,
    opacity: 0.78,
    visible: "always",
    blend: "normal",
  },
  {
    id: "gem-br",
    kind: "gem",
    angle: 78,
    radius: 1.08,
    size: 46,
    depth: "fg",
    rotate: 18,
    duration: 13.5,
    delay: 0.6,
    bob: 8,
    opacity: 0.74,
    visible: "sm",
    blend: "normal",
  },
  {
    id: "gem-bl",
    kind: "crystal",
    angle: 145,
    radius: 1.05,
    size: 44,
    depth: "fg",
    rotate: -20,
    duration: 15,
    delay: 0.45,
    bob: 9,
    opacity: 0.72,
    visible: "md",
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
