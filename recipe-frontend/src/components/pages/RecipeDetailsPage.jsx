import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GET } from '../../utils/api';
import '../../styles/components/RecipeDetail.css';

const RecipeDetailsPage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Extract the numeric ID from the route parameter (which might be "123-recipe-name")
  const recipeId = id.split('-')[0];
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await GET(`/recipes/${recipeId}`);
        setRecipe(data);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [recipeId]);
  
  const handleEdit = () => {
    navigate(`/recipe/edit/${recipeId}`);
  };
  
  const handleBack = () => {
    navigate('/recipes');
  };
  
  if (loading) {
    return <div className="loading">Loading recipe details...</div>;
  }
  
  if (error) {
    return (
      <div className="error">
        <h2>Error Loading Recipe</h2>
        <p>{error}</p>
        <button onClick={handleBack}>Back to Recipes</button>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="not-found">
        <h2>Recipe Not Found</h2>
        <p>The recipe you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleBack}>Back to Recipes</button>
      </div>
    );
  }
  
  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      
      <div className="recipe-actions">
        <button onClick={handleBack}>Back to Recipes</button>
        <button onClick={handleEdit}>Edit Recipe</button>
      </div>
      
      <section className="recipe-meta">
        <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </section>
      
      <section className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>
      
      <section className="recipe-instructions">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
      
      {recipe.notes && (
        <section className="recipe-notes">
          <h2>Notes</h2>
          <p>{recipe.notes}</p>
        </section>
      )}
    </div>
  );
};

export default RecipeDetailsPage;
