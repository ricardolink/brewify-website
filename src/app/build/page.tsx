"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  BlendInputs,
  BlendProfile,
  MoodOption,
  SeasonOption,
  CoffeeMomentOption,
  PriorityOption,
} from "@/types/blend";
import { ShareableBlendCard } from "@/components/ShareableBlendCard";
import { CoffeeBagMockup } from "@/components/CoffeeBagMockup";
import { BREWIFY_ACCESS_KEY } from "@/components/Nav";
import { useLanguage } from "@/context/LanguageContext";

// English values sent to the API — do NOT translate these
const MOOD_VALUES: MoodOption[] = ["Focused", "Calm", "Energized", "Reflective", "Exhausted"];
const SEASON_VALUES: SeasonOption[] = ["Starting over", "In the grind", "Finding balance", "Celebrating", "Figuring it out"];
const MOMENT_VALUES: CoffeeMomentOption[] = ["Early morning ritual", "Midday reset", "Late-night thinker", "Whenever I need to feel like myself"];
const PRIORITY_VALUES: PriorityOption[] = ["Clarity", "Creativity", "Connection", "Momentum", "Rest"];

const THE_100_TOTAL = 100;

type StepId = 1 | 2 | 3 | 4 | 5 | 6;
type GateStatus = "checking" | "locked" | "unlocked" | "open";

const containerVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const optionBaseClasses =
  "w-full text-left border px-4 py-3 text-sm md:text-base rounded-lg transition-colors duration-150";
const optionSelectedClasses =
  "bg-brew-ivory text-brew-black border-brew-ivory shadow-[0_0_0_1px_rgba(245,242,238,0.4)]";
const optionUnselectedClasses =
  "hover:bg-zinc-900/70 text-brew-ivory border-zinc-800/80";

const initialInputs: BlendInputs = {
  feeling: "",
  building: "",
  season: "",
  moment: "",
  priority: "",
  name: "",
};

