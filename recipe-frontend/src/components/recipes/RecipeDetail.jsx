import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../../styles/components/RecipeDetail.css';
import { GET } from '../../utils/api';
import { createSlug } from '../../utils/helpers';

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Extract the numeric ID from the URL parameter
  // This handles both formats: "2-vanilla-cake" or "recipe-2"
  const extractId = () => {
    if (!recipeId) return null;
    
    // If it's in the format "2-vanilla-cake"
    if (/^\d+/.test(recipeId)) {
      return recipeId.split('-')[0]; // Get the number before the first dash
    }
    
    // If it's in the old format "recipe-2"
    return recipeId.replace('recipe-', '');
  };
  
  const numericId = extractId();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        if (!numericId) {
          setError('Invalid recipe ID');
          setLoading(false);
          return;
        }
        
        console.log(`Fetching recipe with ID: ${numericId}`);
        
        const data = await GET(`/recipes/${numericId}`);
        console.log('Raw recipe data:', JSON.stringify(data, null, 2));
        
        if (!data || !data.name) {
          setError('Recipe not found or invalid data received');
          setLoading(false);
          return;
        }
        
        // Handle ingredients - might be array or JSON string
        let ingredients = [];
        if (data.ingredients) {
          if (Array.isArray(data.ingredients)) {
            ingredients = data.ingredients;
          } else {
            try {
              ingredients = JSON.parse(data.ingredients);
            } catch (e) {
              console.warn('Failed to parse ingredients JSON:', e);
              if (typeof data.ingredients === 'string') {
                ingredients = [data.ingredients];
              }
            }
          }
        }
        
        // Handle instructions - might be array or JSON string
        let instructions = [];
        if (data.instructions) {
          if (Array.isArray(data.instructions)) {
            instructions = data.instructions;
          } else {
            try {
              instructions = JSON.parse(data.instructions);
            } catch (e) {
              console.warn('Failed to parse instructions JSON:', e);
              if (typeof data.instructions === 'string') {
                instructions = [data.instructions];
              }
            }
          }
        }
        
        // Create a complete recipe object with processed data
        const processedRecipe = {
          ...data,
          ingredients: ingredients,
          instructions: instructions,
          cookingTime: data.cookingTime || 'Not specified',
          difficulty: data.difficulty || 'Not specified',
          servings: data.servings || 'Not specified'
        };
        
        setRecipe(processedRecipe);
        
        // Optional: Update URL if it doesn't include the slug
        if (data.name && !recipeId.includes('-')) {
          const slug = createSlug(data.name);
          const newUrl = `/recipe/${numericId}-${slug}`;
          // Use replace to avoid creating a new history entry
          navigate(newUrl, { replace: true });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [numericId, recipeId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  // Update the edit link to use the slug format
  const generateEditUrl = () => {
    // Make sure we use either a valid recipe ID or the extracted numeric ID
    const id = (recipe && recipe.recipeId) ? recipe.recipeId : numericId;
    
    if (recipe && recipe.name && id) {
      const slug = createSlug(recipe.name);
      const editUrl = `/recipe/edit/${id}-${slug}`;
      console.log("RecipeDetail: Generated edit URL:", editUrl);
      return editUrl;
    }
    if (id) {
      const defaultUrl = `/recipe/edit/${id}`;
      console.log("RecipeDetail: Generated default edit URL:", defaultUrl);
      return defaultUrl;
    }
    // Fallback to recipes list if we don't have an ID
    console.warn("RecipeDetail: No valid recipe ID found, redirecting to recipes list");
    return '/recipes';
  };
  
  // Your existing return statement with the updated edit link
  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <Link 
          to={generateEditUrl()} 
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
          {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions && recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;