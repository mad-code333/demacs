"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const SPRITE_URLS = [
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
] as const;

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

type Sprite = {
  img: number;
  nx: number;
  ny: number;
  size: number;
  z: number;
  rot: number;
  rotSpeed: number;
  bob: number;
  bobSpeed: number;
  alpha: number;
  glow: "green" | "gold" | "purple";
};

const DESKTOP_SPRITES: Omit<Sprite, "rot" | "bob">[] = [
  { img: 1, nx: 0.14, ny: 0.18, size: 70, z: 0.72, rotSpeed: 0.00003, bobSpeed: 0.0004, alpha: 0.94, glow: "gold" },
  { img: 0, nx: 0.11, ny: 0.48, size: 36, z: 0.36, rotSpeed: -0.00002, bobSpeed: 0.00032, alpha: 0.4, glow: "purple" },
  { img: 2, nx: 0.86, ny: 0.14, size: 52, z: 0.65, rotSpeed: -0.000025, bobSpeed: 0.00038, alpha: 0.9, glow: "green" },
  { img: 3, nx: 0.82, ny: 0.38, size: 100, z: 0.88, rotSpeed: 0.000012, bobSpeed: 0.00028, alpha: 0.95, glow: "green" },
  { img: 1, nx: 0.74, ny: 0.58, size: 30, z: 0.42, rotSpeed: 0.000045, bobSpeed: 0.00045, alpha: 0.78, glow: "gold" },
  { img: 1, nx: 0.92, ny: 0.82, size: 110, z: 1, rotSpeed: -0.00002, bobSpeed: 0.00022, alpha: 0.88, glow: "gold" },
  { img: 4, nx: 0.08, ny: 0.76, size: 24, z: 0.3, rotSpeed: 0.00003, bobSpeed: 0.00035, alpha: 0.32, glow: "gold" },
];

const MOBILE_SPRITES: Omit<Sprite, "rot" | "bob">[] = [
  { img: 1, nx: 0.1, ny: 0.14, size: 44, z: 0.55, rotSpeed: 0.000025, bobSpeed: 0.00035, alpha: 0.8, glow: "gold" },
  { img: 2, nx: 0.9, ny: 0.12, size: 36, z: 0.48, rotSpeed: -0.00002, bobSpeed: 0.0003, alpha: 0.75, glow: "green" },
  { img: 3, nx: 0.88, ny: 0.4, size: 64, z: 0.72, rotSpeed: 0.00001, bobSpeed: 0.00024, alpha: 0.88, glow: "green" },
  { img: 1, nx: 0.94, ny: 0.86, size: 78, z: 0.9, rotSpeed: -0.000018, bobSpeed: 0.0002, alpha: 0.8, glow: "gold" },
];

function seedParticles(width: number, height: number, mobile: boolean): Particle[] {
  const count = mobile ? 14 : 28;
  const out: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    const z = 0.18 + Math.random() * 0.82;
    out.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      r: 0.45 + z * (Math.random() > 0.88 ? 1.5 : 0.8),
      a: 0.06 + z * 0.14,
      vx: (Math.random() - 0.5) * 0.014,
      vy: -0.005 - Math.random() * 0.012,
      gold: Math.random() > 0.92,
    });
  }
  return out;
}

function seedSprites(mobile: boolean): Sprite[] {
  return (mobile ? MOBILE_SPRITES : DESKTOP_SPRITES).map((s) => ({
    ...s,
    rot: s.glow === "gold" ? -0.4 : 0.1,
    bob: Math.random() * Math.PI * 2,
  }));
}

function loadSprites() {
  return Promise.all(
    SPRITE_URLS.map(
      (src) =>
        new Promise<HTMLImageElement | null>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = src;
        }),
    ),
  );
}

function glowRgb(kind: Sprite["glow"]) {
  if (kind === "gold") return "255,196,64";
  if (kind === "purple") return "168,96,255";
  return "120,255,0";
}

