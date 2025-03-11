import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/RecipeList.css';
import { GET, DELETE } from '../../utils/api';
import { createSlug } from '../../utils/helpers';

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="recipes">
      <h2>Recipes</h2>
      <div className="recipe-list">
        {recipes && recipes.map((recipe) => (
          <div key={recipe.recipeId} className="recipe-card">
            <h3>{recipe.name}</h3>
            <div className="recipe-details">
              <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            </div>
            <button 
              className="view-recipe-btn"
              onClick={() => handleViewRecipe(recipe)}
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
        ))}
      </div>
    </section>
  );
};

export default RecipeList;