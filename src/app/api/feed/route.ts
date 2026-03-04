import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "feed-blends.json");

export interface FeedBlend {
  id: string;
  blendName: string;
  roastLevel: string;
  flavorNotes: string[];
  emotionalDescription: string;
  instagram?: string;
  date: string;
  batchId: string;
}

function readFeed(): FeedBlend[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function GET() {
  try {
    const list = readFeed();
    return NextResponse.json(list, { status: 200 });
  } catch (err) {
    console.error("[feed GET]", err);
    return NextResponse.json(
      { error: "Failed to load feed." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const blend: FeedBlend = {
      id: `feed-${Date.now()}`,
      blendName: body.blendName ?? "",
      roastLevel: body.roastLevel ?? "Medium",
      flavorNotes: Array.isArray(body.flavorNotes) ? body.flavorNotes : [],
      emotionalDescription: body.emotionalDescription ?? "",
      instagram: typeof body.instagram === "string" ? body.instagram.trim() : undefined,
      date: body.date ?? new Date().toISOString().slice(0, 10),
      batchId: body.batchId ?? "",
    };

    const list = readFeed();
    list.unshift(blend);
    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({ ok: true, id: blend.id }, { status: 200 });
  } catch (err) {
    console.error("[feed POST]", err);
    return NextResponse.json(
      { error: "Failed to add to feed." },
      { status: 500 }
    );
  }
}
