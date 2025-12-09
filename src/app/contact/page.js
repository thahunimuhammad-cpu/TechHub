"use client";

import { useState } from "react";
import "./contact.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header py-60">
        <div className="container text-center">
          <h1>Contact Us</h1>
          <p>Get in touch with our support team</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content py-60">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have a question or need assistance? We're here to help!</p>

              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>support@techhub.com</p>
                <p className="response-time">Response time: 24 hours</p>
              </div>

              <div className="info-card">
                <div className="info-icon">📱</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p className="response-time">Available 9 AM - 6 PM EST</p>
              </div>

              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>123 Tech Street</p>
                <p>San Francisco, CA 94103</p>
              </div>

              <div className="info-card">
                <div className="info-icon">⏰</div>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9 AM - 6 PM</p>
                <p>Saturday - Sunday: 10 AM - 4 PM</p>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="socials">
                  <a href="#" className="social-btn">Facebook</a>
                  <a href="#" className="social-btn">Twitter</a>
                  <a href="#" className="social-btn">Instagram</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Product Support</option>
                    <option value="order">Order Issue</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="return">Return/Refund</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                  Send Message
                </button>

                <p className="form-note">* Required fields</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-60" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="section-title text-center mb-40">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What are your shipping rates?</h3>
              <p>We offer free shipping on orders over $50. Standard shipping is $9.99 and typically arrives in 5-7 business days.</p>
            </div>
            <div className="faq-item">
              <h3>Do you accept returns?</h3>
              <p>Yes! We offer a 30-day return policy on all products. Items must be unused and in original packaging.</p>
            </div>
            <div className="faq-item">
              <h3>How long does delivery take?</h3>
              <p>Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Tracking information is provided with all orders.</p>
            </div>
            <div className="faq-item">
              <h3>Are your products authentic?</h3>
              <p>100% authentic. All our products are sourced directly from authorized manufacturers and distributors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
