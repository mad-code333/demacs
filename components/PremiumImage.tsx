"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type PremiumImageProps = Omit<ImageProps, "onLoad" | "onLoadingComplete"> & {
  /** Soft glass shimmer while waiting (default true). */
  showPlaceholder?: boolean;
  /** Extra class on the outer reserved frame. */
  frameClassName?: string;
  /** Called after the image has fully decoded and is safe to show. */
  onReady?: () => void;
};

async function waitUntilFullyDecoded(img: HTMLImageElement) {
  if (!img.complete || img.naturalWidth === 0) return false;
  try {
    if (typeof img.decode === "function") {
      await img.decode();
    }
  } catch {
    // Some formats reject decode(); still safe if complete with dimensions.
  }
  return img.complete && img.naturalWidth > 0;
}

/**
 * Reserves layout space and keeps the bitmap invisible until it is fully decoded.
 * Avoids progressive / ghostly partial paints.
 */
export function PremiumImage({
  className,
  frameClassName,
  showPlaceholder = true,
  onReady,
  alt,
  priority,
  loading,
  decoding = "async",
  quality,
  fetchPriority,
  style,
  src,
  ...rest
}: PremiumImageProps) {
  const [ready, setReady] = useState(false);
  const revealed = useRef(false);
  const frameRef = useRef<HTMLSpanElement>(null);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    setReady(true);
    onReady?.();
  }, [onReady]);

  const tryReveal = useCallback(
    async (img: HTMLImageElement | null | undefined) => {
      if (!img || revealed.current) return;
      const ok = await waitUntilFullyDecoded(img);
      if (ok) reveal();
    },
    [reveal],
  );

  // Cached images may finish before React attaches onLoad.
  useLayoutEffect(() => {
    revealed.current = false;
    setReady(false);
    const img = frameRef.current?.querySelector("img");
    void tryReveal(img);
    // Only re-gate when the asset URL changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tryReveal is stable enough; src is the gate
  }, [src]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      void tryReveal(event.currentTarget);
    },
    [tryReveal],
  );

  const resolvedLoading = priority ? "eager" : loading ?? "lazy";

  return (
    <span
      ref={frameRef}
      className={[
        "demacs-img relative inline-block overflow-hidden align-middle",
        frameClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      data-ready={ready ? "true" : "false"}
    >
      {showPlaceholder ? (
        <span className="demacs-img__placeholder pointer-events-none absolute inset-0" aria-hidden />
      ) : null}
      <Image
        {...rest}
        src={src}
        alt={alt}
        priority={priority}
        loading={resolvedLoading}
        decoding={decoding}
        quality={quality}
        fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
        onLoad={handleLoad}
        className={[
          "demacs-img__media",
          ready ? "demacs-img__media--ready" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      />
    </span>
  );
}
