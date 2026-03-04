"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const ACCESS_KEY = "brewify_access";

const linkClass =
  "text-[10px] uppercase tracking-[0.35em] text-brew-ivory/90 hover:text-brew-ivory transition-colors font-normal";

export function Nav() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHasAccess(!!window.localStorage.getItem(ACCESS_KEY));
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 lg:px-24 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
        <Link href="/" className={linkClass}>
          Brewify Coffee
        </Link>

        <nav className="flex items-center gap-5 md:gap-6">
          {hasAccess === null ? (
            <span className={linkClass}>...</span>
          ) : hasAccess ? (
            <>
              <Link href="/build" className={linkClass}>
                {t.nav.build}
              </Link>
              <Link href="/the-100" className={linkClass}>
                {t.nav.the100}
              </Link>
              <Link href="/feed" className={linkClass}>
                {t.nav.feed}
              </Link>
              <Link href="/membership" className={linkClass}>
                {t.nav.membership}
              </Link>
              <Link href="/store" className={linkClass}>
                {t.nav.store}
              </Link>
              <Link href="/dashboard" className={linkClass}>
                {t.nav.dashboard}
              </Link>
            </>
          ) : (
            <>
              {/* Build visible to all — gate page handles locking */}
              <Link href="/build" className={`${linkClass} opacity-60 hover:opacity-100`}>
                {t.nav.build}
              </Link>
              <Link href="/the-100" className={linkClass}>
                {t.nav.the100}
              </Link>
              <Link href="/feed" className={linkClass}>
                {t.nav.feed}
              </Link>
              <Link href="/membership" className={linkClass}>
                {t.nav.membership}
              </Link>
              <Link href="/store" className={linkClass}>
                {t.nav.store}
              </Link>
              <Link href="/#invite" className={linkClass}>
                {t.nav.haveInvite}
              </Link>
            </>
          )}

          {/* ── Language Switcher ── */}
          <div className="pl-2 border-l border-white/10">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}

export { ACCESS_KEY as BREWIFY_ACCESS_KEY };
