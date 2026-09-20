"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HERO_MASCOT_H, HERO_MASCOT_SRC, HERO_MASCOT_W } from "../../lib/hero-assets";

type HeroMascotProps = {
  className?: string;
  /** Parallax strength in px (desktop). */
  parallax?: number;
};

/**
 * Premium 3D-feeling mascot: slow float + subtle mouse parallax.
 * Parallax on outer layer; float on inner — avoids transform conflicts.
 * Respects prefers-reduced-motion.
 */
export function HeroMascot({ className, parallax = 20 }: HeroMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || parallax <= 0) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      tx = nx * parallax;
      ty = ny * (parallax * 0.55);
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", `${cx.toFixed(2)}px`);
      el.style.setProperty("--my", `${cy.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [parallax, reduced]);

  return (
    <div
      ref={rootRef}
      className={["hero-mascot relative", className].filter(Boolean).join(" ")}
      style={
        {
          "--mx": "0px",
          "--my": "0px",
        } as CSSProperties
      }
      aria-hidden
    >
      <div className="hero-mascot__bloom pointer-events-none absolute left-1/2 top-[42%] h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_68%)] blur-2xl" />
      <div className="hero-mascot__rim pointer-events-none absolute inset-[8%] rounded-[40%] bg-[radial-gradient(circle_at_60%_30%,rgba(192,132,252,0.12),transparent_55%)]" />

      {/* Parallax layer */}
      <div
        className="relative will-change-transform"
        style={{
          transform: reduced ? undefined : "translate3d(var(--mx), var(--my), 0)",
        }}
      >
        {/* Float layer */}
        <div className={reduced ? "relative" : "hero-mascot__float relative"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_MASCOT_SRC}
            alt=""
            width={HERO_MASCOT_W}
            height={HERO_MASCOT_H}
            decoding="async"
            loading="eager"
            fetchPriority="auto"
            className="relative z-[1] mx-auto h-auto w-full max-w-[min(88vw,420px)] object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.75),0_0_40px_rgba(168,85,247,0.22)] lg:max-w-[min(42vw,520px)]"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute inset-x-[18%] bottom-[2%] h-6 rounded-[100%] bg-[radial-gradient(ellipse,rgba(168,85,247,0.22),transparent_70%)] blur-md"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
