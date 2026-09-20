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

/** Hero orbital energy + ambient particles. Jewels live in OrbitJewels. */
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
    let time = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let visible = true;
    let particles: Particle[] = [];
    let orbit = { rx: 0, ry: 0, rot: -0.3 };

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
      orbit = {
        rx: Math.min(width * 0.34, height * 0.48),
        ry: Math.min(width, height) * (mobile ? 0.155 : 0.175),
        rot: -0.3,
      };
    };

    const onPointer = (event: PointerEvent) => {
      if (mobile || reduceMotion) return;
      const rect = parent.getBoundingClientRect();
      tx = (event.clientX - rect.left) / rect.width - 0.5;
      ty = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const drawOrbit = (cx: number, cy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(orbit.rot);

      ctx.shadowColor = "rgba(168,85,247,0.18)";
      ctx.shadowBlur = mobile ? 6 : 12;
      ctx.strokeStyle = "rgba(168,85,247,0.1)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(156,255,56,0.05)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(168,85,247,0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx * 0.74, orbit.ry * 0.74, 0, 0, Math.PI * 2);
      ctx.stroke();

      const beads = mobile ? 18 : 30;
      for (let i = 0; i < beads; i += 1) {
        const t = (i / beads) * Math.PI * 2 + time * 0.07;
        const x = Math.cos(t) * orbit.rx;
        const y = Math.sin(t) * orbit.ry;
        if (inClearZone(cx + x, cy + y)) continue;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(time * 1.15 + i * 0.7));
        const bright = i % 8 === 0;
        ctx.fillStyle = bright
          ? `rgba(210,255,140,${0.18 + tw * 0.42})`
          : `rgba(170,255,90,${0.08 + tw * 0.28})`;
        ctx.beginPath();
        ctx.arc(x, y, mobile ? (bright ? 1.15 : 0.75) : bright ? 1.5 : 1, 0, Math.PI * 2);
        ctx.fill();
      }

      const head = time * 0.32;
      ctx.strokeStyle = "rgba(180,255,90,0.55)";
      ctx.lineWidth = 1.7;
      ctx.shadowColor = "rgba(168,85,247,0.65)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, head, head + 0.5);
      ctx.stroke();

      const hx = Math.cos(head + 0.5) * orbit.rx;
      const hy = Math.sin(head + 0.5) * orbit.ry;
      const spark = ctx.createRadialGradient(hx, hy, 0, hx, hy, mobile ? 8 : 14);
      spark.addColorStop(0, "rgba(230,255,180,0.8)");
      spark.addColorStop(0.35, "rgba(168,85,247,0.28)");
      spark.addColorStop(1, "rgba(168,85,247,0)");
      ctx.shadowBlur = 0;
      ctx.fillStyle = spark;
      ctx.beginPath();
      ctx.arc(hx, hy, mobile ? 8 : 14, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 1; i <= 5; i += 1) {
        const a = head + 0.5 - i * 0.08;
        ctx.fillStyle = `rgba(168,85,247,${0.12 - i * 0.018})`;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * orbit.rx, Math.sin(a) * orbit.ry, Math.max(0.5, 2.1 - i * 0.28), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
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
        time += dt * 0.001;
      }
      const px = mx * (mobile ? 3 : 8);
      const py = my * (mobile ? 2 : 6);
      const cx = width * 0.5 + px * 0.2;
      const cy = height * 0.3 + py * 0.16;

      ctx.clearRect(0, 0, width, height);
      drawParticles(px, py, animate, dt);
      drawOrbit(cx, cy);
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
