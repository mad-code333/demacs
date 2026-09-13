"use client";

import { useReducedMotion } from "framer-motion";
import {
  useRef,
  type CSSProperties,
  type ElementType,
  type PointerEvent,
  type ReactNode,
} from "react";

type DimensionalCardProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  interactive?: boolean;
};

/**
 * Premium card surface with optional pointer-driven highlight (--mouse-x / --mouse-y).
 */
export function DimensionalCard({
  children,
  className,
  as: Tag = "div",
  interactive = true,
}: DimensionalCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${x}%`);
    ref.current.style.setProperty("--mouse-y", `${y}%`);
    const rx = ((y - 50) / 50) * -1.6;
    const ry = ((x - 50) / 50) * 1.8;
    ref.current.style.setProperty("--card-rx", `${rx.toFixed(2)}deg`);
    ref.current.style.setProperty("--card-ry", `${ry.toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mouse-x", "50%");
    ref.current.style.setProperty("--mouse-y", "40%");
    ref.current.style.setProperty("--card-rx", "0deg");
    ref.current.style.setProperty("--card-ry", "0deg");
  };

  return (
    <Tag
      ref={ref}
      className={[
        "demacs-card demacs-card-light",
        interactive ? "" : "demacs-card--static",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "40%",
          "--card-rx": "0deg",
          "--card-ry": "0deg",
        } as CSSProperties
      }
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerLeave={interactive ? onPointerLeave : undefined}
    >
      {children}
    </Tag>
  );
}
