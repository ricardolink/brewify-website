"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Smoke wisp component ────────────────────────────────────────────────────
function SmokeWisp({
  delay,
  x,
  width,
  duration,
  driftX,
}: {
  delay: number;
  x: number;    // horizontal offset from center (%)
  width: number;
  duration: number;
  driftX: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        bottom: "52%",
        left: `calc(50% + ${x}px)`,
        width,
        height: width * 2.5,
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse at bottom, rgba(245,242,238,0.12) 0%, rgba(245,242,238,0.04) 50%, transparent 80%)",
        filter: `blur(${width * 0.35}px)`,
        transformOrigin: "bottom center",
      }}
      animate={{
        y: [0, -260],
        opacity: [0, 0.55, 0.3, 0],
        scaleX: [0.6, 1, 1.5, 2],
        x: [0, driftX * 0.3, driftX * 0.7, driftX],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeOut",
        times: [0, 0.3, 0.7, 1],
      }}
    />
  );
}

const WISPS = [
  { delay: 0,    x: -30, width: 28, duration: 5.5, driftX: -18 },
  { delay: 1.1,  x:   0, width: 36, duration: 6.2, driftX:  12 },
  { delay: 2.3,  x:  28, width: 22, duration: 5.0, driftX:  20 },
  { delay: 0.6,  x: -14, width: 18, duration: 4.8, driftX: -24 },
  { delay: 1.8,  x:  14, width: 30, duration: 6.8, driftX:  -8 },
  { delay: 3.2,  x:  -4, width: 14, duration: 4.4, driftX:  16 },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [joinStatus, setJoinStatus] = useState<"idle" | "loading" | "success">("idle");
  const [logoClicks, setLogoClicks] = useState(0);
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockKey, setUnlockKey] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlockLoading, setUnlockLoading] = useState(false);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      setShowUnlock(true);
      setLogoClicks(0);
    }
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinStatus("loading");
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Waitlist",
        email,
        subject: "Waitlist Signup",
        message: `New waitlist signup: ${email}`,
      }),
    });
    setJoinStatus("success");
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockLoading(true);
    setUnlockError("");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: unlockKey }),
    });
    if (res.ok) {
      window.location.href = "/the-100";
    } else {
      setUnlockError("Wrong key. Try again.");
      setUnlockLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f2ee] flex flex-col items-center justify-center relative overflow-hidden px-6">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 60%, rgba(195,155,80,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Corner dots */}
      {(["top-8 left-8","top-8 right-8","bottom-8 left-8","bottom-8 right-8"] as const).map((pos) => (
        <span key={pos} className={`absolute ${pos} w-1 h-1 rounded-full bg-[#a09a94] opacity-20`} />
      ))}

      {/* Smoke wisps — rise from behind "brewing." */}
      {WISPS.map((w, i) => (
        <SmokeWisp key={i} {...w} />
      ))}

      {/* Wordmark — click 5× to reveal admin unlock */}
      <motion.button
        onClick={handleLogoClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.55em] text-[#a09a94] opacity-40 hover:opacity-60 transition-opacity select-none"
        style={{ paddingRight: "0.55em" }}
      >
        Brewify Coffee
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-xl space-y-10">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] uppercase tracking-[0.5em] text-[#a09a94]"
          style={{ paddingRight: "0.5em" }}
        >
          Opening soon
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: "easeOut" }}
          className="font-serif text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.95] tracking-tight"
        >
          Something is<br />
          <em className="not-italic" style={{ color: "#c8a45a" }}>brewing.</em>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="w-10 h-px bg-[#a09a94] opacity-25 mx-auto"
        />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm md:text-base text-[#a09a94] leading-relaxed max-w-xs mx-auto"
        >
          The world's first fully personalized coffee. Built from who you are — not selected for you.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {joinStatus === "success" ? (
            <div className="space-y-2 py-2">
              <p className="text-sm" style={{ color: "#c8a45a" }}>You're on the list.</p>
              <p className="text-[10px] text-[#a09a94] tracking-widest uppercase">We'll reach out when the doors open.</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-[#222] focus:border-[#a09a94]/50 outline-none px-4 py-3 text-sm text-[#f5f2ee] placeholder:text-[#333] rounded-full transition-colors"
              />
              <button
                type="submit"
                disabled={joinStatus === "loading"}
                className="whitespace-nowrap rounded-full bg-[#f5f2ee] text-[#0a0a0a] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {joinStatus === "loading" ? "…" : "Join waitlist"}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom social */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="https://instagram.com/brewifycoffee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#a09a94] opacity-50 hover:opacity-80 transition-opacity"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @brewifycoffee
        </a>
      </motion.div>

      {/* ── Admin unlock modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showUnlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xs space-y-6"
            >
              <div className="space-y-1 text-center">
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#a09a94]" style={{ paddingRight: "0.5em" }}>
                  Admin access
                </p>
                <p className="text-sm text-[#f5f2ee]">Enter your access key</p>
              </div>
              <form onSubmit={handleUnlock} className="space-y-3">
                <input
                  type="password"
                  autoFocus
                  value={unlockKey}
                  onChange={(e) => setUnlockKey(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent border border-[#2a2a2a] focus:border-[#a09a94]/50 outline-none px-4 py-3 text-sm text-[#f5f2ee] placeholder:text-[#3a3a3a] rounded-lg text-center tracking-widest transition-colors"
                />
                {unlockError && (
                  <p className="text-[10px] text-red-400 text-center">{unlockError}</p>
                )}
                <button
                  type="submit"
                  disabled={unlockLoading}
                  className="w-full rounded-full bg-[#f5f2ee] text-[#0a0a0a] py-3 text-[11px] font-medium uppercase tracking-[0.22em] hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {unlockLoading ? "…" : "Unlock"}
                </button>
              </form>
              <button
                onClick={() => { setShowUnlock(false); setUnlockKey(""); setUnlockError(""); }}
                className="w-full text-[10px] text-[#a09a94] hover:text-[#f5f2ee] transition-colors tracking-widest uppercase"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
