"use client";

import { useEffect, useState } from "react";
import type { PurchaseTarget } from "@/lib/commerce";
import { postLead } from "@/lib/leads";

/**
 * Branded Coming Soon state for formats whose store links are pending.
 * Stores notify requests locally until the mailing list is wired up.
 */
export default function ComingSoon({
  target,
  onClose,
}: {
  target: PurchaseTarget;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      const key = "nir-notify";
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push({ email, format: target.id, at: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {}
    postLead({ email, source: "Notify Me", productInterest: target.id });
    setSaved(true);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-label={`${target.label} coming soon`}
    >
      <button
        className="abs-fill bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md bg-[var(--paper)] text-[var(--ink)] p-8 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 h-1.5 w-full bg-[var(--red)]" />
        <p className="ui-caps text-[10px] text-[var(--red)]">Checkout opens soon</p>
        <h3 className="display mt-3 text-4xl sm:text-5xl">{target.label}</h3>
        <p className="display mt-2 text-2xl text-[var(--red)]">{target.price}</p>
        <p className="serif-body mt-4 text-[15px] text-[var(--ink)]/80">{target.detail}</p>

        {saved ? (
          <div className="mt-7 border border-[var(--ink)]/15 p-5">
            <p className="display text-xl text-[var(--red)]">You are on the list.</p>
            <p className="serif-body mt-2 text-sm text-[var(--ink)]/70">
              When the {target.label.toLowerCase()} edition goes live, this page lights up first.
              Watch @B_AMECHI for the announcement.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7">
            <label className="ui-caps text-[10px] text-[var(--ink)]/60" htmlFor="notify-email">
              Be first to know
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="notify-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-[var(--ink)]/25 bg-white/60 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)]"
              />
              <button type="submit" className="btn btn-red shrink-0">
                Notify me
              </button>
            </div>
          </form>
        )}

        <button
          onClick={onClose}
          className="ui-caps mt-6 text-[10px] text-[var(--ink)]/50 hover:text-[var(--ink)] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
