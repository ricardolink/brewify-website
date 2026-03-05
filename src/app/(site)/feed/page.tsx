"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { FeedBlend } from "@/app/api/feed/route";
import { BREWIFY_ACCESS_KEY } from "@/components/Nav";
import { CoffeeBagMockup } from "@/components/CoffeeBagMockup";
import { useLanguage } from "@/context/LanguageContext";

export default function FeedPage() {
  const { t } = useLanguage();
  const [blends, setBlends] = useState<FeedBlend[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasAccess(!!window.localStorage.getItem(BREWIFY_ACCESS_KEY));
    }
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => setBlends(Array.isArray(data) ? data : []))
      .catch(() => setBlends([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = blends;

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-10 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-10 md:space-y-14">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
          <span>Brewify Coffee</span>
          <span className="hidden md:inline">{t.feed.header}</span>
        </header>

        <section className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brew-warm-gray">
            {t.feed.eyebrow}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            {t.feed.headline}
          </h1>
        </section>

        {loading ? (
          <p className="text-sm text-brew-warm-gray">{t.feed.loading}</p>
        ) : blends.length === 0 ? (
          <section className="min-h-[280px] flex flex-col items-center justify-center gap-4 text-center text-brew-warm-gray">
            <div className="w-[160px] h-[220px] border border-zinc-800 rounded-xl border-dashed" />
            <p className="text-sm">{t.feed.empty}</p>
          </section>
        ) : (
          <section className="space-y-10">
            {featured && (
              <article className="grid gap-8 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] items-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center md:justify-start"
                >
                  <CoffeeBagMockup
                    blendName={featured.blendName}
                    roastLevel={featured.roastLevel}
                    flavorNotes={featured.flavorNotes}
                    emotionalDescription={featured.emotionalDescription}
                    batchId={featured.batchId}
                    createdAt={featured.date || new Date().toISOString()}
                    instagram={featured.instagram}
                    size="lg"
                  />
                </motion.div>
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-brew-warm-gray">
                    {t.feed.mostOrdered}
                  </p>
                  <h2 className="text-xl md:text-2xl font-medium">{featured.blendName}</h2>
                  <p className="text-sm text-brew-warm-gray italic">{featured.instagram}</p>
                  <p className="text-sm text-brew-warm-gray">{featured.flavorNotes.join(" · ")}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="px-3 py-1 text-[10px] uppercase tracking-[0.18em] border border-brew-warm-gray rounded-full text-brew-warm-gray">
                      {featured.roastLevel}
                    </span>
                    {hasAccess && (
                      <a
                        href={`/blend/${featured.batchId}`}
                        className="text-xs underline underline-offset-4 text-brew-ivory hover:text-brew-ivory/80"
                      >
                        {t.feed.orderBtn}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((blend) => (
                <article key={blend.id} className="space-y-4">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex justify-center"
                  >
                    <CoffeeBagMockup
                      blendName={blend.blendName}
                      roastLevel={blend.roastLevel}
                      flavorNotes={blend.flavorNotes}
                      emotionalDescription={blend.emotionalDescription}
                      batchId={blend.batchId}
                      createdAt={blend.date || new Date().toISOString()}
                      instagram={blend.instagram}
                      size="sm"
                    />
                  </motion.div>
                  <div className="space-y-1 text-center">
                    <h3 className="text-base font-medium text-brew-ivory">{blend.blendName}</h3>
                    {blend.instagram && (
                      <p className="text-[11px] italic text-brew-warm-gray">{blend.instagram}</p>
                    )}
                    <p className="text-[11px] text-brew-warm-gray">{blend.flavorNotes.join(" · ")}</p>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-[0.18em] border border-brew-warm-gray rounded-full text-brew-warm-gray">
                        {blend.roastLevel}
                      </span>
                    </div>
                    {hasAccess && (
                      <a
                        href={`/blend/${blend.batchId}`}
                        className="mt-2 inline-block text-[11px] underline underline-offset-4 text-brew-ivory hover:text-brew-ivory/80"
                      >
                        {t.feed.orderBtn}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
