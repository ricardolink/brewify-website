'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AccessoriesPage = () => {
  // Accessories categories
  const categories = [
    { id: 'brewing', name: 'Brewing Equipment' },
    { id: 'preparation', name: 'Coffee Preparation Tools' },
    { id: 'filters', name: 'Filters & Supplies' },
    { id: 'measurement', name: 'Measurement & Precision' },
    { id: 'specialty', name: 'Specialty Items' }
  ];

  // Accessories products
  const products = [
    {
      id: 1,
      name: 'Brewify Pour-Over Stand',
      category: 'brewing',
      price: 45.99,
      image: '/accessories/pour-over-stand.jpg',
      description: 'Elegant wooden stand with Brewify logo, designed to hold pour-over brewers',
      compatibility: 'Compatible with: Chemex, Hario V60, and most cone brewers',
      materials: 'Walnut or Maple wood'
    },
    {
      id: 2,
      name: 'French Press',
      category: 'brewing',
      price: 39.99,
      image: '/accessories/french-press.jpg',
      description: 'Double-walled stainless steel French press with Brewify logo',
      capacity: ['350ml (12oz)', '600ml (20oz)'],
      colors: ['Stainless Steel', 'Matte Black']
    },
    {
      id: 3,
      name: 'AeroPress Coffee Maker',
      category: 'brewing',
      price: 34.99,
      image: '/accessories/aeropress.jpg',
      description: 'Compact and versatile coffee maker for rich, smooth coffee',
      includes: 'AeroPress, filters, scoop, stirrer, and funnel',
      perfect_for: 'Home, office, or travel'
    },
    {
      id: 4,
      name: 'Gooseneck Kettle',
      category: 'preparation',
      price: 59.99,
      image: '/accessories/gooseneck-kettle.jpg',
      description: 'Precision pour kettle with temperature control for perfect brewing',
      capacity: '1L',
      features: 'Digital temperature display, keep warm function'
    },
    {
      id: 5,
      name: 'Burr Coffee Grinder',
      category: 'preparation',
      price: 79.99,
      image: '/accessories/grinder.jpg',
      description: 'Adjustable grinder for consistent particle size',
      settings: '15 adjustable settings from fine to coarse',
      capacity: '8oz bean hopper'
    },
    {
      id: 6,
      name: 'Milk Frother',
      category: 'preparation',
      price: 29.99,
      image: '/accessories/frother.jpg',
      description: 'Electric frother for creating barista-quality foam',
      features: 'Multiple froth settings, hot and cold options',
      capacity: '150ml for frothing, 300ml for heating'
    },
    {
      id: 7,
      name: 'Chemex Filters',
      category: 'filters',
      price: 12.99,
      image: '/accessories/chemex-filters.jpg',
      description: 'Premium bonded paper filters for clean, flavorful coffee',
      count: '100 filters',
      options: ['Natural (unbleached)', 'White (oxygen cleansed)']
    },
    {
      id: 8,
      name: 'Reusable Metal Filter',
      category: 'filters',
      price: 19.99,
      image: '/accessories/metal-filter.jpg',
      description: 'Eco-friendly stainless steel filter with fine mesh',
      compatibility: 'Compatible with: Chemex, Hario V60, and most cone brewers',
      features: 'Dishwasher safe, preserves natural coffee oils'
    },
    {
      id: 9,
      name: 'Cleaning Tablets',
      category: 'filters',
      price: 14.99,
      image: '/accessories/cleaning-tablets.jpg',
      description: 'Specialized cleaning tablets for coffee equipment',
      count: '30 tablets',
      usage: 'Removes coffee oils and residue from brewers and equipment'
    },
    {
      id: 10,
      name: 'Digital Coffee Scale',
      category: 'measurement',
      price: 39.99,
      image: '/accessories/scale.jpg',
      description: 'Precision scale with timer for consistent brewing',
      accuracy: '0.1g',
      features: 'Built-in timer, auto-off, tare function'
    },
    {
      id: 11,
      name: 'Coffee Dosing Rings',
      category: 'measurement',
      price: 15.99,
      image: '/accessories/dosing-rings.jpg',
      description: 'Stainless steel rings for mess-free grinding',
      diameter: ['58mm (standard)', '54mm', '51mm'],
      materials: 'Polished stainless steel with Brewify logo'
    },
    {
      id: 12,
      name: 'Brewing Thermometer',
      category: 'measurement',
      price: 19.99,
      image: '/accessories/thermometer.jpg',
      description: 'Instant-read thermometer for optimal water temperature',
      range: '32°F to 212°F (0°C to 100°C)',
      features: 'Digital display, waterproof, auto-off function'
    },
    {
      id: 13,
      name: 'Cupping Set',
      category: 'specialty',
      price: 49.99,
      image: '/accessories/cupping-set.jpg',
      description: 'Professional coffee tasting set with Brewify logo',
      includes: '6 cupping bowls, spoons, evaluation forms, and guide',
      perfect_for: 'Home tastings and coffee education'
    },
    {
      id: 14,
      name: 'Travel Brewing Kit',
      category: 'specialty',
      price: 69.99,
      image: '/accessories/travel-kit.jpg',
      description: 'Compact kit for brewing great coffee anywhere',
      includes: 'Collapsible pour-over, hand grinder, travel case',
      features: 'Lightweight, durable, TSA-friendly'
    },
    {
      id: 15,
      name: 'Cold Brew System',
      category: 'specialty',
      price: 44.99,
      image: '/accessories/cold-brew.jpg',
      description: 'Complete system for making smooth cold brew at home',
      capacity: '1L',
      features: 'Airtight lid, fine mesh filter, easy-pour spout'
    }
  ];

  // State for active category filter (default to showing all)
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-coffee-brown mb-4">Coffee Accessories</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Elevate your coffee experience with our premium accessories. From brewing equipment to precision tools,
          we have everything you need to brew the perfect cup at home.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-coffee-brown text-cream' : 'bg-cream text-coffee-brown border border-coffee-brown'}`}
          onClick={() => setActiveCategory('all')}
        >
          All Accessories
        </button>
        {categories.map(category => (
          <button 
            key={category.id}
            className={`px-4 py-2 rounded-full ${activeCategory === category.id ? 'bg-coffee-brown text-cream' : 'bg-cream text-coffee-brown border border-coffee-brown'}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-cream rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <div className="h-64 bg-latte-foam flex items-center justify-center">
              {/* Placeholder for product image */}
              <div className="w-40 h-40 bg-caramel rounded-full flex items-center justify-center text-white">
                Product Image
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-coffee-brown">{product.name}</h3>
              <p className="text-espresso-black mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-coffee-brown">${product.price.toFixed(2)}</span>
                <button className="bg-caramel hover:bg-coffee-brown text-white px-4 py-2 rounded-full transition-colors">
                  Add to Cart
                </button>
              </div>
              {product.capacity && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Capacity:</span> {Array.isArray(product.capacity) ? product.capacity.join(', ') : product.capacity}
                </div>
              )}
              {product.features && (
                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Features:</span> {product.features}
                </div>
              )}
              {product.compatibility && (
                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Compatibility:</span> {product.compatibility}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Brewing guide banner */}
      <div className="mt-16 bg-latte-foam rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-coffee-brown mb-4">Free Brewing Guide with Purchase</h2>
        <p className="text-lg mb-6">
          Get our comprehensive brewing guide with any accessory purchase over $30. Learn how to get the most out of your equipment!
        </p>
        <button className="bg-coffee-brown hover:bg-caramel text-white px-6 py-3 rounded-full text-lg transition-colors">
          View Brewing Guide
        </button>
      </div>
    </div>
  );
};

export default AccessoriesPage;
