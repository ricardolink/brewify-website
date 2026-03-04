"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, motion, AnimatePresence } from "framer-motion";
import type { FoundingMember } from "@/types/founding";
import { MemberDetailModal } from "@/components/MemberDetailModal";

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=80";
const FARMER_IMAGE =
  "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=900&q=80";
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
      {/* 1. HERO — Full screen, B&W photo + overlay */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        />
        <div className="relative z-10 px-6">
          <h1 className="font-serif text-[clamp(4rem,12vw,7.5rem)] font-normal tracking-tight text-brew-ivory leading-none">
            THE 100
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-brew-warm-gray">
            The founding blends of Brewify Coffee.
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

      {/* 2. MISSION — Two columns */}
      <section className="bg-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1fr,1fr] md:gap-16 items-stretch">
          <SectionFade className="flex flex-col justify-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
              Why it matters
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-brew-ivory">
              Every blend begins in the Amazon.
            </h2>
            <div className="space-y-4 text-sm md:text-base text-brew-ivory/90 leading-relaxed">
              <p>
                The coffee we source comes from small family farms deep in the
                Amazon basin — generations of cultivators who have spent their
                lives learning a single crop.
              </p>
              <p>
                Every time a Brewify blend is ordered, a portion of that sale
                goes directly to the farming family whose beans made it
                possible. The 100 founding members carry that legacy forward.
              </p>
              <p>This is not charity. It is the correct way to do business.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">
                  10%
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">
                  of every order → farming families
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">
                  100
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">
                  founding members
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-medium text-brew-ivory">
                  1 blend
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mt-1">
                  per person. Forever.
                </p>
              </div>
            </div>
          </SectionFade>
          <SectionFade className="relative h-[320px] md:h-full min-h-[360px] rounded overflow-hidden">
            <img
              src={FARMER_IMAGE}
              alt="Coffee farmer"
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </SectionFade>
        </div>
      </section>

      {/* 3. YOUR BENEFITS — Off-white background */}
      <section className="bg-[#f5f2ee] text-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 md:gap-8">
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">
              You earn
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Every time someone orders your blend, you earn 10 points.
            </p>
            <p className="text-sm leading-relaxed text-black/80">
              Points redeem as store credit or cash — no minimum, no expiry.
            </p>
          </SectionFade>
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">
              You impact
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              10% of each order of your blend goes to the farming family who
              grew those beans.
            </p>
            <p className="text-sm leading-relaxed text-black/80">
              Your number in The 100 is a permanent contribution to their
              livelihood.
            </p>
          </SectionFade>
          <SectionFade className="space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em]">
              You own
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              Your blend is an asset. Transfer it. Hold it. Let it earn.
            </p>
            <p className="text-sm leading-relaxed text-black/80">
              Founding spots are limited to 100. There will never be more.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* 4. THE ARCHIVE — Claimed cards + unclaimed grid */}
      <section className="bg-brew-black py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <SectionFade>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
              The archive
            </p>
            <h2 className="mt-2 text-xl md:text-2xl font-medium text-brew-ivory">
              Claimed blends. Living on the site. Earning forever.
            </h2>
          </SectionFade>

          {loading ? (
            <p className="text-sm text-brew-warm-gray">Loading…</p>
          ) : (
            <>
              {/* Claimed spots — horizontal cards */}
              <div className="space-y-0">
                {claimed.map((m) => (
                  <button
                    key={m.number}
                    type="button"
                    onClick={() => setSelected(m)}
                    className="w-full text-left py-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 md:gap-8 hover:border-brew-ivory/20 transition-colors group"
                  >
                    <span className="font-mono text-2xl md:text-3xl text-brew-warm-gray w-16 shrink-0">
                      {m.number}
                    </span>
                    <span className="flex-1 min-w-0 font-medium text-lg md:text-xl text-brew-ivory/90 group-hover:text-brew-ivory transition-colors">
                      {m.blendName}
                    </span>
                    <span className="text-sm text-brew-warm-gray shrink-0">
                      {m.instagram}
                    </span>
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {m.flavorNotes.map((n) => (
                        <span
                          key={n}
                          className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-brew-warm-gray/50 rounded text-brew-warm-gray"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-brew-warm-gray shrink-0">
                      {m.ordersCount} orders · {m.pointsEarned} pts earned
                    </span>
                  </button>
                ))}
              </div>

              {/* Unclaimed */}
              <SectionFade className="pt-8 border-t border-zinc-800/80">
                <p className="text-2xl md:text-3xl font-medium text-brew-ivory mb-6">
                  {spotsRemaining} spots remaining.
                </p>
                <div className="grid grid-cols-8 gap-2">
                  {unclaimed.map((num) => (
                    <span
                      key={num}
                      className="text-[11px] font-mono text-brew-warm-gray/40 text-center py-1"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </SectionFade>
            </>
          )}
        </div>
      </section>

      {/* 5. CLAIM YOUR SPOT CTA */}
      <section className="bg-brew-black py-20 md:py-28 px-6 text-center">
        <SectionFade>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-brew-ivory tracking-tight">
            Claim your number.
          </h2>
          <p className="mt-4 text-sm md:text-base text-brew-warm-gray">
            One of 100 founding positions. Never restocked.
          </p>
          <Link
            href="/membership"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-brew-ivory px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brew-ivory hover:bg-brew-ivory hover:text-brew-black transition-colors"
          >
            Get founding access — $49
          </Link>
          {!loading && (
            <p className="mt-6 text-sm text-brew-warm-gray">
              {spotsRemaining} spots remaining.
            </p>
          )}
        </SectionFade>
      </section>

      {/* 6. Second editorial photo — full bleed */}
      <section className="relative w-full h-[50vh] min-h-[280px]">
        <img
          src={EDITORIAL_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />
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
