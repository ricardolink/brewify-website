'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-coffee-brown mb-4">About Brewify</h1>
        <p className="text-lg max-w-3xl mx-auto">
          We're on a mission to transform your daily coffee ritual into an extraordinary experience through 
          education, quality beans, and a passionate community.
        </p>
      </div>

      {/* Torie's story section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-6 text-center">Meet Torie</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <div className="bg-latte-foam rounded-lg h-96 flex items-center justify-center overflow-hidden">
              {/* Real image of Torie */}
              <Image 
                src="/images/torie.jpeg" 
                alt="Torie enjoying coffee" 
                width={400} 
                height={500} 
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-coffee-brown mb-4">The Face Behind Brewify</h3>
            <p className="text-lg mb-4">
              Torie is the passionate host and coffee expert behind Brewify. With her warm personality and extensive 
              knowledge of coffee, she has become the face of our brand, sharing her love for exceptional coffee 
              through our live brewing sessions on TikTok and Instagram.
            </p>
            <p className="text-lg">
              Before founding Brewify, Torie spent over a decade in the luxury industry, working with prestigious 
              brands where she developed an eye for quality, craftsmanship, and exceptional customer experiences. 
              Her career took her from high-end fashion houses in Milan to luxury hospitality in Paris, where she 
              learned that true luxury isn't just about price—it's about authenticity, story, and the pursuit of perfection.
            </p>
          </div>
        </div>

        <div className="bg-cream p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold text-coffee-brown mb-4">The Coffee Journey Begins</h3>
          <p className="text-lg mb-4">
            Torie's passion for coffee began during her extensive travels for work. In the quiet mornings before 
            meetings in Colombia, she would savor locally roasted coffee with farmers who had been perfecting their 
            craft for generations. In Ethiopia, she witnessed traditional coffee ceremonies that transformed a simple 
            beverage into a meaningful social ritual. In Japan, she was captivated by the precision and mindfulness 
            of pour-over brewing methods.
          </p>
          <p className="text-lg mb-4">
            What started as a personal passion soon became an obsession. Torie began studying coffee intensively—learning 
            about bean varieties, cultivation methods, roasting techniques, and brewing styles. She trained with master 
            roasters, earned certifications in coffee preparation, and even worked harvests on coffee farms to understand 
            every step of the journey from seed to cup.
          </p>
          <p className="text-lg">
            The concept for Brewify was born from Torie's desire to bridge the gap between exceptional coffee and everyday 
            consumers. She recognized that many people were intimidated by specialty coffee or unsure how to brew it properly 
            at home. By combining her background in luxury experiences with her passion for coffee education, Torie created 
            a platform where people could not only purchase premium coffee but also learn how to brew it perfectly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-coffee-brown mb-4">Philosophy & Beyond</h3>
            <p className="text-lg mb-4">
              Torie believes that exceptional coffee should be accessible to everyone. Through Brewify's live brewing 
              sessions, she demystifies the coffee-making process, sharing techniques and knowledge in an approachable, 
              engaging way. Her philosophy is simple: when you understand where your coffee comes from and how to brew 
              it properly, every cup becomes a luxury experience.
            </p>
            <p className="text-lg">
              When she's not hosting live brewing sessions or sourcing new coffee varieties, Torie continues to feed 
              her passion for travel. She regularly visits coffee-producing regions around the world, building relationships 
              with farmers and cooperatives to ensure Brewify's beans are not only exceptional in quality but also ethically 
              sourced and sustainably produced.
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="bg-latte-foam rounded-lg h-80 flex items-center justify-center">
              {/* Placeholder for coffee journey image */}
              <div className="w-56 h-56 bg-caramel rounded-full flex items-center justify-center text-white text-xl">
                Coffee Journey Image
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="bg-latte-foam p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
          At Brewify, we're on a mission to transform your daily coffee ritual into an extraordinary experience. 
          We believe that everyone deserves to enjoy exceptional coffee, brewed to perfection, regardless of their experience level.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-cream p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-coffee-brown rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-coffee-brown mb-2">Educate</h3>
            <p>Demystify the world of specialty coffee through engaging, accessible content</p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-coffee-brown rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-coffee-brown mb-2">Connect</h3>
            <p>Build a community of coffee lovers who share knowledge and passion</p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-coffee-brown rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-coffee-brown mb-2">Elevate</h3>
            <p>Transform everyday coffee moments into memorable experiences</p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-coffee-brown rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              4
            </div>
            <h3 className="text-xl font-bold text-coffee-brown mb-2">Sustain</h3>
            <p>Support ethical practices throughout the coffee supply chain</p>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-6 text-center">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Quality Without Compromise</h3>
            <p className="text-lg">
              We source only the finest beans, roasted in small batches on the day of shipping to ensure peak flavor and freshness.
            </p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Transparency</h3>
            <p className="text-lg">
              We believe you should know exactly where your coffee comes from, how it was processed, and who grew it.
            </p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Sustainability</h3>
            <p className="text-lg">
              We partner with farms and cooperatives that prioritize environmental stewardship and fair labor practices.
            </p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Community</h3>
            <p className="text-lg">
              Coffee brings people together, and we're building a community where knowledge is shared and questions are welcomed.
            </p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Innovation</h3>
            <p className="text-lg">
              We continuously explore new brewing methods, flavor profiles, and products to enhance your coffee experience.
            </p>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-3">Education</h3>
            <p className="text-lg">
              We believe knowledge enhances enjoyment, so we're committed to sharing our coffee expertise with our community.
            </p>
          </div>
        </div>
      </div>

      {/* Join our journey section */}
      <div className="bg-coffee-brown text-cream p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Follow Torie on our live brewing sessions on TikTok and Instagram, where she shares brewing techniques, 
          coffee knowledge, and special offers on the products being demonstrated.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/live-brewing" className="bg-caramel hover:bg-cream hover:text-coffee-brown text-white px-6 py-3 rounded-full text-lg transition-colors">
            Live Brewing Schedule
          </Link>
          <Link href="/coffee" className="bg-cream text-coffee-brown hover:bg-caramel hover:text-white px-6 py-3 rounded-full text-lg transition-colors">
            Explore Our Coffee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
