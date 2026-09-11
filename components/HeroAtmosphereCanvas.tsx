"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  z: number;
};

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  z: number;
};

function spawnEmber(width: number, height: number, fx: number, fy: number): Ember {
  const max = 90 + Math.random() * 140;
  return {
    x: fx + (Math.random() - 0.5) * width * 0.18,
    y: fy + height * 0.08 + Math.random() * height * 0.1,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -0.18 - Math.random() * 0.32,
    life: Math.random() * max,
    max,
    r: 0.5 + Math.random() * 1.4,
    z: 0.4 + Math.random() * 0.6,
  };
}

export function HeroAtmosphereCanvas() {
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
    let time = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let embers: Ember[] = [];
    let motes: Mote[] = [];

    const focal = () => ({
      x: width * (mobile ? 0.5 : 0.72) + mx * 22,
      y: height * (mobile ? 0.42 : 0.46) + my * 14,
    });

    const seed = () => {
      const moteCount = mobile ? 10 : 22;
      motes = [];
      for (let i = 0; i < moteCount; i += 1) {
        const z = 0.2 + Math.random() * 0.8;
        motes.push({
          x: width * (mobile ? 0.15 : 0.38) + Math.random() * width * 0.62,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.06,
          vy: -0.02 - Math.random() * 0.05,
          r: 0.5 + z * 1.3,
          a: 0.08 + z * 0.22,
          z,
        });
      }
      const emberCount = mobile ? 10 : 20;
      embers = Array.from({ length: emberCount }, () => {
        const { x, y } = focal();
        return spawnEmber(width, height, x, y);
      });
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      mobile = window.matchMedia("(max-width: 768px)").matches;
      dpr = Math.min(window.devicePixelRatio ?? 1, 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onPointer = (event: PointerEvent) => {
      if (mobile || reduceMotion) return;
      const rect = parent.getBoundingClientRect();
      tx = (event.clientX - rect.left) / rect.width - 0.5;
      ty = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const paint = (animate: boolean) => {
      if (animate) {
        mx += (tx - mx) * 0.035;
        my += (ty - my) * 0.035;
        time += 0.008;
      }

      ctx.clearRect(0, 0, width, height);
      const { x: fx, y: fy } = focal();
      const pulse = 0.5 + Math.sin(time) * 0.5;

      const glow = ctx.createRadialGradient(fx, fy, 8, fx, fy, mobile ? 160 : 240);
      glow.addColorStop(0, `rgba(120,255,0,${0.1 + pulse * 0.06})`);
      glow.addColorStop(0.35, `rgba(120,255,0,${0.04 + pulse * 0.02})`);
      glow.addColorStop(1, "rgba(120,255,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(time * 0.12);
      ctx.scale(1, 0.58);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(120,255,0,${0.07 + pulse * 0.05})`;
      ctx.lineWidth = 1.2;
      ctx.arc(0, 0, mobile ? 70 : 108, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = `rgba(120,255,0,${0.04 + pulse * 0.03})`;
      ctx.lineWidth = 6;
      ctx.arc(0, 0, mobile ? 96 : 148, 0.15, Math.PI * 1.35);
      ctx.stroke();
      ctx.restore();

      const px = mx * 16;
      const py = my * 10;

      for (const m of motes) {
        if (animate) {
          m.x += m.vx;
          m.y += m.vy;
          if (m.y < -6) m.y = height + 6;
          if (m.x < width * (mobile ? 0.1 : 0.34)) m.x = width * 0.96;
          if (m.x > width + 6) m.x = width * (mobile ? 0.2 : 0.4);
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(210,240,200,${m.a})`;
        ctx.arc(m.x + px * m.z, m.y + py * m.z, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const e of embers) {
        if (animate) {
          e.life += 1;
          e.x += e.vx;
          e.y += e.vy;
          if (e.life > e.max || e.y < fy - height * 0.32) {
            const next = spawnEmber(width, height, fx, fy);
            e.x = next.x;
            e.y = next.y;
            e.vx = next.vx;
            e.vy = next.vy;
            e.life = 0;
            e.max = next.max;
            e.r = next.r;
            e.z = next.z;
          }
        }
        const t = 1 - e.life / e.max;
        ctx.beginPath();
        ctx.fillStyle = `rgba(156,255,72,${0.12 + t * 0.38})`;
        ctx.arc(e.x + px * e.z, e.y + py * e.z, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(120,255,0,${t * 0.08})`;
        ctx.arc(e.x + px * e.z, e.y + py * e.z + 4, e.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (cancelled) return;
      if (document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      paint(true);
      raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      paint(false);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full mix-blend-screen"
      aria-hidden
    />
  );
}
