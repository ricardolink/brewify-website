"use client";

import { useState } from "react";

export default function DoNotSellPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Opt-Out Request",
        email,
        subject: "Do Not Sell My Personal Information",
        message: `User ${email} has requested to opt out of the sale or sharing of their personal information.`,
      }),
    });
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">Legal</p>
          <h1 className="text-2xl md:text-3xl font-medium">Do Not Sell or Share My Personal Information</h1>
          <p className="text-xs text-brew-warm-gray">In accordance with the California Consumer Privacy Act (CCPA) and similar regulations.</p>
        </header>

        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Our Commitment</h2>
            <p>
              Brewify Coffee does not sell your personal information to third parties and does not share it with third parties for cross-context behavioral advertising.
            </p>
            <p>
              We collect only what is necessary to operate the platform — your email, blend preferences, and account activity. This information is used solely to provide our service to you.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Your Rights (CCPA & Similar Laws)</h2>
            <ul className="space-y-2">
              {[
                "Know what personal information we collect and how it's used",
                "Request deletion of your personal information",
                "Opt out of the sale or sharing of your personal information",
                "Non-discrimination for exercising your privacy rights",
              ].map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="text-brew-warm-gray mt-0.5">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 border border-zinc-800/80 rounded-xl p-6">
            <h2 className="text-base font-medium text-brew-ivory">Submit an Opt-Out Request</h2>
            <p className="text-brew-warm-gray">
              Enter your email address below to formally request that we do not sell or share your personal information.
            </p>
            {submitted ? (
              <div className="py-4 text-center space-y-2">
                <p className="text-brew-ivory">✓ Request received.</p>
                <p className="text-sm text-brew-warm-gray">We will process your request within 15 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                <button type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors">
                  Submit opt-out request
                </button>
              </form>
            )}
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">Contact</h2>
            <p>For privacy-related requests, you may also email us directly at{" "}
              <a href="mailto:iam@brewifycoffee.com" className="text-brew-ivory underline underline-offset-2 hover:text-brew-warm-gray transition-colors">
                iam@brewifycoffee.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
