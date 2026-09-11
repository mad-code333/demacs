"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  IoChevronDown,
  IoClose,
  IoFlag,
  IoFlame,
  IoGift,
  IoHome,
  IoMail,
  IoMenu,
  IoPeople,
  IoTrophy,
  IoVideocam,
} from "react-icons/io5";
import { KickAuthControls } from "./KickAuthControls";

const HEADER_H = "h-[78px]";

type NavMenuItem = { href: string; label: string; Icon: IconType };

type NavEntry =
  | { kind: "link"; href: string; label: string; Icon: IconType }
  | { kind: "menu"; label: string; href: string; Icon: IconType; items: NavMenuItem[] };

const navEntries: NavEntry[] = [
  { kind: "link", href: "/", label: "Home", Icon: IoHome },
  {
    kind: "menu",
    label: "Affiliates",
    href: "/affiliates",
    Icon: IoPeople,
    items: [
      { href: "/affiliates/leaderboard", label: "Leaderboards", Icon: IoTrophy },
      { href: "/affiliates/vip-rewards", label: "VIP rewards", Icon: IoGift },
    ],
  },
  {
    kind: "menu",
    label: "Stream",
    href: "/stream",
    Icon: IoVideocam,
    items: [
      { href: "/stream/tournaments", label: "Tournaments", Icon: IoFlag },
      { href: "/stream/bonus-hunters", label: "Bonus hunters", Icon: IoFlame },
    ],
  },
  { kind: "link", href: "/contact", label: "Contact", Icon: IoMail },
];

function linkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isMenuBranchActive(href: string, items: NavMenuItem[], pathname: string) {
  if (linkActive(href, pathname)) return true;
  return items.some((item) => linkActive(item.href, pathname));
}

function navLinkClass(active: boolean) {
  return [
    "flex items-center gap-1.5 rounded-md px-3 py-2 font-golos text-xs font-semibold uppercase tracking-wider transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]",
    active
      ? "text-white"
      : "text-secondary/70 hover:text-white/90",
  ].join(" ");
}

function DesktopNavDropdown({
  Icon,
  label,
  href,
  items,
  pathname,
}: {
  Icon: IconType;
  label: string;
  href: string;
  items: NavMenuItem[];
  pathname: string;
}) {
  const active = isMenuBranchActive(href, items, pathname);

  return (
    <div className="group relative">
      <button className={navLinkClass(active)} aria-haspopup="true">
        <Icon className="size-3.5 shrink-0 opacity-70" aria-hidden />
        {label}
        <IoChevronDown
          className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden
        />
      </button>
      <div
        className={[
          "pointer-events-none invisible absolute left-0 top-full z-50 min-w-[200px] pt-2 opacity-0 transition-[opacity,visibility,transform] duration-200 ease-out",
          "translate-y-1 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
        ].join(" ")}
        role="presentation"
      >
        <div
          className="rounded-xl border border-white/10 bg-[#08080c]/95 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          role="menu"
          aria-label={`${label} menu`}
        >
          {items.map((item) => {
            const itemActive = linkActive(item.href, pathname);
            const ItemIcon = item.Icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className={[
                  "flex items-center gap-2 px-4 py-2.5 font-golos text-[0.7rem] font-semibold uppercase tracking-wider text-white transition-colors",
                  itemActive ? "bg-white/6" : "hover:bg-white/5",
                ].join(" ")}
              >
                <ItemIcon className="size-3.5 shrink-0 opacity-60" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);

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

  const closeDrawer = () => {
    setOpen(false);
    setMobileOpenMenu(null);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl backdrop-saturate-150 ${HEADER_H}`}
    >
      <div className={`mx-auto flex ${HEADER_H} w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6`}>
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508] rounded-sm"
          aria-label="Gambanator home"
        >
          <span className="font-sports text-[1.35rem] leading-none tracking-tight text-white">
            GAMBA<span className="text-primary">NATOR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navEntries.map((entry) => {
            if (entry.kind === "link") {
              const active = linkActive(entry.href, pathname);
              const LinkIcon = entry.Icon;
              return (
                <Link key={entry.href} href={entry.href} className={navLinkClass(active)}>
                  <LinkIcon className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  {entry.label}
                </Link>
              );
            }
            return (
              <DesktopNavDropdown
                key={entry.label}
                Icon={entry.Icon}
                label={entry.label}
                href={entry.href}
                items={entry.items}
                pathname={pathname}
              />
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <KickAuthControls variant="toolbar" />
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/4 text-white/90 transition-colors hover:border-white/20 md:hidden"
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
          "fixed inset-x-0 top-[78px] z-40 border-b border-white/5 bg-[#050508]/95 backdrop-blur-xl md:hidden",
          "transition-[opacity,visibility] duration-200",
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <nav className="flex max-h-[min(70vh,calc(100dvh-78px))] flex-col gap-1 overflow-y-auto px-4 py-4 font-golos" aria-label="Main mobile">
          {navEntries.map((entry) => {
            if (entry.kind === "link") {
              const LinkIcon = entry.Icon;
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className="flex items-center gap-3 rounded-lg border border-transparent px-4 py-3.5 text-sm font-semibold uppercase tracking-wide text-secondary/80 transition-colors hover:border-white/10 hover:text-white"
                  onClick={closeDrawer}
                >
                  <LinkIcon className="size-5 shrink-0 text-primary/80" aria-hidden />
                  {entry.label}
                </Link>
              );
            }

            const expanded = mobileOpenMenu === entry.label;
            const branchActive = isMenuBranchActive(entry.href, entry.items, pathname);
            const MenuIcon = entry.Icon;

            return (
              <div key={entry.label} className="rounded-lg border border-white/5 bg-white/2">
                <button
                  type="button"
                  className={[
                    "flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-wide transition-colors",
                    branchActive ? "text-white" : "text-secondary/80 hover:text-white",
                  ].join(" ")}
                  aria-expanded={expanded}
                  onClick={() => setMobileOpenMenu((v) => (v === entry.label ? null : entry.label))}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <MenuIcon className="size-5 shrink-0 text-primary/80" aria-hidden />
                    {entry.label}
                  </span>
                  <IoChevronDown
                    className={["size-5 shrink-0 text-primary/80 transition-transform", expanded ? "rotate-180" : ""].join(
                      " ",
                    )}
                    aria-hidden
                  />
                </button>
                {expanded ? (
                  <div className="border-t border-white/5 px-2 pb-2 pt-1">
                    {entry.items.map((item) => {
                      const ItemIcon = item.Icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/95 transition-colors hover:bg-white/5"
                          onClick={closeDrawer}
                        >
                          <ItemIcon className="size-4 shrink-0 opacity-70" aria-hidden />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className="mt-3 flex w-full flex-col gap-3 border-t border-white/5 pt-3">
            <KickAuthControls variant="drawer" className="w-full" onNavigateAction={() => setOpen(false)} />
          </div>
        </nav>
      </div>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-[78px] z-30 bg-black/50 md:hidden"
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
