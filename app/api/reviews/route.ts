import { NextRequest, NextResponse } from "next/server";
import { addReview, getReviews, newId } from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Public reviews + honest metrics. Count and average come only from real
 * approved reviews; staging examples are returned separately and clearly
 * flagged. No fake production numbers, ever.
 */
export async function GET() {
  const all = await getReviews();
  const real = all.filter((r) => r.status === "approved" && r.permission && !r.staging);
  const staging = all.filter((r) => r.status === "approved" && r.staging);
  const count = real.length;
  const average = count ? real.reduce((a, r) => a + r.rating, 0) / count : null;
  const strip = (r: (typeof all)[number]) => ({
    id: r.id,
    rating: r.rating,
    body: r.body,
    name: r.name,
    location: r.location,
    format: r.format,
    staging: !!r.staging,
    createdAt: r.createdAt,
  });
  return NextResponse.json({
    count,
    average,
    reviews: real.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).map(strip),
    staging: staging.map(strip),
  });
}

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const rating = Number(payload.rating);
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Pick a star rating first." }, { status: 400 });
  }
  if (body.length < 2 || !name) {
    return NextResponse.json({ error: "Add a few words and a name or initials." }, { status: 400 });
  }
  await addReview({
    id: newId(),
    rating,
    body: body.slice(0, 2000),
    name: name.slice(0, 80),
    location: typeof payload.location === "string" ? payload.location.trim().slice(0, 80) : undefined,
    format: typeof payload.format === "string" ? payload.format.trim().slice(0, 40) : undefined,
    permission: payload.permission === true,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
