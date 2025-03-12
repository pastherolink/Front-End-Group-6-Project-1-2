import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/Home.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle navigation for different buttons
  const handleRecipesClick = () => {
    if (isAuthenticated) {
      navigate('/recipes');
    } else {
      navigate('/login');
    }
  };

  const handleSignupClick = () => {
    // Direct to register form instead of login
    navigate('/register');
  };

  const handleCreateRecipeClick = () => {
    if (isAuthenticated) {
      navigate('/create-recipe');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Recipe Manager</h1>
        <p className="tagline">Store and organize your favorite recipes in one place</p>
        
        {/* Change link to button */}
        <button 
          className="hero-button"
          onClick={handleRecipesClick}
        >
          Browse Recipes
        </button>
      </section>

      <section className="features-section">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Store Recipes</h3>
            <p>Easily add and store your favorite recipes with details like ingredients, preparation steps, and cooking times.</p>
            {/* Change link to button */}
            <button 
              className="feature-button"
              onClick={handleCreateRecipeClick}
            >
              Create Recipe
            </button>
          </div>
          
          <div className="feature-card">
            <h3>Organize Collection</h3>
            <p>Keep your recipes organized and easily searchable for quick access whenever you need them.</p>
            {/* Change link to button */}
            <button 
              className="feature-button"
              onClick={handleRecipesClick}
            >
              View Recipes
            </button>
          </div>
          
          <div className="feature-card">
            <h3>Access Anywhere</h3>
            <p>Access your recipes from any device with an internet connection - perfect for cooking on the go!</p>
            {/* Change link to button */}
            <button 
              className="feature-button"
              onClick={isAuthenticated ? () => {} : handleSignupClick}
            >
              {isAuthenticated ? 'You\'re Connected' : 'Get Started'}
            </button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to start organizing your recipes?</h2>
        <p>Sign up today and start building your digital cookbook.</p>
        {/* Update to link to register instead of login */}
        <button 
          className="cta-button"
          onClick={handleSignupClick}
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default HomePage;
