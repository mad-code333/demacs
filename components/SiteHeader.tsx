"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { DemacsWordmark } from "./DemacsLogo";

const HEADER_H = "h-16";
const DISCORD_URL = "https://discord.gg/demacs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/affiliates/leaderboard", label: "Leaderboard" },
  { href: "/stream/bonus-hunters", label: "Bonuses" },
  { href: "/affiliates/vip-rewards", label: "VIP" },
  { href: "/stream/tournaments", label: "Stream" },
  { href: "/contact", label: "Contact" },
] as const;

function linkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return [
    "type-nav relative rounded-md px-2.5 py-2 font-sans text-[0.72rem] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]",
    active
      ? "text-primary after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-px after:bg-primary after:shadow-[0_0_8px_rgba(168,85,247,0.55)]"
      : "text-[#A1A1AA] hover:bg-white/[0.03] hover:text-white",
  ].join(" ");
}

function DiscordButton({ className }: { className?: string }) {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "type-btn inline-flex items-center justify-center gap-2 rounded-full border border-primary/45 bg-primary/15 px-4 py-2 font-sans text-[0.72rem] uppercase text-primary transition-all",
        "hover:border-primary/70 hover:bg-primary/25 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <FaDiscord className="size-4 shrink-0" aria-hidden />
      Discord
    </a>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        `sticky top-0 z-50 w-full backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${HEADER_H}`,
        pathname === "/" && !scrolled
          ? "border-b border-transparent bg-transparent"
          : "border-b border-white/[0.06] bg-[rgba(5,5,8,0.70)] shadow-[0_10px_32px_rgba(0,0,0,0.4)] backdrop-blur-[20px]",
      ].join(" ")}
    >
      <div className={`mx-auto flex ${HEADER_H} w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6`}>
        <Link
          href="/"
          className="group shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]"
          aria-label="DEMACS home"
        >
          <DemacsWordmark
            priority
            logoClassName="h-full w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(linkActive(item.href, pathname))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <DiscordButton />
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/4 text-white/90 transition-colors hover:border-white/20 lg:hidden"
          aria-expanded={open}
          aria-controls="site-header-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IoClose className="size-6" aria-hidden /> : <IoMenu className="size-6" aria-hidden />}
        </button>
      </div>

      <div
        id="site-header-drawer"
        className={[
          "fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-[#050507]/96 backdrop-blur-xl lg:hidden",
          "transition-[opacity,visibility] duration-200",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav
          className="flex max-h-[min(70vh,calc(100dvh-4rem))] flex-col gap-1 overflow-y-auto px-4 py-4 font-sans"
          aria-label="Main mobile"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="type-nav rounded-lg px-4 py-3.5 text-sm uppercase text-[#A1A1AA] transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-white/5 pt-3">
            <DiscordButton className="w-full" />
          </div>
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
