"use client";

import Link from "next/link";

const explore = [
  { label: "The 100", href: "/the-100" },
  { label: "Build Your Coffee", href: "/build" },
  { label: "Blend Feed", href: "/feed" },
  { label: "Gift Store", href: "/store" },
  { label: "Membership", href: "/membership" },
];

const company = [
  { label: "Our Coffee", href: "/our-coffee" },
  { label: "Investor Relations", href: "/investor" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Do Not Sell My Info", href: "/do-not-sell" },
];

export function Footer() {
  return (
    <footer className="bg-brew-black border-t border-zinc-900 text-brew-ivory">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-tight">Brewify Coffee</p>
            <p className="text-xs text-brew-warm-gray leading-relaxed max-w-xs">
              The world's first fully personalized coffee. One person. One blend. Only yours.
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              brewifycoffee.com
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Explore</p>
            <ul className="space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brew-warm-gray hover:text-brew-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Company</p>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brew-warm-gray hover:text-brew-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Legal</p>
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-brew-warm-gray hover:text-brew-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social media */}
        <div className="mt-10 flex items-center gap-6">
          <a
            href="https://instagram.com/brewifycoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-brew-warm-gray hover:text-brew-ivory transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@brewifycoffee</span>
          </a>
          <a
            href="https://tiktok.com/@brewifycoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-brew-warm-gray hover:text-brew-ivory transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
            </svg>
            <span>@brewifycoffee</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-600">
            © {new Date().getFullYear()} Brewify Coffee. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-600">
            <a href="mailto:iam@brewifycoffee.com" className="hover:text-brew-warm-gray transition-colors">
              iam@brewifycoffee.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
