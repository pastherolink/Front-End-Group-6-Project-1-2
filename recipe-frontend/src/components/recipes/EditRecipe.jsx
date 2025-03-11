import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/components/EditRecipe.css';
import { GET, PUT, DELETE } from '../../utils/api';
import { createSlug } from '../../utils/helpers';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract the numeric ID from URL parameter
  const extractId = () => {
    if (!id) return null;
    
    if (id.includes('-')) {
      return id.split('-')[0]; // Get the number before the first dash
    }
    
    return id;
  };
  
  const numericId = extractId();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await GET(`/recipes/${numericId}`);
        console.log("Recipe data:", data);
        
        // Handle ingredients - might be array or JSON string
        let ingredients = [];
        if (data.ingredients) {
          if (Array.isArray(data.ingredients)) {
            // Already an array, use directly
            ingredients = data.ingredients;
          } else {
            // Try to parse as JSON string
            try {
              ingredients = JSON.parse(data.ingredients);
            } catch (e) {
              console.warn('Failed to parse ingredients JSON:', e);
              // If it's a string but not JSON, treat as a single item
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
            // Already an array, use directly
            instructions = data.instructions;
          } else {
            // Try to parse as JSON string
            try {
              instructions = JSON.parse(data.instructions);
            } catch (e) {
              console.warn('Failed to parse instructions JSON:', e);
              // If it's a string but not JSON, treat as a single item
              if (typeof data.instructions === 'string') {
                instructions = [data.instructions];
              }
            }
          }
        }
        
        // Ensure all expected properties exist
        const processedData = {
          name: data.name || '',
          cookingTime: data.cookingTime || '',
          difficulty: data.difficulty || 'Medium',
          servings: data.servings || 1,
          ingredients: Array.isArray(ingredients) ? ingredients : [],
          instructions: Array.isArray(instructions) ? instructions : [],
          // Keep other properties
          ...data
        };
        
        setRecipe(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (numericId) {
      fetchRecipe();
    } else {
      setError('Invalid recipe ID');
      setLoading(false);
    }
  }, [numericId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a deep copy to avoid modifying state directly
    const recipeToSubmit = {...recipe};
    
    // Process form values from the form elements
    const formElements = e.target.elements;
    
    recipeToSubmit.name = formElements['recipe-name'].value;
    recipeToSubmit.cookingTime = formElements['cooking-time'].value;
    recipeToSubmit.difficulty = formElements.difficulty.value;
    recipeToSubmit.servings = parseInt(formElements.servings.value, 10);
    
    // Handle ingredients and instructions from textareas
    const ingredientsText = formElements.ingredients.value;
    const instructionsText = formElements.instructions.value;
    
    // Split by newlines and filter empty lines
    recipeToSubmit.ingredients = ingredientsText
      .split('\n')
      .filter(item => item.trim() !== '');
    
    recipeToSubmit.instructions = instructionsText
      .split('\n')
      .filter(item => item.trim() !== '');
    
    // Ensure ingredients and instructions are properly formatted for API
    recipeToSubmit.ingredients = JSON.stringify(recipeToSubmit.ingredients);
    recipeToSubmit.instructions = JSON.stringify(recipeToSubmit.instructions);
    
    console.log("Sending recipe update:", recipeToSubmit);
    
    try {
      await PUT(`/recipes/${numericId}`, recipeToSubmit);
      
      // When successful, navigate back with a SEO-friendly URL
      const slug = createSlug(recipeToSubmit.name);
      navigate(`/recipe/${numericId}-${slug}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError(`Failed to update recipe: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await DELETE(`/recipes/${numericId}`);
        navigate('/recipes');
      } catch (err) {
        console.error('Error deleting recipe:', err);
        setError(err.message || 'Failed to delete recipe');
      }
    }
  };

  if (loading) return <div className="loading">Loading recipe data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!recipe) return <div className="not-found">Recipe not found</div>;

  return (
    <div className="edit-recipe-container">
      {error && <div className="error-message">{error}</div>}
      
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Edit Recipe</h2>
        
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name:</label>
          <input 
            type="text" 
            id="recipe-name" 
            name="recipe-name" 
            defaultValue={recipe.name}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="cooking-time">Cooking Time:</label>
          <input 
            type="text" 
            id="cooking-time" 
            name="cooking-time" 
            defaultValue={recipe.cookingTime}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            defaultValue={recipe.difficulty}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input 
            type="number" 
            id="servings" 
            name="servings" 
            min="1"
            defaultValue={recipe.servings}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line):</label>
          <textarea 
            id="ingredients" 
            name="ingredients"
            defaultValue={Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : ''}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one per line):</label>
          <textarea 
            id="instructions" 
            name="instructions"
            defaultValue={Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : ''}
            required
          ></textarea>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              // When canceling, navigate back with a SEO-friendly URL
              const slug = createSlug(recipe.name);
              navigate(`/recipe/${numericId}-${slug}`);
            }}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;