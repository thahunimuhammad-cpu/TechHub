'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product, onAddToCart, isCartItem = false, onRemove }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product);
    setIsAdding(false);
  };

  const handleRemove = async () => {
    if (onRemove) {
      await onRemove(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through ml-2">
              ${parseFloat(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isCartItem ? (
            <>
              <Link
                href={`/product/${product.id}`}
                className="flex-1 btn btn-secondary text-center"
              >
                View Details
              </Link>
              <button
                onClick={handleRemove}
                className="btn btn-danger px-2 py-2"
                title="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>
              <Link
                href={`/product/${product.id}`}
                className="btn btn-secondary px-4"
              >
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
