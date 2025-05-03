'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LiveBrewing() {
  const upcomingSessions = [
    {
      id: 1,
      title: 'Ethiopian Coffee Tasting',
      host: 'Torie',
      date: 'April 28, 2025',
      time: '3:00 PM EST',
      platform: 'TikTok',
      description: 'Join Torie as she brews and tastes different Ethiopian coffee varieties.'
    },
    {
      id: 2,
      title: 'Brewing Methods Comparison',
      host: 'Torie',
      date: 'May 2, 2025',
      time: '4:30 PM EST',
      platform: 'Instagram',
      description: 'Learn about different brewing methods and how they affect flavor profiles.'
    },
    {
      id: 3,
      title: 'Coffee Bean Roasting Live',
      host: 'Torie',
      date: 'May 5, 2025',
      time: '2:00 PM EST',
      platform: 'TikTok',
      description: 'Watch as we roast coffee beans live and explain the process.'
    }
  ];

  return (
    <section className="py-16 bg-latte-foam">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif text-coffee-brown mb-4">Live Coffee Brewing</h2>
            <p className="text-lg mb-6">
              Join our host Torie for live coffee brewing sessions on TikTok and Instagram. 
              Learn about different brewing methods, coffee origins, and taste profiles.
            </p>
            <p className="mb-6">
              During our live sessions, you can ask questions, get brewing tips, and purchase 
              the exact coffee beans being used with special discounts.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://tiktok.com/@brewify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-coffee-brown text-cream px-6 py-2 rounded-md font-semibold hover:bg-coffee-brown/90 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok
              </a>
              <a 
                href="https://instagram.com/brewify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-coffee-brown text-coffee-brown px-6 py-2 rounded-md font-semibold hover:bg-coffee-brown hover:text-cream transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1545665225-b23b99e4d45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Live coffee brewing"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <h3 className="text-2xl font-serif text-coffee-brown mb-6">Upcoming Live Sessions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-coffee-brown text-cream px-3 py-1 rounded-full text-sm">
                  {session.platform}
                </div>
                <div className="text-dark-gray text-sm">
                  {session.date} • {session.time}
                </div>
              </div>
              
              <h4 className="font-serif text-xl mb-2">{session.title}</h4>
              <p className="text-dark-gray text-sm mb-4">
                Host: {session.host}
              </p>
              <p className="text-dark-gray mb-4">
                {session.description}
              </p>
              
              <button className="w-full bg-caramel text-cream py-2 rounded-md font-semibold hover:bg-caramel/90 transition-colors">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/live"
            className="inline-block border-2 border-coffee-brown text-coffee-brown px-6 py-2 rounded-md font-semibold hover:bg-coffee-brown hover:text-cream transition-colors"
          >
            View All Live Sessions
          </Link>
        </div>
      </div>
    </section>
  );
}
