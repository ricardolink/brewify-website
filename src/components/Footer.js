'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-coffee-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4 text-cream">Brewify</h3>
            <p className="mb-4">Watch It Brew. Taste It Live.</p>
            <p className="text-sm text-latte-foam">
              Freshly roasted coffee beans from around the world, with same-day roasting options.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4 text-cream">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/coffee" className="text-latte-foam hover:text-caramel transition-colors">Coffee Beans</Link></li>
              <li><Link href="/merchandise" className="text-latte-foam hover:text-caramel transition-colors">Merchandise</Link></li>
              <li><Link href="/accessories" className="text-latte-foam hover:text-caramel transition-colors">Accessories</Link></li>
              <li><Link href="/gift-cards" className="text-latte-foam hover:text-caramel transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4 text-cream">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-latte-foam hover:text-caramel transition-colors">About Us</Link></li>
              <li><Link href="/live" className="text-latte-foam hover:text-caramel transition-colors">Live Brewing</Link></li>
              <li><Link href="/blog" className="text-latte-foam hover:text-caramel transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-latte-foam hover:text-caramel transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4 text-cream">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com/brewify" target="_blank" rel="noopener noreferrer" className="bg-cream text-coffee-brown hover:bg-caramel hover:text-cream transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@brewify" target="_blank" rel="noopener noreferrer" className="bg-cream text-coffee-brown hover:bg-caramel hover:text-cream transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="mailto:info@brewify.com" className="bg-cream text-coffee-brown hover:bg-caramel hover:text-cream transition-colors w-10 h-10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
            <p className="text-sm text-latte-foam">
              Subscribe to our newsletter for updates on new products and live brewing sessions.
            </p>
            <div className="mt-4 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md w-full focus:outline-none text-espresso-black"
              />
              <button className="bg-caramel hover:bg-caramel/80 text-cream px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-latte-foam/30 mt-8 pt-8 text-sm text-latte-foam">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Brewify. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-caramel transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-caramel transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-caramel transition-colors">Shipping</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
