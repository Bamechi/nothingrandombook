"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BOOK } from "@/lib/content";

const BookHero = dynamic(() => import("@/components/BookHero"), { ssr: false });

/**
 * The hero: a black dimensional constellation. On first visit, seemingly
 * random particles fade in, connections form pathways, red pulses ignite,
 * and the finished book materializes at the center — everything is
 * connected. Copy lives below the book's airspace; nothing overlaps it.
 */
export default function Hero({ intro }: { intro: boolean | undefined }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (intro === undefined || !root.current) return;
    const q = gsap.utils.selector(root.current);
    // with the intro, copy waits for the constellation to reveal the book
    const delay = intro ? 3.2 : 0.15;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay });
    tl.fromTo(
      q(".hero-line"),
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09 }
    )
      .fromTo(q(".hero-sub"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
      .fromTo(q(".hero-cta"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.75)
      .fromTo(q(".hero-scroll-hint"), { opacity: 0 }, { opacity: 1, duration: 1 }, 1.25);
    if (intro) {
      try {
        sessionStorage.setItem("nir-entered", "1");
      } catch {}
    }
    return () => {
      tl.kill();
    };
  }, [intro]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black text-[var(--paper)]"
    >
      {/* the constellation + the book, one dimensional field */}
      {intro !== undefined && <BookHero className="absolute inset-0 z-[1]" intro={intro} />}

      {/* airspace reserved for the book — nothing renders here */}
      <div className="h-[46svh] shrink-0 sm:h-[52svh]" aria-hidden="true" />

      {/* hero copy — physically below the book */}
      <div className="pointer-events-none relative z-[3] flex flex-1 flex-col items-center justify-end px-5 pb-12 pt-4 text-center sm:pb-14">
        <h1 className="display text-[13vw] leading-[0.9] sm:text-7xl md:text-8xl">
          <span className="block overflow-hidden">
            <span className="hero-line block opacity-0">NOTHING</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block opacity-0">
              IS RANDOM<span className="text-[var(--red)]">.</span>
            </span>
          </span>
        </h1>
        <p className="hero-sub serif-body mx-auto mt-4 max-w-md text-base sm:text-lg text-[var(--paper)]/90 opacity-0">
          {BOOK.subtitle.charAt(0) + BOOK.subtitle.slice(1).toLowerCase()}
        </p>
        <p className="hero-sub ui-caps mt-2 text-[10px] text-[var(--paper)]/55 opacity-0">
          {BOOK.entryCount} entries — by {BOOK.author}
        </p>
        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/experience" className="hero-cta btn btn-red opacity-0">
            Enter the Experience
          </Link>
          <a href="#formats" className="hero-cta btn btn-ghost-light opacity-0">
            Buy the Book
          </a>
          <Link href="/challenge" className="hero-cta btn btn-ghost-light opacity-0">
            Start the Free 7-Day Challenge
          </Link>
        </div>
        <div className="hero-scroll-hint mt-7 flex flex-col items-center gap-2 opacity-0">
          <span className="ui-caps text-[9px] text-[var(--paper)]/45">Scroll</span>
          <span className="block h-7 w-px bg-gradient-to-b from-[var(--red)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
