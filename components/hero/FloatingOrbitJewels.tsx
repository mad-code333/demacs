"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { OrbitJewel } from "./OrbitJewel";
import { ORBIT_JEWELS, PARALLAX_BY_DEPTH } from "./orbitConfig";

type Offset = { x: number; y: number };

/** Premium treasure field arranged along the hero elliptical orbit. */
export function FloatingOrbitJewels() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({
    bg: null,
    mid: null,
    fg: null,
  });
  const target = useRef<Offset>({ x: 0, y: 0 });
  const current = useRef<Offset>({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [desktop, setDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || !desktop) {
      target.current = { x: 0, y: 0 };
      current.current = { x: 0, y: 0 };
      (["bg", "mid", "fg"] as const).forEach((depth) => {
        const el = layerRefs.current[depth];
        if (el) el.style.transform = "translate3d(0px, 0px, 0px)";
      });
      return;
    }

    const onMove = (event: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      target.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.055;
      c.y += (t.y - c.y) * 0.055;
      (["bg", "mid", "fg"] as const).forEach((depth) => {
        const el = layerRefs.current[depth];
        if (!el) return;
        const strength = PARALLAX_BY_DEPTH[depth];
        el.style.transform = `translate3d(${(c.x * strength).toFixed(2)}px, ${(c.y * strength * 0.85).toFixed(2)}px, 0px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, desktop]);

  const byDepth = {
    bg: ORBIT_JEWELS.filter((j) => j.depth === "bg"),
    mid: ORBIT_JEWELS.filter((j) => j.depth === "mid"),
    fg: ORBIT_JEWELS.filter((j) => j.depth === "fg"),
  } as const;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(100svh,52rem)] overflow-hidden"
      aria-hidden
      style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
    >
      <div className="absolute left-[10%] top-[18%] h-36 w-36 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute right-[8%] top-[24%] h-40 w-40 rounded-full bg-primary/[0.025] blur-3xl" />
      <div className="absolute bottom-[12%] left-[20%] h-32 w-56 -translate-x-1/2 rounded-full bg-primary/[0.02] blur-3xl" />

      {(["bg", "mid", "fg"] as const).map((depth) => (
        <div
          key={depth}
          ref={(el) => {
            layerRefs.current[depth] = el;
          }}
          className="absolute inset-0 will-change-transform"
        >
          {byDepth[depth].map((jewel) => (
            <OrbitJewel
              key={jewel.id}
              config={jewel}
              parallaxX={0}
              parallaxY={0}
              reduceMotion={!mounted || !!reduce}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
