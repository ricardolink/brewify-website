"use client";

import { LANGUAGES, useLanguage, type Language } from "@/context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center">
          <button
            type="button"
            onClick={() => setLanguage(lang.code as Language)}
            className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] transition-colors px-1 py-0.5 rounded
              ${
                language === lang.code
                  ? "text-brew-ivory"
                  : "text-brew-ivory/40 hover:text-brew-ivory/70"
              }`}
            aria-label={`Switch to ${lang.label}`}
          >
            <span className="text-sm leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
          {i < LANGUAGES.length - 1 && (
            <span className="text-brew-ivory/20 text-[10px] select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
