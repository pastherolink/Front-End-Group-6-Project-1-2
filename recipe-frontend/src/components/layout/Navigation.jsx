import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; 
import '../../styles/components/Navigation.css';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/recipes" className="nav-link">My Recipes</Link></li>
            <li><Link to="/create-recipe" className="nav-link">Create Recipe</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </>
        )}
        <li>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'} 
            <span className="toggle-text">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;