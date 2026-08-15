"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WORKBOOKS, COMPLETE_WORKBOOK_PDF, isLiveLink, type Workbook } from "@/lib/workbooks";
import { postLead } from "@/lib/leads";
import WorkbookRunner from "@/components/WorkbookRunner";

/**
 * THE FREE 7-DAY CHALLENGE — white "Put It To Work" page.
 * Six boxes (the complete set + five workbooks); each can be downloaded as
 * a PDF or completed online. A slim, optional email bar captures leads
 * without blocking access.
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

const ACCESS_KEY = "nir-challenge";

function DownloadBox({
  num,
  title,
  desc,
  pdf,
  onOpen,
  featured = false,
}: {
  num: string;
  title: string;
  desc: string;
  pdf: string;
  onOpen: () => void;
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
          <a
            href={pdf}
            download
            onClick={() => postLead({ source: "Free Download", selectedWorkbook: title, challengeAccessed: "yes" })}
            className="btn btn-red"
          >
            Download PDF
          </a>
        ) : (
          <span className="btn btn-ghost-dark cursor-not-allowed opacity-50">PDF Coming Soon</span>
        )}
        <button onClick={onOpen} className="btn btn-ghost-dark">
          Do It Online →
        </button>
      </div>
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

function EmailBar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem(ACCESS_KEY) || "{}");
      if (a?.email) setSaved(true);
    } catch {}
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      localStorage.setItem(ACCESS_KEY, JSON.stringify({ name: name.trim() || undefined, email: email.trim(), at: new Date().toISOString() }));
    } catch {}
    postLead({
      name: name.trim() || undefined,
      email: email.trim(),
      optInAuthorCommunityEmails: optIn ? "yes" : "no",
      source: "Free 7-Day Challenge",
      challengeAccessed: "yes",
    });
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="mt-8 rounded-2xl border border-[var(--red)]/40 bg-[var(--red)]/5 p-5 text-center">
        <p className="serif-body text-[14px] text-[var(--ink)]/80">
          You’re on the list. Your online progress and printable results are ready below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-2xl border border-[var(--ink)]/15 bg-white/60 p-6">
      <p className="ui-caps text-[10px] text-[var(--red)]">Optional — save your spot</p>
      <p className="serif-body mt-1 text-[14px] text-[var(--ink)]/75">
        Add your email to save your progress and get occasional notes from B. Amechi and the
        community. Everything below is free either way.
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          className="rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)] sm:w-40"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          className="flex-1 rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)]"
        />
        <button type="submit" className="btn btn-red shrink-0">
          Save My Spot
        </button>
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2.5">
        <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--red)]" />
        <span className="serif-body text-[13px] text-[var(--ink)]/70">
          Yes, I want occasional emails from B. Amechi and the community.
        </span>
      </label>
    </form>
  );
}

export default function ChallengePage() {
  const [active, setActive] = useState<Workbook | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Online workbook mode (light)
  if (active) {
    return (
      <main className="min-h-screen bg-[var(--paper)] px-5 py-8 text-[var(--ink)]">
        <WorkbookRunner wb={active} onExit={() => setActive(null)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="px-5 pt-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="display text-lg leading-none">
            N<span className="text-[var(--red)]">*</span>R
          </Link>
          <Link href="/" className="ui-caps text-[10px] text-[var(--ink)]/60 hover:text-[var(--ink)]">
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="ui-caps rounded-full bg-[var(--red)] px-3 py-1.5 text-[10px] text-white">100% Free</span>
          <p className="ui-caps text-[10px] text-[var(--red)]">The NoThing Is Random · No purchase required</p>
        </div>
        <h1 className="display mt-4 text-5xl sm:text-7xl">
          FREE 7-DAY CHALLENGE<span className="text-[var(--red)]">.</span>
        </h1>
        <p className="serif-body mt-5 max-w-2xl text-[16px] text-[var(--ink)]/80">
          Five reflection workbooks drawn from the book — connect the dots of your own life,
          reset your perspective, audit your energy, borrow a longer view, and spend seven days
          paying attention. Download them, print them, or complete them online and get your
          printable results back instantly.
        </p>

        <EmailBar />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <DownloadBox
            num="00"
            title="THE COMPLETE SET"
            desc="All five workbooks in one bound volume — ready to print or work through at your own pace."
            pdf={COMPLETE_WORKBOOK_PDF}
            onOpen={() => setActive(WORKBOOKS[0])}
            featured
          />
          {WORKBOOKS.map((w) => (
            <DownloadBox
              key={w.id}
              num={w.num}
              title={w.title}
              desc={DESCS[w.id] ?? w.tagline}
              pdf={w.pdfLink}
              onOpen={() => setActive(w)}
            />
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--ink)]/10 pt-8 text-center">
          <p className="serif-body text-[14px] text-[var(--ink)]/65">
            Ready for the full journey? The interactive experience begins free.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/experience" className="btn btn-red">
              Enter the Experience
            </Link>
            <Link href="/#formats" className="btn btn-ghost-dark">
              Get the Book
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
