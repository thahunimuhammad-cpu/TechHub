'use client';

import Link from 'next/link';
import { products, vendors, getProductsByVendor } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import './vendor-detail.css';

export default function VendorPage({ params }) {
  const vendorName = decodeURIComponent(params.name);
  const vendor = vendors.find((v) => v.name === vendorName);
  const vendorProducts = getProductsByVendor(vendorName);

  if (!vendor) {
    return (
      <div className="vendor-detail">
        <div className="container py-60">
          <h1>Vendor not found</h1>
          <p><Link href="/vendors">← Back to Vendors</Link></p>
        </div>
      </div>
    );
  }

  const icons = {
    'TECH SHOP': '⚡',
    'AUDIO PRO': '🔊',
    'GAMING HUB': '🎮',
    'SMART HOME': '🏠'
  };

  return (
    <div className="vendor-detail">
      {/* Vendor Hero Section */}
      <section className="vendor-hero">
        <div className="container">
          <div className="vendor-hero-content">
            <div className="vendor-icon-large">{icons[vendor.name] || '🏪'}</div>
            <h1>{vendor.name}</h1>
            <p className="vendor-tagline">{vendor.description}</p>
            <p className="product-count-large">
              {vendorProducts.length} product{vendorProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="container py-40">
        <Link href="/vendors" className="back-link">← Back to All Vendors</Link>
      </div>

      {/* Products Section */}
      <section className="py-60">
        <div className="container">
          {vendorProducts.length > 0 ? (
            <>
              <h2 className="section-title">{vendor.name} Products</h2>
              <div className="products-grid grid-4">
                {vendorProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-products">
              <p>No products available from this vendor.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
