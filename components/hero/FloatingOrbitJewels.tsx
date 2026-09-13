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
  const target = useRef<Offset>({ x: 0, y: 0 });
  const current = useRef<Offset>({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
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
      setOffset({ x: 0, y: 0 });
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
      if (Math.abs(c.x - t.x) > 0.0004 || Math.abs(c.y - t.y) > 0.0004) {
        setOffset({ x: c.x, y: c.y });
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, desktop]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(100svh,52rem)] overflow-hidden"
      aria-hidden
      style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
    >
      <div className="absolute left-[10%] top-[18%] h-36 w-36 rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute right-[8%] top-[24%] h-40 w-40 rounded-full bg-primary/[0.035] blur-3xl" />
      <div className="absolute bottom-[12%] left-[20%] h-32 w-56 -translate-x-1/2 rounded-full bg-primary/[0.03] blur-3xl" />

      {ORBIT_JEWELS.map((jewel) => {
        const strength = PARALLAX_BY_DEPTH[jewel.depth];
        return (
          <OrbitJewel
            key={jewel.id}
            config={jewel}
            parallaxX={offset.x * strength}
            parallaxY={offset.y * strength * 0.85}
            reduceMotion={!mounted || !!reduce}
          />
        );
      })}
    </div>
  );
}
