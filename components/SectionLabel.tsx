"use client";

import type { IconType } from "react-icons";

export function SectionLabel({
  children,
  icon: Icon,
  tone = "primary",
}: {
  children: React.ReactNode;
  icon?: IconType;
  tone?: "primary" | "live";
}) {
  const toneClass =
    tone === "live"
      ? "border-red-500/30 bg-red-500/10 text-red-400"
      : "border-primary/30 bg-primary/10 text-primary";

  return (
    <span
      className={[
        "type-label inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-[0.65rem] uppercase",
        toneClass,
      ].join(" ")}
    >
      {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden /> : null}
      {children}
    </span>
  );
}
