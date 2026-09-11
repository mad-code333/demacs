"use client";

import Link from "next/link";

export type PrimaryButtonSize = "sm" | "md";

export type PrimaryButtonProps = {
  children: React.ReactNode;
  href: string;
  /** Padding and type scale. `md` matches the hero CTA; `sm` fits toolbars. */
  size?: PrimaryButtonSize;
  /** When false, the shine sweep is not rendered (no motion). Default true. */
  animated?: boolean;
  className?: string;
  /**
   * Use a real `<a>` instead of Next `<Link>`. Needed for same-origin routes that must
   * perform a full navigation (e.g. OAuth redirects from `/api/...`).
   */
  nativeAnchor?: boolean;
};

const sizeClasses: Record<PrimaryButtonSize, string> = {
  md: "py-[14px] px-[24px] text-sm leading-[21px] w-full sm:w-auto",
  sm: "py-2 px-3.5 text-xs leading-tight tracking-wide w-auto shrink-0",
};

const shineTopClasses: Record<PrimaryButtonSize, string> = {
  md: "-top-0.5 h-1.5 scale-x-[2]",
  sm: "-top-px h-1 scale-x-[2]",
};

export function PrimaryButton({
  children,
  href,
  size = "md",
  animated = true,
  className,
  nativeAnchor = false,
}: PrimaryButtonProps) {
  const base =
    "relative isolate flex h-fit cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-full border border-[#9dff4a] bg-primary text-center font-golos font-semibold uppercase tracking-[0.04em] text-[#061000] antialiased shadow-btn-primary transition-[border-color,background-color,box-shadow,transform,color] duration-300 hover:border-[#c8ff8a] hover:bg-[#9dff4a] hover:shadow-btn-hover active:translate-y-[2px] active:border-[#5fd000] active:shadow-btn-active focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]";

  const cls = [base, sizeClasses[size], className].filter(Boolean).join(" ");

  const inner = (
    <>
      {animated ? (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          aria-hidden
        >
          <span
            className={[
              "pointer-events-none absolute left-0 w-1/2 animate-button-shine rounded-[100%] opacity-90",
              shineTopClasses[size],
            ].join(" ")}
            style={{
              background: "radial-gradient(rgba(255, 255, 255, 0.85), transparent 62%)",
            }}
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-button-shine bg-linear-to-r from-transparent via-white/40 to-transparent opacity-95" />
        </span>
      ) : null}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </>
  );

  if (nativeAnchor) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
