"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const params = useParams();
  const tier = typeof params?.tier === "string" ? params.tier.toLowerCase() : "";
  const tierLabel = tier === "reserve" ? "Reserve Access" : "Curator Member";

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.22em] text-brew-warm-gray">
          {t.checkout.eyebrow}
        </p>
        <h1 className="text-2xl md:text-3xl font-medium">{t.checkout.title}</h1>
        <p className="text-sm text-brew-warm-gray">{t.checkout.sub(tierLabel)}</p>
        <Link
          href="/membership"
          className="inline-block text-xs uppercase tracking-[0.18em] text-brew-warm-gray hover:text-brew-ivory transition-colors underline underline-offset-2"
        >
          {t.checkout.back}
        </Link>
      </div>
    </main>
  );
}
