import type { BlendInputs, BlendProfile } from "@/types/blend";

interface BlendLabelCardProps {
  inputs: BlendInputs;
  profile: BlendProfile;
}

export function BlendLabelCard({ inputs, profile }: BlendLabelCardProps) {
  const date = new Date(profile.createdAt);
  const dateDisplay = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="w-full max-w-xl border border-brew-warm-gray/40 bg-brew-ivory text-brew-black px-6 py-5 tracking-tight">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.20em] text-neutral-700">
        <span>Brewify Coffee</span>
        <span>{profile.batchId}</span>
      </div>

      <div className="mt-6 flex justify-between text-xs text-neutral-700">
        <div className="space-y-1">
          <p className="uppercase tracking-[0.18em]">Name</p>
          <p className="border-b border-neutral-400/70 pb-1 text-sm font-medium">
            {inputs.name || "—"}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="uppercase tracking-[0.18em]">Date</p>
          <p className="border-b border-neutral-400/70 pb-1 text-sm font-medium">
            {dateDisplay}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="uppercase text-[0.65rem] tracking-[0.2em] text-neutral-700">
          Blend
        </p>
        <h2 className="text-2xl font-medium">{profile.blendName}</h2>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-800">
        <div className="space-y-1">
          <p className="uppercase tracking-[0.18em] text-[0.65rem]">Roast</p>
          <p className="border-b border-neutral-400/70 pb-1 text-sm">
            {profile.roastLevel}
          </p>
        </div>
        <div className="space-y-1 text-right">
          <p className="uppercase tracking-[0.18em] text-[0.65rem]">Profile</p>
          <p className="border-b border-neutral-400/70 pb-1 text-sm">
            {inputs.feeling || "–"} / {inputs.season || "–"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        <p className="uppercase text-[0.65rem] tracking-[0.2em] text-neutral-700">
          Tasting Notes
        </p>
        <p className="text-sm leading-relaxed">
          {profile.flavorNotes.join(". ") + "."}
        </p>
      </div>

      <div className="mt-6 border-t border-dashed border-neutral-400/70 pt-4 text-xs leading-relaxed text-neutral-800">
        {profile.emotionalDescription}
      </div>
    </div>
  );
}

