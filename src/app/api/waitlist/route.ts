import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "waitlist.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const type = typeof body.type === "string" ? body.type.trim() : "general";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let list: { email: string; joinedAt: string; type?: string }[] = [];
    if (fs.existsSync(DATA_PATH)) {
      const raw = fs.readFileSync(DATA_PATH, "utf-8");
      list = JSON.parse(raw);
    } else {
      fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2), "utf-8");
    }

    list.push({
      email,
      joinedAt: new Date().toISOString(),
      type,
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Failed to join waitlist." },
      { status: 500 }
    );
  }
}
