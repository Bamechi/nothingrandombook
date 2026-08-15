import { NextRequest, NextResponse } from "next/server";
import { addMoment, getMoments, newId } from "@/lib/store";

export const dynamic = "force-dynamic";

/** Public feed: approved submissions only, email never included. */
export async function GET() {
  const all = await getMoments();
  const publicMoments = all
    .filter((m) => m.status === "approved" && m.permission)
    .map(({ id, kind, body, meaning, name, location, createdAt }) => ({
      id,
      kind,
      body,
      meaning,
      name,
      location,
      createdAt,
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json({ moments: publicMoments });
}

/** Submissions enter moderation — nothing publishes automatically. */
export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const kind = payload.kind;
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (!["moment", "lesson", "advice"].includes(kind as string) || body.length < 2) {
    return NextResponse.json({ error: "Tell us what you are sharing first." }, { status: 400 });
  }
  if (body.length > 4000) {
    return NextResponse.json({ error: "That one needs to be a little shorter." }, { status: 400 });
  }
  await addMoment({
    id: newId(),
    kind: kind as "moment" | "lesson" | "advice",
    body,
    meaning: typeof payload.meaning === "string" ? payload.meaning.trim().slice(0, 1000) : undefined,
    name: typeof payload.name === "string" ? payload.name.trim().slice(0, 80) : undefined,
    location: typeof payload.location === "string" ? payload.location.trim().slice(0, 80) : undefined,
    email: typeof payload.email === "string" ? payload.email.trim().slice(0, 200) : undefined,
    permission: payload.permission === true,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
