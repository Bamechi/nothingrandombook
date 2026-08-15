"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ${
        scrolled ? "bg-[var(--ink)]/85 backdrop-blur-md py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" aria-label="Nothing Is Random — home">
          <span className="display text-lg leading-none text-[var(--paper)]">
            N<span className="text-[var(--red)]">*</span>R
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            ["The Book", "/#book"],
            ["Author", "/#author"],
            ["Get the Book", "/#formats"],
            ["Free Challenge", "/challenge"],
            ["FAQ", "/#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="ui-caps text-[10px] text-[var(--paper)]/70 hover:text-[var(--paper)] transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <Link href="/experience" className="btn btn-red text-[10px] px-5 py-2.5">
          Enter the Experience
        </Link>
      </nav>
    </header>
  );
}
