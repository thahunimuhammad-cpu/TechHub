'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './account.css';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/signin');
      return;
    }
    setUser(JSON.parse(currentUser));

    // Load sample orders from localStorage
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [router]);

  if (!user) return null;

  const handleViewOrder = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="account-page">
      <div className="container py-60">
        {/* Account Header */}
        <div className="account-header">
          <div className="account-greeting">
            <h1>👋 Welcome, {user.name}!</h1>
            <p>Here's your account dashboard</p>
          </div>
          <div className="account-actions">
            <Link href="/settings" className="btn btn-secondary">
              ⚙️ Settings
            </Link>
            <Link href="/products" className="btn btn-primary">
              🛍️ Continue Shopping
            </Link>
          </div>
        </div>

        {/* Account Info Cards */}
        <div className="account-cards">
          <div className="info-card">
            <div className="card-icon">👤</div>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div className="info-card">
            <div className="card-icon">📦</div>
            <h3>Total Orders</h3>
            <p>{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="info-card">
            <div className="card-icon">💰</div>
            <h3>Total Spent</h3>
            <p>${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
          </div>
          <div className="info-card">
            <div className="card-icon">⭐</div>
            <h3>Loyalty Points</h3>
            <p>{orders.reduce((sum, order) => sum + order.points, 0)} points</p>
          </div>
        </div>

        {/* Quick Links */}
        <section className="quick-links-section py-40">
          <h2>Quick Links</h2>
          <div className="quick-links">
            <Link href="/account/addresses" className="quick-link">
              <span className="link-icon">📍</span>
              <span className="link-text">Saved Addresses</span>
              <span className="arrow">→</span>
            </Link>
            <Link href="/account/wishlist" className="quick-link">
              <span className="link-icon">❤️</span>
              <span className="link-text">Wishlist</span>
              <span className="arrow">→</span>
            </Link>
            <Link href="/account/reviews" className="quick-link">
              <span className="link-icon">⭐</span>
              <span className="link-text">My Reviews</span>
              <span className="arrow">→</span>
            </Link>
            <Link href="/account/returns" className="quick-link">
              <span className="link-icon">🔄</span>
              <span className="link-text">Returns & Refunds</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="orders-section py-40">
          <div className="orders-header">
            <h2>📦 Recent Orders</h2>
            <Link href="/account/orders" className="link-btn">
              View All Orders →
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <div className="order-number">
                      <strong>Order #{order.id}</strong>
                      <span className={`status status-${order.status}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="order-meta">
                      <span>📅 {new Date(order.date).toLocaleDateString()}</span>
                      <span>💰 ${order.total.toFixed(2)}</span>
                      <span>📦 {order.items} item{order.items !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="btn btn-secondary btn-small"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <p>No orders yet. Start shopping!</p>
              <Link href="/products" className="btn btn-primary">
                Shop Now
              </Link>
            </div>
          )}
        </section>

        {/* Membership Section */}
        <section className="membership-section py-60">
          <div className="membership-card">
            <div className="membership-icon">🎯</div>
            <h2>TechHub Plus Membership</h2>
            <p>Unlock exclusive benefits, free shipping, and early access to sales</p>
            <button className="btn btn-primary">Join Now - $9.99/month</button>
          </div>
        </section>
      </div>
    </div>
  );
}
