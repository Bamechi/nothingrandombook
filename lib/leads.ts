/**
 * Google Sheets lead capture via a Google Apps Script Web App.
 *
 * Replace GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE with the deployed Web App URL
 * (see integrations/google-apps-script/ next to this app for Code.gs and
 * step-by-step deployment instructions).
 *
 * Design rules:
 * - Simple no-cors POST — no backend required.
 * - The site must keep working visually if the sync fails; every caller
 *   shows its success state regardless and failures only log to console.
 */

export const SHEETS_ENDPOINT = "GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

export interface Lead {
  name?: string;
  email?: string;
  phone?: string;
  optInAuthorCommunityEmails?: "yes" | "no";
  source: string;
  productInterest?: string;
  challengeAccessed?: "yes" | "no";
  selectedWorkbook?: string;
  currentEntryReached?: number | string;
  accessCodeUsed?: string;
  answersJson?: string;
}

/** True once the real Web App URL has been pasted in. */
export function sheetsConfigured(): boolean {
  return !SHEETS_ENDPOINT.includes("_HERE");
}

/**
 * Fire-and-forget submission to the Google Sheet.
 * Resolves true when the request was handed to the network (opaque
 * responses count as success), false only on hard failure — callers may
 * ignore the result and show success either way.
 */
export async function postLead(lead: Lead): Promise<boolean> {
  const payload = {
    timestamp: new Date().toISOString(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    ...lead,
  };

  if (!sheetsConfigured()) {
    // Endpoint not wired yet — keep the experience working and leave a trail.
    console.info("[NIR] Sheets endpoint placeholder — lead not synced:", payload);
    return true;
  }

  try {
    await fetch(SHEETS_ENDPOINT, {
      method: "POST",
      mode: "no-cors", // Apps Script web apps respond without CORS headers
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return true;
  } catch (err) {
    console.warn("[NIR] Sheets sync failed (site continues):", err);
    return false;
  }
}
