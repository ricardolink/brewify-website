"use client";
import { useExt } from "@/context/LanguageContext";
export default function AccessibilityPage() {
  const { accessibility: a } = useExt();
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{a.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-medium">{a.headline}</h1>
          <p className="text-xs text-brew-warm-gray">{a.updated}</p>
        </header>
        <div className="space-y-8 text-sm text-brew-ivory/85 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{a.commitmentTitle}</h2>
            <p>{a.commitmentBody}</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{a.measuresTitle}</h2>
            <ul className="space-y-2">
              {a.measures.map((m) => (
                <li key={m} className="flex items-start gap-3"><span className="text-brew-warm-gray mt-0.5">—</span><span>{m}</span></li>
              ))}
            </ul>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{a.limitationsTitle}</h2>
            <p>{a.limitationsBody}</p>
          </section>
          <section className="space-y-2">
            <h2 className="text-base font-medium text-brew-ivory">{a.feedbackTitle}</h2>
            <p>{a.feedbackBody}</p>
            <p><a href="mailto:iam@brewifycoffee.com" className="text-brew-ivory underline underline-offset-2 hover:text-brew-warm-gray transition-colors">iam@brewifycoffee.com</a></p>
            <p>{a.responseNote}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
