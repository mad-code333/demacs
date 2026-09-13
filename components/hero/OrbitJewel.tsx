"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { OrbitJewelConfig } from "./orbitConfig";
import { JEWEL_SRC, ORBIT_GEOMETRY } from "./orbitConfig";

const VISIBILITY: Record<OrbitJewelConfig["visible"], string> = {
  always: "block",
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
};

const DEPTH_CLASS: Record<OrbitJewelConfig["depth"], string> = {
  bg: "orbit-jewel--bg",
  mid: "orbit-jewel--mid",
  fg: "orbit-jewel--fg",
};

type OrbitJewelProps = {
  config: OrbitJewelConfig;
  parallaxX: number;
  parallaxY: number;
  reduceMotion: boolean;
};

function positionOnOrbit(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const { cx, cy, rx, ry, rot } = ORBIT_GEOMETRY;
  const x0 = Math.cos(rad) * rx * radius;
  const y0 = Math.sin(rad) * ry * radius;
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  const x = x0 * c - y0 * s;
  const y = x0 * s + y0 * c;
  return {
    left: `${(cx + x).toFixed(4)}%`,
    top: `${(cy + y).toFixed(4)}%`,
  };
}

async function waitUntilFullyDecoded(img: HTMLImageElement) {
  if (!img.complete || img.naturalWidth === 0) return false;
  try {
    if (typeof img.decode === "function") await img.decode();
  } catch {
    /* ignore */
  }
  return img.complete && img.naturalWidth > 0;
}

export function OrbitJewel({ config, parallaxX, parallaxY, reduceMotion }: OrbitJewelProps) {
  const { left, top } = positionOnOrbit(config.angle, config.radius);
  const src = JEWEL_SRC[config.kind];
  const blend = config.blend ?? "normal";
  const half = config.size / 2;
  const px = parallaxX.toFixed(2);
  const py = parallaxY.toFixed(2);
  const [ready, setReady] = useState(false);
  const revealed = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    setReady(true);
  }, []);

  const tryReveal = useCallback(
    async (img: HTMLImageElement | null | undefined) => {
      if (!img || revealed.current) return;
      if (await waitUntilFullyDecoded(img)) reveal();
    },
    [reveal],
  );

  useLayoutEffect(() => {
    revealed.current = false;
    setReady(false);
    const img = bodyRef.current?.querySelector("img");
    void tryReveal(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-gate only when asset changes
  }, [src]);

  return (
    <div
      className={[
        "orbit-jewel pointer-events-none absolute select-none",
        DEPTH_CLASS[config.depth],
        VISIBILITY[config.visible],
        config.kind === "crown" ? "orbit-jewel--crown" : "",
        config.kind === "coin" ? "orbit-jewel--coin" : "",
        config.kind === "gem" ? "orbit-jewel--gem" : "",
        config.kind === "ring" ? "orbit-jewel--ring" : "",
        config.kind === "crystal" ? "orbit-jewel--crystal" : "",
        config.kind === "trophy" ? "orbit-jewel--trophy" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        left,
        top,
        width: `${config.size}px`,
        height: `${config.size}px`,
        marginLeft: `${-half}px`,
        marginTop: `${-half}px`,
        opacity: config.opacity,
        transform: `translate3d(${px}px, ${py}px, 0px)`,
        zIndex: config.depth === "fg" ? 3 : config.depth === "mid" ? 2 : 1,
        ["--oj-dur" as string]: `${config.duration}s`,
        ["--oj-delay" as string]: `${config.delay}s`,
        ["--oj-bob" as string]: `${config.bob}px`,
        ["--oj-rot" as string]: `${config.rotate}deg`,
        ["--oj-drift" as string]: `${config.id.length % 2 === 0 ? 5 : -5}px`,
      }}
    >
      <div className="orbit-jewel__bloom" aria-hidden />
      <div
        className={[
          "orbit-jewel__spin",
          reduceMotion ? "" : "orbit-jewel__spin--live",
        ].join(" ")}
      >
        <div
          ref={bodyRef}
          className={[
            "orbit-jewel__body",
            reduceMotion ? "" : "orbit-jewel__body--live",
          ].join(" ")}
        >
          {/* Native img — already-optimized WebP, no /_next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            width={Math.min(256, Math.round(config.size * 2))}
            height={Math.min(256, Math.round(config.size * 2))}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={(event) => {
              void tryReveal(event.currentTarget);
            }}
            className={[
              "orbit-jewel__img",
              ready ? "is-ready" : "",
              blend === "screen" ? "orbit-jewel__img--screen" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          {ready && (config.kind === "gem" || config.kind === "crystal") ? (
            <span className="orbit-jewel__sparkle" aria-hidden />
          ) : null}
        </div>
      </div>
      <div className="orbit-jewel__shadow" aria-hidden />
    </div>
  );
}
