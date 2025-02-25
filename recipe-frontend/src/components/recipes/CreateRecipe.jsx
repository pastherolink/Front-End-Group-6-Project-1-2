import React from 'react';
import '../../styles/components/CreateRecipe.css';

const CreateRecipe = () => {
  return (
    <div className="create-recipe-container">
      <form className="recipe-form">
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
          <label htmlFor="recipe-ingredients">Ingredients:</label>
          <textarea 
            id="recipe-ingredients" 
            name="recipe-ingredients" 
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="recipe-steps">Steps:</label>
          <textarea 
            id="recipe-steps" 
            name="recipe-steps" 
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;