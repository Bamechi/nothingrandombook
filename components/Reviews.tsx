"use client";

import { useEffect, useState } from "react";
import { postLead } from "@/lib/leads";

/**
 * READER REVIEWS — honest by construction, fun by design.
 * Count + average come only from real approved reviews. Until those exist,
 * clearly-labeled early-reader voices hold the space in an auto-scrolling
 * strip. Each card shows its own star rating. No profile photographs.
 */

interface PublicReview {
  id: string;
  rating: number | null;
  body: string;
  name: string;
  location?: string;
  format?: string;
  staging: boolean;
  createdAt: string;
}

function Stars({ value }: { value: number }) {
  return (
    <span className="tracking-[0.15em] text-[var(--red)]" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-[var(--ink)]/15">{"★".repeat(5 - value)}</span>
    </span>
  );
}

function ReviewCard({ r }: { r: PublicReview }) {
  return (
    <blockquote className="flex w-[290px] shrink-0 flex-col rounded-2xl border border-[var(--ink)]/12 bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(13,12,10,0.35)] sm:w-[340px]">
      <div className="flex items-center justify-between">
        {r.rating ? <Stars value={r.rating} /> : <span className="ui-caps text-[8.5px] text-[var(--ink)]/45">Early copy</span>}
        <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--red)]/40 text-[10px] text-[var(--red)]">
          ★
        </span>
      </div>
      <p className="serif-body mt-4 flex-1 text-[15px] leading-relaxed text-[var(--ink)]/90">“{r.body}”</p>
      <footer className="ui-caps mt-5 flex items-center gap-2 text-[9px] text-[var(--ink)]/55">
        <span className="text-[var(--red)]">—</span>
        {r.name}
        {r.location ? `, ${r.location}` : ""}
        {r.format ? ` · ${r.format}` : ""}
      </footer>
    </blockquote>
  );
}

export default function Reviews() {
  const [count, setCount] = useState<number>(0);
  const [average, setAverage] = useState<number | null>(null);
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [staging, setStaging] = useState<PublicReview[]>([]);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");
  const [permission, setPermission] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        setCount(d.count ?? 0);
        setAverage(d.average ?? null);
        setReviews(d.reviews ?? []);
        setStaging(d.staging ?? []);
      })
      .catch(() => {});
  }, [sent]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!rating) {
      setError("Pick a star rating first.");
      return;
    }
    if (body.trim().length < 2 || !name.trim()) {
      setError("Add a few words and a name or initials.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, body, name, location, format, permission }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Something went sideways. Try again.");
      }
      postLead({ source: "Reader Review", productInterest: format || undefined });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went sideways. Try again.");
    } finally {
      setSending(false);
    }
  };

  const strip = reviews.length ? reviews : staging;
  const usingStaging = !reviews.length && staging.length > 0;
  // duplicate the strip so the auto-scroll loops seamlessly
  const loop = strip.length ? [...strip, ...strip] : [];

  return (
    <section id="reviews" className="overflow-hidden bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:pt-32">
        <p className="ui-caps text-[10px] text-[var(--red)]">The Readers</p>
        <h2 className="display mt-4 text-5xl sm:text-6xl md:text-7xl">
          READER REVIEWS<span className="text-[var(--red)]">.</span>
        </h2>

        <p className="serif-body mt-5 max-w-xl text-[15px] text-[var(--ink)]/75">
          {count > 0 && average !== null ? (
            <>
              <span className="display mr-2 text-2xl text-[var(--red)]">{average.toFixed(1)} ★</span>
              from {count} verified reader {count === 1 ? "review" : "reviews"}.
            </>
          ) : (
            <>Early reader voices, sharing what the book gave them. Verified reviews join them as they arrive.</>
          )}
        </p>
      </div>

      {/* auto-scrolling strip */}
      {loop.length > 0 && (
        <div className="mt-10">
          {usingStaging && (
            <p className="ui-caps mb-4 px-5 text-center text-[9px] text-[var(--ink)]/45">
              Early reader voices — placeholders until verified reviews arrive
            </p>
          )}
          <div className="hscroll" style={{ ["--hscroll-dur" as string]: "70s" }}>
            <div className="hscroll__track">
              {loop.map((r, i) => (
                <ReviewCard key={`${r.id}-${i}`} r={r} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* submit */}
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
        <div className="mt-14 max-w-2xl border-t border-[var(--ink)]/10 pt-10">
          <h3 className="display text-2xl sm:text-3xl">Read it already? Say so.</h3>

          {/* Amazon review — helps the book rank; anyone can leave one */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[var(--ink)]/12 bg-white/50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="serif-body text-[14px] text-[var(--ink)]/75">
              Loved it? Leave a review on Amazon too — even a copied version of yours helps more
              readers find the book.
            </p>
            <a
              href="https://www.amazon.com.au/Nothing-Random-Making-Sense-Trying-ebook/dp/B0H8BF88VD"
              target="_blank"
              rel="noreferrer"
              onClick={() => postLead({ source: "Amazon Review Click" })}
              className="btn btn-ghost-dark shrink-0"
            >
              Review on Amazon ↗
            </a>
          </div>

          {sent ? (
            <div className="mt-6 rounded-2xl border border-[var(--red)]/40 bg-[var(--red)]/5 p-6">
              <p className="display text-xl text-[var(--red)]">Thank you.</p>
              <p className="serif-body mt-2 text-sm text-[var(--ink)]/75">
                Your review is in — it appears once it has been read and approved.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-5">
              <div>
                <p className="ui-caps mb-2 text-[10px] text-[var(--ink)]/60">Your rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-3xl transition-colors ${
                        n <= (hoverRating || rating) ? "text-[var(--red)]" : "text-[var(--ink)]/20"
                      }`}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What did it give you?"
                rows={4}
                className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 serif-body text-[15px] outline-none focus:border-[var(--red)]"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name or initials"
                  className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)]"
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location — optional"
                  className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)]"
                />
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 font-[family-name:var(--font-ui)] text-sm outline-none focus:border-[var(--red)]"
                >
                  <option value="">Format — optional</option>
                  <option value="Physical">Physical</option>
                  <option value="Digital">Digital</option>
                  <option value="Audiobook">Audiobook</option>
                </select>
              </div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--red)]"
                />
                <span className="serif-body text-sm text-[var(--ink)]/70">
                  You have my permission to publish this review on the site.
                </span>
              </label>
              {error && <p className="ui-caps text-[10px] text-[var(--red)]">{error}</p>}
              <button type="submit" disabled={sending} className="btn btn-red disabled:opacity-50">
                {sending ? "Sending…" : "Submit review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
