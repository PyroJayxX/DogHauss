'use client';

import React, { useState, useEffect } from 'react';
import Card from './Card';

type Product = {
  id: number;
  image_file: string;
  name: string;
  price: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const BestSellerGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders/products/`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="px-12 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          image={`/images/${product.image_file}`}
          name={product.name}
          price={product.price.toString()}
          emoji="🌭"
        />
      ))}
    </div>
  );
};

export default BestSellerGrid;