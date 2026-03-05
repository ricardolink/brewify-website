"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useExt } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const { contact: c } = useExt();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("error"); setErrorMsg(data.error ?? c.errorFallback); return; }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg(c.errorFallback);
    }
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto grid gap-16 md:grid-cols-[1fr_1.4fr] items-start">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8 md:sticky md:top-28">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{c.eyebrow}</p>
            <h1 className="text-3xl md:text-4xl font-medium leading-tight">{c.headline}</h1>
            <p className="text-sm text-brew-warm-gray leading-relaxed">{c.sub}</p>
          </div>
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">{c.emailLabel}</p>
            <a href="mailto:iam@brewifycoffee.com" className="text-sm text-brew-ivory hover:text-brew-warm-gray transition-colors">iam@brewifycoffee.com</a>
          </div>
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">{c.responseLabel}</p>
            <p className="text-sm text-brew-warm-gray">{c.responseValue}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {status === "success" ? (
            <div className="border border-zinc-800/80 rounded-2xl p-10 text-center space-y-4">
              <p className="text-2xl">✓</p>
              <h2 className="text-xl font-medium">{c.successTitle}</h2>
              <p className="text-sm text-brew-warm-gray">{c.successSub(form.email || "your email")}</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-xs uppercase tracking-[0.2em] text-brew-warm-gray hover:text-brew-ivory transition-colors underline underline-offset-4">
                {c.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{c.nameLabel}</label>
                  <input type="text" required value={form.name} onChange={set("name")} placeholder={c.namePlaceholder}
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{c.emailField}</label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder={c.emailPlaceholder}
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{c.subjectLabel}</label>
                <select value={form.subject} onChange={set("subject")} required
                  className="w-full bg-brew-black border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 text-brew-ivory rounded-lg appearance-none">
                  {c.subjectOptions.map((opt, i) => (
                    <option key={opt} value={i === 0 ? "" : opt} disabled={i === 0}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">{c.messageLabel}</label>
                <textarea required rows={6} value={form.message} onChange={set("message")} placeholder={c.messagePlaceholder}
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg resize-none" />
              </div>
              {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
              <button type="submit" disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50">
                {status === "loading" ? c.sending : c.sendBtn}
              </button>
              <p className="text-[10px] text-zinc-600 text-center">{c.replyNote}</p>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
