"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useExt } from "@/context/LanguageContext";

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

type Status = "idle" | "loading" | "success" | "error";

export default function InvestorPage() {
  const { investor: iv } = useExt();
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
          <p className="text-[10px] uppercase tracking-[0.5em] text-brew-warm-gray">{iv.eyebrow}</p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] font-normal leading-tight">
            {iv.headline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}<br />
            <span className="text-brew-warm-gray italic">{iv.headlineItalic}</span>
          </h1>
          <p className="text-base md:text-lg text-brew-warm-gray leading-relaxed max-w-xl mx-auto">{iv.subheadline}</p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
              {iv.cta}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className="border-t border-zinc-900 py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto grid gap-8 grid-cols-2 md:grid-cols-4">
          {iv.metrics.map((m, i) => (
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

      {/* OPPORTUNITY */}
      <section className="bg-[#111] py-20 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <Fade>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{iv.opportunityEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium max-w-xl">{iv.opportunityHeadline}</h2>
            </div>
          </Fade>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {iv.why.map((w, i) => (
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
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{iv.visionEyebrow}</p>
          <h2 className="text-2xl md:text-3xl font-medium leading-snug">
            {iv.visionHeadline.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
        </Fade>
        <Fade delay={0.1}><p className="text-sm md:text-base text-brew-warm-gray leading-relaxed">{iv.visionP1}</p></Fade>
        <Fade delay={0.15}><p className="text-sm md:text-base text-brew-warm-gray leading-relaxed">{iv.visionP2}</p></Fade>
        <Fade delay={0.2}><p className="text-sm md:text-base text-brew-ivory leading-relaxed font-medium">{iv.visionP3}</p></Fade>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-zinc-900 py-20 px-6 md:px-12 lg:px-24 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto grid gap-14 md:grid-cols-[1fr_1.5fr] items-start">
          <Fade className="space-y-6 md:sticky md:top-28">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{iv.contactEyebrow}</p>
              <h2 className="text-2xl md:text-3xl font-medium">{iv.contactHeadline}</h2>
              <p className="text-sm text-brew-warm-gray leading-relaxed">{iv.contactSub}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">{iv.contactEmailLabel}</p>
              <a href="mailto:iam@brewifycoffee.com" className="text-sm text-brew-ivory hover:text-brew-warm-gray transition-colors">iam@brewifycoffee.com</a>
            </div>
          </Fade>
          <Fade delay={0.1}>
            {status === "success" ? (
              <div className="border border-zinc-800/80 rounded-2xl p-10 text-center space-y-4">
                <p className="text-2xl">✓</p>
                <h3 className="text-xl font-medium">{iv.successTitle}</h3>
                <p className="text-sm text-brew-warm-gray">{iv.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{iv.nameLabel}</label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder={iv.namePlaceholder}
                      className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{iv.emailLabel}</label>
                    <input type="email" required value={form.email} onChange={set("email")} placeholder={iv.emailPlaceholder}
                      className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{iv.firmLabel} <span className="text-zinc-600 normal-case tracking-normal">{iv.firmOptional}</span></label>
                  <input type="text" value={form.firm} onChange={set("firm")} placeholder={iv.firmPlaceholder}
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{iv.messageLabel}</label>
                  <textarea required rows={5} value={form.message} onChange={set("message")} placeholder={iv.messagePlaceholder}
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg resize-none" />
                </div>
                {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
                <button type="submit" disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50">
                  {status === "loading" ? iv.sending : iv.sendBtn}
                </button>
                <p className="text-[10px] text-zinc-600 text-center">{iv.responseNote}</p>
              </form>
            )}
          </Fade>
        </div>
      </section>
    </main>
  );
}
