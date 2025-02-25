import React from 'react';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#recipes">Recipes</a></li>
        <li><a href="#create-recipe">Create Recipe</a></li>
        <li><a href="#auth">Login/Register</a></li>
        <li>
          <button type="button" id="theme-toggle">Toggle Dark/Light Mode</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;