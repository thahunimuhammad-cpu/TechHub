'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './settings.css';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/signin');
      return;
    }
    setUser(JSON.parse(currentUser));

    // Load preferences
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setNotifications(prefs.notifications ?? true);
      setNewsletter(prefs.newsletter ?? true);
      setDarkMode(prefs.darkMode ?? false);
    }
  }, [router]);

  const handleSaveSettings = () => {
    const preferences = {
      notifications,
      newsletter,
      darkMode
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="settings-page">
      <div className="container py-60">
        <div className="settings-header">
          <h1>⚙️ Account Settings</h1>
          <p>Manage your account preferences and security</p>
        </div>

        <div className="settings-grid">
          {/* Left Sidebar */}
          <aside className="settings-sidebar">
            <nav className="settings-menu">
              <a href="#profile" className="menu-item active">
                <span className="menu-icon">👤</span>
                <span>Profile</span>
              </a>
              <a href="#notifications" className="menu-item">
                <span className="menu-icon">🔔</span>
                <span>Notifications</span>
              </a>
              <a href="#privacy" className="menu-item">
                <span className="menu-icon">🔒</span>
                <span>Privacy & Security</span>
              </a>
              <a href="#billing" className="menu-item">
                <span className="menu-icon">💳</span>
                <span>Billing</span>
              </a>
              <a href="#preferences" className="menu-item">
                <span className="menu-icon">✨</span>
                <span>Preferences</span>
              </a>
              <button onClick={handleLogout} className="menu-item logout">
                <span className="menu-icon">🚪</span>
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Right Content */}
          <main className="settings-content">
            {saved && <div className="success-message">✅ Settings saved successfully!</div>}

            {/* Profile Section */}
            <section className="settings-section" id="profile">
              <div className="section-header">
                <h2>👤 Profile Information</h2>
              </div>
              <div className="section-content">
                <div className="setting-group">
                  <label>Email Address</label>
                  <p className="setting-value">{user.email}</p>
                </div>
                <div className="setting-group">
                  <label>Username</label>
                  <p className="setting-value">{user.name}</p>
                </div>
                <div className="setting-group">
                  <label>Member Since</label>
                  <p className="setting-value">
                    {new Date(user.signedInAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="btn btn-secondary">Edit Profile</button>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="settings-section" id="notifications">
              <div className="section-header">
                <h2>🔔 Notification Settings</h2>
              </div>
              <div className="section-content">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>📧 Email Notifications</h3>
                      <p>Get notified about orders, offers, and updates</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>📰 Newsletter</h3>
                      <p>Subscribe to our weekly newsletter</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy & Security Section */}
            <section className="settings-section" id="privacy">
              <div className="section-header">
                <h2>🔒 Privacy & Security</h2>
              </div>
              <div className="section-content">
                <div className="setting-item">
                  <h3>🔐 Change Password</h3>
                  <p>Update your password to keep your account secure</p>
                  <button className="btn btn-secondary">Change Password</button>
                </div>

                <div className="setting-item">
                  <h3>📱 Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                  <button className="btn btn-secondary">Enable 2FA</button>
                </div>

                <div className="setting-item">
                  <h3>🗑️ Delete Account</h3>
                  <p>Permanently delete your account and all data</p>
                  <button className="btn btn-danger">Delete Account</button>
                </div>
              </div>
            </section>

            {/* Billing Section */}
            <section className="settings-section" id="billing">
              <div className="section-header">
                <h2>💳 Billing & Payment</h2>
              </div>
              <div className="section-content">
                <div className="setting-item">
                  <h3>💰 Payment Methods</h3>
                  <p>Manage your saved payment methods</p>
                  <button className="btn btn-secondary">Manage Methods</button>
                </div>

                <div className="setting-item">
                  <h3>📋 Billing History</h3>
                  <p>View all your invoices and transactions</p>
                  <button className="btn btn-secondary">View History</button>
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="settings-section" id="preferences">
              <div className="section-header">
                <h2>✨ Display Preferences</h2>
              </div>
              <div className="section-content">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h3>🌙 Dark Mode</h3>
                    <p>Enable dark theme for the website</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <button onClick={handleSaveSettings} className="btn btn-primary btn-save">
                  💾 Save All Settings
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
