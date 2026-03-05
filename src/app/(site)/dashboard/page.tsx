"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BREWIFY_ACCESS_KEY } from "@/components/Nav";
import { useLanguage } from "@/context/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  joinedAt: string;
}

interface Order {
  id: string;
  date: string;
  blendName: string;
  bags: number;
  total: number;
  status: "delivered" | "roasting" | "shipped";
}

interface MemberBlend {
  name: string;
  roast: string;
  notes: string[];
  description: string;
  batchId: string;
  bagsSold: number;
  earned: number;
  memberNumber: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_BLEND: MemberBlend = {
  name: "Still Water No. 7",
  roast: "Medium",
  notes: ["Brown sugar", "Cedar", "Quiet mornings"],
  description:
    "A steady, unhurried cup that sits just to the side of your thoughts. It doesn't ask for attention; it makes space for it.",
  batchId: "BW-14-07",
  bagsSold: 23,
  earned: 23,
  memberNumber: "001",
};

const MOCK_ORDERS: Order[] = [
  { id: "ORD-0031", date: "Mar 4, 2026",  blendName: "Still Water No. 7", bags: 2, total: 56, status: "delivered" },
  { id: "ORD-0019", date: "Feb 18, 2026", blendName: "Still Water No. 7", bags: 1, total: 28, status: "delivered" },
  { id: "ORD-0008", date: "Feb 2, 2026",  blendName: "Still Water No. 7", bags: 2, total: 56, status: "delivered" },
];

const STATUS_LABELS: Record<Order["status"], string> = {
  delivered: "Delivered",
  roasting:  "Roasting",
  shipped:   "Shipped",
};

const STATUS_COLORS: Record<Order["status"], string> = {
  delivered: "text-[#a09a94]",
  roasting:  "text-[#c8a45a]",
  shipped:   "text-[#f5f2ee]",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InitialsAvatar({ name, size = "lg" }: { name: string; size?: "sm" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className={`rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-medium text-brew-ivory shrink-0 ${size === "lg" ? "w-14 h-14 text-base" : "w-8 h-8 text-xs"}`}>
      {initials}
    </div>
  );
}

function EarningsWidget({ blend, onRedeem }: { blend: MemberBlend; onRedeem: (type: "cash" | "credit") => void }) {
  const progress = Math.min((blend.earned / 100) * 100, 100);
  const canCashOut = blend.earned >= 100;

  return (
    <div className="border border-zinc-800/80 rounded-2xl p-6 space-y-6 bg-zinc-950/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray mb-1">Your earnings</p>
          <p className="text-4xl font-medium text-brew-ivory">${blend.earned}<span className="text-xl text-brew-warm-gray">.00</span></p>
          <p className="text-xs text-brew-warm-gray mt-1">{blend.bagsSold} bags sold of your blend</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray mb-1">Per bag</p>
          <p className="text-xl font-medium text-[#c8a45a]">$1.00</p>
        </div>
      </div>

      {/* Progress to $100 */}
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray">
          <span>Progress to cashout</span>
          <span>${blend.earned} / $100</span>
        </div>
        <div className="h-px bg-zinc-800 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-y-0 left-0 bg-[#c8a45a]"
          />
        </div>
        {!canCashOut && (
          <p className="text-[10px] text-zinc-600">${100 - blend.earned} more to unlock cash payout</p>
        )}
      </div>

      {/* Redemption options */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onRedeem("credit")}
          className="rounded-xl border border-zinc-800 px-4 py-3 text-left space-y-1 hover:border-brew-ivory/30 transition-colors group"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray group-hover:text-brew-ivory transition-colors">Store credit</p>
          <p className="text-sm font-medium text-brew-ivory">Use now</p>
          <p className="text-[10px] text-zinc-600">Any amount · gift store</p>
        </button>
        <button
          onClick={() => onRedeem("cash")}
          disabled={!canCashOut}
          className="rounded-xl border border-zinc-800 px-4 py-3 text-left space-y-1 hover:border-brew-ivory/30 transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] text-brew-warm-gray group-hover:text-brew-ivory transition-colors">Cash out</p>
          <p className="text-sm font-medium text-brew-ivory">$100 min</p>
          <p className="text-[10px] text-zinc-600">Via PayPal / Venmo</p>
        </button>
      </div>
    </div>
  );
}

function BlendCard({ blend }: { blend: MemberBlend }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `https://brewifycoffee.com/blend/${blend.batchId}`;
    if (navigator.share) {
      await navigator.share({ title: blend.name, text: blend.description, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border border-zinc-800/80 rounded-2xl p-6 space-y-5 bg-zinc-950/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray mb-1">Your permanent blend</p>
          <h2 className="text-2xl font-medium text-brew-ivory">{blend.name}</h2>
          <p className="text-xs text-brew-warm-gray mt-0.5">{blend.roast} Roast · {blend.batchId}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray mb-1">Member</p>
          <p className="text-lg font-medium text-[#c8a45a]">#{blend.memberNumber}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {blend.notes.map((n) => (
          <span key={n} className="text-[10px] uppercase tracking-[0.2em] border border-zinc-800 px-3 py-1 rounded-full text-brew-warm-gray">
            {n}
          </span>
        ))}
      </div>

      <p className="text-sm text-brew-warm-gray/90 leading-relaxed italic">&ldquo;{blend.description}&rdquo;</p>

      <div className="flex gap-3 pt-1">
        <button
          onClick={handleShare}
          className="flex-1 inline-flex items-center justify-center rounded-full border border-zinc-700 px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-brew-warm-gray hover:text-brew-ivory hover:border-brew-ivory/40 transition-colors"
        >
          {copied ? "Link copied!" : "Share blend"}
        </button>
        <Link
          href="/store"
          className="flex-1 inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity"
        >
          Reorder
        </Link>
      </div>
    </div>
  );
}

// ─── Profile Setup Modal ───────────────────────────────────────────────────────
function ProfileSetupModal({ onComplete }: { onComplete: (p: UserProfile) => void }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "" });
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = { ...form, joinedAt: new Date().toISOString() };
    localStorage.setItem("brewify_profile", JSON.stringify(profile));
    onComplete(profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brew-black/90 backdrop-blur-sm px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="space-y-2">
          <p className="text-[9px] uppercase tracking-[0.5em] text-brew-warm-gray">Welcome to Brewify</p>
          <h2 className="text-2xl font-medium">Complete your profile.</h2>
          <p className="text-sm text-brew-warm-gray">We need a few details to personalize your experience and keep your orders on track.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <p className="text-[10px] text-zinc-600 leading-relaxed">
            Your information is used to fulfill orders and send you relevant updates. We don't share or sell your data. See our <Link href="/privacy" className="underline underline-offset-2 hover:text-brew-warm-gray">Privacy Policy</Link>.
          </p>
          <button type="submit"
            className="w-full rounded-full bg-brew-ivory text-brew-black py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity">
            Save and continue
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Redemption toast ─────────────────────────────────────────────────────────
function RedeemModal({ type, onClose }: { type: "cash" | "credit"; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brew-black/80 backdrop-blur-sm px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm border border-zinc-800 rounded-2xl bg-zinc-950 p-8 text-center space-y-4"
      >
        <p className="text-2xl">{type === "cash" ? "💸" : "🛍️"}</p>
        <h3 className="text-lg font-medium">
          {type === "cash" ? "Cash out request" : "Store credit applied"}
        </h3>
        <p className="text-sm text-brew-warm-gray leading-relaxed">
          {type === "cash"
            ? "This feature is coming soon. We'll reach out at your email once payouts are live."
            : "Your earnings have been applied as store credit. Use them on your next gift store order."}
        </p>
        <button onClick={onClose}
          className="w-full rounded-full border border-zinc-700 py-3 text-[11px] uppercase tracking-[0.2em] text-brew-warm-gray hover:text-brew-ivory hover:border-brew-ivory/40 transition-colors">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [redeemType, setRedeemType] = useState<"cash" | "credit" | null>(null);
  const isMember = true; // In production: check membership status from API

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(BREWIFY_ACCESS_KEY)) {
      window.location.href = "/";
      return;
    }
    const saved = window.localStorage.getItem("brewify_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setShowSetup(true);
    }
    setReady(true);
  }, []);

  const handleProfileComplete = (p: UserProfile) => {
    setProfile(p);
    setShowSetup(false);
  };

  if (!ready) return <main className="min-h-screen bg-brew-black" />;

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Member";
  const joinDate = profile
    ? new Date(profile.joinedAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : "";

  return (
    <>
      {/* Profile setup modal */}
      {showSetup && <ProfileSetupModal onComplete={handleProfileComplete} />}

      {/* Redemption modal */}
      <AnimatePresence>
        {redeemType && <RedeemModal type={redeemType} onClose={() => setRedeemType(null)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-10 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* ── Profile header ────────────────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <InitialsAvatar name={fullName} />
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-lg font-medium">{fullName}</h1>
                  {isMember && (
                    <span className="text-[8px] uppercase tracking-[0.35em] border border-[#c8a45a]/50 text-[#c8a45a] px-2 py-0.5 rounded-full">
                      THE 100
                    </span>
                  )}
                </div>
                <p className="text-xs text-brew-warm-gray mt-0.5">
                  {profile?.email} {joinDate && `· Member since ${joinDate}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSetup(true)}
              className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-brew-warm-gray transition-colors hidden md:block"
            >
              Edit profile
            </button>
          </motion.header>

          {/* ── THE 100 section ───────────────────────────────────────── */}
          {isMember && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray">THE 100 · Founding Member</p>
              <div className="grid gap-4 md:grid-cols-2">
                <BlendCard blend={MOCK_BLEND} />
                <EarningsWidget blend={MOCK_BLEND} onRedeem={(type) => setRedeemType(type)} />
              </div>
            </motion.section>
          )}

          {/* ── Build a blend CTA (non-members or members who want another) ── */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-zinc-900 rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium">Build a new blend</p>
              <p className="text-xs text-brew-warm-gray mt-0.5">Answer 5 questions. Get something made just for you.</p>
            </div>
            <Link
              href="/build"
              className="shrink-0 inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
            >
              Build →
            </Link>
          </motion.section>

          {/* ── Order history ─────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray">Order history</p>
              <Link href="/store" className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-brew-warm-gray transition-colors">
                Reorder →
              </Link>
            </div>
            <div className="border border-zinc-900 rounded-2xl overflow-hidden">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-6 py-3 border-b border-zinc-900 text-[8px] uppercase tracking-[0.35em] text-zinc-600">
                <span>Order</span><span>Blend</span><span>Bags</span><span>Total</span><span>Status</span>
              </div>
              {MOCK_ORDERS.map((order, i) => (
                <div
                  key={order.id}
                  className={`px-6 py-4 flex flex-col md:grid md:grid-cols-[1fr_1fr_auto_auto_auto] gap-1 md:gap-4 md:items-center text-sm ${i < MOCK_ORDERS.length - 1 ? "border-b border-zinc-900" : ""}`}
                >
                  <div>
                    <span className="text-[10px] text-zinc-600 md:hidden">Order · </span>
                    <span className="text-xs font-mono text-brew-warm-gray">{order.id}</span>
                    <span className="text-xs text-zinc-600 ml-2">{order.date}</span>
                  </div>
                  <span className="text-sm text-brew-ivory">{order.blendName}</span>
                  <span className="text-sm text-brew-warm-gray">{order.bags} bag{order.bags > 1 ? "s" : ""}</span>
                  <span className="text-sm text-brew-ivory font-medium">${order.total}</span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Profile details ───────────────────────────────────────── */}
          {profile && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 pb-10"
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.4em] text-brew-warm-gray">Account</p>
                <button
                  onClick={() => setShowSetup(true)}
                  className="text-[9px] uppercase tracking-[0.3em] text-zinc-600 hover:text-brew-warm-gray transition-colors"
                >
                  Edit
                </button>
              </div>
              <div className="border border-zinc-900 rounded-2xl overflow-hidden">
                {[
                  { label: "Name",  value: fullName },
                  { label: "Email", value: profile.email },
                  { label: "Phone", value: profile.phone || "—" },
                  { label: "City",  value: profile.city },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    className={`px-6 py-4 flex items-center justify-between ${i < arr.length - 1 ? "border-b border-zinc-900" : ""}`}
                  >
                    <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-600">{row.label}</span>
                    <span className="text-sm text-brew-warm-gray">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-600 text-center">
                To delete your account or request data removal, email{" "}
                <a href="mailto:iam@brewifycoffee.com" className="underline underline-offset-2 hover:text-brew-warm-gray transition-colors">
                  iam@brewifycoffee.com
                </a>
              </p>
            </motion.section>
          )}
        </div>
      </main>
    </>
  );
}
