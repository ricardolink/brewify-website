"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

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

const steps = [
  { n: "01", title: "You answer 5 questions", body: "Mood. Life season. When you drink it. What you're building. What matters. Simple, honest, fast." },
  { n: "02", title: "We design your blend", body: "Our model translates your answers into a roast level, flavor profile, and a small story — written only about you." },
  { n: "03", title: "It becomes yours", body: "Your blend gets a name, a label, and a permanent place on the site. Nobody else will ever have the same one." },
  { n: "04", title: "You earn from it", body: "Every time someone orders your blend, you earn $1. Use it as store credit or cash out at $100+." },
];

const values = [
  { icon: "🌱", title: "Amazon-sourced", body: "Every bean comes from small family farms deep in the Amazon basin. People who've spent generations learning a single crop." },
  { icon: "💰", title: "Direct earnings for farmers", body: "10% of every order goes directly to the farming family whose beans made it possible. Not a donation — a fair share of the sale." },
  { icon: "♻️", title: "Roasted clean", body: "Small-batch roasting on demand. No over-production, no warehoused stock going stale. Your bag is roasted when you order it." },
  { icon: "🔒", title: "No generic recipes", body: "We don't have a catalog. Every blend is built from scratch, for one person. Nothing is repeated." },
];

export default function OurCoffeePage() {
  return (
    <main className="bg-brew-black text-brew-ivory">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-end pb-16 md:pb-24 overflow-hidden">
        <img src={HERO_IMG} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brew-black via-brew-black/40 to-transparent" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-4xl space-y-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.45em] text-brew-warm-gray">
            Our Coffee
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-tight text-brew-ivory">
            The world's first fully<br />personalized coffee.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-brew-warm-gray max-w-xl leading-relaxed">
            Not a subscription. Not a quiz with preset results. A blend designed from who you actually are — never repeated, never shared.
          </motion.p>
        </div>
      </section>

      {/* WHAT MAKES IT UNIQUE */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <Fade>
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">What makes it different</p>
              <h2 className="text-2xl md:text-3xl font-medium leading-snug">
                Every other coffee brand sells you a product.<br />We build you one.
              </h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                Most "personalized" coffee sends you a quiz and picks from 5 existing blends. Brewify does something nobody else does: it starts from zero, reads how you're showing up to life right now, and designs a blend that only makes sense for you.
              </p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                The result has a name, a roast, a flavor profile, and a story — written in the language of your moment. And once it's created, it's yours. Permanently. On the site. Earning every time someone orders it.
              </p>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <img src={BEANS_IMG} alt="Pour over coffee" className="absolute inset-0 w-full h-full object-cover grayscale" />
            </div>
          </Fade>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#111] py-20 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">The process</p>
              <h2 className="text-2xl md:text-3xl font-medium">From your answers to your cup.</h2>
            </div>
          </Fade>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Fade key={s.n} delay={i * 0.08}>
                <div className="space-y-4">
                  <p className="font-mono text-3xl text-brew-warm-gray/40">{s.n}</p>
                  <h3 className="text-base font-medium">{s.title}</h3>
                  <p className="text-sm text-brew-warm-gray leading-relaxed">{s.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FARMER STORY */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-6xl mx-auto">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <Fade delay={0.1}>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden order-last md:order-first">
              <img src={FARMER_IMG} alt="Coffee farmer" className="absolute inset-0 w-full h-full object-cover grayscale" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Amazon basin · Brazil</p>
              </div>
            </div>
          </Fade>
          <Fade>
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">The source</p>
              <h2 className="text-2xl md:text-3xl font-medium leading-snug">
                Every blend starts in the hands of a farming family.
              </h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                Our beans come from small family farms in the Amazon basin — cultivators who have spent generations mastering a single crop. Not industrial estates. Not mass commodity supply chains.
              </p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                When you order a Brewify blend, <span className="text-brew-ivory">10% of that sale goes directly to the farming family</span> whose beans made it. Not as charity. As a fair share of the value they created.
              </p>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                THE 100 founding members carry that commitment forward permanently — their blends earn income for farmers every time they're ordered.
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#f5f2ee] text-brew-black py-20 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-black/50">What we stand for</p>
              <h2 className="text-2xl md:text-3xl font-medium">Built differently. On purpose.</h2>
            </div>
          </Fade>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Fade key={v.title} delay={i * 0.07}>
                <div className="space-y-3">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="text-sm font-medium">{v.title}</h3>
                  <p className="text-sm text-brew-black/65 leading-relaxed">{v.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Roast image break */}
      <section className="relative h-[40vh] min-h-[260px] overflow-hidden">
        <img src={ROAST_IMG} alt="" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-brew-black via-transparent to-brew-black" />
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-28 text-center space-y-6">
        <Fade>
          <h2 className="text-3xl md:text-4xl font-medium">Ready to build yours?</h2>
          <p className="text-sm text-brew-warm-gray max-w-md mx-auto">
            Become a founding member of THE 100 and be part of how Brewify starts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/membership"
              className="inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
              Claim your spot — $189.90
            </Link>
            <Link href="/the-100"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-brew-warm-gray hover:text-brew-ivory hover:border-brew-ivory/40 transition-colors">
              Explore THE 100
            </Link>
          </div>
        </Fade>
      </section>

    </main>
  );
}
