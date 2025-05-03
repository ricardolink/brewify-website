
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext"; // Import useCart hook

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity } = useCart(); // Get total quantity from cart context

  return (
    <header className="bg-cream shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="logo-container">
            <Image
              src="/brewify-logo.png"
              alt="Brewify"
              width={180}
              height={80}
              className="logo"
              priority // Add priority for LCP element
            />
            <span className="tagline text-coffee-brown text-sm mt-1 hidden sm:block">WATCH IT BREW. TASTE IT LIVE.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/coffee" className="text-coffee-brown hover:text-caramel font-semibold transition-colors">Coffee</Link></li>
                <li><Link href="/merchandise" className="text-coffee-brown hover:text-caramel font-semibold transition-colors">Merchandise</Link></li>
                <li><Link href="/accessories" className="text-coffee-brown hover:text-caramel font-semibold transition-colors">Accessories</Link></li>
                <li><Link href="/live-brewing" className="text-coffee-brown hover:text-caramel font-semibold transition-colors">Live Brewing</Link></li>
                <li><Link href="/about" className="text-coffee-brown hover:text-caramel font-semibold transition-colors">About</Link></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Account link - Placeholder for now */}
              {/* <Link href="/account" className="text-coffee-brown hover:text-caramel">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link> */}
              <Link href="/cart" className="text-coffee-brown hover:text-caramel relative" aria-label={`Cart with ${totalQuantity} items`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-caramel text-cream rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-coffee-brown"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-medium-gray pt-4">
            <nav>
              <ul className="flex flex-col space-y-4">
                <li><Link href="/coffee" className="text-coffee-brown hover:text-caramel font-semibold transition-colors block" onClick={() => setMobileMenuOpen(false)}>Coffee</Link></li>
                <li><Link href="/merchandise" className="text-coffee-brown hover:text-caramel font-semibold transition-colors block" onClick={() => setMobileMenuOpen(false)}>Merchandise</Link></li>
                <li><Link href="/accessories" className="text-coffee-brown hover:text-caramel font-semibold transition-colors block" onClick={() => setMobileMenuOpen(false)}>Accessories</Link></li>
                <li><Link href="/live-brewing" className="text-coffee-brown hover:text-caramel font-semibold transition-colors block" onClick={() => setMobileMenuOpen(false)}>Live Brewing</Link></li>
                <li><Link href="/about" className="text-coffee-brown hover:text-caramel font-semibold transition-colors block" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-light-gray">
              {/* <Link href="/account" className="text-coffee-brown hover:text-caramel" onClick={() => setMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link> */}
              <Link href="/cart" className="text-coffee-brown hover:text-caramel relative" onClick={() => setMobileMenuOpen(false)} aria-label={`Cart with ${totalQuantity} items`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-caramel text-cream rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

