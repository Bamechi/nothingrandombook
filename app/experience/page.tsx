"use client";

import { useEffect, useState } from "react";
import Experience from "@/components/experience/Experience";
import Reader from "@/components/experience/Reader";

/**
 * The experience opens free for everyone — the first ten entries need no
 * code. The paywall invitation appears contextually past Entry 10
 * (inside Experience / Reader).
 */
export default function ExperiencePage() {
  const [reduced, setReduced] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.scrollTo(0, 0);
  }, []);

  if (reduced === undefined) {
    return <div className="fixed inset-0 bg-black" />;
  }

  return reduced ? <Reader /> : <Experience />;
}
