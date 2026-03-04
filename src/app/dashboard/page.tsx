"use client";

import { useEffect, useState } from "react";
import type { BlendProfile } from "@/types/blend";
import { BREWIFY_ACCESS_KEY } from "@/components/Nav";

const mockBlends: BlendProfile[] = [
  {
    blendName: "Still Water No. 7",
    roastLevel: "Medium",
    flavorNotes: ["Brown sugar", "Cedar", "Quiet mornings"],
    emotionalDescription:
      "A steady, unhurried cup that sits just to the side of your thoughts. It doesn’t ask for attention; it makes space for it.",
    batchId: "BW-14-07",
    createdAt: new Date().toISOString(),
  },
  {
    blendName: "Meridian",
    roastLevel: "Light",
    flavorNotes: ["Lemon oil", "Almond", "Clean air"],
    emotionalDescription:
      "A bright line through the middle of your day. The moment you remember you can start again at any hour.",
    batchId: "MR-03-21",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
];

export default function DashboardPage() {
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(BREWIFY_ACCESS_KEY)) {
      window.location.href = "/";
      return;
    }
    setAccessChecked(true);
  }, []);

  if (!accessChecked) {
    return <main className="min-h-screen bg-brew-black" />;
  }

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-10 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
          <span>Brewify Coffee</span>
          <span className="hidden md:inline">Archive</span>
        </header>

        <section className="space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            Your blends, in sequence.
          </h1>
          <p className="max-w-xl text-sm md:text-base text-brew-warm-gray">
            A small record of how you&apos;ve been arriving to the cup — seasons,
            shifts, and quiet pivots. Nothing loud, just a log.
          </p>
        </section>

        <section className="space-y-8">
          <div className="space-y-4">
            {mockBlends.map((blend) => {
              const d = new Date(blend.createdAt);
              const dateLabel = d.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              });

              return (
                <div key={blend.batchId} className="flex flex-col md:flex-row md:items-center md:justify-between border-t border-zinc-900/80 pt-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                      {dateLabel}
                    </p>
                    <h2 className="text-lg md:text-xl font-medium">
                      {blend.blendName}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                      {blend.roastLevel} Roast · {blend.batchId}
                    </p>
                    <p className="text-sm text-brew-ivory/80">
                      {blend.flavorNotes.join(" · ")}
                    </p>
                    <p className="text-sm text-brew-warm-gray/90 max-w-xl">
                      {blend.emotionalDescription}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <button className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-5 py-2 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors">
                      Reorder
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="mt-8 border-t border-zinc-900/80 pt-6 space-y-4">
            <h2 className="text-sm md:text-base uppercase tracking-[0.22em] text-brew-warm-gray">
              Compare Blends
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {mockBlends.slice(0, 2).map((blend) => (
                <div key={blend.batchId} className="border border-zinc-900/90 px-4 py-4 space-y-3 text-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                    {blend.blendName}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                    {blend.roastLevel} Roast
                  </p>
                  <p className="text-sm text-brew-ivory/85">
                    {blend.flavorNotes.join(" · ")}
                  </p>
                  <p className="text-xs text-brew-warm-gray/90 leading-relaxed">
                    {blend.emotionalDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

