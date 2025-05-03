'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProducts({ products }) {
  // If no products are provided, use default sample products
  const featuredProducts = products || [
    {
      id: 1,
      name: 'Brazilian Cerrado',
      origin: 'Brazil',
      roast: 'Medium',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1559525839-8f275eef5678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      description: 'Sweet, nutty flavor with notes of chocolate and caramel.'
    },
    {
      id: 2,
      name: 'Ethiopian Yirgacheffe',
      origin: 'Ethiopia',
      roast: 'Light',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      description: 'Bright and fruity with floral notes and a wine-like acidity.'
    },
    {
      id: 3,
      name: 'Colombian Supremo',
      origin: 'Colombia',
      roast: 'Medium-Dark',
      price: 17.99,
      image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      description: 'Rich and balanced with notes of caramel, nuts, and citrus.'
    },
    {
      id: 4,
      name: 'Sumatra Mandheling',
      origin: 'Indonesia',
      roast: 'Dark',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      description: 'Full-bodied with earthy, spicy notes and low acidity.'
    }
  ];

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
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-coffee-brown text-center mb-12">Featured Coffee Beans</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-sm text-dark-gray mb-1">
                  <span>{product.origin}</span>
                </div>
                
                <h3 className="font-serif text-xl mb-1">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <span className="text-sm text-dark-gray mr-2">Roast:</span>
                  {renderRoastLevel(product.roast)}
                </div>
                
                <p className="text-sm text-dark-gray mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-coffee-brown font-semibold">${product.price.toFixed(2)}</span>
                  <Link 
                    href={`/coffee/${product.id}`}
                    className="bg-coffee-brown text-cream px-3 py-1 rounded text-sm hover:bg-coffee-brown/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/coffee"
            className="inline-block border-2 border-coffee-brown text-coffee-brown px-6 py-2 rounded-md font-semibold hover:bg-coffee-brown hover:text-cream transition-colors"
          >
            View All Coffee Beans
          </Link>
        </div>
      </div>
    </section>
  );
}
