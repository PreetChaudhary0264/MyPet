import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroDog from './images/hero-dog.png';
import runningDog from './images/running-dog.gif'; // Add an animated GIF of a running dog

const Home = () => {
  return (
    <div className="home-page">
      {/* Keep Original Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Never Lose Your Furry Friend Again
          </h1>
          <p className="hero-subtitle">
            Protect your pets with smart QR tags and instant recovery alerts
          </p>
          <div className="hero-buttons">
            <Link to="/register-pet" className="cta-button2">
              Register Your Pet Now
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroDog} alt="Happy dog with collar" />
        </div>
      </section>

      {/* New Purpose Section with Running Dog Animation */}
      <section className="purpose-section">
        <div className="purpose-content">
          <h2>About MYPET</h2>
          <p>
            MYPET is a revolutionary pet protection system that uses QR technology
            to help reunite lost pets with their owners quickly and safely.
          </p>
          <ul className="features-list">
            <li>Instant identification with scannable QR tags</li>
            <li>Direct communication with pet owners</li>
            <li>Medical information accessible to vets</li>
            <li>Peace of mind for pet parents</li>
          </ul>
        </div>
        <div className="animation-container">
          <img 
            src={runningDog} 
            alt="Dog running animation" 
            className="running-dog-animation"
          />
        </div>
      </section>

      {/* Enhanced Footer with Reviews */}
      <footer className="home-footer">
        <div className="reviews-section">
          <h3>What Pet Owners Say</h3>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"Found my dog within 2 hours thanks to MYPET!"</p>
              <div className="reviewer">- Sarah, Dog Mom</div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p>"The vet could access my cat's medical history instantly."</p>
              <div className="reviewer">- Michael, Cat Dad</div>
            </div>
          </div>
        </div>
        <div className="footer-cta">
          <Link to="/register-pet" className="cta-button">
            Get Started Today
          </Link>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} MYPET. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;