"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";

type InstantImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "src"> & {
  src: string;
  alt: string;
  frameClassName?: string;
  showPlaceholder?: boolean;
  onReady?: () => void;
  /** Optional tiny preview shown in the placeholder (data URL or css url()). */
  lqip?: string;
};

/**
 * Serves static optimized files directly (no /_next/image).
 * Bitmap stays invisible until fully loaded + decoded.
 */
export function InstantImage({
  src,
  alt,
  className,
  frameClassName,
  showPlaceholder = true,
  onReady,
  lqip,
  width,
  height,
  style,
  loading,
  fetchPriority,
  ...rest
}: InstantImageProps) {
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
      if (!img.complete || img.naturalWidth === 0) return;
      try {
        if (typeof img.decode === "function") await img.decode();
      } catch {
        /* ignore */
      }
      if (img.complete && img.naturalWidth > 0) reveal();
    },
    [reveal],
  );

  useLayoutEffect(() => {
    revealed.current = false;
    setReady(false);
    const img = frameRef.current?.querySelector("img");
    void tryReveal(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const placeholderStyle: CSSProperties | undefined = lqip
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.04), transparent 40%), url(${lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(12px)",
        transform: "scale(1.04)",
      }
    : undefined;

  return (
    <span
      ref={frameRef}
      className={["demacs-img relative inline-block overflow-hidden align-middle", frameClassName]
        .filter(Boolean)
        .join(" ")}
      data-ready={ready ? "true" : "false"}
      style={style}
    >
      {showPlaceholder ? (
        <span
          className="demacs-img__placeholder pointer-events-none absolute inset-0"
          style={placeholderStyle}
          aria-hidden
        />
      ) : null}
      {/* Native img — bypasses /_next/image JPEG recompression of transparent WebPs */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading ?? (fetchPriority === "high" ? "eager" : "lazy")}
        fetchPriority={fetchPriority}
        decoding={fetchPriority === "high" ? "sync" : "async"}
        className={["demacs-img__media", ready ? "demacs-img__media--ready" : "", className]
          .filter(Boolean)
          .join(" ")}
        onLoad={(e) => {
          void tryReveal(e.currentTarget);
        }}
      />
    </span>
  );
}
