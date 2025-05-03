'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import LiveBrewing from '@/components/LiveBrewing';
import CoffeeOrigins from '@/components/CoffeeOrigins';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedProducts />
      <LiveBrewing />
      <CoffeeOrigins />
      <Footer />
    </main>
  );
}
