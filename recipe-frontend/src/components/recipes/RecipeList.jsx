import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/RecipeList.css';
import { GET, DELETE } from '../../utils/api';

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await GET('/recipes');
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDelete = async (id) => {
    try {
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
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <div className="recipe-details">
              <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            </div>
            <button 
              className="view-recipe-btn"
              onClick={() => handleViewRecipe(recipe.id)}
            >
              View Recipe
            </button>
            <button 
              className="delete-recipe-btn"
              onClick={() => handleDelete(recipe.id)}
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