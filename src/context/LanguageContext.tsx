"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "pt" | "es";

export const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "es", flag: "🇪🇸", label: "ES" },
];

// ─── Translations ──────────────────────────────────────────────────────────────
export const translations = {
  en: {
    nav: {
      build: "Build",
      the100: "The 100",
      feed: "Feed",
      membership: "Membership",
      store: "Store",
      dashboard: "Dashboard",
      haveInvite: "Have an invite?",
    },
    home: {
      eyebrow: "Brewify Coffee",
      headline: "Coffee that knows you.",
      subheadline: "One person. One blend. Only yours.",
      cta: "Build your coffee",
      alreadyHaveInvite: "Already have an invite?",
      enterCode: "Enter your code",
      inviteLabel: "Invite code",
      invitePlaceholder: "e.g. BREW-001",
      redeemBtn: "Redeem",
      redeeming: "Redeeming…",
      cancelBtn: "Cancel",
      accessGranted: "Access granted. Taking you in.",
      invalidCode: "Invalid or already redeemed.",
      somethingWrong: "Something went wrong.",
      feature1Title: "Personalized",
      feature1Desc:
        "Each blend is designed from your mood, rhythm, and season of life.",
      feature2Title: "Sustainable",
      feature2Desc:
        "Sourced with intention, roasted clean, made to be kept.",
      feature3Title: "Yours",
      feature3Desc:
        "No stock recipes, no generic bags. A profile that exists only for you.",
      waitlistTitle: "Join the waitlist",
      waitlistSub: "We'll notify you when the next wave opens.",
      waitlistPlaceholder: "Your email",
      waitlistBtn: "Join the waitlist",
      waitlistJoining: "Joining…",
      waitlistSuccess:
        "You're in. We'll notify you when the next wave opens.",
    },
    footer: {
      tagline: "Brewify Coffee",
      domain: "brewifycoffee.com",
    },
  },
  pt: {
    nav: {
      build: "Criar",
      the100: "Os 100",
      feed: "Feed",
      membership: "Assinatura",
      store: "Loja",
      dashboard: "Painel",
      haveInvite: "Tem um convite?",
    },
    home: {
      eyebrow: "Brewify Coffee",
      headline: "Um café que te conhece.",
      subheadline: "Uma pessoa. Um blend. Só seu.",
      cta: "Crie seu café",
      alreadyHaveInvite: "Já tem um convite?",
      enterCode: "Digite seu código",
      inviteLabel: "Código de convite",
      invitePlaceholder: "ex: BREW-001",
      redeemBtn: "Resgatar",
      redeeming: "Resgatando…",
      cancelBtn: "Cancelar",
      accessGranted: "Acesso liberado. Te levando para dentro.",
      invalidCode: "Inválido ou já resgatado.",
      somethingWrong: "Algo deu errado.",
      feature1Title: "Personalizado",
      feature1Desc:
        "Cada blend é criado a partir do seu humor, ritmo e momento de vida.",
      feature2Title: "Sustentável",
      feature2Desc:
        "Colhido com intenção, torrado com cuidado, feito para durar.",
      feature3Title: "Seu",
      feature3Desc:
        "Sem receitas genéricas, sem embalagens padrão. Um perfil que existe só para você.",
      waitlistTitle: "Entre na lista de espera",
      waitlistSub: "Avisaremos quando a próxima leva abrir.",
      waitlistPlaceholder: "Seu e-mail",
      waitlistBtn: "Entrar na lista",
      waitlistJoining: "Entrando…",
      waitlistSuccess:
        "Você está dentro. Avisaremos quando a próxima leva abrir.",
    },
    footer: {
      tagline: "Brewify Coffee",
      domain: "brewifycoffee.com",
    },
  },
  es: {
    nav: {
      build: "Crear",
      the100: "Los 100",
      feed: "Feed",
      membership: "Membresía",
      store: "Tienda",
      dashboard: "Panel",
      haveInvite: "¿Tienes invitación?",
    },
    home: {
      eyebrow: "Brewify Coffee",
      headline: "Un café que te conoce.",
      subheadline: "Una persona. Un blend. Solo tuyo.",
      cta: "Crea tu café",
      alreadyHaveInvite: "¿Ya tienes invitación?",
      enterCode: "Ingresa tu código",
      inviteLabel: "Código de invitación",
      invitePlaceholder: "ej: BREW-001",
      redeemBtn: "Canjear",
      redeeming: "Canjeando…",
      cancelBtn: "Cancelar",
      accessGranted: "Acceso concedido. Entrando.",
      invalidCode: "Inválido o ya canjeado.",
      somethingWrong: "Algo salió mal.",
      feature1Title: "Personalizado",
      feature1Desc:
        "Cada blend se diseña según tu estado de ánimo, ritmo y momento de vida.",
      feature2Title: "Sostenible",
      feature2Desc:
        "Cosechado con intención, tostado limpio, hecho para perdurar.",
      feature3Title: "Tuyo",
      feature3Desc:
        "Sin recetas genéricas, sin bolsas estándar. Un perfil que existe solo para ti.",
      waitlistTitle: "Únete a la lista de espera",
      waitlistSub: "Te avisaremos cuando abra la próxima tanda.",
      waitlistPlaceholder: "Tu correo electrónico",
      waitlistBtn: "Unirme a la lista",
      waitlistJoining: "Uniéndome…",
      waitlistSuccess:
        "Ya estás dentro. Te avisaremos cuando abra la próxima tanda.",
    },
    footer: {
      tagline: "Brewify Coffee",
      domain: "brewifycoffee.com",
    },
  },
} as const;

// ─── Context ───────────────────────────────────────────────────────────────────
export type Translations = (typeof translations)[Language];

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

const STORAGE_KEY = "brewify_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["en", "pt", "es"].includes(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
