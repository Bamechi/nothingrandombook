"use client";

import { useEffect, useMemo, useState } from "react";
import type { Workbook, WField, WSection } from "@/lib/workbooks";
import { postLead } from "@/lib/leads";

/**
 * The online workbook — complete any reflection workbook on screen,
 * autosave to this device, then download printable results.
 * Answers also sync to the Google Sheet (best-effort). Light theme.
 */

type Answers = Record<string, string>;

function storageKey(id: string) {
  return `nir-wb-${id}`;
}

function loadAnswers(id: string): Answers {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey(id)) || "{}");
  } catch {
    return {};
  }
}

/** Flatten a field into label/value rows for results + progress. */
function fieldRows(f: WField, a: Answers): { label: string; value: string }[] {
  switch (f.k) {
    case "q":
      return [{ label: f.label, value: a[f.id] || "" }];
    case "pair":
      return [
        { label: f.a, value: a[`${f.id}-a`] || "" },
        { label: f.b, value: a[`${f.id}-b`] || "" },
      ];
    case "list":
      return Array.from({ length: f.count }, (_, i) => {
        const n = f.start + i;
        return { label: `${String(n).padStart(2, "0")}.`, value: a[`${f.id}-${n}`] || "" };
      });
    case "scale":
      return [{ label: f.label, value: a[f.id] ? `${a[f.id]} / 10` : "" }];
    case "sign":
      return [
        { label: "NAME", value: a["sign-name"] || "" },
        { label: "DATE", value: a["sign-date"] || "" },
      ];
  }
}