/** Hero-only overlay: orbits + sprites. Night sky lives in NightSkyCanvas. */
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
    let sprites: Sprite[] = [];
    let images: Array<HTMLImageElement | null> = [null, null, null, null, null];
    let orbit = { rx: 0, ry: 0, rot: -0.3 };

    const inClearZone = (x: number, y: number) => {
      const dx = (x - width * 0.5) / (width * 0.26);
      const dy = (y - height * 0.36) / (height * 0.2);
      return dx * dx + dy * dy < 1;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      mobile = window.matchMedia("(max-width: 768px)").matches;
      dpr = Math.min(window.devicePixelRatio ?? 1, mobile ? 1.35 : 1.85);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      particles = seedParticles(width, height, mobile);
      sprites = seedSprites(mobile);
      orbit = {
        rx: Math.min(width * 0.42, height * 0.58),
        ry: Math.min(width, height) * (mobile ? 0.19 : 0.225),
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

      ctx.shadowColor = "rgba(120,255,0,0.35)";
      ctx.shadowBlur = mobile ? 10 : 16;
      ctx.strokeStyle = "rgba(120,255,0,0.12)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(156,255,56,0.08)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      const beads = mobile ? 30 : 52;
      for (let i = 0; i < beads; i += 1) {
        const t = (i / beads) * Math.PI * 2 + time * 0.08;
        const x = Math.cos(t) * orbit.rx;
        const y = Math.sin(t) * orbit.ry;
        if (inClearZone(cx + x, cy + y)) continue;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(time * 1.2 + i));
        ctx.fillStyle = `rgba(170,255,90,${0.1 + tw * 0.35})`;
        ctx.beginPath();
        ctx.arc(x, y, mobile ? 0.85 : 1.15, 0, Math.PI * 2);
        ctx.fill();
      }

      const head = time * 0.35;
      ctx.strokeStyle = "rgba(180,255,90,0.55)";
      ctx.lineWidth = 1.7;
      ctx.shadowColor = "rgba(120,255,0,0.7)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, head, head + 0.5);
      ctx.stroke();

      const hx = Math.cos(head + 0.5) * orbit.rx;
      const hy = Math.sin(head + 0.5) * orbit.ry;
      const spark = ctx.createRadialGradient(hx, hy, 0, hx, hy, mobile ? 9 : 14);
      spark.addColorStop(0, "rgba(230,255,180,0.75)");
      spark.addColorStop(0.35, "rgba(120,255,0,0.25)");
      spark.addColorStop(1, "rgba(120,255,0,0)");
      ctx.shadowBlur = 0;
      ctx.fillStyle = spark;
      ctx.beginPath();
      ctx.arc(hx, hy, mobile ? 9 : 14, 0, Math.PI * 2);
      ctx.fill();

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
        const rgb = p.gold ? "245,197,66" : "200,245,170";
        if (p.r > 1.25) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 5);
          g.addColorStop(0, `rgba(${rgb},${p.a * 0.55})`);
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

    const drawSprites = (px: number, py: number, animate: boolean, dt: number) => {
      for (const s of sprites) {
        const img = images[s.img];
        if (!img) continue;
        if (animate) {
          s.rot += s.rotSpeed * dt;
          s.bob += s.bobSpeed * dt;
        }
        const x = s.nx * width + px * s.z;
        const y = s.ny * height + Math.sin(s.bob) * (5 + s.z * 5) + py * s.z * 0.9;
        if (inClearZone(x, y)) continue;

        const ratio = img.height / img.width;
        const w = s.size;
        const h = s.size * ratio;
        const rgb = glowRgb(s.glow);
        const glowR = Math.max(w, h) * 0.58;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        glow.addColorStop(0, `rgba(${rgb},0.18)`);
        glow.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.rot);
        ctx.globalAlpha = s.alpha;
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
    };

    const paint = (animate: boolean, dt: number) => {
      if (animate) {
        mx += (tx - mx) * 0.035;
        my += (ty - my) * 0.035;
        time += dt * 0.001;
      }
      const px = mx * (mobile ? 4 : 12);
      const py = my * (mobile ? 3 : 9);
      const cx = width * 0.5 + px * 0.22;
      const cy = height * 0.36 + py * 0.22;

      ctx.clearRect(0, 0, width, height);
      drawParticles(px, py, animate, dt);
      drawOrbit(cx, cy);
      drawSprites(px, py, animate, dt);
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
      { threshold: 0.02 },
    );
    io.observe(canvas);

    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    void loadSprites().then((loaded) => {
      if (cancelled) return;
      images = loaded;
      paint(false, 0);
    });

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
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden
    />
  );
}
