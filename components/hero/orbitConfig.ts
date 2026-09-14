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
    blend: "screen",
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
    blend: "screen",
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
    blend: "screen",
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
    blend: "screen",
  },

  // ── Gemstone cluster (7) — fill orbit gaps ───────────────────────
  {
    id: "gem-ur",
    kind: "gem",
    angle: -48,
    radius: 0.82,
    size: 52,
    depth: "mid",
    rotate: 22,
    duration: 11,
    delay: 0.4,
    bob: 9,
    opacity: 0.88,
    visible: "always",
    blend: "screen",
  },
  {
    id: "gem-top",
    kind: "crystal",
    angle: -88,
    radius: 0.78,
    size: 44,
    depth: "mid",
    rotate: -16,
    duration: 12.5,
    delay: 0.55,
    bob: 8,
    opacity: 0.82,
    visible: "always",
    blend: "screen",
  },
  {
    id: "gem-ul",
    kind: "gem",
    angle: -118,
    radius: 0.84,
    size: 48,
    depth: "mid",
    rotate: 14,
    duration: 10.5,
    delay: 0.2,
    bob: 10,
    opacity: 0.86,
    visible: "sm",
    blend: "screen",
  },
  {
    id: "gem-bl",
    kind: "crystal",
    angle: 128,
    radius: 0.98,
    size: 56,
    depth: "fg",
    rotate: -24,
    duration: 15,
    delay: 0.45,
    bob: 9,
    opacity: 0.78,
    visible: "sm",
    blend: "screen",
  },
  {
    id: "gem-br",
    kind: "gem",
    angle: 68,
    radius: 1.02,
    size: 50,
    depth: "fg",
    rotate: 18,
    duration: 13.5,
    delay: 0.6,
    bob: 8,
    opacity: 0.8,
    visible: "sm",
    blend: "screen",
  },
  {
    id: "gem-ll",
    kind: "gem",
    angle: -178,
    radius: 0.92,
    size: 40,
    depth: "mid",
    rotate: -8,
    duration: 11.5,
    delay: 0.7,
    bob: 9,
    opacity: 0.84,
    visible: "md",
    blend: "screen",
  },
  {
    id: "gem-spark",
    kind: "crystal",
    angle: 8,
    radius: 0.76,
    size: 36,
    depth: "bg",
    rotate: 28,
    duration: 16,
    delay: 0.9,
    bob: 7,
    opacity: 0.62,
    visible: "md",
    blend: "screen",
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
