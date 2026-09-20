"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  twinkle: number;
  speed: number;
  cool: boolean;
  layer: number;
};

type Dust = {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
};

type Meteor = {
  x: number;
  y: number;
  len: number;
  speed: number;
  life: number;
  max: number;
  angle: number;
};

function seedStars(w: number, h: number, density: number): Star[] {
  const count = Math.round((w * h) / (mobileAreaFactor(w, h) * density));
  const out: Star[] = [];
  for (let i = 0; i < count; i += 1) {
    const layer = Math.random() < 0.55 ? 0 : Math.random() < 0.75 ? 1 : 2;
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: layer === 2 ? 1.1 + Math.random() * 0.7 : 0.3 + Math.random() * (layer === 1 ? 0.9 : 0.55),
      a: 0.2 + Math.random() * (0.35 + layer * 0.15),
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.6,
      cool: Math.random() > 0.78,
      layer,
    });
  }
  return out;
}

function mobileAreaFactor(w: number, h: number) {
  return w < 768 ? 2800 : w < 1024 ? 2000 : 1450;
}

function seedDust(w: number, h: number, mobile: boolean): Dust[] {
  const count = mobile ? 42 : 90;
  const out: Dust[] = [];
  for (let i = 0; i < count; i += 1) {
    const z = 0.2 + Math.random() * 0.8;
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z,
      r: 0.4 + z * 0.9,
      a: 0.04 + z * 0.1,
      vx: (Math.random() - 0.5) * 0.012,
      vy: -0.004 - Math.random() * 0.01,
    });
  }
  return out;
}

function spawnMeteor(w: number, h: number): Meteor {
  return {
    x: Math.random() * w * 0.9,
    y: Math.random() * h * 0.35,
    len: 40 + Math.random() * 70,
    speed: 4.5 + Math.random() * 3.5,
    life: 0,
    max: 38 + Math.random() * 28,
    angle: 0.55 + Math.random() * 0.25,
  };
}

/**
 * Site-wide decorative night-sky canvas.
 * Fixed behind all content; pointer-events none.
 */
