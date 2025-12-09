"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/supabase/queries";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft } from "lucide-react";

export default function CollectionPage({ params }) {
  const { slug: collectionSlug } = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Collection names mapped from slugs
  const collectionsMap = {
    "new-products": { name: "New Products", icon: "✨" },
    "best-sellers": { name: "Best Sellers", icon: "⭐" },
    "special-offers": { name: "Special Offers", icon: "🎉" },
    "gaming-streaming": { name: "Gaming & Streaming", icon: "🎮" },
    "audio-sound": { name: "Audio & Sound", icon: "🎵" },
    "mobile-accessories": { name: "Mobile Accessories", icon: "📱" },
    "smart-gadgets": { name: "Smart Gadgets", icon: "⚡" },
    "home-kitchen": { name: "Home & Kitchen", icon: "🏠" },
    "kids-toys": { name: "Kids & Toys", icon: "🧸" },
    "beauty-care": { name: "Beauty & Personal Care", icon: "💄" },
  };

  const collection = collectionsMap[collectionSlug];

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts();
      if (result.success) {
        setProducts(result.data || []);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection not found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {collection.icon} {collection.name}
          </h1>
          <p className="text-gray-600 mt-2">Browse our {collection.name.toLowerCase()} collection</p>
        </div>
      </header>

      {/* Products */}
      <main className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <div>
            <p className="text-gray-600 mb-6">
              Showing {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this collection.</p>
          </div>
        )}
      </main>
    </div>
  );
}
