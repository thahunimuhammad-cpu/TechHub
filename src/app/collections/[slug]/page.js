"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductsByCollection, collections } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import "./collections.css";

export default function CollectionPage() {
  const params = useParams();
  const collectionSlug = params.slug;

  const collection = collections.find((c) => c.slug === collectionSlug);
  const collectionProducts = getProductsByCollection(collectionSlug);

  if (!collection) {
    return (
      <div className="container py-60">
        <div className="text-center">
          <h1>Collection not found</h1>
          <Link href="/products" className="btn btn-primary mt-20">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="collections-page">
      {/* Header */}
      <section className="collection-header py-40">
        <div className="container">
          <Link href="/products" className="back-link">
            ← Back to Products
          </Link>
          <h1>{collection.icon} {collection.name}</h1>
          <p>Browse our complete {collection.name.toLowerCase()} collection</p>
        </div>
      </section>

      {/* Products */}
      <section className="collection-content py-40">
        <div className="container">
          <div className="results-info">
            <p>Showing {collectionProducts.length} product{collectionProducts.length !== 1 ? "s" : ""}</p>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="grid grid-4 mt-40">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found in this collection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
