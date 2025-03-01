import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/RecipeList.css';

const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeList;