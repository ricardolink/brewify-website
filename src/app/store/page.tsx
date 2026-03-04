"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

const products = [
  {
    key: "mug",
    name: "Brewify Mug",
    tagline: "Matte ceramic. Heavy base. Holds heat.",
    brand: "BREWIFY COFFEE",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=85",
  },
  {
    key: "tote",
    name: "Blend Archive Tote",
    tagline: "Heavy canvas. Stamped with your batch ID.",
    brand: "BREWIFY COFFEE",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&q=85",
  },
  {
    key: "journal",
    name: "Roast Journal",
    tagline: "Unlined pages. Minimal cover. For the ritual.",
    brand: "BREWIFY COFFEE",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=85",
  },
  {
    key: "candle",
    name: "Signature Candle",
    tagline: "Notes of dark roast, cedar, and smoke.",
    brand: "BREWIFY COFFEE",
    image: "https://images.unsplash.com/photo-1760804876173-465de41e81de?w=800&q=85",
  },
  {
    key: "pour-over",
    name: "Ceramic Pour-Over Set",
    tagline: "Handmade. Clean form. Slower mornings.",
    brand: "BREWIFY COFFEE",
    image: "https://images.unsplash.com/photo-1768674150871-57cb7c9d8d7a?w=800&q=85",
  },
  {
    key: "hoodie",
    name: "The 100 Hoodie",
    tagline: "Heavyweight. Founding edition. Limited to 100.",
    brand: "THE 100 — BREWIFY",
    image: "https://images.unsplash.com/photo-1590759483822-b2fee5aa6bd3?w=800&q=85",
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
              {/* Image + brand overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />

                {/* Bottom gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Brand name — bottom left, always visible */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-brew-ivory/60 font-normal">
                    {product.brand}
                  </p>
                </div>

                {/* Coming soon badge — top right */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-brew-warm-gray/70 border border-zinc-600/50 px-2 py-1 bg-black/50 backdrop-blur-sm">
                    {t.store.comingSoon}
                  </span>
                </div>
              </div>

              {/* Product info */}
              <div className="px-5 py-5 space-y-1 border-t border-zinc-900 bg-brew-black">
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
