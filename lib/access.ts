import { ACCESS_CODES } from "@/lib/content";

/**
 * Full-experience unlock state.
 * The first ten entries are free for everyone; past Entry 10 the visitor
 * unlocks with an access code (or purchase). Persisted in localStorage.
 */

const UNLOCK_KEY = "nir-unlock";

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(UNLOCK_KEY) === "1") return true;
    // honor unlocks granted by the previous session-based gate
    if (sessionStorage.getItem("nir-unlocked") === "1") return true;
  } catch {}
  return false;
}

export function setUnlocked(): void {
  try {
    localStorage.setItem(UNLOCK_KEY, "1");
  } catch {}
}

/** Case-insensitive match against the configured access codes. */
export function checkAccessCode(code: string): boolean {
  const v = code.trim().toLowerCase();
  if (!v) return false;
  return ACCESS_CODES.some((c) => !c.includes("_HERE") && c.toLowerCase() === v);
}
