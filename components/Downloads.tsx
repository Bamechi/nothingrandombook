"use client";

import Link from "next/link";
import { WORKBOOKS, COMPLETE_WORKBOOK_PDF, isLiveLink } from "@/lib/workbooks";
import { CHALLENGE_PATH } from "@/lib/commerce";
import { postLead } from "@/lib/leads";

/**
 * PUT IT TO WORK — the free companion downloads.
 * The complete bound volume ("00") plus the five reflection workbooks, all
 * free. Real files served from /public/downloads; also completable online.
 */

const DESCS: Record<string, string> = {
  "connect-the-dots": "Revisit something that once felt random and examine what it means now.",
  "ten-things-going-right":
    "A perspective reset for identifying ten things that are right—not necessarily perfect.",
  "focus-eliminate": "A four-box exercise for deciding what to focus on, delegate, practice, or eliminate.",
  "your-80-year-old-self": "A decision guide for seeing today through the eyes of your future self.",
  "seven-days-of-paying-attention":
    "Seven daily assignments built around noticing, revisiting, reaching out, deciding, speaking, giving, and reflecting.",
};

function track(label: string) {
  postLead({ source: "Free Download", selectedWorkbook: label, challengeAccessed: "yes" });
}

function DownloadCard({
  num,
  title,
  desc,
  pdf,
  featured = false,
}: {
  num: string;
  title: string;
  desc: string;
  pdf: string;
  featured?: boolean;
}) {
  const live = isLiveLink(pdf);
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition-colors ${
        featured ? "border-2 border-[var(--red)] bg-white/60" : "border-[var(--ink)]/15 bg-white/55 hover:border-[var(--ink)]/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="display text-lg text-[var(--red)]">{num}</span>
        <span className="ui-caps text-[8.5px] tracking-[0.15em] text-[var(--red)]">Free</span>
      </div>
      <h3 className="display mt-2 text-2xl leading-tight sm:text-3xl">{title}</h3>
      <p className="serif-body mt-3 flex-1 text-[14px] text-[var(--ink)]/75">{desc}</p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {live ? (
          <a href={pdf} download onClick={() => track(title)} className="btn btn-red">
            Download PDF
          </a>
        ) : (
          <span className="btn btn-ghost-dark cursor-not-allowed opacity-50">PDF Coming Soon</span>
        )}
        <Link href={CHALLENGE_PATH} className="btn btn-ghost-dark">
          Do It Online →
        </Link>
      </div>
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="flex flex-wrap items-center gap-3">
          <span className="ui-caps rounded-full bg-[var(--red)] px-3 py-1.5 text-[10px] text-white">
            100% Free
          </span>
          <p className="ui-caps text-[10px] text-[var(--red)]">Companion Tools · No purchase required</p>
        </div>
        <h2 className="display mt-4 text-5xl sm:text-6xl md:text-7xl">
          PUT IT TO WORK<span className="text-[var(--red)]">.</span>
        </h2>
        <p className="serif-body mt-5 max-w-xl text-[15px] text-[var(--ink)]/75">
          Five free reflection workbooks drawn from the entries — download them, print them, or
          complete them online and get your printable results back instantly.
        </p>

        {/* complete volume — do it online CTA */}
        <div className="mt-10 flex flex-col justify-between gap-6 rounded-2xl border-2 border-[var(--red)] p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <span className="ui-caps rounded-full bg-[var(--red)] px-2.5 py-1 text-[9px] text-white">
              The full experience · Free
            </span>
            <h3 className="display mt-3 text-3xl sm:text-4xl">THE COMPLETE REFLECTION WORKBOOK</h3>
            <p className="serif-body mt-2 max-w-lg text-[14px] text-[var(--ink)]/75">
              All five exercises in one — complete them on your screen and download your
              personalized, printable results. No account, no purchase.
            </p>
          </div>
          <Link href={CHALLENGE_PATH} className="btn btn-red shrink-0 px-10 py-5 text-sm sm:text-base">
            Start Online for Free →
          </Link>
        </div>

        {/* the boxes — 00 complete + 01–05 */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DownloadCard
            num="00"
            title="THE COMPLETE SET"
            desc="All five workbooks in one bound volume — ready to print or work through at your own pace."
            pdf={COMPLETE_WORKBOOK_PDF}
            featured
          />
          {WORKBOOKS.map((w) => (
            <DownloadCard
              key={w.id}
              num={w.num}
              title={w.title}
              desc={DESCS[w.id] ?? w.tagline}
              pdf={w.pdfLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
