"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const products = [
  {
    key: "mug",
    name: "Brewify Mug",
    tagline: "Matte ceramic. Heavy base. Holds heat.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
  {
    key: "tote",
    name: "Blend Archive Tote",
    tagline: "Heavy canvas. Stamped with your batch ID.",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80",
  },
  {
    key: "journal",
    name: "Roast Journal",
    tagline: "Unlined pages. Minimal cover. For the ritual.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
  },
  {
    key: "candle",
    name: "Signature Candle",
    tagline: "Notes of dark roast, cedar, and smoke.",
    image: "https://images.unsplash.com/photo-1603905527374-c8929a8cd2b9?w=600&q=80",
  },
  {
    key: "pour-over",
    name: "Ceramic Pour-Over Set",
    tagline: "Handmade. Clean form. Slower mornings.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    key: "tee",
    name: "The 100 Tee",
    tagline: "Off-white. Heavyweight. Founding edition.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
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
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">

        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            {t.store.title}
          </h1>
          <p className="text-sm md:text-base text-brew-warm-gray">{t.store.sub}</p>
        </header>

        {/* Product Grid */}
        <section className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.key}
              className="group relative border border-zinc-900 flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />
                {/* Subtle dark overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Coming soon badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-brew-warm-gray/70 border border-zinc-700/60 px-2 py-1 bg-black/40 backdrop-blur-sm">
                    {t.store.comingSoon}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="px-5 py-5 space-y-1 border-t border-zinc-900">
                <p className="text-sm font-medium text-brew-ivory">{product.name}</p>
                <p className="text-xs text-brew-warm-gray leading-relaxed">{product.tagline}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Notify section */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start border-t border-zinc-800/60 pt-12">
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
