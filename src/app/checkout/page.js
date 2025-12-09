'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/supabase/queries';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '+923126548510';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  // Get cart from localStorage
  const cart = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [];

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
  const tax = subtotal * 0.08;
  const totalPrice = subtotal + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendWhatsAppMessage = (orderId) => {
    const cartDetails = cart.map(item => 
      `• ${item.name} x${item.quantity || 1} = Rs. ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}`
    ).join('%0A');

    const message = `
*Order Confirmation* ✅

*Order ID:* ${orderId}
*Customer:* ${formData.fullName}
*Phone:* ${formData.phone}
*Address:* ${formData.address}

*Items:*
${cartDetails}

*Subtotal:* Rs. ${subtotal.toFixed(2)}
*Tax (8%):* Rs. ${tax.toFixed(2)}
*Total:* Rs. ${totalPrice.toFixed(2)}

Thank you for your order!
`.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        toast.error('All fields are required');
        setLoading(false);
        return;
      }

      if (cart.length === 0) {
        toast.error('Your cart is empty');
        setLoading(false);
        return;
      }

      const result = await createOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        products: cart,
        totalPrice,
      });

      if (result.success) {
        toast.success('Order placed successfully!');
        
        // Send WhatsApp message
        setTimeout(() => {
          sendWhatsAppMessage(result.data.id);
        }, 1000);

        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          router.push(`/success/${result.data.id}`);
        }, 2000);
      } else {
        toast.error(result.error || 'Failed to create order');
      }
    } catch (err) {
      toast.error('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Toaster position="top-right" />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 XXX XXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg mt-8 hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Processing Order...' : 'Place Order & Send on WhatsApp'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 h-fit sticky top-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 border-b-2 border-gray-200 pb-6 max-h-96 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-bold text-blue-600">${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-b-2 border-gray-200 pb-6 mb-6">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Tax (8%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
