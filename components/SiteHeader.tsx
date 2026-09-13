"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { DemacsWordmark } from "./DemacsLogo";
import { KickAuthControls } from "./KickAuthControls";

const HEADER_H = "h-16";

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
    "type-nav rounded-md px-2.5 py-2 font-sans text-[0.72rem] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030504]",
    active ? "text-primary" : "text-[#D8DDD8]/80 hover:text-white",
  ].join(" ");
}

function LivePill({ className }: { className?: string }) {
  return (
    <a
      href="https://kick.com/demacs"
      className={[
        "type-label inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-sans text-[0.65rem] uppercase text-primary transition-colors hover:border-primary/45 hover:bg-primary/15",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      Live
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
          : "border-b border-primary/15 bg-[#030504]/72 shadow-[0_10px_32px_rgba(0,0,0,0.35),0_1px_0_rgba(120,255,0,0.08)]",
      ].join(" ")}
    >
      <div className={`mx-auto flex ${HEADER_H} w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6`}>
        <Link
          href="/"
          className="group shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030504]"
          aria-label="DEMACS home"
        >
          <DemacsWordmark
            logoClassName="h-8 w-auto max-w-[150px] drop-shadow-[0_0_14px_rgba(120,255,0,0.2)] sm:h-9 sm:max-w-[170px]"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(linkActive(item.href, pathname))}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LivePill />
          <KickAuthControls variant="toolbar" />
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
          "fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-[#030504]/96 backdrop-blur-xl lg:hidden",
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
              className="type-nav rounded-lg px-4 py-3.5 text-sm uppercase text-[#D8DDD8] transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex w-full flex-col gap-3 border-t border-white/5 pt-3">
            <LivePill className="w-fit" />
            <KickAuthControls variant="drawer" className="w-full" onNavigateAction={() => setOpen(false)} />
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
