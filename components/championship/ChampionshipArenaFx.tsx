"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Speck = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
};

/**
 * Sparse emerald particles for the championship arena.
 * Pauses when off-screen / tab hidden; respects reduced motion.
 */
export function ChampionshipArenaFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let raf = 0;
    let running = true;
    let visible = true;
    let specks: Speck[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 18 : w < 1024 ? 28 : 36;
      specks = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        a: 0.12 + Math.random() * 0.28,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.04 - Math.random() * 0.1,
      }));
    };

    const draw = () => {
      if (!running) return;
      raf = window.requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of specks) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }
        if (s.x < -4) s.x = w + 4;
        if (s.x > w + 4) s.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(168,85,247,${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(parent);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="champ-arena__rays" />
      <div className="champ-arena__haze" />
      <div className="champ-arena__floor" />
      <div className="champ-crystal champ-crystal--left">
        <span className="champ-crystal__vein" />
      </div>
      <div className="champ-crystal champ-crystal--right">
        <span className="champ-crystal__vein" />
      </div>
      {!reduceMotion ? (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      ) : null}
    </div>
  );
}
