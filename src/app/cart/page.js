'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
          <Link href="/products" className="btn btn-primary inline-flex items-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6 flex gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      —
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${item.id}`} className="text-lg font-bold hover:text-blue-600">
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1">${parseFloat(item.price).toFixed(2)} each</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-3">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="btn btn-danger px-3 py-2 flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">${(total * 1.08).toFixed(2)}</span>
          </div>

          <Link href="/checkout" className="btn btn-primary w-full py-3 text-center block mb-4">
            Proceed to Checkout
          </Link>

          <Link href="/products" className="btn btn-secondary w-full py-3 text-center block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
