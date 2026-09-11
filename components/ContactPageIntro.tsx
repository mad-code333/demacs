"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IoMail } from "react-icons/io5";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactPageIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
    >
      <h1 className="flex items-center gap-3 font-golos text-2xl font-semibold uppercase tracking-wide text-white sm:text-3xl">
        <IoMail className="size-8 shrink-0 text-primary sm:size-9" aria-hidden />
        Contact
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-secondary/75">
        Questions about rewards, partnerships, or the site? Use the form, or join us on Discord and Kick — we are happy
        to help.
      </p>
      <Image src="/images/logo.png" alt="Contact" width={1000} height={1000} />
    </motion.div>
  );
}
