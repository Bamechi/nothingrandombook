"use client";

import { useEffect, useRef, useState } from "react";
import { postLead } from "@/lib/leads";

/**
 * SHARE YOUR MOMENT — the community wall.
 * "What People Are Sharing" leads, as an auto-scrolling strip; the share
 * form follows. Submissions enter moderation before they appear.
 * By design: no profile photos, no likes, no reactions, no rankings.
 */

interface PublicMoment {
  id: string;
  kind: "moment" | "lesson" | "advice";
  body: string;
  meaning?: string;
  name?: string;
  location?: string;
  createdAt: string;
}

const KINDS = [
  { id: "moment", label: "Something that happened" },
  { id: "lesson", label: "Something I learned" },
  { id: "advice", label: "Advice I want to pass on" },
] as const;

const KIND_TAG: Record<string, string> = {
  moment: "MOMENT",
  lesson: "LESSON",
  advice: "ADVICE",
};

// Example community voices — a diverse mix (funny, long, short) that holds
// the wall until real approved shares arrive.
const SEED_MOMENTS: PublicMoment[] = [
  { id: "seed-1", kind: "moment", body: "Got stood up on a first date. The waiter felt so bad he sat down and talked to me for an hour — reader, I married the waiter!", name: "Renard", location: "Atlanta", createdAt: "" },
  { id: "seed-2", kind: "lesson", body: "I spent three years bitter about getting passed over for a promotion. The guy who got it burned out and quit, the whole team got restructured, and I landed his manager's role — using skills I'd only built because I had the time. The “no” wasn't a rejection. It was a head start I couldn't see yet.", name: "Bianca", location: "Newark", createdAt: "" },
  { id: "seed-3", kind: "advice", body: "Call the person you keep meaning to call. Today. Not after you “figure out what to say.”", name: "Malik", location: "Detroit", createdAt: "" },
  { id: "seed-4", kind: "moment", body: "The job that rejected me introduced me to the mentor who rebuilt my entire career. Best rejection email I've ever received!", name: "Priya", location: "London", createdAt: "" },
  { id: "seed-5", kind: "lesson", body: "The delay wasn't a detour. Looking back, it was the whole point.", name: "Terrence", location: "Chicago", createdAt: "" },
  { id: "seed-6", kind: "advice", body: "Write your prayers down. A year later you'll read them back and get chills at how many quietly came true.", name: "Grace", location: "Houston", createdAt: "" },
  { id: "seed-7", kind: "moment", body: "Missed my flight, spent four hours grumbling in an airport bar, and left with a business partner I've now worked with for a decade. I officially no longer trust my own definition of a “bad day.”", name: "Andre", location: "Oakland", createdAt: "" },
  { id: "seed-8", kind: "lesson", body: "What felt like the worst year of my life turned out to be the soil for everything good that came after. Every. Single. Thing.", name: "Simone", location: "Brooklyn", createdAt: "" },
  { id: "seed-9", kind: "advice", body: "Your gut has been right the whole time. Stop outsourcing the decision to the group chat!", name: "Dominic", location: "Miami", createdAt: "" },
  { id: "seed-10", kind: "moment", body: "Bumped into my fourth-grade teacher at a gas station. She quoted a story I wrote when I was nine. I'm a published novelist now — I dedicated the book to her.", name: "Yvonne", location: "Philadelphia", createdAt: "" },
];

function MomentCard({ m }: { m: PublicMoment }) {
  const accent =
    m.kind === "moment"
      ? "bg-[var(--red)] text-white"
      : m.kind === "lesson"
        ? "bg-[#e8a913] text-[#17140f]"
        : "bg-[var(--ink)] text-white";
  return (
    <div className="relative flex min-h-[400px] w-[320px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-7 shadow-[0_16px_60px_-12px_rgba(255,255,255,0.22)] backdrop-blur-xl sm:w-[360px]">
      <span className="pointer-events-none absolute -right-1 -top-6 select-none font-[family-name:var(--font-anton)] text-[9rem] leading-none text-[var(--red)]/10">
        ”
      </span>
      <span className={`ui-caps w-fit rounded-full px-3 py-1 text-[9px] tracking-[0.18em] ${accent}`}>
        {KIND_TAG[m.kind]}
      </span>
      <p className="serif-body relative mt-4 flex-1 text-[16px] leading-relaxed text-[var(--ink)]/90">
        {m.body}
      </p>
      {m.meaning && (
        <p className="serif-body mt-3 text-[13px] italic text-[var(--ink)]/60">{m.meaning}</p>
      )}
      <p className="ui-caps mt-6 border-t border-[var(--ink)]/10 pt-4 text-[9px] text-[var(--ink)]/55">
        {m.name || "Anonymous"}
        {m.location ? ` — ${m.location}` : ""}
      </p>
    </div>
  );
}