export function NightSkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

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
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let meteors: Meteor[] = [];
    let meteorCooldown = 0;

    const densityScale = () => {
      if (reduceMotion) return 2.4;
      if (mobile) return 1.55;
      if (tablet) return 1.15;
      return 1;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      mobile = window.matchMedia("(max-width: 768px)").matches;
      tablet = window.matchMedia("(max-width: 1024px)").matches;
      dpr = Math.min(window.devicePixelRatio ?? 1, mobile ? 1.25 : 1.75);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = seedStars(width, height, densityScale());
      dust = seedDust(width, height, mobile);
      meteors = [];
      meteorCooldown = 180;
    };

    const onPointer = (e: PointerEvent) => {
      if (mobile || reduceMotion) return;
      tx = e.clientX / width - 0.5;
      ty = e.clientY / height - 0.5;
    };

    const drawSky = (px: number, py: number) => {
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#01030a");
      sky.addColorStop(0.35, "#030712");
      sky.addColorStop(0.7, "#04080c");
      sky.addColorStop(1, "#020503");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const clouds = [
        { x: width * 0.12 + px * 0.22, y: height * 0.14 + py * 0.12, r: width * 0.48, a: 0.14, rgb: "30,65,145" },
        { x: width * 0.82 + px * 0.16, y: height * 0.2 + py * 0.1, r: width * 0.42, a: 0.12, rgb: "75,32,125" },
        { x: width * 0.48 + px * 0.1, y: height * 0.38 + py * 0.08, r: width * 0.52, a: 0.1, rgb: "45,125,38" },
        { x: width * 0.28 + px * 0.14, y: height * 0.62 + py * 0.06, r: width * 0.4, a: 0.09, rgb: "22,50,95" },
        { x: width * 0.9 + px * 0.1, y: height * 0.72 + py * 0.05, r: width * 0.34, a: 0.08, rgb: "85,38,115" },
        { x: width * 0.5, y: height * 0.05, r: width * 0.7, a: 0.07, rgb: "35,85,155" },
        { x: width * 0.08 + px * 0.08, y: height * 0.88, r: width * 0.32, a: 0.06, rgb: "20,70,50" },
        { x: width * 0.65 + px * 0.12, y: height * 0.55 + py * 0.07, r: width * 0.28, a: 0.07, rgb: "55,40,130" },
      ];
      for (const c of clouds) {
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        g.addColorStop(0, `rgba(${c.rgb},${c.a})`);
        g.addColorStop(0.5, `rgba(${c.rgb},${c.a * 0.35})`);
        g.addColorStop(1, "rgba(2,4,10,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }

      // Soft purple brand aurora + secondary band
      const pulse = 0.5 + Math.sin(time * 0.35) * 0.5;
      const aurora = ctx.createRadialGradient(
        width * 0.5 + px * 0.15,
        height * 0.3 + py * 0.1,
        20,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.48,
      );
      aurora.addColorStop(0, `rgba(168,85,247,${0.055 + pulse * 0.035})`);
      aurora.addColorStop(0.45, "rgba(40,100,30,0.03)");
      aurora.addColorStop(1, "rgba(2,4,8,0)");
      ctx.fillStyle = aurora;
      ctx.fillRect(0, 0, width, height);

      const bandY = height * (0.22 + Math.sin(time * 0.18) * 0.03);
      const band = ctx.createLinearGradient(0, bandY - 40, 0, bandY + 80);
      band.addColorStop(0, "rgba(168,85,247,0)");
      band.addColorStop(0.45, `rgba(90,200,40,${0.03 + pulse * 0.02})`);
      band.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, 0, width, height);
    };

    const drawStars = (px: number, py: number, animate: boolean, dt: number) => {
      for (const s of stars) {
        if (animate) s.twinkle += s.speed * dt * 0.0014;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
        const parallax = 0.04 + s.layer * 0.06;
        const x = s.x + px * parallax * width * 0.04;
        const y = s.y + py * parallax * height * 0.04;
        const rgb = s.cool ? "170,205,255" : s.layer === 2 ? "255,250,230" : "230,240,255";
        if (s.r > 1) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 5);
          g.addColorStop(0, `rgba(${rgb},${s.a * tw * 0.5})`);
          g.addColorStop(1, `rgba(${rgb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${rgb},${s.a * tw})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawDust = (px: number, py: number, animate: boolean, dt: number) => {
      for (const d of dust) {
        if (animate) {
          d.x += (d.vx + mx * 0.002 * d.z) * dt * 0.04;
          d.y += d.vy * dt * 0.04;
          if (d.y < -6) d.y = height + 6;
          if (d.y > height + 6) d.y = -6;
          if (d.x < -6) d.x = width + 6;
          if (d.x > width + 6) d.x = -6;
        }
        const x = d.x + px * d.z;
        const y = d.y + py * d.z;
        ctx.fillStyle = `rgba(180,240,160,${d.a})`;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawMeteors = (animate: boolean, dt: number) => {
      if (reduceMotion || mobile) return;
      if (animate) {
        meteorCooldown -= dt * 0.06;
        if (meteorCooldown <= 0 && meteors.length < 3) {
          meteors.push(spawnMeteor(width, height));
          meteorCooldown = 140 + Math.random() * 220;
        }
      }
      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i];
        if (animate) {
          m.life += 1;
          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
        }
        const fade = 1 - m.life / m.max;
        if (fade <= 0 || m.x > width + 40 || m.y > height + 40) {
          meteors.splice(i, 1);
          continue;
        }
        const tx2 = m.x - Math.cos(m.angle) * m.len;
        const ty2 = m.y - Math.sin(m.angle) * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx2, ty2);
        g.addColorStop(0, `rgba(220,245,255,${0.55 * fade})`);
        g.addColorStop(0.4, `rgba(120,200,255,${0.2 * fade})`);
        g.addColorStop(1, "rgba(120,200,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.7 * fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const paint = (animate: boolean, dt: number) => {
      if (animate) {
        mx += (tx - mx) * 0.03;
        my += (ty - my) * 0.03;
        time += dt * 0.001;
      }
      const px = mx * (mobile ? 3 : 10);
      const py = my * (mobile ? 2 : 7);
      drawSky(px, py);
      drawStars(px, py, animate, dt);
      drawDust(px, py, animate, dt);
      drawMeteors(animate, dt);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(32, now - last);
      last = now;
      if (visible && !document.hidden) {
        if (reduceMotion) {
          // static night sky frame
        } else {
          paint(true, dt);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    paint(false, 0);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (!reduceMotion) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
