import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Store the message in a local JSON file (in production, wire to Resend / SMTP)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "contact-messages.json");

    let messages: object[] = [];
    if (fs.existsSync(filePath)) {
      try { messages = JSON.parse(fs.readFileSync(filePath, "utf-8")); } catch { /* ignore */ }
    }

    messages.push({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      to: "iam@brewifycoffee.com",
      receivedAt: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
