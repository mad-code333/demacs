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

type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  a: number;
  phase: number;
  speed: number;
};

function seedParticles(w: number, h: number, count: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    const z = 0.15 + Math.random() * 0.85;
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z,
      r: 0.4 + z * (Math.random() > 0.9 ? 1.8 : 0.9),
      a: 0.06 + z * 0.16,
      vx: (Math.random() - 0.5) * 0.018,
      vy: -0.006 - Math.random() * 0.014,
      gold: Math.random() > 0.92,
    });
  }
  return out;
}

function seedLines(w: number, h: number, count: number): Line[] {
  const out: Line[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const len = 40 + Math.random() * 120;
    const ang = Math.random() * Math.PI * 2;
    out.push({
      x1: x,
      y1: y,
      x2: x + Math.cos(ang) * len,
      y2: y + Math.sin(ang) * len,
      a: 0.03 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0004 + Math.random() * 0.0006,
    });
  }
  return out;
}

/**
 * Decorative global atmosphere for the Home page.
 * Pointer-events none; no business logic; pauses when off-screen.
 */
export function HomeCanvas() {
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
    let tablet = false;
    let raf = 0;
    let last = performance.now();
    let time = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let visible = true;
    let particles: Particle[] = [];
    let lines: Line[] = [];

    const density = () => {
      if (reduceMotion) return 0.1;
      if (mobile) return 0.3;
      if (tablet) return 0.6;
      return 1;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, window.innerHeight);
      mobile = window.matchMedia("(max-width: 768px)").matches;
      tablet = window.matchMedia("(max-width: 1024px)").matches;
      dpr = Math.min(window.devicePixelRatio ?? 1, mobile ? 1.25 : 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const d = density();
      particles = seedParticles(width, height, Math.round((mobile ? 28 : 72) * d));
      lines = seedLines(width, height, Math.round((mobile ? 4 : 10) * d));
    };

    const onPointer = (e: PointerEvent) => {
      if (mobile || reduceMotion) return;
      const rect = parent.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const paint = (animate: boolean, dt: number) => {
      if (animate) {
        mx += (tx - mx) * 0.03;
        my += (ty - my) * 0.03;
        time += dt * 0.001;
      }
      const px = mx * (mobile ? 3 : 10);
      const py = my * (mobile ? 2 : 8);

      ctx.clearRect(0, 0, width, height);

      // Soft radial atmosphere (background layer)
      const pulse = 0.5 + Math.sin(time * 0.35) * 0.5;
      const g1 = ctx.createRadialGradient(
        width * 0.5 + px * 0.2,
        height * 0.22 + py * 0.15,
        20,
        width * 0.5,
        height * 0.28,
        Math.max(width, height) * 0.55,
      );
      g1.addColorStop(0, `rgba(120,255,0,${0.06 + pulse * 0.03})`);
      g1.addColorStop(0.4, "rgba(40,90,16,0.03)");
      g1.addColorStop(1, "rgba(3,5,4,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Midground energy lines
      for (const ln of lines) {
        if (animate) ln.phase += ln.speed * dt;
        const t = (Math.sin(ln.phase) + 1) * 0.5;
        ctx.strokeStyle = `rgba(120,255,0,${ln.a * (0.5 + t * 0.5)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ln.x1 + px * 0.15, ln.y1 + py * 0.15);
        ctx.lineTo(ln.x2 + px * 0.15, ln.y2 + py * 0.15);
        ctx.stroke();
        const bx = ln.x1 + (ln.x2 - ln.x1) * t;
        const by = ln.y1 + (ln.y2 - ln.y1) * t;
        ctx.fillStyle = `rgba(156,255,56,${0.2 + t * 0.25})`;
        ctx.beginPath();
        ctx.arc(bx + px * 0.15, by + py * 0.15, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles — depth layers via z
      for (const p of particles) {
        if (animate) {
          p.x += (p.vx + mx * 0.004 * p.z) * dt * 0.045;
          p.y += p.vy * dt * 0.045;
          if (p.y < -8) p.y = height + 8;
          if (p.y > height + 8) p.y = -8;
          if (p.x < -8) p.x = width + 8;
          if (p.x > width + 8) p.x = -8;
        }
        const x = p.x + px * p.z;
        const y = p.y + py * p.z;
        const rgb = p.gold ? "245,197,66" : "180,240,140";
        if (p.r > 1.2) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
          glow.addColorStop(0, `rgba(${rgb},${p.a * 0.55})`);
          glow.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = glow;
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

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(32, now - last);
      last = now;
      if (visible && !document.hidden && !reduceMotion) {
        paint(true, dt);
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
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
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
