"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ENTRIES, OUTRO, AUTHOR, type Entry, type EntryBlock } from "@/lib/content";
import { getAmbience } from "@/lib/audio";
import { isUnlocked } from "@/lib/access";
import { CHALLENGE_PATH } from "@/lib/commerce";
import Paywall from "@/components/experience/Paywall";
import { ProductGrid, BundleCountdown } from "@/components/Commerce";

gsap.registerPlugin(ScrollTrigger);

/**
 * THE EXPERIENCE — Entries 1–81 as one continuous scroll film (the book itself skips 79).
 * The stage is fixed; scroll position is the camera. Forward advances,
 * backward rewinds, stillness lets you read. Every scene hands the camera
 * to the next through a motivated object, light, or texture — one world.
 */

const UNIT_VH = 64;

interface SceneDef {
  id: string;
  weight: number;
  entry?: Entry;
}

const E = (n: number) => ENTRIES.find((entry) => entry.n === n)!;

const SCENES: SceneDef[] = [
  { id: "intro", weight: 1.5 },
  { id: "e1", weight: 3.2, entry: E(1) },
  { id: "e2", weight: 2.6, entry: E(2) },
  { id: "e3", weight: 2.8, entry: E(3) },
  { id: "e4", weight: 3.2, entry: E(4) },
  { id: "e5", weight: 1.8, entry: E(5) },
  { id: "e6", weight: 3.4, entry: E(6) },
  { id: "e7", weight: 1.9, entry: E(7) },
  { id: "e8", weight: 2.8, entry: E(8) },
  { id: "e9", weight: 2.1, entry: E(9) },
  { id: "e10", weight: 2.9, entry: E(10) },
  { id: "e11", weight: 2.9, entry: E(11) },
  { id: "e12", weight: 2.7, entry: E(12) },
  { id: "e13", weight: 2.2, entry: E(13) },
  { id: "e14", weight: 2.9, entry: E(14) },
  { id: "e15", weight: 2.7, entry: E(15) },
  { id: "e16", weight: 2.4, entry: E(16) },
  { id: "e17", weight: 2.9, entry: E(17) },
  { id: "e18", weight: 1.7, entry: E(18) },
  { id: "e19", weight: 2.5, entry: E(19) },
  { id: "e20", weight: 3.0, entry: E(20) },
  { id: "e21", weight: 2.6, entry: E(21) },
  { id: "e22", weight: 2.8, entry: E(22) },
  { id: "e23", weight: 2.4, entry: E(23) },
  { id: "e24", weight: 3.0, entry: E(24) },
  { id: "e25", weight: 2.6, entry: E(25) },
  { id: "e26", weight: 3.2, entry: E(26) },
  { id: "e27", weight: 2.5, entry: E(27) },
  { id: "e28", weight: 3.0, entry: E(28) },
  { id: "e29", weight: 2.3, entry: E(29) },
  { id: "e30", weight: 2.8, entry: E(30) },
  { id: "e31", weight: 3.0, entry: E(31) },
  { id: "e32", weight: 2.6, entry: E(32) },
  { id: "e33", weight: 2.0, entry: E(33) },
  { id: "e34", weight: 1.9, entry: E(34) },
  { id: "e35", weight: 2.8, entry: E(35) },
  { id: "e36", weight: 2.6, entry: E(36) },
  { id: "e37", weight: 2.2, entry: E(37) },
  { id: "e38", weight: 2.2, entry: E(38) },
  { id: "e39", weight: 2.4, entry: E(39) },
  { id: "e40", weight: 3.0, entry: E(40) },
  { id: "e41", weight: 1.9, entry: E(41) },
  { id: "e42", weight: 3.0, entry: E(42) },
  { id: "e43", weight: 1.6, entry: E(43) },
  { id: "e44", weight: 2.6, entry: E(44) },
  { id: "e45", weight: 2.4, entry: E(45) },
  { id: "e46", weight: 2.8, entry: E(46) },
  { id: "e47", weight: 2.2, entry: E(47) },
  { id: "e48", weight: 2.4, entry: E(48) },
  { id: "e49", weight: 2.6, entry: E(49) },
  { id: "e50", weight: 2.8, entry: E(50) },
  { id: "e51", weight: 2.4, entry: E(51) },
  { id: "e52", weight: 2.8, entry: E(52) },
  { id: "e53", weight: 2.9, entry: E(53) },
  { id: "e54", weight: 2.6, entry: E(54) },
  { id: "e55", weight: 2.8, entry: E(55) },
  { id: "e56", weight: 2.2, entry: E(56) },
  { id: "e57", weight: 2.2, entry: E(57) },
  { id: "e58", weight: 2.6, entry: E(58) },
  { id: "e59", weight: 2.8, entry: E(59) },
  { id: "e60", weight: 3.0, entry: E(60) },
  { id: "e61", weight: 2.4, entry: E(61) },
  { id: "e62", weight: 2.8, entry: E(62) },
  { id: "e63", weight: 1.7, entry: E(63) },
  { id: "e64", weight: 2.4, entry: E(64) },
  { id: "e65", weight: 2.5, entry: E(65) },
  { id: "e66", weight: 2.6, entry: E(66) },
  { id: "e67", weight: 2.6, entry: E(67) },
  { id: "e68", weight: 2.4, entry: E(68) },
  { id: "e69", weight: 2.8, entry: E(69) },
  { id: "e70", weight: 2.7, entry: E(70) },
  { id: "e71", weight: 2.5, entry: E(71) },
  { id: "e72", weight: 2.5, entry: E(72) },
  { id: "e73", weight: 2.8, entry: E(73) },
  { id: "e74", weight: 1.5, entry: E(74) },
  { id: "e75", weight: 2.3, entry: E(75) },
  { id: "e76", weight: 2.3, entry: E(76) },
  { id: "e77", weight: 2.5, entry: E(77) },
  { id: "e78", weight: 3.2, entry: E(78) },
  { id: "e80", weight: 2.9, entry: E(80) },
  { id: "e81", weight: 2.9, entry: E(81) },
  { id: "e82", weight: 3.2, entry: E(82) },
  { id: "e83", weight: 2.4, entry: E(83) },
  { id: "e84", weight: 2.6, entry: E(84) },
  { id: "e85", weight: 1.7, entry: E(85) },
  { id: "e86", weight: 2.6, entry: E(86) },
  { id: "e87", weight: 2.8, entry: E(87) },
  { id: "e88", weight: 2.6, entry: E(88) },
  { id: "e89", weight: 1.8, entry: E(89) },
  { id: "e90", weight: 1.8, entry: E(90) },
  { id: "e91", weight: 2.5, entry: E(91) },
  { id: "e92", weight: 2.4, entry: E(92) },
  { id: "e93", weight: 2.2, entry: E(93) },
  { id: "e94", weight: 2.6, entry: E(94) },
  { id: "e95", weight: 2.5, entry: E(95) },
  { id: "e96", weight: 2.3, entry: E(96) },
  { id: "e97", weight: 2.7, entry: E(97) },
  { id: "e98", weight: 2.0, entry: E(98) },
  { id: "e99", weight: 2.0, entry: E(99) },
  { id: "e100", weight: 2.7, entry: E(100) },
  { id: "e101", weight: 2.4, entry: E(101) },
  { id: "e102", weight: 3.6, entry: E(102) },
  { id: "e103", weight: 1.7, entry: E(103) },
  { id: "e104", weight: 2.4, entry: E(104) },
  { id: "e105", weight: 2.0, entry: E(105) },
  { id: "e106", weight: 1.8, entry: E(106) },
  { id: "e107", weight: 1.6, entry: E(107) },
  { id: "e108", weight: 1.6, entry: E(108) },
  { id: "e109", weight: 1.8, entry: E(109) },
  { id: "e110", weight: 2.0, entry: E(110) },
  { id: "e111", weight: 2.5, entry: E(111) },
  { id: "e112", weight: 1.7, entry: E(112) },
  { id: "e113", weight: 2.9, entry: E(113) },
  { id: "e114", weight: 1.6, entry: E(114) },
  { id: "e115", weight: 3.0, entry: E(115) },
  { id: "e116", weight: 3.0, entry: E(116) },
  { id: "e117", weight: 2.8, entry: E(117) },
  { id: "memory-wall", weight: 2.0 },
  { id: "outro-p1", weight: 2.8 },
  { id: "outro-p2", weight: 3.0 },
  { id: "author", weight: 2.2 },
  { id: "finale", weight: 2.0 },
];

/** Weight lookup by scene id — keeps timeline blocks honest. */
const W = (id: string) => SCENES.find((s) => s.id === id)!.weight;

/** Index of the first scene behind the paywall (Entry 11). */
const FREE_BOUNDARY = SCENES.findIndex((s) => s.id === "e11");

const TOTAL_WEIGHT = SCENES.reduce((a, s) => a + s.weight, 0);

