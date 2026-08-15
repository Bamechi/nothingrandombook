import { promises as fs } from "fs";
import path from "path";

/**
 * File-backed store for community moments and reader reviews.
 * Every submission lands as status "pending" and is published by flipping
 * status to "approved" in the JSON file (moderation-first by design).
 * Files live in <project>/data/.
 */

const DATA_DIR = path.join(process.cwd(), "data");

export interface Moment {
  id: string;
  kind: "moment" | "lesson" | "advice";
  body: string;
  meaning?: string;
  name?: string;
  location?: string;
  email?: string; // private — never returned by public endpoints
  permission: boolean;
  status: "pending" | "approved";
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number; // 1–5
  body: string;
  name: string;
  location?: string;
  format?: string;
  permission: boolean;
  staging?: boolean; // clearly-labeled early-reader examples, excluded from metrics
  status: "pending" | "approved";
  createdAt: string;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(value, null, 2), "utf8");
}

export async function getMoments(): Promise<Moment[]> {
  return readJson<Moment[]>("moments.json", []);
}

export async function addMoment(m: Moment): Promise<void> {
  const all = await getMoments();
  all.push(m);
  await writeJson("moments.json", all);
}

export async function getReviews(): Promise<Review[]> {
  return readJson<Review[]>("reviews.json", []);
}

export async function addReview(r: Review): Promise<void> {
  const all = await getReviews();
  all.push(r);
  await writeJson("reviews.json", all);
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
