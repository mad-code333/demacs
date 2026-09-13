"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const labelClass = "type-label mb-1.5 block font-sans text-[0.65rem] uppercase text-secondary/70";
const inputClass =
  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 font-golos text-sm text-white outline-none transition-colors placeholder:text-secondary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/40";
const textareaClass = `${inputClass} min-h-[140px] resize-y`;

const errorLabels: Record<string, string> = {
  invalid_json: "Something went wrong. Please try again.",
  invalid_name: "Please enter your name (max 120 characters).",
  invalid_email: "Please enter a valid email address.",
  invalid_message: "Please enter a message (max 4000 characters).",
  database_error: "We could not save your message right now. Try Discord or Kick, or email us later.",
  network_error: "Network error. Check your connection and try again.",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(errorLabels[data.error || ""] || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError(errorLabels.network_error);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <motion.div
        className="rounded-xl border border-white/10 bg-[#08080c]/90 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
        role="status"
      >
        <h2 className="type-card-title font-sans text-xl text-white sm:text-2xl sm:font-bold">Message received</h2>
        <p className="mt-3 font-golos text-sm leading-relaxed text-secondary/80">
          Thanks for reaching out. We will get back to you as soon as we can.
        </p>
        <button
          type="button"
          className="mt-6 font-golos text-sm font-semibold uppercase tracking-wide text-primary underline-offset-4 hover:underline"
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-white/10 bg-[#08080c]/90 p-6"
    >
      <h2 className="type-card-title font-sans text-xl text-white sm:text-2xl sm:font-bold">Send a message</h2>
      <p className="mt-2 font-golos text-sm text-secondary/75">
        Partnerships, support, or general questions — fill in the form and we will reply by email.
      </p>

      <div className="mt-6">
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={120}
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          required
        />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={textareaClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={4000}
          required
          rows={5}
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
        className="mt-6 w-full rounded-md border border-[#9dff4a] bg-primary py-3 font-golos text-sm font-semibold uppercase tracking-wide text-[#061000] shadow-btn-primary transition-[border-color,background-color,transform] hover:border-[#c8ff8a] hover:bg-[#9dff4a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
