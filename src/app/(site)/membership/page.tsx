"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function MembershipPage() {
  const { t } = useLanguage();
  const [spotsRemaining, setSpotsRemaining] = useState<number>(100);

  useEffect(() => {
    fetch("/api/founding-members")
      .then((r) => r.json())
      .then((data) => {
        const count = Array.isArray(data) ? data.length : 0;
        setSpotsRemaining(Math.max(0, 100 - count));
      })
      .catch(() => setSpotsRemaining(100));
  }, []);

  const claimed = 100 - spotsRemaining;

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-24 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-lg w-full space-y-8">

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-brew-warm-gray">{t.membership.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">{t.membership.headline}</h1>
        </motion.header>

        {/* ── Lifetime coffee highlight ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-[#c8a45a]/30 bg-[#c8a45a]/[0.04] px-6 py-5"
        >
          {/* warm glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,164,90,0.08) 0%, transparent 70%)" }} />
          <div className="relative z-10 flex items-start gap-4">
            <span className="text-2xl mt-0.5">☕</span>
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.45em] text-[#c8a45a]">Founding member benefit</p>
              <p className="text-base font-medium text-brew-ivory leading-snug">
                1 free coffee per day —<br className="hidden sm:block" /> for life, at any store worldwide.
              </p>
              <p className="text-xs text-brew-warm-gray leading-relaxed">
                One daily coffee, redeemable at any participating Brewify-partner location anywhere in the world. No expiry. No catch. Yours for life.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Main card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-zinc-800/80 rounded-2xl p-8 md:p-10 space-y-8"
        >
          {/* Label + price */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brew-warm-gray">{t.membership.oneTime}</p>
              <h2 className="text-2xl font-medium">{t.membership.reserveTitle}</h2>
            </div>
            <div className="text-right shrink-0">
              <p className="text-4xl font-medium text-brew-ivory">{t.membership.reservePrice}</p>
              <p className="text-[10px] text-brew-warm-gray mt-0.5">one-time · lifetime</p>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {t.membership.reserveFeatures.map((f, i) => (
              <li key={f} className={`flex items-start gap-3 text-sm ${i === 0 ? "text-brew-ivory font-medium" : "text-brew-ivory/80"}`}>
                <span className={`mt-0.5 shrink-0 ${i === 0 ? "text-[#c8a45a]" : "text-brew-warm-gray"}`}>
                  {i === 0 ? "★" : "—"}
                </span>
                <span>{i === 0 ? f.replace("☕ ", "") : f}</span>
              </li>
            ))}
          </ul>

          {/* Spots progress */}
          <div className="space-y-3 border-t border-zinc-800/60 pt-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-brew-warm-gray">
              <span>{t.membership.spotsRemaining(spotsRemaining)}</span>
              <span>{claimed} / 100 claimed</span>
            </div>
            <div className="h-px bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(claimed / 100) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="h-full bg-[#c8a45a]/70 rounded-full"
              />
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/checkout/reserve"
            className="inline-flex items-center justify-center w-full rounded-full bg-brew-ivory text-brew-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity"
          >
            {t.membership.comingSoon}
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] text-zinc-600 text-center leading-relaxed"
        >
          One-time payment · No subscription · Lifetime access · Never restocked after 100
        </motion.p>
      </div>
    </main>
  );
}
