"use client";

import Link from "next/link";

export type PrimaryButtonSize = "sm" | "md";

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
  md: "min-h-12 py-[14px] px-7 text-sm leading-[21px] w-full sm:w-auto",
  sm: "min-h-9 py-2 px-3.5 text-xs leading-tight tracking-wide w-auto shrink-0",
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
  const primary =
    "border border-[#9dff4a] bg-[linear-gradient(180deg,#9cff38_0%,#78ff00_55%,#5fd000_100%)] text-[#061000] shadow-[0_4px_0_0_#2f6b00,0_10px_28px_rgba(120,255,0,0.18)] hover:border-[#c8ff8a] hover:bg-[linear-gradient(180deg,#b8ff5a_0%,#8dff1a_55%,#6fe000_100%)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#3f8c00,0_14px_36px_rgba(120,255,0,0.28)] active:translate-y-[2px] active:border-[#5fd000] active:shadow-[0_1px_0_0_#245200,0_4px_12px_rgba(120,255,0,0.12)]";

  const secondary =
    "border border-white/16 bg-[linear-gradient(180deg,rgba(20,28,22,0.95)_0%,rgba(8,12,10,0.95)_100%)] text-white shadow-[0_4px_0_0_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.55),0_12px_28px_rgba(120,255,0,0.1)] active:translate-y-[2px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.55)]";

  const base =
    "relative isolate flex h-fit cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-full text-center font-golos font-semibold uppercase tracking-[0.06em] antialiased transition-[border-color,background,box-shadow,transform,color] duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030504]";

  const cls = [base, variant === "primary" ? primary : secondary, sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {animated && variant === "primary" ? (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden>
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-button-shine bg-linear-to-r from-transparent via-white/35 to-transparent opacity-90"
          />
        </span>
      ) : null}
      <span className="pointer-events-none absolute inset-x-3 top-0 h-px rounded-full bg-white/35" aria-hidden />
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
