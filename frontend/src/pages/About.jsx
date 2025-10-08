import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About E-State</h1>
          <p className="about-subtitle">
            Your trusted partner in real estate, connecting buyers and sellers 
            with the perfect properties across the market.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At E-State, we believe that finding the perfect property should be simple, 
              transparent, and stress-free. Our platform leverages cutting-edge technology 
              to connect buyers with sellers, making real estate transactions more efficient 
              and accessible for everyone.
            </p>
            <p>
              Whether you're a first-time homebuyer, a seasoned investor, or looking to sell 
              your property, we provide the tools and support you need to make informed 
              decisions in the real estate market.
            </p>
          </div>
          <div className="mission-image">
            <div className="image-placeholder">
              <div className="building-icon">🏢</div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Transparency</h3>
              <p>
                We provide clear, honest information about every property, 
                ensuring you make decisions based on accurate data.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>
                Building lasting relationships through reliable service, 
                secure transactions, and consistent support.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>
                Continuously improving our platform with the latest technology 
                to enhance your real estate experience.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Excellence</h3>
              <p>
                Committed to delivering exceptional service and results 
                that exceed your expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>John Smith</h3>
              <p>CEO & Founder</p>
              <span>15+ years in real estate</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Sarah Wilson</h3>
              <p>Head of Technology</p>
              <span>Expert in real estate tech</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Mike Johnson</h3>
              <p>Lead Developer</p>
              <span>Full-stack development</span>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🎨</div>
              <h3>Lisa Brown</h3>
              <p>UX Designer</p>
              <span>User experience expert</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Properties Listed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta">
          <h2>Get in Touch</h2>
          <p>
            Have questions about our platform or need assistance with your real estate needs? 
            We're here to help!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>info@estate.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>123 Real Estate Ave, City, State 12345</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
