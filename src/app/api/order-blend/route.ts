import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { FoundingMember } from "@/types/founding";

const DATA_PATH = path.join(process.cwd(), "data", "founding-members.json");

function readMembers(): FoundingMember[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const memberNumber =
      typeof body.memberNumber === "string"
        ? body.memberNumber.trim().padStart(3, "0")
        : "";

    if (!memberNumber) {
      return NextResponse.json(
        { error: "memberNumber is required." },
        { status: 400 }
      );
    }

    const list = readMembers();
    const match = list.find((m) => m.number === memberNumber) ?? null;

    if (!match) {
      return NextResponse.json(
        { error: "No founding member with that number." },
        { status: 404 }
      );
    }

    match.ordersCount = (match.ordersCount ?? 0) + 1;
    match.pointsEarned = (match.pointsEarned ?? 0) + 10;

    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json(match, { status: 200 });
  } catch (err) {
    console.error("[order-blend POST]", err);
    return NextResponse.json(
      { error: "Failed to record order." },
      { status: 500 }
    );
  }
}
