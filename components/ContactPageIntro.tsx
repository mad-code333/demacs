"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IoMail } from "react-icons/io5";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactPageIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
    >
      <h1 className="type-section-uppercase flex items-center gap-3 font-sans text-2xl uppercase text-white sm:text-3xl">
        <IoMail className="size-8 shrink-0 text-primary sm:size-9" aria-hidden />
        Contact
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-secondary/75">
        Questions about rewards, partnerships, or the site? Use the form, or join us on Discord and Kick — we are happy
        to help.
      </p>

      {/* Fills the rest of the column so it ends flush with the form card. */}
      <div className="demacs-glass-panel relative mt-8 min-h-[300px] w-full flex-1 overflow-hidden rounded-xl">
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 92vw, 44vw"
          className="object-cover"
          aria-hidden
        />
        {/* Blend the artwork's black backdrop into the page */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(5,5,7,0.55)_100%)]"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
