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
    const newOwner =
      typeof body.newOwner === "string" ? body.newOwner.trim() : "";

    if (!memberNumber || !newOwner) {
      return NextResponse.json(
        { error: "memberNumber and newOwner are required." },
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

    const previousOwner = match.owner ?? match.instagram ?? "Anonymous";
    match.owner = newOwner;
    if (!match.transferHistory) match.transferHistory = [];
    match.transferHistory.push({
      from: previousOwner,
      to: newOwner,
      transferredAt: new Date().toISOString(),
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");

    return NextResponse.json(match, { status: 200 });
  } catch (err) {
    console.error("[transfer-blend POST]", err);
    return NextResponse.json(
      { error: "Failed to transfer ownership." },
      { status: 500 }
    );
  }
}
