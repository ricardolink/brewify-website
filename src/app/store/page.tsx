"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const products = [
  "Brewify Mug",
  "Blend Archive Tote",
  "Roast Journal",
  "Signature Candle",
  "Ceramic Pour-Over Set",
  "The 100 Tee",
];

export default function StorePage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "store" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? t.store.somethingWrong);
        return;
      }
      setStatus("success");
      setMessage(t.store.notifySuccess);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(t.store.somethingWrong);
    }
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-14">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            {t.store.title}
          </h1>
          <p className="text-sm md:text-base text-brew-warm-gray">{t.store.sub}</p>
        </header>

        <section className="grid gap-4 md:gap-6 md:grid-cols-3">
          {products.map((name) => (
            <div
              key={name}
              className="border border-zinc-800/80 rounded-lg px-4 py-5 md:px-5 md:py-6 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <p className="text-sm md:text-base">{name}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
                  {t.store.comingSoon}
                </p>
              </div>
              <div className="mt-4 text-sm text-brew-warm-gray/80">—</div>
            </div>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">{t.store.inviteTitle}</h2>
            <p className="text-sm text-brew-warm-gray">{t.store.inviteDesc}</p>
          </div>
          <form onSubmit={handleNotify} className="space-y-3">
            <input
              type="email"
              placeholder={t.store.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-zinc-800/80 px-4 py-3 text-sm outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center rounded-full border border-brew-ivory px-7 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50"
            >
              {status === "loading" ? t.store.notifying : t.store.notifyBtn}
            </button>
            {message && (
              <p className={`text-sm ${status === "error" ? "text-red-400" : "text-brew-warm-gray"}`}>
                {message}
              </p>
            )}
          </form>
        </section>

        <p className="text-xs text-brew-warm-gray">{t.store.footer}</p>
      </div>
    </main>
  );
}
