'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './signin.css';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Simulate sign in - store user data in localStorage
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: email.split('@')[0],
        signedInAt: new Date().toISOString()
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      setLoading(false);
      router.push('/account');
    }, 1000);
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          <div className="signin-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your TechHub account</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSignIn} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-signin" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="signin-divider">
            <span>or</span>
          </div>

          <div className="social-signin">
            <button className="social-btn google-btn" disabled={loading}>
              🔍 Sign in with Google
            </button>
            <button className="social-btn github-btn" disabled={loading}>
              🐙 Sign in with GitHub
            </button>
          </div>

          <div className="signin-footer">
            <p>
              Don't have an account? <Link href="/signup">Create one here</Link>
            </p>
            <p>
              <Link href="/forgot-password">Forgot your password?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
