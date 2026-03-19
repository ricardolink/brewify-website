"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, motion, AnimatePresence } from "framer-motion";
import type { FoundingMember } from "@/types/founding";
import { MemberDetailModal } from "@/components/MemberDetailModal";
import { useLanguage } from "@/context/LanguageContext";

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=80";
const FARMER_IMAGE =
  "https://images.unsplash.com/photo-1772228616071-aa344913b93e?w=900&q=80";
const EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80";

function SectionFade({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TheHundredPage() {
  const { t } = useLanguage();
  const [members, setMembers] = useState<FoundingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FoundingMember | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/founding-members");
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const claimed = [...members].sort(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
  );
  const claimedSet = new Set(members.map((m) => m.number));
  const unclaimed: string[] = [];
  for (let i = 1; i <= 100; i++) {
    const num = pad3(i);
    if (!claimedSet.has(num)) unclaimed.push(num);
  }
  const spotsRemaining = 100 - members.length;

  const handleOrder = useCallback(
    async (member: FoundingMember) => {
      const res = await fetch("/api/order-blend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberNumber: member.number }),
      });
      if (!res.ok) return;
      await fetchMembers();
      const updated = await res.json();
      setSelected(updated);
    },
    [fetchMembers]
  );

  const handleTransfer = useCallback(
    async (member: FoundingMember, newOwner: string) => {
      const res = await fetch("/api/transfer-blend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberNumber: member.number, newOwner }),
      });
      if (!res.ok) return;
      await fetchMembers();
      const updated = await res.json();
      setSelected(updated);
    },
    [fetchMembers]
  );

  return (
    <main className="bg-brew-black text-brew-ivory">
      {/* 1. HERO */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: "rgba(0,0,0,0.65)" }} />
        <div className="relative z-10 px-6">
          <h1 className="font-serif text-[clamp(4rem,12vw,7.5rem)] font-normal tracking-tight text-brew-ivory leading-none">
            THE 100
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-brew-warm-gray">
            {t.the100.heroSub}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-brew-ivory/50"
          />
        </div>
      </section>

      {/* 2. MISSION */}
      <section className="bg-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1fr,1fr] md:gap-16 items-stretch">
          <SectionFade className="flex flex-col justify-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
              {t.the100.missionEyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-brew-ivory">
              {t.the100.missionTitle}
            </h2>
            <div className="space-y-4 text-sm md:text-base text-brew-ivory/90 leading-relaxed">
              <p>{t.the100.missionP1}</p>
              <p>{t.the100.missionP2}</p>
              <p>{t.the100.missionP3}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">{t.the100.stat1Value}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">{t.the100.stat1Label}</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">{t.the100.stat2Value}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">{t.the100.stat2Label}</p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">{t.the100.stat3Value}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">{t.the100.stat3Label}</p>
              </div>
            </div>
          </SectionFade>
          <SectionFade className="relative h-[320px] md:h-full min-h-[360px] rounded overflow-hidden">
            <img src={FARMER_IMAGE} alt="Coffee farmer" className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />
          </SectionFade>
        </div>
      </section>

      {/* 3. BENEFITS */}
      <section className="bg-[#f5f2ee] text-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 md:gap-8">
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">{t.the100.earnTitle}</h3>
            <p className="text-sm md:text-base leading-relaxed">{t.the100.earnP1}</p>
            <p className="text-sm leading-relaxed text-black/80">{t.the100.earnP2}</p>
          </SectionFade>
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">{t.the100.impactTitle}</h3>
            <p className="text-sm md:text-base leading-relaxed">{t.the100.impactP1}</p>
            <p className="text-sm leading-relaxed text-black/80">{t.the100.impactP2}</p>
          </SectionFade>
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">{t.the100.ownTitle}</h3>
            <p className="text-sm md:text-base leading-relaxed">{t.the100.ownP1}</p>
            <p className="text-sm leading-relaxed text-black/80">{t.the100.ownP2}</p>
          </SectionFade>
        </div>
      </section>

      {/* 4. ARCHIVE */}
      <section className="bg-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <SectionFade>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{t.the100.archiveEyebrow}</p>
            <h2 className="mt-2 text-xl md:text-2xl font-medium text-brew-ivory">{t.the100.archiveTitle}</h2>
          </SectionFade>

          {loading ? (
            <p className="text-sm text-brew-warm-gray">{t.the100.loading}</p>
          ) : (
            <>
              <div className="space-y-0">
                {claimed.map((m) => (
                  <motion.button
                    key={m.number}
                    type="button"
                    onClick={() => setSelected(m)}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-full text-left py-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 md:gap-8 group relative"
                  >
                    {/* Animated left accent bar */}
                    <motion.span
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-brew-ivory origin-top"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileHover={{ scaleY: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />

                    <span className="font-mono text-2xl md:text-3xl text-brew-warm-gray group-hover:text-brew-ivory/60 transition-colors duration-150 w-16 shrink-0">
                      {m.number}
                    </span>
                    <span className="flex-1 min-w-0 font-medium text-lg md:text-xl text-brew-ivory/90 group-hover:text-brew-ivory transition-colors duration-150">
                      {m.blendName}
                    </span>
                    <span className="text-sm text-brew-warm-gray shrink-0">{m.instagram}</span>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {m.flavorNotes.map((n) => (
                        <span key={n} className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-brew-warm-gray/50 group-hover:border-brew-ivory/30 rounded text-brew-warm-gray group-hover:text-brew-ivory/70 transition-colors duration-150">
                          {n}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-brew-warm-gray shrink-0">
                      {m.ordersCount} {t.the100.orders} · ${m.ordersCount.toFixed(2)} {t.the100.pts}
                    </span>

                    {/* "View" hint — fades in on hover */}
                    <motion.span
                      className="text-[10px] uppercase tracking-[0.25em] text-brew-ivory/50 shrink-0 hidden md:inline"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      View →
                    </motion.span>
                  </motion.button>
                ))}
              </div>

              <SectionFade className="pt-8 border-t border-zinc-800/80">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Available</p>
                    <p className="text-5xl md:text-6xl font-medium text-brew-ivory tabular-nums">
                      {spotsRemaining}
                      <span className="text-xl md:text-2xl text-brew-warm-gray font-normal ml-2">/ 100</span>
                    </p>
                    <p className="text-sm text-brew-warm-gray">spots remaining</p>
                  </div>
                  <Link
                    href="/membership"
                    className="self-start md:self-end inline-flex items-center justify-center rounded-full border border-brew-ivory px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brew-ivory hover:bg-brew-ivory hover:text-brew-black transition-colors"
                  >
                    Claim your spot
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="mt-8 space-y-2">
                  <div className="w-full h-px bg-zinc-800 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-brew-ivory"
                      initial={{ width: 0 }}
                      animate={{ width: `${(members.length / 100) * 100}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-brew-warm-gray/60">
                    <span>{members.length} claimed</span>
                    <span>{spotsRemaining} open</span>
                  </div>
                </div>

                {/* Next available numbers — just a hint, not all 97 */}
                {unclaimed.length > 0 && (
                  <div className="mt-6 flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-brew-warm-gray/50">Next open</span>
                    {unclaimed.slice(0, 5).map((num) => (
                      <span key={num} className="font-mono text-xs text-brew-warm-gray/50 border border-zinc-800 px-2 py-1 rounded">
                        {num}
                      </span>
                    ))}
                    {unclaimed.length > 5 && (
                      <span className="text-xs text-brew-warm-gray/40">+{unclaimed.length - 5} more</span>
                    )}
                  </div>
                )}
              </SectionFade>
            </>
          )}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-brew-black py-20 md:py-28 px-6 text-center">
        <SectionFade>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-brew-ivory tracking-tight">
            {t.the100.ctaTitle}
          </h2>
          <p className="mt-4 text-sm md:text-base text-brew-warm-gray">{t.the100.ctaSub}</p>
          <Link
            href="/membership"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-brew-ivory px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brew-ivory hover:bg-brew-ivory hover:text-brew-black transition-colors"
          >
            {t.the100.ctaBtn}
          </Link>
          {!loading && (
            <p className="mt-6 text-sm text-brew-warm-gray">
              {t.the100.spotsRemaining(spotsRemaining)}
            </p>
          )}
        </SectionFade>
      </section>

      {/* 6. Editorial photo */}
      <section className="relative w-full h-[50vh] min-h-[280px]">
        <img src={EDITORIAL_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover grayscale" />
      </section>

      <AnimatePresence>
        {selected && (
          <MemberDetailModal
            member={selected}
            onClose={() => setSelected(null)}
            onOrder={handleOrder}
            onTransfer={handleTransfer}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