export default function Community() {
  const [kind, setKind] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [meaning, setMeaning] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [moments, setMoments] = useState<PublicMoment[]>([]);
  const [filter, setFilter] = useState<"recent" | "moment" | "lesson" | "advice">("recent");
  const [randomPick, setRandomPick] = useState<PublicMoment | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/moments")
      .then((r) => r.json())
      .then((d) => setMoments(d.moments ?? []))
      .catch(() => {});
  }, [sent]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!kind) {
      setError("Choose what you are sharing first.");
      return;
    }
    if (body.trim().length < 2) {
      setError("Share at least a sentence.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, body, meaning, name, location, email, permission }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Something went sideways. Try again.");
      }
      postLead({ email: email || undefined, name: name || undefined, source: "Share Your Moment" });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went sideways. Try again.");
    } finally {
      setSending(false);
    }
  };

  const usingSeed = moments.length === 0;
  const source = usingSeed ? SEED_MOMENTS : moments;
  const visible = filter === "recent" ? source : source.filter((m) => m.kind === filter);
  const loop = visible.length ? [...visible, ...visible] : [];

  const showRandom = () => {
    if (!source.length) return;
    const pick = source[Math.floor(Math.random() * source.length)];
    setRandomPick(pick);
  };

  return (
    <section id="community" className="overflow-hidden bg-[var(--ink)] text-[var(--paper)] border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:pt-32">
        <p className="ui-caps text-[10px] text-[var(--red)]">The Community</p>
        <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">
          WHAT PEOPLE ARE SHARING<span className="text-[var(--red)]">.</span>
        </h2>
        <p className="serif-body mt-4 max-w-xl text-[15px] text-[var(--paper)]/80">
          Real moments, lessons, and advice from readers — the small turns that only made sense
          later.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {(
            [
              ["recent", "Most Recent"],
              ["moment", "Moments"],
              ["lesson", "Lessons"],
              ["advice", "Advice"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setFilter(id);
                setRandomPick(null);
              }}
              className={`ui-caps rounded-full border px-4 py-2 text-[9px] transition-colors ${
                filter === id && !randomPick
                  ? "border-[var(--red)] bg-[var(--red)] text-white"
                  : "border-white/25 text-[var(--paper)]/70 hover:text-[var(--paper)]"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={showRandom}
            className="ui-caps rounded-full border border-white/25 px-4 py-2 text-[9px] text-[var(--paper)]/70 transition-colors hover:text-[var(--paper)]"
          >
            Show Me Something Random
          </button>
        </div>
      </div>

      {/* the auto-scrolling wall */}
      {randomPick ? (
        <div className="mx-auto mt-8 max-w-2xl px-5">
          <div className="rounded-2xl border-l-2 border-[var(--red)] bg-white/[0.04] p-7">
            <p className="ui-caps text-[9px] text-[var(--red)]">{KIND_TAG[randomPick.kind]}</p>
            <p className="serif-body mt-3 text-lg text-[var(--paper)]/95">{randomPick.body}</p>
            {randomPick.meaning && (
              <p className="serif-body mt-3 text-[14px] italic text-[var(--paper)]/70">{randomPick.meaning}</p>
            )}
            <p className="ui-caps mt-4 text-[9px] text-[var(--paper)]/55">
              {randomPick.name || "Anonymous"}
              {randomPick.location ? ` — ${randomPick.location}` : ""}
            </p>
          </div>
          <button
            onClick={() => setRandomPick(null)}
            className="ui-caps mt-4 text-[10px] text-[var(--paper)]/55 hover:text-[var(--paper)]"
          >
            ← Back to the wall
          </button>
        </div>
      ) : loop.length ? (
        <div className="mt-9">
          {usingSeed && (
            <p className="ui-caps mb-4 px-5 text-center text-[9px] text-[var(--paper)]/40">
              Example shares — yours could join them
            </p>
          )}
          <div className="hscroll" style={{ ["--hscroll-dur" as string]: "80s" }}>
            <div className="hscroll__track">
              {loop.map((m, i) => (
                <MomentCard key={`${m.id}-${i}`} m={m} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* the share form */}
      <div ref={formRef} className="mx-auto max-w-6xl px-5 pb-24 sm:pb-32">
        <div className="mt-16 border-t border-white/10 pt-14">
          <h3 className="display text-4xl sm:text-5xl">
            SHARE YOUR MOMENT<span className="text-[var(--red)]">.</span>
          </h3>
          <div className="mt-5 max-w-2xl space-y-4">
            <p className="serif-body text-[16px] text-[var(--paper)]/85">
              Ever had something happen that felt random at first—but made perfect sense later?
              Maybe it was someone you met, a door that closed, advice you never forgot, or a
              moment that changed how you move.
            </p>
            <p className="serif-body text-[16px] text-[var(--paper)]/85">
              Share it here. It can be one sentence or the whole story.
            </p>
          </div>

          {sent ? (
            <div className="mt-10 max-w-2xl rounded-2xl border border-[var(--red)]/40 bg-[var(--red)]/10 p-7">
              <p className="display text-2xl text-[var(--red)]">Received.</p>
              <p className="serif-body mt-2 text-[15px] text-[var(--paper)]/85">
                Your words are in. Every submission is read before it appears here — watch this
                space.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setKind(null);
                  setBody("");
                  setMeaning("");
                  setName("");
                  setLocation("");
                  setEmail("");
                  setPermission(false);
                }}
                className="ui-caps mt-5 text-[10px] text-[var(--paper)]/60 hover:text-[var(--paper)]"
              >
                Share another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 max-w-2xl space-y-6">
              <div>
                <p className="ui-caps mb-3 text-[10px] text-[var(--paper)]/60">What are you sharing?</p>
                <div className="flex flex-wrap gap-2">
                  {KINDS.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setKind(k.id)}
                      className={`btn ${kind === k.id ? "btn-red" : "btn-ghost-light"}`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="cm-body">Share it here</label>
                <textarea
                  id="cm-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share it here…"
                  rows={5}
                  className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 serif-body text-[15px] text-[var(--paper)] outline-none focus:border-[var(--red)]"
                />
              </div>
              <div>
                <label className="ui-caps mb-2 block text-[10px] text-[var(--paper)]/60" htmlFor="cm-meaning">
                  What did it mean to you? — optional
                </label>
                <textarea
                  id="cm-meaning"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 serif-body text-[15px] text-[var(--paper)] outline-none focus:border-[var(--red)]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="ui-caps mb-2 block text-[10px] text-[var(--paper)]/60" htmlFor="cm-name">
                    Name or nickname — optional
                  </label>
                  <input
                    id="cm-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 font-[family-name:var(--font-ui)] text-sm text-[var(--paper)] outline-none focus:border-[var(--red)]"
                  />
                </div>
                <div>
                  <label className="ui-caps mb-2 block text-[10px] text-[var(--paper)]/60" htmlFor="cm-location">
                    Location — optional
                  </label>
                  <input
                    id="cm-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 font-[family-name:var(--font-ui)] text-sm text-[var(--paper)] outline-none focus:border-[var(--red)]"
                  />
                </div>
                <div>
                  <label className="ui-caps mb-2 block text-[10px] text-[var(--paper)]/60" htmlFor="cm-email">
                    Email — private
                  </label>
                  <input
                    id="cm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 font-[family-name:var(--font-ui)] text-sm text-[var(--paper)] outline-none focus:border-[var(--red)]"
                  />
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--red)]"
                />
                <span className="serif-body text-sm text-[var(--paper)]/75">
                  You have my permission to publish this on the site.
                </span>
              </label>
              {error && <p className="ui-caps text-[10px] text-[var(--red)]">{error}</p>}
              <button type="submit" disabled={sending} className="btn btn-red disabled:opacity-50">
                {sending ? "Sending…" : "Share it"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
