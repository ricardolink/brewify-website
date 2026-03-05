import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.BREWIFY_ADMIN_KEY || "BrewLaunch2026!";

export async function POST(req: NextRequest) {
  const { key } = await req.json();

  if (key !== ADMIN_KEY) {
    return NextResponse.json({ error: "Invalid key" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("brewify_admin", "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return res;
}
