import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GET, DELETE } from '../../utils/api';
import { createSlug } from '../../utils/helpers';
import '../../styles/components/RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchRecipes();
  }, []);
  
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await GET('/recipes');
      console.log('Fetched recipes:', data);
      
      // Ensure each recipe has an id property that matches the API's recipeId
      const processedData = data.map((recipe) => ({
        ...recipe,
        id: recipe.recipeId // Use the API's recipeId field
      }));
      
      setRecipes(processedData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError(err.message);
      setLoading(false);
    }
  };
  
  const handleCreateRecipe = () => {
    navigate('/create-recipe');
  };

  const handleViewRecipe = (recipe) => {
    const slug = createSlug(recipe.name);
    // Use both ID and slug for navigation: /recipe/2-vanilla-cake
    navigate(`/recipe/${recipe.recipeId}-${slug}`);
  };

  const handleDelete = async (id) => {
    try {
      // When deleting, use just the numeric ID for the API call
      await DELETE(`/recipes/${id}`);
      fetchRecipes(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  };
  
  // Show loading state
  if (loading) {
    return <div className="recipes-loading">Loading recipes...</div>;
  }
  
  // Show error state
  if (error) {
    return (
      <div className="recipes-error">
        <h2>Error Loading Recipes</h2>
        <p>{error}</p>
        <button onClick={fetchRecipes}>Try Again</button>
      </div>
    );
  }
  
  return (
    <section id="recipes">
      <div className="recipes-header">
        <h2>Your Recipes</h2>
        <button 
          onClick={handleCreateRecipe}
          className="create-recipe-button"
        >
          Create New Recipe
        </button>
      </div>
      
      {recipes.length === 0 ? (
        <div className="no-recipes">
          <p>You haven't created any recipes yet!</p>
          <p>Get started by creating your first recipe.</p>
          <button 
            onClick={handleCreateRecipe}
            className="create-first-recipe-button"
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="recipe-list">
          {recipes.map(recipe => (
            <div key={recipe.recipeId} className="recipe-card">
              <h3>{recipe.name}</h3>
              <div className="recipe-card-actions">
                <button 
                  onClick={() => handleViewRecipe(recipe)}
                  className="view-recipe-button"
                >
                  View Recipe
                </button>
                <button 
                  className="delete-recipe-btn"
                  onClick={() => handleDelete(recipe.recipeId)}
                >
                  Delete Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecipeList;