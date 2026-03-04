"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

type StepId = 1 | 2 | 3 | 4 | 5 | 6;

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

export default function BuildPage() {
  const { t } = useLanguage();
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
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(BREWIFY_ACCESS_KEY)) {
      window.location.href = "/";
      return;
    }
    setAccessChecked(true);
    try {
      const stored = window.localStorage.getItem("brewify-returning");
      if (!stored) return;
      const parsed = JSON.parse(stored) as { name?: string | null };
      setIsReturning(true);
      setReturningName(parsed.name ?? null);
    } catch {
      // ignore
    }
  }, []);

  const goNext = () => {
    if (step < 6) setStep((prev) => (prev + 1) as StepId);
  };

  const goBack = () => {
    if (isLoading) return;
    if (step > 1) setStep((prev) => (prev - 1) as StepId);
  };

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
      if (!res.ok) throw new Error("Failed to generate blend");
      const data = (await res.json()) as BlendProfile;
      setProfile(data);
      setStep(6);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem("brewify-returning", JSON.stringify({ name: inputs.name ?? null }));
        } catch { /* ignore */ }
      }
    } catch (err) {
      console.error(err);
      setError(t.build.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!accessChecked) {
    return <main className="min-h-screen bg-brew-black" />;
  }

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
                  <motion.div key="step-1" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step1Q}
                    </h1>
                    <div className="space-y-2">
                      {MOOD_VALUES.map((value, i) => {
                        const label = t.build.step1Options[i];
                        const isSelected = inputs.feeling === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setInputs((prev) => ({ ...prev, feeling: value }))}
                            className={`${optionBaseClasses} ${isSelected ? optionSelectedClasses : optionUnselectedClasses}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step2Q}
                    </h2>
                    <textarea
                      className="w-full min-h-[130px] bg-transparent border border-zinc-800/80 px-4 py-3 text-sm md:text-base outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                      placeholder={t.build.step2Placeholder}
                      value={inputs.building}
                      onChange={(e) => setInputs((prev) => ({ ...prev, building: e.target.value }))}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-3" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step3Q}
                    </h2>
                    <div className="space-y-2">
                      {SEASON_VALUES.map((value, i) => {
                        const label = t.build.step3Options[i];
                        const isSelected = inputs.season === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setInputs((prev) => ({ ...prev, season: value }))}
                            className={`${optionBaseClasses} ${isSelected ? optionSelectedClasses : optionUnselectedClasses}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step-4" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step4Q}
                    </h2>
                    <div className="space-y-2">
                      {MOMENT_VALUES.map((value, i) => {
                        const label = t.build.step4Options[i];
                        const isSelected = inputs.moment === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setInputs((prev) => ({ ...prev, moment: value }))}
                            className={`${optionBaseClasses} ${isSelected ? optionSelectedClasses : optionUnselectedClasses}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step-5" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step5Q}
                    </h2>
                    <div className="space-y-2">
                      {PRIORITY_VALUES.map((value, i) => {
                        const label = t.build.step5Options[i];
                        const isSelected = inputs.priority === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setInputs((prev) => ({ ...prev, priority: value }))}
                            className={`${optionBaseClasses} ${isSelected ? optionSelectedClasses : optionUnselectedClasses}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="space-y-3 pt-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-brew-warm-gray">
                        {t.build.optionalLabel}
                      </p>
                      <input
                        type="text"
                        className="w-full bg-transparent border border-zinc-800/80 px-4 py-2.5 text-sm md:text-base outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                        placeholder={t.build.labelPlaceholder}
                        value={inputs.name ?? ""}
                        onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 6 && profile && (
                  <motion.div key="step-6" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.step6Title}
                    </h2>
                    <p className="text-sm md:text-base text-brew-warm-gray">{t.build.step6Sub}</p>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div key="loading" variants={containerVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: "easeOut" }} className="space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug">
                      {t.build.loadingTitle}
                    </h2>
                    <p className="text-sm md:text-base text-brew-warm-gray">{t.build.loadingSub}</p>
                    <div className="mt-4 h-px w-32 overflow-hidden bg-zinc-900">
                      <motion.div
                        className="h-full w-16 bg-brew-ivory"
                        animate={{ x: ["-50%", "150%"] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

            <div className="flex items-center justify-between pt-6 text-xs md:text-sm">
              <button
                type="button"
                onClick={goBack}
                className="uppercase tracking-[0.18em] text-brew-warm-gray disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={step === 1 || isLoading}
              >
                {t.build.backBtn}
              </button>
              {step < 5 && (
                <button
                  type="button"
                  onClick={goNext}
                  className="uppercase tracking-[0.18em] text-brew-ivory/90"
                >
                  {t.build.nextBtn}
                </button>
              )}
              {step === 5 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-2.5 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {t.build.designBtn}
                </button>
              )}
              {step === 6 && (
                <button
                  type="button"
                  onClick={() => { setInputs(initialInputs); setProfile(null); setStep(1); setError(null); }}
                  className="uppercase tracking-[0.18em] text-brew-ivory/80"
                >
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
                <CoffeeBagMockup
                  blendName={profile.blendName}
                  roastLevel={profile.roastLevel}
                  flavorNotes={profile.flavorNotes}
                  emotionalDescription={profile.emotionalDescription}
                  batchId={profile.batchId}
                  createdAt={profile.createdAt}
                  instagram={feedInstagram.trim() || undefined}
                  name={inputs.name}
                  size="lg"
                />
                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-medium">{profile.blendName}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {profile.flavorNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 text-[11px] uppercase tracking-[0.16em] border border-brew-ivory/50 rounded-full text-brew-ivory/90"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {!feedSubmitted && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-sm text-brew-warm-gray cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addToFeed}
                        onChange={(e) => setAddToFeed(e.target.checked)}
                        className="rounded border-zinc-600 bg-transparent"
                      />
                      {t.build.addToFeedLabel}
                    </label>
                    {addToFeed && (
                      <input
                        type="text"
                        placeholder={t.build.instagramPlaceholder}
                        value={feedInstagram}
                        onChange={(e) => setFeedInstagram(e.target.value)}
                        className="w-full bg-transparent border border-zinc-800/80 px-4 py-2 text-sm outline-none focus:border-brew-ivory/80 placeholder:text-zinc-600"
                      />
                    )}
                    {addToFeed && (
                      <button
                        type="button"
                        disabled={feedSubmitting}
                        onClick={async () => {
                          setFeedSubmitting(true);
                          try {
                            const res = await fetch("/api/feed", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                blendName: profile.blendName,
                                roastLevel: profile.roastLevel,
                                flavorNotes: profile.flavorNotes,
                                emotionalDescription: profile.emotionalDescription,
                                instagram: feedInstagram.trim() || undefined,
                                date: profile.createdAt.slice(0, 10),
                                batchId: profile.batchId,
                              }),
                            });
                            if (res.ok) setFeedSubmitted(true);
                          } finally {
                            setFeedSubmitting(false);
                          }
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors disabled:opacity-50"
                      >
                        {feedSubmitting ? t.build.addingFeed : t.build.addToFeedBtn}
                      </button>
                    )}
                  </div>
                )}
                {feedSubmitted && (
                  <p className="text-xs text-brew-warm-gray">{t.build.addedFeed}</p>
                )}

                <ShareableBlendCard
                  inputs={inputs}
                  profile={profile}
                  instagram={feedInstagram.trim() || undefined}
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-brew-ivory px-6 py-2.5 text-xs md:text-sm uppercase tracking-[0.18em] hover:bg-brew-ivory hover:text-brew-black transition-colors"
                >
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
