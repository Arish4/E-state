import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, isBuyer, isSeller } = useAuth();

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Property Buyer",
      content: "E-State helped me find my dream home in just 2 weeks! The platform is user-friendly and the properties are exactly as described.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Estate Seller",
      content: "Selling my property through E-State was seamless. I got multiple offers within days and sold at a great price.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Investor",
      content: "The search functionality and detailed property information make it easy to find investment opportunities.",
      rating: 5
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Dream Property
            <span className="hero-subtitle">or Sell Your Estate</span>
          </h1>
          <p className="hero-description">
            Discover the perfect property with our comprehensive real estate platform. 
            Whether you're buying, selling, or investing, we've got you covered.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <>
                {isBuyer && (
                  <Link to="/estates" className="btn btn-primary btn-large">
                    Browse Properties
                  </Link>
                )}
                {isSeller && (
                  <Link to="/add-estate" className="btn btn-primary btn-large">
                    List Your Property
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            <div className="property-card-preview">
              <div className="preview-image"></div>
              <div className="preview-content">
                <h3>Luxury Villa</h3>
                <p>$850,000</p>
                <span>Downtown Location</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose E-State?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Find properties with our powerful search filters and location-based recommendations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Access our platform from anywhere with our responsive design and mobile app.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Platform</h3>
              <p>Your data and transactions are protected with enterprise-grade security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Processing</h3>
              <p>Quick property listings and instant notifications for new matches.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers who found their perfect property with E-State.</p>
            {!isAuthenticated && (
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary btn-large">
                  Create Account
                </Link>
                <Link to="/about" className="btn btn-outline btn-large">
                  Learn More
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
