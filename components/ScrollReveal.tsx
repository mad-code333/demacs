"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  delay?: number;
};

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  ...rest
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease,
        delay: reduceMotion ? 0 : delay,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
