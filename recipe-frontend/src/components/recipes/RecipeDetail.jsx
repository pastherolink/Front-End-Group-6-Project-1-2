import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/components/RecipeDetail.css';
import { GET } from '../../utils/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await GET(`/recipes/${id}`);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <Link 
          to={`/recipe/edit/${recipe.id}`} 
          className="edit-recipe-link"
        >
          Edit Recipe
        </Link>
      </div>
      <div className="recipe-info">
        <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>
      <div className="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;