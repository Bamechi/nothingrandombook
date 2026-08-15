"use client";

import Link from "next/link";
import { CHALLENGE_PATH } from "@/lib/commerce";
import { COMPLETE_WORKBOOK_PDF } from "@/lib/workbooks";

/**
 * AFTER-PURCHASE ACCESS — the hub buyers land on after Shopify checkout.
 * The online experience unlocks with the code (444) delivered with the
 * Digital Experience and Bundle. The digital book PDF and the physical copy
 * are fulfilled through Shopify (email + Book Vault print-on-demand).
 */

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-black text-[var(--paper)]">
      <header className="px-5 pt-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="display text-lg leading-none">
            N<span className="text-[var(--red)]">*</span>R
          </Link>
          <Link href="/" className="ui-caps text-[10px] text-white/60 hover:text-white">
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <p className="ui-caps text-[10px] text-[var(--red)]">Thank you for your purchase</p>
        <h1 className="display mt-4 text-4xl sm:text-6xl">
          YOUR ACCESS<span className="text-[var(--red)]">.</span>
        </h1>
        <p className="serif-body mt-4 max-w-lg text-[15px] text-white/70">
          Everything you unlocked is below. Your access code and digital book are also emailed to
          you from the order confirmation.
        </p>

        {/* the code + enter experience */}
        <div className="mt-10 rounded-2xl border-2 border-[var(--red)] bg-[var(--red)]/[0.08] p-7">
          <p className="ui-caps text-[10px] text-[var(--red)]">Your experience access code</p>
          <p className="display mt-2 text-5xl tracking-[0.3em] text-white sm:text-6xl">444</p>
          <p className="serif-body mt-3 text-[14px] text-white/75">
            Enter the experience, read the first ten entries free, and use this code to unlock the
            rest — through Entry 117, the outro, and the author’s close.
          </p>
          <Link href="/experience" className="btn btn-red mt-5">
            Enter the Experience →
          </Link>
        </div>

        {/* the rest */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="display text-xl text-white sm:text-2xl">YOUR DIGITAL BOOK (PDF)</h2>
              <p className="serif-body mt-1.5 text-[13.5px] text-white/60">
                The complete book, delivered to your email from your Shopify order confirmation.
              </p>
            </div>
            <span className="btn btn-ghost-light shrink-0 cursor-default opacity-70">
              Sent by email
            </span>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="display text-xl text-white sm:text-2xl">REFLECTION WORKBOOKS</h2>
              <p className="serif-body mt-1.5 text-[13.5px] text-white/60">
                The five-part reflection system — download the full set or complete it online.
              </p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              <a href={COMPLETE_WORKBOOK_PDF} download className="btn btn-red">
                Download PDF
              </a>
              <Link href={CHALLENGE_PATH} className="btn btn-ghost-light">
                Do It Online
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="display text-xl text-white sm:text-2xl">YOUR PHYSICAL COPY</h2>
              <p className="serif-body mt-1.5 text-[13.5px] text-white/60">
                Printed on demand and shipped to the address on your order. Tracking arrives by
                email.
              </p>
            </div>
            <span className="btn btn-ghost-light shrink-0 cursor-default opacity-70">
              Shipping to you
            </span>
          </div>
        </div>

        <p className="serif-body mt-8 text-[13px] text-white/45">
          Bundle buyers get all three: the physical copy, the digital book PDF, and full online
          experience access. Trouble with anything? Reply to your order email.
        </p>
      </section>
    </main>
  );
}
