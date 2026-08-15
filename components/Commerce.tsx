"use client";

import { useEffect, useState } from "react";
import { PURCHASE, isLive, type PurchaseTarget } from "@/lib/commerce";
import { msRemaining, formatRemaining } from "@/lib/countdown";
import { postLead } from "@/lib/leads";
import ComingSoon from "@/components/ComingSoon";

/* ---------- 48-hour bundle countdown ---------- */

export function useBundleCountdown() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setMs(msRemaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return ms; // null until mounted (SSR-safe)
}

export function BundleCountdown({ light = false, onDark = false }: { light?: boolean; onDark?: boolean }) {
  const ms = useBundleCountdown();
  if (ms === null) return null;
  const labelClass = onDark ? "text-white/80" : light ? "text-white/85" : "text-[var(--ink)]/80";
  const numClass = onDark ? "text-white" : "text-[var(--red)]";
  if (ms <= 0) {
    return <p className={`ui-caps text-[10px] ${labelClass}`}>Bundle Offer Expired</p>;
  }
  return (
    <p className={`ui-caps text-[10px] ${labelClass}`}>
      Limited Bundle Offer Ends In:{" "}
      <span className={`display text-base tracking-widest tabular-nums ${numClass}`}>
        {formatRemaining(ms)}
      </span>
    </p>
  );
}

/* ---------- product cards ---------- */

export function ProductCard({
  target,
  index,
  dark = false,
  compact = false,
  featured = false,
}: {
  target: PurchaseTarget;
  index?: number;
  dark?: boolean;
  compact?: boolean;
  featured?: boolean;
}) {
  const [modal, setModal] = useState(false);
  const ms = useBundleCountdown();
  const expired = target.limited && ms !== null && ms <= 0;

  const buy = () => {
    postLead({ source: "Purchase Intent", productInterest: target.id });
    if (isLive(target.url)) {
      window.open(target.url!, "_blank", "noopener");
    } else {
      setModal(true);
    }
  };

  // The featured bundle card: red field, breathing motion, front-and-center.
  if (featured) {
    return (
      <div
        className={`bundle-live group relative flex flex-col overflow-hidden rounded-2xl border-2 border-[var(--red)] bg-[var(--red)] p-7 text-left text-white shadow-[0_24px_60px_-30px_rgba(208,32,42,0.55)] sm:p-8 ${
          compact ? "" : "md:z-10 md:scale-[1.02]"
        }`}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-white" />
          <span className="ui-caps text-[10px] tracking-[0.2em] text-white/90">Best value — most popular</span>
        </div>
        <h3 className="display text-4xl leading-none sm:text-5xl">{target.label}</h3>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="display text-4xl sm:text-5xl">{target.price}</span>
          <span className="ui-caps text-[10px] text-white/75">everything included</span>
        </div>
        <p className="serif-body mt-3 text-[14px] text-white/90">{target.detail}</p>
        <ul className="mt-4 space-y-1.5">
          {target.includes.map((inc) => (
            <li key={inc} className="serif-body flex items-baseline gap-2 text-[13.5px] text-white/90">
              <span className="text-white">✓</span>
              {inc}
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-lg border border-white/15 bg-[#4a0a0e] px-3 py-2.5">
          <BundleCountdown onDark />
        </div>
        <div className="mt-auto pt-6">
          <button
            onClick={buy}
            disabled={!!expired}
            className={`btn w-full justify-center border-white bg-white text-[var(--red)] hover:bg-white/90 ${
              expired ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {expired ? "Bundle Offer Expired" : target.button}
          </button>
        </div>
        {modal && <ComingSoon target={target} onClose={() => setModal(false)} />}
      </div>
    );
  }

  const frame = dark
    ? "border-white/20 bg-white/[0.04] hover:border-white/60"
    : "border-[var(--ink)]/15 bg-white/50 hover:border-[var(--ink)]";
  const inkText = dark ? "text-white" : "text-[var(--ink)]";
  const dimText = dark ? "text-white/65" : "text-[var(--ink)]/65";

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 text-left transition-all duration-500 sm:p-8 ${frame} ${
        target.limited ? "ring-1 ring-[var(--red)]/60" : ""
      }`}
    >
      {target.limited && (
        <span className="absolute right-0 top-0 bg-[var(--red)] px-3 py-1.5">
          <span className="ui-caps text-[9px] text-white">Limited Time</span>
        </span>
      )}
      {typeof index === "number" && (
        <span className="display text-lg text-[var(--red)]">0{index + 1}</span>
      )}
      <h3 className={`display mt-1 text-3xl leading-none sm:text-4xl ${inkText} ${compact ? "text-2xl sm:text-3xl" : ""}`}>
        {target.label}
      </h3>
      <p className="display mt-2 text-2xl text-[var(--red)]">{target.price}</p>
      <p className={`serif-body mt-3 text-sm ${dimText}`}>{target.detail}</p>
      {!compact && (
        <ul className="mt-4 space-y-1.5">
          {target.includes.map((inc) => (
            <li key={inc} className={`serif-body flex items-baseline gap-2 text-[13px] ${dimText}`}>
              <span className="text-[var(--red)]">*</span>
              {inc}
            </li>
          ))}
        </ul>
      )}
      {target.limited && (
        <div className="mt-4">
          <BundleCountdown light={dark} />
        </div>
      )}
      <div className="mt-auto pt-6">
        <button
          onClick={buy}
          disabled={!!expired}
          className={`btn w-full justify-center ${
            expired ? "cursor-not-allowed opacity-40 btn-ghost-dark" : "btn-red"
          }`}
        >
          {expired ? "Bundle Offer Expired" : target.button}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />
      {modal && <ComingSoon target={target} onClose={() => setModal(false)} />}
    </div>
  );
}

export function ProductGrid({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  // Bundle sits in the middle, featured; physical + digital flank it.
  const physical = PURCHASE.find((p) => p.id === "physical")!;
  const digital = PURCHASE.find((p) => p.id === "digital")!;
  const bundle = PURCHASE.find((p) => p.id === "bundle")!;
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-3 md:items-center">
      <ProductCard target={physical} dark={dark} compact={compact} />
      <ProductCard target={bundle} dark={dark} compact={compact} featured />
      <ProductCard target={digital} dark={dark} compact={compact} />
    </div>
  );
}
