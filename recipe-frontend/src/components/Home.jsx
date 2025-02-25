import React from 'react';
import '../styles/components/Home.css';

const Home = () => {
  return (
    <section id="home">
      <div className="hero-section">
        <h1>Welcome to Your Culinary Adventure!</h1>
        <p className="tagline">Where Every Dish Tells a Story</p>
      </div>
      
      <div className="features-section">
        <h2>Transform Your Kitchen Into a Paradise of Flavors</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>🌟 Unleash Your Inner Chef</h3>
            <p>Turn ordinary ingredients into extraordinary masterpieces with our curated collection of recipes!</p>
          </div>
          
          <div className="feature-card">
            <h3>🎨 Create & Customize</h3>
            <p>Cooking isn't just following recipes - it's about adding your personal touch to every dish!</p>
          </div>
          
          <div className="feature-card">
            <h3>✨ Share & Discover</h3>
            <p>Join a community of passionate food lovers and share your culinary triumphs!</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Begin Your Culinary Journey?</h2>
        <p>From quick weekday dinners to show-stopping feast centerpieces, your next favorite recipe awaits!</p>
      </div>
    </section>
  );
};

export default Home;