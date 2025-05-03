'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="Coffee brewing"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-espresso-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-6">
          Freshly Roasted Coffee, <br />Delivered to Your Door
        </h1>
        <p className="text-xl text-cream mb-8 max-w-2xl mx-auto">
          Watch our live brewing sessions and taste the difference with same-day roasted coffee beans from around the world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/coffee" 
            className="bg-coffee-brown hover:bg-coffee-brown/90 text-cream px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Shop Now
          </Link>
          <Link 
            href="/live" 
            className="bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-coffee-brown px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Watch Live
          </Link>
        </div>
      </div>
    </section>
  );
}
