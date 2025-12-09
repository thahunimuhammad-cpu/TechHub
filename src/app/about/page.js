"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Header */}
      <section className="about-header py-60">
        <div className="container text-center">
          <h1>About TechHub</h1>
          <p>Your trusted destination for premium tech products</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story py-60">
        <div className="container">
          <div className="story-layout">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2024, TechHub was created with a simple mission: to make premium tech
                products accessible to everyone. We believe that quality technology shouldn't be
                expensive or hard to find.
              </p>
              <p>
                We've carefully curated a collection of the best gadgets and accessories on the
                market, ensuring that every product meets our high standards of quality and
                performance.
              </p>
              <p>
                Today, we serve thousands of happy customers worldwide, and we're committed to
                maintaining the trust they place in us.
              </p>
            </div>
            <div className="story-image">
              <div className="placeholder-image">📱💻⌚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section py-60" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="section-title text-center mb-40">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>We only sell authentic, high-quality products that we've tested ourselves.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We stay ahead of the curve, bringing you the latest tech innovations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our top priority. We stand behind every product.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainability</h3>
              <p>We're committed to environmentally responsible business practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed</h3>
              <p>Fast shipping and quick customer support because your time matters.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Trust</h3>
              <p>Secure transactions and transparent policies you can rely on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-60">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-60" style={{ backgroundColor: "#667eea" }}>
        <div className="container text-center" style={{ color: "white" }}>
          <h2>Ready to Shop?</h2>
          <p>Discover our amazing collection of tech products today</p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
