"use client";
import { useState } from "react";
import { useExt } from "@/context/LanguageContext";
export default function DoNotSellPage() {
  const { doNotSell: d } = useExt();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Opt-Out Request", email, subject: "Do Not Sell My Personal Information", message: `User ${email} has requested to opt out.` }),
    });
    setSubmitted(true);
  };
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{d.eyebrow}</p>
          <h1 className="text-2xl md:text-3xl font-medium">{d.headline}</h1>
          <p className="text-xs text-brew-warm-gray">{d.subtitle}</p>
        </header>
        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{d.commitmentTitle}</h2>
            <p>{d.commitmentP1}</p>
            <p>{d.commitmentP2}</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{d.rightsTitle}</h2>
            <ul className="space-y-2">
              {d.rights.map((r) => (
                <li key={r} className="flex items-start gap-3"><span className="text-brew-warm-gray mt-0.5">—</span><span>{r}</span></li>
              ))}
            </ul>
          </section>
          <section className="space-y-4 border border-zinc-800/80 rounded-xl p-6">
            <h2 className="text-base font-medium text-brew-ivory">{d.optOutTitle}</h2>
            <p className="text-brew-warm-gray">{d.optOutSub}</p>
            {submitted ? (
              <div className="py-4 text-center space-y-2">
                <p className="text-brew-ivory">✓ {d.successTitle}</p>
                <p className="text-sm text-brew-warm-gray">{d.successSub}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="email" required placeholder={d.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg" />
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors">
                  {d.submitBtn}
                </button>
              </form>
            )}
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{d.contactTitle}</h2>
            <p>{d.contactBody}{" "}
              <a href="mailto:iam@brewifycoffee.com" className="text-brew-ivory underline underline-offset-2 hover:text-brew-warm-gray transition-colors">iam@brewifycoffee.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
