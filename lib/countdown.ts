/**
 * 48-hour Bundle countdown.
 * The clock starts at the visitor's first entry to the site (stored in
 * localStorage) and runs 48 hours from that timestamp.
 */

const FIRST_VISIT_KEY = "nir-first-visit";
export const BUNDLE_WINDOW_MS = 48 * 60 * 60 * 1000;

/** First-visit timestamp in ms; set on first call. SSR-safe. */
export function getFirstVisit(): number {
  if (typeof window === "undefined") return Date.now();
  try {
    const raw = localStorage.getItem(FIRST_VISIT_KEY);
    if (raw) {
      const n = Number(raw);
      if (Number.isFinite(n) && n > 0) return n;
    }
    const now = Date.now();
    localStorage.setItem(FIRST_VISIT_KEY, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

export function getBundleDeadline(): number {
  return getFirstVisit() + BUNDLE_WINDOW_MS;
}

export function msRemaining(): number {
  return Math.max(0, getBundleDeadline() - Date.now());
}

/** "HH:MM:SS" — hours can exceed 24 (48-hour window). */
export function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