export default function WorkbookRunner({ wb, onExit }: { wb: Workbook; onExit: () => void }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAnswers(loadAnswers(wb.id));
    window.scrollTo(0, 0);
  }, [wb.id]);

  const set = (key: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(storageKey(wb.id), JSON.stringify(next));
      } catch {}
      return next;
    });
    setSaved(true);
  };

  const total = useMemo(() => {
    let t = 0;
    wb.sections.forEach((s) => s.fields.forEach((f) => (t += fieldRows(f, {}).length)));
    return t;
  }, [wb]);
  const filled = useMemo(() => {
    let n = 0;
    wb.sections.forEach((s) => s.fields.forEach((f) => fieldRows(f, answers).forEach((r) => r.value.trim() && n++)));
    return n;
  }, [wb, answers]);

  const identity = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("nir-challenge") || "{}");
    } catch {
      return {};
    }
  }, []);

  const download = () => {
    postLead({
      name: identity.name || answers["sign-name"] || undefined,
      email: identity.email || undefined,
      source: "Online Workbook Completed",
      selectedWorkbook: wb.title,
      challengeAccessed: "yes",
      answersJson: JSON.stringify({ workbook: wb.title, answers }),
    });

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const today = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const sectionsHtml = wb.sections
      .map((s: WSection) => {
        const rows = s.fields
          .flatMap((f) => fieldRows(f, answers))
          .map(
            (r) => `
            <div class="row">
              <div class="q">${esc(r.label)}</div>
              <div class="a${r.value ? "" : " blank"}">${r.value ? esc(r.value) : ""}</div>
            </div>`
          )
          .join("");
        return `
          <section class="sec">
            <div class="sec-head">
              <span class="tag">${esc(s.tag)}</span>
              <h2>${esc(s.title)}</h2>
              <span class="rule"></span>
            </div>
            ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ""}
            ${s.action ? `<p class="action"><b>Today’s action &middot;</b> ${esc(s.action)}</p>` : ""}
            ${s.pledge ? `<p class="pledge">${esc(s.pledge)}</p>` : ""}
            <div class="rows">${rows}</div>
          </section>`;
      })
      .join("");

    const html = `<!doctype html><html><head><meta charset="utf-8">
      <title>${esc(wb.title)} — My Results</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
      <style>
        @page { margin: 20mm 17mm; }
        * { box-sizing: border-box; }
        :root { --red:#d0202a; --ink:#17140f; --paper:#f6f3ec; }
        html, body { background:#ffffff; }
        body { font-family:'PT Serif', Georgia, serif; color:var(--ink); margin:0; padding:26px 30px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
        .anton { font-family:'Anton', Impact, sans-serif; font-weight:400; letter-spacing:.5px; text-transform:uppercase; }
        .ui { font-family:'Archivo', Arial, sans-serif; }
        .cover { border-bottom:3px solid var(--red); padding-bottom:20px; margin-bottom:6px; }
        .brand { font-family:'Archivo',sans-serif; font-weight:600; letter-spacing:3px; font-size:10.5px; color:var(--red); text-transform:uppercase; margin:0; }
        h1 { margin:10px 0 4px; font-size:46px; line-height:.95; }
        h1 .num { color:var(--red); }
        .meta { font-family:'Archivo',sans-serif; font-size:10.5px; letter-spacing:.5px; color:#7a756c; text-transform:uppercase; margin:8px 0 0; }
        .epi { font-style:italic; font-size:13.5px; color:#5c574e; margin:12px 0 0; }
        .sec { margin:30px 0 0; page-break-inside:avoid; }
        .sec-head { margin-bottom:6px; }
        .tag { font-family:'Archivo',sans-serif; font-weight:700; font-size:9.5px; letter-spacing:2.5px; color:var(--red); text-transform:uppercase; display:block; }
        h2 { margin:3px 0 8px; font-size:23px; line-height:1; }
        .rule { display:block; width:46px; height:3px; background:var(--red); }
        .sub { font-style:italic; font-size:13px; color:#6b6459; margin:10px 0 14px; }
        .action { font-size:13px; background:var(--paper); border-radius:8px; padding:10px 12px; margin:0 0 14px; }
        .pledge { font-size:13px; border-left:3px solid var(--red); padding-left:12px; color:#3a352d; margin:0 0 14px; font-style:italic; }
        .rows { }
        .row { margin:0 0 16px; page-break-inside:avoid; }
        .q { font-family:'Archivo',sans-serif; font-weight:700; font-size:10.5px; letter-spacing:1.2px; text-transform:uppercase; color:var(--ink); margin-bottom:5px; }
        .a { font-size:15.5px; line-height:1.5; white-space:pre-wrap; border-bottom:1px solid #ded8cb; padding:0 0 9px; min-height:20px; }
        .a.blank { border-bottom:1px dashed #d6d0c3; min-height:26px; }
        .foot { margin-top:40px; padding-top:16px; border-top:1px solid #e6e0d4; font-family:'Archivo',sans-serif; font-size:9.5px; letter-spacing:2.5px; color:#a39d92; text-transform:uppercase; text-align:center; }
      </style></head><body>
        <div class="cover">
          <p class="brand">Nothing Is Random &middot; Reflection Workbook</p>
          <h1 class="anton"><span class="num">${wb.num}.</span> ${esc(wb.title)}</h1>
          ${wb.epigraph ? `<p class="epi">${esc(wb.epigraph)}</p>` : ""}
          <p class="meta">${identity.name ? esc(identity.name) + " &middot; " : ""}${identity.email ? esc(identity.email) + " &middot; " : ""}Completed ${esc(today)}</p>
        </div>
        ${sectionsHtml.replace(/<h2>/g, '<h2 class="anton">')}
        <p class="foot">Nothing Is Random — B. Amechi &middot; CNFDNT.CO &middot; 2RANDOM.APP</p>
        <script>window.onload = function(){ setTimeout(function(){ window.print(); }, 600); };<\/script>
      </body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
    } else {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `NothingIsRandom_${wb.id}_results.html`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-left text-[var(--ink)]">
      {/* sticky header */}
      <div className="sticky top-0 z-10 -mx-5 mb-6 flex items-center justify-between gap-3 border-b border-[var(--ink)]/10 bg-[var(--paper)]/90 px-5 py-3 backdrop-blur">
        <button onClick={onExit} className="ui-caps text-[10px] text-[var(--ink)]/60 hover:text-[var(--ink)]">
          ← All workbooks
        </button>
        <span className="ui-caps text-[9px] text-[var(--ink)]/45">
          {filled}/{total} answered{saved ? " · saved" : ""}
        </span>
        <button onClick={download} className="btn btn-red px-4 py-2 text-[10px]">
          Download Results
        </button>
      </div>

      <p className="ui-caps text-[10px] text-[var(--red)]">Workbook {wb.num} · Online</p>
      <h2 className="display mt-2 text-4xl sm:text-5xl">{wb.title}</h2>
      <p className="serif-body mt-3 text-[15px] italic text-[var(--ink)]/70">{wb.epigraph}</p>
      <div className="mt-5 space-y-3 border-y border-[var(--ink)]/10 py-5">
        {wb.intro.map((p) => (
          <p key={p.slice(0, 20)} className="serif-body text-[14px] leading-relaxed text-[var(--ink)]/75">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-8 space-y-10">
        {wb.sections.map((s) => (
          <section key={s.id}>
            <p className="ui-caps text-[10px] text-[var(--red)]">{s.tag}</p>
            <h3 className="display mt-1 text-2xl sm:text-3xl">{s.title}</h3>
            {s.sub && <p className="serif-body mt-2 text-[14px] italic text-[var(--ink)]/60">{s.sub}</p>}
            {s.action && (
              <div className="mt-3 rounded-xl border border-[var(--ink)]/15 bg-white/70 p-4">
                <p className="ui-caps text-[9px] text-[var(--red)]">Today’s action</p>
                <p className="serif-body mt-1 text-[14px] text-[var(--ink)]/85">{s.action}</p>
              </div>
            )}
            {s.pledge && (
              <p className="serif-body mt-3 border-l-2 border-[var(--red)] pl-4 text-[14px] text-[var(--ink)]/80">
                {s.pledge}
              </p>
            )}
            <div className="mt-4 space-y-5">
              {s.fields.map((f, i) => (
                <Field key={i} f={f} answers={answers} set={set} />
              ))}
            </div>
            {s.note && <p className="serif-body mt-3 text-[13px] italic text-[var(--ink)]/50">{s.note}</p>}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--red)]/40 bg-[var(--red)]/5 p-7 text-center">
        <p className="display text-2xl">Done for now?</p>
        <p className="serif-body mt-2 text-[14px] text-[var(--ink)]/75">
          Your answers save automatically on this device. Download your printable results anytime.
        </p>
        <button onClick={download} className="btn btn-red mt-5">
          Download My Results
        </button>
      </div>
    </div>
  );
}

function Field({
  f,
  answers,
  set,
}: {
  f: WField;
  answers: Answers;
  set: (k: string, v: string) => void;
}) {
  const ta =
    "w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-3 serif-body text-[15px] text-[var(--ink)] outline-none focus:border-[var(--red)]";
  const label = "ui-caps mb-2 block text-[10px] text-[var(--ink)]/60";

  switch (f.k) {
    case "q":
      return (
        <div>
          <label className={label}>{f.label}</label>
          {f.hint && <p className="serif-body -mt-1 mb-2 text-[12px] italic text-[var(--ink)]/45">{f.hint}</p>}
          <textarea rows={3} value={answers[f.id] || ""} onChange={(e) => set(f.id, e.target.value)} className={ta} />
        </div>
      );
    case "pair":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>{f.a}</label>
            <textarea rows={3} value={answers[`${f.id}-a`] || ""} onChange={(e) => set(`${f.id}-a`, e.target.value)} className={ta} />
          </div>
          <div>
            <label className={label}>{f.b}</label>
            <textarea rows={3} value={answers[`${f.id}-b`] || ""} onChange={(e) => set(`${f.id}-b`, e.target.value)} className={ta} />
          </div>
        </div>
      );
    case "list":
      return (
        <div className="space-y-3">
          {Array.from({ length: f.count }, (_, i) => {
            const n = f.start + i;
            return (
              <div key={n} className="flex items-center gap-3">
                <span className="display w-8 shrink-0 text-lg text-[var(--red)]">{String(n).padStart(2, "0")}</span>
                <input
                  value={answers[`${f.id}-${n}`] || ""}
                  onChange={(e) => set(`${f.id}-${n}`, e.target.value)}
                  className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-2.5 serif-body text-[15px] text-[var(--ink)] outline-none focus:border-[var(--red)]"
                />
              </div>
            );
          })}
        </div>
      );
    case "scale":
      return (
        <div>
          <label className={label}>{f.label}</label>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
              const active = answers[f.id] === String(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => set(f.id, String(n))}
                  className={`h-9 w-9 rounded-full border text-sm transition-colors ${
                    active ? "border-[var(--red)] bg-[var(--red)] text-white" : "border-[var(--ink)]/25 text-[var(--ink)]/70 hover:border-[var(--ink)]/60"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      );
    case "sign":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Name</label>
            <input value={answers["sign-name"] || ""} onChange={(e) => set("sign-name", e.target.value)} className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm text-[var(--ink)] outline-none focus:border-[var(--red)]" />
          </div>
          <div>
            <label className={label}>Date</label>
            <input type="date" value={answers["sign-date"] || ""} onChange={(e) => set("sign-date", e.target.value)} className="w-full rounded-xl border border-[var(--ink)]/20 bg-white/70 px-4 py-2.5 font-[family-name:var(--font-ui)] text-sm text-[var(--ink)] outline-none focus:border-[var(--red)]" />
          </div>
        </div>
      );
  }
}
