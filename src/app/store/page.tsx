"use client";

import { useState } from "react";

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
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage("We’ll let you know when the store opens.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-14">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
            GIFT STORE
          </h1>
          <p className="text-sm md:text-base text-brew-warm-gray">
            Objects for the ritual.
          </p>
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
                  Coming soon
                </p>
              </div>
              <div className="mt-4 text-sm text-brew-warm-gray/80">—</div>
            </div>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-medium">
              Get the opening invite.
            </h2>
            <p className="text-sm text-brew-warm-gray">
              Launching the store with The 100. A small first run of objects for
              the people building this with us.
            </p>
          </div>
          <form onSubmit={handleNotify} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
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
              {status === "loading"
                ? "Joining…"
                : "Notify me when the store opens"}
            </button>
            {message && (
              <p
                className={`text-sm ${
                  status === "error" ? "text-red-400" : "text-brew-warm-gray"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </section>

        <p className="text-xs text-brew-warm-gray">
          Designed for the ritual. Launching with The 100.
        </p>
      </div>
    </main>
  );
}

