"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IoFlagOutline } from "react-icons/io5";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BonusHuntersPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-[80vh] bg-[#050508] px-6 py-16 font-golos text-bright flex flex-col items-center justify-center">
      <motion.div
        className="mx-auto max-w-lg text-center"
        initial={
          reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
      >
        <div
          className="px-8 py-12"
          role="status"
          aria-live="polite"
        >
          <IoFlagOutline
            className="mx-auto size-14 text-secondary/40"
            aria-hidden
          />
          <h1 className="mt-6 text-xl font-semibold tracking-tight text-white">
            No Bonus Found
          </h1>
          <p className="mt-3 text-secondary/75">
            No active bonus are currently available.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
