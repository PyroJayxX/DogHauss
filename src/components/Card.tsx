import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

interface CardProps {
  id: number | string;
  image: string;
  name: string;
  price: string;
  emoji?: string;  // Optional emoji for cart display
}

const Card: React.FC<CardProps> = ({ id, image, name, price, emoji = '🌭' }) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Convert string ID to number more explicitly
    const numericId = typeof id === 'number' ? id : parseInt(id, 10);

    // Parse price to ensure it's a number (remove currency symbols etc)
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''));

    addItem({
      id: numericId,
      name,
      price: numericPrice,
      quantity: 1,
      emoji
    });

    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="group flex flex-col bg-[#481401] rounded-3xl h-fit w-full shadow-lg hover:shadow-[0_0_30px_rgba(238,155,112,0.3)] transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageError ? 'hidden' : ''}`}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C1814] to-[#481401] flex items-center justify-center">
            <span className="text-6xl">{emoji}</span>
          </div>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-6 py-3 bg-[#EE9B70] text-[#481401] font-semibold rounded-xl text-lg shadow-lg hover:bg-[#F05A19] hover:text-white transition-all duration-200 transform hover:scale-105 ${isAdding ? 'bg-green-500 text-white cursor-wait' : ''}`}
            aria-label="Add to cart"
          >
            {isAdding ? '✓ Added' : '+ Add to Cart'}
          </button>
        </div>
      </div>
      <div className="p-5 w-full">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-[#EE9B70] font-bold text-xl">₱{price}</p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`p-3 rounded-xl transition-all duration-200 ${isAdding ? 'bg-green-500' : 'bg-[#EE9B70] hover:bg-[#F05A19]'} text-[#481401] hover:text-white`}
            aria-label="Add to cart"
          >
            {isAdding ? (
              <span className="text-lg">✓</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;