/* ---------- word splitting for progressive reading ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.split === "1") return;
  el.dataset.split = "1";
  const process = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = (node.textContent || "").split(/(\s+)/);
      return words.map((w) => {
        if (/^\s+$/.test(w) || w === "") return document.createTextNode(w);
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = w;
        return span;
      });
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const elNode = node as HTMLElement;
      const kids = Array.from(elNode.childNodes);
      elNode.innerHTML = "";
      kids.forEach((k) => process(k).forEach((n) => elNode.appendChild(n)));
      return [elNode];
    }
    return [node];
  };
  const kids = Array.from(el.childNodes);
  el.innerHTML = "";
  kids.forEach((k) => process(k).forEach((n) => el.appendChild(n)));
}

/* ---------- entry copy renderer (legibility-first) ---------- */
function Blocks({ entry, light = false }: { entry: Entry; light?: boolean }) {
  const base = light ? "text-white" : "text-[var(--ink)]";
  const dim = light ? "text-white/90" : "text-[var(--ink)]/85";
  return (
    <>
      {entry.blocks.map((b: EntryBlock, i: number) => {
        switch (b.kind) {
          case "quote":
            return (
              <blockquote key={i} className="mb-6">
                <p data-words className={`serif-body font-medium italic text-[17.5px] sm:text-xl leading-[1.7] ${dim}`}>
                  “{b.text}”
                </p>
                {b.attribution && (
                  <cite data-words className={`ui-caps mt-2 block text-[11px] not-italic ${dim}`}>
                    — {b.attribution}
                  </cite>
                )}
              </blockquote>
            );
          case "verse":
            return (
              <p
                key={i}
                data-words
                className={`serif-body mb-6 whitespace-pre-line text-center italic text-[17px] sm:text-xl leading-[1.9] ${base}`}
              >
                {b.text}
              </p>
            );
          case "strong":
            return (
              <p key={i} data-words className={`serif-body mb-5 whitespace-pre-line font-bold text-[17px] sm:text-xl leading-[1.7] ${base}`}>
                {b.text}
              </p>
            );
          case "kicker":
            return (
              <p key={i} data-words className="ui-caps mb-2 mt-2 text-[12px] font-bold text-[#ff4b55]">
                {b.text}
              </p>
            );
          case "display":
            return (
              <p key={i} data-words className={`display mb-5 mt-3 text-2xl sm:text-4xl ${base}`}>
                {b.text}
              </p>
            );
          case "rich":
            return (
              <p key={i} data-words className={`serif-body font-medium mb-5 text-[17.5px] sm:text-xl leading-[1.75] ${base}`}>
                {b.parts.map((p, j) => (
                  <span
                    key={j}
                    className={`${p.bold ? "font-bold" : ""} ${p.red ? (light ? "text-[#ff4b55]" : "text-[var(--red)]") : ""}`}
                  >
                    {p.text}
                  </span>
                ))}
              </p>
            );
          case "matrix": {
            const tones = {
              green: { deep: "#1c7a4d", soft: "#e6f3ea" },
              gold: { deep: "#b07a09", soft: "#fbf2d9" },
              red: { deep: "#c11f28", soft: "#f7e2e2" },
            } as const;
            return (
              <div key={i} className="mb-7 grid grid-cols-2 gap-3" style={{ textShadow: "none" }}>
                {b.cells.map((c) => {
                  const tone = tones[c.tone];
                  return (
                    <div key={c.word} className="q-cell overflow-hidden rounded-md shadow-2xl">
                      <div className="px-2 py-2 text-center" style={{ background: tone.deep }}>
                        <span className="display text-[10px] tracking-wide text-white sm:text-xs">{c.tag}</span>
                      </div>
                      <div className="px-2 py-3 text-center sm:py-4" style={{ background: tone.soft }}>
                        <p className="display text-xl sm:text-3xl" style={{ color: tone.deep }}>
                          {c.word}
                        </p>
                        <p className="serif-body mt-1 text-[12px] leading-snug text-[#1c1a16]/75 sm:text-sm">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }
          case "triangle": {
            const toneBg = { red: "#d0202a", black: "#17140f", gold: "#e8a913" } as const;
            return (
              <div key={i} className="mb-6" style={{ textShadow: "none" }}>
                <div className="relative mx-auto aspect-[10/11] w-full max-w-[330px]">
                  <svg viewBox="0 0 400 440" className="tri-svg absolute inset-0 h-full w-full">
                    <polygon
                      points="200,64 44,382 356,382"
                      fill="none"
                      stroke="rgba(244,241,234,0.9)"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="tri-pill absolute left-1/2 top-0 -translate-x-1/2 rounded-md px-4 py-2 shadow-xl" style={{ background: toneBg[b.points[0].tone] }}>
                    <span className="display text-lg text-white sm:text-xl">{b.points[0].word}</span>
                  </div>
                  <div className="tri-pill absolute bottom-0 left-0 rounded-md px-4 py-2 shadow-xl" style={{ background: toneBg[b.points[1].tone] }}>
                    <span className="display text-lg text-white sm:text-xl">{b.points[1].word}</span>
                  </div>
                  <div className="tri-pill absolute bottom-0 right-0 rounded-md px-4 py-2 shadow-xl" style={{ background: toneBg[b.points[2].tone] }}>
                    <span className="display text-lg sm:text-xl" style={{ color: "#17140f" }}>{b.points[2].word}</span>
                  </div>
                  <div className="tri-center absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="display text-3xl text-white sm:text-4xl">{b.center.black}</p>
                    <p className="display text-4xl text-[#ff4b55] sm:text-5xl">{b.center.red}</p>
                  </div>
                </div>
                <div className="copy-shadow mt-6 space-y-1.5 text-center">
                  {b.notes.map((n) => (
                    <p key={n} data-words className="serif-body font-medium text-[15px] text-white sm:text-lg">
                      {n}
                    </p>
                  ))}
                </div>
              </div>
            );
          }
          case "strikeplay":
            return (
              <div key={i} className="relative mb-5 mt-1 inline-block" style={{ textShadow: "none" }}>
                <span className={`display relative inline-block text-4xl sm:text-6xl ${base}`}>
                  {b.word}
                  <span className="absolute left-[-4%] right-[-4%] top-[48%] h-[4px] bg-[#ff4b55]" />
                </span>
                <span className="serif-body absolute -top-5 left-[16%] rotate-[-7deg] text-2xl italic text-[#ff4b55] sm:-top-6 sm:text-3xl">
                  {b.overlay}
                </span>
              </div>
            );
          default:
            return (
              <p key={i} data-words className={`serif-body font-medium mb-5 whitespace-pre-line text-[17.5px] sm:text-xl leading-[1.75] ${base}`}>
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

function EntryTag({ entry, light = true }: { entry: Entry; light?: boolean }) {
  return (
    <div className="mb-5 flex items-baseline gap-3">
      <span className="display text-3xl sm:text-4xl text-[#ff4b55]">{entry.n}.</span>
      {entry.titleParts ? (
        <h2 className={`display text-3xl sm:text-5xl leading-[0.95] ${light ? "text-white" : "text-[var(--ink)]"}`}>
          {entry.titleParts.map((part, i) => (
            <span key={i} className={`${part.red ? "text-[#ff4b55]" : ""} mr-[0.28em] inline-block`}>
              {part.strike ? (
                <span className="relative inline-block">
                  {part.text}
                  <span className="absolute left-[-5%] right-[-5%] top-[46%] h-[3px] -rotate-[8deg] bg-[#ff4b55]" />
                  <span className="absolute left-[-5%] right-[-5%] top-[46%] h-[3px] rotate-[8deg] bg-[#ff4b55]" />
                </span>
              ) : (
                part.text
              )}
            </span>
          ))}
        </h2>
      ) : entry.displayTitle ? (
        <h2 className={`display text-3xl sm:text-5xl leading-[0.95] ${light ? "text-white" : "text-[var(--ink)]"}`}>
          <span>{entry.displayTitle.black} </span>
          <span className="text-[#ff4b55]">{entry.displayTitle.red}</span>
        </h2>
      ) : entry.title ? (
        <h2 className={`display text-3xl sm:text-5xl leading-[0.95] ${light ? "text-white" : "text-[var(--ink)]"}`}>
          {entry.title}
        </h2>
      ) : null}
    </div>
  );
}

/** Standard reading scene body: plate + pan + head + blocks */
function ReadingBody({ entry }: { entry: Entry }) {
  return (
    <div className="scene-copy read-dim copy-shadow">
      <div className="copy-pan gpu">
        <div className="sc-head">
          <EntryTag entry={entry} />
        </div>
        <Blocks entry={entry} light />
      </div>
    </div>
  );
}

/* =================================================================== */

export default function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [soundOn, setSoundOn] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [paywall, setPaywall] = useState(false);
  const unlockedRef = useRef(false);
  const paywallRef = useRef(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    unlockedRef.current = isUnlocked();
  }, []);

  const openPaywall = () => {
    if (paywallRef.current) return;
    paywallRef.current = true;
    setPaywall(true);
    lenisRef.current?.stop();
  };

  const closePaywall = (unlocked: boolean) => {
    paywallRef.current = false;
    setPaywall(false);
    if (unlocked) unlockedRef.current = true;
    lenisRef.current?.start();
  };

  const [shared, setShared] = useState(false);
  const shareExperience = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "NoThing Is Random",
          text: "Making sense of what life’s been trying to tell you.",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2200);
      }
    } catch {}
  };

  /** jump the scroll position to the start of a scene (reading phase) */
  const jumpToScene = (index: number) => {
    let acc = 0;
    for (let i = 0; i < index; i++) acc += SCENES[i].weight;
    const progress = (acc + SCENES[index].weight * 0.12) / TOTAL_WEIGHT;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: progress * max, behavior: "auto" });
    setChaptersOpen(false);
  };

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, syncTouch: true, touchMultiplier: 1.1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* lazy-load scene backgrounds: current ± 1 (never unload) */
  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    for (let i = Math.max(0, active - 1); i <= Math.min(SCENES.length - 1, active + 1); i++) {
      st.querySelectorAll<HTMLElement>(`[data-scene="${SCENES[i].id}"] [data-bg]`).forEach((bgEl) => {
        if (!bgEl.style.backgroundImage) {
          bgEl.style.backgroundImage = `url(${bgEl.dataset.bg})`;
        }
      });
    }
  }, [active]);

  useEffect(() => {
    if (soundOn) getAmbience().setScene(active);
  }, [active, soundOn]);

  const toggleSound = async () => {
    const eng = getAmbience();
    if (eng.isRunning) {
      eng.stop();
      setSoundOn(false);
    } else {
      await eng.start();
      eng.setScene(activeRef.current);
      setSoundOn(true);
    }
  };

  /* ---------- the film ---------- */
  useLayoutEffect(() => {
    const st = stage.current;
    const wrap = container.current;
    if (!st || !wrap) return;

    const ctx = gsap.context(() => {
      const S = (id: string) => st.querySelector<HTMLElement>(`[data-scene="${id}"]`)!;
      const Q = (id: string, sel: string) =>
        Array.from(S(id).querySelectorAll<HTMLElement>(sel));

      st.querySelectorAll<HTMLElement>("[data-words]").forEach(splitWords);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            let acc = 0;
            let idx = 0;
            for (let i = 0; i < SCENES.length; i++) {
              acc += SCENES[i].weight / TOTAL_WEIGHT;
              if (self.progress <= acc + 0.0001) {
                idx = i;
                break;
              }
            }
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
            // Entries 1–10 are free; the paywall invitation opens at Entry 11.
            if (idx >= FREE_BOUNDARY && !unlockedRef.current) {
              openPaywall();
            }
          },
        },
      });

      const readWords = (els: HTMLElement[], pos: number, dur: number) => {
        const words = els.flatMap((e) => Array.from(e.querySelectorAll<HTMLElement>(".word")));
        if (!words.length) return;
        tl.to(
          words,
          { opacity: 1, duration: dur * 0.9, stagger: { each: (dur * 0.9) / words.length } },
          pos
        );
      };

      /**
       * Three-phase reading:
       *  1. reveal — headline lands, words light, the page settles (to ~60%)
       *  2. hold — the complete entry rests on screen, nothing moves (60–78%)
       *  3. illuminate — the subdued environment breathes up for one beat (78–88%)
       * The scene's exit cut then takes over. Never advance on the final line.
       */
      const readingBeats = (id: string, t: number, w: number, panFrom = 18, panTo = -20) => {
        tl.fromTo(Q(id, ".sc-head"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: w * 0.1 }, t + w * 0.08);
        readWords(Q(id, "[data-words]"), t + w * 0.14, w * 0.46);
        tl.fromTo(Q(id, ".copy-pan"), { yPercent: panFrom }, { yPercent: panTo, duration: w * 0.5 }, t + w * 0.12);
        const scrims = Q(id, ".scrim");
        if (scrims.length) {
          tl.to(scrims, { opacity: 0.12, duration: w * 0.09 }, t + w * 0.78);
        }
      };

      let t = 0;

      /* ————— INTRO ————— */
      {
        const w = SCENES[0].weight;
        const s = S("intro");
        gsap.set(s, { autoAlpha: 1 });
        gsap.fromTo(
          Q("intro", ".in-star, .in-title, .in-hint"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.22, ease: "power3.out", delay: 0.2 }
        );
        tl.to(s, { autoAlpha: 1, duration: w * 0.55 }, t);
        // the red star swells — its red becomes the red on the gallery canvas
        tl.to(Q("intro", ".in-star"), { scale: 30, duration: w * 0.34, ease: "power2.in" }, t + w * 0.56);
        tl.to(Q("intro", ".in-title, .in-hint"), { opacity: 0, duration: w * 0.16 }, t + w * 0.54);
        tl.to(s, { autoAlpha: 0, duration: w * 0.08 }, t + w * 0.92);
        t += w;
      }

      /* ————— E1 HIDDEN PATTERN — the gallery, camera steps back from the canvas ————— */
      {
        const w = SCENES[1].weight;
        const s = S("e1");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.1);
        tl.fromTo(Q("e1", ".wash-red"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // ECU on the canvas → step back until the whole room is visible
        tl.fromTo(Q("e1", "[data-bg]"), { scale: 2.3, yPercent: 8 }, { scale: 1.02, yPercent: 0, duration: w * 0.56, ease: "power1.out" }, t);
        tl.fromTo(Q("e1", ".scrim"), { opacity: 0 }, { opacity: 0.85, duration: w * 0.1 }, t + w * 0.12);
        readingBeats("e1", t, w, 22, -24);
        // exit: push INTO the lit canvas — its white becomes the light above the soil
        tl.to(Q("e1", "[data-bg]"), { scale: 2.6, yPercent: -6, duration: w * 0.16, ease: "power3.in" }, t + w * 0.84);
        tl.to(Q("e1", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.08 }, t + w * 0.84);
        tl.fromTo(Q("e1", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E2 PLANT THE SEED — under the soil, that white light overhead ————— */
      {
        const w = SCENES[2].weight;
        const s = S("e2");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.08);
        tl.fromTo(Q("e2", ".light-shaft"), { opacity: 1 }, { opacity: 0.25, duration: w * 0.3 }, t);
        // overhead macro feel: sink and settle with a slight roll
        tl.fromTo(
          Q("e2", "[data-bg]"),
          { scale: 1.45, yPercent: -12, rotate: -2 },
          { scale: 1.05, yPercent: 8, rotate: 1, duration: w * 0.6 },
          t
        );
        readingBeats("e2", t, w, 16, -16);
        // the seed is watered years later — light returns and we ride it up
        tl.to(Q("e2", ".light-shaft"), { opacity: 1, duration: w * 0.16 }, t + w * 0.74);
        tl.to(Q("e2", "[data-bg]"), { yPercent: 26, scale: 1.25, duration: w * 0.16, ease: "power2.in" }, t + w * 0.84);
        tl.to(s, { autoAlpha: 0, duration: w * 0.05 }, t + w * 0.95);
        t += w;
      }

      /* ————— E3 ALIGNMENT MULTIPLIES — moonlit classroom, chalk math in scene ————— */
      {
        const w = SCENES[3].weight;
        const s = S("e3");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.09);
        // we surface from the earth into moonlight
        tl.fromTo(
          Q("e3", "[data-bg]"),
          { scale: 1.5, yPercent: -14 },
          { scale: 1.04, yPercent: 0, duration: w * 0.45, ease: "power1.out" },
          t
        );
        // lateral dolly while reading
        tl.fromTo(Q("e3", "[data-bg]"), { xPercent: -2.5 }, { xPercent: 2.5, duration: w * 0.5 }, t + w * 0.45);
        readingBeats("e3", t, w, 20, -22);
        tl.fromTo(
          Q("e3", ".align-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: w * 0.28, stagger: w * 0.05 },
          t + w * 0.42
        );
        // exit: extreme push into the chalkboard — slate black swallows the frame
        tl.to(Q("e3", "[data-bg]"), { scale: 3.2, xPercent: 0, yPercent: -10, duration: w * 0.16, ease: "power3.in" }, t + w * 0.84);
        tl.to(Q("e3", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.84);
        tl.fromTo(Q("e3", ".cut-black"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E4 LIVE IN COLOR — out of the slate into a gray street that saturates ————— */
      {
        const w = SCENES[4].weight;
        const s = S("e4");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        // whip in from black, world still gray
        tl.fromTo(
          Q("e4", "[data-bg]"),
          { scale: 1.5, xPercent: 9, filter: "grayscale(1) brightness(0.5)" },
          { scale: 1.18, xPercent: 0, filter: "grayscale(1) brightness(0.72)", duration: w * 0.28, ease: "power2.out" },
          t
        );
        tl.fromTo(Q("e4", ".sc-head"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: w * 0.09 }, t + w * 0.07);
        readWords(Q("e4", ".copy-a [data-words]"), t + w * 0.13, w * 0.22);
        tl.fromTo(Q("e4", ".copy-pan"), { yPercent: 18 }, { yPercent: -20, duration: w * 0.52 }, t + w * 0.12);
        // the world floods with color
        tl.to(
          Q("e4", "[data-bg]"),
          { filter: "grayscale(0) brightness(1)", scale: 1.03, duration: w * 0.28 },
          t + w * 0.38
        );
        readWords(Q("e4", ".copy-b [data-words]"), t + w * 0.38, w * 0.24);
        tl.fromTo(
          Q("e4", ".color-line .word"),
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, duration: w * 0.1, stagger: w * 0.009, ease: "power2.out" },
          t + w * 0.64
        );
        // hold the complete entry, then illuminate
        tl.to(Q("e4", ".scrim"), { opacity: 0.1, duration: w * 0.08 }, t + w * 0.8);
        // exit: the red of "ADD COLOR." swells — a red mural wall wipes the frame
        tl.to(Q("e4", ".color-line"), { scale: 5.5, yPercent: -30, opacity: 0, duration: w * 0.14, ease: "power3.in" }, t + w * 0.88);
        tl.fromTo(Q("e4", ".cut-red"), { xPercent: -104 }, { xPercent: 0, duration: w * 0.12, ease: "power2.in" }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E5 red aphorism on paper — red hands off to red type ————— */
      {
        const w = SCENES[5].weight;
        const s = S("e5");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.03 }, t - 0.05);
        tl.fromTo(Q("e5", ".wash-red"), { opacity: 1 }, { opacity: 0, duration: w * 0.18 }, t + w * 0.02);
        tl.fromTo(
          Q("e5", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.38, stagger: w * 0.08, ease: "power3.out" },
          t + w * 0.1
        );
        tl.to(Q("e5", ".aph-wrap"), { scale: 1.06, duration: w * 0.36 }, t + w * 0.52);
        // exit: the final period becomes the desk lamp filament
        tl.fromTo(Q("e5", ".cut-dot"), { scale: 0, opacity: 1 }, { scale: 34, duration: w * 0.15, ease: "power3.in" }, t + w * 0.85);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E6 TELL THE TRUTH — the lamp glow resolves into the desk ————— */
      {
        const w = SCENES[6].weight;
        const s = S("e6");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e6", ".lamp-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.2 }, t);
        // handheld: slow settle with a breath of rotation
        tl.fromTo(
          Q("e6", "[data-bg]"),
          { scale: 1.42, yPercent: -6, rotate: 1.2 },
          { scale: 1.04, yPercent: 0, rotate: -0.6, duration: w * 0.55 },
          t
        );
        readingBeats("e6", t, w, 16, -18);
        tl.to(Q("e6", "[data-bg]"), { scale: 1.12, duration: w * 0.45 }, t + w * 0.5);
        // exit: the lamp flickers twice, then the night takes the room
        tl.fromTo(Q("e6", ".cut-dark"), { opacity: 0 }, { opacity: 0.7, duration: w * 0.025 }, t + w * 0.84);
        tl.to(Q("e6", ".cut-dark"), { opacity: 0.2, duration: w * 0.02 }, t + w * 0.87);
        tl.to(Q("e6", ".cut-dark"), { opacity: 1, duration: w * 0.08 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E7 aphorism — the dark hallway appears where the light died ————— */
      {
        const w = SCENES[7].weight;
        const s = S("e7");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.05);
        tl.fromTo(Q("e7", "[data-bg]"), { scale: 1.02, opacity: 0 }, { scale: 1.2, opacity: 0.45, duration: w * 0.85 }, t);
        tl.fromTo(
          Q("e7", ".aph-line"),
          { opacity: 0, yPercent: 90 },
          { opacity: 1, yPercent: 0, duration: w * 0.34, stagger: w * 0.08, ease: "power3.out" },
          t + w * 0.1
        );
        tl.to(s, { autoAlpha: 1, duration: w * 0.01 }, t + w * 0.9);
        t += w;
      }

      /* ————— E8 THE LESSON WILL NOT RETIRE — same corridor, deeper, red ————— */
      {
        const w = SCENES[8].weight;
        const s = S("e8");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.07 }, t - 0.14);
        tl.to(S("e7"), { autoAlpha: 0, duration: w * 0.07 }, t - 0.05);
        tl.fromTo(
          Q("e8", "[data-bg]"),
          { scale: 1.2, opacity: 0.55, filter: "hue-rotate(0deg) brightness(0.8)" },
          { scale: 1.6, opacity: 0.8, filter: "hue-rotate(-18deg) brightness(0.6)", duration: w * 0.8 },
          t
        );
        readingBeats("e8", t, w, 12, -14);
        // exit: the door of light at the end of the hall opens
        tl.fromTo(Q("e8", ".cut-door"), { scale: 0.06, opacity: 0.9 }, { scale: 30, opacity: 1, duration: w * 0.16, ease: "power3.in" }, t + w * 0.84);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.97);
        t += w;
      }

      /* ————— E9 WHY PANIC — through the door: the night sky ————— */
      {
        const w = SCENES[9].weight;
        const s = S("e9");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e9", ".wash-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        tl.fromTo(Q("e9", "[data-bg]"), { scale: 1.4, yPercent: 12 }, { scale: 1.02, yPercent: -4, duration: w * 0.68 }, t);
        tl.fromTo(Q("e9", ".why"), { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: w * 0.18, ease: "power2.out" }, t + w * 0.1);
        tl.fromTo(Q("e9", ".panic"), { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: w * 0.2, ease: "power3.out" }, t + w * 0.22);
        tl.fromTo(Q("e9", ".planned"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: w * 0.16 }, t + w * 0.48);
        tl.fromTo(Q("e9", ".attrib"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.62);
        // exit: the moon brightens and we rise through it into dawn
        tl.fromTo(Q("e9", ".cut-moon"), { scale: 0.12, opacity: 0 }, { scale: 26, opacity: 1, duration: w * 0.18, ease: "power3.in" }, t + w * 0.8);
        tl.to(Q("e9", "[data-bg]"), { yPercent: 18, scale: 1.25, duration: w * 0.18, ease: "power2.in" }, t + w * 0.8);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.97);
        t += w;
      }

      /* ————— E10 HIGHER POWER — above the clouds at dawn ————— */
      {
        const w = SCENES[10].weight;
        const s = S("e10");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.08);
        tl.fromTo(Q("e10", ".wash-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.16 }, t);
        tl.fromTo(Q("e10", "[data-bg]"), { scale: 1.32, yPercent: -12 }, { scale: 1.02, yPercent: 2, duration: w * 0.7 }, t);
        readingBeats("e10", t, w, 10, -10);
        // exit: dawn light condenses into a single spotlight — a gallery of feeling
        tl.fromTo(Q("e10", ".light-swell"), { opacity: 0 }, { opacity: 1, duration: w * 0.16 }, t + w * 0.82);
        tl.to(s, { autoAlpha: 0, duration: w * 0.05 }, t + w * 0.96);
        t += w;
      }

      /* ————— E11 FEEL SOMETHING — a woman and a painting under one spotlight ————— */
      {
        const w = SCENES[11].weight;
        const s = S("e11");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e11", ".wash-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.16 }, t);
        // medium shot; slow push toward her and the canvas
        tl.fromTo(Q("e11", "[data-bg]"), { scale: 1.02 }, { scale: 1.3, duration: w * 0.8, ease: "power1.in" }, t);
        tl.fromTo(Q("e11", ".scrim"), { opacity: 0 }, { opacity: 0.72, duration: w * 0.1 }, t + w * 0.1);
        readingBeats("e11", t, w, 18, -20);
        // exit: all the way INTO the red-black painting — its currents become water
        tl.to(Q("e11", "[data-bg]"), { scale: 2.6, duration: w * 0.15, ease: "power3.in" }, t + w * 0.85);
        tl.to(Q("e11", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.85);
        tl.fromTo(Q("e11", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E12 FORCE VS. FLOW — the painting's currents are real water ————— */
      {
        const w = SCENES[12].weight;
        const s = S("e12");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.08);
        // drifting with the current — lateral float and gentle roll
        tl.fromTo(
          Q("e12", "[data-bg]"),
          { scale: 1.35, xPercent: -6, rotate: -2 },
          { scale: 1.05, xPercent: 4, rotate: 1.5, duration: w * 0.78 },
          t
        );
        readingBeats("e12", t, w, 16, -16);
        // exit: rise toward the surface — light widens into white
        tl.to(Q("e12", "[data-bg]"), { yPercent: 16, scale: 1.3, duration: w * 0.16, ease: "power2.in" }, t + w * 0.84);
        tl.fromTo(Q("e12", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E13 LIFE IS TESTING YOU — we break the surface into rain ————— */
      {
        const w = SCENES[13].weight;
        const s = S("e13");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e13", ".wash-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // extreme close-up holds; the rain does the moving
        tl.fromTo(Q("e13", "[data-bg]"), { scale: 1.3, yPercent: -6 }, { scale: 1.06, yPercent: 2, duration: w * 0.7 }, t);
        tl.fromTo(Q("e13", ".scrim"), { opacity: 0 }, { opacity: 0.62, duration: w * 0.1 }, t + w * 0.08);
        readingBeats("e13", t, w, 12, -12);
        // exit: lightning — two hard flashes, then the crash
        tl.fromTo(Q("e13", ".cut-flash"), { opacity: 0 }, { opacity: 1, duration: w * 0.02 }, t + w * 0.86);
        tl.to(Q("e13", ".cut-flash"), { opacity: 0, duration: w * 0.02 }, t + w * 0.885);
        tl.to(Q("e13", ".cut-flash"), { opacity: 1, duration: w * 0.025 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E14 THROUGH THE WIRE — rain becomes shattered glass ————— */
      {
        const w = SCENES[14].weight;
        const s = S("e14");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e14", ".wash-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        // macro world: crawl across the cracks
        tl.fromTo(
          Q("e14", "[data-bg]"),
          { scale: 1.5, xPercent: 6, yPercent: -4 },
          { scale: 1.08, xPercent: -4, yPercent: 2, duration: w * 0.75 },
          t
        );
        tl.fromTo(Q("e14", ".scrim"), { opacity: 0 }, { opacity: 0.66, duration: w * 0.1 }, t + w * 0.08);
        readingBeats("e14", t, w, 16, -18);
        // exit: into the glowing stereo — its shine becomes gold
        tl.to(Q("e14", "[data-bg]"), { scale: 2.4, xPercent: 2, yPercent: 8, duration: w * 0.15, ease: "power3.in" }, t + w * 0.85);
        tl.to(Q("e14", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.85);
        tl.fromTo(Q("e14", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E15 REMOVE THE EGO — gold dissolving to dust ————— */
      {
        const w = SCENES[15].weight;
        const s = S("e15");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e15", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // still-life ECU; the material world hangs, then sinks as it dissolves
        tl.fromTo(Q("e15", "[data-bg]"), { scale: 1.28, yPercent: -4 }, { scale: 1.04, yPercent: 6, duration: w * 0.75 }, t);
        tl.fromTo(Q("e15", ".scrim"), { opacity: 0 }, { opacity: 0.6, duration: w * 0.1 }, t + w * 0.08);
        readingBeats("e15", t, w, 14, -16);
        // exit: the last gleam narrows to a thin vertical line — the edge of a mirror
        tl.to(Q("e15", "[data-bg]"), { opacity: 0.25, duration: w * 0.14 }, t + w * 0.84);
        tl.fromTo(Q("e15", ".cut-sliver"), { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: w * 0.1, ease: "power2.in" }, t + w * 0.86);
        tl.to(Q("e15", ".cut-sliver"), { scaleX: 60, duration: w * 0.08, ease: "power3.in" }, t + w * 0.94);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E16 LOWER SELF VS HIGHER SELF — the mirror splits the frame ————— */
      {
        const w = SCENES[16].weight;
        const s = S("e16");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e16", "[data-bg]"), { scale: 1.35 }, { scale: 1.04, duration: w * 0.6, ease: "power1.out" }, t);
        tl.fromTo(Q("e16", ".scrim"), { opacity: 0 }, { opacity: 0.62, duration: w * 0.1 }, t + w * 0.08);
        readingBeats("e16", t, w, 14, -14);
        // exit: push into the shadow half — darkness becomes the unlit bathroom
        tl.to(Q("e16", "[data-bg]"), { scale: 2.2, xPercent: -14, duration: w * 0.15, ease: "power3.in" }, t + w * 0.85);
        tl.to(Q("e16", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.85);
        tl.fromTo(Q("e16", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E17 THE MIRROR TALK — the bathroom mirror at night ————— */
      {
        const w = SCENES[17].weight;
        const s = S("e17");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.08);
        // POV: the bulb warms up, we face ourselves
        tl.fromTo(Q("e17", "[data-bg]"), { scale: 1.4, opacity: 0.5 }, { scale: 1.05, opacity: 1, duration: w * 0.5, ease: "power1.out" }, t);
        tl.fromTo(Q("e17", ".scrim"), { opacity: 0 }, { opacity: 0.68, duration: w * 0.1 }, t + w * 0.1);
        readingBeats("e17", t, w, 16, -18);
        // exit: whip pan away from the mirror — the room smears past
        tl.to(Q("e17", "[data-bg]"), { xPercent: -22, scale: 1.3, duration: w * 0.12, ease: "power3.in" }, t + w * 0.86);
        tl.to(Q("e17", ".copy-pan, .sc-head"), { opacity: 0, xPercent: -30, duration: w * 0.09, ease: "power3.in" }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.97);
        t += w;
      }

      /* ————— E18 ADVENTURE + COMFORT — the doorway between two lives ————— */
      {
        const w = SCENES[18].weight;
        const s = S("e18");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.07);
        // the whip settles on the threshold
        tl.fromTo(Q("e18", "[data-bg]"), { xPercent: 18, scale: 1.25 }, { xPercent: 0, scale: 1.04, duration: w * 0.3, ease: "power2.out" }, t);
        tl.fromTo(Q("e18", ".sc-head"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: w * 0.14 }, t + w * 0.14);
        readWords(Q("e18", "[data-words]"), t + w * 0.26, w * 0.34);
        // hold on the choice, then walk through the door
        tl.to(Q("e18", "[data-bg]"), { scale: 1.5, yPercent: -4, duration: w * 0.28, ease: "power2.in" }, t + w * 0.7);
        tl.to(Q("e18", ".copy-plate-wrap"), { opacity: 0, duration: w * 0.1 }, t + w * 0.76);
        tl.fromTo(Q("e18", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E19 FEAR OR GROWTH — the ledge over the city ————— */
      {
        const w = SCENES[19].weight;
        const s = S("e19");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // POV looking down; vertigo breath
        tl.fromTo(Q("e19", "[data-bg]"), { scale: 1.3, yPercent: -8 }, { scale: 1.05, yPercent: 0, duration: w * 0.4, ease: "power1.out" }, t);
        tl.fromTo(Q("e19", ".scrim"), { opacity: 0 }, { opacity: 0.6, duration: w * 0.1 }, t + w * 0.08);
        readingBeats("e19", t, w, 14, -16);
        tl.to(Q("e19", "[data-bg]"), { scale: 1.12, duration: w * 0.3 }, t + w * 0.5);
        // exit: the leap — plunge toward the lights below
        tl.to(Q("e19", "[data-bg]"), { scale: 2.6, yPercent: 14, duration: w * 0.15, ease: "power4.in" }, t + w * 0.85);
        tl.to(Q("e19", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.85);
        tl.fromTo(Q("e19", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E20 LOVE THE FEELING — the lights below were stage lights ————— */
      {
        const w = SCENES[20].weight;
        const s = S("e20");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e20", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // on stage: lights bloom, the crowd breathes
        tl.fromTo(Q("e20", "[data-bg]"), { scale: 1.35, yPercent: 6 }, { scale: 1.04, yPercent: 0, duration: w * 0.55 }, t);
        readingBeats("e20", t, w, 18, -20);
        // exit: the stage dims — three shafts of light remain in the dark
        tl.to(Q("e20", ".copy-pan"), { opacity: 0, duration: w * 0.08 }, t + w * 0.8);
        tl.fromTo(Q("e20", ".bridge-21"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E21 THREE QUESTIONS — the three lights become three beams ————— */
      {
        const w = SCENES[21].weight;
        const s = S("e21");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.08);
        // wide reverent frame; the beams breathe
        tl.fromTo(Q("e21", "[data-bg]"), { scale: 1.32, yPercent: -6 }, { scale: 1.03, yPercent: 0, duration: w * 0.55, ease: "power1.out" }, t);
        tl.fromTo(Q("e21", ".sc-head"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: w * 0.1 }, t + w * 0.08);
        // the three questions land one per beam
        tl.fromTo(
          Q("e21", ".q-pill"),
          { opacity: 0, y: 34, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: w * 0.12, stagger: w * 0.1, ease: "power2.out" },
          t + w * 0.16
        );
        readWords(Q("e21", ".q-body [data-words]"), t + w * 0.5, w * 0.3);
        tl.fromTo(Q("e21", ".copy-pan"), { yPercent: 10 }, { yPercent: -12, duration: w * 0.6 }, t + w * 0.18);
        // exit: the pills' red floods the frame — the red page
        tl.to(Q("e21", ".q-pill"), { scale: 6, opacity: 0, duration: w * 0.12, ease: "power3.in", stagger: 0 }, t + w * 0.86);
        tl.fromTo(Q("e21", ".cut-red"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E22 F*CK BEING HUMBLE — the red spread ————— */
      {
        const w = SCENES[22].weight;
        const s = S("e22");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.06);
        // the portrait ghosts up through the red
        tl.fromTo(Q("e22", "[data-bg]"), { scale: 1.35, opacity: 0 }, { scale: 1.05, opacity: 0.35, duration: w * 0.5 }, t + w * 0.18);
        tl.fromTo(
          Q("e22", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.2, stagger: w * 0.05, ease: "power3.out" },
          t + w * 0.04
        );
        tl.to(Q("e22", ".aph-wrap"), { yPercent: -26, scale: 0.6, opacity: 0.9, duration: w * 0.16 }, t + w * 0.22);
        readWords(Q("e22", ".red-body [data-words]"), t + w * 0.3, w * 0.34);
        tl.fromTo(Q("e22", ".copy-pan"), { yPercent: 26 }, { yPercent: -26, duration: w * 0.42 }, t + w * 0.26);
        // hold on the full spread, then the portrait breathes up — the beat before the cut
        tl.to(Q("e22", "[data-bg]"), { opacity: 0.55, duration: w * 0.08 }, t + w * 0.78);
        // exit: his gold watch gleam pulls us into the gym light
        tl.to(Q("e22", "[data-bg]"), { scale: 1.7, opacity: 0.6, duration: w * 0.14, ease: "power3.in" }, t + w * 0.86);
        tl.fromTo(Q("e22", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E23 TRAINED BY DOING — the gym, repetition ————— */
      {
        const w = SCENES[23].weight;
        const s = S("e23");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e23", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // close-up rhythm: the camera jabs with the work
        tl.fromTo(Q("e23", "[data-bg]"), { scale: 1.45, xPercent: -5 }, { scale: 1.14, xPercent: 0, duration: w * 0.3, ease: "power2.out" }, t);
        tl.to(Q("e23", "[data-bg]"), { scale: 1.08, xPercent: 3, duration: w * 0.45 }, t + w * 0.3);
        readingBeats("e23", t, w, 12, -12);
        // exit: whip from one hard light to another — gym lamp to stage spot
        tl.to(Q("e23", "[data-bg]"), { xPercent: 24, scale: 1.4, duration: w * 0.12, ease: "power3.in" }, t + w * 0.86);
        tl.to(Q("e23", ".copy-pan, .sc-head"), { opacity: 0, xPercent: 30, duration: w * 0.09, ease: "power3.in" }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.97);
        t += w;
      }

      /* ————— E24 NAME IT FIRST — the battle stage ————— */
      {
        const w = SCENES[24].weight;
        const s = S("e24");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.07);
        // whip settles under the hard spotlight
        tl.fromTo(Q("e24", "[data-bg]"), { xPercent: -20, scale: 1.35 }, { xPercent: 0, scale: 1.04, duration: w * 0.28, ease: "power2.out" }, t);
        readingBeats("e24", t, w, 18, -22);
        // exit: the spotlight irises down to a stopwatch face
        tl.to(Q("e24", "[data-bg]"), { scale: 1.5, opacity: 0.4, duration: w * 0.14, ease: "power2.in" }, t + w * 0.85);
        tl.fromTo(Q("e24", ".cut-iris"), { scale: 8, opacity: 0 }, { scale: 1, opacity: 1, duration: w * 0.13, ease: "power2.in" }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E25 MEASURE IT — the ledger under the lamp ————— */
      {
        const w = SCENES[25].weight;
        const s = S("e25");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e25", ".cut-iris"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        // overhead macro: crawl across the desk of instruments
        tl.fromTo(
          Q("e25", "[data-bg]"),
          { scale: 1.5, xPercent: 5, yPercent: -5, rotate: 1.5 },
          { scale: 1.06, xPercent: -3, yPercent: 3, rotate: 0, duration: w * 0.7 },
          t
        );
        readingBeats("e25", t, w, 14, -14);
        // exit: the pen's ink line becomes a sketch stroke
        tl.to(Q("e25", "[data-bg]"), { scale: 2.1, xPercent: -8, duration: w * 0.14, ease: "power3.in" }, t + w * 0.86);
        tl.to(Q("e25", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.86);
        tl.fromTo(Q("e25", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E26 GENIUS — the candlelit atelier ————— */
      {
        const w = SCENES[26].weight;
        const s = S("e26");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.07);
        // chiaroscuro reveal: candlelight blooms over the studio
        tl.fromTo(Q("e26", "[data-bg]"), { scale: 1.4, yPercent: 6, opacity: 0.5 }, { scale: 1.03, yPercent: 0, opacity: 1, duration: w * 0.5, ease: "power1.out" }, t);
        readingBeats("e26", t, w, 18, -22);
        // exit: a page is crumpled — the frame crushes with it
        tl.to(Q("e26", "[data-bg]"), { scale: 1.9, rotate: -3, duration: w * 0.14, ease: "power3.in" }, t + w * 0.85);
        tl.to(Q("e26", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.85);
        tl.fromTo(Q("e26", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E27 DON'T THROW AWAY THE LESSON — one page still glows ————— */
      {
        const w = SCENES[27].weight;
        const s = S("e27");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // macro: the discarded pages, one lit from within
        tl.fromTo(Q("e27", "[data-bg]"), { scale: 1.45, yPercent: -8 }, { scale: 1.05, yPercent: 4, duration: w * 0.65 }, t);
        readingBeats("e27", t, w, 14, -16);
        // exit: the glow widens into window light
        tl.to(Q("e27", "[data-bg]"), { scale: 1.7, opacity: 0.5, duration: w * 0.15, ease: "power2.in" }, t + w * 0.84);
        tl.fromTo(Q("e27", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.98);
        t += w;
      }

      /* ————— E28 YOU KNOW — the night window, the higher self ————— */
      {
        const w = SCENES[28].weight;
        const s = S("e28");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e28", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // portrait hold; the city breathes in the glass
        tl.fromTo(Q("e28", "[data-bg]"), { scale: 1.35, xPercent: 4 }, { scale: 1.04, xPercent: -2, duration: w * 0.7 }, t);
        readingBeats("e28", t, w, 16, -18);
        // exit: her reflection doubles — the glass fills with sketches of ideas
        tl.to(Q("e28", "[data-bg]"), { scale: 1.8, xPercent: -10, opacity: 0.45, duration: w * 0.14, ease: "power3.in" }, t + w * 0.86);
        tl.to(Q("e28", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.07 }, t + w * 0.86);
        tl.fromTo(Q("e28", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E29 IDEAS ARE WORTH ZERO — the crumpled ideas, the red bin ————— */
      {
        const w = SCENES[29].weight;
        const s = S("e29");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // overhead settle onto the field of crumpled ideas
        tl.fromTo(Q("e29", "[data-bg]"), { scale: 1.5, yPercent: -10, rotate: -2 }, { scale: 1.05, yPercent: 2, rotate: 0, duration: w * 0.55, ease: "power1.out" }, t);
        readingBeats("e29", t, w, 10, -12);
        // exit: the red of the bin swells — potential becomes kinetic
        tl.fromTo(Q("e29", ".cut-red"), { scale: 0, opacity: 1 }, { scale: 30, duration: w * 0.15, ease: "power3.in" }, t + w * 0.85);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E30 APPLICATION IS THE DIFFERENCE — hands at work ————— */
      {
        const w = SCENES[30].weight;
        const s = S("e30");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e30", ".wash-red"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // macro on the hands; the work has its own rhythm
        tl.fromTo(
          Q("e30", "[data-bg]"),
          { scale: 1.45, xPercent: -6, yPercent: 4 },
          { scale: 1.06, xPercent: 4, yPercent: -2, duration: w * 0.7 },
          t
        );
        readingBeats("e30", t, w, 16, -18);
        // bridge to Entry 31: dawn breaks — a road waits for a runner
        tl.to(Q("e30", ".copy-pan"), { opacity: 0, duration: w * 0.08 }, t + w * 0.8);
        tl.fromTo(Q("e30", ".bridge-31"), { opacity: 0 }, { opacity: 1, duration: w * 0.14 }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E31 IDENTITY DECIDES — feet on the dawn road ————— */
      {
        const w = SCENES[31].weight;
        const s = S("e31");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        // moving camera: the run has a cadence
        tl.fromTo(Q("e31", "[data-bg]"), { scale: 1.4, yPercent: 6 }, { scale: 1.08, yPercent: -2, duration: w * 0.5, ease: "power1.out" }, t);
        tl.to(Q("e31", "[data-bg]"), { xPercent: 2.5, duration: w * 0.3 }, t + w * 0.5);
        readingBeats("e31", t, w, 18, -22);
        // exit: the road drops away beneath the stride — down onto the track
        tl.to(Q("e31", "[data-bg]"), { yPercent: -18, scale: 1.5, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e31", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e31", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E32 DISCIPLINE CONSISTENCY BELIEF — the lanes hold the order ————— */
      {
        const w = SCENES[32].weight;
        const s = S("e32");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // low over lane one, rising slowly — same asphalt, new geometry
        tl.fromTo(Q("e32", "[data-bg]"), { scale: 1.45, yPercent: 10 }, { scale: 1.04, yPercent: -4, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e32", t, w, 14, -14);
        // exit: rise overhead — the oval becomes a circle of light
        tl.to(Q("e32", "[data-bg]"), { scale: 1.35, yPercent: -16, duration: w * 0.14, ease: "power2.in" }, t + w * 0.86);
        tl.to(Q("e32", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.86);
        tl.fromTo(Q("e32", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E33 BUSY IS NOT PRODUCTIVE — circles from above ————— */
      {
        const w = SCENES[33].weight;
        const s = S("e33");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // overhead: the roundabout spins its lights in place
        tl.fromTo(Q("e33", "[data-bg]"), { scale: 1.5, rotate: -8 }, { scale: 1.06, rotate: 4, duration: w * 0.65, ease: "power1.out" }, t);
        readingBeats("e33", t, w, 8, -10);
        // exit: one straight line of light leaves the circle — the divider
        tl.fromTo(Q("e33", ".cut-line"), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: w * 0.12, ease: "power2.in" }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.97);
        t += w;
      }

      /* ————— E34 70% / 30% — the line divides the truth ————— */
      {
        const w = SCENES[34].weight;
        const s = S("e34");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(Q("e34", ".pct-line"), { scaleX: 1 }, { scaleX: 1, duration: 0.001 }, t);
        tl.fromTo(Q("e34", ".pct-a"), { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: w * 0.18, ease: "power3.out" }, t + w * 0.1);
        tl.fromTo(Q("e34", ".pct-b"), { opacity: 0, yPercent: 60 }, { opacity: 1, yPercent: 0, duration: w * 0.18, ease: "power3.out" }, t + w * 0.34);
        // hold both truths, then the divider stands up and splits the frame
        tl.to(Q("e34", ".pct-line"), { rotate: 90, scaleX: 2.4, duration: w * 0.14, ease: "power2.inOut" }, t + w * 0.78);
        tl.fromTo(Q("e34", ".cut-cross"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E35 FOCUS + ELIMINATE — the four quadrants ————— */
      {
        const w = SCENES[35].weight;
        const s = S("e35");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(
          Q("e35", ".q-cell"),
          { opacity: 0, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: w * 0.12, stagger: w * 0.07, ease: "power2.out" },
          t + w * 0.14
        );
        readingBeats("e35", t, w, 12, -12);
        // exit: ELIMINATE's red takes the frame — what is cut makes room
        tl.fromTo(Q("e35", ".cut-red"), { scale: 0, opacity: 1 }, { scale: 30, duration: w * 0.14, ease: "power3.in" }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E36 ONE DAY VS. DAY ONE — 5:00 AM ————— */
      {
        const w = SCENES[36].weight;
        const s = S("e36");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e36", ".wash-red"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // macro: dawn crawls across the clock face
        tl.fromTo(Q("e36", "[data-bg]"), { scale: 1.45, xPercent: -5 }, { scale: 1.05, xPercent: 3, duration: w * 0.65 }, t);
        readingBeats("e36", t, w, 14, -16);
        // exit: the clock's circle becomes a compass — iris match cut
        tl.fromTo(Q("e36", ".cut-iris"), { scale: 8, opacity: 0 }, { scale: 1, opacity: 1, duration: w * 0.13, ease: "power2.in" }, t + w * 0.87);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E37 DIRECTION BEFORE SPEED — the needle settles ————— */
      {
        const w = SCENES[37].weight;
        const s = S("e37");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e37", ".cut-iris"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        // macro: the compass breathes, the needle finds north
        tl.fromTo(Q("e37", "[data-bg]"), { scale: 1.4, rotate: 6 }, { scale: 1.05, rotate: -2, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e37", t, w, 10, -12);
        // exit: the brass gleam warms into sunrise gold
        tl.fromTo(Q("e37", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E38 SMILE ANYWAY — sunrise on his face ————— */
      {
        const w = SCENES[38].weight;
        const s = S("e38");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e38", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // portrait: hold on the joy
        tl.fromTo(Q("e38", "[data-bg]"), { scale: 1.3, yPercent: -4 }, { scale: 1.04, yPercent: 0, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e38", t, w, 10, -10);
        // exit: the world goes dark except one small red light — REC
        tl.fromTo(Q("e38", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.86);
        tl.fromTo(Q("e38", ".rec-dot"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E39 JUST START IT. — the red light is already on ————— */
      {
        const w = SCENES[39].weight;
        const s = S("e39");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // medium: the small room, the phone, the beginning
        tl.fromTo(Q("e39", "[data-bg]"), { scale: 1.35, xPercent: 4 }, { scale: 1.04, xPercent: -2, duration: w * 0.6, ease: "power1.out" }, t);
        tl.fromTo(Q("e39", ".rec-pulse"), { opacity: 0.4 }, { opacity: 1, duration: w * 0.06, repeat: 9, yoyo: true }, t + w * 0.1);
        readingBeats("e39", t, w, 12, -14);
        // exit: push into the glowing screen — it becomes the billboard
        tl.to(Q("e39", "[data-bg]"), { scale: 2.2, duration: w * 0.14, ease: "power3.in" }, t + w * 0.86);
        tl.to(Q("e39", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.86);
        tl.fromTo(Q("e39", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E40 MAKE YOUR OWN LUCK — his name in lights ————— */
      {
        const w = SCENES[40].weight;
        const s = S("e40");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e40", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        // low angle: the screen he put himself on
        tl.fromTo(Q("e40", "[data-bg]"), { scale: 1.4, yPercent: 8 }, { scale: 1.04, yPercent: -2, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e40", t, w, 16, -18);
        // bridge to Entry 41: the billboard breaks into data points — luck becomes data
        tl.to(Q("e40", ".copy-pan"), { opacity: 0, duration: w * 0.08 }, t + w * 0.82);
        tl.to(Q("e40", "[data-bg]"), { opacity: 0.25, duration: w * 0.12 }, t + w * 0.84);
        tl.fromTo(Q("e40", ".bridge-41"), { opacity: 0 }, { opacity: 1, duration: w * 0.14 }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E41 the data speaks — four lines of truth ————— */
      {
        const w = SCENES[41].weight;
        const s = S("e41");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(
          Q("e41", ".aph-line"),
          { opacity: 0, yPercent: 90 },
          { opacity: 1, yPercent: 0, duration: w * 0.24, stagger: w * 0.1, ease: "power3.out" },
          t + w * 0.08
        );
        // hold, then the red line leads us out
        tl.to(Q("e41", ".aph-wrap"), { scale: 1.05, duration: w * 0.2 }, t + w * 0.72);
        tl.fromTo(Q("e41", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E42 EVENTS + REACTIONS = OUTCOMES — the cell becomes a study ————— */
      {
        const w = SCENES[42].weight;
        const s = S("e42");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        // the shaft of light through the bars is the only event we control our angle to
        tl.fromTo(Q("e42", "[data-bg]"), { scale: 1.45, xPercent: -6 }, { scale: 1.04, xPercent: 2, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e42", t, w, 16, -18);
        // exit: the light warms — gold takes the frame
        tl.fromTo(Q("e42", ".cut-gold"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E43 POSITIVE ENERGY GOOD VIBES — the gold page ————— */
      {
        const w = SCENES[43].weight;
        const s = S("e43");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e43", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.1, ease: "power3.out" },
          t + w * 0.1
        );
        tl.to(Q("e43", ".aph-wrap"), { scale: 1.05, duration: w * 0.24 }, t + w * 0.66);
        // gold cools into dawn on the wall
        tl.fromTo(Q("e43", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.87);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E44 HARD IS EASY — the grip at dawn ————— */
      {
        const w = SCENES[44].weight;
        const s = S("e44");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e44", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // macro tension: the hold, the negotiation
        tl.fromTo(Q("e44", "[data-bg]"), { scale: 1.45, yPercent: 8 }, { scale: 1.06, yPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e44", t, w, 14, -16);
        // exit: pull up over the edge — into the mind that refused one lane
        tl.to(Q("e44", "[data-bg]"), { yPercent: -14, scale: 1.35, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e44", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e44", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E45 COMPLEXITY IS GENIUS — every part developed ————— */
      {
        const w = SCENES[45].weight;
        const s = S("e45");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the approved page art surfaces through the dark — blended, never a page card
        tl.fromTo(Q("e45", ".art-blend"), { opacity: 0, scale: 1.2 }, { opacity: 0.55, scale: 1.02, duration: w * 0.5 }, t);
        readingBeats("e45", t, w, 12, -14);
        tl.to(Q("e45", ".art-blend"), { opacity: 0.85, duration: w * 0.09 }, t + w * 0.78);
        tl.fromTo(Q("e45", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E46 WORTH MORE — the ordinary made treasure ————— */
      {
        const w = SCENES[46].weight;
        const s = S("e46");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e46", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // macro warmth: steam, hands, morning
        tl.fromTo(Q("e46", "[data-bg]"), { scale: 1.4, xPercent: 5 }, { scale: 1.05, xPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e46", t, w, 14, -16);
        // exit: the hands press forward — an imprint remains
        tl.to(Q("e46", "[data-bg]"), { scale: 1.6, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e46", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e46", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E47 IMPRINTS — the hand in the clay ————— */
      {
        const w = SCENES[47].weight;
        const s = S("e47");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e47", "[data-bg]"), { scale: 1.45, rotate: -2 }, { scale: 1.05, rotate: 1, duration: w * 0.6 }, t);
        readingBeats("e47", t, w, 12, -12);
        // exit: the imprint stills — breath takes over
        tl.fromTo(Q("e47", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E48 PAST, FUTURE, PRESENT — here, now ————— */
      {
        const w = SCENES[48].weight;
        const s = S("e48");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e48", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // stillness: barely any camera at all
        tl.fromTo(Q("e48", "[data-bg]"), { scale: 1.18 }, { scale: 1.04, duration: w * 0.7, ease: "power1.out" }, t);
        readingBeats("e48", t, w, 10, -10);
        // exit: dusk falls — small fires begin to count
        tl.fromTo(Q("e48", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E49 TEN THINGS — count the fires ————— */
      {
        const w = SCENES[49].weight;
        const s = S("e49");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e49", "[data-bg]"), { scale: 1.4, xPercent: -5 }, { scale: 1.04, xPercent: 3, duration: w * 0.65 }, t);
        readingBeats("e49", t, w, 14, -16);
        // exit: the candlelight becomes morning mist light
        tl.fromTo(Q("e49", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E50 FORK IN THE ROAD — two glowing ways ————— */
      {
        const w = SCENES[50].weight;
        const s = S("e50");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e50", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // wide: stand at the fork
        tl.fromTo(Q("e50", "[data-bg]"), { scale: 1.35, yPercent: 6 }, { scale: 1.03, yPercent: -2, duration: w * 0.6 }, t);
        readingBeats("e50", t, w, 16, -18);
        // exit: choose — walk into the right-hand light
        tl.to(Q("e50", "[data-bg]"), { scale: 1.7, xPercent: -10, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e50", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e50", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E51 PERSONAL LEGEND — the pilgrimage ————— */
      {
        const w = SCENES[51].weight;
        const s = S("e51");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e51", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // vast wide: one walker, one calling
        tl.fromTo(Q("e51", "[data-bg]"), { scale: 1.35, xPercent: 6 }, { scale: 1.02, xPercent: -3, duration: w * 0.68 }, t);
        readingBeats("e51", t, w, 12, -14);
        // exit: the golden sand lifts into golden dust
        tl.fromTo(Q("e51", ".cut-gold"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E52 MORE THAN MONEY — the byproduct ————— */
      {
        const w = SCENES[52].weight;
        const s = S("e52");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e52", ".cut-gold"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e52", "[data-bg]"), { scale: 1.4, yPercent: -6 }, { scale: 1.05, yPercent: 2, duration: w * 0.65 }, t);
        readingBeats("e52", t, w, 14, -16);
        // exit: the bills settle onto an emptied desk
        tl.fromTo(Q("e52", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E53 FIRE YOUR JOB — the badge left behind ————— */
      {
        const w = SCENES[53].weight;
        const s = S("e53");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e53", "[data-bg]"), { scale: 1.4, xPercent: -5 }, { scale: 1.04, xPercent: 3, duration: w * 0.65 }, t);
        readingBeats("e53", t, w, 16, -18);
        // exit: out the window — the tower stands against the night
        tl.to(Q("e53", "[data-bg]"), { scale: 1.6, xPercent: 8, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e53", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e53", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E54 EXCELLENCE IN THE WRONG VISION — the lit window in the machine ————— */
      {
        const w = SCENES[54].weight;
        const s = S("e54");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // low angle up the glass
        tl.fromTo(Q("e54", "[data-bg]"), { scale: 1.4, yPercent: 10 }, { scale: 1.04, yPercent: -4, duration: w * 0.65 }, t);
        readingBeats("e54", t, w, 14, -16);
        // exit: one warm window among the grid — home, where the cup is poured
        tl.fromTo(Q("e54", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E55 SELF-FULL > SELFISH — pour your cup first ————— */
      {
        const w = SCENES[55].weight;
        const s = S("e55");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e55", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e55", "[data-bg]"), { scale: 1.38, xPercent: 4 }, { scale: 1.04, xPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e55", t, w, 14, -16);
        // exit: the poured tea ripples — rings expand outward
        tl.fromTo(Q("e55", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E56 IMPACT OUTLASTS HAPPINESS — the ripples keep going ————— */
      {
        const w = SCENES[56].weight;
        const s = S("e56");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e56", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e56", "[data-bg]"), { scale: 1.35, yPercent: -6 }, { scale: 1.04, yPercent: 2, duration: w * 0.65 }, t);
        readingBeats("e56", t, w, 10, -12);
        tl.to(s, { autoAlpha: 1, duration: w * 0.01 }, t + w * 0.9);
        t += w;
      }

      /* ————— E57 PRACTICE COMMUNITY — many hands, one table ————— */
      {
        const w = SCENES[57].weight;
        const s = S("e57");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.07 }, t - 0.12);
        tl.to(S("e56"), { autoAlpha: 0, duration: w * 0.07 }, t - 0.04);
        // overhead: the circle of plates echoes the rings
        tl.fromTo(Q("e57", "[data-bg]"), { scale: 1.45, rotate: 3 }, { scale: 1.05, rotate: -1, duration: w * 0.62 }, t);
        readingBeats("e57", t, w, 10, -12);
        // exit: three points of the table light up — a triangle forms
        tl.fromTo(Q("e57", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E58 FAST. CHEAP. QUALITY. — the three-point system ————— */
      {
        const w = SCENES[58].weight;
        const s = S("e58");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e58", ".tri-svg"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: w * 0.2, ease: "power2.out" }, t + w * 0.1);
        tl.fromTo(
          Q("e58", ".tri-pill"),
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: w * 0.1, stagger: w * 0.08, ease: "power2.out" },
          t + w * 0.18
        );
        tl.fromTo(Q("e58", ".tri-center"), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: w * 0.12, ease: "power3.out" }, t + w * 0.44);
        readingBeats("e58", t, w, 8, -8);
        // exit: two edges of the triangle converge into rails
        tl.to(Q("e58", ".tri-svg, .tri-pill, .tri-center"), { opacity: 0, yPercent: -10, duration: w * 0.1 }, t + w * 0.86);
        tl.fromTo(Q("e58", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E59 LT > ST — the long rails ————— */
      {
        const w = SCENES[59].weight;
        const s = S("e59");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the rails run to the horizon — the long term
        tl.fromTo(Q("e59", "[data-bg]"), { scale: 1.4, yPercent: 8 }, { scale: 1.03, yPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e59", t, w, 16, -18);
        // MAKE TODAY ANSWER TO TOMORROW stands alone for a beat
        tl.fromTo(Q("e59", ".sc-display"), { scale: 1 }, { scale: 1.06, duration: w * 0.12 }, t + w * 0.66);
        // exit: dusk deepens, snow begins
        tl.fromTo(Q("e59", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E60 STOP THE SNOWBALL — momentum, interrupted ————— */
      {
        const w = SCENES[60].weight;
        const s = S("e60");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e60", "[data-bg]"), { scale: 1.35, yPercent: -8 }, { scale: 1.06, yPercent: 4, duration: w * 0.7 }, t);
        readingBeats("e60", t, w, 14, -16);
        // one small event gathers momentum...
        tl.fromTo(
          Q("e60", ".snowball"),
          { opacity: 0, scale: 0.12, xPercent: -160, yPercent: -140 },
          { opacity: 1, scale: 2.6, xPercent: 60, yPercent: 60, duration: w * 0.34, ease: "power2.in" },
          t + w * 0.34
        );
        // ...until it is interrupted and reset while it is still small
        tl.fromTo(Q("e60", ".cut-flash"), { opacity: 0 }, { opacity: 1, duration: w * 0.02 }, t + w * 0.7);
        tl.set(Q("e60", ".snowball"), { scale: 0.12, xPercent: 0, yPercent: 0, opacity: 0.9 }, t + w * 0.72);
        tl.to(Q("e60", ".cut-flash"), { opacity: 0, duration: w * 0.04 }, t + w * 0.73);
        tl.to(Q("e60", ".snowball"), { opacity: 0.9, scale: 0.16, duration: w * 0.08 }, t + w * 0.76);
        // bridge to Entry 61: a second small light joins it — a witness
        tl.to(Q("e60", ".copy-pan"), { opacity: 0, duration: w * 0.07 }, t + w * 0.82);
        tl.fromTo(Q("e60", ".bridge-61"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E61 FAILURE NEEDS A WITNESS — two under one light ————— */
      {
        const w = SCENES[61].weight;
        const s = S("e61");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        // the witness lights resolve into two friends under a streetlight
        tl.fromTo(Q("e61", "[data-bg]"), { scale: 1.4, yPercent: -6 }, { scale: 1.04, yPercent: 2, duration: w * 0.6, ease: "power1.out" }, t);
        readingBeats("e61", t, w, 14, -16);
        // exit: the streetlight warms — the call across time begins
        tl.fromTo(Q("e61", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E62 ASK YOUR 80-YEAR-OLD SELF — the red telephone ————— */
      {
        const w = SCENES[62].weight;
        const s = S("e62");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the receiver hangs between two ages of the same hand
        tl.fromTo(Q("e62", "[data-bg]"), { scale: 1.4, xPercent: -4 }, { scale: 1.04, xPercent: 2, duration: w * 0.6 }, t);
        readingBeats("e62", t, w, 16, -18);
        // exit: the cord swings — water begins to pour
        tl.to(Q("e62", "[data-bg]"), { scale: 1.55, yPercent: 8, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e62", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e62", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E63 WATER THE RELATIONSHIP — one line, one seedling ————— */
      {
        const w = SCENES[63].weight;
        const s = S("e63");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e63", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // macro: the pour
        tl.fromTo(Q("e63", "[data-bg]"), { scale: 1.45, rotate: -2 }, { scale: 1.05, rotate: 1, duration: w * 0.65 }, t);
        readingBeats("e63", t, w, 8, -8);
        // exit: droplets catch the light — a hand extends
        tl.fromTo(Q("e63", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E64 REMEMBER THE NAME — the dap ————— */
      {
        const w = SCENES[64].weight;
        const s = S("e64");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e64", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e64", "[data-bg]"), { scale: 1.42, xPercent: 5 }, { scale: 1.05, xPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e64", t, w, 14, -16);
        // exit: rise overhead — the circle of chairs
        tl.to(Q("e64", "[data-bg]"), { scale: 1.3, yPercent: -12, duration: w * 0.13, ease: "power2.in" }, t + w * 0.87);
        tl.to(Q("e64", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e64", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E65 AUDIT YOUR CIRCLE — seats in and out of the light ————— */
      {
        const w = SCENES[65].weight;
        const s = S("e65");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // overhead: the circle turns slowly
        tl.fromTo(Q("e65", "[data-bg]"), { scale: 1.45, rotate: 4 }, { scale: 1.05, rotate: -2, duration: w * 0.65 }, t);
        readingBeats("e65", t, w, 14, -16);
        // exit: the empty seats recede — the room grows vast
        tl.to(Q("e65", "[data-bg]"), { scale: 0.92, opacity: 0.5, duration: w * 0.13, ease: "power2.in" }, t + w * 0.87);
        tl.fromTo(Q("e65", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E66 BAD RELATIONSHIPS SHRINK YOU — the room dwarfs you ————— */
      {
        const w = SCENES[66].weight;
        const s = S("e66");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the vast dark space; she is small in it
        tl.fromTo(Q("e66", "[data-bg]"), { scale: 1.35, yPercent: -4 }, { scale: 1.03, yPercent: 2, duration: w * 0.6 }, t);
        // the shrinking headline: each letter smaller than the last
        tl.fromTo(
          Q("e66", ".shrink-letter"),
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: w * 0.05, stagger: w * 0.022, ease: "power2.out" },
          t + w * 0.12
        );
        readingBeats("e66", t, w, 14, -16);
        // exit: the dark presses in — fluorescent light stutters on
        tl.fromTo(Q("e66", ".cut-dark"), { opacity: 0 }, { opacity: 0.6, duration: w * 0.03 }, t + w * 0.88);
        tl.to(Q("e66", ".cut-dark"), { opacity: 0.25, duration: w * 0.02 }, t + w * 0.915);
        tl.to(Q("e66", ".cut-dark"), { opacity: 1, duration: w * 0.05 }, t + w * 0.94);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E67 DON'T WORK FOR BAD PEOPLE — the corridor that rewrites you ————— */
      {
        const w = SCENES[67].weight;
        const s = S("e67");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // harsh fluorescence; slow dolly out
        tl.fromTo(Q("e67", "[data-bg]"), { scale: 1.5, yPercent: 4 }, { scale: 1.05, yPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e67", t, w, 16, -18);
        // exit: out the door — warmth on the other side
        tl.to(Q("e67", "[data-bg]"), { scale: 1.6, xPercent: -8, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e67", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e67", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E68 ADD VALUE FIRST — the blue page, hands that give ————— */
      {
        const w = SCENES[68].weight;
        const s = S("e68");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e68", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // the book's deep blue; the giving hands surface through it
        tl.fromTo(Q("e68", "[data-bg]"), { scale: 1.35, opacity: 0.4 }, { scale: 1.04, opacity: 0.75, duration: w * 0.55 }, t);
        readingBeats("e68", t, w, 12, -12);
        // exit: the gift passes across the table — the talk begins
        tl.fromTo(Q("e68", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E69 HAVE THE CONVERSATION — one lamp, two chairs ————— */
      {
        const w = SCENES[69].weight;
        const s = S("e69");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e69", "[data-bg]"), { scale: 1.42, xPercent: -4 }, { scale: 1.05, xPercent: 2, duration: w * 0.65 }, t);
        readingBeats("e69", t, w, 16, -18);
        // the conversation lands — hold, then the hands open
        tl.to(Q("e69", "[data-bg]"), { scale: 1.15, duration: w * 0.2 }, t + w * 0.66);
        tl.fromTo(Q("e69", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E70 FORGIVENESS FREES — hands release the embers ————— */
      {
        const w = SCENES[70].weight;
        const s = S("e70");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e70", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e70", "[data-bg]"), { scale: 1.4, yPercent: 6 }, { scale: 1.04, yPercent: -2, duration: w * 0.65 }, t);
        readingBeats("e70", t, w, 14, -16);
        // bridge to Entry 71: the released light settles into a single listening line
        tl.to(Q("e70", ".copy-pan"), { opacity: 0, duration: w * 0.07 }, t + w * 0.82);
        tl.fromTo(Q("e70", ".bridge-71"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.86);
        tl.fromTo(Q("e70", ".wave-line"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.1, ease: "power2.out" }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E71 REAL LISTENING — the listening line finds a face ————— */
      {
        const w = SCENES[71].weight;
        const s = S("e71");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.07);
        tl.fromTo(Q("e71", "[data-bg]"), { scale: 1.4, xPercent: 5 }, { scale: 1.05, xPercent: -2, duration: w * 0.65, ease: "power1.out" }, t);
        readingBeats("e71", t, w, 14, -16);
        // exit: attention becomes craft — the set lights warm
        tl.fromTo(Q("e71", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E72 HIGH LEVEL CONVERSATIONS — two chairs, full attention ————— */
      {
        const w = SCENES[72].weight;
        const s = S("e72");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e72", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        tl.fromTo(Q("e72", "[data-bg]"), { scale: 1.4, yPercent: -5 }, { scale: 1.04, yPercent: 2, duration: w * 0.65 }, t);
        readingBeats("e72", t, w, 12, -14);
        // exit: the studio glow becomes desert dusk
        tl.fromTo(Q("e72", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E73 THE ENEMY EFFECT — Death Valley at dusk ————— */
      {
        const w = SCENES[73].weight;
        const s = S("e73");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e73", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // wide: the line of hikers, the long shadows
        tl.fromTo(Q("e73", "[data-bg]"), { scale: 1.35, xPercent: -5 }, { scale: 1.03, xPercent: 3, duration: w * 0.68 }, t);
        readingBeats("e73", t, w, 16, -18);
        // exit: the desert night falls to black
        tl.fromTo(Q("e73", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E74 THOUGHT LEADERSHIP — the black page ————— */
      {
        const w = SCENES[74].weight;
        const s = S("e74");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e74", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.1, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(Q("e74", ".aph-wrap"), { scale: 1.05, duration: w * 0.26 }, t + w * 0.62);
        // exit: a shaft of light snaps on — love flips tables
        tl.fromTo(Q("e74", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.05 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E75 CONSTRUCTIVE CONTROVERSY — the flipped table ————— */
      {
        const w = SCENES[75].weight;
        const s = S("e75");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e75", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        tl.fromTo(Q("e75", "[data-bg]"), { scale: 1.45, rotate: 2 }, { scale: 1.05, rotate: -1, duration: w * 0.62 }, t);
        readingBeats("e75", t, w, 12, -12);
        // exit: the dust settles into a deeper black — a podium waits
        tl.fromTo(Q("e75", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E76 SPEAK TRUTH — the black page, the courage quotes ————— */
      {
        const w = SCENES[76].weight;
        const s = S("e76");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e76", "[data-bg]"), { scale: 1.3, opacity: 0 }, { scale: 1.05, opacity: 0.5, duration: w * 0.6 }, t);
        tl.fromTo(Q("e76", ".red-rule"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.14, ease: "power2.out" }, t + w * 0.1);
        readingBeats("e76", t, w, 10, -10);
        // exit: the light narrows — a platform, a departure
        tl.fromTo(Q("e76", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E77 LOYAL, BUT LEARNING — seasons leave on time ————— */
      {
        const w = SCENES[77].weight;
        const s = S("e77");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e77", "[data-bg]"), { scale: 1.4, xPercent: 6 }, { scale: 1.04, xPercent: -3, duration: w * 0.65 }, t);
        readingBeats("e77", t, w, 14, -16);
        // exit: the train's window lights streak into a jeweler's sparkle
        tl.to(Q("e77", "[data-bg]"), { xPercent: -14, scale: 1.3, duration: w * 0.12, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e77", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e77", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E78 MONEY IS ENERGY — the jeweler's presentation ————— */
      {
        const w = SCENES[78].weight;
        const s = S("e78");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e78", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.13 }, t);
        // macro: the gem on velvet, the loupe light
        tl.fromTo(Q("e78", "[data-bg]"), { scale: 1.45, rotate: -2 }, { scale: 1.05, rotate: 1, duration: w * 0.68 }, t);
        readingBeats("e78", t, w, 16, -18);
        // exit: the facets refract — light becomes thought
        tl.to(Q("e78", "[data-bg]"), { scale: 1.7, duration: w * 0.13, ease: "power3.in" }, t + w * 0.87);
        tl.to(Q("e78", ".copy-pan, .sc-head"), { opacity: 0, duration: w * 0.06 }, t + w * 0.87);
        tl.fromTo(Q("e78", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E80 YOUR MIND IS THE ASSET — the lit mind ————— */
      {
        const w = W("e80");
        const s = S("e80");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e80", "[data-bg]"), { scale: 1.35, yPercent: -5 }, { scale: 1.04, yPercent: 2, duration: w * 0.68 }, t);
        readingBeats("e80", t, w, 14, -16);
        // exit: the filaments tighten into wire — a cage takes shape
        tl.fromTo(Q("e80", ".cut-red"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E81 SAFETY IS DANGEROUS — the red page, the open cage ————— */
      {
        const w = W("e81");
        const s = S("e81");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the cage ghosts up through the red
        tl.fromTo(Q("e81", "[data-bg]"), { scale: 1.35, opacity: 0 }, { scale: 1.05, opacity: 0.35, duration: w * 0.55 }, t + w * 0.12);
        readingBeats("e81", t, w, 16, -18);
        // bridge to Entry 82: three tiers of light stack into a pyramid
        tl.to(Q("e81", ".copy-pan"), { opacity: 0, duration: w * 0.07 }, t + w * 0.82);
        tl.fromTo(Q("e81", ".bridge-82"), { opacity: 0 }, { opacity: 1, duration: w * 0.12 }, t + w * 0.86);
        tl.fromTo(
          Q("e81", ".pyr-dot"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: w * 0.05, stagger: w * 0.012 },
          t + w * 0.88
        );
        tl.to(s, { autoAlpha: 0, duration: w * 0.06 }, t + w * 0.95);
        t += w;
      }

      /* ————— E82 THE PYRAMID EFFECT — the vertical climb ————— */
      {
        const w = W("e82");
        const s = S("e82");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the red field folds away; we start low in the bottoms and climb
        tl.fromTo(Q("e82", "[data-bg]"), { scale: 1.5, yPercent: 22 }, { scale: 1.04, yPercent: -14, duration: w * 0.75, ease: "power1.out" }, t);
        readingBeats("e82", t, w, 24, -26);
        // hilltop light opens — the seed of "I AM. ALL OF US."
        tl.fromTo(Q("e82", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E83 I AM. ALL OF US. — the ancestral corridor ————— */
      {
        const w = W("e83");
        const s = S("e83");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e83", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        tl.fromTo(Q("e83", "[data-bg]"), { scale: 1.3, yPercent: -4 }, { scale: 1.03, yPercent: 2, duration: w * 0.7 }, t);
        readingBeats("e83", t, w, 14, -14);
        // the breath of the group portrait settles into stillness
        tl.fromTo(Q("e83", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E84 TRAIN YOUR STILLNESS — the room moves fast, one figure does not ————— */
      {
        const w = W("e84");
        const s = S("e84");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // camera arrives fast, then slows as the copy appears
        tl.fromTo(Q("e84", "[data-bg]"), { scale: 1.5, xPercent: -8 }, { scale: 1.12, xPercent: 2, duration: w * 0.3, ease: "power3.out" }, t);
        tl.to(Q("e84", "[data-bg]"), { scale: 1.02, xPercent: 0, duration: w * 0.5 }, t + w * 0.3);
        readingBeats("e84", t, w, 14, -16);
        // the room freezes into a red still frame
        tl.fromTo(Q("e84", ".cut-red"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E85 the Rayburn page — a hard stop ————— */
      {
        const w = W("e85");
        const s = S("e85");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e85", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.32, stagger: w * 0.09, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(Q("e85", ".aph-wrap"), { scale: 1.04, duration: w * 0.3 }, t + w * 0.6);
        // the red page becomes pigment spreading across a blank canvas
        tl.fromTo(Q("e85", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E86 WORLD IS CANVAS — texture floods the blank ————— */
      {
        const w = W("e86");
        const s = S("e86");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e86", ".cut-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.14 }, t);
        tl.fromTo(Q("e86", "[data-bg]"), { scale: 1.4, filter: "saturate(0.2)" }, { scale: 1.04, filter: "saturate(1.1)", duration: w * 0.6 }, t);
        readingBeats("e86", t, w, 16, -18);
        // a color stroke becomes the red word ASPIRE
        tl.fromTo(Q("e86", ".cut-red"), { xPercent: -104 }, { xPercent: 0, duration: w * 0.1, ease: "power2.in" }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E87 BE INSPIRED. ASPIRE. INSPIRE. — spark, climb, echo ————— */
      {
        const w = W("e87");
        const s = S("e87");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e87", ".cut-red"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        tl.fromTo(Q("e87", "[data-bg]"), { scale: 1.35, yPercent: 8 }, { scale: 1.03, yPercent: -6, duration: w * 0.7 }, t);
        readingBeats("e87", t, w, 18, -20);
        // the three words compress into a single long black line
        tl.fromTo(Q("e87", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E88 THINK LONG. WRITE SHORT. — the edit ————— */
      {
        const w = W("e88");
        const s = S("e88");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e88", "[data-bg]"), { scale: 1.35, opacity: 0.9 }, { scale: 1.02, opacity: 0.45, duration: w * 0.62 }, t);
        readingBeats("e88", t, w, 16, -18);
        // everything not the idea falls away
        tl.fromTo(Q("e88", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E89 ALCHEMIZE COMPLEXITY — the black clarity page ————— */
      {
        const w = W("e89");
        const s = S("e89");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e89", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.11, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(Q("e89", ".aph-wrap"), { scale: 1.04, duration: w * 0.26 }, t + w * 0.62);
        // the final period becomes a cursor — the prompt point
        tl.fromTo(Q("e89", ".cursor-dot"), { opacity: 0 }, { opacity: 1, duration: w * 0.05, repeat: 3, yoyo: true }, t + w * 0.86);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E90 HUMAN RELATIONS > AI — the poster page ————— */
      {
        const w = W("e90");
        const s = S("e90");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(Q("e90", ".grid-veil"), { opacity: 0.4 }, { opacity: 0.12, duration: w * 0.5 }, t);
        tl.fromTo(
          Q("e90", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.32, stagger: w * 0.1, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(Q("e90", ".aph-wrap"), { scale: 1.04, duration: w * 0.24 }, t + w * 0.64);
        // through the greater-than symbol into a trend graph
        tl.fromTo(Q("e90", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E91 TRENDS ARE TRAPS — the maze of metrics ————— */
      {
        const w = W("e91");
        const s = S("e91");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e91", "[data-bg]"), { scale: 1.4, xPercent: 6 }, { scale: 1.03, xPercent: -3, duration: w * 0.65 }, t);
        readingBeats("e91", t, w, 14, -16);
        // the graph lines reconnect into a hidden pattern
        tl.fromTo(Q("e91", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E92 CREATIVITY IS DISCOVERY — hiding in plain sight ————— */
      {
        const w = W("e92");
        const s = S("e92");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e92", "[data-bg]"), { scale: 1.35, opacity: 0.55 }, { scale: 1.02, opacity: 1, duration: w * 0.66 }, t);
        readingBeats("e92", t, w, 14, -16);
        // the discovered pattern becomes a circular time portal
        tl.fromTo(Q("e92", ".cut-warm"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E93 ALL AT ONCE — layers of time ————— */
      {
        const w = W("e93");
        const s = S("e93");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e93", ".cut-warm"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        tl.fromTo(Q("e93", "[data-bg]"), { scale: 1.4, rotate: -3 }, { scale: 1.03, rotate: 1.5, duration: w * 0.7 }, t);
        readingBeats("e93", t, w, 12, -14);
        // the red orbit becomes a camera lens
        tl.fromTo(Q("e93", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E94 VISION — keep the camera rolling ————— */
      {
        const w = W("e94");
        const s = S("e94");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // handheld: a slow drift with grain
        tl.fromTo(Q("e94", "[data-bg]"), { scale: 1.28, xPercent: -3, yPercent: 2 }, { scale: 1.06, xPercent: 3, yPercent: -2, duration: w * 0.7 }, t);
        readingBeats("e94", t, w, 14, -16);
        // the lens turns toward a street seen with fresh eyes
        tl.fromTo(Q("e94", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E95 TOURIST POV — the long way home ————— */
      {
        const w = W("e95");
        const s = S("e95");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e95", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        // a walking dolly through the familiar street
        tl.fromTo(Q("e95", "[data-bg]"), { scale: 1.42, xPercent: 7 }, { scale: 1.02, xPercent: -5, duration: w * 0.75, ease: "power1.out" }, t);
        readingBeats("e95", t, w, 16, -18);
        // the walk slows into still quiet
        tl.fromTo(Q("e95", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.11 }, t + w * 0.88);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E96 THE LUXURY OF BOREDOM — the phone goes dark ————— */
      {
        const w = W("e96");
        const s = S("e96");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e96", "[data-bg]"), { scale: 1.25 }, { scale: 1.02, duration: w * 0.75, ease: "none" }, t);
        readingBeats("e96", t, w, 10, -12);
        // silence — then a sharp memory of excellence
        tl.fromTo(Q("e96", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.05 }, t + w * 0.93);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E97 EXCELLENT IS MEMORABLE — the grid breaks with taste ————— */
      {
        const w = W("e97");
        const s = S("e97");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e97", ".cut-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.1 }, t);
        readingBeats("e97", t, w, 16, -18);
        // a broken rule becomes a red underline
        tl.fromTo(Q("e97", ".red-rule"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.1, ease: "power2.out" }, t + w * 0.86);
        tl.fromTo(Q("e97", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E98 TASTE IS YOUR CEILING — the ceiling lifts ————— */
      {
        const w = W("e98");
        const s = S("e98");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // the room grows as taste improves
        tl.fromTo(Q("e98", "[data-bg]"), { scale: 1.45, yPercent: -12 }, { scale: 1.02, yPercent: 6, duration: w * 0.7 }, t);
        readingBeats("e98", t, w, 12, -14);
        // the lifted ceiling becomes a red horizontal line — the standard
        tl.fromTo(Q("e98", ".red-rule"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.1, ease: "power2.out" }, t + w * 0.87);
        tl.fromTo(Q("e98", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E99 NEW STANDARD — the line resets higher ————— */
      {
        const w = W("e99");
        const s = S("e99");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e99", ".std-line"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.2, ease: "power2.out" }, t + w * 0.08);
        readingBeats("e99", t, w, 12, -14);
        // the line rises — tolerate better
        tl.to(Q("e99", ".std-line"), { yPercent: -260, duration: w * 0.16, ease: "power2.inOut" }, t + w * 0.78);
        tl.fromTo(Q("e99", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E100 SAMPLE FLIP TRANSFORM — the chop ————— */
      {
        const w = W("e100");
        const s = S("e100");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e100", "[data-bg]"), { scale: 1.38, rotate: 2 }, { scale: 1.03, rotate: -1, duration: w * 0.68 }, t);
        readingBeats("e100", t, w, 16, -18);
        // the beat becomes a heartbeat for the next generation
        tl.fromTo(Q("e100", ".cut-red"), { opacity: 0 }, { opacity: 0.9, duration: w * 0.04, repeat: 2, yoyo: true }, t + w * 0.87);
        tl.fromTo(Q("e100", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.07 }, t + w * 0.93);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E101 LEAVE SOMETHING WORTH RECEIVING — the handoff ————— */
      {
        const w = W("e101");
        const s = S("e101");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e101", "[data-bg]"), { scale: 1.32, yPercent: 6 }, { scale: 1.02, yPercent: -4, duration: w * 0.7 }, t);
        readingBeats("e101", t, w, 14, -16);
        // the passed object becomes a bridge across the water
        tl.fromTo(Q("e101", ".cut-glow"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E102 BUILD WHERE YOURE NEEDED — the two-part bridge ————— */
      {
        const w = W("e102");
        const s = S("e102");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.06);
        tl.fromTo(Q("e102", ".cut-glow"), { opacity: 1 }, { opacity: 0, duration: w * 0.1 }, t);
        // a long crossing: the map drifts as both pages read
        tl.fromTo(Q("e102", "[data-bg]"), { scale: 1.3, xPercent: -6 }, { scale: 1.02, xPercent: 5, duration: w * 0.8, ease: "none" }, t);
        readingBeats("e102", t, w, 30, -34);
        // the map folds into a yellow page
        tl.fromTo(Q("e102", ".cut-yellow"), { yPercent: 104 }, { yPercent: 0, duration: w * 0.09, ease: "power2.in" }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E103 WRITE DOWN YOUR PRAYERS — the yellow commandment ————— */
      {
        const w = W("e103");
        const s = S("e103");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.03 }, t - 0.05);
        tl.fromTo(
          Q("e103", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.07, ease: "power3.out" },
          t + w * 0.1
        );
        tl.to(Q("e103", ".aph-wrap"), { scale: 1.05, duration: w * 0.3 }, t + w * 0.56);
        // the yellow field ages into paper and family photographs
        tl.fromTo(Q("e103", ".cut-sepia"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E104 STORY OF YOUR LIFE — the archive ————— */
      {
        const w = W("e104");
        const s = S("e104");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e104", "[data-bg]"), { scale: 1.3, yPercent: -4 }, { scale: 1.02, yPercent: 3, duration: w * 0.7 }, t);
        readingBeats("e104", t, w, 14, -16);
        // from the photographs, a signature begins to form
        tl.fromTo(Q("e104", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E105 WORD IS BRAND — the seal ————— */
      {
        const w = W("e105");
        const s = S("e105");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e105", "[data-bg]"), { scale: 1.35 }, { scale: 1.03, duration: w * 0.68 }, t);
        readingBeats("e105", t, w, 12, -14);
        // the seal breaks into the public test
        tl.fromTo(Q("e105", ".cut-purple"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E106 BE WHO YOU SAY YOU ARE — the purple field ————— */
      {
        const w = W("e106");
        const s = S("e106");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e106", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.09, ease: "power3.out" },
          t + w * 0.12
        );
        // the red line lands beneath CHEAP
        tl.fromTo(Q("e106", ".red-rule"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.12, ease: "power2.out" }, t + w * 0.56);
        tl.to(Q("e106", ".aph-wrap"), { scale: 1.03, duration: w * 0.24 }, t + w * 0.64);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.975);
        t += w;
      }

      /* ————— E107 Cleanliness — the sacred field ————— */
      {
        const w = W("e107");
        const s = S("e107");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.05);
        tl.fromTo(
          Q("e107", ".aph-line"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: w * 0.32, stagger: w * 0.08, ease: "power3.out" },
          t + w * 0.14
        );
        // the glow turns green
        tl.fromTo(Q("e107", ".cut-green"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E108 Remain golden — the green field ————— */
      {
        const w = W("e108");
        const s = S("e108");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.05);
        tl.fromTo(
          Q("e108", ".aph-line"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: w * 0.32, stagger: w * 0.08, ease: "power3.out" },
          t + w * 0.14
        );
        // golden-hour light sweeps across the field
        tl.fromTo(Q("e108", ".gold-sweep"), { xPercent: -120 }, { xPercent: 120, duration: w * 0.5, ease: "none" }, t + w * 0.3);
        tl.fromTo(Q("e108", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E109 BACK AGAINST THE WALL — pressure, then a crack of light ————— */
      {
        const w = W("e109");
        const s = S("e109");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e109", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.06, ease: "power3.out" },
          t + w * 0.1
        );
        // compression — the wall closes in slightly
        tl.to(Q("e109", ".aph-wrap"), { scale: 0.97, duration: w * 0.3 }, t + w * 0.5);
        // light appears through the crack
        tl.fromTo(Q("e109", ".wall-crack"), { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: w * 0.12, ease: "power2.out" }, t + w * 0.82);
        tl.to(s, { autoAlpha: 0, duration: w * 0.04 }, t + w * 0.975);
        t += w;
      }

      /* ————— E110 EVENTUALLY — patience with a pulse ————— */
      {
        const w = W("e110");
        const s = S("e110");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        readingBeats("e110", t, w, 10, -12);
        // the pulse line beats slowly beneath the copy
        tl.fromTo(Q("e110", ".pulse-line"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.4, ease: "none" }, t + w * 0.3);
        // the clock hand becomes a signature stroke
        tl.fromTo(Q("e110", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E111 GOD'S SIGNATURE — podcast to proof ————— */
      {
        const w = W("e111");
        const s = S("e111");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e111", "[data-bg]"), { scale: 1.32, xPercent: -4 }, { scale: 1.02, xPercent: 3, duration: w * 0.7 }, t);
        readingBeats("e111", t, w, 14, -16);
        // the red signature stroke sweeps through
        tl.fromTo(Q("e111", ".sig-stroke"), { scaleX: 0 }, { scaleX: 1, duration: w * 0.14, ease: "power2.inOut" }, t + w * 0.8);
        // the signature becomes a motivational warning
        tl.fromTo(Q("e111", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E112 DON'T GET JEALOUS — the white warning ————— */
      {
        const w = W("e112");
        const s = S("e112");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e112", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.3, stagger: w * 0.07, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(Q("e112", ".aph-wrap"), { scale: 1.03, duration: w * 0.26 }, t + w * 0.6);
        // the red type dims into a memory scene
        tl.fromTo(Q("e112", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E113 PERSPECTIVE — same house, two lenses ————— */
      {
        const w = W("e113");
        const s = S("e113");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        // parallel frames: light shifts across the same rooms
        tl.fromTo(Q("e113", "[data-bg]"), { scale: 1.3, xPercent: 5 }, { scale: 1.02, xPercent: -4, duration: w * 0.75 }, t);
        readingBeats("e113", t, w, 18, -20);
        // the lenses rotate into KNOWLEDGE OF SELF
        tl.fromTo(Q("e113", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.09 }, t + w * 0.9);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E114 KNOWLEDGE OF SELF — the white monument ————— */
      {
        const w = W("e114");
        const s = S("e114");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(
          Q("e114", ".aph-line"),
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: w * 0.32, stagger: w * 0.1, ease: "power3.out" },
          t + w * 0.14
        );
        tl.to(Q("e114", ".aph-wrap"), { scale: 1.04, duration: w * 0.26 }, t + w * 0.6);
        // the red words open into a dossier
        tl.fromTo(Q("e114", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.91);
        tl.to(s, { autoAlpha: 0, duration: w * 0.03 }, t + w * 0.985);
        t += w;
      }

      /* ————— E115 REINTRODUCE YOURSELF — the self-dossier ————— */
      {
        const w = W("e115");
        const s = S("e115");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e115", "[data-bg]"), { scale: 1.34, yPercent: -5 }, { scale: 1.02, yPercent: 4, duration: w * 0.72 }, t);
        readingBeats("e115", t, w, 20, -24);
        // the dossier folder closes
        tl.fromTo(Q("e115", ".cut-dark"), { yPercent: -104 }, { yPercent: 0, duration: w * 0.1, ease: "power2.in" }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E116 KNOW YOUR CHAMPION STORIES — reclamation ————— */
      {
        const w = W("e116");
        const s = S("e116");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.04 }, t - 0.05);
        tl.fromTo(Q("e116", "[data-bg]"), { scale: 1.34, opacity: 0.4 }, { scale: 1.02, opacity: 1, duration: w * 0.7 }, t);
        readingBeats("e116", t, w, 24, -26);
        // story fragments dissolve into miracle-like blank space
        tl.fromTo(Q("e116", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— E117 LEAVE SPACE FOR MIRACLES — the blank square ————— */
      {
        const w = W("e117");
        const s = S("e117");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.05 }, t - 0.06);
        tl.fromTo(Q("e117", ".cut-white"), { opacity: 1 }, { opacity: 0, duration: w * 0.12 }, t);
        tl.fromTo(Q("e117", "[data-bg]"), { scale: 1.3, yPercent: 4 }, { scale: 1.02, yPercent: -3, duration: w * 0.7 }, t);
        readingBeats("e117", t, w, 14, -16);
        // light enters the one blank space and opens into the memory wall
        tl.fromTo(Q("e117", ".miracle-glow"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.6, duration: w * 0.14, ease: "power2.out" }, t + w * 0.84);
        tl.fromTo(Q("e117", ".cut-dark"), { opacity: 0 }, { opacity: 1, duration: w * 0.08 }, t + w * 0.92);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— MEMORY WALL — the visual outro spread ————— */
      {
        const w = W("memory-wall");
        const s = S("memory-wall");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.05);
        tl.fromTo(
          Q("memory-wall", ".mem-item"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: w * 0.3, stagger: w * 0.03, ease: "power3.out" },
          t + w * 0.08
        );
        // slow parallax drift across the wall
        tl.fromTo(Q("memory-wall", ".mem-grid"), { yPercent: 6 }, { yPercent: -8, duration: w * 0.8, ease: "none" }, t + w * 0.1);
        tl.fromTo(Q("memory-wall", ".mem-caption"), { opacity: 0 }, { opacity: 1, duration: w * 0.15 }, t + w * 0.5);
        // the wall exhales into clean white
        tl.fromTo(Q("memory-wall", ".cut-white"), { opacity: 0 }, { opacity: 1, duration: w * 0.1 }, t + w * 0.89);
        tl.to(s, { autoAlpha: 0, duration: w * 0.02 }, t + w * 0.99);
        t += w;
      }

      /* ————— OUTRO PAGE 1 — the book exhales ————— */
      {
        const w = W("outro-p1");
        const s = S("outro-p1");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.05);
        tl.fromTo(
          Q("outro-p1", "[data-out]"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: w * 0.26, stagger: w * 0.028, ease: "power3.out" },
          t + w * 0.08
        );
        tl.fromTo(Q("outro-p1", ".out-pan"), { yPercent: 16 }, { yPercent: -22, duration: w * 0.72, ease: "none" }, t + w * 0.12);
        tl.to(s, { autoAlpha: 0, duration: w * 0.05 }, t + w * 0.96);
        t += w;
      }

      /* ————— OUTRO PAGE 2 — the closing seal ————— */
      {
        const w = W("outro-p2");
        const s = S("outro-p2");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.05);
        tl.fromTo(
          Q("outro-p2", "[data-out]"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: w * 0.24, stagger: w * 0.024, ease: "power3.out" },
          t + w * 0.06
        );
        tl.fromTo(Q("outro-p2", ".out-pan"), { yPercent: 18 }, { yPercent: -26, duration: w * 0.68, ease: "none" }, t + w * 0.1);
        // NOTHING IS RANDOM lands as a seal and holds
        tl.fromTo(Q("outro-p2", ".close-mark"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: w * 0.12, ease: "power3.out" }, t + w * 0.78);
        tl.to(s, { autoAlpha: 0, duration: w * 0.05 }, t + w * 0.965);
        t += w;
      }

      /* ————— AUTHOR — the final brand card ————— */
      {
        const w = W("author");
        const s = S("author");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.06 }, t - 0.05);
        tl.fromTo(
          Q("author", "[data-out]"),
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: w * 0.26, stagger: w * 0.035, ease: "power3.out" },
          t + w * 0.08
        );
        tl.fromTo(Q("author", ".out-pan"), { yPercent: 10 }, { yPercent: -14, duration: w * 0.7, ease: "none" }, t + w * 0.12);
        tl.to(s, { autoAlpha: 0, duration: w * 0.05 }, t + w * 0.96);
        t += w;
      }

      /* ————— FINALE — the pattern continues ————— */
      {
        const w = W("finale");
        const s = S("finale");
        tl.fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: w * 0.08 }, t - 0.05);
        tl.fromTo(
          Q("finale", "[data-out]"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: w * 0.22, stagger: w * 0.05, ease: "power3.out" },
          t + w * 0.12
        );
        tl.to(s, { autoAlpha: 1, duration: 0.001 }, t + w - 0.001);
        t += w;
      }
    }, stage);

    return () => ctx.revert();
  }, []);

  const sceneLabel = SCENES[active].entry
    ? `${String(SCENES[active].entry!.n).padStart(2, "0")} / 117`
    : SCENES[active].id === "intro"
      ? "BEGIN"
      : SCENES[active].id === "memory-wall"
        ? "MEMORY"
        : SCENES[active].id.startsWith("outro")
          ? "OUTRO"
          : SCENES[active].id === "author"
            ? "AUTHOR"
            : "END";

  return (
    <div ref={container} style={{ height: `${Math.round(TOTAL_WEIGHT * UNIT_VH)}vh` }}>
      <div ref={stage} className="stage-fixed bg-black text-[var(--paper)]">
        {/* ————— HUD ————— */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-center justify-between p-4 sm:p-5">
          <Link
            href="/"
            className="pointer-events-auto ui-caps text-[9px] text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full px-3.5 py-2"
          >
            ← Exit
          </Link>
          <button
            onClick={() => setChaptersOpen((v) => !v)}
            className="pointer-events-auto ui-caps text-[9px] text-white/80 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full px-3.5 py-2"
          >
            {sceneLabel} ▾
          </button>
          <button
            onClick={toggleSound}
            className="pointer-events-auto ui-caps text-[9px] text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm rounded-full px-3.5 py-2"
          >
            {soundOn ? "Sound on" : "Sound off"}
          </button>
        </div>
        <div className="absolute left-0 top-0 z-[60] h-full w-[3px] bg-white/10">
          <div
            className="w-full bg-[var(--red)] transition-[height] duration-300"
            style={{ height: `${((active + 1) / SCENES.length) * 100}%` }}
          />
        </div>

        {/* ————— chapter index ————— */}
        {chaptersOpen && (
          <div className="absolute inset-0 z-[70] flex flex-col bg-black/92 backdrop-blur-sm">
            <div className="flex items-center justify-between p-5">
              <span className="ui-caps text-[10px] text-white/70">Entries</span>
              <button
                onClick={() => setChaptersOpen(false)}
                className="ui-caps text-[10px] text-white/70 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid flex-1 auto-rows-min grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto px-5 pb-10 sm:grid-cols-3">
              {SCENES.map((sc, i) =>
                sc.entry ? (
                  <button
                    key={sc.id}
                    onClick={() => jumpToScene(i)}
                    className={`flex items-baseline gap-2 rounded px-2 py-2 text-left transition-colors hover:bg-white/10 ${i === active ? "bg-white/10" : ""}`}
                  >
                    <span className="display text-sm text-[#ff4b55]">{sc.entry.n}.</span>
                    <span className="display text-[13px] leading-tight text-white/90">
                      {sc.entry.title ?? "—"}
                    </span>
                  </button>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* ————— INTRO ————— */}
        <section className="scene bg-black" data-scene="intro">
          <div className="scene-copy items-center text-center">
            <span className="in-star display text-7xl text-[var(--red)] select-none gpu">*</span>
            <div className="in-title mt-8">
              <h1 className="display text-4xl sm:text-6xl">NOTHING IS RANDOM</h1>
              <p className="ui-caps mt-3 text-[10px] text-white/60">The Experience — the complete journey</p>
              <p className="ui-caps mt-1.5 text-[9px] text-white/40">First ten entries free</p>
            </div>
            <div className="in-hint mt-12 space-y-2">
              <p className="serif-body italic text-white/80 text-sm sm:text-base">Your scroll is the camera.</p>
              <p className="ui-caps text-[9px] text-white/50">Move to travel — stop to read — scroll back to rewind</p>
              <div className="mx-auto mt-5 h-10 w-px bg-gradient-to-b from-[var(--red)] to-transparent" />
            </div>
          </div>
        </section>

        {/* ————— E1 HIDDEN PATTERN ————— */}
        <section className="scene bg-black" data-scene="e1">
          <div className="scene-bg gpu" data-bg="/images/env/gallery.jpg" />
          <div className="scrim abs-fill bg-black/80 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(1)} />
          <div className="wash-red abs-fill bg-[var(--red)] pointer-events-none" />
          <div className="cut-white abs-fill bg-[#f2efe8] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E2 PLANT THE SEED ————— */}
        <section className="scene bg-[#120e08]" data-scene="e2">
          <div className="scene-bg gpu" data-bg="/images/env/soil.jpg" />
          <div className="scrim abs-fill bg-black/35 pointer-events-none" />
          <div
            className="light-shaft abs-fill"
            style={{
              background:
                "linear-gradient(175deg, rgba(255,248,228,0.85) 0%, rgba(255,248,228,0.2) 32%, transparent 55%)",
            }}
          />
          <div className="scene-vignette" />
          <ReadingBody entry={E(2)} />
        </section>

        {/* ————— E3 ALIGNMENT MULTIPLIES ————— */}
        <section className="scene bg-[#0a0d12]" data-scene="e3">
          <div className="scene-bg gpu" data-bg="/images/env/classroom-chalk.jpg" />
          <div className="scrim abs-fill bg-black/40 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-center gap-16 opacity-50">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`align-line h-px w-full origin-${i % 2 ? "right" : "left"} bg-white/35`} />
            ))}
          </div>
          <ReadingBody entry={E(3)} />
          <div className="cut-black abs-fill bg-[#0b0d0b] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E4 LIVE IN COLOR ————— */}
        <section className="scene bg-[#101010]" data-scene="e4">
          <div className="scene-bg gpu" data-bg="/images/env/color-street.jpg" />
          <div className="scrim abs-fill bg-black/30 pointer-events-none" />
          <div className="abs-fill bg-gradient-to-t from-black/75 via-black/25 to-black/45" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <EntryTag entry={E(4)} />
              </div>
              <div className="copy-a">
                {E(4).blocks.slice(0, 2).map((b, i) => (
                  <p key={i} data-words className="serif-body font-medium mb-5 text-[17.5px] sm:text-xl leading-[1.75] text-white">
                    {(b as { text: string }).text}
                  </p>
                ))}
              </div>
              <div className="copy-b">
                {E(4).blocks.slice(2, 7).map((b, i) =>
                  b.kind === "kicker" ? (
                    <p key={i} data-words className="ui-caps mb-2 mt-2 text-[12px] font-bold text-[#ff4b55]">
                      {b.text}
                    </p>
                  ) : (
                    <p key={i} data-words className="serif-body font-medium mb-5 text-[17.5px] sm:text-xl leading-[1.75] text-white">
                      {(b as { text: string }).text}
                    </p>
                  )
                )}
              </div>
              <p className="color-line display mt-2 text-2xl sm:text-4xl text-white gpu">
                {"LIVE YOUR PURPOSE. MAKE YOUR MARK. ADD COLOR.".split(" ").map((word, i) => (
                  <span key={i} className={`word mr-[0.35em] ${i > 5 ? "text-[#ff4b55]" : ""}`}>
                    {word}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="cut-red abs-fill bg-[var(--red)] pointer-events-none gpu" style={{ transform: "translateX(-104%)" }} />
        </section>

        {/* ————— E5 EVERY THOUGHT LEAVES A MARK ————— */}
        <section className="scene bg-[#f6f3ec]" data-scene="e5">
          <div className="scene-copy">
            <p className="ui-caps mb-8 text-[10px] text-[var(--ink)]/50">Entry 5</p>
            <div className="aph-wrap gpu">
              {["EVERY THOUGHT", "LEAVES A", "MARK.", "MAKE YOURS", "WORTH", "CARRYING."].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[13.5vw] sm:text-7xl md:text-8xl leading-[0.95] text-[var(--red)]">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="wash-red abs-fill bg-[var(--red)] pointer-events-none" />
          <div className="cut-dot abs-fill m-auto h-16 w-16 rounded-full bg-[#2b0f07] pointer-events-none gpu" style={{ transform: "scale(0)" }} />
        </section>

        {/* ————— E6 TELL THE TRUTH ————— */}
        <section className="scene bg-[#0c0a08]" data-scene="e6">
          <div className="scene-bg gpu" data-bg="/images/env/desk.jpg" />
          <div className="scrim abs-fill bg-black/35 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="abs-fill bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <ReadingBody entry={E(6)} />
          <div
            className="lamp-glow abs-fill pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 68% 42%, rgba(255,120,40,0.95) 0%, rgba(80,20,5,0.85) 45%, rgba(10,4,2,0.95) 100%)",
            }}
          />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E7 APHORISM ————— */}
        <section className="scene bg-black" data-scene="e7">
          <div className="scene-bg gpu opacity-0" data-bg="/images/env/corridor.jpg" />
          <div className="abs-fill bg-black/40" />
          <div className="scene-copy copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/40">Entry 7</p>
            {["A PERSON WHO CAN’T", "SEE THEIR PATTERNS", "IS DESTINED TO", "REPEAT THEM."].map((line) => (
              <div key={line} className="overflow-hidden">
                <p className="aph-line display whitespace-nowrap text-[9.5vw] sm:text-6xl md:text-7xl leading-[1.04] text-white">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ————— E8 THE LESSON WILL NOT RETIRE ————— */}
        <section className="scene bg-black" data-scene="e8">
          <div className="scene-bg gpu" data-bg="/images/env/corridor.jpg" />
          <div className="abs-fill bg-[var(--red)]/10" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(8)} />
          <div
            className="cut-door abs-fill m-auto h-40 w-24 bg-[#ebf0ff] opacity-0 pointer-events-none gpu"
            style={{ borderRadius: "60% 60% 0 0" }}
          />
        </section>

        {/* ————— E9 WHY PANIC ————— */}
        <section className="scene bg-[#05060a]" data-scene="e9">
          <div className="scene-bg gpu" data-bg="/images/env/storm-sky.jpg" />
          <div className="scene-vignette" />
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="why display text-3xl sm:text-5xl text-white">WHY</p>
            <p className="panic display text-[22vw] sm:text-9xl leading-[0.9] text-white">PANIC</p>
            <p className="planned serif-body mt-8 text-xl sm:text-3xl italic text-white">
              if this is how <span className="underline decoration-white/80 underline-offset-8">God planned it?</span>
            </p>
            <p className="attrib serif-body mt-6 text-[15px] text-white/80">- CyHi the Prynce</p>
          </div>
          <div className="wash-white abs-fill bg-[#ebf0ff] pointer-events-none" />
          <div className="cut-moon abs-fill m-auto h-24 w-24 rounded-full bg-[#f4f2ff] opacity-0 pointer-events-none gpu" />
        </section>

        {/* ————— E10 HIGHER POWER ————— */}
        <section className="scene bg-[#1a1206]" data-scene="e10">
          <div className="scene-bg gpu" data-bg="/images/env/above-clouds.jpg" />
          <div className="scrim abs-fill bg-black/35 pointer-events-none" />
          <div className="abs-fill bg-gradient-to-b from-transparent via-black/30 to-black/65" />
          <ReadingBody entry={E(10)} />
          <div className="wash-white abs-fill bg-[#f4f2ff] pointer-events-none" />
          <div className="light-swell abs-fill bg-white opacity-0 pointer-events-none" />
        </section>

        {/* ————— E11 FEEL SOMETHING ————— */}
        <section className="scene bg-[#0b0908]" data-scene="e11">
          <div className="scene-bg gpu" data-bg="/images/env/gallery-woman.jpg" />
          <div className="scrim abs-fill bg-black/80 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(11)} />
          <div className="wash-white abs-fill bg-white pointer-events-none" />
          <div className="cut-dark abs-fill bg-[#06131c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E12 FORCE VS. FLOW ————— */}
        <section className="scene bg-[#06131c]" data-scene="e12">
          <div className="scene-bg gpu" data-bg="/images/env/underwater.jpg" />
          <div className="scrim abs-fill bg-black/35 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(12)} />
          <div className="cut-white abs-fill bg-[#eaf4ff] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E13 LIFE IS TESTING YOU ————— */}
        <section className="scene bg-[#05070a]" data-scene="e13">
          <div className="scene-bg gpu" data-bg="/images/env/rain-face.jpg" />
          <div className="scrim abs-fill bg-black/75 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(13)} />
          <div className="wash-white abs-fill bg-[#eaf4ff] pointer-events-none" />
          <div className="cut-flash abs-fill bg-white opacity-0 pointer-events-none" />
        </section>

        {/* ————— E14 THROUGH THE WIRE ————— */}
        <section className="scene bg-[#0a0505]" data-scene="e14">
          <div className="scene-bg gpu" data-bg="/images/env/crash-glass.jpg" />
          <div className="scrim abs-fill bg-black/75 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(14)} />
          <div className="wash-white abs-fill bg-white pointer-events-none" />
          <div
            className="cut-warm abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(255,190,80,0.98) 0%, rgba(120,60,10,0.9) 50%, rgba(15,6,2,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E15 REMOVE THE EGO ————— */}
        <section className="scene bg-[#070502]" data-scene="e15">
          <div className="scene-bg gpu" data-bg="/images/env/gold-dust.jpg" />
          <div className="scrim abs-fill bg-black/75 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(15)} />
          <div
            className="cut-warm abs-fill pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(255,190,80,0.98) 0%, rgba(120,60,10,0.9) 50%, rgba(15,6,2,0.98) 100%)",
            }}
          />
          <div className="cut-sliver absolute left-1/2 top-0 h-full w-[3px] -ml-[1.5px] bg-[#efe9dd] opacity-0 pointer-events-none gpu origin-center" />
        </section>

        {/* ————— E16 LOWER SELF VS HIGHER SELF ————— */}
        <section className="scene bg-[#0a0708]" data-scene="e16">
          <div className="scene-bg gpu" data-bg="/images/env/mirror-split.jpg" />
          <div className="scrim abs-fill bg-black/75 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(16)} />
          <div className="cut-dark abs-fill bg-[#080607] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E17 THE MIRROR TALK ————— */}
        <section className="scene bg-[#080607]" data-scene="e17">
          <div className="scene-bg gpu" data-bg="/images/env/bathroom-mirror.jpg" />
          <div className="scrim abs-fill bg-black/75 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(17)} />
        </section>

        {/* ————— E18 ADVENTURE + COMFORT ————— */}
        <section className="scene bg-[#0a0c10]" data-scene="e18">
          <div className="scene-bg gpu" data-bg="/images/env/threshold.jpg" />
          <div className="abs-fill bg-gradient-to-t from-black/70 via-transparent to-black/40" />
          <div className="scene-copy copy-shadow">
            <div className="copy-plate-wrap">
              <div className="sc-head">
                <EntryTag entry={E(18)} />
              </div>
              <p data-words className="serif-body text-[19px] sm:text-2xl leading-[1.8] text-white">
                {(E(18).blocks[0] as { text: string }).text}
              </p>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E19 FEAR OR GROWTH ————— */}
        <section className="scene bg-[#05070d]" data-scene="e19">
          <div className="scene-bg gpu" data-bg="/images/env/rooftop-pov.jpg" />
          <div className="scrim abs-fill bg-black/70 opacity-0 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(19)} />
          <div
            className="cut-warm abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, rgba(255,220,150,0.98) 0%, rgba(140,70,20,0.92) 55%, rgba(10,5,2,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E20 LOVE THE FEELING ————— */}
        <section className="scene bg-[#0b0705]" data-scene="e20">
          <div className="scene-bg gpu" data-bg="/images/env/stage-crowd.jpg" />
          <div className="scrim abs-fill bg-black/40 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(20)} />
          <div
            className="cut-warm abs-fill pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 70%, rgba(255,220,150,0.98) 0%, rgba(140,70,20,0.92) 55%, rgba(10,5,2,0.98) 100%)",
            }}
          />
          {/* the stage dims to three points of light — the seed of Entry 21 */}
          <div className="bridge-21 abs-fill flex flex-col items-center justify-center gap-6 opacity-0 pointer-events-none bg-black/70">
            <div className="flex gap-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_6px_rgba(255,255,255,0.5)]"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ————— E21 THREE QUESTIONS ————— */}
        <section className="scene bg-[#070706]" data-scene="e21">
          <div className="scene-bg gpu" data-bg="/images/env/three-lights.jpg" />
          <div className="scrim abs-fill bg-black/40 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <EntryTag entry={E(21)} />
              </div>
              <div className="mb-7 space-y-3">
                {(E(21).blocks.slice(0, 3) as { text: string }[]).map((b, i) => (
                  <div key={i} className="q-pill rounded-xl bg-[var(--red)] px-5 py-3.5 text-center shadow-[0_14px_40px_-12px_rgba(208,32,42,0.7)]">
                    <span className="display text-xl sm:text-3xl text-white">{b.text}</span>
                  </div>
                ))}
              </div>
              <div className="q-body">
                {(E(21).blocks.slice(3) as { text: string }[]).map((b, i) => (
                  <p key={i} data-words className="serif-body font-medium mb-5 text-[17.5px] sm:text-xl leading-[1.75] text-white">
                    {b.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="cut-red abs-fill bg-[var(--red)] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E22 F*CK BEING HUMBLE — the red spread ————— */}
        <section className="scene bg-[#d0202a]" data-scene="e22">
          <div className="scene-bg gpu" data-bg="/images/env/regal.jpg" style={{ mixBlendMode: "multiply" }} />
          <div className="scene-copy read-dim copy-shadow">
            <div className="aph-wrap gpu">
              {["F*CK BEING", "HUMBLE."].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[15vw] sm:text-8xl leading-[0.95] text-white">{line}</p>
                </div>
              ))}
            </div>
            <div className="red-body copy-pan gpu mt-6">
              <Blocks entry={{ ...E(22), blocks: E(22).blocks.slice(1) }} light />
            </div>
          </div>
          <div
            className="cut-warm abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,205,110,0.98) 0%, rgba(130,60,15,0.92) 52%, rgba(12,5,2,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E23 TRAINED BY DOING ————— */}
        <section className="scene bg-[#0a0806]" data-scene="e23">
          <div className="scene-bg gpu" data-bg="/images/env/boxing-gym.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(23)} />
          <div
            className="cut-warm abs-fill pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,205,110,0.98) 0%, rgba(130,60,15,0.92) 52%, rgba(12,5,2,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E24 NAME IT FIRST ————— */}
        <section className="scene bg-[#08070a]" data-scene="e24">
          <div className="scene-bg gpu" data-bg="/images/env/battle-stage.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(24)} />
          <div
            className="cut-iris abs-fill opacity-0 pointer-events-none gpu"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(245,242,235,0.96) 0%, rgba(245,242,235,0.96) 12%, rgba(6,5,4,0.98) 13%, rgba(6,5,4,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E25 MEASURE IT ————— */}
        <section className="scene bg-[#0b0805]" data-scene="e25">
          <div className="scene-bg gpu" data-bg="/images/env/measure-desk.jpg" />
          <div className="scrim abs-fill bg-black/55 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(25)} />
          <div className="cut-dark abs-fill bg-[#0a0703] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E26 GENIUS ————— */}
        <section className="scene bg-[#0a0703]" data-scene="e26">
          <div className="scene-bg gpu" data-bg="/images/env/atelier.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(26)} />
          <div className="cut-dark abs-fill bg-[#070503] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E27 DON'T THROW AWAY THE LESSON ————— */}
        <section className="scene bg-[#070503]" data-scene="e27">
          <div className="scene-bg gpu" data-bg="/images/env/crumpled-glow.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(27)} />
          <div
            className="cut-glow abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E28 YOU KNOW ————— */}
        <section className="scene bg-[#05070c]" data-scene="e28">
          <div className="scene-bg gpu" data-bg="/images/env/window-self.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(28)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#080604] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E29 IDEAS ARE WORTH ZERO ————— */}
        <section className="scene bg-[#080604]" data-scene="e29">
          <div className="scene-bg gpu" data-bg="/images/env/crumpled-ideas.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(29)} />
          <div className="cut-red abs-fill m-auto h-24 w-24 rounded-full bg-[var(--red)] pointer-events-none gpu" style={{ transform: "scale(0)" }} />
        </section>

        {/* ————— E30 APPLICATION IS THE DIFFERENCE ————— */}
        <section className="scene bg-[#0a0704]" data-scene="e30">
          <div className="scene-bg gpu" data-bg="/images/env/workshop-hands.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(30)} />
          <div className="wash-red abs-fill bg-[var(--red)] pointer-events-none" />
          {/* bridge to Entry 31 — dawn breaks over a waiting road */}
          <div className="bridge-31 abs-fill opacity-0 pointer-events-none">
            <div className="scene-bg gpu" data-bg="/images/env/dawn-road.jpg" />
            <div className="abs-fill bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
              <span className="display text-5xl text-white copy-shadow">31.</span>
              <p className="ui-caps text-[10px] text-white/80">Next — Identity Decides</p>
            </div>
          </div>
        </section>

        {/* ————— E31 IDENTITY DECIDES ————— */}
        <section className="scene bg-[#0b0906]" data-scene="e31">
          <div className="scene-bg gpu" data-bg="/images/env/runner-pov.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(31)} />
          <div className="cut-dark abs-fill bg-[#090705] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E32 DISCIPLINE CONSISTENCY BELIEF ————— */}
        <section className="scene bg-[#090705]" data-scene="e32">
          <div className="scene-bg gpu" data-bg="/images/env/track-lanes.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(32)} />
          <div className="cut-dark abs-fill bg-[#060708] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E33 BUSY IS NOT PRODUCTIVE ————— */}
        <section className="scene bg-[#060708]" data-scene="e33">
          <div className="scene-bg gpu" data-bg="/images/env/roundabout.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(33)} />
          <div className="cut-line absolute left-0 top-1/2 h-[3px] w-full origin-center bg-[#efe9dd] opacity-0 pointer-events-none gpu" />
        </section>

        {/* ————— E34 70% / 30% ————— */}
        <section className="scene bg-black" data-scene="e34">
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/45">Entry 34</p>
            <div className="pct-a">
              <p className="display text-[19vw] leading-[0.9] text-white sm:text-8xl">70%</p>
              <p className="display mt-1 text-2xl text-white/95 sm:text-4xl">IS SHOWING UP.</p>
            </div>
            <div className="pct-line mx-auto my-7 h-[3px] w-40 bg-[var(--red)] gpu" />
            <div className="pct-b">
              <p className="display text-[19vw] leading-[0.9] text-white sm:text-8xl">30%</p>
              <p className="display mt-1 text-2xl text-white/95 sm:text-4xl">IS NOT QUITTING.</p>
            </div>
          </div>
          <div className="cut-cross abs-fill opacity-0 pointer-events-none" style={{ background: "linear-gradient(#0a0908 49.6%, #efe9dd 49.6%, #efe9dd 50.4%, #0a0908 50.4%), linear-gradient(90deg, transparent 49.6%, #efe9dd 49.6%, #efe9dd 50.4%, transparent 50.4%)" }} />
        </section>

        {/* ————— E35 FOCUS + ELIMINATE ————— */}
        <section className="scene bg-[#0a0908]" data-scene="e35">
          <div className="abs-fill opacity-60" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(70,66,58,0.5), transparent 65%)" }} />
          <ReadingBody entry={E(35)} />
          <div className="cut-red abs-fill m-auto h-24 w-24 rounded-full bg-[var(--red)] pointer-events-none gpu" style={{ transform: "scale(0)" }} />
        </section>

        {/* ————— E36 ONE DAY VS. DAY ONE ————— */}
        <section className="scene bg-[#0b0805]" data-scene="e36">
          <div className="scene-bg gpu" data-bg="/images/env/alarm-clock.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(36)} />
          <div className="wash-red abs-fill bg-[var(--red)] pointer-events-none" />
          <div
            className="cut-iris abs-fill opacity-0 pointer-events-none gpu"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(232,222,200,0.96) 0%, rgba(232,222,200,0.96) 12%, rgba(7,6,4,0.98) 13%, rgba(7,6,4,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E37 DIRECTION BEFORE SPEED ————— */}
        <section className="scene bg-[#080604]" data-scene="e37">
          <div className="scene-bg gpu" data-bg="/images/env/compass.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(37)} />
          <div
            className="cut-warm abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E38 SMILE ANYWAY ————— */}
        <section className="scene bg-[#0c0805]" data-scene="e38">
          <div className="scene-bg gpu" data-bg="/images/env/elder-smile.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(38)} />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
          <div className="rec-dot absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-[var(--red)] opacity-0 pointer-events-none shadow-[0_0_16px_5px_rgba(208,32,42,0.6)]" />
        </section>

        {/* ————— E39 JUST START IT. ————— */}
        <section className="scene bg-[#070605]" data-scene="e39">
          <div className="scene-bg gpu" data-bg="/images/env/rec-camera.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="rec-pulse absolute right-5 top-16 z-[6] flex items-center gap-2 pointer-events-none">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--red)] shadow-[0_0_12px_4px_rgba(208,32,42,0.55)]" />
            <span className="ui-caps text-[9px] text-white/85">REC</span>
          </div>
          <ReadingBody entry={E(39)} />
          <div
            className="cut-glow abs-fill opacity-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(235,240,255,0.98) 0%, rgba(90,100,140,0.9) 55%, rgba(6,7,10,0.98) 100%)",
            }}
          />
        </section>

        {/* ————— E40 MAKE YOUR OWN LUCK ————— */}
        <section className="scene bg-[#06070a]" data-scene="e40">
          <div className="scene-bg gpu" data-bg="/images/env/billboard.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(40)} />
          {/* bridge to Entry 41 — the lights scatter into data */}
          <div className="bridge-41 abs-fill opacity-0 pointer-events-none bg-black/80">
            <div
              className="abs-fill opacity-80"
              style={{
                backgroundImage:
                  "radial-gradient(1.5px 1.5px at 14% 30%, rgba(244,241,234,0.7) 50%, transparent 51%), radial-gradient(1px 1px at 36% 58%, rgba(244,241,234,0.5) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 58% 22%, rgba(244,241,234,0.6) 50%, transparent 51%), radial-gradient(1px 1px at 74% 46%, rgba(244,241,234,0.45) 50%, transparent 51%), radial-gradient(1.5px 1.5px at 86% 68%, rgba(255,75,85,0.7) 50%, transparent 51%), radial-gradient(1px 1px at 26% 78%, rgba(244,241,234,0.4) 50%, transparent 51%)",
                backgroundSize: "300px 300px, 260px 260px, 320px 320px, 280px 280px, 340px 340px, 300px 300px",
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4">
              <span className="display text-5xl text-white copy-shadow">41.</span>
              <p className="ui-caps text-[10px] text-white/80">Next — Failure Is Progress</p>
            </div>
          </div>
        </section>

        {/* ————— E41 FAILURE IS PROGRESS ————— */}
        <section className="scene bg-[#f2efe8]" data-scene="e41">
          <div className="scene-copy">
            <p className="ui-caps mb-8 text-[10px] text-[var(--ink)]/50">Entry 41</p>
            <div className="aph-wrap gpu">
              {["FAILURE IS PROGRESS.", "FAILURE IS DATA.", "DATA IS DIRECTION.", "DIRECTION IS PROGRESS."].map((line, li) => (
                <div key={line} className="overflow-hidden">
                  <p className={`aph-line display text-[8.6vw] sm:text-5xl md:text-6xl leading-[1.15] ${li === 1 ? "text-[var(--red)]" : "text-[var(--ink)]"}`}>
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#0a0a0c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E42 EVENTS + REACTIONS = OUTCOMES ————— */}
        <section className="scene bg-[#0a0a0c]" data-scene="e42">
          <div className="scene-bg gpu" data-bg="/images/env/prison-light.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(42)} />
          <div className="cut-gold abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(240,181,29,0.98) 0%, rgba(150,100,10,0.94) 60%, rgba(20,12,2,0.98) 100%)" }} />
        </section>

        {/* ————— E43 POSITIVE ENERGY GOOD VIBES — the gold page ————— */}
        <section className="scene bg-[#efb51d]" data-scene="e43">
          <div className="scene-copy">
            <p className="ui-caps mb-8 text-[10px] text-[#17140f]/60">Entry 43</p>
            <div className="aph-wrap gpu">
              {["POSITIVE", "ENERGY", "GOOD VIBES."].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[15vw] sm:text-8xl leading-[0.98] text-[#17140f]">{line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E44 HARD IS EASY ————— */}
        <section className="scene bg-[#0b0805]" data-scene="e44">
          <div className="scene-bg gpu" data-bg="/images/env/climber-hands.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(44)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#08070a] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E45 COMPLEXITY IS GENIUS ————— */}
        <section className="scene bg-[#08070a]" data-scene="e45">
          <div className="abs-fill" style={{ background: "radial-gradient(ellipse at 50% 25%, rgba(60,55,48,0.6), transparent 65%)" }} />
          {/* approved v4 page art, blended into the dark — no page card */}
          <div
            className="art-blend abs-fill gpu opacity-0"
            style={{
              backgroundImage: "url(/images/book/e45-jaylen-v4.jpg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center 30%",
              mixBlendMode: "screen",
              filter: "invert(1) hue-rotate(180deg)",
            }}
          />
          <ReadingBody entry={E(45)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E46 WORTH MORE ————— */}
        <section className="scene bg-[#0c0906]" data-scene="e46">
          <div className="scene-bg gpu" data-bg="/images/env/gratitude-cup.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(46)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#0a0603] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E47 IMPRINTS ————— */}
        <section className="scene bg-[#0a0603]" data-scene="e47">
          <div className="scene-bg gpu" data-bg="/images/env/clay-imprint.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(47)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E48 PAST, FUTURE, PRESENT ————— */}
        <section className="scene bg-[#0b0906]" data-scene="e48">
          <div className="scene-bg gpu" data-bg="/images/env/rooftop-present.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(48)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#070503] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E49 TEN THINGS ————— */}
        <section className="scene bg-[#070503]" data-scene="e49">
          <div className="scene-bg gpu" data-bg="/images/env/candles-ten.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(49)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E50 FORK IN THE ROAD ————— */}
        <section className="scene bg-[#0a0b07]" data-scene="e50">
          <div className="scene-bg gpu" data-bg="/images/env/fork-path.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(50)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E51 PERSONAL LEGEND ————— */}
        <section className="scene bg-[#0c0805]" data-scene="e51">
          <div className="scene-bg gpu" data-bg="/images/env/desert-walker.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(51)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-gold abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(240,181,29,0.98) 0%, rgba(150,100,10,0.94) 60%, rgba(20,12,2,0.98) 100%)" }} />
        </section>

        {/* ————— E52 MORE THAN MONEY ————— */}
        <section className="scene bg-[#0a0704]" data-scene="e52">
          <div className="scene-bg gpu" data-bg="/images/env/money-dust.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(52)} />
          <div className="cut-gold abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(240,181,29,0.98) 0%, rgba(150,100,10,0.94) 60%, rgba(20,12,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#080806] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E53 FIRE YOUR JOB ————— */}
        <section className="scene bg-[#080806]" data-scene="e53">
          <div className="scene-bg gpu" data-bg="/images/env/empty-desk.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(53)} />
          <div className="cut-dark abs-fill bg-[#05070c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E54 EXCELLENCE IN THE WRONG VISION ————— */}
        <section className="scene bg-[#05070c]" data-scene="e54">
          <div className="scene-bg gpu" data-bg="/images/env/corporate-tower.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(54)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E55 SELF-FULL > SELFISH ————— */}
        <section className="scene bg-[#0b0806]" data-scene="e55">
          <div className="scene-bg gpu" data-bg="/images/env/tea-pour.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(55)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E56 IMPACT OUTLASTS HAPPINESS ————— */}
        <section className="scene bg-[#071008]" data-scene="e56">
          <div className="scene-bg gpu" data-bg="/images/env/ripples.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(56)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E57 PRACTICE COMMUNITY ————— */}
        <section className="scene bg-[#0b0805]" data-scene="e57">
          <div className="scene-bg gpu" data-bg="/images/env/cookout-table.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(57)} />
          <div className="cut-dark abs-fill bg-[#0a0908] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E58 FAST. CHEAP. QUALITY. — environmental triangle ————— */}
        <section className="scene bg-[#0a0908]" data-scene="e58">
          <div className="abs-fill opacity-70" style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(60,56,48,0.55), transparent 65%)" }} />
          <ReadingBody entry={E(58)} />
          <div className="cut-dark abs-fill bg-[#0a0806] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E59 LT > ST ————— */}
        <section className="scene bg-[#0a0806]" data-scene="e59">
          <div className="scene-bg gpu" data-bg="/images/env/train-tracks.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(59)} />
          <div className="cut-dark abs-fill bg-[#07080c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E60 STOP THE SNOWBALL ————— */}
        <section className="scene bg-[#07080c]" data-scene="e60">
          <div className="scene-bg gpu" data-bg="/images/env/snow-slope.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(60)} />
          {/* one small event, gathering momentum */}
          <div className="snowball absolute left-1/2 top-1/2 z-[6] h-14 w-14 -ml-7 -mt-7 rounded-full bg-[#f4f1ea] opacity-0 pointer-events-none gpu shadow-[0_0_30px_8px_rgba(244,241,234,0.35)]" />
          <div className="cut-flash abs-fill bg-[var(--red)] opacity-0 pointer-events-none" />
          {/* bridge to Entry 61 — the small light gains a witness */}
          <div className="bridge-61 abs-fill flex flex-col items-center justify-center gap-6 opacity-0 pointer-events-none bg-black/75">
            <div className="flex items-center gap-6">
              <span className="h-3 w-3 rounded-full bg-white shadow-[0_0_16px_5px_rgba(255,255,255,0.5)]" />
              <span className="h-2 w-2 rounded-full bg-[#ff4b55] shadow-[0_0_14px_5px_rgba(208,32,42,0.55)]" />
            </div>
            <p className="ui-caps text-[10px] text-white/80">Next — 61. Failure Needs a Witness</p>
          </div>
        </section>

        {/* ————— E61 FAILURE NEEDS A WITNESS ————— */}
        <section className="scene bg-[#0a0906]" data-scene="e61">
          <div className="scene-bg gpu" data-bg="/images/env/stoop-witness.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(61)} />
          <div className="cut-dark abs-fill bg-[#070605] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E62 ASK YOUR 80-YEAR-OLD SELF ————— */}
        <section className="scene bg-[#070605]" data-scene="e62">
          <div className="scene-bg gpu" data-bg="/images/env/phone-time.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(62)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E63 WATER THE RELATIONSHIP ————— */}
        <section className="scene bg-[#0a0b06]" data-scene="e63">
          <div className="scene-bg gpu" data-bg="/images/env/watering-can.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(63)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E64 REMEMBER THE NAME ————— */}
        <section className="scene bg-[#0b0805]" data-scene="e64">
          <div className="scene-bg gpu" data-bg="/images/env/dap-hands.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(64)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#080706] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E65 AUDIT YOUR CIRCLE ————— */}
        <section className="scene bg-[#080706]" data-scene="e65">
          <div className="scene-bg gpu" data-bg="/images/env/circle-table.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(65)} />
          <div className="cut-dark abs-fill bg-[#060607] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E66 BAD RELATIONSHIPS SHRINK YOU ————— */}
        <section className="scene bg-[#060607]" data-scene="e66">
          <div className="scene-bg gpu" data-bg="/images/env/vast-room.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="display text-3xl sm:text-4xl text-[#ff4b55]">66.</span>
                  <h2 className="display text-3xl sm:text-5xl leading-[0.95] text-white">BAD RELATIONSHIPS</h2>
                </div>
                {/* the book's cascade — each letter smaller than the last */}
                <div className="mb-5 flex items-start pl-1" aria-label="SHRINK YOU">
                  {"SHRINKYOU".split("").map((ch, ci) => (
                    <span
                      key={ci}
                      className="shrink-letter display text-white"
                      style={{
                        fontSize: `clamp(${30 - ci * 2.4}px, ${9 - ci * 0.72}vw, ${64 - ci * 5.4}px)`,
                        transform: `translateY(${ci * 0.55}em)`,
                        marginRight: ch === "K" && ci === 5 ? "0.35em" : "0.04em",
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
              <Blocks entry={E(66)} light />
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#0a100c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E67 DON'T WORK FOR BAD PEOPLE ————— */}
        <section className="scene bg-[#0a100c]" data-scene="e67">
          <div className="scene-bg gpu" data-bg="/images/env/office-corridor.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(67)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E68 ADD VALUE FIRST — the blue page ————— */}
        <section className="scene bg-[#0f4a70]" data-scene="e68">
          <div className="scene-bg gpu" data-bg="/images/env/giving-hands.jpg" style={{ mixBlendMode: "luminosity" }} />
          <div className="abs-fill bg-[#0f4a70]/40 pointer-events-none" />
          <ReadingBody entry={E(68)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#0b0906] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E69 HAVE THE CONVERSATION ————— */}
        <section className="scene bg-[#0b0906]" data-scene="e69">
          <div className="scene-bg gpu" data-bg="/images/env/kitchen-talk.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(69)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E70 FORGIVENESS FREES ————— */}
        <section className="scene bg-[#0b0705]" data-scene="e70">
          <div className="scene-bg gpu" data-bg="/images/env/release-embers.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(70)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          {/* bridge to Entry 71 — the freed hands leave a listening line */}
          <div className="bridge-71 abs-fill flex flex-col items-center justify-center gap-6 opacity-0 pointer-events-none bg-black/75">
            <div className="wave-line h-[2px] w-48 origin-center bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.4)] gpu" style={{ transform: "scaleX(0)" }} />
            <p className="ui-caps text-[10px] text-white/80">Next — 71. Real Listening</p>
          </div>
        </section>

        {/* ————— E71 REAL LISTENING ————— */}
        <section className="scene bg-[#0a0806]" data-scene="e71">
          <div className="scene-bg gpu" data-bg="/images/env/listener-profile.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(71)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E72 HIGH LEVEL CONVERSATIONS ————— */}
        <section className="scene bg-[#0b0806]" data-scene="e72">
          <div className="scene-bg gpu" data-bg="/images/env/podcast-set.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(72)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E73 THE ENEMY EFFECT ————— */}
        <section className="scene bg-[#0c0906]" data-scene="e73">
          <div className="scene-bg gpu" data-bg="/images/env/desert-hikers.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(73)} />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E74 THOUGHT LEADERSHIP — the black page ————— */}
        <section className="scene bg-black" data-scene="e74">
          <div className="scene-copy copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/40">Entry 74</p>
            <div className="aph-wrap gpu">
              {["THOUGHT", "LEADERSHIP"].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[14vw] sm:text-8xl leading-[0.98] text-white">{line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E75 CONSTRUCTIVE CONTROVERSY ————— */}
        <section className="scene bg-[#0a0908]" data-scene="e75">
          <div className="scene-bg gpu" data-bg="/images/env/flipped-table.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(75)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E76 SPEAK TRUTH — the black quote page ————— */}
        <section className="scene bg-black" data-scene="e76">
          <div className="scene-bg gpu opacity-0" data-bg="/images/env/podium-mic.jpg" />
          <div className="abs-fill bg-black/45" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <EntryTag entry={E(76)} />
                <div className="red-rule mb-6 h-[3px] w-40 origin-left bg-[var(--red)] gpu" />
              </div>
              <Blocks entry={E(76)} light />
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#08090b] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E77 LOYAL, BUT LEARNING ————— */}
        <section className="scene bg-[#08090b]" data-scene="e77">
          <div className="scene-bg gpu" data-bg="/images/env/train-platform.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(77)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E78 MONEY IS ENERGY ————— */}
        <section className="scene bg-[#090705]" data-scene="e78">
          <div className="scene-bg gpu" data-bg="/images/env/jeweler-gem.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(78)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#060608] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E80 YOUR MIND IS THE ASSET ————— */}
        <section className="scene bg-[#060608]" data-scene="e80">
          <div className="scene-bg gpu" data-bg="/images/env/neural-head.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(80)} />
          <div className="cut-red abs-fill bg-[#b41d26] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E81 SAFETY IS DANGEROUS — the red page ————— */}
        <section className="scene bg-[#d0202a]" data-scene="e81">
          <div className="scene-bg gpu" data-bg="/images/env/birdcage.jpg" style={{ mixBlendMode: "multiply" }} />
          <ReadingBody entry={E(81)} />
          {/* bridge to Entry 82 — three tiers of light stack into a pyramid */}
          <div className="bridge-82 abs-fill flex flex-col items-center justify-center gap-6 opacity-0 pointer-events-none bg-black/80">
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex gap-3"><span className="pyr-dot h-2 w-2 rounded-full bg-[#ff4b55] shadow-[0_0_12px_4px_rgba(208,32,42,0.5)]" /></div>
              <div className="flex gap-3">{[0, 1].map((i) => (<span key={i} className="pyr-dot h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_3px_rgba(255,255,255,0.35)]" />))}</div>
              <div className="flex gap-3">{[0, 1, 2].map((i) => (<span key={i} className="pyr-dot h-2 w-2 rounded-full bg-white/70 shadow-[0_0_10px_3px_rgba(255,255,255,0.25)]" />))}</div>
            </div>
            <p className="ui-caps text-[10px] text-white/80">Next — 82. The Pyramid Effect</p>
          </div>
        </section>

        {/* ————— E82 THE PYRAMID EFFECT — the vertical climb ————— */}
        <section className="scene bg-[#0b0a08]" data-scene="e82">
          <div className="abs-fill opacity-60" style={{ background: "linear-gradient(to top, rgba(35,28,20,0.9), rgba(90,70,45,0.35) 55%, rgba(160,140,100,0.25))" }} />
          <div className="scene-bg gpu" data-bg="/images/env/oakland-climb.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(82)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E83 I AM. ALL OF US. — the ancestral corridor ————— */}
        <section className="scene bg-[#0a0908]" data-scene="e83">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(90,70,50,0.5), transparent 70%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/ancestral-corridor.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(83)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#0a0a0c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E84 TRAIN YOUR STILLNESS — one still figure ————— */}
        <section className="scene bg-[#0a0a0c]" data-scene="e84">
          <div className="abs-fill opacity-50" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(60,60,80,0.5), transparent 65%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/production-still.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(84)} />
          <div className="cut-red abs-fill bg-[#b41d26] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E85 the Rayburn page — red field, visually unnumbered ————— */}
        <section className="scene bg-[#d0202a]" data-scene="e85">
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-10 text-[10px] text-white/50">Entry 85</p>
            <div className="aph-wrap gpu">
              {["“Life is hard. Be", "Kind to people”"].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line serif-body text-[9.5vw] italic leading-[1.15] text-white sm:text-6xl">{line}</p>
                </div>
              ))}
              <div className="overflow-hidden">
                <p className="aph-line ui-caps mt-8 text-[11px] tracking-[0.3em] text-white/85">Alex Rayburn</p>
              </div>
            </div>
          </div>
          <div className="cut-white abs-fill bg-[#f2efe8] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E86 WORLD IS CANVAS ————— */}
        <section className="scene bg-[#101010]" data-scene="e86">
          <div className="scene-bg gpu" data-bg="/images/env/canvas-world.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(86)} />
          <div className="cut-white abs-fill bg-[#f2efe8] pointer-events-none" />
          <div className="cut-red abs-fill bg-[var(--red)] pointer-events-none" style={{ transform: "translateX(-104%)" }} />
        </section>

        {/* ————— E87 BE INSPIRED. ASPIRE. INSPIRE. — visually unnumbered ————— */}
        <section className="scene bg-[#0c0a08]" data-scene="e87">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 42% 30%, rgba(120,85,40,0.45), transparent 65%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/inspire-spark.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <p className="ui-caps mb-3 text-[10px] text-white/45">Entry 87</p>
                <h2 className="display text-3xl sm:text-5xl leading-[1.02] text-white">
                  BE INSPIRED.
                  <br />
                  <span className="text-[#ff4b55]">ASPIRE.</span>
                  <br />
                  INSPIRE.
                </h2>
              </div>
              <div className="mt-6">
                <Blocks entry={E(87)} light />
              </div>
            </div>
          </div>
          <div className="cut-red abs-fill bg-[var(--red)] pointer-events-none" />
          <div className="cut-dark abs-fill bg-[#0a0a0c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E88 THINK LONG. WRITE SHORT. — the edit ————— */}
        <section className="scene bg-[#0a0a0c]" data-scene="e88">
          <div className="scene-bg gpu" data-bg="/images/env/edit-desk.jpg" />
          <div className="scrim abs-fill bg-black/50 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(88)} />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E89 ALCHEMIZE COMPLEXITY — the black clarity page ————— */}
        <section className="scene bg-black" data-scene="e89">
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/40">Entry 89</p>
            <div className="aph-wrap gpu">
              <div className="overflow-hidden">
                <p className="aph-line display text-[10.5vw] sm:text-7xl leading-[1.02] text-white">ALCHEMIZE</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display text-[10.5vw] sm:text-7xl leading-[1.02] text-white">COMPLEXITY.</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display mt-6 text-[12vw] sm:text-8xl leading-[1.02] text-[#ff4b55]">SAY LESS.</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display text-[12vw] sm:text-8xl leading-[1.02] text-white">
                  MEAN MORE<span className="cursor-dot text-[#ff4b55]">.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ————— E90 HUMAN RELATIONS > AI — the poster page ————— */}
        <section className="scene bg-black" data-scene="e90">
          <div
            className="grid-veil abs-fill pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/40">Entry 90</p>
            <div className="aph-wrap gpu">
              <div className="overflow-hidden">
                <p className="aph-line display text-[11vw] sm:text-8xl leading-[1.02] text-[#ff4b55]">HUMAN</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display text-[11vw] sm:text-8xl leading-[1.02] text-[#ff4b55]">RELATIONS</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display mt-4 text-[9vw] sm:text-6xl leading-[1.05] text-white">&gt; ARTIFICIAL</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display text-[9vw] sm:text-6xl leading-[1.05] text-white">INTELLIGENCE</p>
              </div>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#08090b] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E91 TRENDS ARE TRAPS — the maze of metrics ————— */}
        <section className="scene bg-[#08090b]" data-scene="e91">
          <div className="abs-fill opacity-50" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(40,60,90,0.45), transparent 70%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/trend-maze.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(91)} />
          <div className="cut-dark abs-fill bg-[#0a0806] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E92 CREATIVITY IS DISCOVERY — the red thread ————— */}
        <section className="scene bg-[#0a0806]" data-scene="e92">
          <div className="scene-bg gpu" data-bg="/images/env/red-thread.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(92)} />
          <div className="cut-warm abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
        </section>

        {/* ————— E93 ALL AT ONCE — layers of time ————— */}
        <section className="scene bg-[#0b0906]" data-scene="e93">
          <div className="scene-bg gpu" data-bg="/images/env/time-portal.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(93)} />
          <div className="cut-warm abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,205,120,0.98) 0%, rgba(150,80,25,0.92) 52%, rgba(12,6,2,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#0a0a0a] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E94 VISION — the camera keeps rolling ————— */}
        <section className="scene bg-[#0a0a0a]" data-scene="e94">
          <div className="scene-bg gpu" data-bg="/images/env/doc-camera.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(94)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E95 TOURIST POV — the long way home ————— */}
        <section className="scene bg-[#0b0a08]" data-scene="e95">
          <div className="scene-bg gpu" data-bg="/images/env/tourist-street.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(95)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-dark abs-fill bg-[#0a0908] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E96 THE LUXURY OF BOREDOM — the quiet room ————— */}
        <section className="scene bg-[#0a0908]" data-scene="e96">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 65% 35%, rgba(120,100,70,0.35), transparent 60%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/quiet-room.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(96)} />
          <div className="cut-white abs-fill bg-[#f2efe8] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E97 EXCELLENT IS MEMORABLE — the grid breaks ————— */}
        <section className="scene bg-[#0c0b09]" data-scene="e97">
          <div className="abs-fill opacity-60" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(70,62,50,0.55), transparent 68%)" }} />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <EntryTag entry={E(97)} />
                <div className="red-rule mb-6 h-[3px] w-44 origin-left bg-[var(--red)] gpu" style={{ transform: "scaleX(0)" }} />
              </div>
              <Blocks entry={E(97)} light />
            </div>
          </div>
          <div className="cut-white abs-fill bg-[#f2efe8] pointer-events-none" />
          <div className="cut-dark abs-fill bg-[#0b0a08] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E98 TASTE IS YOUR CEILING — the ceiling lifts ————— */}
        <section className="scene bg-[#0b0a08]" data-scene="e98">
          <div className="scene-bg gpu" data-bg="/images/env/taste-ceiling.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <EntryTag entry={E(98)} />
                <div className="red-rule mb-6 h-[3px] w-full max-w-md origin-left bg-[var(--red)] gpu" style={{ transform: "scaleX(0)" }} />
              </div>
              <Blocks entry={E(98)} light />
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#060708] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E99 NEW STANDARD — the line resets ————— */}
        <section className="scene bg-[#060708]" data-scene="e99">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(55,50,45,0.5), transparent 70%)" }} />
          <div className="std-line absolute left-[8%] right-[8%] top-[62%] z-[4] h-[3px] origin-left bg-[var(--red)] shadow-[0_0_18px_4px_rgba(208,32,42,0.45)] gpu pointer-events-none" style={{ transform: "scaleX(0)" }} />
          <ReadingBody entry={E(99)} />
          <div className="cut-dark abs-fill bg-[#0a0806] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E100 SAMPLE FLIP TRANSFORM — the chop ————— */}
        <section className="scene bg-[#0a0806]" data-scene="e100">
          <div className="scene-bg gpu" data-bg="/images/env/sampler-vinyl.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <div className="mb-2 flex items-baseline gap-3">
                  <span className="display text-3xl sm:text-4xl text-[#ff4b55]">100.</span>
                  <h2 className="display text-3xl sm:text-5xl leading-[0.95] text-white">
                    SAMPLE
                    <br />
                    <span className="text-[#ff4b55]">FLIP</span>
                    <br />
                    TRANSFORM
                  </h2>
                </div>
              </div>
              <Blocks entry={E(100)} light />
            </div>
          </div>
          <div className="cut-red abs-fill bg-[#b41d26] opacity-0 pointer-events-none" />
          <div className="cut-dark abs-fill bg-[#0b0906] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E101 LEAVE SOMETHING WORTH RECEIVING — the handoff ————— */}
        <section className="scene bg-[#0b0906]" data-scene="e101">
          <div className="scene-bg gpu" data-bg="/images/env/passing-hands.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(101)} />
          <div className="cut-glow abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
        </section>

        {/* ————— E102 BUILD WHERE YOURE NEEDED — the two-part bridge ————— */}
        <section className="scene bg-[#0a0b0d]" data-scene="e102">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(40,65,85,0.5), transparent 70%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/diaspora-bridge.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(102)} />
          <div className="cut-glow abs-fill pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,240,210,0.98) 0%, rgba(160,120,60,0.9) 55%, rgba(10,7,4,0.98) 100%)" }} />
          <div className="cut-yellow abs-fill bg-[#f2c31c] pointer-events-none" style={{ transform: "translateY(104%)" }} />
        </section>

        {/* ————— E103 WRITE DOWN YOUR PRAYERS — the yellow commandment ————— */}
        <section className="scene bg-[#f2c31c]" data-scene="e103">
          <div className="scene-copy items-center text-center">
            <p className="ui-caps mb-8 text-[10px] text-black/45">Entry 103</p>
            <div className="aph-wrap gpu">
              {["WRITE", "DOWN", "YOUR", "PRAYERS"].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[15vw] sm:text-9xl leading-[0.95] text-black">{line}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cut-sepia abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 45%, rgba(90,70,45,0.95) 0%, rgba(40,30,20,0.98) 70%)" }} />
        </section>

        {/* ————— E104 STORY OF YOUR LIFE — the archive ————— */}
        <section className="scene bg-[#0d0b08]" data-scene="e104">
          <div className="abs-fill opacity-55" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(90,70,45,0.4), transparent 68%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/family-archive.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(104)} />
          <div className="cut-dark abs-fill bg-[#0b0908] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E105 WORD IS BRAND — the seal ————— */}
        <section className="scene bg-[#0b0908]" data-scene="e105">
          <div className="scene-bg gpu" data-bg="/images/env/wax-seal.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(105)} />
          <div className="cut-purple abs-fill bg-[#3a2352] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E106 BE WHO YOU SAY YOU ARE — the purple field ————— */}
        <section className="scene bg-[#4b2a72]" data-scene="e106">
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/45">Entry 106</p>
            <div className="aph-wrap gpu">
              {["BE WHO", "YOU SAY", "YOU ARE."].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[13vw] sm:text-8xl leading-[0.98] text-white">{line}</p>
                </div>
              ))}
              <div className="overflow-hidden">
                <p className="aph-line display mt-8 text-[7vw] sm:text-5xl leading-[1.05] text-white">
                  TALK IS{" "}
                  <span className="relative inline-block">
                    CHEAP.
                    <span className="red-rule absolute -bottom-1 left-0 right-0 h-[4px] origin-left bg-[var(--red)]" style={{ transform: "scaleX(0)" }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ————— E107 Cleanliness — the sacred field ————— */}
        <section className="scene bg-[#2a1a3e]" data-scene="e107">
          <div className="abs-fill opacity-45" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(120,100,160,0.35), transparent 65%)" }} />
          <div className="scene-copy items-center text-center copy-shadow">
            <div className="aph-wrap gpu">
              <div className="overflow-hidden">
                <p className="aph-line serif-body text-[9vw] italic leading-[1.15] text-white sm:text-6xl">“Cleanliness</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line serif-body text-[9vw] italic leading-[1.15] text-white sm:text-6xl">
                  <span className="display not-italic">IS</span> godliness”
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line ui-caps mt-8 text-[11px] tracking-[0.3em] text-white/80">- Nuri Muhammad</p>
              </div>
            </div>
          </div>
          <div className="cut-green abs-fill opacity-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(50,120,80,0.96) 0%, rgba(20,60,40,0.98) 70%)" }} />
        </section>

        {/* ————— E108 Remain golden — the green field ————— */}
        <section className="scene bg-[#1d4d34]" data-scene="e108">
          <div className="gold-sweep abs-fill pointer-events-none opacity-60" style={{ background: "linear-gradient(115deg, transparent 30%, rgba(232,190,80,0.5) 50%, transparent 70%)", transform: "translateX(-120%)" }} />
          <div className="scene-copy items-center text-center copy-shadow">
            <div className="aph-wrap gpu">
              <div className="overflow-hidden">
                <p className="aph-line serif-body text-[8.5vw] italic leading-[1.2] text-white sm:text-5xl">Life changes. Remain</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line serif-body text-[8.5vw] italic leading-[1.2] text-white sm:text-5xl">golden through it all</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line ui-caps mt-8 text-[11px] tracking-[0.3em] text-white/80">- Casey Jones</p>
              </div>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— E109 BACK AGAINST THE WALL — pressure, then light ————— */}
        <section className="scene bg-black" data-scene="e109">
          <div className="wall-crack absolute left-1/2 top-0 z-[4] h-full w-[2px] origin-bottom bg-gradient-to-t from-white/90 via-white/60 to-transparent opacity-0 pointer-events-none gpu" />
          <div className="scene-copy items-center text-center copy-shadow">
            <p className="ui-caps mb-8 text-[10px] text-white/40">Entry 109</p>
            <div className="aph-wrap gpu">
              {["DO YOUR", "BEST WORK", "WHEN YOUR", "BACK IS", "AGAINST THE", "WALL"].map((line) => (
                <div key={line} className="overflow-hidden">
                  <p className="aph-line display text-[11vw] sm:text-7xl leading-[0.98] text-white">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ————— E110 EVENTUALLY — patience with a pulse ————— */}
        <section className="scene bg-black" data-scene="e110">
          <div className="pulse-line absolute left-[12%] right-[12%] top-[68%] z-[4] h-[2px] origin-left bg-[var(--red)] shadow-[0_0_14px_3px_rgba(208,32,42,0.5)] gpu pointer-events-none" style={{ transform: "scaleX(0)" }} />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <p className="ui-caps mb-3 text-[10px] text-white/45">Entry 110</p>
                <h2 className="display text-4xl sm:text-6xl leading-[0.95] text-white">
                  EVENTUALLY<span className="text-[#ff4b55]">.</span>
                </h2>
              </div>
              <div className="mt-6">
                <Blocks entry={E(110)} light />
              </div>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#0b0908] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E111 GOD'S SIGNATURE — podcast to proof ————— */}
        <section className="scene bg-[#0b0908]" data-scene="e111">
          <div className="scene-bg gpu" data-bg="/images/env/signature-evolution.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="sig-stroke absolute left-[8%] right-[8%] top-[30%] z-[4] h-[5px] origin-left rounded-full bg-[var(--red)] opacity-90 gpu pointer-events-none" style={{ transform: "scaleX(0)" }} />
          <ReadingBody entry={E(111)} />
          <div className="cut-white abs-fill bg-[#f6f3ec] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E112 DON'T GET JEALOUS — the white warning ————— */}
        <section className="scene bg-[#f6f3ec]" data-scene="e112">
          <div className="scene-copy items-center text-center">
            <p className="ui-caps mb-8 text-[10px] text-black/40">Entry 112</p>
            <div className="aph-wrap gpu">
              {[
                { text: "DON'T GET", red: false },
                { text: "JEALOUS,", red: true },
                { text: "WORK", red: false },
                { text: "HARDER.", red: false },
              ].map((line) => (
                <div key={line.text} className="overflow-hidden">
                  <p className={`aph-line display text-[13vw] sm:text-8xl leading-[0.95] ${line.red ? "text-[var(--red)]" : "text-[var(--ink)]"}`}>
                    {line.text}
                  </p>
                </div>
              ))}
              <div className="overflow-hidden">
                <p className="aph-line ui-caps mt-6 text-[11px] tracking-[0.25em] text-black/60">- Dr. J. Alfred Smith Sr.</p>
              </div>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#0c0a09] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E113 PERSPECTIVE — same house, two lenses ————— */}
        <section className="scene bg-[#0c0a09]" data-scene="e113">
          <div className="abs-fill opacity-50" style={{ background: "linear-gradient(90deg, rgba(90,70,45,0.35) 0%, transparent 50%, rgba(45,55,80,0.35) 100%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/two-windows.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(113)} />
          <div className="cut-white abs-fill bg-[#f6f3ec] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E114 KNOWLEDGE OF SELF — the white monument ————— */}
        <section className="scene bg-[#f6f3ec]" data-scene="e114">
          <div className="scene-copy items-center text-center">
            <p className="ui-caps mb-8 text-[10px] text-black/40">Entry 114</p>
            <div className="aph-wrap gpu">
              <div className="overflow-hidden">
                <p className="aph-line display text-[13vw] sm:text-9xl leading-[0.95] text-[var(--ink)]">KNOWLEDGE</p>
              </div>
              <div className="overflow-hidden">
                <p className="aph-line display text-[13vw] sm:text-9xl leading-[0.95] text-[var(--red)]">OF SELF</p>
              </div>
            </div>
          </div>
          <div className="cut-dark abs-fill bg-[#0b0a0c] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E115 REINTRODUCE YOURSELF — the self-dossier ————— */}
        <section className="scene bg-[#0b0a0c]" data-scene="e115">
          <div className="scene-bg gpu" data-bg="/images/env/self-dossier.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <ReadingBody entry={E(115)} />
          <div className="cut-dark abs-fill bg-black pointer-events-none" style={{ transform: "translateY(-104%)" }} />
        </section>

        {/* ————— E116 KNOW YOUR CHAMPION STORIES — reclamation ————— */}
        <section className="scene bg-black" data-scene="e116">
          <div className="abs-fill opacity-50" style={{ background: "radial-gradient(ellipse at 50% 70%, rgba(140,70,30,0.4), transparent 65%)" }} />
          <div className="scene-bg gpu" data-bg="/images/env/griot-fire.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="scene-copy read-dim copy-shadow">
            <div className="copy-pan gpu">
              <div className="sc-head">
                <h2 className="display text-4xl sm:text-6xl leading-[0.98]">
                  <span className="text-[#ff4b55]">RECLAIM</span>
                  <br />
                  <span className="text-white">YOUR HERO</span>
                  <br />
                  <span className="text-white">STORY</span>
                </h2>
                <div className="mb-2 mt-8 flex items-baseline gap-3">
                  <span className="display text-3xl sm:text-4xl text-[#ff4b55]">116.</span>
                  <h3 className="display text-2xl sm:text-4xl leading-[0.95] text-white">
                    KNOW YOUR
                    <br />
                    CHAMPION STORIES
                  </h3>
                </div>
              </div>
              <Blocks entry={{ ...E(116), blocks: E(116).blocks.slice(1) }} light />
            </div>
          </div>
          <div className="cut-white abs-fill bg-[#f6f3ec] opacity-0 pointer-events-none" />
        </section>

        {/* ————— E117 LEAVE SPACE FOR MIRACLES — the blank square ————— */}
        <section className="scene bg-[#0e0d0b]" data-scene="e117">
          <div className="scene-bg gpu" data-bg="/images/env/planning-board.jpg" />
          <div className="scrim abs-fill bg-black/45 pointer-events-none" />
          <div className="scene-vignette" />
          <div className="miracle-glow absolute left-1/2 top-1/2 z-[4] h-40 w-40 -ml-20 -mt-20 rounded-full opacity-0 pointer-events-none gpu" style={{ background: "radial-gradient(circle, rgba(255,245,220,0.9) 0%, transparent 70%)" }} />
          <ReadingBody entry={E(117)} />
          <div className="cut-white abs-fill bg-[#f6f3ec] pointer-events-none" />
          <div className="cut-dark abs-fill bg-black opacity-0 pointer-events-none" />
        </section>

        {/* ————— MEMORY WALL — the visual outro spread ————— */}
        <section className="scene bg-black" data-scene="memory-wall">
          <div className="mem-grid absolute inset-0 z-[2] grid grid-cols-3 content-center gap-3 p-6 sm:grid-cols-4 sm:gap-4 sm:p-12 gpu">
            {[
              "gallery.jpg", "hands.jpg", "dap-hands.jpg", "kitchen-talk.jpg",
              "circle-table.jpg", "city-aerial.jpg", "listener-profile.jpg", "cookout-table.jpg",
              "giving-hands.jpg", "elder-smile.jpg", "color-street.jpg", "desert-hikers.jpg",
            ].map((img, i) => (
              <div
                key={img}
                className={`mem-item overflow-hidden bg-[#141210] ${i % 5 === 0 ? "aspect-[4/5]" : i % 3 === 0 ? "aspect-square" : "aspect-[5/4]"}`}
              >
                <div
                  className="h-full w-full opacity-80"
                  data-bg={`/images/env/${img}`}
                  style={{ backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(0.35) contrast(1.05)" }}
                />
              </div>
            ))}
          </div>
          <div className="abs-fill z-[3] bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none" />
          <p className="mem-caption ui-caps absolute bottom-8 left-1/2 z-[4] -translate-x-1/2 text-center text-[9px] tracking-[0.3em] text-white/55">
            Evidence of a life lived — the rooms, the people, the becoming
          </p>
          <div className="cut-white abs-fill bg-[#f6f3ec] opacity-0 pointer-events-none" />
        </section>

        {/* ————— OUTRO PAGE 1 — the book exhales ————— */}
        <section className="scene bg-[#f6f3ec] text-[var(--ink)]" data-scene="outro-p1">
          <div className="scene-copy">
            <div className="out-pan gpu mx-auto w-full max-w-xl">
              <p data-out className="serif-body text-lg italic text-[var(--ink)]/85 sm:text-xl">
                {OUTRO.page1.lead}
              </p>
              <div data-out className="mt-6 h-[3px] w-24 bg-[var(--red)]" />
              <div className="mt-7 space-y-4">
                {OUTRO.page1.paras.map((p) => (
                  <p key={p.slice(0, 24)} data-out className="serif-body text-[14.5px] leading-[1.75] text-[var(--ink)]/85 sm:text-[15.5px]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-7 space-y-1.5">
                {OUTRO.page1.litany.map((l) => (
                  <p key={l} data-out className="serif-body text-[14.5px] font-bold italic text-[var(--ink)] sm:text-[15.5px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-7 space-y-4">
                {OUTRO.page1.close.map((p) => (
                  <p key={p.slice(0, 24)} data-out className="serif-body text-[14.5px] leading-[1.75] text-[var(--ink)]/85 sm:text-[15.5px]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 space-y-1">
                {OUTRO.page1.central.map((l) => (
                  <p key={l} data-out className="display text-xl leading-snug text-[var(--ink)] sm:text-2xl">
                    {l}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ————— OUTRO PAGE 2 — the closing seal ————— */}
        <section className="scene bg-[#f6f3ec] text-[var(--ink)]" data-scene="outro-p2">
          <div className="scene-copy">
            <div className="out-pan gpu mx-auto w-full max-w-xl">
              <div className="space-y-4">
                {OUTRO.page2.paras.map((p) => (
                  <p key={p.slice(0, 24)} data-out className="serif-body text-[14.5px] leading-[1.75] text-[var(--ink)]/85 sm:text-[15.5px]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-1.5">
                {OUTRO.page2.litany.map((l) => (
                  <p key={l} data-out className="serif-body text-[14.5px] font-bold italic text-[var(--ink)] sm:text-[15.5px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {OUTRO.page2.close.map((p) => (
                  <p key={p.slice(0, 24)} data-out className="serif-body text-[14.5px] leading-[1.75] text-[var(--ink)]/85 sm:text-[15.5px]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-1.5">
                {OUTRO.page2.resolve.map((l) => (
                  <p key={l} data-out className="serif-body text-[15px] font-bold text-[var(--ink)] sm:text-[16px]">
                    {l}
                  </p>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {OUTRO.page2.final.map((p) => (
                  <p key={p.slice(0, 24)} data-out className="serif-body text-[14.5px] leading-[1.75] text-[var(--ink)]/85 sm:text-[15.5px]">
                    {p}
                  </p>
                ))}
              </div>
              <p className="close-mark display mt-12 text-4xl text-[var(--red)] sm:text-6xl">
                {OUTRO.page2.mark}
              </p>
            </div>
          </div>
        </section>

        {/* ————— AUTHOR — the final brand card ————— */}
        <section className="scene bg-[#f6f3ec] text-[var(--ink)]" data-scene="author">
          <div className="scene-copy">
            <div className="out-pan gpu mx-auto grid w-full max-w-3xl gap-8 sm:grid-cols-5 sm:items-center">
              <div data-out className="relative sm:col-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/book/author-v4.jpg"
                  alt="B. Amechi"
                  className="mx-auto w-full max-w-[260px] shadow-[0_40px_80px_-35px_rgba(208,32,42,0.4)]"
                  loading="lazy"
                />
                <div className="absolute -bottom-3 -right-2 bg-[var(--red)] px-3 py-1.5 sm:-right-3">
                  <span className="ui-caps text-[8px] text-white">{AUTHOR.roles}</span>
                </div>
              </div>
              <div className="sm:col-span-3">
                <h2 data-out className="display text-5xl sm:text-6xl">
                  {AUTHOR.name}
                </h2>
                <div className="mt-5 space-y-3">
                  {AUTHOR.bio.slice(0, 2).map((p) => (
                    <p key={p.slice(0, 24)} data-out className="serif-body text-[13.5px] leading-[1.7] text-[var(--ink)]/80">
                      {p}
                    </p>
                  ))}
                </div>
                <p data-out className="display mt-6 text-lg text-[var(--ink)]">
                  {AUTHOR.motto}
                </p>
                <div className="mt-4 space-y-3">
                  {AUTHOR.bio.slice(2).map((p) => (
                    <p key={p.slice(0, 24)} data-out className="serif-body text-[13.5px] leading-[1.7] text-[var(--ink)]/80">
                      {p}
                    </p>
                  ))}
                </div>
                <p data-out className="ui-caps mt-6 text-[10px] text-[var(--red)]">
                  {AUTHOR.missionLine}
                </p>
                <div data-out className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--ink)]/15 pt-4">
                  <a href={AUTHOR.links.site} target="_blank" rel="noreferrer" className="ui-caps text-[10px] text-[var(--ink)]/70 hover:text-[var(--ink)]">
                    {AUTHOR.links.siteLabel}
                  </a>
                  <a href={AUTHOR.links.instagram} target="_blank" rel="noreferrer" className="ui-caps text-[10px] text-[var(--ink)]/70 hover:text-[var(--ink)]">
                    {AUTHOR.links.instagramLabel}
                  </a>
                  <a href={AUTHOR.links.email} className="ui-caps text-[10px] text-[var(--ink)]/70 hover:text-[var(--ink)]">
                    {AUTHOR.links.emailLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ————— FINALE — the pattern continues ————— */}
        <section className="scene overflow-y-auto bg-black text-[var(--paper)]" data-scene="finale">
          <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-5 py-16 text-center">
            <p data-out className="ui-caps text-[10px] text-white/55">
              You have travelled the complete interactive experience
            </p>
            <h2 data-out className="display mt-5 text-5xl sm:text-7xl">
              THE PATTERN
              <br />
              CONTINUES<span className="text-[var(--red)]">.</span>
            </h2>
            <p data-out className="serif-body mt-5 max-w-md text-[15px] text-white/75">
              Carry it with you — the book, the audio, the whole experience. Or begin the
              free challenge and keep paying attention.
            </p>
            <div data-out className="mt-10 w-full">
              <ProductGrid dark compact />
            </div>
            <div data-out className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={CHALLENGE_PATH} className="btn btn-ghost-light">
                Start Free 7-Day Challenge
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn btn-ghost-light"
              >
                Return to Beginning
              </button>
              <button onClick={shareExperience} className="btn btn-ghost-light">
                {shared ? "Link Copied" : "Share the Experience"}
              </button>
              <Link href="/" className="btn btn-ghost-light">
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>

      {paywall && (
        <Paywall
          onUnlock={() => closePaywall(true)}
          onReturn={() => {
            closePaywall(false);
            jumpToScene(FREE_BOUNDARY - 1);
          }}
        />
      )}
    </div>
  );
}
