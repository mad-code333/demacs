"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SessionUser = {
  userId: number;
  username: string;
  kickDisplayName: string | null;
  roobetUsername: string | null;
  registrationComplete: boolean;
};

const labelClass = "type-label mb-1.5 block font-sans text-[0.65rem] uppercase text-secondary/70";
const inputClass =
  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 font-golos text-sm text-white outline-none transition-colors placeholder:text-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/40";

export function RegisterCompleteForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [kickDisplayName, setKickDisplayName] = useState("");
  const [roobetUsername, setRoobetUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = (await res.json()) as { user: SessionUser | null };
        if (cancelled) return;
        const u = data.user;
        if (!u) {
          setSessionUser(null);
          setLoading(false);
          return;
        }
        if (u.registrationComplete) {
          router.replace("/");
          return;
        }
        setSessionUser(u);
        setKickDisplayName(u.kickDisplayName?.trim() || u.username);
        setRoobetUsername(u.roobetUsername?.trim() || "");
      } catch {
        if (!cancelled) setSessionUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/register/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ kickDisplayName, roobetUsername }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "request_failed");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("network_error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-md animate-pulse rounded-lg border border-white/5 bg-white/5 p-8">
        <div className="h-6 w-2/3 rounded bg-white/10" />
        <div className="mt-6 h-10 w-full rounded bg-white/10" />
        <div className="mt-4 h-10 w-full rounded bg-white/10" />
      </div>
    );
  }

  if (!sessionUser) {
    return (
      <div className="demacs-glass-panel mx-auto max-w-md rounded-lg p-8 text-center font-golos">
        <p className="text-sm text-secondary/80">Sign in with Kick first to finish registration.</p>
        <a
          href="/api/auth/kick?next=/register/complete"
          className="mt-4 inline-flex text-sm font-semibold uppercase tracking-wide text-primary hover:underline"
        >
          Log in with Kick
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="demacs-glass-panel mx-auto w-full max-w-md rounded-xl p-6 sm:p-8"
    >
      <h1 className="type-card-title font-sans text-xl text-white sm:text-2xl sm:font-bold">Complete registration</h1>
      <p className="mt-2 font-golos text-sm text-secondary/75">
        Add your Kick.com name and Roobet username. Letters, numbers, dots, underscores, and hyphens only (max 64
        characters each).
      </p>

      <div className="mt-6">
        <label htmlFor="kickDisplayName" className={labelClass}>
          Kick.com name
        </label>
        <input
          id="kickDisplayName"
          name="kickDisplayName"
          type="text"
          autoComplete="username"
          className={inputClass}
          value={kickDisplayName}
          onChange={(e) => setKickDisplayName(e.target.value)}
          maxLength={64}
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="roobetUsername" className={labelClass}>
          Roobet username
        </label>
        <input
          id="roobetUsername"
          name="roobetUsername"
          type="text"
          autoComplete="nickname"
          className={inputClass}
          value={roobetUsername}
          onChange={(e) => setRoobetUsername(e.target.value)}
          maxLength={64}
          required
        />
      </div>

      {error ? (
        <p className="mt-4 font-golos text-xs font-medium text-red-400/90" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="type-btn demacs-btn-primary mt-6 w-full rounded-md py-3 font-sans text-sm uppercase disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Save & continue"}
      </button>
    </form>
  );
}
