/**
 * Centralized purchase configuration.
 * Each `url` is a placeholder — paste the live Shopify product/checkout URL
 * for that item (from your High Lvl Media store) and every button on the site
 * links straight to Shopify. While a url still contains "_HERE" it is treated
 * as not-live and renders the polished "checkout opens soon / notify me" state
 * instead of a broken link.
 *
 * Prices here are the display prices — set the matching price on the Shopify
 * product itself:
 *   Physical Copy      $22.22   (print-on-demand via Book Vault)
 *   Digital Experience $11.11   (digital book PDF + online experience)
 *   Bundle             $24.99   (physical + digital PDF + online experience)
 */

export interface PurchaseTarget {
  id: "physical" | "digital" | "bundle";
  label: string;
  price: string;
  tagline: string;
  detail: string;
  button: string;
  includes: string[];
  url: string | null;
  limited?: boolean; // the Bundle carries the 48-hour countdown
}

export const PURCHASE: PurchaseTarget[] = [
  {
    id: "physical",
    label: "PHYSICAL COPY",
    price: "$22.22",
    tagline: "The object itself.",
    detail: "Physical copy of NoThing Is Random — printed on demand and shipped to you.",
    button: "Buy Physical Copy",
    includes: ["Physical copy of NoThing Is Random", "Printed on demand & shipped"],
    // ← paste your Shopify Physical Copy product/checkout URL here
    url: "https://97jift-4w.myshopify.com/products/nothing-is-random-physical-copy",
  },
  {
    id: "digital",
    label: "DIGITAL EXPERIENCE",
    price: "$11.11",
    tagline: "Every device. Every pocket.",
    detail: "The digital book (PDF) plus the full interactive online experience.",
    button: "Buy Digital Experience",
    includes: [
      "Digital book (PDF) download",
      "Full online interactive experience",
      "Access code delivered after purchase",
    ],
    // ← paste your Shopify Digital Experience product/checkout URL here
    url: "https://97jift-4w.myshopify.com/products/nothing-is-random-digital-experience",
  },
  {
    id: "bundle",
    label: "BUNDLE PACK",
    price: "$24.99",
    tagline: "Everything. One move.",
    detail: "Physical copy + digital book (PDF) + the full interactive online experience.",
    button: "Get Bundle",
    includes: [
      "Physical copy (shipped, print-on-demand)",
      "Digital book (PDF) download",
      "Full online interactive experience",
      "Access code delivered by email",
    ],
    // ← paste your Shopify Bundle product/checkout URL here
    url: "https://97jift-4w.myshopify.com/products/nothing-is-random-bundle",
    limited: true,
  },
];

/** True when a checkout link is live rather than a *_HERE placeholder. */
export function isLive(url: string | null | undefined): boolean {
  return !!url && !url.includes("_HERE");
}

export const EXPERIENCE_PATH = "/experience";
export const CHALLENGE_PATH = "/challenge";
export const ACCESS_PATH = "/access";
