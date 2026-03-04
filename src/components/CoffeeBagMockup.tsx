"use client";

import { motion } from "framer-motion";

type CoffeeBagSize = "lg" | "md" | "sm";

export interface CoffeeBagProps {
  blendName: string;
  roastLevel: string;
  flavorNotes: string[];
  emotionalDescription: string;
  batchId: string;
  createdAt: string;
  instagram?: string;
  name?: string;
  size?: CoffeeBagSize;
}

const sizeClasses: Record<CoffeeBagSize, { width: string; height: string }> = {
  lg: { width: "w-[260px] md:w-[280px]", height: "h-[360px] md:h-[380px]" },
  md: { width: "w-[220px]", height: "h-[320px]" },
  sm: { width: "w-[180px]", height: "h-[260px]" },
};

export function CoffeeBagMockup({
  blendName,
  roastLevel,
  flavorNotes,
  emotionalDescription,
  batchId,
  createdAt,
  instagram,
  name,
  size = "lg",
}: CoffeeBagProps) {
  const { width, height } = sizeClasses[size];
  const dateDisplay = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative"
    >
      <div className={`relative mx-auto ${width} ${height}`}>
        {/* Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-6 rounded-full bg-black/60 blur-xl" />

        {/* Bag body with side gussets */}
        <div className="relative h-full flex">
          {/* Left gusset */}
          <div className="w-3 bg-[#d0cbc4]" />
          {/* Front panel */}
          <div className="flex-1 bg-[#f0ece6] shadow-[0_20px_60px_rgba(0,0,0,0.35)] rounded-[18px] overflow-hidden border border-[#e0dbd5] relative">
            {/* Top crimp */}
            <div className="h-10 bg-[#d4cfc9] border-b border-[#c1bbb4] relative">
              <div className="absolute inset-x-4 bottom-1 h-px bg-[#c1bbb4]/70" />
            </div>
            {/* Main area */}
            <div className="relative h-[calc(100%-2.5rem)] flex items-center justify-center px-6">
              {/* Label */}
              <div className="w-full bg-white border border-black/70 px-4 py-4 text-black max-w-xs">
                <p className="text-[9px] uppercase tracking-[0.3em] text-black/70">
                  Brewify Coffee
                </p>
                <div className="mt-1 h-px w-full bg-black/70" />
                <h3 className="mt-3 text-lg font-serif font-medium leading-snug">
                  {blendName}
                </h3>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-black/70">
                  {roastLevel} · {batchId}
                </p>
                <p className="mt-2 text-xs text-black/80">
                  {flavorNotes.join(" · ")}
                </p>
                <p className="mt-2 text-[11px] italic text-black/70 line-clamp-2">
                  {emotionalDescription}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-black/70">
                  <span>{name || instagram || ""}</span>
                  <span>{dateDisplay}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right gusset */}
          <div className="w-3 bg-[#d0cbc4]" />
        </div>
      </div>
    </motion.div>
  );
}

