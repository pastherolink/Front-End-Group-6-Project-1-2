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
    if (!id) {
      console.error("Edit Recipe: ID parameter is missing or undefined");
      return null;
    }
    
    console.log("Edit Recipe: Raw ID from URL:", id);
    
    // Handle ID formats like "123-recipe-name" or just "123"
    const match = id.match(/^(\d+)/);
    if (match && match[1]) {
      console.log("Edit Recipe: Extracted numeric ID:", match[1]);
      return match[1]; // Return just the numeric part
    }
    
    console.log("Edit Recipe: Using full ID as numeric ID:", id);
    return id;
  };
  
  const numericId = extractId();

  // Helper function for parsing JSON or array data
  const parseArrayData = (data, fieldName) => {
    if (!data) return [];
    
    if (Array.isArray(data)) {
      return data;
    }
    
    // Try to parse as JSON string
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn(`Parsed ${fieldName} is not an array:`, parsed);
        return [String(parsed)];
      }
    } catch (e) {
      console.warn(`Failed to parse ${fieldName} JSON:`, e);
      // If it's a string but not JSON, treat as a single item
      if (typeof data === 'string') {
        return [data];
      }
      return [];
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(`Edit Recipe: Fetching recipe with ID: ${numericId}`);
        
        const data = await GET(`/recipes/${numericId}`);
        console.log("Edit Recipe: Received data:", data);
        
        if (!data) {
          throw new Error('No data returned from API');
        }
        
        // Process ingredients and instructions using helper function
        const ingredients = parseArrayData(data.ingredients, 'ingredients');
        const instructions = parseArrayData(data.instructions, 'instructions');
        
        // Ensure all expected properties exist
        const processedData = {
          name: data.name || '',
          cookingTime: data.cookingTime || '',
          difficulty: data.difficulty || 'Medium',
          servings: data.servings || 1,
          ingredients: ingredients,
          instructions: instructions,
          // Keep other properties
          ...data
        };
        
        setRecipe(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Edit Recipe: Failed to fetch recipe:', error);
        console.error('Edit Recipe: Error details:', error.stack || JSON.stringify(error, null, 2));
        setError(`Failed to load recipe: ${error.message}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a deep copy to avoid modifying state directly
      const recipeToSubmit = {...recipe};
      
      // Process form values from the form elements
      const formElements = e.target.elements;
      
      recipeToSubmit.name = formElements['recipe-name'].value.trim();
      recipeToSubmit.cookingTime = formElements['cooking-time'].value.trim();
      recipeToSubmit.difficulty = formElements.difficulty.value;
      recipeToSubmit.servings = parseInt(formElements.servings.value, 10) || 1;
      
      // Handle ingredients and instructions from textareas
      const ingredientsText = formElements.ingredients.value;
      const instructionsText = formElements.instructions.value;
      
      // Split by newlines and filter empty lines
      const ingredientsArray = ingredientsText
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      const instructionsArray = instructionsText
        .split('\n')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      // Ensure ingredients and instructions are properly formatted for API
      recipeToSubmit.ingredients = JSON.stringify(ingredientsArray);
      recipeToSubmit.instructions = JSON.stringify(instructionsArray);
      
      console.log("Sending recipe update:", recipeToSubmit);
      
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