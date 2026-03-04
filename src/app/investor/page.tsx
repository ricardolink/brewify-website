"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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

const metrics = [
  { value: "100", label: "Founding spots", sub: "Never restocked. Selling at $189.90 each." },
  { value: "$18,990", label: "Founding round cap", sub: "Community-funded launch model." },
  { value: "$1", label: "Per bag to creators", sub: "Recurring revenue for members, loyalty built in." },
  { value: "10%", label: "Per order to farmers", sub: "Ethical sourcing baked into every transaction." },
];

const why = [
  { title: "Category gap", body: "No brand has combined AI-personalized coffee, a creator economy layer, and Amazon-farmer direct sourcing into a single product. Brewify sits at the intersection of all three." },
  { title: "Recurring by design", body: "Once someone builds their blend, they reorder it. The personal connection to a named, authored product creates retention that commodity subscriptions can't match." },
  { title: "Asset-based loyalty", body: "THE 100 members don't just subscribe — they own something. A blend that earns them money. That's a fundamentally different relationship with a brand." },
  { title: "Ethical moat", body: "The Amazon sourcing model and direct farmer payments aren't marketing copy — they're structural. Hard to copy. Easy to tell." },
  { title: "Digital-physical bridge", body: "Every blend lives online permanently. It can be gifted, transferred, ordered by anyone. It's a physical product with digital asset mechanics." },
  { title: "Early traction model", body: "The 100 founding members prove demand, fund the initial roasting operations, and create the community that markets the product organically." },
];

type Status = "idle" | "loading" | "success" | "error";

export default function InvestorPage() {
  const [form, setForm] = useState({ name: "", email: "", firm: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: "Investor Inquiry", message: `Firm: ${form.firm}\n\n${form.message}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please email us directly.");
    }
  };

  return (
    <main className="bg-brew-black text-brew-ivory">

      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,170,120,0.06) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 max-w-3xl space-y-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-brew-warm-gray">Investor Relations</p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] font-normal leading-tight">
            The coffee industry<br />hasn't changed.<br />
            <span className="text-brew-warm-gray italic">We're changing it.</span>
          </h1>
          <p className="text-base md:text-lg text-brew-warm-gray leading-relaxed max-w-xl mx-auto">
            Brewify is building the first coffee brand where every product is unique, every customer is a creator, and every order supports the people who grow the beans.
          </p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
              Request a conversation
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className="border-t border-zinc-900 py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid gap-8 grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <Fade key={m.label} delay={i * 0.08}>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-medium text-brew-ivory">{m.value}</p>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brew-ivory/80">{m.label}</p>
                <p className="text-[11px] text-brew-warm-gray leading-relaxed">{m.sub}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* THE OPPORTUNITY */}
      <section className="bg-[#111] py-20 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">The opportunity</p>
              <h2 className="text-2xl md:text-3xl font-medium max-w-xl">Six reasons the timing is right.</h2>
            </div>
          </Fade>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Fade key={w.title} delay={i * 0.07}>
                <div className="space-y-3 p-6 border border-zinc-800/60 rounded-xl">
                  <h3 className="text-sm font-medium text-brew-ivory">{w.title}</h3>
                  <p className="text-sm text-brew-warm-gray leading-relaxed">{w.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-4xl mx-auto space-y-8">
        <Fade>
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">The vision</p>
          <h2 className="text-2xl md:text-3xl font-medium leading-snug">
            Phase one is coffee.<br />Phase two is everything you personalize.
          </h2>
        </Fade>
        <Fade delay={0.1}>
          <p className="text-sm md:text-base text-brew-warm-gray leading-relaxed">
            Brewify's core technology is a personalization engine that translates human context — mood, season of life, aspiration — into a physical product. Coffee is the first application because it's intimate, daily, and deeply tied to identity.
          </p>
        </Fade>
        <Fade delay={0.15}>
          <p className="text-sm md:text-base text-brew-warm-gray leading-relaxed">
            The longer-term thesis is a platform: any product category where personal context changes what someone would want. Tea. Supplements. Fragrance. The infrastructure being built for coffee applies everywhere.
          </p>
        </Fade>
        <Fade delay={0.2}>
          <p className="text-sm md:text-base text-brew-ivory leading-relaxed font-medium">
            We're not selling bags of coffee. We're building infrastructure for personalized physical goods — starting where the emotional attachment is deepest.
          </p>
        </Fade>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="border-t border-zinc-900 py-20 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto grid gap-14 md:grid-cols-[1fr_1.5fr] items-start">
          <Fade className="space-y-6 md:sticky md:top-28">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Get in touch</p>
              <h2 className="text-2xl md:text-3xl font-medium">Interested in investing?</h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">
                We're having early conversations with investors who understand brand, community, and the consumer goods space. If that's you, we'd like to talk.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Direct email</p>
              <a href="mailto:iam@brewifycoffee.com" className="text-sm text-brew-ivory hover:text-brew-warm-gray transition-colors">
                iam@brewifycoffee.com
              </a>
            </div>
          </Fade>

          <Fade delay={0.1}>
            {status === "success" ? (
              <div className="border border-zinc-800/80 rounded-2xl p-10 text-center space-y-4">
                <p className="text-2xl">✓</p>
                <h3 className="text-xl font-medium">Message received.</h3>
                <p className="text-sm text-brew-warm-gray">We'll follow up within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Name</label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder="Your name"
                      className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Email</label>
                    <input type="email" required value={form.email} onChange={set("email")} placeholder="you@firm.com"
                      className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Firm / Organization <span className="text-zinc-600 normal-case tracking-normal">(optional)</span></label>
                  <input type="text" value={form.firm} onChange={set("firm")} placeholder="Fund name or company"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Message</label>
                  <textarea required rows={5} value={form.message} onChange={set("message")}
                    placeholder="Tell us about your investment thesis and what draws you to Brewify..."
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg resize-none" />
                </div>
                {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
                <button type="submit" disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50">
                  {status === "loading" ? "Sending…" : "Send inquiry"}
                </button>
                <p className="text-[10px] text-zinc-600 text-center">We respond to all serious inquiries within 48 hours.</p>
              </form>
            )}
          </Fade>
        </div>
      </section>

    </main>
  );
}
