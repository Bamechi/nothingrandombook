"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOOK, AUTHOR, FAQ } from "@/lib/content";
import { CHALLENGE_PATH } from "@/lib/commerce";
import { ProductGrid, BundleCountdown } from "@/components/Commerce";

gsap.registerPlugin(ScrollTrigger);

/* ---------- shared reveal helper ---------- */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const tweens: gsap.core.Tween[] = [];
    targets.forEach((t) => {
      tweens.push(
        gsap.fromTo(
          t,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: t, start: "top 88%" },
          }
        )
      );
    });
    return () => tweens.forEach((t) => t.scrollTrigger?.kill() ?? t.kill());
  }, [ref]);
}

/* ---------- THE BOOK ---------- */
export function AboutBook() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector<HTMLElement>(".about-art");
    if (!img) return;
    const tween = gsap.fromTo(
      img,
      { yPercent: 10, rotate: -3 },
      {
        yPercent: -10,
        rotate: 2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="book" ref={ref} className="relative bg-[var(--paper)] text-[var(--ink)] overflow-hidden">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:py-36">
        <div className="relative">
          <p data-reveal className="ui-caps text-[10px] text-[var(--red)]">
            The Book
          </p>
          <h2 data-reveal className="display mt-4 text-5xl sm:text-6xl md:text-7xl">
            LIFE IS
            <br />
            SPEAKING<span className="text-[var(--red)]">.</span>
          </h2>
          <div className="mt-8 space-y-5">
            {BOOK.blurb.map((p, i) => (
              <p key={i} data-reveal className="serif-body text-[16px] text-[var(--ink)]/85">
                {p}
              </p>
            ))}
          </div>

          {/* Enter the Experience — fitted to this column */}
          <Link
            href="/experience"
            data-reveal
            className="group relative mt-12 block overflow-hidden rounded-2xl bg-[var(--ink)] p-8 text-[var(--paper)] sm:p-10"
          >
            <div
              className="abs-fill opacity-30 transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: "url(/images/env/city-aerial.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="ui-caps text-[10px] text-[var(--red)]">Begin free — no code required</p>
                <h3 className="display mt-3 text-4xl sm:text-5xl">
                  ENTER THE EXPERIENCE<span className="text-[var(--red)]">.</span>
                </h3>
                <p className="serif-body mt-3 max-w-md text-[15px] text-[var(--paper)]/80">
                  The book as a cinematic journey — your scroll is the camera. The first ten
                  entries are free.
                </p>
              </div>
              <span className="btn btn-red shrink-0 px-9 py-4 text-sm shadow-[0_18px_44px_-18px_rgba(208,32,42,0.75)] sm:text-base">
                START NOW →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- NONE OF US ARRIVE ALONE ---------- */
export function Ancestors() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bg = el.querySelector<HTMLElement>(".anc-bg");
    if (!bg) return;
    const tween = gsap.fromTo(
      bg,
      { scale: 1.18, yPercent: 6 },
      {
        scale: 1,
        yPercent: -4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.4 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      {/* the ancestors, large and present behind the dedication */}
      <div
        className="anc-bg abs-fill gpu opacity-60"
        style={{
          backgroundImage: "url(/images/book/ancestors-v4.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
        }}
      />
      {/* subtle atmospheric darkening for readability only — no panels */}
      <div className="abs-fill bg-black/30" />
      <div className="abs-fill bg-gradient-to-b from-[var(--ink)] via-transparent to-[var(--ink)]" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 sm:py-40 text-center">
        <h2 data-reveal className="display text-5xl sm:text-7xl">
          {BOOK.foreword.lead}
        </h2>
        <p data-reveal className="serif-body mt-2 text-2xl sm:text-3xl italic">
          {BOOK.foreword.leadItalic}
        </p>
        <div className="mt-10 space-y-2">
          {BOOK.foreword.lines.map((l) => (
            <p key={l} data-reveal className="serif-body text-[15px] sm:text-lg text-[var(--paper)]/85">
              {l}
            </p>
          ))}
        </div>
        <div data-reveal className="mx-auto mt-10 h-px w-16 bg-[var(--red)]" />
        <div className="mt-10 space-y-1">
          {BOOK.foreword.close.map((l) => (
            <p key={l} data-reveal className="serif-body text-[14px] sm:text-[15px] text-[var(--paper)]/70">
              {l}
            </p>
          ))}
        </div>
        <p data-reveal className="display mt-8 text-3xl sm:text-4xl text-[var(--red)]">
          {BOOK.foreword.closeMark}
        </p>
      </div>
    </section>
  );
}

/* ---------- AUTHOR ---------- */
export function Author() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="author" ref={ref} className="relative bg-[var(--ink)] text-[var(--paper)] overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:py-36 md:grid-cols-5 md:items-center">
        <div className="md:col-span-2 relative">
          <div data-reveal className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/book/author-v4.jpg"
              alt="B. Amechi"
              className="w-full max-w-sm mx-auto shadow-[0_50px_100px_-40px_rgba(208,32,42,0.35)]"
              loading="lazy"
            />
            <div className="absolute -bottom-3 -right-3 bg-[var(--red)] px-4 py-2">
              <span className="ui-caps text-[9px] text-white">{AUTHOR.roles}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <p data-reveal className="ui-caps text-[10px] text-[var(--red)]">
            The Author
          </p>
          <h2 data-reveal className="display mt-4 text-6xl sm:text-7xl">
            {AUTHOR.name}
          </h2>
          <p data-reveal className="display mt-3 text-lg sm:text-xl text-[var(--red)]">
            {AUTHOR.motto}
          </p>
          <div className="mt-7 space-y-4 max-w-xl">
            {AUTHOR.bio.map((p, i) => (
              <p key={i} data-reveal className="serif-body text-[15px] text-[var(--paper)]/80">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3" data-reveal>
            {AUTHOR.credentials.map((c) => (
              <div key={c} className="border-t-2 border-[var(--red)] pt-3">
                <p className="display text-lg leading-snug sm:text-xl">{c}</p>
              </div>
            ))}
          </div>

          <p data-reveal className="ui-caps mt-10 text-[10px] text-[var(--red)]">
            {AUTHOR.missionLine}
          </p>

          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a href={AUTHOR.links.site} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
              {AUTHOR.links.siteLabel}
            </a>
            <a href={AUTHOR.links.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
              {AUTHOR.links.instagramLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FORMATS ---------- */
export function Formats() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="formats" ref={ref} className="relative bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-36">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal className="ui-caps text-[10px] text-[var(--red)]">
              Get the Book
            </p>
            <h2 data-reveal className="display mt-4 text-5xl sm:text-6xl md:text-7xl">
              CHOOSE YOUR FORMAT<span className="text-[var(--red)]">.</span>
            </h2>
          </div>
          <div data-reveal className="shrink-0 pb-2">
            <BundleCountdown />
          </div>
        </div>

        <div data-reveal className="mt-14 pb-2 md:pb-6">
          <ProductGrid />
        </div>

        {/* Challenge card */}
        <Link
          href={CHALLENGE_PATH}
          data-reveal
          className="group relative mt-8 block overflow-hidden rounded-2xl border border-[var(--ink)]/15 bg-white/50 p-8 transition-all duration-500 hover:border-[var(--ink)] sm:p-10"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ui-caps text-[10px] text-[var(--red)]">Free with your email</p>
              <h3 className="display mt-3 text-3xl sm:text-5xl">
                THE FREE 7-DAY CHALLENGE<span className="text-[var(--red)]">.</span>
              </h3>
              <p className="serif-body mt-3 max-w-md text-[15px] text-[var(--ink)]/75">
                Five reflection workbooks from the book — complete them online or download
                the PDFs. No purchase required.
              </p>
            </div>
            <span className="btn btn-ghost-dark shrink-0">Start the Challenge</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
        <p data-reveal className="ui-caps text-[10px] text-[var(--red)]">
          Questions
        </p>
        <h2 data-reveal className="display mt-4 text-5xl sm:text-6xl">
          FAQ<span className="text-[var(--red)]">.</span>
        </h2>
        <div className="mt-10">
          {FAQ.map((f, i) => (
            <div key={f.q} data-reveal className={`faq-item ${openIdx === i ? "open" : ""}`}>
              <button
                className="faq-q"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="display text-xl sm:text-2xl">{f.q}</span>
                <span className="faq-plus display text-2xl text-[var(--red)]">+</span>
              </button>
              <div className="faq-a">
                <p className="serif-body pb-6 text-[15px] text-[var(--ink)]/75">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA + FOOTER ---------- */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div
        className="abs-fill opacity-25"
        style={{
          backgroundImage: "url(/images/env/forest.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="abs-fill bg-gradient-to-b from-[var(--ink)] via-transparent to-black" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 sm:py-44 text-center">
        <p data-reveal className="serif-body italic text-lg sm:text-2xl text-[var(--paper)]/85">
          {BOOK.speakingLine}
        </p>
        <h2 data-reveal className="display mt-4 text-4xl sm:text-6xl md:text-7xl">
          HAVE YOU BEEN
          <br />
          LISTENING<span className="text-[var(--red)]">?</span>
        </h2>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#formats" className="btn btn-red">
            Get the Book
          </a>
          <Link href="/experience" className="btn btn-ghost-light">
            Enter the Experience
          </Link>
          <Link href={CHALLENGE_PATH} className="btn btn-ghost-light">
            Start Free 7-Day Challenge
          </Link>
        </div>
        <div data-reveal className="mt-6">
          <BundleCountdown light />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-[var(--paper)] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-3xl">
              NOTHING IS RANDOM<span className="text-[var(--red)]">.</span>
            </p>
            <p className="serif-body mt-2 text-sm text-[var(--paper)]/60">
              {BOOK.subtitle.charAt(0) + BOOK.subtitle.slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href={AUTHOR.links.site} target="_blank" rel="noreferrer" className="ui-caps text-[10px] text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors">
              {AUTHOR.links.siteLabel}
            </a>
            <a href={AUTHOR.links.instagram} target="_blank" rel="noreferrer" className="ui-caps text-[10px] text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors">
              {AUTHOR.links.instagramLabel}
            </a>
            <a href={AUTHOR.links.email} className="ui-caps text-[10px] text-[var(--paper)]/60 hover:text-[var(--paper)] transition-colors">
              {AUTHOR.links.emailLabel}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="ui-caps text-[9px] text-[var(--paper)]/40">
            © 2026 B. Amechi. All rights reserved.
          </p>
          <p className="ui-caps text-[9px] text-[var(--paper)]/40">
            141 entries. One pattern.
          </p>
        </div>
      </div>
    </footer>
  );
}
