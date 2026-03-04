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
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        <header className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
            {t.membership.eyebrow}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            {t.membership.headline}
          </h1>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {/* Reserve */}
          <div className="border border-zinc-800/80 rounded-lg p-6 md:p-8 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-brew-warm-gray mb-2">
              {t.membership.oneTime}
            </p>
            <h2 className="text-xl md:text-2xl font-medium mb-1">
              {t.membership.reserveTitle}
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-brew-ivory mb-6">
              {t.membership.reservePrice}{" "}
              <span className="text-sm font-normal text-brew-warm-gray">
                {t.membership.reserveSubtitle}
              </span>
            </p>
            <ul className="text-sm text-brew-ivory/85 space-y-2 mb-8 flex-1">
              {t.membership.reserveFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray mb-4">
              {t.membership.spotsRemaining(spotsRemaining)}
            </p>
            <Link
              href="/checkout/reserve"
              className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
            >
              {t.membership.comingSoon}
            </Link>
          </div>

          {/* Curator */}
          <div className="border border-zinc-800/80 rounded-lg p-6 md:p-8 flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-brew-warm-gray mb-2">
              {t.membership.monthly}
            </p>
            <h2 className="text-xl md:text-2xl font-medium mb-1">
              {t.membership.curatorTitle}
            </h2>
            <p className="text-2xl md:text-3xl font-medium text-brew-ivory mb-6">
              {t.membership.curatorPrice}{" "}
              <span className="text-sm font-normal text-brew-warm-gray">
                {t.membership.curatorPer}
              </span>
            </p>
            <ul className="text-sm text-brew-ivory/85 space-y-2 mb-8 flex-1">
              {t.membership.curatorFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href="/checkout/curator"
              className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-xs uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
            >
              {t.membership.comingSoon}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
