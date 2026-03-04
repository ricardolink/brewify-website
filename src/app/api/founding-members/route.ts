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

export async function GET() {
  try {
    const list = readMembers();
    return NextResponse.json(list, { status: 200 });
  } catch (err) {
    console.error("[founding-members GET]", err);
    return NextResponse.json(
      { error: "Failed to load founding members." },
      { status: 500 },
    );
  }
}

