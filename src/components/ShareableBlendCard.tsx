"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import type { BlendInputs, BlendProfile } from "@/types/blend";

const SITE_URL = "https://brewifycoffee.com";

interface ShareableBlendCardProps {
  inputs: BlendInputs;
  profile: BlendProfile;
  instagram?: string | null;
}

export function ShareableBlendCard({ inputs, profile, instagram }: ShareableBlendCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const dateDisplay = new Date(profile.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const blendUrl = `${SITE_URL}/blend/${profile.batchId}`;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `brewify-${profile.batchId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blendUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="w-full max-w-md bg-brew-black border border-brew-warm-gray/40 rounded-lg p-5 text-brew-ivory"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-brew-warm-gray">
          Brewify Coffee
        </p>
        <h2 className="mt-3 text-xl font-medium">{profile.blendName}</h2>
        <p className="mt-2 text-xs text-brew-warm-gray">
          {profile.flavorNotes.join(" · ")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brew-ivory/90">
          {profile.emotionalDescription}
        </p>
        <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-brew-warm-gray flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{profile.batchId}</span>
          <span>{dateDisplay}</span>
          {instagram && <span>{instagram}</span>}
        </div>
        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-brew-warm-gray">
          {SITE_URL}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
        >
          Download Card
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
        >
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
