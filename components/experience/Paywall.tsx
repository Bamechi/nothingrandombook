"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PURCHASE, isLive, CHALLENGE_PATH } from "@/lib/commerce";
import { checkAccessCode, setUnlocked } from "@/lib/access";
import { postLead } from "@/lib/leads";
import { BundleCountdown } from "@/components/Commerce";
import ComingSoon from "@/components/ComingSoon";

/**
 * The paywall — a premium invitation to continue, never a wall.
 * Appears once the reader crosses Entry 10 without an unlock.
 * Three ways forward: an access code (code only — contact optional),
 * the Digital Experience or Bundle, or the free 7-day challenge.
 */
export default function Paywall({
  onUnlock,
  onReturn,
}: {
  onUnlock: () => void;
  onReturn: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<null | "digital" | "bundle">(null);

  const digital = PURCHASE.find((p) => p.id === "digital")!;
  const bundle = PURCHASE.find((p) => p.id === "bundle")!;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = gsap.fromTo(
      root.current!.querySelectorAll("[data-in]"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out", delay: 0.1 }
    );
    return () => {
      document.body.style.overflow = "";
      t.kill();
    };
  }, []);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAccessCode(code)) {
      setError("That code did not match. Check it and try again.");
      gsap.fromTo(".pw-code", { x: 0 }, { x: 8, duration: 0.06, repeat: 7, yoyo: true, clearProps: "x" });
      return;
    }
    setUnlocked();
    const c = contact.trim();
    const isEmail = c.includes("@");
    postLead({
      email: c && isEmail ? c : undefined,
      phone: c && !isEmail ? c : undefined,
      source: "Experience Unlock",
      accessCodeUsed: code.trim(),
      currentEntryReached: 10,
    });
    gsap
      .timeline({ onComplete: onUnlock })
      .to(".pw-flash", { opacity: 1, duration: 0.14 })
      .to(root.current, { opacity: 0, duration: 0.45 }, 0.2);
  };

  const buy = (which: "digital" | "bundle") => {
    const target = which === "digital" ? digital : bundle;
    postLead({ source: "Paywall Purchase Intent", productInterest: which });
    if (isLive(target.url)) window.open(target.url!, "_blank", "noopener");
    else setModal(which);
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[110] overflow-y-auto bg-black/92 text-[var(--paper)] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Continue the experience"
    >
      <div className="pw-flash abs-fill pointer-events-none bg-white opacity-0" />
      <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-5 py-14">
        <span data-in className="display text-5xl leading-none text-[var(--red)] select-none">
          *
        </span>
        <h2 data-in className="display mt-5 text-4xl sm:text-5xl">
          THE PATTERN CONTINUES<span className="text-[var(--red)]">.</span>
        </h2>
        <p data-in className="serif-body mt-3 max-w-xl text-[15px] text-[var(--paper)]/75">
          The first ten entries are yours, free. The remaining journey — through Entry 117,
          the outro, and the author’s close — is waiting. Choose how you continue.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* 1 — access code (code only; contact optional) */}
          <form
            data-in
            onSubmit={tryUnlock}
            className="flex flex-col rounded-2xl border border-[var(--ink)]/10 bg-white p-6 text-[var(--ink)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
          >
            <p className="ui-caps text-[10px] text-[var(--red)]">01 — I have an access code</p>
            <label className="ui-caps mt-5 block text-[9px] text-[var(--ink)]/50" htmlFor="pw-code">
              Access code
            </label>
            <input
              id="pw-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••"
              autoComplete="one-time-code"
              className="pw-code mt-1.5 w-full rounded-lg border border-[var(--ink)]/25 bg-white px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-sm tracking-[0.35em] text-[var(--ink)] outline-none focus:border-[var(--red)]"
            />
            <label className="ui-caps mt-4 block text-[9px] text-[var(--ink)]/50" htmlFor="pw-contact">
              Email or phone — optional
            </label>
            <input
              id="pw-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="so we can restore your access later"
              autoComplete="email"
              className="mt-1.5 w-full rounded-lg border border-[var(--ink)]/25 bg-white px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-sm text-[var(--ink)] outline-none focus:border-[var(--red)]"
            />
            {error && <p className="serif-body mt-3 text-[13px] text-[var(--red)]">{error}</p>}
            <button type="submit" className="btn btn-red mt-5 w-full justify-center">
              Continue Reading
            </button>
          </form>

          {/* 2 — buy (digital + bundle) */}
          <div data-in className="flex flex-col rounded-2xl border border-[var(--ink)]/10 bg-white p-6 text-[var(--ink)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
            <p className="ui-caps text-[10px] text-[var(--red)]">02 — Own it forever</p>
            <p className="display mt-4 text-2xl">
              {digital.label} <span className="text-[var(--red)]">{digital.price}</span>
            </p>
            <ul className="mt-3 space-y-1.5">
              {digital.includes.map((inc) => (
                <li key={inc} className="serif-body flex items-baseline gap-2 text-[13px] text-[var(--ink)]/70">
                  <span className="text-[var(--red)]">*</span>
                  {inc}
                </li>
              ))}
            </ul>
            <button onClick={() => buy("digital")} className="btn btn-red mt-4 w-full justify-center">
              {digital.button}
            </button>

            <div className="mt-4 rounded-xl border-2 border-[var(--red)] bg-[var(--red)]/[0.05] p-4">
              <div className="flex items-center gap-2">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
                <p className="ui-caps text-[9px] text-[var(--red)]">Best value — everything included</p>
              </div>
              <p className="display mt-1.5 text-xl">
                {bundle.label} <span className="text-[var(--red)]">{bundle.price}</span>
              </p>
              <div className="mt-1.5">
                <BundleCountdown />
              </div>
              <button onClick={() => buy("bundle")} className="btn btn-red mt-3 w-full justify-center">
                {bundle.button}
              </button>
            </div>
          </div>
        </div>

        {/* 3 — free challenge */}
        <Link
          data-in
          href={CHALLENGE_PATH}
          className="group mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-[var(--ink)]/10 bg-white p-6 text-[var(--ink)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] transition-colors hover:border-[var(--red)] sm:flex-row sm:items-center"
        >
          <div>
            <p className="ui-caps text-[10px] text-[var(--red)]">03 — Not ready to buy?</p>
            <p className="display mt-2 text-2xl sm:text-3xl">START THE FREE 7-DAY CHALLENGE</p>
            <p className="serif-body mt-1.5 text-[13px] text-[var(--ink)]/65">
              The NoThing Is Random reflection workbooks, free with your email. No purchase required.
            </p>
          </div>
          <span className="btn btn-red shrink-0">Start Free</span>
        </Link>

        <button
          data-in
          onClick={onReturn}
          className="ui-caps mt-8 self-start text-[10px] text-white/45 transition-colors hover:text-white"
        >
          ← Return to the free entries
        </button>
      </div>
      {modal && (
        <ComingSoon target={modal === "digital" ? digital : bundle} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
