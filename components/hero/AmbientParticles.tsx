"use client";

import { useReducedMotion } from "framer-motion";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  tier: "always" | "sm" | "lg";
};

const PARTICLES: Particle[] = [
  { id: 0, left: "8%", top: "16%", size: 2, delay: 0, duration: 11, opacity: 0.35, tier: "always" },
  { id: 1, left: "14%", top: "30%", size: 1.5, delay: 0.8, duration: 13, opacity: 0.28, tier: "always" },
  { id: 2, left: "22%", top: "12%", size: 2.5, delay: 1.4, duration: 10, opacity: 0.4, tier: "always" },
  { id: 3, left: "6%", top: "52%", size: 2, delay: 0.4, duration: 12, opacity: 0.3, tier: "always" },
  { id: 4, left: "18%", top: "68%", size: 1.5, delay: 1.8, duration: 15, opacity: 0.25, tier: "always" },
  { id: 5, left: "82%", top: "24%", size: 1.5, delay: 1.2, duration: 14, opacity: 0.32, tier: "always" },
  { id: 6, left: "90%", top: "36%", size: 2.5, delay: 0.3, duration: 10, opacity: 0.42, tier: "always" },
  { id: 7, left: "94%", top: "58%", size: 2, delay: 1.5, duration: 11, opacity: 0.3, tier: "always" },
  { id: 8, left: "86%", top: "70%", size: 1.5, delay: 2.8, duration: 15, opacity: 0.24, tier: "always" },
  { id: 9, left: "12%", top: "78%", size: 2, delay: 1.7, duration: 14, opacity: 0.28, tier: "always" },
  { id: 10, left: "4%", top: "28%", size: 1.5, delay: 3.1, duration: 12, opacity: 0.26, tier: "always" },
  { id: 11, left: "96%", top: "46%", size: 2, delay: 1.1, duration: 11, opacity: 0.34, tier: "always" },
  { id: 12, left: "10%", top: "42%", size: 2.5, delay: 0.7, duration: 10, opacity: 0.36, tier: "always" },
  { id: 13, left: "88%", top: "16%", size: 2, delay: 1.9, duration: 12, opacity: 0.32, tier: "always" },
  { id: 14, left: "76%", top: "8%", size: 1.5, delay: 2.4, duration: 14, opacity: 0.28, tier: "sm" },
  { id: 15, left: "28%", top: "46%", size: 1.5, delay: 2.1, duration: 14, opacity: 0.2, tier: "sm" },
  { id: 16, left: "72%", top: "48%", size: 2, delay: 0.6, duration: 12, opacity: 0.22, tier: "sm" },
  { id: 17, left: "34%", top: "72%", size: 1.5, delay: 2.6, duration: 11, opacity: 0.2, tier: "sm" },
  { id: 18, left: "64%", top: "64%", size: 2, delay: 0.9, duration: 13, opacity: 0.2, tier: "sm" },
  { id: 19, left: "42%", top: "8%", size: 1.5, delay: 2.3, duration: 16, opacity: 0.16, tier: "lg" },
  { id: 20, left: "58%", top: "78%", size: 2, delay: 0.2, duration: 13, opacity: 0.18, tier: "lg" },
  { id: 21, left: "48%", top: "58%", size: 1.5, delay: 1.3, duration: 14, opacity: 0.14, tier: "lg" },
  { id: 22, left: "38%", top: "22%", size: 1.5, delay: 3.4, duration: 16, opacity: 0.14, tier: "lg" },
  { id: 23, left: "68%", top: "34%", size: 2, delay: 2.9, duration: 12, opacity: 0.18, tier: "lg" },
  { id: 24, left: "24%", top: "58%", size: 1.5, delay: 1.6, duration: 15, opacity: 0.2, tier: "sm" },
  { id: 25, left: "78%", top: "62%", size: 1.5, delay: 0.5, duration: 11, opacity: 0.22, tier: "sm" },
  { id: 26, left: "16%", top: "20%", size: 2, delay: 2.0, duration: 13, opacity: 0.28, tier: "always" },
  { id: 27, left: "84%", top: "80%", size: 2, delay: 0.8, duration: 12, opacity: 0.26, tier: "always" },
  { id: 28, left: "52%", top: "14%", size: 1.5, delay: 1.4, duration: 15, opacity: 0.15, tier: "lg" },
  { id: 29, left: "30%", top: "36%", size: 1.5, delay: 2.7, duration: 14, opacity: 0.16, tier: "lg" },
  { id: 30, left: "70%", top: "20%", size: 2, delay: 0.35, duration: 12, opacity: 0.24, tier: "sm" },
  { id: 31, left: "2%", top: "70%", size: 1.5, delay: 2.5, duration: 14, opacity: 0.24, tier: "always" },
  { id: 32, left: "92%", top: "72%", size: 2.5, delay: 1.0, duration: 10, opacity: 0.36, tier: "always" },
  { id: 33, left: "46%", top: "42%", size: 1.5, delay: 3.0, duration: 16, opacity: 0.12, tier: "lg" },
  { id: 34, left: "60%", top: "52%", size: 1.5, delay: 1.75, duration: 13, opacity: 0.14, tier: "lg" },
];

const TIER: Record<Particle["tier"], string> = {
  always: "block",
  sm: "hidden sm:block",
  lg: "hidden lg:block",
};

export function AmbientParticles() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(100svh,52rem)] overflow-hidden"
      aria-hidden
    >
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={[
            "orbit-particle absolute rounded-full bg-primary",
            reduce ? "" : "orbit-particle--live",
            TIER[p.tier],
          ].join(" ")}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 4}px rgba(168,85,247,0.45)`,
            ["--p-dur" as string]: `${p.duration}s`,
            ["--p-delay" as string]: `${p.delay}s`,
            ["--p-opacity" as string]: String(p.opacity),
          }}
        />
      ))}
    </div>
  );
}
