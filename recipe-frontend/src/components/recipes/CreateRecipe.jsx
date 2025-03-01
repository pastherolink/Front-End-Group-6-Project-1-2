import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/CreateRecipe.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newRecipe = {
      name: formData.get('recipe-name'),
      cookingTime: formData.get('cooking-time'),
      difficulty: formData.get('difficulty'),
      servings: parseInt(formData.get('servings')),
      ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
      instructions: formData.get('instructions').split('\n').filter(i => i.trim())
    };

    try {
      const response = await fetch('http://localhost:3001/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe)
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const data = await response.json();
      navigate(`/recipe/${data.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-recipe-container">
      {error && <div className="error-message">{error}</div>}
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Create Recipe</h2>
        
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name:</label>
          <input 
            type="text" 
            id="recipe-name" 
            name="recipe-name" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="cooking-time">Cooking Time:</label>
          <input 
            type="text" 
            id="cooking-time" 
            name="cooking-time" 
            placeholder="e.g., 30 minutes" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            required
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
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line):</label>
          <textarea 
            id="ingredients" 
            name="ingredients" 
            required
            placeholder="Enter each ingredient on a new line"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one per line):</label>
          <textarea 
            id="instructions" 
            name="instructions" 
            required
            placeholder="Enter each step on a new line"
          ></textarea>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Create Recipe
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