"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { AboutBook, Ancestors, Author, Formats, Faq, FinalCta, Footer } from "@/components/Sections";
import Community from "@/components/Community";
import Reviews from "@/components/Reviews";

export default function Home() {
  // undefined = deciding; true = play the constellation-formation intro
  const [intro, setIntro] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("nir-entered") === "1";
    } catch {}
    setIntro(!reduced && !seen);
    if (!reduced && !seen) window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero intro={intro} />
        <div className="marquee bg-[var(--red)] py-3 text-white" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i}>
              {Array.from({ length: 6 }).map((_, j) => (
                <span key={j} className="display mx-6 text-xl">
                  NOTHING IS RANDOM — MAKING SENSE OF WHAT LIFE’S BEEN TRYING TO TELL YOU —
                </span>
              ))}
            </div>
          ))}
        </div>
        <AboutBook />
        <Formats />
        <Community />
        <Reviews />
        <Ancestors />
        <Author />
        <Faq />
        <FinalCta />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
