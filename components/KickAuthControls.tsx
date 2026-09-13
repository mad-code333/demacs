"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  IoChevronDown,
  IoClose,
  IoCreateOutline,
  IoLogOutOutline,
  IoOpenOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SiKick } from "react-icons/si";
import { PrimaryButton } from "./PrimaryButton";

type SessionUser = {
  userId: number;
  username: string;
  kickDisplayName: string | null;
  roobetUsername: string | null;
  registrationComplete: boolean;
};

const dropdownPanelClass =
  "rounded-xl border border-white/10 bg-[#08080c]/95 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl";

const menuItemClass =
  "flex w-full items-center gap-2 border-0 bg-transparent px-4 py-2.5 text-left font-golos text-[0.7rem] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/5";

const profileTriggerClass =
  "flex max-w-[200px] items-center gap-1.5 rounded-md px-3 py-2 font-golos text-xs font-semibold uppercase tracking-wider text-secondary/70 outline-none transition-colors hover:text-white/90 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508] group-hover:text-white";

const dropdownWrapClass = [
  "pointer-events-none invisible absolute right-0 top-full z-50 min-w-[220px] pt-2 opacity-0 transition-[opacity,visibility,transform] duration-200 ease-out",
  "translate-y-1 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
  "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
].join(" ");

function ProfileModal({ user, open, onClose }: { user: SessionUser; open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const kickChannelUrl = `https://kick.com/${encodeURIComponent(user.username)}`;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        aria-label="Close profile dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-[#08080c] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="profile-modal-title" className="type-card-title font-sans text-xl text-white sm:font-bold">
            Profile
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="rounded-md border border-white/10 p-2 text-secondary/80 transition-colors hover:border-white/20 hover:text-white"
            aria-label="Close"
            onClick={onClose}
          >
            <IoClose className="size-5" aria-hidden />
          </button>
        </div>

        <dl className="mt-6 space-y-4 font-golos text-sm">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-secondary/55">Kick (OAuth)</dt>
            <dd className="mt-1 font-semibold text-white">{user.username}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-secondary/55">Kick.com name</dt>
            <dd className="mt-1 text-white/90">{user.kickDisplayName?.trim() || "—"}</dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-secondary/55">Roobet username</dt>
            <dd className="mt-1 text-white/90">{user.roobetUsername?.trim() || "—"}</dd>
          </div>
          {!user.registrationComplete ? (
            <p className="rounded-md border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/90">
              Finish signup to save your Kick and Roobet details on your account.
            </p>
          ) : null}
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {!user.registrationComplete ? (
            <Link
              href="/register/complete"
              className="inline-flex items-center gap-2 rounded-md border border-amber-500/35 bg-amber-500/10 px-3 py-2 font-golos text-xs font-semibold uppercase tracking-wide text-amber-100 transition-colors hover:bg-amber-500/15"
              onClick={onClose}
            >
              <IoCreateOutline className="size-4" aria-hidden />
              Finish signup
            </Link>
          ) : null}
          <Link
            href={kickChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 font-golos text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            onClick={onClose}
          >
            <IoOpenOutline className="size-4" aria-hidden />
            Kick channel
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export type KickAuthControlsProps = {
  className?: string;
  /** `toolbar`: hover profile menu (desktop). `drawer`: accordion (mobile nav). */
  variant?: "toolbar" | "drawer";
  /** Mobile drawer: run after in-drawer navigation (client callback; name satisfies Next prop lint). */
  onNavigateAction?: () => void;
};

export function KickAuthControls({
  className,
  variant = "toolbar",
  onNavigateAction,
}: KickAuthControlsProps) {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);
  const [drawerProfileOpen, setDrawerProfileOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  async function openProfileModal() {
    try {
      const res = await fetch("/api/auth/session", { credentials: "include" });
      const data = (await res.json()) as { user: SessionUser | null };
      if (data.user) setUser(data.user);
    } catch {
      /* keep existing user */
    }
    setProfileModalOpen(true);
    if (variant === "drawer") {
      onNavigateAction?.();
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = (await res.json()) as { user: SessionUser | null };
        if (!cancelled) setUser(data.user ?? null);
      } catch {
        if (!cancelled) setUser(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (user === undefined) {
    return (
      <div className={["h-9 w-[120px] shrink-0 animate-pulse rounded-[4px] bg-white/5", className].filter(Boolean).join(" ")} />
    );
  }

  if (user) {
    const kickChannelUrl = `https://kick.com/${encodeURIComponent(user.username)}`;

    if (variant === "drawer") {
      return (
        <>
          <div className={["rounded-lg border border-white/5 bg-white/2", className].filter(Boolean).join(" ")}>
            <button
              type="button"
              className={[
                "flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-white",
              ].join(" ")}
              aria-expanded={drawerProfileOpen}
              onClick={() => setDrawerProfileOpen((v) => !v)}
            >
              <span className="flex min-w-0 items-center gap-3">
                <SiKick className="size-5 shrink-0 text-[#53FC18]" aria-hidden />
                <span className="truncate">Account</span>
              </span>
              <IoChevronDown
                className={["size-5 shrink-0 text-primary/80 transition-transform", drawerProfileOpen ? "rotate-180" : ""].join(
                  " ",
                )}
                aria-hidden
              />
            </button>
            {drawerProfileOpen ? (
              <div className="border-t border-white/5 px-2 pb-2 pt-1">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/95 transition-colors hover:bg-white/5"
                  onClick={() => void openProfileModal()}
                >
                  <IoPersonOutline className="size-4 shrink-0 opacity-70" aria-hidden />
                  Profile
                </button>
                {!user.registrationComplete ? (
                  <Link
                    href="/register/complete"
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-200/95 transition-colors hover:bg-white/5"
                    onClick={onNavigateAction}
                  >
                    <IoCreateOutline className="size-4 shrink-0 opacity-80" aria-hidden />
                    Finish signup
                  </Link>
                ) : null}
                <Link
                  href={kickChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/95 transition-colors hover:bg-white/5"
                  onClick={onNavigateAction}
                >
                  <IoOpenOutline className="size-4 shrink-0 opacity-70" aria-hidden />
                  Kick channel
                </Link>
                <a
                  href="/api/auth/kick/logout?next=/"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/95 transition-colors hover:bg-white/5"
                  onClick={onNavigateAction}
                >
                  <IoLogOutOutline className="size-4 shrink-0 opacity-70" aria-hidden />
                  Log out
                </a>
              </div>
            ) : null}
          </div>
          <ProfileModal user={user} open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
        </>
      );
    }

    return (
      <>
        <div className={["relative shrink-0", className].filter(Boolean).join(" ")}>
          <div className="group relative">
            <button type="button" className={profileTriggerClass} aria-haspopup="menu" aria-label="Account menu">
              <SiKick className="size-3.5 shrink-0 text-[#53FC18]" aria-hidden />
              <span className="min-w-0 truncate">{user.username}</span>
              <IoChevronDown
                className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden
              />
            </button>
            <div className={dropdownWrapClass} role="presentation">
              <div className={dropdownPanelClass} role="menu" aria-label="Account menu">
                <button type="button" role="menuitem" className={menuItemClass} onClick={() => void openProfileModal()}>
                  <IoPersonOutline className="size-3.5 shrink-0 opacity-60" aria-hidden />
                  Profile
                </button>
                {!user.registrationComplete ? (
                  <Link href="/register/complete" role="menuitem" className={menuItemClass}>
                    <IoCreateOutline className="size-3.5 shrink-0 opacity-60" aria-hidden />
                    Finish signup
                  </Link>
                ) : null}
                <Link
                  href={kickChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  className={menuItemClass}
                >
                  <IoOpenOutline className="size-3.5 shrink-0 opacity-60" aria-hidden />
                  Kick channel
                </Link>
                <a href="/api/auth/kick/logout?next=/" role="menuitem" className={menuItemClass}>
                  <IoLogOutOutline className="size-3.5 shrink-0 opacity-60" aria-hidden />
                  Log out
                </a>
              </div>
            </div>
          </div>
        </div>
        <ProfileModal user={user} open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      </>
    );
  }

  return (
    <div className={[variant === "drawer" ? "w-full" : "", className].filter(Boolean).join(" ")}>
      <PrimaryButton
        href="/api/auth/kick?next=/"
        size="sm"
        animated={false}
        nativeAnchor
        className={variant === "drawer" ? "w-full" : undefined}
      >
        <SiKick className="size-4 shrink-0" aria-hidden />
        Log in
      </PrimaryButton>
    </div>
  );
}
