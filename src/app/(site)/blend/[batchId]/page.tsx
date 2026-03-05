"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function BlendPage() {
  const { t } = useLanguage();
  const params = useParams();
  const batchId = typeof params?.batchId === "string" ? params.batchId : "";

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
          {t.blend.eyebrow(batchId)}
        </p>
        <h1 className="text-2xl md:text-3xl font-medium">{t.blend.title}</h1>
        <p className="text-sm text-brew-warm-gray">{t.blend.sub}</p>
        <Link
          href="/feed"
          className="inline-block text-xs uppercase tracking-[0.18em] text-brew-warm-gray hover:text-brew-ivory transition-colors"
        >
          {t.blend.back}
        </Link>
      </div>
    </main>
  );
}
