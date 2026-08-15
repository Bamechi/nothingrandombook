"use client";

import { useEffect, useRef } from "react";

/** Red-dot cursor that grows into a ring over interactive elements. Desktop only. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.classList.remove("is-hidden");
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [data-cursor]");
      el.classList.toggle("is-hover", interactive);
    };
    const onLeave = () => el.classList.add("is-hidden");

    const loop = () => {
      cx += (x - cx) * 0.28;
      cy += (y - cy) * 0.28;
      el.style.transform = `translate(${cx - el.offsetWidth / 2}px, ${cy - el.offsetHeight / 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="nir-cursor is-hidden" aria-hidden="true" />;
}
