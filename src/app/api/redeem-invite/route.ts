import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "invite-codes.json");

/** Permanent admin code for testing — always valid, never consumed. */
const ADMIN_INVITE_CODE = "BREW-ADMIN";

interface InviteEntry {
  code: string;
  redeemed: boolean;
  redeemedAt: string | null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = typeof body.code === "string" ? body.code.trim().toUpperCase() : "";

    if (!code) {
      return NextResponse.json(
        { error: "Invite code is required." },
        { status: 400 }
      );
    }

    if (code === ADMIN_INVITE_CODE) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!fs.existsSync(DATA_PATH)) {
      return NextResponse.json(
        { error: "Invalid code." },
        { status: 400 }
      );
    }

    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const list: InviteEntry[] = JSON.parse(raw);

    const entry = list.find((e) => e.code === code);

    if (!entry) {
      return NextResponse.json(
        { error: "Invalid code." },
        { status: 400 }
      );
    }

    if (entry.redeemed) {
      return NextResponse.json(
        { error: "This code has already been redeemed." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    entry.redeemed = true;
    entry.redeemedAt = now;

    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[redeem-invite]", err);
    return NextResponse.json(
      { error: "Failed to redeem code." },
      { status: 500 }
    );
  }
}
