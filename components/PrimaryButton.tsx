"use client";

import Link from "next/link";

export type PrimaryButtonSize = "sm" | "md" | "lg";

export type PrimaryButtonProps = {
  children: React.ReactNode;
  href: string;
  size?: PrimaryButtonSize;
  animated?: boolean;
  className?: string;
  nativeAnchor?: boolean;
  variant?: "primary" | "secondary";
};

const sizeClasses: Record<PrimaryButtonSize, string> = {
  lg: "min-h-[58px] py-4 px-9 text-[0.9rem] leading-tight w-full sm:w-auto sm:min-w-[220px]",
  md: "min-h-[54px] py-3.5 px-8 text-[0.85rem] leading-tight w-full sm:w-auto",
  sm: "min-h-10 py-2.5 px-4 text-xs leading-tight w-auto shrink-0",
};

export function PrimaryButton({
  children,
  href,
  size = "md",
  animated = true,
  className,
  nativeAnchor = false,
  variant = "primary",
}: PrimaryButtonProps) {
  const base =
    "type-btn relative isolate flex h-fit cursor-pointer select-none items-center justify-center gap-2.5 overflow-hidden rounded-full text-center font-sans uppercase antialiased focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0";

  const variantClass = variant === "primary" ? "demacs-btn-primary" : "demacs-btn-secondary";

  const cls = [base, variantClass, sizeClasses[size], className].filter(Boolean).join(" ");

  const inner = (
    <>
      {animated && variant === "primary" ? (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden" aria-hidden>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-button-shine bg-linear-to-r from-transparent via-white/35 to-transparent opacity-80" />
        </span>
      ) : null}
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px rounded-full bg-white/40" aria-hidden />
      <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px rounded-full bg-black/15" aria-hidden />
      <span className="relative z-10 flex items-center justify-center gap-2.5">{children}</span>
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
