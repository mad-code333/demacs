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
  lg: "min-h-[58px] py-4 px-9 text-[0.9rem] leading-tight tracking-[0.08em] w-full sm:w-auto sm:min-w-[220px]",
  md: "min-h-[54px] py-3.5 px-8 text-[0.85rem] leading-tight tracking-[0.07em] w-full sm:w-auto",
  sm: "min-h-10 py-2.5 px-4 text-xs leading-tight tracking-[0.06em] w-auto shrink-0",
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
    "border border-[#b8ff6a] bg-[linear-gradient(180deg,#b8ff58_0%,#86ff14_45%,#64d400_100%)] text-[#061000] shadow-[0_5px_0_0_#2a6200,0_14px_36px_rgba(120,255,0,0.24),inset_0_1px_0_rgba(255,255,255,0.48)] hover:border-[#d4ff9a] hover:bg-[linear-gradient(180deg,#c6ff6e_0%,#96ff28_45%,#72e200_100%)] hover:-translate-y-[2px] hover:shadow-[0_8px_0_0_#347800,0_20px_44px_rgba(120,255,0,0.32),inset_0_1px_0_rgba(255,255,255,0.55)] active:translate-y-[1px] active:border-[#5fd000] active:shadow-[0_2px_0_0_#245200,0_6px_16px_rgba(120,255,0,0.14)]";

  const secondary =
    "border border-primary/35 bg-[linear-gradient(180deg,rgba(22,32,24,0.98)_0%,rgba(6,10,8,0.98)_100%)] text-white shadow-[0_5px_0_0_rgba(0,0,0,0.55),0_14px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-primary/65 hover:-translate-y-[2px] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.55),0_18px_40px_rgba(120,255,0,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] active:translate-y-[1px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.55)]";

  const base =
    "relative isolate flex h-fit cursor-pointer select-none items-center justify-center gap-2.5 overflow-hidden rounded-full text-center font-golos font-bold uppercase antialiased transition-[border-color,background,box-shadow,transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030504] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:translate-y-0";

  const cls = [base, variant === "primary" ? primary : secondary, sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {animated && variant === "primary" ? (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden" aria-hidden>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 animate-button-shine bg-linear-to-r from-transparent via-white/40 to-transparent opacity-90" />
        </span>
      ) : null}
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px rounded-full bg-white/45" aria-hidden />
      <span className="pointer-events-none absolute inset-x-7 bottom-0 h-px rounded-full bg-black/20" aria-hidden />
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
