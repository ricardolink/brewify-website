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

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
