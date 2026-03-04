"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
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
      if (!res.ok) { setStatus("error"); setErrorMsg(data.error ?? "Something went wrong."); return; }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto grid gap-16 md:grid-cols-[1fr_1.4fr] items-start">

        {/* Left — info */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8 md:sticky md:top-28">
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Contact</p>
            <h1 className="text-3xl md:text-4xl font-medium leading-tight">
              Let's talk.
            </h1>
            <p className="text-sm text-brew-warm-gray leading-relaxed">
              Whether you have a question about your blend, want to learn more about THE 100, or just want to say hello — we read every message.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Email us directly</p>
            <a href="mailto:iam@brewifycoffee.com" className="text-sm text-brew-ivory hover:text-brew-warm-gray transition-colors">
              iam@brewifycoffee.com
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Response time</p>
            <p className="text-sm text-brew-warm-gray">Within 24 hours, usually sooner.</p>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {status === "success" ? (
            <div className="border border-zinc-800/80 rounded-2xl p-10 text-center space-y-4">
              <p className="text-2xl">✓</p>
              <h2 className="text-xl font-medium">Message sent.</h2>
              <p className="text-sm text-brew-warm-gray">We'll be in touch at {form.email || "your email"} within 24 hours.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-xs uppercase tracking-[0.2em] text-brew-warm-gray hover:text-brew-ivory transition-colors underline underline-offset-4">
                Send another
              </button>
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
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Subject</label>
                <select value={form.subject} onChange={set("subject")} required
                  className="w-full bg-brew-black border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 text-brew-ivory rounded-lg appearance-none">
                  <option value="" disabled>Select a topic</option>
                  <option value="My Blend">My Blend</option>
                  <option value="THE 100 Membership">THE 100 Membership</option>
                  <option value="Gift Store">Gift Store</option>
                  <option value="Investor Inquiry">Investor Inquiry</option>
                  <option value="Press & Media">Press & Media</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Message</label>
                <textarea required rows={6} value={form.message} onChange={set("message")} placeholder="Tell us what's on your mind..."
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg resize-none" />
              </div>

              {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}

              <button type="submit" disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50">
                {status === "loading" ? "Sending…" : "Send message"}
              </button>

              <p className="text-[10px] text-zinc-600 text-center">
                We'll reply to iam@brewifycoffee.com within 24 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
