'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/supabase/queries';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage({ params, searchParams }) {
  const router = useRouter();
  const adminKey = searchParams.key;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const loadProduct = async () => {
      const result = await getProductById(params.id);
      if (result.success) {
        setProduct(result.data);
        setFormData({
          name: result.data.name,
          price: result.data.price,
          description: result.data.description || '',
          image: result.data.image || '',
        });
      }
      setLoading(false);
    };
    loadProduct();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const result = await updateProduct(params.id, formData);
      if (result.success) {
        router.push(`/admin/products?key=${adminKey}`);
      } else {
        setError(result.error || 'Failed to update product');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link href={`/admin/products?key=${adminKey}`} className="text-blue-600">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Link
        href={`/admin/products?key=${adminKey}`}
        className="text-blue-600 hover:text-blue-800 mb-8 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="max-h-48 rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary flex-1 py-3 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Product'}
            </button>
            <Link
              href={`/admin/products?key=${adminKey}`}
              className="btn btn-secondary flex-1 py-3 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
