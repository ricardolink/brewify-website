"use client";
import { useExt } from "@/context/LanguageContext";
export default function PrivacyPage() {
  const { privacy: p } = useExt();
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{p.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-medium">{p.headline}</h1>
          <p className="text-xs text-brew-warm-gray">{p.updated}</p>
        </header>
        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          {p.sections.map((s) => (
            <section key={s.title} className="space-y-2">
              <h2 className="text-base font-medium text-brew-ivory">{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
