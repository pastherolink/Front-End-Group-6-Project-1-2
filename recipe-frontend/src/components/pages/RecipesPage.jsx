import React from 'react';
import RecipeList from '../recipes/RecipeList';

const RecipesPage = () => {
  return (
    <div className="recipes-page">
      <h1>My Recipe Collection</h1>
      <RecipeList />
    </div>
  );
};

export default RecipesPage;
