'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default product if none provided
  const defaultProduct = {
    id: 1,
    name: 'Sample Coffee',
    origin: 'Brazil',
    roast: 'Medium',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1559525839-8f275eef5678',
    description: 'A delicious coffee with rich flavor notes.'
  };
  
  const p = product || defaultProduct;
  
  // Function to render roast level dots
  const renderRoastLevel = (roast) => {
    const levels = {
      'Light': 1,
      'Medium': 2,
      'Medium-Dark': 3,
      'Dark': 4
    };
    
    const level = levels[roast] || 2;
    
    return (
      <div className="flex">
        {[1, 2, 3, 4].map((dot) => (
          <div 
            key={dot} 
            className={`w-2 h-2 rounded-full mx-0.5 ${dot <= level ? 'bg-coffee-brown' : 'bg-medium-gray'}`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
      style={{ transform: isHovered ? 'translateY(-5px)' : 'translateY(0)', boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <Image
          src={p.image}
          alt={p.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-sm text-dark-gray mb-1">
          <span>{p.origin}</span>
        </div>
        
        <h3 className="font-serif text-xl mb-1">{p.name}</h3>
        
        <div className="flex items-center mb-2">
          <span className="text-sm text-dark-gray mr-2">Roast:</span>
          {renderRoastLevel(p.roast)}
        </div>
        
        <p className="text-sm text-dark-gray mb-3 line-clamp-2">{p.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-coffee-brown font-semibold">${p.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <button 
              className="bg-caramel text-cream px-3 py-1 rounded text-sm hover:bg-caramel/90 transition-colors"
              aria-label="Add to cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <Link 
              href={`/coffee/${p.id}`}
              className="bg-coffee-brown text-cream px-3 py-1 rounded text-sm hover:bg-coffee-brown/90 transition-colors"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
