"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<Status>("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  const [showInvite, setShowInvite] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteStatus, setInviteStatus] = useState<Status>("idle");
  const [inviteMessage, setInviteMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#invite") {
      setShowInvite(true);
    }
  }, []);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistStatus("loading");
    setWaitlistMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setWaitlistStatus("error");
        setWaitlistMessage(data.error ?? t.home.somethingWrong);
        return;
      }
      setWaitlistStatus("success");
      setWaitlistMessage(t.home.waitlistSuccess);
      setWaitlistEmail("");
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage(t.home.somethingWrong);
    }
  };

  const handleRedeemInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteStatus("loading");
    setInviteMessage("");
    try {
      const res = await fetch("/api/redeem-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inviteCode.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setInviteStatus("error");
        setInviteMessage(data.error ?? t.home.invalidCode);
        return;
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem("brewify_access", "true");
      }
      setInviteStatus("success");
      setInviteMessage(t.home.accessGranted);
      setTimeout(() => router.push("/build"), 700);
    } catch {
      setInviteStatus("error");
      setInviteMessage(t.home.somethingWrong);
    }
  };

  return (
    <main className="text-brew-ivory">
      {/* Hero — full viewport, radial gradient, centered */}
      <section
        className="min-h-[100svh] flex flex-col items-center justify-center px-6 pt-20 pb-20 relative"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(60,40,20,0.25) 0%, transparent 60%), #0a0a0a",
        }}
      >
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.3em] text-brew-warm-gray"
          >
            {t.home.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-serif text-[clamp(2.5rem,8vw,6rem)] font-normal leading-tight text-brew-ivory"
          >
            {t.home.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base italic text-brew-warm-gray"
          >
            {t.home.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <Link
              href="/build"
              className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-brew-ivory hover:bg-brew-ivory hover:text-brew-black transition-colors"
            >
              {t.home.cta}
            </Link>

            <p className="text-sm text-brew-warm-gray">
              {t.home.alreadyHaveInvite}{" "}
              <button
                type="button"
                onClick={() => setShowInvite(true)}
                className="underline underline-offset-2 hover:text-brew-ivory transition-colors"
              >
                {t.home.enterCode}
              </button>
            </p>
          </motion.div>

          {showInvite && (
            <motion.div
              id="invite"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-8 w-full max-w-sm text-left"
            >
              <div className="border border-zinc-700/80 rounded-xl p-5 bg-black/20">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray mb-3">
                  {t.home.inviteLabel}
                </p>
                <form onSubmit={handleRedeemInvite} className="space-y-3">
                  <input
                    type="text"
                    placeholder={t.home.invitePlaceholder}
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={inviteStatus === "loading"}
                      className="flex-1 rounded-full border border-brew-ivory px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50"
                    >
                      {inviteStatus === "loading"
                        ? t.home.redeeming
                        : t.home.redeemBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInvite(false)}
                      className="rounded-full border border-zinc-600 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-brew-warm-gray hover:text-brew-ivory transition-colors"
                    >
                      {t.home.cancelBtn}
                    </button>
                  </div>
                  {inviteMessage && (
                    <p
                      className={`text-sm ${
                        inviteStatus === "error"
                          ? "text-red-400"
                          : "text-brew-warm-gray"
                      }`}
                    >
                      {inviteMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Feature bar — dark charcoal strip */}
      <section
        className="border-t border-zinc-800/80 min-h-[200px] flex items-center"
        style={{ background: "#111111" }}
      >
        <div className="w-full max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-brew-ivory">
              {t.home.feature1Title}
            </p>
            <p className="text-sm text-brew-warm-gray max-w-xs mx-auto leading-relaxed">
              {t.home.feature1Desc}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-brew-ivory">
              {t.home.feature2Title}
            </p>
            <p className="text-sm text-brew-warm-gray max-w-xs mx-auto leading-relaxed">
              {t.home.feature2Desc}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-brew-ivory">
              {t.home.feature3Title}
            </p>
            <p className="text-sm text-brew-warm-gray max-w-xs mx-auto leading-relaxed">
              {t.home.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="px-6 py-16 md:px-12 lg:px-24 border-t border-zinc-800/80 bg-brew-black">
        <div className="max-w-2xl mx-auto grid gap-8 md:grid-cols-[1fr_1fr] items-start">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-brew-ivory">
              {t.home.waitlistTitle}
            </h2>
            <p className="text-sm text-brew-warm-gray">
              {t.home.waitlistSub}
            </p>
          </div>
          <form onSubmit={handleWaitlist} className="space-y-3">
            <input
              type="email"
              placeholder={t.home.waitlistPlaceholder}
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-500"
              required
            />
            <button
              type="submit"
              disabled={waitlistStatus === "loading"}
              className="w-full rounded-full border border-brew-ivory px-6 py-3 text-[11px] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50"
            >
              {waitlistStatus === "loading"
                ? t.home.waitlistJoining
                : t.home.waitlistBtn}
            </button>
            {waitlistMessage && (
              <p
                className={`text-sm ${
                  waitlistStatus === "error"
                    ? "text-red-400"
                    : "text-brew-warm-gray"
                }`}
              >
                {waitlistMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800/80 bg-brew-black">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brew-warm-gray">
            {t.footer.tagline}
          </p>
          <p className="text-xs text-brew-warm-gray/80">{t.footer.domain}</p>
        </div>
      </footer>
    </main>
  );
}
