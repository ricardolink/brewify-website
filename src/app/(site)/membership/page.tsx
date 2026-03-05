"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex items-center justify-center">
      <div className="max-w-lg w-full space-y-10">

        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
            {t.membership.eyebrow}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            {t.membership.headline}
          </h1>
        </header>

        <div className="border border-zinc-800/80 rounded-2xl p-8 md:p-10 space-y-8">
          {/* Label */}
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-brew-warm-gray">
              {t.membership.oneTime}
            </p>
            <h2 className="text-2xl md:text-3xl font-medium">{t.membership.reserveTitle}</h2>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-4xl md:text-5xl font-medium text-brew-ivory">
              {t.membership.reservePrice}
            </span>
            <span className="text-sm text-brew-warm-gray pb-1">
              {t.membership.reserveSubtitle}
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {t.membership.reserveFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-brew-ivory/85">
                <span className="text-brew-warm-gray mt-0.5">—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Spots */}
          <div className="space-y-4 border-t border-zinc-800/60 pt-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
              <span className="text-brew-warm-gray">{t.membership.spotsRemaining(spotsRemaining)}</span>
              <span className="text-brew-warm-gray">{100 - spotsRemaining} / 100 claimed</span>
            </div>
            {/* Progress bar */}
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-brew-ivory/80 rounded-full transition-all duration-700"
                style={{ width: `${((100 - spotsRemaining) / 100) * 100}%` }}
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
        </div>

        <p className="text-xs text-brew-warm-gray text-center">
          One-time payment · Lifetime access · Never restocked
        </p>
      </div>
    </main>
  );
}
