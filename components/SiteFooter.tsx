import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaKickstarterK } from "react-icons/fa6";
import { IoHome, IoMail } from "react-icons/io5";
import { DemacsWordmark } from "./DemacsLogo";

const footerGroups = [
  {
    title: "Affiliates",
    links: [
      { href: "/affiliates/leaderboard", label: "Leaderboards" },
      { href: "/affiliates/vip-rewards", label: "VIP rewards" },
    ],
  },
  {
    title: "Stream",
    links: [
      { href: "/stream/tournaments", label: "Tournaments" },
      { href: "/stream/bonus-hunters", label: "Bonus hunters" },
    ],
  },
] as const;

const footerLinkClass =
  "block rounded-md py-1.5 font-golos text-sm text-secondary/75 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-primary/50";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#030305]/55 backdrop-blur-md font-golos text-secondary/70">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030305]"
              aria-label="DEMACS home"
            >
              <DemacsWordmark logoClassName="h-full w-full object-contain drop-shadow-[0_0_14px_rgba(120,255,0,0.32)]" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary/65">
              Rewards, leaderboard, and VIP perks when you play with code{" "}
              <span className="font-semibold text-primary">demacskick</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://discord.gg/demacs"
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:border-primary/35 hover:text-primary"
                aria-label="Discord"
              >
                <FaDiscord className="size-5 shrink-0" aria-hidden />
              </Link>
              <Link
                href="https://kick.com/demacs"
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:border-primary/35 hover:text-primary"
                aria-label="Kick"
              >
                <FaKickstarterK className="size-5 shrink-0" aria-hidden />
              </Link>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="type-label font-sans text-xs uppercase text-white/90">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-0.5" role="list">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="type-label font-sans text-xs uppercase text-white/90">
              Site
            </h2>
            <ul className="mt-4 space-y-0.5" role="list">
              <li>
                <Link href="/" className={`${footerLinkClass} inline-flex items-center gap-2`}>
                  <IoHome className="size-4 shrink-0 opacity-60" aria-hidden />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className={`${footerLinkClass} inline-flex items-center gap-2`}>
                  <IoMail className="size-4 shrink-0 opacity-60" aria-hidden />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-center text-xs text-secondary/55 sm:text-left">
            © {year} DEMACS. 18+ only. Play responsibly. Third-party offers may change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
