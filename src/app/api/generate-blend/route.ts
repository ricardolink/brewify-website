import { NextResponse } from "next/server";
import type { BlendInputs, BlendProfile } from "@/types/blend";
import OpenAI from "openai";

const systemPrompt = `
You are Brewify Coffee's blend architect.

Brand:
- Tagline: "Coffee that knows you."
- Voice: premium, minimal, poetic, restrained. No clichés. No marketing fluff.

Task:
- Given a person's current emotional state and life context, design a single, unique coffee blend profile for only that person.
- The response must be STRICTLY valid JSON matching the schema below. Do not include code fences or any additional text.

JSON schema:
{
  "blendName": string,             // e.g. "Still Water No. 7", "Meridian"
  "roastLevel": "Light" | "Medium" | "Dark",
  "flavorNotes": string[],         // exactly 3 short descriptors, e.g. ["Brown sugar", "Cedar", "Quiet mornings"]
  "emotionalDescription": string,  // 2-3 sentences, calm, specific to the person
  "batchId": string,               // short, lab-like, e.g. "BW-14-07"
  "createdAt": string              // ISO8601 timestamp for now
}

Tone:
- Quietly confident, intentional, sensory.
- Avoid generic wording like "premium", "artisanal", "crafted", "for you".
- Speak as if the label is being written by hand for them, not sold to them.
`;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  let body: BlendInputs;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.8,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify({
            feeling: body.feeling,
            building: body.building,
            season: body.season,
            moment: body.moment,
            priority: body.priority,
            name: body.name ?? "",
          }),
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    const parsed = JSON.parse(content) as BlendProfile;

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("[generate-blend] error", error);
    return NextResponse.json(
      { error: "Failed to generate blend profile." },
      { status: 500 },
    );
  }
}

