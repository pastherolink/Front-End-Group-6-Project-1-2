import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from '../../utils/api';
import { createSlug } from '../../utils/helpers';
import '../../styles/components/CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Ensure ingredients and instructions are properly formatted for API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get form values
    const formElements = e.target.elements;
    
    // Create recipe object from form values
    const recipe = {
      name: formElements['recipe-name'].value,
      userId: 1, // Hard-coded user ID or get from auth
      cookingTime: formElements['cooking-time'].value,
      difficulty: formElements.difficulty.value,
      servings: parseInt(formElements.servings.value, 10),
      ingredients: formElements.ingredients.value
        .split('\n')
        .filter(item => item.trim() !== ''),
      instructions: formElements.instructions.value
        .split('\n')
        .filter(item => item.trim() !== '')
    };
    
    // Stringify arrays for API
    const recipeToSubmit = {
      ...recipe,
      ingredients: JSON.stringify(recipe.ingredients),
      instructions: JSON.stringify(recipe.instructions)
    };
    
    console.log("Submitting recipe:", recipeToSubmit);
    
    try {
      const response = await POST('/recipes', recipeToSubmit);
      
      // Navigate to recipe page with SEO-friendly URL
      navigate('/recipes');
    } catch (error) {
      console.error("Failed to create recipe:", error);
      setError(error.message);
    }
  };

  return (
    <div className="create-recipe-container">
      {error && <div className="error-message">{error}</div>}
      
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Create New Recipe</h2>
        
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name:</label>
          <input 
            type="text" 
            id="recipe-name" 
            name="recipe-name" 
            required 
            placeholder="e.g., Chocolate Chip Cookies"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cooking-time">Cooking Time:</label>
          <input 
            type="text" 
            id="cooking-time" 
            name="cooking-time" 
            required 
            placeholder="e.g., 30 minutes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            name="difficulty" 
            defaultValue="Medium"
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
            defaultValue="4"
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line):</label>
          <textarea 
            id="ingredients" 
            name="ingredients" 
            required
            placeholder="2 cups flour
1 cup sugar
1/2 cup butter
..."
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one per line):</label>
          <textarea 
            id="instructions" 
            name="instructions" 
            required
            placeholder="Preheat oven to 350°F
Mix dry ingredients
Add wet ingredients
..."
          ></textarea>
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Recipe'}
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/recipes')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;