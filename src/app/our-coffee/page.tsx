"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useExt } from "@/context/LanguageContext";

const HERO_IMG = "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1800&q=85";
const FARMER_IMG = "https://images.unsplash.com/photo-1772228616071-aa344913b93e?w=1200&q=85";
const BEANS_IMG = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=85";
const ROAST_IMG = "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?w=1200&q=85";

function Fade({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function OurCoffeePage() {
  const { ourCoffee: oc } = useExt();

  return (
    <main className="bg-brew-black text-brew-ivory">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end pb-16 md:pb-24 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brew-black via-brew-black/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-4xl space-y-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.45em] text-brew-warm-gray">{oc.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-tight text-brew-ivory">
            {oc.headline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-brew-warm-gray max-w-xl leading-relaxed">{oc.subheadline}</motion.p>
        </div>
      </section>

      {/* UNIQUE */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <Fade>
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{oc.uniqueEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium leading-snug">
                {oc.uniqueHeadline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">{oc.uniqueP1}</p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">{oc.uniqueP2}</p>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <img src={BEANS_IMG} alt="" className="absolute inset-0 w-full h-full object-cover grayscale" />
            </div>
          </Fade>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-zinc-950 py-20 md:py-24 px-6 md:px-12 lg:px-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{oc.processEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium text-brew-ivory">{oc.processHeadline}</h2>
            </div>
          </Fade>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {oc.steps.map((s, i) => (
              <Fade key={s.n} delay={i * 0.08}>
                <div className="space-y-4">
                  <p className="font-mono text-3xl text-brew-warm-gray/40">{s.n}</p>
                  <h3 className="text-base font-medium text-brew-ivory">{s.title}</h3>
                  <p className="text-sm text-brew-warm-gray leading-relaxed">{s.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FARMER */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <Fade delay={0.1}>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden order-last md:order-first">
              <img src={FARMER_IMG} alt="Coffee farmer" className="absolute inset-0 w-full h-full object-cover grayscale" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{oc.farmerLocation}</p>
              </div>
            </div>
          </Fade>
          <Fade>
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{oc.farmerEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium leading-snug">{oc.farmerHeadline}</h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">{oc.farmerP1}</p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                {oc.farmerP2.split("10%").map((part, i) =>
                  i === 0 ? <span key={i}>{part}<span className="text-brew-ivory">10%</span></span> : <span key={i}>{part}</span>
                )}
              </p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">{oc.farmerP3}</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-zinc-950 py-20 md:py-24 px-6 md:px-12 lg:px-24 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{oc.valuesEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium text-brew-ivory">{oc.valuesHeadline}</h2>
            </div>
          </Fade>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {oc.values.map((v, i) => (
              <Fade key={v.title} delay={i * 0.07}>
                <div className="space-y-3">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="text-sm font-medium text-brew-ivory">{v.title}</h3>
                  <p className="text-sm text-brew-warm-gray leading-relaxed">{v.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ROAST break */}
      <section className="relative h-[40vh] min-h-[260px] overflow-hidden">
        <img src={ROAST_IMG} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-brew-black via-transparent to-brew-black" />
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28 text-center space-y-6">
        <Fade>
          <h2 className="text-3xl md:text-4xl font-medium">{oc.ctaHeadline}</h2>
          <p className="text-sm text-brew-warm-gray max-w-md mx-auto">{oc.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/membership" className="inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
              {oc.ctaPrimary}
            </Link>
            <Link href="/the-100" className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-brew-warm-gray hover:text-brew-ivory hover:border-brew-ivory/40 transition-colors">
              {oc.ctaSecondary}
            </Link>
          </div>
        </Fade>
      </section>
    </main>
  );
}
