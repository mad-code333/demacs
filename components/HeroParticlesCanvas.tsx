"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const SYMBOL_COUNT = 9;

const SYMBOL_IMAGE_URLS = Array.from(
  { length: SYMBOL_COUNT },
  (_, i) => `/symbol/${i + 1}.png`,
);

type RainDrop = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbolIndex: number;
  size: number;
  alpha: number;
  drift: number;
};

function pickSymbolIndex(): number {
  return Math.floor(Math.random() * SYMBOL_COUNT);
}

function initRain(width: number, height: number): RainDrop[] {
  const area = width * height;
  const count = Math.min(38, Math.max(10, Math.floor(area / 48000)));
  const list: RainDrop[] = [];
  for (let i = 0; i < count; i++) {
    list.push({
      x: Math.random() * width,
      y: Math.random() * (height + 120) - 60,
      vx: (Math.random() - 0.5) * 0.35,
      vy: 0.55 + Math.random() * 1.85,
      symbolIndex: pickSymbolIndex(),
      size: 22 + Math.random() * 28,
      alpha: 0.12 + Math.random() * 0.32,
      drift: (Math.random() - 0.5) * 0.0009,
    });
  }
  return list;
}

function loadSymbolImages(
  urls: readonly string[],
): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve(img);
          img.onerror = () =>
            reject(new Error(`Failed to load symbol: ${src}`));
          img.src = src;
        }),
    ),
  );
}

export function HeroParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let cancelled = false;
    let images: HTMLImageElement[] | null = null;
    let drops = initRain(1, 1);
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = initRain(width, height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const tick = () => {
      if (cancelled) return;

      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const imgs = images;
      if (imgs) {
        for (const d of drops) {
          d.vx += d.drift;
          d.vx *= 0.998;
          d.x += d.vx;
          d.y += d.vy;

          const margin = d.size * 0.6 + 8;
          if (d.y > height + margin) {
            d.y = -margin - Math.random() * 80;
            d.x = Math.random() * width;
            d.symbolIndex = pickSymbolIndex();
            d.size = 22 + Math.random() * 28;
            d.vy = 0.55 + Math.random() * 1.85;
            d.alpha = 0.12 + Math.random() * 0.32;
          }
          if (d.x < -margin) d.x = width + margin;
          if (d.x > width + margin) d.x = -margin;

          const img = imgs[d.symbolIndex];
          if (!img?.naturalWidth) continue;

          const drawW = d.size;
          const drawH = (img.naturalHeight / img.naturalWidth) * drawW;

          ctx.globalAlpha = d.alpha;
          ctx.drawImage(img, d.x - drawW / 2, d.y - drawH / 2, drawW, drawH);
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    loadSymbolImages(SYMBOL_IMAGE_URLS)
      .then((loaded) => {
        if (cancelled) return;
        images = loaded;
        resize();
      })
      .catch(() => {
        /* keep animating; frames no-op until images would be set */
      });

    return () => {
      cancelled = true;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-1 h-full w-full mix-blend-screen opacity-[0.85]"
      aria-hidden
    />
  );
}
