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
  const [addError, setAddError] = useState(false);

  const handleAddToCart = async () => {
    // Convert string ID to number more explicitly
    const numericId = typeof id === 'number' ? id : parseInt(id, 10);

    // Parse price to ensure it's a number (remove currency symbols etc)
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''));

    setIsAdding(true);
    setAddError(false);

    try {
      addItem({
        id: numericId,
        name,
        price: numericPrice,
        quantity: 1,
        emoji
      });
      setTimeout(() => setIsAdding(false), 600);
    } catch {
      setAddError(true);
      setTimeout(() => {
        setIsAdding(false);
        setAddError(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-start bg-[#481401] rounded-3xl h-fit w-full shadow-lg transition-transform transform hover:scale-105">
      <Image src={image} alt={name} layout="responsive" width={1} height={1} />
      <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full items-center justify-center p-4">
        <p className="col-span-1 row-span-1 md:truncate text-white" title={name}>{name}</p>
        <button
          onClick={handleAddToCart}
          className={`col-span-1 row-span-2 ml-auto flex items-center justify-center transition-colors ${
            addError ? 'bg-red-500' : isAdding ? 'bg-green-500' : 'bg-[#EE9B70] hover:bg-[#EE9B70]/80'
          } text-[#481814] rounded-full w-12 h-12`}
          aria-label="Add to cart"
        >
          {addError ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : isAdding ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
        <p className="col-span-1 row-span-1 text-white">₱{price}</p>
      </div>
    </div>
  );
};

export default Card;