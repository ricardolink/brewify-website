'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CoffeeOrigins() {
  const origins = [
    {
      id: 1,
      country: 'Brazil',
      description: 'Sweet, nutty flavor with notes of chocolate and caramel. Brazil is the world\'s largest coffee producer, accounting for about 38% of global production.',
      image: 'https://images.unsplash.com/photo-1518782149397-d90e3d8b5b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      position: { top: '60%', left: '30%' }
    },
    {
      id: 2,
      country: 'Vietnam',
      description: 'Bold, bitter flavor with higher caffeine content. Vietnam is the second-largest coffee producer, focusing primarily on Robusta beans.',
      image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      position: { top: '40%', left: '70%' }
    },
    {
      id: 3,
      country: 'Colombia',
      description: 'Rich and balanced with notes of caramel, nuts, and citrus. Colombian coffee is renowned for its quality and mild, well-balanced flavor.',
      image: 'https://images.unsplash.com/photo-1599488394675-8f0da8b0a70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      position: { top: '50%', left: '25%' }
    },
    {
      id: 4,
      country: 'Indonesia',
      description: 'Full-bodied with earthy, spicy notes and low acidity. Indonesia produces several types of highly sought-after specialty coffees.',
      image: 'https://images.unsplash.com/photo-1504868584283-f21a0d6f3be7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      position: { top: '55%', left: '75%' }
    },
    {
      id: 5,
      country: 'Ethiopia',
      description: 'Bright and fruity with floral notes and a wine-like acidity. Ethiopia is the birthplace of coffee and produces exclusively Arabica beans.',
      image: 'https://images.unsplash.com/photo-1523254407672-3a93a4427f6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      position: { top: '45%', left: '55%' }
    }
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-coffee-brown text-center mb-6">Coffee Origins</h2>
        <p className="text-center text-dark-gray max-w-2xl mx-auto mb-12">
          We source our coffee beans from the world's top coffee-producing countries, 
          each with its unique flavor profile and characteristics.
        </p>
        
        <div className="relative h-[500px] bg-latte-foam rounded-lg overflow-hidden mb-12">
          <Image
            src="/world-map.png"
            alt="World Map"
            fill
            style={{ objectFit: 'contain' }}
            className="opacity-60"
          />
          
          {origins.map((origin) => (
            <div 
              key={origin.id}
              className="absolute w-6 h-6 bg-caramel rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              style={{ top: origin.position.top, left: origin.position.left }}
              title={origin.country}
            ></div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {origins.map((origin) => (
            <div key={origin.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={origin.image}
                  alt={origin.country}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl mb-2">{origin.country}</h3>
                <p className="text-dark-gray mb-4">{origin.description}</p>
                <Link 
                  href={`/coffee/origin/${origin.id}`}
                  className="text-coffee-brown font-semibold hover:text-caramel transition-colors"
                >
                  Explore {origin.country} Coffee →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
