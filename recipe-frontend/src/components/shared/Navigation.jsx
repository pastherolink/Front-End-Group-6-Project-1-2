import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/Navigation.css';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Recipe App</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/recipes">Recipes</Link>
            <Link to="/create-recipe">Create Recipe</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout {currentUser.username}
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
