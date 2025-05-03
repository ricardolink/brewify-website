'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MerchandisePage = () => {
  // Merchandise categories
  const categories = [
    { id: 'apparel', name: 'Apparel' },
    { id: 'drinkware', name: 'Drinkware' },
    { id: 'home', name: 'Home Goods' },
    { id: 'gift-sets', name: 'Gift Sets' }
  ];

  // Merchandise products
  const products = [
    {
      id: 1,
      name: 'Brewify Logo T-Shirt',
      category: 'apparel',
      price: 24.99,
      image: '/merchandise/tshirt.jpg',
      description: 'Soft cotton t-shirt featuring the Brewify logo on a cream background',
      options: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Cream', 'Coffee Brown', 'Black']
    },
    {
      id: 2,
      name: '"Watch It Brew" Hoodie',
      category: 'apparel',
      price: 49.99,
      image: '/merchandise/hoodie.jpg',
      description: 'Cozy pullover hoodie with the Brewify tagline and a small logo on the front',
      options: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Coffee Brown', 'Black', 'Cream']
    },
    {
      id: 3,
      name: 'Barista Apron',
      category: 'apparel',
      price: 34.99,
      image: '/merchandise/apron.jpg',
      description: 'Professional-grade canvas apron with Brewify logo and multiple pockets',
      options: ['One size fits all'],
      colors: ['Coffee Brown', 'Black']
    },
    {
      id: 4,
      name: 'Brewify Ceramic Mug',
      category: 'drinkware',
      price: 18.99,
      image: '/merchandise/mug.jpg',
      description: 'Ceramic mug with Brewify logo',
      options: ['12oz', '16oz'],
      colors: ['Cream', 'Coffee Brown', 'Black']
    },
    {
      id: 5,
      name: 'Insulated Travel Tumbler',
      category: 'drinkware',
      price: 29.99,
      image: '/merchandise/tumbler.jpg',
      description: 'Double-walled stainless steel tumbler that keeps drinks hot for 6+ hours',
      options: ['16oz', '20oz'],
      colors: ['Stainless Steel', 'Coffee Brown', 'Black', 'Cream']
    },
    {
      id: 6,
      name: 'Pour-Over Carafe Set',
      category: 'drinkware',
      price: 39.99,
      image: '/merchandise/carafe.jpg',
      description: 'Glass carafe with Brewify logo and reusable pour-over filter',
      options: ['500ml', '1L'],
      colors: ['Clear glass with wooden collar']
    },
    {
      id: 7,
      name: 'Coffee Bean Storage Canister',
      category: 'home',
      price: 24.99,
      image: '/merchandise/canister.jpg',
      description: 'Airtight stainless steel canister with Brewify logo',
      options: ['12oz', '1lb capacity'],
      colors: ['Stainless Steel', 'Coffee Brown', 'Black']
    },
    {
      id: 8,
      name: 'Coffee Scented Candle',
      category: 'home',
      price: 19.99,
      image: '/merchandise/candle.jpg',
      description: 'Hand-poured soy candle with coffee-inspired scents',
      options: ['Fresh Brew', 'Vanilla Latte', 'Hazelnut'],
      colors: []
    },
    {
      id: 9,
      name: 'Coffee Table Book: "Origins of Flavor"',
      category: 'home',
      price: 34.99,
      image: '/merchandise/book.jpg',
      description: 'Hardcover book featuring coffee origins, brewing methods, and recipes',
      options: [],
      colors: []
    },
    {
      id: 10,
      name: 'Starter Brew Kit',
      category: 'gift-sets',
      price: 39.99,
      image: '/merchandise/starter-kit.jpg',
      description: 'Brewify mug, 12oz of signature coffee, and brewing guide',
      options: ['Light Roast', 'Medium Roast', 'Dark Roast'],
      colors: []
    },
    {
      id: 11,
      name: 'Coffee Enthusiast Bundle',
      category: 'gift-sets',
      price: 69.99,
      image: '/merchandise/enthusiast-bundle.jpg',
      description: 'Travel tumbler, t-shirt, and 1lb of premium coffee',
      options: ['Choice of coffee origin and roast level'],
      colors: []
    },
    {
      id: 12,
      name: 'Ultimate Brewify Experience',
      category: 'gift-sets',
      price: 99.99,
      image: '/merchandise/ultimate-bundle.jpg',
      description: 'Pour-over set, storage canister, 2lbs of coffee, and brewing guide',
      options: ['Choice of coffee origins and roast levels'],
      colors: []
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
        <h1 className="text-4xl font-bold text-coffee-brown mb-4">Brewify Merchandise</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Show your love for great coffee with our premium merchandise. From apparel to drinkware, 
          each item is designed with the same attention to quality as our coffee.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-coffee-brown text-cream' : 'bg-cream text-coffee-brown border border-coffee-brown'}`}
          onClick={() => setActiveCategory('all')}
        >
          All Products
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
              {product.options.length > 0 && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Options:</span> {product.options.join(', ')}
                </div>
              )}
              {product.colors.length > 0 && (
                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Colors:</span> {product.colors.join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Featured collection banner */}
      <div className="mt-16 bg-latte-foam rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-coffee-brown mb-4">Featured Collection: Coffee Lover's Essentials</h2>
        <p className="text-lg mb-6">
          Discover our curated collection of must-have items for the dedicated coffee enthusiast.
        </p>
        <button className="bg-coffee-brown hover:bg-caramel text-white px-6 py-3 rounded-full text-lg transition-colors">
          Shop the Collection
        </button>
      </div>
    </div>
  );
};

export default MerchandisePage;
