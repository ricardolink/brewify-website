"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

export default function CheckoutPage() {
  const { t } = useLanguage();
  const params = useParams();
  const tier = typeof params?.tier === "string" ? params.tier.toLowerCase() : "";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "" });
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brewify_profile");
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      setForm(p);
      setProfileComplete(true);
    }
  }, []);

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const p = { ...form, joinedAt: new Date().toISOString() };
    localStorage.setItem("brewify_profile", JSON.stringify(p));
    setProfile(p);
    setProfileComplete(true);
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-20 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-10">

        <div className="text-center space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">{t.checkout.eyebrow}</p>
          <h1 className="text-2xl md:text-3xl font-medium">{t.checkout.title}</h1>
          <p className="text-sm text-brew-warm-gray">${`189.90`} · One-time · Founding member</p>
        </div>

        {/* Profile section — required before payment */}
        {!profileComplete ? (
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray">Your details</p>
              <p className="text-xs text-zinc-600">Required to complete your order and activate your membership.</p>
            </div>
            <form onSubmit={handleProfileSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">First name</label>
                  <input required value={form.firstName} onChange={set("firstName")} placeholder="Rick"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/40 placeholder:text-zinc-600 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Last name</label>
                  <input required value={form.lastName} onChange={set("lastName")} placeholder="Martinez"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/40 placeholder:text-zinc-600 rounded-lg" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Email</label>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"
                  className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/40 placeholder:text-zinc-600 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">Phone <span className="text-zinc-600 normal-case tracking-normal">(optional)</span></label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 (213) 000-0000"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/40 placeholder:text-zinc-600 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">City</label>
                  <input required value={form.city} onChange={set("city")} placeholder="Los Angeles"
                    className="w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm outline-none focus:border-brew-ivory/40 placeholder:text-zinc-600 rounded-lg" />
                </div>
              </div>
              <button type="submit"
                className="w-full rounded-full bg-brew-ivory text-brew-black py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity mt-2">
                Continue to payment →
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile confirmed */}
            <div className="border border-zinc-900 rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray mb-0.5">Ordering as</p>
                <p className="text-sm text-brew-ivory">{profile?.firstName} {profile?.lastName}</p>
                <p className="text-xs text-zinc-600">{profile?.email}</p>
              </div>
              <button onClick={() => setProfileComplete(false)}
                className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 hover:text-brew-warm-gray transition-colors">
                Change
              </button>
            </div>

            {/* Order summary */}
            <div className="border border-zinc-900 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-zinc-900 flex justify-between text-sm">
                <span className="text-brew-warm-gray">THE 100 Founding Membership</span>
                <span className="font-medium">$299</span>
              </div>
              <div className="px-5 py-4 flex justify-between text-xs text-zinc-600">
                <span>One-time · No subscription · Permanent</span>
                <span className="text-[#c8a45a]">100 spots only</span>
              </div>
            </div>

            {/* What's included */}
            <div className="space-y-2">
              {[
                "A blend built from who you are",
                "Your name on it. Permanently.",
                "$1 earned every time someone orders it",
                "3 invite tokens for people you choose",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs text-brew-warm-gray">
                  <span className="text-[#c8a45a] mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              className="w-full rounded-full bg-brew-ivory text-brew-black py-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity"
              onClick={() => alert("Payment integration coming soon — connect Stripe to activate.")}
            >
              Complete purchase · $299
            </button>
            <p className="text-[10px] text-zinc-600 text-center">Secure checkout · No recurring charges</p>
          </div>
        )}

        <div className="text-center">
          <Link href="/membership" className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 hover:text-brew-warm-gray transition-colors">
            {t.checkout.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
