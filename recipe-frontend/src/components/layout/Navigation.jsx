import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/create-recipe">Create Recipe</Link></li>
        <li><Link to="/auth">Login/Register</Link></li>
        <li>
          <button type="button" id="theme-toggle">Toggle Dark/Light Mode</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;