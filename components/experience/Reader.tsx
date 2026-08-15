"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ENTRIES, OUTRO, AUTHOR, FREE_ENTRY_LIMIT, type Entry } from "@/lib/content";
import { CHALLENGE_PATH } from "@/lib/commerce";
import { checkAccessCode, isUnlocked, setUnlocked } from "@/lib/access";
import { postLead } from "@/lib/leads";
import { ProductGrid } from "@/components/Commerce";

/**
 * Reduced-motion fallback: the same entries as a calm, readable
 * long-form page. No pinning, no scrubbing — the copy leads.
 * The first ten entries are free; the rest unlock with a code.
 */

function EntryArticle({ entry }: { entry: Entry }) {
  const dark = entry.n === 7 || entry.n === 9;
  return (
    <article
      className={`px-5 py-20 ${dark ? "bg-black text-[var(--paper)]" : entry.n === 5 ? "bg-[#f6f3ec] text-[var(--red)]" : "bg-[var(--paper)] text-[var(--ink)]"}`}
    >
      <div className="mx-auto max-w-xl">
        <div className="flex items-baseline gap-3">
          <span className="display text-3xl text-[var(--red)]">{entry.n}.</span>
          {entry.displayTitle ? (
            <h2 className="display text-3xl sm:text-4xl">
              {entry.displayTitle.black}{" "}
              <span className="text-[var(--red)]">{entry.displayTitle.red}</span>
            </h2>
          ) : entry.title ? (
            <h2 className="display whitespace-pre-line text-3xl sm:text-4xl">{entry.title}</h2>
          ) : null}
        </div>
        <div className="mt-6">
          {entry.blocks.map((b, i) => {
            switch (b.kind) {
              case "quote":
                return (
                  <blockquote key={i} className="mb-5">
                    <p className="serif-body italic opacity-80">“{b.text}”</p>
                    {b.attribution && <cite className="ui-caps mt-2 block text-[10px] not-italic opacity-70">— {b.attribution}</cite>}
                  </blockquote>
                );
              case "verse":
                return (
                  <p key={i} className="serif-body mb-5 whitespace-pre-line text-center italic">
                    {b.text}
                  </p>
                );
              case "triangle": {
                const toneBg = { red: "#d0202a", black: "#17140f", gold: "#e8a913" } as const;
                return (
                  <div key={i} className="mb-6 space-y-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {b.points.map((pt) => (
                        <span key={pt.word} className="display rounded-md px-3 py-1.5 text-sm text-white" style={{ background: toneBg[pt.tone], color: pt.tone === "gold" ? "#17140f" : "#fff" }}>
                          {pt.word}
                        </span>
                      ))}
                    </div>
                    <p className="display text-2xl">
                      {b.center.black} <span className="text-[var(--red)]">{b.center.red}</span>
                    </p>
                    {b.notes.map((n) => (
                      <p key={n} className="serif-body text-sm opacity-80">
                        {n}
                      </p>
                    ))}
                  </div>
                );
              }
              case "strikeplay":
                return (
                  <div key={i} className="relative mb-5 mt-1 inline-block">
                    <span className="display relative inline-block text-4xl">
                      {b.word}
                      <span className="absolute left-[-4%] right-[-4%] top-[48%] h-[3px] bg-[var(--red)]" />
                    </span>
                    <span className="serif-body absolute -top-4 left-[16%] rotate-[-7deg] text-xl italic text-[var(--red)]">
                      {b.overlay}
                    </span>
                  </div>
                );
              case "matrix":
                return (
                  <div key={i} className="mb-6 grid grid-cols-2 gap-3">
                    {b.cells.map((c) => {
                      const deep = c.tone === "green" ? "#1c7a4d" : c.tone === "gold" ? "#b07a09" : "#c11f28";
                      const soft = c.tone === "green" ? "#e6f3ea" : c.tone === "gold" ? "#fbf2d9" : "#f7e2e2";
                      return (
                        <div key={c.word} className="overflow-hidden rounded-md shadow-lg">
                          <div className="px-2 py-1.5 text-center" style={{ background: deep }}>
                            <span className="display text-[10px] text-white">{c.tag}</span>
                          </div>
                          <div className="px-2 py-3 text-center" style={{ background: soft }}>
                            <p className="display text-xl" style={{ color: deep }}>
                              {c.word}
                            </p>
                            <p className="serif-body mt-1 text-xs text-[#1c1a16]/75">{c.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              case "strong":
                return (
                  <p key={i} className="serif-body mb-5 whitespace-pre-line font-bold">
                    {b.text}
                  </p>
                );
              case "kicker":
                return (
                  <p key={i} className="ui-caps mb-2 text-[11px] text-[var(--red)]">
                    {b.text}
                  </p>
                );
              case "display":
                return (
                  <p key={i} className="display mb-5 mt-2 whitespace-pre-line text-3xl leading-tight sm:text-4xl">
                    {b.text}
                  </p>
                );
              case "rich":
                return (
                  <p key={i} className="serif-body mb-5">
                    {b.parts.map((p, j) => (
                      <span
                        key={j}
                        className={`${p.bold ? "font-bold" : ""} ${p.red ? "font-bold text-[var(--red)]" : ""}`}
                      >
                        {p.text}
                      </span>
                    ))}
                  </p>
                );
              default:
                return (
                  <p key={i} className="serif-body mb-5 whitespace-pre-line">
                    {b.text}
                  </p>
                );
            }
          })}
        </div>
      </div>
    </article>
  );
}

function ReaderPaywall({ onUnlock }: { onUnlock: () => void }) {
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAccessCode(code)) {
      setError("That code did not match. Check it and try again.");
      return;
    }
    setUnlocked();
    const c = contact.trim();
    const isEmail = c.includes("@");
    postLead({
      email: c && isEmail ? c : undefined,
      phone: c && !isEmail ? c : undefined,
      source: "Experience Unlock (Reader)",
      accessCodeUsed: code.trim(),
      currentEntryReached: FREE_ENTRY_LIMIT,
    });
    onUnlock();
  };

  return (
    <section className="bg-black px-5 py-24 text-[var(--paper)]">
      <div className="mx-auto max-w-xl text-center">
        <p className="display text-4xl text-[var(--red)]">*</p>
        <h2 className="display mt-4 text-3xl sm:text-4xl">
          THE PATTERN CONTINUES<span className="text-[var(--red)]">.</span>
        </h2>
        <p className="serif-body mt-3 text-[15px] text-white/70">
          The first ten entries are yours, free. Continue with an access code, own the
          Digital Experience, or begin the free 7-day challenge.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 max-w-sm text-left">
          <label className="ui-caps text-[9px] text-white/50" htmlFor="rd-code">
            Access code
          </label>
          <input
            id="rd-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1.5 w-full border border-white/25 bg-black/40 px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-sm tracking-[0.35em] text-white outline-none focus:border-[var(--red)]"
          />
          <label className="ui-caps mt-4 block text-[9px] text-white/50" htmlFor="rd-contact">
            Email or phone — optional
          </label>
          <input
            id="rd-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="to restore your access later"
            className="mt-1.5 w-full border border-white/25 bg-black/40 px-3.5 py-2.5 font-[family-name:var(--font-ui)] text-sm text-white outline-none focus:border-[var(--red)]"
          />
          {error && <p className="serif-body mt-3 text-[13px] text-[#ff4b55]">{error}</p>}
          <button type="submit" className="btn btn-red mt-5 w-full justify-center">
            Continue Reading
          </button>
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/#formats" className="btn btn-ghost-light">
            Buy the Book
          </Link>
          <Link href={CHALLENGE_PATH} className="btn btn-ghost-light">
            Start Free 7-Day Challenge
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Reader() {
  const [unlocked, setUnlockedState] = useState(false);
  useEffect(() => {
    setUnlockedState(isUnlocked());
  }, []);

  const visible = unlocked ? ENTRIES : ENTRIES.filter((e) => e.n <= FREE_ENTRY_LIMIT);

  return (
    <main className="bg-[var(--paper)]">
      <header className="bg-black px-5 py-16 text-center text-[var(--paper)]">
        <p className="display text-4xl text-[var(--red)]">*</p>
        <h1 className="display mt-4 text-3xl sm:text-5xl">NOTHING IS RANDOM</h1>
        <p className="ui-caps mt-3 text-[10px] text-white/55">
          The Experience — the complete journey{unlocked ? "" : " — first ten entries free"}
        </p>
        <Link href="/" className="ui-caps mt-6 inline-block text-[10px] text-white/60 hover:text-white">
          ← Back to site
        </Link>
      </header>
      {visible.map((e) => (
        <EntryArticle key={e.n} entry={e} />
      ))}

      {!unlocked && <ReaderPaywall onUnlock={() => setUnlockedState(true)} />}

      {unlocked && (
        <>
          {/* Outro / back cover */}
          <section className="bg-[#f6f3ec] px-5 py-20 text-[var(--ink)]">
            <div className="mx-auto max-w-xl">
              <p className="serif-body text-lg italic">{OUTRO.page1.lead}</p>
              <div className="mt-5 h-[3px] w-24 bg-[var(--red)]" />
              <div className="mt-6 space-y-4">
                {[...OUTRO.page1.paras].map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[15px] leading-[1.75] opacity-85">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-1.5">
                {OUTRO.page1.litany.map((l) => (
                  <p key={l} className="serif-body font-bold italic text-[15px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {OUTRO.page1.close.map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[15px] leading-[1.75] opacity-85">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-7 space-y-1">
                {OUTRO.page1.central.map((l) => (
                  <p key={l} className="display text-2xl">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-10 space-y-4">
                {OUTRO.page2.paras.map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[15px] leading-[1.75] opacity-85">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-1.5">
                {OUTRO.page2.litany.map((l) => (
                  <p key={l} className="serif-body font-bold italic text-[15px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {OUTRO.page2.close.map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[15px] leading-[1.75] opacity-85">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-1.5">
                {OUTRO.page2.resolve.map((l) => (
                  <p key={l} className="serif-body font-bold text-[15px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {OUTRO.page2.final.map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[15px] leading-[1.75] opacity-85">
                    {p}
                  </p>
                ))}
              </div>
              <p className="display mt-10 text-4xl text-[var(--red)]">{OUTRO.page2.mark}</p>
            </div>
          </section>

          {/* Author */}
          <section className="bg-[#f6f3ec] px-5 pb-20 text-[var(--ink)]">
            <div className="mx-auto max-w-xl border-t border-[var(--ink)]/15 pt-12">
              <h2 className="display text-4xl">{AUTHOR.name}</h2>
              <p className="ui-caps mt-1 text-[10px] text-[var(--red)]">{AUTHOR.roles}</p>
              <div className="mt-5 space-y-3">
                {AUTHOR.bio.map((p) => (
                  <p key={p.slice(0, 24)} className="serif-body text-[14px] leading-[1.7] opacity-80">
                    {p}
                  </p>
                ))}
              </div>
              <p className="display mt-5 text-lg">{AUTHOR.motto}</p>
              <p className="ui-caps mt-2 text-[10px] text-[var(--red)]">{AUTHOR.missionLine}</p>
            </div>
          </section>
        </>
      )}

      <footer className="bg-black px-5 py-20 text-center text-[var(--paper)]">
        <h2 className="display text-4xl">
          THE PATTERN CONTINUES<span className="text-[var(--red)]">.</span>
        </h2>
        <div className="mx-auto mt-10 max-w-4xl">
          <ProductGrid dark compact />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={CHALLENGE_PATH} className="btn btn-ghost-light">
            Start Free 7-Day Challenge
          </Link>
          <Link href="/" className="btn btn-ghost-light">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
