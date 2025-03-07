import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import '../../styles/components/Navigation.css';

const Navigation = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
        <li><Link to="/create-recipe" className="nav-link">Create Recipe</Link></li>
        <li><Link to="/auth" className="nav-link">Login/Register</Link></li>
        <li>
          <button 
            type="button" 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
          >
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;