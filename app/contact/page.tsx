import type { Metadata } from "next";
import { FaDiscord } from "react-icons/fa";
import { FaKickstarterK } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { ContactForm } from "@/components/ContactForm";
import { ContactPageIntro } from "@/components/ContactPageIntro";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Gamba — message the team or reach us on Discord and Kick.",
  openGraph: {
    title: "Contact · Gamba",
    description:
      "Get in touch with Gamba — message the team or reach us on Discord and Kick.",
    url: "/contact",
  },
  twitter: {
    title: "Contact · Gamba",
    description:
      "Get in touch with Gamba — message the team or reach us on Discord and Kick.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050508] px-4 py-12 font-golos text-bright sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <ContactPageIntro />

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href="https://discord.gg/gambanator"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-[#08080c]/60 p-5 transition-colors hover:border-primary/35 hover:bg-white/4"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#5865F2]/15 text-[#5865F2] transition-colors group-hover:bg-[#5865F2]/25">
                  <FaDiscord className="size-7" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-golos text-xs font-semibold uppercase tracking-wider text-secondary/70">
                    Community
                  </span>
                  <span className="mt-0.5 block font-golos text-sm font-semibold text-white">Discord</span>
                </span>
              </a>
              <a
                href="https://kick.com/gambanator"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-[#08080c]/60 p-5 transition-colors hover:border-primary/35 hover:bg-white/4"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <FaKickstarterK className="size-6" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-golos text-xs font-semibold uppercase tracking-wider text-secondary/70">
                    Live
                  </span>
                  <span className="mt-0.5 block font-golos text-sm font-semibold text-white">Kick</span>
                </span>
              </a>
            </div>

            <ContactForm />
          </div>
        </div>

        <p className="mt-14 flex items-start gap-2 text-center text-xs leading-relaxed text-secondary/55 sm:text-left">
          <IoMail className="mx-auto mt-0.5 size-4 shrink-0 text-secondary/40 sm:mx-0" aria-hidden />
          <span>
            For the fastest response during streams, say hi on Kick or ask in Discord. Form submissions are reviewed by
            the team regularly.
          </span>
        </p>
      </div>
    </div>
  );
}