// ─── Gate component ────────────────────────────────────────────────────────────
function BuildGate({ spotsRemaining }: { spotsRemaining: number }) {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/redeem-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inviteCode.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Invalid or already redeemed.");
        return;
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem(BREWIFY_ACCESS_KEY, "true");
      }
      setStatus("success");
      setTimeout(() => router.push("/build"), 600);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory flex flex-col items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full text-center space-y-10"
      >
        {/* Badge */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-brew-warm-gray">
            Brewify Coffee
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-brew-ivory leading-tight">
            Build Your Coffee
          </h1>
          <div className="inline-flex items-center gap-2 border border-zinc-700 rounded-full px-4 py-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-brew-warm-gray">
              Early access · {spotsRemaining} of {THE_100_TOTAL} spots remaining
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 text-brew-warm-gray text-sm leading-relaxed">
          <p>
            The Build experience is currently available exclusively to{" "}
            <span className="text-brew-ivory font-medium">THE 100 Founding Members</span>{" "}
            and their invited guests.
          </p>
          <p>
            Once all 100 founding spots are claimed, Build opens to everyone.
            Be part of what launches it.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">two ways in</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Path 1 — Become a founding member */}
        <div className="space-y-3 text-left border border-zinc-800/80 rounded-xl p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brew-warm-gray">
            Option 1 — Founding Member
          </p>
          <p className="text-sm text-brew-ivory/85 leading-relaxed">
            Claim a permanent number in THE 100. Your blend lives on the site forever and earns every time someone orders it.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center justify-center rounded-full bg-brew-ivory text-brew-black px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-opacity w-full mt-2"
          >
            Claim your spot — $49
          </Link>
          <p className="text-[10px] text-brew-warm-gray text-center">
            {spotsRemaining} spots left · never restocked
          </p>
        </div>

        {/* Path 2 — Invite code */}
        <div className="space-y-3 text-left border border-zinc-800/80 rounded-xl p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brew-warm-gray">
            Option 2 — Invited Guest
          </p>
          <p className="text-sm text-brew-ivory/85 leading-relaxed">
            Got an invite from a Founding Member? Enter your code and build your coffee now.
          </p>
          <form onSubmit={handleRedeem} className="space-y-3 mt-2">
            <input
              type="text"
              placeholder="Invite code  (e.g. BREW-001)"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="w-full bg-transparent border border-zinc-700 px-4 py-3 text-sm outline-none focus:border-brew-ivory/60 placeholder:text-zinc-600 rounded-lg"
            />
            <button
              type="submit"
              disabled={status === "loading" || !inviteCode.trim()}
              className="w-full inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-40"
            >
              {status === "loading" ? "Unlocking…" : status === "success" ? "Access granted ✓" : "Unlock access"}
            </button>
            {errorMsg && (
              <p className="text-xs text-red-400 text-center">{errorMsg}</p>
            )}
          </form>
        </div>

        <p className="text-xs text-zinc-600">
          Browsing the site is always free.{" "}
          <Link href="/the-100" className="underline underline-offset-2 hover:text-brew-warm-gray transition-colors">
            Explore THE 100 →
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

// ─── Main builder ──────────────────────────────────────────────────────────────
export default function BuildPage() {
  const { t } = useLanguage();
  const [gateStatus, setGateStatus] = useState<GateStatus>("checking");
  const [spotsRemaining, setSpotsRemaining] = useState(100);

  const [step, setStep] = useState<StepId>(1);
  const [inputs, setInputs] = useState<BlendInputs>(initialInputs);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<BlendProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReturning, setIsReturning] = useState(false);
  const [returningName, setReturningName] = useState<string | null>(null);
  const [addToFeed, setAddToFeed] = useState(false);
  const [feedInstagram, setFeedInstagram] = useState("");
  const [feedSubmitted, setFeedSubmitted] = useState(false);
  const [feedSubmitting, setFeedSubmitting] = useState(false);

  useEffect(() => {
    const hasAccess = typeof window !== "undefined" && !!window.localStorage.getItem(BREWIFY_ACCESS_KEY);

    // Fetch spots count to check if fully booked
    fetch("/api/founding-members")
      .then((r) => r.json())
      .then((data) => {
        const count = Array.isArray(data) ? data.length : 0;
        const remaining = Math.max(0, THE_100_TOTAL - count);
        setSpotsRemaining(remaining);

        if (hasAccess) {
          setGateStatus("unlocked");
        } else if (remaining === 0) {
          // All 100 filled — open to everyone
          setGateStatus("open");
        } else {
          setGateStatus("locked");
        }
      })
      .catch(() => {
        if (hasAccess) setGateStatus("unlocked");
        else setGateStatus("locked");
      });

    // Returning user check
    try {
      const stored = window.localStorage.getItem("brewify-returning");
      if (!stored) return;
      const parsed = JSON.parse(stored) as { name?: string | null };
      setIsReturning(true);
      setReturningName(parsed.name ?? null);
    } catch { /* ignore */ }
  }, []);

  const goNext = () => { if (step < 6) setStep((prev) => (prev + 1) as StepId); };
  const goBack = () => { if (!isLoading && step > 1) setStep((prev) => (prev - 1) as StepId); };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setProfile(null);
    try {
      const res = await fetch("/api/generate-blend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as BlendProfile;
      setProfile(data);
      setStep(6);
      if (typeof window !== "undefined") {
        try { window.localStorage.setItem("brewify-returning", JSON.stringify({ name: inputs.name ?? null })); } catch { /* ignore */ }
      }
    } catch {
      setError(t.build.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Still checking
  if (gateStatus === "checking") {
    return <main className="min-h-screen bg-brew-black" />;
  }

  // Locked — show gate
  if (gateStatus === "locked") {
    return <BuildGate spotsRemaining={spotsRemaining} />;
  }

  // ── Builder UI (unlocked or open) ──────────────────────────────────────────
  return (
    <main className="min-h-screen bg-brew-black text-brew-ivory px-6 py-10 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-16">
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
          <span>Brewify Coffee</span>
          <span className="hidden md:inline">{t.build.header}</span>
        </header>

        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)] items-start">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                {t.build.stepOf(step)}
              </p>
              {isReturning && (
                <p className="text-xs text-brew-warm-gray/90">
                  {returningName ? t.build.welcomeBackName(returningName) : t.build.welcomeBack}
                </p>
              )}
            </div>

            <div className="relative min-h-[220px] md:min-h-[260px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step-1" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step1Q}</h1>
                    <div className="space-y-2">
                      {MOOD_VALUES.map((value, i) => (
                        <button key={value} type="button" onClick={() => setInputs((p) => ({ ...p, feeling: value }))}
                          className={`${optionBaseClasses} ${inputs.feeling === value ? optionSelectedClasses : optionUnselectedClasses}`}>
                          {t.build.step1Options[i]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step2Q}</h2>
                    <textarea className="w-full min-h-[130px] bg-transparent border border-zinc-800/80 px-4 py-3 text-sm md:text-base outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                      placeholder={t.build.step2Placeholder} value={inputs.building}
                      onChange={(e) => setInputs((p) => ({ ...p, building: e.target.value }))} />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-3" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step3Q}</h2>
                    <div className="space-y-2">
                      {SEASON_VALUES.map((value, i) => (
                        <button key={value} type="button" onClick={() => setInputs((p) => ({ ...p, season: value }))}
                          className={`${optionBaseClasses} ${inputs.season === value ? optionSelectedClasses : optionUnselectedClasses}`}>
                          {t.build.step3Options[i]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step-4" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step4Q}</h2>
                    <div className="space-y-2">
                      {MOMENT_VALUES.map((value, i) => (
                        <button key={value} type="button" onClick={() => setInputs((p) => ({ ...p, moment: value }))}
                          className={`${optionBaseClasses} ${inputs.moment === value ? optionSelectedClasses : optionUnselectedClasses}`}>
                          {t.build.step4Options[i]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step-5" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step5Q}</h2>
                    <div className="space-y-2">
                      {PRIORITY_VALUES.map((value, i) => (
                        <button key={value} type="button" onClick={() => setInputs((p) => ({ ...p, priority: value }))}
                          className={`${optionBaseClasses} ${inputs.priority === value ? optionSelectedClasses : optionUnselectedClasses}`}>
                          {t.build.step5Options[i]}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-3 pt-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">{t.build.optionalLabel}</p>
                      <input type="text" className="w-full bg-transparent border border-zinc-800/80 px-4 py-2.5 text-sm md:text-base outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                        placeholder={t.build.labelPlaceholder} value={inputs.name ?? ""}
                        onChange={(e) => setInputs((p) => ({ ...p, name: e.target.value }))} />
                    </div>
                  </motion.div>
                )}

                {step === 6 && profile && (
                  <motion.div key="step-6" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.step6Title}</h2>
                    <p className="text-sm md:text-base text-brew-warm-gray">{t.build.step6Sub}</p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div key="loading" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">{t.build.loadingTitle}</h2>
                    <p className="text-sm md:text-base text-brew-warm-gray">{t.build.loadingSub}</p>
                    <div className="mt-4 h-px w-32 overflow-hidden bg-zinc-900">
                      <motion.div className="h-full w-16 bg-brew-ivory" animate={{ x: ["-50%", "150%"] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

            <div className="flex items-center justify-between pt-6 text-xs md:text-sm">
              <button type="button" onClick={goBack} disabled={step === 1 || isLoading}
                className="uppercase tracking-[0.18em] text-brew-warm-gray disabled:opacity-40 disabled:cursor-not-allowed">
                {t.build.backBtn}
              </button>
              {step < 5 && (
                <button type="button" onClick={goNext} className="uppercase tracking-[0.18em] text-brew-ivory/90">
                  {t.build.nextBtn}
                </button>
              )}
              {step === 5 && (
                <button type="button" onClick={handleSubmit} disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-2.5 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {t.build.designBtn}
                </button>
              )}
              {step === 6 && (
                <button type="button" onClick={() => { setInputs(initialInputs); setProfile(null); setStep(1); setError(null); }}
                  className="uppercase tracking-[0.18em] text-brew-ivory/80">
                  {t.build.startAnotherBtn}
                </button>
              )}
            </div>
          </div>

          <div className="border-l border-zinc-900/80 pl-0 md:pl-10 pt-4 md:pt-0">
            {step < 6 && !profile && !isLoading && (
              <div className="space-y-4 text-sm text-brew-warm-gray">
                <p className="uppercase text-[0.65rem] tracking-[0.25em]">{t.build.profileTitle}</p>
                <p className="leading-relaxed">{t.build.profileDesc1}</p>
                <p className="leading-relaxed">{t.build.profileDesc2}</p>
              </div>
            )}
            {isLoading && (
              <div className="mt-8 text-sm text-brew-warm-gray">
                <p className="uppercase text-[0.65rem] tracking-[0.25em] mb-3">{t.build.inProgressTitle}</p>
                <p className="leading-relaxed">{t.build.inProgressDesc}</p>
              </div>
            )}
            {profile && !isLoading && (
              <div className="mt-4 md:mt-0 flex flex-col gap-8 items-center">
                <CoffeeBagMockup blendName={profile.blendName} roastLevel={profile.roastLevel} flavorNotes={profile.flavorNotes}
                  emotionalDescription={profile.emotionalDescription} batchId={profile.batchId} createdAt={profile.createdAt}
                  instagram={feedInstagram.trim() || undefined} name={inputs.name} size="lg" />
                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-medium">{profile.blendName}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profile.flavorNotes.map((note) => (
                      <span key={note} className="px-3 py-1 text-[11px] uppercase tracking-[0.16em] border border-brew-ivory/50 rounded-full text-brew-ivory/90">{note}</span>
                    ))}
                  </div>
                </div>
                {!feedSubmitted && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-brew-warm-gray cursor-pointer">
                      <input type="checkbox" checked={addToFeed} onChange={(e) => setAddToFeed(e.target.checked)} className="rounded border-zinc-600 bg-transparent" />
                      {t.build.addToFeedLabel}
                    </label>
                    {addToFeed && (
                      <input type="text" placeholder={t.build.instagramPlaceholder} value={feedInstagram}
                        onChange={(e) => setFeedInstagram(e.target.value)}
                        className="w-full bg-transparent border border-zinc-800/80 px-4 py-2 text-sm outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600" />
                    )}
                    {addToFeed && (
                      <button type="button" disabled={feedSubmitting}
                        onClick={async () => {
                          setFeedSubmitting(true);
                          try {
                            const res = await fetch("/api/feed", { method: "POST", headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ blendName: profile.blendName, roastLevel: profile.roastLevel, flavorNotes: profile.flavorNotes,
                                emotionalDescription: profile.emotionalDescription, instagram: feedInstagram.trim() || undefined,
                                date: profile.createdAt.slice(0, 10), batchId: profile.batchId }) });
                            if (res.ok) setFeedSubmitted(true);
                          } finally { setFeedSubmitting(false); }
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50">
                        {feedSubmitting ? t.build.addingFeed : t.build.addToFeedBtn}
                      </button>
                    )}
                  </div>
                )}
                {feedSubmitted && <p className="text-xs text-brew-warm-gray">{t.build.addedFeed}</p>}
                <ShareableBlendCard inputs={inputs} profile={profile} instagram={feedInstagram.trim() || undefined} />
                <button type="button"
                  className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-2.5 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors">
                  {t.build.orderBlendBtn}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
