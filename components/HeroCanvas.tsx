"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
  gold: boolean;
};

function seedParticles(width: number, height: number, mobile: boolean): Particle[] {
  const count = mobile ? 10 : 22;
  const out: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    const z = 0.18 + Math.random() * 0.82;
    out.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      r: 0.4 + z * (Math.random() > 0.9 ? 1.2 : 0.65),
      a: 0.035 + z * 0.09,
      vx: (Math.random() - 0.5) * 0.01,
      vy: -0.003 - Math.random() * 0.008,
      gold: Math.random() > 0.92,
    });
  }
  return out;
}

/** Hero ambient particles. Jewels live in OrbitJewels. */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let cancelled = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let mobile = false;
    let raf = 0;
    let last = performance.now();
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let visible = true;
    let particles: Particle[] = [];

    const inClearZone = (x: number, y: number) => {
      const dx = (x - width * 0.5) / (width * 0.32);
      const dy = (y - height * 0.3) / (height * 0.15);
      return dx * dx + dy * dy < 1;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      mobile = window.matchMedia("(max-width: 768px)").matches;
      dpr = Math.min(window.devicePixelRatio ?? 1, mobile ? 1.25 : 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      particles = seedParticles(width, height, mobile);
    };

    const onPointer = (event: PointerEvent) => {
      if (mobile || reduceMotion) return;
      const rect = parent.getBoundingClientRect();
      tx = (event.clientX - rect.left) / rect.width - 0.5;
      ty = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const drawParticles = (px: number, py: number, animate: boolean, dt: number) => {
      for (const p of particles) {
        if (animate) {
          p.x += (p.vx + mx * 0.003 * p.z) * dt * 0.045;
          p.y += p.vy * dt * 0.045;
          if (p.y < -8) p.y = height + 8;
          if (p.y > height + 8) p.y = -8;
          if (p.x < -8) p.x = width + 8;
          if (p.x > width + 8) p.x = -8;
        }
        const x = p.x + px * p.z;
        const y = p.y + py * p.z;
        if (inClearZone(x, y)) continue;
        const rgb = p.gold ? "192,132,252" : "168,85,247";
        if (p.r > 1.2) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
          g.addColorStop(0, `rgba(${rgb},${p.a * 0.5})`);
          g.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, p.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${rgb},${p.a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const paint = (animate: boolean, dt: number) => {
      if (animate) {
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
      }
      const px = mx * (mobile ? 3 : 8);
      const py = my * (mobile ? 2 : 6);

      ctx.clearRect(0, 0, width, height);
      drawParticles(px, py, animate, dt);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(32, now - last);
      last = now;
      const active = visible && !document.hidden && !reduceMotion;
      if (active) {
        paint(true, dt);
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const resume = () => {
      if (cancelled || reduceMotion || raf) return;
      if (!visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) resume();
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (!document.hidden) resume();
    };

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }

    paint(false, 0);
    if (reduceMotion) {
      return () => {
        cancelled = true;
        ro.disconnect();
        io.disconnect();
      };
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden
    />
  );
}
