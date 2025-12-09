"use client";

import Link from "next/link";
import { vendors, getProductsByVendor } from "@/data/products";
import "./vendors.css";

export default function VendorsPage() {
  return (
    <div className="vendors-page">
      {/* Header */}
      <section className="vendors-header py-40">
        <div className="container">
          <h1>Our Vendors</h1>
          <p>Shop from trusted brands and sellers</p>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="vendors-section py-60">
        <div className="container">
          <div className="vendors-grid">
            {vendors.map((vendor) => {
              const vendorProducts = getProductsByVendor(vendor.name);
              return (
                <div key={vendor.id} className="vendor-card">
                  <div className="vendor-icon">🏪</div>
                  <h3>{vendor.name}</h3>
                  <p className="vendor-description">{vendor.description}</p>
                  <p className="product-count">
                    {vendorProducts.length} product{vendorProducts.length !== 1 ? "s" : ""}
                  </p>
                  <Link
                    href={`/vendors/${encodeURIComponent(vendor.name)}`}
                    className="btn btn-primary"
                  >
                    View Shop
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
