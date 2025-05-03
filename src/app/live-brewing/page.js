'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LiveBrewingPage = () => {
  // Upcoming live sessions
  const upcomingSessions = [
    {
      id: 1,
      title: 'Ethiopian Coffee Journey',
      date: 'May 3, 2025',
      time: '3:00 PM EST',
      host: 'Torie',
      platform: 'TikTok',
      description: 'Join Torie as she explores the diverse flavor profiles of Ethiopian coffee beans. Learn about the unique Yirgacheffe and Sidamo regions and discover the perfect brewing methods to highlight their distinctive floral and fruity notes.',
      specialOffer: '15% off all Ethiopian coffee beans during the live session with code ETHIOLIVE',
      image: '/live-brewing/ethiopian-coffee.jpg'
    },
    {
      id: 2,
      title: 'Mastering Pour-Over Techniques',
      date: 'May 7, 2025',
      time: '4:30 PM EST',
      host: 'Torie',
      platform: 'Instagram',
      description: 'Perfect your pour-over technique with Torie\'s step-by-step guidance. Learn about water temperature, grind size, pouring patterns, and timing to achieve a balanced, flavorful cup every time.',
      featuredProducts: 'Brewify Pour-Over Stand, Gooseneck Kettle, Digital Coffee Scale',
      specialOffer: '20% off the Pour-Over Bundle during the live session',
      image: '/live-brewing/pour-over.jpg'
    },
    {
      id: 3,
      title: 'Cold Brew Masterclass',
      date: 'May 12, 2025',
      time: '2:00 PM EST',
      host: 'Torie',
      platform: 'TikTok',
      description: 'As summer approaches, learn how to make the perfect cold brew at home. Torie will demonstrate various methods, discuss ideal bean selection, and share creative serving ideas.',
      featuredProducts: 'Cold Brew System, Colombian Supremo Beans',
      specialOffer: 'Free shipping on all cold brew equipment during the live session',
      image: '/live-brewing/cold-brew.jpg'
    },
    {
      id: 4,
      title: 'Coffee Tasting 101',
      date: 'May 15, 2025',
      time: '5:00 PM EST',
      host: 'Torie',
      platform: 'Instagram',
      description: 'Develop your coffee palate with this interactive tasting session. Learn professional cupping techniques and how to identify flavor notes, acidity, body, and finish in different coffee varieties.',
      featuredProducts: 'Cupping Set, Coffee Flavor Wheel, Tasting Journal',
      specialOffer: '15% off the Coffee Tasting Kit during the live session',
      image: '/live-brewing/coffee-tasting.jpg'
    }
  ];

  // Past sessions
  const pastSessions = [
    {
      id: 1,
      title: 'Brazilian Coffee Exploration',
      date: 'April 20, 2025',
      platform: 'TikTok',
      description: 'Torie explored the rich, nutty flavors of Brazilian coffee beans and demonstrated multiple brewing methods to highlight their chocolate and caramel notes.',
      recordingLink: 'https://tiktok.com/@BrewifyOfficial/videos/123456',
      image: '/live-brewing/brazilian-coffee.jpg'
    },
    {
      id: 2,
      title: 'Latte Art Fundamentals',
      date: 'April 15, 2025',
      platform: 'Instagram',
      description: 'Torie shared techniques for creating beautiful latte art at home, from basic hearts to more complex rosetta patterns.',
      recordingLink: 'https://instagram.com/BrewifyOfficial/tv/123456',
      image: '/live-brewing/latte-art.jpg'
    },
    {
      id: 3,
      title: 'Coffee Bean Roasting Live',
      date: 'April 8, 2025',
      platform: 'TikTok',
      description: 'Viewers watched the fascinating process of coffee roasting as Torie explained how different roast levels affect flavor profiles.',
      recordingLink: 'https://tiktok.com/@BrewifyOfficial/videos/789012',
      image: '/live-brewing/roasting.jpg'
    }
  ];

  // Benefits of live sessions
  const benefits = [
    {
      title: 'Early Access',
      description: 'Live viewers get first access to new product releases'
    },
    {
      title: 'Special Discounts',
      description: 'Unique discount codes shared only during live sessions'
    },
    {
      title: 'Q&A Opportunities',
      description: 'Get your coffee questions answered in real-time'
    },
    {
      title: 'Giveaways',
      description: 'Regular prize drawings for active participants'
    },
    {
      title: 'Community',
      description: 'Connect with fellow coffee enthusiasts in the comments'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-brown mb-4">Live Coffee Brewing</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Join Torie for exclusive live brewing sessions on TikTok and Instagram where she demonstrates brewing techniques, 
          shares coffee knowledge, and offers special discounts on featured products. Experience the art of coffee making 
          in real-time and interact with our coffee expert directly.
        </p>
      </div>

      {/* Upcoming sessions section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center">Upcoming Live Sessions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingSessions.map(session => (
            <div key={session.id} className="bg-cream rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-latte-foam flex items-center justify-center">
                {/* Placeholder for session image */}
                <div className="w-32 h-32 bg-caramel rounded-full flex items-center justify-center text-white">
                  {session.platform} Live
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-coffee-brown">{session.title}</h3>
                    <p className="text-gray-600">{session.date} • {session.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${session.platform === 'TikTok' ? 'bg-black' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                    {session.platform}
                  </span>
                </div>
                <p className="text-espresso-black mb-4">{session.description}</p>
                {session.featuredProducts && (
                  <div className="mb-3">
                    <span className="font-medium text-coffee-brown">Featured Products:</span> {session.featuredProducts}
                  </div>
                )}
                {session.specialOffer && (
                  <div className="mb-4 p-2 bg-caramel bg-opacity-20 rounded text-coffee-brown">
                    <span className="font-medium">Special Offer:</span> {session.specialOffer}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Host: {session.host}</span>
                  <button className="bg-caramel hover:bg-coffee-brown text-white px-4 py-2 rounded-full transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past sessions section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center">Past Sessions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastSessions.map(session => (
            <div key={session.id} className="bg-cream rounded-lg overflow-hidden shadow-md">
              <div className="h-40 bg-latte-foam flex items-center justify-center">
                {/* Placeholder for session image */}
                <div className="w-24 h-24 bg-caramel rounded-full flex items-center justify-center text-white">
                  {session.platform}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-coffee-brown">{session.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-white text-xs ${session.platform === 'TikTok' ? 'bg-black' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                    {session.platform}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{session.date}</p>
                <p className="text-espresso-black text-sm mb-3">{session.description}</p>
                <a 
                  href={session.recordingLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caramel hover:text-coffee-brown font-medium text-sm transition-colors"
                >
                  Watch Recording →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to join section */}
      <div className="bg-latte-foam p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-6 text-center">How to Join</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-4">TikTok Live</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Follow @BrewifyOfficial on TikTok</li>
              <li>Enable notifications to be alerted when we go live</li>
              <li>Join the live session to interact with Torie in real-time</li>
              <li>Use the special discount codes shared during the session for exclusive offers</li>
            </ol>
            <div className="mt-6">
              <a 
                href="https://tiktok.com/@BrewifyOfficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full inline-flex items-center transition-colors"
              >
                Follow on TikTok
              </a>
            </div>
          </div>
          
          <div className="bg-cream p-6 rounded-lg">
            <h3 className="text-xl font-bold text-coffee-brown mb-4">Instagram Live</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Follow @BrewifyOfficial on Instagram</li>
              <li>Turn on post and story notifications</li>
              <li>Join our live sessions through the Instagram app</li>
              <li>Comment with questions during the broadcast for Torie to answer</li>
            </ol>
            <div className="mt-6">
              <a 
                href="https://instagram.com/BrewifyOfficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full inline-flex items-center transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center">Exclusive Live Viewer Benefits</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-cream p-4 rounded-lg text-center">
              <h3 className="text-xl font-bold text-coffee-brown mb-2">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Request a topic section */}
      <div className="bg-coffee-brown text-cream p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Request a Topic</h2>
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
          Have a brewing method or coffee origin you'd like to learn more about? Submit your suggestions for future live sessions!
        </p>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 rounded-lg text-coffee-brown"
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 rounded-lg text-coffee-brown"
            />
          </div>
          <div className="mb-4">
            <textarea 
              placeholder="Your Topic Suggestion" 
              className="w-full p-3 rounded-lg text-coffee-brown h-32"
            ></textarea>
          </div>
          <button className="w-full bg-caramel hover:bg-latte-foam hover:text-coffee-brown text-white p-3 rounded-lg font-bold transition-colors">
            Submit Suggestion
          </button>
        </div>
      </div>

      {/* Subscribe section */}
      <div className="bg-latte-foam p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-coffee-brown mb-4">Subscribe to Live Notifications</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Never miss a live brewing session! Enter your email to receive notifications about upcoming live events.
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-grow p-3 rounded-l-lg text-coffee-brown"
          />
          <button className="bg-coffee-brown hover:bg-caramel text-white px-6 py-3 rounded-r-lg transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveBrewingPage;
